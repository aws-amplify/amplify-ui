import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ConversationInputContext } from '../../../context';
import {
  AttachmentControl,
  AttachmentListControl,
  RemoveButtonControl,
} from '../AttachmentListControl';

interface Input {
  text?: string;
  files?: File[];
}

const MOCK_FILES = [
  new File(['some file content'], 'file1.jpeg', { type: 'jpeg' }),
  new File(['more file content'], 'file2.png', { type: 'png' }),
  new File(['this is file content also'], 'file2.png', { type: 'png' }),
];

const AttachmentListWithContext = () => {
  const [input, setInput] = React.useState<Input | undefined>({
    files: MOCK_FILES,
  });
  const value = React.useMemo(() => {
    return { input: input, setInput: setInput };
  }, [input]);
  return (
    <ConversationInputContext.Provider value={value}>
      <AttachmentListControl />
    </ConversationInputContext.Provider>
  );
};

describe('AttachmentListControl', () => {
  it('renders an AttachmentListControl component', async () => {
    const result = render(<AttachmentListControl />);
    expect(result.container).toBeDefined();

    const attachmentList = await screen.findByRole('list');

    expect(attachmentList).toBeDefined();
  });

  it('renders AttachmentListControl with a list of attachments', async () => {
    render(<AttachmentListWithContext />);

    const attachmentList = await screen.findByRole('list');
    const attachments = await screen.findAllByRole('listitem');

    expect(attachmentList).toBeDefined();
    expect(attachments).toBeDefined();
    expect(attachments).toHaveLength(3);
  });

  it('removes an attachment from the list when the remove button is clicked', async () => {
    render(<AttachmentListWithContext />);
    const attachments = await screen.findAllByRole('listitem');
    const removeButtons = await screen.findAllByRole('button');
    expect(attachments).toHaveLength(3);
    expect(removeButtons).toHaveLength(3);

    const removeFirstButton = removeButtons[0];
    expect(removeFirstButton).toBeDefined();
    expect(attachments[0]).toHaveTextContent(MOCK_FILES[0].name);

    fireEvent.click(removeFirstButton);

    const updatedAttachments = await screen.findAllByRole('listitem');
    expect(updatedAttachments).toHaveLength(2);
    expect(updatedAttachments[0]).not.toHaveTextContent(MOCK_FILES[0].name);
  });
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
