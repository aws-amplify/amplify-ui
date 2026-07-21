import type { LocationItemData } from '../../../../actions';
import { list } from '../../../../storage-internal';
import {
  expandFolderToFiles,
  FileLimitError,
  getArchiveName,
  LARGE_DOWNLOAD_FILE_COUNT,
  resolveArchiveName,
} from '../utils';

jest.mock('aws-amplify', () => ({
  Amplify: { getConfig: jest.fn(() => ({})) },
}));

jest.mock('../../../../storage-internal');

const mockList = jest.mocked(list);

const mockConfig = {
  bucket: 'test-bucket',
  credentials: jest.fn().mockResolvedValue({ credentials: {} }),
  region: 'us-east-1',
  accountId: 'test-account',
  customEndpoint: undefined,
};

describe('expandFolderToFiles', () => {
  let uuidCounter = 0;

  beforeAll(() => {
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => `uuid-${uuidCounter++}` },
      configurable: true,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    uuidCounter = 0;
  });

  it('collects files across paginated nextToken pages', async () => {
    mockList
      .mockResolvedValueOnce({
        items: [{ path: 'photos/a.jpg' }],
        nextToken: 'token-1',
      })
      .mockResolvedValueOnce({
        items: [{ path: 'photos/b.jpg' }],
        nextToken: undefined,
      });

    const result = await expandFolderToFiles({
      folderKey: 'photos/',
      config: mockConfig,
      locationPrefix: '',
    });

    expect(list).toHaveBeenCalledTimes(2);
    expect(result.map((f) => f.key)).toEqual(['photos/a.jpg', 'photos/b.jpg']);
  });

  it('filters out directory markers (keys ending in "/")', async () => {
    mockList.mockResolvedValue({
      items: [
        { path: 'photos/a.jpg' },
        { path: 'photos/sub/' },
        { path: 'photos/b.jpg' },
        { path: 'photos/another/' },
      ],
      nextToken: undefined,
    });

    const result = await expandFolderToFiles({
      folderKey: 'photos/',
      config: mockConfig,
      locationPrefix: '',
    });

    expect(result).toHaveLength(2);
    expect(result.map((f) => f.key)).toEqual(['photos/a.jpg', 'photos/b.jpg']);
  });

  it('computes parent-relative relativePath and basename fileKey', async () => {
    mockList.mockResolvedValue({
      items: [{ path: 'parent/photos/vacation/beach.jpg' }],
      nextToken: undefined,
    });

    const result = await expandFolderToFiles({
      folderKey: 'parent/photos/',
      config: mockConfig,
      locationPrefix: 'parent/',
    });

    expect(result[0]).toEqual(
      expect.objectContaining({
        key: 'parent/photos/vacation/beach.jpg',
        relativePath: 'photos/vacation/beach.jpg',
        fileKey: 'beach.jpg',
        type: 'FILE',
      })
    );
    expect(result[0].id).toBeDefined();
  });

  it('preserves the folder namespace when browsing at the root prefix', async () => {
    mockList.mockResolvedValue({
      items: [{ path: 'photos/vacation/beach.jpg' }],
      nextToken: undefined,
    });

    const result = await expandFolderToFiles({
      folderKey: 'photos/',
      config: mockConfig,
      locationPrefix: '',
    });

    // At root (prefix ''), relativePath keeps the selected folder name.
    expect(result[0].relativePath).toBe('photos/vacation/beach.jpg');
  });

  it('returns [] for an empty folder', async () => {
    mockList.mockResolvedValue({ items: [], nextToken: undefined });

    const result = await expandFolderToFiles({
      folderKey: 'photos/',
      config: mockConfig,
      locationPrefix: '',
    });

    expect(result).toEqual([]);
  });

  it('yields distinct relativePath entries for same-named files across sibling folders', async () => {
    // Two folders 'a/' and 'b/' each contain 'report.pdf'. Expanded under the
    // root prefix (''), each file's relativePath must retain its parent folder
    // namespace so the two entries do NOT collide in the resulting zip.
    mockList.mockResolvedValueOnce({
      items: [{ path: 'a/report.pdf' }],
      nextToken: undefined,
    });
    const folderA = await expandFolderToFiles({
      folderKey: 'a/',
      config: mockConfig,
      locationPrefix: '',
    });

    mockList.mockResolvedValueOnce({
      items: [{ path: 'b/report.pdf' }],
      nextToken: undefined,
    });
    const folderB = await expandFolderToFiles({
      folderKey: 'b/',
      config: mockConfig,
      locationPrefix: '',
    });

    const combined = [...folderA, ...folderB];
    const relativePaths = combined.map((f) => f.relativePath);

    expect(relativePaths).toEqual(['a/report.pdf', 'b/report.pdf']);
    // No collision: every relativePath is unique.
    expect(new Set(relativePaths).size).toBe(relativePaths.length);
  });

  it('aborts between pages via the AbortSignal', async () => {
    const controller = new AbortController();

    // First page returns a nextToken but also aborts, so the loop should throw
    // before requesting the second page.
    mockList.mockImplementationOnce(() => {
      controller.abort();
      return Promise.resolve({
        items: [{ path: 'photos/a.jpg' }],
        nextToken: 'token-1',
      });
    });

    await expect(
      expandFolderToFiles({
        folderKey: 'photos/',
        config: mockConfig,
        locationPrefix: '',
        signal: controller.signal,
      })
    ).rejects.toMatchObject({ name: 'AbortError' });

    expect(list).toHaveBeenCalledTimes(1);
  });

  it('aborts before the first page when already aborted', async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      expandFolderToFiles({
        folderKey: 'photos/',
        config: mockConfig,
        locationPrefix: '',
        signal: controller.signal,
      })
    ).rejects.toMatchObject({ name: 'AbortError' });

    expect(list).not.toHaveBeenCalled();
  });

  it('allows a selection of exactly LARGE_DOWNLOAD_FILE_COUNT files', async () => {
    mockList.mockResolvedValue({
      items: Array.from({ length: LARGE_DOWNLOAD_FILE_COUNT }, (_, i) => ({
        path: `photos/f${i}.jpg`,
      })),
      nextToken: undefined,
    });

    const result = await expandFolderToFiles({
      folderKey: 'photos/',
      config: mockConfig,
      locationPrefix: '',
    });

    expect(result).toHaveLength(LARGE_DOWNLOAD_FILE_COUNT);
  });

  it('throws FileLimitError once the file count exceeds LARGE_DOWNLOAD_FILE_COUNT and stops paginating', async () => {
    // First page alone exceeds the cap; a second page must never be requested.
    mockList.mockResolvedValue({
      items: Array.from({ length: LARGE_DOWNLOAD_FILE_COUNT + 1 }, (_, i) => ({
        path: `photos/f${i}.jpg`,
      })),
      nextToken: 'token-1',
    });

    await expect(
      expandFolderToFiles({
        folderKey: 'photos/',
        config: mockConfig,
        locationPrefix: '',
      })
    ).rejects.toBeInstanceOf(FileLimitError);

    expect(list).toHaveBeenCalledTimes(1);
  });

  it('applies the cap to the COMBINED selection via a shared fileCounter', async () => {
    const fileCounter = { count: 0 };

    mockList.mockResolvedValueOnce({
      items: Array.from({ length: LARGE_DOWNLOAD_FILE_COUNT - 1 }, (_, i) => ({
        path: `a/f${i}.jpg`,
      })),
      nextToken: undefined,
    });
    await expandFolderToFiles({
      folderKey: 'a/',
      config: mockConfig,
      locationPrefix: '',
      fileCounter,
    });
    expect(fileCounter.count).toBe(LARGE_DOWNLOAD_FILE_COUNT - 1);

    // The second folder pushes the combined total past the cap on its 2nd file.
    mockList.mockResolvedValueOnce({
      items: [{ path: 'b/one.jpg' }, { path: 'b/two.jpg' }],
      nextToken: undefined,
    });
    await expect(
      expandFolderToFiles({
        folderKey: 'b/',
        config: mockConfig,
        locationPrefix: '',
        fileCounter,
      })
    ).rejects.toBeInstanceOf(FileLimitError);
  });

  it('short-circuits before listing when the shared fileCounter already exceeds the cap', async () => {
    const fileCounter = { count: LARGE_DOWNLOAD_FILE_COUNT + 1 };

    await expect(
      expandFolderToFiles({
        folderKey: 'photos/',
        config: mockConfig,
        locationPrefix: '',
        fileCounter,
      })
    ).rejects.toBeInstanceOf(FileLimitError);

    expect(list).not.toHaveBeenCalled();
  });

  it('does not count directory markers against the cap', async () => {
    const fileCounter = { count: LARGE_DOWNLOAD_FILE_COUNT - 1 };

    mockList.mockResolvedValue({
      items: [{ path: 'photos/sub/' }, { path: 'photos/a.jpg' }],
      nextToken: undefined,
    });

    const result = await expandFolderToFiles({
      folderKey: 'photos/',
      config: mockConfig,
      locationPrefix: '',
      fileCounter,
    });

    expect(result).toHaveLength(1);
    expect(fileCounter.count).toBe(LARGE_DOWNLOAD_FILE_COUNT);
  });
});

