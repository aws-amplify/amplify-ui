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
exports.IconAddToDrive = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconAddToDrive = function (props) {
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
              d: 'M13.17,17.5H4.95c-0.54,0-1.03-0.29-1.3-0.75l-1.9-3.31c-0.27-0.46-0.27-1.04,0-1.5L6.8,3.25C7.07,2.78,7.57,2.5,8.1,2.5 h3.8c0.53,0,1.03,0.28,1.3,0.75l3.69,6.34C16.6,9.53,16.3,9.5,16,9.5c-0.29,0-0.58,0.03-0.85,0.08L11.9,4H8.1l-5.05,8.69L4.95,16 h7.02C12.26,16.59,12.66,17.09,13.17,17.5z M19,13.25h-2.25V11h-1.5v2.25H13v1.5h2.25V17h1.5v-2.25H19V13.25z M7.69,12.45L10,8.42 l2.01,3.5c0.25-0.49,0.59-0.92,1-1.28l-2.29-4H9.29l-3.61,6.3l0.57,1h5.25c0.01-0.53,0.1-1.03,0.28-1.5H7.69z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconAddToDrive = IconAddToDrive;
//# sourceMappingURL=IconAddToDrive.js.map
