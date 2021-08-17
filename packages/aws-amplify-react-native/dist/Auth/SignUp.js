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

var _CountryDialCodes = _interopRequireDefault(require('../CountryDialCodes'));

var _defaultSignUpFields = _interopRequireWildcard(
  require('./common/default-sign-up-fields')
);

var _AmplifyTestIDs = _interopRequireDefault(require('../AmplifyTestIDs'));

var _Utils = require('../Utils');

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

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

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it['return'] != null) it['return']();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
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

var logger = new _awsAmplify.Logger('SignUp');

var SignUp = /*#__PURE__*/ (function (_AuthPiece) {
  _inherits(SignUp, _AuthPiece);

  var _super = _createSuper(SignUp);

  function SignUp(props) {
    var _this;

    _classCallCheck(this, SignUp);

    _this = _super.call(this, props);
    _this._validAuthStates = ['signUp'];
    _this.state = {};
    _this.signUp = _this.signUp.bind(_assertThisInitialized(_this));
    _this.sortFields = _this.sortFields.bind(_assertThisInitialized(_this));
    _this.getDefaultDialCode = _this.getDefaultDialCode.bind(
      _assertThisInitialized(_this)
    );
    _this.checkCustomSignUpFields = _this.checkCustomSignUpFields.bind(
      _assertThisInitialized(_this)
    );
    _this.needPrefix = _this.needPrefix.bind(_assertThisInitialized(_this));
    _this.header =
      _this.props && _this.props.signUpConfig && _this.props.signUpConfig.header
        ? _this.props.signUpConfig.header
        : 'Create a new account';
    var _this$props$usernameA = _this.props.usernameAttributes,
      usernameAttributes =
        _this$props$usernameA === void 0 ? 'username' : _this$props$usernameA;

    if (usernameAttributes === 'email') {
      _this.defaultSignUpFields = _defaultSignUpFields.signUpWithEmailFields;
    } else if (usernameAttributes === 'phone_number') {
      _this.defaultSignUpFields =
        _defaultSignUpFields.signUpWithPhoneNumberFields;
    } else {
      _this.defaultSignUpFields = _defaultSignUpFields['default'];
    }

    return _this;
  }

  _createClass(SignUp, [
    {
      key: 'isValid',
      value: function isValid() {
        var _iterator = _createForOfIteratorHelper(this.signUpFields),
          _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var el = _step.value;
            if (el.required && !this.state[el.key]) return false;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return true;
      },
    },
    {
      key: 'sortFields',
      value: function sortFields() {
        var _this2 = this;

        if (
          this.props.signUpConfig &&
          this.props.signUpConfig.hiddenDefaults &&
          this.props.signUpConfig.hiddenDefaults.length > 0
        ) {
          this.defaultSignUpFields = this.defaultSignUpFields.filter(function (
            d
          ) {
            return !_this2.props.signUpConfig.hiddenDefaults.includes(d.key);
          });
        }

        if (this.checkCustomSignUpFields()) {
          if (
            !this.props.signUpConfig ||
            !this.props.signUpConfig.hideAllDefaults
          ) {
            // see if fields passed to component should override defaults
            this.defaultSignUpFields.forEach(function (f, i) {
              var matchKey = _this2.signUpFields.findIndex(function (d) {
                return d.key === f.key;
              });

              if (matchKey === -1) {
                _this2.signUpFields.push(f);
              }
            });
          }
          /* 
              sort fields based on following rules:
              1. Fields with displayOrder are sorted before those without displayOrder
              2. Fields with conflicting displayOrder are sorted alphabetically by key
              3. Fields without displayOrder are sorted alphabetically by key
            */

          this.signUpFields.sort(function (a, b) {
            if (a.displayOrder && b.displayOrder) {
              if (a.displayOrder < b.displayOrder) {
                return -1;
              } else if (a.displayOrder > b.displayOrder) {
                return 1;
              } else {
                if (a.key < b.key) {
                  return -1;
                } else {
                  return 1;
                }
              }
            } else if (!a.displayOrder && b.displayOrder) {
              return 1;
            } else if (a.displayOrder && !b.displayOrder) {
              return -1;
            } else if (!a.displayOrder && !b.displayOrder) {
              if (a.key < b.key) {
                return -1;
              } else {
                return 1;
              }
            }
          });
        } else {
          this.signUpFields = this.defaultSignUpFields;
        }
      },
    },
    {
      key: 'needPrefix',
      value: function needPrefix(key) {
        var field = this.signUpFields.find(function (e) {
          return e.key === key;
        });

        if (key.indexOf('custom:') !== 0) {
          return field.custom;
        } else if (key.indexOf('custom:') === 0 && field.custom === false) {
          logger.warn(
            'Custom prefix prepended to key but custom field flag is set to false'
          );
        }

        return null;
      },
    },
    {
      key: 'getDefaultDialCode',
      value: function getDefaultDialCode() {
        return this.props.signUpConfig &&
          this.props.signUpConfig.defaultCountryCode &&
          _CountryDialCodes['default'].indexOf(
            '+'.concat(this.props.signUpConfig.defaultCountryCode)
          ) !== -1
          ? '+'.concat(this.props.signUpConfig.defaultCountryCode)
          : '+1';
      },
    },
    {
      key: 'checkCustomSignUpFields',
      value: function checkCustomSignUpFields() {
        return (
          this.props.signUpConfig &&
          this.props.signUpConfig.signUpFields &&
          this.props.signUpConfig.signUpFields.length > 0
        );
      },
    },
    {
      key: 'signUp',
      value: function signUp() {
        var _this3 = this;

        if (
          !_awsAmplify.Auth ||
          typeof _awsAmplify.Auth.signUp !== 'function'
        ) {
          throw new Error(
            'No Auth module found, please ensure @aws-amplify/auth is imported'
          );
        }

        var signup_info = {
          username: this.state.username,
          password: this.state.password,
          attributes: {},
        };
        var inputKeys = Object.keys(this.state);
        var inputVals = Object.values(this.state);
        inputKeys.forEach(function (key, index) {
          if (!['username', 'password', 'checkedValue'].includes(key)) {
            if (
              key !== 'phone_line_number' &&
              key !== 'dial_code' &&
              key !== 'error'
            ) {
              var newKey = ''
                .concat(_this3.needPrefix(key) ? 'custom:' : '')
                .concat(key);
              signup_info.attributes[newKey] = inputVals[index];
            }
          }
        });
        var labelCheck = false;
        this.signUpFields.forEach(function (field) {
          if (field.label === _this3.getUsernameLabel()) {
            logger.debug(
              'Changing the username to the value of '.concat(field.label)
            );
            signup_info.username =
              signup_info.attributes[field.key] || signup_info.username;
            labelCheck = true;
          }
        });

        if (!labelCheck && !signup_info.username) {
          // if the customer customized the username field in the sign up form
          // He needs to either set the key of that field to 'username'
          // Or make the label of the field the same as the 'usernameAttributes'
          throw new Error(
            "Couldn't find the label: ".concat(
              this.getUsernameLabel(),
              ', in sign up fields according to usernameAttributes!'
            )
          );
        }

        logger.debug('Signing up with', signup_info);

        _awsAmplify.Auth.signUp(signup_info)
          .then(function (data) {
            // @ts-ignore
            _this3.changeState('confirmSignUp', data.user.username);
          })
          ['catch'](function (err) {
            return _this3.error(err);
          });
      },
    },
    {
      key: 'showComponent',
      value: function showComponent(theme) {
        var _this4 = this;

        if (this.checkCustomSignUpFields()) {
          this.signUpFields = this.props.signUpConfig.signUpFields;
        }

        this.sortFields();
        return /*#__PURE__*/ _react['default'].createElement(
          _AmplifyUI.Wrapper,
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _reactNative.ScrollView,
            {
              style: theme.sectionScroll,
              keyboardShouldPersistTaps: 'handled',
            },
            /*#__PURE__*/ _react['default'].createElement(
              _AmplifyUI.Header,
              {
                theme: theme,
                testID: _AmplifyTestIDs['default'].AUTH.SIGN_UP_TEXT,
              },
              _awsAmplify.I18n.get(this.header)
            ),
            /*#__PURE__*/ _react['default'].createElement(
              _reactNative.View,
              {
                style: theme.sectionBody,
              },
              this.signUpFields.map(function (field) {
                return field.key !== 'phone_number'
                  ? /*#__PURE__*/ _react['default'].createElement(
                      _AmplifyUI.FormField,
                      _extends(
                        {
                          key: field.key,
                          theme: theme, // @ts-ignore
                          type: field.type,
                          secureTextEntry: field.type === 'password',
                          onChangeText: function onChangeText(text) {
                            var stateObj = _this4.state;
                            stateObj[field.key] = text;

                            _this4.setState(stateObj);
                          },
                          label: _awsAmplify.I18n.get(field.label),
                          placeholder: _awsAmplify.I18n.get(field.placeholder),
                          required: field.required,
                        },
                        (0, _Utils.setTestId)(field.testID)
                      )
                    )
                  : /*#__PURE__*/ _react['default'].createElement(
                      _AmplifyUI.PhoneField,
                      _extends(
                        {
                          theme: theme,
                          key: field.key,
                          onChangeText: function onChangeText(text) {
                            return _this4.setState({
                              phone_number: text,
                            });
                          },
                          label: _awsAmplify.I18n.get(field.label),
                          placeholder: _awsAmplify.I18n.get(field.placeholder),
                          keyboardType: 'phone-pad',
                          required: field.required,
                          defaultDialCode: _this4.getDefaultDialCode(),
                        },
                        (0, _Utils.setTestId)(field.testID)
                      )
                    );
              }),
              /*#__PURE__*/ _react['default'].createElement(
                _AmplifyUI.AmplifyButton,
                _extends(
                  {
                    text: _awsAmplify.I18n.get('Sign Up').toUpperCase(),
                    theme: theme,
                    onPress: this.signUp,
                    disabled: !this.isValid(),
                  },
                  (0, _Utils.setTestId)(
                    _AmplifyTestIDs['default'].AUTH.SIGN_UP_BUTTON
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
                    return _this4.changeState('confirmSignUp');
                  },
                  testID: _AmplifyTestIDs['default'].AUTH.CONFIRM_A_CODE_BUTTON,
                },
                _awsAmplify.I18n.get('Confirm a Code')
              ),
              /*#__PURE__*/ _react['default'].createElement(
                _AmplifyUI.LinkCell,
                {
                  theme: theme,
                  onPress: function onPress() {
                    return _this4.changeState('signIn');
                  },
                  testID: _AmplifyTestIDs['default'].AUTH.SIGN_IN_BUTTON,
                },
                _awsAmplify.I18n.get('Sign In')
              )
            ),
            /*#__PURE__*/ _react['default'].createElement(
              _AmplifyUI.ErrorRow,
              {
                theme: theme,
              },
              this.state.error
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

  return SignUp;
})(_AuthPiece2['default']);

exports['default'] = SignUp;
