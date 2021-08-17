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
exports.IconChalet = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconChalet = function (props) {
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
              d: 'M8.27,6.5L2.5,12.27l1.06,1.06l0.88-0.88L4.5,16h3v-4H9v4h3v-3.62l0.94,0.94L14,12.27L8.27,6.5z M18,6.5h-1.39l0.9,0.9 l-0.35,0.35L15.9,6.5H15v0.9l1.25,1.25L15.9,9L15,8.11V9.5h-0.5V8.11L13.6,9l-0.35-0.35L14.5,7.4V6.5h-0.9l-1.25,1.25L12,7.4 l0.9-0.9H11.5V6h1.39L12,5.1l0.35-0.35L13.6,6h0.9V5.1l-1.25-1.25L13.6,3.5l0.9,0.9V3H15v1.39l0.9-0.9l0.35,0.35L15,5.1V6h0.9 l1.25-1.25L17.5,5.1L16.61,6H18V6.5z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconChalet = IconChalet;
//# sourceMappingURL=IconChalet.js.map
