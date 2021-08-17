(window.webpackJsonp = window.webpackJsonp || []).push([
  [211],
  {
    1723: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_picker',
          function () {
            return AmplifyPicker;
          }
        );
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(19),
        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(15),
        AmplifyPicker = (function () {
          function AmplifyPicker(hostRef) {
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.pickerText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_2__.a.PICKER_TEXT),
              (this.acceptValue = '*/*');
          }
          return (
            (AmplifyPicker.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'div',
                { class: 'picker' },
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'slot',
                  { name: 'picker' },
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-button',
                    null,
                    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                      this.pickerText
                    )
                  )
                ),
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'input',
                  {
                    title: _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                      this.pickerText
                    ),
                    type: 'file',
                    accept: this.acceptValue,
                    onChange: function (e) {
                      return _this.inputHandler(e);
                    },
                  }
                )
              );
            }),
            AmplifyPicker
          );
        })();
      AmplifyPicker.style =
        '.picker{position:relative;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}input[type=file]{width:100%;height:100%;display:inline-block;position:absolute;left:0;top:0;opacity:0;cursor:pointer}';
    },
  },
]);
//# sourceMappingURL=211.43062421b39d2bb010e4.bundle.js.map
