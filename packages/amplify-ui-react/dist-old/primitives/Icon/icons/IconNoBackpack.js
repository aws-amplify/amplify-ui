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
exports.IconNoBackpack = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconNoBackpack = function (props) {
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
            'rect',
            { fill: 'none', height: '24', width: '24', y: '0' },
            void 0
          ),
          jsx_runtime_1.jsx(
            'path',
            {
              d: 'M21.19,21.19L2.81,2.81L1.39,4.22l2.76,2.76C4.06,7.31,4,7.64,4,8v12c0,1.1,0.9,2,2,2h12c0.34,0,0.65-0.09,0.93-0.24 l0.85,0.85L21.19,21.19z M6,14v-2h3.17l2,2H6z M14.83,12L6.98,4.15c0.01,0,0.01-0.01,0.02-0.01V2h3v2h4V2h3v2.14 c1.72,0.45,3,2,3,3.86v9.17l-2-2V12H14.83z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconNoBackpack = IconNoBackpack;
//# sourceMappingURL=IconNoBackpack.js.map
