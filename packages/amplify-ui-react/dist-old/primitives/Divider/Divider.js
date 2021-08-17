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
exports.Divider = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var classnames_1 = __importDefault(require('classnames'));
var shared_1 = require('../shared');
var View_1 = require('../View');
var Divider = function (props) {
  var className = props.className,
    _a = props.orientation,
    orientation = _a === void 0 ? 'horizontal' : _a,
    size = props.size,
    rest = __rest(props, ['className', 'orientation', 'size']);
  return jsx_runtime_1.jsx(
    View_1.View,
    __assign(
      {
        'aria-orientation': orientation,
        as: 'hr',
        className: classnames_1.default(
          shared_1.ComponentClassNames.Divider,
          className
        ),
        'data-size': size,
      },
      rest
    ),
    void 0
  );
};
exports.Divider = Divider;
//# sourceMappingURL=Divider.js.map
