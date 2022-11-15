import React from 'react';
import { render, renderHook } from '@testing-library/react-native';
import { countryDialCodes } from '@aws-amplify/ui';

import { useTheme } from '../../../theme';
import PhoneNumberField from '../PhoneNumberField';
import { getThemedStyles } from '../styles';
import { getThemedStyles as getTextFieldStyles } from '../../TextField/styles';

const testID = 'phoneNumberInput';
const pickerTestID = 'RNPicker';
const defaultProps = {
  dialCodes: countryDialCodes,
  testID,
};

// TODO: add more tests

describe('PhoneNumberField', () => {
  it('renders as expected', () => {
    const index = 5;
    const { toJSON, getByTestId } = render(
      <PhoneNumberField
        {...defaultProps}
        defaultDialCode={countryDialCodes[index]}
      />
    );
    expect(toJSON()).toMatchSnapshot();

    const textInput = getByTestId(testID);
    expect(textInput.props.keyboardType).toBe('phone-pad');
    expect(textInput.props.editable).toBe(true);
    expect(textInput.props.accessible).toBe(true);

    const picker = getByTestId(pickerTestID);
    expect(picker).toBeDefined();
    expect((picker.props.items as string[]).length).toBe(
      countryDialCodes.length
    );
    expect(picker.props.selectedIndex).toBe(index);
  });

  it('renders as expected when default dial code is undefined', () => {
    const { toJSON, getByTestId } = render(
      <PhoneNumberField {...defaultProps} defaultDialCode={undefined} />
    );
    expect(toJSON()).toMatchSnapshot();

    const textInput = getByTestId(testID);
    expect(textInput.props.keyboardType).toBe('phone-pad');
    expect(textInput.props.editable).toBe(true);
    expect(textInput.props.accessible).toBe(true);

    const picker = getByTestId(pickerTestID);
    expect(picker).toBeDefined();
    expect(picker.props.selectedIndex).toBe(0);
  });

  it('does not render picker when dial codes are undefined', () => {
    const { toJSON, queryByTestId } = render(
      <PhoneNumberField {...defaultProps} dialCodes={undefined} />
    );
    expect(toJSON()).toMatchSnapshot();

    const picker = queryByTestId(pickerTestID);
    expect(picker).toBe(null);
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

    expect(getByTestId('RNPicker').props.style).toContainEqual([
      themedStyle.pickerItem,
      undefined,
    ]);

    expect(getByTestId(testID).props.style).toStrictEqual([
      textFieldStyles.input,
      undefined,
    ]);

    expect(toJSON()).toMatchSnapshot();
  });
});
