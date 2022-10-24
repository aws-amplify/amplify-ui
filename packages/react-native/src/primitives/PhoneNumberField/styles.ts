import { Platform, StyleSheet } from 'react-native';

import { PhoneNumberFieldStyles } from './types';

/*
    arbitrary number based off of the legacy amplify react-native component
    this value MUST be the same for picker and pickerItem
*/
const PICKER_HEIGHT = 44;

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
    height: PICKER_HEIGHT,
    /*
       ensure that longer text values render without truncation
		   as the selected value of the Picker on Android
    */
    minWidth: Platform.OS === 'android' ? 16 : 0,
  },
  pickerItem: { height: PICKER_HEIGHT },
});
