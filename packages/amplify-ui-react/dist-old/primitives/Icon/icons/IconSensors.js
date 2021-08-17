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
exports.IconSensors = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconSensors = function (props) {
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
              d: 'M5.41,14.59l-1.06,1.06C2.9,14.21,2,12.21,2,10c0-2.21,0.9-4.21,2.34-5.66l1.06,1.06C4.23,6.58,3.5,8.21,3.5,10 S4.23,13.42,5.41,14.59z M16.5,10c0,1.79-0.73,3.42-1.91,4.59l1.06,1.06C17.1,14.21,18,12.21,18,10c0-2.21-0.9-4.21-2.34-5.66 l-1.06,1.06C15.77,6.58,16.5,8.21,16.5,10z M13.5,10c0,0.96-0.39,1.84-1.03,2.47l1.06,1.06C14.44,12.63,15,11.38,15,10 c0-1.38-0.56-2.63-1.46-3.54l-1.06,1.06C13.11,8.16,13.5,9.04,13.5,10z M6.5,10c0-0.96,0.39-1.84,1.03-2.47L6.46,6.46 C5.56,7.37,5,8.62,5,10c0,1.38,0.56,2.63,1.46,3.54l1.06-1.06C6.89,11.84,6.5,10.96,6.5,10z M10,8.25c-0.97,0-1.75,0.78-1.75,1.75 s0.78,1.75,1.75,1.75s1.75-0.78,1.75-1.75S10.97,8.25,10,8.25z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconSensors = IconSensors;
//# sourceMappingURL=IconSensors.js.map
