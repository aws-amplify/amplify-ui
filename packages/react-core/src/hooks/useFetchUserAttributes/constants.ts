import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from '@aws-amplify/auth';

import useDataState from '../useDataState';
import { UseFetchUserAttributes } from './types';
import { UserAttributes } from '@aws-amplify/ui';

export const DefaultAttributes: UserAttributes = {
  email: undefined,
  phone_number: undefined,
  address: undefined,
  birthdate: undefined,
  email_verified: undefined,
  family_name: undefined,
  gender: undefined,
  given_name: undefined,
  locale: undefined,
  middle_name: undefined,
  name: undefined,
  nickname: undefined,
  phone_number_verified: undefined,
  picture: undefined,
  preferred_username: undefined,
  profile: undefined,
  sub: undefined,
  updated_at: undefined,
  website: undefined,
  zoneinfo: undefined,
};

export const fetchUserAttributesAction = async (
  _prev: Awaited<ReturnType<typeof fetchUserAttributes>>
): Promise<FetchUserAttributesOutput> => {
  try {
    const result = await fetchUserAttributes();
    return result;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const useFetchUserAttributes = (): UseFetchUserAttributes =>
  useDataState(fetchUserAttributesAction, DefaultAttributes);

// Describes actions passed to useDataState
export interface Actions {
  fetch: typeof fetchUserAttributesAction;
}

export interface UseActions {
  fetch: UseFetchUserAttributes;
}
