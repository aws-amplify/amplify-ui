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
exports.IconNotAccessible = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconNotAccessible = function (props) {
  var size = props.size,
    _a = props.fill,
    fill = _a === void 0 ? 'currentColor' : _a,
    ariaLabel = props.ariaLabel,
    rest = __rest(props, ['size', 'fill', 'ariaLabel']);
  return jsx_runtime_1.jsx(
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
        children: jsx_runtime_1.jsxs(
          'g',
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
                  d: 'M10.95,14h1c-0.24,1.69-1.69,3-3.45,3C6.57,17,5,15.43,5,13.5c0-1.76,1.31-3.21,3-3.45v1c-1.14,0.23-2,1.24-2,2.45 C6,14.88,7.12,16,8.5,16C9.71,16,10.72,15.14,10.95,14z M8.5,4.5C8.5,5.33,9.17,6,10,6s1.5-0.67,1.5-1.5S10.83,3,10,3 S8.5,3.67,8.5,4.5z M11,9.59V8.96l0.47,0.43c0.17,0.16,0.35,0.3,0.53,0.43c0.77,0.57,1.68,0.89,2.66,0.89v-1 c-0.94,0-1.81-0.36-2.49-1.04L12,8.52l-1.15-1.05c0,0-0.49-0.47-0.85-0.47C9.57,7,9.21,7.28,9.07,7.66L11,9.59z M16.36,16.36 L3.64,3.64L2.93,4.34L9,10.41V12c0,0.55,0.45,1,1,1h1.59l4.07,4.07L16.36,16.36z',
                },
                void 0
              ),
            ],
          },
          void 0
        ),
      }
    ),
    void 0
  );
};
exports.IconNotAccessible = IconNotAccessible;
//# sourceMappingURL=IconNotAccessible.js.map
