import { AuthMachineState } from '../../../../types';
import { defaultFormFieldOptions } from '../../constants';
import {
  getAliasDefaultFormField,
  defaultFormFieldsGetters,
} from '../defaults';

const mockActorContext = {
  actorRef: {
    getSnapshot: () => ({ country_code: '+1' }),
  },
  formFields: {},
  formErrors: {},
  formValues: {},
};

jest.mock('../../actor', () => ({
  getActorContext: () => ({
    context: mockActorContext,
  }),
  getActorState: () => ({
    context: {
      requiredAttributes: ['email', 'custom:test'],
    },
  }),
}));

const state = {
  context: {
    config: {
      loginMechanisms: ['email', 'phone_number'],
      signUpAttributes: ['email'],
    },
  },
} as unknown as AuthMachineState;

const badState = {
  context: {
    config: {
      loginMechanisms: ['test'],
      signUpAttributes: ['test'],
    },
  },
} as unknown as AuthMachineState;

describe('getAliasDefaultFormField', () => {
  it('should return default form field for primary alias', () => {
    const defaultFormField = getAliasDefaultFormField(state);
    expect(defaultFormField).toEqual({
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your Email',
      autocomplete: 'username',
      isRequired: true,
    });
  });
});

describe('defaultFormFieldsGetters', () => {
  it('should return the correct form fields for the "signIn" component', () => {
    const formFields = defaultFormFieldsGetters.signIn(state);

    expect(formFields).toStrictEqual({
      username: defaultFormFieldOptions.email,
      password: {
        ...defaultFormFieldOptions.password,
        autocomplete: 'current-password',
      },
    });
  });

  it('should return the correct form fields for the "signUp" component', () => {
    const formFields = defaultFormFieldsGetters.signUp(state);

    expect(formFields).toStrictEqual({
      email: defaultFormFieldOptions.email,
      phone_number: {
        ...defaultFormFieldOptions.phone_number,
        dialCode: undefined,
      },
      password: defaultFormFieldOptions.password,
      confirm_password: defaultFormFieldOptions.confirm_password,
    });
  });

  it('should return the correct form fields for the "resetPassword" component', () => {
    const formFields = defaultFormFieldsGetters.resetPassword(state);
    expect(formFields).toStrictEqual({
      username: {
        ...defaultFormFieldOptions.email,
        label: 'Enter your email',
        placeholder: 'Enter your email',
      },
    });
  });

  it('should return the correct form fields for the "confirmResetPassword" component', () => {
    const formFields = defaultFormFieldsGetters.confirmResetPassword(state);
    expect(formFields).toStrictEqual({
      confirmation_code: {
        ...defaultFormFieldOptions.confirmation_code,
        label: 'Code *',
        placeholder: 'Code',
      },
      password: {
        ...defaultFormFieldOptions.password,
        label: 'New Password',
        placeholder: 'New Password',
      },
      confirm_password: {
        ...defaultFormFieldOptions.confirm_password,
        label: 'Confirm Password',
        placeholder: 'Confirm Password',
      },
    });
  });

  it('should return the correct form fields for the "forceNewPassword" component', () => {
    const formFields = defaultFormFieldsGetters.forceNewPassword(state);
    expect(formFields).toStrictEqual({
      email: defaultFormFieldOptions.email,
      password: defaultFormFieldOptions.password,
      confirm_password: defaultFormFieldOptions.confirm_password,
    });
  });

  it('console.debug is called with expected message for unsupported signup field', () => {
    const debugSpy = jest.spyOn(console, 'debug');
    defaultFormFieldsGetters.signUp(badState);

    expect(debugSpy).toHaveBeenCalledWith(
      `Authenticator does not have a default implementation for test. Customize SignUp FormFields to add your own.`
    );

    debugSpy.mockRestore();
  });

  it('console.debug is called with expected message for unsupported forceNewPassword field', () => {
    const debugSpy = jest.spyOn(console, 'debug');
    defaultFormFieldsGetters.forceNewPassword(badState);

    expect(debugSpy).toHaveBeenCalledWith(
      `Authenticator does not have a default implementation for custom:test. Customize ForceNewPassword FormFields to add your own.`
    );

    debugSpy.mockRestore();
  });
});
