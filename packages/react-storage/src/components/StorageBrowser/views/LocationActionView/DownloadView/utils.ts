import type {
  ActionInputConfig,
  DownloadHandlerData,
  FileData,
  LocationItemData,
} from '../../../actions';
import { constructBucket, createDownloadItem } from '../../../actions';
import { list } from '../../../storage-internal';

/**
 * Page size for the recursive `list()` used to expand a folder into its files.
 * Mirrors the value used by DeleteView's `countFilesInFolder`.
 */
const LIST_PAGE_SIZE = 1000;

/**
 * Hard cap on the combined number of files a single download may contain,
 * counted across every folder (and loose file) in the selection. Folder
 * expansion stops paginating as soon as the running total would exceed this
 * value and throws {@link FileLimitError}; the view then surfaces a blocked
 * state instead of downloading a truncated set (silent truncation would be
 * data loss). Mirrors the 5000 threshold DeleteView uses for its file count.
 */
export const LARGE_DOWNLOAD_FILE_COUNT = 5000;

/**
 * Thrown by {@link expandFolderToFiles} when the combined expanded file count
 * of the selection exceeds {@link LARGE_DOWNLOAD_FILE_COUNT}. Callers use it
 * to distinguish the over-limit state from enumeration failures.
 */
export class FileLimitError extends Error {
  constructor() {
    super(
      `Download selection exceeds the maximum of ${LARGE_DOWNLOAD_FILE_COUNT} files`
    );
    this.name = 'FileLimitError';
  }
}

/**
 * Mutable running total of files expanded so far across the ENTIRE selection.
 * A single instance is shared by every `expandFolderToFiles` call in one
 * enumeration run so the {@link LARGE_DOWNLOAD_FILE_COUNT} cap applies to the
 * combined selection, not per folder.
 */
export interface FileCounter {
  count: number;
}

/**
 * Computes the base name for a multi-file zip archive from the flat list of
 * file keys being zipped. Used for file-only, multi-item, and mixed
 * selections; a selection of exactly one folder is named after that folder
 * instead (see {@link resolveArchiveName}).
 *
 * Rule: the name is the last path segment of the LONGEST COMMON ANCESTOR
 * DIRECTORY of all files. For each key the directory segments are
 * `key.split('/')` without the final basename; the longest common prefix of
 * those segment arrays is taken, and its last element is the name. When the
 * common prefix is empty (root-level files or files with no shared ancestor)
 * this falls back to `'download'`.
 *
 * Examples:
 * - ['public/nested/one/pic.jpg', 'public/nested/two/pic.jpg'] -> 'nested'
 * - ['public/nested/a.jpg', 'public/images/b.jpg', 'public/c.jpg'] -> 'public'
 * - ['photos/a.jpg', 'photos/b.jpg'] -> 'photos'
 * - ['a.jpg', 'b.jpg'] -> 'download'
 * - ['public/x.jpg', 'other/y.jpg'] -> 'download'
 * - [] -> 'download'
 *
 * Pure/synchronous; the base name only — the handler appends `.zip`.
 */
export const getArchiveName = (fileKeys: string[]): string => {
  if (fileKeys.length === 0) {
    return 'download';
  }

  // Directory segments per file = path split without the final basename.
  const dirSegments = fileKeys.map((key) => key.split('/').slice(0, -1));

  // Longest common prefix across every file's directory segment array.
  const [first, ...rest] = dirSegments;
  let commonLength = first.length;
  for (const segments of rest) {
    let i = 0;
    while (
      i < commonLength &&
      i < segments.length &&
      segments[i] === first[i]
    ) {
      i += 1;
    }
    commonLength = i;
    if (commonLength === 0) {
      break;
    }
  }

  // Last segment of the common ancestor dir; empty prefix OR an empty segment
  // (e.g. a key like 'a//b.jpg') -> 'download'.
  const name = commonLength === 0 ? '' : first[commonLength - 1];
  return name === '' ? 'download' : name;
};

/**
 * Resolves the zip archive base name for the current SELECTION.
 *
 * When the selection consists of exactly ONE FOLDER (no other items), the
 * archive is named after that folder (basename of `folder.key`, trailing
 * slash stripped): the download was initiated from that folder, so selecting
 * `photos/` yields `photos.zip` even when every file lives in a deeper
 * subfolder like `photos/vacation/`. Every other selection shape (file-only,
 * multi-folder, mixed) falls back to the longest-common-ancestor rule of
 * {@link getArchiveName}.
 */
