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
exports.IconDocumentScanner = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconDocumentScanner = function (props) {
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
              d: 'M6,2.5H3.5V5H2V1h4V2.5z M16.5,5l0-2.5l-2.5,0L14,1l4,0l0,4L16.5,5z M14,17.5h2.5V15H18v4h-4V17.5z M3.5,15l0,2.5l2.5,0 L6,19l-4,0l0-4L3.5,15z M13.57,4H6.43C5.64,4,5,4.67,5,5.5v9C5,15.33,5.64,16,6.43,16h7.14c0.79,0,1.43-0.67,1.43-1.5v-9 C15,4.67,14.36,4,13.57,4z M12,13H8v-1.5h4V13z M12,10.75H8v-1.5h4V10.75z M12,8.5H8V7h4V8.5z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconDocumentScanner = IconDocumentScanner;
//# sourceMappingURL=IconDocumentScanner.js.map
