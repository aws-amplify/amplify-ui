import { cssNameTransform, defaultTheme, isDesignToken } from '@aws-amplify/ui';

import { ThemeStylePropKey } from '../types/theme';
import { stylePropsToThemeKeys } from './constants';
import { ComponentClasses } from './types';

export const strHasLength = (str: unknown): str is string =>
  typeof str === 'string' && str.length > 0;

export const isFunction = (fn: unknown): fn is Function =>
  typeof fn === 'function';

export const isEmptyString = (value: unknown): boolean =>
  typeof value === 'string' && value.length === 0;

export const isNullOrEmptyString = (value: unknown): boolean =>
  value == null || isEmptyString(value);

/**
 * Create a consecutive integer array from start value to end value.
 * @param start start value
 * @param end end value
 * @returns an integer array with elements from start to end consecutively
 */
export const getConsecutiveIntArray = (
  start: number,
  end: number
): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * This method is used to parse through all of the overrides and
 * only pass the relevant child overrides for a given component.
 * @internal
 * @param overrides escape hatch props
 * @param elementHierarchy
 * @returns overrides only for specified element
 */
export const findChildOverrides = (
  overrides: EscapeHatchProps | null | undefined,
  elementHierarchy: string
): EscapeHatchProps | null => {
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
  ) as EscapeHatchProps;
};

/**
 * This helper method is used to get the overrides
 * that will be applied to a component
 * @internal
 * @param overrides escape hatch props
 * @param elementHierarchy
 * @returns component overrides
 */
export const getOverrideProps = (
  overrides: EscapeHatchProps | null | undefined,
  elementHierarchy: string
): EscapeHatchProps | null => {
  if (!overrides) {
    return null;
  }

  const componentOverrides = Object.entries(overrides)
    .filter(([key]) => key === elementHierarchy)
    .flatMap(([, value]) => Object.entries(value))
    .filter((m) => m?.[0]);

  return Object.fromEntries(componentOverrides) as unknown as EscapeHatchProps;
};

export type EscapeHatchProps = {
  [elementHierarchy: string]: Record<string, string>;
};

type VariantValues = { [key: string]: string };
export type Variant = {
  variantValues: VariantValues;
  overrides: EscapeHatchProps;
};

/**
 * Given a list of style variants, select a given one based on input props
 * @internal
 * @param variants list of style variants to select from
 * @param props variant values to select from the list, may include additional props, to tidy up usage upstream
 */
export function getOverridesFromVariants<T>(
  variants: Variant[],
  props: { [key: string]: T }
): { [key: string]: Variant } {
  // Get unique keys from the provided variants
  const variantValueKeys = [
    ...new Set(
      variants.flatMap((variant) => Object.keys(variant.variantValues))
    ),
  ];

  // Get variant value object from provided props, dropping keys that aren't in variantValueKeys, or whose vals are falsey
  const variantValuesFromProps: VariantValues = Object.keys(props)
    .filter((i) => variantValueKeys.includes(i) && props[i])
    .reduce((acc, key) => {
      acc[key] = props[key];
      return acc;
    }, {});

  const matchedVariants = variants.filter(({ variantValues }) => {
    return (
      Object.keys(variantValues).length ===
        Object.keys(variantValuesFromProps).length &&
      Object.entries(variantValues).every(
        ([key, value]) => variantValuesFromProps[key] === value
      )
    );
  });

  return matchedVariants.reduce((overrides, variant) => {
    return { ...overrides, ...variant.overrides };
  }, {});
}

/**
 * This helper method is used to merge
 * variants with overrides
 * @internal
 * @param variants
 * @param overrides
 * @returns merged variants with overrides
 */
export const mergeVariantsAndOverrides = (
  variants: EscapeHatchProps,
  overrides: EscapeHatchProps
): EscapeHatchProps => {
  if (!variants && !overrides) {
    return null;
  }
  if (!overrides) {
    return variants;
  }
  if (!variants) {
    return overrides;
  }
  const overrideKeys = new Set(Object.keys(overrides));
  const sharedKeys = Object.keys(variants).filter((variantKey) =>
    overrideKeys.has(variantKey)
  );
  const merged = Object.fromEntries(
    sharedKeys.map((sharedKey) => [
      sharedKey,
      { ...variants[sharedKey], ...overrides[sharedKey] },
    ])
  );
  return {
    ...variants,
    ...overrides,
    ...merged,
  };
};

type Modifiers = string | number | null;

/**
 * This helper function creates modifier class names that are used for our flat BEM styling
 * it takes in a base and modifier and returns the modified class if a modifier was passed in and null otherwise
 * @param base The base class of the output
 * @param modifier The modifier to add onto the base
 * @returns the modified class name or null
 */
export const classNameModifier = (
  base: ComponentClasses,
  modifier: Modifiers
): string => {
  return modifier ? `${base}--${modifier}` : null;
};

/**
 * This helper function creates modified class names that are used for our flat BEM styling
 * it takes in a base, modifier, and flag and returns the modified class name if the flag is true and null if the flag is false
 * @param base
 * @param modifier
 * @param flag
 * @returns the modified class name or null
 */
export const classNameModifierByFlag = (
  base: ComponentClasses,
  modifier: Modifiers,
  flag: boolean
): string => {
  return flag ? `${base}--${modifier}` : null;
};

export const getCSSVariableIfValueIsThemeKey = <Value>(
  propKey: ThemeStylePropKey,
  value: Value
): Value | string => {
  if (typeof value !== 'string') {
    return value;
  }
  // For shorthand properties like `padding` which can accept 1, 2, 3, or 4 values
  // run this function on each value. This would not work on CSS shorthands that
  // mix types, like border which is a composite of borderWidth, borderStyle, and
  // borderColor.
  if (value.includes(' ')) {
    return value
      .split(' ')
      .map((val) => getCSSVariableIfValueIsThemeKey<string>(propKey, val))
      .join(' ');
  }
  const path = value.split('.');
  const tokenKey = stylePropsToThemeKeys[propKey];

  let tokenProps = defaultTheme.tokens[tokenKey];

  for (let i = 0; i < path.length; i++) {
    if (tokenProps) {
      // overwrite tokenProps with next nested value of tokenProps
      tokenProps = tokenProps[path[i]] as typeof tokenProps;
      continue;
    }
    break;
  }
  return isDesignToken(tokenProps)
    ? `var(--${cssNameTransform({
        path: [stylePropsToThemeKeys[propKey], ...path],
      })})`
    : value;
};
