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
exports.SignedOutMessage =
  exports.Wrapper =
  exports.AmplifyButton =
  exports.ErrorRow =
  exports.Header =
  exports.LinkCell =
  exports.PhoneField =
  exports.FormField =
  exports.Container =
    void 0;

var _react = _interopRequireWildcard(require('react'));

var _reactNative = require('react-native');

var _awsAmplify = require('aws-amplify');

var _AmplifyTheme = _interopRequireWildcard(require('./AmplifyTheme'));

var _CountryDialCodes = _interopRequireDefault(require('./CountryDialCodes'));

var _AmplifyTestIDs = _interopRequireDefault(require('./AmplifyTestIDs'));

var _icons = _interopRequireDefault(require('./icons'));

var _Utils = require('./Utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

var Container = function Container(props) {
  var theme = props.theme || _AmplifyTheme['default'];
  return /*#__PURE__*/ _react['default'].createElement(
    _reactNative.SafeAreaView,
    {
      style: theme.container,
    },
    props.children
  );
};

exports.Container = Container;

var FormField = function FormField(props) {
  var theme = props.theme || _AmplifyTheme['default'];
  return /*#__PURE__*/ _react['default'].createElement(
    _reactNative.View,
    {
      style: theme.formField,
    },
    /*#__PURE__*/ _react['default'].createElement(
      _reactNative.Text,
      {
        style: theme.inputLabel,
      },
      props.label,
      ' ',
      props.required ? '*' : ''
    ),
    /*#__PURE__*/ _react['default'].createElement(
      _reactNative.TextInput,
      _extends(
        {
          style: theme.input,
          autoCapitalize: 'none',
          autoCorrect: false,
          placeholderTextColor: _AmplifyTheme.placeholderColor,
        },
        props
      )
    )
  );
};

exports.FormField = FormField;

var PhoneField = /*#__PURE__*/ (function (_Component) {
  _inherits(PhoneField, _Component);

  var _super = _createSuper(PhoneField);

  function PhoneField(props) {
    var _this;

    _classCallCheck(this, PhoneField);

    _this = _super.call(this, props);
    _this.state = {
      dialCode: _this.props.defaultDialCode || '+1',
      phone: '',
    };
    return _this;
  }

  _createClass(PhoneField, [
    {
      key: 'onChangeText',
      value: function onChangeText() {
        var _this$state = this.state,
          dialCode = _this$state.dialCode,
          phone = _this$state.phone;
        var cleanedPhone = phone.replace(/[^0-9.]/g, '') || '';
        var phoneNumber =
          cleanedPhone === '' ? '' : ''.concat(dialCode).concat(cleanedPhone);
        this.props.onChangeText(phoneNumber);
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
          label = _this$props.label,
          required = _this$props.required,
          value = _this$props.value;
        var dialCode = this.state.dialCode;
        var theme = this.props.theme || _AmplifyTheme['default'];
        var phoneValue = value ? value.replace(dialCode, '') : undefined;
        return /*#__PURE__*/ _react['default'].createElement(
          _reactNative.View,
          {
            style: theme.formField,
          },
          /*#__PURE__*/ _react['default'].createElement(
            _reactNative.Text,
            {
              style: theme.inputLabel,
            },
            label,
            ' ',
            required ? '*' : ''
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _reactNative.View,
            {
              style: theme.phoneContainer,
            },
            /*#__PURE__*/ _react['default'].createElement(
              _reactNative.Picker,
              {
                style: theme.picker,
                selectedValue: this.state.dialCode,
                itemStyle: theme.pickerItem,
                onValueChange: function onValueChange(dialCode) {
                  _this2.setState(
                    {
                      dialCode: dialCode,
                    },
                    function () {
                      _this2.onChangeText();
                    }
                  );
                },
              },
              _CountryDialCodes['default'].map(function (dialCode) {
                return /*#__PURE__*/ _react['default'].createElement(
                  _reactNative.Picker.Item,
                  {
                    key: dialCode,
                    value: dialCode,
                    label: dialCode,
                  }
                );
              })
            ),
            /*#__PURE__*/ _react['default'].createElement(
              _reactNative.TextInput,
              _extends(
                {
                  style: theme.phoneInput,
                  autoCapitalize: 'none',
                  autoCorrect: false,
                  placeholderTextColor: _AmplifyTheme.placeholderColor,
                },
                this.props,
                {
                  value: phoneValue,
                  onChangeText: function onChangeText(phone) {
                    _this2.setState(
                      {
                        phone: phone,
                      },
                      function () {
                        _this2.onChangeText();
                      }
                    );
                  },
                }
              )
            )
          )
        );
      },
    },
  ]);

  return PhoneField;
})(_react.Component);

exports.PhoneField = PhoneField;

var LinkCell = function LinkCell(props) {
  var disabled = props.disabled;
  var theme = props.theme || _AmplifyTheme['default'];
  return /*#__PURE__*/ _react['default'].createElement(
    _reactNative.View,
    {
      style: theme.cell,
    },
    /*#__PURE__*/ _react['default'].createElement(
      _reactNative.TouchableHighlight,
      _extends(
        {
          onPress: props.onPress,
          underlayColor: _AmplifyTheme.linkUnderlayColor,
        },
        (0, _Utils.setTestId)(props.testID),
        {
          disabled: disabled,
        }
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _reactNative.Text,
        {
          style: disabled
            ? theme.sectionFooterLinkDisabled
            : theme.sectionFooterLink,
        },
        props.children
      )
    )
  );
};

exports.LinkCell = LinkCell;

var Header = function Header(props) {
  var theme = props.theme || _AmplifyTheme['default'];
  return /*#__PURE__*/ _react['default'].createElement(
    _reactNative.View,
    {
      style: theme.sectionHeader,
    },
    /*#__PURE__*/ _react['default'].createElement(
      _reactNative.Text,
      _extends(
        {
          style: theme.sectionHeaderText,
        },
        (0, _Utils.setTestId)(props.testID)
      ),
      props.children
    )
  );
};

exports.Header = Header;

var ErrorRow = function ErrorRow(props) {
  var theme = props.theme || _AmplifyTheme['default'];
  if (!props.children) return null;
  return /*#__PURE__*/ _react['default'].createElement(
    _reactNative.View,
    {
      style: theme.errorRow,
    },
    /*#__PURE__*/ _react['default'].createElement(_reactNative.Image, {
      source: _icons['default'].warning,
      style: theme.errorRowIcon,
    }),
    /*#__PURE__*/ _react['default'].createElement(
      _reactNative.Text,
      _extends(
        {
          style: theme.errorRowText,
        },
        (0, _Utils.setTestId)(_AmplifyTestIDs['default'].AUTH.ERROR_ROW_TEXT)
      ),
      props.children
    )
  );
};

exports.ErrorRow = ErrorRow;

var AmplifyButton = function AmplifyButton(props) {
  var theme = props.theme || _AmplifyTheme['default'];
  var style = theme.button;

  if (props.disabled) {
    style = theme.buttonDisabled;
  }

  if (props.style) {
    style = [style, props.style];
  }

  return /*#__PURE__*/ _react['default'].createElement(
    _reactNative.TouchableOpacity,
    _extends({}, props, {
      style: style,
    }),
    /*#__PURE__*/ _react['default'].createElement(
      _reactNative.Text,
      {
        style: theme.buttonText,
      },
      props.text
    )
  );
};

exports.AmplifyButton = AmplifyButton;

var Wrapper = function Wrapper(props) {
  var isWeb = _reactNative.Platform.OS === 'web';
  var WrapperComponent = isWeb
    ? _reactNative.View
    : _reactNative.TouchableWithoutFeedback;
  var wrapperProps = {
    style: _AmplifyTheme['default'].section,
    accessible: false,
  };

  if (!isWeb) {
    wrapperProps.onPress = _reactNative.Keyboard.dismiss;
  }

  return /*#__PURE__*/ _react['default'].createElement(
    WrapperComponent,
    wrapperProps,
    props.children
  );
};

exports.Wrapper = Wrapper;

var SignedOutMessage = function SignedOutMessage(props) {
  var theme = props.theme || _AmplifyTheme['default'];

  var message =
    props.signedOutMessage || _awsAmplify.I18n.get('Please Sign In / Sign Up');

  return /*#__PURE__*/ _react['default'].createElement(
    _reactNative.Text,
    _extends(
      {
        style: theme.signedOutMessage,
      },
      (0, _Utils.setTestId)(
        _AmplifyTestIDs['default'].AUTH.GREETING_SIGNED_OUT_TEXT
      )
    ),
    message
  );
};

exports.SignedOutMessage = SignedOutMessage;
