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
exports.IconSportsSoccer = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconSportsSoccer = function (props) {
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
            'g',
            {
              children: jsx_runtime_1.jsx(
                'rect',
                { fill: 'none', height: '20', width: '20' },
                void 0
              ),
            },
            void 0
          ),
          jsx_runtime_1.jsx(
            'g',
            {
              children: jsx_runtime_1.jsx(
                'g',
                {
                  children: jsx_runtime_1.jsx(
                    'path',
                    {
                      d: 'M10,3c-3.87,0-7,3.13-7,7c0,3.87,3.13,7,7,7s7-3.13,7-7C17,6.13,13.87,3,10,3z M10.5,5.45l1.55-1.08 c1.14,0.41,2.11,1.16,2.81,2.12l-0.48,1.67l-0.68,0.23L10.5,6.15V5.45z M13.01,9.13l-1.14,3.37H8.12L6.99,9.13L10,7.02L13.01,9.13 z M7.95,4.37L9.5,5.45v0.7L6.31,8.39L5.63,8.15L5.15,6.49C5.84,5.53,6.82,4.78,7.95,4.37z M6.8,13.55l-1.52,0.13 c-0.79-1-1.26-2.26-1.27-3.63l1.3-0.95L6,9.34l1.19,3.53L6.8,13.55z M11.53,15.8c-0.49,0.13-1,0.2-1.53,0.2s-1.04-0.08-1.53-0.2 l-0.81-1.74l0.32-0.55h4.04l0.32,0.55L11.53,15.8z M14.72,13.69l-1.52-0.13l-0.4-0.68L14,9.34l0.69-0.24l1.3,0.95 C15.98,11.42,15.51,12.68,14.72,13.69z',
                    },
                    void 0
                  ),
                },
                void 0
              ),
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconSportsSoccer = IconSportsSoccer;
//# sourceMappingURL=IconSportsSoccer.js.map
