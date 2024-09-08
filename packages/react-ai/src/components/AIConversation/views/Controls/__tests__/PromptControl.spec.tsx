import React from 'react';
import { render } from '@testing-library/react';
import { PromptControl } from '../PromptControl';
import { SuggestedPromptProvider } from '../../../context/SuggestedPromptsContext';
import { ConversationInputContext } from '../../../context';

const MOCK_PROMPTS = [
  {
    header: 'Help me find a rental',
    inputText: 'Find a rental with a pool',
  },
  {
    header: 'Help me find a rental',
    inputText: 'Find a rental with a basketball court',
  },
];

describe('PromptControl', () => {
  it('renders a PromptControl element', () => {
    const result = render(<PromptControl />);
    expect(result.container).toBeDefined();
  });

  it('renders a PromptControl element with prompts', () => {
    const result = render(
      <SuggestedPromptProvider suggestedPrompts={MOCK_PROMPTS}>
        <PromptControl />
      </SuggestedPromptProvider>
    );
    expect(result.container).toBeDefined();
    expect(result.findAllByText(MOCK_PROMPTS[0].header)).toBeDefined();
  });

  it('renders a PromptControl element with prompts and updates input state', async () => {
    const result = render(
      <SuggestedPromptProvider suggestedPrompts={MOCK_PROMPTS}>
        <ConversationInputContext.Provider value={{ setInput: () => {} }}>
          <PromptControl />
        </ConversationInputContext.Provider>
      </SuggestedPromptProvider>
    );
    expect(result.container).toBeDefined();
    const button = await result.findByRole('button', {
      name: MOCK_PROMPTS[0].inputText,
    });
    button.click();
  });
});
