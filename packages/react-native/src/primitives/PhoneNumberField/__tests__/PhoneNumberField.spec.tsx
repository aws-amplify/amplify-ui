import React from 'react';
import { render } from '@testing-library/react-native';

import PhoneNumberField from '../PhoneNumberField';
import { countryDialCodes } from '@aws-amplify/ui';

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

  it('renders as expected when default dial codes are undefined', () => {
    const { toJSON, getByTestId } = render(
      <PhoneNumberField {...defaultProps} dialCodes={undefined} />
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

  it('renders as expected when disabled', () => {
    const { toJSON, getByTestId } = render(
      <PhoneNumberField {...defaultProps} disabled />
    );
    expect(toJSON()).toMatchSnapshot();
    const textInput = getByTestId(testID);
    expect(textInput.props.editable).toBe(false);
  });
});
