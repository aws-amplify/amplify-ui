"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_2 = require("@xstate/react");
const ui_1 = require("@aws-amplify/ui");
const context_1 = require("../../context");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/authenticator/headless#useauthenticator-hook)
 */
function useAuthenticator(selector) {
    const context = react_1.default.useContext(context_1.AuthenticatorContext);
    if (!context) {
        throw new Error(constants_1.USE_AUTHENTICATOR_ERROR);
    }
    const { service } = context;
    const { send } = service;
    const xstateSelector = (0, react_1.useCallback)((state) => (Object.assign({}, (0, ui_1.getServiceFacade)({ send, state }))), [send]);
    const comparator = selector ? (0, utils_1.getComparator)(selector) : utils_1.defaultComparator;
    const facade = (0, react_2.useSelector)(service, xstateSelector, comparator);
    const { route, user } = facade, rest = tslib_1.__rest(facade, ["route", "user"]);
    // do not memoize output. `service.getSnapshot` reference remains stable preventing
    // `fields` from updating with current form state on value changes
    const serviceSnapshot = service.getSnapshot();
    // legacy `formFields` values required until form state is removed from state machine
    const fields = (0, react_1.useMemo)(() => (0, utils_1.getLegacyFields)(route, serviceSnapshot), [route, serviceSnapshot]);
    return Object.assign(Object.assign({}, rest), { getTotpSecretCode: (0, utils_1.getTotpSecretCodeCallback)(user), route,
        user,
        /** @deprecated For internal use only */
        fields, 
        /** @deprecated For internal use only */
        _state: serviceSnapshot, 
        /** @deprecated For internal use only */
        _send: send });
}
exports.default = useAuthenticator;
