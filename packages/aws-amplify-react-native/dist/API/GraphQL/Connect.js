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

require('regenerator-runtime/runtime');

var _react = require('react');

var _parser = require('graphql/language/parser');

var _awsAmplify = require('aws-amplify');

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

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
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

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
        arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var getOperationType = function getOperationType(operation) {
  var doc = (0, _parser.parse)(operation);

  var _doc$definitions = _slicedToArray(doc.definitions, 1),
    operationType = _doc$definitions[0].operation;

  return operationType;
};

var Connect = /*#__PURE__*/ (function (_Component) {
  _inherits(Connect, _Component);

  var _super = _createSuper(Connect);

  function Connect(props) {
    var _this;

    _classCallCheck(this, Connect);

    _this = _super.call(this, props);
    _this.state = _this.getInitialState();
    _this.subSubscription = null;
    return _this;
  }

  _createClass(Connect, [
    {
      key: 'getInitialState',
      value: function getInitialState() {
        var query = this.props.query;
        return {
          loading: query && !!query.query,
          data: {},
          errors: [],
          mutation: function mutation() {
            return console.warn('Not implemented');
          },
        };
      },
    },
    {
      key: 'getDefaultState',
      value: function getDefaultState() {
        return {
          loading: false,
          data: {},
          errors: [],
          mutation: function mutation() {
            return console.warn('Not implemented');
          },
        };
      },
    },
    {
      key: '_fetchData',
      value: (function () {
        var _fetchData2 = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
            var _this2 = this;

            var _this$props,
              _this$props$query,
              query,
              _this$props$query$var,
              variables,
              _this$props$mutation,
              mutation,
              _this$props$mutation$,
              mutationVariables,
              subscription,
              _this$props$onSubscri,
              onSubscriptionMsg,
              _this$getDefaultState,
              data,
              mutationProp,
              errors,
              hasValidQuery,
              hasValidMutation,
              hasValidSubscription,
              response,
              subsQuery,
              subsVars,
              observable;

            return regeneratorRuntime.wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      this._unsubscribe();

                      this.setState({
                        loading: true,
                      });
                      (_this$props = this.props),
                        (_this$props$query = _this$props.query);
                      _this$props$query =
                        _this$props$query === void 0 ? {} : _this$props$query;
                      (query = _this$props$query.query),
                        (_this$props$query$var = _this$props$query.variables),
                        (variables =
                          _this$props$query$var === void 0
                            ? {}
                            : _this$props$query$var),
                        (_this$props$mutation = _this$props.mutation);
                      _this$props$mutation =
                        _this$props$mutation === void 0
                          ? {}
                          : _this$props$mutation;
                      (mutation = _this$props$mutation.query),
                        (_this$props$mutation$ =
                          _this$props$mutation.mutationVariables),
                        (mutationVariables =
                          _this$props$mutation$ === void 0
                            ? {}
                            : _this$props$mutation$),
                        (subscription = _this$props.subscription),
                        (_this$props$onSubscri = _this$props.onSubscriptionMsg),
                        (onSubscriptionMsg =
                          _this$props$onSubscri === void 0
                            ? function (prevData) {
                                return prevData;
                              }
                            : _this$props$onSubscri);
                      (_this$getDefaultState = this.getDefaultState()),
                        (data = _this$getDefaultState.data),
                        (mutationProp = _this$getDefaultState.mutation),
                        (errors = _this$getDefaultState.errors);
                      hasValidQuery =
                        query && getOperationType(query) === 'query';
                      hasValidMutation =
                        mutation && getOperationType(mutation) === 'mutation';
                      hasValidSubscription =
                        subscription &&
                        getOperationType(subscription.query) === 'subscription';

                      if (
                        !hasValidQuery &&
                        !hasValidMutation &&
                        !hasValidSubscription
                      ) {
                        console.warn(
                          'No query, mutation or subscription was specified'
                        );
                      }

                      if (!hasValidQuery) {
                        _context2.next = 25;
                        break;
                      }

                      _context2.prev = 13;
                      data = null;
                      _context2.next = 17;
                      return _awsAmplify.API.graphql({
                        query: query,
                        variables: variables,
                      });

                    case 17:
                      response = _context2.sent;
                      // @ts-ignore
                      data = response.data;
                      _context2.next = 25;
                      break;

                    case 21:
                      _context2.prev = 21;
                      _context2.t0 = _context2['catch'](13);
                      data = _context2.t0.data;
                      errors = _context2.t0.errors;

                    case 25:
                      if (hasValidMutation) {
                        mutationProp = /*#__PURE__*/ (function () {
                          var _ref = _asyncToGenerator(
                            /*#__PURE__*/ regeneratorRuntime.mark(
                              function _callee(variables) {
                                var result;
                                return regeneratorRuntime.wrap(
                                  function _callee$(_context) {
                                    while (1) {
                                      switch ((_context.prev = _context.next)) {
                                        case 0:
                                          _context.next = 2;
                                          return _awsAmplify.API.graphql({
                                            query: mutation,
                                            variables: variables,
                                          });

                                        case 2:
                                          result = _context.sent;

                                          _this2.forceUpdate();

                                          return _context.abrupt(
                                            'return',
                                            result
                                          );

                                        case 5:
                                        case 'end':
                                          return _context.stop();
                                      }
                                    }
                                  },
                                  _callee
                                );
                              }
                            )
                          );

                          return function mutationProp(_x) {
                            return _ref.apply(this, arguments);
                          };
                        })();
                      }

                      if (hasValidSubscription) {
                        (subsQuery = subscription.query),
                          (subsVars = subscription.variables);

                        try {
                          observable = _awsAmplify.API.graphql({
                            query: subsQuery,
                            variables: subsVars,
                          }); // @ts-ignore

                          this.subSubscription = observable.subscribe({
                            next: function next(_ref2) {
                              var data = _ref2.value.data;
                              var prevData = _this2.state.data;
                              var newData = onSubscriptionMsg(prevData, data);

                              _this2.setState({
                                data: newData,
                              });
                            },
                            error: function error(err) {
                              return console.error(err);
                            },
                          });
                        } catch (err) {
                          errors = err.errors;
                        }
                      }

                      this.setState({
                        data: data,
                        errors: errors,
                        mutation: mutationProp,
                        loading: false,
                      });

                    case 28:
                    case 'end':
                      return _context2.stop();
                  }
                }
              },
              _callee2,
              this,
              [[13, 21]]
            );
          })
        );

        function _fetchData() {
          return _fetchData2.apply(this, arguments);
        }

        return _fetchData;
      })(),
    },
    {
      key: '_unsubscribe',
      value: function _unsubscribe() {
        if (this.subSubscription) {
          this.subSubscription.unsubscribe();
        }
      },
    },
    {
      key: 'componentDidMount',
      value: (function () {
        var _componentDidMount = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      this._fetchData();

                    case 1:
                    case 'end':
                      return _context3.stop();
                  }
                }
              },
              _callee3,
              this
            );
          })
        );

        function componentDidMount() {
          return _componentDidMount.apply(this, arguments);
        }

        return componentDidMount;
      })(),
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._unsubscribe();
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var loading = this.state.loading;
        var _this$props2 = this.props,
          newQueryObj = _this$props2.query,
          newMutationObj = _this$props2.mutation;
        var prevQueryObj = prevProps.query,
          prevMutationObj = prevProps.mutation; // query

        var _ref3 = newQueryObj || {},
          newQuery = _ref3.query,
          newQueryVariables = _ref3.variables;

        var _ref4 = prevQueryObj || {},
          prevQuery = _ref4.query,
          prevQueryVariables = _ref4.variables;

        var queryChanged =
          prevQuery !== newQuery ||
          JSON.stringify(prevQueryVariables) !==
            JSON.stringify(newQueryVariables); // mutation

        var _ref5 = newMutationObj || {},
          newMutation = _ref5.query,
          newMutationVariables = _ref5.variables;

        var _ref6 = prevMutationObj || {},
          prevMutation = _ref6.query,
          prevMutationVariables = _ref6.variables;

        var mutationChanged =
          prevMutation !== newMutation ||
          JSON.stringify(prevMutationVariables) !==
            JSON.stringify(newMutationVariables);

        if (!loading && (queryChanged || mutationChanged)) {
          this._fetchData();
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this$state = this.state,
          data = _this$state.data,
          loading = _this$state.loading,
          mutation = _this$state.mutation,
          errors = _this$state.errors;
        return (
          // @ts-ignore
          this.props.children({
            data: data,
            errors: errors,
            loading: loading,
            mutation: mutation,
          }) || null
        );
      },
    },
  ]);

  return Connect;
})(_react.Component);

exports['default'] = Connect;
