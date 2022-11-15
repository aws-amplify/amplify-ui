import {
  AuthenticatorComponentDefaultProps,
  AuthenticatorRouteComponentName,
} from '@aws-amplify/ui-react-core';

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
}

export interface UseFieldValues<FieldType extends TypedField> {
  fields: FieldType[]; // return either radio or text
  disableFormSubmit: boolean;
  handleFormSubmit: () => void;
}
