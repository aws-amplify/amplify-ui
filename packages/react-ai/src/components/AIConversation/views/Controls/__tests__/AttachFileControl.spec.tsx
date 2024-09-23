import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ConversationInputContext } from '../../../context';
import { AttachFileControl } from '../AttachFileControl';

const inputContextValue = {
  setInput: jest.fn(),
};

describe('AttachFileControl', () => {
  beforeEach(() => {
    inputContextValue.setInput.mockClear();
  });

  it('renders an AttachFileControl component with the correct elements', () => {
    const result = render(<AttachFileControl />);
    expect(result.container).toBeDefined();

    const attachButton = screen.getByRole('button');
    const attachIcon = attachButton.querySelector('svg');
    const fileInput = screen.getByTestId('hidden-file-input');

    expect(attachButton).toBeDefined();
    expect(attachIcon).toBeDefined();
    expect(fileInput).toBeDefined();
  });

  it('renders AttachFileControl with the correct accessibility roles', () => {
    render(<AttachFileControl />);

    const attachButton = screen.getByRole('button');
    const attachIcon = attachButton.querySelector('svg');

    expect(attachButton).toHaveAttribute('aria-label', 'Attach file');
    expect(attachIcon).toBeDefined();
    expect(attachIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it('clicking the attach button triggers a click event on the file input', () => {
    render(<AttachFileControl />);

    const attachButton = screen.getByRole('button');
    const fileInput = screen.getByTestId('hidden-file-input');

    const clickSpy = jest.spyOn(fileInput, 'click');

    fireEvent.click(attachButton);
    expect(clickSpy).toHaveBeenCalled();
    expect(fileInput).toHaveProperty('value', '');

    clickSpy.mockRestore();
  });

  it('triggers a file change event when selecting a file', () => {
    render(
      <ConversationInputContext.Provider value={inputContextValue}>
        <AttachFileControl />
      </ConversationInputContext.Provider>
    );

    const file = new File(['file content'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('hidden-file-input');

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(inputContextValue.setInput).toHaveBeenCalled();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const updateFunction = inputContextValue.setInput.mock.calls[0][0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const updatedState = updateFunction({ files: [] });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(updatedState.files).toEqual([file]);
  });
});
