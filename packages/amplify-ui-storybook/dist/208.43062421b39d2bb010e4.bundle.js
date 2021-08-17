(window.webpackJsonp = window.webpackJsonp || []).push([
  [208],
  {
    1720: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'amplify_link', function () {
          return AmplifyLink;
        });
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        AmplifyLink = (function () {
          function AmplifyLink(hostRef) {
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.role = 'navigation');
          }
          return (
            (AmplifyLink.prototype.render = function () {
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'a',
                { class: 'link', role: this.role },
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'slot',
                  null
                )
              );
            }),
            Object.defineProperty(AmplifyLink.prototype, 'el', {
              get: function () {
                return Object(
                  _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.h
                )(this);
              },
              enumerable: !1,
              configurable: !0,
            }),
            AmplifyLink
          );
        })();
      AmplifyLink.style =
        ':host{--link-color:var(--amplify-primary-color);--link-hover:var(--amplify-primary-tint);--link-active:var(--amplify-primary-shade)}.link{color:var(--link-color);cursor:pointer}.link:link{color:var(--link-color);text-decoration:none}.link:hover{color:var(--link-hover);text-decoration:underline}.link:active{color:var(--link-active);text-decoration:underline}';
    },
  },
]);
//# sourceMappingURL=208.43062421b39d2bb010e4.bundle.js.map
