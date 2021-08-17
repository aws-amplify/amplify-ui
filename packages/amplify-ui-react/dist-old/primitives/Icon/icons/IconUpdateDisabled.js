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
exports.IconUpdateDisabled = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconUpdateDisabled = function (props) {
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
              d: 'M10.75,6v2.63l-1.5-1.5V6H10.75z M7.32,5.2C8.11,4.75,9.03,4.5,10,4.5c1.64,0,3.11,0.74,4.12,1.88L12.5,8H17V3.5l-1.82,1.82 C13.9,3.9,12.06,3,10,3C8.61,3,7.31,3.41,6.23,4.1L7.32,5.2z M15.9,13.77c0.7-1.09,1.1-2.38,1.1-3.77h-1.5 c0,0.97-0.25,1.89-0.7,2.68L15.9,13.77z M17.07,17.07l-1.06,1.06l-2.24-2.24C12.69,16.59,11.39,17,10,17c-3.87,0-7-3.13-7-7 c0-1.39,0.41-2.69,1.1-3.77L1.87,3.99l1.06-1.06L17.07,17.07z M12.68,14.8L5.2,7.32C4.75,8.11,4.5,9.03,4.5,10 c0,3.03,2.47,5.5,5.5,5.5C10.97,15.5,11.89,15.25,12.68,14.8z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconUpdateDisabled = IconUpdateDisabled;
//# sourceMappingURL=IconUpdateDisabled.js.map
