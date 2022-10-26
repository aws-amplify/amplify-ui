import { StyleSheet } from 'react-native';

import { DividerStyles } from './types';

export const styles: DividerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    margin: 8,
    textAlign: 'center',
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
  },
});
