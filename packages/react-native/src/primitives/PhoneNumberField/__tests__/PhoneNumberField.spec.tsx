import React from 'react';
import { render, renderHook } from '@testing-library/react-native';

import { useTheme } from '../../../theme';
import PhoneNumberField from '../PhoneNumberField';
import { getThemedStyles as getTextFieldStyles } from '../../TextField/styles';
import { getThemedStyles } from '../styles';

const testID = 'phoneNumberInput';
const defaultProps = {
  testID,
};

// TODO: add more tests

describe('PhoneNumberField', () => {
  it('renders as expected', () => {
    const { toJSON, getByTestId } = render(
      <PhoneNumberField {...defaultProps} />
    );
    expect(toJSON()).toMatchSnapshot();

    const textInput = getByTestId(testID);
    expect(textInput.props.keyboardType).toBe('phone-pad');
    expect(textInput.props.editable).toBe(true);
  });

  it('renders as expected when disabled', () => {
    const { toJSON, getByTestId } = render(
      <PhoneNumberField {...defaultProps} disabled />
    );
    expect(toJSON()).toMatchSnapshot();
    const textInput = getByTestId(testID);
    expect(textInput.props.editable).toBe(false);
  });

  it('applies theming', () => {
    const { toJSON, getByTestId } = render(
      <PhoneNumberField {...defaultProps} />
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);
    const textFieldStyles = getTextFieldStyles(result.current);

    expect(getByTestId(testID).props.style).toStrictEqual([
      textFieldStyles.field,
      [themedStyle.field, undefined],
    ]);

    expect(toJSON()).toMatchSnapshot();
  });
});
