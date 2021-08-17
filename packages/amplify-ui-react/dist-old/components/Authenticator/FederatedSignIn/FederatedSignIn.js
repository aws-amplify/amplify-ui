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
exports.FederatedSignIn = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var lodash_1 = require('lodash');
var hooks_1 = require('../../../hooks');
var ui_core_1 = require('@aws-amplify/ui-core');
var FederatedSignInButtons_1 = require('./FederatedSignInButtons');
var FederatedSignIn = function () {
  var context = hooks_1.useAuth()[0].context;
  var loginMechanisms = lodash_1.get(context, 'config.login_mechanisms');
  var amplifyNamespace = 'Authenticator.FederatedSignIn';
  var Flex = hooks_1.useAmplify(amplifyNamespace).components.Flex;
  var facebookButton = lodash_1.includes(loginMechanisms, 'facebook')
    ? jsx_runtime_1.jsx(
        FederatedSignInButtons_1.FederatedSignInButton,
        {
          text: 'Sign in with Facebook',
          provider: ui_core_1.FederatedIdentityProviders.Facebook,
        },
        void 0
      )
    : null;
  var googleButton = lodash_1.includes(loginMechanisms, 'google')
    ? jsx_runtime_1.jsx(
        FederatedSignInButtons_1.FederatedSignInButton,
        {
          text: 'Sign in with Google',
          provider: ui_core_1.FederatedIdentityProviders.Google,
        },
        void 0
      )
    : null;
  var amazonButton = lodash_1.includes(loginMechanisms, 'amazon')
    ? jsx_runtime_1.jsx(
        FederatedSignInButtons_1.FederatedSignInButton,
        {
          text: 'Sign in with Amazon',
          provider: ui_core_1.FederatedIdentityProviders.Amazon,
        },
        void 0
      )
    : null;
  var shouldShowFederatedSignIn =
    facebookButton || googleButton || amazonButton;
  var component = shouldShowFederatedSignIn
    ? jsx_runtime_1.jsxs(
        Flex,
        __assign(
          { direction: 'column' },
          { children: [googleButton, facebookButton, amazonButton] }
        ),
        void 0
      )
    : null;
  return component;
};
exports.FederatedSignIn = FederatedSignIn;
//# sourceMappingURL=FederatedSignIn.js.map
