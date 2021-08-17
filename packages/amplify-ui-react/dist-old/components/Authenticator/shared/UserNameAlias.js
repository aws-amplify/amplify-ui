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
exports.UserNameAlias = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var hooks_1 = require('../../../hooks');
var primitives_1 = require('../../../primitives');
var ui_core_1 = require('@aws-amplify/ui-core');
function UserNameAlias(props) {
  var handleInputChange = props.handleInputChange,
    attrs = __rest(props, ['handleInputChange']);
  var context = hooks_1.useAuth()[0].context;
  var _a = ui_core_1.getAliasInfoFromContext(context),
    label = _a.label,
    type = _a.type,
    error = _a.error;
  return jsx_runtime_1.jsxs(
    primitives_1.Label,
    __assign({}, attrs, {
      children: [
        jsx_runtime_1.jsx(primitives_1.Text, { children: label }, void 0),
        jsx_runtime_1.jsx(
          primitives_1.Input,
          {
            onChange: handleInputChange,
            name: 'username',
            required: true,
            type: type,
          },
          void 0
        ),
        jsx_runtime_1.jsx(primitives_1.ErrorText, { children: error }, void 0),
      ],
    }),
    void 0
  );
}
exports.UserNameAlias = UserNameAlias;
//# sourceMappingURL=UserNameAlias.js.map
