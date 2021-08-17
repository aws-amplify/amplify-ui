(window.webpackJsonp = window.webpackJsonp || []).push([
  [213],
  {
    1726: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_s3_image_picker',
          function () {
            return AmplifyS3ImagePicker;
          }
        );
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(164),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(19),
        _storage_types_f257c0f2_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(414),
        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(15),
        _storage_helpers_48c373a0_js__WEBPACK_IMPORTED_MODULE_7__ =
          (__webpack_require__(62),
          __webpack_require__(1771),
          __webpack_require__(1773)),
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
        logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a(
          'S3ImagePicker'
        ),
        AmplifyS3ImagePicker = (function () {
          function class_1(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.contentType = 'binary/octet-stream'),
              (this.level =
                _storage_types_f257c0f2_js__WEBPACK_IMPORTED_MODULE_3__.a.Public),
              (this.headerTitle =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_4__.a.IMAGE_PICKER_TITLE),
              (this.headerHint =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_4__.a.IMAGE_PICKER_HINT),
              (this.placeholderHint =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_4__.a.IMAGE_PICKER_PLACEHOLDER_HINT),
              (this.buttonText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_4__.a.IMAGE_PICKER_BUTTON_TEXT),
              (this.handlePick = function (file) {
                return __awaiter(_this, void 0, void 0, function () {
                  var _a,
                    _b,
                    path,
                    level,
                    track,
                    identityId,
                    fileToKey,
                    key,
                    _c,
                    error_1;
                  return __generator(this, function (_d) {
                    switch (_d.label) {
                      case 0:
                        (_b = (_a = this).path),
                          (path = void 0 === _b ? '' : _b),
                          (level = _a.level),
                          (track = _a.track),
                          (identityId = _a.identityId),
                          (fileToKey = _a.fileToKey),
                          (key =
                            path +
                            Object(
                              _storage_helpers_48c373a0_js__WEBPACK_IMPORTED_MODULE_7__.b
                            )(file, fileToKey)),
                          (_d.label = 1);
                      case 1:
                        return (
                          _d.trys.push([1, 4, , 5]),
                          [
                            4,
                            Object(
                              _storage_helpers_48c373a0_js__WEBPACK_IMPORTED_MODULE_7__.e
                            )(key, file, level, track, file.type, logger),
                          ]
                        );
                      case 2:
                        return (
                          _d.sent(),
                          (_c = this),
                          [
                            4,
                            Object(
                              _storage_helpers_48c373a0_js__WEBPACK_IMPORTED_MODULE_7__.c
                            )(key, level, track, identityId, logger),
                          ]
                        );
                      case 3:
                        return (_c.src = _d.sent()), [3, 5];
                      case 4:
                        throw (
                          ((error_1 = _d.sent()),
                          logger.error(error_1),
                          new Error(error_1))
                        );
                      case 5:
                        return [2];
                    }
                  });
                });
              });
          }
          return (
            (class_1.prototype.render = function () {
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.b,
                null,
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'slot',
                  { name: 'photo-picker' },
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-photo-picker',
                    {
                      previewSrc: this.src,
                      handleClick: this.handlePick,
                      headerTitle:
                        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                          this.headerTitle
                        ),
                      headerHint:
                        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                          this.headerHint
                        ),
                      placeholderHint:
                        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                          this.placeholderHint
                        ),
                      buttonText:
                        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                          this.buttonText
                        ),
                    }
                  )
                )
              );
            }),
            class_1
          );
        })();
    },
  },
]);
//# sourceMappingURL=213.43062421b39d2bb010e4.bundle.js.map
