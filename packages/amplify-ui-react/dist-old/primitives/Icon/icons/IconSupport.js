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
exports.IconSupport = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconSupport = function (props) {
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
                'path',
                {
                  d: 'M10,3c-3.87,0-7,3.13-7,7c0,3.87,3.13,7,7,7s7-3.13,7-7C17,6.13,13.87,3,10,3z M12.16,4.41c1.57,0.61,2.82,1.85,3.43,3.42 l-2.78,1.15c-0.3-0.83-0.96-1.49-1.79-1.79L12.16,4.41z M7.84,4.41L9,7.18c-0.85,0.3-1.51,0.96-1.82,1.81v0L4.41,7.84 C5.02,6.27,6.27,5.02,7.84,4.41z M7.83,15.59c-1.57-0.61-2.82-1.86-3.43-3.43l2.78-1.15v0c0.3,0.84,0.97,1.51,1.81,1.81L7.83,15.59 z M8,10c0-1.1,0.9-2,2-2s2,0.9,2,2c0,1.1-0.9,2-2,2S8,11.1,8,10z M12.17,15.59l-1.15-2.78c0.84-0.3,1.5-0.97,1.79-1.81l2.77,1.16 C14.98,13.74,13.74,14.98,12.17,15.59z',
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
exports.IconSupport = IconSupport;
//# sourceMappingURL=IconSupport.js.map
