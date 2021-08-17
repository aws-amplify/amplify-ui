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
exports.ConfirmationCodeInput = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var hooks_1 = require('../../../hooks');
var ConfirmationCodeInput = function (props) {
  var amplifyNamespace = props.amplifyNamespace,
    errorText = props.errorText,
    _a = props.label,
    label = _a === void 0 ? 'Code *' : _a,
    _b = props.placeholder,
    placeholder = _b === void 0 ? 'Code' : _b,
    _c = props.required,
    required = _c === void 0 ? true : _c;
  var _d = hooks_1.useAmplify(amplifyNamespace).components,
    Input = _d.Input,
    Text = _d.Text;
  var errorTextComponent = errorText
    ? jsx_runtime_1.jsx(
        Text,
        __assign(
          {
            'data-amplify-confirmation-code-error-text': true,
            variant: 'error',
          },
          { children: errorText }
        ),
        void 0
      )
    : null;
  return jsx_runtime_1.jsxs(
    jsx_runtime_1.Fragment,
    {
      children: [
        jsx_runtime_1.jsx(Text, { children: label }, void 0),
        jsx_runtime_1.jsx(
          Input,
          {
            autoComplete: 'one-time-code',
            name: 'confirmation_code',
            placeholder: placeholder,
            required: required,
            type: 'text',
          },
          void 0
        ),
        errorTextComponent,
      ],
    },
    void 0
  );
};
exports.ConfirmationCodeInput = ConfirmationCodeInput;
//# sourceMappingURL=ConfirmationCodeInput.js.map
