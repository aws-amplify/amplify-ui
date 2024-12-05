import { ACTION_SCENARIOS } from './scenarios';
import { DEFAULT_DELETE_VIEW_DISPLAY_TEXT } from '../deleteView';

describe('CopyView display text values', () => {
  it('should match snapshot values', () => {
    expect(DEFAULT_DELETE_VIEW_DISPLAY_TEXT).toMatchSnapshot();
  });

  it.each(ACTION_SCENARIOS)(
    '`getActionCompleteMessage` returns the expected values in the %s scenario',
    (_, counts) => {
      const { getActionCompleteMessage } = DEFAULT_DELETE_VIEW_DISPLAY_TEXT;

      expect(getActionCompleteMessage({ counts })).toMatchSnapshot();
    }
  );
});
