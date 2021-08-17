(window.webpackJsonp = window.webpackJsonp || []).push([
  [196],
  {
    1724: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_radio_button',
          function () {
            return AmplifyRadioButton;
          }
        ),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_totp_setup',
          function () {
            return AmplifyTOTPSetup;
          }
        );
      var _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(40),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(164),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(19),
        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(98),
        _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(406),
        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(15),
        _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(62),
        _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(413),
        _auth_helpers_bd096ca7_js__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(1772),
        buffer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7),
        buffer__WEBPACK_IMPORTED_MODULE_9___default = __webpack_require__.n(
          buffer__WEBPACK_IMPORTED_MODULE_9__
        ),
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
        AmplifyRadioButton = (function () {
          function AmplifyRadioButton(hostRef) {
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.placeholder = ''),
              (this.checked = !1),
              (this.disabled = !1);
          }
          return (
            (AmplifyRadioButton.prototype.render = function () {
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                'span',
                { class: 'radio-button' },
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'input',
                  Object.assign(
                    {
                      type: 'radio',
                      name: this.name,
                      value: this.value,
                      onInput: this.handleInputChange,
                      placeholder: this.placeholder,
                      id: this.fieldId,
                      checked: this.checked,
                      disabled: this.disabled,
                    },
                    this.inputProps
                  )
                ),
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'amplify-label',
                  { htmlFor: this.fieldId },
                  this.label
                )
              );
            }),
            AmplifyRadioButton
          );
        })();
      AmplifyRadioButton.style =
        ':host{--font-family:var(--amplify-font-family)}.radio-button{display:block;width:100%;padding:16px;font-size:var(--amplify-text-sm);font-family:var(--font-family)}.radio-button input{margin-right:12px}';
      var canPromise = function () {
          return (
            'function' == typeof Promise &&
            Promise.prototype &&
            Promise.prototype.then
          );
        },
        toString = {}.toString,
        isarray =
          Array.isArray ||
          function (arr) {
            return '[object Array]' == toString.call(arr);
          };
      Buffer.TYPED_ARRAY_SUPPORT = (function typedArraySupport() {
        try {
          var arr = new Uint8Array(1);
          return (
            (arr.__proto__ = {
              __proto__: Uint8Array.prototype,
              foo: function () {
                return 42;
              },
            }),
            42 === arr.foo()
          );
        } catch (e) {
          return !1;
        }
      })();
      var K_MAX_LENGTH = Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      function Buffer(arg, offset, length) {
        return Buffer.TYPED_ARRAY_SUPPORT || this instanceof Buffer
          ? 'number' == typeof arg
            ? allocUnsafe(this, arg)
            : (function from(that, value, offset, length) {
                if ('number' == typeof value)
                  throw new TypeError('"value" argument must not be a number');
                if (
                  'undefined' != typeof ArrayBuffer &&
                  value instanceof ArrayBuffer
                )
                  return (function fromArrayBuffer(
                    that,
                    array,
                    byteOffset,
                    length
                  ) {
                    if (byteOffset < 0 || array.byteLength < byteOffset)
                      throw new RangeError("'offset' is out of bounds");
                    if (array.byteLength < byteOffset + (length || 0))
                      throw new RangeError("'length' is out of bounds");
                    var buf;
                    buf =
                      void 0 === byteOffset && void 0 === length
                        ? new Uint8Array(array)
                        : void 0 === length
                        ? new Uint8Array(array, byteOffset)
                        : new Uint8Array(array, byteOffset, length);
                    Buffer.TYPED_ARRAY_SUPPORT
                      ? (buf.__proto__ = Buffer.prototype)
                      : (buf = fromArrayLike(that, buf));
                    return buf;
                  })(that, value, offset, length);
                if ('string' == typeof value)
                  return (function fromString(that, string) {
                    var length = 0 | byteLength(string),
                      buf = createBuffer(that, length),
                      actual = buf.write(string);
                    actual !== length && (buf = buf.slice(0, actual));
                    return buf;
                  })(that, value);
                return (function fromObject(that, obj) {
                  if (Buffer.isBuffer(obj)) {
                    var len = 0 | checked(obj.length),
                      buf = createBuffer(that, len);
                    return 0 === buf.length || obj.copy(buf, 0, 0, len), buf;
                  }
                  if (obj) {
                    if (
                      ('undefined' != typeof ArrayBuffer &&
                        obj.buffer instanceof ArrayBuffer) ||
                      'length' in obj
                    )
                      return 'number' != typeof obj.length ||
                        (function isnan(val) {
                          return val != val;
                        })(obj.length)
                        ? createBuffer(that, 0)
                        : fromArrayLike(that, obj);
                    if ('Buffer' === obj.type && Array.isArray(obj.data))
                      return fromArrayLike(that, obj.data);
                  }
                  throw new TypeError(
                    'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                  );
                })(that, value);
              })(this, arg, offset, length)
          : new Buffer(arg, offset, length);
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH)
          throw new RangeError(
            'Attempt to allocate Buffer larger than maximum size: 0x' +
              K_MAX_LENGTH.toString(16) +
              ' bytes'
          );
        return 0 | length;
      }
      function createBuffer(that, length) {
        var buf;
        return (
          Buffer.TYPED_ARRAY_SUPPORT
            ? ((buf = new Uint8Array(length)).__proto__ = Buffer.prototype)
            : (null === (buf = that) && (buf = new Buffer(length)),
              (buf.length = length)),
          buf
        );
      }
      function allocUnsafe(that, size) {
        var buf = createBuffer(that, size < 0 ? 0 : 0 | checked(size));
        if (!Buffer.TYPED_ARRAY_SUPPORT)
          for (var i = 0; i < size; ++i) buf[i] = 0;
        return buf;
      }
      function fromArrayLike(that, array) {
        for (
          var length = array.length < 0 ? 0 : 0 | checked(array.length),
            buf = createBuffer(that, length),
            i = 0;
          i < length;
          i += 1
        )
          buf[i] = 255 & array[i];
        return buf;
      }
      function utf8ToBytes(string, units) {
        var codePoint;
        units = units || 1 / 0;
        for (
          var length = string.length, leadSurrogate = null, bytes = [], i = 0;
          i < length;
          ++i
        ) {
          if ((codePoint = string.charCodeAt(i)) > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                (units -= 3) > -1 && bytes.push(239, 191, 189);
                continue;
              }
              if (i + 1 === length) {
                (units -= 3) > -1 && bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              (units -= 3) > -1 && bytes.push(239, 191, 189),
                (leadSurrogate = codePoint);
              continue;
            }
            codePoint =
              65536 + (((leadSurrogate - 55296) << 10) | (codePoint - 56320));
          } else
            leadSurrogate && (units -= 3) > -1 && bytes.push(239, 191, 189);
          if (((leadSurrogate = null), codePoint < 128)) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push((codePoint >> 6) | 192, (63 & codePoint) | 128);
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              (codePoint >> 12) | 224,
              ((codePoint >> 6) & 63) | 128,
              (63 & codePoint) | 128
            );
          } else {
            if (!(codePoint < 1114112)) throw new Error('Invalid code point');
            if ((units -= 4) < 0) break;
            bytes.push(
              (codePoint >> 18) | 240,
              ((codePoint >> 12) & 63) | 128,
              ((codePoint >> 6) & 63) | 128,
              (63 & codePoint) | 128
            );
          }
        }
        return bytes;
      }
      function byteLength(string) {
        return Buffer.isBuffer(string)
          ? string.length
          : 'undefined' != typeof ArrayBuffer &&
            'function' == typeof ArrayBuffer.isView &&
            (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)
          ? string.byteLength
          : ('string' != typeof string && (string = '' + string),
            0 === string.length ? 0 : utf8ToBytes(string).length);
      }
      Buffer.TYPED_ARRAY_SUPPORT &&
        ((Buffer.prototype.__proto__ = Uint8Array.prototype),
        (Buffer.__proto__ = Uint8Array),
        'undefined' != typeof Symbol &&
          Symbol.species &&
          Buffer[Symbol.species] === Buffer &&
          Object.defineProperty(Buffer, Symbol.species, {
            value: null,
            configurable: !0,
            enumerable: !1,
            writable: !1,
          })),
        (Buffer.prototype.write = function write(string, offset, length) {
          void 0 === offset || (void 0 === length && 'string' == typeof offset)
            ? ((length = this.length), (offset = 0))
            : isFinite(offset) &&
              ((offset |= 0),
              isFinite(length) ? (length |= 0) : (length = void 0));
          var remaining = this.length - offset;
          if (
            ((void 0 === length || length > remaining) && (length = remaining),
            (string.length > 0 && (length < 0 || offset < 0)) ||
              offset > this.length)
          )
            throw new RangeError('Attempt to write outside buffer bounds');
          return (function utf8Write(buf, string, offset, length) {
            return (function blitBuffer(src, dst, offset, length) {
              for (
                var i = 0;
                i < length && !(i + offset >= dst.length || i >= src.length);
                ++i
              )
                dst[i + offset] = src[i];
              return i;
            })(utf8ToBytes(string, buf.length - offset), buf, offset, length);
          })(this, string, offset, length);
        }),
        (Buffer.prototype.slice = function slice(start, end) {
          var newBuf,
            len = this.length;
          if (
            ((start = ~~start) < 0
              ? (start += len) < 0 && (start = 0)
              : start > len && (start = len),
            (end = void 0 === end ? len : ~~end) < 0
              ? (end += len) < 0 && (end = 0)
              : end > len && (end = len),
            end < start && (end = start),
            Buffer.TYPED_ARRAY_SUPPORT)
          )
            (newBuf = this.subarray(start, end)).__proto__ = Buffer.prototype;
          else {
            var sliceLen = end - start;
            newBuf = new Buffer(sliceLen, void 0);
            for (var i = 0; i < sliceLen; ++i) newBuf[i] = this[i + start];
          }
          return newBuf;
        }),
        (Buffer.prototype.copy = function copy(
          target,
          targetStart,
          start,
          end
        ) {
          if (
            (start || (start = 0),
            end || 0 === end || (end = this.length),
            targetStart >= target.length && (targetStart = target.length),
            targetStart || (targetStart = 0),
            end > 0 && end < start && (end = start),
            end === start)
          )
            return 0;
          if (0 === target.length || 0 === this.length) return 0;
          if (targetStart < 0)
            throw new RangeError('targetStart out of bounds');
          if (start < 0 || start >= this.length)
            throw new RangeError('sourceStart out of bounds');
          if (end < 0) throw new RangeError('sourceEnd out of bounds');
          end > this.length && (end = this.length),
            target.length - targetStart < end - start &&
              (end = target.length - targetStart + start);
          var i,
            len = end - start;
          if (this === target && start < targetStart && targetStart < end)
            for (i = len - 1; i >= 0; --i)
              target[i + targetStart] = this[i + start];
          else if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT)
            for (i = 0; i < len; ++i) target[i + targetStart] = this[i + start];
          else
            Uint8Array.prototype.set.call(
              target,
              this.subarray(start, start + len),
              targetStart
            );
          return len;
        }),
        (Buffer.prototype.fill = function fill(val, start, end) {
          if ('string' == typeof val) {
            if (
              ('string' == typeof start
                ? ((start = 0), (end = this.length))
                : 'string' == typeof end && (end = this.length),
              1 === val.length)
            ) {
              var code = val.charCodeAt(0);
              code < 256 && (val = code);
            }
          } else 'number' == typeof val && (val &= 255);
          if (start < 0 || this.length < start || this.length < end)
            throw new RangeError('Out of range index');
          if (end <= start) return this;
          var i;
          if (
            ((start >>>= 0),
            (end = void 0 === end ? this.length : end >>> 0),
            val || (val = 0),
            'number' == typeof val)
          )
            for (i = start; i < end; ++i) this[i] = val;
          else {
            var bytes = Buffer.isBuffer(val) ? val : new Buffer(val),
              len = bytes.length;
            for (i = 0; i < end - start; ++i) this[i + start] = bytes[i % len];
          }
          return this;
        }),
        (Buffer.concat = function concat(list, length) {
          if (!isarray(list))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === list.length) return createBuffer(null, 0);
          var i;
          if (void 0 === length)
            for (length = 0, i = 0; i < list.length; ++i)
              length += list[i].length;
          var buffer = allocUnsafe(null, length),
            pos = 0;
          for (i = 0; i < list.length; ++i) {
            var buf = list[i];
            if (!Buffer.isBuffer(buf))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            buf.copy(buffer, pos), (pos += buf.length);
          }
          return buffer;
        }),
        (Buffer.byteLength = byteLength),
        (Buffer.prototype._isBuffer = !0),
        (Buffer.isBuffer = function isBuffer(b) {
          return !(null == b || !b._isBuffer);
        });
      var toSJISFunction,
        typedarrayBuffer_alloc = function (size) {
          var buffer = new Buffer(size);
          return buffer.fill(0), buffer;
        },
        typedarrayBuffer_from = function (data) {
          return new Buffer(data);
        },
        CODEWORDS_COUNT = [
          0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581,
          655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706,
          1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196,
          3362, 3532, 3706,
        ],
        utils_getSymbolSize = function getSymbolSize(version) {
          if (!version)
            throw new Error('"version" cannot be null or undefined');
          if (version < 1 || version > 40)
            throw new Error('"version" should be in range from 1 to 40');
          return 4 * version + 17;
        },
        utils_getSymbolTotalCodewords = function getSymbolTotalCodewords(
          version
        ) {
          return CODEWORDS_COUNT[version];
        },
        utils_getBCHDigit = function (data) {
          for (var digit = 0; 0 !== data; ) digit++, (data >>>= 1);
          return digit;
        },
        utils_setToSJISFunction = function setToSJISFunction(f) {
          if ('function' != typeof f)
            throw new Error('"toSJISFunc" is not a valid function.');
          toSJISFunction = f;
        },
        utils_isKanjiModeEnabled = function () {
          return void 0 !== toSJISFunction;
        },
        utils_toSJIS = function toSJIS(kanji) {
          return toSJISFunction(kanji);
        };
      function createCommonjsModule(fn, basedir, module) {
        return (
          fn(
            (module = {
              path: basedir,
              exports: {},
              require: function (path, base) {
                return (function commonjsRequire() {
                  throw new Error(
                    'Dynamic requires are not currently supported by @rollup/plugin-commonjs'
                  );
                })();
              },
            }),
            module.exports
          ),
          module.exports
        );
      }
      var errorCorrectionLevel = createCommonjsModule(function (
        module,
        exports
      ) {
        (exports.L = { bit: 1 }),
          (exports.M = { bit: 0 }),
          (exports.Q = { bit: 3 }),
          (exports.H = { bit: 2 }),
          (exports.isValid = function isValid(level) {
            return (
              level && void 0 !== level.bit && level.bit >= 0 && level.bit < 4
            );
          }),
          (exports.from = function from(value, defaultValue) {
            if (exports.isValid(value)) return value;
            try {
              return (function fromString(string) {
                if ('string' != typeof string)
                  throw new Error('Param is not a string');
                switch (string.toLowerCase()) {
                  case 'l':
                  case 'low':
                    return exports.L;
                  case 'm':
                  case 'medium':
                    return exports.M;
                  case 'q':
                  case 'quartile':
                    return exports.Q;
                  case 'h':
                  case 'high':
                    return exports.H;
                  default:
                    throw new Error('Unknown EC Level: ' + string);
                }
              })(value);
            } catch (e) {
              return defaultValue;
            }
          });
      });
      function BitBuffer() {
        (this.buffer = []), (this.length = 0);
      }
      BitBuffer.prototype = {
        get: function (index) {
          var bufIndex = Math.floor(index / 8);
          return 1 == ((this.buffer[bufIndex] >>> (7 - (index % 8))) & 1);
        },
        put: function (num, length) {
          for (var i = 0; i < length; i++)
            this.putBit(1 == ((num >>> (length - i - 1)) & 1));
        },
        getLengthInBits: function () {
          return this.length;
        },
        putBit: function (bit) {
          var bufIndex = Math.floor(this.length / 8);
          this.buffer.length <= bufIndex && this.buffer.push(0),
            bit && (this.buffer[bufIndex] |= 128 >>> this.length % 8),
            this.length++;
        },
      };
      var bitBuffer = BitBuffer;
      function BitMatrix(size) {
        if (!size || size < 1)
          throw new Error('BitMatrix size must be defined and greater than 0');
        (this.size = size),
          (this.data = typedarrayBuffer_alloc(size * size)),
          (this.reservedBit = typedarrayBuffer_alloc(size * size));
      }
      (BitMatrix.prototype.set = function (row, col, value, reserved) {
        var index = row * this.size + col;
        (this.data[index] = value), reserved && (this.reservedBit[index] = !0);
      }),
        (BitMatrix.prototype.get = function (row, col) {
          return this.data[row * this.size + col];
        }),
        (BitMatrix.prototype.xor = function (row, col, value) {
          this.data[row * this.size + col] ^= value;
        }),
        (BitMatrix.prototype.isReserved = function (row, col) {
          return this.reservedBit[row * this.size + col];
        });
      var bitMatrix = BitMatrix,
        alignmentPattern = createCommonjsModule(function (module, exports) {
          var getSymbolSize = utils_getSymbolSize;
          (exports.getRowColCoords = function getRowColCoords(version) {
            if (1 === version) return [];
            for (
              var posCount = Math.floor(version / 7) + 2,
                size = getSymbolSize(version),
                intervals =
                  145 === size
                    ? 26
                    : 2 * Math.ceil((size - 13) / (2 * posCount - 2)),
                positions = [size - 7],
                i = 1;
              i < posCount - 1;
              i++
            )
              positions[i] = positions[i - 1] - intervals;
            return positions.push(6), positions.reverse();
          }),
            (exports.getPositions = function getPositions(version) {
              for (
                var coords = [],
                  pos = exports.getRowColCoords(version),
                  posLength = pos.length,
                  i = 0;
                i < posLength;
                i++
              )
                for (var j = 0; j < posLength; j++)
                  (0 === i && 0 === j) ||
                    (0 === i && j === posLength - 1) ||
                    (i === posLength - 1 && 0 === j) ||
                    coords.push([pos[i], pos[j]]);
              return coords;
            });
        }),
        getSymbolSize$1 = utils_getSymbolSize,
        finderPattern_getPositions = function getPositions(version) {
          var size = getSymbolSize$1(version);
          return [
            [0, 0],
            [size - 7, 0],
            [0, size - 7],
          ];
        },
        maskPattern = createCommonjsModule(function (module, exports) {
          exports.Patterns = {
            PATTERN000: 0,
            PATTERN001: 1,
            PATTERN010: 2,
            PATTERN011: 3,
            PATTERN100: 4,
            PATTERN101: 5,
            PATTERN110: 6,
            PATTERN111: 7,
          };
          var PenaltyScores_N1 = 3,
            PenaltyScores_N2 = 3,
            PenaltyScores_N3 = 40,
            PenaltyScores_N4 = 10;
          function getMaskAt(maskPattern, i, j) {
            switch (maskPattern) {
              case exports.Patterns.PATTERN000:
                return (i + j) % 2 == 0;
              case exports.Patterns.PATTERN001:
                return i % 2 == 0;
              case exports.Patterns.PATTERN010:
                return j % 3 == 0;
              case exports.Patterns.PATTERN011:
                return (i + j) % 3 == 0;
              case exports.Patterns.PATTERN100:
                return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
              case exports.Patterns.PATTERN101:
                return ((i * j) % 2) + ((i * j) % 3) == 0;
              case exports.Patterns.PATTERN110:
                return (((i * j) % 2) + ((i * j) % 3)) % 2 == 0;
              case exports.Patterns.PATTERN111:
                return (((i * j) % 3) + ((i + j) % 2)) % 2 == 0;
              default:
                throw new Error('bad maskPattern:' + maskPattern);
            }
          }
          (exports.isValid = function isValid(mask) {
            return (
              null != mask &&
              '' !== mask &&
              !isNaN(mask) &&
              mask >= 0 &&
              mask <= 7
            );
          }),
            (exports.from = function from(value) {
              return exports.isValid(value) ? parseInt(value, 10) : void 0;
            }),
            (exports.getPenaltyN1 = function getPenaltyN1(data) {
              for (
                var size = data.size,
                  points = 0,
                  sameCountCol = 0,
                  sameCountRow = 0,
                  lastCol = null,
                  lastRow = null,
                  row = 0;
                row < size;
                row++
              ) {
                (sameCountCol = sameCountRow = 0), (lastCol = lastRow = null);
                for (var col = 0; col < size; col++) {
                  var module = data.get(row, col);
                  module === lastCol
                    ? sameCountCol++
                    : (sameCountCol >= 5 &&
                        (points += PenaltyScores_N1 + (sameCountCol - 5)),
                      (lastCol = module),
                      (sameCountCol = 1)),
                    (module = data.get(col, row)) === lastRow
                      ? sameCountRow++
                      : (sameCountRow >= 5 &&
                          (points += PenaltyScores_N1 + (sameCountRow - 5)),
                        (lastRow = module),
                        (sameCountRow = 1));
                }
                sameCountCol >= 5 &&
                  (points += PenaltyScores_N1 + (sameCountCol - 5)),
                  sameCountRow >= 5 &&
                    (points += PenaltyScores_N1 + (sameCountRow - 5));
              }
              return points;
            }),
            (exports.getPenaltyN2 = function getPenaltyN2(data) {
              for (
                var size = data.size, points = 0, row = 0;
                row < size - 1;
                row++
              )
                for (var col = 0; col < size - 1; col++) {
                  var last =
                    data.get(row, col) +
                    data.get(row, col + 1) +
                    data.get(row + 1, col) +
                    data.get(row + 1, col + 1);
                  (4 !== last && 0 !== last) || points++;
                }
              return points * PenaltyScores_N2;
            }),
            (exports.getPenaltyN3 = function getPenaltyN3(data) {
              for (
                var size = data.size,
                  points = 0,
                  bitsCol = 0,
                  bitsRow = 0,
                  row = 0;
                row < size;
                row++
              ) {
                bitsCol = bitsRow = 0;
                for (var col = 0; col < size; col++)
                  (bitsCol = ((bitsCol << 1) & 2047) | data.get(row, col)),
                    col >= 10 &&
                      (1488 === bitsCol || 93 === bitsCol) &&
                      points++,
                    (bitsRow = ((bitsRow << 1) & 2047) | data.get(col, row)),
                    col >= 10 &&
                      (1488 === bitsRow || 93 === bitsRow) &&
                      points++;
              }
              return points * PenaltyScores_N3;
            }),
            (exports.getPenaltyN4 = function getPenaltyN4(data) {
              for (
                var darkCount = 0, modulesCount = data.data.length, i = 0;
                i < modulesCount;
                i++
              )
                darkCount += data.data[i];
              return (
                Math.abs(Math.ceil((100 * darkCount) / modulesCount / 5) - 10) *
                PenaltyScores_N4
              );
            }),
            (exports.applyMask = function applyMask(pattern, data) {
              for (var size = data.size, col = 0; col < size; col++)
                for (var row = 0; row < size; row++)
                  data.isReserved(row, col) ||
                    data.xor(row, col, getMaskAt(pattern, row, col));
            }),
            (exports.getBestMask = function getBestMask(data, setupFormatFunc) {
              for (
                var numPatterns = Object.keys(exports.Patterns).length,
                  bestPattern = 0,
                  lowerPenalty = 1 / 0,
                  p = 0;
                p < numPatterns;
                p++
              ) {
                setupFormatFunc(p), exports.applyMask(p, data);
                var penalty =
                  exports.getPenaltyN1(data) +
                  exports.getPenaltyN2(data) +
                  exports.getPenaltyN3(data) +
                  exports.getPenaltyN4(data);
                exports.applyMask(p, data),
                  penalty < lowerPenalty &&
                    ((lowerPenalty = penalty), (bestPattern = p));
              }
              return bestPattern;
            });
        }),
        EC_BLOCKS_TABLE = [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4,
          4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8,
          10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6,
          11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23,
          25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12,
          23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29,
          40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51,
          60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74,
          24, 47, 65, 77, 25, 49, 68, 81,
        ],
        EC_CODEWORDS_TABLE = [
          7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48,
          72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110,
          160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308,
          104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280,
          408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650,
          224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504,
          750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952,
          1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140,
          1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350,
          1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590,
          1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860,
          2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430,
        ],
        errorCorrectionCode_getBlocksCount = function getBlocksCount(
          version,
          errorCorrectionLevel$1
        ) {
          switch (errorCorrectionLevel$1) {
            case errorCorrectionLevel.L:
              return EC_BLOCKS_TABLE[4 * (version - 1) + 0];
            case errorCorrectionLevel.M:
              return EC_BLOCKS_TABLE[4 * (version - 1) + 1];
            case errorCorrectionLevel.Q:
              return EC_BLOCKS_TABLE[4 * (version - 1) + 2];
            case errorCorrectionLevel.H:
              return EC_BLOCKS_TABLE[4 * (version - 1) + 3];
            default:
              return;
          }
        },
        errorCorrectionCode_getTotalCodewordsCount =
          function getTotalCodewordsCount(version, errorCorrectionLevel$1) {
            switch (errorCorrectionLevel$1) {
              case errorCorrectionLevel.L:
                return EC_CODEWORDS_TABLE[4 * (version - 1) + 0];
              case errorCorrectionLevel.M:
                return EC_CODEWORDS_TABLE[4 * (version - 1) + 1];
              case errorCorrectionLevel.Q:
                return EC_CODEWORDS_TABLE[4 * (version - 1) + 2];
              case errorCorrectionLevel.H:
                return EC_CODEWORDS_TABLE[4 * (version - 1) + 3];
              default:
                return;
            }
          },
        EXP_TABLE = typedarrayBuffer_alloc(512),
        LOG_TABLE = typedarrayBuffer_alloc(256);
      !(function initTables() {
        for (var x = 1, i = 0; i < 255; i++)
          (EXP_TABLE[i] = x), (LOG_TABLE[x] = i), 256 & (x <<= 1) && (x ^= 285);
        for (i = 255; i < 512; i++) EXP_TABLE[i] = EXP_TABLE[i - 255];
      })();
      var galoisField_exp = function exp(n) {
          return EXP_TABLE[n];
        },
        galoisField_mul = function mul(x, y) {
          return 0 === x || 0 === y
            ? 0
            : EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
        },
        polynomial = createCommonjsModule(function (module, exports) {
          (exports.mul = function mul(p1, p2) {
            for (
              var coeff = typedarrayBuffer_alloc(p1.length + p2.length - 1),
                i = 0;
              i < p1.length;
              i++
            )
              for (var j = 0; j < p2.length; j++)
                coeff[i + j] ^= galoisField_mul(p1[i], p2[j]);
            return coeff;
          }),
            (exports.mod = function mod(divident, divisor) {
              for (
                var result = typedarrayBuffer_from(divident);
                result.length - divisor.length >= 0;

              ) {
                for (var coeff = result[0], i = 0; i < divisor.length; i++)
                  result[i] ^= galoisField_mul(divisor[i], coeff);
                for (
                  var offset = 0;
                  offset < result.length && 0 === result[offset];

                )
                  offset++;
                result = result.slice(offset);
              }
              return result;
            }),
            (exports.generateECPolynomial = function generateECPolynomial(
              degree
            ) {
              for (
                var poly = typedarrayBuffer_from([1]), i = 0;
                i < degree;
                i++
              )
                poly = exports.mul(poly, [1, galoisField_exp(i)]);
              return poly;
            });
        }),
        Buffer$1 = buffer__WEBPACK_IMPORTED_MODULE_9___default.a.Buffer;
      function ReedSolomonEncoder(degree) {
        (this.genPoly = void 0),
          (this.degree = degree),
          this.degree && this.initialize(this.degree);
      }
      (ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
        (this.degree = degree),
          (this.genPoly = polynomial.generateECPolynomial(this.degree));
      }),
        (ReedSolomonEncoder.prototype.encode = function encode(data) {
          if (!this.genPoly) throw new Error('Encoder not initialized');
          var pad = typedarrayBuffer_alloc(this.degree),
            paddedData = Buffer$1.concat(
              [data, pad],
              data.length + this.degree
            ),
            remainder = polynomial.mod(paddedData, this.genPoly),
            start = this.degree - remainder.length;
          if (start > 0) {
            var buff = typedarrayBuffer_alloc(this.degree);
            return remainder.copy(buff, start), buff;
          }
          return remainder;
        });
      var reedSolomonEncoder = ReedSolomonEncoder,
        versionCheck_isValid = function isValid(version) {
          return !isNaN(version) && version >= 1 && version <= 40;
        },
        kanji =
          '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+',
        byte =
          '(?:(?![A-Z0-9 $%*+\\-./:]|' +
          (kanji = kanji.replace(/u/g, '\\u')) +
          ')(?:.|[\r\n]))+',
        KANJI = new RegExp(kanji, 'g'),
        BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g'),
        BYTE = new RegExp(byte, 'g'),
        NUMERIC = new RegExp('[0-9]+', 'g'),
        ALPHANUMERIC = new RegExp('[A-Z $%*+\\-./:]+', 'g'),
        TEST_KANJI = new RegExp('^' + kanji + '$'),
        TEST_NUMERIC = new RegExp('^[0-9]+$'),
        TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$'),
        regex = {
          KANJI: KANJI,
          BYTE_KANJI: BYTE_KANJI,
          BYTE: BYTE,
          NUMERIC: NUMERIC,
          ALPHANUMERIC: ALPHANUMERIC,
          testKanji: function testKanji(str) {
            return TEST_KANJI.test(str);
          },
          testNumeric: function testNumeric(str) {
            return TEST_NUMERIC.test(str);
          },
          testAlphanumeric: function testAlphanumeric(str) {
            return TEST_ALPHANUMERIC.test(str);
          },
        },
        mode = createCommonjsModule(function (module, exports) {
          (exports.NUMERIC = { id: 'Numeric', bit: 1, ccBits: [10, 12, 14] }),
            (exports.ALPHANUMERIC = {
              id: 'Alphanumeric',
              bit: 2,
              ccBits: [9, 11, 13],
            }),
            (exports.BYTE = { id: 'Byte', bit: 4, ccBits: [8, 16, 16] }),
            (exports.KANJI = { id: 'Kanji', bit: 8, ccBits: [8, 10, 12] }),
            (exports.MIXED = { bit: -1 }),
            (exports.getCharCountIndicator = function getCharCountIndicator(
              mode,
              version
            ) {
              if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);
              if (!versionCheck_isValid(version))
                throw new Error('Invalid version: ' + version);
              return version >= 1 && version < 10
                ? mode.ccBits[0]
                : version < 27
                ? mode.ccBits[1]
                : mode.ccBits[2];
            }),
            (exports.getBestModeForData = function getBestModeForData(dataStr) {
              return regex.testNumeric(dataStr)
                ? exports.NUMERIC
                : regex.testAlphanumeric(dataStr)
                ? exports.ALPHANUMERIC
                : regex.testKanji(dataStr)
                ? exports.KANJI
                : exports.BYTE;
            }),
            (exports.toString = function toString(mode) {
              if (mode && mode.id) return mode.id;
              throw new Error('Invalid mode');
            }),
            (exports.isValid = function isValid(mode) {
              return mode && mode.bit && mode.ccBits;
            }),
            (exports.from = function from(value, defaultValue) {
              if (exports.isValid(value)) return value;
              try {
                return (function fromString(string) {
                  if ('string' != typeof string)
                    throw new Error('Param is not a string');
                  switch (string.toLowerCase()) {
                    case 'numeric':
                      return exports.NUMERIC;
                    case 'alphanumeric':
                      return exports.ALPHANUMERIC;
                    case 'kanji':
                      return exports.KANJI;
                    case 'byte':
                      return exports.BYTE;
                    default:
                      throw new Error('Unknown mode: ' + string);
                  }
                })(value);
              } catch (e) {
                return defaultValue;
              }
            });
        }),
        version = createCommonjsModule(function (module, exports) {
          var G18_BCH = utils_getBCHDigit(7973);
          function getReservedBitsCount(mode$1, version) {
            return mode.getCharCountIndicator(mode$1, version) + 4;
          }
          function getTotalBitsFromDataArray(segments, version) {
            var totalBits = 0;
            return (
              segments.forEach(function (data) {
                var reservedBits = getReservedBitsCount(data.mode, version);
                totalBits += reservedBits + data.getBitsLength();
              }),
              totalBits
            );
          }
          (exports.from = function from(value, defaultValue) {
            return versionCheck_isValid(value)
              ? parseInt(value, 10)
              : defaultValue;
          }),
            (exports.getCapacity = function getCapacity(
              version,
              errorCorrectionLevel,
              mode$1
            ) {
              if (!versionCheck_isValid(version))
                throw new Error('Invalid QR Code version');
              void 0 === mode$1 && (mode$1 = mode.BYTE);
              var dataTotalCodewordsBits =
                8 *
                (utils_getSymbolTotalCodewords(version) -
                  errorCorrectionCode_getTotalCodewordsCount(
                    version,
                    errorCorrectionLevel
                  ));
              if (mode$1 === mode.MIXED) return dataTotalCodewordsBits;
              var usableBits =
                dataTotalCodewordsBits - getReservedBitsCount(mode$1, version);
              switch (mode$1) {
                case mode.NUMERIC:
                  return Math.floor((usableBits / 10) * 3);
                case mode.ALPHANUMERIC:
                  return Math.floor((usableBits / 11) * 2);
                case mode.KANJI:
                  return Math.floor(usableBits / 13);
                case mode.BYTE:
                default:
                  return Math.floor(usableBits / 8);
              }
            }),
            (exports.getBestVersionForData = function getBestVersionForData(
              data,
              errorCorrectionLevel$1
            ) {
              var seg,
                ecl = errorCorrectionLevel.from(
                  errorCorrectionLevel$1,
                  errorCorrectionLevel.M
                );
              if (isarray(data)) {
                if (data.length > 1)
                  return (function getBestVersionForMixedData(
                    segments,
                    errorCorrectionLevel
                  ) {
                    for (
                      var currentVersion = 1;
                      currentVersion <= 40;
                      currentVersion++
                    ) {
                      if (
                        getTotalBitsFromDataArray(segments, currentVersion) <=
                        exports.getCapacity(
                          currentVersion,
                          errorCorrectionLevel,
                          mode.MIXED
                        )
                      )
                        return currentVersion;
                    }
                  })(data, ecl);
                if (0 === data.length) return 1;
                seg = data[0];
              } else seg = data;
              return (function getBestVersionForDataLength(
                mode,
                length,
                errorCorrectionLevel
              ) {
                for (
                  var currentVersion = 1;
                  currentVersion <= 40;
                  currentVersion++
                )
                  if (
                    length <=
                    exports.getCapacity(
                      currentVersion,
                      errorCorrectionLevel,
                      mode
                    )
                  )
                    return currentVersion;
              })(seg.mode, seg.getLength(), ecl);
            }),
            (exports.getEncodedBits = function getEncodedBits(version) {
              if (!versionCheck_isValid(version) || version < 7)
                throw new Error('Invalid QR Code version');
              for (var d = version << 12; utils_getBCHDigit(d) - G18_BCH >= 0; )
                d ^= 7973 << (utils_getBCHDigit(d) - G18_BCH);
              return (version << 12) | d;
            });
        }),
        G15_BCH = utils_getBCHDigit(1335),
        formatInfo_getEncodedBits = function getEncodedBits(
          errorCorrectionLevel,
          mask
        ) {
          for (
            var data = (errorCorrectionLevel.bit << 3) | mask, d = data << 10;
            utils_getBCHDigit(d) - G15_BCH >= 0;

          )
            d ^= 1335 << (utils_getBCHDigit(d) - G15_BCH);
          return 21522 ^ ((data << 10) | d);
        };
      function NumericData(data) {
        (this.mode = mode.NUMERIC), (this.data = data.toString());
      }
      (NumericData.getBitsLength = function getBitsLength(length) {
        return (
          10 * Math.floor(length / 3) + (length % 3 ? (length % 3) * 3 + 1 : 0)
        );
      }),
        (NumericData.prototype.getLength = function getLength() {
          return this.data.length;
        }),
        (NumericData.prototype.getBitsLength = function getBitsLength() {
          return NumericData.getBitsLength(this.data.length);
        }),
        (NumericData.prototype.write = function write(bitBuffer) {
          var i, group, value;
          for (i = 0; i + 3 <= this.data.length; i += 3)
            (group = this.data.substr(i, 3)),
              (value = parseInt(group, 10)),
              bitBuffer.put(value, 10);
          var remainingNum = this.data.length - i;
          remainingNum > 0 &&
            ((group = this.data.substr(i)),
            (value = parseInt(group, 10)),
            bitBuffer.put(value, 3 * remainingNum + 1));
        });
      var numericData = NumericData,
        ALPHA_NUM_CHARS = [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z',
          ' ',
          '$',
          '%',
          '*',
          '+',
          '-',
          '.',
          '/',
          ':',
        ];
      function AlphanumericData(data) {
        (this.mode = mode.ALPHANUMERIC), (this.data = data);
      }
      (AlphanumericData.getBitsLength = function getBitsLength(length) {
        return 11 * Math.floor(length / 2) + (length % 2) * 6;
      }),
        (AlphanumericData.prototype.getLength = function getLength() {
          return this.data.length;
        }),
        (AlphanumericData.prototype.getBitsLength = function getBitsLength() {
          return AlphanumericData.getBitsLength(this.data.length);
        }),
        (AlphanumericData.prototype.write = function write(bitBuffer) {
          var i;
          for (i = 0; i + 2 <= this.data.length; i += 2) {
            var value = 45 * ALPHA_NUM_CHARS.indexOf(this.data[i]);
            (value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1])),
              bitBuffer.put(value, 11);
          }
          this.data.length % 2 &&
            bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
        });
      var alphanumericData = AlphanumericData;
      function ByteData(data) {
        (this.mode = mode.BYTE), (this.data = typedarrayBuffer_from(data));
      }
      (ByteData.getBitsLength = function getBitsLength(length) {
        return 8 * length;
      }),
        (ByteData.prototype.getLength = function getLength() {
          return this.data.length;
        }),
        (ByteData.prototype.getBitsLength = function getBitsLength() {
          return ByteData.getBitsLength(this.data.length);
        }),
        (ByteData.prototype.write = function (bitBuffer) {
          for (var i = 0, l = this.data.length; i < l; i++)
            bitBuffer.put(this.data[i], 8);
        });
      var byteData = ByteData;
      function KanjiData(data) {
        (this.mode = mode.KANJI), (this.data = data);
      }
      (KanjiData.getBitsLength = function getBitsLength(length) {
        return 13 * length;
      }),
        (KanjiData.prototype.getLength = function getLength() {
          return this.data.length;
        }),
        (KanjiData.prototype.getBitsLength = function getBitsLength() {
          return KanjiData.getBitsLength(this.data.length);
        }),
        (KanjiData.prototype.write = function (bitBuffer) {
          var i;
          for (i = 0; i < this.data.length; i++) {
            var value = utils_toSJIS(this.data[i]);
            if (value >= 33088 && value <= 40956) value -= 33088;
            else {
              if (!(value >= 57408 && value <= 60351))
                throw new Error(
                  'Invalid SJIS character: ' +
                    this.data[i] +
                    '\nMake sure your charset is UTF-8'
                );
              value -= 49472;
            }
            (value = 192 * ((value >>> 8) & 255) + (255 & value)),
              bitBuffer.put(value, 13);
          }
        });
      var kanjiData = KanjiData,
        dijkstra_1 = createCommonjsModule(function (module) {
          var dijkstra = {
            single_source_shortest_paths: function (graph, s, d) {
              var predecessors = {},
                costs = {};
              costs[s] = 0;
              var closest,
                u,
                v,
                cost_of_s_to_u,
                adjacent_nodes,
                cost_of_s_to_u_plus_cost_of_e,
                cost_of_s_to_v,
                open = dijkstra.PriorityQueue.make();
              for (open.push(s, 0); !open.empty(); )
                for (v in ((u = (closest = open.pop()).value),
                (cost_of_s_to_u = closest.cost),
                (adjacent_nodes = graph[u] || {})))
                  adjacent_nodes.hasOwnProperty(v) &&
                    ((cost_of_s_to_u_plus_cost_of_e =
                      cost_of_s_to_u + adjacent_nodes[v]),
                    (cost_of_s_to_v = costs[v]),
                    (void 0 === costs[v] ||
                      cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) &&
                      ((costs[v] = cost_of_s_to_u_plus_cost_of_e),
                      open.push(v, cost_of_s_to_u_plus_cost_of_e),
                      (predecessors[v] = u)));
              if (void 0 !== d && void 0 === costs[d]) {
                var msg = [
                  'Could not find a path from ',
                  s,
                  ' to ',
                  d,
                  '.',
                ].join('');
                throw new Error(msg);
              }
              return predecessors;
            },
            extract_shortest_path_from_predecessor_list: function (
              predecessors,
              d
            ) {
              for (var nodes = [], u = d; u; )
                nodes.push(u), (u = predecessors[u]);
              return nodes.reverse(), nodes;
            },
            find_path: function (graph, s, d) {
              var predecessors = dijkstra.single_source_shortest_paths(
                graph,
                s,
                d
              );
              return dijkstra.extract_shortest_path_from_predecessor_list(
                predecessors,
                d
              );
            },
            PriorityQueue: {
              make: function (opts) {
                var key,
                  T = dijkstra.PriorityQueue,
                  t = {};
                for (key in ((opts = opts || {}), T))
                  T.hasOwnProperty(key) && (t[key] = T[key]);
                return (
                  (t.queue = []),
                  (t.sorter = opts.sorter || T.default_sorter),
                  t
                );
              },
              default_sorter: function (a, b) {
                return a.cost - b.cost;
              },
              push: function (value, cost) {
                var item = { value: value, cost: cost };
                this.queue.push(item), this.queue.sort(this.sorter);
              },
              pop: function () {
                return this.queue.shift();
              },
              empty: function () {
                return 0 === this.queue.length;
              },
            },
          };
          module.exports = dijkstra;
        }),
        segments = createCommonjsModule(function (module, exports) {
          function getStringByteLength(str) {
            return unescape(encodeURIComponent(str)).length;
          }
          function getSegments(regex, mode, str) {
            for (
              var result, segments = [];
              null !== (result = regex.exec(str));

            )
              segments.push({
                data: result[0],
                index: result.index,
                mode: mode,
                length: result[0].length,
              });
            return segments;
          }
          function getSegmentsFromString(dataStr) {
            var byteSegs,
              kanjiSegs,
              numSegs = getSegments(regex.NUMERIC, mode.NUMERIC, dataStr),
              alphaNumSegs = getSegments(
                regex.ALPHANUMERIC,
                mode.ALPHANUMERIC,
                dataStr
              );
            return (
              utils_isKanjiModeEnabled()
                ? ((byteSegs = getSegments(regex.BYTE, mode.BYTE, dataStr)),
                  (kanjiSegs = getSegments(regex.KANJI, mode.KANJI, dataStr)))
                : ((byteSegs = getSegments(
                    regex.BYTE_KANJI,
                    mode.BYTE,
                    dataStr
                  )),
                  (kanjiSegs = [])),
              numSegs
                .concat(alphaNumSegs, byteSegs, kanjiSegs)
                .sort(function (s1, s2) {
                  return s1.index - s2.index;
                })
                .map(function (obj) {
                  return { data: obj.data, mode: obj.mode, length: obj.length };
                })
            );
          }
          function getSegmentBitsLength(length, mode$1) {
            switch (mode$1) {
              case mode.NUMERIC:
                return numericData.getBitsLength(length);
              case mode.ALPHANUMERIC:
                return alphanumericData.getBitsLength(length);
              case mode.KANJI:
                return kanjiData.getBitsLength(length);
              case mode.BYTE:
                return byteData.getBitsLength(length);
            }
          }
          function buildSingleSegment(data, modesHint) {
            var mode$1,
              bestMode = mode.getBestModeForData(data);
            if (
              (mode$1 = mode.from(modesHint, bestMode)) !== mode.BYTE &&
              mode$1.bit < bestMode.bit
            )
              throw new Error(
                '"' +
                  data +
                  '" cannot be encoded with mode ' +
                  mode.toString(mode$1) +
                  '.\n Suggested mode is: ' +
                  mode.toString(bestMode)
              );
            switch (
              (mode$1 !== mode.KANJI ||
                utils_isKanjiModeEnabled() ||
                (mode$1 = mode.BYTE),
              mode$1)
            ) {
              case mode.NUMERIC:
                return new numericData(data);
              case mode.ALPHANUMERIC:
                return new alphanumericData(data);
              case mode.KANJI:
                return new kanjiData(data);
              case mode.BYTE:
                return new byteData(data);
            }
          }
          (exports.fromArray = function fromArray(array) {
            return array.reduce(function (acc, seg) {
              return (
                'string' == typeof seg
                  ? acc.push(buildSingleSegment(seg, null))
                  : seg.data &&
                    acc.push(buildSingleSegment(seg.data, seg.mode)),
                acc
              );
            }, []);
          }),
            (exports.fromString = function fromString(data, version) {
              for (
                var graph = (function buildGraph(nodes, version) {
                    for (
                      var table = {},
                        graph = { start: {} },
                        prevNodeIds = ['start'],
                        i = 0;
                      i < nodes.length;
                      i++
                    ) {
                      for (
                        var nodeGroup = nodes[i], currentNodeIds = [], j = 0;
                        j < nodeGroup.length;
                        j++
                      ) {
                        var node = nodeGroup[j],
                          key = '' + i + j;
                        currentNodeIds.push(key),
                          (table[key] = { node: node, lastCount: 0 }),
                          (graph[key] = {});
                        for (var n = 0; n < prevNodeIds.length; n++) {
                          var prevNodeId = prevNodeIds[n];
                          table[prevNodeId] &&
                          table[prevNodeId].node.mode === node.mode
                            ? ((graph[prevNodeId][key] =
                                getSegmentBitsLength(
                                  table[prevNodeId].lastCount + node.length,
                                  node.mode
                                ) -
                                getSegmentBitsLength(
                                  table[prevNodeId].lastCount,
                                  node.mode
                                )),
                              (table[prevNodeId].lastCount += node.length))
                            : (table[prevNodeId] &&
                                (table[prevNodeId].lastCount = node.length),
                              (graph[prevNodeId][key] =
                                getSegmentBitsLength(node.length, node.mode) +
                                4 +
                                mode.getCharCountIndicator(
                                  node.mode,
                                  version
                                )));
                        }
                      }
                      prevNodeIds = currentNodeIds;
                    }
                    for (n = 0; n < prevNodeIds.length; n++)
                      graph[prevNodeIds[n]].end = 0;
                    return { map: graph, table: table };
                  })(
                    (function buildNodes(segs) {
                      for (var nodes = [], i = 0; i < segs.length; i++) {
                        var seg = segs[i];
                        switch (seg.mode) {
                          case mode.NUMERIC:
                            nodes.push([
                              seg,
                              {
                                data: seg.data,
                                mode: mode.ALPHANUMERIC,
                                length: seg.length,
                              },
                              {
                                data: seg.data,
                                mode: mode.BYTE,
                                length: seg.length,
                              },
                            ]);
                            break;
                          case mode.ALPHANUMERIC:
                            nodes.push([
                              seg,
                              {
                                data: seg.data,
                                mode: mode.BYTE,
                                length: seg.length,
                              },
                            ]);
                            break;
                          case mode.KANJI:
                            nodes.push([
                              seg,
                              {
                                data: seg.data,
                                mode: mode.BYTE,
                                length: getStringByteLength(seg.data),
                              },
                            ]);
                            break;
                          case mode.BYTE:
                            nodes.push([
                              {
                                data: seg.data,
                                mode: mode.BYTE,
                                length: getStringByteLength(seg.data),
                              },
                            ]);
                        }
                      }
                      return nodes;
                    })(getSegmentsFromString(data, utils_isKanjiModeEnabled())),
                    version
                  ),
                  path = dijkstra_1.find_path(graph.map, 'start', 'end'),
                  optimizedSegs = [],
                  i = 1;
                i < path.length - 1;
                i++
              )
                optimizedSegs.push(graph.table[path[i]].node);
              return exports.fromArray(
                (function mergeSegments(segs) {
                  return segs.reduce(function (acc, curr) {
                    var prevSeg =
                      acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
                    return prevSeg && prevSeg.mode === curr.mode
                      ? ((acc[acc.length - 1].data += curr.data), acc)
                      : (acc.push(curr), acc);
                  }, []);
                })(optimizedSegs)
              );
            }),
            (exports.rawSplit = function rawSplit(data) {
              return exports.fromArray(
                getSegmentsFromString(data, utils_isKanjiModeEnabled())
              );
            });
        });
      function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
        var i,
          mod,
          size = matrix.size,
          bits = formatInfo_getEncodedBits(errorCorrectionLevel, maskPattern);
        for (i = 0; i < 15; i++)
          (mod = 1 == ((bits >> i) & 1)),
            i < 6
              ? matrix.set(i, 8, mod, !0)
              : i < 8
              ? matrix.set(i + 1, 8, mod, !0)
              : matrix.set(size - 15 + i, 8, mod, !0),
            i < 8
              ? matrix.set(8, size - i - 1, mod, !0)
              : i < 9
              ? matrix.set(8, 15 - i - 1 + 1, mod, !0)
              : matrix.set(8, 15 - i - 1, mod, !0);
        matrix.set(size - 8, 8, 1, !0);
      }
      function createData(version, errorCorrectionLevel, segments) {
        var buffer = new bitBuffer();
        segments.forEach(function (data) {
          buffer.put(data.mode.bit, 4),
            buffer.put(
              data.getLength(),
              mode.getCharCountIndicator(data.mode, version)
            ),
            data.write(buffer);
        });
        var dataTotalCodewordsBits =
          8 *
          (utils_getSymbolTotalCodewords(version) -
            errorCorrectionCode_getTotalCodewordsCount(
              version,
              errorCorrectionLevel
            ));
        for (
          buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits &&
          buffer.put(0, 4);
          buffer.getLengthInBits() % 8 != 0;

        )
          buffer.putBit(0);
        for (
          var remainingByte =
              (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8,
            i = 0;
          i < remainingByte;
          i++
        )
          buffer.put(i % 2 ? 17 : 236, 8);
        return (function createCodewords(
          bitBuffer,
          version,
          errorCorrectionLevel
        ) {
          for (
            var totalCodewords = utils_getSymbolTotalCodewords(version),
              ecTotalCodewords = errorCorrectionCode_getTotalCodewordsCount(
                version,
                errorCorrectionLevel
              ),
              dataTotalCodewords = totalCodewords - ecTotalCodewords,
              ecTotalBlocks = errorCorrectionCode_getBlocksCount(
                version,
                errorCorrectionLevel
              ),
              blocksInGroup1 = ecTotalBlocks - (totalCodewords % ecTotalBlocks),
              totalCodewordsInGroup1 = Math.floor(
                totalCodewords / ecTotalBlocks
              ),
              dataCodewordsInGroup1 = Math.floor(
                dataTotalCodewords / ecTotalBlocks
              ),
              dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1,
              ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1,
              rs = new reedSolomonEncoder(ecCount),
              offset = 0,
              dcData = new Array(ecTotalBlocks),
              ecData = new Array(ecTotalBlocks),
              maxDataSize = 0,
              buffer = typedarrayBuffer_from(bitBuffer.buffer),
              b = 0;
            b < ecTotalBlocks;
            b++
          ) {
            var dataSize =
              b < blocksInGroup1
                ? dataCodewordsInGroup1
                : dataCodewordsInGroup2;
            (dcData[b] = buffer.slice(offset, offset + dataSize)),
              (ecData[b] = rs.encode(dcData[b])),
              (offset += dataSize),
              (maxDataSize = Math.max(maxDataSize, dataSize));
          }
          var i,
            r,
            data = typedarrayBuffer_alloc(totalCodewords),
            index = 0;
          for (i = 0; i < maxDataSize; i++)
            for (r = 0; r < ecTotalBlocks; r++)
              i < dcData[r].length && (data[index++] = dcData[r][i]);
          for (i = 0; i < ecCount; i++)
            for (r = 0; r < ecTotalBlocks; r++) data[index++] = ecData[r][i];
          return data;
        })(buffer, version, errorCorrectionLevel);
      }
      function createSymbol(
        data,
        version$1,
        errorCorrectionLevel,
        maskPattern$1
      ) {
        var segments$1;
        if (isarray(data)) segments$1 = segments.fromArray(data);
        else {
          if ('string' != typeof data) throw new Error('Invalid data');
          var estimatedVersion = version$1;
          if (!estimatedVersion) {
            var rawSegments = segments.rawSplit(data);
            estimatedVersion = version.getBestVersionForData(
              rawSegments,
              errorCorrectionLevel
            );
          }
          segments$1 = segments.fromString(data, estimatedVersion || 40);
        }
        var bestVersion = version.getBestVersionForData(
          segments$1,
          errorCorrectionLevel
        );
        if (!bestVersion)
          throw new Error(
            'The amount of data is too big to be stored in a QR Code'
          );
        if (version$1) {
          if (version$1 < bestVersion)
            throw new Error(
              '\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: ' +
                bestVersion +
                '.\n'
            );
        } else version$1 = bestVersion;
        var dataBits = createData(version$1, errorCorrectionLevel, segments$1),
          moduleCount = utils_getSymbolSize(version$1),
          modules = new bitMatrix(moduleCount);
        return (
          (function setupFinderPattern(matrix, version) {
            for (
              var size = matrix.size,
                pos = finderPattern_getPositions(version),
                i = 0;
              i < pos.length;
              i++
            )
              for (var row = pos[i][0], col = pos[i][1], r = -1; r <= 7; r++)
                if (!(row + r <= -1 || size <= row + r))
                  for (var c = -1; c <= 7; c++)
                    col + c <= -1 ||
                      size <= col + c ||
                      ((r >= 0 && r <= 6 && (0 === c || 6 === c)) ||
                      (c >= 0 && c <= 6 && (0 === r || 6 === r)) ||
                      (r >= 2 && r <= 4 && c >= 2 && c <= 4)
                        ? matrix.set(row + r, col + c, !0, !0)
                        : matrix.set(row + r, col + c, !1, !0));
          })(modules, version$1),
          (function setupTimingPattern(matrix) {
            for (var size = matrix.size, r = 8; r < size - 8; r++) {
              var value = r % 2 == 0;
              matrix.set(r, 6, value, !0), matrix.set(6, r, value, !0);
            }
          })(modules),
          (function setupAlignmentPattern(matrix, version) {
            for (
              var pos = alignmentPattern.getPositions(version), i = 0;
              i < pos.length;
              i++
            )
              for (var row = pos[i][0], col = pos[i][1], r = -2; r <= 2; r++)
                for (var c = -2; c <= 2; c++)
                  -2 === r ||
                  2 === r ||
                  -2 === c ||
                  2 === c ||
                  (0 === r && 0 === c)
                    ? matrix.set(row + r, col + c, !0, !0)
                    : matrix.set(row + r, col + c, !1, !0);
          })(modules, version$1),
          setupFormatInfo(modules, errorCorrectionLevel, 0),
          version$1 >= 7 &&
            (function setupVersionInfo(matrix, version$1) {
              for (
                var row,
                  col,
                  mod,
                  size = matrix.size,
                  bits = version.getEncodedBits(version$1),
                  i = 0;
                i < 18;
                i++
              )
                (row = Math.floor(i / 3)),
                  (col = (i % 3) + size - 8 - 3),
                  (mod = 1 == ((bits >> i) & 1)),
                  matrix.set(row, col, mod, !0),
                  matrix.set(col, row, mod, !0);
            })(modules, version$1),
          (function setupData(matrix, data) {
            for (
              var size = matrix.size,
                inc = -1,
                row = size - 1,
                bitIndex = 7,
                byteIndex = 0,
                col = size - 1;
              col > 0;
              col -= 2
            )
              for (6 === col && col--; ; ) {
                for (var c = 0; c < 2; c++)
                  if (!matrix.isReserved(row, col - c)) {
                    var dark = !1;
                    byteIndex < data.length &&
                      (dark = 1 == ((data[byteIndex] >>> bitIndex) & 1)),
                      matrix.set(row, col - c, dark),
                      -1 === --bitIndex && (byteIndex++, (bitIndex = 7));
                  }
                if ((row += inc) < 0 || size <= row) {
                  (row -= inc), (inc = -inc);
                  break;
                }
              }
          })(modules, dataBits),
          isNaN(maskPattern$1) &&
            (maskPattern$1 = maskPattern.getBestMask(
              modules,
              setupFormatInfo.bind(null, modules, errorCorrectionLevel)
            )),
          maskPattern.applyMask(maskPattern$1, modules),
          setupFormatInfo(modules, errorCorrectionLevel, maskPattern$1),
          {
            modules: modules,
            version: version$1,
            errorCorrectionLevel: errorCorrectionLevel,
            maskPattern: maskPattern$1,
            segments: segments$1,
          }
        );
      }
      var qrcode_create = function create(data, options) {
          if (void 0 === data || '' === data) throw new Error('No input text');
          var version$1,
            mask,
            errorCorrectionLevel$1 = errorCorrectionLevel.M;
          return (
            void 0 !== options &&
              ((errorCorrectionLevel$1 = errorCorrectionLevel.from(
                options.errorCorrectionLevel,
                errorCorrectionLevel.M
              )),
              (version$1 = version.from(options.version)),
              (mask = maskPattern.from(options.maskPattern)),
              options.toSJISFunc &&
                utils_setToSJISFunction(options.toSJISFunc)),
            createSymbol(data, version$1, errorCorrectionLevel$1, mask)
          );
        },
        utils$1 = createCommonjsModule(function (module, exports) {
          function hex2rgba(hex) {
            if (
              ('number' == typeof hex && (hex = hex.toString()),
              'string' != typeof hex)
            )
              throw new Error('Color should be defined as hex string');
            var hexCode = hex.slice().replace('#', '').split('');
            if (
              hexCode.length < 3 ||
              5 === hexCode.length ||
              hexCode.length > 8
            )
              throw new Error('Invalid hex color: ' + hex);
            (3 !== hexCode.length && 4 !== hexCode.length) ||
              (hexCode = Array.prototype.concat.apply(
                [],
                hexCode.map(function (c) {
                  return [c, c];
                })
              )),
              6 === hexCode.length && hexCode.push('F', 'F');
            var hexValue = parseInt(hexCode.join(''), 16);
            return {
              r: (hexValue >> 24) & 255,
              g: (hexValue >> 16) & 255,
              b: (hexValue >> 8) & 255,
              a: 255 & hexValue,
              hex: '#' + hexCode.slice(0, 6).join(''),
            };
          }
          (exports.getOptions = function getOptions(options) {
            options || (options = {}), options.color || (options.color = {});
            var margin =
                void 0 === options.margin ||
                null === options.margin ||
                options.margin < 0
                  ? 4
                  : options.margin,
              width =
                options.width && options.width >= 21 ? options.width : void 0,
              scale = options.scale || 4;
            return {
              width: width,
              scale: width ? 4 : scale,
              margin: margin,
              color: {
                dark: hex2rgba(options.color.dark || '#000000ff'),
                light: hex2rgba(options.color.light || '#ffffffff'),
              },
              type: options.type,
              rendererOpts: options.rendererOpts || {},
            };
          }),
            (exports.getScale = function getScale(qrSize, opts) {
              return opts.width && opts.width >= qrSize + 2 * opts.margin
                ? opts.width / (qrSize + 2 * opts.margin)
                : opts.scale;
            }),
            (exports.getImageWidth = function getImageWidth(qrSize, opts) {
              var scale = exports.getScale(qrSize, opts);
              return Math.floor((qrSize + 2 * opts.margin) * scale);
            }),
            (exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
              for (
                var size = qr.modules.size,
                  data = qr.modules.data,
                  scale = exports.getScale(size, opts),
                  symbolSize = Math.floor((size + 2 * opts.margin) * scale),
                  scaledMargin = opts.margin * scale,
                  palette = [opts.color.light, opts.color.dark],
                  i = 0;
                i < symbolSize;
                i++
              )
                for (var j = 0; j < symbolSize; j++) {
                  var posDst = 4 * (i * symbolSize + j),
                    pxColor = opts.color.light;
                  if (
                    i >= scaledMargin &&
                    j >= scaledMargin &&
                    i < symbolSize - scaledMargin &&
                    j < symbolSize - scaledMargin
                  )
                    pxColor =
                      palette[
                        data[
                          Math.floor((i - scaledMargin) / scale) * size +
                            Math.floor((j - scaledMargin) / scale)
                        ]
                          ? 1
                          : 0
                      ];
                  (imgData[posDst++] = pxColor.r),
                    (imgData[posDst++] = pxColor.g),
                    (imgData[posDst++] = pxColor.b),
                    (imgData[posDst] = pxColor.a);
                }
            });
        }),
        canvas = createCommonjsModule(function (module, exports) {
          (exports.render = function render(qrData, canvas, options) {
            var opts = options,
              canvasEl = canvas;
            void 0 !== opts ||
              (canvas && canvas.getContext) ||
              ((opts = canvas), (canvas = void 0)),
              canvas ||
                (canvasEl = (function getCanvasElement() {
                  try {
                    return document.createElement('canvas');
                  } catch (e) {
                    throw new Error('You need to specify a canvas element');
                  }
                })()),
              (opts = utils$1.getOptions(opts));
            var size = utils$1.getImageWidth(qrData.modules.size, opts),
              ctx = canvasEl.getContext('2d'),
              image = ctx.createImageData(size, size);
            return (
              utils$1.qrToImageData(image.data, qrData, opts),
              (function clearCanvas(ctx, canvas, size) {
                ctx.clearRect(0, 0, canvas.width, canvas.height),
                  canvas.style || (canvas.style = {}),
                  (canvas.height = size),
                  (canvas.width = size),
                  (canvas.style.height = size + 'px'),
                  (canvas.style.width = size + 'px');
              })(ctx, canvasEl, size),
              ctx.putImageData(image, 0, 0),
              canvasEl
            );
          }),
            (exports.renderToDataURL = function renderToDataURL(
              qrData,
              canvas,
              options
            ) {
              var opts = options;
              void 0 !== opts ||
                (canvas && canvas.getContext) ||
                ((opts = canvas), (canvas = void 0)),
                opts || (opts = {});
              var canvasEl = exports.render(qrData, canvas, opts),
                type = opts.type || 'image/png',
                rendererOpts = opts.rendererOpts || {};
              return canvasEl.toDataURL(type, rendererOpts.quality);
            });
        });
      function getColorAttrib(color, attrib) {
        var alpha = color.a / 255,
          str = attrib + '="' + color.hex + '"';
        return alpha < 1
          ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"'
          : str;
      }
      function svgCmd(cmd, x, y) {
        var str = cmd + x;
        return void 0 !== y && (str += ' ' + y), str;
      }
      var svgTag_render = function render(qrData, options, cb) {
        var opts = utils$1.getOptions(options),
          size = qrData.modules.size,
          data = qrData.modules.data,
          qrcodesize = size + 2 * opts.margin,
          bg = opts.color.light.a
            ? '<path ' +
              getColorAttrib(opts.color.light, 'fill') +
              ' d="M0 0h' +
              qrcodesize +
              'v' +
              qrcodesize +
              'H0z"/>'
            : '',
          path =
            '<path ' +
            getColorAttrib(opts.color.dark, 'stroke') +
            ' d="' +
            (function qrToPath(data, size, margin) {
              for (
                var path = '', moveBy = 0, newRow = !1, lineLength = 0, i = 0;
                i < data.length;
                i++
              ) {
                var col = Math.floor(i % size),
                  row = Math.floor(i / size);
                col || newRow || (newRow = !0),
                  data[i]
                    ? (lineLength++,
                      (i > 0 && col > 0 && data[i - 1]) ||
                        ((path += newRow
                          ? svgCmd('M', col + margin, 0.5 + row + margin)
                          : svgCmd('m', moveBy, 0)),
                        (moveBy = 0),
                        (newRow = !1)),
                      (col + 1 < size && data[i + 1]) ||
                        ((path += svgCmd('h', lineLength)), (lineLength = 0)))
                    : moveBy++;
              }
              return path;
            })(data, size, opts.margin) +
            '"/>',
          viewBox = 'viewBox="0 0 ' + qrcodesize + ' ' + qrcodesize + '"',
          svgTag =
            '<svg xmlns="http://www.w3.org/2000/svg" ' +
            (opts.width
              ? 'width="' + opts.width + '" height="' + opts.width + '" '
              : '') +
            viewBox +
            ' shape-rendering="crispEdges">' +
            bg +
            path +
            '</svg>\n';
        return 'function' == typeof cb && cb(null, svgTag), svgTag;
      };
      function renderCanvas(renderFunc, canvas, text, opts, cb) {
        var args = [].slice.call(arguments, 1),
          argsNum = args.length,
          isLastArgCb = 'function' == typeof args[argsNum - 1];
        if (!isLastArgCb && !canPromise())
          throw new Error('Callback required as last argument');
        if (!isLastArgCb) {
          if (argsNum < 1) throw new Error('Too few arguments provided');
          return (
            1 === argsNum
              ? ((text = canvas), (canvas = opts = void 0))
              : 2 !== argsNum ||
                canvas.getContext ||
                ((opts = text), (text = canvas), (canvas = void 0)),
            new Promise(function (resolve, reject) {
              try {
                var data = qrcode_create(text, opts);
                resolve(renderFunc(data, canvas, opts));
              } catch (e) {
                reject(e);
              }
            })
          );
        }
        if (argsNum < 2) throw new Error('Too few arguments provided');
        2 === argsNum
          ? ((cb = text), (text = canvas), (canvas = opts = void 0))
          : 3 === argsNum &&
            (canvas.getContext && void 0 === cb
              ? ((cb = opts), (opts = void 0))
              : ((cb = opts),
                (opts = text),
                (text = canvas),
                (canvas = void 0)));
        try {
          var data = qrcode_create(text, opts);
          cb(null, renderFunc(data, canvas, opts));
        } catch (e) {
          cb(e);
        }
      }
      var browser = {
          create: qrcode_create,
          toCanvas: renderCanvas.bind(null, canvas.render),
          toDataURL: renderCanvas.bind(null, canvas.renderToDataURL),
          toString: renderCanvas.bind(null, function (data, _, opts) {
            return svgTag_render(data, opts);
          }),
        },
        logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.a('TOTP'),
        AmplifyTOTPSetup = (function () {
          function class_1(hostRef) {
            Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.k)(
              this,
              hostRef
            ),
              (this.inputProps = { autoFocus: !0 }),
              (this.handleAuthStateChange =
                _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__.d),
              (this.headerText =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a.TOTP_HEADER_TEXT),
              (this.issuer =
                _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a.TOTP_ISSUER),
              (this.code = null),
              (this.setupMessage = null),
              (this.qrCodeInput = null),
              (this.loading = !1);
          }
          return (
            (class_1.prototype.componentWillLoad = function () {
              return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      return (
                        (this.removeHubListener = Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__.h
                        )(function (authState) {
                          authState ===
                            _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__
                              .a.TOTPSetup && _this.setup();
                        })),
                        [4, this.setup()]
                      );
                    case 1:
                      return _a.sent(), [2];
                  }
                });
              });
            }),
            (class_1.prototype.disconnectedCallback = function () {
              this.removeHubListener && this.removeHubListener();
            }),
            (class_1.prototype.buildOtpAuthPath = function (
              user,
              issuer,
              secretKey
            ) {
              return (
                'otpauth://totp/' +
                issuer +
                ':' +
                user.username +
                '?secret=' +
                secretKey +
                '&issuer=' +
                issuer
              );
            }),
            (class_1.prototype.onTOTPEvent = function (event, data, user) {
              return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      return (
                        logger.debug('on totp event', event, data),
                        event !==
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.g ||
                        data !==
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.r
                          ? [3, 2]
                          : [
                              4,
                              Object(
                                _auth_helpers_bd096ca7_js__WEBPACK_IMPORTED_MODULE_8__.a
                              )(user, this.handleAuthStateChange),
                            ]
                      );
                    case 1:
                      _a.sent(), (_a.label = 2);
                    case 2:
                      return [2];
                  }
                });
              });
            }),
            (class_1.prototype.handleTotpInputChange = function (event) {
              (this.setupMessage = null),
                (this.qrCodeInput = event.target.value);
            }),
            (class_1.prototype.generateQRCode = function (codeFromTotp) {
              return __awaiter(this, void 0, void 0, function () {
                var _a, error_1;
                return __generator(this, function (_b) {
                  switch (_b.label) {
                    case 0:
                      return (
                        _b.trys.push([0, 2, , 3]),
                        (_a = this),
                        [4, browser.toDataURL(codeFromTotp)]
                      );
                    case 1:
                      return (_a.qrCodeImageSource = _b.sent()), [3, 3];
                    case 2:
                      return (
                        (error_1 = _b.sent()),
                        Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__.a
                        )(error_1),
                        [3, 3]
                      );
                    case 3:
                      return [2];
                  }
                });
              });
            }),
            (class_1.prototype.setup = function () {
              return __awaiter(this, void 0, void 0, function () {
                var encodedIssuer, secretKey, error_2;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (
                        !this.user ||
                        'MFA_SETUP' !== this.user.challengeName ||
                        this.loading
                      )
                        return [2];
                      if (
                        ((this.setupMessage = null),
                        (encodedIssuer = encodeURI(
                          _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                            this.issuer
                          )
                        )),
                        !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a ||
                          'function' !=
                            typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__
                              .a.setupTOTP)
                      )
                        throw new Error(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.d
                        );
                      (this.loading = !0), (_a.label = 1);
                    case 1:
                      return (
                        _a.trys.push([1, 3, 4, 5]),
                        [
                          4,
                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a.setupTOTP(
                            this.user
                          ),
                        ]
                      );
                    case 2:
                      return (
                        (secretKey = _a.sent()),
                        logger.debug('secret key', secretKey),
                        (this.code = this.buildOtpAuthPath(
                          this.user,
                          encodedIssuer,
                          secretKey
                        )),
                        this.generateQRCode(this.code),
                        [3, 5]
                      );
                    case 3:
                      return (
                        (error_2 = _a.sent()),
                        Object(
                          _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__.a
                        )(error_2),
                        logger.debug(
                          _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                            _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__
                              .a.TOTP_SETUP_FAILURE
                          ),
                          error_2
                        ),
                        [3, 5]
                      );
                    case 4:
                      return (this.loading = !1), [7];
                    case 5:
                      return [2];
                  }
                });
              });
            }),
            (class_1.prototype.verifyTotpToken = function (event) {
              return __awaiter(this, void 0, void 0, function () {
                var user, error_3;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if ((event && event.preventDefault(), !this.qrCodeInput))
                        return logger.debug('No TOTP Code provided'), [2];
                      if (
                        ((user = this.user),
                        !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a ||
                          'function' !=
                            typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__
                              .a.verifyTotpToken ||
                          'function' !=
                            typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__
                              .a.setPreferredMFA)
                      )
                        throw new Error(
                          _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.d
                        );
                      _a.label = 1;
                    case 1:
                      return (
                        _a.trys.push([1, 5, , 6]),
                        [
                          4,
                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a.verifyTotpToken(
                            user,
                            this.qrCodeInput
                          ),
                        ]
                      );
                    case 2:
                      return (
                        _a.sent(),
                        [
                          4,
                          _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.a.setPreferredMFA(
                            user,
                            _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_3__
                              .c.TOTP
                          ),
                        ]
                      );
                    case 3:
                      return (
                        _a.sent(),
                        (this.setupMessage =
                          _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                            _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__
                              .a.TOTP_SUCCESS_MESSAGE
                          )),
                        logger.debug(
                          _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                            _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__
                              .a.TOTP_SUCCESS_MESSAGE
                          )
                        ),
                        [
                          4,
                          this.onTOTPEvent(
                            _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.g,
                            _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.r,
                            user
                          ),
                        ]
                      );
                    case 4:
                      return _a.sent(), [3, 6];
                    case 5:
                      return (
                        (error_3 = _a.sent()),
                        (this.setupMessage =
                          _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                            _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__
                              .a.TOTP_SETUP_FAILURE
                          )),
                        logger.error(error_3),
                        [3, 6]
                      );
                    case 6:
                      return [2];
                  }
                });
              });
            }),
            (class_1.prototype.render = function () {
              var _this = this;
              return Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                _index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.b,
                null,
                Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                  'amplify-form-section',
                  {
                    headerText:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                        this.headerText
                      ),
                    submitButtonText:
                      _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a
                          .TOTP_SUBMIT_BUTTON_TEXT
                      ),
                    handleSubmit: function (event) {
                      return _this.verifyTotpToken(event);
                    },
                    loading: this.loading,
                  },
                  Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                    'div',
                    { class: 'totp-setup' },
                    this.qrCodeImageSource &&
                      Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                        'img',
                        {
                          src: this.qrCodeImageSource,
                          alt: _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                            _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__
                              .a.QR_CODE_ALT
                          ),
                        }
                      ),
                    Object(_index_3fb5c139_js__WEBPACK_IMPORTED_MODULE_0__.i)(
                      'amplify-form-field',
                      {
                        label:
                          _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.a.get(
                            _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__
                              .a.TOTP_LABEL
                          ),
                        inputProps: this.inputProps,
                        fieldId: 'totpCode',
                        name: 'totpCode',
                        handleInputChange: function (event) {
                          return _this.handleTotpInputChange(event);
                        },
                      }
                    )
                  )
                )
              );
            }),
            class_1
          );
        })();
      AmplifyTOTPSetup.style =
        '.totp-setup{text-align:center;margin-bottom:30px}.totp-setup img{height:128px;width:128px}';
    },
    1772: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.d(__webpack_exports__, 'a', function () {
        return checkContact;
      }),
        __webpack_require__.d(__webpack_exports__, 'b', function () {
          return handleSignIn;
        });
      var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(164),
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(104),
        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(98),
        _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(406),
        _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(56),
        _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(15),
        _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(62),
        _helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__ =
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
        logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.a(
          'auth-helpers'
        );
      function checkContact(user, handleAuthStateChange) {
        return __awaiter(this, void 0, void 0, function () {
          var data, newUser, error_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (
                  !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a ||
                  'function' !=
                    typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a
                      .verifiedContact
                )
                  throw new Error(
                    _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.d
                  );
                if (!isCognitoUser(user))
                  return (
                    handleAuthStateChange(
                      _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                        .SignedIn,
                      user
                    ),
                    [2]
                  );
                _a.label = 1;
              case 1:
                return (
                  _a.trys.push([1, 3, , 4]),
                  [
                    4,
                    _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a.verifiedContact(
                      user
                    ),
                  ]
                );
              case 2:
                return (
                  (data = _a.sent()),
                  !Object(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.d)(
                    data.verified
                  ) ||
                  Object(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.d)(
                    data.unverified
                  )
                    ? handleAuthStateChange(
                        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                          .SignedIn,
                        user
                      )
                    : ((newUser = Object.assign(user, data)),
                      handleAuthStateChange(
                        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                          .VerifyContact,
                        newUser
                      )),
                  [3, 4]
                );
              case 3:
                return (
                  (error_1 = _a.sent()),
                  Object(_helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__.a)(
                    error_1
                  ),
                  [3, 4]
                );
              case 4:
                return [2];
            }
          });
        });
      }
      var handleSignIn = function (username, password, handleAuthStateChange) {
          return __awaiter(void 0, void 0, void 0, function () {
            var user, error_2;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  if (
                    !_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a ||
                    'function' !=
                      typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a
                        .signIn
                  )
                    throw new Error(
                      _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_6__.d
                    );
                  _a.label = 1;
                case 1:
                  return (
                    _a.trys.push([1, 9, , 10]),
                    [
                      4,
                      _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_3__.a.signIn(
                        username,
                        password
                      ),
                    ]
                  );
                case 2:
                  return (
                    (user = _a.sent()),
                    logger.debug(user),
                    user.challengeName !==
                      _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.b
                        .SMSMFA &&
                    user.challengeName !==
                      _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.b
                        .SoftwareTokenMFA
                      ? [3, 3]
                      : (logger.debug(
                          'confirm user with ' + user.challengeName
                        ),
                        handleAuthStateChange(
                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                            .ConfirmSignIn,
                          user
                        ),
                        [3, 8])
                  );
                case 3:
                  return user.challengeName !==
                    _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.b
                      .NewPasswordRequired
                    ? [3, 4]
                    : (logger.debug(
                        'require new password',
                        user.challengeParam
                      ),
                      handleAuthStateChange(
                        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                          .ResetPassword,
                        user
                      ),
                      [3, 8]);
                case 4:
                  return user.challengeName !==
                    _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.b
                      .MFASetup
                    ? [3, 5]
                    : (logger.debug('TOTP setup', user.challengeParam),
                      handleAuthStateChange(
                        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                          .TOTPSetup,
                        user
                      ),
                      [3, 8]);
                case 5:
                  return user.challengeName ===
                    _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.b
                      .CustomChallenge &&
                    user.challengeParam &&
                    'true' === user.challengeParam.trigger
                    ? (logger.debug('custom challenge', user.challengeParam),
                      handleAuthStateChange(
                        _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                          .CustomConfirmSignIn,
                        user
                      ),
                      [3, 8])
                    : [3, 6];
                case 6:
                  return [4, checkContact(user, handleAuthStateChange)];
                case 7:
                  _a.sent(), (_a.label = 8);
                case 8:
                  return [3, 10];
                case 9:
                  return (
                    'UserNotConfirmedException' === (error_2 = _a.sent()).code
                      ? (logger.debug('the user is not confirmed'),
                        handleAuthStateChange(
                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                            .ConfirmSignUp,
                          { username: username }
                        ))
                      : 'PasswordResetRequiredException' === error_2.code
                      ? (logger.debug('the user requires a new password'),
                        handleAuthStateChange(
                          _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_2__.a
                            .ForgotPassword,
                          { username: username }
                        ))
                      : 'InvalidParameterException' === error_2.code &&
                        '' === password &&
                        (logger.debug('Password cannot be empty'),
                        (error_2.message =
                          _Translations_c833f663_js__WEBPACK_IMPORTED_MODULE_5__.a.EMPTY_PASSWORD)),
                    Object(_helpers_4f61e5ff_js__WEBPACK_IMPORTED_MODULE_7__.a)(
                      error_2
                    ),
                    [3, 10]
                  );
                case 10:
                  return [2];
              }
            });
          });
        },
        isCognitoUser = function (user) {
          return (
            user instanceof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_4__.e
          );
        };
    },
  },
]);
//# sourceMappingURL=196.43062421b39d2bb010e4.bundle.js.map
