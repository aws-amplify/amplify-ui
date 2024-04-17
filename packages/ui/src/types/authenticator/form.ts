import { ResourcesConfig } from 'aws-amplify';
import { AuthFieldsWithDefaults } from './attributes';

/**
 * Map of each input name to its value
 */
export type AuthFormData = Record<string, string>;
export type AuthTouchData = Record<string, boolean>;

/**
 * List of routes that support custom formFields
 */
export type FormFieldComponents =
  | 'signIn'
  | 'signUp'
  | 'forceNewPassword'
  | 'confirmResetPassword'
  | 'confirmSignIn'
  | 'confirmSignUp'
  | 'confirmVerifyUser'
  | 'forgotPassword'
  | 'setupTotp';

/**
 * Used to customize form field attributes for each authenticator screen.
 */
export type AuthFormFields = {
  [key in FormFieldComponents]?: FormFields;
};

/**
 * Override option for each screen. Maps each input to override options.
 */
export interface FormFields {
  // TODO(breaking): `name` should be part of `FormFieldsOptions` instead of as a key here.
  [field_name: string]: FormFieldOptions;
}

/**
 * Override options for each field
 */
export interface FormFieldOptions {
  /** Will hide the label above the input if set to true */
  labelHidden?: boolean;
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /**
   * @deprecated For internal use only, please use `isRequired` instead.
   */
  required?: boolean;
  /** Whether this field is required for submission */
  isRequired?: boolean;
  /** Default dial code value */
  dialCode?: string;
  /** TOTP issuer to be used in the QR setup */
  totpIssuer?: string;
  /** TOTP username to be used in the QR */
  totpUsername?: string;
  /** List of dial codes you want to show in phone number field */
  dialCodeList?: Array<string>;
  /** Integer that denotes where this field should be positioned in. */
  order?: number;
  /** Desired HTML input type */
  type?: string;
  /** Desired autocomplete HTML attribute */
  autocomplete?: string;
  /** Whether the first character is auto-capitalized */
  autocapitalize?: string;
}

export interface LegacyFormFieldOptions extends FormFieldOptions {
  name: string;
}

/** Default formField values for each supported auth field */
export type DefaultFormFieldOptions = Record<
  AuthFieldsWithDefaults,
  FormFieldOptions
>;

/** Ordered list of formFields */
export type FormFieldsArray = Array<[string, FormFieldOptions]>;

type AuthConfig = NonNullable<ResourcesConfig['Auth']>;
type CognitoConfig = NonNullable<AuthConfig['Cognito']>;
export type PasswordSettings = CognitoConfig['passwordFormat'];
