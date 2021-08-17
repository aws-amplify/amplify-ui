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
exports['default'] = exports.ChatBot = void 0;

var _react = _interopRequireWildcard(require('react'));

var _reactNative = require('react-native');

var _interactions = _interopRequireDefault(
  require('@aws-amplify/interactions')
);

var _awsAmplify = require('aws-amplify');

var _AmplifyUI = require('../AmplifyUI');

var _core = require('@aws-amplify/core');

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

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
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

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
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

var Voice;
var RNFS;
var Sound;

var Buffer = require('buffer/').Buffer;

var logger = new _core.ConsoleLogger('ChatBot');
var styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    padding: 5,
  },
  itemMe: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    padding: 8,
    margin: 8,
    backgroundColor: '#CCCCCC',
    borderRadius: 15,
    overflow: 'hidden',
  },
  itemBot: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    padding: 8,
    margin: 8,
    color: 'white',
    backgroundColor: '#0099FF',
    borderRadius: 15,
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
  },
  buttonMic: {
    backgroundColor: '#ffc266',
  },
};
var STATES = {
  INITIAL: 'INITIAL',
  LISTENING: 'LISTENING',
  SENDING: 'SENDING',
  SPEAKING: 'SPEAKING',
};
var MIC_BUTTON_TEXT = {
  PASSIVE: '🎤',
  RECORDING: '🔴',
};
var timer = null;

