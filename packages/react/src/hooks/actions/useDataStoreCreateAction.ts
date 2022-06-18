import { PersistentModel } from '@aws-amplify/datastore';
import { DataStore, Hub } from 'aws-amplify';

import {
  ACTION_DATASTORE_CREATE_FINISHED,
  ACTION_DATASTORE_CREATE_STARTED,
  EVENT_ACTION_DATASTORE_CREATE,
  UI_CHANNEL,
} from './constants';
import { getErrorMessage } from '../../helpers/utils';
import { AMPLIFY_SYMBOL } from '../../helpers/constants';
import { useTypeCastFields } from './shared/useTypeCastFields';
import { UseDataStoreActionOptions } from './shared/types';

export interface UseDataStoreCreateActionOptions<Model extends PersistentModel>
  extends UseDataStoreActionOptions<Model> {}

/**
 * Action to Create DataStore item
 * @internal
 */
export const useDataStoreCreateAction = <Model extends PersistentModel>({
  model,
  fields: initialFields,
  schema,
}: UseDataStoreCreateActionOptions<Model>): (() => Promise<void>) => {
  const fields = useTypeCastFields<Model>({
    fields: initialFields,
    modelName: model.name,
    schema,
  });

  return async () => {
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
          data: {
            fields,
            errorMessage: getErrorMessage(error),
          },
        },
        EVENT_ACTION_DATASTORE_CREATE,
        AMPLIFY_SYMBOL
      );
    }
  };
};
