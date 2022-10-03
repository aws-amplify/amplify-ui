import React, { Children, cloneElement, isValidElement, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

import { Label } from '../Label';
import { RadioProps } from '../Radio';

import { RadioGroupProps } from './types';

export default function RadioGroup<T>({
  children,
  direction = 'vertical',
  disabled,
  label,
  labelStyle,
  onChange,
  // style,
  value,
}: // ...rest
RadioGroupProps<T>): JSX.Element {
  // only handle controlled component (don't think about uncontrolled component yet)

  const childContainerStyle: ViewStyle = useMemo(
    () => ({ flexDirection: direction === 'horizontal' ? 'row' : 'column' }),
    [direction]
  );

  return (
    // View props
    // {...rest} style={style}
    <View>
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
