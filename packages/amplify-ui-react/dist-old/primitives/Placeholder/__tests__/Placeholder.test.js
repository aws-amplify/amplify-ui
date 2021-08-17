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
var Placeholder_1 = require('../Placeholder');
var Text_1 = require('../../Text');
var shared_1 = require('../../shared');
describe('Placeholder: ', function () {
  it('renders correct defaults', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var placeholder;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Placeholder_1.Placeholder,
                { testId: 'placeholderId' },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId('placeholderId')];
          case 1:
            placeholder = _a.sent();
            expect(
              placeholder.classList.contains(
                shared_1.ComponentClassNames.Placeholder
              )
            ).toBe(true);
            expect(placeholder.dataset['size']).toBeUndefined();
            return [2 /*return*/];
        }
      });
    });
  });
  it('renders based on isLoaded prop', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var placeholder1, text1, placeholder2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsxs(
                'div',
                {
                  children: [
                    jsx_runtime_1.jsx(
                      Placeholder_1.Placeholder,
                      __assign(
                        { testId: 'placeholder1' },
                        {
                          children: jsx_runtime_1.jsx(
                            Text_1.Text,
                            __assign(
                              { testId: 'text1' },
                              { children: 'Should not render' }
                            ),
                            void 0
                          ),
                        }
                      ),
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      Placeholder_1.Placeholder,
                      __assign(
                        { isLoaded: true, testId: 'placeholder2' },
                        {
                          children: jsx_runtime_1.jsx(
                            Text_1.Text,
                            __assign(
                              { testId: 'text2' },
                              { children: 'Should render' }
                            ),
                            void 0
                          ),
                        }
                      ),
                      void 0
                    ),
                  ],
                },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.queryByTestId('placeholder1')];
          case 1:
            placeholder1 = _a.sent();
            return [4 /*yield*/, react_1.screen.queryByTestId('text1')];
          case 2:
            text1 = _a.sent();
            return [4 /*yield*/, react_1.screen.queryByTestId('placeholder2')];
          case 3:
            placeholder2 = _a.sent();
            expect(placeholder1).toBeTruthy();
            expect(text1).toBeNull();
            expect(placeholder2).toBeNull();
            return [2 /*return*/];
        }
      });
    });
  });
  it('renders different sizes by passing size prop', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var placeholder1, placeholder2, placeholder3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsxs(
                'div',
                {
                  children: [
                    jsx_runtime_1.jsx(
                      Placeholder_1.Placeholder,
                      { size: 'small', testId: 'placeholder1' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      Placeholder_1.Placeholder,
                      { testId: 'placeholder2' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      Placeholder_1.Placeholder,
                      { size: 'large', testId: 'placeholder3' },
                      void 0
                    ),
                  ],
                },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId('placeholder1')];
          case 1:
            placeholder1 = _a.sent();
            return [4 /*yield*/, react_1.screen.findByTestId('placeholder2')];
          case 2:
            placeholder2 = _a.sent();
            return [4 /*yield*/, react_1.screen.findByTestId('placeholder3')];
          case 3:
            placeholder3 = _a.sent();
            expect(placeholder1.dataset['size']).toBe('small');
            expect(placeholder2.dataset['size']).toBeUndefined();
            expect(placeholder3.dataset['size']).toBe('large');
            return [2 /*return*/];
        }
      });
    });
  });
  it('can apply styling via props', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var placeholder;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Placeholder_1.Placeholder,
                { height: '123px', width: '50%', testId: 'placeholderId' },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId('placeholderId')];
          case 1:
            placeholder = _a.sent();
            expect(placeholder.style.getPropertyValue('height')).toBe('123px');
            expect(placeholder.style.getPropertyValue('width')).toBe('50%');
            return [2 /*return*/];
        }
      });
    });
  });
  it('can apply a custom className', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var placeholder;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            react_1.render(
              jsx_runtime_1.jsx(
                Placeholder_1.Placeholder,
                { className: 'custom-placeholder', testId: 'placeholderId' },
                void 0
              )
            );
            return [4 /*yield*/, react_1.screen.findByTestId('placeholderId')];
          case 1:
            placeholder = _a.sent();
            expect(placeholder.classList.contains('custom-placeholder')).toBe(
              true
            );
            expect(
              placeholder.classList.contains(
                shared_1.ComponentClassNames.Placeholder
              )
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
                Placeholder_1.Placeholder,
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
//# sourceMappingURL=Placeholder.test.js.map
