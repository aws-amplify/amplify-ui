import { DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT } from '../en/default';
import { DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT } from '../en/locationDetailView';
import { DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT } from '../en/locationsView';
import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from '../en/shared';
import { DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT } from '../en/uploadView';

describe('DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT', () => {
  it('should match snapshot', () => {
    expect(DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT).toMatchSnapshot();
  });
});

describe('DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT', () => {
  it('should have expected keys', () => {
    expect(DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT).toMatchObject({
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
  });

  it('should match snapshot', () => {
    expect(DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT).toMatchSnapshot();
  });
});

describe('DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT', () => {
  it('should match snapshot', () => {
    expect(DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT).toMatchSnapshot();
  });
});

describe('DEFAULT_ACTION_VIEW_DISPLAY_TEXT', () => {
  it('should match snapshot', () => {
    expect(DEFAULT_ACTION_VIEW_DISPLAY_TEXT).toMatchSnapshot();
  });
});

describe('DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT', () => {
  it('should match snapshot', () => {
    expect(DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT).toMatchSnapshot();
  });
});
