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
exports.ConfirmResetPassword = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var hooks_1 = require('../../../hooks');
var shared_1 = require('../shared');
var ConfirmResetPassword = function () {
  var amplifyNamespace = 'Authenticator.ConfirmResetPassword';
  var _a = hooks_1.useAmplify(amplifyNamespace).components,
    Box = _a.Box,
    Button = _a.Button,
    Fieldset = _a.Fieldset,
    Form = _a.Form,
    Heading = _a.Heading,
    Input = _a.Input,
    Label = _a.Label,
    Text = _a.Text;
  var _b = hooks_1.useAuth(),
    state = _b[0],
    send = _b[1];
  var isPending = state.matches('confirmResetPassword.pending');
  var headerText = 'Reset your Password';
  return jsx_runtime_1.jsxs(
    Form,
    __assign(
      {
        'data-amplify-authenticator-confirmresetpassword': '',
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
          jsx_runtime_1.jsxs(
            Fieldset,
            __assign(
              { disabled: isPending },
              {
                children: [
                  jsx_runtime_1.jsx(
                    Label,
                    __assign(
                      { 'data-amplify-confirmresetpasswordcode-label': '' },
                      {
                        children: jsx_runtime_1.jsx(
                          shared_1.ConfirmationCodeInput,
                          { amplifyNamespace: amplifyNamespace },
                          void 0
                        ),
                      }
                    ),
                    void 0
                  ),
                  jsx_runtime_1.jsx(
                    Label,
                    __assign(
                      { 'data-amplify-confirmresetpasswordnew-label': '' },
                      {
                        children: jsx_runtime_1.jsx(
                          shared_1.PasswordInput,
                          {
                            amplifyNamespace: amplifyNamespace,
                            label: 'New password',
                          },
                          void 0
                        ),
                      }
                    ),
                    void 0
                  ),
                  jsx_runtime_1.jsxs(
                    Box,
                    {
                      children: [
                        jsx_runtime_1.jsx(
                          Text,
                          { children: 'Lost your code?' },
                          void 0
                        ),
                        ' ',
                        jsx_runtime_1.jsx(
                          Button,
                          __assign(
                            {
                              onClick: function () {
                                send({
                                  type: 'RESEND',
                                  data: {
                                    username: state.context.username,
                                  },
                                });
                              },
                              type: 'button',
                            },
                            { children: 'Resend Code' }
                          ),
                          void 0
                        ),
                      ],
                    },
                    void 0
                  ),
                ],
              }
            ),
            void 0
          ),
          jsx_runtime_1.jsx(
            shared_1.ErrorText,
            { amplifyNamespace: amplifyNamespace },
            void 0
          ),
          jsx_runtime_1.jsx(
            shared_1.SignInOrSubmitFooter,
            { amplifyNamespace: amplifyNamespace },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.ConfirmResetPassword = ConfirmResetPassword;
//# sourceMappingURL=ConfirmResetPassword.js.map
