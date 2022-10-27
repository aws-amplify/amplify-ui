import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { TextField } from '../TextField';
import { PhoneNumberFieldProps } from './types';
import { styles } from './styles';

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

  if (!dialCodes) return null;

  return (
    <View style={[styles.container, style]}>
      <Picker
        enabled={!disabled}
        itemStyle={[styles.pickerItem, pickerItemStyle]}
        mode="dropdown"
        onValueChange={handleOnValueChange}
        selectedValue={selectedDialCode}
        testID="RNPicker"
        style={[styles.picker, pickerStyle]}
      >
        {pickerItems}
      </Picker>
      <TextField
        {...rest}
        disabled={disabled}
        keyboardType="phone-pad"
        style={[styles.inputContainer, inputStyle]}
      />
    </View>
  );
}
