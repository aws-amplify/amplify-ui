import React, { useCallback, useMemo, useState } from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { icons } from '../../assets';
import { styles } from './styles';
import { IconButton } from '../IconButton';
import { Label } from '../Label';
import { CheckboxProps } from './types';
import { FLEX_DIRECTIONS } from '../types';

export default function Checkbox<T>({
  accessibilityRole = 'checkbox',
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
}: CheckboxProps<T>): JSX.Element {
  const [pressed, setPressed] = useState(selected ?? false);

  const handleOnChange = useCallback(() => {
    onChange?.(value);
    setPressed(!pressed);
  }, [onChange, value, pressed]);

  const containerStyle: ViewStyle = useMemo(
    () => ({
      ...styles.container,
      flexDirection: FLEX_DIRECTIONS[labelPosition],
      opacity: disabled ? 0.6 : 1,
    }),
    [disabled, labelPosition]
  );

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

  // TODO: replace IconButton with icon once Icon primitive is added

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      disabled={disabled}
      onPress={handleOnChange}
      style={[containerStyle, style]}
    >
      <IconButton
        {...rest}
        disabled
        source={pressed ? icons.checkboxFilled : icons.checkboxOutline}
        size={size}
        style={iconButtonStyle}
      />
      {label ? <Label style={labelStyle}>{label}</Label> : null}
    </Pressable>
  );
}
