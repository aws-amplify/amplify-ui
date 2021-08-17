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
exports.IconSportsRugby = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconSportsRugby = function (props) {
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
                      d: 'M15.3,4.7C15.3,4.7,15.3,4.7,15.3,4.7C15.3,4.7,15.3,4.7,15.3,4.7c-0.35-0.35-1.34-0.6-2.6-0.6 c-1.93,0-4.47,0.6-6.24,2.37C3.54,9.39,3.81,14.42,4.7,15.3c0.35,0.35,1.34,0.6,2.6,0.6c1.93,0,4.47-0.6,6.24-2.37 C16.46,10.61,16.19,5.58,15.3,4.7z M7.17,7.17C8.79,5.55,11,5.19,12.16,5.12C10.8,5.64,9.23,6.53,7.88,7.88 c-1.35,1.35-2.24,2.92-2.76,4.28C5.22,10.58,5.75,8.6,7.17,7.17z M12.83,12.83c-1.62,1.62-3.83,1.98-4.99,2.06 c1.35-0.52,2.93-1.41,4.28-2.76c1.35-1.35,2.24-2.92,2.76-4.28C14.78,9.42,14.25,11.4,12.83,12.83z',
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
exports.IconSportsRugby = IconSportsRugby;
//# sourceMappingURL=IconSportsRugby.js.map
