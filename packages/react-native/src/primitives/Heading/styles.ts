import { StyleSheet } from 'react-native';
import { HeadingStyles } from './types';

export const styles: HeadingStyles = StyleSheet.create({
  text: {
    color: 'black',
    // lineHeight: 1,
  },
  // these values are completely arbitrary for now
  1: { fontSize: 56, fontWeight: '100' },
  2: { fontSize: 44, fontWeight: '200' },
  3: { fontSize: 34, fontWeight: '300' },
  4: { fontSize: 26, fontWeight: '500' },
  5: { fontSize: 20, fontWeight: '700' },
  6: { fontSize: 16, fontWeight: '900' },
});
