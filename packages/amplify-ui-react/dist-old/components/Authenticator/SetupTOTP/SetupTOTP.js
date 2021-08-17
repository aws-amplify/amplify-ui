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
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.SetupTOTP = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var react_1 = require('react');
var qrcode_1 = __importDefault(require('qrcode'));
var hooks_1 = require('../../../hooks');
var aws_amplify_1 = require('aws-amplify');
var shared_1 = require('../shared');
var logger = new aws_amplify_1.Logger('SetupTOTP-logger');
var SetupTOTP = function () {
  var _a = react_1.useState(true),
    isLoading = _a[0],
    setIsLoading = _a[1];
  var _b = react_1.useState(),
    qrCode = _b[0],
    setQrCode = _b[1];
  var amplifyNamespace = 'Authenticator.ConfirmSignIn';
  var _c = hooks_1.useAmplify(amplifyNamespace).components,
    Fieldset = _c.Fieldset,
    Form = _c.Form,
    Heading = _c.Heading,
    Image = _c.Image,
    Label = _c.Label;
  var _d = hooks_1.useAuth(),
    state = _d[0],
    send = _d[1];
  var isPending = state.matches('confirmSignIn.pending');
  var generateQRCode = function (user) {
    return __awaiter(void 0, void 0, void 0, function () {
      var secretKey, issuer, totpCode, qrCodeImageSource, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 3, 4, 5]);
            return [4 /*yield*/, aws_amplify_1.Auth.setupTOTP(user)];
          case 1:
            secretKey = _a.sent();
            issuer = 'AWSCognito';
            totpCode =
              'otpauth://totp/' +
              issuer +
              ':' +
              user.username +
              '?secret=' +
              secretKey +
              '&issuer=' +
              issuer;
            return [4 /*yield*/, qrcode_1.default.toDataURL(totpCode)];
          case 2:
            qrCodeImageSource = _a.sent();
            setQrCode(qrCodeImageSource);
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            logger.error(error_1);
            return [3 /*break*/, 5];
          case 4:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  react_1.useEffect(function () {
    var user = state.context.user;
    if (!user) {
      return;
    }
    generateQRCode(user);
  }, []);
  var footerProps = {
    amplifyNamespace: amplifyNamespace,
    isPending: isPending,
    send: send,
  };
  return jsx_runtime_1.jsxs(
    Form,
    __assign(
      {
        'data-amplify-authenticator-setup-totp': '',
        method: 'post',
        onSubmit: function (event) {
          event.preventDefault();
          var formData = new FormData(event.target);
          send({
            type: 'SUBMIT',
            // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
            data: Object.fromEntries(formData),
          });
        },
      },
      {
        children: [
          jsx_runtime_1.jsx(
            Heading,
            __assign({ level: 1 }, { children: 'Setup TOTP' }),
            void 0
          ),
          jsx_runtime_1.jsx(
            Fieldset,
            __assign(
              { disabled: isPending },
              {
                children: jsx_runtime_1.jsxs(
                  Label,
                  __assign(
                    { 'data-amplify-confirmationcode': true },
                    {
                      children: [
                        isLoading
                          ? jsx_runtime_1.jsx(
                              'p',
                              { children: 'Loading..' },
                              void 0
                            )
                          : jsx_runtime_1.jsx(
                              Image,
                              {
                                'data-amplify-qrcode': true,
                                src: qrCode,
                                alt: 'qr code',
                              },
                              void 0
                            ),
                        jsx_runtime_1.jsx(
                          shared_1.ConfirmationCodeInput,
                          { amplifyNamespace: amplifyNamespace },
                          void 0
                        ),
                      ],
                    }
                  ),
                  void 0
                ),
              }
            ),
            void 0
          ),
          jsx_runtime_1.jsx(
            shared_1.ConfirmSignInFooter,
            __assign({}, footerProps),
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.SetupTOTP = SetupTOTP;
//# sourceMappingURL=SetupTOTP.js.map
