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
exports.SignIn = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var hooks_1 = require('../../../hooks');
var FederatedSignIn_1 = require('../FederatedSignIn');
var shared_1 = require('../shared');
function SignIn() {
  var _a;
  var _b = hooks_1.useAmplify('Authenticator.SignIn').components,
    Box = _b.Box,
    Button = _b.Button,
    Fieldset = _b.Fieldset,
    Footer = _b.Footer,
    Form = _b.Form,
    Heading = _b.Heading,
    Input = _b.Input,
    Label = _b.Label,
    Spacer = _b.Spacer,
    Text = _b.Text;
  var _c = hooks_1.useAuth(),
    state = _c[0],
    send = _c[1];
  var isPending = state.matches('signIn.pending');
  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    jsx_runtime_1.jsxs(
      Form,
      __assign(
        {
          'data-amplify-authenticator-signin': '',
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
              __assign({ level: 1 }, { children: 'Sign in to your account' }),
              void 0
            ),
            jsx_runtime_1.jsx(FederatedSignIn_1.FederatedSignIn, {}, void 0),
            jsx_runtime_1.jsxs(
              Fieldset,
              __assign(
                { disabled: isPending },
                {
                  children: [
                    jsx_runtime_1.jsx(
                      shared_1.UserNameAlias,
                      { 'data-amplify-usernamealias': true },
                      void 0
                    ),
                    jsx_runtime_1.jsxs(
                      Label,
                      __assign(
                        { 'data-amplify-password': true },
                        {
                          children: [
                            jsx_runtime_1.jsx(
                              Text,
                              { children: 'Password' },
                              void 0
                            ),
                            jsx_runtime_1.jsx(
                              Input,
                              {
                                name: 'password',
                                required: true,
                                type: 'password',
                              },
                              void 0
                            ),
                            jsx_runtime_1.jsxs(
                              Box,
                              {
                                children: [
                                  jsx_runtime_1.jsx(
                                    Text,
                                    { children: 'Forgot your password?' },
                                    void 0
                                  ),
                                  ' ',
                                  jsx_runtime_1.jsx(
                                    Button,
                                    __assign(
                                      {
                                        onClick: function () {
                                          return send({
                                            type: 'RESET_PASSWORD',
                                          });
                                        },
                                        type: 'button',
                                      },
                                      { children: 'Reset Password' }
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
            jsx_runtime_1.jsxs(
              Footer,
              {
                children: [
                  jsx_runtime_1.jsx(Text, { children: 'No account?' }, void 0),
                  ' ',
                  jsx_runtime_1.jsx(
                    Button,
                    __assign(
                      {
                        onClick: function () {
                          return send({ type: 'SIGN_UP' });
                        },
                        type: 'button',
                      },
                      { children: 'Create account' }
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
                              { children: 'Signing in\u2026' },
                              void 0
                            )
                          : jsx_runtime_1.jsx(
                              jsx_runtime_1.Fragment,
                              { children: 'Sign In' },
                              void 0
                            ),
                      }
                    ),
                    void 0
                  ),
                ],
              },
              void 0
            ),
            jsx_runtime_1.jsx(
              Box,
              __assign(
                { 'data-amplify-error': true },
                {
                  children:
                    (_a = state.event.data) === null || _a === void 0
                      ? void 0
                      : _a.message,
                }
              ),
              void 0
            ),
          ],
        }
      ),
      void 0
    )
  );
}
exports.SignIn = SignIn;
//# sourceMappingURL=SignIn.js.map
