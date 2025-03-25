/* eslint-disable no-console */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from '../Form';

const setInput = jest.fn();
const input = {};
const handleSubmit = jest.fn();
const onValidate = jest.fn();

const defaultProps = {
  allowAttachments: true,
  setInput,
  input,
  handleSubmit,
  onValidate,
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

  it('updates input value through multiple change events with IME characters', async () => {
    const result = render(<Form {...defaultProps} />);
    expect(result.container).toBeDefined();

    const textInput: HTMLInputElement = screen.getByTestId('text-input');

    const preMatureInput = Object.defineProperty(textInput, 'value', {
      configurable: true,
      value: '你',
    });

    const completeInput = Object.defineProperty(textInput, 'value', {
      configurable: true,
      value: '你好',
    });

    await waitFor(() => fireEvent.change(textInput, preMatureInput));

    await waitFor(() => fireEvent.change(textInput, completeInput));

    expect(textInput.value).not.toBeNull();
    expect(textInput.value).toBe('你好');
  });

  it('updates input value correctly after IME composition successfully ends', async () => {
    const result = render(<Form {...defaultProps} />);
    expect(result.container).toBeDefined();

    const textInput: HTMLInputElement = screen.getByTestId('text-input');

    const preMatureInput = Object.defineProperty(textInput, 'value', {
      configurable: true,
      value: 'しあわせ',
    });

    const completeInput = Object.defineProperty(textInput, 'value', {
      configurable: true,
      value: '幸せならおkです',
    });

    await waitFor(() => {
      fireEvent.compositionStart(textInput);
      fireEvent.change(textInput, preMatureInput);
    });

    await waitFor(() => {
      fireEvent.compositionEnd(textInput, completeInput);
    });

    expect(textInput.value).not.toBeNull();
    expect(textInput.value).toBe('幸せならおkです');
  });
});
