import { ComponentClassName } from '../types';

export type Modifiers = string | number | null;

/**
 * This helper function creates modifier class names that are used for our flat BEM styling
 * it takes in a base and modifier and returns the modified class if a modifier was passed in and null otherwise
 * @param base The base class of the output
 * @param modifier The modifier to add onto the base
 * @returns the modified class name or empty string
 */
export const classNameModifier = (
  base: ComponentClassName,
  modifier?: Modifiers
): string => {
  return modifier ? `${base}--${modifier}` : '';
};

/**
 * This helper function creates modified class names that are used for our flat BEM styling
 * it takes in a base, modifier, and flag and returns the modified class name if the flag is true and null if the flag is false
 * @param base
 * @param modifier
 * @param flag
 * @returns the modified class name or empty string
 */
export const classNameModifierByFlag = (
  base: ComponentClassName,
  modifier: Modifiers,
  flag?: boolean
): string => {
  return flag ? `${base}--${modifier}` : '';
};
