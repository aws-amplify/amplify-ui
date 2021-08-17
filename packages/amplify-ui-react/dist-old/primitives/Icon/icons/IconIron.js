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
exports.IconIron = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconIron = function (props) {
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
              d: 'M17,5.5c-1.1,0-2,0.9-2,2V11c0,0.28-0.22,0.5-0.5,0.5H14V8c0-1.1-0.9-2-2-2H8C6.9,6,6,6.9,6,8h1.5c0-0.28,0.22-0.5,0.5-0.5 h4c0.28,0,0.5,0.22,0.5,0.5v1H5c-1.66,0-3,1.34-3,3v2.5h12V13h0.5c1.1,0,2-0.9,2-2V7.5C16.5,7.22,16.72,7,17,7h1V5.5H17z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconIron = IconIron;
//# sourceMappingURL=IconIron.js.map
