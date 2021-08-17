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
exports.IconFreeCancellation = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconFreeCancellation = function (props) {
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
              d: 'M9.21,16.5H4.5V9h11v3.09l1.5-1.5V5.5C17,4.68,16.33,4,15.5,4H14V2h-1.5v2h-5V2H6v2H4.5C3.67,4,3,4.68,3,5.5v11 C3,17.32,3.67,18,4.5,18h6.21L9.21,16.5z M13.33,16.38l3.54-3.54l1.06,1.06l-4.6,4.6l-2.83-2.83l1.06-1.06L13.33,16.38z M8.81,12.25 L10,13.44L8.94,14.5l-1.19-1.19L6.56,14.5L5.5,13.44l1.19-1.19L5.5,11.06L6.56,10l1.19,1.19L8.94,10L10,11.06L8.81,12.25z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconFreeCancellation = IconFreeCancellation;
//# sourceMappingURL=IconFreeCancellation.js.map
