(window.webpackJsonp = window.webpackJsonp || []).push([
  [192],
  {
    1709: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_authenticator',
          function () {
            return AmplifyAuthenticator;
          }
        );
      var _a,
        _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(164),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(305),
        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(98),
        _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(56),
        _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(406),
        _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__ =
          (__webpack_require__(15), __webpack_require__(62)),
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
        authSlotNames =
          (((_a = {})[
            _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a.SignIn
          ] = 'sign-in'),
          (_a[
            _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a.ConfirmSignIn
          ] = 'confirm-sign-in'),
          (_a[_auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a.SignUp] =
            'sign-up'),
          (_a[
            _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a.ConfirmSignUp
          ] = 'confirm-sign-up'),
          (_a[
            _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a.ForgotPassword
          ] = 'forgot-password'),
          (_a[
            _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a.ResetPassword
          ] = 'require-new-password'),
          (_a[
            _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a.VerifyContact
          ] = 'verify-contact'),
          (_a[
            _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a.TOTPSetup
          ] = 'totp-setup'),
          (_a[_auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a.Loading] =
            'loading'),
          _a),
        logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a(
          'Authenticator'
        ),
        AmplifyAuthenticator = (function () {
          function class_1(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.initialAuthState =
                _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a.SignIn),
              (this.handleAuthStateChange = function () {}),
              (this.authState =
                _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a.Loading),
              (this.toastMessage = ''),
              (this.handleExternalAuthEvent = function (_a) {
                var payload = _a.payload;
                switch (payload.event) {
                  case 'cognitoHostedUI':
                  case 'signIn':
                    Object(
                      _auth_helpers_bd096ca7_js__WEBPACK_IMPORTED_MODULE_9__.a
                    )(
                      payload.data,
                      _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.d
                    );
                    break;
                  case 'cognitoHostedUI_failure':
                  case 'parsingUrl_failure':
                  case 'signOut':
                  case 'customGreetingSignOut':
                    return Object(
                      _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.d
                    )(_this.initialAuthState);
                }
              }),
              (this.handleToastEvent = function (_a) {
                var payload = _a.payload;
                switch (payload.event) {
                  case _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.h:
                    payload.message && (_this.toastMessage = payload.message);
                }
              });
          }
          return (
            (class_1.prototype.componentWillLoad = function () {
              return __awaiter(this, void 0, void 0, function () {
                var byHostedUI,
                  _this = this;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      return (
                        Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.h
                        )(function (authState, authData) {
                          _this.onAuthStateChange(authState, authData),
                            (_this.toastMessage = '');
                        }),
                        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.listen(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.i,
                          this.handleToastEvent
                        ),
                        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.listen(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.a,
                          this.handleExternalAuthEvent
                        ),
                        Object(
                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.j
                        )('amplify-authenticator'),
                        (byHostedUI = localStorage.getItem(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.f
                        )),
                        localStorage.removeItem(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.f
                        ),
                        'true' === byHostedUI ? [3, 2] : [4, this.checkUser()]
                      );
                    case 1:
                      _a.sent(), (_a.label = 2);
                    case 2:
                      return [2];
                  }
                });
              });
            }),
            (class_1.prototype.checkUser = function () {
              return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                  if (
                    !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a ||
                    'function' !=
                      typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a
                        .currentAuthenticatedUser
                  )
                    throw new Error(
                      _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.d
                    );
                  return [
                    2,
                    _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a
                      .currentAuthenticatedUser()
                      .then(function (user) {
                        Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.d
                        )(
                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a
                            .SignedIn,
                          user
                        );
                      })
                      .catch(function () {
                        return __awaiter(_this, void 0, void 0, function () {
                          var cachedAuthState, error_1;
                          return __generator(this, function (_a) {
                            switch (_a.label) {
                              case 0:
                                cachedAuthState = null;
                                try {
                                  cachedAuthState = localStorage.getItem(
                                    _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.l
                                  );
                                } catch (error) {
                                  logger.debug(
                                    'Failed to get the auth state from local storage',
                                    error
                                  );
                                }
                                _a.label = 1;
                              case 1:
                                return (
                                  _a.trys.push([1, 4, , 5]),
                                  cachedAuthState !==
                                  _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__
                                    .a.SignedIn
                                    ? [3, 3]
                                    : [
                                        4,
                                        _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_5__.a.signOut(),
                                      ]
                                );
                              case 2:
                                _a.sent(), (_a.label = 3);
                              case 3:
                                return (
                                  Object(
                                    _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.d
                                  )(this.initialAuthState),
                                  [3, 5]
                                );
                              case 4:
                                return (
                                  (error_1 = _a.sent()),
                                  logger.debug('Failed to sign out', error_1),
                                  [3, 5]
                                );
                              case 5:
                                return [2];
                            }
                          });
                        });
                      }),
                  ];
                });
              });
            }),
            (class_1.prototype.onAuthStateChange = function (
              nextAuthState,
              data
            ) {
              return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                  return void 0 === nextAuthState
                    ? [2, logger.error('nextAuthState cannot be undefined')]
                    : (logger.info(
                        'Inside onAuthStateChange Method current authState:',
                        this.authState
                      ),
                      nextAuthState ===
                      _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a
                        .SignedOut
                        ? (this.authState = this.initialAuthState)
                        : (this.authState = nextAuthState),
                      (this.authData = data),
                      this.authData &&
                        logger.log('Auth Data was set:', this.authData),
                      this.authState === nextAuthState &&
                        (this.handleAuthStateChange(
                          this.authState,
                          this.authData
                        ),
                        logger.info(
                          'authState has been updated to ' + this.authState
                        )),
                      [2]);
                });
              });
            }),
            (class_1.prototype.getAuthComponent = function (authState) {
              switch (authState) {
                case _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a
                  .SignIn:
                  return Object(
                    _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                  )('amplify-sign-in', {
                    federated: this.federated,
                    usernameAlias: this.usernameAlias,
                  });
                case _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a
                  .ConfirmSignIn:
                  return Object(
                    _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                  )('amplify-confirm-sign-in', { user: this.authData });
                case _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a
                  .SignUp:
                  return Object(
                    _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                  )('amplify-sign-up', { usernameAlias: this.usernameAlias });
                case _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a
                  .ConfirmSignUp:
                  return Object(
                    _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                  )('amplify-confirm-sign-up', {
                    user: this.authData,
                    usernameAlias: this.usernameAlias,
                  });
                case _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a
                  .ForgotPassword:
                  return Object(
                    _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                  )('amplify-forgot-password', {
                    usernameAlias: this.usernameAlias,
                  });
                case _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a
                  .ResetPassword:
                  return Object(
                    _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                  )('amplify-require-new-password', { user: this.authData });
                case _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a
                  .VerifyContact:
                  return Object(
                    _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                  )('amplify-verify-contact', { user: this.authData });
                case _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a
                  .TOTPSetup:
                  return Object(
                    _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                  )('amplify-totp-setup', { user: this.authData });
                case _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a
                  .Loading:
                  return Object(
                    _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                  )('div', null, 'Loading...');
                default:
                  throw new Error('Unhandled auth state: ' + authState);
              }
            }),
            (class_1.prototype.getSlotWithAuthComponent = function (authState) {
              var authComponent = this.getAuthComponent(authState),
                slotName = authSlotNames[authState],
                slotIsEmpty =
                  null === this.el.querySelector('[slot="' + slotName + '"]');
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'slot',
                { name: slotName },
                slotIsEmpty && authComponent
              );
            }),
            (class_1.prototype.componentWillUnload = function () {
              return (
                _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.remove(
                  _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.a,
                  this.handleExternalAuthEvent
                ),
                _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.remove(
                  _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_7__.i,
                  this.handleToastEvent
                ),
                _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_8__.h
              );
            }),
            (class_1.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.b,
                null,
                this.toastMessage
                  ? Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-toast',
                      {
                        message: this.toastMessage,
                        handleClose: function () {
                          _this.toastMessage = '';
                        },
                        'data-test': 'authenticator-error',
                      }
                    )
                  : null,
                this.authState ===
                  _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__.a
                    .SignedIn
                  ? [
                      Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                        'slot',
                        { name: 'greetings' }
                      ),
                      Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                        'slot',
                        null
                      ),
                    ]
                  : Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'div',
                      { class: 'auth-container' },
                      this.getSlotWithAuthComponent(this.authState)
                    )
              );
            }),
            Object.defineProperty(class_1.prototype, 'el', {
              get: function () {
                return Object(
                  _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.h
                )(this);
              },
              enumerable: !1,
              configurable: !0,
            }),
            class_1
          );
        })();
      AmplifyAuthenticator.style =
        ':host{--background-color:var(--amplify-background-color);--width:28.75rem;--min-width:20rem;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;--box-shadow:1px 1px 4px 0 rgba(0, 0, 0, 0.15);--border-radius:6px;--padding:35px 40px;--margin-bottom:20px;--container-height:100vh;--container-display:flex;--container-justify:center;--container-align:center}.auth-container{display:var(--container-display);-ms-flex-pack:var(--container-justify);justify-content:var(--container-justify);-ms-flex-align:var(--container-align);align-items:var(--container-align);min-height:var(--container-height)}';
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
//# sourceMappingURL=192.43062421b39d2bb010e4.bundle.js.map
