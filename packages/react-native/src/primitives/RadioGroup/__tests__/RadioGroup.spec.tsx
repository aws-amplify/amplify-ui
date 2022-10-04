import React, { useState } from 'react';
import { render } from '@testing-library/react-native';

import { Radio } from '../../Radio';
import { Size } from '../../Radio/types';

import RadioGroup from '../RadioGroup';
import { Direction } from '../types';

const directions: Direction[] = ['vertical', 'horizontal'];
const sizes: Size[] = ['small', 'medium', 'large'];

const StatefulRadioGroup = ({ ...props }: any) => {
  const [value, setValue] = useState('option-1');
  const onChange = (nextValue: string) => {
    setValue(nextValue);
  };

  return (
    <RadioGroup {...props} value={value} onChange={onChange}>
      <Radio value="option-1" label="Option 1" />
      <Radio value="option-2" label="Option 2" />
      <Radio value="option-3" label="Option 3" />
    </RadioGroup>
  );
};

const onChange = jest.fn();

describe('RadioGroup', () => {
  beforeEach(() => {
    onChange.mockClear();
  });

  it('renders default RadioGroup as expected', () => {
    const { toJSON } = render(<StatefulRadioGroup />);
    expect(toJSON()).toMatchSnapshot();
  });

  it.each(directions)('renders as expected when size is %s', (value) => {
    const { toJSON } = render(<StatefulRadioGroup direction={value} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it.each(sizes)('renders as expected when size is %s', (value) => {
    const { toJSON } = render(<StatefulRadioGroup size={value} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected when disabled', () => {
    const { toJSON } = render(<StatefulRadioGroup disabled />);
    expect(toJSON()).toMatchSnapshot();
  });
});

/*

defaultValue

selected changes

Radio overrides

*/
