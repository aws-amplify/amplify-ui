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
Object.defineProperty(exports, '__esModule', { value: true });
exports.ErrorText = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var hooks_1 = require('../../../hooks');
var ErrorText = function (props) {
  var amplifyNamespace = props.amplifyNamespace;
  var Text = hooks_1.useAmplify(amplifyNamespace).components.Text;
  var state = hooks_1.useAuth()[0];
  var remoteError = state.context.remoteError;
  return jsx_runtime_1.jsx(
    Text,
    __assign(
      { className: 'errorText', variant: 'error' },
      { children: remoteError }
    ),
    void 0
  );
};
exports.ErrorText = ErrorText;
//# sourceMappingURL=ErrorText.js.map
