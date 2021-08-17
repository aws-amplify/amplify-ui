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
exports.IconPointOfSale = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconPointOfSale = function (props) {
  var size = props.size,
    _a = props.fill,
    fill = _a === void 0 ? 'currentColor' : _a,
    ariaLabel = props.ariaLabel,
    rest = __rest(props, ['size', 'fill', 'ariaLabel']);
  return jsx_runtime_1.jsx(
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
        children: jsx_runtime_1.jsxs(
          'g',
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
                  d: 'M14,3H6C5.45,3,5,3.45,5,4v1c0,0.55,0.45,1,1,1h8c0.55,0,1-0.45,1-1V4C15,3.45,14.55,3,14,3z M14,5H6V4h8V5z M16,17H4 c-0.55,0-1-0.45-1-1l0,0l0-1h14v1l0,0C17,16.55,16.55,17,16,17z M14.26,7.61C14.1,7.24,13.74,7,13.34,7H6.66 C6.26,7,5.9,7.24,5.74,7.61L3,14h14L14.26,7.61z M7.75,13h-0.5c-0.28,0-0.5-0.22-0.5-0.5c0-0.28,0.22-0.5,0.5-0.5h0.5 c0.28,0,0.5,0.22,0.5,0.5C8.25,12.78,8.03,13,7.75,13z M7.75,11h-0.5c-0.28,0-0.5-0.22-0.5-0.5S6.97,10,7.25,10h0.5 c0.28,0,0.5,0.22,0.5,0.5S8.03,11,7.75,11z M7.75,9h-0.5c-0.28,0-0.5-0.22-0.5-0.5c0-0.28,0.22-0.5,0.5-0.5h0.5 c0.28,0,0.5,0.22,0.5,0.5C8.25,8.78,8.03,9,7.75,9z M10.25,13h-0.5c-0.28,0-0.5-0.22-0.5-0.5S9.47,12,9.75,12h0.5 c0.28,0,0.5,0.22,0.5,0.5S10.53,13,10.25,13z M10.25,11h-0.5c-0.28,0-0.5-0.22-0.5-0.5c0-0.28,0.22-0.5,0.5-0.5h0.5 c0.28,0,0.5,0.22,0.5,0.5C10.75,10.78,10.53,11,10.25,11z M10.25,9h-0.5c-0.28,0-0.5-0.22-0.5-0.5S9.47,8,9.75,8h0.5 c0.28,0,0.5,0.22,0.5,0.5S10.53,9,10.25,9z M12.75,13h-0.5c-0.28,0-0.5-0.22-0.5-0.5s0.22-0.5,0.5-0.5h0.5c0.28,0,0.5,0.22,0.5,0.5 S13.03,13,12.75,13z M12.75,11h-0.5c-0.28,0-0.5-0.22-0.5-0.5c0-0.28,0.22-0.5,0.5-0.5h0.5c0.28,0,0.5,0.22,0.5,0.5 C13.25,10.78,13.03,11,12.75,11z M12.75,9h-0.5c-0.28,0-0.5-0.22-0.5-0.5S11.97,8,12.25,8h0.5c0.28,0,0.5,0.22,0.5,0.5 S13.03,9,12.75,9z',
                },
                void 0
              ),
            ],
          },
          void 0
        ),
      }
    ),
    void 0
  );
};
exports.IconPointOfSale = IconPointOfSale;
//# sourceMappingURL=IconPointOfSale.js.map
