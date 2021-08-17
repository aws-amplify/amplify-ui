'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null'
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.createOverlayComponent = void 0;
var react_1 = __importDefault(require('react'));
var react_dom_1 = __importDefault(require('react-dom'));
var attachEventProps_1 = require('./utils/attachEventProps');
function createOverlayComponent(displayName, controller) {
  var dismissEventName = 'on' + displayName + 'DidDismiss';
  return /** @class */ (function (_super) {
    __extends(ReactOverlayComponent, _super);
    function ReactOverlayComponent(props) {
      var _this = _super.call(this, props) || this;
      _this.el = document.createElement('div');
      return _this;
    }
    Object.defineProperty(ReactOverlayComponent, 'displayName', {
      get: function () {
        return displayName;
      },
      enumerable: false,
      configurable: true,
    });
    ReactOverlayComponent.prototype.componentDidMount = function () {
      if (this.props.isOpen) {
        this.present();
      }
    };
    ReactOverlayComponent.prototype.componentDidUpdate = function (prevProps) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (
                prevProps.isOpen !== this.props.isOpen &&
                this.props.isOpen === true
              ) {
                this.present(prevProps);
              }
              if (
                !(
                  this.controller &&
                  prevProps.isOpen !== this.props.isOpen &&
                  this.props.isOpen === false
                )
              )
                return [3 /*break*/, 2];
              return [4 /*yield*/, this.controller.dismiss()];
            case 1:
              _a.sent();
              _a.label = 2;
            case 2:
              return [2 /*return*/];
          }
        });
      });
    };
    ReactOverlayComponent.prototype.present = function (prevProps) {
      return __awaiter(this, void 0, void 0, function () {
        var _a, children, isOpen, _b, onDidDismiss, cProps, elementProps, _c;
        var _d;
        return __generator(this, function (_e) {
          switch (_e.label) {
            case 0:
              (_a = this.props),
                (children = _a.children),
                (isOpen = _a.isOpen),
                (_b = _a.onDidDismiss),
                (onDidDismiss = _b === void 0 ? function () {} : _b),
                (cProps = __rest(_a, ['children', 'isOpen', 'onDidDismiss']));
              elementProps = __assign(
                __assign({}, cProps),
                ((_d = {}), (_d[dismissEventName] = onDidDismiss), _d)
              );
              _c = this;
              return [
                4 /*yield*/,
                controller.create(
                  __assign(__assign({}, elementProps), {
                    component: this.el,
                    componentProps: {},
                  })
                ),
              ];
            case 1:
              _c.controller = _e.sent();
              attachEventProps_1.attachEventProps(
                this.controller,
                elementProps,
                prevProps
              );
              this.controller.present();
              return [2 /*return*/];
          }
        });
      });
    };
    ReactOverlayComponent.prototype.render = function () {
      return react_dom_1.default.createPortal(this.props.children, this.el);
    };
    return ReactOverlayComponent;
  })(react_1.default.Component);
}
exports.createOverlayComponent = createOverlayComponent;
//# sourceMappingURL=createOverlayComponent.js.map
