/**
 * Converts a Model's field values to string
 * since our forms always return strings
 */
export type ModelFormFields<Type> = {
  [Property in keyof Type]: string;
};
