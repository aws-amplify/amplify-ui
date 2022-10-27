import { AuthenticatorLegacyField } from '@aws-amplify/ui-react-core';

import { KEY_ALLOW_LIST } from './constants';
import {
  TypedField,
  AuthenticatorFieldTypeKey,
  MachineFieldTypeKey,
} from './types';

const isKeyAllowed = (key: string) =>
  KEY_ALLOW_LIST.some((allowedKey) => allowedKey === key);

const isValidMachineFieldType = (
  type: string | undefined
): type is MachineFieldTypeKey => type === 'password' || type === 'tel';

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

  return Object.entries(field).reduce(
    (acc, [key, value]) => {
      // early return if key is not allowed
      if (!isKeyAllowed(key)) {
        return acc;
      }

      // map to `required` prop
      if (key === 'isRequired' || key === 'required') {
        // `TypedField` props expects `required` key
        return { ...acc, required: value as boolean };
      }

      const isPhoneFieldType = type === 'phone';

      if (isPhoneFieldType && key === 'dialCode') {
        return { ...acc, defaultDialCode: value as string };
      }

      if (isPhoneFieldType && key === 'dialCodeList') {
        return { ...acc, dialCodes: value as string[] };
      }

      return { ...acc, [key]: value };
    },
    // initialize `acc` with field `name` and `type`
    { name, type } as TypedField
  );
};

/**
 *
 * @param {AuthenticatorLegacyField[]} fields machine field options array
 * @returns {TypedField[]} UI field props array
 */
export const getTypedFields = (
  fields: AuthenticatorLegacyField[]
): TypedField[] => fields?.map(getTypedField);
