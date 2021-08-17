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
exports.IconAutoGraph = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconAutoGraph = function (props) {
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
              d: 'M11.72,8.28L10,7.5l1.72-0.78L12.5,5l0.78,1.72L15,7.5l-1.72,0.78L12.5,10L11.72,8.28z M3.5,12l0.78-1.72L6,9.5L4.28,8.72 L3.5,7L2.72,8.72L1,9.5l1.72,0.78L3.5,12z M7,8l0.94-2.06L10,5L7.94,4.06L7,2L6.06,4.06L4,5l2.06,0.94L7,8z M17.88,6.5l-5.61,6.31 L9,9.54l-6,6.01l1.06,1.06L9,11.67L12.33,15L19,7.5L17.88,6.5z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconAutoGraph = IconAutoGraph;
//# sourceMappingURL=IconAutoGraph.js.map
