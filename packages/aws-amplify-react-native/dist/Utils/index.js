'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.setTestId = void 0;

var _reactNative = require('react-native');

var setTestId = function setTestId(id) {
  return _reactNative.Platform.OS === 'android'
    ? {
        accessibilityLabel: id,
      }
    : {
        testID: id,
      };
};

exports.setTestId = setTestId;
