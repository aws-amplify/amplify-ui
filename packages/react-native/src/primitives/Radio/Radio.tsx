import React, { useCallback, useMemo } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

import { Label } from '../index';

import { RadioProps } from './types';
import { styles } from './styles';

export default function Radio<T>({
  buttonStyle,
  disabled,
  label,
  labelPosition = 'end',
  labelStyle,
  onChange,
  selected,
  size,
  style,
  value,
  ...rest
}: RadioProps<T>): JSX.Element {
  const handleOnChange = useCallback(() => {
    if (!disabled) {
      onChange?.(value);
    }
  }, [onChange, value, disabled]);

  const containerDirection: ViewStyle = useMemo(
    () => ({
      flexDirection:
        labelPosition === 'bottom' || labelPosition === 'top'
          ? 'column'
          : 'row',
    }),
    [labelPosition]
  );

  const labelPrecedesButton =
    labelPosition === 'start' || labelPosition === 'top';

  return (
    <View
      {...rest}
      style={[
        styles.container,
        containerDirection,
        ...(disabled ? [styles._disabled] : []),
        style,
      ]}
    >
      {label && labelPrecedesButton ? (
        <Label style={labelStyle}>{label}</Label>
      ) : null}
      <Pressable onPress={handleOnChange} hitSlop={5}>
        <View
          accessibilityRole="radio"
          style={[styles.radio, ...(size ? [styles.radio[size]] : [])]}
        >
          {selected ? (
            <View
              style={[
                styles.radioButton,
                ...(size ? [styles.radioButton[size]] : []),
                buttonStyle,
              ]}
            />
          ) : null}
        </View>
      </Pressable>
      {label && !labelPrecedesButton ? (
        <Label style={labelStyle}>{label}</Label>
      ) : null}
    </View>
  );
}
