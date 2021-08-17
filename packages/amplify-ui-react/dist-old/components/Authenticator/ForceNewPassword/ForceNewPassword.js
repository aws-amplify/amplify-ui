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
exports.ForceNewPassword = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var hooks_1 = require('../../../hooks');
var ForceNewPassword = function () {
  var amplifyNamespace = 'Authenticator.ForceNewPassword';
  var _a = hooks_1.useAmplify(amplifyNamespace).components,
    Button = _a.Button,
    Fieldset = _a.Fieldset,
    Footer = _a.Footer,
    Form = _a.Form,
    Heading = _a.Heading,
    Input = _a.Input,
    Label = _a.Label,
    Spacer = _a.Spacer,
    Text = _a.Text;
  var _b = hooks_1.useAuth(),
    state = _b[0],
    send = _b[1];
  var remoteError = state.context.remoteError;
  var isPending = state.matches('forceNewPassword.pending');
  var headerText = 'Change Password';
  return jsx_runtime_1.jsxs(
    Form,
    __assign(
      {
        'data-amplify-authenticator-forcenewpassword': '',
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
                children: jsx_runtime_1.jsxs(
                  Label,
                  __assign(
                    { 'data-amplify-forcenewpassword-label': '' },
                    {
                      children: [
                        jsx_runtime_1.jsx(
                          Text,
                          { children: 'Change password' },
                          void 0
                        ),
                        jsx_runtime_1.jsx(
                          Input,
                          {
                            autoComplete: 'password',
                            name: 'password',
                            placeholder: 'Password',
                            required: true,
                            type: 'password',
                          },
                          void 0
                        ),
                      ],
                    }
                  ),
                  void 0
                ),
              }
            ),
            void 0
          ),
          jsx_runtime_1.jsx(
            Text,
            __assign(
              { className: 'forceNewPasswordErrorText', variant: 'error' },
              { children: remoteError }
            ),
            void 0
          ),
          jsx_runtime_1.jsxs(
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
                    {
                      children: isPending
                        ? jsx_runtime_1.jsx(
                            jsx_runtime_1.Fragment,
                            { children: 'Changing\u2026' },
                            void 0
                          )
                        : jsx_runtime_1.jsx(
                            jsx_runtime_1.Fragment,
                            { children: 'Change password' },
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
        ],
      }
    ),
    void 0
  );
};
exports.ForceNewPassword = ForceNewPassword;
//# sourceMappingURL=ForceNewPassword.js.map
