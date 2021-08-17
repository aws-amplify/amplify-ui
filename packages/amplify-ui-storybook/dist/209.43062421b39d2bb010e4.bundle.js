(window.webpackJsonp = window.webpackJsonp || []).push([
  [209],
  {
    1721: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'amplify_nav', function () {
          return AmplifyNav;
        }),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_sign_out',
          function () {
            return AmplifySignOut;
          }
        );
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(19),
        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(98),
        _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(406),
        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(15),
        _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(62),
        _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(413),
        __awaiter = function (thisArg, _arguments, P, generator) {
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator.throw(value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : (function adopt(value) {
                    return value instanceof P
                      ? value
                      : new P(function (resolve) {
                          resolve(value);
                        });
                  })(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        },
        __generator = function (thisArg, body) {
          var f,
            y,
            t,
            g,
            _ = {
              label: 0,
              sent: function () {
                if (1 & t[0]) throw t[1];
                return t[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            'function' == typeof Symbol &&
              (g[Symbol.iterator] = function () {
                return this;
              }),
            g
          );
          function verb(n) {
            return function (v) {
              return (function step(op) {
                if (f) throw new TypeError('Generator is already executing.');
                for (; _; )
                  try {
                    if (
                      ((f = 1),
                      y &&
                        (t =
                          2 & op[0]
                            ? y.return
                            : op[0]
                            ? y.throw || ((t = y.return) && t.call(y), 0)
                            : y.next) &&
                        !(t = t.call(y, op[1])).done)
                    )
                      return t;
                    switch (
                      ((y = 0), t && (op = [2 & op[0], t.value]), op[0])
                    ) {
                      case 0:
                      case 1:
                        t = op;
                        break;
                      case 4:
                        return _.label++, { value: op[1], done: !1 };
                      case 5:
                        _.label++, (y = op[1]), (op = [0]);
                        continue;
                      case 7:
                        (op = _.ops.pop()), _.trys.pop();
                        continue;
                      default:
                        if (
                          !((t = _.trys),
                          (t = t.length > 0 && t[t.length - 1]) ||
                            (6 !== op[0] && 2 !== op[0]))
                        ) {
                          _ = 0;
                          continue;
                        }
                        if (
                          3 === op[0] &&
                          (!t || (op[1] > t[0] && op[1] < t[3]))
                        ) {
                          _.label = op[1];
                          break;
                        }
                        if (6 === op[0] && _.label < t[1]) {
                          (_.label = t[1]), (t = op);
                          break;
                        }
                        if (t && _.label < t[2]) {
                          (_.label = t[2]), _.ops.push(op);
                          break;
                        }
                        t[2] && _.ops.pop(), _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                  } catch (e) {
                    (op = [6, e]), (y = 0);
                  } finally {
                    f = t = 0;
                  }
                if (5 & op[0]) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: !0 };
              })([n, v]);
            };
          }
        },
        AmplifyNav = (function () {
          function AmplifyNav(hostRef) {
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            );
          }
          return (
            (AmplifyNav.prototype.render = function () {
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'nav',
                { class: 'nav' },
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'slot',
                  null
                )
              );
            }),
            AmplifyNav
          );
        })();
      AmplifyNav.style =
        '.nav{display:-ms-flexbox;display:flex;-ms-flex:1 1 0%;flex:1 1 0%;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-align:center;align-items:center}.nav>*{margin:0 0.5em}';
      var AmplifySignOut = (function () {
        function class_1(hostRef) {
          Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
            this,
            hostRef
          ),
            (this.handleAuthStateChange =
              _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_6__.d),
            (this.buttonText =
              _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_4__.a.SIGN_OUT);
        }
        return (
          (class_1.prototype.signOut = function (event) {
            return __awaiter(this, void 0, void 0, function () {
              var error_1;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    if (
                      (event && event.preventDefault(),
                      !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a ||
                        'function' !=
                          typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__
                            .a.signOut)
                    )
                      throw new Error(
                        _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_5__.d
                      );
                    _a.label = 1;
                  case 1:
                    return (
                      _a.trys.push([1, 3, , 4]),
                      [
                        4,
                        _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a.signOut(),
                      ]
                    );
                  case 2:
                    return (
                      _a.sent(),
                      this.handleAuthStateChange(
                        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                          .SignedOut
                      ),
                      [3, 4]
                    );
                  case 3:
                    return (
                      (error_1 = _a.sent()),
                      Object(
                        _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_6__.a
                      )(error_1),
                      [3, 4]
                    );
                  case 4:
                    return [2];
                }
              });
            });
          }),
          (class_1.prototype.render = function () {
            var _this = this;
            return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
              'amplify-button',
              {
                slot: 'sign-out',
                onClick: function (event) {
                  return _this.signOut(event);
                },
                'data-test': 'sign-out-button',
              },
              _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a.get(
                this.buttonText
              )
            );
          }),
          class_1
        );
      })();
    },
  },
]);
//# sourceMappingURL=209.43062421b39d2bb010e4.bundle.js.map
