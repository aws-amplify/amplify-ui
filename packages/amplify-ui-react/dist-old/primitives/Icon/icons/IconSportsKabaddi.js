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
exports.IconSportsKabaddi = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconSportsKabaddi = function (props) {
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
                      { cx: '13.5', cy: '2.5', r: '1.5' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M12,10.34c-0.81-0.06-1.53-0.32-2.17-0.78l0,0C9.6,9.4,9.38,9.22,9.17,9.01L7.29,7.12c-0.39-0.39-1.02-0.39-1.41,0 L3.07,9.91c-0.22,0.22-0.32,0.52-0.29,0.82l0.42,3.75l-2.75,2.75l0.71,0.71l3.25-3.25l0.04-2L6,14.03L6,18h1v-4.69l-1.96-2.05 l2.51-2.51l0.9,0.9c1.02,1.02,2.13,1.62,3.56,1.69V10.34z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M9.5,6.99c0.82,0,1.5-0.68,1.5-1.5c0-0.77-0.59-1.38-1.34-1.47C9.61,4.01,9.56,3.99,9.5,3.99C8.68,3.99,8,4.66,8,5.49 C8,5.67,8.05,5.84,8.11,6C8.32,6.57,8.86,6.99,9.5,6.99z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M19,9.53V6.18l-3.85-1.53c-0.18-0.08-0.37-0.11-0.56-0.11c-0.5,0-0.96,0.25-1.23,0.68l-0.82,1.32 C12,7.46,11.11,8.15,10.08,8.47c0.24,0.21,0.48,0.39,0.74,0.53c0.06,0.03,0.15,0.08,0.26,0.15c0.73-0.34,1.38-0.82,1.91-1.42 l0.44-0.51l0.67,3.33L12,12.24V18h1v-4.8l2.59-2.16L17.16,18h1.08L15.87,6.09L18,6.81v2.72H19z',
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
exports.IconSportsKabaddi = IconSportsKabaddi;
//# sourceMappingURL=IconSportsKabaddi.js.map
