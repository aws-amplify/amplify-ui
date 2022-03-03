export type AuthFormData = Record<string, string>;

export type formFieldComponents =
  | 'signIn'
  | 'signUp'
  | 'forceNewPassword'
  | 'confirmResetPassword'
  | 'confirmSignIn'
  | 'confirmSignUp'
  | 'confirmVerifyUser'
  | 'resetPassword'
  | 'setupTOTP';

export type FormFields = {
  [key in formFieldComponents]?: formField;
};
export interface formField {
  [key: string]: formFieldTypes;
}

export interface formFieldTypes {
  labelHidden?: boolean;
  label?: string;
  placeholder?: string;
  /**
   * @deprecated Internal use only, please use `isRequired` instead.
   */
  required?: boolean;
  isRequired?: boolean;
  dialCode?: string;
  totpIssuer?: string;
  totpUsername?: string;
  dialCodeList?: Array<string>;
  order?: number;
}
