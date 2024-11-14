import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { FileSelectOptions, SelectType, useFileSelect } from '../FileSelect';

const TestComponent = ({
  onChange,
  onSelect,
  type = 'FILE',
}: {
  onChange?: FileSelectOptions['onChange'];
  onSelect?: (files: File[]) => void;
  type?: SelectType;
}) => {
  const [fileSelect, handleSelect] = useFileSelect(onSelect);

  return (
    <>
      {fileSelect}
      <button
        onClick={() => {
          handleSelect(type, { onChange });
        }}
      />
    </>
  );
};

describe('useFileSelect', () => {
  it.each(['FILE', 'FOLDER'] as const)(
    'behaves as expected when provided a %s type',
    async (type) => {
      const user = userEvent.setup();
      const onSelect = jest.fn();

      render(<TestComponent onSelect={onSelect} type={type} />);

      const button = screen.getByRole('button');

      await act(async () => {
        await user.click(button);
      });

      const input: HTMLInputElement | null = screen.queryByTestId(
        'amplify-file-select'
      );

      expect(input).toBeDefined();
      expect(input).not.toBeNull();

      const file = new File([], 'file one');
      await waitFor(async () => {
        await user.upload(input!, file);
      });

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toHaveBeenCalledWith([file]);
    }
  );

  it('only triggers `click` event of the corresponding `input` node', async () => {
    const user = userEvent.setup();
    const onSelectOne = jest.fn();
    const onSelectTwo = jest.fn();

    const fileOne = new File([new ArrayBuffer(2000)], 'file one');
    const fileTwo = new File([], 'file two');

    render(<TestComponent onSelect={onSelectOne} type={'FILE'} />);
    render(<TestComponent onSelect={onSelectTwo} type={'FILE'} />);

    const buttons = screen.getAllByRole('button');
    const inputs = screen.getAllByTestId<HTMLInputElement>(
      'amplify-file-select'
    );

    expect(buttons.length).toBe(2);
    expect(inputs.length).toBe(2);

    const [buttonOne, buttonTwo] = buttons;
    const [inputOne, inputTwo] = inputs;

    await act(async () => {
      await user.click(buttonOne);
    });

    await waitFor(async () => {
      await user.upload(inputOne, fileOne);
    });

    expect(onSelectOne).toHaveBeenCalledTimes(1);
    expect(onSelectOne).toHaveBeenCalledWith([fileOne]);

    expect(onSelectTwo).not.toHaveBeenCalled();

    await act(async () => {
      await user.click(buttonTwo);
    });

    await waitFor(async () => {
      await user.upload(inputTwo, fileTwo);
    });

    expect(onSelectOne).toHaveBeenCalledTimes(1);
    expect(onSelectOne).toHaveBeenCalledWith([fileOne]);

    expect(onSelectTwo).toHaveBeenCalledTimes(1);
    expect(onSelectTwo).toHaveBeenCalledWith([fileTwo]);

    expect(onSelectOne).toHaveBeenLastCalledWith([fileOne]);
  });

  it('calls provided `onChange` callback as expected', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    const file = new File([], 'file.txt');

    render(<TestComponent onChange={onChange} />);

    const button = screen.getByRole('button');
    const input = screen.getByTestId<HTMLInputElement>('amplify-file-select');

    expect(button).toBeDefined();
    expect(input).toBeDefined();

    await act(async () => {
      await user.click(button);
    });

    await waitFor(async () => {
      await user.upload(input, file);
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
