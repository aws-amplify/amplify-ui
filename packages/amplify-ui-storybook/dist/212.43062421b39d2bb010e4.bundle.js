(window.webpackJsonp = window.webpackJsonp || []).push([
  [212],
  {
    1725: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_s3_album',
          function () {
            return AmplifyS3Album;
          }
        );
      var getRandomValues,
        _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(164),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(104),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(19),
        _storage_types_f257c0f2_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(414),
        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(15),
        _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(62),
        _aws_amplify_storage__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(1771),
        _storage_helpers_48c373a0_js__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(1773),
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
        __spreadArrays = function () {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          var r = Array(s),
            k = 0;
          for (i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        },
        rnds8 = new Uint8Array(16);
      function rng() {
        if (
          !getRandomValues &&
          !(getRandomValues =
            ('undefined' != typeof crypto &&
              crypto.getRandomValues &&
              crypto.getRandomValues.bind(crypto)) ||
            ('undefined' != typeof msCrypto &&
              'function' == typeof msCrypto.getRandomValues &&
              msCrypto.getRandomValues.bind(msCrypto)))
        )
          throw new Error(
            'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
          );
        return getRandomValues(rnds8);
      }
      var REGEX =
        /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
      function validate(uuid) {
        return 'string' == typeof uuid && REGEX.test(uuid);
      }
      for (var byteToHex = [], i = 0; i < 256; ++i)
        byteToHex.push((i + 256).toString(16).substr(1));
      function v4(options, buf, offset) {
        var rnds = (options = options || {}).random || (options.rng || rng)();
        if (
          ((rnds[6] = (15 & rnds[6]) | 64),
          (rnds[8] = (63 & rnds[8]) | 128),
          buf)
        ) {
          offset = offset || 0;
          for (var i = 0; i < 16; ++i) buf[offset + i] = rnds[i];
          return buf;
        }
        return (function stringify(arr) {
          var offset =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            uuid = (
              byteToHex[arr[offset + 0]] +
              byteToHex[arr[offset + 1]] +
              byteToHex[arr[offset + 2]] +
              byteToHex[arr[offset + 3]] +
              '-' +
              byteToHex[arr[offset + 4]] +
              byteToHex[arr[offset + 5]] +
              '-' +
              byteToHex[arr[offset + 6]] +
              byteToHex[arr[offset + 7]] +
              '-' +
              byteToHex[arr[offset + 8]] +
              byteToHex[arr[offset + 9]] +
              '-' +
              byteToHex[arr[offset + 10]] +
              byteToHex[arr[offset + 11]] +
              byteToHex[arr[offset + 12]] +
              byteToHex[arr[offset + 13]] +
              byteToHex[arr[offset + 14]] +
              byteToHex[arr[offset + 15]]
            ).toLowerCase();
          if (!validate(uuid)) throw TypeError('Stringified UUID is invalid');
          return uuid;
        })(rnds);
      }
      var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a(
          'S3Album'
        ),
        AmplifyS3Album = (function () {
          function class_1(hostRef) {
            var _this = this;
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.contentType = 'binary/octet-stream'),
              (this.level =
                _storage_types_f257c0f2_js__WEBPACK_IMPORTED_MODULE_4__.a.Public),
              (this.picker = !0),
              (this.pickerText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a.PICKER_TEXT),
              (this.albumItems = []),
              (this.imgArr = {}),
              (this.list = function () {
                return __awaiter(_this, void 0, void 0, function () {
                  var _a, _b, path, level, track, identityId, data, error_1;
                  return __generator(this, function (_c) {
                    switch (_c.label) {
                      case 0:
                        if (
                          ((_b = (_a = this).path),
                          (path = void 0 === _b ? '' : _b),
                          (level = _a.level),
                          (track = _a.track),
                          (identityId = _a.identityId),
                          logger.debug('Album path: ' + path),
                          !_aws_amplify_storage__WEBPACK_IMPORTED_MODULE_7__.a ||
                            'function' !=
                              typeof _aws_amplify_storage__WEBPACK_IMPORTED_MODULE_7__
                                .a.list)
                        )
                          throw new Error(
                            _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.n
                          );
                        _c.label = 1;
                      case 1:
                        return (
                          _c.trys.push([1, 3, , 4]),
                          [
                            4,
                            _aws_amplify_storage__WEBPACK_IMPORTED_MODULE_7__.a.list(
                              path,
                              {
                                level: level,
                                track: track,
                                identityId: identityId,
                              }
                            ),
                          ]
                        );
                      case 2:
                        return (data = _c.sent()), this.marshal(data), [3, 4];
                      case 3:
                        return (
                          (error_1 = _c.sent()), logger.warn(error_1), [3, 4]
                        );
                      case 4:
                        return [2];
                    }
                  });
                });
              }),
              (this.marshal = function (list) {
                list.forEach(function (item) {
                  var ext = item.key.toLowerCase().split('.')[1];
                  _storage_helpers_48c373a0_js__WEBPACK_IMPORTED_MODULE_8__.d.has(
                    ext
                  ) &&
                    (!item.contentType ||
                      (item.contentType &&
                        'binary/octet-stream' === item.contentType)) &&
                    (item.contentType = _this.getContentType(item));
                });
                var filtered = list.filter(function (item) {
                    return (
                      item.contentType && item.contentType.startsWith('image/')
                    );
                  }),
                  items = _this.filter ? _this.filter(filtered) : filtered;
                (items = _this.sort ? _this.sort(items) : items),
                  (_this.albumItems = items),
                  logger.debug('album items', _this.albumItems),
                  _this.constructImgArray(_this.albumItems);
              }),
              (this.constructImgArray = function (list) {
                list.map(function (item) {
                  _this.imgArr['' + item.key] = item.key;
                });
              }),
              (this.handlePick = function (event) {
                return __awaiter(_this, void 0, void 0, function () {
                  var file,
                    _a,
                    _b,
                    path,
                    level,
                    track,
                    fileToKey,
                    key,
                    error_2,
                    filtered;
                  return __generator(this, function (_c) {
                    switch (_c.label) {
                      case 0:
                        (file = event.target.files[0]),
                          (_b = (_a = this).path),
                          (path = void 0 === _b ? '' : _b),
                          (level = _a.level),
                          (track = _a.track),
                          (fileToKey = _a.fileToKey),
                          (key =
                            path +
                            Object(
                              _storage_helpers_48c373a0_js__WEBPACK_IMPORTED_MODULE_8__.b
                            )(file, fileToKey)),
                          (_c.label = 1);
                      case 1:
                        return (
                          _c.trys.push([1, 3, , 4]),
                          [
                            4,
                            Object(
                              _storage_helpers_48c373a0_js__WEBPACK_IMPORTED_MODULE_8__.e
                            )(key, file, level, track, file.type, logger),
                          ]
                        );
                      case 2:
                        return _c.sent(), [3, 4];
                      case 3:
                        throw (
                          ((error_2 = _c.sent()),
                          logger.error(error_2),
                          new Error(error_2))
                        );
                      case 4:
                        return (
                          Object.keys(this.imgArr).includes(key)
                            ? ((this.albumItems = __spreadArrays(
                                this.albumItems
                              )),
                              (this.imgArr[key] = key + '-' + v4()))
                            : ((filtered = __spreadArrays(
                                this.albumItems,
                                this.filter
                                  ? this.filter([{ key: key }])
                                  : [{ key: key }]
                              )),
                              (this.albumItems = this.sort
                                ? this.sort(filtered)
                                : filtered)),
                          [2]
                        );
                    }
                  });
                });
              });
          }
          return (
            (class_1.prototype.getContentType = function (item) {
              return Object(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.c)(
                item.key,
                'image/*'
              );
            }),
            (class_1.prototype.componentWillLoad = function () {
              this.list();
            }),
            (class_1.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'div',
                null,
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'div',
                  { class: 'album-container' },
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    { class: 'grid-row' },
                    this.albumItems.map(function (item) {
                      return Object(
                        _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                      )(
                        'div',
                        { class: 'grid-item', key: 'key-' + item.key },
                        Object(
                          _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                        )('amplify-s3-image', {
                          key: _this.imgArr[item.key],
                          imgKey: item.key,
                          level: _this.level,
                          path: _this.path,
                          identityId: _this.identityId,
                          track: _this.track,
                          handleOnError: _this.handleOnError,
                          handleOnLoad: _this.handleOnLoad,
                        }),
                        Object(
                          _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i
                        )('span', { class: 'img-overlay' })
                      );
                    })
                  )
                ),
                this.picker &&
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'amplify-picker',
                    {
                      pickerText:
                        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_3__.a.get(
                          this.pickerText
                        ),
                      inputHandler: function (e) {
                        return _this.handlePick(e);
                      },
                      acceptValue: 'image/*',
                    }
                  )
              );
            }),
            class_1
          );
        })();
      AmplifyS3Album.style =
        ':host{--overlay-bg-color:rgba(0, 0, 0, 0.15)}.album-container{-webkit-box-sizing:border-box;box-sizing:border-box;max-width:100%;margin:0 auto;padding:0 2rem}.grid-row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin:-1rem -1rem;padding-bottom:3rem}.grid-item{position:relative;-ms-flex:1 0 22rem;flex:1 0 22rem;-ms-flex-positive:1;flex-grow:1;margin:1rem;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}amplify-s3-image{--width:22rem;--height:20rem;border-radius:5px;-o-object-fit:cover;object-fit:cover}.img-overlay{display:none;width:100%;height:21rem;position:absolute;top:0;left:0;background-color:var(--overlay-bg-color)}.grid-item:hover .img-overlay{display:block}';
    },
  },
]);
//# sourceMappingURL=212.43062421b39d2bb010e4.bundle.js.map
