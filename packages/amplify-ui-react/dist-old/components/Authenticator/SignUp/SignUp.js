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
exports.SignUp = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var lodash_1 = require('lodash');
var hooks_1 = require('../../../hooks');
var ui_core_1 = require('@aws-amplify/ui-core');
var FederatedSignIn_1 = require('../FederatedSignIn');
function SignUp() {
  var _a, _b;
  var _c = hooks_1.useAmplify('Authenticator.SignUp').components,
    Button = _c.Button,
    Fieldset = _c.Fieldset,
    Footer = _c.Footer,
    Form = _c.Form,
    Heading = _c.Heading,
    Spacer = _c.Spacer,
    Text = _c.Text,
    ErrorText = _c.ErrorText;
  var _d = hooks_1.useAuth(),
    state = _d[0],
    send = _d[1];
  var isPending = state.matches('signUp.pending');
  var remoteError = state.context.remoteError;
  var _e =
      (_b =
        (_a = state.context.config) === null || _a === void 0
          ? void 0
          : _a.login_mechanisms) !== null && _b !== void 0
        ? _b
        : ['username', 'email', 'phone_number'],
    primaryAlias = _e[0],
    secondaryAliases = _e.slice(1);
  var handleChange = function (event) {
    var _a = event.target,
      name = _a.name,
      value = _a.value;
    send({
      type: 'CHANGE',
      data: { name: name, value: value },
    });
  };
  return jsx_runtime_1.jsxs(
    Form,
    __assign(
      {
        'data-amplify-authenticator-signup': '',
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
        onChange: handleChange,
      },
      {
        children: [
          jsx_runtime_1.jsx(
            Heading,
            { children: 'Create a new account' },
            void 0
          ),
          jsx_runtime_1.jsx(FederatedSignIn_1.FederatedSignIn, {}, void 0),
          jsx_runtime_1.jsxs(
            Fieldset,
            {
              children: [
                jsx_runtime_1.jsx(
                  SignUp.AliasControl,
                  {
                    label: ui_core_1.authInputAttributes[primaryAlias].label,
                    name: primaryAlias,
                  },
                  void 0
                ),
                jsx_runtime_1.jsx(SignUp.PasswordControl, {}, void 0),
                jsx_runtime_1.jsx(SignUp.ConfirmPasswordControl, {}, void 0),
                secondaryAliases
                  .filter(function (alias) {
                    return !lodash_1.includes(
                      ui_core_1.socialProviderLoginMechanisms,
                      alias
                    );
                  })
                  .map(function (alias) {
                    return jsx_runtime_1.jsx(
                      SignUp.AliasControl,
                      {
                        label: ui_core_1.authInputAttributes[alias].label,
                        name: alias,
                      },
                      alias
                    );
                  }),
              ],
            },
            void 0
          ),
          jsx_runtime_1.jsx(ErrorText, { children: remoteError }, void 0),
          jsx_runtime_1.jsxs(
            Footer,
            {
              children: [
                jsx_runtime_1.jsx(
                  Text,
                  { children: 'Have an account?' },
                  void 0
                ),
                ' ',
                jsx_runtime_1.jsx(
                  Button,
                  __assign(
                    {
                      onClick: function () {
                        return send({ type: 'SIGN_IN' });
                      },
                      type: 'button',
                    },
                    { children: 'Sign in' }
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
                            { children: 'Creating Account\u2026' },
                            void 0
                          )
                        : jsx_runtime_1.jsx(
                            jsx_runtime_1.Fragment,
                            { children: 'Create Account' },
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
}
exports.SignUp = SignUp;
SignUp.AliasControl = function (_a) {
  var _b = _a.label,
    label = _b === void 0 ? 'Username' : _b,
    _c = _a.name,
    name = _c === void 0 ? 'username' : _c,
    _d = _a.placeholder,
    placeholder = _d === void 0 ? label : _d;
  var _e = hooks_1.useAmplify('Authenticator.SignUp.Password').components,
    Input = _e.Input,
    Label = _e.Label,
    Text = _e.Text,
    ErrorText = _e.ErrorText;
  var context = hooks_1.useAuth()[0].context;
  var error = context.validationError[name];
  return jsx_runtime_1.jsxs(
    jsx_runtime_1.Fragment,
    {
      children: [
        jsx_runtime_1.jsxs(
          Label,
          {
            children: [
              jsx_runtime_1.jsx(Text, { children: label }, void 0),
              jsx_runtime_1.jsx(
                Input,
                {
                  name: name,
                  placeholder: placeholder,
                  required: true,
                  type: ui_core_1.authInputAttributes[name].type,
                },
                void 0
              ),
            ],
          },
          void 0
        ),
        jsx_runtime_1.jsx(ErrorText, { children: error }, void 0),
      ],
    },
    void 0
  );
};
SignUp.PasswordControl = function (_a) {
  var _b = _a.label,
    label = _b === void 0 ? 'Password' : _b,
    _c = _a.name,
    name = _c === void 0 ? 'password' : _c,
    _d = _a.placeholder,
    placeholder = _d === void 0 ? label : _d;
  var _e = hooks_1.useAmplify('Authenticator.SignUp.Password').components,
    Input = _e.Input,
    Label = _e.Label,
    Text = _e.Text,
    ErrorText = _e.ErrorText;
  var context = hooks_1.useAuth()[0].context;
  var error = context.validationError[name];
  return jsx_runtime_1.jsxs(
    jsx_runtime_1.Fragment,
    {
      children: [
        jsx_runtime_1.jsxs(
          Label,
          {
            children: [
              jsx_runtime_1.jsx(Text, { children: label }, void 0),
              jsx_runtime_1.jsx(
                Input,
                {
                  name: name,
                  placeholder: placeholder,
                  required: true,
                  type: 'password',
                },
                void 0
              ),
            ],
          },
          void 0
        ),
        jsx_runtime_1.jsx(ErrorText, { children: error }, void 0),
      ],
    },
    void 0
  );
};
SignUp.ConfirmPasswordControl = function (_a) {
  var _b = _a.label,
    label = _b === void 0 ? 'Confirm Password' : _b,
    _c = _a.name,
    name = _c === void 0 ? 'confirm_password' : _c;
  var _d = hooks_1.useAmplify('Authenticator.SignUp.Password').components,
    Input = _d.Input,
    Label = _d.Label,
    Text = _d.Text,
    ErrorText = _d.ErrorText;
  var context = hooks_1.useAuth()[0].context;
  var error = context.validationError[name];
  return jsx_runtime_1.jsxs(
    jsx_runtime_1.Fragment,
    {
      children: [
        jsx_runtime_1.jsxs(
          Label,
          {
            children: [
              jsx_runtime_1.jsx(Text, { children: label }, void 0),
              jsx_runtime_1.jsx(
                Input,
                {
                  name: name,
                  placeholder: label,
                  required: true,
                  type: 'password',
                },
                void 0
              ),
            ],
          },
          void 0
        ),
        jsx_runtime_1.jsx(ErrorText, { children: error }, void 0),
      ],
    },
    void 0
  );
};
//# sourceMappingURL=SignUp.js.map
