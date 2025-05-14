import type React from 'react';
import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

import type {
  AuthenticatorComponentDefaultProps,
  AuthenticatorHeaderComponent,
  AuthenticatorFooterComponent,
  AuthenticatorMachineContext,
  AuthenticatorRouteComponentName,
} from '@aws-amplify/ui-react-core';

import type { ButtonProps } from '../../../primitives';

import type {
  DefaultFormFieldsComponent,
  DefaultFormFieldsStyle,
} from '../../common';
import type { TextFieldOptionsType, RadioFieldOptions } from '../../hooks';

export interface DefaultContentStyle {
  body?: TextStyle;
  buttonPrimary?: ViewStyle;
  buttonPrimaryLabel?: TextStyle;
  buttonSecondary?: ViewStyle;
  buttonSecondaryLabel?: TextStyle;
  errorMessage?: ViewStyle;
  errorMessageIcon?: ImageStyle;
  errorMessageLabel?: TextStyle;
  fieldErrorsContainer?: ViewStyle;
  fieldContainer?: ViewStyle;
  fieldError?: TextStyle;
  fieldLabel?: TextStyle;
  fieldStyle?: TextStyle;
  footer?: TextStyle;
  formFields?: ViewStyle;
  header?: TextStyle;
  link?: ViewStyle;
  linksContainer?: ViewStyle;
}

export type DefaultContentStyleProps = {
  [Key in keyof DefaultContentStyle]: StyleProp<DefaultContentStyle[Key]>;
} & DefaultFormFieldsStyle;

type DefaultComponentProps<FieldsType> =
  AuthenticatorComponentDefaultProps<FieldsType>[AuthenticatorRouteComponentName];

type AuthenticatorButtonProps = Omit<ButtonProps, 'children'> & {
  children: string;
};

type DefaultButtons = {
  primary: AuthenticatorButtonProps;
  secondary?: AuthenticatorButtonProps;
  links?: AuthenticatorButtonProps[];
};

export type DefaultContentProps<
  FieldsType extends
    | TextFieldOptionsType
    | RadioFieldOptions
    | unknown = unknown,
> = Pick<DefaultComponentProps<FieldsType>, 'error' | 'isPending'> & {
  buttons: DefaultButtons;
  body?: React.ReactNode;
  fields: FieldsType[];
  headerText: string;
  Footer: AuthenticatorFooterComponent<{ style?: StyleProp<TextStyle> }>;
  FormFields: DefaultFormFieldsComponent<FieldsType>;
  Header: AuthenticatorHeaderComponent<{ style?: StyleProp<TextStyle> }>;
  validationErrors?: AuthenticatorMachineContext['validationErrors'];
};
