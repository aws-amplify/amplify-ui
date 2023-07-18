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
import ConfirmVerifyUser from '../confirm-verify-user.vue';

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
const skipVerificationSpy = jest.fn();

const mockServiceFacade: AuthenticatorServiceFacade = {
  ...baseMockServiceFacade,
  route: 'confirmSignUp',
  updateForm: updateFormSpy,
  submitForm: submitFormSpy,
  skipVerification: skipVerificationSpy,
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

describe('ConfirmVerifyUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    // mock random value so that snapshots are consistent
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const { container } = render(ConfirmVerifyUser, { global: { components } });
    expect(container).toMatchSnapshot();

    mathRandomSpy.mockRestore();
  });

  it('sends change event on form input', async () => {
    render(ConfirmVerifyUser, { global: { components } });

    const codeField = await screen.findByLabelText('Code *');

    await fireEvent.input(codeField, { target: codeInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(codeInputParams);
  });

  it('sends submit event on form submit', async () => {
    render(ConfirmVerifyUser, { global: { components } });

    const codeField = await screen.findByLabelText('Code *');

    await fireEvent.input(codeField, { target: codeInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(codeInputParams);

    const submitButton = await screen.findByRole('button', { name: 'Submit' });
    await fireEvent.click(submitButton);
    expect(submitFormSpy).toHaveBeenCalledTimes(1);
  });

  it('handles skip verification', async () => {
    render(ConfirmVerifyUser, { global: { components } });

    const skipButton = await screen.findByRole('button', { name: 'Skip' });
    await fireEvent.click(skipButton);

    expect(skipVerificationSpy).toHaveBeenCalledTimes(1);
  });

  it('displays error if present', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({
        ...mockServiceFacade,
        error: 'mockError',
      })
    );
    render(ConfirmVerifyUser, { global: { components } });

    expect(await screen.findByText('mockError')).toBeInTheDocument();
  });

  it('disables the submit button if sign up is pending', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({
        ...mockServiceFacade,
        isPending: true,
      })
    );
    render(ConfirmVerifyUser, { global: { components } });

    const submitButton = await screen.findByRole('button', {
      name: 'Submit',
    });

    expect(submitButton).toBeDisabled();
  });
});
