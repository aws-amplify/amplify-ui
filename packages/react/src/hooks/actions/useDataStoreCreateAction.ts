import {
  DataStore,
  PersistentModel,
  PersistentModelConstructor,
  Schema,
} from '@aws-amplify/datastore';
import { Hub } from 'aws-amplify';

import {
  ACTION_DATASTORE_CREATE_FINISHED,
  ACTION_DATASTORE_CREATE_STARTED,
  EVENT_ACTION_DATASTORE_CREATE,
  UI_CHANNEL,
} from './constants';
import { getErrorMessage } from '../../helpers/utils';
import { AMPLIFY_SYMBOL } from '../../helpers/constants';
import { useTypeCastFields } from './shared/useTypeCastFields';

export interface UseDataStoreCreateActionOptions<
  Model extends PersistentModel
> {
  model: PersistentModelConstructor<Model>;
  fields: Record<string, string>; //TODO: take any string fields
  schema?: Schema;
}

/**
 * Action to Create DataStore item
 * @internal
 */
export const useDataStoreCreateAction = <Model extends PersistentModel>({
  model,
  fields,
  schema,
}: UseDataStoreCreateActionOptions<Model>) => {
  const convertedFields = useTypeCastFields<Model>({
    stringFields: fields,
    modelName: model.name,
    schema,
  });

  return async () => {
    try {
      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_DATASTORE_CREATE_STARTED,
          data: { originalFields: fields, fields: convertedFields },
        },
        EVENT_ACTION_DATASTORE_CREATE,
        AMPLIFY_SYMBOL
      );

      const item = await DataStore.save(new model(convertedFields));

      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_DATASTORE_CREATE_FINISHED,
          data: { fields: convertedFields, item },
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
            fields: convertedFields,
            errorMessage: getErrorMessage(error),
          },
        },
        EVENT_ACTION_DATASTORE_CREATE,
        AMPLIFY_SYMBOL
      );
    }
  };
};
