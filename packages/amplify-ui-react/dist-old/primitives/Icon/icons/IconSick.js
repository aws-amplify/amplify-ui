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
exports.IconSick = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconSick = function (props) {
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
        'enable-background': 'new 0 0 24 24',
        'data-size': size,
        'aria-label': ariaLabel,
        fill: fill,
      },
      rest,
      { viewBox: '0 0 24 24', className: 'amplify-icon' },
      {
        children: [
          jsx_runtime_1.jsx(
            'rect',
            { fill: 'none', height: '24', width: '24' },
            void 0
          ),
          jsx_runtime_1.jsx(
            'path',
            {
              d: 'M21,9c-1.1,0-2-0.9-2-2c0-1.1,2-4,2-4s2,2.9,2,4C23,8.1,22.1,9,21,9z M17.5,7c0-0.73,0.41-1.71,0.92-2.66 C16.68,2.88,14.44,2,11.99,2C6.47,2,2,6.48,2,12c0,5.52,4.47,10,9.99,10C17.52,22,22,17.52,22,12c0-0.55-0.06-1.09-0.14-1.62 C21.58,10.45,21.3,10.5,21,10.5C19.07,10.5,17.5,8.93,17.5,7z M15.62,7.38l1.06,1.06L15.62,9.5l1.06,1.06l-1.06,1.06L13.5,9.5 L15.62,7.38z M7.32,8.44l1.06-1.06L10.5,9.5l-2.12,2.12l-1.06-1.06L8.38,9.5L7.32,8.44z M15.44,17c-0.69-1.19-1.97-2-3.44-2 s-2.75,0.81-3.44,2H6.88c0.3-0.76,0.76-1.43,1.34-1.99L5.24,13.3c-0.45,0.26-1.01,0.28-1.49,0c-0.72-0.41-0.96-1.33-0.55-2.05 c0.41-0.72,1.33-0.96,2.05-0.55c0.48,0.28,0.74,0.78,0.74,1.29l3.58,2.07c0.73-0.36,1.55-0.56,2.43-0.56c2.33,0,4.32,1.45,5.12,3.5 H15.44z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconSick = IconSick;
//# sourceMappingURL=IconSick.js.map
