(window.webpackJsonp = window.webpackJsonp || []).push([
  [206],
  {
    1717: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_greetings',
          function () {
            return AmplifyGreetings;
          }
        );
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_4__ =
          (__webpack_require__(98),
          __webpack_require__(15),
          __webpack_require__(62),
          __webpack_require__(413)),
        AmplifyGreetings = (function () {
          function AmplifyGreetings(hostRef) {
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.username = null),
              (this.logo = null),
              (this.handleAuthStateChange =
                _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_4__.d);
          }
          return (
            (AmplifyGreetings.prototype.render = function () {
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'header',
                { class: 'greetings' },
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'span',
                  { class: 'logo' },
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'slot',
                    { name: 'logo' },
                    this.logo &&
                      Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                        'span',
                        null,
                        this.logo
                      )
                  )
                ),
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'span',
                  { class: 'nav' },
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'slot',
                    { name: 'nav' },
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-nav',
                      null,
                      this.username &&
                        Object(
                          _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                        )(
                          'slot',
                          { name: 'greetings-message' },
                          Object(
                            _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                          )('span', null, 'Hello, ', this.username)
                        ),
                      Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                        'amplify-sign-out',
                        { handleAuthStateChange: this.handleAuthStateChange }
                      )
                    )
                  )
                )
              );
            }),
            AmplifyGreetings
          );
        })();
      AmplifyGreetings.style =
        ':host{--background-color:var(--amplify-white);--border-color:var(--amplify-light-grey);--font-family:var(--amplify-font-family)}.greetings{display:-ms-flexbox;display:flex;border:1px solid transparent;background-color:var(--background-color);border-color:var(--border-color);padding:0.625rem;font-family:var(--font-family);-ms-flex-pack:justify;justify-content:space-between}.nav{display:-ms-flexbox;display:flex;-ms-flex-item-align:center;align-self:center}.logo{display:-ms-flexbox;display:flex;-ms-flex-item-align:center;align-self:center;justify-self:flex-start}amplify-sign-out{margin-left:1rem}';
    },
  },
]);
//# sourceMappingURL=206.43062421b39d2bb010e4.bundle.js.map
