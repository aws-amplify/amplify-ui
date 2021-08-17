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
exports.IconBakeryDining = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconBakeryDining = function (props) {
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
                        d: 'M3.22,12.34l0.36,0.72c0.14,0.28,0.51,0.37,0.76,0.17L5.9,12l-0.9-1.57c-0.19-0.33-0.66-0.34-0.86-0.02l-0.91,1.44 C3.15,12,3.14,12.18,3.22,12.34z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M4.85,8.75L6.64,12h1.37L7.42,7.51C7.38,7.16,6.99,6.97,6.68,7.14L5.04,8.07C4.8,8.2,4.71,8.51,4.85,8.75z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M16.78,12.34l-0.36,0.72c-0.14,0.28-0.51,0.37-0.76,0.17L14.1,12l0.9-1.57c0.19-0.33,0.66-0.34,0.86-0.02l0.91,1.44 C16.85,12,16.86,12.18,16.78,12.34z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M15.15,8.75L13.36,12h-1.37l0.58-4.49c0.05-0.35,0.43-0.55,0.74-0.37l1.64,0.93C15.2,8.2,15.29,8.51,15.15,8.75z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M8.07,6.56L8.69,12h2.62l0.62-5.44c0.03-0.3-0.2-0.56-0.5-0.56H8.57C8.27,6,8.04,6.26,8.07,6.56z',
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
exports.IconBakeryDining = IconBakeryDining;
//# sourceMappingURL=IconBakeryDining.js.map
