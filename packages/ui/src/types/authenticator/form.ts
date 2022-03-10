/**
 * Map of each input name to its value
 */
export type AuthFormData = Record<string, string>;

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
  | 'resetPassword'
  | 'setupTOTP';

/**
 * Used to customize form field attributes for each authenticator screen.
 */
export type FormFields = {
  [key in FormFieldComponents]?: FormField;
};

/**
 * Override option for each screen. Maps each input to override options.
 */
export interface FormField {
  [key: string]: FormFieldOptions;
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
}

export type PasswordPolicyRules =
  | 'REQUIRES_LOWERCASE'
  | 'REQUIRES_NUMBERS'
  | 'REQUIRES_SYMBOLS'
  | 'REQUIRES_UPPERCASE';
export interface PasswordSettings {
  passwordPolicyMinLength: number;
  passwordPolicyCharacters: Array<PasswordPolicyRules>;
}
