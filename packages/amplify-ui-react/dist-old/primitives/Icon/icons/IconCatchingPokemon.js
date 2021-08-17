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
exports.IconCatchingPokemon = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconCatchingPokemon = function (props) {
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
            { fill: 'none', height: '20', width: '20' },
            void 0
          ),
          jsx_runtime_1.jsx(
            'path',
            {
              d: 'M12.25,10c0,1.24-1.01,2.25-2.25,2.25S7.75,11.24,7.75,10S8.76,7.75,10,7.75S12.25,8.76,12.25,10z M18,10c0,4.42-3.58,8-8,8 s-8-3.58-8-8s3.58-8,8-8S18,5.58,18,10z M16.5,10h-3.25c0-1.79-1.46-3.25-3.25-3.25S6.75,8.21,6.75,10H3.5c0,3.58,2.92,6.5,6.5,6.5 S16.5,13.58,16.5,10z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconCatchingPokemon = IconCatchingPokemon;
//# sourceMappingURL=IconCatchingPokemon.js.map
