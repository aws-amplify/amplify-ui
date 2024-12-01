import { CREATE_FOLDER_ACTION_SCENARIOS } from './scenarios';
import { DEFAULT_CREATE_FOLDER_VIEW_DISPLAY_TEXT } from '../createFolderView';

describe('CreateFolderView display text values', () => {
  it('should match snapshot values', () => {
    expect(DEFAULT_CREATE_FOLDER_VIEW_DISPLAY_TEXT).toMatchSnapshot();
  });

  it.each(CREATE_FOLDER_ACTION_SCENARIOS)(
    '`getActionCompleteMessage` returns the expected values in the %s scenario',
    (_, counts) => {
      const { getActionCompleteMessage } =
        DEFAULT_CREATE_FOLDER_VIEW_DISPLAY_TEXT;

      expect(getActionCompleteMessage({ counts })).toMatchSnapshot();
    }
  );
});
