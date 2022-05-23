var __read =
  (this && this.__read) ||
  function (o, n) {
    var m = typeof Symbol === 'function' && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
      r,
      ar = [],
      e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error: error };
    } finally {
      try {
        if (r && !r.done && (m = i['return'])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import CarouselPageIndicator from './CarouselPageIndicator';
import { VIEWABILITY_CONFIG } from './constants';
import { styles } from './styles';
export default function Carousel(props) {
  var data = props.data,
    indicatorActiveStyle = props.indicatorActiveStyle,
    indicatorInactiveStyle = props.indicatorInactiveStyle,
    renderItem = props.renderItem,
    style = props.style;
  var flatListRef = useRef(null);
  var indexRef = useRef(0);
  var _a = __read(useState(0), 2),
    currentIndex = _a[0],
    setCurrentIndex = _a[1];
  var windowWidthRef = useRef(Dimensions.get('window').width);
  var _b = __read(useState(windowWidthRef.current), 2),
    width = _b[0],
    setWidth = _b[1];
  var onViewableItemsChanged = useRef(function (_a) {
    var viewableItems = _a.viewableItems;
    if (viewableItems.length !== 1) {
      return;
    }
    var _b = __read(viewableItems, 1),
      item = _b[0];
    indexRef.current = item.index;
    setCurrentIndex(indexRef.current);
  });
  var updateOrientation = useCallback(function (updatedWidth) {
    if (windowWidthRef.current !== updatedWidth) {
      windowWidthRef.current = updatedWidth;
      setWidth(updatedWidth);
    }
  }, []);
  useEffect(
    function () {
      var _a;
      // on width change (due to orientation change), jump to the new index offset
      (_a =
        flatListRef === null || flatListRef === void 0
          ? void 0
          : flatListRef.current) === null || _a === void 0
        ? void 0
        : _a.scrollToOffset({
            offset: width * indexRef.current,
            animated: false,
          });
    },
    [width]
  );
  useEffect(
    function () {
      var orientationHandler = function (_a) {
        var window = _a.window;
        updateOrientation(window.width);
      };
      var subscription = Dimensions.addEventListener(
        'change',
        orientationHandler
      );
      // Clean up listener. Dimensions.removeEventListener is deprecated as of React Native 0.65 but it is technically
      // available so try to remove via a `EmitterSubscription` first before falling back to `removeEventListener`
      return function () {
        if (
          typeof (subscription === null || subscription === void 0
            ? void 0
            : subscription.remove) === 'function'
        ) {
          subscription === null || subscription === void 0
            ? void 0
            : subscription.remove();
        } else {
          Dimensions.removeEventListener('change', orientationHandler);
        }
      };
    },
    [updateOrientation]
  );
  var carouselRenderItem = function (renderInfo) {
    return <View style={{ width: width }}>{renderItem(renderInfo)}</View>;
  };
  if (!(data === null || data === void 0 ? void 0 : data.length)) {
    return null;
  }
  return (
    <>
      <FlatList
        bounces={false}
        data={data}
        decelerationRate="fast"
        disableIntervalMomentum
        horizontal
        onViewableItemsChanged={onViewableItemsChanged.current}
        ref={flatListRef}
        renderItem={carouselRenderItem}
        renderToHardwareTextureAndroid
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={width}
        style={style}
        viewabilityConfig={VIEWABILITY_CONFIG}
      />
      <CarouselPageIndicator
        activeStyle={indicatorActiveStyle}
        currentIndex={currentIndex}
        inactiveStyle={indicatorInactiveStyle}
        numberOfItems={data.length}
        style={styles.indicator}
      />
    </>
  );
}
