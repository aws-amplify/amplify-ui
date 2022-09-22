import React from 'react';
import { create } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native';
import Checkbox from '../Checkbox';

const onChange = jest.fn();

describe('Checkbox', () => {
  beforeEach(() => {
    onChange.mockClear();
  });

  [true, false].forEach((value) => {
    it(`renders as expected when selected is ${value}`, () => {
      const checkbox = create(
        <Checkbox selected={value} value={value} onChange={onChange} />
      );
      expect(checkbox.toJSON()).toMatchSnapshot();
    });
  });

  it('renders as expected when disabled', () => {
    const checkbox = create(<Checkbox disabled value="" onChange={onChange} />);
    expect(checkbox.toJSON()).toMatchSnapshot();
  });

  it('renders as expected with accessibilityRole', () => {
    const checkbox = create(
      <Checkbox value="" onChange={onChange} accessibilityRole={'none'} />
    );
    expect(checkbox.toJSON()).toMatchSnapshot();
  });

  it('calls the expected handler when selected', () => {
    const { getByRole } = render(<Checkbox value="" onChange={onChange} />);
    const checkbox = getByRole('checkbox');
    fireEvent.press(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does nothing when disabled', () => {
    const { getByRole } = render(
      <Checkbox value="" onChange={onChange} disabled />
    );
    const checkbox = getByRole('checkbox');
    fireEvent.press(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });
});
