(window.webpackJsonp = window.webpackJsonp || []).push([
  [210],
  {
    1722: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_photo_picker',
          function () {
            return AmplifyPhotoPicker;
          }
        );
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(19),
        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(15),
        AmplifyPhotoPicker = (function () {
          function AmplifyPhotoPicker(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.headerTitle =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_2__.a.PHOTO_PICKER_TITLE),
              (this.headerHint =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_2__.a.PHOTO_PICKER_HINT),
              (this.placeholderHint =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_2__.a.PHOTO_PICKER_PLACEHOLDER_HINT),
              (this.buttonText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_2__.a.PHOTO_PICKER_BUTTON_TEXT),
              (this.handleClick = function () {}),
              (this.handleInput = function (ev) {
                _this.file = ev.target.files[0];
                var reader = new FileReader();
                (reader.onload = function (_e) {
                  var url = reader.result;
                  _this.previewState = url;
                }),
                  reader.readAsDataURL(_this.file);
              });
          }
          return (
            (AmplifyPhotoPicker.prototype.componentWillLoad = function () {
              this.previewState = this.previewSrc;
            }),
            (AmplifyPhotoPicker.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'div',
                { class: 'photo-picker-container' },
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'amplify-section',
                  null,
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    { class: 'header' },
                    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                      this.headerTitle
                    )
                  ),
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    { class: 'header-hint' },
                    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                      this.headerHint
                    )
                  ),
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-picker',
                    { acceptValue: 'image/*', inputHandler: this.handleInput },
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'div',
                      { class: 'picker-body', slot: 'picker' },
                      this.previewState
                        ? Object(
                            _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                          )('img', { src: '' + this.previewState })
                        : Object(
                            _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                          )('amplify-icon', { name: 'photoPlaceholder' })
                    )
                  ),
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    { class: 'placeholder-hint' },
                    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                      this.placeholderHint
                    )
                  ),
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-button',
                    {
                      handleButtonClick: function () {
                        return _this.handleClick(_this.file);
                      },
                    },
                    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                      this.buttonText
                    )
                  )
                )
              );
            }),
            AmplifyPhotoPicker
          );
        })();
      AmplifyPhotoPicker.style =
        ':host{--object-fit:cover;--hint-color:var(--amplify-grey);--header-color:var(--amplify-secondary-color);--header-size:var(--amplify-text-lg);--header-hint-size:var(--amplify-text-md);--placeholder-hint-size:var(--amplify-text-sm);--placeholder-border-color:var(--amplify-grey)}.photo-picker-container{max-width:50rem}img{-o-object-fit:var(--object-fit);object-fit:var(--object-fit);width:100%;height:100%}input[type=file]{width:100%;height:100%;display:inline-block;position:absolute;left:0;top:0;opacity:0;cursor:pointer}.header{color:var(--header-color);font-size:var(--header-size);font-weight:bold;margin-bottom:24px}.header-hint{color:var(--hint-color);font-size:var(--header-hint-size);word-break:break-word;margin-bottom:24px}.picker-body{position:relative;width:25rem;height:16rem;border:2px dotted var(--placeholder-border-color);padding:10px;margin-bottom:8px;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;overflow:hidden}.placeholder-hint{color:var(--hint-color);font-family:Helvetica;font-style:italic;font-size:var(--placeholder-hint-size);word-break:break-word;margin-bottom:30px}';
    },
  },
]);
//# sourceMappingURL=210.43062421b39d2bb010e4.bundle.js.map
