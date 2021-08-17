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
exports.IconPinEnd = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconPinEnd = function (props) {
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
              d: 'M16.5,10V5.5h-13v9H12c0.01,0.02,0,1.5,0,1.5H3.5C2.67,16,2,15.33,2,14.5v-9C2,4.67,2.67,4,3.5,4h13C17.33,4,18,4.67,18,5.5 V10H16.5z M15.75,11.5c-1.24,0-2.25,1.01-2.25,2.25s1,2.25,2.25,2.25c1.24,0,2.25-1.01,2.25-2.25S16.99,11.5,15.75,11.5z M12.74,7 H8.5v4.24l1.59-1.59l2.12,2.12l1.06-1.06l-2.12-2.12L12.74,7z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconPinEnd = IconPinEnd;
//# sourceMappingURL=IconPinEnd.js.map
