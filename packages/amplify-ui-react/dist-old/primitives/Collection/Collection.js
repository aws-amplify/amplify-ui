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
exports.Collection = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var Flex_1 = require('../Flex');
var Collection = function (_a) {
  var items = _a.items,
    children = _a.children,
    className = _a.className,
    _b = _a.direction,
    direction = _b === void 0 ? 'column' : _b,
    _c = _a.type,
    type = _c === void 0 ? 'list' : _c,
    rest = __rest(_a, ['items', 'children', 'className', 'direction', 'type']);
  return jsx_runtime_1.jsx(
    Flex_1.Flex,
    __assign({ direction: direction, className: className }, rest, {
      children: items.map(children),
    }),
    void 0
  );
};
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map
