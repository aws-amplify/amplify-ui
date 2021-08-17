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
exports.IconRealEstateAgent = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconRealEstateAgent = function (props) {
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
              d: 'M11.5,1.5L6,5.5v2h1.5l6.34,2.26c1,0.35,1.66,1.3,1.66,2.36v0.39H17v-7L11.5,1.5z M11.12,8.25h-0.75V7.5h0.75V8.25z M11.12,6.75h-0.75V6h0.75V6.75z M12.62,8.25h-0.75V7.5h0.75V8.25z M12.62,6.75h-0.75V6h0.75V6.75z M1,18h3V9H1V18z M10.5,14 l-1.53-0.51l0.36-1.01L10.5,13h2.62c0.49,0,0.88-0.39,0.88-0.88v0c0-0.37-0.23-0.7-0.58-0.83L7,9H5.5v7.36l6,1.64l6.5-2.5v0 c0-0.83-0.67-1.5-1.5-1.5H10.5z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconRealEstateAgent = IconRealEstateAgent;
//# sourceMappingURL=IconRealEstateAgent.js.map
