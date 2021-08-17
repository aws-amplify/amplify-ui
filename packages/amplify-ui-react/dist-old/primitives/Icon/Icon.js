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
exports.Icon = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var classnames_1 = __importDefault(require('classnames'));
var shared_1 = require('../shared');
var View_1 = require('../View');
var defaultViewBox = { minX: 0, minY: 0, width: 24, height: 24 };
var Icon = function (props) {
  var className = props.className,
    _a = props.fill,
    fill = _a === void 0 ? 'currentColor' : _a,
    pathData = props.pathData,
    size = props.size,
    _b = props.viewBox,
    viewBox = _b === void 0 ? defaultViewBox : _b,
    rest = __rest(props, ['className', 'fill', 'pathData', 'size', 'viewBox']);
  var minX = viewBox.minX ? viewBox.minX : defaultViewBox.minX;
  var minY = viewBox.minY ? viewBox.minY : defaultViewBox.minY;
  var width = viewBox.width ? viewBox.width : defaultViewBox.width;
  var height = viewBox.height ? viewBox.height : defaultViewBox.height;
  return jsx_runtime_1.jsx(
    View_1.View,
    __assign(
      {
        as: 'svg',
        className: classnames_1.default(
          shared_1.ComponentClassNames.Icon,
          className
        ),
        'data-size': size,
        viewBox: minX + ' ' + minY + ' ' + width + ' ' + height,
      },
      rest,
      {
        children: jsx_runtime_1.jsx(
          'path',
          { d: pathData, fill: fill },
          void 0
        ),
      }
    ),
    void 0
  );
};
exports.Icon = Icon;
//# sourceMappingURL=Icon.js.map
