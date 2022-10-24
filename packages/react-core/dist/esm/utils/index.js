import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
function isEmptyArray(value) {
    return Array.isArray(value) && isEmpty(value);
}
export function areEmptyArrays(...values) {
    return values.every(isEmptyArray);
}
function isEmptyObject(value) {
    return isObject(value) && !Array.isArray(value) && isEmpty(value);
}
export function areEmptyObjects(...values) {
    return values.every(isEmptyObject);
}
