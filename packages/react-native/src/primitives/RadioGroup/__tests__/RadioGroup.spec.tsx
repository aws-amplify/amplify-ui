import React, { useState } from 'react';
import { fireEvent, render, renderHook } from '@testing-library/react-native';

import { useTheme } from '../../../theme';
import { getThemedStyles as getThemedLabelStyles } from '../../Label/styles';
import { Radio } from '../../Radio';
import { Size } from '../../Radio/types';

import RadioGroup from '../RadioGroup';
import { Direction } from '../types';

const directions: Direction[] = ['vertical', 'horizontal'];
const sizes: Size[] = ['small', 'medium', 'large'];

const onChangeMock = jest.fn();

const ControlledRadioGroup = ({
  onChange,
  ...rest
}: {
  onChange?: jest.Mock<any, any>;
  direction?: Direction;
  size?: Size;
  disabled?: boolean;
}) => {
  const [value, setValue] = useState('option-1');
  const handleOnChange = (nextValue: string) => {
    setValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <RadioGroup
      {...rest}
      initialValue={value}
      onChange={(nextValue) => {
        if (typeof nextValue === 'string') {
          handleOnChange(nextValue);
        }
      }}
    >
      <Radio value="option-1" label="Option 1" />
      <Radio value="option-2" label="Option 2" />
      <Radio value="option-3" label="Option 3" />
      <Radio value="option-4" label="Option 4" disabled />
    </RadioGroup>
  );
};

describe('RadioGroup', () => {
  beforeEach(() => {
    onChangeMock.mockClear();
  });

  it('renders default RadioGroup as expected', () => {
    const { queryAllByRole, toJSON } = render(<ControlledRadioGroup />);

    const radios = queryAllByRole('radio');
    expect(radios.length).toBe(4);

    expect(toJSON()).toMatchSnapshot();
  });

  it('allows users to select radios', () => {
    const { getByText } = render(
      <ControlledRadioGroup onChange={onChangeMock} />
    );

    const option2 = getByText('Option 2');
    const option3 = getByText('Option 3');

    fireEvent.press(option2);
    expect(onChangeMock).toBeCalledWith('option-2');

    fireEvent.press(option3);
    expect(onChangeMock).toBeCalledWith('option-3');
  });

  it('does not execute the callback when disabled', () => {
    const { getByText } = render(
      <ControlledRadioGroup disabled onChange={onChangeMock} />
    );

    const option2 = getByText('Option 2');

    fireEvent.press(option2);
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it.each(directions)('renders as expected when direction is %s', (value) => {
    const { toJSON } = render(<ControlledRadioGroup direction={value} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it.each(sizes)('renders as expected when size is %s', (value) => {
    const { toJSON } = render(<ControlledRadioGroup size={value} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('updates the selected option in uncontrolled mode', () => {
    const { getByTestId, queryByTestId } = render(
      <RadioGroup>
        <Radio value="option-1" label="Option 1" testID="option-1" />
        <Radio value="option-2" label="Option 2" testID="option-2" />
      </RadioGroup>
    );

    const selectedOption = queryByTestId('amplify__radio-button__dot');

    expect(selectedOption).toBeNull();

    const optionOne = getByTestId('option-1');

    fireEvent.press(optionOne);

    expect(queryByTestId('amplify__radio-button__dot')).toBeDefined();
  });

  it('only calls onValueChange when value changes', () => {
    const onValueChange = jest.fn();

    const { getByTestId, rerender } = render(
      <RadioGroup onValueChange={onValueChange}>
        <Radio value="option-1" label="Option 1" testID="option-1" />
        <Radio value="option-2" label="Option 2" testID="option-2" />
      </RadioGroup>
    );

    const optionOne = getByTestId('option-1');

    fireEvent.press(optionOne);

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('option-1');

    const updatedOnValueChange = jest.fn();

    rerender(
      <RadioGroup onValueChange={updatedOnValueChange}>
        <Radio value="option-1" label="Option 1" testID="option-1" />
        <Radio value="option-2" label="Option 2" testID="option-2" />
      </RadioGroup>
    );

    expect(updatedOnValueChange).not.toHaveBeenCalled();
  });

  it('renders the label prop', () => {
    const label = 'label';
    const { getByText } = render(
      <RadioGroup label={label}>
        <Radio value="option-1" label="Option 1" testID="option-1" />
        <Radio value="option-2" label="Option 1" testID="option-2" />
      </RadioGroup>
    );

    expect(getByText(label)).toBeDefined();
  });

  it('applies theme and custom styles', () => {
    const labelText = 'Test label';
    const customLabelStyle = { color: 'red' };
    const themedRadioGroupLabelStyle = {};

    const { getByText } = render(
      <RadioGroup label={labelText} labelStyle={customLabelStyle}>
        <Radio value="option-1" label="Option 1" testID="option-1" />
        <Radio value="option-2" label="Option 1" testID="option-2" />
      </RadioGroup>
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedLabelStyles(result.current);

    const label = getByText(labelText);

    expect(label.props.style).toStrictEqual([
      themedStyle.text,
      themedStyle['primary'],
      [themedRadioGroupLabelStyle, customLabelStyle],
    ]);
  });
});
