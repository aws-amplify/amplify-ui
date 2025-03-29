import { reactive, Ref, ref } from 'vue';
import { fireEvent, render, screen } from '@testing-library/vue';

import * as UIModule from '@aws-amplify/ui';
import { AuthInterpreter, AuthMachineState } from '@aws-amplify/ui';

import { components } from '../../../global-spec';
import * as UseAuthComposables from '../../composables/useAuth';
import { baseMockServiceFacade } from '../../composables/__mocks__/useAuthenticatorMock';
import { UseAuthenticator } from '../../types';
import SelectMfaType from '../select-mfa-type.vue';

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
  route: 'setupEmail',
  challengeName: 'MFA_SETUP',
  updateForm: updateFormSpy,
  submitForm: submitFormSpy,
  toSignIn: toSignInSpy,
  allowedMfaTypes: ['EMAIL', 'TOTP'],
};

const useAuthenticatorSpy = jest
  .spyOn(UseAuthComposables, 'useAuthenticator')
  .mockReturnValue(reactive(mockServiceFacade));

jest
  .spyOn(UIModule, 'getActorContext')
  .mockReturnValue({} as UIModule.AuthActorContext);

const fieldName = 'mfa_type';
const emailRadioLabel = 'Email Message';
const totpRadioLabel = 'Authenticator App (TOTP)';
const emailFieldInput = { name: fieldName, value: 'EMAIL' };
const totpFieldInput = { name: fieldName, value: 'TOTP' };

jest.spyOn(UIModule, 'getSortedFormFields').mockReturnValue([
  [
    fieldName,
    {
      label: 'Select MFA Type',
      type: 'radio',
    },
  ],
]);

describe('SelectMfaType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected ', () => {
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const { container } = render(SelectMfaType, { global: { components } });
    expect(container).toMatchSnapshot();

    mathRandomSpy.mockRestore();
  });

  it('sends change event on form input', async () => {
    render(SelectMfaType, { global: { components } });

    const totpRadioButton = await screen.findByText(totpRadioLabel);

    await fireEvent.click(totpRadioButton);

    expect(updateFormSpy).toHaveBeenCalledWith(totpFieldInput);

    const emailRadioButton = await screen.findByText(emailRadioLabel);

    fireEvent.click(emailRadioButton);

    expect(updateFormSpy).toHaveBeenCalledWith(emailFieldInput);
  });

  it('sends submit event on form submit with default', async () => {
    render(SelectMfaType, { global: { components } });

    const submitButton = await screen.findByRole('button', {
      name: 'Confirm',
    });
    await fireEvent.click(submitButton);

    expect(submitFormSpy).toHaveBeenCalledTimes(1);
    expect(submitFormSpy).toHaveBeenCalledWith({
      [emailFieldInput.name]: emailFieldInput.value,
    });
  });

  it('sends submit event on form submit with selection', async () => {
    render(SelectMfaType, { global: { components } });

    const totpRadioButton = await screen.findByText(totpRadioLabel);

    await fireEvent.click(totpRadioButton);

    expect(updateFormSpy).toHaveBeenCalledWith(totpFieldInput);

    const submitButton = await screen.findByRole('button', { name: 'Confirm' });

    await fireEvent.click(submitButton);

    expect(submitFormSpy).toHaveBeenCalledTimes(1);
    expect(submitFormSpy).toHaveBeenCalledWith({
      [totpFieldInput.name]: totpFieldInput.value,
    });
  });

  it('displays error if present', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({ ...mockServiceFacade, error: 'mockError' })
    );
    render(SelectMfaType, { global: { components } });

    expect(await screen.findByText('mockError')).toBeInTheDocument();
  });

  it('handles back to sign in button as expected', async () => {
    render(SelectMfaType, { global: { components } });

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
    render(SelectMfaType, { global: { components } });

    const submitButton = await screen.findByRole('button', { name: 'Confirm' });
    expect(submitButton).toBeDisabled();
  });
});
