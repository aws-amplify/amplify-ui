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
exports['default'] = withOAuth;

var React = _interopRequireWildcard(require('react'));

var _reactNative = require('react-native');

var _core = require('@aws-amplify/core');

var _auth = _interopRequireWildcard(require('@aws-amplify/auth'));

var _excluded = ['oauth_config'];

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

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
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

var logger = new _core.Logger('withOAuth');

function withOAuth(Comp) {
  var listeners = [];
  return /*#__PURE__*/ (function (_React$Component) {
    _inherits(WithOAuth, _React$Component);

    var _super = _createSuper(WithOAuth);

    function WithOAuth(props) {
      var _this;

      _classCallCheck(this, WithOAuth);

      _this = _super.call(this, props);
      _this._isMounted = false;

      var config = _this._getOAuthConfig();

      var _config$urlOpener = config.urlOpener,
        urlOpener =
          _config$urlOpener === void 0 ? defaultUrlOpener : _config$urlOpener;
      _this.urlOpener = urlOpener;
      _this.hostedUISignIn = _this.hostedUISignIn.bind(
        _assertThisInitialized(_this)
      );
      _this.signOut = _this.signOut.bind(_assertThisInitialized(_this));
      _this.urlOpener = _this.urlOpener.bind(_assertThisInitialized(_this));
      _this.state = {
        user: null,
        error: null,
        loading: false,
      };
      listeners.forEach(function (listener) {
        return _core.Hub.remove('auth', listener);
      });
      listeners = [_assertThisInitialized(_this)];
      _this.onHubCapsule = _this.onHubCapsule.bind(
        _assertThisInitialized(_this)
      );

      _core.Hub.listen('auth', _this.onHubCapsule);

      return _this;
    }

    _createClass(WithOAuth, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          this._isMounted = true;
          this.setState(
            {
              loading: true,
            },
            function () {
              _auth['default']
                .currentAuthenticatedUser()
                .then(function (user) {
                  _this2.setState({
                    user: user,
                    loading: false,
                  });
                })
                ['catch'](function (error) {
                  logger.debug(error);

                  _this2.setState({
                    user: null,
                    loading: false,
                  });
                });
            }
          );
        },
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this._isMounted = false;
          return;
        },
      },
      {
        key: 'onHubCapsule',
        value: function onHubCapsule(capsule) {
          var _this3 = this;

          // The Auth module will emit events when user signs in, signs out, etc
          if (!this._isMounted) return;
          var channel = capsule.channel,
            payload = capsule.payload;

          if (channel === 'auth') {
            switch (payload.event) {
              case 'signIn':
              case 'cognitoHostedUI': {
                _auth['default']
                  .currentAuthenticatedUser()
                  .then(function (user) {
                    logger.debug('signed in');

                    _this3.setState({
                      user: user,
                      error: null,
                      loading: false,
                    });
                  });

                break;
              }

              case 'signOut': {
                logger.debug('signed out');
                this.setState({
                  user: null,
                  error: null,
                  loading: false,
                });
                break;
              }

              case 'signIn_failure':
              case 'cognitoHostedUI_failure': {
                logger.debug('not signed in');
                this.setState({
                  user: null,
                  error: decodeURIComponent(payload.data),
                  loading: false,
                });
                break;
              }

              default:
                break;
            }
          }
        },
      },
      {
        key: '_getOAuthConfig',
        value: function _getOAuthConfig() {
          if (
            !_auth['default'] ||
            typeof _auth['default'].configure !== 'function'
          ) {
            throw new Error(
              'No Auth module found, please ensure @aws-amplify/auth is imported'
            );
          } // @ts-ignore

          var _Auth$configure = _auth['default'].configure(),
            _Auth$configure$oauth = _Auth$configure.oauth,
            oauth =
              _Auth$configure$oauth === void 0
                ? undefined
                : _Auth$configure$oauth; // to keep backward compatibility

          var cognitoHostedUIConfig = // @ts-ignore
            oauth && (oauth.domain ? oauth : oauth.awsCognito);
          var config = this.props.oauth_config || cognitoHostedUIConfig;
          return config;
        },
      },
      {
        key: 'hostedUISignIn',
        value: function hostedUISignIn(provider) {
          this.setState(
            {
              loading: true,
            },
            function () {
              return _auth['default'].federatedSignIn({
                provider: provider,
              });
            }
          );
        },
      },
      {
        key: 'signOut',
        value: function signOut() {
          return _auth['default'].signOut()['catch'](function (error) {
            return logger.warn(error);
          });
        },
      },
      {
        key: 'render',
        value: function render() {
          var _this4 = this;

          var _this$state = this.state,
            oAuthUser = _this$state.user,
            oAuthError = _this$state.error,
            loading = _this$state.loading;

          var _this$props = this.props,
            _ = _this$props.oauth_config,
            otherProps = _objectWithoutProperties(_this$props, _excluded);

          var oAuthProps = {
            loading: loading,
            oAuthUser: oAuthUser,
            oAuthError: oAuthError,
            hostedUISignIn: this.hostedUISignIn.bind(
              this,
              _auth.CognitoHostedUIIdentityProvider.Cognito
            ),
            facebookSignIn: this.hostedUISignIn.bind(
              this,
              _auth.CognitoHostedUIIdentityProvider.Facebook
            ),
            amazonSignIn: this.hostedUISignIn.bind(
              this,
              _auth.CognitoHostedUIIdentityProvider.Amazon
            ),
            googleSignIn: this.hostedUISignIn.bind(
              this,
              _auth.CognitoHostedUIIdentityProvider.Google
            ),
            customProviderSignIn: function customProviderSignIn(provider) {
              return _this4.hostedUISignIn(provider);
            },
            signOut: this.signOut,
          };
          return /*#__PURE__*/ React.createElement(
            Comp,
            _extends({}, oAuthProps, otherProps)
          );
        },
      },
    ]);

    return WithOAuth;
  })(React.Component);
}

var defaultUrlOpener = function defaultUrlOpener(url, redirectUrl) {
  logger.debug(
    'opening url: '.concat(url, ', redirectUrl: ').concat(redirectUrl)
  );
  return _reactNative.Linking.openURL(url);
};
