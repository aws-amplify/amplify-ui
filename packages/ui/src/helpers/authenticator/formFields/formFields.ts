/**
 * This file contains helpers that generate default form fields, given the
 * current Authenticator / Zero Config configuration.
 */
import {
  AuthMachineState,
  FormFields,
  FormFieldComponents,
  SortedFormFields,
} from '../../../types';
import { getActorState } from '../actor';
import { defaultFormFieldsGetters } from './defaults';
import { applyDefaults, applyTranslation, sortFormFields } from './util';

export const getDefaultFormFields = (
  component: FormFieldComponents,
  state: AuthMachineState
): FormFields => {
  const formFieldGetter = defaultFormFieldsGetters[component];
  const formFields: FormFields = formFieldGetter(state);
  return applyTranslation(formFields);
};

export const getFormFields = (
  component: FormFieldComponents,
  state: AuthMachineState
): FormFields => {
  const defaultFormFields = getDefaultFormFields(component, state);
  const customFormFields =
    getActorState(state).context?.formFields?.[component] || {};
  const formFields = applyDefaults(defaultFormFields, customFormFields);
  return formFields;
};

export const getSortedFormFields = (
  component: FormFieldComponents,
  state: AuthMachineState
): SortedFormFields => {
  const formFields = getFormFields(component, state);
  return sortFormFields(formFields);
};
