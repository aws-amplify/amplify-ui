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
exports.withAuthenticator = exports.Authenticator = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var ui_core_1 = require('@aws-amplify/ui-core');
var hooks_1 = require('../../hooks');
var react_1 = require('@xstate/react');
var AuthenticatorContext_1 = require('./AuthenticatorContext');
var ConfirmSignIn_1 = require('./ConfirmSignIn');
var ConfirmSignUp_1 = require('./ConfirmSignUp');
var ForceNewPassword_1 = require('./ForceNewPassword');
var ResetPassword_1 = require('./ResetPassword');
var SetupTOTP_1 = require('./SetupTOTP');
var SignIn_1 = require('./SignIn');
var SignUp_1 = require('./SignUp');
function Authenticator(_a) {
  var _b = _a.className,
    className = _b === void 0 ? null : _b,
    _c = _a.children,
    children =
      _c === void 0
        ? function (context) {
            return null;
          }
        : _c;
  var service = react_1.useInterpret(ui_core_1.authMachine, {
    devTools: process.env.NODE_ENV === 'development',
  });
  var _d = react_1.useActor(service),
    state = _d[0],
    send = _d[1];
  var _e = hooks_1.useAmplify('Authenticator').components,
    // @ts-ignore How to tell the context that this may exist for this scope?
    _f = _e.ConfirmSignUp,
    // @ts-ignore How to tell the context that this may exist for this scope?
    ConfirmSignUp = _f === void 0 ? Authenticator.ConfirmSignUp : _f,
    // @ts-ignore How to tell the context that this may exist for this scope?
    _g = _e.SignIn,
    // @ts-ignore How to tell the context that this may exist for this scope?
    SignIn = _g === void 0 ? Authenticator.SignIn : _g,
    // @ts-ignore How to tell the context that this may exist for this scope?
    _h = _e.SignUp,
    // @ts-ignore How to tell the context that this may exist for this scope?
    SignUp = _h === void 0 ? Authenticator.SignUp : _h,
    Wrapper = _e.Wrapper;
  if (state.matches('authenticated')) {
    return children({ state: state, send: send });
  }
  return jsx_runtime_1.jsx(
    AuthenticatorContext_1.AuthenticatorContext.Provider,
    __assign(
      { value: service },
      {
        children: jsx_runtime_1.jsx(
          Wrapper,
          __assign(
            { className: className, 'data-amplify-authenticator': '' },
            {
              children: (function () {
                switch (true) {
                  case state.matches('idle'):
                    return null;
                  case state.matches('confirmSignUp'):
                    return jsx_runtime_1.jsx(ConfirmSignUp, {}, void 0);
                  case state.matches('confirmSignIn'):
                    return jsx_runtime_1.jsx(
                      ConfirmSignIn_1.ConfirmSignIn,
                      {},
                      void 0
                    );
                  case state.matches('setupTOTP'):
                    return jsx_runtime_1.jsx(SetupTOTP_1.SetupTOTP, {}, void 0);
                  case state.matches('signIn'):
                    return jsx_runtime_1.jsx(SignIn, {}, void 0);
                  case state.matches('signUp'):
                    return jsx_runtime_1.jsx(SignUp, {}, void 0);
                  case state.matches('forceNewPassword'):
                    return jsx_runtime_1.jsx(
                      ForceNewPassword_1.ForceNewPassword,
                      {},
                      void 0
                    );
                  case state.matches('resetPassword'):
                    return jsx_runtime_1.jsx(
                      ResetPassword_1.ResetPassword,
                      {},
                      void 0
                    );
                  case state.matches('confirmResetPassword'):
                    return jsx_runtime_1.jsx(
                      ResetPassword_1.ConfirmResetPassword,
                      {},
                      void 0
                    );
                  default:
                    console.warn('Unhandled Auth state', state);
                    return null;
                }
              })(),
            }
          ),
          void 0
        ),
      }
    ),
    void 0
  );
}
exports.Authenticator = Authenticator;
Authenticator.ConfirmSignUp = ConfirmSignUp_1.ConfirmSignUp;
Authenticator.SignIn = SignIn_1.SignIn;
Authenticator.SignUp = SignUp_1.SignUp;
function withAuthenticator(Component) {
  return function WrappedWithAuthenticator() {
    return jsx_runtime_1.jsx(
      Authenticator,
      {
        children: function (context) {
          return jsx_runtime_1.jsx(Component, __assign({}, context), void 0);
        },
      },
      void 0
    );
  };
}
exports.withAuthenticator = withAuthenticator;
//# sourceMappingURL=index.js.map
