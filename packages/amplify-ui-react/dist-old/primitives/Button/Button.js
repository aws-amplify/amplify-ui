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
exports.Button = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var constants_1 = require('../shared/constants');
var classnames_1 = __importDefault(require('classnames'));
var View_1 = require('../View');
var Button = function (_a) {
  var ariaLabel = _a.ariaLabel,
    _b = _a.className,
    className = _b === void 0 ? '' : _b,
    children = _a.children,
    _c = _a.isFullWidth,
    isFullWidth = _c === void 0 ? false : _c,
    isDisabled = _a.isDisabled,
    isLoading = _a.isLoading,
    id = _a.id,
    _d = _a.loadingText,
    loadingText = _d === void 0 ? '' : _d,
    _e = _a.onClick,
    onClick = _e === void 0 ? function () {} : _e,
    size = _a.size,
    variation = _a.variation,
    _f = _a.type,
    type = _f === void 0 ? 'button' : _f;
  return jsx_runtime_1.jsx(
    View_1.View,
    __assign(
      {
        'aria-label': ariaLabel,
        as: 'button',
        className: classnames_1.default(
          constants_1.ComponentClassNames.Button,
          className
        ),
        'data-fullwidth': isFullWidth,
        'data-loading': isLoading,
        'data-size': size,
        'data-variation': variation,
        disabled: isDisabled || isLoading,
        id: id,
        onClick: onClick,
        type: type,
      },
      {
        children:
          isLoading && loadingText
            ? jsx_runtime_1.jsx('span', { children: loadingText }, void 0)
            : children,
      }
    ),
    void 0
  );
};
exports.Button = Button;
//# sourceMappingURL=Button.js.map
