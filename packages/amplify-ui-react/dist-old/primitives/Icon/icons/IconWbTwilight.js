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
exports.IconWbTwilight = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconWbTwilight = function (props) {
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
                      'rect',
                      { height: '1.5', width: '16', x: '2', y: '14.5' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '2.5', width: '1.5', x: '9.25', y: '3' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      {
                        height: '1.5',
                        transform:
                          'matrix(0.7071 -0.7071 0.7071 0.7071 -0.1972 12.8523)',
                        width: '2.5',
                        x: '14.16',
                        y: '5.91',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      {
                        height: '2.5',
                        transform:
                          'matrix(0.7071 -0.7071 0.7071 0.7071 -3.3852 5.1557)',
                        width: '1.5',
                        x: '3.78',
                        y: '5.41',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M10,7c-3.31,0-6,2.69-6,6h12C16,9.69,13.31,7,10,7z',
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
exports.IconWbTwilight = IconWbTwilight;
//# sourceMappingURL=IconWbTwilight.js.map
