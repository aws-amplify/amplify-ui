'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.withAuthenticator = withAuthenticator;
Object.defineProperty(exports, 'Authenticator', {
  enumerable: true,
  get: function get() {
    return _Authenticator['default'];
  },
});
Object.defineProperty(exports, 'AuthPiece', {
  enumerable: true,
  get: function get() {
    return _AuthPiece['default'];
  },
});
Object.defineProperty(exports, 'Loading', {
  enumerable: true,
  get: function get() {
    return _Loading['default'];
  },
});
Object.defineProperty(exports, 'SignIn', {
  enumerable: true,
  get: function get() {
    return _SignIn['default'];
  },
});
Object.defineProperty(exports, 'ConfirmSignIn', {
  enumerable: true,
  get: function get() {
    return _ConfirmSignIn['default'];
  },
});
Object.defineProperty(exports, 'SignUp', {
  enumerable: true,
  get: function get() {
    return _SignUp['default'];
  },
});
Object.defineProperty(exports, 'ConfirmSignUp', {
  enumerable: true,
  get: function get() {
    return _ConfirmSignUp['default'];
  },
});
Object.defineProperty(exports, 'ForgotPassword', {
  enumerable: true,
  get: function get() {
    return _ForgotPassword['default'];
  },
});
Object.defineProperty(exports, 'RequireNewPassword', {
  enumerable: true,
  get: function get() {
    return _RequireNewPassword['default'];
  },
});
Object.defineProperty(exports, 'VerifyContact', {
  enumerable: true,
  get: function get() {
    return _VerifyContact['default'];
  },
});
Object.defineProperty(exports, 'Greetings', {
  enumerable: true,
  get: function get() {
    return _Greetings['default'];
  },
});
Object.defineProperty(exports, 'withOAuth', {
  enumerable: true,
  get: function get() {
    return _withOAuth['default'];
  },
});

var _react = _interopRequireDefault(require('react'));

var _reactNative = require('react-native');

var _awsAmplify = require('aws-amplify');

var _Authenticator = _interopRequireDefault(require('./Authenticator'));

var _AuthPiece = _interopRequireDefault(require('./AuthPiece'));

var _Loading = _interopRequireDefault(require('./Loading'));

var _SignIn = _interopRequireDefault(require('./SignIn'));

var _ConfirmSignIn = _interopRequireDefault(require('./ConfirmSignIn'));

var _SignUp = _interopRequireDefault(require('./SignUp'));

var _ConfirmSignUp = _interopRequireDefault(require('./ConfirmSignUp'));

var _ForgotPassword = _interopRequireDefault(require('./ForgotPassword'));

var _RequireNewPassword = _interopRequireDefault(
  require('./RequireNewPassword')
);

var _VerifyContact = _interopRequireDefault(require('./VerifyContact'));

var _Greetings = _interopRequireDefault(require('./Greetings'));

var _withOAuth = _interopRequireDefault(require('./withOAuth'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      'Derived constructors may only return object or undefined'
    );
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

var logger = new _awsAmplify.Logger('auth components');

function withAuthenticator(Comp) {
  var includeGreetings =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var authenticatorComponents =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var federated =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var theme =
    arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var signUpConfig =
    arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

  var Wrapper = /*#__PURE__*/ (function (_React$Component) {
    _inherits(Wrapper, _React$Component);

    var _super = _createSuper(Wrapper);

    function Wrapper(props) {
      var _this;

      _classCallCheck(this, Wrapper);

      _this = _super.call(this, props);
      _this.handleAuthStateChange = _this.handleAuthStateChange.bind(
        _assertThisInitialized(_this)
      );
      _this.state = {
        authState: props.authState,
      };
      _this.authConfig = {};

      if (_typeof(includeGreetings) === 'object' && includeGreetings !== null) {
        if (includeGreetings.theme) {
          theme = includeGreetings.theme;
        }

        _this.authConfig = Object.assign(_this.authConfig, includeGreetings);
      } else {
        _this.authConfig = {
          includeGreetings: includeGreetings,
          authenticatorComponents: authenticatorComponents,
          signUpConfig: signUpConfig,
        };
      }

      return _this;
    }

    _createClass(Wrapper, [
      {
        key: 'handleAuthStateChange',
        value: function handleAuthStateChange(state, data) {
          this.setState({
            authState: state,
            authData: data,
          });

          if (this.props.onStateChange) {
            this.props.onStateChange(state, data);
          }
        },
      },
      {
        key: 'render',
        value: function render() {
          var _this$state = this.state,
            authState = _this$state.authState,
            authData = _this$state.authData;
          var signedIn = authState === 'signedIn';

          if (signedIn) {
            if (!this.authConfig.includeGreetings) {
              return /*#__PURE__*/ _react['default'].createElement(
                Comp,
                _extends({}, this.props, {
                  authState: authState,
                  authData: authData,
                  onStateChange: this.handleAuthStateChange,
                })
              );
            }

            return /*#__PURE__*/ _react['default'].createElement(
              _reactNative.View,
              {
                style: {
                  flex: 1,
                },
              },
              /*#__PURE__*/ _react['default'].createElement(
                _Greetings['default'],
                {
                  authState: authState,
                  authData: authData,
                  onStateChange: this.handleAuthStateChange,
                  theme: theme,
                  usernameAttributes: this.authConfig.usernameAttributes,
                }
              ),
              /*#__PURE__*/ _react['default'].createElement(
                Comp,
                _extends({}, this.props, {
                  authState: authState,
                  authData: authData,
                  onStateChange: this.handleAuthStateChange,
                })
              )
            );
          }

          return /*#__PURE__*/ _react['default'].createElement(
            _Authenticator['default'],
            _extends({}, this.props, {
              hideDefault:
                this.authConfig.authenticatorComponents &&
                this.authConfig.authenticatorComponents.length > 0,
              signUpConfig: this.authConfig.signUpConfig,
              onStateChange: this.handleAuthStateChange,
              children: this.authConfig.authenticatorComponents,
              usernameAttributes: this.authConfig.usernameAttributes,
              theme: theme,
            })
          );
        },
      },
    ]);

    return Wrapper;
  })(_react['default'].Component);

  Object.keys(Comp).forEach(function (key) {
    // Copy static properties in order to be as close to Comp as possible.
    // One particular case is navigationOptions
    try {
      var excludes = ['displayName', 'childContextTypes'];

      if (excludes.includes(key)) {
        return;
      }

      Wrapper[key] = Comp[key];
    } catch (err) {
      logger.warn('not able to assign ' + key, err);
    }
  });
  return Wrapper;
}
