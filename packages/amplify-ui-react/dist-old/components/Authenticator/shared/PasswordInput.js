'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PasswordInput = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var hooks_1 = require('../../../hooks');
var PasswordInput = function (props) {
  var amplifyNamespace = props.amplifyNamespace,
    _a = props.label,
    label = _a === void 0 ? 'Password' : _a,
    _b = props.placeholder,
    placeholder = _b === void 0 ? 'Password' : _b,
    _c = props.required,
    required = _c === void 0 ? true : _c;
  var _d = hooks_1.useAmplify(amplifyNamespace).components,
    Input = _d.Input,
    Text = _d.Text;
  return jsx_runtime_1.jsxs(
    jsx_runtime_1.Fragment,
    {
      children: [
        jsx_runtime_1.jsx(Text, { children: label }, void 0),
        jsx_runtime_1.jsx(
          Input,
          {
            autoComplete: 'password',
            name: 'password',
            placeholder: placeholder,
            required: required,
            type: 'password',
          },
          void 0
        ),
      ],
    },
    void 0
  );
};
exports.PasswordInput = PasswordInput;
//# sourceMappingURL=PasswordInput.js.map
