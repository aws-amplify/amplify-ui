'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useAuth = void 0;
var react_1 = require('@xstate/react');
var react_2 = require('react');
var AuthenticatorContext_1 = require('../components/Authenticator/AuthenticatorContext');
function useAuth() {
  return react_1.useActor(
    react_2.useContext(AuthenticatorContext_1.AuthenticatorContext)
  );
}
exports.useAuth = useAuth;
//# sourceMappingURL=useAuth.js.map
