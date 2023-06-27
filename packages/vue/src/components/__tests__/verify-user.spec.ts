import { reactive, Ref, ref } from 'vue';
import { fireEvent, render, screen } from '@testing-library/vue';

import * as UIModule from '@aws-amplify/ui';
import {
  AuthenticatorServiceFacade,
  AuthInterpreter,
  AuthMachineState,
  UnverifiedContactMethods,
} from '@aws-amplify/ui';

import { components } from '../../../global-spec';
import * as UseAuthComposables from '../../composables/useAuth';
import { baseMockServiceFacade } from '../../composables/__mock__/useAuthenticatorMock';
import VerifyUser from '../verify-user.vue';

// mock random value so that snapshots are consistent
jest.spyOn(Math, 'random').mockReturnValue(0.1);

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
const unverifiedContactMethods: UnverifiedContactMethods = {
  email: 'test@example.com',
};

const mockServiceFacade: AuthenticatorServiceFacade = {
  ...baseMockServiceFacade,
  route: 'verifyUser',
  updateForm: updateFormSpy,
  skipVerification: skipVerificationSpy,
  submitForm: submitFormSpy,
  unverifiedContactMethods,
};

const useAuthenticatorSpy = jest
  .spyOn(UseAuthComposables, 'useAuthenticator')
  .mockReturnValue(reactive(mockServiceFacade));

jest.spyOn(UIModule, 'getActorContext').mockReturnValue({
  country_code: '+1',
});

describe('VerifyUser', () => {
  it('renders as expected', () => {
    const { container } = render(VerifyUser, { global: { components } });
    expect(container).toMatchSnapshot();
  });

  it('handles change events', async () => {
    render(VerifyUser, { global: { components } });

    const checkboxField = await screen.findByLabelText('Email');

    await fireEvent.click(checkboxField);
    expect(updateFormSpy).toHaveBeenCalledWith({
      name: 'unverifiedAttr',
      value: 'email',
    });
  });

  it('handles submit event', async () => {
    render(VerifyUser, { global: { components } });

    const checkboxField = await screen.findByLabelText('Email');

    await fireEvent.click(checkboxField);
    expect(updateFormSpy).toHaveBeenCalledWith({
      name: 'unverifiedAttr',
      value: 'email',
    });

    const submitButton = await screen.findByRole('button', { name: 'Verify' });
    await fireEvent.click(submitButton);

    expect(submitFormSpy).toHaveBeenCalledTimes(1);
  });

  it('handles skip verification', async () => {
    render(VerifyUser, { global: { components } });

    const skipButton = await screen.findByRole('button', {
      name: 'Skip',
    });

    await fireEvent.click(skipButton);

    expect(skipVerificationSpy).toHaveBeenCalledTimes(1);
  });

  it('displays error if it is present', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({
        ...mockServiceFacade,
        error: 'mockError',
      })
    );
    render(VerifyUser, { global: { components } });

    expect(await screen.findByText('mockError')).toBeInTheDocument();
  });

  it('disables the submit button if sign up is pending', async () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({
        ...mockServiceFacade,
        isPending: true,
      })
    );
    render(VerifyUser, { global: { components } });

    const submitButton = await screen.findByRole('button', {
      name: 'Verify',
    });

    expect(submitButton).toBeDisabled();
  });
});
