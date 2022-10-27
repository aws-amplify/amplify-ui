import {
  TextFieldProps,
  PasswordFieldProps,
  PhoneNumberFieldProps,
  RadioProps,
} from '../../../primitives';

type RadioFieldOnBlur = RadioProps<string>['onBlur'];
export type TextFieldOnBlur = TextFieldProps['onBlur'];
export type OnChangeText = TextFieldProps['onChangeText'];

type FieldOptions<FieldProps, Type extends AuthenticatorFieldTypeKey> = {
  type: Type;
  name: string;
  required?: boolean;
  onBlur?: Type extends 'radio' ? RadioFieldOnBlur : TextFieldOnBlur;
} & Omit<FieldProps, 'disabled' | 'onBlur'>;

export type PasswordFieldOptions = FieldOptions<PasswordFieldProps, 'password'>;
export type PhoneFieldOptions = FieldOptions<PhoneNumberFieldProps, 'phone'>;
export type DefaultFieldOptions = FieldOptions<TextFieldProps, 'default'>;
export type TextFieldOptionsType =
  | PasswordFieldOptions
  | PhoneFieldOptions
  | DefaultFieldOptions;

export type RadioFieldOptions = FieldOptions<RadioProps<string>, 'radio'>;

/**
 * `field` options union
 */
export type TypedField = RadioFieldOptions | TextFieldOptionsType;

export type MachineFieldTypeKey = 'password' | 'tel';
export type AuthenticatorFieldTypeKey =
  | 'password'
  | 'phone'
  | 'default'
  | 'radio';
