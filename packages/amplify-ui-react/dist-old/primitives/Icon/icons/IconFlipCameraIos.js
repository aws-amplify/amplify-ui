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
exports.IconFlipCameraIos = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconFlipCameraIos = function (props) {
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
            'g',
            {
              children: jsx_runtime_1.jsx(
                'rect',
                { fill: 'none', height: '20', width: '20' },
                void 0
              ),
            },
            void 0
          ),
          jsx_runtime_1.jsx(
            'g',
            {
              children: jsx_runtime_1.jsx(
                'g',
                {
                  children: jsx_runtime_1.jsx(
                    'path',
                    {
                      d: 'M16,5h-2l-2-2H8L6,5H4C3.45,5,3,5.45,3,6v9c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1V6C17,5.45,16.55,5,16,5z M10,14 c-2.21,0-4-1.79-4-4H4.5l2-2l2,2H7c0,1.65,1.35,3,3,3c0.44,0,0.85-0.1,1.23-0.27l0.73,0.73C11.38,13.8,10.72,14,10,14z M13.5,12 l-2-2H13c0-1.65-1.35-3-3-3C9.56,7,9.15,7.1,8.77,7.27L8.04,6.54C8.62,6.2,9.28,6,10,6c2.21,0,4,1.79,4,4h1.5L13.5,12z',
                    },
                    void 0
                  ),
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
exports.IconFlipCameraIos = IconFlipCameraIos;
//# sourceMappingURL=IconFlipCameraIos.js.map
