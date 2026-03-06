import { getSelectionSummary } from '../utils';

describe('locationItems utils', () => {
  describe('getSelectionSummary', () => {
    it('returns correct summary for files only', () => {
      const items = [
        {
          id: '1',
          key: 'file1.txt',
          type: 'FILE' as const,
          size: 100,
          lastModified: new Date(),
        },
        {
          id: '2',
          key: 'file2.txt',
          type: 'FILE' as const,
          size: 200,
          lastModified: new Date(),
        },
      ];

      const result = getSelectionSummary(items);

      expect(result).toEqual({
        files: 2,
        folders: 0,
        hasFiles: true,
        hasFolders: false,
        isMixed: false,
        total: 2,
      });
    });

    it('returns correct summary for folders only', () => {
      const items = [
        {
          id: '1',
          key: 'folder1/',
          type: 'FOLDER' as const,
        },
        {
          id: '2',
          key: 'folder2/',
          type: 'FOLDER' as const,
        },
      ];

      const result = getSelectionSummary(items);

      expect(result).toEqual({
        files: 0,
        folders: 2,
        hasFiles: false,
        hasFolders: true,
        isMixed: false,
        total: 2,
      });
    });

    it('returns correct summary for mixed items', () => {
      const items = [
        {
          id: '1',
          key: 'file.txt',
          type: 'FILE' as const,
          size: 100,
          lastModified: new Date(),
        },
        {
          id: '2',
          key: 'folder/',
          type: 'FOLDER' as const,
        },
      ];

      const result = getSelectionSummary(items);

      expect(result).toEqual({
        files: 1,
        folders: 1,
        hasFiles: true,
        hasFolders: true,
        isMixed: true,
        total: 2,
      });
    });

    it('returns zero counts for empty array', () => {
      const result = getSelectionSummary([]);

      expect(result).toEqual({
        files: 0,
        folders: 0,
        hasFiles: false,
        hasFolders: false,
        isMixed: false,
        total: 0,
      });
    });
  });
});
