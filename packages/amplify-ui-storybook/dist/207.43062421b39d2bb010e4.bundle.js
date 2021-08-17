(window.webpackJsonp = window.webpackJsonp || []).push([
  [207],
  {
    1718: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_icon_button',
          function () {
            return AmplifyIconButton;
          }
        );
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        AmplifyIconButton = (function () {
          function AmplifyIconButton(hostRef) {
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.tooltip = null),
              (this.autoShowTooltip = !1);
          }
          return (
            (AmplifyIconButton.prototype.render = function () {
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'span',
                { class: 'action-button' },
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'amplify-tooltip',
                  { text: this.tooltip, shouldAutoShow: this.autoShowTooltip },
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'button',
                    null,
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-icon',
                      { name: this.name }
                    )
                  )
                )
              );
            }),
            AmplifyIconButton
          );
        })();
      AmplifyIconButton.style =
        ':host{--button-color:var(--amplify-secondary-contrast);--button-background-hover:var(--amplify-secondary-color)}.action-button button{position:relative;padding:0;background:none;height:54px;width:54px;cursor:pointer;outline:none;text-decoration:none;border:none;border-radius:30px;-webkit-transition:all 0.3s ease-in-out;transition:all 0.3s ease-in-out;color:var(--button-color);fill:currentColor}.action-button button:hover{background-color:var(--button-background-hover);-webkit-box-shadow:0.3px 0.3px 0.3px rgba(0, 0, 0, 0.3);box-shadow:0.3px 0.3px 0.3px rgba(0, 0, 0, 0.3)}.action-button button:hover>.tooltip{display:block}.action-button button:hover>svg{-webkit-filter:none;filter:none}.action-button button:focus{outline:none}.action-button button svg{width:1.8em;height:1.8em;-webkit-filter:drop-shadow(1px 1px 1px var(--amplify-grey));filter:drop-shadow(1px 1px 1px var(--amplify-grey))}';
    },
  },
]);
//# sourceMappingURL=207.43062421b39d2bb010e4.bundle.js.map
