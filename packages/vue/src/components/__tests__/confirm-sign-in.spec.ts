import { reactive, Ref, ref } from 'vue';
import { fireEvent, render, screen } from '@testing-library/vue';

import * as UIModule from '@aws-amplify/ui';
import {
  AmplifyUser,
  AuthInterpreter,
  AuthMachineState,
} from '@aws-amplify/ui';

import { components } from '../../../global-spec';
import * as UseAuthComposables from '../../composables/useAuth';
import { baseMockServiceFacade } from '../../composables/__mock__/useAuthenticatorMock';
import { UseAuthenticator } from '../../types';
import ConfirmSignIn from '../confirm-sign-in.vue';

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
  route: 'confirmSignIn',
  updateForm: updateFormSpy,
  submitForm: submitFormSpy,
  toSignIn: toSignInSpy,
  user: { challengeName: 'SOFTWARE_TOKEN_MFA' } as AmplifyUser,
};

const useAuthenticatorSpy = jest
  .spyOn(UseAuthComposables, 'useAuthenticator')
  .mockReturnValue(reactive(mockServiceFacade));

jest.spyOn(UIModule, 'getActorContext').mockReturnValue({
  country_code: '+1',
});

jest.spyOn(UIModule, 'getSortedFormFields').mockReturnValue([
  [
    'confirmation_code',
    {
      label: 'Code *',
      placeholder: 'Code',
      type: 'number',
    },
  ],
]);

const codeInputParams = { name: 'confirmation_code', value: '123456' };

describe('ConfirmSignIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.skip('renders as expected for TOTP challenge', () => {
    // mock random value so that snapshots are consistent
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const { container } = render(ConfirmSignIn, { global: { components } });
    expect(container).toMatchSnapshot();

    mathRandomSpy.mockRestore();
  });

  it.skip('renders as expected for SMS challenge', () => {
    // mock random value so that snapshots are consistent
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({
        ...mockServiceFacade,
        user: { challengeName: 'SMS_MFA' },
      } as UseAuthenticator)
    );
    const { container } = render(ConfirmSignIn, { global: { components } });
    expect(container).toMatchSnapshot();

    mathRandomSpy.mockRestore();
  });

  // @todo-migration
  // expected challengeName encountered in ConfirmSignIn: SOFTWARE_TOKEN_MFA
  it.skip('sends change event on form input', async () => {
    render(ConfirmSignIn, { global: { components } });

    const codeField = await screen.findByLabelText('Code *');

    await fireEvent.input(codeField, { target: codeInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(codeInputParams);
  });

  // @todo-migration
  //     Unexpected challengeName encountered in ConfirmSignIn: SOFTWARE_TOKEN_MFA
  it.skip('sends submit event on form submit', async () => {
    render(ConfirmSignIn, { global: { components } });

    const codeField = await screen.findByLabelText('Code *');

    await fireEvent.input(codeField, { target: codeInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(codeInputParams);

    const submitButton = await screen.findByRole('button', { name: 'Confirm' });
    await fireEvent.click(submitButton);

    expect(submitFormSpy).toHaveBeenCalledTimes(1);
  });

  // @todo-migration
  // expected challengeName encountered in ConfirmSignIn: SOFTWARE_TOKEN_MFA
  it.skip('displays error if present', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({ ...mockServiceFacade, error: 'mockError' })
    );
    render(ConfirmSignIn, { global: { components } });

    expect(await screen.findByText('mockError')).toBeInTheDocument();
  });

  // @todo-migration
  // expected challengeName encountered in ConfirmSignIn: SOFTWARE_TOKEN_MFA
  it.skip('handles back to sign in button as expected', async () => {
    render(ConfirmSignIn, { global: { components } });

    const backToSignInButton = await screen.findByRole('button', {
      name: 'Back to Sign In',
    });
    await fireEvent.click(backToSignInButton);

    expect(toSignInSpy).toHaveBeenCalledTimes(1);
  });
  // @todo-migrationg
  //     Unexpected challengeName encountered in ConfirmSignIn: SOFTWARE_TOKEN_MFA
  //   3045 |             return translate(DefaultTexts.CONFIRM_TOTP);
  //   3046 |         default:
  // > 3047 |             throw new Error(`${translate('Unexpected challengeName encountered in ConfirmSignIn:')} ${challengeName}`);
  it.skip('disables the submit button if confirmation is pending', async () => {
    useAuthenticatorSpy.mockReturnValue(
      reactive({ ...mockServiceFacade, isPending: true })
    );
    render(ConfirmSignIn, { global: { components } });

    const submitButton = await screen.findByRole('button', { name: 'Confirm' });
    expect(submitButton).toBeDisabled();
  });
});
