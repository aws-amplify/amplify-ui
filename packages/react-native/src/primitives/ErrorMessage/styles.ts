import { StyleSheet } from 'react-native';

import { ErrorMessageStyles } from './types';

export const styles: ErrorMessageStyles = StyleSheet.create({
  container: {
    width: '75%',
    height: 40,
    backgroundColor: '#f5bcbc',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  // dismissButtonContainer and errorIconContainer can be combined into one overlapping style
  dismissButtonContainer: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  errorIconContainer: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    color: 'yellow',
  },
  textContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'purple',
    height: '100%',
  },
});
