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
exports.IconElectricMoped = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconElectricMoped = function (props) {
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
                jsx_runtime_1.jsxs(
                  'g',
                  {
                    children: [
                      jsx_runtime_1.jsx(
                        'path',
                        {
                          d: 'M15,5.5C15,4.67,14.33,4,13.5,4H12v1h1.5C13.78,5,14,5.22,14,5.5v1.29L10.79,10H9V6H6C4.34,6,3,7.34,3,9v2h2 c0,1.1,0.9,2,2,2s2-0.9,2-2h2.21L15,7.21V5.5z M7,12c-0.55,0-1-0.45-1-1h2C8,11.55,7.55,12,7,12z',
                        },
                        void 0
                      ),
                      jsx_runtime_1.jsx(
                        'rect',
                        { height: '1', width: '4', x: '5', y: '4' },
                        void 0
                      ),
                      jsx_runtime_1.jsx(
                        'path',
                        {
                          d: 'M15,9c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2s2-0.9,2-2C17,9.9,16.1,9,15,9z M15,12c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1 s1,0.45,1,1C16,11.55,15.55,12,15,12z',
                        },
                        void 0
                      ),
                    ],
                  },
                  void 0
                ),
                jsx_runtime_1.jsx(
                  'polygon',
                  { points: '7,15 9.5,15 9.5,14 13,16 10.5,16 10.5,17' },
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
exports.IconElectricMoped = IconElectricMoped;
//# sourceMappingURL=IconElectricMoped.js.map
