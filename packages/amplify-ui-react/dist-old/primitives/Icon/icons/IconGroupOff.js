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
exports.IconGroupOff = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconGroupOff = function (props) {
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
              d: 'M10.61,8.49C10.86,8.05,11,7.54,11,7c0-1.66-1.34-3-3-3C7.46,4,6.95,4.14,6.51,4.39L10.61,8.49z M11.68,9.56 C12.19,8.83,12.5,7.95,12.5,7c0-1.13-0.43-2.15-1.12-2.94C11.58,4.02,11.79,4,12,4c1.66,0,3,1.34,3,3c0,1.62-1.28,2.94-2.88,3 L11.68,9.56z M15.41,13.29c-0.2-0.83-0.69-1.57-1.39-2.06c1.08,0.22,2.1,0.6,3.02,1.14c0.6,0.36,0.97,1.02,0.97,1.72v1.79 L15.41,13.29z M5,7.12L1.16,3.28l1.06-1.06l15.56,15.56l-1.06,1.06L13.88,16H2v-1.91c0-0.7,0.36-1.36,0.97-1.72 C4.44,11.5,6.16,11,8,11c0.31,0,0.62,0.01,0.92,0.04l0,0L7.88,10C6.32,9.93,5.07,8.68,5,7.12z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconGroupOff = IconGroupOff;
//# sourceMappingURL=IconGroupOff.js.map
