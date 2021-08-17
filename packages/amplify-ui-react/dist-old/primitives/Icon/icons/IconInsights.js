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
exports.IconInsights = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconInsights = function (props) {
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
                      'polygon',
                      {
                        points:
                          '12.5,8 13.29,6.28 15,5.5 13.29,4.72 12.5,3 11.74,4.72 10,5.5 11.74,6.28',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'polygon',
                      {
                        points:
                          '4,10 4.4,8.4 6,8 4.4,7.6 4,6 3.6,7.6 2,8 3.6,8.4',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M16.5,6c-1.07,0-1.84,1.12-1.35,2.14l-3.01,3.01c-0.52-0.25-0.99-0.14-1.29,0l-1.01-1.01C9.94,9.95,10,9.73,10,9.5 C10,8.67,9.33,8,8.5,8S7,8.67,7,9.5c0,0.23,0.06,0.45,0.15,0.64l-3.01,3.01C3.95,13.06,3.73,13,3.5,13C2.67,13,2,13.67,2,14.5 S2.67,16,3.5,16S5,15.33,5,14.5c0-0.23-0.06-0.45-0.15-0.64l3.01-3.01c0.52,0.25,0.99,0.14,1.29,0l1.01,1.01 C10.06,12.05,10,12.27,10,12.5c0,0.83,0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5c0-0.23-0.06-0.45-0.15-0.64l3.01-3.01 C16.89,9.35,18,8.56,18,7.5C18,6.67,17.33,6,16.5,6z',
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
exports.IconInsights = IconInsights;
//# sourceMappingURL=IconInsights.js.map
