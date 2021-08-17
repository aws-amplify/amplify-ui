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
exports.IconTungsten = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconTungsten = function (props) {
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
        'enable-background': 'new 0 0 24 24',
        'data-size': size,
        'aria-label': ariaLabel,
        fill: fill,
      },
      rest,
      { viewBox: '0 0 24 24', className: 'amplify-icon' },
      {
        children: [
          jsx_runtime_1.jsx(
            'g',
            {
              children: jsx_runtime_1.jsx(
                'path',
                { d: 'M0,0h24v24H0V0z', fill: 'none' },
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
                      'rect',
                      { height: '3', width: '2', x: '11', y: '19' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '2', width: '3', x: '2', y: '11' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '2', width: '3', x: '19', y: '11' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      {
                        height: '3',
                        transform:
                          'matrix(0.7071 -0.7071 0.7071 0.7071 -7.6665 17.8014)',
                        width: '1.99',
                        x: '16.66',
                        y: '16.66',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      {
                        height: '1.99',
                        transform:
                          'matrix(0.7071 -0.7071 0.7071 0.7071 -10.9791 9.8041)',
                        width: '3',
                        x: '4.85',
                        y: '17.16',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M15,8.02V3H9v5.02C7.79,8.94,7,10.37,7,12c0,2.76,2.24,5,5,5s5-2.24,5-5C17,10.37,16.21,8.94,15,8.02z M11,5h2v2.1 C12.68,7.04,12.34,7,12,7s-0.68,0.04-1,0.1V5z',
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
exports.IconTungsten = IconTungsten;
//# sourceMappingURL=IconTungsten.js.map
