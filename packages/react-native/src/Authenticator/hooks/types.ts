import {
  TextFieldProps,
  PasswordFieldProps,
  PhoneNumberFieldProps,
  RadioProps,
} from '../../primitives';

export type MachineFieldTypeKey = 'password' | 'tel';
export type AuthenticatorFieldTypeKey =
  | 'password'
  | 'phone'
  | 'default'
  | 'radio';

type RadioFieldOnBlur = RadioProps<string>['onBlur'];
export type TextFieldOnBlur = TextFieldProps['onBlur'];
export type OnChangeText = TextFieldProps['onChangeText'];

type FieldOptions<FieldProps, Type extends AuthenticatorFieldTypeKey> = {
  type: Type;
  name: string;
  required?: boolean;
  onBlur?: Type extends 'radio' ? RadioFieldOnBlur : TextFieldOnBlur;
} & Omit<FieldProps, 'disabled' | 'onBlur'>;

type PasswordFieldOptions = FieldOptions<PasswordFieldProps, 'password'>;
type PhoneFieldOptions = FieldOptions<PhoneNumberFieldProps, 'phone'>;
type DefaultFieldOptions = FieldOptions<TextFieldProps, 'default'>;
export type TextFieldOptionsType =
  | PasswordFieldOptions
  | PhoneFieldOptions
  | DefaultFieldOptions;

export type RadioFieldOptions = FieldOptions<RadioProps<string>, 'radio'>;

/**
 * `field` options union
 */
export type TypedField = RadioFieldOptions | TextFieldOptionsType;
