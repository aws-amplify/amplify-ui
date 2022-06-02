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

const errorMessage = 'Username cannot be empty.';

const mockValidFormField = () => {
  useAuthenticatorSpy.mockReturnValue({ validationErrors: {} } as any);
};

const mockInvalidFormField = () => {
  useAuthenticatorSpy.mockReturnValue({
    validationErrors: { username: errorMessage },
  } as any);
};

const useStableIdSpy = jest.spyOn(UseStableIdModule, 'useStableId');

describe('FormField Snapshots: ', () => {
  beforeAll(() => {
    // mocking ids so snapshots are consistent
    useStableIdSpy.mockReturnValue('mock-id-0');
  });

  it('Username formfield snapshot without validation errors', () => {
    mockValidFormField();

    const { container } = render(<FormField {...usernameFormFieldProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Username formfield with validation errors', () => {
    mockInvalidFormField();

    const { container } = render(<FormField {...usernameFormFieldProps} />);
    expect(container).toMatchSnapshot();
  });
});

describe('FormField Accesibility:', () => {
  beforeAll(() => {
    // Need useStableId to emit actual values to check accessibility
    useStableIdSpy.mockRestore();
  });

  it('Invalid field is described by validation error', async () => {
    mockInvalidFormField();

    const { container } = render(<FormField {...usernameFormFieldProps} />);

    const inputField = await screen.findByLabelText('Username');
    expect(inputField).toHaveAttribute('aria-describedBy');

    const describedById = inputField.getAttribute('aria-describedBy');

    // now, follow the id this id just like a screen reader would
    const errors = container.querySelector(`#${describedById}`);

    expect(errors).toHaveTextContent(errorMessage);
  });
});
