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
exports.IconBiotech = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconBiotech = function (props) {
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
                        d: 'M6,15c-0.55,0-1,0.45-1,1h10c0-0.55-0.45-1-1-1h-4v-2h3c0.55,0,1-0.45,1-1H8.47v0C7.11,11.98,6,10.87,6,9.5 c0-0.93,0.51-1.73,1.26-2.16C7.1,7.1,7,6.81,7,6.5c0-0.05,0.01-0.11,0.02-0.16C5.83,6.9,5,8.1,5,9.5c0,1.76,1.31,3.2,3,3.45V15H6z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M8.15,5.04C8.26,5.02,8.38,5,8.5,5C9.33,5,10,5.67,10,6.5c0,0.59-0.34,1.09-0.83,1.34l0.59,1.62l0.94-0.34l0.32,0.88 l0.94-0.34l-0.32-0.88l0.94-0.34l-1.84-5.06L9.8,3.71L9.47,2.83L8.53,3.17l0.32,0.88L7.92,4.39L8.15,5.04z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'circle',
                      { cx: '8.5', cy: '6.5', r: '.75' },
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
exports.IconBiotech = IconBiotech;
//# sourceMappingURL=IconBiotech.js.map
