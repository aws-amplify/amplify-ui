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
exports.IconSportsHandball = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconSportsHandball = function (props) {
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
                        d: 'M13.23,8.6l-3.46-2c-1.43-0.83-1.93-2.67-1.1-4.1l0.5-0.87L8.3,1.14L7.8,2C6.7,3.92,7.35,6.36,9.27,7.47l-4.5,7.79 l0.87,0.5l1.5-2.6l1.73,1l-3,5.2l0.87,0.5l6-10.39c1.43,0.83,1.93,2.67,1.1,4.1l-0.5,0.87l0.87,0.5l0.5-0.87 C15.8,12.15,15.14,9.71,13.23,8.6z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'circle',
                      { cx: '11', cy: '2', r: '1' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'circle',
                      { cx: '12.5', cy: '5.5', r: '1.5' },
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
exports.IconSportsHandball = IconSportsHandball;
//# sourceMappingURL=IconSportsHandball.js.map
