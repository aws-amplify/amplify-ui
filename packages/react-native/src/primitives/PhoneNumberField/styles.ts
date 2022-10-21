import { Platform, StyleSheet } from 'react-native';

import { PhoneNumberFieldStyles } from './types';

export const styles: PhoneNumberFieldStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldStyle: {
    flex: 1,
  },
  picker: {
    flex: 1,
    /*
       arbitrary number based off of the legacy amplify react-native component
       this value MUST match the height of the pickerItem
    */
    height: 44,
    /*
       ensure that longer text values render without truncation
		   as the selected value of the Picker on Android
    */
    minWidth: Platform.OS === 'android' ? 16 : 0,
  },
  pickerItem: { height: 44 },
});
