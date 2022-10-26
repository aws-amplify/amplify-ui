import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { authenticatorTextUtil } from '@aws-amplify/ui';
import { ConfirmSignUp } from '..';

const props = {
  codeDeliveryDetails: {
    AttributeName: 'email',
    DeliveryMedium: 'EMAIL',
    Destination: 'a***@e***.com',
  },
  fields: [],
  Footer: ConfirmSignUp.Footer,
  FormFields: ConfirmSignUp.FormFields,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  Header: ConfirmSignUp.Header,
  isPending: false,
  resendCode: jest.fn(),
  socialProviders: undefined,
};

const { getConfirmingText, getDeliveryMethodText, getResendCodeText } =
  authenticatorTextUtil;

describe('ConfirmSignUp', () => {
  it('renders as expected', () => {
    const { toJSON } = render(<ConfirmSignUp {...props} />);
    expect(toJSON()).toMatchSnapshot();

    expect(getDeliveryMethodText(props.codeDeliveryDetails)).toBeDefined();
  });

  it('resends the code', () => {
    const { getByText } = render(<ConfirmSignUp {...props} />);
    const button = getByText(getResendCodeText());

    fireEvent.press(button);
    expect(props.resendCode).toHaveBeenCalledTimes(1);
  });

  it('renders as expected with an error', () => {
    const error = 'An error!';
    const { getByRole, getByText, toJSON } = render(
      <ConfirmSignUp {...props} error={error} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByRole('alert')).toBeDefined();
    expect(getByText(error)).toBeDefined();
  });

  it('renders as expected when isPending is true', () => {
    const { toJSON, getByText } = render(
      <ConfirmSignUp {...props} isPending />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByText(getConfirmingText())).toBeDefined();
  });
});
