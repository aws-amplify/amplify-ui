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
import ConfirmSignUp from '../confirm-sign-up.vue';

jest.spyOn(UseAuthComposables, 'useAuth').mockReturnValue({
  authStatus: ref('unauthenticated'),
  send: jest.fn(),
  service: undefined as unknown as AuthInterpreter,
  state: ref(undefined) as unknown as Ref<AuthMachineState>,
});

jest.spyOn(UseAuthComposables, 'useAuth').mockReturnValue({
  authStatus: ref('unauthenticated'),
  send: jest.fn(),
  service: undefined as unknown as AuthInterpreter,
  state: ref(undefined) as unknown as Ref<AuthMachineState>,
});

const updateFormSpy = jest.fn();
const submitFormSpy = jest.fn();
const resendCodeSpy = jest.fn();

const mockServiceFacade: AuthenticatorServiceFacade = {
  ...baseMockServiceFacade,
  route: 'confirmSignUp',
  updateForm: updateFormSpy,
  submitForm: submitFormSpy,
  resendCode: resendCodeSpy,
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
      label: 'Confirmation Code',
      placeholder: 'Enter your code',
      type: 'number',
    },
  ],
]);

const codeInputParams = { name: 'confirmation_code', value: '123456' };

describe('ConfirmSignUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    // mock random value so that snapshots are consistent
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const { container } = render(ConfirmSignUp, { global: { components } });
    expect(container).toMatchSnapshot();

    mathRandomSpy.mockRestore();
  });

  it('sends change event on form input', async () => {
    render(ConfirmSignUp, { global: { components } });

    const codeField = await screen.findByLabelText('Confirmation Code');

    await fireEvent.input(codeField, { target: codeInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(codeInputParams);
  });

  it('sends submit event on form submit', async () => {
    render(ConfirmSignUp, { global: { components } });

    const codeField = await screen.findByLabelText('Confirmation Code');

    await fireEvent.input(codeField, { target: codeInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(codeInputParams);

    const submitButton = await screen.findByRole('button', {
      name: 'Confirm',
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
    render(ConfirmSignUp, { global: { components } });

    expect(await screen.findByText('mockError')).toBeInTheDocument();
  });

  it('handles resend code button as expected', async () => {
    render(ConfirmSignUp, { global: { components } });

    const resendCodeButton = await screen.findByRole('button', {
      name: 'Resend Code',
    });

    await fireEvent.click(resendCodeButton);

    expect(resendCodeSpy).toHaveBeenCalledTimes(1);
  });

  it('disables the submit button if if sign up is pending', async () => {
    useAuthenticatorSpy.mockReturnValue(
      reactive({ ...mockServiceFacade, isPending: true })
    );
    render(ConfirmSignUp, { global: { components } });

    const submitButton = await screen.findByRole('button', {
      name: 'Confirm',
    });
    expect(submitButton).toBeDisabled();
  });
});
