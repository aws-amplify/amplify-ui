import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { AuthenticatorFormFieldsComponent } from '@aws-amplify/ui-react-core';

import { RadioFieldOptions, TextFieldOptionsType } from '../../hooks';

export interface FieldErrorsProps {
  style?: StyleProp<TextStyle>;
  errors: string[];
}

export interface DefaultFormFieldsStyle {
  fieldContainerStyle?: StyleProp<ViewStyle>;
  fieldErrorStyle?: FieldErrorsProps['style'];
  fieldLabelStyle?: StyleProp<TextStyle>;
  fieldStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

export type DefaultFormFieldsComponent<FieldsType> =
  AuthenticatorFormFieldsComponent<FieldsType, DefaultFormFieldsStyle>;

export type DefaultTextFormFieldsComponent =
  DefaultFormFieldsComponent<TextFieldOptionsType>;

export type DefaultRadioFormFieldsComponent =
  DefaultFormFieldsComponent<RadioFieldOptions>;
