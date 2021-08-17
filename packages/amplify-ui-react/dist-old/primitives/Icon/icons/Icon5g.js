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
exports.Icon5g = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var Icon5g = function (props) {
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
          jsx_runtime_1.jsxs(
            'g',
            {
              children: [
                jsx_runtime_1.jsx(
                  'g',
                  {
                    children: jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M12,10.5h2V12h-3V8h4c0-0.55-0.45-1-1-1h-3c-0.55,0-1,0.45-1,1v4c0,0.55,0.45,1,1,1h3c0.55,0,1-0.45,1-1V9.5h-3V10.5z',
                      },
                      void 0
                    ),
                  },
                  void 0
                ),
                jsx_runtime_1.jsx(
                  'g',
                  {
                    children: jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M9,8H6v1.5h2c0.55,0,1,0.45,1,1V12c0,0.55-0.45,1-1,1H5v-1h3v-1.5H5V7h4V8z',
                      },
                      void 0
                    ),
                  },
                  void 0
                ),
              ],
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.Icon5g = Icon5g;
//# sourceMappingURL=Icon5g.js.map
