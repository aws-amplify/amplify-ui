import type {
  PersistentModel,
  PersistentModelConstructor,
} from '@aws-amplify/datastore';
import { DataStore, Hub } from 'aws-amplify';

import {
  ACTION_DATASTORE_DELETE_FINISHED_MESSAGE,
  ACTION_DATASTORE_DELETE_FINISHED,
  ACTION_DATASTORE_DELETE_STARTED_MESSAGE,
  ACTION_DATASTORE_DELETE_STARTED,
  ACTIONS_CHANNEL,
  ACTION_DATASTORE_DELETE_FINISHED_ERRORS_MESSAGE,
} from './constants';
import { getErrorMessage } from '../../helpers/utils';

export interface UseDataStoreDeleteActionOptions<
  Model extends PersistentModel
> {
  model: PersistentModelConstructor<Model>;
  id: string;
}

export const useDataStoreDeleteAction =
  <Model extends PersistentModel>({
    model,
    id,
  }: UseDataStoreDeleteActionOptions<Model>) =>
  async () => {
    try {
      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_DATASTORE_DELETE_STARTED,
        data: { id },
        message: ACTION_DATASTORE_DELETE_STARTED_MESSAGE,
      });

      await DataStore.delete(model, id);

      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_DATASTORE_DELETE_FINISHED,
        data: { id },
        message: ACTION_DATASTORE_DELETE_FINISHED_MESSAGE,
      });
    } catch (error) {
      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_DATASTORE_DELETE_FINISHED,
        data: { id, errorMessage: getErrorMessage(error) },
        message: ACTION_DATASTORE_DELETE_FINISHED_ERRORS_MESSAGE,
      });
    }
  };
