import { Platform, StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { PhoneNumberFieldStyles } from './types';

/**
 * An arbitrary number based off of the legacy amplify react-native component.
 * This value MUST be the same for picker and pickerItem.
 */
const PICKER_HEIGHT = 44;

export const getThemedStyles = (theme: StrictTheme): PhoneNumberFieldStyles => {
  const {
    components,
    tokens: { space },
  } = theme;

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      ...components?.phoneNumberField.container,
    },
    picker: {
      flex: 1,
      height: PICKER_HEIGHT,
      /**
       * Ensures that longer text values render without truncation
       * as the selected value of the Picker on Android
       */
      minWidth: Platform.OS === 'android' ? space.xl : 0,
      ...components?.phoneNumberField.picker,
    },
    pickerItem: {
      height: PICKER_HEIGHT,
      ...components?.phoneNumberField.pickerItem,
    },
  });
};
