import type {
  ModelInit,
  PersistentModel,
  PersistentModelConstructor,
} from '@aws-amplify/datastore';
import { DataStore, Hub } from 'aws-amplify';

import {
  ACTION_DATASTORE_CREATE_FINISHED_MESSAGE,
  ACTION_DATASTORE_CREATE_FINISHED,
  ACTION_DATASTORE_CREATE_STARTED_MESSAGE,
  ACTION_DATASTORE_CREATE_STARTED,
  ACTIONS_CHANNEL,
} from './constants';
import { getErrorMessage } from '../../helpers/utils';

export interface UseDataStoreCreateActionOptions<
  Model extends PersistentModel
> {
  model: PersistentModelConstructor<Model>;
  fields: ModelInit<Model, { readOnlyFields: 'createdAt' | 'updatedAt' }>;
}

export const useDataStoreCreateAction =
  <Model extends PersistentModel>({
    model,
    fields,
  }: UseDataStoreCreateActionOptions<Model>) =>
  async () => {
    console.log('no really, we are supposed to be using datastore here');
    try {
      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_DATASTORE_CREATE_STARTED,
        data: { fields },
        message: ACTION_DATASTORE_CREATE_STARTED_MESSAGE,
      });

      const item = await DataStore.save(new model(fields));
      console.log('anyone home?');
      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_DATASTORE_CREATE_FINISHED,
        data: { fields, item },
        message: ACTION_DATASTORE_CREATE_FINISHED_MESSAGE,
      });
    } catch (error) {
      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_DATASTORE_CREATE_FINISHED,
        data: { fields, errorMessage: getErrorMessage(error) },
        message: `${ACTION_DATASTORE_CREATE_FINISHED_MESSAGE} with errors`,
      });
    }
  };
