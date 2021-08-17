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
exports.IconWebStories = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconWebStories = function (props) {
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
              d: 'M15,3.6c0.88,0,1.6,0.72,1.6,1.6v9.6c0,0.88-0.72,1.6-1.6,1.6V3.6z M3,16.5C3,17.33,3.67,18,4.5,18h7.4 c0.83,0,1.5-0.67,1.5-1.5v-13c0-0.83-0.67-1.5-1.5-1.5H4.5C3.67,2,3,2.67,3,3.5V16.5z M18.2,14.8c0.66,0,1.2-0.54,1.2-1.2V6.4 c0-0.66-0.54-1.2-1.2-1.2V14.8z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconWebStories = IconWebStories;
//# sourceMappingURL=IconWebStories.js.map
