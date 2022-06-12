import {
  PersistentModel,
  PersistentModelConstructor,
} from '@aws-amplify/datastore';
import { DataStore, Hub } from 'aws-amplify';

import {
  ACTION_DATASTORE_DELETE_FINISHED,
  ACTION_DATASTORE_DELETE_STARTED,
  EVENT_ACTION_DATASTORE_DELETE,
  UI_CHANNEL,
} from './constants';
import { getErrorMessage } from '../../helpers/utils';
import { AMPLIFY_SYMBOL } from '../../helpers/constants';

export interface UseDataStoreDeleteActionOptions<
  Model extends PersistentModel
> {
  model: PersistentModelConstructor<Model>;
  id: string;
}

/**
 * Action to Delete DataStore item
 * @internal
 */
export const useDataStoreDeleteAction =
  <Model extends PersistentModel>({
    model,
    id,
  }: UseDataStoreDeleteActionOptions<Model>): (() => Promise<void>) =>
  async () => {
    try {
      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_DATASTORE_DELETE_STARTED,
          data: { id },
        },
        EVENT_ACTION_DATASTORE_DELETE,
        AMPLIFY_SYMBOL
      );

      await DataStore.delete(model, id);

      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_DATASTORE_DELETE_FINISHED,
          data: { id },
        },
        EVENT_ACTION_DATASTORE_DELETE,
        AMPLIFY_SYMBOL
      );
    } catch (error) {
      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_DATASTORE_DELETE_FINISHED,
          data: { id, errorMessage: getErrorMessage(error) },
        },
        EVENT_ACTION_DATASTORE_DELETE,
        AMPLIFY_SYMBOL
      );
    }
  };
