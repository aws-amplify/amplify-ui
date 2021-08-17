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
exports.SignInOrSubmitFooter = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var hooks_1 = require('../../../hooks');
var SignInOrSubmitFooter = function (props) {
  var amplifyNamespace = props.amplifyNamespace,
    submitButtonText = props.submitButtonText;
  var _a = hooks_1.useAmplify(amplifyNamespace).components,
    Button = _a.Button,
    Footer = _a.Footer,
    Spacer = _a.Spacer;
  var _b = hooks_1.useAuth(),
    state = _b[0],
    send = _b[1];
  var isPending = state.matches('resetPassword.pending');
  var defaultSubmitText = isPending
    ? jsx_runtime_1.jsx(
        jsx_runtime_1.Fragment,
        { children: 'Submitting\u2026' },
        void 0
      )
    : jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: 'Submit' }, void 0);
  var submitText = submitButtonText || defaultSubmitText;
  return jsx_runtime_1.jsxs(
    Footer,
    {
      children: [
        jsx_runtime_1.jsx(
          Button,
          __assign(
            {
              onClick: function () {
                return send({ type: 'SIGN_IN' });
              },
              type: 'button',
            },
            { children: 'Back to Sign In' }
          ),
          void 0
        ),
        jsx_runtime_1.jsx(Spacer, {}, void 0),
        jsx_runtime_1.jsx(
          Button,
          __assign(
            { isDisabled: isPending, type: 'submit' },
            { children: submitText }
          ),
          void 0
        ),
      ],
    },
    void 0
  );
};
exports.SignInOrSubmitFooter = SignInOrSubmitFooter;
//# sourceMappingURL=SignInOrSubmitFooter.js.map
