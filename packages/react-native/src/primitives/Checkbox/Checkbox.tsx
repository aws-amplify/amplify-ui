import React, { useCallback, useMemo, useState } from 'react';
import {
  PressableStateCallbackType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { icons } from '../../assets';
import { styles } from './styles';
import { IconButton } from '../IconButton';
import { Label } from '../Label';
import { CheckboxProps, LabelPosition } from './types';

export default function Checkbox<T>({
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
  accessibilityRole = 'checkbox',
  ...rest
}: CheckboxProps<T>): JSX.Element {
  const [pressed, setPressed] = useState(selected ?? false);

  const handleOnChange = useCallback(() => {
    onChange?.(value);
    setPressed(!pressed);
  }, [onChange, value, pressed]);

  const containerStyle: ViewStyle = useMemo(() => {
    const FLEX_DIRECTIONS: Record<LabelPosition, ViewStyle['flexDirection']> = {
      start: 'row-reverse',
      end: 'row',
      top: 'column-reverse',
      bottom: 'column',
    };

    return {
      ...styles.container,
      flexDirection: FLEX_DIRECTIONS[labelPosition],
      opacity: disabled ? 0.6 : 1,
    };
  }, [disabled, labelPosition]);

  const iconButtonStyle = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const pressedStateStyle =
        typeof buttonStyle === 'function'
          ? buttonStyle({ pressed })
          : buttonStyle;
      return [
        { alignItems: 'center', justifyContent: 'center' },
        pressedStateStyle,
      ];
    },
    [buttonStyle]
  );

  // TODO: replace View with Pressable and IconButton with icon once Icon primitive is added

  return (
    <View style={[containerStyle, style]}>
      <IconButton
        {...rest}
        accessibilityRole={accessibilityRole}
        disabled={disabled}
        onPress={handleOnChange}
        source={pressed ? icons.checkboxFilled : icons.checkboxOutline}
        size={size}
        style={iconButtonStyle}
      />
      {label ? <Label style={labelStyle}>{label}</Label> : null}
    </View>
  );
}
