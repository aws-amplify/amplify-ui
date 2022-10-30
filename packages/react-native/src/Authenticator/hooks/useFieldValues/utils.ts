import { Logger } from 'aws-amplify';
import { AuthenticatorRouteComponentName } from '@aws-amplify/ui-react-core';

import { RadioFieldOptions, TypedField } from '../types';

const logger = new Logger('Authenticator');

export const isRadioFieldOptions = (
  field: TypedField
): field is RadioFieldOptions => field?.type === 'radio';

export const getSanitizedRadioFields = (
  fields: TypedField[],
  componentName: AuthenticatorRouteComponentName
): TypedField[] => {
  const values: Record<string, boolean> = {};

  return fields.filter((field) => {
    if (!isRadioFieldOptions(field)) {
      logger.warn(
        `${componentName} component does not support text fields. field with type ${field.type} has been ignored.`
      );
      return false;
    }

    const { value } = field;

    if (!value) {
      logger.warn(
        'Each radio field must have a value. field has been ignored.'
      );
      return false;
    }

    if (values[value]) {
      logger.warn(
        `Each radio field value must be unique. field with duplicate value of ${value} has been ignored.`
      );
      return false;
    }

    // add `value` key to `values`
    values[value] = true;

    return true;
  });
};

export const getSanitizedTextFields = (
  fields: TypedField[],
  componentName: AuthenticatorRouteComponentName
): TypedField[] => {
  const names: Record<string, boolean> = {};
  return fields.filter((field) => {
    if (isRadioFieldOptions(field)) {
      logger.warn(
        `${componentName} component does not support radio fields. field has been ignored.`
      );
      return false;
    }

    const { name } = field;

    if (!name) {
      logger.warn('Each field must have a name. field has been ignored.');
      return false;
    }

    if (names[name]) {
      logger.warn(
        `Each field name must be unique. field with duplicate name of ${name} has been ignored.`
      );
      return false;
    }

    names[name] = true;

    return true;
  });
};
