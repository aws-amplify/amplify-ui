import * as React from 'react';
import { ModelInit, Schema } from '@aws-amplify/datastore';
import { groupBy } from 'lodash';
import { FieldDescription } from 'src/primitives/Field';

interface UseTypeCastFieldsProps {
  stringFields: any;
  schema?: Schema;
  modelName?: string;
}

type UseTypeCastFieldsReturn<Model> =
  | ModelInit<Model, { readOnlyFields: 'createdAt' | 'updatedAt' }>
  | undefined;

export const useTypeCastFields = <Model>({
  stringFields,
  modelName,
  schema,
}: UseTypeCastFieldsProps): UseTypeCastFieldsReturn<Model> => {
  return React.useMemo(() => {
    if (stringFields && (!schema || !modelName)) {
      return stringFields;
    }
    if (!stringFields || !schema || !modelName) {
      return;
    }

    let castFields = {} as UseTypeCastFieldsReturn<Model>;
    Object.keys(stringFields).forEach((fieldName) => {
      switch (schema.models[modelName]?.fields?.[fieldName].type) {
        case 'Int':
          console.log(`int type ${fieldName}`, Number(stringFields[fieldName]));
          castFields[fieldName] = Number(stringFields[fieldName]);
          break;
        case 'Boolean':
          castFields[fieldName] = Boolean(stringFields[fieldName]);
          break;
        case 'Float':
          castFields[fieldName] = Number(stringFields[fieldName]);
          break;
        default:
          castFields[fieldName] = stringFields[fieldName];
          break;
      }
    });

    return castFields;
  }, [schema, modelName, stringFields]);
};
