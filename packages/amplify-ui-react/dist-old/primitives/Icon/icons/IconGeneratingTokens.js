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
exports.IconGeneratingTokens = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconGeneratingTokens = function (props) {
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
              d: 'M15.06,4.94L13,4l2.06-0.94L16,1l0.94,2.06L19,4l-2.06,0.94L16,7L15.06,4.94z M16,19l0.94-2.06L19,16l-2.06-0.94L16,13 l-0.94,2.06L13,16l2.06,0.94L16,19z M7.5,3.5c3.59,0,6.5,2.91,6.5,6.5s-2.91,6.5-6.5,6.5S1,13.59,1,10S3.91,3.5,7.5,3.5L7.5,3.5z M10,7.5H5v1.25h1.75V13h1.5V8.75H10V7.5z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconGeneratingTokens = IconGeneratingTokens;
//# sourceMappingURL=IconGeneratingTokens.js.map