var ChatBot = /*#__PURE__*/ (function (_Component) {
  _inherits(ChatBot, _Component);

  var _super = _createSuper(ChatBot);

  function ChatBot(props) {
    var _this;

    _classCallCheck(this, ChatBot);

    _this = _super.call(this, props);
    _this.state = {
      dialog: [
        {
          message: _this.props.welcomeMessage || 'Welcome to Lex',
          from: 'system',
        },
      ],
      inputText: '',
      inputEditable: true,
      micText: MIC_BUTTON_TEXT.PASSIVE,
      voice: false,
      conversationOngoing: false,
    };
    _this.listItems = _this.listItems.bind(_assertThisInitialized(_this));
    _this.submit = _this.submit.bind(_assertThisInitialized(_this));
    _this.listItemsRef = /*#__PURE__*/ _react['default'].createRef();
    _this.reset = _this.reset.bind(_assertThisInitialized(_this));
    _this.startRecognizing = _this.startRecognizing.bind(
      _assertThisInitialized(_this)
    );
    _this.handleMicButton = _this.handleMicButton.bind(
      _assertThisInitialized(_this)
    );

    if (_this.props.voiceEnabled) {
      if (!_this.props.voiceLibs) {
        throw new Error('Missing voiceLibs for voice interactions');
      }

      Voice = _this.props.voiceLibs.Voice;
      Sound = _this.props.voiceLibs.Sound;
      RNFS = _this.props.voiceLibs.RNFS;

      if (
        !Voice ||
        typeof Voice.start !== 'function' ||
        typeof Voice.stop !== 'function' ||
        typeof Voice.isRecognizing !== 'function'
      ) {
        throw new Error('Missing react-native-voice');
      }

      if (!Sound) {
        throw new Error('Missing react-native-sound');
      }

      if (
        !RNFS ||
        typeof RNFS.exists !== 'function' ||
        typeof RNFS.unlink !== 'function' ||
        typeof RNFS.writeFile !== 'function'
      ) {
        throw new Error('Missing react-native-fs');
      }

      Voice.onSpeechStart = _this.onSpeechStart.bind(
        _assertThisInitialized(_this)
      );
      Voice.onSpeechEnd = _this.onSpeechEnd.bind(_assertThisInitialized(_this));
      Voice.onSpeechError = _this.onSpeechError.bind(
        _assertThisInitialized(_this)
      );
      Voice.onSpeechResults = _this.onSpeechResults.bind(
        _assertThisInitialized(_this)
      );
    }

    return _this;
  }

  _createClass(ChatBot, [
    {
      key: 'listItems',
      value: function listItems() {
        var overrideStyles = this.props.styles;
        return this.state.dialog.map(function (m, i) {
          if (m.from === 'me') {
            return /*#__PURE__*/ _react['default'].createElement(
              _reactNative.Text,
              {
                key: i,
                style: [styles.itemMe, overrideStyles.itemMe],
              },
              m.message
            );
          } else if (m.from === 'system') {
            return /*#__PURE__*/ _react['default'].createElement(
              _reactNative.Text,
              {
                key: i,
                style: [styles.itemBot, overrideStyles.itemBot],
              },
              m.message
            );
          } else {
            return /*#__PURE__*/ _react['default'].createElement(
              _reactNative.Text,
              {
                key: i,
                style: [styles.itemBot, overrideStyles.itemBot],
              },
              m.message
            );
          }
        });
      },
    },
    {
      key: 'submit',
      value: (function () {
        var _submit = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(
            voiceResponse
          ) {
            var _this2 = this;

            var response, interactionsMessage, path, data, speech;
            return regeneratorRuntime.wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      if (this.state.inputText) {
                        _context3.next = 2;
                        break;
                      }

                      return _context3.abrupt('return');

                    case 2:
                      _context3.next = 4;
                      return new Promise(function (resolve) {
                        return _this2.setState(
                          {
                            dialog: [].concat(
                              _toConsumableArray(_this2.state.dialog),
                              [
                                {
                                  message: _this2.state.inputText,
                                  from: 'me',
                                },
                              ]
                            ),
                          },
                          resolve
                        );
                      });

                    case 4:
                      if (!(voiceResponse === true)) {
                        _context3.next = 11;
                        break;
                      }

                      interactionsMessage = {
                        content: this.state.inputText,
                        options: {
                          messageType: 'text',
                        },
                      };
                      _context3.next = 8;
                      return _interactions['default'].send(
                        this.props.botName,
                        interactionsMessage
                      );

                    case 8:
                      response = _context3.sent;
                      _context3.next = 14;
                      break;

                    case 11:
                      _context3.next = 13;
                      return _interactions['default'].send(
                        this.props.botName,
                        this.state.inputText
                      );

                    case 13:
                      response = _context3.sent;

                    case 14:
                      this.setState(
                        {
                          dialog: []
                            .concat(_toConsumableArray(this.state.dialog), [
                              response &&
                                response.message && {
                                  from: 'bot',
                                  message: response.message,
                                },
                            ])
                            .filter(Boolean),
                          inputText: '',
                          inputEditable: true,
                          micText: MIC_BUTTON_TEXT.PASSIVE,
                        },
                        function () {
                          setTimeout(function () {
                            _this2.listItemsRef.current.scrollToEnd();
                          }, 50);
                        }
                      );

                      if (!this.state.voice) {
                        _context3.next = 22;
                        break;
                      }

                      this.setState({
                        voice: false,
                      });
                      path = ''.concat(
                        RNFS.DocumentDirectoryPath,
                        '/responseAudio.mp3'
                      );
                      data = Buffer.from(response.audioStream).toString(
                        'base64'
                      );
                      _context3.next = 21;
                      return RNFS.writeFile(path, data, 'base64');

                    case 21:
                      speech = new Sound(
                        path,
                        '',
                        /*#__PURE__*/ (function () {
                          var _ref = _asyncToGenerator(
                            /*#__PURE__*/ regeneratorRuntime.mark(
                              function _callee2(err) {
                                return regeneratorRuntime.wrap(
                                  function _callee2$(_context2) {
                                    while (1) {
                                      switch (
                                        (_context2.prev = _context2.next)
                                      ) {
                                        case 0:
                                          if (!err) {
                                            speech.play(
                                              /*#__PURE__*/ _asyncToGenerator(
                                                /*#__PURE__*/ regeneratorRuntime.mark(
                                                  function _callee() {
                                                    return regeneratorRuntime.wrap(
                                                      function _callee$(
                                                        _context
                                                      ) {
                                                        while (1) {
                                                          switch (
                                                            (_context.prev =
                                                              _context.next)
                                                          ) {
                                                            case 0:
                                                              speech.release();
                                                              RNFS.exists(
                                                                path
                                                              ).then(function (
                                                                res
                                                              ) {
                                                                if (res) {
                                                                  RNFS.unlink(
                                                                    path
                                                                  );
                                                                }
                                                              });

                                                              if (
                                                                !(
                                                                  response.dialogState ===
                                                                    'ElicitSlot' &&
                                                                  _this2.props
                                                                    .conversationModeOn
                                                                )
                                                              ) {
                                                                _context.next = 5;
                                                                break;
                                                              }

                                                              _context.next = 5;
                                                              return _this2.startRecognizing();

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
                                              )
                                            );
                                          } else {
                                            logger.error(err);
                                          }

                                        case 1:
                                        case 'end':
                                          return _context2.stop();
                                      }
                                    }
                                  },
                                  _callee2
                                );
                              }
                            )
                          );

                          return function (_x2) {
                            return _ref.apply(this, arguments);
                          };
                        })()
                      );

                    case 22:
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

        function submit(_x) {
          return _submit.apply(this, arguments);
        }

        return submit;
      })(),
    },
    {
      key: 'getOnComplete',
      value: function getOnComplete(fn) {
        var _this3 = this;

        return function () {
          var clearOnComplete = _this3.props.clearOnComplete;
          var message = fn.apply(void 0, arguments);

          _this3.setState(
            {
              dialog: []
                .concat(
                  _toConsumableArray(!clearOnComplete && _this3.state.dialog),
                  [
                    message && {
                      from: 'bot',
                      message: message,
                    },
                  ]
                )
                .filter(Boolean),
            },
            function () {
              setTimeout(function () {
                _this3.listItemsRef.current.scrollToEnd();
              }, 50);
            }
          );
        };
      },
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this$props = this.props,
          onComplete = _this$props.onComplete,
          botName = _this$props.botName;

        if (onComplete && botName) {
          // @ts-ignore
          _interactions['default'].onComplete(
            botName,
            this.getOnComplete(onComplete, this)
          );
        }
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _this$props2 = this.props,
          onComplete = _this$props2.onComplete,
          botName = _this$props2.botName;

        if (
          botName !== prevProps.botName ||
          onComplete !== prevProps.onComplete
        ) {
          // @ts-ignore
          _interactions['default'].onComplete(
            botName,
            this.getOnComplete(onComplete, this)
          );
        }
      },
    },
    {
      key: 'onSpeechStart',
      value: function onSpeechStart(e) {
        this.setState({
          currentConversationState: STATES.LISTENING,
        });
      },
    },
    {
      key: 'onSpeechEnd',
      value: (function () {
        var _onSpeechEnd = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(e) {
            return regeneratorRuntime.wrap(
              function _callee4$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      timer = null;
                      this.setState({
                        currentConversationState: STATES.SENDING,
                      });
                      _context4.next = 4;
                      return this.submit(true);

                    case 4:
                    case 'end':
                      return _context4.stop();
                  }
                }
              },
              _callee4,
              this
            );
          })
        );

        function onSpeechEnd(_x3) {
          return _onSpeechEnd.apply(this, arguments);
        }

        return onSpeechEnd;
      })(),
    },
    {
      key: 'onSpeechError',
      value: function onSpeechError(e) {
        logger.error(e);
        this.setState({
          error: JSON.stringify(e.error),
        });
      },
    },
    {
      key: 'onSpeechResults',
      value: function onSpeechResults(e) {
        this.setState({
          inputText: e.value.join(' '),
        });

        if (timer !== null) {
          clearTimeout(timer);
        }

        timer = setTimeout(
          /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee5() {
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      _context5.next = 2;
                      return Voice.stop();

                    case 2:
                    case 'end':
                      return _context5.stop();
                  }
                }
              }, _callee5);
            })
          ),
          this.state.silenceDelay
        );
      },
    },
    {
      key: 'startRecognizing',
      value: (function () {
        var _startRecognizing = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee6() {
            return regeneratorRuntime.wrap(
              function _callee6$(_context6) {
                while (1) {
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      this.setState({
                        inputText: 'Speak into the mic...',
                        inputEditable: false,
                        micText: MIC_BUTTON_TEXT.RECORDING,
                        voice: true,
                      });

                      if (this.props.conversationModeOn) {
                        this.setState({
                          conversationOngoing: true,
                        });
                      }

                      _context6.prev = 2;
                      _context6.next = 5;
                      return Voice.start('en-US');

                    case 5:
                      _context6.next = 10;
                      break;

                    case 7:
                      _context6.prev = 7;
                      _context6.t0 = _context6['catch'](2);
                      logger.error(_context6.t0);

                    case 10:
                    case 'end':
                      return _context6.stop();
                  }
                }
              },
              _callee6,
              this,
              [[2, 7]]
            );
          })
        );

        function startRecognizing() {
          return _startRecognizing.apply(this, arguments);
        }

        return startRecognizing;
      })(),
    },
    {
      key: 'handleMicButton',
      value: (function () {
        var _handleMicButton = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee7() {
            return regeneratorRuntime.wrap(
              function _callee7$(_context7) {
                while (1) {
                  switch ((_context7.prev = _context7.next)) {
                    case 0:
                      _context7.t0 = this.state.conversationOngoing;

                      if (_context7.t0) {
                        _context7.next = 5;
                        break;
                      }

                      _context7.next = 4;
                      return Voice.isRecognizing();

                    case 4:
                      _context7.t0 = _context7.sent;

                    case 5:
                      if (!_context7.t0) {
                        _context7.next = 10;
                        break;
                      }

                      _context7.next = 8;
                      return this.reset();

                    case 8:
                      _context7.next = 12;
                      break;

                    case 10:
                      _context7.next = 12;
                      return this.startRecognizing();

                    case 12:
                    case 'end':
                      return _context7.stop();
                  }
                }
              },
              _callee7,
              this
            );
          })
        );

        function handleMicButton() {
          return _handleMicButton.apply(this, arguments);
        }

        return handleMicButton;
      })(),
    },
    {
      key: 'reset',
      value: (function () {
        var _reset = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee8() {
            return regeneratorRuntime.wrap(
              function _callee8$(_context8) {
                while (1) {
                  switch ((_context8.prev = _context8.next)) {
                    case 0:
                      this.setState({
                        inputText: '',
                        inputEditable: true,
                        micText: MIC_BUTTON_TEXT.PASSIVE,
                        voice: false,
                        conversationOngoing: false,
                      });
                      _context8.next = 3;
                      return Voice.stop();

                    case 3:
                    case 'end':
                      return _context8.stop();
                  }
                }
              },
              _callee8,
              this
            );
          })
        );

        function reset() {
          return _reset.apply(this, arguments);
        }

        return reset;
      })(),
    },
    {
      key: 'render',
      value: function render() {
        var _this4 = this;

        var overrideStyles = this.props.styles;
        return /*#__PURE__*/ _react['default'].createElement(
          _reactNative.KeyboardAvoidingView,
          {
            style: [styles.container, overrideStyles.container],
            behavior: 'padding',
            enabled: true,
          },
          /*#__PURE__*/ _react['default'].createElement(
            _reactNative.ScrollView,
            {
              ref: this.listItemsRef,
              style: [styles.list, overrideStyles.list],
              contentContainerStyle: {
                flexGrow: 1,
              },
            },
            this.listItems()
          ),
          /*#__PURE__*/ _react['default'].createElement(ChatBotInputs, {
            micText: this.state.micText,
            voiceEnabled: this.props.voiceEnabled,
            textEnabled: this.props.textEnabled,
            styles: styles,
            overrideStyles: overrideStyles,
            onChangeText: function onChangeText(inputText) {
              return _this4.setState({
                inputText: inputText,
              });
            },
            inputText: this.state.inputText,
            onSubmitEditing: this.submit,
            editable: this.state.inputEditable,
            handleMicButton: this.handleMicButton,
            submit: this.submit,
          })
        );
      },
    },
  ]);

  return ChatBot;
})(_react.Component);

