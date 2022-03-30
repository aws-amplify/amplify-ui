import {
  ModelInit,
  MutableModel,
  PersistentModel,
  PersistentModelConstructor,
  Schema,
} from '@aws-amplify/datastore';
import { DataStore, Hub } from 'aws-amplify';

import {
  ACTION_DATASTORE_UPDATE_FINISHED,
  ACTION_DATASTORE_UPDATE_STARTED,
  DATASTORE_QUERY_BY_ID_ERROR,
  EVENT_ACTION_DATASTORE_UPDATE,
  UI_CHANNEL,
} from './constants';
import { getErrorMessage } from '../../helpers/utils';
import { AMPLIFY_SYMBOL } from '../../helpers/constants';
import { useTypeCastFields } from './shared/useTypeCastFields';
import { ModelFormFields } from './shared/typeUtils';

export interface UseDataStoreUpdateActionOptions<
  Model extends PersistentModel
> {
  model: PersistentModelConstructor<Model>;
  id: string;
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
 * Action to Update DataStore item
 * @internal
 */
export const useDataStoreUpdateAction = <Model extends PersistentModel>({
  model,
  id,
  fields,
  formFields,
  schema,
}: UseDataStoreUpdateActionOptions<Model>) => {
  const fieldsOrConvertedFields = useTypeCastFields<Model>({
    fields,
    formFields,
    modelName: model.name,
    schema,
  });

  return async () => {
    try {
      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_DATASTORE_UPDATE_STARTED,
          data: { fields: fieldsOrConvertedFields, id },
        },
        EVENT_ACTION_DATASTORE_UPDATE,
        AMPLIFY_SYMBOL
      );

      const original = await DataStore.query(model, id);
      // If query by id doesn't return an item,
      // original will be undefined
      // so we'll log a helpful message.
      if (!original) {
        throw new Error(`${DATASTORE_QUERY_BY_ID_ERROR}: ${id}`);
      }

      const item = await DataStore.save(
        model.copyOf(original, (updated: any) => {
          Object.assign(updated, fieldsOrConvertedFields);
        })
      );

      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_DATASTORE_UPDATE_FINISHED,
          data: { fields: fieldsOrConvertedFields, id, item },
        },
        EVENT_ACTION_DATASTORE_UPDATE,
        AMPLIFY_SYMBOL
      );
    } catch (error) {
      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_DATASTORE_UPDATE_FINISHED,
          data: {
            fields: fieldsOrConvertedFields,
            id,
            errorMessage: getErrorMessage(error),
          },
        },
        EVENT_ACTION_DATASTORE_UPDATE,
        AMPLIFY_SYMBOL
      );
    }
  };
};
