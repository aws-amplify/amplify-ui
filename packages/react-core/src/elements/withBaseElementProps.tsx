import React from 'react';
import type { BaseElementWithRef, ElementRefType } from './types';

/**
 * @internal @unstable
 *
 * Extend target `BaseElement` with `defaultProps`. `defaultProps`
 * are overidden by `props` provided to returned `BaseElement`.
 *
 * @example
 *
 * Extend `InputElement` with default `className` and `type`
 * ```tsx
 *
 * // define extended `props` on `BaseElement` interface
 * type InputElementPropKey = 'onChange' | 'type';
 *
 * // create `InputElement` base with `type` generic and extended `props` key
 * export const InputElement = defineBaseElementWithRef<"input", InputElementPropKey>({
 *   type: "input",
 *   displayName: "Input",
 * });
 *
 * // extend base `InputElement` with default input `type` of `checkbox`
 * const CheckboxElement = withBaseElementProps(Input, {
 *   className: 'submit-toggle__checkbox',
 *   type: 'checkbox',
 * });
 * ```
 *
 * @param Target `BaseElement` to extend
 * @param defaultProps `defaultProps` to apply to `Target`, accepts object or callback
 * @returns extended `BaseElement` with `defaultProps`
 */
export default function withBaseElementProps<
  T,
  K extends T | ((input: T) => T),
>(
  Target: React.ForwardRefExoticComponent<T>,
  defaultProps: K
): BaseElementWithRef<T, ElementRefType<T>> {
  const Component = React.forwardRef<ElementRefType<T>, T>((props, ref) => (
    <Target
      {...{
        ...(typeof defaultProps === 'function'
          ? defaultProps(props)
          : defaultProps),
        ...props,
      }}
      ref={ref}
    />
  ));
  Component.displayName = Target.displayName;
  return Component;
}
