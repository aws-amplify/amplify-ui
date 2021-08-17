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
exports.View = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var utils_1 = require('../shared/utils');
var View = function (props) {
  var asElementTag = props.as,
    className = props.className,
    children = props.children,
    role = props.role,
    id = props.id,
    testId = props.testId,
    ariaLabel = props.ariaLabel,
    isDisabled = props.isDisabled,
    style = props.style,
    rest = __rest(props, [
      'as',
      'className',
      'children',
      'role',
      'id',
      'testId',
      'ariaLabel',
      'isDisabled',
      'style',
    ]);
  var ViewTag =
    asElementTag !== null && asElementTag !== void 0 ? asElementTag : 'div';
  return jsx_runtime_1.jsx(
    ViewTag,
    __assign(
      {
        'aria-label': ariaLabel,
        className: className,
        'data-testid': testId,
        disabled: isDisabled,
        id: id,
        role: role,
        style: utils_1.convertStylePropsToStyleObj(props, style),
      },
      utils_1.getNonStyleProps(rest),
      { children: children }
    ),
    void 0
  );
};
exports.View = View;
//# sourceMappingURL=View.js.map
