import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from '@aws-amplify/auth';

import useDataState from '../useDataState';
import { UseFetchUserAttributes } from './types';

export const fetchUserAttributesAction = async (
  _prev: Awaited<ReturnType<typeof fetchUserAttributes> | undefined>
): Promise<FetchUserAttributesOutput> => {
  try {
    const result = await fetchUserAttributes();
    return result;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const useFetchUserAttributes = (): UseFetchUserAttributes =>
  useDataState(fetchUserAttributesAction, undefined);
