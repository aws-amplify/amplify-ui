import React from 'react';
import { render } from '@testing-library/react-native';

import PhoneNumberField from '../PhoneNumberField';
import { countryDialCodes } from '@aws-amplify/ui';

const testID = 'phoneNumberInput';
const pickerTestID = 'RNPicker';
const defaultDialCode = '+1';
const defaultProps = {
  defaultDialCode,
  dialCodes: countryDialCodes,
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
    expect(textInput.props.accessible).toBe(true);

    const picker = getByTestId(pickerTestID);
    expect(picker).toBeDefined();
    expect((picker.props.items as string[]).length).toBe(
      countryDialCodes.length
    );
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
