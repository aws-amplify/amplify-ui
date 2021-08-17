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

var _reactNative = require('react-native');

var _awsAmplify = require('aws-amplify');

var _AuthPiece2 = _interopRequireDefault(require('./AuthPiece'));

var _AmplifyUI = require('../AmplifyUI');

var _AmplifyTestIDs = _interopRequireDefault(require('../AmplifyTestIDs'));

var _Utils = require('../Utils');

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

var logger = new _awsAmplify.Logger('SignIn');

var SignIn = /*#__PURE__*/ (function (_AuthPiece) {
  _inherits(SignIn, _AuthPiece);

  var _super = _createSuper(SignIn);

  function SignIn(props) {
    var _this;

    _classCallCheck(this, SignIn);

    _this = _super.call(this, props);
    _this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];
    _this.state = {
      username: null,
      password: null,
      error: null,
      hasPendingSignIn: false,
    };
    _this.checkContact = _this.checkContact.bind(_assertThisInitialized(_this));
    _this.signIn = _this.signIn.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SignIn, [
    {
      key: 'signIn',
      value: (function () {
        var _signIn = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
            var _this2 = this;

            var _this$state, password, hasPendingSignIn, username;

            return regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      (_this$state = this.state),
                        (password = _this$state.password),
                        (hasPendingSignIn = _this$state.hasPendingSignIn);

                      if (!hasPendingSignIn) {
                        _context.next = 4;
                        break;
                      }

                      logger.debug('Previous sign in attempt active');
                      return _context.abrupt('return');

                    case 4:
                      this.setState({
                        hasPendingSignIn: true,
                      });
                      username = this.getUsernameFromInput() || '';
                      logger.debug('Sign In for ' + username);
                      _context.next = 9;
                      return _awsAmplify.Auth.signIn(username, password)
                        .then(function (user) {
                          logger.debug(user);

                          if (user.challengeName === 'SMS_MFA') {
                            _this2.changeState('confirmSignIn', user);
                          } else if (
                            user.challengeName === 'NEW_PASSWORD_REQUIRED'
                          ) {
                            logger.debug(
                              'require new password',
                              user.challengeParam
                            );

                            _this2.changeState('requireNewPassword', user);
                          } else {
                            _this2.checkContact(user);
                          }
                        })
                        ['catch'](function (err) {
                          if (err.code === 'PasswordResetRequiredException') {
                            logger.debug('the user requires a new password');

                            _this2.changeState('forgotPassword', username);
                          } else {
                            _this2.error(err);
                          }
                        });

                    case 9:
                      this.setState({
                        hasPendingSignIn: false,
                      });

                    case 10:
                    case 'end':
                      return _context.stop();
                  }
                }
              },
              _callee,
              this
            );
          })
        );

        function signIn() {
          return _signIn.apply(this, arguments);
        }

        return signIn;
      })(),
    },
    {
      key: 'showComponent',
      value: function showComponent(theme) {
        var _this3 = this;

        var _this$state2 = this.state,
          hasPendingSignIn = _this$state2.hasPendingSignIn,
          password = _this$state2.password;
        return /*#__PURE__*/ _react['default'].createElement(
          _AmplifyUI.Wrapper,
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _reactNative.View,
            {
              style: theme.section,
            },
            /*#__PURE__*/ _react['default'].createElement(
              _reactNative.View,
              null,
              /*#__PURE__*/ _react['default'].createElement(
                _AmplifyUI.Header,
                {
                  theme: theme,
                  testID:
                    _AmplifyTestIDs['default'].AUTH
                      .SIGN_IN_TO_YOUR_ACCOUNT_TEXT,
                },
                _awsAmplify.I18n.get('Sign in to your account')
              ),
              /*#__PURE__*/ _react['default'].createElement(
                _reactNative.View,
                {
                  style: theme.sectionBody,
                },
                this.renderUsernameField(theme),
                /*#__PURE__*/ _react['default'].createElement(
                  _AmplifyUI.FormField,
                  _extends(
                    {
                      theme: theme,
                      onChangeText: function onChangeText(text) {
                        return _this3.setState({
                          password: text,
                        });
                      },
                      label: _awsAmplify.I18n.get('Password'),
                      placeholder: _awsAmplify.I18n.get('Enter your password'),
                      secureTextEntry: true,
                      required: true,
                    },
                    (0, _Utils.setTestId)(
                      _AmplifyTestIDs['default'].AUTH.PASSWORD_INPUT
                    )
                  )
                ),
                /*#__PURE__*/ _react['default'].createElement(
                  _AmplifyUI.AmplifyButton,
                  _extends(
                    {
                      text: _awsAmplify.I18n.get('Sign In').toUpperCase(),
                      theme: theme,
                      onPress: this.signIn,
                      disabled:
                        !!(!this.getUsernameFromInput() && password) ||
                        hasPendingSignIn,
                    },
                    (0, _Utils.setTestId)(
                      _AmplifyTestIDs['default'].AUTH.SIGN_IN_BUTTON
                    )
                  )
                )
              ),
              /*#__PURE__*/ _react['default'].createElement(
                _reactNative.View,
                {
                  style: theme.sectionFooter,
                },
                /*#__PURE__*/ _react['default'].createElement(
                  _AmplifyUI.LinkCell,
                  {
                    theme: theme,
                    onPress: function onPress() {
                      return _this3.changeState('forgotPassword');
                    },
                    testID:
                      _AmplifyTestIDs['default'].AUTH.FORGOT_PASSWORD_BUTTON,
                  },
                  _awsAmplify.I18n.get('Forgot Password')
                ),
                /*#__PURE__*/ _react['default'].createElement(
                  _AmplifyUI.LinkCell,
                  {
                    theme: theme,
                    onPress: function onPress() {
                      return _this3.changeState('signUp');
                    },
                    testID: _AmplifyTestIDs['default'].AUTH.SIGN_UP_BUTTON,
                  },
                  _awsAmplify.I18n.get('Sign Up')
                )
              ),
              /*#__PURE__*/ _react['default'].createElement(
                _AmplifyUI.ErrorRow,
                {
                  theme: theme,
                },
                this.state.error
              )
            ),
            /*#__PURE__*/ _react['default'].createElement(
              _AmplifyUI.SignedOutMessage,
              this.props
            )
          )
        );
      },
    },
  ]);

  return SignIn;
})(_AuthPiece2['default']);

exports['default'] = SignIn;
