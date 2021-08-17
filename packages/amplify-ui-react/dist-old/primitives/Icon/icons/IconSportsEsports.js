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
exports.IconSportsEsports = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconSportsEsports = function (props) {
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
                      d: 'M15.82,13.55l-0.62-5.76C15.08,6.77,14.23,6,13.21,6H6.79C5.77,6,4.92,6.77,4.81,7.78l-0.62,5.76 C4.09,14.32,4.69,15,5.46,15c0.34,0,0.67-0.14,0.91-0.38L8,13h4l1.62,1.62c0.24,0.24,0.57,0.38,0.91,0.38 C15.31,15,15.91,14.32,15.82,13.55z M9.25,9.75H8V11H7.5V9.75H6.25v-0.5H7.5V8H8v1.25h1.25V9.75z M11.5,9C11.22,9,11,8.78,11,8.5 C11,8.22,11.22,8,11.5,8S12,8.22,12,8.5C12,8.78,11.78,9,11.5,9z M12.5,11c-0.28,0-0.5-0.22-0.5-0.5c0-0.28,0.22-0.5,0.5-0.5 s0.5,0.22,0.5,0.5C13,10.78,12.78,11,12.5,11z',
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
exports.IconSportsEsports = IconSportsEsports;
//# sourceMappingURL=IconSportsEsports.js.map
