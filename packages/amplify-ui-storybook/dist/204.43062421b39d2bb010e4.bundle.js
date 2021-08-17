(window.webpackJsonp = window.webpackJsonp || []).push([
  [204],
  {
    1715: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_federated_sign_in',
          function () {
            return AmplifyFederatedSignIn;
          }
        );
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(164),
        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(98),
        _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(406),
        _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(62),
        logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a(
          'amplify-federated-sign-in'
        ),
        AmplifyFederatedSignIn = (function () {
          function AmplifyFederatedSignIn(hostRef) {
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.authState =
                _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a.SignIn),
              (this.federated = {});
          }
          return (
            (AmplifyFederatedSignIn.prototype.componentWillLoad = function () {
              if (
                !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a ||
                'function' !=
                  typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a
                    .configure
              )
                throw new Error(
                  _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_4__.d
                );
              var _a =
                  _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a.configure()
                    .oauth,
                oauth = void 0 === _a ? {} : _a;
              oauth.domain
                ? (this.federated.oauth_config = Object.assign(
                    Object.assign({}, this.federated.oauth_config),
                    oauth
                  ))
                : oauth.awsCognito &&
                  (this.federated.oauth_config = Object.assign(
                    Object.assign({}, this.federated.oauth_config),
                    oauth.awsCognito
                  )),
                oauth.auth0 &&
                  (this.federated.auth0 = Object.assign(
                    Object.assign({}, this.federated.auth0),
                    oauth.auth0
                  ));
            }),
            (AmplifyFederatedSignIn.prototype.render = function () {
              return this.federated
                ? Object.values(
                    _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                  ).includes(this.authState)
                  ? (logger.debug('federated Config is', this.federated),
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-form-section',
                      { 'data-test': 'federated-sign-in-section' },
                      Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                        'amplify-section',
                        { 'data-test': 'federated-sign-in-body-section' },
                        Object(
                          _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                        )('amplify-federated-buttons', {
                          authState: this.authState,
                          'data-test': 'federated-sign-in-buttons',
                          federated: this.federated,
                        })
                      )
                    ))
                  : null
                : (logger.debug('federated prop is empty. show nothing'),
                  logger.debug(
                    'federated={google_client_id: , facebook_app_id: , amazon_client_id}'
                  ),
                  null);
            }),
            AmplifyFederatedSignIn
          );
        })();
    },
  },
]);
//# sourceMappingURL=204.43062421b39d2bb010e4.bundle.js.map
