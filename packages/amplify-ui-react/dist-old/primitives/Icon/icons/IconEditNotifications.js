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
exports.IconEditNotifications = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconEditNotifications = function (props) {
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
              d: 'M12.53,12H9c0-1.93,0-3.5,0-3.5l3.71-3.71C12.19,4.47,11.62,4.23,11,4.1V3c0-0.55-0.45-1-1-1S9,2.45,9,3v1.1 C6.72,4.56,5,6.58,5,9v5H4v1.5h12V14h-1V9.53L12.53,12z M10,18c0.83,0,1.5-0.67,1.5-1.5h-3C8.5,17.33,9.17,18,10,18z M14.32,5.27 l1.41,1.41l-3.82,3.82H10.5V9.09L14.32,5.27z M14.81,4.77l0.63-0.63c0.2-0.2,0.51-0.2,0.71,0l0.71,0.71c0.2,0.2,0.2,0.51,0,0.71 l-0.63,0.63L14.81,4.77z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconEditNotifications = IconEditNotifications;
//# sourceMappingURL=IconEditNotifications.js.map
