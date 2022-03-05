import {
  AuthEventData,
  FormField,
  LoginMechanism,
  LoginMechanismArray,
  translate,
} from '@aws-amplify/ui';

/**
 * If 'username' is the only login mechanism, then we ask for a user's
 * email and phone number during sign up as well.
 */
export const useAliases = (
  login_mechanisms: LoginMechanism[]
): LoginMechanism[] =>
  login_mechanisms?.length === 1 && login_mechanisms[0] === 'username'
    ? [...LoginMechanismArray]
    : login_mechanisms;

export const facade = {
  error: '',
  hasValidationErrors: false,
  isPending: false,
  route: '',
  user: '',
  validationErrors: {
    val: '',
  },
  codeDeliveryDetails: {
    val: '',
  },
  change: (data?: AuthEventData) => null,
  updateForm: (data?: AuthEventData) => null,
  updateBlur: (data?: AuthEventData) => null,
  resend: (data?: AuthEventData) => null,
  resendCode: (data?: AuthEventData) => null,
  signOut: (data?: AuthEventData) => null,
  federatedSignIn: (data?: AuthEventData) => null,
  toFederatedSignIn: (data?: AuthEventData) => null,
  resetPassword: (data?: AuthEventData) => null,
  toResetPassword: (data?: AuthEventData) => null,
  signIn: (data?: AuthEventData) => null,
  toSignIn: (data?: AuthEventData) => null,
  signUp: (data?: AuthEventData) => null,
  toSignUp: (data?: AuthEventData) => null,
  skip: (data?: AuthEventData) => null,
  skipVerification: (data?: AuthEventData) => null,
  submit: (data?: AuthEventData) => null,
  submitForm: (data?: AuthEventData) => null,
};

interface fieldProps {
  labelHidden: boolean;
  isRequired?: boolean;
  label: string;
  placeholder: string;
  required?: boolean; // TextField input sometimes uses required instead of isRequired
}

export const propsCreator = (
  name: string,
  show: string,
  formOverrides: FormField,
  labelHiddenDefault: boolean = false
): fieldProps => {
  const fo = formOverrides?.[name];
  return {
    labelHidden: fo?.labelHidden ?? labelHiddenDefault,
    required: fo?.required ?? true,
    label: fo?.label ?? translate(show),
    placeholder: fo?.placeholder ?? translate(show),
  };
};
