import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useTheme } from '../../theme';
import { getThemedStyles } from './styles';
import { TextField } from '../TextField';
import { PhoneNumberFieldProps } from './types';

export default function PhoneNumberField({
  defaultDialCode,
  dialCodes,
  disabled,
  inputStyle,
  onDialCodeChange,
  pickerItemStyle,
  pickerStyle,
  style,
  ...rest
}: PhoneNumberFieldProps): JSX.Element | null {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);

  const [selectedDialCode, setSelectedDialCode] = useState(defaultDialCode);

  const handleOnValueChange = useCallback(
    (itemValue: string) => {
      setSelectedDialCode(itemValue);
      onDialCodeChange?.(itemValue);
    },
    [onDialCodeChange]
  );

  const pickerItems = useMemo(() => {
    return dialCodes?.map((dialCode) => {
      return <Picker.Item label={dialCode} value={dialCode} key={dialCode} />;
    });
  }, [dialCodes]);

  return (
    <View style={[themedStyle.container, style]}>
      {dialCodes ? (
        <Picker
          enabled={!disabled}
          itemStyle={[themedStyle.pickerItem, pickerItemStyle]}
          mode="dropdown"
          onValueChange={handleOnValueChange}
          selectedValue={selectedDialCode}
          testID="RNPicker"
          style={[themedStyle.picker, pickerStyle]}
        >
          {pickerItems}
        </Picker>
      ) : null}
      <TextField
        {...rest}
        disabled={disabled}
        keyboardType="phone-pad"
        style={[themedStyle.inputContainer, inputStyle]}
      />
    </View>
  );
}
