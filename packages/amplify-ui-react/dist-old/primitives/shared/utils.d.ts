/// <reference types="react" />
import { ViewProps } from '../types/index';
export declare const strHasLength: (str: unknown) => str is string;
/**
 * Convert style props to CSS variables for React style prop
 * Note: Will filter out undefined, null, and empty string prop values
 * @returns CSSProperties styles
 */
export declare const convertStylePropsToStyleObj: (
  props: ViewProps,
  style?: React.CSSProperties
) => import('react').CSSProperties;
/**
 * Filter out known style props to prevent errors adding invalid HTML attributes
 * @param props
 * @returns non styled props
 */
export declare const getNonStyleProps: (props: ViewProps) => {};
/**
 * Create a consecutive integer array from start value to end value.
 * @param start start value
 * @param end end value
 * @returns an integer array with elements from start to end consecutively
 */
export declare const getConsecutiveIntArray: (
  start: number,
  end: number
) => number[];
