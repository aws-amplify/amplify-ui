import { StyleSheet } from 'react-native';

import { ErrorMessageStyles } from './types';

export const styles: ErrorMessageStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5bcbc',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    width: '75%',
  },
  iconContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
  },
  textContainer: {
    alignItems: 'flex-start',
    flex: 4,
    height: '100%',
    justifyContent: 'center',
  },
});
