import {
  confirmUserAttribute,
  ConfirmUserAttributeInput,
} from '@aws-amplify/auth';

import { Hub } from '@aws-amplify/core';

import useDataState from '../useDataState';
import { UseConfirmUserAttribute } from './types';

export const confirmUserAttributeAction = async (
  _prev: Awaited<ReturnType<typeof confirmUserAttribute>>,
  input: ConfirmUserAttributeInput
): Promise<void> => {
  try {
    const result = await confirmUserAttribute(input);
    Hub.dispatch('ui', {
      event: 'FETCH_ATTRIBUTES',
      message: 'attributes confirmed successfully',
    });
    return result;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const useConfirmUserAttribute = (): UseConfirmUserAttribute =>
  useDataState(confirmUserAttributeAction, undefined);
