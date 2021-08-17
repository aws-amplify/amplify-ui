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
exports.IconElectricRickshaw = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconElectricRickshaw = function (props) {
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
                  'polygon',
                  { points: '7,16 9.5,16 9.5,15 13,17 10.5,17 10.5,18' },
                  void 0
                ),
                jsx_runtime_1.jsx(
                  'path',
                  {
                    d: 'M17,9.05v-1.7c0-0.23-0.08-0.45-0.22-0.62L13.3,2.38C13.11,2.14,12.82,2,12.52,2H2C1.45,2,1,2.45,1,3v8c0,0.55,0.45,1,1,1 h1.05c0.23,1.14,1.24,2,2.45,2s2.22-0.86,2.45-2h6.1c0.28,1.38,1.69,2.34,3.22,1.89c0.77-0.23,1.39-0.85,1.62-1.62 C19.34,10.74,18.38,9.33,17,9.05z M5.5,13C4.67,13,4,12.33,4,11.5S4.67,10,5.5,10S7,10.67,7,11.5S6.33,13,5.5,13z M7,7H2V3h5V7z M12,11H8V8h2V7H8V3h4V11z M13,7V3.6L15.72,7H13z M16.5,13c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5 S17.33,13,16.5,13z',
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
exports.IconElectricRickshaw = IconElectricRickshaw;
//# sourceMappingURL=IconElectricRickshaw.js.map
