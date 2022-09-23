import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';

import { Label } from '../index';

import { styles } from './styles';
import { FLEX_DIRECTIONS, RadioProps } from './types';
import { getRadioButtonStyles } from './getRadioButtonStyles';

export default function Radio<T>({
  accessibilityRole = 'radio',
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
      accessibilityRole={accessibilityRole}
      // hitSlop will be platform-specific, and it partially depends on
      // how much spacing the RadioGroupField applies
      hitSlop={5}
      onPress={handleOnChange}
      style={[
        styles.container,
        { flexDirection },
        disabled ? styles.disabled : undefined,
        style,
      ]}
    >
      <View
        style={[
          styles.radioButtonContainer,
          getRadioButtonStyles('radioButtonContainer', size),
        ]}
      >
        {selected ? (
          <View
            style={[
              styles.radioButton,
              getRadioButtonStyles('radioButton', size),
              buttonStyle,
            ]}
          />
        ) : null}
      </View>
      {label ? <Label style={labelStyle}>{label}</Label> : null}
    </Pressable>
  );
}
