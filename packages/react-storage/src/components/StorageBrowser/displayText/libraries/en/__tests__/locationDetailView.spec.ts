import { LIST_ITEMS_SCENARIOS } from './scenarios';
import { DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT } from '../locationDetailView';

describe('LocationDetailView display text', () => {
  it('should match snapshot values', () => {
    expect(DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT).toMatchSnapshot();
  });

  it.each(LIST_ITEMS_SCENARIOS)(
    '`getListResultsMessage` returns the expected values in the %s scenario',
    (_, data) => {
      const { getListItemsResultMessage } =
        DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT;

      expect(getListItemsResultMessage(data)).toMatchSnapshot();
    }
  );

  it('returns correct string for title', () => {
    const { getTitle } = DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT;

    expect(
      getTitle({
        current: {
          bucket: 'test-bucket',
          permissions: ['get', 'list'],
          id: '123',
          prefix: '',
          type: 'PREFIX',
        },
        path: '',
        key: 'path/to/somewhere',
      })
    ).toBe(`path/to/somewhere`);

    expect(
      getTitle({
        current: {
          bucket: 'test-bucket',
          permissions: ['get', 'list'],
          id: '123',
          prefix: '',
          type: 'PREFIX',
        },
        path: '',
        key: '',
      })
    ).toBe(`test-bucket`);
  });

  describe('filePreview display text', () => {
    const { filePreview } = DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT;

    it('should have all required file preview text properties', () => {
      expect(filePreview).toHaveProperty('closeButtonLabel');
      expect(filePreview).toHaveProperty('filePreviewTitle');
      expect(filePreview).toHaveProperty('fileInformationTitle');
      expect(filePreview).toHaveProperty('errorMessage');
      expect(filePreview).toHaveProperty('sizeLimitMessage');
      expect(filePreview).toHaveProperty('keyLabel');
      expect(filePreview).toHaveProperty('sizeLabel');
      expect(filePreview).toHaveProperty('versionIdLabel');
      expect(filePreview).toHaveProperty('lastModifiedLabel');
      expect(filePreview).toHaveProperty('entityTagLabel');
      expect(filePreview).toHaveProperty('typeLabel');
      expect(filePreview).toHaveProperty('unknownValue');
      expect(filePreview).toHaveProperty('errorDescription');
      expect(filePreview).toHaveProperty('unsupportedFileDescription');
      expect(filePreview).toHaveProperty('filePrefix');
      expect(filePreview).toHaveProperty('retryButtonLabel');
      expect(filePreview).toHaveProperty('downloadButtonLabel');
      expect(filePreview).toHaveProperty('loadingTextContent');
      expect(filePreview).toHaveProperty('getTextErrorMessage');
      expect(filePreview).toHaveProperty('emptyFileMessage');
    });

    it('should have correct default values', () => {
      expect(filePreview.closeButtonLabel).toBe('Close');
      expect(filePreview.filePreviewTitle).toBe('File Preview');
      expect(filePreview.fileInformationTitle).toBe('File Information');
      expect(filePreview.errorMessage).toBe('Something went wrong');
      expect(filePreview.retryButtonLabel).toBe('Retry');
      expect(filePreview.downloadButtonLabel).toBe('Download');
    });

    it('should return formatted error message', () => {
      const error = 'Network timeout';
      expect(filePreview.getTextErrorMessage(error)).toBe(
        'Error loading file: Network timeout'
      );
    });
  });
});
