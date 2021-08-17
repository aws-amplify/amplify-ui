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
exports.IconBackHand = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconBackHand = function (props) {
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
              d: 'M17.5,13.5c0,3.59-2.91,6.5-6.5,6.5l0,0c-2.69,0-5.11-1.64-6.11-4.14L2.31,9.37C2,8.59,2.73,7.8,3.53,8.05l0.38,0.12 C4.35,8.29,4.7,8.62,4.87,9.04l1.38,3.46H6.5v-10c0-0.55,0.45-1,1-1s1,0.45,1,1V10h1V1c0-0.55,0.45-1,1-1s1,0.45,1,1v9h1V2.25 c0-0.55,0.45-1,1-1s1,0.45,1,1V10h1V5c0-0.55,0.45-1,1-1c0.55,0,1,0.45,1,1V13.5z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconBackHand = IconBackHand;
//# sourceMappingURL=IconBackHand.js.map
