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
exports.IconFlourescent = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconFlourescent = function (props) {
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
                      { height: '6', width: '14', x: '5', y: '9' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '3', width: '2', x: '11', y: '2' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      {
                        height: '2',
                        transform:
                          'matrix(0.7046 -0.7096 0.7096 0.7046 1.1814 15.2381)',
                        width: '2.54',
                        x: '17.62',
                        y: '5.2',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '3', width: '2', x: '11', y: '19' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'polygon',
                      {
                        points: '17.29,17.71 19.08,19.51 20.5,18.09 18.7,16.3',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      {
                        height: '2.53',
                        transform:
                          'matrix(0.7071 -0.7071 0.7071 0.7071 -2.8904 5.4222)',
                        width: '1.99',
                        x: '4.1',
                        y: '4.93',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      {
                        height: '2',
                        transform:
                          'matrix(0.7096 -0.7046 0.7046 0.7096 -11.1263 8.7897)',
                        width: '2.54',
                        x: '3.83',
                        y: '16.89',
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
exports.IconFlourescent = IconFlourescent;
//# sourceMappingURL=IconFlourescent.js.map
