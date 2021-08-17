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
exports.IconSportsBaseball = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconSportsBaseball = function (props) {
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
                            d: 'M15.22,5.34C13.34,6.06,12,7.87,12,10s1.34,3.94,3.22,4.66C16.32,13.42,17,11.79,17,10C17,8.21,16.32,6.58,15.22,5.34z',
                          },
                          void 0
                        ),
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'g',
                      {
                        children: jsx_runtime_1.jsx(
                          'path',
                          {
                            d: 'M11,10c0-2.39,1.41-4.45,3.43-5.42C13.23,3.59,11.68,3,10,3S6.77,3.59,5.57,4.58C7.59,5.55,9,7.61,9,10 s-1.41,4.45-3.43,5.42C6.77,16.41,8.32,17,10,17s3.23-0.59,4.43-1.58C12.41,14.45,11,12.39,11,10z',
                          },
                          void 0
                        ),
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'g',
                      {
                        children: jsx_runtime_1.jsx(
                          'path',
                          {
                            d: 'M4.78,5.34C3.68,6.58,3,8.21,3,10c0,1.79,0.68,3.42,1.78,4.66C6.66,13.94,8,12.13,8,10S6.66,6.06,4.78,5.34z',
                          },
                          void 0
                        ),
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
exports.IconSportsBaseball = IconSportsBaseball;
//# sourceMappingURL=IconSportsBaseball.js.map
