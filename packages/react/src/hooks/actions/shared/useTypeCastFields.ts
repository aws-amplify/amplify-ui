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

    const castFields = {} as UseTypeCastFieldsReturn<Model>;
    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName] as string;
      switch (schema?.models[modelName]?.fields?.[fieldName]?.type) {
        case 'AWSTimestamp':
          castFields[fieldName] = Number(field);
          break;
        case 'Boolean':
          castFields[fieldName] = Boolean(field);
          break;
        case 'Int':
          castFields[fieldName] = parseInt(field);
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
