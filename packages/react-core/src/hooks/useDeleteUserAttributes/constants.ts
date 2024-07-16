import {
  deleteUserAttributes,
  DeleteUserAttributesInput,
} from '@aws-amplify/auth';

import { Hub } from '@aws-amplify/core';

import useDataState from '../useDataState';
import { UseDeleteUserAttributes } from './types';

export const deleteUserAttributesAction = async (
  _prev: Awaited<ReturnType<typeof deleteUserAttributes>>,
  input: DeleteUserAttributesInput
): Promise<void> => {
  try {
    const result = await deleteUserAttributes(input);
    Hub.dispatch('ui', {
      event: 'FETCH_ATTRIBUTES',
      message: 'attributes deleted successfully',
    });
    return result;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const useDeleteUserAttributes = (): UseDeleteUserAttributes =>
  useDataState(deleteUserAttributesAction, undefined);
