import { StatusCounts } from '../../../../tasks';
import { DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT } from '../default';
import { DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT } from '../locationDetailView';
import { DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT } from '../locationsView';
import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from '../shared';
import { DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT } from '../uploadView';

describe('DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT', () => {
  it('should match snapshot', () => {
    expect(DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT).toMatchSnapshot();
  });

  describe('DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationDetailView', () => {
    it('should have expected keys', () => {
      expect(
        DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationDetailView
      ).toMatchObject({
        getListResultsMessage: expect.any(Function),
        searchExhaustedMessage: expect.any(String),
        searchIncludeSubfoldersLabel: expect.any(String),
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
  });

  describe('DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationsView', () => {
    it('should match snapshot', () => {
      expect(
        DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationsView
      ).toMatchSnapshot();
    });

    it('returns string values from callbacks', () => {
      const { getListResultsMessage } =
        DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationsView;

      expect(
        typeof getListResultsMessage({
          bucket: '',
          permission: 'READ',
          prefix: '',
          id: '',
          type: 'PREFIX',
        })
      ).toBe('string');
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
});
