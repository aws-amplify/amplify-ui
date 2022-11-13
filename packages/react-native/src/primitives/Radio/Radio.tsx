import React, { useCallback, useMemo } from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { Label } from '../Label';
import { getFlexDirectionFromLabelPosition } from '../Label/utils';

import { styles } from './styles';
import { RadioProps } from './types';
import { getRadioDimensions } from './getRadioDimensions';

export default function Radio<T>({
  accessibilityRole = 'radio',
  disabled,
  label,
  labelPosition = 'end',
  labelStyle,
  onChange,
  radioContainerStyle,
  radioDotStyle,
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

  const containerStyle = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const containerStyle: ViewStyle = {
        ...styles.container,
        flexDirection: getFlexDirectionFromLabelPosition(labelPosition),
        ...(disabled && styles.disabled),
      };

      const pressedStateStyle =
        typeof style === 'function' ? style({ pressed }) : style;
      return [containerStyle, pressedStateStyle];
    },
    [disabled, labelPosition, style]
  );

  const { radioContainerSize, radioDotSize } = useMemo(
    () => getRadioDimensions(size, styles),
    [size]
  );

  return (
    <Pressable
      {...rest}
      accessibilityRole={accessibilityRole}
      onPress={handleOnChange}
      style={containerStyle}
    >
      <View
        style={[styles.radioContainer, radioContainerSize, radioContainerStyle]}
      >
        {selected ? (
          <View style={[styles.radioDot, radioDotSize, radioDotStyle]} />
        ) : null}
      </View>
      {label ? <Label style={labelStyle}>{label}</Label> : null}
    </Pressable>
  );
}
