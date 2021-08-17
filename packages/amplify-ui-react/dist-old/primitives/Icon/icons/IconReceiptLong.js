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
exports.IconReceiptLong = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconReceiptLong = function (props) {
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
        'enable-background': 'new 0 0 24 24',
        'data-size': size,
        'aria-label': ariaLabel,
        fill: fill,
      },
      rest,
      { viewBox: '0 0 24 24', className: 'amplify-icon' },
      {
        children: [
          jsx_runtime_1.jsx(
            'path',
            { d: 'M0,0h24v24H0V0z', fill: 'none' },
            void 0
          ),
          jsx_runtime_1.jsxs(
            'g',
            {
              children: [
                jsx_runtime_1.jsx(
                  'path',
                  {
                    d: 'M19.5,3.5L18,2l-1.5,1.5L15,2l-1.5,1.5L12,2l-1.5,1.5L9,2L7.5,3.5L6,2v14H3v3c0,1.66,1.34,3,3,3h12c1.66,0,3-1.34,3-3V2 L19.5,3.5z M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z',
                  },
                  void 0
                ),
                jsx_runtime_1.jsx(
                  'rect',
                  { height: '2', width: '6', x: '9', y: '7' },
                  void 0
                ),
                jsx_runtime_1.jsx(
                  'rect',
                  { height: '2', width: '2', x: '16', y: '7' },
                  void 0
                ),
                jsx_runtime_1.jsx(
                  'rect',
                  { height: '2', width: '6', x: '9', y: '10' },
                  void 0
                ),
                jsx_runtime_1.jsx(
                  'rect',
                  { height: '2', width: '2', x: '16', y: '10' },
                  void 0
                ),
              ],
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconReceiptLong = IconReceiptLong;
//# sourceMappingURL=IconReceiptLong.js.map
