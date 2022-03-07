import {
  AuthMachineState,
  FormFields,
  FormFieldComponents,
  FormField,
} from '../../../types';
import cloneDeep from 'lodash/cloneDeep';
import { formFieldsGetters } from './defaults';
import { applyTranslation } from './util';

export const getDefaultFormFields = (
  component: FormFieldComponents,
  state: AuthMachineState
): FormFields => {
  const getFormField = formFieldsGetters[component];
  const formFields: FormFields = getFormField(state);
  return applyTranslation(formFields);
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

export type SortedFormFields = Array<[string, FormField]>;

export const sortFormfields = (formFields: FormFields): SortedFormFields => {
  return Object.entries(formFields)
    .sort((a, b) => {
      const orderA = a[1].order || Number.MAX_VALUE;
      const orderB = b[1].order || Number.MAX_VALUE;
      return orderA - orderB;
    })
    .filter((formFieldEntry) => formFieldEntry[1] !== undefined);
};