export const resolveArchiveName = (
  dataItems: LocationItemData[],
  fileKeys: string[]
): string => {
  if (dataItems.length === 1 && dataItems[0].type === 'FOLDER') {
    const basename = dataItems[0].key.replace(/\/$/, '').split('/').pop();
    if (basename) {
      return basename;
    }
  }
  return getArchiveName(fileKeys);
};

export interface ExpandFolderToFilesOptions {
  /** S3 key of the folder to expand (ends in `'/'`). */
  folderKey: string;
  /** Storage action config. */
  config: ActionInputConfig;
  /**
   * Current browse-location prefix `P`; each file's `relativePath` is
   * computed as `key.slice(P.length)`.
   */
  locationPrefix: string;
  /**
   * Optional abort signal; when aborted between pages the loop throws an
   * `AbortError` and no items are returned.
   */
  signal?: AbortSignal;
  /**
   * Shared running total of files expanded so far across the selection (see
   * {@link FileCounter}). Callers expanding multiple folders MUST pass the
   * same instance to every call so the cap applies to the combined selection.
   * Defaults to a fresh counter (single-folder cap still enforced).
   */
  fileCounter?: FileCounter;
}

/**
 * Recursively expands a folder into the flat list of downloadable files it
 * contains, preserving each file's folder-relative zip path.
 *
 * Clones the pagination loop from DeleteView's `countFilesInFolder`, but:
 * - collects {@link DownloadHandlerData} items instead of counting,
 * - stops paginating and throws {@link FileLimitError} once the shared
 *   `fileCounter` would exceed {@link LARGE_DOWNLOAD_FILE_COUNT} (the caller
 *   surfaces a blocked state; a truncated zip is never produced),
 * - filters out directory markers (keys ending in `'/'`),
 * - is cancellable via `signal`, checked between `list()` pages.
 */
export const expandFolderToFiles = async ({
  folderKey,
  config,
  locationPrefix,
  signal,
  fileCounter = { count: 0 },
}: ExpandFolderToFilesOptions): Promise<DownloadHandlerData[]> => {
  const { accountId, credentials, customEndpoint } = config;
  const bucket = constructBucket(config);

  const files: DownloadHandlerData[] = [];
  let nextToken: string | undefined;

  do {
    // Abort is checked between pages (and before the first page) so a cancel
    // during enumeration stops promptly without emitting a partial result.
    if (signal?.aborted) {
      throw new DOMException('Folder expansion aborted', 'AbortError');
    }

    // Short-circuit between pages when the SHARED counter already exceeds the
    // cap (e.g. a sibling folder's expansion pushed it over while this one
    // awaited `list()`): no point paginating a selection that is blocked.
    if (fileCounter.count > LARGE_DOWNLOAD_FILE_COUNT) {
      throw new FileLimitError();
    }

    const { items, nextToken: listNextToken } = await list({
      path: folderKey,
      options: {
        bucket,
        locationCredentialsProvider: credentials,
        expectedBucketOwner: accountId,
        customEndpoint,
        pageSize: LIST_PAGE_SIZE,
        nextToken,
      },
    });

    for (const item of items) {
      // Skip directory markers (zero-byte keys ending in '/') — only real files
      // become zip entries.
      if (item.path.endsWith('/')) {
        continue;
      }

      // Enforce the cap per file so the loop stops as soon as the combined
      // selection exceeds it, mid-page included.
      fileCounter.count += 1;
      if (fileCounter.count > LARGE_DOWNLOAD_FILE_COUNT) {
        throw new FileLimitError();
      }

      const fileData: FileData = {
        key: item.path,
        id: crypto.randomUUID(),
        // `list()` may omit size/lastModified; fall back defensively instead
        // of asserting non-null.
        size: item.size ?? 0,
        lastModified: item.lastModified ?? new Date(0),
        eTag: item.eTag,
        type: 'FILE',
      };

      files.push(createDownloadItem(fileData, locationPrefix));
    }

    nextToken = listNextToken;
  } while (nextToken);

  return files;
};
