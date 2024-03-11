import { reactive, Ref, ref } from 'vue';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import QRCode from 'qrcode';

import * as UIModule from '@aws-amplify/ui';

import { components } from '../../../global-spec';
import * as UseAuthComposables from '../../composables/useAuth';
import { baseMockServiceFacade } from '../../composables/__mocks__/useAuthenticatorMock';
import { UseAuthenticator } from '../../types';
import SetupTotp from '../setup-totp.vue';

// mock clipboard
const writeClipboardTextSpy = jest.fn();
Object.assign(navigator, { clipboard: { writeText: writeClipboardTextSpy } });

const consoleWarnSpy = jest.spyOn(console, 'warn');

const toDataURLSpy = jest.spyOn(QRCode, 'toDataURL');

const getTotpCodeURLSpy = jest.spyOn(UIModule, 'getTotpCodeURL');

jest.spyOn(UseAuthComposables, 'useAuth').mockReturnValue({
  authStatus: ref('unauthenticated'),
  send: jest.fn(),
  service: undefined as unknown as UIModule.AuthInterpreter,
  state: ref(undefined) as unknown as Ref<UIModule.AuthMachineState>,
});

const submitFormSpy = jest.fn();
const toSignInSpy = jest.fn();
const updateFormSpy = jest.fn();

const mockServiceFacade = {
  ...baseMockServiceFacade,
  QRFields: null,
  route: 'signIn',
  submitForm: submitFormSpy,
  toSignIn: toSignInSpy,
  totpSecretCode: 'totp-mock-secret-code',
  updateForm: updateFormSpy,
  user: { username: 'testuser', userId: 'userId' },
} as UseAuthenticator;

const useAuthenticatorSpy = jest
  .spyOn(UseAuthComposables, 'useAuthenticator')
  .mockReturnValue(reactive(mockServiceFacade));

jest
  .spyOn(UIModule, 'getActorContext')
  .mockReturnValue({} as UIModule.AuthActorContext);

jest.spyOn(UIModule, 'getSortedFormFields').mockReturnValue([
  [
    'confirmation_code',
    {
      label: 'Code *',
      placeholder: 'Enter your Confirmation Code',
      type: 'number',
    },
  ],
]);

const codeInputParams = { name: 'confirmation_code', value: '123456' };

describe('SetupTotp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading text as expected on init', async () => {
    // mock random value so that snapshots are consistent
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const { container } = render(SetupTotp, { global: { components } });
    await screen.findByText('Loading...');
    expect(container).toMatchSnapshot();

    mathRandomSpy.mockRestore();
  });

  it('renders qrcode image as expected after onMounted is done', async () => {
    // mock random value so that snapshots are consistent
    const mathRandomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const { container } = render(SetupTotp, { global: { components } });

    // wait for qrcode to render
    await waitFor(() => screen.findByAltText('qr code'));
    expect(container).toMatchSnapshot();

    mathRandomSpy.mockRestore();
  });

  it('sends change event on form input', async () => {
    render(SetupTotp, { global: { components } });

    const codeField = await screen.findByLabelText('Code *');

    await fireEvent.input(codeField, { target: codeInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(codeInputParams);
  });

  it('sends submit event on form submit', async () => {
    render(SetupTotp, { global: { components } });

    const codeField = await screen.findByLabelText('Code *');

    await fireEvent.input(codeField, { target: codeInputParams });
    expect(updateFormSpy).toHaveBeenCalledWith(codeInputParams);

    const submitButton = await screen.findByRole('button', { name: 'Confirm' });
    await fireEvent.click(submitButton);

    expect(submitFormSpy).toHaveBeenCalledTimes(1);
  });

  it('copies secret code to clipboard when copy button is clicked', async () => {
    render(SetupTotp, { global: { components } });

    // wait for qrcode to render
    waitFor(() => screen.findByAltText('qr code'));
    const copyButton = await screen.findByText('COPY');
    copyButton.click();

    expect(writeClipboardTextSpy).toHaveBeenCalledTimes(1);
    expect(writeClipboardTextSpy).toHaveBeenCalledWith('totp-mock-secret-code');
  });

  it('does not update clipboard if copy button is clicked without valid totp code', async () => {
    useAuthenticatorSpy.mockReturnValue(
      reactive({
        ...mockServiceFacade,
        totpSecretCode: undefined,
      })
    );

    render(SetupTotp, { global: { components } });

    const copyButton = await screen.findByText('COPY');
    copyButton.click();

    expect(writeClipboardTextSpy).not.toHaveBeenCalled();
  });

  it('logs error message if QRCode.toDataURL fails', async () => {
    toDataURLSpy.mockImplementation(() => Promise.reject());

    render(SetupTotp, { global: { components } });

    // wait until async function `toDataURL` resolves and call console.warn
    waitFor(() => expect(consoleWarnSpy).toHaveBeenCalled());
  });

  it('handles back to sign in button as expected', async () => {
    render(SetupTotp, { global: { components } });

    const backToSignInButton = await screen.findByRole('button', {
      name: 'Back to Sign In',
    });

    fireEvent.click(backToSignInButton);

    expect(toSignInSpy).toHaveBeenCalledTimes(1);
  });

  it('uses custom values in QRFields if present', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({
        ...mockServiceFacade,
        QRFields: {
          totpIssuer: 'custom-issuer',
          totpUsername: 'custom-username',
        },
      } as UseAuthenticator)
    );

    render(SetupTotp, { global: { components } });

    // wait for qrcode to render
    await screen.findByAltText('qr code');

    expect(getTotpCodeURLSpy).toHaveBeenCalledWith(
      'custom-issuer',
      'custom-username',
      'totp-mock-secret-code'
    );
  });

  it('renders error if present', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({
        ...mockServiceFacade,
        error: 'mockError',
      })
    );
    render(SetupTotp, { global: { components } });

    expect(await screen.findByText('mockError')).toBeInTheDocument();
  });

  it('disables submit button if totp setup is pending', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({ ...mockServiceFacade, isPending: true })
    );
    render(SetupTotp, { global: { components } });
    const submitButton = await screen.findByRole('button', {
      name: 'Confirm',
    });

    expect(submitButton).toBeDisabled();
  });
});
