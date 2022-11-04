import { StyleSheet } from 'react-native';

import { LabelStyles } from './types';

export const styles: LabelStyles = StyleSheet.create({
  label: {
    color: '{colors.font.primary}',
    fontSize: 16,
    marginVertical: 2,
    marginHorizontal: 4,
  },
});
