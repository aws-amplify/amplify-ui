import { reactive } from 'vue';
import { render, screen } from '@testing-library/vue';

import { components } from '../../../../global-spec';
import * as UseAuthComposables from '../../../composables/useAuth';
import { baseMockServiceFacade } from '../../../composables/__mocks__/useAuthenticatorMock';
import { UseAuthenticator } from '../../../types';
import BaseFormField from '../base-form-field.vue';

const useAuthenticatorSpy = jest.spyOn(UseAuthComposables, 'useAuthenticator');

const renderField = (
  props: Record<string, unknown>,
  validationErrors: Record<string, string | string[]> = {}
) => {
  useAuthenticatorSpy.mockReturnValue(
    reactive({
      ...baseMockServiceFacade,
      validationErrors,
    } as UseAuthenticator)
  );

  return render(BaseFormField, {
    global: { components },
    props,
  });
};

describe('BaseFormField', () => {
  afterEach(() => {
    useAuthenticatorSpy.mockReset();
  });

  it('renders a text (alias) control for non-password fields', () => {
    renderField({
      name: 'username',
      formField: { label: 'Username', type: 'text' },
    });

    const field = screen.getByRole('textbox');
    expect(field).toHaveAttribute('type', 'text');
    expect(field).toHaveAttribute('aria-invalid', 'false');
  });

  it('renders a password control for password fields', () => {
    const { container } = renderField({
      name: 'password',
      formField: { label: 'Password', type: 'password' },
    });

    const input = container.querySelector('input[type="password"]');
    expect(input).toBeTruthy();
  });

  it('renders validation errors when the field has errors', () => {
    renderField(
      {
        name: 'username',
        formField: { label: 'Username', type: 'text' },
      },
      { username: ['Username is required'] }
    );

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Username is required');
    expect(error).toHaveAttribute('data-variation', 'error');
    // the control is flagged invalid when errors are present
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });
});
