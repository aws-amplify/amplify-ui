(window.webpackJsonp = window.webpackJsonp || []).push([
  [194],
  {
    1712: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_confirm_sign_in',
          function () {
            return AmplifyConfirmSignIn;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_confirm_sign_up',
          function () {
            return AmplifyConfirmSignUp;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_forgot_password',
          function () {
            return AmplifyForgotPassword;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_require_new_password',
          function () {
            return AmplifyRequireNewPassword;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_sign_in',
          function () {
            return AmplifySignIn;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_sign_up',
          function () {
            return AmplifySignUp;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_verify_contact',
          function () {
            return AmplifyVerifyContact;
          }
        );
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(19),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(164),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(104),
        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(98),
        _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(406),
        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(15),
        _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(62),
        _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(413),
        _auth_helpers_bd096ca7_js__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(1772),
        __awaiter = function (thisArg, _arguments, P, generator) {
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
                step(generator.throw(value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : (function adopt(value) {
                    return value instanceof P
                      ? value
                      : new P(function (resolve) {
                          resolve(value);
                        });
                  })(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        },
        __generator = function (thisArg, body) {
          var f,
            y,
            t,
            g,
            _ = {
              label: 0,
              sent: function () {
                if (1 & t[0]) throw t[1];
                return t[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            'function' == typeof Symbol &&
              (g[Symbol.iterator] = function () {
                return this;
              }),
            g
          );
          function verb(n) {
            return function (v) {
              return (function step(op) {
                if (f) throw new TypeError('Generator is already executing.');
                for (; _; )
                  try {
                    if (
                      ((f = 1),
                      y &&
                        (t =
                          2 & op[0]
                            ? y.return
                            : op[0]
                            ? y.throw || ((t = y.return) && t.call(y), 0)
                            : y.next) &&
                        !(t = t.call(y, op[1])).done)
                    )
                      return t;
                    switch (
                      ((y = 0), t && (op = [2 & op[0], t.value]), op[0])
                    ) {
                      case 0:
                      case 1:
                        t = op;
                        break;
                      case 4:
                        return _.label++, { value: op[1], done: !1 };
                      case 5:
                        _.label++, (y = op[1]), (op = [0]);
                        continue;
                      case 7:
                        (op = _.ops.pop()), _.trys.pop();
                        continue;
                      default:
                        if (
                          !((t = _.trys),
                          (t = t.length > 0 && t[t.length - 1]) ||
                            (6 !== op[0] && 2 !== op[0]))
                        ) {
                          _ = 0;
                          continue;
                        }
                        if (
                          3 === op[0] &&
                          (!t || (op[1] > t[0] && op[1] < t[3]))
                        ) {
                          _.label = op[1];
                          break;
                        }
                        if (6 === op[0] && _.label < t[1]) {
                          (_.label = t[1]), (t = op);
                          break;
                        }
                        if (t && _.label < t[2]) {
                          (_.label = t[2]), _.ops.push(op);
                          break;
                        }
                        t[2] && _.ops.pop(), _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                  } catch (e) {
                    (op = [6, e]), (y = 0);
                  } finally {
                    f = t = 0;
                  }
                if (5 & op[0]) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: !0 };
              })([n, v]);
            };
          }
        },
        __spreadArrays = function () {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          var r = Array(s),
            k = 0;
          for (i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        },
        AmplifyConfirmSignIn = (function () {
          function class_1(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.handleSubmit = function (event) {
                return _this.confirm(event);
              }),
              (this.headerText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.CONFIRM_SMS_CODE),
              (this.submitButtonText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.CONFIRM),
              (this.handleAuthStateChange =
                _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.d),
              (this.formFields = [
                {
                  type: 'code',
                  required: !0,
                  handleInputChange: function (event) {
                    return _this.handleCodeChange(event);
                  },
                },
              ]),
              (this.mfaOption =
                _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__.c.SMS),
              (this.loading = !1);
          }
          return (
            (class_1.prototype.componentWillLoad = function () {
              this.setup();
            }),
            (class_1.prototype.userHandler = function () {
              this.setup();
            }),
            (class_1.prototype.setup = function () {
              this.user &&
                this.user.challengeName ===
                  _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__.b
                    .SoftwareTokenMFA &&
                ((this.mfaOption =
                  _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__.c.TOTP),
                this.headerText ===
                  _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                    .CONFIRM_SMS_CODE &&
                  (this.headerText =
                    _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.CONFIRM_TOTP_CODE));
            }),
            (class_1.prototype.handleCodeChange = function (event) {
              this.code = event.target.value;
            }),
            (class_1.prototype.confirm = function (event) {
              return __awaiter(this, void 0, void 0, function () {
                var mfaType, error_1;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (
                        (event && event.preventDefault(),
                        (mfaType =
                          this.user.challengeName ===
                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__.b
                            .SoftwareTokenMFA
                            ? _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__
                                .b.SoftwareTokenMFA
                            : null),
                        !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a ||
                          'function' !=
                            typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__
                              .a.confirmSignIn)
                      )
                        throw new Error(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.d
                        );
                      (this.loading = !0), (_a.label = 1);
                    case 1:
                      return (
                        _a.trys.push([1, 4, 5, 6]),
                        [
                          4,
                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a.confirmSignIn(
                            this.user,
                            this.code,
                            mfaType
                          ),
                        ]
                      );
                    case 2:
                      return (
                        _a.sent(),
                        [
                          4,
                          Object(
                            _auth_helpers_bd096ca7_js__WEBPACK_IMPORTED_MODULE_9__.a
                          )(this.user, this.handleAuthStateChange),
                        ]
                      );
                    case 3:
                      return _a.sent(), [3, 6];
                    case 4:
                      return (
                        (error_1 = _a.sent()),
                        Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.a
                        )(error_1),
                        [3, 6]
                      );
                    case 5:
                      return (this.loading = !1), [7];
                    case 6:
                      return [2];
                  }
                });
              });
            }),
            (class_1.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.b,
                null,
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'amplify-form-section',
                  {
                    headerText:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        this.headerText
                      ),
                    handleSubmit: this.handleSubmit,
                    submitButtonText:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        this.submitButtonText
                      ),
                    loading: this.loading,
                    secondaryFooterContent: Object(
                      _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                    )(
                      'span',
                      null,
                      Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                        'amplify-button',
                        {
                          variant: 'anchor',
                          onClick: function () {
                            return _this.handleAuthStateChange(
                              _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__
                                .a.SignIn
                            );
                          },
                        },
                        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                          _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                            .a.BACK_TO_SIGN_IN
                        )
                      )
                    ),
                  },
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-auth-fields',
                    { formFields: this.formFields }
                  )
                )
              );
            }),
            Object.defineProperty(class_1, 'watchers', {
              get: function () {
                return { user: ['userHandler'] };
              },
              enumerable: !1,
              configurable: !0,
            }),
            class_1
          );
        })(),
        AmplifyConfirmSignUp = (function () {
          function class_2(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.handleSubmit = function (event) {
                return _this.confirmSignUp(event);
              }),
              (this.headerText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.CONFIRM_SIGN_UP_HEADER_TEXT),
              (this.submitButtonText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.CONFIRM_SIGN_UP_SUBMIT_BUTTON_TEXT),
              (this.formFields = []),
              (this.handleAuthStateChange =
                _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.d),
              (this.usernameAlias = 'username'),
              (this.loading = !1),
              (this.newFormFields = []),
              (this.phoneNumber = {
                countryDialCodeValue:
                  _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.q,
                phoneNumberValue: null,
              });
          }
          return (
            (class_2.prototype.componentWillLoad = function () {
              this.setup();
            }),
            (class_2.prototype.formFieldsHandler = function () {
              this.buildFormFields();
            }),
            (class_2.prototype.userHandler = function () {
              this.setup();
            }),
            (class_2.prototype.setup = function () {
              (this.userInput = this.user && this.user.username),
                (this._signUpAttrs = this.user && this.user.signUpAttrs),
                Object(_helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.c)(
                  this.usernameAlias
                ),
                this.buildFormFields();
            }),
            (class_2.prototype.buildDefaultFormFields = function () {
              var _this = this;
              this.newFormFields = [
                {
                  type: '' + this.usernameAlias,
                  required: !0,
                  handleInputChange: this.handleFormFieldInputChange(
                    '' + this.usernameAlias
                  ),
                  value: this.userInput,
                  disabled: !!this.userInput,
                },
                {
                  type: 'code',
                  label: _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                    _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                      .CONFIRM_SIGN_UP_CODE_LABEL
                  ),
                  placeholder:
                    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                      _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                        .CONFIRM_SIGN_UP_CODE_PLACEHOLDER
                    ),
                  required: !0,
                  hint: Object(
                    _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                  )(
                    'div',
                    null,
                    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                      _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                        .CONFIRM_SIGN_UP_LOST_CODE
                    ),
                    ' ',
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-button',
                      {
                        variant: 'anchor',
                        onClick: function () {
                          return _this.resendConfirmCode();
                        },
                      },
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                          .CONFIRM_SIGN_UP_RESEND_CODE
                      )
                    )
                  ),
                  handleInputChange: this.handleFormFieldInputChange('code'),
                },
              ];
            }),
            (class_2.prototype.buildFormFields = function () {
              var _this = this;
              if (0 === this.formFields.length) this.buildDefaultFormFields();
              else {
                var newFields_1 = [];
                this.formFields.forEach(function (field) {
                  var newField = Object.assign({}, field);
                  'code' === newField.type &&
                    (newField.hint = Object(
                      _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.g
                    )(newField)
                      ? Object(
                          _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                        )(
                          'div',
                          null,
                          _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                            _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                              .a.CONFIRM_SIGN_UP_LOST_CODE
                          ),
                          ' ',
                          Object(
                            _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                          )(
                            'amplify-button',
                            {
                              variant: 'anchor',
                              onClick: function () {
                                return _this.resendConfirmCode();
                              },
                            },
                            _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                              _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                                .a.CONFIRM_SIGN_UP_RESEND_CODE
                            )
                          )
                        )
                      : newField.hint),
                    (newField.handleInputChange = function (event) {
                      return _this.handleFormFieldInputWithCallback(
                        event,
                        field
                      );
                    }),
                    newFields_1.push(newField);
                }),
                  (this.newFormFields = newFields_1);
              }
            }),
            (class_2.prototype.handleFormFieldInputChange = function (
              fieldType
            ) {
              var _this = this;
              switch (fieldType) {
                case 'username':
                case 'email':
                  return function (event) {
                    return (_this.userInput = event.target.value);
                  };
                case 'phone_number':
                  return function (event) {
                    return Object(
                      _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.f
                    )(event, _this.phoneNumber);
                  };
                case 'code':
                  return function (event) {
                    return (_this.code = event.target.value);
                  };
                default:
                  return;
              }
            }),
            (class_2.prototype.setFieldValue = function (field) {
              switch (field.type) {
                case 'username':
                case 'email':
                  void 0 === field.value
                    ? (this.userInput = '')
                    : (this.userInput = field.value);
                  break;
                case 'phone_number':
                  field.dialCode &&
                    (this.phoneNumber.countryDialCodeValue = field.dialCode),
                    (this.phoneNumber.phoneNumberValue = field.value);
              }
            }),
            (class_2.prototype.handleFormFieldInputWithCallback = function (
              event,
              field
            ) {
              (field.handleInputChange
                ? field.handleInputChange
                : function (event, cb) {
                    cb(event);
                  })(
                event,
                this.handleFormFieldInputChange(field.type).bind(this)
              );
            }),
            (class_2.prototype.resendConfirmCode = function () {
              return __awaiter(this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (
                        (event && event.preventDefault(),
                        !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a ||
                          'function' !=
                            typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__
                              .a.resendSignUp)
                      )
                        throw new Error(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.d
                        );
                      _a.label = 1;
                    case 1:
                      if ((_a.trys.push([1, 3, , 4]), !this.userInput))
                        throw new Error(
                          _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.EMPTY_USERNAME
                        );
                      return (
                        (this.userInput = this.userInput.trim()),
                        [
                          4,
                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a.resendSignUp(
                            this.userInput
                          ),
                        ]
                      );
                    case 2:
                      return (
                        _a.sent(),
                        this.handleAuthStateChange(
                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__.a
                            .ConfirmSignUp
                        ),
                        [3, 4]
                      );
                    case 3:
                      return (
                        (error_2 = _a.sent()),
                        Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.a
                        )(error_2),
                        [3, 4]
                      );
                    case 4:
                      return [2];
                  }
                });
              });
            }),
            (class_2.prototype.confirmSignUp = function (event) {
              return __awaiter(this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (
                        (event && event.preventDefault(),
                        !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a ||
                          'function' !=
                            typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__
                              .a.confirmSignUp)
                      )
                        throw new Error(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.d
                        );
                      switch (((this.loading = !0), this.usernameAlias)) {
                        case 'phone_number':
                          try {
                            this.userInput = Object(
                              _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.b
                            )(this.phoneNumber);
                          } catch (error) {
                            Object(
                              _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.a
                            )(error);
                          }
                      }
                      _a.label = 1;
                    case 1:
                      if ((_a.trys.push([1, 6, 7, 8]), !this.userInput))
                        throw new Error(
                          _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.EMPTY_USERNAME
                        );
                      return (
                        (this.userInput = this.userInput.trim()),
                        [
                          4,
                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a.confirmSignUp(
                            this.userInput,
                            this.code
                          ),
                        ]
                      );
                    case 2:
                      if (!_a.sent())
                        throw new Error(
                          _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                            _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                              .a.CONFIRM_SIGN_UP_FAILED
                          )
                        );
                      return this._signUpAttrs &&
                        this._signUpAttrs.password &&
                        '' !== this._signUpAttrs.password
                        ? [
                            4,
                            Object(
                              _auth_helpers_bd096ca7_js__WEBPACK_IMPORTED_MODULE_9__.b
                            )(
                              this.userInput,
                              this._signUpAttrs.password,
                              this.handleAuthStateChange
                            ),
                          ]
                        : [3, 4];
                    case 3:
                      return _a.sent(), [3, 5];
                    case 4:
                      this.handleAuthStateChange(
                        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__.a
                          .SignIn
                      ),
                        (_a.label = 5);
                    case 5:
                      return [3, 8];
                    case 6:
                      return (
                        (error_3 = _a.sent()),
                        Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.a
                        )(error_3),
                        [3, 8]
                      );
                    case 7:
                      return (this.loading = !1), [7];
                    case 8:
                      return [2];
                  }
                });
              });
            }),
            (class_2.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.b,
                null,
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'amplify-form-section',
                  {
                    headerText:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        this.headerText
                      ),
                    submitButtonText:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        this.submitButtonText
                      ),
                    handleSubmit: this.handleSubmit,
                    loading: this.loading,
                    secondaryFooterContent: Object(
                      _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                    )(
                      'div',
                      null,
                      Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                        'span',
                        null,
                        Object(
                          _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                        )(
                          'amplify-button',
                          {
                            variant: 'anchor',
                            onClick: function () {
                              return _this.handleAuthStateChange(
                                _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__
                                  .a.SignIn
                              );
                            },
                          },
                          _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                            _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                              .a.BACK_TO_SIGN_IN
                          )
                        )
                      )
                    ),
                  },
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-auth-fields',
                    { formFields: this.newFormFields }
                  )
                )
              );
            }),
            Object.defineProperty(class_2, 'watchers', {
              get: function () {
                return {
                  formFields: ['formFieldsHandler'],
                  user: ['userHandler'],
                };
              },
              enumerable: !1,
              configurable: !0,
            }),
            class_2
          );
        })(),
        logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a(
          'ForgotPassword'
        ),
        AmplifyForgotPassword = (function () {
          function class_3(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.headerText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.RESET_YOUR_PASSWORD),
              (this.sendButtonText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.SEND_CODE),
              (this.submitButtonText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.SUBMIT),
              (this.formFields = []),
              (this.handleSend = function (event) {
                return _this.send(event);
              }),
              (this.handleSubmit = function (event) {
                return _this.submit(event);
              }),
              (this.handleAuthStateChange =
                _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.d),
              (this.usernameAlias = 'username'),
              (this.delivery = null),
              (this.loading = !1),
              (this.phoneNumber = {
                countryDialCodeValue:
                  _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.q,
                phoneNumberValue: null,
              }),
              (this.newFormFields = []),
              (this.forgotPasswordAttrs = {
                userInput: '',
                password: '',
                code: '',
              });
          }
          return (
            (class_3.prototype.componentWillLoad = function () {
              Object(_helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.c)(
                this.usernameAlias
              ),
                this.buildFormFields();
            }),
            (class_3.prototype.formFieldsHandler = function () {
              this.buildFormFields();
            }),
            (class_3.prototype.buildFormFields = function () {
              var _this = this;
              0 === this.formFields.length
                ? this.buildDefaultFormFields()
                : this.formFields.forEach(function (field) {
                    var newField = Object.assign({}, field);
                    (newField.handleInputChange = function (event) {
                      return _this.handleFormFieldInputWithCallback(
                        event,
                        field
                      );
                    }),
                      _this.newFormFields.push(newField);
                  });
            }),
            (class_3.prototype.buildDefaultFormFields = function () {
              switch (this.usernameAlias) {
                case 'email':
                  this.newFormFields = [
                    {
                      type: 'email',
                      required: !0,
                      handleInputChange:
                        this.handleFormFieldInputChange('email'),
                      inputProps: {
                        'data-test': 'forgot-password-email-input',
                      },
                    },
                  ];
                  break;
                case 'phone_number':
                  this.newFormFields = [
                    {
                      type: 'phone_number',
                      required: !0,
                      handleInputChange:
                        this.handleFormFieldInputChange('phone_number'),
                      inputProps: {
                        'data-test': 'forgot-password-phone-number-input',
                      },
                    },
                  ];
                  break;
                case 'username':
                default:
                  this.newFormFields = [
                    {
                      type: 'username',
                      required: !0,
                      handleInputChange:
                        this.handleFormFieldInputChange('username'),
                      inputProps: {
                        'data-test': 'forgot-password-username-input',
                      },
                    },
                  ];
              }
            }),
            (class_3.prototype.handleFormFieldInputChange = function (
              fieldType
            ) {
              var _this = this;
              switch (fieldType) {
                case 'username':
                case 'email':
                  return function (event) {
                    return (_this.forgotPasswordAttrs.userInput =
                      event.target.value);
                  };
                case 'phone_number':
                  return function (event) {
                    return Object(
                      _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.f
                    )(event, _this.phoneNumber);
                  };
                case 'password':
                case 'code':
                  return function (event) {
                    return (_this.forgotPasswordAttrs[fieldType] =
                      event.target.value);
                  };
                default:
                  return;
              }
            }),
            (class_3.prototype.setFieldValue = function (
              field,
              formAttributes
            ) {
              switch (field.type) {
                case 'username':
                case 'email':
                  void 0 === field.value
                    ? (formAttributes.userInput = '')
                    : (formAttributes.userInput = field.value);
                  break;
                case 'phone_number':
                  field.dialCode &&
                    (this.phoneNumber.countryDialCodeValue = field.dialCode),
                    (this.phoneNumber.phoneNumberValue = field.value);
                  break;
                case 'password':
                case 'code':
                  void 0 === field.value
                    ? (formAttributes[field.type] = '')
                    : (formAttributes[field.type] = field.value);
              }
            }),
            (class_3.prototype.handleFormFieldInputWithCallback = function (
              event,
              field
            ) {
              (field.handleInputChange
                ? field.handleInputChange
                : function (event, cb) {
                    cb(event);
                  })(
                event,
                this.handleFormFieldInputChange(field.type).bind(this)
              );
            }),
            (class_3.prototype.send = function (event) {
              return __awaiter(this, void 0, void 0, function () {
                var data, error_4;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (
                        (event && event.preventDefault(),
                        !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a ||
                          'function' !=
                            typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__
                              .a.forgotPassword)
                      )
                        throw new Error(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.d
                        );
                      switch (((this.loading = !0), this.usernameAlias)) {
                        case 'phone_number':
                          try {
                            this.forgotPasswordAttrs.userInput = Object(
                              _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.b
                            )(this.phoneNumber);
                          } catch (error) {
                            Object(
                              _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.a
                            )(error);
                          }
                      }
                      _a.label = 1;
                    case 1:
                      return (
                        _a.trys.push([1, 3, 4, 5]),
                        [
                          4,
                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a.forgotPassword(
                            this.forgotPasswordAttrs.userInput.trim()
                          ),
                        ]
                      );
                    case 2:
                      return (
                        (data = _a.sent()),
                        logger.debug(data),
                        (this.newFormFields = [
                          {
                            type: 'code',
                            required: !0,
                            handleInputChange:
                              this.handleFormFieldInputChange('code'),
                            inputProps: {
                              'data-test': 'forgot-password-code-input',
                            },
                          },
                          {
                            type: 'password',
                            required: !0,
                            handleInputChange:
                              this.handleFormFieldInputChange('password'),
                            label:
                              _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                                  .a.NEW_PASSWORD_LABEL
                              ),
                            placeholder:
                              _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                                  .a.NEW_PASSWORD_PLACEHOLDER
                              ),
                          },
                        ]),
                        (this.delivery = data.CodeDeliveryDetails),
                        [3, 5]
                      );
                    case 3:
                      return (
                        (error_4 = _a.sent()),
                        Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.a
                        )(error_4),
                        [3, 5]
                      );
                    case 4:
                      return (this.loading = !1), [7];
                    case 5:
                      return [2];
                  }
                });
              });
            }),
            (class_3.prototype.submit = function (event) {
              return __awaiter(this, void 0, void 0, function () {
                var _a, userInput, code, password, data, error_5;
                return __generator(this, function (_b) {
                  switch (_b.label) {
                    case 0:
                      if (
                        (event && event.preventDefault(),
                        !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a ||
                          'function' !=
                            typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__
                              .a.forgotPasswordSubmit)
                      )
                        throw new Error(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.d
                        );
                      (this.loading = !0), (_b.label = 1);
                    case 1:
                      return (
                        _b.trys.push([1, 3, 4, 5]),
                        (_a = this.forgotPasswordAttrs),
                        (userInput = _a.userInput),
                        (code = _a.code),
                        (password = _a.password),
                        [
                          4,
                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a.forgotPasswordSubmit(
                            userInput,
                            code,
                            password
                          ),
                        ]
                      );
                    case 2:
                      return (
                        (data = _b.sent()),
                        logger.debug(data),
                        this.handleAuthStateChange(
                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__.a
                            .SignIn
                        ),
                        (this.delivery = null),
                        [3, 5]
                      );
                    case 3:
                      return (
                        (error_5 = _b.sent()),
                        Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.a
                        )(error_5),
                        [3, 5]
                      );
                    case 4:
                      return (this.loading = !1), [7];
                    case 5:
                      return [2];
                  }
                });
              });
            }),
            (class_3.prototype.render = function () {
              var _this = this,
                submitFn = this.delivery
                  ? function (event) {
                      return _this.handleSubmit(event);
                    }
                  : function (event) {
                      return _this.handleSend(event);
                    },
                submitButtonText = this.delivery
                  ? this.submitButtonText
                  : this.sendButtonText;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.b,
                null,
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'amplify-form-section',
                  {
                    headerText:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        this.headerText
                      ),
                    handleSubmit: submitFn,
                    loading: this.loading,
                    secondaryFooterContent: Object(
                      _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                    )(
                      'amplify-button',
                      {
                        variant: 'anchor',
                        onClick: function () {
                          return _this.handleAuthStateChange(
                            _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__
                              .a.SignIn
                          );
                        },
                        'data-test': 'forgot-password-back-to-sign-in-link',
                      },
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                          .BACK_TO_SIGN_IN
                      )
                    ),
                    testDataPrefix: 'forgot-password',
                    submitButtonText:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        submitButtonText
                      ),
                  },
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-auth-fields',
                    { formFields: this.newFormFields }
                  )
                )
              );
            }),
            Object.defineProperty(class_3, 'watchers', {
              get: function () {
                return { formFields: ['formFieldsHandler'] };
              },
              enumerable: !1,
              configurable: !0,
            }),
            class_3
          );
        })(),
        logger$1 = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a(
          'amplify-require-new-password'
        ),
        AmplifyRequireNewPassword = (function () {
          function class_4(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.headerText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.CHANGE_PASSWORD),
              (this.submitButtonText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.CHANGE_PASSWORD_ACTION),
              (this.handleSubmit = function (event) {
                return _this.completeNewPassword(event);
              }),
              (this.handleAuthStateChange =
                _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.d),
              (this.formFields = [
                {
                  type: _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__.e
                    .Password,
                  required: !0,
                  handleInputChange: function (event) {
                    return _this.handlePasswordChange(event);
                  },
                  label: _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                    _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                      .NEW_PASSWORD_LABEL
                  ),
                  placeholder:
                    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                      _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                        .NEW_PASSWORD_PLACEHOLDER
                    ),
                  inputProps: {
                    'data-test': 'require-new-password-password-input',
                  },
                },
              ]),
              (this.loading = !1),
              (this.requiredAttributes = {}),
              (this.newFormFields = this.formFields);
          }
          return (
            (class_4.prototype.userHandler = function () {
              this.setCurrentUser();
            }),
            (class_4.prototype.handleRequiredAttributeInputChange = function (
              attribute,
              event
            ) {
              this.requiredAttributes[attribute] = event.target.value;
            }),
            (class_4.prototype.setCurrentUser = function () {
              return __awaiter(this, void 0, void 0, function () {
                var user,
                  error_6,
                  _this = this;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (this.user) return [3, 5];
                      _a.label = 1;
                    case 1:
                      return (
                        _a.trys.push([1, 3, , 4]),
                        [
                          4,
                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a.currentAuthenticatedUser(),
                        ]
                      );
                    case 2:
                      return (
                        (user = _a.sent()) && (this.currentUser = user), [3, 4]
                      );
                    case 3:
                      return (
                        (error_6 = _a.sent()),
                        Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.a
                        )(error_6),
                        [3, 4]
                      );
                    case 4:
                      return [3, 6];
                    case 5:
                      (this.currentUser = this.user), (_a.label = 6);
                    case 6:
                      return (
                        this.currentUser &&
                          this.currentUser.challengeParam &&
                          this.currentUser.challengeParam.requiredAttributes &&
                          this.currentUser.challengeParam.requiredAttributes.forEach(
                            function (attribute) {
                              var formField = {
                                type: attribute,
                                required: !0,
                                label:
                                  _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__
                                    .i[attribute].label,
                                placeholder:
                                  _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__
                                    .i[attribute].placeholder,
                                handleInputChange: function (event) {
                                  return _this.handleRequiredAttributeInputChange(
                                    attribute,
                                    event
                                  );
                                },
                                inputProps: {
                                  'data-test':
                                    'require-new-password-' +
                                    attribute +
                                    '-input',
                                },
                              };
                              _this.newFormFields = __spreadArrays(
                                _this.newFormFields,
                                [formField]
                              );
                            }
                          ),
                        [2]
                      );
                  }
                });
              });
            }),
            (class_4.prototype.componentWillLoad = function () {
              return this.setCurrentUser();
            }),
            (class_4.prototype.handlePasswordChange = function (event) {
              this.password = event.target.value;
            }),
            (class_4.prototype.completeNewPassword = function (event) {
              return __awaiter(this, void 0, void 0, function () {
                var user, error_7;
                return __generator(this, function (_b) {
                  switch (_b.label) {
                    case 0:
                      if (
                        (event && event.preventDefault(),
                        !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a ||
                          'function' !=
                            typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__
                              .a.completeNewPassword)
                      )
                        throw new Error(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.d
                        );
                      (this.loading = !0), (_b.label = 1);
                    case 1:
                      return (
                        _b.trys.push([1, 8, 9, 10]),
                        [
                          4,
                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a.completeNewPassword(
                            this.currentUser,
                            this.password,
                            this.requiredAttributes
                          ),
                        ]
                      );
                    case 2:
                      switch (
                        ((user = _b.sent()),
                        logger$1.debug('complete new password', user),
                        user.challengeName)
                      ) {
                        case _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__
                          .b.SMSMFA:
                          return [3, 3];
                        case _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__
                          .b.MFASetup:
                          return [3, 4];
                      }
                      return [3, 5];
                    case 3:
                      return (
                        this.handleAuthStateChange(
                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__.a
                            .ConfirmSignIn,
                          user
                        ),
                        [3, 7]
                      );
                    case 4:
                      return (
                        logger$1.debug('TOTP setup', user.challengeParam),
                        this.handleAuthStateChange(
                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__.a
                            .TOTPSetup,
                          user
                        ),
                        [3, 7]
                      );
                    case 5:
                      return [
                        4,
                        Object(
                          _auth_helpers_bd096ca7_js__WEBPACK_IMPORTED_MODULE_9__.a
                        )(user, this.handleAuthStateChange),
                      ];
                    case 6:
                      _b.sent(), (_b.label = 7);
                    case 7:
                      return [3, 10];
                    case 8:
                      return (
                        (error_7 = _b.sent()),
                        Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.a
                        )(error_7),
                        [3, 10]
                      );
                    case 9:
                      return (this.loading = !1), [7];
                    case 10:
                      return [2];
                  }
                });
              });
            }),
            (class_4.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.b,
                null,
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'amplify-form-section',
                  {
                    headerText:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        this.headerText
                      ),
                    handleSubmit: this.handleSubmit,
                    loading: this.loading,
                    secondaryFooterContent: Object(
                      _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                    )(
                      'amplify-button',
                      {
                        variant: 'anchor',
                        onClick: function () {
                          return _this.handleAuthStateChange(
                            _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__
                              .a.SignIn
                          );
                        },
                      },
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                          .BACK_TO_SIGN_IN
                      )
                    ),
                    submitButtonText:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        this.submitButtonText
                      ),
                  },
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-auth-fields',
                    { formFields: this.newFormFields }
                  )
                )
              );
            }),
            Object.defineProperty(class_4, 'watchers', {
              get: function () {
                return { user: ['userHandler'] };
              },
              enumerable: !1,
              configurable: !0,
            }),
            class_4
          );
        })(),
        AmplifySignIn = (function () {
          function class_5(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.handleSubmit = function (event) {
                return _this.signIn(event);
              }),
              (this.headerText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.SIGN_IN_HEADER_TEXT),
              (this.submitButtonText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.SIGN_IN_ACTION),
              (this.handleAuthStateChange =
                _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.d),
              (this.usernameAlias = 'username'),
              (this.formFields = []),
              (this.hideSignUp = !1),
              (this.newFormFields = []),
              (this.loading = !1),
              (this.phoneNumber = {
                countryDialCodeValue:
                  _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.q,
                phoneNumberValue: null,
              }),
              (this.signInAttributes = { userInput: '', password: '' });
          }
          return (
            (class_5.prototype.componentWillLoad = function () {
              Object(_helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.c)(
                this.usernameAlias
              ),
                this.buildFormFields();
            }),
            (class_5.prototype.formFieldsHandler = function () {
              this.buildFormFields();
            }),
            (class_5.prototype.handleFormFieldInputChange = function (
              fieldType
            ) {
              var _this = this;
              switch (fieldType) {
                case 'username':
                case 'email':
                  return function (event) {
                    return (_this.signInAttributes.userInput =
                      event.target.value);
                  };
                case 'phone_number':
                  return function (event) {
                    return Object(
                      _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.f
                    )(event, _this.phoneNumber);
                  };
                case 'password':
                  return function (event) {
                    return (_this.signInAttributes.password =
                      event.target.value);
                  };
              }
            }),
            (class_5.prototype.handleFormFieldInputWithCallback = function (
              event,
              field
            ) {
              (field.handleInputChange
                ? field.handleInputChange
                : function (event, cb) {
                    cb(event);
                  })(
                event,
                this.handleFormFieldInputChange(field.type).bind(this)
              );
            }),
            (class_5.prototype.signIn = function (event) {
              return __awaiter(this, void 0, void 0, function () {
                var username;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      switch (
                        (event && event.preventDefault(),
                        (this.loading = !0),
                        this.usernameAlias)
                      ) {
                        case 'phone_number':
                          try {
                            this.signInAttributes.userInput = Object(
                              _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.b
                            )(this.phoneNumber);
                          } catch (error) {
                            Object(
                              _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.a
                            )(error);
                          }
                      }
                      return (
                        (username = this.signInAttributes.userInput.trim()),
                        [
                          4,
                          Object(
                            _auth_helpers_bd096ca7_js__WEBPACK_IMPORTED_MODULE_9__.b
                          )(
                            username,
                            this.signInAttributes.password,
                            this.handleAuthStateChange
                          ),
                        ]
                      );
                    case 1:
                      return _a.sent(), (this.loading = !1), [2];
                  }
                });
              });
            }),
            (class_5.prototype.buildDefaultFormFields = function () {
              var _this = this,
                formFieldInputs = [];
              switch (this.usernameAlias) {
                case 'email':
                  formFieldInputs.push({
                    type: 'email',
                    required: !0,
                    handleInputChange: this.handleFormFieldInputChange('email'),
                    inputProps: { 'data-test': 'sign-in-email-input' },
                  });
                  break;
                case 'phone_number':
                  formFieldInputs.push({
                    type: 'phone_number',
                    required: !0,
                    handleInputChange:
                      this.handleFormFieldInputChange('phone_number'),
                    inputProps: { 'data-test': 'sign-in-phone-number-input' },
                  });
                  break;
                case 'username':
                default:
                  formFieldInputs.push({
                    type: 'username',
                    required: !0,
                    handleInputChange:
                      this.handleFormFieldInputChange('username'),
                    inputProps: { 'data-test': 'sign-in-username-input' },
                  });
              }
              formFieldInputs.push({
                type: 'password',
                hint: Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'div',
                  null,
                  _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                    _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                      .FORGOT_PASSWORD_TEXT
                  ),
                  ' ',
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-button',
                    {
                      variant: 'anchor',
                      onClick: function () {
                        return _this.handleAuthStateChange(
                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__.a
                            .ForgotPassword
                        );
                      },
                      'data-test': 'sign-in-forgot-password-link',
                    },
                    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                      _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                        .RESET_PASSWORD_TEXT
                    )
                  )
                ),
                required: !0,
                handleInputChange: this.handleFormFieldInputChange('password'),
                inputProps: { 'data-test': 'sign-in-password-input' },
              }),
                (this.newFormFields = __spreadArrays(formFieldInputs));
            }),
            (class_5.prototype.buildFormFields = function () {
              var _this = this;
              if (0 === this.formFields.length) this.buildDefaultFormFields();
              else {
                var newFields_2 = [];
                this.formFields.forEach(function (field) {
                  var newField = Object.assign({}, field);
                  'password' === newField.type &&
                    (newField.hint = Object(
                      _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.g
                    )(newField)
                      ? Object(
                          _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                        )(
                          'div',
                          null,
                          _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                            _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                              .a.FORGOT_PASSWORD_TEXT
                          ),
                          ' ',
                          Object(
                            _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                          )(
                            'amplify-button',
                            {
                              variant: 'anchor',
                              onClick: function () {
                                return _this.handleAuthStateChange(
                                  _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__
                                    .a.ForgotPassword
                                );
                              },
                              'data-test': 'sign-in-forgot-password-link',
                            },
                            _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                              _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                                .a.RESET_PASSWORD_TEXT
                            )
                          )
                        )
                      : newField.hint),
                    (newField.handleInputChange = function (event) {
                      return _this.handleFormFieldInputWithCallback(
                        event,
                        field
                      );
                    }),
                    _this.setFieldValue(newField, _this.signInAttributes),
                    newFields_2.push(newField);
                }),
                  (this.newFormFields = newFields_2);
              }
            }),
            (class_5.prototype.setFieldValue = function (
              field,
              formAttributes
            ) {
              switch (field.type) {
                case 'username':
                case 'email':
                  void 0 === field.value
                    ? (formAttributes.userInput = '')
                    : (formAttributes.userInput = field.value);
                  break;
                case 'phone_number':
                  field.dialCode &&
                    (this.phoneNumber.countryDialCodeValue = field.dialCode),
                    (this.phoneNumber.phoneNumberValue = field.value);
                  break;
                case 'password':
                  void 0 === field.value
                    ? (formAttributes.password = '')
                    : (formAttributes.password = field.value);
              }
            }),
            (class_5.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.b,
                null,
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'amplify-form-section',
                  {
                    headerText:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        this.headerText
                      ),
                    handleSubmit: this.handleSubmit,
                    testDataPrefix: 'sign-in',
                  },
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    { slot: 'subtitle' },
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'slot',
                      { name: 'header-subtitle' }
                    )
                  ),
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'slot',
                    { name: 'federated-buttons' },
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-federated-buttons',
                      {
                        handleAuthStateChange: this.handleAuthStateChange,
                        federated: this.federated,
                      }
                    )
                  ),
                  !Object(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_3__.d)(
                    this.federated
                  ) &&
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-strike',
                      null,
                      'or'
                    ),
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-auth-fields',
                    { formFields: this.newFormFields }
                  ),
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    {
                      slot: 'amplify-form-section-footer',
                      class: 'sign-in-form-footer',
                    },
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'slot',
                      { name: 'footer' },
                      Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                        'slot',
                        { name: 'secondary-footer-content' },
                        this.hideSignUp
                          ? Object(
                              _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                            )('span', null)
                          : Object(
                              _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                            )(
                              'span',
                              null,
                              _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                                  .a.NO_ACCOUNT_TEXT
                              ),
                              ' ',
                              Object(
                                _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                              )(
                                'amplify-button',
                                {
                                  variant: 'anchor',
                                  onClick: function () {
                                    return _this.handleAuthStateChange(
                                      _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__
                                        .a.SignUp
                                    );
                                  },
                                  'data-test': 'sign-in-create-account-link',
                                },
                                _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                                  _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                                    .a.CREATE_ACCOUNT_TEXT
                                )
                              )
                            )
                      ),
                      Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                        'slot',
                        { name: 'primary-footer-content' },
                        Object(
                          _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                        )(
                          'amplify-button',
                          {
                            type: 'submit',
                            disabled: this.loading,
                            'data-test': 'sign-in-sign-in-button',
                          },
                          this.loading
                            ? Object(
                                _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                              )('amplify-loading-spinner', null)
                            : Object(
                                _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                              )(
                                'span',
                                null,
                                _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                                  this.submitButtonText
                                )
                              )
                        )
                      )
                    )
                  )
                )
              );
            }),
            Object.defineProperty(class_5, 'watchers', {
              get: function () {
                return { formFields: ['formFieldsHandler'] };
              },
              enumerable: !1,
              configurable: !0,
            }),
            class_5
          );
        })();
      AmplifySignIn.style =
        ':host{--footer-size:var(--amplify-text-sm);--footer-color:var(--amplify-grey);--footer-font-family:var(--amplify-font-family);--font-weight:var(--amplify-font-weight)}.sign-in-form-footer{font-family:var(--footer-font-family);font-size:var(--footer-size);color:var(--footer-color);font-weight:--font-weight;display:-ms-flexbox;display:flex;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around}.sign-in-form-footer amplify-button{margin-bottom:0.625rem}@media (min-width: 672px){.sign-in-form-footer{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:baseline;align-items:baseline}.sign-in-form-footer amplify-button{margin-bottom:0}}.sign-in-form-footer *+*{margin-bottom:15px}';
      var AmplifySignUp = (function () {
        function class_6(hostRef) {
          var _this = this;
          Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
            this,
            hostRef
          ),
            (this.handleSubmit = function (event) {
              return _this.signUp(event);
            }),
            (this.headerText =
              _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.SIGN_UP_HEADER_TEXT),
            (this.submitButtonText =
              _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.SIGN_UP_SUBMIT_BUTTON_TEXT),
            (this.haveAccountText =
              _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.SIGN_UP_HAVE_ACCOUNT_TEXT),
            (this.signInText =
              _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.SIGN_IN_TEXT),
            (this.formFields = []),
            (this.handleAuthStateChange =
              _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.d),
            (this.usernameAlias = 'username'),
            (this.newFormFields = []),
            (this.phoneNumber = {
              countryDialCodeValue:
                _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.q,
              phoneNumberValue: null,
            }),
            (this.loading = !1),
            (this.signUpAttributes = {
              username: '',
              password: '',
              attributes: {},
            });
        }
        return (
          (class_6.prototype.handleFormFieldInputChange = function (fieldType) {
            var _this = this;
            switch (fieldType) {
              case 'username':
                return function (event) {
                  return (_this.signUpAttributes.username = event.target.value);
                };
              case 'password':
                return function (event) {
                  return (_this.signUpAttributes.password = event.target.value);
                };
              case 'email':
                return function (event) {
                  return (_this.signUpAttributes.attributes.email =
                    event.target.value);
                };
              case 'phone_number':
                return function (event) {
                  return Object(
                    _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.f
                  )(event, _this.phoneNumber);
                };
              default:
                return function (event) {
                  return (_this.signUpAttributes.attributes[fieldType] =
                    event.target.value);
                };
            }
          }),
          (class_6.prototype.handleFormFieldInputWithCallback = function (
            event,
            field
          ) {
            (field.handleInputChange
              ? field.handleInputChange
              : function (event, cb) {
                  cb(event);
                })(
              event,
              this.handleFormFieldInputChange(field.type).bind(this)
            );
          }),
          (class_6.prototype.signUp = function (event) {
            return __awaiter(this, void 0, void 0, function () {
              var data, signUpAttrs, error_8;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    if (
                      (event && event.preventDefault(),
                      !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a ||
                        'function' !=
                          typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__
                            .a.signUp)
                    )
                      throw new Error(
                        _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.d
                      );
                    if (
                      ((this.loading = !0), this.phoneNumber.phoneNumberValue)
                    )
                      try {
                        this.signUpAttributes.attributes.phone_number = Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.b
                        )(this.phoneNumber);
                      } catch (error) {
                        Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.a
                        )(error);
                      }
                    switch (this.usernameAlias) {
                      case 'email':
                      case 'phone_number':
                        this.signUpAttributes.username =
                          this.signUpAttributes.attributes[this.usernameAlias];
                    }
                    _a.label = 1;
                  case 1:
                    if (
                      (_a.trys.push([1, 6, 7, 8]),
                      !this.signUpAttributes.username)
                    )
                      throw new Error(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.EMPTY_USERNAME
                      );
                    if (this.signUpAttributes.username.indexOf(' ') >= 0)
                      throw new Error(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.USERNAME_REMOVE_WHITESPACE
                      );
                    if (
                      this.signUpAttributes.password !==
                      this.signUpAttributes.password.trim()
                    )
                      throw new Error(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.PASSWORD_REMOVE_WHITESPACE
                      );
                    return [
                      4,
                      _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a.signUp(
                        this.signUpAttributes
                      ),
                    ];
                  case 2:
                    if (!(data = _a.sent()))
                      throw new Error(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a.SIGN_UP_FAILED
                      );
                    return data.userConfirmed
                      ? [
                          4,
                          Object(
                            _auth_helpers_bd096ca7_js__WEBPACK_IMPORTED_MODULE_9__.b
                          )(
                            this.signUpAttributes.username,
                            this.signUpAttributes.password,
                            this.handleAuthStateChange
                          ),
                        ]
                      : [3, 4];
                  case 3:
                    return _a.sent(), [3, 5];
                  case 4:
                    (signUpAttrs = Object.assign({}, this.signUpAttributes)),
                      this.handleAuthStateChange(
                        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__.a
                          .ConfirmSignUp,
                        Object.assign(Object.assign({}, data.user), {
                          signUpAttrs: signUpAttrs,
                        })
                      ),
                      (_a.label = 5);
                  case 5:
                    return [3, 8];
                  case 6:
                    return (
                      (error_8 = _a.sent()),
                      Object(
                        _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.a
                      )(error_8),
                      [3, 8]
                    );
                  case 7:
                    return (this.loading = !1), [7];
                  case 8:
                    return [2];
                }
              });
            });
          }),
          (class_6.prototype.buildDefaultFormFields = function () {
            switch (this.usernameAlias) {
              case 'email':
                this.newFormFields = [
                  {
                    type: 'email',
                    placeholder:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                          .SIGN_UP_EMAIL_PLACEHOLDER
                      ),
                    required: !0,
                    handleInputChange: this.handleFormFieldInputChange('email'),
                    inputProps: { 'data-test': 'sign-up-email-input' },
                  },
                  {
                    type: 'password',
                    placeholder:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                          .SIGN_UP_PASSWORD_PLACEHOLDER
                      ),
                    required: !0,
                    handleInputChange:
                      this.handleFormFieldInputChange('password'),
                    inputProps: { 'data-test': 'sign-up-password-input' },
                  },
                  {
                    type: 'phone_number',
                    required: !0,
                    handleInputChange:
                      this.handleFormFieldInputChange('phone_number'),
                    inputProps: { 'data-test': 'sign-up-phone-number-input' },
                  },
                ];
                break;
              case 'phone_number':
                this.newFormFields = [
                  {
                    type: 'phone_number',
                    required: !0,
                    handleInputChange:
                      this.handleFormFieldInputChange('phone_number'),
                    inputProps: { 'data-test': 'sign-up-phone-number-input' },
                  },
                  {
                    type: 'password',
                    placeholder:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                          .SIGN_UP_PASSWORD_PLACEHOLDER
                      ),
                    required: !0,
                    handleInputChange:
                      this.handleFormFieldInputChange('password'),
                    inputProps: { 'data-test': 'sign-up-password-input' },
                  },
                  {
                    type: 'email',
                    placeholder:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                          .SIGN_UP_EMAIL_PLACEHOLDER
                      ),
                    required: !0,
                    handleInputChange: this.handleFormFieldInputChange('email'),
                    inputProps: { 'data-test': 'sign-up-email-input' },
                  },
                ];
                break;
              case 'username':
              default:
                this.newFormFields = [
                  {
                    type: 'username',
                    placeholder:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                          .SIGN_UP_USERNAME_PLACEHOLDER
                      ),
                    required: !0,
                    handleInputChange:
                      this.handleFormFieldInputChange('username'),
                    inputProps: { 'data-test': 'sign-up-username-input' },
                  },
                  {
                    type: 'password',
                    placeholder:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                          .SIGN_UP_PASSWORD_PLACEHOLDER
                      ),
                    required: !0,
                    handleInputChange:
                      this.handleFormFieldInputChange('password'),
                    inputProps: { 'data-test': 'sign-up-password-input' },
                  },
                  {
                    type: 'email',
                    placeholder:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                          .SIGN_UP_EMAIL_PLACEHOLDER
                      ),
                    required: !0,
                    handleInputChange: this.handleFormFieldInputChange('email'),
                    inputProps: { 'data-test': 'sign-up-email-input' },
                  },
                  {
                    type: 'phone_number',
                    required: !0,
                    handleInputChange:
                      this.handleFormFieldInputChange('phone_number'),
                    inputProps: { 'data-test': 'sign-up-phone-number-input' },
                  },
                ];
            }
          }),
          (class_6.prototype.buildFormFields = function () {
            var _this = this;
            if (0 === this.formFields.length) this.buildDefaultFormFields();
            else {
              var newFields_3 = [];
              this.formFields.forEach(function (field) {
                var newField = Object.assign({}, field);
                (newField.handleInputChange = function (event) {
                  return _this.handleFormFieldInputWithCallback(event, field);
                }),
                  _this.setFieldValue(field, _this.signUpAttributes),
                  newFields_3.push(newField);
              }),
                (this.newFormFields = newFields_3);
            }
          }),
          (class_6.prototype.setFieldValue = function (field, formAttributes) {
            switch (field.type) {
              case 'username':
                void 0 === field.value
                  ? (formAttributes.username = '')
                  : (formAttributes.username = field.value);
                break;
              case 'password':
                void 0 === field.value
                  ? (formAttributes.password = '')
                  : (formAttributes.password = field.value);
                break;
              case 'email':
                formAttributes.attributes.email = field.value;
                break;
              case 'phone_number':
                field.dialCode &&
                  (this.phoneNumber.countryDialCodeValue = field.dialCode),
                  (this.phoneNumber.phoneNumberValue = field.value);
                break;
              default:
                formAttributes.attributes[field.type] = field.value;
            }
          }),
          (class_6.prototype.componentWillLoad = function () {
            Object(_helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.c)(
              this.usernameAlias
            ),
              this.buildFormFields();
          }),
          (class_6.prototype.formFieldsHandler = function () {
            this.buildFormFields();
          }),
          (class_6.prototype.render = function () {
            var _this = this;
            return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
              _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.b,
              null,
              Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'amplify-form-section',
                {
                  headerText:
                    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                      this.headerText
                    ),
                  handleSubmit: this.handleSubmit,
                  testDataPrefix: 'sign-up',
                },
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'div',
                  { slot: 'subtitle' },
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'slot',
                    { name: 'header-subtitle' }
                  )
                ),
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'amplify-auth-fields',
                  { formFields: this.newFormFields }
                ),
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'div',
                  {
                    class: 'sign-up-form-footer',
                    slot: 'amplify-form-section-footer',
                  },
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'slot',
                    { name: 'footer' },
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'slot',
                      { name: 'secondary-footer-content' },
                      Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                        'span',
                        null,
                        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                          this.haveAccountText
                        ),
                        ' ',
                        Object(
                          _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                        )(
                          'amplify-button',
                          {
                            variant: 'anchor',
                            onClick: function () {
                              return _this.handleAuthStateChange(
                                _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__
                                  .a.SignIn
                              );
                            },
                            'data-test': 'sign-up-sign-in-link',
                          },
                          _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                            this.signInText
                          )
                        )
                      )
                    ),
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'slot',
                      { name: 'primary-footer-content' },
                      Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                        'amplify-button',
                        {
                          type: 'submit',
                          'data-test': 'sign-up-create-account-button',
                        },
                        this.loading
                          ? Object(
                              _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                            )('amplify-loading-spinner', null)
                          : Object(
                              _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                            )(
                              'span',
                              null,
                              _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                                this.submitButtonText
                              )
                            )
                      )
                    )
                  )
                )
              )
            );
          }),
          Object.defineProperty(class_6, 'watchers', {
            get: function () {
              return { formFields: ['formFieldsHandler'] };
            },
            enumerable: !1,
            configurable: !0,
          }),
          class_6
        );
      })();
      AmplifySignUp.style =
        ':host{--footer-font-family:var(--amplify-font-family);--footer-font-size:var(--amplify-text-sm);--footer-color:var(--amplify-grey);--font-weight:var(--amplify-font-weight)}.sign-up-form-footer{font-family:var(--footer-font-family);font-size:var(--footer-font-size);color:var(--footer-color);font-weight:--font-weight;display:-ms-flexbox;display:flex;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around}.sign-up-form-footer amplify-button{margin-bottom:0.625rem}@media (min-width: 672px){.sign-up-form-footer{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:baseline;align-items:baseline}.sign-up-form-footer amplify-button{margin-bottom:0}}.sign-up-form-footer *+*{margin-bottom:15px}';
      var logger$2 = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a(
          'AmplifyVerifyContact'
        ),
        AmplifyVerifyContact = (function () {
          function class_7(hostRef) {
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.handleAuthStateChange =
                _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.d),
              (this.loading = !1);
          }
          return (
            (class_7.prototype.handleSubmit = function (event) {
              event.preventDefault(),
                this.verifyAttr
                  ? this.submit(this.code)
                  : this.verify(this.contact);
            }),
            (class_7.prototype.submit = function (code) {
              return __awaiter(this, void 0, void 0, function () {
                var attr, data, error_9;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (
                        ((attr = this.verifyAttr),
                        !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a ||
                          'function' !=
                            typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__
                              .a.verifyCurrentUserAttributeSubmit)
                      )
                        throw new Error(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.d
                        );
                      (this.loading = !0), (_a.label = 1);
                    case 1:
                      return (
                        _a.trys.push([1, 3, 4, 5]),
                        [
                          4,
                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a.verifyCurrentUserAttributeSubmit(
                            attr,
                            code
                          ),
                        ]
                      );
                    case 2:
                      return (
                        (data = _a.sent()),
                        logger$2.debug(data),
                        this.handleAuthStateChange(
                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__.a
                            .SignedIn,
                          this.user
                        ),
                        (this.verifyAttr = null),
                        [3, 5]
                      );
                    case 3:
                      return (
                        (error_9 = _a.sent()),
                        Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.a
                        )(error_9),
                        logger$2.error(error_9),
                        [3, 5]
                      );
                    case 4:
                      return (this.loading = !1), [7];
                    case 5:
                      return [2];
                  }
                });
              });
            }),
            (class_7.prototype.verify = function (contact) {
              return __awaiter(this, void 0, void 0, function () {
                var data, error_10;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (!contact)
                        return (
                          logger$2.error(
                            'Neither Email nor Phone Number selected'
                          ),
                          [2]
                        );
                      if (
                        !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a ||
                        'function' !=
                          typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__
                            .a.verifyCurrentUserAttribute
                      )
                        throw new Error(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.d
                        );
                      (this.loading = !0), (_a.label = 1);
                    case 1:
                      return (
                        _a.trys.push([1, 3, 4, 5]),
                        [
                          4,
                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a.verifyCurrentUserAttribute(
                            contact
                          ),
                        ]
                      );
                    case 2:
                      return (
                        (data = _a.sent()),
                        logger$2.debug(data),
                        (this.verifyAttr = contact),
                        [3, 5]
                      );
                    case 3:
                      return (
                        (error_10 = _a.sent()),
                        Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.a
                        )(error_10),
                        logger$2.error(error_10),
                        [3, 5]
                      );
                    case 4:
                      return (this.loading = !1), [7];
                    case 5:
                      return [2];
                  }
                });
              });
            }),
            (class_7.prototype.handleInputChange = function (event) {
              var inputName = event.target.name;
              'code' === inputName
                ? (this.code = event.target.value)
                : 'contact' === inputName &&
                  (this.contact = event.target.value);
            }),
            (class_7.prototype.renderSubmit = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'div',
                null,
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'amplify-input',
                  {
                    inputProps: {
                      autocomplete: 'off',
                      'data-test': 'verify-contact-code-input',
                    },
                    name: 'code',
                    placeholder:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                          .CODE_PLACEHOLDER
                      ),
                    handleInputChange: function (event) {
                      return _this.handleInputChange(event);
                    },
                  }
                )
              );
            }),
            (class_7.prototype.renderVerify = function () {
              var _this = this,
                user = this.user;
              if (!user) return logger$2.debug('No user to verify'), null;
              var unverified = user.unverified;
              if (!unverified)
                return (
                  logger$2.debug('Unverified variable does not exist on user'),
                  null
                );
              var email = unverified.email,
                phone_number = unverified.phone_number;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'div',
                null,
                email &&
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-radio-button',
                    {
                      label:
                        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                          _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                            .a.VERIFY_CONTACT_EMAIL_LABEL
                        ),
                      key: 'email',
                      name: 'contact',
                      value: 'email',
                      handleInputChange: function (event) {
                        return _this.handleInputChange(event);
                      },
                      inputProps: { 'data-test': 'verify-contact-email-radio' },
                    }
                  ),
                phone_number &&
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-radio-button',
                    {
                      label:
                        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                          _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                            .a.VERIFY_CONTACT_PHONE_LABEL
                        ),
                      key: 'phone_number',
                      name: 'contact',
                      value: 'phone_number',
                      handleInputChange: function (event) {
                        return _this.handleInputChange(event);
                      },
                      inputProps: { 'data-test': 'verify-contact-email-radio' },
                    }
                  )
              );
            }),
            (class_7.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.b,
                null,
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'amplify-form-section',
                  {
                    handleSubmit: function (event) {
                      return _this.handleSubmit(event);
                    },
                    headerText:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__.a
                          .VERIFY_CONTACT_HEADER_TEXT
                      ),
                    loading: this.loading,
                    secondaryFooterContent: Object(
                      _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                    )(
                      'span',
                      null,
                      Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                        'amplify-button',
                        {
                          variant: 'anchor',
                          onClick: function () {
                            return _this.handleAuthStateChange(
                              _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_4__
                                .a.SignedIn,
                              _this.user
                            );
                          },
                        },
                        'Skip'
                      )
                    ),
                    submitButtonText: this.verifyAttr
                      ? _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                          _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                            .a.VERIFY_CONTACT_SUBMIT_LABEL
                        )
                      : _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                          _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_6__
                            .a.VERIFY_CONTACT_VERIFY_LABEL
                        ),
                  },
                  this.verifyAttr ? this.renderSubmit() : this.renderVerify()
                )
              );
            }),
            class_7
          );
        })();
    },
    1772: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.d(__webpack_exports__, 'a', function () {
        return checkContact;
      }),
        __webpack_require__.d(__webpack_exports__, 'b', function () {
          return handleSignIn;
        });
      var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(164),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(104),
        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(98),
        _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(406),
        _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(56),
        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(15),
        _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(62),
        _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(413),
        __awaiter = function (thisArg, _arguments, P, generator) {
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
                step(generator.throw(value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : (function adopt(value) {
                    return value instanceof P
                      ? value
                      : new P(function (resolve) {
                          resolve(value);
                        });
                  })(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        },
        __generator = function (thisArg, body) {
          var f,
            y,
            t,
            g,
            _ = {
              label: 0,
              sent: function () {
                if (1 & t[0]) throw t[1];
                return t[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            'function' == typeof Symbol &&
              (g[Symbol.iterator] = function () {
                return this;
              }),
            g
          );
          function verb(n) {
            return function (v) {
              return (function step(op) {
                if (f) throw new TypeError('Generator is already executing.');
                for (; _; )
                  try {
                    if (
                      ((f = 1),
                      y &&
                        (t =
                          2 & op[0]
                            ? y.return
                            : op[0]
                            ? y.throw || ((t = y.return) && t.call(y), 0)
                            : y.next) &&
                        !(t = t.call(y, op[1])).done)
                    )
                      return t;
                    switch (
                      ((y = 0), t && (op = [2 & op[0], t.value]), op[0])
                    ) {
                      case 0:
                      case 1:
                        t = op;
                        break;
                      case 4:
                        return _.label++, { value: op[1], done: !1 };
                      case 5:
                        _.label++, (y = op[1]), (op = [0]);
                        continue;
                      case 7:
                        (op = _.ops.pop()), _.trys.pop();
                        continue;
                      default:
                        if (
                          !((t = _.trys),
                          (t = t.length > 0 && t[t.length - 1]) ||
                            (6 !== op[0] && 2 !== op[0]))
                        ) {
                          _ = 0;
                          continue;
                        }
                        if (
                          3 === op[0] &&
                          (!t || (op[1] > t[0] && op[1] < t[3]))
                        ) {
                          _.label = op[1];
                          break;
                        }
                        if (6 === op[0] && _.label < t[1]) {
                          (_.label = t[1]), (t = op);
                          break;
                        }
                        if (t && _.label < t[2]) {
                          (_.label = t[2]), _.ops.push(op);
                          break;
                        }
                        t[2] && _.ops.pop(), _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                  } catch (e) {
                    (op = [6, e]), (y = 0);
                  } finally {
                    f = t = 0;
                  }
                if (5 & op[0]) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: !0 };
              })([n, v]);
            };
          }
        },
        logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.a(
          'auth-helpers'
        );
      function checkContact(user, handleAuthStateChange) {
        return __awaiter(this, void 0, void 0, function () {
          var data, newUser, error_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (
                  !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a ||
                  'function' !=
                    typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a
                      .verifiedContact
                )
                  throw new Error(
                    _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.d
                  );
                if (!isCognitoUser(user))
                  return (
                    handleAuthStateChange(
                      _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                        .SignedIn,
                      user
                    ),
                    [2]
                  );
                _a.label = 1;
              case 1:
                return (
                  _a.trys.push([1, 3, , 4]),
                  [
                    4,
                    _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a.verifiedContact(
                      user
                    ),
                  ]
                );
              case 2:
                return (
                  (data = _a.sent()),
                  !Object(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.d)(
                    data.verified
                  ) ||
                  Object(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.d)(
                    data.unverified
                  )
                    ? handleAuthStateChange(
                        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                          .SignedIn,
                        user
                      )
                    : ((newUser = Object.assign(user, data)),
                      handleAuthStateChange(
                        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                          .VerifyContact,
                        newUser
                      )),
                  [3, 4]
                );
              case 3:
                return (
                  (error_1 = _a.sent()),
                  Object(_helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__.a)(
                    error_1
                  ),
                  [3, 4]
                );
              case 4:
                return [2];
            }
          });
        });
      }
      var handleSignIn = function (username, password, handleAuthStateChange) {
          return __awaiter(void 0, void 0, void 0, function () {
            var user, error_2;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  if (
                    !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a ||
                    'function' !=
                      typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a
                        .signIn
                  )
                    throw new Error(
                      _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.d
                    );
                  _a.label = 1;
                case 1:
                  return (
                    _a.trys.push([1, 9, , 10]),
                    [
                      4,
                      _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a.signIn(
                        username,
                        password
                      ),
                    ]
                  );
                case 2:
                  return (
                    (user = _a.sent()),
                    logger.debug(user),
                    user.challengeName !==
                      _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.b
                        .SMSMFA &&
                    user.challengeName !==
                      _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.b
                        .SoftwareTokenMFA
                      ? [3, 3]
                      : (logger.debug(
                          'confirm user with ' + user.challengeName
                        ),
                        handleAuthStateChange(
                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                            .ConfirmSignIn,
                          user
                        ),
                        [3, 8])
                  );
                case 3:
                  return user.challengeName !==
                    _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.b
                      .NewPasswordRequired
                    ? [3, 4]
                    : (logger.debug(
                        'require new password',
                        user.challengeParam
                      ),
                      handleAuthStateChange(
                        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                          .ResetPassword,
                        user
                      ),
                      [3, 8]);
                case 4:
                  return user.challengeName !==
                    _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.b
                      .MFASetup
                    ? [3, 5]
                    : (logger.debug('TOTP setup', user.challengeParam),
                      handleAuthStateChange(
                        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                          .TOTPSetup,
                        user
                      ),
                      [3, 8]);
                case 5:
                  return user.challengeName ===
                    _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.b
                      .CustomChallenge &&
                    user.challengeParam &&
                    'true' === user.challengeParam.trigger
                    ? (logger.debug('custom challenge', user.challengeParam),
                      handleAuthStateChange(
                        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                          .CustomConfirmSignIn,
                        user
                      ),
                      [3, 8])
                    : [3, 6];
                case 6:
                  return [4, checkContact(user, handleAuthStateChange)];
                case 7:
                  _a.sent(), (_a.label = 8);
                case 8:
                  return [3, 10];
                case 9:
                  return (
                    'UserNotConfirmedException' === (error_2 = _a.sent()).code
                      ? (logger.debug('the user is not confirmed'),
                        handleAuthStateChange(
                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                            .ConfirmSignUp,
                          { username: username }
                        ))
                      : 'PasswordResetRequiredException' === error_2.code
                      ? (logger.debug('the user requires a new password'),
                        handleAuthStateChange(
                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                            .ForgotPassword,
                          { username: username }
                        ))
                      : 'InvalidParameterException' === error_2.code &&
                        '' === password &&
                        (logger.debug('Password cannot be empty'),
                        (error_2.message =
                          _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a.EMPTY_PASSWORD)),
                    Object(_helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__.a)(
                      error_2
                    ),
                    [3, 10]
                  );
                case 10:
                  return [2];
              }
            });
          });
        },
        isCognitoUser = function (user) {
          return (
            user instanceof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.e
          );
        };
    },
  },
]);
//# sourceMappingURL=194.43062421b39d2bb010e4.bundle.js.map
