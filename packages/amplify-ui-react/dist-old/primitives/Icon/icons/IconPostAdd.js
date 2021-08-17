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
exports.IconPostAdd = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconPostAdd = function (props) {
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
                          d: 'M14,15H5V6h6V5H5C4.45,5,4,5.45,4,6V15c0,0.55,0.45,1,1,1H14c0.55,0,1-0.45,1-1V9h-1V15z',
                        },
                        void 0
                      ),
                      jsx_runtime_1.jsx(
                        'polygon',
                        { points: '7,8 7,9 11,9 12,9 12,8' },
                        void 0
                      ),
                      jsx_runtime_1.jsx(
                        'rect',
                        { height: '1', width: '5', x: '7', y: '10' },
                        void 0
                      ),
                      jsx_runtime_1.jsx(
                        'rect',
                        { height: '1', width: '5', x: '7', y: '12' },
                        void 0
                      ),
                      jsx_runtime_1.jsx(
                        'polygon',
                        {
                          points:
                            '15,3 14,3 14,5 14,5 12,5 12,6 14,6 14,8 15,8 15,6 15,6 17,6 17,5 15,5',
                        },
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
exports.IconPostAdd = IconPostAdd;
//# sourceMappingURL=IconPostAdd.js.map