describe('getArchiveName', () => {
  it('uses the common ancestor when files share a nested parent dir', () => {
    expect(
      getArchiveName(['public/nested/one/pic.jpg', 'public/nested/two/pic.jpg'])
    ).toBe('nested');
  });

  it('uses the shallow common ancestor across mixed depths', () => {
    expect(
      getArchiveName([
        'public/nested/one/pic.jpg',
        'public/nested/two/pic.jpg',
        'public/images/pic.jpg',
        'public/pic.jpg',
      ])
    ).toBe('public');
  });

  it('uses the single shared folder for same-dir files', () => {
    expect(getArchiveName(['photos/a.jpg', 'photos/b.jpg'])).toBe('photos');
  });

  it('uses the deepest shared folder for a nested FILE selection', () => {
    expect(
      getArchiveName(['photos/vacation/1.jpg', 'photos/vacation/2.jpg'])
    ).toBe('vacation');
  });

  it('falls back to "download" for root-level files', () => {
    expect(getArchiveName(['a.jpg', 'b.jpg'])).toBe('download');
  });

  it('falls back to "download" for files with no shared ancestor', () => {
    expect(getArchiveName(['public/x.jpg', 'other/y.jpg'])).toBe('download');
  });

  it('falls back to "download" for an empty file list', () => {
    expect(getArchiveName([])).toBe('download');
  });

  it('falls back to "download" when the last common segment is empty (e.g. a//b.jpg)', () => {
    expect(getArchiveName(['a//b.jpg'])).toBe('download');
  });
});

