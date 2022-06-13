// Taken from https://www.npmjs.com/package/@awsui/components-react
import * as React from 'react';

import { isDevelopment } from '../helpers';

interface PropertyDescription {
  /**
   * Name of the component.
   */
  componentName: string;

  /**
   * Name of the prop to this component that is being controlled
   */
  controlledProp: string;

  /**
   * Name of the handler that would be called when the controlled prop is changed.
   */
  changeHandler: string;
}

export interface UseControllableProps<ValueType> {
  /**
   * Value for the controlled mode
   */
  controlledValue: ValueType;

  /**
   * Update handler for controlled mode
   */
  handler: ((...args: any[]) => unknown) | undefined;

  /**
   * Initial value for uncontrolled mode
   */
  defaultValue: ValueType;

  /**
   * Property metadata
   */
  propertyDescription: PropertyDescription;
}

function defaultCallback() {
  return void 0;
}

/**
 * This hook allows you to make a component that can be used both in controlled mode and uncontrolled mode.
 * Pass in your component's props, and then implement your component as if it was only controlled.
 * When calling onChange callbacks (or the equivalent for your property), you need to call both the callback returned by this function
 * as well as the callback provided in your component's props.
 *
 * A component determines its mode (either controlled or uncontrolled) on the first render and keeps it for its lifetime. The mode cannot
 * be switched later.
 *
 *
 * Example usage:
 * ```jsx
 * const [checked, setChecked] = useControllable(
 *     props,
 *     props.defaultEnabled ?? false,
 *     {
 *        componentName: 'MyCheckboxComponent',
 *        controlledProp: 'enabled',
 *        changeHandler: 'onCheckedStatusChange'
 *     }
 * )
 *
 * return
 *  <input
 *   type="checkbox"
 *   checked={checked}
 *   onChange={event => {
 *    setChecked(event.target.checked);
 *    props.onCheckedStatusChange(event.target.checked);
 *   }}
 *  />
 * ```
 */
export function useControllable<ValueType>({
  controlledValue,
  handler,
  defaultValue,
  propertyDescription: { componentName, changeHandler, controlledProp },
}: UseControllableProps<ValueType>):
  | [ValueType, typeof defaultCallback]
  | [ValueType, (newValue: React.SetStateAction<ValueType>) => void] {
  // The decision whether a component is controlled or uncontrolled is made on its first render and cannot be changed afterwards.
  const isControlled = React.useState(controlledValue !== undefined)[0];

  const isDev = isDevelopment();

  // Print a warning if the component switches between controlled and uncontrolled mode.

  React.useEffect(() => {
    if (isDev && isControlled && handler === undefined) {
      // eslint-disable-next-line no-console
      console.warn(
        `${componentName}: You provided a \`${controlledProp}\` prop without an \`${changeHandler}\` handler. This will render a non-interactive component.`
      );
    }
  }, [
    handler,
    isControlled,
    componentName,
    changeHandler,
    controlledProp,
    isDev,
  ]);

  React.useEffect(() => {
    const isControlledNow = controlledValue !== undefined;
    if (isDev && isControlled !== isControlledNow) {
      const initialMode = isControlled ? 'controlled' : 'uncontrolled';
      const modeNow = isControlledNow ? 'controlled' : 'uncontrolled';
      // eslint-disable-next-line no-console
      console.warn(
        `${componentName}: A component tried to change ${initialMode} '${controlledProp}' property to be ${modeNow}. ` +
          `This is not supported. Properties should not switch from ${initialMode} to ${modeNow} (or vice versa). ` +
          `Decide between using a controlled or uncontrolled mode for the lifetime of the component. ` +
          `More info: https://fb.me/react-controlled-components`
      );
    }
  }, [isControlled, controlledProp, componentName, controlledValue, isDev]);

  // This is the value that is used if the component is uncontrolled.
  const [valueState, setValue] = React.useState(defaultValue);
  const [valueHasBeenSet, setValueHasBeenSet] = React.useState(false);

  // We track changes to the defaultValue
  const currentUncontrolledValue = valueHasBeenSet ? valueState : defaultValue;

  const setUncontrolledValue = React.useCallback(
    (newValue: React.SetStateAction<ValueType>) => {
      setValue(newValue);
      setValueHasBeenSet(true);
    },
    [setValue, setValueHasBeenSet]
  );

  if (isControlled) {
    return [controlledValue, defaultCallback];
  } else {
    return [currentUncontrolledValue, setUncontrolledValue];
  }
}
