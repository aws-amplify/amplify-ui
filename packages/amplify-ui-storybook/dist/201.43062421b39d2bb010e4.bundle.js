(window.webpackJsonp = window.webpackJsonp || []).push([
  [201],
  {
    1711: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_checkbox',
          function () {
            return AmplifyCheckbox;
          }
        );
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        AmplifyCheckbox = (function () {
          function AmplifyCheckbox(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.checked = !1),
              (this.disabled = !1),
              (this.onClick = function () {
                _this.checked = !_this.checked;
              });
          }
          return (
            (AmplifyCheckbox.prototype.render = function () {
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'span',
                { class: 'checkbox' },
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'input',
                  {
                    onClick: this.onClick,
                    type: 'checkbox',
                    name: this.name,
                    value: this.value,
                    id: this.fieldId,
                    checked: this.checked,
                    disabled: this.disabled,
                  }
                ),
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'amplify-label',
                  { htmlFor: this.fieldId },
                  this.label
                )
              );
            }),
            AmplifyCheckbox
          );
        })();
      AmplifyCheckbox.style =
        ':host{--font-family:var(--amplify-font-family)}.checkbox{margin-bottom:22px;display:block;width:100%;padding:16px;font-size:var(--amplify-text-sm);font-family:var(--font-family)}.checkbox input{margin-right:12px}';
    },
  },
]);
//# sourceMappingURL=201.43062421b39d2bb010e4.bundle.js.map
