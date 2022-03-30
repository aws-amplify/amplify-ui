import {
  DataStore,
  PersistentModel,
  PersistentModelConstructor,
  ModelInit,
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
import { ModelFormFields } from './shared/typeUtils';

export interface UseDataStoreCreateActionOptions<
  Model extends PersistentModel
> {
  /**
   * Expected datastore model
   */
  model: PersistentModelConstructor<Model>;
  /**
   * Strongly typed fields based on model. Ensure fields are already
   * the appropriate type before passing to fields.
   */
  fields?: ModelInit<Model>;
  /**
   * Used in place of `fields` in combination with `schema` param to have
   * string field values optimistically cast to the expected type based on the schema
   */
  formFields?: ModelFormFields<ModelInit<Model>>;
  /**
   * Used in combination with `formFields` param for string field values
   * optimistically cast to the expected type based on the schema
   */
  schema?: Schema;
}

/**
 * Action to Create DataStore item
 * @internal
 */
export const useDataStoreCreateAction = <Model extends PersistentModel>({
  model,
  fields,
  formFields,
  schema,
}: UseDataStoreCreateActionOptions<Model>) => {
  const convertedFields = useTypeCastFields<Model>({
    formFields,
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

      const item = await DataStore.save(new model(fields || convertedFields));

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
