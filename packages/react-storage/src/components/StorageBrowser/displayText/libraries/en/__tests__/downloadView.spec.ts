import { ACTION_SCENARIOS } from './scenarios';
import { DEFAULT_DOWNLOAD_VIEW_DISPLAY_TEXT } from '../downloadView';

describe('DownloadView display text values', () => {
  it('should match snapshot values', () => {
    expect(DEFAULT_DOWNLOAD_VIEW_DISPLAY_TEXT).toMatchSnapshot();
  });

  it('exposes the enumeration / error / no-files / too-many-files message copy', () => {
    expect(DEFAULT_DOWNLOAD_VIEW_DISPLAY_TEXT).toMatchObject({
      enumeratingMessage: 'Listing folder contents…',
      enumerationErrorMessage:
        'Failed to list folder contents. Click Download to try again.',
      noFilesMessage: 'The selected folders contain no files to download.',
      tooManyFilesMessage:
        'The selection exceeds the maximum of 5000 files for a single download. Download folders in smaller batches.',
    });
  });

  it.each(ACTION_SCENARIOS)(
    '`getActionCompleteMessage` returns the expected values in the %s scenario',
    (_, counts) => {
      const { getActionCompleteMessage } = DEFAULT_DOWNLOAD_VIEW_DISPLAY_TEXT;

      expect(getActionCompleteMessage({ counts })).toMatchSnapshot();
    }
  );
});
