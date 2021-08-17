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
exports.ConfirmSignUp = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var react_1 = require('react');
var hooks_1 = require('../../../hooks');
var shared_1 = require('../shared');
function ConfirmSignUp() {
  var _a = react_1.useState(''),
    usernameAlias = _a[0],
    setUsernameAlias = _a[1];
  var amplifyNamespace = 'Authenticator.ConfirmSignUp';
  var _b = hooks_1.useAmplify(amplifyNamespace).components,
    Box = _b.Box,
    Button = _b.Button,
    Fieldset = _b.Fieldset,
    Form = _b.Form,
    Heading = _b.Heading,
    Label = _b.Label,
    Text = _b.Text;
  var _c = hooks_1.useAuth(),
    state = _c[0],
    send = _c[1];
  var isPending = state.matches('confirmSignUp.pending');
  var footerProps = {
    amplifyNamespace: amplifyNamespace,
    isPending: isPending,
    shouldHideReturnBtn: true,
    send: send,
  };
  var confirmationCodeInputProps = {
    amplifyNamespace: amplifyNamespace,
    label: 'Confirmation Code',
    placeholder: 'Enter your code',
  };
  var handleUsernameInputChange = function (event) {
    setUsernameAlias(event.target.value);
  };
  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    jsx_runtime_1.jsxs(
      Form,
      __assign(
        {
          'data-amplify-authenticator-confirmsignup': '',
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
              __assign({ level: 1 }, { children: 'Confirm Sign Up' }),
              void 0
            ),
            jsx_runtime_1.jsxs(
              Fieldset,
              __assign(
                { disabled: isPending },
                {
                  children: [
                    jsx_runtime_1.jsx(
                      shared_1.UserNameAlias,
                      {
                        handleInputChange: handleUsernameInputChange,
                        'data-amplify-usernamealias': true,
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsxs(
                      Label,
                      __assign(
                        { 'data-amplify-confirmationcode': true },
                        {
                          children: [
                            jsx_runtime_1.jsx(
                              shared_1.ConfirmationCodeInput,
                              __assign({}, confirmationCodeInputProps),
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
                                              username: usernameAlias,
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
                  ],
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
    )
  );
}
exports.ConfirmSignUp = ConfirmSignUp;
//# sourceMappingURL=ConfirmSignUp.js.map
