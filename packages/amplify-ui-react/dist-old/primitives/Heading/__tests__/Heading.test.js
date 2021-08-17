'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
var Heading_1 = require('../Heading');
var shared_1 = require('../../shared');
var types_1 = require('../../types');
var lodash_1 = require('lodash');
describe('Heading: ', function () {
  it('renders an h6 tag by default', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var heading;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Heading_1.Heading,
                { testId: 'headingId' },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId('headingId')];
          case 1:
            heading = _a.sent();
            expect(heading.nodeName).toBe('H6');
            return [2 /*return*/];
        }
      });
    });
  });
  it('renders h1-h6 tags by passing level prop', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var h1, h2, h3, h4, h5, h6;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsxs(
                'div',
                {
                  children: [
                    jsx_runtime_1.jsx(
                      Heading_1.Heading,
                      __assign({ level: 1, testId: 'h1' }, { children: 'H1' }),
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      Heading_1.Heading,
                      __assign({ level: 2, testId: 'h2' }, { children: 'H2' }),
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      Heading_1.Heading,
                      __assign({ level: 3, testId: 'h3' }, { children: 'H3' }),
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      Heading_1.Heading,
                      __assign({ level: 4, testId: 'h4' }, { children: 'H4' }),
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      Heading_1.Heading,
                      __assign({ level: 5, testId: 'h5' }, { children: 'H5' }),
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      Heading_1.Heading,
                      __assign({ level: 6, testId: 'h6' }, { children: 'H6' }),
                      void 0
                    ),
                  ],
                },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId('h1')];
          case 1:
            h1 = _a.sent();
            return [4 /*yield*/, react_1.screen.findByTestId('h2')];
          case 2:
            h2 = _a.sent();
            return [4 /*yield*/, react_1.screen.findByTestId('h3')];
          case 3:
            h3 = _a.sent();
            return [4 /*yield*/, react_1.screen.findByTestId('h4')];
          case 4:
            h4 = _a.sent();
            return [4 /*yield*/, react_1.screen.findByTestId('h5')];
          case 5:
            h5 = _a.sent();
            return [4 /*yield*/, react_1.screen.findByTestId('h6')];
          case 6:
            h6 = _a.sent();
            expect(h1.nodeName).toBe('H1');
            expect(h2.nodeName).toBe('H2');
            expect(h3.nodeName).toBe('H3');
            expect(h4.nodeName).toBe('H4');
            expect(h5.nodeName).toBe('H5');
            expect(h6.nodeName).toBe('H6');
            return [2 /*return*/];
        }
      });
    });
  });
  it('can apply styling via props', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var heading;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Heading_1.Heading,
                { level: 3, fontStyle: 'italic', testId: 'headingId' },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId('headingId')];
          case 1:
            heading = _a.sent();
            expect(heading.nodeName).toBe('H3');
            expect(
              heading.style.getPropertyValue(
                lodash_1.kebabCase(
                  types_1.ComponentPropsToStylePropsMap.fontStyle
                )
              )
            ).toBe('italic');
            return [2 /*return*/];
        }
      });
    });
  });
  it('can apply a custom className', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var heading;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Heading_1.Heading,
                { className: 'custom-heading', testId: 'headingId' },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId('headingId')];
          case 1:
            heading = _a.sent();
            expect(heading.classList.contains('custom-heading')).toBe(true);
            expect(
              heading.classList.contains(shared_1.ComponentClassNames.Heading)
            ).toBe(true);
            return [2 /*return*/];
        }
      });
    });
  });
  it('can render any arbitrary data-* attribute', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var heading;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Heading_1.Heading,
                { 'data-demo': 'true', testId: 'dataTest' },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId('dataTest')];
          case 1:
            heading = _a.sent();
            expect(heading.dataset['demo']).toBe('true');
            return [2 /*return*/];
        }
      });
    });
  });
});
//# sourceMappingURL=Heading.test.js.map
