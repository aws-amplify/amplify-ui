export type AuthState = 'signIn' | 'signUp' | 'signedIn';
export type AuthAttribute = 'username' | 'password' | 'email' | 'phone_number';
export interface AttributeInfo {
  label: string;
  placeholder: string;
}

// maps auth attribute to its repsective labels and placeholder
export type AttributeInfoProvider = () => Record<AuthAttribute, AttributeInfo>;
