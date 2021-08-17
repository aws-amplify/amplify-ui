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
exports.IconWavingHand = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconWavingHand = function (props) {
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
              d: 'M1,6c0-2.76,2.24-5,5-5v1C3.79,2,2,3.79,2,6H1z M19,14c0,2.76-2.24,5-5,5v-1c2.21,0,4-1.79,4-4H19z M3.05,16.95 c2.73,2.73,7.17,2.73,9.9,0l5.66-5.66c0.39-0.39,0.39-1.02,0-1.41s-1.02-0.39-1.41,0l-3.54,3.54l-0.71-0.71l5.48-5.48 c0.39-0.39,0.39-1.02,0-1.41s-1.02-0.39-1.41,0l-4.77,4.77l-0.71-0.71l5.66-5.66c0.39-0.39,0.39-1.02,0-1.41s-1.02-0.39-1.41,0 l-5.66,5.66L9.41,7.76l4.6-4.6c0.39-0.39,0.39-1.02,0-1.41s-1.02-0.39-1.41,0L6.21,8.14c1.03,1.37,0.92,3.33-0.33,4.57L5.17,12 c0.98-0.98,0.98-2.56,0-3.54L4.82,8.11l3.54-3.54c0.39-0.39,0.39-1.02,0-1.41s-1.02-0.39-1.41,0L3.05,7.05 C0.32,9.78,0.32,14.22,3.05,16.95z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconWavingHand = IconWavingHand;
//# sourceMappingURL=IconWavingHand.js.map
