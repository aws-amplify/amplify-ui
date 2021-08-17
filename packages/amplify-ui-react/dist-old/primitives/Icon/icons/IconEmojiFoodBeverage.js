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
exports.IconEmojiFoodBeverage = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconEmojiFoodBeverage = function (props) {
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
                          d: 'M15,5H7.75v2.17l1.14,0.76C8.96,7.97,9,8.05,9,8.13v2.62C9,10.89,8.89,11,8.75,11h-2.5C6.11,11,6,10.89,6,10.75V8.13 c0-0.08,0.04-0.16,0.11-0.21l1.14-0.76V5H5v7c0,1.1,0.9,2,2,2h5c1.1,0,2-0.9,2-2V9h1c0.55,0,1-0.45,1-1V6C16,5.45,15.55,5,15,5z M15,8h-1V6h1V8z',
                        },
                        void 0
                      ),
                      jsx_runtime_1.jsx(
                        'rect',
                        { height: '1', width: '10', x: '5', y: '15' },
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
exports.IconEmojiFoodBeverage = IconEmojiFoodBeverage;
//# sourceMappingURL=IconEmojiFoodBeverage.js.map
