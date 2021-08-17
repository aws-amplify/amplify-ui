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
exports.IconLockClock = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconLockClock = function (props) {
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
        height: '20',
        viewBox: '0 0 20 20',
        width: '20',
      },
      {
        children: [
          jsx_runtime_1.jsx(
            'path',
            { d: 'M0 0h20v20H0V0z', fill: 'none' },
            void 0
          ),
          jsx_runtime_1.jsx(
            'path',
            {
              d: 'M12.5 8H11v5l3.6 2.2.8-1.3-2.9-1.7V8zM12 5c-.3 0-.7 0-1 .1V5c0-2.1-1.9-4-4-4S3 2.9 3 5v1h-.5C1.7 6 1 6.7 1 7.5v8c0 .8.7 1.5 1.5 1.5h4.6c1.3 1.2 3 2 4.9 2 3.9 0 7-3.1 7-7s-3.1-7-7-7zM5 5c0-1.1.9-2 2-2s2 .9 2 2v1H5V5zm7 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z',
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconLockClock = IconLockClock;
//# sourceMappingURL=IconLockClock.js.map
