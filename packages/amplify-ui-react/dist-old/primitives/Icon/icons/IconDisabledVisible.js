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
exports.IconDisabledVisible = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconDisabledVisible = function (props) {
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
              d: 'M17.99,10.38C18,10.26,18,10.13,18,10c0-4.42-3.58-8-8-8s-8,3.58-8,8c0,4.24,3.3,7.71,7.47,7.98 c-0.73-0.53-1.35-1.18-1.83-1.93C5.22,15.11,3.5,12.75,3.5,10c0-1.52,0.53-2.92,1.41-4.03l4.85,4.85c0.43-0.29,0.9-0.53,1.39-0.73 L5.97,4.91C7.08,4.03,8.48,3.5,10,3.5c3.51,0,6.39,2.81,6.5,6.3C17.02,9.95,17.52,10.14,17.99,10.38z M15.5,14.5 c0,0.69-0.56,1.25-1.25,1.25S13,15.19,13,14.5s0.56-1.25,1.25-1.25S15.5,13.81,15.5,14.5z M14.25,11c-2.61,0-4.85,1.45-5.75,3.5 c0.9,2.05,3.14,3.5,5.75,3.5s4.85-1.45,5.75-3.5C19.1,12.45,16.86,11,14.25,11z M14.25,16.5c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S15.35,16.5,14.25,16.5z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconDisabledVisible = IconDisabledVisible;
//# sourceMappingURL=IconDisabledVisible.js.map
