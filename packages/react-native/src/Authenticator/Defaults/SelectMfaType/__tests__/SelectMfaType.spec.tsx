import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import type { ChallengeName } from '@aws-amplify/ui';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { SelectMfaType } from '..';

const {
  getBackToSignInText,
  getSelectMfaTypeByChallengeName,
  getConfirmText,
  getConfirmingText,
  getMfaTypeLabelByValue,
} = authenticatorTextUtil;

const fields = [
  {
    name: 'mfa_type',
    label: getMfaTypeLabelByValue('EMAIL'),
    type: 'radio' as const,
    value: 'EMAIL',
  },
  {
    name: 'mfa_type',
    label: getMfaTypeLabelByValue('TOTP'),
    type: 'radio' as const,
    value: 'TOTP',
  },
];

const props = {
  challengeName: 'MFA_SETUP' as ChallengeName,
  fields,
  Footer: SelectMfaType.Footer,
  FormFields: SelectMfaType.FormFields,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  hasValidationErrors: false,
  Header: SelectMfaType.Header,
  isPending: false,
  toSignIn: jest.fn(),
};

describe('SelectMfaType', () => {
  it('renders as expected', () => {
    const { toJSON, getAllByRole, getByText } = render(
      <SelectMfaType {...props} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getAllByRole('header')).toBeDefined();
    expect(
      getByText(getSelectMfaTypeByChallengeName(props.challengeName))
    ).toBeDefined();
    expect(getByText(getConfirmText())).toBeDefined();
    expect(getAllByRole('text')).toHaveLength(4);
  });

  it('renders an error message', () => {
    const errorMessage = 'Test error message';
    const { toJSON, getByText } = render(
      <SelectMfaType {...props} error={errorMessage} />
    );

    expect(toJSON()).toMatchSnapshot();
    expect(getByText(errorMessage)).toBeDefined();
  });

  it('handles Back to Sign In button', () => {
    const toSignInMock = jest.fn();

    const { getByText } = render(
      <SelectMfaType {...props} toSignIn={toSignInMock} />
    );

    const button = getByText(getBackToSignInText());
    fireEvent.press(button);
    expect(toSignInMock).toHaveBeenCalledTimes(1);
  });

  it('renders correct text based on isPending', () => {
    const { queryByText } = render(<SelectMfaType {...props} isPending />);

    expect(queryByText(getConfirmingText())).toBeDefined();
    expect(queryByText(getConfirmText())).toBeNull();
  });
});
