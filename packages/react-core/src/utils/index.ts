import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

function isEmptyArray<T>(value: T): boolean {
  return Array.isArray(value) && isEmpty(value);
}

export function areEmptyArrays<T>(...values: T[]): boolean {
  return values.every(isEmptyArray);
}

function isEmptyObject<T>(value: T): boolean {
  return isObject(value) && !Array.isArray(value) && isEmpty(value);
}

export function areEmptyObjects<T>(...values: T[]): boolean {
  return values.every(isEmptyObject);
}
