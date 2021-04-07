import { AuthAttribute, AuthFormData } from './auth-types';
import { PartialRecord } from './common-types';

export type ErrorMessage = string;

export type FieldError = {
  field?: string;
  message: ErrorMessage;
};

export type FormError = PartialRecord<AuthAttribute, ErrorMessage[]> & {
  cross_field?: ErrorMessage[];
  [custom_attributes: string]: ErrorMessage[];
};

export type OnSubmitHookResponse = {
  data?: AuthFormData;
  error?: FormError;
};

export type OnSubmitHook = (formData: AuthFormData) => OnSubmitHookResponse;
