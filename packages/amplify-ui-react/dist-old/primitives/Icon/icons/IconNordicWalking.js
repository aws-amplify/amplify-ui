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
exports.IconNordicWalking = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconNordicWalking = function (props) {
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
              d: 'M9.25,3.75C9.25,2.78,10.03,2,11,2s1.75,0.78,1.75,1.75c0,0.97-0.79,1.75-1.75,1.75C10.04,5.5,9.25,4.72,9.25,3.75z M15,11 V9.5c-3.12,0-2.99-2.17-4.11-3.06c-0.57-0.46-1.35-0.57-2.03-0.28L5,7.79V11h1.5V8.78l1.65-0.7L6.2,18h1.53l1.19-6.02l1.58,1.59V18 H12v-5.05l-1.46-1.46l0.49-2.48C11.94,10.21,13.37,11,15,11z M14,18h1v-6h-1V18z M6.03,12H5l-1.4,6h1.03L6.03,12z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconNordicWalking = IconNordicWalking;
//# sourceMappingURL=IconNordicWalking.js.map
