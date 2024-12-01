import { ACTION_SCENARIOS, LIST_FOLDERS_SCENARIOS } from './scenarios';
import { DEFAULT_COPY_VIEW_DISPLAY_TEXT } from '../copyView';

describe('CopyView display text values', () => {
  it('should match snapshot values', () => {
    expect(DEFAULT_COPY_VIEW_DISPLAY_TEXT).toMatchSnapshot();
  });

  it.each(ACTION_SCENARIOS)(
    '`getActionCompleteMessage` returns the expected values in the %s scenario',
    (_, counts) => {
      const { getActionCompleteMessage } = DEFAULT_COPY_VIEW_DISPLAY_TEXT;

      expect(getActionCompleteMessage({ counts })).toMatchSnapshot();
    }
  );

  it.each(LIST_FOLDERS_SCENARIOS)(
    '`getListFoldersResultsMessage` returns the expected values in the %s scenario',
    (_, data) => {
      const { getListFoldersResultsMessage } = DEFAULT_COPY_VIEW_DISPLAY_TEXT;

      expect(getListFoldersResultsMessage(data)).toMatchSnapshot();
    }
  );
});
