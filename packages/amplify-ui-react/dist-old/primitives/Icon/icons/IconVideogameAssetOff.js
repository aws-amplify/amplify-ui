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
exports.IconVideogameAssetOff = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconVideogameAssetOff = function (props) {
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
            'rect',
            { fill: 'none', height: '20', width: '20', y: '0' },
            void 0
          ),
          jsx_runtime_1.jsx(
            'path',
            {
              d: 'M17.02,14.9c0.57-0.22,0.98-0.79,0.98-1.46V6.56C18,5.7,17.33,5,16.5,5H7.12L17.02,14.9z M14.5,7.75 c0.69,0,1.25,0.56,1.25,1.25s-0.56,1.25-1.25,1.25S13.25,9.69,13.25,9S13.81,7.75,14.5,7.75z M17.07,17.07L2.93,2.93L1.87,3.99 L2.98,5.1C2.41,5.32,2,5.89,2,6.56v6.88C2,14.3,2.67,15,3.5,15h9.38l3.13,3.13L17.07,17.07z M7.55,10.75v1.75h-1.5v-1.75H4.3v-1.5 h1.75V8.17l2.58,2.58H7.55z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconVideogameAssetOff = IconVideogameAssetOff;
//# sourceMappingURL=IconVideogameAssetOff.js.map
