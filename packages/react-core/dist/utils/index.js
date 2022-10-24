"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areEmptyObjects = exports.areEmptyArrays = void 0;
const tslib_1 = require("tslib");
const isEmpty_1 = tslib_1.__importDefault(require("lodash/isEmpty"));
const isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
function isEmptyArray(value) {
    return Array.isArray(value) && (0, isEmpty_1.default)(value);
}
function areEmptyArrays(...values) {
    return values.every(isEmptyArray);
}
exports.areEmptyArrays = areEmptyArrays;
function isEmptyObject(value) {
    return (0, isObject_1.default)(value) && !Array.isArray(value) && (0, isEmpty_1.default)(value);
}
function areEmptyObjects(...values) {
    return values.every(isEmptyObject);
}
exports.areEmptyObjects = areEmptyObjects;
