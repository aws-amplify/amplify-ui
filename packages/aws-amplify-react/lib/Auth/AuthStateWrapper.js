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
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthStateWrapper = void 0;
var React = __importStar(require('react'));
var core_1 = require('@aws-amplify/core');
var auth_1 = require('@aws-amplify/auth');
var Amplify_UI_Theme_1 = __importDefault(
  require('../Amplify-UI/Amplify-UI-Theme')
);
var logger = new core_1.ConsoleLogger('AuthStateWrapper');
var AuthStateWrapper = /** @class */ (function (_super) {
  __extends(AuthStateWrapper, _super);
  function AuthStateWrapper(props) {
    var _this = _super.call(this, props) || this;
    _this.handleStateChange = _this.handleStateChange.bind(_this);
    _this.handleAuthEvent = _this.handleAuthEvent.bind(_this);
    _this.checkUser = _this.checkUser.bind(_this);
    _this.state = { authState: props.authState || 'signIn' };
    return _this;
  }
  AuthStateWrapper.prototype.componentWillMount = function () {
    var config = this.props.amplifyConfig;
    if (config) {
      core_1.Amplify.configure(config);
    }
  };
  AuthStateWrapper.prototype.componentDidMount = function () {
    this.checkUser();
  };
  AuthStateWrapper.prototype.handleStateChange = function (state, data) {
    logger.debug('authStateWrapper state change ' + state, data);
    if (state === this.state.authState) {
      return;
    }
    if (state === 'signedOut') {
      state = 'signIn';
    }
    this.setState({ authState: state, authData: data, error: null });
    if (this.props.onStateChange) {
      this.props.onStateChange(state, data);
    }
  };
  AuthStateWrapper.prototype.handleAuthEvent = function (state, event) {
    if (event.type === 'error') {
      this.setState({ error: event.data });
    }
  };
  AuthStateWrapper.prototype.checkUser = function () {
    var _this = this;
    // @ts-ignore
    if (!auth_1.Auth || typeof auth_1.Auth.currentUser !== 'function') {
      throw new Error(
        'No Auth module found, please ensure @aws-amplify/auth is imported'
      );
    }
    // @ts-ignore
    return auth_1.Auth.currentUser()
      .then(function (user) {
        var state = user ? 'signedIn' : 'signIn';
        _this.handleStateChange(state, user);
      })
      .catch(function (err) {
        return logger.error(err);
      });
  };
  AuthStateWrapper.prototype.render = function () {
    var _this = this;
    var _a = this.state,
      authState = _a.authState,
      authData = _a.authData;
    var theme = this.props.theme || Amplify_UI_Theme_1.default;
    var render_children = React.Children.map(
      this.props.children,
      function (child) {
        if (!child) {
          return null;
        }
        // @ts-ignore
        return React.cloneElement(child, {
          authState: authState,
          authData: authData,
          theme: theme,
          onStateChange: _this.handleStateChange,
          onAuthEvent: _this.handleAuthEvent,
        });
      }
    );
    return React.createElement(
      'div',
      { className: 'amplify-state-wrapper', style: theme.stateWrapper },
      render_children,
      this.state.error &&
        React.createElement(
          'div',
          { className: 'amplify-error-section', style: theme.errorSection },
          this.state.error
        )
    );
  };
  return AuthStateWrapper;
})(React.Component);
exports.AuthStateWrapper = AuthStateWrapper;
/**
 * @deprecated use named import
 */
exports.default = AuthStateWrapper;
//# sourceMappingURL=AuthStateWrapper.js.map
