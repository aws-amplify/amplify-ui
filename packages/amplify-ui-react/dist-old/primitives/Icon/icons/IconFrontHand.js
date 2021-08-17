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
exports.IconFrontHand = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconFrontHand = function (props) {
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
              d: 'M10.5,20c-3.87,0-7-3.13-7-7V5c0-0.55,0.45-1,1-1s1,0.45,1,1v5h1V2.25c0-0.55,0.45-1,1-1s1,0.45,1,1V9h1V1 c0-0.55,0.45-1,1-1s1,0.45,1,1v8h1V2.5c0-0.55,0.45-1,1-1s1,0.45,1,1l0,9.04c-1.69,0.24-3,1.7-3,3.46h1c0-1.38,1.12-2.5,2.5-2.5h0.5 v-5c0-0.55,0.45-1,1-1c0.55,0,1,0.45,1,1V13C17.5,16.87,14.37,20,10.5,20z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconFrontHand = IconFrontHand;
//# sourceMappingURL=IconFrontHand.js.map
