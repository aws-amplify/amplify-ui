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

var _AmplifyUI = require('../AmplifyUI');

var _AuthPiece2 = _interopRequireDefault(require('./AuthPiece'));

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

var logger = new _awsAmplify.Logger('ForgotPassword');

var ForgotPassword = /*#__PURE__*/ (function (_AuthPiece) {
  _inherits(ForgotPassword, _AuthPiece);

  var _super = _createSuper(ForgotPassword);

  function ForgotPassword(props) {
    var _this;

    _classCallCheck(this, ForgotPassword);

    _this = _super.call(this, props);
    _this._validAuthStates = ['forgotPassword'];
    _this.state = {
      delivery: null,
    };
    _this.send = _this.send.bind(_assertThisInitialized(_this));
    _this.submit = _this.submit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(
    ForgotPassword,
    [
      {
        key: 'send',
        value: function send() {
          var _this2 = this;

          var username = this.getUsernameFromInput();

          if (!username) {
            this.error('Username cannot be empty');
            return;
          }

          _awsAmplify.Auth.forgotPassword(username)
            .then(function (data) {
              logger.debug(data);

              _this2.setState({
                delivery: data.CodeDeliveryDetails,
              });
            })
            ['catch'](function (err) {
              return _this2.error(err);
            });
        },
      },
      {
        key: 'submit',
        value: function submit() {
          var _this3 = this;

          var _this$state = this.state,
            code = _this$state.code,
            password = _this$state.password;
          var username = this.getUsernameFromInput();

          _awsAmplify.Auth.forgotPasswordSubmit(username, code, password)
            .then(function (data) {
              logger.debug(data);

              _this3.changeState('signIn');
            })
            ['catch'](function (err) {
              return _this3.error(err);
            });
        },
      },
      {
        key: 'forgotBody',
        value: function forgotBody(theme) {
          return /*#__PURE__*/ _react['default'].createElement(
            _reactNative.View,
            {
              style: theme.sectionBody,
            },
            this.renderUsernameField(theme),
            /*#__PURE__*/ _react['default'].createElement(
              _AmplifyUI.AmplifyButton,
              _extends(
                {
                  text: _awsAmplify.I18n.get('Send').toUpperCase(),
                  theme: theme,
                  onPress: this.send,
                  disabled: !this.getUsernameFromInput(),
                },
                (0, _Utils.setTestId)(
                  _AmplifyTestIDs['default'].AUTH.SEND_BUTTON
                )
              )
            )
          );
        },
      },
      {
        key: 'submitBody',
        value: function submitBody(theme) {
          var _this4 = this;

          return /*#__PURE__*/ _react['default'].createElement(
            _reactNative.View,
            {
              style: theme.sectionBody,
            },
            /*#__PURE__*/ _react['default'].createElement(
              _AmplifyUI.FormField,
              _extends(
                {
                  theme: theme,
                  onChangeText: function onChangeText(text) {
                    return _this4.setState({
                      code: text,
                    });
                  },
                  label: _awsAmplify.I18n.get('Confirmation Code'),
                  placeholder: _awsAmplify.I18n.get(
                    'Enter your confirmation code'
                  ),
                  required: true,
                },
                (0, _Utils.setTestId)(
                  _AmplifyTestIDs['default'].AUTH.CONFIRMATION_CODE_INPUT
                )
              )
            ),
            /*#__PURE__*/ _react['default'].createElement(
              _AmplifyUI.FormField,
              _extends(
                {
                  theme: theme,
                  onChangeText: function onChangeText(text) {
                    return _this4.setState({
                      password: text,
                    });
                  },
                  label: _awsAmplify.I18n.get('Password'),
                  placeholder: _awsAmplify.I18n.get('Enter your new password'),
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
                  text: _awsAmplify.I18n.get('Submit'),
                  theme: theme,
                  onPress: this.submit,
                  disabled: !(this.state.code && this.state.password),
                },
                (0, _Utils.setTestId)(
                  _AmplifyTestIDs['default'].AUTH.SUBMIT_BUTTON
                )
              )
            )
          );
        },
      },
      {
        key: 'showComponent',
        value: function showComponent(theme) {
          var _this5 = this;

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
                      _AmplifyTestIDs['default'].AUTH.FORGOT_PASSWORD_TEXT,
                  },
                  _awsAmplify.I18n.get('Reset your password')
                ),
                /*#__PURE__*/ _react['default'].createElement(
                  _reactNative.View,
                  {
                    style: theme.sectionBody,
                  },
                  !this.state.delivery && this.forgotBody(theme),
                  this.state.delivery && this.submitBody(theme)
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
                        return _this5.changeState('signIn');
                      },
                      testID:
                        _AmplifyTestIDs['default'].AUTH.BACK_TO_SIGN_IN_BUTTON,
                    },
                    _awsAmplify.I18n.get('Back to Sign In')
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
    ],
    [
      {
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(props, state) {
          var username = props.authData;

          if (username && !state.username) {
            return {
              username: username,
            };
          }

          return null;
        },
      },
    ]
  );

  return ForgotPassword;
})(_AuthPiece2['default']);

exports['default'] = ForgotPassword;
