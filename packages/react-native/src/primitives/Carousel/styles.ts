import { StyleSheet } from 'react-native';

import { CarouselStyles } from './types';

export const styles: CarouselStyles = StyleSheet.create({
  indicator: {
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
});
