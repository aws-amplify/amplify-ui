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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var jsx_runtime_1 = require('react/jsx-runtime');
var react_1 = require('@testing-library/react');
var user_event_1 = __importDefault(require('@testing-library/user-event'));
var Pagination_1 = require('../Pagination');
var shared_1 = require('../../shared');
var PaginationItem_1 = require('../PaginationItem');
describe('Pagination component test suite', function () {
  var id = 'my-pagination';
  describe('Test Pagination', function () {
    it('should render pagination with provided props', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var pagination, firstPage, lastPage;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              react_1.render(
                jsx_runtime_1.jsx(
                  Pagination_1.Pagination,
                  {
                    id: id,
                    currentPage: 1,
                    totalPages: 5,
                    onChange: function () {},
                    onNext: function () {},
                    onPrevious: function () {},
                  },
                  void 0
                )
              );
              return [4 /*yield*/, react_1.screen.findByRole('navigation')];
            case 1:
              pagination = _a.sent();
              expect(pagination.id).toBe(id);
              expect(pagination.nodeName).toBe('NAV');
              expect(pagination.childNodes.length).toBe(1);
              expect(pagination).toHaveClass(
                shared_1.ComponentClassNames.Pagination
              );
              return [4 /*yield*/, react_1.screen.findByText('1')];
            case 2:
              firstPage = _a.sent();
              expect(firstPage).toHaveClass('current');
              return [
                4 /*yield*/,
                react_1.screen.findByLabelText('Go to page 5'),
              ];
            case 3:
              lastPage = _a.sent();
              expect(lastPage.childNodes.length).toBe(1);
              expect(lastPage).toHaveTextContent('5');
              return [2 /*return*/];
          }
        });
      });
    });
    it('should disable previous page button but enable next page button if current page is the first page', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var previous, next;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              react_1.render(
                jsx_runtime_1.jsx(
                  Pagination_1.Pagination,
                  {
                    id: id,
                    currentPage: 1,
                    totalPages: 5,
                    onChange: function () {},
                    onNext: function () {},
                    onPrevious: function () {},
                  },
                  void 0
                )
              );
              return [
                4 /*yield*/,
                react_1.screen.findByLabelText('Go to previous page'),
              ];
            case 1:
              previous = _a.sent();
              expect(previous.nodeName).toBe('BUTTON');
              expect(previous.childNodes.length).toBe(1);
              expect(previous).toBeDisabled();
              return [
                4 /*yield*/,
                react_1.screen.findByLabelText('Go to next page'),
              ];
            case 2:
              next = _a.sent();
              expect(next.nodeName).toBe('BUTTON');
              expect(next.childNodes.length).toBe(1);
              expect(next).not.toBeDisabled();
              return [2 /*return*/];
          }
        });
      });
    });
    it('should enable previous page button but disable next page button if current page is the last page', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var previous, next;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              react_1.render(
                jsx_runtime_1.jsx(
                  Pagination_1.Pagination,
                  {
                    id: id,
                    currentPage: 5,
                    totalPages: 5,
                    onChange: function () {},
                    onNext: function () {},
                    onPrevious: function () {},
                  },
                  void 0
                )
              );
              return [
                4 /*yield*/,
                react_1.screen.findByLabelText('Go to previous page'),
              ];
            case 1:
              previous = _a.sent();
              expect(previous.childNodes.length).toBe(1);
              expect(previous).not.toBeDisabled();
              return [
                4 /*yield*/,
                react_1.screen.findByLabelText('Go to next page'),
              ];
            case 2:
              next = _a.sent();
              expect(next.childNodes.length).toBe(1);
              expect(next).toBeDisabled();
              return [2 /*return*/];
          }
        });
      });
    });
    it('should enable both previous page button and next page button if current page is neither the first or last page', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var previous, next;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              react_1.render(
                jsx_runtime_1.jsx(
                  Pagination_1.Pagination,
                  {
                    id: id,
                    currentPage: 3,
                    totalPages: 5,
                    onChange: function () {},
                    onNext: function () {},
                    onPrevious: function () {},
                  },
                  void 0
                )
              );
              return [
                4 /*yield*/,
                react_1.screen.findByLabelText('Go to previous page'),
              ];
            case 1:
              previous = _a.sent();
              expect(previous.childNodes.length).toBe(1);
              expect(previous).not.toBeDisabled();
              return [
                4 /*yield*/,
                react_1.screen.findByLabelText('Go to next page'),
              ];
            case 2:
              next = _a.sent();
              expect(next.childNodes.length).toBe(1);
              expect(next).not.toBeDisabled();
              return [2 /*return*/];
          }
        });
      });
    });
    it('should invoke related callback function if click on corresponding button', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var mockOnChange,
          mockOnNext,
          mockOnPrevious,
          pageTwo,
          pageThree,
          pageFour,
          previous,
          next;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              mockOnChange = jest.fn();
              mockOnNext = jest.fn();
              mockOnPrevious = jest.fn();
              react_1.render(
                jsx_runtime_1.jsx(
                  Pagination_1.Pagination,
                  {
                    id: id,
                    currentPage: 3,
                    totalPages: 5,
                    onChange: mockOnChange,
                    onNext: mockOnNext,
                    onPrevious: mockOnPrevious,
                  },
                  void 0
                )
              );
              return [
                4 /*yield*/,
                react_1.screen.findByLabelText('Go to page 2'),
              ];
            case 1:
              pageTwo = _a.sent();
              user_event_1.default.click(pageTwo);
              expect(mockOnChange).toHaveBeenCalledTimes(1);
              expect(mockOnChange).toHaveBeenCalledWith(2, 3);
              return [4 /*yield*/, react_1.screen.findByText('3')];
            case 2:
              pageThree = _a.sent();
              user_event_1.default.click(pageThree);
              expect(mockOnChange).toHaveBeenCalledTimes(1);
              expect(mockOnChange).toHaveBeenLastCalledWith(2, 3);
              return [
                4 /*yield*/,
                react_1.screen.findByLabelText('Go to page 4'),
              ];
            case 3:
              pageFour = _a.sent();
              user_event_1.default.click(pageFour);
              expect(mockOnChange).toHaveBeenCalledTimes(2);
              expect(mockOnChange).toHaveBeenCalledWith(4, 3);
              return [
                4 /*yield*/,
                react_1.screen.findByLabelText('Go to previous page'),
              ];
            case 4:
              previous = _a.sent();
              user_event_1.default.click(previous);
              expect(mockOnPrevious).toHaveBeenCalledTimes(1);
              expect(mockOnPrevious).toHaveBeenCalledWith();
              return [
                4 /*yield*/,
                react_1.screen.findByLabelText('Go to next page'),
              ];
            case 5:
              next = _a.sent();
              user_event_1.default.click(next);
              expect(mockOnNext).toHaveBeenCalledTimes(1);
              expect(mockOnNext).toHaveBeenCalledWith();
              return [2 /*return*/];
          }
        });
      });
    });
    it('should render 11 items if sibling count is set to 2', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var pagination, paginationItemList;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              react_1.render(
                jsx_runtime_1.jsx(
                  Pagination_1.Pagination,
                  {
                    id: id,
                    currentPage: 1,
                    totalPages: 10,
                    siblingCount: 2,
                    onChange: function () {},
                    onNext: function () {},
                    onPrevious: function () {},
                  },
                  void 0
                )
              );
              return [4 /*yield*/, react_1.screen.findByRole('navigation')];
            case 1:
              pagination = _a.sent();
              expect(pagination.childNodes.length).toBe(1);
              paginationItemList = pagination.childNodes[0];
              // To avoid resizing the component during interaction, the constant length should be
              // 1(first page) + 1(last page) + 1(current page) + 2 * siblingCount + 2(ellipses)
              expect(paginationItemList.childNodes.length).toBe(11);
              return [2 /*return*/];
          }
        });
      });
    });
    it('should render 4 siblings around current page with 2 sibling count', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var pagination;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              react_1.render(
                jsx_runtime_1.jsx(
                  Pagination_1.Pagination,
                  {
                    id: id,
                    currentPage: 5,
                    totalPages: 10,
                    siblingCount: 2,
                    onChange: function () {},
                    onNext: function () {},
                    onPrevious: function () {},
                  },
                  void 0
                )
              );
              return [4 /*yield*/, react_1.screen.findByRole('navigation')];
            case 1:
              pagination = _a.sent();
              // curent page
              expect(pagination).toHaveTextContent('Current Page:');
              expect(pagination).toHaveTextContent('5');
              // sibling pages
              expect(pagination).toHaveTextContent('3');
              expect(pagination).toHaveTextContent('4');
              expect(pagination).toHaveTextContent('6');
              expect(pagination).toHaveTextContent('7');
              return [2 /*return*/];
          }
        });
      });
    });
  });
  describe('Test PaginationItem', function () {
    it('should render page item with provided porps', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var mockOnClick, pageItem, invisibleLabel;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              mockOnClick = jest.fn();
              react_1.render(
                jsx_runtime_1.jsx(
                  PaginationItem_1.PaginationItem,
                  {
                    type: 'page',
                    page: 1,
                    ariaLabel: 'Go to page 1',
                    currentPage: 1,
                    onClick: mockOnClick,
                  },
                  void 0
                )
              );
              return [4 /*yield*/, react_1.screen.findByText('1')];
            case 1:
              pageItem = _a.sent();
              expect(pageItem.nodeName).toBe('SPAN');
              expect(pageItem).toHaveClass('current');
              return [4 /*yield*/, react_1.screen.findByText('Current Page:')];
            case 2:
              invisibleLabel = _a.sent();
              expect(invisibleLabel).toHaveClass('visuallyhidden');
              user_event_1.default.click(pageItem);
              expect(mockOnClick).not.toHaveBeenCalled();
              return [2 /*return*/];
          }
        });
      });
    });
    it('should render previous page button with provided porps', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var mockOnClick, previous;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              mockOnClick = jest.fn();
              react_1.render(
                jsx_runtime_1.jsx(
                  PaginationItem_1.PaginationItem,
                  {
                    type: 'previous',
                    ariaDisabled: false,
                    ariaLabel: 'Go to previous page',
                    currentPage: 2,
                    onClick: mockOnClick,
                  },
                  void 0
                )
              );
              return [
                4 /*yield*/,
                react_1.screen.findByLabelText('Go to previous page'),
              ];
            case 1:
              previous = _a.sent();
              expect(previous.nodeName).toBe('BUTTON');
              expect(previous).not.toBeDisabled();
              user_event_1.default.click(previous);
              expect(mockOnClick).toHaveBeenCalledTimes(1);
              expect(mockOnClick).toHaveBeenCalledWith();
              return [2 /*return*/];
          }
        });
      });
    });
    it('should render next page button with provided porps', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var mockOnClick, previous;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              mockOnClick = jest.fn();
              react_1.render(
                jsx_runtime_1.jsx(
                  PaginationItem_1.PaginationItem,
                  {
                    type: 'next',
                    ariaDisabled: false,
                    ariaLabel: 'Go to next page',
                    currentPage: 2,
                    onClick: mockOnClick,
                  },
                  void 0
                )
              );
              return [
                4 /*yield*/,
                react_1.screen.findByLabelText('Go to next page'),
              ];
            case 1:
              previous = _a.sent();
              expect(previous.nodeName).toBe('BUTTON');
              expect(previous).not.toBeDisabled();
              user_event_1.default.click(previous);
              expect(mockOnClick).toHaveBeenCalledTimes(1);
              expect(mockOnClick).toHaveBeenCalledWith();
              return [2 /*return*/];
          }
        });
      });
    });
    it('should render ellipsis item with provided porps', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var ellipsis;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              react_1.render(
                jsx_runtime_1.jsx(
                  PaginationItem_1.PaginationItem,
                  { type: 'ellipsis', ariaLabel: 'ellipsis' },
                  void 0
                )
              );
              return [4 /*yield*/, react_1.screen.findByTestId('ellipsis')];
            case 1:
              ellipsis = _a.sent();
              expect(ellipsis.nodeName).toBe('SPAN');
              expect(ellipsis).toHaveClass('ellipsis');
              expect(ellipsis.innerHTML).toBe('\u2026');
              return [2 /*return*/];
          }
        });
      });
    });
  });
});
//# sourceMappingURL=Pagination.test.js.map
