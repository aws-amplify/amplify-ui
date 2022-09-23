import React, { useCallback, useMemo } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

import { Label } from '../index';
import { getFlexDirectionFromLabelPosition } from '../Label/utils';

import { styles } from './styles';
import { RadioProps } from './types';
import { getRadioButtonStyles } from './getRadioButtonStyles';

export default function Radio<T>({
  accessibilityRole = 'radio',
  disabled,
  label,
  labelPosition = 'end',
  labelStyle,
  onChange,
  radioButtonContainerStyle,
  radioButtonStyle,
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

  const containerStyle: ViewStyle = useMemo(
    () => ({
      ...styles.container,
      flexDirection: getFlexDirectionFromLabelPosition(labelPosition),
      ...(disabled && styles.disabled),
    }),
    [disabled, labelPosition]
  );

  return (
    <Pressable
      {...rest}
      accessibilityRole={accessibilityRole}
      // hitSlop will be platform-specific,
      // and partially depends on how much spacing the RadioGroupField will apply
      hitSlop={5}
      onPress={handleOnChange}
      style={[containerStyle, style]}
    >
      <View
        style={[
          styles.radioButtonContainer,
          getRadioButtonStyles('radioButtonContainer', size),
          radioButtonContainerStyle,
        ]}
      >
        {selected ? (
          <View
            style={[
              styles.radioButton,
              getRadioButtonStyles('radioButton', size),
              radioButtonStyle,
            ]}
          />
        ) : null}
      </View>
      {label ? <Label style={labelStyle}>{label}</Label> : null}
    </Pressable>
  );
}
