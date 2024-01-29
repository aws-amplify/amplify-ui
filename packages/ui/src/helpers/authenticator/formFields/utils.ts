import { translate } from '../../../i18n/translations';
import { FormFields, FormFieldsArray } from '../../../types';
import { AuthMachineState } from '../../../machines/authenticator/types';

export const getPrimaryAlias = (state: AuthMachineState) => {
  const loginMechanisms = state?.context.config?.loginMechanisms;
  /**
   * @migration this is where we grab only the first index of `aws_cognito_username_attributes`
   */
  const [primaryAlias] = loginMechanisms ?? ['username'];
  return primaryAlias;
};

/** Applies translations to label and placeholder */
export const applyTranslation = (formFields: FormFields): FormFields => {
  const newFormFields = { ...formFields };
  for (const [name, options] of Object.entries(formFields)) {
    const { label, placeholder } = options;

    newFormFields[name] = {
      ...options,
      label: label ? translate<string>(label) : undefined,
      placeholder: placeholder ? translate<string>(placeholder) : undefined,
    };
  }
  return newFormFields;
};

/** Sorts formFields according to their `order`.  */
export const sortFormFields = (formFields: FormFields): FormFieldsArray => {
  return Object.entries(formFields)
    .sort((a, b) => {
      const orderA = a[1].order || Number.MAX_VALUE;
      const orderB = b[1].order || Number.MAX_VALUE;
      return orderA - orderB;
    })
    .filter((formFieldEntry) => formFieldEntry[1] !== undefined);
};
