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
exports.IconParagliding = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconParagliding = function (props) {
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
              d: 'M8.25,12.5c0-0.97,0.78-1.75,1.75-1.75s1.75,0.78,1.75,1.75s-0.78,1.75-1.75,1.75S8.25,13.47,8.25,12.5z M12.5,20v-3.38 c2.05-0.8,3.5-2.79,3.5-5.12h-1.5c0,2.21-1.79,4-4,4h-1c-2.21,0-4-1.79-4-4H4c0,2.33,1.45,4.32,3.5,5.12V20H12.5z M19,3.48v3.04 c0,0.66-0.72,1.03-1.27,0.68c-0.07-0.05-0.15-0.09-0.23-0.14L16,10.5h-1.5L13,5.7c-0.94-0.13-1.95-0.2-3-0.2S7.94,5.57,7,5.7 l-1.5,4.8H4L2.5,7.05C2.42,7.1,2.35,7.15,2.27,7.19C1.72,7.55,1,7.17,1,6.52V3.48C1,1.56,5.03,0,10,0S19,1.56,19,3.48z M5.84,5.89 C4.92,6.08,4.1,6.32,3.4,6.61l1.32,3.03L5.84,5.89z M16.6,6.61c-0.7-0.29-1.52-0.54-2.44-0.72l1.13,3.75L16.6,6.61z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconParagliding = IconParagliding;
//# sourceMappingURL=IconParagliding.js.map
