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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Heading = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var constants_1 = require('../shared/constants');
var classnames_1 = __importDefault(require('classnames'));
var View_1 = require('../View');
var headingLevels = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};
var Heading = function (_a) {
  var className = _a.className,
    children = _a.children,
    _b = _a.level,
    level = _b === void 0 ? 6 : _b,
    rest = __rest(_a, ['className', 'children', 'level']);
  return jsx_runtime_1.jsx(
    View_1.View,
    __assign(
      {
        as: headingLevels[level],
        className: classnames_1.default(
          constants_1.ComponentClassNames.Heading,
          className
        ),
      },
      rest,
      { children: children }
    ),
    void 0
  );
};
exports.Heading = Heading;
//# sourceMappingURL=Heading.js.map
