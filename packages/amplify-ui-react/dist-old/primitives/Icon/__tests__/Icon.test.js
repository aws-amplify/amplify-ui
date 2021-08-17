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
var react_1 = require('@testing-library/react');
var Icon_1 = require('../Icon');
var shared_1 = require('../../shared');
describe('Icon component', function () {
  var iconTestId = 'iconSearch';
  var pathData =
    'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91\n  3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49\n  19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z';
  it('should render <svg> with default attributes', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var icon;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Icon_1.Icon,
                {
                  id: iconTestId,
                  testId: iconTestId,
                  pathData: pathData,
                  ariaLabel: 'Search',
                },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId(iconTestId)];
          case 1:
            icon = _a.sent();
            expect(icon.id).toBe(iconTestId);
            expect(icon.nodeName).toBe('svg');
            expect(icon.dataset['size']).toBeUndefined();
            expect(icon.getAttribute('viewBox')).toBe('0 0 24 24');
            expect(icon.classList[0]).toContain(
              shared_1.ComponentClassNames.Icon
            );
            return [2 /*return*/];
        }
      });
    });
  });
  it('should render <path> with provided path data', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var icon, path;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Icon_1.Icon,
                { testId: iconTestId, pathData: pathData, ariaLabel: 'Search' },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId(iconTestId)];
          case 1:
            icon = _a.sent();
            expect(icon.childNodes.length).toBe(1);
            path = icon.childNodes[0];
            expect(path.getAttribute('d')).toBe(pathData);
            expect(path.getAttribute('fill')).toBe('currentColor');
            return [2 /*return*/];
        }
      });
    });
  });
  it('should render a classname for Icon', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var icon;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Icon_1.Icon,
                {
                  testId: iconTestId,
                  pathData: pathData,
                  className: 'my-icon-component',
                  ariaLabel: 'Search',
                },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId(iconTestId)];
          case 1:
            icon = _a.sent();
            expect(icon.classList.length).toBe(2);
            expect(icon.classList[0]).toContain(
              shared_1.ComponentClassNames.Icon
            );
            expect(icon.classList[1]).toContain('my-icon-component');
            return [2 /*return*/];
        }
      });
    });
  });
  it('can set data-size attribute', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var icon;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Icon_1.Icon,
                {
                  testId: iconTestId,
                  pathData: pathData,
                  size: 'small',
                  ariaLabel: 'Search',
                },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId(iconTestId)];
          case 1:
            icon = _a.sent();
            expect(icon.dataset['size']).toBe('small');
            return [2 /*return*/];
        }
      });
    });
  });
  it('can set viewBox attribute', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var icon;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Icon_1.Icon,
                {
                  testId: iconTestId,
                  pathData: pathData,
                  viewBox: { minX: 0, minY: 0, width: 100, height: 100 },
                  ariaLabel: 'Search',
                },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId(iconTestId)];
          case 1:
            icon = _a.sent();
            expect(icon.getAttribute('viewBox')).toBe('0 0 100 100');
            return [2 /*return*/];
        }
      });
    });
  });
});
//# sourceMappingURL=Icon.test.js.map
