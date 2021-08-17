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
exports.IconNightsStay = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconNightsStay = function (props) {
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
              children: jsx_runtime_1.jsxs(
                'g',
                {
                  children: [
                    jsx_runtime_1.jsx(
                      'g',
                      {
                        children: jsx_runtime_1.jsx(
                          'path',
                          {
                            d: 'M9.38,10.05C7.75,6.89,9.03,4.11,9.76,3C6,3.13,3,6.21,3,9.99c0,0.4,0.04,0.78,0.1,1.16C3.39,11.06,3.69,11,4,11 c0.86,0,1.68,0.38,2.24,1.01C7.51,12.13,8.5,13.2,8.5,14.5c0,0.83-0.41,1.56-1.04,2.02C8.25,16.82,9.11,17,10.01,17 c2.45,0,4.6-1.26,5.86-3.17C14.21,13.99,10.98,13.16,9.38,10.05z',
                          },
                          void 0
                        ),
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M6,13l-0.27,0C5.38,12.4,4.74,12,4,12c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2c0.53,0,1.54,0,2,0c0.83,0,1.5-0.67,1.5-1.5 S6.83,13,6,13z',
                      },
                      void 0
                    ),
                  ],
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
exports.IconNightsStay = IconNightsStay;
//# sourceMappingURL=IconNightsStay.js.map
