import { reactive, Ref, ref } from 'vue';
import { fireEvent, render, screen } from '@testing-library/vue';

import * as UIModule from '@aws-amplify/ui';
import { AuthInterpreter, AuthMachineState } from '@aws-amplify/ui';

import { components } from '../../../global-spec';
import * as UseAuthComposables from '../../composables/useAuth';
import { baseMockServiceFacade } from '../../composables/__mock__/useAuthenticatorMock';
import { UseAuthenticator } from '../../types';
import ResetPassword from '../reset-password.vue';

jest.spyOn(UseAuthComposables, 'useAuth').mockReturnValue({
  authStatus: ref('unauthenticated'),
  send: jest.fn(),
  service: undefined as unknown as AuthInterpreter,
  state: ref(undefined) as unknown as Ref<AuthMachineState>,
});

const updateFormSpy = jest.fn();
const submitFormSpy = jest.fn();
const toSignInSpy = jest.fn();

const mockServiceFacade: UseAuthenticator = {
  ...baseMockServiceFacade,
  route: 'resetPassword',
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
    'email',
    {
      label: 'Email',
      placeholder: 'Enter your Email',
      type: 'email',
    },
  ],
]);

const emailInputParams = { name: 'email', value: 'user@example.com' };

describe('ResetPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    // mock random value so that snapshots are consistent
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const { container } = render(ResetPassword, { global: { components } });
    expect(container).toMatchSnapshot();

    mathRandomSpy.mockRestore();
  });

  it('sends change event on form input', async () => {
    render(ResetPassword, { global: { components } });

    const emailField = await screen.findByLabelText('Email');

    await fireEvent.input(emailField, { target: emailInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(emailInputParams);
  });

  it('sends submit event on form submit', async () => {
    render(ResetPassword, { global: { components } });

    const emailField = await screen.findByLabelText('Email');
    await fireEvent.input(emailField, { target: emailInputParams });

    const submitButton = await screen.findByRole('button', {
      name: 'Send code',
    });

    await fireEvent.click(submitButton);
    expect(submitFormSpy).toHaveBeenCalledTimes(1);
  });

  it('displays error if present', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({ ...mockServiceFacade, error: 'mockError' })
    );
    render(ResetPassword, { global: { components } });

    expect(await screen.findByText('mockError')).toBeInTheDocument();
  });

  it('handles back to sign in button as expected', async () => {
    render(ResetPassword, { global: { components } });

    const backToSignInButton = await screen.findByRole('button', {
      name: 'Back to Sign In',
    });
    await fireEvent.click(backToSignInButton);

    expect(toSignInSpy).toHaveBeenCalledTimes(1);
  });

  it('disables the submit button if confirmation is pending', async () => {
    useAuthenticatorSpy.mockReturnValue(
      reactive({ ...mockServiceFacade, isPending: true })
    );
    render(ResetPassword, { global: { components } });

    const submitButton = await screen.findByRole('button', {
      name: 'Send code',
    });
    expect(submitButton).toBeDisabled();
  });
});
