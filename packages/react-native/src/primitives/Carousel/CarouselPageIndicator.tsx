import React, { useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CarouselPageIndicatorProps } from './types';
import {
  DEFAULT_CAROUSEL_INDICATOR_ACTIVE_STYLE,
  DEFAULT_CAROUSEL_INDICATOR_INACTIVE_STYLE,
} from './constants';

export default function CarouselPageIndicator({
  activeStyle,
  currentIndex,
  inactiveStyle,
  numberOfItems,
  style,
}: CarouselPageIndicatorProps): JSX.Element {
  const items = useMemo(
    () =>
      new Array(numberOfItems ?? 0)
        .fill(null)
        .map((_, index) =>
          (currentIndex ?? 0) === index ? (
            <View
              style={[DEFAULT_CAROUSEL_INDICATOR_ACTIVE_STYLE, activeStyle]}
              key={`indicator-item-${index}`}
            />
          ) : (
            <View
              style={[DEFAULT_CAROUSEL_INDICATOR_INACTIVE_STYLE, inactiveStyle]}
              key={`indicator-item-${index}`}
            />
          )
        ),
    [activeStyle, currentIndex, inactiveStyle, numberOfItems]
  );

  return <SafeAreaView style={style}>{items}</SafeAreaView>;
}
