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
exports.IconSupportAgent = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconSupportAgent = function (props) {
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
                        d: 'M10,6C9.32,6,6.12,6.51,6.01,9.88c1.72-0.4,3.06-1.77,3.4-3.51c0.53,1.15,1.96,2.8,4.43,2.6C13.39,7.26,11.85,6,10,6z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'circle',
                      { cx: '7.5', cy: '10.75', r: '.75' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'circle',
                      { cx: '12.5', cy: '10.75', r: '.75' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M16,10c0-3.31-2.69-6-6-6s-6,2.69-6,6c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1h1v-4c0-2.76,2.24-5,5-5s5,2.24,5,5v5H9v1h6 c0.55,0,1-0.45,1-1v-1c0.55,0,1-0.45,1-1v-2C17,10.45,16.55,10,16,10z',
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
exports.IconSupportAgent = IconSupportAgent;
//# sourceMappingURL=IconSupportAgent.js.map
