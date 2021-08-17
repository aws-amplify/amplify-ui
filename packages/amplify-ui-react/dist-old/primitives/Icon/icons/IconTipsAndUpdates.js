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
exports.IconTipsAndUpdates = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconTipsAndUpdates = function (props) {
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
              d: 'M4.5,14h6v1.5h-6V14z M13.5,8c0,2.09-1.07,3.93-2.69,5H4.19C2.57,11.93,1.5,10.09,1.5,8c0-3.31,2.69-6,6-6S13.5,4.69,13.5,8 z M7.5,18C8.33,18,9,17.33,9,16.5H6C6,17.33,6.67,18,7.5,18z M18.5,8l0.47-1.03L20,6.5l-1.03-0.47L18.5,5l-0.47,1.03L17,6.5 l1.03,0.47L18.5,8z M15.5,5l0.78-1.72L18,2.5l-1.72-0.78L15.5,0l-0.78,1.72L13,2.5l1.72,0.78L15.5,5z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconTipsAndUpdates = IconTipsAndUpdates;
//# sourceMappingURL=IconTipsAndUpdates.js.map
