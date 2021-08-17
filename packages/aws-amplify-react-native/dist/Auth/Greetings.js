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

var _AmplifyTheme = _interopRequireDefault(require('../AmplifyTheme'));

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

var Greetings = /*#__PURE__*/ (function (_AuthPiece) {
  _inherits(Greetings, _AuthPiece);

  var _super = _createSuper(Greetings);

  function Greetings(props) {
    var _this;

    _classCallCheck(this, Greetings);

    _this = _super.call(this, props);
    _this._validAuthStates = ['signedIn'];
    _this.signOut = _this.signOut.bind(_assertThisInitialized(_this));
    _this.getMessage = _this.getMessage.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Greetings, [
    {
      key: 'signOut',
      value: function signOut() {
        var _this2 = this;

        _awsAmplify.Auth.signOut()
          .then(function () {
            return _this2.changeState('signedOut');
          })
          ['catch'](function (err) {
            return _this2.error(err);
          });
      },
    },
    {
      key: 'getMessage',
      value: function getMessage() {
        var authData = this.props.authData;
        var defaultMessage = '';
        var user = authData;

        if (user) {
          var _this$props$usernameA = this.props.usernameAttributes,
            usernameAttributes =
              _this$props$usernameA === void 0 ? [] : _this$props$usernameA;
          var name = '';

          if (usernameAttributes === 'email') {
            // Email as Username
            name = user.attributes ? user.attributes.email : user.username;
            defaultMessage = ''.concat(name);
          } else if (usernameAttributes === 'phone_number') {
            // Phone number as Username
            name = user.attributes
              ? user.attributes.phone_number
              : user.username;
            defaultMessage = ''.concat(name);
          } else {
            name = user.username || 'unknown user';
            defaultMessage = ''
              .concat(_awsAmplify.I18n.get('Hello'), ' ')
              .concat(name);
          }
        }

        return this.props.signedInMessage || defaultMessage;
      },
    },
    {
      key: 'showComponent',
      value: function showComponent() {
        var theme = this.props.theme || _AmplifyTheme['default'];
        return /*#__PURE__*/ _react['default'].createElement(
          _reactNative.View,
          {
            style: theme.navBar,
          },
          /*#__PURE__*/ _react['default'].createElement(
            _reactNative.Text,
            _extends(
              {
                style: theme.greetingMessage,
              },
              (0, _Utils.setTestId)(
                _AmplifyTestIDs['default'].AUTH.GREETING_SIGNED_IN_TEXT
              )
            ),
            this.getMessage()
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _AmplifyUI.AmplifyButton,
            _extends(
              {
                theme: theme,
                text: _awsAmplify.I18n.get('Sign Out'),
                onPress: this.signOut,
                style: theme.navButton,
              },
              (0, _Utils.setTestId)(
                _AmplifyTestIDs['default'].AUTH.SIGN_OUT_BUTTON
              )
            )
          )
        );
      },
    },
  ]);

  return Greetings;
})(_AuthPiece2['default']);

exports['default'] = Greetings;
