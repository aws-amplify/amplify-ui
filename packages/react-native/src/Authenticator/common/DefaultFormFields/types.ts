import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  AuthenticatorFormFieldsComponent,
  UseAuthenticator,
} from '@aws-amplify/ui-react-core';

import { RadioFieldOptions, TextFieldOptionsType } from '../../hooks';

export type FieldProps = Omit<TextFieldOptionsType, 'name'> & {
  disabled: boolean;
};

export interface FieldErrorsProps {
  errors: string[];
  errorStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

export interface DefaultFormFieldsStyle {
  fieldContainerStyle?: StyleProp<ViewStyle>;
  fieldErrorsContainer?: FieldErrorsProps['style'];
  fieldErrorStyle?: FieldErrorsProps['errorStyle'];
  fieldLabelStyle?: StyleProp<TextStyle>;
  fieldStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

export type DefaultFormFieldsComponent<FieldsType> =
  AuthenticatorFormFieldsComponent<FieldsType, DefaultFormFieldsStyle>;

interface FormFieldsProps extends DefaultFormFieldsStyle {
  isPending?: UseAuthenticator['isPending'];
  validationErrors?: UseAuthenticator['validationErrors'];
}

export interface DefaultTextFormFieldsProps extends FormFieldsProps {
  fields?: TextFieldOptionsType[];
}

export interface DefaultRadioFormFieldsProps extends FormFieldsProps {
  fields?: RadioFieldOptions[];
}
