'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getConsecutiveIntArray =
  exports.getNonStyleProps =
  exports.convertStylePropsToStyleObj =
  exports.strHasLength =
    void 0;
var index_1 = require('../types/index');
var strHasLength = function (str) {
  return typeof str === 'string' && str.length > 0;
};
exports.strHasLength = strHasLength;
/**
 * Convert style props to CSS variables for React style prop
 * Note: Will filter out undefined, null, and empty string prop values
 * @returns CSSProperties styles
 */
var convertStylePropsToStyleObj = function (props, style) {
  if (style === void 0) {
    style = {};
  }
  Object.keys(index_1.ComponentPropsToStylePropsMap).forEach(function (
    stylePropKey
  ) {
    var _a;
    var stylePropValue = props[stylePropKey];
    if (
      stylePropValue != null &&
      (typeof stylePropValue !== 'string' ||
        exports.strHasLength(stylePropValue))
    ) {
      var reactStyleProp = index_1.ComponentPropsToStylePropsMap[stylePropKey];
      style = __assign(
        __assign({}, style),
        ((_a = {}), (_a[reactStyleProp] = stylePropValue), _a)
      );
    }
  });
  return style;
};
exports.convertStylePropsToStyleObj = convertStylePropsToStyleObj;
/**
 * Filter out known style props to prevent errors adding invalid HTML attributes
 * @param props
 * @returns non styled props
 */
var getNonStyleProps = function (props) {
  var nonStyleProps = {};
  Object.keys(props).forEach(function (propKey) {
    if (!(propKey in index_1.ComponentPropsToStylePropsMap)) {
      nonStyleProps[propKey] = props[propKey];
    }
  });
  return nonStyleProps;
};
exports.getNonStyleProps = getNonStyleProps;
/**
 * Create a consecutive integer array from start value to end value.
 * @param start start value
 * @param end end value
 * @returns an integer array with elements from start to end consecutively
 */
var getConsecutiveIntArray = function (start, end) {
  var length = end - start + 1;
  return Array.from({ length: length }, function (_, idx) {
    return idx + start;
  });
};
exports.getConsecutiveIntArray = getConsecutiveIntArray;
//# sourceMappingURL=utils.js.map
