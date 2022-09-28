import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ViewStyle } from 'react-native';

import { icons } from '../../assets';
import { styles } from './styles';
import { Label } from '../Label';
import { CheckboxProps } from './types';
import { getFlexDirectionFromLabelPosition } from '../Label/utils';
import { Icon } from '../Icon';

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

  const handleOnChange = useCallback(() => {
    onChange?.(value);
    setChecked(!checked);
  }, [onChange, value, checked]);

  const containerStyle: ViewStyle = useMemo(
    () => ({
      ...styles.container,
      flexDirection: getFlexDirectionFromLabelPosition(labelPosition),
      opacity: disabled ? 0.6 : 1,
    }),
    [disabled, labelPosition]
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
