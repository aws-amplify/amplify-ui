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
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
var getDeviceOrientation = function () {
  var _a = Dimensions.get('screen'),
    height = _a.height,
    width = _a.width;
  return height >= width ? 'portrait' : 'landscape';
};
export default function useDeviceOrientation() {
  var _a = __read(useState(getDeviceOrientation), 2),
    deviceOrientation = _a[0],
    setDeviceOrientation = _a[1];
  var isLandscapeMode = deviceOrientation === 'landscape';
  var isPortraitMode = deviceOrientation === 'portrait';
  useEffect(function () {
    var handler = function () {
      setDeviceOrientation(getDeviceOrientation);
    };
    // The below cast and conditional unsubscribe handling is due to subscription removal variation
    // between `Dimensions.addEventListener` in React Native prior to and after v0.65.
    //
    // Beginning with v0.65, `Dimensions.addEventListener` returns an `EventSubscription` object,
    // which includes a `remove` method for removing the subscription. Prior versions return
    // `undefined`, and subscription removal is handled by `Dimensions.removeEventListener`,
    // which is deprecated in v0.65
    var subscription = Dimensions.addEventListener('change', handler);
    return function () {
      if (
        typeof (subscription === null || subscription === void 0
          ? void 0
          : subscription.remove) === 'function'
      ) {
        subscription.remove();
      } else {
        Dimensions.removeEventListener('change', handler);
      }
    };
  }, []);
  return {
    deviceOrientation: deviceOrientation,
    isLandscapeMode: isLandscapeMode,
    isPortraitMode: isPortraitMode,
  };
}
