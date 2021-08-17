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
exports.Image = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var shared_1 = require('../shared');
var View_1 = require('../View');
var Image = function (props) {
  return jsx_runtime_1.jsx(
    View_1.View,
    __assign(
      { as: 'img', className: shared_1.ComponentClassNames.Image },
      props
    ),
    void 0
  );
};
exports.Image = Image;
//# sourceMappingURL=Image.js.map
