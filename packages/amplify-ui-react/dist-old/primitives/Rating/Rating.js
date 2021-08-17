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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Rating = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var classnames_1 = __importDefault(require('classnames'));
var constants_1 = require('../shared/constants');
var RatingIcon_1 = require('./RatingIcon');
var RatingMixedIcon_1 = require('./RatingMixedIcon');
var Flex_1 = require('../Flex');
var Text_1 = require('../Text');
var Icon_1 = require('../Icon');
var utils_1 = require('./utils');
var RATING_DEFAULT_MAX_VALUE = 5;
var RATING_DEFAULT_VALUE = 0;
var Rating = function (props) {
  var className = props.className,
    emptyColor = props.emptyColor,
    emptyIcon = props.emptyIcon,
    fillColor = props.fillColor,
    _a = props.icon,
    icon = _a === void 0 ? jsx_runtime_1.jsx(Icon_1.IconStar, {}, void 0) : _a,
    _b = props.maxValue,
    maxValue = _b === void 0 ? RATING_DEFAULT_MAX_VALUE : _b,
    size = props.size,
    _c = props.value,
    value = _c === void 0 ? RATING_DEFAULT_VALUE : _c,
    rest = __rest(props, [
      'className',
      'emptyColor',
      'emptyIcon',
      'fillColor',
      'icon',
      'maxValue',
      'size',
      'value',
    ]);
  var items = new Array(Math.ceil(maxValue)).fill(1).map(function (val, index) {
    var currentIconIndex = index + 1;
    if (utils_1.isIconFilled(currentIconIndex, value))
      return jsx_runtime_1.jsx(
        RatingIcon_1.RatingIcon,
        {
          icon: icon,
          fill: fillColor,
          className: 'amplify-rating-icon-filled',
        },
        index.toString()
      );
    if (utils_1.isIconEmpty(currentIconIndex, value))
      return jsx_runtime_1.jsx(
        RatingIcon_1.RatingIcon,
        {
          icon: emptyIcon || icon,
          fill: emptyColor,
          className: 'amplify-rating-icon-empty',
        },
        index.toString()
      );
    if (utils_1.isIconMixed(currentIconIndex, value))
      return jsx_runtime_1.jsx(
        RatingMixedIcon_1.RatingMixedIcon,
        {
          fillIcon: icon,
          emptyIcon: emptyIcon || icon,
          value: value,
          fillColor: fillColor,
          emptyColor: emptyColor,
        },
        index.toString()
      );
  });
  return jsx_runtime_1.jsxs(
    Flex_1.Flex,
    __assign(
      {
        className: classnames_1.default(
          constants_1.ComponentClassNames.Rating,
          className
        ),
        'data-size': size,
      },
      rest,
      {
        children: [
          items,
          jsx_runtime_1.jsxs(
            Text_1.Text,
            __assign(
              { className: 'sr-only' },
              { children: [value, ' out of ', maxValue, ' rating'] }
            ),
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.Rating = Rating;
//# sourceMappingURL=Rating.js.map
