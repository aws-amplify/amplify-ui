import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { defaultFormFieldOptions } from '@aws-amplify/ui';
import { FormField, FormFieldProps } from '../FormField';
import * as UseAuthenticatorModule from '../../hooks/useAuthenticator';
import * as UseStableIdModule from '../../../../primitives/utils/useStableId';

const usernameFormFieldProps: FormFieldProps = {
  ...defaultFormFieldOptions.username,
  name: 'username',
  label: 'Username',
};

const useAuthenticatorSpy = jest.spyOn(
  UseAuthenticatorModule,
  'useAuthenticator'
);

const ERROR_MESSAGE = 'Username cannot be empty.';

const useStableIdSpy = jest.spyOn(UseStableIdModule, 'useStableId');

describe('FormField: ', () => {
  it('renders as expected in the happy path', () => {
    // mocking ids so snapshots are consistent
    useStableIdSpy.mockReturnValue('mock-id-0');
    useAuthenticatorSpy.mockReturnValue({ validationErrors: {} } as any);

    const { container } = render(<FormField {...usernameFormFieldProps} />);
    expect(container).toMatchSnapshot();

    useStableIdSpy.mockRestore();
  });

  it('renders as expected in the unhappy path', () => {
    useStableIdSpy.mockReturnValue('mock-id-0');
    useAuthenticatorSpy.mockReturnValue({
      validationErrors: { username: ERROR_MESSAGE },
    } as any);

    const { container } = render(<FormField {...usernameFormFieldProps} />);
    expect(container).toMatchSnapshot();

    useStableIdSpy.mockRestore();
  });

  it('Invalid field is described by validation error', async () => {
    useAuthenticatorSpy.mockReturnValue({
      validationErrors: { username: ERROR_MESSAGE },
    } as any);

    const { container } = render(<FormField {...usernameFormFieldProps} />);

    const inputField = await screen.findByLabelText('Username');
    expect(inputField).toHaveAttribute('aria-describedBy');

    const describedById = inputField.getAttribute('aria-describedBy');

    // now, follow the id this id just like a screen reader would
    const errors = container.querySelector(`#${describedById}`);

    expect(errors).toHaveTextContent(ERROR_MESSAGE);
  });
});
