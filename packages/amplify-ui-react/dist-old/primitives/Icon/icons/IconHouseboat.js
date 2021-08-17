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
exports.IconHouseboat = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconHouseboat = function (props) {
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
              d: 'M18,14.5V16c-1.58,0-1.72-1-2.66-1c-0.95,0-1.08,1-2.67,1c-1.58,0-1.72-1-2.67-1c-0.95,0-1.08,1-2.67,1 c-1.59,0-1.72-1-2.67-1C3.72,15,3.58,16,2,16v-1.5c0.95,0,1.08-1,2.67-1c1.58,0,1.72,1,2.67,1c0.95,0,1.08-1,2.67-1 c1.58,0,1.72,1,2.67,1c0.95,0,1.08-1,2.67-1C16.92,13.5,17.05,14.5,18,14.5z M16.74,9.64l-1.07,1.07C15.49,10.89,15.23,11,14.97,11 L14,11V8.09l1.11,0.82L16,7.7l-6-4.4L4,7.7l0.89,1.21L6,8.09V11l-0.97,0c-0.27,0-0.52-0.11-0.71-0.29L3.26,9.64L2.2,10.7l1.07,1.07 c0.47,0.47,1.1,0.73,1.77,0.73h9.93c0.66,0,1.3-0.26,1.77-0.73l1.07-1.07L16.74,9.64z M10.75,11h-1.5V9h1.5V11z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconHouseboat = IconHouseboat;
//# sourceMappingURL=IconHouseboat.js.map
