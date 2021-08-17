(window.webpackJsonp = window.webpackJsonp || []).push([
  [203],
  {
    1714: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_federated_buttons',
          function () {
            return AmplifyFederatedButtons;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_strike',
          function () {
            return AmplifyStrike;
          }
        );
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(104),
        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(98),
        _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(406),
        _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_5__ =
          (__webpack_require__(15), __webpack_require__(62)),
        _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(413),
        AmplifyFederatedButtons = (function () {
          function AmplifyFederatedButtons(hostRef) {
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.authState =
                _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a.SignIn),
              (this.federated = {}),
              (this.handleAuthStateChange =
                _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_6__.d);
          }
          return (
            (AmplifyFederatedButtons.prototype.componentWillLoad = function () {
              if (
                !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a ||
                'function' !=
                  typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a
                    .configure
              )
                throw new Error(
                  _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_5__.d
                );
              var _a =
                  _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a.configure()
                    .oauth,
                oauth = void 0 === _a ? {} : _a;
              oauth.domain
                ? (this.federated.oauthConfig = Object.assign(
                    Object.assign({}, this.federated.oauthConfig),
                    oauth
                  ))
                : oauth.awsCognito &&
                  (this.federated.oauthConfig = Object.assign(
                    Object.assign({}, this.federated.oauthConfig),
                    oauth.awsCognito
                  )),
                oauth.auth0 &&
                  (this.federated.auth0Config = Object.assign(
                    Object.assign({}, this.federated.auth0Config),
                    oauth.auth0
                  ));
            }),
            (AmplifyFederatedButtons.prototype.render = function () {
              if (
                !Object.values(
                  _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                ).includes(this.authState)
              )
                return null;
              if (
                Object(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.d)(
                  this.federated
                )
              )
                return null;
              var _a = this.federated,
                amazonClientId = _a.amazonClientId,
                auth0Config = _a.auth0Config,
                facebookAppId = _a.facebookAppId,
                googleClientId = _a.googleClientId,
                oauthConfig = _a.oauthConfig;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'div',
                null,
                googleClientId &&
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    null,
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-google-button',
                      {
                        clientId: googleClientId,
                        handleAuthStateChange: this.handleAuthStateChange,
                      }
                    )
                  ),
                facebookAppId &&
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    null,
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-facebook-button',
                      {
                        appId: facebookAppId,
                        handleAuthStateChange: this.handleAuthStateChange,
                      }
                    )
                  ),
                amazonClientId &&
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    null,
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-amazon-button',
                      {
                        clientId: amazonClientId,
                        handleAuthStateChange: this.handleAuthStateChange,
                      }
                    )
                  ),
                oauthConfig &&
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    null,
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-oauth-button',
                      { config: oauthConfig }
                    )
                  ),
                auth0Config &&
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    null,
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-auth0-button',
                      {
                        config: auth0Config,
                        handleAuthStateChange: this.handleAuthStateChange,
                      }
                    )
                  )
              );
            }),
            AmplifyFederatedButtons
          );
        })(),
        AmplifyStrike = (function () {
          function AmplifyStrike(hostRef) {
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            );
          }
          return (
            (AmplifyStrike.prototype.render = function () {
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'span',
                { class: 'strike-content' },
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'slot',
                  null
                )
              );
            }),
            AmplifyStrike
          );
        })();
      AmplifyStrike.style =
        '.sc-amplify-strike-h{--color:var(--amplify-grey);--border-color:var(--amplify-light-grey);--content-background:var(--amplify-white);display:block;width:100%;text-align:center;border-bottom:1px solid var(--border-color);line-height:0.1em;margin:32px 0;color:var(--color)}.strike-content.sc-amplify-strike{background:var(--content-background);padding:0 25px;font-size:var(--amplify-text-sm);font-weight:500}';
    },
  },
]);
//# sourceMappingURL=203.43062421b39d2bb010e4.bundle.js.map
