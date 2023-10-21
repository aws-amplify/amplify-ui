import { reactive, Ref, ref } from 'vue';
import { fireEvent, render, screen } from '@testing-library/vue';

import * as UIModule from '@aws-amplify/ui';
import { AuthInterpreter, AuthMachineState } from '@aws-amplify/ui';

import { components } from '../../../global-spec';
import * as UseAuthComposables from '../../composables/useAuth';
import { baseMockServiceFacade } from '../../composables/__mock__/useAuthenticatorMock';
import { UseAuthenticator } from '../../types';
import ConfirmResetPassword from '../confirm-reset-password.vue';

jest.spyOn(UseAuthComposables, 'useAuth').mockReturnValue({
  authStatus: ref('unauthenticated'),
  send: jest.fn(),
  service: undefined as unknown as AuthInterpreter,
  state: ref(undefined) as unknown as Ref<AuthMachineState>,
});

const updateBlurSpy = jest.fn();
const updateFormSpy = jest.fn();
const submitFormSpy = jest.fn();
const resendCodeSpy = jest.fn();

const mockServiceFacade: UseAuthenticator = {
  ...baseMockServiceFacade,
  route: 'confirmResetPassword',
  updateBlur: updateBlurSpy,
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
      label: 'Code *',
      placeholder: 'Code',
      type: 'number',
    },
  ],
  [
    'password',
    {
      label: 'New Password',
      placeholder: 'New Password',
      type: 'password',
    },
  ],
  [
    'confirm_password',
    {
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      type: 'password',
    },
  ],
]);

const codeInputPrams = { name: 'confirmation_code', value: '123456' };
const newPasswordInputParams = {
  name: 'password',
  value: 'verysecurepassword',
};
const confirmPasswordInputParams = {
  name: 'confirm_password',
  value: 'verysecurepassword',
};

describe('ConfirmResetPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    // mock random value so that snapshots are consistent
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const { container } = render(ConfirmResetPassword, {
      global: { components },
    });
    expect(container).toMatchSnapshot();

    mathRandomSpy.mockRestore();
  });

  it('sends change event on form input', async () => {
    render(ConfirmResetPassword, { global: { components } });

    const codeField = await screen.findByLabelText('Code *');
    const newPasswordField = await screen.findByLabelText('New Password');
    const confirmPasswordField =
      await screen.findByLabelText('Confirm Password');

    await fireEvent.input(codeField, { target: codeInputPrams });
    expect(updateFormSpy).toHaveBeenCalledWith(codeInputPrams);

    await fireEvent.input(newPasswordField, {
      target: newPasswordInputParams,
    });
    expect(updateFormSpy).toHaveBeenCalledWith(newPasswordInputParams);

    await fireEvent.input(confirmPasswordField, {
      target: confirmPasswordInputParams,
    });
    expect(updateFormSpy).toHaveBeenCalledWith(confirmPasswordInputParams);
  });

  it('sends blur event on form blur', async () => {
    render(ConfirmResetPassword, {
      global: { components },
    });

    const codeField = await screen.findByLabelText('Code *');
    const newPasswordField = await screen.findByLabelText('New Password');
    const confirmPasswordField =
      await screen.findByLabelText('Confirm Password');

    await fireEvent.blur(codeField);
    expect(updateBlurSpy).toHaveBeenCalledWith({ name: 'confirmation_code' });

    await fireEvent.blur(newPasswordField);
    expect(updateBlurSpy).toHaveBeenCalledWith({ name: 'password' });

    await fireEvent.blur(confirmPasswordField);
    expect(updateBlurSpy).toHaveBeenCalledWith({ name: 'confirm_password' });
  });

  // @todo-upgrade-react-18 fix?
  it.skip('sends submit event on form submit', async () => {
    render(ConfirmResetPassword, { global: { components } });

    const submitButton = await screen.findByRole('button', {
      name: 'Submit',
    });

    await fireEvent.click(submitButton);
    expect(submitFormSpy).toHaveBeenCalledTimes(1);
  });

  it('displays error if present', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({ ...mockServiceFacade, error: 'mockError' })
    );
    render(ConfirmResetPassword, { global: { components } });

    expect(await screen.findByText('mockError')).toBeInTheDocument();
  });

  it('handles resend code button as expected', async () => {
    render(ConfirmResetPassword, { global: { components } });

    const resendCodeButton = await screen.findByRole('button', {
      name: 'Resend Code',
    });
    await fireEvent.click(resendCodeButton);

    expect(resendCodeSpy).toHaveBeenCalledTimes(1);
  });

  it('disables the submit button if password reset is pending', async () => {
    useAuthenticatorSpy.mockReturnValue(
      reactive({ ...mockServiceFacade, isPending: true })
    );
    render(ConfirmResetPassword, { global: { components } });

    const submitButton = await screen.findByRole('button', {
      name: 'Submit',
    });
    expect(submitButton).toBeDisabled();
  });
});
