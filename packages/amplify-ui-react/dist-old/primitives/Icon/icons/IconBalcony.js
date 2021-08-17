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
exports.IconBalcony = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconBalcony = function (props) {
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
              d: 'M8.5,8.5V10H7V8.5H8.5z M13,10V8.5h-1.5V10H13z M17,12v6H3v-6h1V8c0-3.31,2.69-6,6-6s6,2.69,6,6v4H17z M6.12,13.5H4.5v3 h1.62V13.5z M9.25,13.5H7.62v3h1.62V13.5z M9.25,12l0-8.44C7.12,3.92,5.5,5.77,5.5,8v4H9.25z M10.75,12h3.75V8 c0-2.23-1.62-4.08-3.75-4.44V12z M12.38,13.5h-1.62v3h1.62V13.5z M15.5,13.5h-1.62v3h1.62V13.5z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconBalcony = IconBalcony;
//# sourceMappingURL=IconBalcony.js.map
