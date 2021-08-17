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
Object.defineProperty(exports, '__esModule', { value: true });
exports.IconCrib = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconCrib = function (props) {
  var size = props.size,
    _a = props.fill,
    fill = _a === void 0 ? 'currentColor' : _a,
    ariaLabel = props.ariaLabel,
    rest = __rest(props, ['size', 'fill', 'ariaLabel']);
  return jsx_runtime_1.jsxs(
    'svg',
    __assign(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        'enable-background': 'new 0 0 20 20',
        height: '20',
        viewBox: '0 0 20 20',
        width: '20',
      },
      {
        children: [
          jsx_runtime_1.jsx(
            'rect',
            { fill: 'none', height: '20', width: '20' },
            void 0
          ),
          jsx_runtime_1.jsx(
            'path',
            {
              d: 'M16,12V9.5C16,8.67,15.33,8,14.5,8H10V4H7C5.34,4,4,5.34,4,7v5c0,0.83,0.67,1.5,1.5,1.5H7v2.27 c-0.59-0.31-1.13-0.7-1.59-1.17l-1.06,1.06C5.79,17.1,7.79,18,10,18c2.21,0,4.21-0.9,5.66-2.34l-1.06-1.06 c-0.47,0.47-1,0.86-1.59,1.17l0-2.27h1.5C15.33,13.5,16,12.83,16,12z M11.5,16.33c-0.48,0.11-0.98,0.17-1.5,0.17 s-1.02-0.06-1.5-0.17V13.5h3V16.33z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconCrib = IconCrib;
//# sourceMappingURL=IconCrib.js.map
