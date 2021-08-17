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
exports.IconPolicy = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconPolicy = function (props) {
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
                jsx_runtime_1.jsx('g', {}, void 0),
                jsx_runtime_1.jsxs(
                  'g',
                  {
                    children: [
                      jsx_runtime_1.jsx(
                        'path',
                        {
                          d: 'M10,13c-1.66,0-3-1.34-3-3s1.34-3,3-3s3,1.34,3,3c0,0.65-0.21,1.24-0.56,1.73l2.1,2.1C15.46,12.52,16,10.94,16,9.31V5 l-6-2L4,5v4.31c0,3.55,2.56,6.88,6,7.69c1.53-0.36,2.89-1.22,3.92-2.37l-2.19-2.19C11.24,12.79,10.65,13,10,13z',
                        },
                        void 0
                      ),
                      jsx_runtime_1.jsx(
                        'circle',
                        { cx: '10', cy: '10', r: '2' },
                        void 0
                      ),
                    ],
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
exports.IconPolicy = IconPolicy;
//# sourceMappingURL=IconPolicy.js.map
