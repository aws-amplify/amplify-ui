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
exports.IconHiking = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconHiking = function (props) {
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
              d: 'M9.25,3.75C9.25,2.78,10.03,2,11,2s1.75,0.78,1.75,1.75c0,0.97-0.79,1.75-1.75,1.75C10.04,5.5,9.25,4.72,9.25,3.75z M4.9,10.75l1.64,0.32l0.96-4.91L6.84,6.03C6.03,5.87,5.24,6.4,5.08,7.21l-0.57,2.94C4.46,10.43,4.63,10.69,4.9,10.75z M14,18h1V8 h-1l0,1.41c-2.11-0.42-2.13-2.19-3.11-2.97c-0.21-0.17-0.45-0.29-0.7-0.36c-0.81-0.23-1.7,0.27-1.88,1.16C8.15,8.06,6.2,18,6.2,18 h1.53l1.19-6.01l1.58,1.58V18H12v-5.05l-1.46-1.46l0.49-2.48c0.72,0.95,1.76,1.64,2.97,1.89C14,10.9,14,18,14,18z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconHiking = IconHiking;
//# sourceMappingURL=IconHiking.js.map
