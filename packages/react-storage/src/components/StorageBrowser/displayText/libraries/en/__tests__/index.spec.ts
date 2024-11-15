import { FolderData } from '../../../../actions';
import {
  LOCATION_PERMISSION_VALUES,
  generateCombinations,
} from '../../../../actions/__testUtils__/permissions';
import { StatusCounts } from '../../../../tasks';

import { DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT } from '../default';

describe('DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT', () => {
  it('should match snapshot', () => {
    expect(DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT).toMatchSnapshot();
  });

  describe('DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.CreateFolderView', () => {
    it('should match snapshot', () => {
      expect(
        DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.CreateFolderView
      ).toMatchSnapshot();
    });

    it('returns string values from callbacks', () => {
      const { getActionCompleteMessage, getValidationMessage } =
        DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.CreateFolderView;

      expect(typeof getValidationMessage('foldername')).toBe('string');

      expect(getActionCompleteMessage({} as StatusCounts)).toBe(
        'Folder created.'
      );

      expect(
        getActionCompleteMessage({ OVERWRITE_PREVENTED: 1 } as StatusCounts)
      ).toBe('A folder already exists with the provided name');

      expect(getActionCompleteMessage({ FAILED: 1 } as StatusCounts)).toBe(
        'There was an issue creating the folder.'
      );
    });
  });

  describe('DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.CopyView', () => {
    it('should match snapshot', () => {
      expect(DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.CopyView).toMatchSnapshot();
    });

    it('returns string values from callbacks', () => {
      const {
        getActionCompleteMessage,
        getFolderSelectedMessage,
        getFolderListResultsMessage,
      } = DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.CopyView;

      expect(typeof getActionCompleteMessage({} as StatusCounts)).toBe(
        'string'
      );
      expect(typeof getFolderSelectedMessage('')).toBe('string');

      expect(getFolderListResultsMessage({ folders: [] })).toBe(
        'No subfolders found within selected folder.'
      );

      const query = 'query';
      expect(getFolderListResultsMessage({ folders: [], query })).toBe(
        `No folders found matching "${query}"`
      );

      const defaultMessage = 'oh nooooo';
      expect(
        getFolderListResultsMessage({
          folders: [{} as FolderData],
          defaultMessage,
        })
      ).toBe(defaultMessage);
    });

    it('returns correct string for getFolderSelectedMessage', () => {
      const { getFolderSelectedMessage } =
        DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.CopyView;

      expect(getFolderSelectedMessage('path/to/somewhere')).toBe(
        `Current folder selected: path/to/somewhere. There are no additional folders under this path.`
      );
    });
  });

  describe('DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.DeleteView', () => {
    it('should match snapshot', () => {
      expect(DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.DeleteView).toMatchSnapshot();
    });

    it('returns string values from callbacks', () => {
      const { getActionCompleteMessage } =
        DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.DeleteView;

      expect(typeof getActionCompleteMessage({} as StatusCounts)).toBe(
        'string'
      );
    });
  });

  describe('DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.UploadView', () => {
    it('should match snapshot', () => {
      expect(DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.UploadView).toMatchSnapshot();
    });

    it('returns string values from callbacks', () => {
      const { getActionCompleteMessage } =
        DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.UploadView;

      expect(typeof getActionCompleteMessage({} as StatusCounts)).toBe(
        'string'
      );
    });
  });

  describe('DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationDetailView', () => {
    it('should have expected keys', () => {
      expect(
        DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationDetailView
      ).toMatchObject({
        getListResultsMessage: expect.any(Function),
        searchExhaustedMessage: expect.any(String),
        searchSubfoldersToggleLabel: expect.any(String),
        searchPlaceholder: expect.any(String),
        tableColumnLastModifiedHeader: expect.any(String),
        tableColumnNameHeader: expect.any(String),
        tableColumnSizeHeader: expect.any(String),
        tableColumnTypeHeader: expect.any(String),
        title: expect.any(Function),
      });

      expect(
        DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationDetailView
      ).toMatchSnapshot();
    });

    it('returns string values from callbacks', () => {
      const { getListResultsMessage } =
        DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationDetailView;

      expect(
        typeof getListResultsMessage({
          key: '',
          id: '',
          lastModified: new Date(),
          size: 1000,
          type: 'FILE',
        })
      ).toBe('string');
    });

    it('returns correct string for title', () => {
      const { title } = DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationDetailView;

      expect(
        title({
          current: {
            bucket: 'test-bucket',
            permissions: ['list'],
            id: '123',
            prefix: '',
            type: 'PREFIX',
          },
          path: '',
          key: 'path/to/somewhere',
        })
      ).toBe(`path/to/somewhere`);

      expect(
        title({
          current: {
            bucket: 'test-bucket',
            permissions: ['list'],
            id: '123',
            prefix: '',
            type: 'PREFIX',
          },
          path: '',
          key: '',
        })
      ).toBe(`test-bucket`);
    });
  });

  describe('DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationsView', () => {
    it('should match snapshot', () => {
      expect(
        DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationsView
      ).toMatchSnapshot();
    });

    it('returns string values from callbacks', () => {
      const { getListResultsMessage, getDownloadLabel, getPermissionName } =
        DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationsView;

      expect(
        typeof getListResultsMessage({
          bucket: '',
          permissions: ['get', 'list'],
          prefix: '',
          id: '',
          type: 'PREFIX',
        })
      ).toBe('string');
      for (const permission of generateCombinations(
        LOCATION_PERMISSION_VALUES
      )) {
        expect(typeof getPermissionName(permission)).toBe('string');
      }
      // @ts-expect-error
      // testing unknown permission type
      expect(typeof getPermissionName(['custom'])).toBe('string');
      expect(typeof getPermissionName([])).toBe('string');

      expect(typeof getDownloadLabel('my.jpg')).toBe('string');
    });
  });
});
