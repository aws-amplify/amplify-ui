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
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.createForwardRef = exports.dashToPascalCase = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var react_1 = __importDefault(require('react'));
var dashToPascalCase = function (str) {
  return str
    .toLowerCase()
    .split('-')
    .map(function (segment) {
      return segment.charAt(0).toUpperCase() + segment.slice(1);
    })
    .join('');
};
exports.dashToPascalCase = dashToPascalCase;
var createForwardRef = function (ReactComponent, displayName) {
  var forwardRef = function (props, ref) {
    return jsx_runtime_1.jsx(
      ReactComponent,
      __assign({}, props, { forwardedRef: ref }),
      void 0
    );
  };
  forwardRef.displayName = displayName;
  return react_1.default.forwardRef(forwardRef);
};
exports.createForwardRef = createForwardRef;
__exportStar(require('./attachEventProps'), exports);
//# sourceMappingURL=index.js.map
