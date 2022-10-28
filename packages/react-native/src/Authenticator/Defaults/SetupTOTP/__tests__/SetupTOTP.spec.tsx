import React from 'react';
import { render } from '@testing-library/react-native';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { SetupTOTP } from '..';
import { GetTotpSecretCode } from '@aws-amplify/ui-react-core/dist/types/Authenticator/hooks';

const code = {
  name: 'code',
  label: 'Code',
  placeholder: 'Code',
  type: 'default' as const,
};

const fields = [code];

const props = {
  // TODO: remove `totpIssuer` and `totpUsername` from types
  totpIssuer: 'AWS_COGNITO',
  totpUsername: 'hello',
  getTotpSecretCode: jest.fn as unknown as GetTotpSecretCode,
  error: null as unknown as string,
  fields,
  Footer: SetupTOTP.Footer,
  FormFields: SetupTOTP.FormFields,
  Header: SetupTOTP.Header,
  handleBlur: jest.fn,
  handleChange: jest.fn,
  handleSubmit: jest.fn,
  isPending: false,
};

const { getConfirmingText, getConfirmText, getSetupTOTPText } =
  authenticatorTextUtil;

describe('SetupTOTP', () => {
  it('renders as expected', () => {
    const { toJSON, getAllByRole, getByText } = render(
      <SetupTOTP {...props} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getAllByRole('header')).toBeDefined();
    expect(getByText(getSetupTOTPText())).toBeDefined();
    expect(getByText(getConfirmText())).toBeDefined();
    expect(getAllByRole('text')).toHaveLength(fields.length);
  });

  it('renders an error message', () => {
    const errorMessage = 'Test error message';
    const { toJSON, getByText } = render(
      <SetupTOTP {...props} error={errorMessage} />
    );

    expect(toJSON()).toMatchSnapshot();
    expect(getByText(errorMessage)).toBeDefined();
  });

  // TODO: add test for handling `toSignIn`

  it('renders correct text based on isPending', () => {
    const { queryByText } = render(<SetupTOTP {...props} isPending />);

    expect(queryByText(getConfirmingText())).toBeDefined();
    expect(queryByText(getConfirmText())).toBe(null);
  });
});
