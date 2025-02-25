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

const radioLabel = 'Email Message';
const fieldInput = { name: 'mfa_type', value: 'EMAIL' };

jest.spyOn(UIModule, 'getSortedFormFields').mockReturnValue([
  [
    fieldInput.name,
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

    const radioButton = await screen.findByText(radioLabel);

    await fireEvent.click(radioButton);

    expect(updateFormSpy).toHaveBeenCalledWith(fieldInput);
  });

  it('sends submit event on form submit', async () => {
    render(SelectMfaType, { global: { components } });

    const radioButton = await screen.findByText(radioLabel);

    await fireEvent.click(radioButton);

    expect(updateFormSpy).toHaveBeenCalledWith(fieldInput);

    const submitButton = await screen.findByRole('button', { name: 'Confirm' });
    await fireEvent.click(submitButton);

    expect(submitFormSpy).toHaveBeenCalledTimes(1);
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
