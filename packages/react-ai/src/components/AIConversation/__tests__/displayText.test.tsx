import { defaultAIConversationDisplayTextEn } from '../displayText';

describe('displayText', () => {
  it('should match snapshot', () => {
    const sortedDisplayText = Object.keys(
      defaultAIConversationDisplayTextEn
    ).sort();

    expect(sortedDisplayText).toMatchSnapshot();
  });
});
