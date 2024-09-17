import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from '../Form';

const setInput = jest.fn();
const input = {};
const handleSubmit = jest.fn();

describe('Form', () => {
  beforeEach(() => {
    setInput.mockClear();
    handleSubmit.mockClear();
  });

  it('renders a Form component with the correct elements', () => {
    const result = render(
      <Form
        allowAttachments
        setInput={setInput}
        input={input}
        handleSubmit={handleSubmit}
      />
    );
    expect(result.container).toBeDefined();

    const form = screen.findByRole('form');
    const buttons = screen.getAllByRole('button');
    const textInput = screen.getByTestId('text-input');
    const fileInput = screen.getByTestId('hidden-file-input');

    expect(form).toBeDefined();
    expect(buttons).toHaveLength(2);
    expect(textInput).toBeDefined();
    expect(fileInput).toBeDefined();
  });

  it('can upload files to the input', async () => {
    const result = render(
      <Form
        allowAttachments
        setInput={setInput}
        input={input}
        handleSubmit={handleSubmit}
      />
    );
    expect(result.container).toBeDefined();

    const fileInput: HTMLInputElement = screen.getByTestId('hidden-file-input');
    const testFile = new File(['file content'], 'file.txt', {
      type: 'text/plain',
    });
    File.prototype.text = jest.fn().mockResolvedValueOnce('foo.txt');
    await waitFor(() =>
      fireEvent.change(fileInput, {
        target: { files: [testFile] },
      })
    );
    expect(setInput).toHaveBeenCalledTimes(1);
    expect(fileInput.files).not.toBeNull();
    expect(fileInput.files![0]).toStrictEqual(testFile);
  });
});
