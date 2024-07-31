import { FederatedIdentitiesElements } from './context/elements';
import { FederatedIdentities } from './controls';
import {
  UseHandleSignInWithRedirect,
  CreateFederatedIdentitiesInput,
} from './types';

export function createFederatedIdentities<
  T extends Partial<FederatedIdentitiesElements>,
  K extends string = string,
>(
  input: CreateFederatedIdentitiesInput<T, K>
): {
  FederatedIdentities: FederatedIdentities;
  useHandleSignInWithRedirect?: UseHandleSignInWithRedirect<K>;
};
