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
exports.IconFontDownloadOff = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconFontDownloadOff = function (props) {
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
              d: 'M10.61,8.49l-0.57-1.63H9.95L9.7,7.58L10.61,8.49z M8.56,6.44L9.1,5h1.79l2.27,6.04L18,15.88V3.5C18,2.67,17.33,2,16.5,2 H4.12L8.56,6.44z M2.22,2.22L1.16,3.28L2,4.12V16.5C2,17.33,2.67,18,3.5,18h12.38l0.84,0.84l1.06-1.06L2.22,2.22z M7.99,12.44 L7.08,15H5.35L7.4,9.52l2.92,2.92H7.99z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconFontDownloadOff = IconFontDownloadOff;
//# sourceMappingURL=IconFontDownloadOff.js.map
