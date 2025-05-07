/* eslint-disable no-console */
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { Form } from '../Form';

const setInput = jest.fn();
const input = {};
const handleSubmit = jest.fn();
const onValidate = jest.fn();
const onCompositionStart = jest.fn();
const onCompositionEnd = jest.fn();
const onKeyDown = jest.fn();

const defaultProps = {
  allowAttachments: true,
  setInput,
  input,
  handleSubmit,
  onValidate,
  onCompositionStart,
  onCompositionEnd,
  onKeyDown,
};

describe('Form', () => {
  beforeEach(() => {
    setInput.mockClear();
    handleSubmit.mockClear();
  });

  it('renders a Form component with the correct elements', () => {
    const result = render(<Form {...defaultProps} />);
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
    const result = render(<Form {...defaultProps} />);
    expect(result.container).toBeDefined();

    const fileInput: HTMLInputElement = screen.getByTestId('hidden-file-input');
    const testFile = new File(['file content'], 'file.txt', {
      type: 'text/plain',
    });
    File.prototype.text = jest.fn().mockResolvedValueOnce('foo.txt');
    File.prototype.arrayBuffer = jest
      .fn()
      .mockResolvedValueOnce(Buffer.from([]));
    await waitFor(() =>
      fireEvent.change(fileInput, {
        target: { files: [testFile] },
      })
    );
    expect(onValidate).toHaveBeenCalledTimes(1);
    expect(fileInput.files).not.toBeNull();
    expect(fileInput.files![0]).toStrictEqual(testFile);
  });

  it('updates IME input with composition completion', async () => {
    const input = { currentTarget: { value: '你' } };
    const updatedInput = { currentTarget: { value: '你好' } };

    const result = render(<Form {...defaultProps} />);
    expect(result.container).toBeDefined();

    const textFieldContainer = screen.getByTestId('text-input');

    const textInput =
      textFieldContainer.querySelector('textarea') ??
      within(textFieldContainer).getByRole('textbox');

    await waitFor(() => {
      fireEvent.compositionStart(textInput);
      fireEvent.compositionEnd(textInput, input);
    });

    await waitFor(() => {
      fireEvent.compositionEnd(textInput, updatedInput);
    });

    expect(setInput).toHaveBeenCalledTimes(2);
  });

  it('updates IME input with composition update', async () => {
    const input = { currentTarget: { value: 'しあわせ' } };
    const updatedInput = { currentTarget: { value: '幸せならおkです' } };

    const result = render(<Form {...defaultProps} />);
    expect(result.container).toBeDefined();

    const textFieldContainer = screen.getByTestId('text-input');

    const textInput =
      textFieldContainer.querySelector('textarea') ??
      within(textFieldContainer).getByRole('textbox');

    await waitFor(() => {
      fireEvent.compositionStart(textInput);
      fireEvent.compositionUpdate(textInput, input);
    });

    await waitFor(() => {
      fireEvent.compositionUpdate(textInput, updatedInput);
    });

    expect(setInput).toHaveBeenCalledTimes(2);
  });
});
