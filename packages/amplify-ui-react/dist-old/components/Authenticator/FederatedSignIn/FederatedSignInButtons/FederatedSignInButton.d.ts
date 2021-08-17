import { FederatedIdentityProviders } from '@aws-amplify/ui-core';
export interface FederatedSignInButtonProps {
  provider: FederatedIdentityProviders;
  text: string;
}
export declare const FederatedSignInButton: (
  props: FederatedSignInButtonProps
) => JSX.Element;
