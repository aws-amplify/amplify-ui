/**
 * This file contains helpers that generate default form fields, given the
 * current Authenticator / Zero Config configuration.
 */
import {
  AuthMachineState,
  FormFields,
  FormFieldComponents,
  FormFieldsArray,
} from '../../../types';
import { getActorState } from '../actor';
import { defaultFormFieldsGetters } from './defaults';
import { applyDefaults, applyTranslation, sortFormFields } from './util';

/** Gets the default formFields for given route/route */
export const getDefaultFormFields = (
  route: FormFieldComponents,
  state: AuthMachineState
): FormFields => {
  const formFieldGetter = defaultFormFieldsGetters[route];
  const formFields: FormFields = formFieldGetter(state);
  return applyTranslation(formFields);
};

/** Gets default formFields, then merges custom formFields into it */
export const getFormFields = (
  route: FormFieldComponents,
  state: AuthMachineState
): FormFields => {
  const defaultFormFields = getDefaultFormFields(route, state);
  const customFormFields =
    getActorState(state).context?.formFields?.[route] || {};
  const formFields = applyDefaults(defaultFormFields, customFormFields);
  delete formFields['QR'];
  return formFields;
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
