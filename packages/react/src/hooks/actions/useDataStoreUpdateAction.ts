import type {
  ModelInit,
  PersistentModel,
  PersistentModelConstructor,
} from '@aws-amplify/datastore';
import { DataStore, Hub } from 'aws-amplify';

import {
  ACTION_DATASTORE_UPDATE_FINISHED_MESSAGE,
  ACTION_DATASTORE_UPDATE_FINISHED,
  ACTION_DATASTORE_UPDATE_STARTED_MESSAGE,
  ACTION_DATASTORE_UPDATE_STARTED,
  ACTIONS_CHANNEL,
  DATASTORE_QUERY_BY_ID_ERROR,
  ACTION_DATASTORE_UPDATE_FINISHED_ERRORS_MESSAGE,
} from './constants';
import { getErrorMessage } from '../../helpers/utils';

export interface UseDataStoreUpdateActionOptions<
  Model extends PersistentModel
> {
  model: PersistentModelConstructor<Model>;
  id: string;
  fields: ModelInit<Model, { readOnlyFields: 'createdAt' | 'updatedAt' }>;
}

export const useDataStoreUpdateAction =
  <Model extends PersistentModel>({
    model,
    id,
    fields,
  }: UseDataStoreUpdateActionOptions<Model>) =>
  async () => {
    try {
      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_DATASTORE_UPDATE_STARTED,
        data: { fields, id },
        message: ACTION_DATASTORE_UPDATE_STARTED_MESSAGE,
      });

      const original = await DataStore.query(model, id);
      // If query by id doesn't return an item,
      // original will be undefined
      // so we'll log a helpful message.
      if (!original) {
        throw new Error(`${DATASTORE_QUERY_BY_ID_ERROR}: ${id}`);
      }

      const item = await DataStore.save(
        model.copyOf(original, (updated: any) => {
          Object.assign(updated, fields);
        })
      );

      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_DATASTORE_UPDATE_FINISHED,
        data: { fields, id, item },
        message: ACTION_DATASTORE_UPDATE_FINISHED_MESSAGE,
      });
    } catch (error) {
      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_DATASTORE_UPDATE_FINISHED,
        data: { fields, id, errorMessage: getErrorMessage(error) },
        message: ACTION_DATASTORE_UPDATE_FINISHED_ERRORS_MESSAGE,
      });
    }
  };
