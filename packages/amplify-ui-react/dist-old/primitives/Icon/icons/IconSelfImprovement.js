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
exports.IconSelfImprovement = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconSelfImprovement = function (props) {
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
                      'circle',
                      { cx: '10', cy: '5.5', r: '1.5' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M16,12v-1c-1.67,0-3.28-0.85-4.11-2.16C11.55,8.29,10.91,8,10.27,8H9.73C9.09,8,8.45,8.29,8.11,8.84 C7.28,10.15,5.67,11,4,11v1c2,0,3.51-0.75,4.5-1.96v2.45l-2.77,1.19C5.29,13.88,5,14.31,5,14.79C5,15.46,5.54,16,6.21,16H8 c0,0,0-0.11,0-0.25C8,14.79,8.79,14,9.75,14h2c0.14,0,0.25,0.11,0.25,0.25s-0.11,0.25-0.25,0.25h-2c-0.69,0-1.25,0.56-1.25,1.25 c0,0.05,0,0.25,0,0.25h5.29c0.67,0,1.21-0.54,1.21-1.21c0-0.48-0.29-0.92-0.73-1.11L11.5,12.5v-2.45C12.49,11.25,14,12,16,12z',
                      },
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
exports.IconSelfImprovement = IconSelfImprovement;
//# sourceMappingURL=IconSelfImprovement.js.map
