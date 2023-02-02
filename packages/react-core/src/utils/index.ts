import { isEmpty, isObject, isString } from '@aws-amplify/ui';

function isEmptyArray<T>(value: T): boolean {
  return Array.isArray(value) && isEmpty(value);
}

export function areEmptyArrays<T>(...values: T[]): boolean {
  return values.every(isEmptyArray);
}

function isEmptyObject<T>(value: T): boolean {
  return isObject(value) && isEmpty(value);
}

export function areEmptyObjects<T>(...values: T[]): boolean {
  return values.every(isEmptyObject);
}

export function templateJoin(
  values: string[],
  template: (value: string) => string
): string {
  return values.reduce(
    (acc, curr) => `${acc}${isString(curr) ? template(curr) : ''}`,
    ''
  );
}
