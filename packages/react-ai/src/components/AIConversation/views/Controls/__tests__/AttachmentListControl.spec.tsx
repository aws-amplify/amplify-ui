import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { InputContext } from '../../../context';
import {
  AttachmentControl,
  AttachmentListControl,
  RemoveButtonControl,
} from '../AttachmentListControl';

const MOCK_FILES = [
  new File(['file1'], 'file1.jpeg', { type: 'jpeg' }),
  new File(['file2'], 'file2.png', { type: 'png' }),
];

describe('AttachmentListControl', () => {
  it('renders an AttachmentListControl component', async () => {
    const result = render(<AttachmentListControl />);
    expect(result.container).toBeDefined();

    const attachmentList = await screen.findByRole('list');

    expect(attachmentList).toBeDefined();
  });

  it('renders AttachmentListControl with a list of attachments', async () => {
    render(
      <InputContext.Provider
        value={{ input: { files: MOCK_FILES }, setInput: () => {} }}
      >
        <AttachmentListControl />
      </InputContext.Provider>
    );

    const attachmentList = await screen.findByRole('list');
    const attachments = await screen.findAllByRole('listitem');

    expect(attachmentList).toBeDefined();
    expect(attachments).toBeDefined();
    expect(attachments).toHaveLength(2);
  });

  it.todo('onRemove works properly');
});

describe('AttachmentControl', () => {
  it('renders an AttachmentControl component', async () => {
    render(<AttachmentControl image={MOCK_FILES[0]} onRemove={() => {}} />);

    const attachment = await screen.findByRole('listitem');
    expect(attachment).toBeDefined();
  });

  it('renders an AttachmentControl component with the correct elements', async () => {
    render(<AttachmentControl image={MOCK_FILES[0]} onRemove={() => {}} />);

    const attachment = await screen.findByRole('listitem');
    const imageIcon = attachment.querySelector('svg');
    const removeButton = await screen.findByRole('button');
    const fileName = await screen.findByText(MOCK_FILES[0].name);
    expect(imageIcon).toBeDefined();
    expect(removeButton).toBeDefined();
    expect(fileName).toBeDefined();

    expect(imageIcon).toHaveAttribute('aria-hidden', 'true');
    expect(removeButton).toHaveAttribute('aria-label', 'Remove file');
  });
});

describe('RemoveButtonControl', () => {
  it('renders a RemoveButtonControl component', () => {
    render(<RemoveButtonControl onRemove={() => {}} />);
    const removeButton = screen.getByRole('button');
    expect(removeButton).toBeDefined();
  });

  it('renders a RemoveButtonControl component with the correct elements', () => {
    render(<RemoveButtonControl onRemove={() => {}} />);
    const removeButton = screen.getByRole('button');
    const removeIcon = removeButton.querySelector('svg');
    expect(removeButton).toBeDefined();
    expect(removeIcon).toBeDefined();
    expect(removeIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it('invokes onRemove on button click', () => {
    const onRemove = jest.fn();
    render(<RemoveButtonControl onRemove={onRemove} />);
    const removeButton = screen.getByRole('button');
    expect(removeButton).toBeDefined();

    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
