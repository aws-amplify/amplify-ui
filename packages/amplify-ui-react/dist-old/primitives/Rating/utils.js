'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.isIconMixed = exports.isIconEmpty = exports.isIconFilled = void 0;
var isIconFilled = function (currentIconIndex, ratingValue) {
  if (currentIconIndex <= ratingValue) return true;
  return false;
};
exports.isIconFilled = isIconFilled;
var isIconEmpty = function (currentIconIndex, ratingValue) {
  if (currentIconIndex - 1 >= ratingValue) return true;
  return false;
};
exports.isIconEmpty = isIconEmpty;
var isIconMixed = function (currentIconIndex, ratingValue) {
  if (currentIconIndex > ratingValue && currentIconIndex - 1 < ratingValue) {
    return true;
  }
  return false;
};
exports.isIconMixed = isIconMixed;
//# sourceMappingURL=utils.js.map
