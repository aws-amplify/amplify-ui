import {
  UPLOAD_ACTION_SCENARIOS,
  UPLOAD_FILES_VALIDATION_SCENARIOS,
} from './scenarios';
import { DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT } from '../uploadView';

describe('UploadView display text values', () => {
  it('should match snapshot values', () => {
    expect(DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT).toMatchSnapshot();
  });

  it.each(UPLOAD_ACTION_SCENARIOS)(
    '`getActionCompleteMessage` returns the expected values in the %s scenario',
    (_, counts) => {
      const { getActionCompleteMessage } = DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT;

      expect(getActionCompleteMessage({ counts })).toMatchSnapshot();
    }
  );

  it.each(UPLOAD_FILES_VALIDATION_SCENARIOS)(
    '`getFilesValidationMessage` returns expected values in the %s scenario',
    (_, invalidFiles) => {
      const { getFilesValidationMessage } = DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT;

      expect(getFilesValidationMessage({ invalidFiles })).toMatchSnapshot();
    }
  );
});
