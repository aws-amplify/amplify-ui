import React, { Children, cloneElement, isValidElement, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

import { Label } from '@aws-amplify/ui-react-native/dist/primitives';
import { RadioProps } from '@aws-amplify/ui-react-native/dist/primitives';

import { RadioGroupProps } from './types';

export default function RadioGroup<T>({
  children,
  direction = 'vertical',
  disabled,
  label,
  labelStyle,
  onChange,
  style,
  value,
  ...rest
}: RadioGroupProps<T>): JSX.Element {
  const childContainerStyle: ViewStyle = useMemo(
    () => ({ flexDirection: direction === 'horizontal' ? 'row' : 'column' }),
    [direction]
  );

  return (
    <View {...rest} style={style}>
      {label ? <Label style={labelStyle}>{label}</Label> : null}
      <View style={childContainerStyle}>
        {Children.map(children, (child) => {
          if (isValidElement<RadioProps<T>>(child)) {
            const { disabled: childDisabled, value: childValue } = child.props;
            const isChildDisabled =
              typeof childDisabled === 'boolean' ? childDisabled : disabled;
            const isChildSelected = childValue === value;

            return cloneElement<RadioProps<T>>(child, {
              disabled: isChildDisabled,
              onChange,
              selected: isChildSelected,
            });
          }
        })}
      </View>
    </View>
  );
}
