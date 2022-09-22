import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';

import { Label } from '../index';

import { FLEX_DIRECTIONS, RadioProps } from './types';
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

  const flexDirection = FLEX_DIRECTIONS[labelPosition];

  return (
    <View
      {...rest}
      style={[
        styles.container,
        { flexDirection },
        ...(disabled ? [styles._disabled] : []),
        style,
      ]}
    >
      <Pressable onPress={handleOnChange} hitSlop={5}>
        <View
          accessibilityRole="radio"
          style={[styles.radio, size ? [styles.radio[size]] : undefined]}
        >
          {selected ? (
            <View
              style={[
                styles.radioButton,
                size ? [styles.radio[size]] : undefined,
                buttonStyle,
              ]}
            />
          ) : null}
        </View>
      </Pressable>
      {label ? <Label style={labelStyle}>{label}</Label> : null}
    </View>
  );
}
