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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.RatingMixedIcon = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var classnames_1 = __importDefault(require('classnames'));
var View_1 = require('../View');
var RatingMixedIcon = function (_a) {
  var emptyColor = _a.emptyColor,
    emptyIcon = _a.emptyIcon,
    fillColor = _a.fillColor,
    fillIcon = _a.fillIcon,
    value = _a.value;
  var widthPercentage = (value % 1) * 100 + '%';
  return jsx_runtime_1.jsxs(
    View_1.View,
    __assign(
      {
        as: 'span',
        className: classnames_1.default('amplify-rating-icon-container'),
      },
      {
        children: [
          jsx_runtime_1.jsx(
            View_1.View,
            __assign(
              {
                as: 'label',
                className: classnames_1.default('amplify-rating-label'),
              },
              {
                children: jsx_runtime_1.jsx(
                  View_1.View,
                  __assign(
                    {
                      as: 'span',
                      className: classnames_1.default(
                        'amplify-rating-icon',
                        'amplify-rating-icon-empty'
                      ),
                      color: emptyColor,
                    },
                    { children: emptyIcon }
                  ),
                  void 0
                ),
              }
            ),
            void 0
          ),
          jsx_runtime_1.jsx(
            View_1.View,
            __assign(
              {
                as: 'label',
                className: classnames_1.default('amplify-rating-label'),
                width: widthPercentage,
              },
              {
                children: jsx_runtime_1.jsx(
                  View_1.View,
                  __assign(
                    {
                      as: 'span',
                      className: classnames_1.default(
                        'amplify-rating-icon',
                        'amplify-rating-icon-filled'
                      ),
                      color: fillColor,
                    },
                    { children: fillIcon }
                  ),
                  void 0
                ),
              }
            ),
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.RatingMixedIcon = RatingMixedIcon;
//# sourceMappingURL=RatingMixedIcon.js.map
