import { reactive, Ref, ref } from 'vue';
import { fireEvent, render, screen } from '@testing-library/vue';

import * as UIModule from '@aws-amplify/ui';
import { AuthInterpreter, AuthMachineState } from '@aws-amplify/ui';

import { components } from '../../../global-spec';
import * as UseAuthComposables from '../../composables/useAuth';
import { baseMockServiceFacade } from '../../composables/__mock__/useAuthenticatorMock';
import { UseAuthenticator } from '../../types';
import ForceNewPassword from '../force-new-password.vue';

jest.spyOn(UseAuthComposables, 'useAuth').mockReturnValue({
  authStatus: ref('unauthenticated'),
  send: jest.fn(),
  service: undefined as unknown as AuthInterpreter,
  state: ref(undefined) as unknown as Ref<AuthMachineState>,
});

const updateBlurSpy = jest.fn();
const updateFormSpy = jest.fn();
const submitFormSpy = jest.fn();
const toSignInSpy = jest.fn();

const mockServiceFacade: UseAuthenticator = {
  ...baseMockServiceFacade,
  route: 'confirmResetPassword',
  updateBlur: updateBlurSpy,
  updateForm: updateFormSpy,
  submitForm: submitFormSpy,
  toSignIn: toSignInSpy,
};

const useAuthenticatorSpy = jest
  .spyOn(UseAuthComposables, 'useAuthenticator')
  .mockReturnValue(reactive(mockServiceFacade));

jest.spyOn(UIModule, 'getActorContext').mockReturnValue({
  country_code: '+1',
});

jest.spyOn(UIModule, 'getSortedFormFields').mockReturnValue([
  [
    'password',
    {
      label: 'Password',
      placeholder: 'Enter your Password',
      type: 'password',
    },
  ],
  [
    'confirm_password',
    {
      label: 'Confirm Password',
      placeholder: 'Please confirm your Password',
      type: 'password',
    },
  ],
  [
    'preferred_username',
    {
      label: 'Preferred Username',
      placeholder: 'Enter your Preferred Username',
      type: 'text',
    },
  ],
]);

const passwordInputParams = {
  name: 'password',
  value: 'verysecurepassword',
};
const confirmPasswordInputParams = {
  name: 'confirm_password',
  value: 'verysecurepassword',
};
const preferredUsernameInputParams = {
  name: 'preferred_username',
  value: 'verysecurepassword',
};

describe('ConfirmResetPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    // mock random value so that snapshots are consistent
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const { container } = render(ForceNewPassword, {
      global: { components },
    });
    expect(container).toMatchSnapshot();

    mathRandomSpy.mockRestore();
  });

  it('sends change event on form input', async () => {
    render(ForceNewPassword, {
      global: { components },
    });

    const passwordField = await screen.findByLabelText('Password');
    const confirmPasswordField =
      await screen.findByLabelText('Confirm Password');
    const preferredUsernameField =
      await screen.findByLabelText('Preferred Username');

    await fireEvent.input(passwordField, { target: passwordInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(passwordInputParams);

    await fireEvent.input(confirmPasswordField, {
      target: confirmPasswordInputParams,
    });
    expect(updateFormSpy).toHaveBeenCalledWith(confirmPasswordInputParams);

    await fireEvent.input(preferredUsernameField, {
      target: preferredUsernameInputParams,
    });
    expect(updateFormSpy).toHaveBeenCalledWith(preferredUsernameInputParams);
  });

  it('sends blur event on form blur', async () => {
    render(ForceNewPassword, { global: { components } });

    const passwordField = await screen.findByLabelText('Password');
    const confirmPasswordField =
      await screen.findByLabelText('Confirm Password');
    const preferredUsernameField =
      await screen.findByLabelText('Preferred Username');

    await fireEvent.blur(passwordField);
    expect(updateBlurSpy).toHaveBeenCalledWith({ name: 'password' });

    await fireEvent.blur(confirmPasswordField);
    expect(updateBlurSpy).toHaveBeenCalledWith({ name: 'confirm_password' });

    await fireEvent.blur(preferredUsernameField);
    expect(updateBlurSpy).toHaveBeenCalledWith({ name: 'preferred_username' });
  });

  // @todo-upgrade-react-18 fix
  it.skip('sends submit event on form submit', async () => {
    render(ForceNewPassword, { global: { components } });

    const submitButton = await screen.findByRole('button', {
      name: 'Change Password',
    });

    await fireEvent.click(submitButton);
    expect(submitFormSpy).toHaveBeenCalledTimes(1);
  });

  it('displays error if present', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({ ...mockServiceFacade, error: 'mockError' })
    );
    render(ForceNewPassword, { global: { components } });

    expect(await screen.findByText('mockError')).toBeInTheDocument();
  });

  it('handles back to sign in button as expected', async () => {
    render(ForceNewPassword, { global: { components } });

    const backToSignInButton = await screen.findByRole('button', {
      name: 'Back to Sign In',
    });
    await fireEvent.click(backToSignInButton);

    expect(toSignInSpy).toHaveBeenCalledTimes(1);
  });

  it('disables the submit button if password change is pending', async () => {
    useAuthenticatorSpy.mockReturnValue(
      reactive({ ...mockServiceFacade, isPending: true })
    );
    render(ForceNewPassword, { global: { components } });

    const submitButton = await screen.findByRole('button', {
      name: 'Changing…',
    });
    expect(submitButton).toBeDisabled();
  });
});
