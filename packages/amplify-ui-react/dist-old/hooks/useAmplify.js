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
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.useAmplify = void 0;
var react_1 = require('react');
var AmplifyContext_1 = require('../components/AmplifyProvider/AmplifyContext');
var primitives = __importStar(require('../primitives'));
function useAmplify(namespace) {
  var _a = react_1.useContext(AmplifyContext_1.AmplifyContext),
    _b = _a.components,
    components = _b === void 0 ? {} : _b,
    theme = _a.theme;
  var customComponents = Object.entries(components).reduce(function (acc, _a) {
    var namespaced = _a[0],
      Component = _a[1];
    // `Authenticator.SignIn.Button` => `Button`
    var name = namespaced.split('.').pop();
    // TODO `Authenticator.Button` should also override `Authenticator.SignIn.Button`? Maybe not...
    // But wait, `Input` should override `Authenticator.Input`!
    // if (namespaced === `${namespace}.${name}`) {
    // TODO Support decorator pattern (e.g. `acc[name] = Component(InputPrimitive)`)
    // TODO Pass in the previous component, not necessarily a primitive (e.g. SignIn?)
    acc[name] = Component;
    // }
    return acc;
  }, {});
  // TODO `theme` should override `style` or `className`?
  // const styledComponents = Object.entries(components).reduce(
  //   (acc, [name, Component]) => {
  //     // e.g. `Authenticator.Input` || `Input`
  //     // TODO Is this needed anymore? Maybe so for custom tailwind overrides!
  //     const className =
  //       custom.theme?.[`${namespace}.${name}`] || custom.theme?.[name];
  //     const namespaced = `${namespace}.${name}`;
  //     acc[name] =
  //       custom.components?.[namespaced] ||
  //       custom.components?.[name] ||
  //       Component;
  //     return acc;
  //   },
  //   {}
  // );
  return {
    components: __assign(__assign({}, primitives), customComponents),
    theme: theme,
  };
}
exports.useAmplify = useAmplify;
//# sourceMappingURL=useAmplify.js.map
