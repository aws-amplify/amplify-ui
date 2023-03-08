import React from 'react';
import { fireEvent, render, renderHook } from '@testing-library/react-native';
import { ImageStyle, ViewStyle } from 'react-native';

import Checkbox from '../Checkbox';
import { useTheme } from '../../../theme';
import { getThemedStyles } from '../styles';
import { icons } from '../../../assets';

const onChange = jest.fn();
const testID = 'checkboxTestID';
const label = 'test';
const props = {
  testID,
  onChange,
  label,
  value: '',
};

describe('Checkbox', () => {
  beforeEach(() => {
    onChange.mockClear();
  });

  [true, false].forEach((value) => {
    it(`renders as expected when selected is ${value}`, () => {
      const { toJSON, getByRole, getByText } = render(
        <Checkbox {...props} selected={value} value={value} />
      );
      expect(toJSON()).toMatchSnapshot();

      expect(getByRole('checkbox')).toBeDefined();

      const icon = getByRole('image');
      expect(icon).toBeDefined();
      expect(icon.props.source).toEqual(
        value ? icons.checkboxFilled : icons.checkboxOutline
      );

      expect(getByText(label)).toBeDefined();
    });
  });

  it('renders as expected without a label', () => {
    const { toJSON, getByRole, queryByRole } = render(
      <Checkbox {...props} label={undefined} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('checkbox')).toBeDefined();
    expect(queryByRole('text')).toBeNull();
    const icon = getByRole('image');
    expect(icon).toBeDefined();
    expect(icon.props.source).toEqual(icons.checkboxOutline);
  });

  it('renders as expected when disabled', () => {
    const { toJSON, getByTestId } = render(<Checkbox {...props} disabled />);
    expect(toJSON()).toMatchSnapshot();

    expect(getByTestId(testID).props.accessibilityState).toHaveProperty(
      'disabled',
      true
    );
  });

  it('renders as expected with custom accessibilityRole', () => {
    const { toJSON, getByRole, queryByRole } = render(
      <Checkbox {...props} accessibilityRole={'none'} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('none')).toBeDefined();
    expect(queryByRole('checkbox')).toBeNull();
  });

  it('calls the expected handler when selected', () => {
    const { getByTestId } = render(<Checkbox {...props} />);
    const checkbox = getByTestId(testID);
    fireEvent.press(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does nothing when disabled', () => {
    const { getByTestId } = render(<Checkbox {...props} disabled />);
    const checkbox = getByTestId(testID);
    fireEvent.press(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders as expected when passing a number to the size prop', () => {
    const customSize = 42;

    const { toJSON, getByTestId, getByRole } = render(
      <Checkbox {...props} size={customSize} />
    );

    expect(toJSON()).toMatchSnapshot();

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current, 'end');

    expect(getByTestId(testID).props.style).toStrictEqual([
      themedStyle.container,
      undefined,
    ]);

    const iconStyle = (getByRole('image').props.style as ImageStyle[])[0];
    expect(iconStyle.height).toBe(customSize);
    expect(iconStyle.width).toBe(customSize);
  });

  it('applies label position prop', () => {
    const customLabelPosition = 'bottom';
    const { toJSON, getByTestId } = render(
      <Checkbox {...props} labelPosition={customLabelPosition} />
    );

    expect(toJSON()).toMatchSnapshot();

    const checkboxStyle = (getByTestId(testID).props.style as ViewStyle[])[0];
    expect(checkboxStyle.flexDirection).toBe('column');
  });

  it('applies theme and style props', () => {
    const labelPosition = 'end';
    const customStyle = { container: { padding: 10 }, icon: {}, label: {} };

    const { toJSON, getByTestId } = render(
      <Checkbox
        {...props}
        style={customStyle.container}
        iconStyle={customStyle.icon}
        labelStyle={customStyle.label}
        labelPosition={labelPosition}
      />
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current, labelPosition);

    expect(toJSON()).toMatchSnapshot();

    const checkbox = getByTestId(testID);
    expect(checkbox.props.style).toStrictEqual([
      themedStyle.container,
      customStyle.container,
    ]);
  });
});
