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
exports.IconOtherHouses = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconOtherHouses = function (props) {
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
              d: 'M10,3.5L1.75,9.8l0.91,1.19L4,9.97V17h12V9.97l1.34,1.02l0.91-1.19L10,3.5z M7,12.5c-0.41,0-0.75-0.34-0.75-0.75 C6.25,11.34,6.59,11,7,11s0.75,0.34,0.75,0.75C7.75,12.16,7.41,12.5,7,12.5z M10,12.5c-0.41,0-0.75-0.34-0.75-0.75 C9.25,11.34,9.59,11,10,11s0.75,0.34,0.75,0.75C10.75,12.16,10.41,12.5,10,12.5z M13,12.5c-0.41,0-0.75-0.34-0.75-0.75 c0-0.41,0.34-0.75,0.75-0.75s0.75,0.34,0.75,0.75C13.75,12.16,13.41,12.5,13,12.5z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconOtherHouses = IconOtherHouses;
//# sourceMappingURL=IconOtherHouses.js.map
