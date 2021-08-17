(window.webpackJsonp = window.webpackJsonp || []).push([
  [217],
  {
    1730: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_select_mfa_type',
          function () {
            return AmplifySelectMFAType;
          }
        );
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(164),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(19),
        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(98),
        _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(406),
        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(15),
        _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(62),
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
        logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a(
          'SelectMFAType'
        ),
        AmplifySelectMFAType = (function () {
          function class_1(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.handleSubmit = function (event) {
                return _this.verify(event);
              }),
              (this.TOTPSetup = !1),
              (this.selectMessage = null),
              (this.MFAMethod = null),
              (this.isTOTP = !1),
              (this.isNoMFA = !1),
              (this.isSMS = !1),
              (this.loading = !1);
          }
          return (
            (class_1.prototype.handleRadioButtonChange = function (event) {
              (this.TOTPSetup = !1),
                (this.selectMessage = null),
                (this.isNoMFA = !1),
                (this.isTOTP = !1),
                (this.isSMS = !1);
              var _a = event.target,
                value = _a.value,
                type = _a.type,
                checked = _a.checked,
                checkType = ['radio', 'checkbox'].includes(type);
              value ===
                _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.c.SMS &&
                checkType &&
                (this.isSMS = checked),
                value ===
                  _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.c.TOTP &&
                  checkType &&
                  (this.isTOTP = checked),
                value ===
                  _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.c
                    .NOMFA &&
                  checkType &&
                  (this.isNoMFA = checked);
            }),
            (class_1.prototype.verify = function (event) {
              return __awaiter(this, void 0, void 0, function () {
                var user, preferredMFAData, error_1, message;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (
                        (event && event.preventDefault(),
                        logger.debug('MFA Type Values', {
                          TOTP: this.isTOTP,
                          SMS: this.isSMS,
                          'No MFA': this.isNoMFA,
                        }),
                        this.isTOTP
                          ? (this.MFAMethod =
                              _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.c.TOTP)
                          : this.isSMS
                          ? (this.MFAMethod =
                              _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.c.SMS)
                          : this.isNoMFA &&
                            (this.MFAMethod =
                              _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.c.NOMFA),
                        (user = this.authData),
                        !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a ||
                          'function' !=
                            typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__
                              .a.setPreferredMFA)
                      )
                        throw new Error(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.d
                        );
                      (this.loading = !0), (_a.label = 1);
                    case 1:
                      return (
                        _a.trys.push([1, 3, 4, 5]),
                        [
                          4,
                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a.setPreferredMFA(
                            user,
                            this.MFAMethod
                          ),
                        ]
                      );
                    case 2:
                      return (
                        (preferredMFAData = _a.sent()),
                        logger.debug(
                          'Set Preferred MFA Succeeded',
                          preferredMFAData
                        ),
                        (this.selectMessage =
                          _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                            _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__
                              .a.SUCCESS_MFA_TYPE
                          ) +
                          ' ' +
                          this.MFAMethod),
                        [3, 5]
                      );
                    case 3:
                      return (
                        (error_1 = _a.sent()),
                        (message = error_1.message) ===
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.o ||
                        message ===
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.p
                          ? ((this.TOTPSetup = !0),
                            (this.selectMessage =
                              _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__
                                  .a.SETUP_TOTP_REQUIRED
                              )))
                          : (logger.debug('Set Preferred MFA failed', error_1),
                            (this.selectMessage =
                              _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__
                                  .a.UNABLE_TO_SETUP_MFA_AT_THIS_TIME
                              ))),
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
            (class_1.prototype.contentBuilder = function () {
              var _this = this;
              if (!this.MFATypes || Object.keys(this.MFATypes).length < 2)
                return (
                  logger.debug(
                    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                      _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a
                        .LESS_THAN_TWO_MFA_VALUES_MESSAGE
                    )
                  ),
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    null,
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'a',
                      null,
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a
                          .LESS_THAN_TWO_MFA_VALUES_MESSAGE
                      )
                    )
                  )
                );
              var _a = this.MFATypes,
                SMS = _a.SMS,
                TOTP = _a.TOTP,
                Optional = _a.Optional;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'amplify-form-section',
                {
                  submitButtonText:
                    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                      _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a
                        .SELECT_MFA_TYPE_SUBMIT_BUTTON_TEXT
                    ),
                  headerText:
                    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                      _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a
                        .SELECT_MFA_TYPE_HEADER_TEXT
                    ),
                  handleSubmit: function (event) {
                    return _this.handleSubmit(event);
                  },
                  loading: this.loading,
                },
                SMS
                  ? Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-radio-button',
                      {
                        key: 'sms',
                        name: 'MFAType',
                        value: 'SMS',
                        label: 'SMS',
                        handleInputChange: function (event) {
                          return _this.handleRadioButtonChange(event);
                        },
                      }
                    )
                  : null,
                TOTP
                  ? Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-radio-button',
                      {
                        key: 'totp',
                        name: 'MFAType',
                        value: 'TOTP',
                        label: 'TOTP',
                        handleInputChange: function (event) {
                          return _this.handleRadioButtonChange(event);
                        },
                      }
                    )
                  : null,
                Optional
                  ? Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-radio-button',
                      {
                        key: 'noMFA',
                        name: 'MFAType',
                        value: 'NOMFA',
                        label: 'No MFA',
                        handleInputChange: function (event) {
                          return _this.handleRadioButtonChange(event);
                        },
                      }
                    )
                  : null
              );
            }),
            (class_1.prototype.render = function () {
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'div',
                null,
                this.contentBuilder(),
                this.TOTPSetup
                  ? Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-totp-setup',
                      { user: this.authData }
                    )
                  : null
              );
            }),
            class_1
          );
        })();
    },
  },
]);
//# sourceMappingURL=217.43062421b39d2bb010e4.bundle.js.map
