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

var _react = _interopRequireWildcard(require('react'));

var _reactNative = require('react-native');

var _awsAmplify = require('aws-amplify');

var _AmplifyTheme = _interopRequireDefault(require('../AmplifyTheme'));

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

var logger = new _awsAmplify.Logger('Storage.S3Image');

var S3Image = /*#__PURE__*/ (function (_Component) {
  _inherits(S3Image, _Component);

  var _super = _createSuper(S3Image);

  function S3Image(props) {
    var _this;

    _classCallCheck(this, S3Image);

    _this = _super.call(this, props);
    _this.state = {
      src: null,
    };
    return _this;
  }

  _createClass(S3Image, [
    {
      key: 'getImageSource',
      value: function getImageSource() {
        var _this2 = this;

        var _this$props = this.props,
          imgKey = _this$props.imgKey,
          level = _this$props.level;

        _awsAmplify.Storage.get(imgKey, {
          level: level ? level : 'public',
        })
          .then(function (url) {
            logger.debug(url);

            _this2.setState({
              src: {
                uri: url,
              },
            });
          })
          ['catch'](function (err) {
            return logger.warn(err);
          });
      },
    },
    {
      key: 'load',
      value: function load() {
        var _this$props2 = this.props,
          imgKey = _this$props2.imgKey,
          body = _this$props2.body,
          contentType = _this$props2.contentType,
          level = _this$props2.level;

        if (!imgKey) {
          logger.debug('empty imgKey');
          return;
        }

        var that = this;
        logger.debug('loading ' + imgKey + '...');

        if (body) {
          var type = contentType ? contentType : 'binary/octet-stream';
          var opt = {
            contentType: type,
            level: level ? level : 'public',
          };

          var ret = _awsAmplify.Storage.put(imgKey, body, opt);

          ret
            .then(function (data) {
              logger.debug(data);
              that.getImageSource();
            })
            ['catch'](function (err) {
              return logger.warn(err);
            });
        } else {
          that.getImageSource();
        }
      },
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.load();
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (
          prevProps.imgKey !== this.props.imgKey ||
          prevProps.body !== this.props.body
        ) {
          this.load();
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var src = this.state.src;

        if (!src) {
          return null;
        }

        var _this$props3 = this.props,
          style = _this$props3.style,
          resizeMode = _this$props3.resizeMode;
        var theme = this.props.theme || _AmplifyTheme['default'];
        var photoStyle = Object.assign(
          {},
          _reactNative.StyleSheet.flatten(theme.photo),
          style
        );
        return /*#__PURE__*/ _react['default'].createElement(
          _reactNative.Image,
          {
            source: src,
            resizeMode: resizeMode,
            style: photoStyle,
          }
        );
      },
    },
  ]);

  return S3Image;
})(_react.Component);

exports['default'] = S3Image;
