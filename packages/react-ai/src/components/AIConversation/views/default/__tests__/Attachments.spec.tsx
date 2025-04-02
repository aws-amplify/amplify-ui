import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Attachments } from '../Attachments';
import { ComponentClassName } from '@aws-amplify/ui';
import { ConversationInputContextProps } from '../../../context';

describe('Attachments', () => {
  const mockSetInput = jest.fn<
    ReturnType<Required<ConversationInputContextProps>['setInput']>,
    Parameters<Required<ConversationInputContextProps>['setInput']>
  >();

  it('renders without crashing', () => {
    const { container } = render(
      <Attachments setInput={mockSetInput} files={[]} />
    );
    expect(container).toBeTruthy();
  });
  it('renders the correct number of attachments', () => {
    const files = [
      new File([''], 'file1.txt', { type: 'text/plain' }),
      new File([''], 'file2.txt', { type: 'text/plain' }),
    ];
    const { container } = render(
      <Attachments setInput={mockSetInput} files={files} />
    );
    const attachments = container.getElementsByClassName(
      ComponentClassName.AIConversationAttachment
    );
    expect(attachments.length).toBe(2);
  });
  it('calls setInput when an attachment is removed', () => {
    const files = [
      new File([''], 'file1.txt', { type: 'text/plain' }),
      new File([''], 'file2.txt', { type: 'text/plain' }),
    ];
    const { container } = render(
      <Attachments setInput={mockSetInput} files={files} />
    );
    const removeButton = container.getElementsByClassName(
      ComponentClassName.AIConversationAttachmentRemove
    )[0];
    fireEvent.click(removeButton);
    expect(mockSetInput).toHaveBeenCalled();
  });
});
