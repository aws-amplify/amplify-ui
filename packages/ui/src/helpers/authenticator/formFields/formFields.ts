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
  return formFields;
};

/** Calls `getFormFields` above, then sorts it into an indexed array */
export const getSortedFormFields = (
  route: FormFieldComponents,
  state: AuthMachineState
): FormFieldsArray => {
  const formFields = getFormFields(route, state);
  return sortFormFields(formFields);
};
