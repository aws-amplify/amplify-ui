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
exports.IconCancelScheduleSend = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconCancelScheduleSend = function (props) {
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
            'rect',
            { fill: 'none', height: '20', width: '20', x: '0', y: '0' },
            void 0
          ),
          jsx_runtime_1.jsxs(
            'g',
            {
              children: [
                jsx_runtime_1.jsx(
                  'path',
                  {
                    d: 'M2,12.31l6.91-1.48c-0.38,0.6-0.65,1.27-0.79,1.99l-0.51,0.2L2,15.47V12.31z M2,7.69V4.53l9.35,4.09 c-0.44,0.22-0.86,0.49-1.23,0.81L2,7.69z',
                  },
                  void 0
                ),
                jsx_runtime_1.jsx(
                  'path',
                  {
                    d: 'M3,6.06l3.7,1.62L3,6.88V6.06 M6.7,12.32L3,13.94v-0.83L6.7,12.32 M1,3v5.5L8,10l-7,1.5V17l7-3.06c0,0.02,0,0.04,0,0.06 c0,3.31,2.69,6,6,6s6-2.69,6-6s-2.69-6-6-6c-0.43,0-0.85,0.05-1.26,0.14L1,3L1,3z M14,19c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5 S16.76,19,14,19L14,19z',
                  },
                  void 0
                ),
              ],
            },
            void 0
          ),
          jsx_runtime_1.jsx(
            'polygon',
            {
              points:
                '15.41,11.88 14,13.29 12.59,11.88 11.88,12.59 13.29,14 11.88,15.41 12.59,16.12 14,14.71 15.41,16.12 16.12,15.41 14.71,14 16.12,12.59',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconCancelScheduleSend = IconCancelScheduleSend;
//# sourceMappingURL=IconCancelScheduleSend.js.map