describe('resolveArchiveName', () => {
  const folder = (key: string, id = key): LocationItemData => ({
    key,
    id,
    type: 'FOLDER',
  });
  const file = (key: string, id = key): LocationItemData => ({
    key,
    id,
    size: 1,
    lastModified: new Date(),
    type: 'FILE',
  });

  it('names a single-folder selection after the selected folder, not the file LCA', () => {
    // Selecting `photos/` whose files all live in `photos/vacation/` must
    // yield `photos`, the folder the download was initiated from.
    expect(
      resolveArchiveName(
        [folder('photos/')],
        ['photos/vacation/1.jpg', 'photos/vacation/2.jpg']
      )
    ).toBe('photos');
  });

  it('strips the trailing slash and uses the basename for nested single folders', () => {
    expect(
      resolveArchiveName(
        [folder('public/photos/')],
        ['public/photos/vacation/1.jpg']
      )
    ).toBe('photos');
  });

  it('keeps the LCA rule for a multi-folder selection', () => {
    expect(
      resolveArchiveName(
        [folder('public/a/'), folder('public/b/')],
        ['public/a/1.jpg', 'public/b/2.jpg']
      )
    ).toBe('public');
  });

  it('keeps the LCA rule for a mixed file and folder selection', () => {
    expect(
      resolveArchiveName(
        [folder('public/photos/'), file('public/pic.jpg')],
        ['public/photos/1.jpg', 'public/pic.jpg']
      )
    ).toBe('public');
  });

  it('keeps the canonical LCA behavior for FILE-only selections', () => {
    expect(
      resolveArchiveName(
        [file('public/nested/one/pic.jpg'), file('public/nested/two/pic.jpg')],
        ['public/nested/one/pic.jpg', 'public/nested/two/pic.jpg']
      )
    ).toBe('nested');
  });
});
