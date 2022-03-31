import {
  PersistentModel,
  PersistentModelConstructor,
  ModelInit,
  Schema,
} from '@aws-amplify/datastore';

/**
 * Converts a Model's field values to types supported by
 * Amplify UI field components. This is required
 * because Datastore Int and Float scalar types are often
 * entered by users in a TextField which returns a string
 */
type ModelFields<Type> = {
  // Text Field, TextArea Field, Password Field, Phone Number Field,
  // Radio Group Field, Select Field return "string"
  // Checkbox Field, Switch Field, Toggle Button return "boolean"
  // Slider Field, Stepper Field return "number"
  [Property in keyof Type]: string | number | boolean;
};

export type DataStoreActionFields<Model> =
  | ModelInit<Model>
  | ModelFields<ModelInit<Model>>;

export interface UseDataStoreActionOptions<Model extends PersistentModel> {
  model: PersistentModelConstructor<Model>;
  /**
   * Pass either already converted field values based on DataStore schema,
   * or also pass the `schema` param have string field values
   * optimistically cast to the expected type based on the `schema`
   */
  fields: DataStoreActionFields<Model>;
  /**
   * Used to optimistically cast fields values to the
   * expected value types based on the `schema` provided
   */
  schema?: Schema;
}

export function isAlreadyTyped<Model>(
  fields: DataStoreActionFields<Model>,
  schema: Schema
): fields is ModelInit<Model> {
  return !schema;
}
