import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Radio from '../Radio';
import { Size } from '../types';

const sizes: Size[] = ['small', 'medium', 'large'];

const onChange = jest.fn();

describe('Radio', () => {
  beforeEach(() => {
    onChange.mockClear();
  });

  it.each([true, false])('renders as expected when selected is %s', (value) => {
    const { toJSON } = render(
      <Radio
        selected={value}
        value={value}
        label={`${value}`}
        onChange={onChange}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls the expected handler when selected', () => {
    const { getByRole } = render(<Radio value="" onChange={onChange} />);
    const radio = getByRole('radio');
    fireEvent.press(radio);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it.each(sizes)('renders as expected when size is %s', (value) => {
    const { toJSON } = render(
      <Radio size={value} value={value} label={`${value}`} selected />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected when passing a number to the size prop', () => {
    const { toJSON } = render(
      <Radio size={40} value="number" label="number" selected />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected with accessibilityRole', () => {
    const { toJSON } = render(
      <Radio value="" onChange={onChange} accessibilityRole={'none'} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected when disabled', () => {
    const { toJSON } = render(
      <Radio disabled value="disabled" label="disabled" onChange={onChange} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('does nothing when disabled', () => {
    const { getByRole } = render(
      <Radio disabled value="disabled" label="disabled" onChange={onChange} />
    );
    const radio = getByRole('radio');
    fireEvent.press(radio);
    expect(onChange).not.toHaveBeenCalled();
  });
});
