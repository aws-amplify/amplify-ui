import {
  updateUserAttributes,
  UpdateUserAttributesInput,
} from '@aws-amplify/auth';

import { Hub } from '@aws-amplify/core';

import useDataState from '../useDataState';
import {
  UpdateAttributesOutput,
  UpdateData,
  UseUpdateUserAttributes,
} from './types';

// Default object to be passed into useDataState
export const defaultUpdateUserAttributesOutput: UpdateAttributesOutput = {};

export const DefaultUpdate: UpdateData = {
  email: {
    nextStep: undefined,
  },
  phone_number: {
    nextStep: undefined,
  },
  address: {
    isUpdated: false,
  },
  birthdate: {
    isUpdated: false,
  },
  email_verified: {
    isUpdated: false,
  },
  family_name: {
    isUpdated: false,
  },
  gender: {
    isUpdated: false,
  },
  given_name: {
    isUpdated: false,
  },
  locale: {
    isUpdated: false,
  },
  middle_name: {
    isUpdated: false,
  },
  name: {
    isUpdated: false,
  },
  nickname: {
    isUpdated: false,
  },
  phone_number_verified: {
    isUpdated: false,
  },
  picture: {
    isUpdated: false,
  },
  preferred_username: {
    isUpdated: false,
  },
  profile: {
    isUpdated: false,
  },
  sub: {
    isUpdated: false,
  },
  updated_at: {
    isUpdated: false,
  },
  website: {
    isUpdated: false,
  },
  zoneinfo: {
    isUpdated: false,
  },
};

// In the tests, I see the output from this as everything included on the defaultUpdateUserAttributesOutput overlaid with the resolved mockOutput. In reality, the API only returns the attributes included on the update request.
export const updateUserAttributesAction = async (
  _prev: Awaited<UpdateData>,
  input: UpdateUserAttributesInput
): Promise<UpdateData> => {
  try {
    const result = await updateUserAttributes(input); // Need clarification here... do we want to do a spread and return all attributes every time, or just for the default?
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
  useDataState(updateUserAttributesAction, DefaultUpdate);
