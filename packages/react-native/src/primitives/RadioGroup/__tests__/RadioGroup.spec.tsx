import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react-native';

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
      value={value}
      onChange={(nextValue) => {
        if (typeof nextValue === 'string') {
          handleOnChange(nextValue);
        }
      }}
    >
      <Radio value="option-1" label="Option 1" />
      <Radio value="option-2" label="Option 2" />
      <Radio value="option-3" label="Option 3" />
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
    expect(radios.length).toBe(3);

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

  it.each(directions)('renders as expected when size is %s', (value) => {
    const { toJSON } = render(<ControlledRadioGroup direction={value} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it.each(sizes)('renders as expected when size is %s', (value) => {
    const { toJSON } = render(<ControlledRadioGroup size={value} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
