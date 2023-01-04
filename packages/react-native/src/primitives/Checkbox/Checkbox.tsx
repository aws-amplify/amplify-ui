import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ViewStyle } from 'react-native';

import { CheckboxProps } from './types';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { getThemedStyles } from './styles';
import { icons } from '../../assets';
import { useTheme } from '../../theme';

export default function Checkbox<T>({
  accessibilityRole = 'checkbox',
  iconStyle,
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
  const [checked, setChecked] = useState(selected ?? false);
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme, labelPosition);

  const handleOnChange = useCallback(() => {
    onChange?.(value);
    setChecked(!checked);
  }, [onChange, value, checked]);

  const containerStyle: ViewStyle = useMemo(
    () => ({
      ...themedStyle.container,
      ...(disabled && themedStyle.disabled),
    }),
    [disabled, themedStyle]
  );

  return (
    <Pressable
      {...rest}
      accessibilityRole={accessibilityRole}
      disabled={disabled}
      onPress={handleOnChange}
      style={[containerStyle, style]}
    >
      <Icon
        source={checked ? icons.checkboxFilled : icons.checkboxOutline}
        size={size}
        style={iconStyle}
      />
      {label ? <Label style={labelStyle}>{label}</Label> : null}
    </Pressable>
  );
}
