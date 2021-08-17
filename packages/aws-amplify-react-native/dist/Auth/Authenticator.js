'use strict';

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

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _awsAmplify = require('aws-amplify');

var _AmplifyTheme = _interopRequireDefault(require('../AmplifyTheme'));

var _AmplifyMessageMap = _interopRequireDefault(
  require('../AmplifyMessageMap')
);

var _AmplifyUI = require('../AmplifyUI');

var _Loading = _interopRequireDefault(require('./Loading'));

var _SignIn = _interopRequireDefault(require('./SignIn'));

var _ConfirmSignIn = _interopRequireDefault(require('./ConfirmSignIn'));

var _VerifyContact = _interopRequireDefault(require('./VerifyContact'));

var _SignUp = _interopRequireDefault(require('./SignUp'));

var _ConfirmSignUp = _interopRequireDefault(require('./ConfirmSignUp'));

var _ForgotPassword = _interopRequireDefault(require('./ForgotPassword'));

var _RequireNewPassword = _interopRequireDefault(
  require('./RequireNewPassword')
);

var _Greetings = _interopRequireDefault(require('./Greetings'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
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

var logger = new _awsAmplify.Logger('Authenticator');

var EmptyContainer = function EmptyContainer(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/ _react['default'].createElement(
    _react['default'].Fragment,
    null,
    children
  );
};

var AuthDecorator = /*#__PURE__*/ (function () {
  function AuthDecorator(onStateChange) {
    _classCallCheck(this, AuthDecorator);

    this.onStateChange = onStateChange;
  }

  _createClass(AuthDecorator, [
    {
      key: 'signIn',
      value: function signIn(username, password) {
        var that = this;
        return _awsAmplify.Auth.signIn(username, password).then(function (
          data
        ) {
          that.onStateChange('signedIn');
          return data;
        });
      },
    },
    {
      key: 'signOut',
      value: function signOut() {
        var that = this;
        return _awsAmplify.Auth.signOut().then(function () {
          that.onStateChange('signedOut');
        });
      },
    },
  ]);

  return AuthDecorator;
})();

var Authenticator = /*#__PURE__*/ (function (_React$Component) {
  _inherits(Authenticator, _React$Component);

  var _super = _createSuper(Authenticator);

  function Authenticator(props) {
    var _this;

    _classCallCheck(this, Authenticator);

    _this = _super.call(this, props);
    _this._initialAuthState = _this.props.authState || 'signIn';
    _this.state = {
      authState: props.authState || 'loading',
      authData: props.authData,
    };
    _this.handleStateChange = _this.handleStateChange.bind(
      _assertThisInitialized(_this)
    );
    _this.checkUser = _this.checkUser.bind(_assertThisInitialized(_this));
    _this.onHubCapsule = _this.onHubCapsule.bind(_assertThisInitialized(_this));
    _this.checkContact = _this.checkContact.bind(_assertThisInitialized(_this));

    _awsAmplify.Hub.listen('auth', _this.onHubCapsule);

    return _this;
  }

  _createClass(Authenticator, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._isMounted = true;
        this.checkUser();
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._isMounted = false;
      },
    },
    {
      key: 'onHubCapsule',
      value: function onHubCapsule(capsule) {
        var _capsule$payload = capsule.payload,
          event = _capsule$payload.event,
          data = _capsule$payload.data;

        switch (event) {
          case 'cognitoHostedUI':
          case 'signIn':
            this.checkContact(data);
            break;

          case 'cognitoHostedUI_failure':
          case 'parsingUrl_failure':
          case 'signOut':
          case 'customGreetingSignOut':
            return this.handleStateChange('signIn', null);
        }
      },
    },
    {
      key: 'handleStateChange',
      value: function handleStateChange(state, data) {
        if (state === undefined)
          return logger.info('Auth state cannot be undefined');
        logger.info(
          'Inside handleStateChange method current authState:',
          this.state.authState
        );
        var nextAuthState =
          state === 'signedOut' ? this._initialAuthState : state;
        var nextAuthData = data !== undefined ? data : this.state.authData;

        if (this._isMounted) {
          this.setState({
            authState: nextAuthState,
            authData: nextAuthData,
            error: null,
          });
          logger.log('Auth Data was set:', nextAuthData);
          logger.info('authState has been updated to '.concat(nextAuthState));
        }

        if (this.props.onStateChange) {
          this.props.onStateChange(state, data);
        } // @ts-ignore

        if (
          _awsAmplify.Analytics._config &&
          Object.entries(_awsAmplify.Analytics._config).length > 0
        ) {
          switch (state) {
            case 'signedIn':
              _awsAmplify.Analytics.record('_userauth.sign_in');

              break;

            case 'signedUp':
              _awsAmplify.Analytics.record('_userauth.sign_up');

              break;
          }
        }
      },
    },
    {
      key: 'checkContact',
      value: (function () {
        var _checkContact = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee(user) {
            var data;
            return regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return _awsAmplify.Auth.verifiedContact(user);

                    case 3:
                      data = _context.sent;
                      logger.debug('verified user attributes', data);

                      if (!_awsAmplify.JS.isEmpty(data.verified)) {
                        this.handleStateChange('signedIn', user);
                      } else {
                        user = Object.assign(user, data);
                        this.handleStateChange('verifyContact', user);
                      }

                      _context.next = 12;
                      break;

                    case 8:
                      _context.prev = 8;
                      _context.t0 = _context['catch'](0);
                      logger.warn('Failed to verify contact', _context.t0);
                      this.handleStateChange('signedIn', user);

                    case 12:
                    case 'end':
                      return _context.stop();
                  }
                }
              },
              _callee,
              this,
              [[0, 8]]
            );
          })
        );

        function checkContact(_x) {
          return _checkContact.apply(this, arguments);
        }

        return checkContact;
      })(),
    },
    {
      key: 'checkUser',
      value: function checkUser() {
        var _this2 = this;

        var authState = this.state.authState;
        var statesJumpToSignIn = ['signedIn', 'signedOut', 'loading'];

        _awsAmplify.Auth.currentAuthenticatedUser()
          .then(function (user) {
            if (!_this2._isMounted) return;

            if (user) {
              _this2.checkContact(user);
            } else {
              if (statesJumpToSignIn.includes(authState)) {
                _this2.handleStateChange(_this2._initialAuthState, null);
              }
            }
          })
          ['catch'](function (err) {
            if (!_this2._isMounted) return;
            logger.debug(err);

            if (statesJumpToSignIn.includes(authState)) {
              _awsAmplify.Auth.signOut()
                .then(function () {
                  _this2.handleStateChange(_this2._initialAuthState, null);
                })
                ['catch'](function (err) {
                  return logger.warn('Failed to sign out', err);
                });
            }
          });
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var _this$state = this.state,
          authState = _this$state.authState,
          authData = _this$state.authData;
        var theme = this.props.theme || _AmplifyTheme['default'];
        var messageMap =
          this.props.errorMessage || _AmplifyMessageMap['default']; // If container prop is undefined, default to AWS Amplify UI Container (SafeAreaView)
        // otherwise if truthy, use the supplied render prop
        // otherwise if falsey, use EmptyContainer

        var ContainerWrapper =
          this.props.container === undefined
            ? _AmplifyUI.Container
            : this.props.container || EmptyContainer;
        var _this$props = this.props,
          hideDefault = _this$props.hideDefault,
          signUpConfig = _this$props.signUpConfig,
          usernameAttributes = _this$props.usernameAttributes;
        var props_children = this.props.children || [];
        var default_children = [
          /*#__PURE__*/ _react['default'].createElement(
            _Loading['default'],
            null
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _SignIn['default'],
            null
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _ConfirmSignIn['default'],
            null
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _VerifyContact['default'],
            null
          ),
          /*#__PURE__*/ _react['default'].createElement(_SignUp['default'], {
            signUpConfig: signUpConfig,
          }),
          /*#__PURE__*/ _react['default'].createElement(
            _ConfirmSignUp['default'],
            null
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _ForgotPassword['default'],
            null
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _RequireNewPassword['default'],
            null
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _Greetings['default'],
            null
          ),
        ];
        var children = (hideDefault ? [] : default_children)
          .concat(props_children)
          .map(function (child, index) {
            return /*#__PURE__*/ _react['default'].cloneElement(child, {
              key: 'auth_piece_' + index,
              theme: theme,
              messageMap: messageMap,
              authState: authState,
              authData: authData,
              onStateChange: _this3.handleStateChange,
              Auth: new AuthDecorator(_this3.handleStateChange),
              usernameAttributes: usernameAttributes,
            });
          });
        return /*#__PURE__*/ _react['default'].createElement(
          ContainerWrapper,
          {
            theme: theme,
          },
          children
        );
      },
    },
  ]);

  return Authenticator;
})(_react['default'].Component);

exports['default'] = Authenticator;
