import React, { useCallback, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

import { icons } from '../../assets';

import {
  IconButton,
  Label,
} from '@aws-amplify/ui-react-native/dist/primitives';

import { RadioProps } from './types';

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
  const labelPrecedesIcon =
    labelPosition === 'start' || labelPosition === 'top';

  const handleOnChange = useCallback(() => {
    onChange?.(value);
  }, [onChange, value]);

  const containerStyle: ViewStyle = useMemo(
    () => ({
      alignItems: 'center',
      flexDirection:
        labelPosition === 'bottom' || labelPosition === 'top'
          ? 'column'
          : 'row',
      opacity: disabled ? 0.6 : 1,
    }),
    [disabled, labelPosition]
  );

  return (
    <View {...rest} style={[containerStyle, style]}>
      {label && labelPrecedesIcon ? (
        <Label style={labelStyle}>{label}</Label>
      ) : null}
      <IconButton
        disabled={disabled}
        onPress={handleOnChange}
        source={
          selected ? icons.radioButtonChecked : icons.radioButtonUnchecked
        }
        size={size}
        style={buttonStyle}
      />
      {label && !labelPrecedesIcon ? (
        <Label style={labelStyle}>{label}</Label>
      ) : null}
    </View>
  );
}
