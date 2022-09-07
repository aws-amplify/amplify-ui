import { StyleSheet } from 'react-native';
import { getLineHeight } from '../../utils';
import { HeadingStyles } from './types';

export const styles: HeadingStyles = StyleSheet.create({
  text: {
    color: 'black',
  },
  // these values are completely arbitrary for now
  1: { fontSize: 56, fontWeight: '100', lineHeight: getLineHeight(56) },
  2: { fontSize: 44, fontWeight: '200', lineHeight: getLineHeight(44) },
  3: { fontSize: 34, fontWeight: '300', lineHeight: getLineHeight(34) },
  4: { fontSize: 26, fontWeight: '500', lineHeight: getLineHeight(26) },
  5: { fontSize: 20, fontWeight: '700', lineHeight: getLineHeight(20) },
  6: { fontSize: 16, fontWeight: '900', lineHeight: getLineHeight(16) },
});
