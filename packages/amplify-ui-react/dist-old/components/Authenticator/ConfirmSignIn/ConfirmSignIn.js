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
exports.ConfirmSignIn = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var ui_core_1 = require('@aws-amplify/ui-core');
var hooks_1 = require('../../../hooks');
var shared_1 = require('../shared');
/**
 * placeholder component
 */
var ConfirmSignIn = function () {
  var amplifyNamespace = 'Authenticator.ConfirmSignIn';
  var _a = hooks_1.useAmplify(amplifyNamespace).components,
    Fieldset = _a.Fieldset,
    Form = _a.Form,
    Heading = _a.Heading,
    Label = _a.Label;
  var _b = hooks_1.useAuth(),
    state = _b[0],
    send = _b[1];
  var isPending = state.matches('confirmSignIn.pending');
  var footerProps = {
    amplifyNamespace: amplifyNamespace,
    isPending: isPending,
    send: send,
  };
  var _c = state.context,
    challengeName = _c.challengeName,
    remoteError = _c.remoteError;
  var mfaType = 'SMS';
  if (challengeName === ui_core_1.AuthChallengeNames.SOFTWARE_TOKEN_MFA) {
    mfaType = 'TOTP';
  }
  var headerText = 'Confirm ' + mfaType + ' Code';
  return jsx_runtime_1.jsxs(
    Form,
    __assign(
      {
        'data-amplify-authenticator-confirmsignin': '',
        method: 'post',
        onSubmit: function (event) {
          event.preventDefault();
          var formData = new FormData(event.target);
          send({
            type: 'SUBMIT',
            // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
            data: Object.fromEntries(formData),
          });
        },
      },
      {
        children: [
          jsx_runtime_1.jsx(
            Heading,
            __assign({ level: 1 }, { children: headerText }),
            void 0
          ),
          jsx_runtime_1.jsx(
            Fieldset,
            __assign(
              { disabled: isPending },
              {
                children: jsx_runtime_1.jsx(
                  Label,
                  __assign(
                    { 'data-amplify-confirmationcode': true },
                    {
                      children: jsx_runtime_1.jsx(
                        shared_1.ConfirmationCodeInput,
                        {
                          amplifyNamespace: amplifyNamespace,
                          errorText: remoteError,
                        },
                        void 0
                      ),
                    }
                  ),
                  void 0
                ),
              }
            ),
            void 0
          ),
          jsx_runtime_1.jsx(
            shared_1.ConfirmSignInFooter,
            __assign({}, footerProps),
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.ConfirmSignIn = ConfirmSignIn;
//# sourceMappingURL=ConfirmSignIn.js.map
