import { FederatedIdentityElements } from './context/elements';
import {
  UseHandleSignInWithRedirect,
  FederatedIdentity,
  CreateFederatedIdentityInput,
} from './types';

export function createFederatedIdentity<
  T extends Partial<FederatedIdentityElements>,
  K extends string = string,
>(
  input: CreateFederatedIdentityInput<T, K>
): {
  FederatedIdentity: FederatedIdentity<T>;
  useHandleSignInWithRedirect?: UseHandleSignInWithRedirect<K>;
};
