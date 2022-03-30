import * as React from 'react';
import { ModelInit, Schema } from '@aws-amplify/datastore';

import { ModelFormFields } from './typeUtils';

interface UseTypeCastFieldsProps<Model> {
  formFields: ModelFormFields<ModelInit<Model>>;
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
  formFields,
  modelName,
  schema,
}: UseTypeCastFieldsProps<Model>): UseTypeCastFieldsReturn<Model> => {
  return React.useMemo(() => {
    if (!formFields || !schema || !modelName) {
      return;
    }

    let castFields = {} as UseTypeCastFieldsReturn<Model>;
    Object.keys(formFields).forEach((fieldName) => {
      switch (schema.models[modelName]?.fields?.[fieldName].type) {
        case 'AWSTimestamp':
          castFields[fieldName] = Number(formFields[fieldName]);
          break;
        case 'Boolean':
          castFields[fieldName] = Boolean(formFields[fieldName]);
          break;
        case 'Int':
          castFields[fieldName] = parseInt(formFields[fieldName]);
          break;
        case 'Float':
          castFields[fieldName] = Number(formFields[fieldName]);
          break;
        default:
          castFields[fieldName] = formFields[fieldName];
          break;
      }
    });

    return castFields;
  }, [schema, modelName, formFields]);
};
