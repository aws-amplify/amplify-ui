(window.webpackJsonp = window.webpackJsonp || []).push([
  [198],
  {
    1707: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_amazon_button',
          function () {
            return AmplifyAmazonButton;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_auth0_button',
          function () {
            return AmplifyAuth0Button;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_facebook_button',
          function () {
            return AmplifyFacebookButton;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_google_button',
          function () {
            return AmplifyGoogleButton;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_oauth_button',
          function () {
            return AmplifyOAuthButton;
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
        logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a(
          'amplify-amazon-button'
        ),
        AmplifyAmazonButton = (function () {
          function class_1(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.handleAuthStateChange =
                _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__.d),
              (this.federatedSignIn = function (response) {
                var access_token = response.access_token,
                  expires_in = response.expires_in;
                if (access_token) {
                  if (
                    !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a ||
                    'function' !=
                      typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a
                        .federatedSignIn ||
                    'function' !=
                      typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a
                        .currentAuthenticatedUser
                  )
                    throw new Error(
                      _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.d
                    );
                  var expires_at = 1e3 * expires_in + new Date().getTime();
                  window.amazon.Login.retrieveProfile(function (userInfo) {
                    return __awaiter(_this, void 0, void 0, function () {
                      var user, authenticatedUser;
                      return __generator(this, function (_a) {
                        switch (_a.label) {
                          case 0:
                            return userInfo.success
                              ? ((user = {
                                  name: userInfo.profile.Name,
                                  email: userInfo.profile.PrimaryEmail,
                                }),
                                [
                                  4,
                                  _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a.federatedSignIn(
                                    'amazon',
                                    {
                                      token: access_token,
                                      expires_at: expires_at,
                                    },
                                    user
                                  ),
                                ])
                              : [2, logger.debug('Get user Info failed')];
                          case 1:
                            return (
                              _a.sent(),
                              [
                                4,
                                _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a.currentAuthenticatedUser(),
                              ]
                            );
                          case 2:
                            return (
                              (authenticatedUser = _a.sent()),
                              this.handleAuthStateChange(
                                _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__
                                  .a.SignedIn,
                                authenticatedUser
                              ),
                              [2]
                            );
                        }
                      });
                    });
                  });
                }
              });
          }
          return (
            (class_1.prototype.signInWithAmazon = function (event) {
              var _this = this;
              event.preventDefault(),
                window.amazon.Login.setClientId(this.clientId),
                window.amazon.Login.authorize(
                  { scope: 'profile' },
                  function (response) {
                    if (response.error)
                      return logger.debug(
                        'Failed to login with amazon: ' + response.error
                      );
                    try {
                      window.localStorage.setItem(
                        _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.s,
                        JSON.stringify({ provider: 'amazon' })
                      );
                    } catch (e) {
                      logger.debug(
                        'Failed to cache auth source into localStorage',
                        e
                      );
                    }
                    _this.federatedSignIn(response);
                  }
                );
            }),
            (class_1.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'amplify-sign-in-button',
                {
                  onClick: function (event) {
                    return _this.signInWithAmazon(event);
                  },
                  provider: 'amazon',
                },
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'script',
                  { src: 'https://assets.loginwithamazon.com/sdk/na/login1.js' }
                ),
                _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                  _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a
                    .SIGN_IN_WITH_AMAZON
                )
              );
            }),
            class_1
          );
        })(),
        logger$1 = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a(
          'amplify-auth0-button'
        ),
        AmplifyAuth0Button = (function () {
          function class_2(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.handleAuthStateChange =
                _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__.d),
              (this.handleLoad = function () {
                var _a =
                    _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a.configure()
                      .oauth,
                  oauth = void 0 === _a ? {} : _a,
                  _b = _this.config,
                  config = void 0 === _b ? oauth.auth0 : _b;
                config
                  ? (logger$1.debug('auth0 configuration', config),
                    _this._auth0 ||
                      (_this._auth0 = new window.auth0.WebAuth(config)),
                    _this._auth0.parseHash(function (err, authResult) {
                      if (err)
                        logger$1.debug(
                          'Failed to parse the url for Auth0',
                          err
                        );
                      else if (authResult) {
                        var payload = {
                          provider: 'auth0',
                          opts: {
                            returnTo: config.returnTo,
                            clientID: config.clientID,
                            federated: config.federated,
                          },
                        };
                        try {
                          localStorage.setItem(
                            _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.s,
                            JSON.stringify(payload)
                          );
                        } catch (e) {
                          logger$1.debug(
                            'Failed to cache auth source into localStorage',
                            e
                          );
                        }
                        _this._auth0.client.userInfo(
                          authResult.accessToken,
                          function (err, user) {
                            return __awaiter(
                              _this,
                              void 0,
                              void 0,
                              function () {
                                var username, email, authenticatedUser;
                                return __generator(this, function (_a) {
                                  switch (_a.label) {
                                    case 0:
                                      return (
                                        (username = void 0),
                                        (email = void 0),
                                        err
                                          ? logger$1.debug(
                                              'Failed to get the user info',
                                              err
                                            )
                                          : ((username = user.name),
                                            (email = user.email)),
                                        [
                                          4,
                                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a.federatedSignIn(
                                            config.domain,
                                            {
                                              token: authResult.idToken,
                                              expires_at:
                                                1e3 * authResult.expiresIn +
                                                new Date().getTime(),
                                            },
                                            { name: username, email: email }
                                          ),
                                        ]
                                      );
                                    case 1:
                                      return (
                                        _a.sent(),
                                        [
                                          4,
                                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a.currentAuthenticatedUser(),
                                        ]
                                      );
                                    case 2:
                                      return (
                                        (authenticatedUser = _a.sent()),
                                        this.handleAuthStateChange(
                                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__
                                            .a.SignedIn,
                                          authenticatedUser
                                        ),
                                        [2]
                                      );
                                  }
                                });
                              }
                            );
                          }
                        );
                      } else
                        logger$1.debug('Auth0 found no authResult in hash');
                    }))
                  : logger$1.debug('Auth0 is not configured');
              });
          }
          return (
            (class_2.prototype.signInWithAuth0 = function (event) {
              if ((event.preventDefault(), !this._auth0))
                throw new Error('the auth0 client is not configured');
              this._auth0.authorize();
            }),
            (class_2.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'amplify-sign-in-button',
                {
                  onClick: function (event) {
                    return _this.signInWithAuth0(event);
                  },
                  provider: 'auth0',
                },
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'script',
                  {
                    onLoad: this.handleLoad,
                    src: 'https://cdn.auth0.com/js/auth0/9.11/auth0.min.js',
                  }
                ),
                _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                  _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a
                    .SIGN_IN_WITH_AUTH0
                )
              );
            }),
            class_2
          );
        })(),
        logger$2 = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a(
          'amplify-facebook-button'
        ),
        AmplifyFacebookButton = (function () {
          function class_3(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.handleAuthStateChange =
                _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__.d),
              (this.federatedSignIn = function (authResponse) {
                var accessToken = authResponse.accessToken,
                  expiresIn = authResponse.expiresIn;
                if (accessToken) {
                  if (
                    !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a ||
                    'function' !=
                      typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a
                        .federatedSignIn ||
                    'function' !=
                      typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a
                        .currentAuthenticatedUser
                  )
                    throw new Error(
                      _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.d
                    );
                  var expires_at = 1e3 * expiresIn + new Date().getTime();
                  window.FB.api(
                    '/me',
                    { fields: 'name,email' },
                    function (response) {
                      return __awaiter(_this, void 0, void 0, function () {
                        var user, authenticatedUser;
                        return __generator(this, function (_a) {
                          switch (_a.label) {
                            case 0:
                              return (
                                (user = {
                                  name: response.name,
                                  email: response.email,
                                }),
                                [
                                  4,
                                  _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a.federatedSignIn(
                                    'facebook',
                                    {
                                      token: accessToken,
                                      expires_at: expires_at,
                                    },
                                    user
                                  ),
                                ]
                              );
                            case 1:
                              return (
                                _a.sent(),
                                [
                                  4,
                                  _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a.currentAuthenticatedUser(),
                                ]
                              );
                            case 2:
                              return (
                                (authenticatedUser = _a.sent()),
                                this.handleAuthStateChange(
                                  _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__
                                    .a.SignedIn,
                                  authenticatedUser
                                ),
                                [2]
                              );
                          }
                        });
                      });
                    }
                  );
                }
              }),
              (this.getLoginStatus = function () {
                window.FB.getLoginStatus(function (response) {
                  try {
                    window.localStorage.setItem(
                      _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.s,
                      JSON.stringify({ provider: 'facebook' })
                    );
                  } catch (e) {
                    logger$2.debug(
                      'Failed to cache auth source into localStorage',
                      e
                    );
                  }
                  if ('connected' === response.status)
                    return _this.federatedSignIn(response.authResponse);
                  _this.login();
                });
              }),
              (this.login = function () {
                window.FB.login(
                  function (response) {
                    response &&
                      response.authResponse &&
                      _this.federatedSignIn(response.authResponse);
                  },
                  { scope: 'public_profile,email' }
                );
              });
          }
          return (
            (class_3.prototype.signInWithFacebook = function (event) {
              event.preventDefault(),
                window.FB.init({
                  appId: this.appId,
                  cookie: !0,
                  xfbml: !1,
                  version: 'v5.0',
                }),
                this.getLoginStatus();
            }),
            (class_3.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'amplify-sign-in-button',
                {
                  onClick: function (event) {
                    return _this.signInWithFacebook(event);
                  },
                  provider: 'facebook',
                },
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'script',
                  {
                    async: !0,
                    defer: !0,
                    src: 'https://connect.facebook.net/en_US/sdk.js',
                  }
                ),
                _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                  _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a
                    .SIGN_IN_WITH_FACEBOOK
                )
              );
            }),
            class_3
          );
        })(),
        logger$3 = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a(
          'amplify-google-button'
        ),
        AmplifyGoogleButton = (function () {
          function class_4(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.handleAuthStateChange =
                _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__.d),
              (this.handleError = function (error) {
                console.error(error);
              }),
              (this.handleLoad = function () {
                window.gapi.load('auth2');
              }),
              (this.handleUser = function (user) {
                return __awaiter(_this, void 0, void 0, function () {
                  var _a, id_token, expires_at, profile, authenticatedUser;
                  return __generator(this, function (_b) {
                    switch (_b.label) {
                      case 0:
                        if (
                          !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a ||
                          'function' !=
                            typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__
                              .a.federatedSignIn ||
                          'function' !=
                            typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__
                              .a.currentAuthenticatedUser
                        )
                          throw new Error(
                            _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.d
                          );
                        try {
                          window.localStorage.setItem(
                            _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.s,
                            JSON.stringify({ provider: 'google' })
                          );
                        } catch (e) {
                          logger$3.debug(
                            'Failed to cache auth source into localStorage',
                            e
                          );
                        }
                        return (
                          (_a = user.getAuthResponse()),
                          (id_token = _a.id_token),
                          (expires_at = _a.expires_at),
                          (profile = user.getBasicProfile()),
                          [
                            4,
                            _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a.federatedSignIn(
                              'google',
                              { token: id_token, expires_at: expires_at },
                              {
                                email: profile.getEmail(),
                                name: profile.getName(),
                                picture: profile.getImageUrl(),
                              }
                            ),
                          ]
                        );
                      case 1:
                        return (
                          _b.sent(),
                          [
                            4,
                            _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a.currentAuthenticatedUser(),
                          ]
                        );
                      case 2:
                        authenticatedUser = _b.sent();
                        try {
                          this.handleAuthStateChange(
                            _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__
                              .a.SignedIn,
                            authenticatedUser
                          );
                        } catch (error) {
                          this.handleError(error);
                        }
                        return [2];
                    }
                  });
                });
              });
          }
          return (
            (class_4.prototype.getAuthInstance = function () {
              return window.gapi && window.gapi.auth2
                ? window.gapi.auth2.getAuthInstance() ||
                    window.gapi.auth2.init({
                      client_id: this.clientId,
                      cookiepolicy: 'single_host_origin',
                      scope: 'profile email openid',
                    })
                : null;
            }),
            (class_4.prototype.signInWithGoogle = function (event) {
              event.preventDefault(),
                this.getAuthInstance()
                  .signIn()
                  .then(this.handleUser)
                  .catch(this.handleError);
            }),
            (class_4.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'amplify-sign-in-button',
                {
                  onClick: function (event) {
                    return _this.signInWithGoogle(event);
                  },
                  provider: 'google',
                },
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'script',
                  {
                    onLoad: this.handleLoad,
                    src: 'https://apis.google.com/js/api:client.js',
                  }
                ),
                _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                  _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a
                    .SIGN_IN_WITH_GOOGLE
                )
              );
            }),
            class_4
          );
        })(),
        AmplifyOAuthButton = (function () {
          function AmplifyOAuthButton(hostRef) {
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.config = {});
          }
          return (
            (AmplifyOAuthButton.prototype.signInWithOAuth = function (event) {
              event.preventDefault(),
                _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a.federatedSignIn();
            }),
            (AmplifyOAuthButton.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'amplify-sign-in-button',
                {
                  onClick: function (event) {
                    return _this.signInWithOAuth(event);
                  },
                  provider: 'oauth',
                },
                this.config.label ||
                  _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                    _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a
                      .SIGN_IN_WITH_AWS
                  )
              );
            }),
            AmplifyOAuthButton
          );
        })();
    },
  },
]);
//# sourceMappingURL=198.43062421b39d2bb010e4.bundle.js.map
