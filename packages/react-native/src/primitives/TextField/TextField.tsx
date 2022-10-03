import React, { useMemo, useState } from 'react';
import { TextInput, View, ViewStyle } from 'react-native';
import { Label } from '../Label';

import { styles } from './styles';
import { TextFieldProps } from './types';
import { getFlexDirectionFromLabelPosition } from '../Label/utils';

export default function TextField({
  disabled,
  label,
  labelPosition = 'end',
  labelStyle,
  style,
  ...rest
}: TextFieldProps): JSX.Element {
  const [value, setValue] = useState('');

  const containerStyle: ViewStyle = useMemo(
    () => ({
      ...styles.container,
      flexDirection: getFlexDirectionFromLabelPosition(labelPosition),
      ...(disabled && styles.disabled),
    }),
    [disabled, labelPosition]
  );

  return (
    <View style={[containerStyle, style]}>
      <TextInput
        editable={!disabled}
        value={value}
        onChangeText={(text) => setValue(text)}
        {...rest}
      />
      {label ? <Label style={labelStyle}>{label}</Label> : null}
    </View>
  );
}
