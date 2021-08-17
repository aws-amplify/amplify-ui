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
exports.IconIceSkating = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconIceSkating = function (props) {
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
              d: 'M17.5,14c0,1.38-1.12,2.5-2.5,2.5h-1.5V15H16v-3c0-1.1-0.72-2.08-1.78-2.4l-3.4-1.03c-0.33-0.1-0.6-0.3-0.79-0.57H7.5 C7.22,8,7,7.77,7,7.5S7.22,7,7.5,7h2.25V6H7.5C7.22,6,7,5.77,7,5.5S7.22,5,7.5,5h2.25V2.5H3V15h2.5v1.5H2V18h13c2.21,0,4-1.79,4-4 H17.5z M12,16.5H7V15h5V16.5z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconIceSkating = IconIceSkating;
//# sourceMappingURL=IconIceSkating.js.map
