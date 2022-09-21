import React, { useCallback, useMemo } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

import { Label } from '../index';

import { RadioProps } from './types';
import { styles } from './styles';

export default function Radio<T>({
  // buttonStyle,
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
  const labelPrecedesButton =
    labelPosition === 'start' || labelPosition === 'top';

  const handleOnChange = useCallback(() => {
    if (!disabled) {
      onChange?.(value);
    }
  }, [onChange, value, disabled]);

  const containerStyle: ViewStyle = useMemo(
    () => ({
      // move alignItems into styles
      alignItems: 'center',
      flexDirection:
        labelPosition === 'bottom' || labelPosition === 'top'
          ? 'column'
          : 'row',
      // opacity: disabled ? 0.6 : 1,
    }),
    [labelPosition]
  );

  return (
    <View
      {...rest}
      style={[containerStyle, disabled ? [styles._disabled] : [], style]}
    >
      {label && labelPrecedesButton ? (
        <Label style={labelStyle}>{label}</Label>
      ) : null}
      <Pressable onPress={handleOnChange} hitSlop={5}>
        <View style={[styles.outer, ...(size ? [styles.outer[size]] : [])]}>
          {selected ? (
            <View
              style={[styles.inner, ...(size ? [styles.inner[size]] : [])]}
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
