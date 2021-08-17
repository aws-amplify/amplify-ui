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
exports.IconContentPasteOff = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconContentPasteOff = function (props) {
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
              d: 'M17.07,17.07L2.93,2.93L1.87,3.99L3,5.12V15.5C3,16.33,3.67,17,4.5,17h10.38l1.13,1.13L17.07,17.07z M4.5,15.5V6.62 l8.88,8.88H4.5z M14,7V4.5h1.5v8.88l1.5,1.5V4.5C17,3.67,16.33,3,15.5,3h-3.57c-0.22-0.86-1-1.5-1.93-1.5C9.07,1.5,8.29,2.14,8.07,3 H5.12l4,4H14z M10,3c0.41,0,0.75,0.34,0.75,0.75c0,0.41-0.34,0.75-0.75,0.75S9.25,4.16,9.25,3.75C9.25,3.34,9.59,3,10,3z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconContentPasteOff = IconContentPasteOff;
//# sourceMappingURL=IconContentPasteOff.js.map
