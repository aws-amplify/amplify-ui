(window.webpackJsonp = window.webpackJsonp || []).push([
  [200],
  {
    1710: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_button',
          function () {
            return AmplifyButton;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_loading_spinner',
          function () {
            return AmplifyLoadingSpinner;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_section',
          function () {
            return AmplifySection;
          }
        );
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_4__ =
          (__webpack_require__(98),
          __webpack_require__(15),
          __webpack_require__(62),
          __webpack_require__(413)),
        AmplifyButton = (function () {
          function AmplifyButton(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.type = 'button'),
              (this.variant = 'button'),
              (this.disabled = !1),
              (this.handleClick = function (ev) {
                if (_this.handleButtonClick) _this.handleButtonClick(ev);
                else if (
                  Object(_helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_4__.e)(
                    _this.el
                  ) &&
                  'submit' == _this.type
                ) {
                  var form = _this.el.closest('form');
                  if (!form) {
                    var formSection = _this.el.closest('amplify-form-section');
                    form =
                      formSection &&
                      formSection.shadowRoot.querySelector('form');
                  }
                  if (form) {
                    ev.preventDefault();
                    var fakeButton = document.createElement('button');
                    (fakeButton.type = _this.type),
                      (fakeButton.style.display = 'none'),
                      form.appendChild(fakeButton),
                      fakeButton.click(),
                      fakeButton.remove();
                  }
                }
              });
          }
          return (
            (AmplifyButton.prototype.render = function () {
              var _a;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'button',
                {
                  class: ((_a = {}), (_a[this.variant] = !0), _a),
                  type: this.type,
                  disabled: this.disabled,
                  onClick: this.handleClick,
                },
                'icon' === this.variant &&
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-icon',
                    { name: this.icon }
                  ),
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'slot',
                  null
                )
              );
            }),
            Object.defineProperty(AmplifyButton.prototype, 'el', {
              get: function () {
                return Object(
                  _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.h
                )(this);
              },
              enumerable: !1,
              configurable: !0,
            }),
            AmplifyButton
          );
        })();
      AmplifyButton.style =
        ':host{--background-color:var(--amplify-primary-color);--background-color-active:var(--amplify-primary-shade);--background-color-disable:var(--amplify-primary-tint);--color:var(--amplify-primary-contrast);--border-width:0;--border-color:initial;--border-style:initial;--link-color:var(--amplify-primary-color);--link-hover:var(--amplify-primary-tint);--link-active:var(--amplify-primary-shade);--text-transform:uppercase;--icon-fill:var(--amplify-white);--icon-height:1.25rem;--padding:1rem;--width:100%;width:var(--width);text-align:center}@media (min-width: 672px){:host{width:inherit}}.button{width:100%;min-width:153px;display:inline-block;margin-bottom:0;font-size:var(--amplify-text-sm);font-family:var(--amplify-font-family);font-weight:600;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;color:var(--color);padding:var(--padding);letter-spacing:0.75px;text-transform:var(--text-transform);background-color:var(--background-color);border-width:var(--border-width);border-color:var(--border-color);border-style:var(--border-style)}.button:active{opacity:1;background-color:var(--background-color-active)}.button:hover{opacity:0.8}.button:disabled{opacity:0.65;cursor:auto;background-color:var(--background-color-disable)}.icon{background-color:inherit;border:none;font:inherit;cursor:pointer;padding:var(--padding)}.icon amplify-icon{--icon-fill-color:var(--icon-fill);--height:var(--icon-height)}.anchor{color:var(--link-color);background-color:inherit;padding:0;border:none;font:inherit;cursor:pointer}.anchor:link{color:var(--link-color);text-decoration:none}.anchor:hover{color:var(--link-hover);text-decoration:underline}.anchor:active{color:var(--link-active);text-decoration:underline}';
      var AmplifyLoadingSpinner = (function () {
        function AmplifyLoadingSpinner(hostRef) {
          Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
            this,
            hostRef
          );
        }
        return (
          (AmplifyLoadingSpinner.prototype.render = function () {
            return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
              'amplify-icon',
              { class: 'loading-spinner', name: 'loading' }
            );
          }),
          AmplifyLoadingSpinner
        );
      })();
      AmplifyLoadingSpinner.style =
        ':host{--spinner-circle-fill:var(--amplify-smoke-white);--spinner-bar-fill:var(--amplify-primary-color);--width:0.875rem;--height:0.875rem}.loading-spinner svg{-webkit-animation:loading-spinner 1s linear infinite;animation:loading-spinner 1s linear infinite;width:var(--width);height:var(--height)}.loading-spinner svg #spinner-circle{fill:var(--spinner-circle-fill)}.loading-spinner svg #spinner-bar{fill:var(--spinner-bar-fill)}@-webkit-keyframes loading-spinner{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes loading-spinner{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}';
      var AmplifySection = (function () {
        function AmplifySection(hostRef) {
          Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
            this,
            hostRef
          ),
            (this.role = 'application');
        }
        return (
          (AmplifySection.prototype.render = function () {
            return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
              'section',
              { class: 'section', role: this.role },
              Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'slot',
                null
              )
            );
          }),
          Object.defineProperty(AmplifySection.prototype, 'el', {
            get: function () {
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.h)(
                this
              );
            },
            enumerable: !1,
            configurable: !0,
          }),
          AmplifySection
        );
      })();
      AmplifySection.style =
        ':host{--font-family:var(--amplify-font-family);--background-color:var(--amplify-background-color)}.section{position:relative;margin-bottom:var(--margin-bottom, 20px);background-color:var(--background-color);padding:var(--padding, 35px 40px);text-align:left;display:inline-block;border-radius:var(--border-radius, 6px);-webkit-box-shadow:var(--box-shadow, 1px 1px 4px 0 rgba(0, 0, 0, 0.15));box-shadow:var(--box-shadow, 1px 1px 4px 0 rgba(0, 0, 0, 0.15));-webkit-box-sizing:border-box;box-sizing:border-box;font-family:var(--font-family);width:100%;min-width:var(--min-width, 20rem)}@media (min-width: 672px){.section{width:var(--width, 28.75rem)}}';
    },
  },
]);
//# sourceMappingURL=200.43062421b39d2bb010e4.bundle.js.map
