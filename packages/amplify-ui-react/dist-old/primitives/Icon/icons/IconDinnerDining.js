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
exports.IconDinnerDining = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconDinnerDining = function (props) {
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
              children: jsx_runtime_1.jsxs(
                'g',
                {
                  children: [
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M5,12.78C4.64,13.11,4.35,13.53,4.18,14H16c0-2.21-1.79-4-4-4c-1.62,0-3,0.96-3.63,2.34C7.96,12.13,7.5,12,7,12 c-0.17,0-0.34,0.02-0.5,0.04V7H8c0.65,0,1.2-0.42,1.41-1H16V5H9.41C9.2,4.42,8.65,4,8,4H4v0.5h1v0.75H4v0.5h1V6.5H4V7h1V12.78z M6,12.18c-0.18,0.06-0.34,0.14-0.5,0.24V7H6V12.18z M8,6.5H6.5V5.75H8V6.5z M8,4.5v0.75H6.5V4.5H8z M5.5,4.5H6v0.75H5.5V4.5z M5.5,5.75H6V6.5H5.5V5.75z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'polygon',
                      { points: '3,15 4,16 16,16 17,15' },
                      void 0
                    ),
                  ],
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
exports.IconDinnerDining = IconDinnerDining;
//# sourceMappingURL=IconDinnerDining.js.map
