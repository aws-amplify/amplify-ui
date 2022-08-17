import { StyleSheet } from 'react-native';
import { HeadingStyles } from './types';

export const styles: HeadingStyles = StyleSheet.create({
  text: {
    color: 'black',
    // lineHeight: 1,
  },
  // these values are completely arbitrary for now
  1: { fontSize: 24, fontWeight: '100' },
  2: { fontSize: 22, fontWeight: '200' },
  3: { fontSize: 20, fontWeight: '300' },
  4: { fontSize: 18, fontWeight: '500' },
  5: { fontSize: 16, fontWeight: '700' },
  6: { fontSize: 14, fontWeight: '900' },
});
