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
exports.ConfirmSignInFooter = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var hooks_1 = require('../../../hooks');
var ConfirmSignInFooter = function (props) {
  var amplifyNamespace = props.amplifyNamespace,
    isPending = props.isPending,
    _a = props.shouldHideReturnBtn,
    shouldHideReturnBtn = _a === void 0 ? false : _a,
    send = props.send;
  var _b = hooks_1.useAmplify(amplifyNamespace).components,
    Button = _b.Button,
    Footer = _b.Footer,
    Spacer = _b.Spacer;
  return jsx_runtime_1.jsxs(
    Footer,
    {
      children: [
        !shouldHideReturnBtn &&
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
            {
              children: isPending
                ? jsx_runtime_1.jsx(
                    jsx_runtime_1.Fragment,
                    { children: 'Confirming\u2026' },
                    void 0
                  )
                : jsx_runtime_1.jsx(
                    jsx_runtime_1.Fragment,
                    { children: 'Confirm' },
                    void 0
                  ),
            }
          ),
          void 0
        ),
      ],
    },
    void 0
  );
};
exports.ConfirmSignInFooter = ConfirmSignInFooter;
//# sourceMappingURL=ConfirmSignInFooter.js.map
