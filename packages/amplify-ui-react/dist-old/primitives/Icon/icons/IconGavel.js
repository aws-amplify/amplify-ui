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
exports.IconGavel = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconGavel = function (props) {
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
                'rect',
                { fill: 'none', height: '24', width: '24', x: '0' },
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
                      {
                        height: '20',
                        transform:
                          'matrix(0.7075 -0.7067 0.7067 0.7075 -5.6854 13.7194)',
                        width: '4',
                        x: '11.73',
                        y: '3.73',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      {
                        height: '8',
                        transform:
                          'matrix(0.707 -0.7072 0.7072 0.707 0.3157 11.246)',
                        width: '4',
                        x: '11.73',
                        y: '1.24',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      {
                        height: '8',
                        transform:
                          'matrix(0.7071 -0.7071 0.7071 0.7071 -8.1722 7.7256)',
                        width: '4',
                        x: '3.24',
                        y: '9.73',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '2', width: '12', x: '1', y: '21' },
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
exports.IconGavel = IconGavel;
//# sourceMappingURL=IconGavel.js.map