exports.ChatBot = ChatBot;

function ChatBotInputs(props) {
  var voiceEnabled = props.voiceEnabled;
  var textEnabled = props.textEnabled;
  var styles = props.styles;
  var overrideStyles = props.overrideStyles;
  var onChangeText = props.onChangeText;
  var inputText = props.inputText;
  var onSubmitEditing = props.onSubmitEditing;
  var editable = props.editable;
  var handleMicButton = props.handleMicButton;
  var micText = props.micText;
  var submit = props.submit;
  var placeholder;

  if (voiceEnabled && textEnabled) {
    // @ts-ignore
    placeholder = 'Type your message or tap 🎤';
  }

  if (voiceEnabled && !textEnabled) {
    // @ts-ignore
    placeholder = 'Tap the mic button';
    editable = false;
  }

  if (!voiceEnabled && textEnabled) {
    // @ts-ignore
    placeholder = 'Type your message here';
  }

  if (!voiceEnabled && !textEnabled) {
    return /*#__PURE__*/ _react['default'].createElement(
      _reactNative.Text,
      null,
      'No Chatbot inputs enabled. Set at least one of voiceEnabled or textEnabled in the props.',
      ' '
    );
  }

  return /*#__PURE__*/ _react['default'].createElement(
    _reactNative.View,
    {
      style: [styles.inputContainer, overrideStyles.inputContainer],
    },
    /*#__PURE__*/ _react['default'].createElement(ChatBotTextInput, {
      styles: styles,
      overrideStyles: overrideStyles, // @ts-ignore
      placeholder: _awsAmplify.I18n.get(placeholder),
      onChangeText: onChangeText,
      inputText: inputText,
      returnKeyType: 'send',
      onSubmitEditing: onSubmitEditing,
      blurOnSubmit: false,
      editable: editable,
    }),
    /*#__PURE__*/ _react['default'].createElement(ChatBotMicButton, {
      handleMicButton: handleMicButton,
      styles: styles,
      overrideStyles: overrideStyles,
      micText: micText,
      voiceEnabled: voiceEnabled,
    }),
    /*#__PURE__*/ _react['default'].createElement(ChatBotTextButton, {
      submit: submit,
      type: 'submit',
      styles: styles,
      overrideStyles: overrideStyles,
      text: _awsAmplify.I18n.get('Send'),
      textEnabled: textEnabled,
    })
  );
}

