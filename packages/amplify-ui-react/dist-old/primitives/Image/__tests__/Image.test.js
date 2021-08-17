'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
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
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
var jsx_runtime_1 = require('react/jsx-runtime');
var Image_1 = require('../Image');
var react_1 = require('@testing-library/react');
var shared_1 = require('../../shared');
var types_1 = require('../../types');
var lodash_1 = require('lodash');
var altText = 'Cool cat';
var src = 'http://localhost/cat.jpg';
describe('Image: ', function () {
  it('renders <img> with alt and expected classname', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var image;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Image_1.Image,
                { id: 'cool_cat', src: src, alt: altText },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByAltText(altText)];
          case 1:
            image = _a.sent();
            expect(image.nodeName).toBe('IMG');
            expect(image.src).toBe(src);
            expect(image.className).toContain(
              shared_1.ComponentClassNames.Image
            );
            return [2 /*return*/];
        }
      });
    });
  });
  it('can set sizes and srcset attributes', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var srcSet, sizes, src, image;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            srcSet = 'cat-480w.jpg 480w, cat-800w.jpg 800w';
            sizes = '(max-width: 600px) 480px, 800px';
            src = 'cat-800w.jpg';
            react_1.render(
              jsx_runtime_1.jsx(
                Image_1.Image,
                {
                  testId: 'dataTest',
                  alt: altText,
                  src: src,
                  srcSet: srcSet,
                  sizes: sizes,
                },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId('dataTest')];
          case 1:
            image = _a.sent();
            expect(image).toBeDefined();
            expect(image.sizes).toBe(sizes);
            expect(image.srcset).toBe(srcSet);
            return [2 /*return*/];
        }
      });
    });
  });
  it('can set onLoad event handler', function () {
    var onLoad = jest.fn();
    react_1.render(
      jsx_runtime_1.jsx(
        Image_1.Image,
        {
          id: 'dataTest',
          alt: altText,
          src: 'nonexistent.jpg',
          onLoad: onLoad,
        },
        void 0
      )
    );
    react_1.fireEvent.load(react_1.screen.getByAltText(altText));
    expect(onLoad).toHaveBeenCalledTimes(1);
  });
  it('can set onError event handler', function () {
    var onError = jest.fn();
    react_1.render(
      jsx_runtime_1.jsx(
        Image_1.Image,
        {
          id: 'dataTest',
          alt: altText,
          src: 'nonexistent.jpg',
          onError: onError,
        },
        void 0
      )
    );
    react_1.fireEvent.error(
      react_1.screen.getByAltText(altText),
      new Error('🚫 there was an error 🚫')
    );
    expect(onError).toHaveBeenCalledTimes(1);
  });
  it('can render any arbitrary data-* attribute', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var image;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Image_1.Image,
                {
                  'data-cat': 'true',
                  testId: 'dataTest',
                  alt: altText,
                  src: src,
                },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId('dataTest')];
          case 1:
            image = _a.sent();
            expect(image.dataset['cat']).toBe('true');
            return [2 /*return*/];
        }
      });
    });
  });
  it('can apply styling via props', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var image;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Image_1.Image,
                {
                  alt: altText,
                  src: src,
                  width: '100%',
                  height: 'auto',
                  opacity: '0.5',
                  objectFit: 'cover',
                  objectPosition: 'top left',
                  testId: 'stylingTest',
                },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId('stylingTest')];
          case 1:
            image = _a.sent();
            expect(
              image.style.getPropertyValue(
                types_1.ComponentPropsToStylePropsMap.width
              )
            ).toBe('100%');
            expect(
              image.style.getPropertyValue(
                types_1.ComponentPropsToStylePropsMap.height
              )
            ).toBe('auto');
            expect(
              image.style.getPropertyValue(
                types_1.ComponentPropsToStylePropsMap.opacity
              )
            ).toBe('0.5');
            expect(
              image.style.getPropertyValue(
                lodash_1.kebabCase(
                  types_1.ComponentPropsToStylePropsMap.objectFit
                )
              )
            ).toBe('cover');
            expect(
              image.style.getPropertyValue(
                lodash_1.kebabCase(
                  types_1.ComponentPropsToStylePropsMap.objectPosition
                )
              )
            ).toBe('top left');
            return [2 /*return*/];
        }
      });
    });
  });
});
//# sourceMappingURL=Image.test.js.map
