import {
  TextFieldProps,
  PasswordFieldProps,
  PhoneNumberFieldProps,
  RadioProps,
} from '../../primitives';

export type MachineFieldTypeKey = 'password' | 'tel';
export type AuthenticatorFieldTypeKey =
  | 'email'
  | 'password'
  | 'phone'
  | 'default'
  | 'radio';

type RadioFieldOnBlur = RadioProps<string>['onBlur'];
export type TextFieldOnBlur = TextFieldProps['onBlur'];
export type OnChangeText = TextFieldProps['onChangeText'];

type FieldOptions<FieldProps, Type extends AuthenticatorFieldTypeKey> = {
  name: string;
  onBlur?: Type extends 'radio' ? RadioFieldOnBlur : TextFieldOnBlur;
  required?: boolean;
  type: Type;
} & Omit<FieldProps, 'disabled' | 'onBlur'>;

type EmailFieldOptions = FieldOptions<PhoneNumberFieldProps, 'email'>;
type PasswordFieldOptions = FieldOptions<PasswordFieldProps, 'password'>;
type PhoneFieldOptions = FieldOptions<PhoneNumberFieldProps, 'phone'>;
type DefaultFieldOptions = FieldOptions<TextFieldProps, 'default'>;
export type TextFieldOptionsType = (
  | EmailFieldOptions
  | PasswordFieldOptions
  | PhoneFieldOptions
  | DefaultFieldOptions
) & { labelHidden?: boolean };

export type RadioFieldOptions = FieldOptions<RadioProps<string>, 'radio'>;

/**
 * `field` options union
 */
export type TypedField = RadioFieldOptions | TextFieldOptionsType;
