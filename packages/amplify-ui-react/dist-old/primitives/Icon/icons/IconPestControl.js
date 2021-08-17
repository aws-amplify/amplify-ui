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
exports.IconPestControl = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconPestControl = function (props) {
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
                      d: 'M16,12v-1h-2.04c-0.04-0.38-0.11-0.74-0.22-1.08l1.71-0.99l-0.5-0.87L13.33,9c-0.24-0.4-0.54-0.74-0.87-1.03 c0.07-0.39,0.13-1.19-0.48-1.99l1.24-1.24l-0.71-0.71l-1.29,1.29c-0.41-0.23-1.35-0.61-2.43,0L7.49,4.04L6.78,4.74l1.24,1.24 C7.41,6.78,7.47,7.58,7.55,7.97C7.21,8.26,6.91,8.6,6.67,9L5.05,8.07l-0.5,0.87l1.71,0.99c-0.11,0.34-0.18,0.7-0.22,1.08H4v1h2.04 c0.04,0.38,0.11,0.74,0.22,1.08l-1.71,0.99l0.5,0.87L6.67,14c0.72,1.21,1.94,2,3.33,2s2.61-0.8,3.33-2l1.62,0.94l0.5-0.87 l-1.71-0.99c0.11-0.34,0.18-0.7,0.22-1.08H16z M10.5,13.5h-1v-4h1V13.5z',
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
exports.IconPestControl = IconPestControl;
//# sourceMappingURL=IconPestControl.js.map
