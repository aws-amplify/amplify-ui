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
exports.IconViewStream = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconViewStream = function (props) {
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
              d: 'M4.5,5h11C16.33,5,17,5.6,17,6.34v1.57c0,0.74-0.67,1.34-1.5,1.34h-11C3.67,9.25,3,8.65,3,7.91V6.34C3,5.6,3.67,5,4.5,5z M4.5,15h11c0.83,0,1.5-0.6,1.5-1.34v-1.57c0-0.74-0.67-1.34-1.5-1.34h-11c-0.83,0-1.5,0.6-1.5,1.34v1.57C3,14.4,3.67,15,4.5,15z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconViewStream = IconViewStream;
//# sourceMappingURL=IconViewStream.js.map
