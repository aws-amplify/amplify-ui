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
exports.IconCreditCardOff = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconCreditCardOff = function (props) {
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
              d: 'M6.12,4H16.5C17.33,4,18,4.67,18,5.5v9c0,0.38-0.15,0.73-0.38,1l-5.5-5.5h4.38V7H9.12L6.12,4z M16.72,18.84L13.88,16H3.5 C2.67,16,2,15.33,2,14.5v-9c0-0.38,0.15-0.73,0.38-1L1.16,3.28l1.06-1.06l15.56,15.56L16.72,18.84z M7.88,10l-3-3H3.5v3H7.88z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconCreditCardOff = IconCreditCardOff;
//# sourceMappingURL=IconCreditCardOff.js.map
