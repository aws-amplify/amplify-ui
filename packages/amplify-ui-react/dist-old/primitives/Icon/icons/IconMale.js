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
exports.IconMale = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconMale = function (props) {
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
              d: 'M16,4h-4.5v1.5h1.94l-2.76,2.76C9.99,7.78,9.15,7.5,8.25,7.5C5.9,7.5,4,9.4,4,11.75C4,14.1,5.9,16,8.25,16 s4.25-1.9,4.25-4.25c0-0.9-0.28-1.74-0.76-2.43l2.76-2.76V8.5H16V4z M8.25,14.5c-1.52,0-2.75-1.23-2.75-2.75S6.73,9,8.25,9 S11,10.23,11,11.75S9.77,14.5,8.25,14.5z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconMale = IconMale;
//# sourceMappingURL=IconMale.js.map
