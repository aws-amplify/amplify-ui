import {
  ModelInit,
  PersistentModel,
  PersistentModelConstructor,
} from '@aws-amplify/datastore';
import { DataStore, Hub } from 'aws-amplify';

import {
  ACTION_DATASTORE_CREATE_FINISHED,
  ACTION_DATASTORE_CREATE_STARTED,
  EVENT_ACTION_DATASTORE_CREATE,
  UI_CHANNEL,
} from './constants';
import { getErrorMessage } from '../../helpers/utils';
import { AMPLIFY_SYMBOL } from '../../helpers/constants';

export interface UseDataStoreCreateActionOptions<
  Model extends PersistentModel
> {
  model: PersistentModelConstructor<Model>;
  fields: ModelInit<Model, { readOnlyFields: 'createdAt' | 'updatedAt' }>;
}

/**
 * Action to Create DataStore item
 * @internal
 */
export const useDataStoreCreateAction =
  <Model extends PersistentModel>({
    model,
    fields,
  }: UseDataStoreCreateActionOptions<Model>) =>
  async () => {
    try {
      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_DATASTORE_CREATE_STARTED,
          data: { fields },
        },
        EVENT_ACTION_DATASTORE_CREATE,
        AMPLIFY_SYMBOL
      );

      const item = await DataStore.save(new model(fields));

      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_DATASTORE_CREATE_FINISHED,
          data: { fields, item },
        },
        EVENT_ACTION_DATASTORE_CREATE,
        AMPLIFY_SYMBOL
      );
    } catch (error) {
      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_DATASTORE_CREATE_FINISHED,
          data: { fields, errorMessage: getErrorMessage(error) },
        },
        EVENT_ACTION_DATASTORE_CREATE,
        AMPLIFY_SYMBOL
      );
    }
  };
