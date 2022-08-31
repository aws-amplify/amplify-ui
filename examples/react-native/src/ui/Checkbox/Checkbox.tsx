import React, { useCallback, useMemo } from 'react';
import {
  PressableStateCallbackType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { icons } from '../../assets';
import { IconButton } from '@aws-amplify/ui-react-native/dist/primitives';

import { Label } from '../Label';
import { CheckboxProps, CheckboxStyle } from './types';

const styles: CheckboxStyle = {
  container: {
    alignItems: 'center',
    padding: 4,
  },
};

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
  ...rest
}: CheckboxProps<T>): JSX.Element {
  const labelPrecedesIcon =
    labelPosition === 'start' || labelPosition === 'top';

  const handleOnChange = useCallback(() => {
    onChange?.(value);
  }, [onChange, value]);

  const containerStyle: ViewStyle = useMemo(
    () => ({
      ...styles.container,
      flexDirection:
        labelPosition === 'bottom' || labelPosition === 'top'
          ? 'column'
          : 'row',
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

  return (
    <View style={[containerStyle, style]}>
      {label && labelPrecedesIcon ? (
        <Label style={labelStyle}>{label}</Label>
      ) : null}
      <IconButton
        {...rest}
        disabled={disabled}
        onPress={handleOnChange}
        source={selected ? icons.checkboxFilled : icons.checkboxOutline}
        size={size}
        style={iconButtonStyle}
      />
      {label && !labelPrecedesIcon ? (
        <Label style={labelStyle}>{label}</Label>
      ) : null}
    </View>
  );
}
