import {
  AuthenticatorComponentDefaultProps,
  AuthenticatorRouteComponentName,
  AuthenticatorMachineContext,
} from '@aws-amplify/ui-react-core';
import { ValidationError } from '@aws-amplify/ui';

import { TypedField } from '../types';

export type MachineEventHandlers = Pick<
  AuthenticatorComponentDefaultProps[AuthenticatorRouteComponentName],
  'handleBlur' | 'handleChange' | 'handleSubmit'
>;

export interface UseFieldValuesParams<FieldType extends TypedField> {
  componentName: AuthenticatorRouteComponentName;
  fields: FieldType[];

  /**
   * machine "BLUR" event handler, validates `field` value against machine validation rules
   */
  handleBlur: MachineEventHandlers['handleBlur'];
  /**
   * machine "CHANGE"" event handler, validates `field` value against machine validation rules
   */
  handleChange: MachineEventHandlers['handleChange'];
  /**
   * machine "SUBMIT"" event handler, validates `field` value against machine validation rules
   */
  handleSubmit: MachineEventHandlers['handleSubmit'];

  validationErrors?: AuthenticatorMachineContext['validationErrors'];
}

export interface UseFieldValues<FieldType extends TypedField> {
  fields: FieldType[]; // return either radio or text
  fieldValidationErrors: ValidationError | undefined;
  disableFormSubmit: boolean;
  handleFormSubmit: () => void;
}
