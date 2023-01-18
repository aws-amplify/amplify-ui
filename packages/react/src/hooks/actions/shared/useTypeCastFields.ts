import * as React from 'react';
import isString from 'lodash/isString';
import {
  ModelInit,
  PersistentModel,
  PersistentModelMetaData,
  Schema,
} from '@aws-amplify/datastore';

import { DataStoreActionFields, isAlreadyTyped } from './types';

interface UseTypeCastFieldsProps<Model extends PersistentModel> {
  fields: DataStoreActionFields<Model>;
  modelName: string;
  schema?: Schema;
}

type UseTypeCastFieldsReturn<Model> =
  | ModelInit<Model, PersistentModelMetaData<Model>>
  | undefined;

/**
 * Optimistically casts field string values to types required by
 * datastore based on the schema type
 * @see: See https://docs.aws.amazon.com/appsync/latest/devguide/scalars.html
 */
export const useTypeCastFields = <Model extends PersistentModel>({
  fields,
  modelName,
  schema,
}: UseTypeCastFieldsProps<Model>): UseTypeCastFieldsReturn<Model> => {
  return React.useMemo(() => {
    if (isAlreadyTyped<Model>(fields, schema)) {
      return fields;
    }

    const castFields = <UseTypeCastFieldsReturn<Model>>{};
    Object.keys(fields).forEach((fieldName: string) => {
      const field: unknown = fields[fieldName];
      switch (schema?.models[modelName]?.fields?.[fieldName]?.type) {
        case 'AWSTimestamp':
          castFields[fieldName] = Number(field);
          break;
        case 'Boolean':
          castFields[fieldName] = Boolean(field);
          break;
        case 'Int':
          castFields[fieldName] = isString(field) ? parseInt(field) : field;
          break;
        case 'Float':
          castFields[fieldName] = Number(field);
          break;
        default:
          castFields[fieldName] = field;
          break;
      }
    });

    return castFields;
  }, [fields, schema, modelName]);
};
