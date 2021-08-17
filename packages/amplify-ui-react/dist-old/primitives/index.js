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
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Wrapper =
  exports.ErrorText =
  exports.Spacer =
  exports.Label =
  exports.Input =
  exports.Header =
  exports.Form =
  exports.Main =
  exports.Footer =
  exports.Fieldset =
  exports.Box =
    void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
__exportStar(require('./Badge'), exports);
__exportStar(require('./Button'), exports);
__exportStar(require('./Card'), exports);
__exportStar(require('./Collection'), exports);
__exportStar(require('./Divider'), exports);
__exportStar(require('./Flex'), exports);
__exportStar(require('./Heading'), exports);
__exportStar(require('./Icon'), exports);
__exportStar(require('./Image'), exports);
__exportStar(require('./Pagination'), exports);
__exportStar(require('./Placeholder'), exports);
__exportStar(require('./Rating'), exports);
__exportStar(require('./Text'), exports);
__exportStar(require('./View'), exports);
__exportStar(require('./shared'), exports);
__exportStar(require('./types'), exports);
function Box(props) {
  return jsx_runtime_1.jsx(
    'div',
    __assign({ 'data-amplify-box': '' }, props),
    void 0
  );
}
exports.Box = Box;
function Fieldset(props) {
  return jsx_runtime_1.jsx(
    'fieldset',
    __assign({ 'data-amplify-fieldset': '' }, props),
    void 0
  );
}
exports.Fieldset = Fieldset;
function Footer(props) {
  return jsx_runtime_1.jsx(
    'footer',
    __assign({ 'data-amplify-footer': '' }, props),
    void 0
  );
}
exports.Footer = Footer;
function Main(props) {
  return jsx_runtime_1.jsx(
    'main',
    __assign({ 'data-amplify-main': '' }, props),
    void 0
  );
}
exports.Main = Main;
function Form(props) {
  return jsx_runtime_1.jsx(
    'form',
    __assign({ 'data-amplify-form': '' }, props),
    void 0
  );
}
exports.Form = Form;
function Header(props) {
  return jsx_runtime_1.jsx(
    'header',
    __assign({ 'data-amplify-header': '' }, props),
    void 0
  );
}
exports.Header = Header;
function Input(props) {
  return jsx_runtime_1.jsx(
    'input',
    __assign({ 'data-amplify-input': '' }, props),
    void 0
  );
}
exports.Input = Input;
function Label(props) {
  return jsx_runtime_1.jsx(
    'label',
    __assign({ 'data-amplify-label': '' }, props),
    void 0
  );
}
exports.Label = Label;
function Spacer(props) {
  return jsx_runtime_1.jsx(
    'span',
    __assign({ 'data-amplify-spacer': '' }, props),
    void 0
  );
}
exports.Spacer = Spacer;
function ErrorText(props) {
  return props.children
    ? jsx_runtime_1.jsx(
        'span',
        __assign({ 'data-amplify-error': '' }, props),
        void 0
      )
    : null;
}
exports.ErrorText = ErrorText;
function Wrapper(props) {
  return jsx_runtime_1.jsx(
    'div',
    __assign({ 'data-amplify-wrapper': '' }, props),
    void 0
  );
}
exports.Wrapper = Wrapper;
//# sourceMappingURL=index.js.map
