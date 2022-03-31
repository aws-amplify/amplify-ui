import * as React from 'react';
import { ModelInit, Schema } from '@aws-amplify/datastore';

import { DataStoreActionFields, isAlreadyTyped } from './types';

interface UseTypeCastFieldsProps<Model> {
  fields: DataStoreActionFields<Model>;
  modelName: string;
  schema: Schema;
}

type UseTypeCastFieldsReturn<Model> = ModelInit<Model> | undefined;

/**
 * Optimistically casts field string values to types required by
 * datastore based on the schema type
 * @see: See https://docs.aws.amazon.com/appsync/latest/devguide/scalars.html
 */
export const useTypeCastFields = <Model>({
  fields,
  modelName,
  schema,
}: UseTypeCastFieldsProps<Model>): UseTypeCastFieldsReturn<Model> => {
  return React.useMemo(() => {
    if (isAlreadyTyped<Model>(fields, schema)) {
      return fields;
    }

    let castFields = {} as UseTypeCastFieldsReturn<Model>;
    Object.keys(fields).forEach((fieldName) => {
      switch (schema?.models[modelName]?.fields?.[fieldName]?.type) {
        case 'AWSTimestamp':
          castFields[fieldName] = Number(fields[fieldName]);
          break;
        case 'Boolean':
          castFields[fieldName] = Boolean(fields[fieldName]);
          break;
        case 'Int':
          castFields[fieldName] = parseInt(fields[fieldName]);
          break;
        case 'Float':
          castFields[fieldName] = Number(fields[fieldName]);
          break;
        default:
          castFields[fieldName] = fields[fieldName];
          break;
      }
    });

    return castFields;
  }, [fields, schema, modelName]);
};
