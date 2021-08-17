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
exports.IconMotionPhotosOn = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconMotionPhotosOn = function (props) {
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
              d: 'M3.5,4.75c0-0.69,0.56-1.25,1.25-1.25S6,4.06,6,4.75S5.44,6,4.75,6S3.5,5.44,3.5,4.75z M10,2C8.83,2,7.72,2.26,6.71,2.71 l1.15,1.15C8.54,3.63,9.25,3.5,10,3.5c3.58,0,6.5,2.92,6.5,6.5s-2.92,6.5-6.5,6.5S3.5,13.58,3.5,10c0-0.75,0.13-1.46,0.37-2.13 L2.71,6.71C2.26,7.72,2,8.83,2,10c0,4.42,3.58,8,8,8s8-3.58,8-8C18,5.58,14.42,2,10,2z M5,10c0-2.76,2.24-5,5-5s5,2.24,5,5 c0,2.76-2.24,5-5,5S5,12.76,5,10z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconMotionPhotosOn = IconMotionPhotosOn;
//# sourceMappingURL=IconMotionPhotosOn.js.map
