export type AuthState = 'signIn' | 'signUp' | 'signedIn';
export type AuthAttribute = 'username' | 'password';
export interface AttributeInfo {
  label: string;
  placeholder: string;
}

export type AttributeInfoProvider = () => Record<AuthAttribute, AttributeInfo>;
