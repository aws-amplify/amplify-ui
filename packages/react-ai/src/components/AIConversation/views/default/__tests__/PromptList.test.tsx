import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { PromptList } from '../PromptList';
import { ComponentClassName } from '@aws-amplify/ui';
import { ConversationInputContext } from '../../../context';

describe('PromptList', () => {
  const mockSetInput = jest.fn<
    ReturnType<Required<ConversationInputContext>['setInput']>,
    Parameters<Required<ConversationInputContext>['setInput']>
  >();

  it('renders without crashing', () => {
    const { container } = render(
      <PromptList setInput={mockSetInput} suggestedPrompts={[]} />
    );
    expect(container).toBeTruthy();
  });

  it('renders suggested prompts', () => {
    const suggestedPrompts = [
      { inputText: 'Prompt 1', component: 'Prompt 1' },
      { inputText: 'Prompt 2', component: 'Prompt 2' },
    ];
    render(
      <PromptList setInput={mockSetInput} suggestedPrompts={suggestedPrompts} />
    );

    expect(screen.getByText('Prompt 1')).toBeInTheDocument();
    expect(screen.getByText('Prompt 2')).toBeInTheDocument();
  });

  it('calls setInput with the correct prompt when a button is clicked', () => {
    const suggestedPrompts = [
      { inputText: 'Prompt 1', component: 'Prompt 1' },
      { inputText: 'Prompt 2', component: 'Prompt 2' },
    ];
    render(
      <PromptList setInput={mockSetInput} suggestedPrompts={suggestedPrompts} />
    );

    fireEvent.click(screen.getByText('Prompt 1'));
    expect(mockSetInput).toHaveBeenCalledWith(expect.any(Function));

    // Simulate the function call
    const setInputCall = mockSetInput.mock.calls[0][0] as Function;
    const result = setInputCall({ text: 'previous text' });
    expect(result).toEqual({ text: 'Prompt 1' });
  });

  it('applies the correct CSS class to the buttons', () => {
    const suggestedPrompts = [{ inputText: 'Prompt 1', component: 'Prompt 1' }];
    render(
      <PromptList setInput={mockSetInput} suggestedPrompts={suggestedPrompts} />
    );

    const button = screen.getByText('Prompt 1');
    expect(button).toHaveClass(ComponentClassName.AIConversationPrompt);
  });

  it('renders nothing when suggestedPrompts is empty', () => {
    const { container } = render(
      <PromptList setInput={mockSetInput} suggestedPrompts={[]} />
    );
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
