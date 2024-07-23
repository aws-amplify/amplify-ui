import {
  useHandleSignInWithRedirect,
  FederatedIdentity,
  FederatedIdentityInput,
} from './types';
import { FederatedIdentityElements } from './context/elements';

export function createFederatedIdentity<
  T extends Partial<FederatedIdentityElements>,
  K extends string = string,
>(
  input: FederatedIdentityInput<T, K>
): {
  FederatedIdentity: FederatedIdentity<T>;
  useHandleSignInWithRedirect?: useHandleSignInWithRedirect<K>;
};