function ChatBotTextInput(props) {
  var styles = props.styles;
  var overrideStyles = props.overrideStyles;
  var onChangeText = props.onChangeText;
  var inputText = props.inputText;
  var onSubmitEditing = props.onSubmitEditing;
  var editable = props.editable;
  var placeholder = props.placeholder;
  return /*#__PURE__*/ _react['default'].createElement(_reactNative.TextInput, {
    style: [styles.textInput, overrideStyles.textInput],
    placeholder: _awsAmplify.I18n.get(placeholder),
    onChangeText: onChangeText,
    value: inputText,
    returnKeyType: 'send',
    onSubmitEditing: onSubmitEditing,
    blurOnSubmit: false,
    editable: editable,
  });
}

function ChatBotTextButton(props) {
  var textEnabled = props.textEnabled;
  var styles = props.styles;
  var overrideStyles = props.overrideStyles;
  var submit = props.submit;

  if (!textEnabled) {
    return null;
  }

  return /*#__PURE__*/ _react['default'].createElement(
    _AmplifyUI.AmplifyButton,
    {
      onPress: submit, // @ts-ignore
      type: 'submit',
      style: [styles.button, overrideStyles.button],
      text: _awsAmplify.I18n.get('Send'),
    }
  );
}

function ChatBotMicButton(props) {
  var voiceEnabled = props.voiceEnabled;
  var styles = props.styles;
  var overrideStyles = props.overrideStyles;
  var handleMicButton = props.handleMicButton;
  var micText = props.micText;

  if (!voiceEnabled) {
    return null;
  }

  return /*#__PURE__*/ _react['default'].createElement(
    _AmplifyUI.AmplifyButton,
    {
      onPress: handleMicButton,
      style: [styles.buttonMic, overrideStyles.buttonMic],
      text: micText,
    }
  );
} // @ts-ignore

ChatBot.defaultProps = {
  botName: undefined,
  onComplete: undefined,
  clearOnComplete: false,
  styles: {},
  silenceDelay: 1000,
  conversationModeOn: false,
  voiceEnabled: false,
  textEnabled: true,
};
var _default = ChatBot;
exports['default'] = _default;
