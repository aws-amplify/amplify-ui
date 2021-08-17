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
exports.Text = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var classnames_1 = __importDefault(require('classnames'));
var constants_1 = require('../shared/constants');
var View_1 = require('../View');
var Text = function (props) {
  var _a = props.as,
    asElementTag = _a === void 0 ? 'p' : _a,
    className = props.className,
    children = props.children,
    id = props.id,
    isTruncated = props.isTruncated,
    variation = props.variation,
    rest = __rest(props, [
      'as',
      'className',
      'children',
      'id',
      'isTruncated',
      'variation',
    ]);
  return jsx_runtime_1.jsx(
    View_1.View,
    __assign(
      {
        as: asElementTag,
        className: classnames_1.default(
          constants_1.ComponentClassNames.Text,
          className
        ),
        'data-truncate': isTruncated,
        'data-variation': variation,
        id: id,
      },
      rest,
      { children: children }
    ),
    void 0
  );
};
exports.Text = Text;
//# sourceMappingURL=Text.js.map
