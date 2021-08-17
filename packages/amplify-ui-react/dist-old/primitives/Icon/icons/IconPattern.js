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
exports.IconPattern = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconPattern = function (props) {
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
            'g',
            {
              children: jsx_runtime_1.jsx(
                'path',
                { d: 'M0,0h24v24H0V0z', fill: 'none' },
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
                      d: 'M4,6c0-1.1,0.9-2,2-2s2,0.9,2,2S7.1,8,6,8S4,7.1,4,6z M6,14c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S4.9,14,6,14z M12,8 c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S10.9,8,12,8z M18,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S19.1,10,18,10z M17.98,16 c-0.74,0-1.37,0.4-1.72,1h-2.54c-0.34-0.6-0.98-1-1.72-1s-1.37,0.4-1.72,1H8.41l3.07-3.07C11.65,13.97,11.82,14,12,14 c1.1,0,2-0.9,2-2c0-0.18-0.03-0.35-0.07-0.51l3.56-3.56C17.65,7.97,17.82,8,18,8c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2 c0,0.18,0.03,0.35,0.07,0.51l-3.56,3.56C12.35,10.03,12.18,10,12,10c-1.1,0-2,0.9-2,2c0,0.18,0.03,0.35,0.07,0.51l-3.56,3.56 C6.35,16.03,6.18,16,6,16c-1.1,0-2,0.9-2,2s0.9,2,2,2c0.74,0,1.37-0.4,1.72-1h2.57c0.34,0.6,0.98,1,1.72,1s1.37-0.4,1.72-1h2.55 c0.34,0.6,0.98,1,1.72,1c1.1,0,2-0.9,2-2C19.98,16.9,19.08,16,17.98,16z',
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
exports.IconPattern = IconPattern;
//# sourceMappingURL=IconPattern.js.map
