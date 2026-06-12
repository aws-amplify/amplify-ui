import type { LocationItemData } from '../../../actions';

import { sortItems } from '../sortItems';
import type { SortConfig } from '../sortItems';

const folder1: LocationItemData = {
  key: 'beta-folder/',
  id: 'folder-1',
  type: 'FOLDER',
};

const folder2: LocationItemData = {
  key: 'alpha-folder/',
  id: 'folder-2',
  type: 'FOLDER',
};

const file1: LocationItemData = {
  key: 'prefix/charlie.txt',
  id: 'file-1',
  type: 'FILE',
  lastModified: new Date('2024-03-15'),
  size: 500,
};

const file2: LocationItemData = {
  key: 'prefix/alpha.png',
  id: 'file-2',
  type: 'FILE',
  lastModified: new Date('2024-01-01'),
  size: 1000,
};

const file3: LocationItemData = {
  key: 'prefix/beta.jpg',
  id: 'file-3',
  type: 'FILE',
  lastModified: new Date('2024-06-20'),
  size: 200,
};

const allItems: LocationItemData[] = [folder1, file1, folder2, file2, file3];

describe('sortItems', () => {
  describe('sort by name', () => {
    it('sorts ascending with folders first', () => {
      const config: SortConfig = { field: 'name', direction: 'ascending' };
      const result = sortItems(allItems, config);

      expect(result.map((i) => i.id)).toEqual([
        'folder-2',
        'folder-1',
        'file-2',
        'file-3',
        'file-1',
      ]);
    });

    it('sorts descending with files first', () => {
      const config: SortConfig = { field: 'name', direction: 'descending' };
      const result = sortItems(allItems, config);

      expect(result.map((i) => i.id)).toEqual([
        'file-1',
        'file-3',
        'file-2',
        'folder-1',
        'folder-2',
      ]);
    });
  });

  describe('sort by size', () => {
    it('sorts ascending with folders first', () => {
      const config: SortConfig = { field: 'size', direction: 'ascending' };
      const result = sortItems(allItems, config);

      const folderIds = result
        .filter((i) => i.type === 'FOLDER')
        .map((i) => i.id);
      const fileIds = result.filter((i) => i.type === 'FILE').map((i) => i.id);

      expect(folderIds).toEqual(['folder-1', 'folder-2']);
      expect(fileIds).toEqual(['file-3', 'file-1', 'file-2']);
    });

    it('sorts descending with files first', () => {
      const config: SortConfig = { field: 'size', direction: 'descending' };
      const result = sortItems(allItems, config);

      const fileIds = result.filter((i) => i.type === 'FILE').map((i) => i.id);
      const folderIds = result
        .filter((i) => i.type === 'FOLDER')
        .map((i) => i.id);

      expect(fileIds).toEqual(['file-2', 'file-1', 'file-3']);
      expect(folderIds).toEqual(['folder-1', 'folder-2']);
    });
  });

  describe('sort by last-modified', () => {
    it('sorts ascending with folders first', () => {
      const config: SortConfig = {
        field: 'last-modified',
        direction: 'ascending',
      };
      const result = sortItems(allItems, config);

      const fileIds = result.filter((i) => i.type === 'FILE').map((i) => i.id);

      expect(fileIds).toEqual(['file-2', 'file-1', 'file-3']);
    });

    it('sorts descending with files first', () => {
      const config: SortConfig = {
        field: 'last-modified',
        direction: 'descending',
      };
      const result = sortItems(allItems, config);

      expect(result[0].id).toBe('file-3');
      expect(result[1].id).toBe('file-1');
      expect(result[2].id).toBe('file-2');
    });
  });

  describe('sort by type', () => {
    it('sorts ascending by file extension', () => {
      const config: SortConfig = { field: 'type', direction: 'ascending' };
      const result = sortItems(allItems, config);

      const fileIds = result.filter((i) => i.type === 'FILE').map((i) => i.id);

      // jpg < png < txt
      expect(fileIds).toEqual(['file-3', 'file-2', 'file-1']);
    });
  });

  describe('edge cases', () => {
    it('returns empty array for empty input', () => {
      const config: SortConfig = { field: 'name', direction: 'ascending' };
      expect(sortItems([], config)).toEqual([]);
    });

    it('handles only folders', () => {
      const config: SortConfig = { field: 'name', direction: 'ascending' };
      const result = sortItems([folder1, folder2], config);
      expect(result.map((i) => i.id)).toEqual(['folder-2', 'folder-1']);
    });

    it('handles only files', () => {
      const config: SortConfig = { field: 'name', direction: 'ascending' };
      const result = sortItems([file1, file2, file3], config);
      expect(result.map((i) => i.id)).toEqual(['file-2', 'file-3', 'file-1']);
    });

    it('does not mutate the input array', () => {
      const items = [file2, file1];
      const config: SortConfig = { field: 'name', direction: 'ascending' };
      sortItems(items, config);
      expect(items[0].id).toBe('file-2');
      expect(items[1].id).toBe('file-1');
    });
  });
});
