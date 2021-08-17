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
exports.IconSkateboarding = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconSkateboarding = function (props) {
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
            'g',
            {
              children: jsx_runtime_1.jsx(
                'path',
                {
                  d: 'M7.49,19.25c0,0.41-0.34,0.75-0.75,0.75s-0.75-0.34-0.75-0.75s0.34-0.75,0.75-0.75S7.49,18.84,7.49,19.25z M13.26,18.5 c-0.41,0-0.75,0.34-0.75,0.75S12.85,20,13.26,20c0.41,0,0.75-0.34,0.75-0.75S13.67,18.5,13.26,18.5z M12.25,4.5 C13.21,4.5,14,3.72,14,2.75C14,1.78,13.22,1,12.25,1S10.5,1.78,10.5,2.75C10.5,3.72,11.29,4.5,12.25,4.5z M17,16.5 c0,0.12-0.04,0.24-0.13,0.34C16.46,17.29,15.58,18,14.26,18H5.74c-1.25,0-2.13-0.62-2.61-1.16C3.05,16.75,3,16.62,3,16.5 C3,16.24,3.2,16,3.5,16c0.14,0,0.28,0.06,0.38,0.17C4.34,16.68,5,17,5.74,17H6l2-3l-1.23-3.23C6.6,10.33,6.65,9.84,6.9,9.44 L8.73,6.5H6.8L5.27,8.9L4,8l2-3h4.5c0.68,0,1.11,0.43,1.3,0.76l0.75,1.27C13.25,8.21,14.53,9,16,9v1.5c-1.95,0-3.66-1.02-4.64-2.55 L10,10.13l3.5,2.37V17h0.76c0.74,0,1.4-0.32,1.86-0.83c0.1-0.11,0.23-0.17,0.38-0.17C16.8,16,17,16.24,17,16.5z M12,13.4l-3-1.65 l0.7,2.45L7.8,17H12V13.4z',
                },
                void 0
              ),
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconSkateboarding = IconSkateboarding;
//# sourceMappingURL=IconSkateboarding.js.map
