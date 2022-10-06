import React, { Children, cloneElement, isValidElement, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

import { Label } from '../Label';
import { getFlexDirectionFromLabelPosition } from '../Label/utils';
import { RadioProps } from '../Radio';

import { styles } from './styles';
import { RadioGroupProps } from './types';

export default function RadioGroup<T>({
  accessibilityRole = 'radiogroup',
  children,
  direction = 'vertical',
  disabled,
  label,
  labelPosition = 'top',
  labelStyle,
  onChange,
  size,
  style,
  value,
  ...rest
}: RadioGroupProps<T>): JSX.Element {
  const containerStyle: ViewStyle = useMemo(
    () => ({
      style,
      flexDirection: getFlexDirectionFromLabelPosition(labelPosition),
    }),
    [labelPosition, style]
  );

  const childContainerStyle: ViewStyle = useMemo(
    () => ({ flexDirection: direction === 'horizontal' ? 'row' : 'column' }),
    [direction]
  );

  return (
    <View {...rest} style={containerStyle}>
      <View accessibilityRole={accessibilityRole} style={childContainerStyle}>
        {Children.map(children, (child) => {
          if (isValidElement<RadioProps<T>>(child)) {
            const {
              disabled: childDisabled,
              value: childValue,
              size: childSize,
            } = child.props;
            const isChildDisabled =
              typeof childDisabled === 'boolean' ? childDisabled : disabled;
            const isChildSelected = childValue === value;

            return cloneElement<RadioProps<T>>(child, {
              disabled: isChildDisabled,
              onChange,
              selected: isChildSelected,
              size: childSize ?? size,
            });
          }
        })}
      </View>
      {label ? <Label style={[styles.label, labelStyle]}>{label}</Label> : null}
    </View>
  );
}
