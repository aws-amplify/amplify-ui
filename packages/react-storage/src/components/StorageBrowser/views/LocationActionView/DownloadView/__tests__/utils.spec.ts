import { list } from '../../../../storage-internal';
import { expandFolderToFiles, getArchiveName } from '../utils';

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

    const result = await expandFolderToFiles('photos/', mockConfig, '');

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

    const result = await expandFolderToFiles('photos/', mockConfig, '');

    expect(result).toHaveLength(2);
    expect(result.map((f) => f.key)).toEqual(['photos/a.jpg', 'photos/b.jpg']);
  });

  it('computes parent-relative relativePath and basename fileKey', async () => {
    mockList.mockResolvedValue({
      items: [{ path: 'parent/photos/vacation/beach.jpg' }],
      nextToken: undefined,
    });

    const result = await expandFolderToFiles(
      'parent/photos/',
      mockConfig,
      'parent/'
    );

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

    const result = await expandFolderToFiles('photos/', mockConfig, '');

    // At root (prefix ''), relativePath keeps the selected folder name.
    expect(result[0].relativePath).toBe('photos/vacation/beach.jpg');
  });

  it('returns [] for an empty folder', async () => {
    mockList.mockResolvedValue({ items: [], nextToken: undefined });

    const result = await expandFolderToFiles('photos/', mockConfig, '');

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
    const folderA = await expandFolderToFiles('a/', mockConfig, '');

    mockList.mockResolvedValueOnce({
      items: [{ path: 'b/report.pdf' }],
      nextToken: undefined,
    });
    const folderB = await expandFolderToFiles('b/', mockConfig, '');

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
      expandFolderToFiles('photos/', mockConfig, '', controller.signal)
    ).rejects.toMatchObject({ name: 'AbortError' });

    expect(list).toHaveBeenCalledTimes(1);
  });

  it('aborts before the first page when already aborted', async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      expandFolderToFiles('photos/', mockConfig, '', controller.signal)
    ).rejects.toMatchObject({ name: 'AbortError' });

    expect(list).not.toHaveBeenCalled();
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

  it('uses the deepest shared folder for a nested selection', () => {
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
