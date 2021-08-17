'use strict';
/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
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
Object.defineProperty(exports, '__esModule', { value: true });
exports.SignUp = void 0;
var React = __importStar(require('react'));
var core_1 = require('@aws-amplify/core');
var auth_1 = require('@aws-amplify/auth');
var AuthPiece_1 = require('./AuthPiece');
var Amplify_UI_Components_React_1 = require('../Amplify-UI/Amplify-UI-Components-React');
var data_test_attributes_1 = require('../Amplify-UI/data-test-attributes');
var country_dial_codes_1 = require('./common/country-dial-codes');
var default_sign_up_fields_1 = require('./common/default-sign-up-fields');
var types_1 = require('./common/types');
var PhoneField_1 = require('./PhoneField');
var logger = new core_1.ConsoleLogger('SignUp');
var SignUp = /** @class */ (function (_super) {
  __extends(SignUp, _super);
  function SignUp(props) {
    var _this = _super.call(this, props) || this;
    _this.state = { requestPending: false };
    _this._validAuthStates = ['signUp'];
    _this.signUp = _this.signUp.bind(_this);
    _this.sortFields = _this.sortFields.bind(_this);
    _this.getDefaultDialCode = _this.getDefaultDialCode.bind(_this);
    _this.checkCustomSignUpFields = _this.checkCustomSignUpFields.bind(_this);
    _this.needPrefix = _this.needPrefix.bind(_this);
    _this.header =
      _this.props && _this.props.signUpConfig && _this.props.signUpConfig.header
        ? _this.props.signUpConfig.header
        : 'Create a new account';
    var _a = (_this.props || {}).usernameAttributes,
      usernameAttributes =
        _a === void 0 ? types_1.UsernameAttributes.USERNAME : _a;
    if (usernameAttributes === types_1.UsernameAttributes.EMAIL) {
      _this.defaultSignUpFields =
        default_sign_up_fields_1.signUpWithEmailFields;
    } else if (usernameAttributes === types_1.UsernameAttributes.PHONE_NUMBER) {
      _this.defaultSignUpFields =
        default_sign_up_fields_1.signUpWithPhoneNumberFields;
    } else {
      _this.defaultSignUpFields =
        default_sign_up_fields_1.signUpWithUsernameFields;
    }
    return _this;
  }
  SignUp.prototype.validate = function () {
    var _this = this;
    var invalids = [];
    this.signUpFields.map(function (el) {
      if (el.key !== 'phone_number') {
        if (el.required && !_this.inputs[el.key]) {
          el.invalid = true;
          invalids.push(el.label);
        } else {
          el.invalid = false;
        }
      } else {
        if (el.required && !_this.phone_number) {
          el.invalid = true;
          invalids.push(el.label);
        } else {
          el.invalid = false;
        }
      }
    });
    return invalids;
  };
  SignUp.prototype.sortFields = function () {
    var _this = this;
    if (
      this.props.signUpConfig &&
      this.props.signUpConfig.hiddenDefaults &&
      this.props.signUpConfig.hiddenDefaults.length > 0
    ) {
      this.defaultSignUpFields = this.defaultSignUpFields.filter(function (d) {
        return !_this.props.signUpConfig.hiddenDefaults.includes(d.key);
      });
    }
    if (this.checkCustomSignUpFields()) {
      if (
        !this.props.signUpConfig ||
        !this.props.signUpConfig.hideAllDefaults
      ) {
        // see if fields passed to component should override defaults
        this.defaultSignUpFields.forEach(function (f) {
          var matchKey = _this.signUpFields.findIndex(function (d) {
            return d.key === f.key;
          });
          if (matchKey === -1) {
            _this.signUpFields.push(f);
          }
        });
      }
      /*
                  sort fields based on following rules:
                  1. Fields with displayOrder are sorted before those without displayOrder
                  2. Fields with conflicting displayOrder are sorted alphabetically by key
                  3. Fields without displayOrder are sorted alphabetically by key
                */
      this.signUpFields.sort(function (a, b) {
        if (a.displayOrder && b.displayOrder) {
          if (a.displayOrder < b.displayOrder) {
            return -1;
          } else if (a.displayOrder > b.displayOrder) {
            return 1;
          } else {
            if (a.key < b.key) {
              return -1;
            } else {
              return 1;
            }
          }
        } else if (!a.displayOrder && b.displayOrder) {
          return 1;
        } else if (a.displayOrder && !b.displayOrder) {
          return -1;
        } else if (!a.displayOrder && !b.displayOrder) {
          if (a.key < b.key) {
            return -1;
          } else {
            return 1;
          }
        }
      });
    } else {
      this.signUpFields = this.defaultSignUpFields;
    }
  };
  SignUp.prototype.needPrefix = function (key) {
    var field = this.signUpFields.find(function (e) {
      return e.key === key;
    });
    if (key.indexOf('custom:') !== 0) {
      return field.custom;
    } else if (key.indexOf('custom:') === 0 && field.custom === false) {
      logger.warn(
        'Custom prefix prepended to key but custom field flag is set to false; retaining manually entered prefix'
      );
    }
    return null;
  };
  SignUp.prototype.getDefaultDialCode = function () {
    return this.props.signUpConfig &&
      this.props.signUpConfig.defaultCountryCode &&
      country_dial_codes_1.countryDialCodes.indexOf(
        '+' + this.props.signUpConfig.defaultCountryCode
      ) !== -1
      ? '+' + this.props.signUpConfig.defaultCountryCode
      : '+1';
  };
  SignUp.prototype.checkCustomSignUpFields = function () {
    return (
      this.props.signUpConfig &&
      this.props.signUpConfig.signUpFields &&
      this.props.signUpConfig.signUpFields.length > 0
    );
  };
  SignUp.prototype.signUp = function () {
    return __awaiter(this, void 0, void 0, function () {
      var validation,
        signup_info,
        inputKeys,
        inputVals,
        labelCheck,
        data,
        err_1;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.setState({ requestPending: true });
            if (!this.inputs.dial_code) {
              this.inputs.dial_code = this.getDefaultDialCode();
            }
            validation = this.validate();
            if (validation && validation.length > 0) {
              this.setState({ requestPending: false });
              return [
                2 /*return*/,
                this.error(
                  'The following fields need to be filled out: ' +
                    validation.join(', ')
                ),
              ];
            }
            if (!auth_1.Auth || typeof auth_1.Auth.signUp !== 'function') {
              throw new Error(
                'No Auth module found, please ensure @aws-amplify/auth is imported'
              );
            }
            signup_info = {
              username: this.inputs.username,
              password: this.inputs.password,
              attributes: {},
            };
            inputKeys = Object.keys(this.inputs);
            inputVals = Object.values(this.inputs);
            inputKeys.forEach(function (key, index) {
              if (
                !['username', 'password', 'checkedValue', 'dial_code'].includes(
                  key
                )
              ) {
                if (
                  key !== 'phone_line_number' &&
                  key !== 'dial_code' &&
                  key !== 'error'
                ) {
                  var newKey =
                    '' + (_this.needPrefix(key) ? 'custom:' : '') + key;
                  signup_info.attributes[newKey] = inputVals[index];
                }
              }
            });
            if (this.phone_number)
              signup_info.attributes['phone_number'] = this.phone_number;
            labelCheck = false;
            this.signUpFields.forEach(function (field) {
              if (field.label === _this.getUsernameLabel()) {
                logger.debug(
                  'Changing the username to the value of ' + field.label
                );
                signup_info.username =
                  signup_info.attributes[field.key] || signup_info.username;
                labelCheck = true;
              }
            });
            if (!labelCheck && !signup_info.username) {
              // if the customer customized the username field in the sign up form
              // He needs to either set the key of that field to 'username'
              // Or make the label of the field the same as the 'usernameAttributes'
              throw new Error(
                "Couldn't find the label: " +
                  this.getUsernameLabel() +
                  ', in sign up fields according to usernameAttributes!'
              );
            }
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [4 /*yield*/, auth_1.Auth.signUp(signup_info)];
          case 2:
            data = _a.sent();
            // @ts-ignore
            this.changeState('confirmSignUp', data.user.username);
            return [3 /*break*/, 5];
          case 3:
            err_1 = _a.sent();
            this.error(err_1);
            return [3 /*break*/, 5];
          case 4:
            this.setState({ requestPending: false });
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  SignUp.prototype.showComponent = function (theme) {
    var _this = this;
    var hide = this.props.hide;
    if (hide && hide.includes(SignUp)) {
      return null;
    }
    if (this.checkCustomSignUpFields()) {
      this.signUpFields = this.props.signUpConfig.signUpFields;
    }
    this.sortFields();
    return React.createElement(
      Amplify_UI_Components_React_1.FormSection,
      { theme: theme, 'data-test': data_test_attributes_1.auth.signUp.section },
      React.createElement(
        Amplify_UI_Components_React_1.SectionHeader,
        {
          theme: theme,
          'data-test': data_test_attributes_1.auth.signUp.headerSection,
        },
        core_1.I18n.get(this.header)
      ),
      React.createElement(
        Amplify_UI_Components_React_1.SectionBody,
        {
          theme: theme,
          'data-test': data_test_attributes_1.auth.signUp.bodySection,
        },
        this.signUpFields.map(function (field) {
          return field.key !== 'phone_number'
            ? React.createElement(
                Amplify_UI_Components_React_1.FormField,
                { theme: theme, key: field.key },
                field.required
                  ? React.createElement(
                      Amplify_UI_Components_React_1.InputLabel,
                      { theme: theme },
                      core_1.I18n.get(field.label),
                      ' *'
                    )
                  : React.createElement(
                      Amplify_UI_Components_React_1.InputLabel,
                      { theme: theme },
                      core_1.I18n.get(field.label)
                    ),
                React.createElement(Amplify_UI_Components_React_1.Input, {
                  autoFocus:
                    _this.signUpFields.findIndex(function (f) {
                      return f.key === field.key;
                    }) === 0,
                  placeholder: core_1.I18n.get(field.placeholder),
                  theme: theme,
                  type: field.type,
                  name: field.key,
                  key: field.key,
                  onChange: _this.handleInputChange,
                  'data-test':
                    data_test_attributes_1.auth.signUp.nonPhoneNumberInput,
                })
              )
            : React.createElement(PhoneField_1.PhoneField, {
                theme: theme,
                required: field.required,
                defaultDialCode: _this.getDefaultDialCode(),
                label: field.label,
                placeholder: field.placeholder,
                onChangeText: _this.onPhoneNumberChanged,
                key: 'phone_number',
              });
        })
      ),
      React.createElement(
        Amplify_UI_Components_React_1.SectionFooter,
        {
          theme: theme,
          'data-test': data_test_attributes_1.auth.signUp.footerSection,
        },
        React.createElement(
          Amplify_UI_Components_React_1.SectionFooterPrimaryContent,
          { theme: theme },
          React.createElement(
            Amplify_UI_Components_React_1.Button,
            {
              disabled: this.state.requestPending,
              onClick: this.signUp,
              theme: theme,
              'data-test':
                data_test_attributes_1.auth.signUp.createAccountButton,
            },
            core_1.I18n.get('Create Account')
          )
        ),
        React.createElement(
          Amplify_UI_Components_React_1.SectionFooterSecondaryContent,
          { theme: theme },
          core_1.I18n.get('Have an account? '),
          React.createElement(
            Amplify_UI_Components_React_1.Link,
            {
              theme: theme,
              onClick: function () {
                return _this.changeState('signIn');
              },
              'data-test': data_test_attributes_1.auth.signUp.signInLink,
            },
            core_1.I18n.get('Sign in')
          )
        )
      )
    );
  };
  return SignUp;
})(AuthPiece_1.AuthPiece);
exports.SignUp = SignUp;
/**
 * @deprecated use named import
 */
exports.default = SignUp;
//# sourceMappingURL=SignUp.js.map
