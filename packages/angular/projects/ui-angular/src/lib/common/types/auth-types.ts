import { PartialRecord } from './common-types';

export type AuthState = 'signIn' | 'signUp' | 'signedIn';

export type AuthAttribute = 'username' | 'password' | 'email' | 'phone_number';

export interface AttributeInfo {
  label: string;
  placeholder: string;
}

export type AuthFormData = PartialRecord<AuthAttribute, string> & {
  [customField: string]: string;
}; // custom field provided for custom input fields from customer

// maps auth attribute to its repsective labels and placeholder
export type AttributeInfoProvider = () => Record<AuthAttribute, AttributeInfo>;
