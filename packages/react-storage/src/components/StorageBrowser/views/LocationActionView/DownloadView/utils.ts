import type {
  ActionInputConfig,
  DownloadHandlerData,
  FileData,
} from '../../../actions';
import {
  constructBucket,
  createDownloadItem,
} from '../../../actions/handlers/utils';
import { list } from '../../../storage-internal';

/**
 * Page size for the recursive `list()` used to expand a folder into its files.
 * Mirrors the value used by DeleteView's `countFilesInFolder`.
 */
const LIST_PAGE_SIZE = 1000;

/**
 * Soft threshold (file count) above which the UI should confirm a "large
 * download" with the user before dispatching. Unlike DeleteView's hard 5000
 * cap (which only affects a display *count*), download must fetch every file —
 * a silently truncated zip would be data loss — so expansion itself is
 * UNBOUNDED and this value is used purely as a confirmation guard.
 */
export const LARGE_DOWNLOAD_FILE_COUNT = 5000;

/**
 * Computes the base name for a multi-file zip archive from the flat list of
 * file keys being zipped.
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
 * Recursively expands a folder into the flat list of downloadable files it
 * contains, preserving each file's folder-relative zip path.
 *
 * Clones the pagination loop from DeleteView's `countFilesInFolder`, but:
 * - collects {@link DownloadHandlerData} items instead of counting,
 * - paginates UNBOUNDED (no 5000 cap) so the resulting zip is complete,
 * - filters out directory markers (keys ending in `'/'`),
 * - is cancellable via `signal`, checked between `list()` pages.
 *
 * @param folderKey - S3 key of the folder to expand (ends in `'/'`).
 * @param config - Storage action config.
 * @param locationPrefix - Current browse-location prefix `P`; each file's
 *   `relativePath` is computed as `key.slice(P.length)`.
 * @param signal - Optional abort signal; when aborted between pages the loop
 *   throws an `AbortError` and no items are returned.
 */
/* eslint-disable max-params -- positional (folderKey, config, prefix, signal) signature is intentional and mirrors the abortable list-pagination pattern */
export const expandFolderToFiles = async (
  folderKey: string,
  config: ActionInputConfig,
  locationPrefix: string,
  signal?: AbortSignal
): Promise<DownloadHandlerData[]> => {
  /* eslint-enable max-params */
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

      const fileData: FileData = {
        key: item.path,
        id: crypto.randomUUID(),
        size: item.size!,
        lastModified: item.lastModified!,
        eTag: item.eTag,
        type: 'FILE',
      };

      files.push(createDownloadItem(fileData, locationPrefix));
    }

    nextToken = listNextToken;
  } while (nextToken);

  return files;
};
