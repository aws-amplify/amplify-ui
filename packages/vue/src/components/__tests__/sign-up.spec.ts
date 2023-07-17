import { reactive, Ref, ref } from 'vue';
import { fireEvent, render, screen } from '@testing-library/vue';

import * as UIModule from '@aws-amplify/ui';
import {
  AuthenticatorServiceFacade,
  AuthInterpreter,
  AuthMachineState,
} from '@aws-amplify/ui';

import { components } from '../../../global-spec';
import * as UseAuthComposables from '../../composables/useAuth';
import { baseMockServiceFacade } from '../../composables/__mock__/useAuthenticatorMock';
import SignUp from '../sign-up.vue';

jest.spyOn(UseAuthComposables, 'useAuth').mockReturnValue({
  authStatus: ref('unauthenticated'),
  send: jest.fn(),
  service: undefined as unknown as AuthInterpreter,
  state: ref(undefined) as unknown as Ref<AuthMachineState>,
});

const updateFormSpy = jest.fn();
const updateBlurSpy = jest.fn();
const submitFormSpy = jest.fn();

const mockServiceFacade: AuthenticatorServiceFacade = {
  ...baseMockServiceFacade,
  route: 'signIn',
  updateBlur: updateBlurSpy,
  updateForm: updateFormSpy,
  submitForm: submitFormSpy,
};

const useAuthenticatorSpy = jest
  .spyOn(UseAuthComposables, 'useAuthenticator')
  .mockReturnValue(reactive(mockServiceFacade));

jest.spyOn(UIModule, 'getActorContext').mockReturnValue({
  country_code: '+1',
});

const getSortedFormFieldsSpy = jest
  .spyOn(UIModule, 'getSortedFormFields')
  .mockReturnValue([
    ['username', { label: 'Username', placeholder: 'Enter your Username' }],
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
        placeholder: 'Please your Password',
        type: 'password',
      },
    ],
    ['email', { label: 'Email', placeholder: 'Enter your Email' }],
  ]);

const usernameInputParams = { name: 'username', value: 'username' };
const passwordInputParams = { name: 'password', value: 'verysecurepassword' };
const confirmPasswordInputParams = {
  name: 'confirm_password',
  value: 'verysecurepassword',
};
const emailInputParams = { name: 'email', value: 'email@example.com' };
const checkboxInputParams = {
  name: 'mycheckbox',
  value: 'checkboxvalue',
};

describe('SignUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    // mock random value so that snapshots are consistent
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const { container } = render(SignUp, { global: { components } });
    expect(container).toMatchSnapshot();

    mathRandomSpy.mockRestore();
  });

  it('sends change event on form input', async () => {
    render(SignUp, { global: { components } });
    const usernameField = await screen.findByLabelText('Username');
    const passwordField = await screen.findByLabelText('Password');
    const confirmPasswordField = await screen.findByLabelText(
      'Confirm Password'
    );
    const emailField = await screen.findByLabelText('Email');

    await fireEvent.input(usernameField, { target: usernameInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(usernameInputParams);

    await fireEvent.input(passwordField, { target: passwordInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(passwordInputParams);

    await fireEvent.input(confirmPasswordField, {
      target: confirmPasswordInputParams,
    });
    expect(updateFormSpy).toHaveBeenCalledWith(confirmPasswordInputParams);

    await fireEvent.input(emailField, { target: emailInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(emailInputParams);
  });

  it('handles blur event', async () => {
    render(SignUp, { global: { components } });
    const usernameField = await screen.findByLabelText('Username');

    await fireEvent.blur(usernameField);
    expect(updateBlurSpy).toHaveBeenCalledWith({ name: 'username' });
  });

  it('handles checkbox event', async () => {
    getSortedFormFieldsSpy.mockReturnValueOnce([
      ['mycheckbox', { label: 'My Checkbox', type: 'checkbox' }],
    ]);
    render(SignUp, { global: { components } });

    const checkboxField = await screen.findByLabelText('My Checkbox');

    // check the checkbox
    await fireEvent.click(checkboxField, { target: checkboxInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith({
      name: 'mycheckbox',
      value: 'checkboxvalue',
    });

    // uncheck the checkbox. Value should be undefined.
    await fireEvent.click(checkboxField, { target: checkboxInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith({
      name: 'mycheckbox',
    });
  });

  it('sends submit event on form submit', async () => {
    render(SignUp, { global: { components } });
    const usernameField = await screen.findByLabelText('Username');
    const passwordField = await screen.findByLabelText('Password');
    const confirmPasswordField = await screen.findByLabelText(
      'Confirm Password'
    );
    const emailField = await screen.findByLabelText('Email');

    await fireEvent.input(usernameField, { target: usernameInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(usernameInputParams);

    await fireEvent.input(passwordField, { target: passwordInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(passwordInputParams);

    await fireEvent.input(confirmPasswordField, {
      target: confirmPasswordInputParams,
    });
    expect(updateFormSpy).toHaveBeenCalledWith(confirmPasswordInputParams);

    await fireEvent.input(emailField, { target: emailInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(emailInputParams);

    const submitButton = await screen.findByRole('button', {
      name: 'Create Account',
    });
    await fireEvent.click(submitButton);

    expect(submitFormSpy).toHaveBeenCalledTimes(1);
  });

  it('displays error if it is present', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({
        ...mockServiceFacade,
        error: 'mockError',
      })
    );
    render(SignUp, { global: { components } });

    expect(await screen.findByText('mockError')).toBeInTheDocument();
  });

  it('disables the submit button if sign up is pending', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({
        ...mockServiceFacade,
        isPending: true,
      })
    );
    render(SignUp, { global: { components } });

    const submitButton = await screen.findByRole('button', {
      name: 'Create Account',
    });

    expect(submitButton).toBeDisabled();
  });
});
