"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_2 = require("@xstate/react");
const ui_1 = require("@aws-amplify/ui");
const AuthenticatorContext_1 = require("./AuthenticatorContext");
function AuthenticatorProvider({ children, }) {
    /**
     * Based on use cases, developer might already have added another Provider
     * outside Authenticator. In that case, we sync the two providers by just
     * passing the parent value.
     *
     * TODO(BREAKING): enforce only one provider in App tree
     */
    const parentProviderVal = (0, react_1.useContext)(AuthenticatorContext_1.AuthenticatorContext);
    const service = (0, react_2.useInterpret)(ui_1.createAuthenticatorMachine);
    const value = (0, react_1.useMemo)(() => (!parentProviderVal ? { service } : parentProviderVal), [parentProviderVal, service]);
    const { service: activeService } = value;
    (0, react_1.useEffect)(() => {
        const unsubscribe = (0, ui_1.listenToAuthHub)(activeService);
        return unsubscribe;
    }, [activeService]);
    return (react_1.default.createElement(AuthenticatorContext_1.AuthenticatorContext.Provider, { value: value }, children));
}
exports.default = AuthenticatorProvider;
