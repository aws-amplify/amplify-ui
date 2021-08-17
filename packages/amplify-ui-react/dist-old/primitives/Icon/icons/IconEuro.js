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
exports.IconEuro = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconEuro = function (props) {
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
                { fill: 'none', height: '20', width: '20', x: '0' },
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
                jsx_runtime_1.jsx(
                  'path',
                  {
                    d: 'M12,15c-1.63,0-3.06-0.79-3.98-2H12l1-2H7.1C7.04,10.68,7,10.34,7,10s0.04-0.68,0.1-1H12l1-2H8.02C8.94,5.79,10.37,5,12,5 c1.38,0,2.63,0.56,3.54,1.46l1.41-1.41C15.68,3.78,13.93,3,12,3C9.21,3,6.81,4.64,5.68,7H3L2,9h3.08C5.03,9.33,5,9.66,5,10 s0.03,0.67,0.08,1H3l-1,2h3.68c1.12,2.36,3.53,4,6.32,4c1.93,0,3.68-0.78,4.95-2.05l-1.41-1.41C14.63,14.44,13.38,15,12,15z',
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
exports.IconEuro = IconEuro;
//# sourceMappingURL=IconEuro.js.map
