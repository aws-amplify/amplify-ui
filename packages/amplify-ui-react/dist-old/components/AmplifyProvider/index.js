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
exports.AmplifyProvider = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var AmplifyContext_1 = require('./AmplifyContext');
function AmplifyProvider(_a) {
  var children = _a.children,
    components = _a.components,
    theme = _a.theme;
  return jsx_runtime_1.jsx(
    AmplifyContext_1.AmplifyContext.Provider,
    __assign(
      { value: { components: components, theme: theme } },
      {
        children: jsx_runtime_1.jsx(
          'div',
          __assign({ 'data-amplify-theme': '' }, { children: children }),
          void 0
        ),
      }
    ),
    void 0
  );
}
exports.AmplifyProvider = AmplifyProvider;
//# sourceMappingURL=index.js.map
