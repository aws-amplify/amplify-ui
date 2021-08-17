(window.webpackJsonp = window.webpackJsonp || []).push([
  [205],
  {
    1716: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_form_field',
          function () {
            return AmplifyFormField;
          }
        ),
        __webpack_require__.d(__webpack_exports__, 'amplify_hint', function () {
          return AmplifyHint;
        }),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_input',
          function () {
            return AmplifyInput;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_label',
          function () {
            return AmplifyLabel;
          }
        );
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        AmplifyFormField = (function () {
          function AmplifyFormField(hostRef) {
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.type = 'text'),
              (this.required = !1),
              (this.placeholder = '');
          }
          return (
            (AmplifyFormField.prototype.render = function () {
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'div',
                { class: 'form-field' },
                this.label &&
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    { class: 'form-field-label' },
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-label',
                      { htmlFor: this.fieldId },
                      this.label
                    )
                  ),
                this.description &&
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    {
                      id: this.fieldId + '-description',
                      class: 'form-field-description',
                      'data-test': 'form-field-description',
                    },
                    this.description
                  ),
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'div',
                  null,
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'slot',
                    { name: 'input' },
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-input',
                      {
                        fieldId: this.fieldId,
                        description: this.description,
                        type: this.type,
                        handleInputChange: this.handleInputChange,
                        placeholder: this.placeholder,
                        name: this.name,
                        value: this.value,
                        inputProps: this.inputProps,
                        disabled: this.disabled,
                      }
                    )
                  )
                ),
                this.hint &&
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-hint',
                    { id: this.fieldId + '-hint' },
                    this.hint
                  )
              );
            }),
            AmplifyFormField
          );
        })();
      AmplifyFormField.style =
        ':host{--label-font-size:var(--amplify-text-md);--description-font-size:var(--amplify-text-sm)}.form-field{margin-bottom:15px}.form-field-label{display:block;font-size:var(--label-font-size);padding-bottom:0.5em}.form-field-description{font-size:var(--description-font-size);padding-top:0.5em}';
      var AmplifyHint = (function () {
        function AmplifyHint(hostRef) {
          Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
            this,
            hostRef
          );
        }
        return (
          (AmplifyHint.prototype.render = function () {
            return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
              'div',
              { class: 'hint' },
              Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'slot',
                null
              )
            );
          }),
          AmplifyHint
        );
      })();
      AmplifyHint.style =
        ':host{--color:var(--amplify-grey);--font-family:var(--amplify-font-family);--font-size:var(--amplify-text-xs);--font-weight:var(--amplify-font-weight)}.hint{color:var(--color);font-family:var(--font-family);font-weight:var(--font-weight);font-size:var(--font-size);margin-bottom:2.625rem}';
      var AmplifyInput = (function () {
        function AmplifyInput(hostRef) {
          Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
            this,
            hostRef
          ),
            (this.type = 'text'),
            (this.handleInputChange = function () {}),
            (this.placeholder = ''),
            (this.formSubmit = Object(
              _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.f
            )(this, 'formSubmit', 7));
        }
        return (
          (AmplifyInput.prototype.handleKeyDown = function (ev) {
            'Enter' === ev.key && this.formSubmit.emit(ev);
          }),
          (AmplifyInput.prototype.render = function () {
            var _this = this;
            return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
              _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.b,
              { class: 'input-host' },
              Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'input',
                Object.assign(
                  {
                    id: this.fieldId,
                    'aria-describedby':
                      this.fieldId && this.description
                        ? this.fieldId + '-description'
                        : null,
                    type: this.type,
                    onInput: function (event) {
                      return _this.handleInputChange(event);
                    },
                    placeholder: this.placeholder,
                    name: this.name,
                    class: 'input',
                    value: this.value,
                    disabled: this.disabled,
                  },
                  this.inputProps
                )
              )
            );
          }),
          AmplifyInput
        );
      })();
      AmplifyInput.style =
        ':host{--color:var(--amplify-secondary-color);--background-color:var(--amplify-secondary-contrast);--border-color:var(--amplify-light-grey);--border-color-focus:var(--amplify-primary-color);--border:1px solid var(--border-color);--margin:0 0 0.625rem 0}.input-host{width:100%}.input{display:block;width:100%;padding:1rem;font-size:var(--amplify-text-sm);color:var(--color);background-color:var(--background-color);background-image:none;border:var(--border);border-radius:3px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:var(--margin);height:3.125rem;line-height:1.1}.input:focus{outline:none;border-color:var(--border-color-focus)}.input:disabled{opacity:0.5}';
      var AmplifyLabel = (function () {
        function AmplifyLabel(hostRef) {
          Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
            this,
            hostRef
          );
        }
        return (
          (AmplifyLabel.prototype.render = function () {
            return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
              'label',
              { class: 'label', htmlFor: this.htmlFor },
              Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'slot',
                null
              )
            );
          }),
          AmplifyLabel
        );
      })();
      AmplifyLabel.style =
        ':host{--label-color:var(--amplify-secondary-color)}.label{color:var(--label-color);font-size:var(--amplify-text-sm);margin-bottom:16px}';
    },
  },
]);
//# sourceMappingURL=205.43062421b39d2bb010e4.bundle.js.map
