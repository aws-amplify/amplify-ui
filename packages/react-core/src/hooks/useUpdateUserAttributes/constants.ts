import {
  updateUserAttributes,
  UpdateUserAttributesInput,
} from '@aws-amplify/auth';

import { Hub } from '@aws-amplify/core';

import useDataState from '../useDataState';
import { UpdateAttributesOutput, UseUpdateUserAttributes } from './types';

// Default object to be passed into useDataState
export const defaultUpdateUserAttributesOutput: UpdateAttributesOutput = {};

// In the tests, I see the output from this as everything included on the defaultUpdateUserAttributesOutput overlaid with the resolved mockOutput. In reality, the API only returns the attributes included on the update request.
export const updateUserAttributesAction = async (
  _prev: Awaited<UpdateAttributesOutput | undefined>,
  input: UpdateUserAttributesInput
): Promise<UpdateAttributesOutput | undefined> => {
  try {
    const result = await updateUserAttributes(input);
    Hub.dispatch('ui', {
      event: 'FETCH_ATTRIBUTES',
      message: 'attributes updated successfully',
    });
    return result;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const useUpdateUserAttributes = (): UseUpdateUserAttributes =>
  useDataState(updateUserAttributesAction, undefined);
