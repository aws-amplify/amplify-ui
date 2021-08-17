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
exports.IconBathtub = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconBathtub = function (props) {
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
                      'circle',
                      { cx: '6.5', cy: '6.5', r: '1.5' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M16,11V5.12C16,3.95,15.05,3,13.88,3c-0.56,0-1.1,0.22-1.5,0.62l-0.83,0.83c-0.17-0.08-0.37-0.12-0.57-0.12 c-0.28,0-0.54,0.08-0.76,0.23l1.93,1.93c0.14-0.22,0.23-0.48,0.23-0.76c0-0.2-0.05-0.39-0.12-0.57l0.83-0.83 C13.3,4.12,13.58,4,13.88,4C14.5,4,15,4.5,15,5.12V11H9.1c-0.2-0.14-0.38-0.3-0.55-0.48L7.62,9.49C7.49,9.35,7.33,9.23,7.16,9.15 C6.95,9.05,6.72,9,6.49,9C5.67,9,5,9.67,5,10.5V11H3v4c0,0.55,0.45,1,1,1v0.5C4,16.78,4.22,17,4.5,17h11c0.28,0,0.5-0.22,0.5-0.5 V16c0.55,0,1-0.45,1-1v-4H16z',
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
exports.IconBathtub = IconBathtub;
//# sourceMappingURL=IconBathtub.js.map
