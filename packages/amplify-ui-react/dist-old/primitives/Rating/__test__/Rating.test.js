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
var Rating_1 = require('../Rating');
var react_1 = require('@testing-library/react');
describe('Rating: ', function () {
  var customIcon;
  beforeEach(function () {
    customIcon = function (className) {
      return jsx_runtime_1.jsx('svg', { className: className }, void 0);
    };
  });
  it('should render a classname for Rating', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var rating;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Rating_1.Rating,
                { testId: 'testId', className: 'my-rating-component' },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId('testId')];
          case 1:
            rating = _a.sent();
            expect(rating.className).toContain('my-rating-component');
            return [2 /*return*/];
        }
      });
    });
  });
  it('should render the data-size attribute', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var rating;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Rating_1.Rating,
                { testId: 'testId', size: 'small' },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId('testId')];
          case 1:
            rating = _a.sent();
            expect(rating.dataset['size']).toBe('small');
            return [2 /*return*/];
        }
      });
    });
  });
  it('should render the empty icon color', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var container, emptyIcon;
      return __generator(this, function (_a) {
        container = react_1.render(
          jsx_runtime_1.jsx(
            Rating_1.Rating,
            { testId: 'testId', emptyColor: 'red' },
            void 0
          )
        ).container;
        emptyIcon = container.getElementsByClassName(
          'amplify-rating-icon-empty'
        )[0];
        expect(emptyIcon['style'].color).toBe('red');
        return [2 /*return*/];
      });
    });
  });
  it('should render the filled icon color', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var container, filledIcon;
      return __generator(this, function (_a) {
        container = react_1.render(
          jsx_runtime_1.jsx(
            Rating_1.Rating,
            { testId: 'testId', value: 2, fillColor: 'blue' },
            void 0
          )
        ).container;
        filledIcon = container.getElementsByClassName(
          'amplify-rating-icon-filled'
        )[0];
        expect(filledIcon['style'].color).toBe('blue');
        return [2 /*return*/];
      });
    });
  });
  it('should render filled icons when the value prop is used', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var container, filledIcons;
      return __generator(this, function (_a) {
        container = react_1.render(
          jsx_runtime_1.jsx(
            Rating_1.Rating,
            { testId: 'testId', value: 2 },
            void 0
          )
        ).container;
        filledIcons = container.getElementsByClassName(
          'amplify-rating-icon-filled'
        );
        expect(filledIcons.length).toBe(2);
        return [2 /*return*/];
      });
    });
  });
  it('should render 2 filled and 3 empty icons', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var container, filledIcons, emptyIcons;
      return __generator(this, function (_a) {
        container = react_1.render(
          jsx_runtime_1.jsx(Rating_1.Rating, { value: 2 }, void 0)
        ).container;
        filledIcons = container.getElementsByClassName(
          'amplify-rating-icon-filled'
        );
        emptyIcons = container.getElementsByClassName(
          'amplify-rating-icon-empty'
        );
        expect(filledIcons.length).toBe(2);
        expect(emptyIcons.length).toBe(3);
        return [2 /*return*/];
      });
    });
  });
  it('should render 7 icons when the maxValue is set to 7', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var container, emptyIcons;
      return __generator(this, function (_a) {
        container = react_1.render(
          jsx_runtime_1.jsx(Rating_1.Rating, { maxValue: 7 }, void 0)
        ).container;
        emptyIcons = container.getElementsByClassName(
          'amplify-rating-icon-empty'
        );
        expect(emptyIcons.length).toBe(7);
        return [2 /*return*/];
      });
    });
  });
  it('should render the passed in icon component', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var icon, container, emptyIcons;
      return __generator(this, function (_a) {
        icon = customIcon('my-custom-component');
        container = react_1.render(
          jsx_runtime_1.jsx(Rating_1.Rating, { icon: icon }, void 0)
        ).container;
        emptyIcons = container.getElementsByClassName('my-custom-component');
        expect(emptyIcons.length).toBe(5);
        return [2 /*return*/];
      });
    });
  });
  it('should render the passed in empty icon', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var emptyIcon, container, emptyIcons;
      return __generator(this, function (_a) {
        emptyIcon = customIcon('my-custom-empty-icon');
        container = react_1.render(
          jsx_runtime_1.jsx(
            Rating_1.Rating,
            { emptyIcon: emptyIcon, value: 3 },
            void 0
          )
        ).container;
        emptyIcons = container.getElementsByClassName('my-custom-empty-icon');
        expect(emptyIcons.length).toBe(2);
        return [2 /*return*/];
      });
    });
  });
  it('should render both the passed in icon and empty icons', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var filledIcon, emptyIcon, container, emptyIcons, filledIcons;
      return __generator(this, function (_a) {
        filledIcon = customIcon('my-custom-filled-icon');
        emptyIcon = customIcon('my-custom-empty-icon');
        container = react_1.render(
          jsx_runtime_1.jsx(
            Rating_1.Rating,
            { icon: filledIcon, emptyIcon: emptyIcon, value: 3 },
            void 0
          )
        ).container;
        emptyIcons = container.getElementsByClassName('my-custom-empty-icon');
        filledIcons = container.getElementsByClassName('my-custom-filled-icon');
        expect(emptyIcons.length).toBe(2);
        expect(filledIcons.length).toBe(3);
        return [2 /*return*/];
      });
    });
  });
});
//# sourceMappingURL=Rating.test.js.map
