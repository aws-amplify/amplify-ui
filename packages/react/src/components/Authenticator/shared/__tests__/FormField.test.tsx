import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { defaultFormFieldOptions } from '@aws-amplify/ui';
import { FormField, FormFieldProps } from '../FormField';
import * as UIReactCore from '@aws-amplify/ui-react-core';
import * as UseStableIdModule from '../../../../primitives/utils/useStableId';

jest.mock('@aws-amplify/ui-react-core');

const useStableIdSpy = jest.spyOn(UseStableIdModule, 'useStableId');

const useAuthenticatorSpy = jest.spyOn(UIReactCore, 'useAuthenticator');

const ERROR_MESSAGE = 'Username cannot be empty.';

const usernameFormFieldProps: FormFieldProps = {
  ...defaultFormFieldOptions.username,
  name: 'username',
  label: 'Username',
};

describe('FormField', () => {
  afterEach(() => {
    useAuthenticatorSpy.mockRestore();
    useStableIdSpy.mockRestore();
  });

  it('renders as expected in the happy path', () => {
    // mocking ids so snapshots are consistent
    useStableIdSpy.mockReturnValue('mock-id-0');
    useAuthenticatorSpy.mockReturnValue({
      validationErrors: {},
    } as UIReactCore.UseAuthenticator);

    const { container } = render(<FormField {...usernameFormFieldProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders as expected in the unhappy path', () => {
    useStableIdSpy.mockReturnValue('mock-id-0');
    useAuthenticatorSpy.mockReturnValue({
      validationErrors: { username: ERROR_MESSAGE },
    } as unknown as UIReactCore.UseAuthenticator);

    const { container } = render(<FormField {...usernameFormFieldProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Invalid field is described by validation error', async () => {
    useAuthenticatorSpy.mockReturnValue({
      validationErrors: { username: ERROR_MESSAGE },
    } as unknown as UIReactCore.UseAuthenticator);

    const { container } = render(<FormField {...usernameFormFieldProps} />);

    const inputField = await screen.findByLabelText('Username');
    expect(inputField).toHaveAttribute('aria-describedBy');

    const describedById = inputField.getAttribute('aria-describedBy');

    // now, follow the id this id just like a screen reader would
    const errors = container.querySelector(`#${describedById}`);

    expect(errors).toHaveTextContent(ERROR_MESSAGE);
  });
});
