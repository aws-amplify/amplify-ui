import { reactive, Ref, ref } from 'vue';
import { fireEvent, render, screen } from '@testing-library/vue';

import * as UIModule from '@aws-amplify/ui';
import { AuthInterpreter, AuthMachineState } from '@aws-amplify/ui';

import { components } from '../../../global-spec';
import * as UseAuthComposables from '../../composables/useAuth';
import SignIn from '../sign-in.vue';
import { baseMockServiceFacade } from '../../composables/__mock__/useAuthenticatorMock';

// mock random value so that snapshots are consistent
jest.spyOn(Math, 'random').mockReturnValue(0.1);

jest.spyOn(UseAuthComposables, 'useAuth').mockReturnValue({
  authStatus: ref('unauthenticated'),
  send: jest.fn(),
  service: undefined as unknown as AuthInterpreter,
  state: ref(undefined) as unknown as Ref<AuthMachineState>,
});

const updateFormSpy = jest.fn();
const submitFormSpy = jest.fn();
const toResetPasswordSpy = jest.fn();

const mockServiceFacade = {
  ...baseMockServiceFacade,
  route: 'signIn',
  updateForm: updateFormSpy,
  submitForm: submitFormSpy,
  toResetPassword: toResetPasswordSpy,
};

const useAuthenticatorSpy = jest
  .spyOn(UseAuthComposables, 'useAuthenticator')
  .mockReturnValue(reactive(mockServiceFacade));

jest.spyOn(UIModule, 'getActorContext').mockReturnValue({
  country_code: '+1',
});

jest.spyOn(UIModule, 'getSortedFormFields').mockReturnValue([
  ['username', { label: 'Username', placeholder: 'Enter your Username' }],
  [
    'password',
    { label: 'Password', placeholder: 'Enter your Password', type: 'password' },
  ],
]);

const usernameInputParams = { name: 'username', value: 'username' };
const passwordInputParams = { name: 'password', value: 'verysecurepassword' };

describe('SignIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    const { container } = render(SignIn, { global: { components } });
    expect(container).toMatchSnapshot();
  });

  it('sends change event on form input', async () => {
    render(SignIn, { global: { components } });
    const usernameField = await screen.findByLabelText('Username');
    const passwordField = await screen.findByLabelText('Password');

    await fireEvent.input(usernameField, { target: usernameInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(usernameInputParams);

    await fireEvent.input(passwordField, { target: passwordInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(passwordInputParams);
  });

  it('sends submit event on form submit', async () => {
    render(SignIn, { global: { components } });
    const usernameField = await screen.findByLabelText('Username');
    const passwordField = await screen.findByLabelText('Password');

    await fireEvent.input(usernameField, { target: usernameInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(usernameInputParams);

    await fireEvent.input(passwordField, { target: passwordInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(passwordInputParams);

    const submitButton = await screen.findByRole('button', { name: 'Sign in' });
    await fireEvent.click(submitButton);

    expect(submitFormSpy).toHaveBeenCalled();
  });

  it('forgot password button navigates to reset password screen', async () => {
    render(SignIn, { global: { components } });

    const forgotPasswordButton = await screen.findByRole('button', {
      name: 'Forgot your password?',
    });

    await fireEvent.click(forgotPasswordButton);

    expect(toResetPasswordSpy).toHaveBeenCalled();
  });

  it('displays error if it is present', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({
        ...mockServiceFacade,
        error: 'mockError',
      })
    );
    render(SignIn, { global: { components } });

    expect(await screen.findByText('mockError')).toBeInTheDocument();
  });

  it('disables the submit button if sign in is pending', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({
        ...mockServiceFacade,
        isPending: true,
      })
    );
    render(SignIn, { global: { components } });

    const submitButton = await screen.findByRole('button', {
      name: 'Signing in',
    });

    expect(submitButton).toBeDisabled();
  });
});
