/**
 * This file contains helpers that generate default form fields, given the
 * current Authenticator / Zero Config configuration.
 */
import {
  AuthMachineState,
  FormFields,
  FormFieldComponents,
  FormFieldsArray,
  isAuthFieldsWithDefaults,
} from '../../../types';
import { getActorState } from '../actor';
import { defaultFormFieldOptions } from '../constants';
import { defaultFormFieldsGetters } from './defaults';
import { applyTranslation, sortFormFields } from './util';

// Gets the default formFields for given route
export const getDefaultFormFields = (
  route: FormFieldComponents,
  state: AuthMachineState
): FormFields => {
  const formFieldGetter = defaultFormFieldsGetters[route];
  return formFieldGetter(state);
};

// Gets custom formFields, and applies default values
const getCustomFormFields = (
  route: FormFieldComponents,
  state: AuthMachineState
): FormFields => {
  const customFormFields = getActorState(state).context?.formFields?.[route];

  if (!customFormFields) {
    return {};
  }

  return Object.entries(customFormFields).reduce(
    (acc, [fieldName, customOptions]) => {
      if (isAuthFieldsWithDefaults(fieldName)) {
        // if this field is a known auth attribute that we have defaults for,
        // apply default to miss any gaps that are not present in customOptions
        const defaultOptions = defaultFormFieldOptions[fieldName];
        const mergedOptions = { ...defaultOptions, ...customOptions };

        return { ...acc, [fieldName]: mergedOptions };
      } else {
        // if this is not a known field, use customOptions as is.
        return { ...acc, [fieldName]: customOptions };
      }
    },
    {} as FormFields
  );
};

export const getFormFields = (
  route: FormFieldComponents,
  state: AuthMachineState
): FormFields => {
  const defaultFormFields = getDefaultFormFields(route, state);
  const customFormFields = getCustomFormFields(route, state);
  const formFields: FormFields = { ...defaultFormFields, ...customFormFields };
  delete formFields['QR'];
  return applyTranslation(formFields);
};

export const removeOrderKeys = (formFields: FormFieldsArray): FormFieldsArray =>
  formFields.map((field) => {
    const key = field[0];
    // Drop order key to prevent passing to form field UI components
    const values = { ...field[1], order: undefined };
    return [key, values];
  });

/** Calls `getFormFields` above, then sorts it into an indexed array */
export const getSortedFormFields = (
  route: FormFieldComponents,
  state: AuthMachineState
): FormFieldsArray => {
  const formFields = getFormFields(route, state);
  return removeOrderKeys(sortFormFields(formFields));
};
