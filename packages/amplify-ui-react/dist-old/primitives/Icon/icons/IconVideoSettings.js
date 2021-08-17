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
exports.IconVideoSettings = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconVideoSettings = function (props) {
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
                        d: 'M3,5h14v4h1V5c0-0.55-0.45-1-1-1H3C2.45,4,2,4.45,2,5v10c0,0.55,0.45,1,1,1h8v-1H3V5z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M19.1,14.2l0.87-0.69l-0.88-1.52l-1.03,0.4c-0.16-0.12-0.34-0.22-0.53-0.3L17.38,11h-1.75l-0.16,1.1 c-0.18,0.08-0.36,0.18-0.52,0.3l-1.04-0.41l-0.88,1.52l0.87,0.7c-0.02,0.2-0.03,0.4,0,0.6l-0.87,0.69l0.88,1.52l1.03-0.4 c0.16,0.12,0.34,0.22,0.53,0.3L15.63,18h1.75l0.16-1.1c0.18-0.08,0.36-0.18,0.52-0.3l1.04,0.41l0.88-1.52l-0.87-0.7 C19.12,14.59,19.12,14.4,19.1,14.2z M16.5,15.5c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1c0.55,0,1,0.45,1,1 C17.5,15.05,17.05,15.5,16.5,15.5z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'polygon',
                      { points: '8,13 12.5,10 8,7' },
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
exports.IconVideoSettings = IconVideoSettings;
//# sourceMappingURL=IconVideoSettings.js.map
