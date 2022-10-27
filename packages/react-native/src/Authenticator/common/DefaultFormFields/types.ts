import { StyleProp, TextStyle } from 'react-native';

export interface FieldErrorsProps {
  style?: StyleProp<TextStyle>;
  errors: string[];
}

export interface DefaultFormFieldStyle {
  field: TextStyle;
  error: TextStyle;
}
