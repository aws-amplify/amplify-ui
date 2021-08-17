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

var _AmplifyTheme = _interopRequireDefault(require('../AmplifyTheme'));

var _AmplifyMessageMap = _interopRequireDefault(
  require('../AmplifyMessageMap')
);

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

var logger = new _awsAmplify.Logger('AuthPiece');
var labelMap = {
  email: 'Email',
  phone_number: 'Phone Number',
  username: 'Username',
};

var AuthPiece = /*#__PURE__*/ (function (_React$Component) {
  _inherits(AuthPiece, _React$Component);

  var _super = _createSuper(AuthPiece);

  function AuthPiece(props) {
    var _this;

    _classCallCheck(this, AuthPiece);

    _this = _super.call(this, props);
    _this._isHidden = true;
    _this._validAuthStates = [];
    _this.changeState = _this.changeState.bind(_assertThisInitialized(_this));
    _this.error = _this.error.bind(_assertThisInitialized(_this));
    _this.getUsernameFromInput = _this.getUsernameFromInput.bind(
      _assertThisInitialized(_this)
    );
    _this.renderUsernameField = _this.renderUsernameField.bind(
      _assertThisInitialized(_this)
    );
    return _this;
  }

  _createClass(AuthPiece, [
    {
      key: 'getUsernameFromInput',
      value: function getUsernameFromInput() {
        var _this$props$usernameA = this.props.usernameAttributes,
          usernameAttributes =
            _this$props$usernameA === void 0
              ? 'username'
              : _this$props$usernameA;

        switch (usernameAttributes) {
          case 'email':
            return this.state.email;

          case 'phone_number':
            return this.state.phone_number;

          default:
            return this.state.username;
        }
      },
    },
    {
      key: 'renderUsernameField',
      value: function renderUsernameField(theme) {
        var _this2 = this;

        var value = this.getUsernameFromInput();
        var _this$props$usernameA2 = this.props.usernameAttributes,
          usernameAttributes =
            _this$props$usernameA2 === void 0 ? [] : _this$props$usernameA2;

        if (usernameAttributes === 'email') {
          return /*#__PURE__*/ _react['default'].createElement(
            _AmplifyUI.FormField,
            _extends(
              {
                theme: theme,
                onChangeText: function onChangeText(text) {
                  return _this2.setState({
                    email: text,
                  });
                },
                label: _awsAmplify.I18n.get('Email'),
                placeholder: _awsAmplify.I18n.get('Enter your email'),
                required: true,
              },
              (0, _Utils.setTestId)(
                _AmplifyTestIDs['default'].AUTH.EMAIL_INPUT
              ),
              {
                value: value,
              }
            )
          );
        } else if (usernameAttributes === 'phone_number') {
          return /*#__PURE__*/ _react['default'].createElement(
            _AmplifyUI.PhoneField,
            _extends(
              {
                theme: theme,
                key: 'phone_number',
                onChangeText: function onChangeText(text) {
                  return _this2.setState({
                    phone_number: text,
                  });
                },
                label: _awsAmplify.I18n.get('Phone Number'),
                placeholder: _awsAmplify.I18n.get('Enter your phone number'),
                keyboardType: 'phone-pad',
                required: true,
              },
              (0, _Utils.setTestId)(
                _AmplifyTestIDs['default'].AUTH.PHONE_INPUT
              ),
              {
                value: value,
              }
            )
          );
        } else {
          return /*#__PURE__*/ _react['default'].createElement(
            _AmplifyUI.FormField,
            _extends(
              {
                theme: theme,
                onChangeText: function onChangeText(text) {
                  return _this2.setState({
                    username: text,
                  });
                },
                label: _awsAmplify.I18n.get(this.getUsernameLabel()),
                placeholder: _awsAmplify.I18n.get('Enter your username'),
                required: true,
              },
              (0, _Utils.setTestId)(
                _AmplifyTestIDs['default'].AUTH.USERNAME_INPUT
              ),
              {
                value: value,
              }
            )
          );
        }
      },
    },
    {
      key: 'getUsernameLabel',
      value: function getUsernameLabel() {
        var _this$props$usernameA3 = this.props.usernameAttributes,
          usernameAttributes =
            _this$props$usernameA3 === void 0
              ? 'username'
              : _this$props$usernameA3;
        return labelMap[usernameAttributes] || usernameAttributes;
      },
    },
    {
      key: 'changeState',
      value: function changeState(state, data) {
        if (this.props.onStateChange) {
          this.props.onStateChange(state, data);
        }
      },
    },
    {
      key: 'checkContact',
      value: function checkContact(user) {
        var _this3 = this;

        _awsAmplify.Auth.verifiedContact(user).then(function (data) {
          logger.debug('verified user attributes', data);

          if (!_awsAmplify.JS.isEmpty(data.verified)) {
            _this3.changeState('signedIn', user);
          } else {
            user = Object.assign(user, data);

            _this3.changeState('verifyContact', user);
          }
        });
      },
    },
    {
      key: 'error',
      value: function error(err) {
        logger.debug(err);
        var msg = '';

        if (typeof err === 'string') {
          msg = err;
        } else if (err.message) {
          msg = err.message;
        } else {
          msg = JSON.stringify(err);
        }

        var map =
          this.props.errorMessage ||
          this.props.messageMap ||
          _AmplifyMessageMap['default'];
        msg = typeof map === 'string' ? map : map(msg);
        this.setState({
          error: msg,
        });

        _reactNative.Keyboard.dismiss();
      },
    },
    {
      key: 'render',
      value: function render() {
        if (!this._validAuthStates.includes(this.props.authState)) {
          this._isHidden = true;
          return null;
        }

        if (this._isHidden) {
          var track = this.props.track;
          if (track) track();
        }

        this._isHidden = false;
        return this.showComponent(this.props.theme || _AmplifyTheme['default']);
      },
    },
    {
      key: 'showComponent',
      value: function showComponent(theme) {
        throw "You must implement showComponent(theme) and don't forget to set this._validAuthStates.";
      },
    },
  ]);

  return AuthPiece;
})(_react['default'].Component);

exports['default'] = AuthPiece;
