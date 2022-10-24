"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatorContext = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
/**
 * AuthenticatorContext serves static reference to the auth machine service.
 *
 * https://xstate.js.org/docs/recipes/react.html#context-provider
 */
exports.AuthenticatorContext = react_1.default.createContext(null);
