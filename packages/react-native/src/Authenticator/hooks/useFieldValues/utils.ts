import { ConsoleLogger as Logger } from 'aws-amplify/utils';
import {
  authenticatorTextUtil,
  isString,
  isUnverifiedContactMethodType,
  isValidEmail,
  UnverifiedContactMethodType,
  ValidationError,
} from '@aws-amplify/ui';
import {
  AuthenticatorLegacyField,
  AuthenticatorRouteComponentName,
  isAuthenticatorComponentRouteKey,
  UseAuthenticator,
} from '@aws-amplify/ui-react-core';

import {
  AuthenticatorFieldTypeKey,
  MachineFieldTypeKey,
  RadioFieldOptions,
  TextFieldOptionsType,
  TypedField,
} from '../types';
import { KEY_ALLOW_LIST } from './constants';

const logger = new Logger('Authenticator');

const { getInvalidEmailText, getRequiredFieldText } = authenticatorTextUtil;

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

    const { name, value } = field;

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

    if (!isUnverifiedContactMethodType(name)) {
      logger.warn(
        `field with name '${name}' has been ignored. Supported values are: ${Object.values(
          UnverifiedContactMethodType
        )}.`
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

// typed fields utils
const isKeyAllowed = (key: string) =>
  KEY_ALLOW_LIST.some((allowedKey) => allowedKey === key);

const isValidMachineFieldType = (
  type: string | undefined
): type is MachineFieldTypeKey =>
  type === 'password' || type === 'tel' || type == 'email';

const getFieldType = (type: string | undefined): AuthenticatorFieldTypeKey => {
  if (isValidMachineFieldType(type)) {
    return type === 'tel' ? 'phone' : type;
  }
  return 'default';
};

/**
 * Translate machine fields to typed fields
 *
 * @param {AuthenticatorLegacyField} field machine field option object
 * @returns {TypedField} UI field props object
 */
export const getTypedField = ({
  type: machineFieldType,
  name,
  ...field
}: AuthenticatorLegacyField): TypedField => {
  const type = getFieldType(machineFieldType);
  const testID = `authenticator__text-field__input-${name}`;

  return Object.entries(field).reduce(
    (acc, [key, value]) => {
      // early return if key is not allowed
      if (!isKeyAllowed(key)) {
        return acc;
      }

      // map to `required` prop
      if (key === 'isRequired' || key === 'required') {
        // `TypedField` props expects `required` key
        return { ...acc, required: value as boolean, testID };
      }

      return { ...acc, [key]: value, testID };
    },
    // initialize `acc` with field `name` and `type`
    { name, type } as TypedField
  );
};

/**
 * @param {AuthenticatorLegacyField[]} fields machine field options array
 * @returns {TypedField[]} UI field props array
 */
export const getTypedFields = (
  fields: AuthenticatorLegacyField[]
): TypedField[] => fields?.map(getTypedField);

export function getRouteTypedFields({
  fields,
  route,
}: Pick<UseAuthenticator, 'fields' | 'route'>): TypedField[] {
  const isComponentRoute = isAuthenticatorComponentRouteKey(route);

  if (!isComponentRoute) {
    return [];
  }

  // `VerifyUser` does not require additional updates to the shape of `fields`
  const isVerifyUserRoute = route === 'verifyUser';
  const radioFields = fields as TypedField[];

  return isVerifyUserRoute ? radioFields : getTypedFields(fields);
}

/**
 *
 * @param {TextFieldOptionsType} field text field type
 * @param {string | undefined} value text field value
 * @param {string[]} stateValidations validation errors array from state machine
 * @returns {string[]} field errors array
 */
export const runFieldValidation = (
  field: TextFieldOptionsType,
  value: string | undefined,
  stateValidations: ValidationError | undefined
): string[] => {
  const fieldErrors: string[] = [];
  if (field.required && !value) {
    fieldErrors.push(getRequiredFieldText());
  }
  if (field.type === 'email') {
    if (!isValidEmail(value?.trim())) {
      fieldErrors.push(getInvalidEmailText());
    }
  }

  // add state machine validation errors, if any
  const stateFieldValidation = stateValidations?.[field.name];
  if (stateFieldValidation) {
    if (isString(stateFieldValidation)) {
      fieldErrors.push(stateFieldValidation);
    } else {
      return fieldErrors.concat(stateFieldValidation);
    }
  }

  return fieldErrors;
};
