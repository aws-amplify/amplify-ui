import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';

import { Label } from '../index';

import { styles } from './styles';
import { FLEX_DIRECTIONS, RadioProps } from './types';

export default function Radio<T>({
  buttonStyle,
  disabled,
  label,
  labelPosition = 'end',
  labelStyle,
  onChange,
  selected,
  size = 'medium',
  style,
  value,
  ...rest
}: RadioProps<T>): JSX.Element {
  const handleOnChange = useCallback(() => {
    if (!disabled) {
      onChange?.(value);
    }
  }, [onChange, value, disabled]);

  const flexDirection = FLEX_DIRECTIONS[labelPosition];

  return (
    <Pressable
      {...rest}
      // hitSlop will be platform-specific, and it partially depends on
      // how much spacing the RadioGroupField applies
      hitSlop={5}
      onPress={handleOnChange}
      style={[
        styles.container,
        { flexDirection },
        disabled ? [styles._disabled] : undefined,
        style,
      ]}
    >
      <Pressable onPress={handleOnChange}>
        <View
          accessibilityRole="radio"
          style={[styles.radio, styles.radio[size]]}
        >
          {selected ? (
            <View
              style={[styles.radioButton, styles.radio[size], buttonStyle]}
            />
          ) : null}
        </View>
      </Pressable>
      {label ? <Label style={labelStyle}>{label}</Label> : null}
    </Pressable>
  );
}
