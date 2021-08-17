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
exports.IconSearchOff = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconSearchOff = function (props) {
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
                      'path',
                      {
                        d: 'M12,11.29c0.62-0.77,1-1.73,1-2.79C13,6.01,10.99,4,8.5,4C6.19,4,4.3,5.75,4.05,8h1C5.29,6.31,6.74,5,8.5,5 C10.43,5,12,6.57,12,8.5S10.43,12,8.5,12c-0.17,0-0.34-0.03-0.5-0.05v1C8.17,12.97,8.33,13,8.5,13c1.06,0,2.02-0.38,2.79-1 l3.57,3.57l0.71-0.71L12,11.29z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'polygon',
                      {
                        points:
                          '5.91,9.38 4.5,10.79 3.09,9.38 2.38,10.09 3.79,11.5 2.38,12.91 3.09,13.62 4.5,12.21 5.91,13.62 6.62,12.91 5.21,11.5 6.62,10.09',
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
exports.IconSearchOff = IconSearchOff;
//# sourceMappingURL=IconSearchOff.js.map
