import * as React from 'react';

// Note: this makes nanoid more performant, not less secure
// @see https://www.npmjs.com/package/nanoid#user-content-non-secure
import { customAlphabet } from 'nanoid/non-secure';
const nanoid = customAlphabet('1234567890abcdef', 12);

export const strHasLength = (str: unknown): str is string =>
  typeof str === 'string' && str.length > 0;

export const isFn = (fn: unknown): fn is Function => typeof fn === 'function';

export const filterOutNullOrEmptyStringValues = (value) =>
  value != null && (typeof value !== 'string' || strHasLength(value));

/**
 * Create a consecutive integer array from start value to end value.
 * @param start start value
 * @param end end value
 * @returns an integer array with elements from start to end consecutively
 */
export const getConsecutiveIntArray = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * Create a uuid to use with amplify fields unless
 * an id is already defined
 * @param id user specified id or undefined
 * @returns string
 */
export const useAmplifyFieldID = (id?: string) => {
  return React.useMemo(() => {
    if (id) {
      return id;
    }
    return `amplify-field-${nanoid()}`;
  }, [id]);
};

/**
 * This method is used to parse through all of the overrides and
 * only pass the relevant child overrides for a given component.
 * @param overrides escape hatch props
 * @param elementHierarchy
 * @returns overrides only for specified element
 */
export const findChildOverrides = (
  overrides: EscapeHatchProps | null | undefined,
  elementHierarchy: string
) => {
  if (!overrides) {
    return null;
  }

  const filteredOverrides = Object.entries(overrides).filter((m) =>
    m[0].startsWith(elementHierarchy)
  );

  return Object.assign(
    {},
    ...Array.from(filteredOverrides, ([k, v]) => ({
      [k.replace(elementHierarchy, '')]: v,
    }))
  );
};

/**
 * This helper method is used to get the overrides
 * that will be applied to a component
 * @param overrides escape hatch props
 * @param elementHierarchy
 * @returns component overrides
 */
export const getOverrideProps = (
  overrides: EscapeHatchProps | null | undefined,
  elementHierarchy: string
) => {
  if (!overrides) {
    return null;
  }

  const componentOverrides = Object.entries(overrides)
    .filter((m) => m[0] === elementHierarchy)
    .flatMap((m) => {
      const values = Object.entries(m[1]);
      return [values[0], values[1]];
    })
    .filter((m) => m?.[0]);

  return Object.fromEntries(componentOverrides);
};

export type EscapeHatchProps = {
  [elementHierarchy: string]: Record<string, string>;
};
