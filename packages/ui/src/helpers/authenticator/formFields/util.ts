import cloneDeep from 'lodash/cloneDeep';
import { translate } from '../../../i18n/translations';
import { FormFields, SortedFormFields } from '../../../types';

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

export const sortFormfields = (formFields: FormFields): SortedFormFields => {
  return Object.entries(formFields)
    .sort((a, b) => {
      const orderA = a[1].order || Number.MAX_VALUE;
      const orderB = b[1].order || Number.MAX_VALUE;
      return orderA - orderB;
    })
    .filter((formFieldEntry) => formFieldEntry[1] !== undefined);
};

export const applyDefaults = (
  defaultFormFields: FormFields,
  customFormFields: FormFields
) => {
  let formFields = cloneDeep(defaultFormFields);
  Object.keys(customFormFields).forEach((field) => {
    formFields[field] = { ...formFields[field], ...customFormFields[field] };
  });
  return formFields;
};
