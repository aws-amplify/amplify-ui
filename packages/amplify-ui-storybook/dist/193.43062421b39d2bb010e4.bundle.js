(window.webpackJsonp = window.webpackJsonp || []).push([
  [193],
  {
    1734: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(
          __webpack_exports__,
          'amplify_chatbot',
          function () {
            return AmplifyChatbot;
          }
        );
      var index_3fb5c139 = __webpack_require__(40),
        ConsoleLogger = __webpack_require__(164),
        JS = __webpack_require__(104),
        I18n = __webpack_require__(19),
        Translations_c833f663 = __webpack_require__(15),
        constants_d1abe7de = __webpack_require__(62),
        Amplify = __webpack_require__(233),
        __assign = function () {
          return (__assign =
            Object.assign ||
            function (t) {
              for (var s, i = 1, n = arguments.length; i < n; i++)
                for (var p in (s = arguments[i]))
                  Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
              return t;
            }).apply(this, arguments);
        },
        InteractionsProvider_logger = new ConsoleLogger.a(
          'AbstractInteractionsProvider'
        ),
        AbstractInteractionsProvider = (function () {
          function AbstractInteractionsProvider(options) {
            void 0 === options && (options = {}), (this._config = options);
          }
          return (
            (AbstractInteractionsProvider.prototype.configure = function (
              config
            ) {
              return (
                void 0 === config && (config = {}),
                (this._config = __assign(__assign({}, this._config), config)),
                InteractionsProvider_logger.debug(
                  'configure ' + this.getProviderName(),
                  this._config
                ),
                this.options
              );
            }),
            (AbstractInteractionsProvider.prototype.getCategory = function () {
              return 'Interactions';
            }),
            Object.defineProperty(
              AbstractInteractionsProvider.prototype,
              'options',
              {
                get: function () {
                  return __assign({}, this._config);
                },
                enumerable: !0,
                configurable: !0,
              }
            ),
            AbstractInteractionsProvider
          );
        })(),
        extendStatics = function (d, b) {
          return (extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (d, b) {
                d.__proto__ = b;
              }) ||
            function (d, b) {
              for (var p in b)
                Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
            })(d, b);
        };
      function __extends(d, b) {
        if ('function' != typeof b && null !== b)
          throw new TypeError(
            'Class extends value ' + String(b) + ' is not a constructor or null'
          );
        function __() {
          this.constructor = d;
        }
        extendStatics(d, b),
          (d.prototype =
            null === b
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __()));
      }
      var tslib_es6_assign = function () {
        return (tslib_es6_assign =
          Object.assign ||
          function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++)
              for (var p in (s = arguments[i]))
                Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
            return t;
          }).apply(this, arguments);
      };
      function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator.throw(value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : (function adopt(value) {
                  return value instanceof P
                    ? value
                    : new P(function (resolve) {
                        resolve(value);
                      });
                })(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      }
      function __generator(thisArg, body) {
        var f,
          y,
          t,
          g,
          _ = {
            label: 0,
            sent: function () {
              if (1 & t[0]) throw t[1];
              return t[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (g = { next: verb(0), throw: verb(1), return: verb(2) }),
          'function' == typeof Symbol &&
            (g[Symbol.iterator] = function () {
              return this;
            }),
          g
        );
        function verb(n) {
          return function (v) {
            return (function step(op) {
              if (f) throw new TypeError('Generator is already executing.');
              for (; _; )
                try {
                  if (
                    ((f = 1),
                    y &&
                      (t =
                        2 & op[0]
                          ? y.return
                          : op[0]
                          ? y.throw || ((t = y.return) && t.call(y), 0)
                          : y.next) &&
                      !(t = t.call(y, op[1])).done)
                  )
                    return t;
                  switch (((y = 0), t && (op = [2 & op[0], t.value]), op[0])) {
                    case 0:
                    case 1:
                      t = op;
                      break;
                    case 4:
                      return _.label++, { value: op[1], done: !1 };
                    case 5:
                      _.label++, (y = op[1]), (op = [0]);
                      continue;
                    case 7:
                      (op = _.ops.pop()), _.trys.pop();
                      continue;
                    default:
                      if (
                        !((t = _.trys),
                        (t = t.length > 0 && t[t.length - 1]) ||
                          (6 !== op[0] && 2 !== op[0]))
                      ) {
                        _ = 0;
                        continue;
                      }
                      if (
                        3 === op[0] &&
                        (!t || (op[1] > t[0] && op[1] < t[3]))
                      ) {
                        _.label = op[1];
                        break;
                      }
                      if (6 === op[0] && _.label < t[1]) {
                        (_.label = t[1]), (t = op);
                        break;
                      }
                      if (t && _.label < t[2]) {
                        (_.label = t[2]), _.ops.push(op);
                        break;
                      }
                      t[2] && _.ops.pop(), _.trys.pop();
                      continue;
                  }
                  op = body.call(thisArg, _);
                } catch (e) {
                  (op = [6, e]), (y = 0);
                } finally {
                  f = t = 0;
                }
              if (5 & op[0]) throw op[1];
              return { value: op[0] ? op[1] : void 0, done: !0 };
            })([n, v]);
          };
        }
      }
      Object.create;
      function __read(o, n) {
        var m = 'function' == typeof Symbol && o[Symbol.iterator];
        if (!m) return o;
        var r,
          e,
          i = m.call(o),
          ar = [];
        try {
          for (; (void 0 === n || n-- > 0) && !(r = i.next()).done; )
            ar.push(r.value);
        } catch (error) {
          e = { error: error };
        } finally {
          try {
            r && !r.done && (m = i.return) && m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      }
      Object.create;
      var models_0_BadRequestException,
        models_0_ConflictException,
        models_0_DeleteSessionRequest,
        models_0_DeleteSessionResponse,
        models_0_InternalFailureException,
        models_0_LimitExceededException,
        models_0_NotFoundException,
        models_0_GetSessionRequest,
        FulfillmentState,
        MessageFormatType,
        DialogActionType,
        models_0_DialogAction,
        ConfirmationStatus,
        models_0_IntentSummary,
        models_0_GetSessionResponse,
        models_0_BadGatewayException,
        models_0_DependencyFailedException,
        models_0_LoopDetectedException,
        models_0_NotAcceptableException,
        models_0_PostContentRequest,
        DialogState,
        models_0_PostContentResponse,
        models_0_RequestTimeoutException,
        models_0_UnsupportedMediaTypeException,
        models_0_PostTextRequest,
        models_0_IntentConfidence,
        models_0_PredictedIntent,
        ContentType,
        models_0_Button,
        models_0_GenericAttachment,
        models_0_ResponseCard,
        models_0_SentimentResponse,
        models_0_PostTextResponse,
        models_0_PutSessionRequest,
        models_0_PutSessionResponse,
        es_package = __webpack_require__(1777),
        build = __webpack_require__(186),
        es = __webpack_require__(307),
        dist_es = __webpack_require__(416),
        middleware_retry_dist_es = __webpack_require__(199),
        url_parser_browser_dist_es = __webpack_require__(417),
        util_base64_browser_dist_es = __webpack_require__(228),
        util_body_length_browser_dist_es = __webpack_require__(418),
        util_user_agent_browser_dist_es = __webpack_require__(419),
        util_utf8_browser_dist_es = __webpack_require__(400),
        AWS_REGIONS = new Set([
          'ap-east-1',
          'ap-northeast-1',
          'ap-northeast-2',
          'ap-south-1',
          'ap-southeast-1',
          'ap-southeast-2',
          'ca-central-1',
          'eu-central-1',
          'eu-north-1',
          'eu-west-1',
          'eu-west-2',
          'eu-west-3',
          'me-south-1',
          'sa-east-1',
          'us-east-1',
          'us-east-2',
          'us-west-1',
          'us-west-2',
        ]),
        AWS_CN_REGIONS = new Set(['cn-north-1', 'cn-northwest-1']),
        AWS_ISO_REGIONS = new Set(['us-iso-east-1']),
        AWS_ISO_B_REGIONS = new Set(['us-isob-east-1']),
        AWS_US_GOV_REGIONS = new Set(['us-gov-east-1', 'us-gov-west-1']),
        ClientDefaultValues = tslib_es6_assign(
          tslib_es6_assign(
            {},
            {
              apiVersion: '2016-11-28',
              disableHostPrefix: !1,
              logger: {},
              regionInfoProvider: function (region, options) {
                var regionInfo = void 0;
                switch (region) {
                  case 'eu-west-1':
                    regionInfo = {
                      hostname: 'runtime.lex.eu-west-1.amazonaws.com',
                      partition: 'aws',
                      signingService: 'lex',
                    };
                    break;
                  case 'us-east-1':
                    regionInfo = {
                      hostname: 'runtime.lex.us-east-1.amazonaws.com',
                      partition: 'aws',
                      signingService: 'lex',
                    };
                    break;
                  case 'us-west-2':
                    regionInfo = {
                      hostname: 'runtime.lex.us-west-2.amazonaws.com',
                      partition: 'aws',
                      signingService: 'lex',
                    };
                    break;
                  default:
                    AWS_REGIONS.has(region) &&
                      (regionInfo = {
                        hostname: 'runtime.lex.{region}.amazonaws.com'.replace(
                          '{region}',
                          region
                        ),
                        partition: 'aws',
                        signingService: 'lex',
                      }),
                      AWS_CN_REGIONS.has(region) &&
                        (regionInfo = {
                          hostname:
                            'runtime.lex.{region}.amazonaws.com.cn'.replace(
                              '{region}',
                              region
                            ),
                          partition: 'aws-cn',
                        }),
                      AWS_ISO_REGIONS.has(region) &&
                        (regionInfo = {
                          hostname: 'runtime.lex.{region}.c2s.ic.gov'.replace(
                            '{region}',
                            region
                          ),
                          partition: 'aws-iso',
                        }),
                      AWS_ISO_B_REGIONS.has(region) &&
                        (regionInfo = {
                          hostname:
                            'runtime.lex.{region}.sc2s.sgov.gov'.replace(
                              '{region}',
                              region
                            ),
                          partition: 'aws-iso-b',
                        }),
                      AWS_US_GOV_REGIONS.has(region) &&
                        (regionInfo = {
                          hostname:
                            'runtime.lex.{region}.amazonaws.com'.replace(
                              '{region}',
                              region
                            ),
                          partition: 'aws-us-gov',
                        }),
                      void 0 === regionInfo &&
                        (regionInfo = {
                          hostname:
                            'runtime.lex.{region}.amazonaws.com'.replace(
                              '{region}',
                              region
                            ),
                          partition: 'aws',
                          signingService: 'lex',
                        });
                }
                return Promise.resolve(regionInfo);
              },
              signingName: 'lex',
            }
          ),
          {
            runtime: 'browser',
            base64Decoder: util_base64_browser_dist_es.a,
            base64Encoder: util_base64_browser_dist_es.b,
            bodyLengthChecker: util_body_length_browser_dist_es.a,
            credentialDefaultProvider: Object(dist_es.a)(
              'Credential is missing'
            ),
            defaultUserAgent: Object(util_user_agent_browser_dist_es.a)(
              es_package.name,
              es_package.version
            ),
            maxAttempts: middleware_retry_dist_es.a,
            region: Object(dist_es.a)('Region is missing'),
            requestHandler: new es.a(),
            sha256: build.Sha256,
            streamCollector: es.b,
            urlParser: url_parser_browser_dist_es.a,
            utf8Decoder: util_utf8_browser_dist_es.a,
            utf8Encoder: util_utf8_browser_dist_es.b,
          }
        ),
        config_resolver_dist_es = __webpack_require__(398),
        middleware_content_length_dist_es = __webpack_require__(415),
        middleware_host_header_dist_es = __webpack_require__(396),
        middleware_logger_dist_es = __webpack_require__(421),
        middleware_signing_dist_es = __webpack_require__(420),
        middleware_user_agent_dist_es = __webpack_require__(399),
        smithy_client_dist_es = __webpack_require__(165),
        LexRuntimeServiceClient_LexRuntimeServiceClient = (function (_super) {
          function LexRuntimeServiceClient(configuration) {
            var _this = this,
              _config_0 = tslib_es6_assign(
                tslib_es6_assign({}, ClientDefaultValues),
                configuration
              ),
              _config_1 = Object(config_resolver_dist_es.b)(_config_0),
              _config_2 = Object(config_resolver_dist_es.a)(_config_1),
              _config_3 = Object(middleware_signing_dist_es.b)(_config_2),
              _config_4 = Object(middleware_retry_dist_es.c)(_config_3),
              _config_5 = Object(middleware_user_agent_dist_es.b)(_config_4),
              _config_6 = Object(middleware_host_header_dist_es.b)(_config_5);
            return (
              ((_this = _super.call(this, _config_6) || this).config =
                _config_6),
              _this.middlewareStack.use(
                Object(middleware_signing_dist_es.a)(_this.config)
              ),
              _this.middlewareStack.use(
                Object(middleware_retry_dist_es.b)(_this.config)
              ),
              _this.middlewareStack.use(
                Object(middleware_user_agent_dist_es.a)(_this.config)
              ),
              _this.middlewareStack.use(
                Object(middleware_content_length_dist_es.a)(_this.config)
              ),
              _this.middlewareStack.use(
                Object(middleware_host_header_dist_es.a)(_this.config)
              ),
              _this.middlewareStack.use(
                Object(middleware_logger_dist_es.a)(_this.config)
              ),
              _this
            );
          }
          return (
            __extends(LexRuntimeServiceClient, _super),
            (LexRuntimeServiceClient.prototype.destroy = function () {
              _super.prototype.destroy.call(this);
            }),
            LexRuntimeServiceClient
          );
        })(smithy_client_dist_es.a);
      ((
        models_0_BadRequestException || (models_0_BadRequestException = {})
      ).filterSensitiveLog = function (obj) {
        return tslib_es6_assign({}, obj);
      }),
        ((
          models_0_ConflictException || (models_0_ConflictException = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_DeleteSessionRequest || (models_0_DeleteSessionRequest = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_DeleteSessionResponse ||
          (models_0_DeleteSessionResponse = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_InternalFailureException ||
          (models_0_InternalFailureException = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_LimitExceededException ||
          (models_0_LimitExceededException = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_NotFoundException || (models_0_NotFoundException = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_GetSessionRequest || (models_0_GetSessionRequest = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        (function (FulfillmentState) {
          (FulfillmentState.FAILED = 'Failed'),
            (FulfillmentState.FULFILLED = 'Fulfilled'),
            (FulfillmentState.READY_FOR_FULFILLMENT = 'ReadyForFulfillment');
        })(FulfillmentState || (FulfillmentState = {})),
        (function (MessageFormatType) {
          (MessageFormatType.COMPOSITE = 'Composite'),
            (MessageFormatType.CUSTOM_PAYLOAD = 'CustomPayload'),
            (MessageFormatType.PLAIN_TEXT = 'PlainText'),
            (MessageFormatType.SSML = 'SSML');
        })(MessageFormatType || (MessageFormatType = {})),
        (function (DialogActionType) {
          (DialogActionType.CLOSE = 'Close'),
            (DialogActionType.CONFIRM_INTENT = 'ConfirmIntent'),
            (DialogActionType.DELEGATE = 'Delegate'),
            (DialogActionType.ELICIT_INTENT = 'ElicitIntent'),
            (DialogActionType.ELICIT_SLOT = 'ElicitSlot');
        })(DialogActionType || (DialogActionType = {})),
        ((
          models_0_DialogAction || (models_0_DialogAction = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign(
            tslib_es6_assign(
              tslib_es6_assign({}, obj),
              obj.slots && { slots: smithy_client_dist_es.d }
            ),
            obj.message && { message: smithy_client_dist_es.d }
          );
        }),
        (function (ConfirmationStatus) {
          (ConfirmationStatus.CONFIRMED = 'Confirmed'),
            (ConfirmationStatus.DENIED = 'Denied'),
            (ConfirmationStatus.NONE = 'None');
        })(ConfirmationStatus || (ConfirmationStatus = {})),
        ((
          models_0_IntentSummary || (models_0_IntentSummary = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign(
            tslib_es6_assign({}, obj),
            obj.slots && { slots: smithy_client_dist_es.d }
          );
        }),
        ((
          models_0_GetSessionResponse || (models_0_GetSessionResponse = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign(
            tslib_es6_assign(
              tslib_es6_assign(
                tslib_es6_assign({}, obj),
                obj.dialogAction && {
                  dialogAction: models_0_DialogAction.filterSensitiveLog(
                    obj.dialogAction
                  ),
                }
              ),
              obj.recentIntentSummaryView && {
                recentIntentSummaryView: obj.recentIntentSummaryView.map(
                  function (item) {
                    return models_0_IntentSummary.filterSensitiveLog(item);
                  }
                ),
              }
            ),
            obj.sessionAttributes && {
              sessionAttributes: smithy_client_dist_es.d,
            }
          );
        }),
        ((
          models_0_BadGatewayException || (models_0_BadGatewayException = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_DependencyFailedException ||
          (models_0_DependencyFailedException = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_LoopDetectedException ||
          (models_0_LoopDetectedException = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_NotAcceptableException ||
          (models_0_NotAcceptableException = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_PostContentRequest || (models_0_PostContentRequest = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign(
            tslib_es6_assign(
              tslib_es6_assign({}, obj),
              obj.requestAttributes && {
                requestAttributes: smithy_client_dist_es.d,
              }
            ),
            obj.sessionAttributes && {
              sessionAttributes: smithy_client_dist_es.d,
            }
          );
        }),
        (function (DialogState) {
          (DialogState.CONFIRM_INTENT = 'ConfirmIntent'),
            (DialogState.ELICIT_INTENT = 'ElicitIntent'),
            (DialogState.ELICIT_SLOT = 'ElicitSlot'),
            (DialogState.FAILED = 'Failed'),
            (DialogState.FULFILLED = 'Fulfilled'),
            (DialogState.READY_FOR_FULFILLMENT = 'ReadyForFulfillment');
        })(DialogState || (DialogState = {})),
        ((
          models_0_PostContentResponse || (models_0_PostContentResponse = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign(
            tslib_es6_assign({}, obj),
            obj.message && { message: smithy_client_dist_es.d }
          );
        }),
        ((
          models_0_RequestTimeoutException ||
          (models_0_RequestTimeoutException = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_UnsupportedMediaTypeException ||
          (models_0_UnsupportedMediaTypeException = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_PostTextRequest || (models_0_PostTextRequest = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign(
            tslib_es6_assign(
              tslib_es6_assign(
                tslib_es6_assign({}, obj),
                obj.requestAttributes && {
                  requestAttributes: smithy_client_dist_es.d,
                }
              ),
              obj.inputText && { inputText: smithy_client_dist_es.d }
            ),
            obj.sessionAttributes && {
              sessionAttributes: smithy_client_dist_es.d,
            }
          );
        }),
        ((
          models_0_IntentConfidence || (models_0_IntentConfidence = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_PredictedIntent || (models_0_PredictedIntent = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign(
            tslib_es6_assign({}, obj),
            obj.slots && { slots: smithy_client_dist_es.d }
          );
        }),
        (function (ContentType) {
          ContentType.GENERIC = 'application/vnd.amazonaws.card.generic';
        })(ContentType || (ContentType = {})),
        ((models_0_Button || (models_0_Button = {})).filterSensitiveLog =
          function (obj) {
            return tslib_es6_assign({}, obj);
          }),
        ((
          models_0_GenericAttachment || (models_0_GenericAttachment = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_ResponseCard || (models_0_ResponseCard = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_SentimentResponse || (models_0_SentimentResponse = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign({}, obj);
        }),
        ((
          models_0_PostTextResponse || (models_0_PostTextResponse = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign(
            tslib_es6_assign(
              tslib_es6_assign(
                tslib_es6_assign(
                  tslib_es6_assign({}, obj),
                  obj.alternativeIntents && {
                    alternativeIntents: obj.alternativeIntents.map(function (
                      item
                    ) {
                      return models_0_PredictedIntent.filterSensitiveLog(item);
                    }),
                  }
                ),
                obj.message && { message: smithy_client_dist_es.d }
              ),
              obj.sessionAttributes && {
                sessionAttributes: smithy_client_dist_es.d,
              }
            ),
            obj.slots && { slots: smithy_client_dist_es.d }
          );
        }),
        ((
          models_0_PutSessionRequest || (models_0_PutSessionRequest = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign(
            tslib_es6_assign(
              tslib_es6_assign(
                tslib_es6_assign({}, obj),
                obj.dialogAction && {
                  dialogAction: models_0_DialogAction.filterSensitiveLog(
                    obj.dialogAction
                  ),
                }
              ),
              obj.recentIntentSummaryView && {
                recentIntentSummaryView: obj.recentIntentSummaryView.map(
                  function (item) {
                    return models_0_IntentSummary.filterSensitiveLog(item);
                  }
                ),
              }
            ),
            obj.sessionAttributes && {
              sessionAttributes: smithy_client_dist_es.d,
            }
          );
        }),
        ((
          models_0_PutSessionResponse || (models_0_PutSessionResponse = {})
        ).filterSensitiveLog = function (obj) {
          return tslib_es6_assign(
            tslib_es6_assign({}, obj),
            obj.message && { message: smithy_client_dist_es.d }
          );
        });
      var protocol_http_dist_es = __webpack_require__(55),
        deserializeAws_restJson1PostContentCommandError = function (
          output,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var parsedOutput,
              _a,
              response,
              errorCode,
              _c,
              _d,
              _e,
              _f,
              _g,
              _h,
              _j,
              _k,
              _l,
              _m,
              _o,
              parsedBody,
              message,
              _p;
            return __generator(this, function (_q) {
              switch (_q.label) {
                case 0:
                  return (
                    (_a = [tslib_es6_assign({}, output)]),
                    (_p = {}),
                    [4, parseBody(output.body, context)]
                  );
                case 1:
                  switch (
                    ((parsedOutput = tslib_es6_assign.apply(
                      void 0,
                      _a.concat([((_p.body = _q.sent()), _p)])
                    )),
                    (errorCode = 'UnknownError'),
                    (errorCode = loadRestJsonErrorCode(
                      output,
                      parsedOutput.body
                    )),
                    errorCode)
                  ) {
                    case 'BadGatewayException':
                    case 'com.amazonaws.lexruntimeservice#BadGatewayException':
                      return [3, 2];
                    case 'BadRequestException':
                    case 'com.amazonaws.lexruntimeservice#BadRequestException':
                      return [3, 4];
                    case 'ConflictException':
                    case 'com.amazonaws.lexruntimeservice#ConflictException':
                      return [3, 6];
                    case 'DependencyFailedException':
                    case 'com.amazonaws.lexruntimeservice#DependencyFailedException':
                      return [3, 8];
                    case 'InternalFailureException':
                    case 'com.amazonaws.lexruntimeservice#InternalFailureException':
                      return [3, 10];
                    case 'LimitExceededException':
                    case 'com.amazonaws.lexruntimeservice#LimitExceededException':
                      return [3, 12];
                    case 'LoopDetectedException':
                    case 'com.amazonaws.lexruntimeservice#LoopDetectedException':
                      return [3, 14];
                    case 'NotAcceptableException':
                    case 'com.amazonaws.lexruntimeservice#NotAcceptableException':
                      return [3, 16];
                    case 'NotFoundException':
                    case 'com.amazonaws.lexruntimeservice#NotFoundException':
                      return [3, 18];
                    case 'RequestTimeoutException':
                    case 'com.amazonaws.lexruntimeservice#RequestTimeoutException':
                      return [3, 20];
                    case 'UnsupportedMediaTypeException':
                    case 'com.amazonaws.lexruntimeservice#UnsupportedMediaTypeException':
                      return [3, 22];
                  }
                  return [3, 24];
                case 2:
                  return (
                    (_c = [{}]),
                    [
                      4,
                      deserializeAws_restJson1BadGatewayExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 3:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _c.concat([_q.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 25]
                  );
                case 4:
                  return (
                    (_d = [{}]),
                    [
                      4,
                      deserializeAws_restJson1BadRequestExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 5:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _d.concat([_q.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 25]
                  );
                case 6:
                  return (
                    (_e = [{}]),
                    [
                      4,
                      deserializeAws_restJson1ConflictExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 7:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _e.concat([_q.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 25]
                  );
                case 8:
                  return (
                    (_f = [{}]),
                    [
                      4,
                      deserializeAws_restJson1DependencyFailedExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 9:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _f.concat([_q.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 25]
                  );
                case 10:
                  return (
                    (_g = [{}]),
                    [
                      4,
                      deserializeAws_restJson1InternalFailureExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 11:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _g.concat([_q.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 25]
                  );
                case 12:
                  return (
                    (_h = [{}]),
                    [
                      4,
                      deserializeAws_restJson1LimitExceededExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 13:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _h.concat([_q.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 25]
                  );
                case 14:
                  return (
                    (_j = [{}]),
                    [
                      4,
                      deserializeAws_restJson1LoopDetectedExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 15:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _j.concat([_q.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 25]
                  );
                case 16:
                  return (
                    (_k = [{}]),
                    [
                      4,
                      deserializeAws_restJson1NotAcceptableExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 17:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _k.concat([_q.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 25]
                  );
                case 18:
                  return (
                    (_l = [{}]),
                    [
                      4,
                      deserializeAws_restJson1NotFoundExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 19:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _l.concat([_q.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 25]
                  );
                case 20:
                  return (
                    (_m = [{}]),
                    [
                      4,
                      deserializeAws_restJson1RequestTimeoutExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 21:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _m.concat([_q.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 25]
                  );
                case 22:
                  return (
                    (_o = [{}]),
                    [
                      4,
                      deserializeAws_restJson1UnsupportedMediaTypeExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 23:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _o.concat([_q.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 25]
                  );
                case 24:
                  (parsedBody = parsedOutput.body),
                    (errorCode =
                      parsedBody.code || parsedBody.Code || errorCode),
                    (response = tslib_es6_assign(
                      tslib_es6_assign({}, parsedBody),
                      {
                        name: '' + errorCode,
                        message:
                          parsedBody.message || parsedBody.Message || errorCode,
                        $fault: 'client',
                        $metadata: deserializeMetadata(output),
                      }
                    )),
                    (_q.label = 25);
                case 25:
                  return (
                    (message =
                      response.message || response.Message || errorCode),
                    (response.message = message),
                    delete response.Message,
                    [
                      2,
                      Promise.reject(
                        Object.assign(new Error(message), response)
                      ),
                    ]
                  );
              }
            });
          });
        },
        deserializeAws_restJson1PostTextCommandError = function (
          output,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var parsedOutput,
              _a,
              response,
              errorCode,
              _c,
              _d,
              _e,
              _f,
              _g,
              _h,
              _j,
              _k,
              parsedBody,
              message,
              _l;
            return __generator(this, function (_m) {
              switch (_m.label) {
                case 0:
                  return (
                    (_a = [tslib_es6_assign({}, output)]),
                    (_l = {}),
                    [4, parseBody(output.body, context)]
                  );
                case 1:
                  switch (
                    ((parsedOutput = tslib_es6_assign.apply(
                      void 0,
                      _a.concat([((_l.body = _m.sent()), _l)])
                    )),
                    (errorCode = 'UnknownError'),
                    (errorCode = loadRestJsonErrorCode(
                      output,
                      parsedOutput.body
                    )),
                    errorCode)
                  ) {
                    case 'BadGatewayException':
                    case 'com.amazonaws.lexruntimeservice#BadGatewayException':
                      return [3, 2];
                    case 'BadRequestException':
                    case 'com.amazonaws.lexruntimeservice#BadRequestException':
                      return [3, 4];
                    case 'ConflictException':
                    case 'com.amazonaws.lexruntimeservice#ConflictException':
                      return [3, 6];
                    case 'DependencyFailedException':
                    case 'com.amazonaws.lexruntimeservice#DependencyFailedException':
                      return [3, 8];
                    case 'InternalFailureException':
                    case 'com.amazonaws.lexruntimeservice#InternalFailureException':
                      return [3, 10];
                    case 'LimitExceededException':
                    case 'com.amazonaws.lexruntimeservice#LimitExceededException':
                      return [3, 12];
                    case 'LoopDetectedException':
                    case 'com.amazonaws.lexruntimeservice#LoopDetectedException':
                      return [3, 14];
                    case 'NotFoundException':
                    case 'com.amazonaws.lexruntimeservice#NotFoundException':
                      return [3, 16];
                  }
                  return [3, 18];
                case 2:
                  return (
                    (_c = [{}]),
                    [
                      4,
                      deserializeAws_restJson1BadGatewayExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 3:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _c.concat([_m.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 19]
                  );
                case 4:
                  return (
                    (_d = [{}]),
                    [
                      4,
                      deserializeAws_restJson1BadRequestExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 5:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _d.concat([_m.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 19]
                  );
                case 6:
                  return (
                    (_e = [{}]),
                    [
                      4,
                      deserializeAws_restJson1ConflictExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 7:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _e.concat([_m.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 19]
                  );
                case 8:
                  return (
                    (_f = [{}]),
                    [
                      4,
                      deserializeAws_restJson1DependencyFailedExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 9:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _f.concat([_m.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 19]
                  );
                case 10:
                  return (
                    (_g = [{}]),
                    [
                      4,
                      deserializeAws_restJson1InternalFailureExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 11:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _g.concat([_m.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 19]
                  );
                case 12:
                  return (
                    (_h = [{}]),
                    [
                      4,
                      deserializeAws_restJson1LimitExceededExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 13:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _h.concat([_m.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 19]
                  );
                case 14:
                  return (
                    (_j = [{}]),
                    [
                      4,
                      deserializeAws_restJson1LoopDetectedExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 15:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _j.concat([_m.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 19]
                  );
                case 16:
                  return (
                    (_k = [{}]),
                    [
                      4,
                      deserializeAws_restJson1NotFoundExceptionResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 17:
                  return (
                    (response = tslib_es6_assign.apply(void 0, [
                      tslib_es6_assign.apply(void 0, _k.concat([_m.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 19]
                  );
                case 18:
                  (parsedBody = parsedOutput.body),
                    (errorCode =
                      parsedBody.code || parsedBody.Code || errorCode),
                    (response = tslib_es6_assign(
                      tslib_es6_assign({}, parsedBody),
                      {
                        name: '' + errorCode,
                        message:
                          parsedBody.message || parsedBody.Message || errorCode,
                        $fault: 'client',
                        $metadata: deserializeMetadata(output),
                      }
                    )),
                    (_m.label = 19);
                case 19:
                  return (
                    (message =
                      response.message || response.Message || errorCode),
                    (response.message = message),
                    delete response.Message,
                    [
                      2,
                      Promise.reject(
                        Object.assign(new Error(message), response)
                      ),
                    ]
                  );
              }
            });
          });
        },
        deserializeAws_restJson1BadGatewayExceptionResponse = function (
          parsedOutput,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var contents, data;
            return __generator(this, function (_a) {
              return (
                (contents = {
                  name: 'BadGatewayException',
                  $fault: 'server',
                  $metadata: deserializeMetadata(parsedOutput),
                  Message: void 0,
                }),
                void 0 !== (data = parsedOutput.body).Message &&
                  null !== data.Message &&
                  (contents.Message = data.Message),
                [2, contents]
              );
            });
          });
        },
        deserializeAws_restJson1BadRequestExceptionResponse = function (
          parsedOutput,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var contents, data;
            return __generator(this, function (_a) {
              return (
                (contents = {
                  name: 'BadRequestException',
                  $fault: 'client',
                  $metadata: deserializeMetadata(parsedOutput),
                  message: void 0,
                }),
                void 0 !== (data = parsedOutput.body).message &&
                  null !== data.message &&
                  (contents.message = data.message),
                [2, contents]
              );
            });
          });
        },
        deserializeAws_restJson1ConflictExceptionResponse = function (
          parsedOutput,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var contents, data;
            return __generator(this, function (_a) {
              return (
                (contents = {
                  name: 'ConflictException',
                  $fault: 'client',
                  $metadata: deserializeMetadata(parsedOutput),
                  message: void 0,
                }),
                void 0 !== (data = parsedOutput.body).message &&
                  null !== data.message &&
                  (contents.message = data.message),
                [2, contents]
              );
            });
          });
        },
        deserializeAws_restJson1DependencyFailedExceptionResponse = function (
          parsedOutput,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var contents, data;
            return __generator(this, function (_a) {
              return (
                (contents = {
                  name: 'DependencyFailedException',
                  $fault: 'client',
                  $metadata: deserializeMetadata(parsedOutput),
                  Message: void 0,
                }),
                void 0 !== (data = parsedOutput.body).Message &&
                  null !== data.Message &&
                  (contents.Message = data.Message),
                [2, contents]
              );
            });
          });
        },
        deserializeAws_restJson1InternalFailureExceptionResponse = function (
          parsedOutput,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var contents, data;
            return __generator(this, function (_a) {
              return (
                (contents = {
                  name: 'InternalFailureException',
                  $fault: 'server',
                  $metadata: deserializeMetadata(parsedOutput),
                  message: void 0,
                }),
                void 0 !== (data = parsedOutput.body).message &&
                  null !== data.message &&
                  (contents.message = data.message),
                [2, contents]
              );
            });
          });
        },
        deserializeAws_restJson1LimitExceededExceptionResponse = function (
          parsedOutput,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var contents, data;
            return __generator(this, function (_a) {
              return (
                (contents = {
                  name: 'LimitExceededException',
                  $fault: 'client',
                  $metadata: deserializeMetadata(parsedOutput),
                  message: void 0,
                  retryAfterSeconds: void 0,
                }),
                void 0 !== parsedOutput.headers['retry-after'] &&
                  (contents.retryAfterSeconds =
                    parsedOutput.headers['retry-after']),
                void 0 !== (data = parsedOutput.body).message &&
                  null !== data.message &&
                  (contents.message = data.message),
                [2, contents]
              );
            });
          });
        },
        deserializeAws_restJson1LoopDetectedExceptionResponse = function (
          parsedOutput,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var contents, data;
            return __generator(this, function (_a) {
              return (
                (contents = {
                  name: 'LoopDetectedException',
                  $fault: 'server',
                  $metadata: deserializeMetadata(parsedOutput),
                  Message: void 0,
                }),
                void 0 !== (data = parsedOutput.body).Message &&
                  null !== data.Message &&
                  (contents.Message = data.Message),
                [2, contents]
              );
            });
          });
        },
        deserializeAws_restJson1NotAcceptableExceptionResponse = function (
          parsedOutput,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var contents, data;
            return __generator(this, function (_a) {
              return (
                (contents = {
                  name: 'NotAcceptableException',
                  $fault: 'client',
                  $metadata: deserializeMetadata(parsedOutput),
                  message: void 0,
                }),
                void 0 !== (data = parsedOutput.body).message &&
                  null !== data.message &&
                  (contents.message = data.message),
                [2, contents]
              );
            });
          });
        },
        deserializeAws_restJson1NotFoundExceptionResponse = function (
          parsedOutput,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var contents, data;
            return __generator(this, function (_a) {
              return (
                (contents = {
                  name: 'NotFoundException',
                  $fault: 'client',
                  $metadata: deserializeMetadata(parsedOutput),
                  message: void 0,
                }),
                void 0 !== (data = parsedOutput.body).message &&
                  null !== data.message &&
                  (contents.message = data.message),
                [2, contents]
              );
            });
          });
        },
        deserializeAws_restJson1RequestTimeoutExceptionResponse = function (
          parsedOutput,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var contents, data;
            return __generator(this, function (_a) {
              return (
                (contents = {
                  name: 'RequestTimeoutException',
                  $fault: 'client',
                  $metadata: deserializeMetadata(parsedOutput),
                  message: void 0,
                }),
                void 0 !== (data = parsedOutput.body).message &&
                  null !== data.message &&
                  (contents.message = data.message),
                [2, contents]
              );
            });
          });
        },
        deserializeAws_restJson1UnsupportedMediaTypeExceptionResponse =
          function (parsedOutput, context) {
            return __awaiter(void 0, void 0, void 0, function () {
              var contents, data;
              return __generator(this, function (_a) {
                return (
                  (contents = {
                    name: 'UnsupportedMediaTypeException',
                    $fault: 'client',
                    $metadata: deserializeMetadata(parsedOutput),
                    message: void 0,
                  }),
                  void 0 !== (data = parsedOutput.body).message &&
                    null !== data.message &&
                    (contents.message = data.message),
                  [2, contents]
                );
              });
            });
          },
        serializeAws_restJson1StringMap = function (input, context) {
          return Object.entries(input).reduce(function (acc, _a) {
            var _b,
              _c = __read(_a, 2),
              key = _c[0],
              value = _c[1];
            return tslib_es6_assign(
              tslib_es6_assign({}, acc),
              (((_b = {})[key] = value), _b)
            );
          }, {});
        },
        deserializeAws_restJson1genericAttachmentList = function (
          output,
          context
        ) {
          return (output || []).map(function (entry) {
            return (function (output, context) {
              return {
                attachmentLinkUrl:
                  void 0 !== output.attachmentLinkUrl &&
                  null !== output.attachmentLinkUrl
                    ? output.attachmentLinkUrl
                    : void 0,
                buttons:
                  void 0 !== output.buttons && null !== output.buttons
                    ? deserializeAws_restJson1listOfButtons(
                        output.buttons,
                        context
                      )
                    : void 0,
                imageUrl:
                  void 0 !== output.imageUrl && null !== output.imageUrl
                    ? output.imageUrl
                    : void 0,
                subTitle:
                  void 0 !== output.subTitle && null !== output.subTitle
                    ? output.subTitle
                    : void 0,
                title:
                  void 0 !== output.title && null !== output.title
                    ? output.title
                    : void 0,
              };
            })(entry, context);
          });
        },
        deserializeAws_restJson1IntentConfidence = function (output, context) {
          return {
            score:
              void 0 !== output.score && null !== output.score
                ? output.score
                : void 0,
          };
        },
        deserializeAws_restJson1IntentList = function (output, context) {
          return (output || []).map(function (entry) {
            return deserializeAws_restJson1PredictedIntent(entry, context);
          });
        },
        deserializeAws_restJson1listOfButtons = function (output, context) {
          return (output || []).map(function (entry) {
            return (function (output, context) {
              return {
                text:
                  void 0 !== output.text && null !== output.text
                    ? output.text
                    : void 0,
                value:
                  void 0 !== output.value && null !== output.value
                    ? output.value
                    : void 0,
              };
            })(entry);
          });
        },
        deserializeAws_restJson1PredictedIntent = function (output, context) {
          return {
            intentName:
              void 0 !== output.intentName && null !== output.intentName
                ? output.intentName
                : void 0,
            nluIntentConfidence:
              void 0 !== output.nluIntentConfidence &&
              null !== output.nluIntentConfidence
                ? deserializeAws_restJson1IntentConfidence(
                    output.nluIntentConfidence,
                    context
                  )
                : void 0,
            slots:
              void 0 !== output.slots && null !== output.slots
                ? deserializeAws_restJson1StringMap(output.slots, context)
                : void 0,
          };
        },
        deserializeAws_restJson1ResponseCard = function (output, context) {
          return {
            contentType:
              void 0 !== output.contentType && null !== output.contentType
                ? output.contentType
                : void 0,
            genericAttachments:
              void 0 !== output.genericAttachments &&
              null !== output.genericAttachments
                ? deserializeAws_restJson1genericAttachmentList(
                    output.genericAttachments,
                    context
                  )
                : void 0,
            version:
              void 0 !== output.version && null !== output.version
                ? output.version
                : void 0,
          };
        },
        deserializeAws_restJson1SentimentResponse = function (output, context) {
          return {
            sentimentLabel:
              void 0 !== output.sentimentLabel && null !== output.sentimentLabel
                ? output.sentimentLabel
                : void 0,
            sentimentScore:
              void 0 !== output.sentimentScore && null !== output.sentimentScore
                ? output.sentimentScore
                : void 0,
          };
        },
        deserializeAws_restJson1StringMap = function (output, context) {
          return Object.entries(output).reduce(function (acc, _a) {
            var _b,
              _c = __read(_a, 2),
              key = _c[0],
              value = _c[1];
            return tslib_es6_assign(
              tslib_es6_assign({}, acc),
              (((_b = {})[key] = value), _b)
            );
          }, {});
        },
        deserializeMetadata = function (output) {
          return {
            httpStatusCode: output.statusCode,
            httpHeaders: output.headers,
            requestId: output.headers['x-amzn-requestid'],
          };
        },
        collectBodyString = function (streamBody, context) {
          return (function (streamBody, context) {
            return (
              void 0 === streamBody && (streamBody = new Uint8Array()),
              streamBody instanceof Uint8Array
                ? Promise.resolve(streamBody)
                : context.streamCollector(streamBody) ||
                  Promise.resolve(new Uint8Array())
            );
          })(streamBody, context).then(function (body) {
            return context.utf8Encoder(body);
          });
        },
        isSerializableHeaderValue = function (value) {
          return !(
            void 0 === value ||
            '' === value ||
            (Object.getOwnPropertyNames(value).includes('length') &&
              0 == value.length) ||
            (Object.getOwnPropertyNames(value).includes('size') &&
              0 == value.size)
          );
        },
        parseBody = function (streamBody, context) {
          return collectBodyString(streamBody, context).then(function (
            encoded
          ) {
            return encoded.length ? JSON.parse(encoded) : {};
          });
        },
        loadRestJsonErrorCode = function (output, data) {
          var object,
            key,
            sanitizeErrorCode = function (rawValue) {
              var cleanValue = rawValue;
              return (
                cleanValue.indexOf(':') >= 0 &&
                  (cleanValue = cleanValue.split(':')[0]),
                cleanValue.indexOf('#') >= 0 &&
                  (cleanValue = cleanValue.split('#')[1]),
                cleanValue
              );
            },
            headerKey =
              ((object = output.headers),
              (key = 'x-amzn-errortype'),
              Object.keys(object).find(function (k) {
                return k.toLowerCase() === key.toLowerCase();
              }));
          return void 0 !== headerKey
            ? sanitizeErrorCode(output.headers[headerKey])
            : void 0 !== data.code
            ? sanitizeErrorCode(data.code)
            : void 0 !== data.__type
            ? sanitizeErrorCode(data.__type)
            : '';
        },
        middleware_serde_dist_es = __webpack_require__(236),
        PostTextCommand_PostTextCommand = (function (_super) {
          function PostTextCommand(input) {
            var _this = _super.call(this) || this;
            return (_this.input = input), _this;
          }
          return (
            __extends(PostTextCommand, _super),
            (PostTextCommand.prototype.resolveMiddleware = function (
              clientStack,
              configuration,
              options
            ) {
              this.middlewareStack.use(
                Object(middleware_serde_dist_es.a)(
                  configuration,
                  this.serialize,
                  this.deserialize
                )
              );
              var stack = clientStack.concat(this.middlewareStack),
                logger = configuration.logger,
                handlerExecutionContext = {
                  logger: logger,
                  clientName: 'LexRuntimeServiceClient',
                  commandName: 'PostTextCommand',
                  inputFilterSensitiveLog:
                    models_0_PostTextRequest.filterSensitiveLog,
                  outputFilterSensitiveLog:
                    models_0_PostTextResponse.filterSensitiveLog,
                };
              'function' == typeof logger.info &&
                logger.info({
                  clientName: 'LexRuntimeServiceClient',
                  commandName: 'PostTextCommand',
                });
              var requestHandler = configuration.requestHandler;
              return stack.resolve(function (request) {
                return requestHandler.handle(request.request, options || {});
              }, handlerExecutionContext);
            }),
            (PostTextCommand.prototype.serialize = function (input, context) {
              return (function (input, context) {
                return __awaiter(void 0, void 0, void 0, function () {
                  var headers,
                    resolvedPath,
                    labelValue,
                    body,
                    _a,
                    hostname,
                    _b,
                    protocol,
                    port;
                  return __generator(this, function (_c) {
                    switch (_c.label) {
                      case 0:
                        if (
                          ((headers = { 'Content-Type': 'application/json' }),
                          (resolvedPath =
                            '/bot/{botName}/alias/{botAlias}/user/{userId}/text'),
                          void 0 === input.userId)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: userId.'
                          );
                        if ((labelValue = input.userId).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: userId.'
                          );
                        if (
                          ((resolvedPath = resolvedPath.replace(
                            '{userId}',
                            Object(smithy_client_dist_es.f)(labelValue)
                          )),
                          void 0 === input.botAlias)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: botAlias.'
                          );
                        if ((labelValue = input.botAlias).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: botAlias.'
                          );
                        if (
                          ((resolvedPath = resolvedPath.replace(
                            '{botAlias}',
                            Object(smithy_client_dist_es.f)(labelValue)
                          )),
                          void 0 === input.botName)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: botName.'
                          );
                        if ((labelValue = input.botName).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: botName.'
                          );
                        return (
                          (resolvedPath = resolvedPath.replace(
                            '{botName}',
                            Object(smithy_client_dist_es.f)(labelValue)
                          )),
                          (body = JSON.stringify(
                            tslib_es6_assign(
                              tslib_es6_assign(
                                tslib_es6_assign(
                                  {},
                                  void 0 !== input.inputText && {
                                    inputText: input.inputText,
                                  }
                                ),
                                void 0 !== input.requestAttributes && {
                                  requestAttributes:
                                    serializeAws_restJson1StringMap(
                                      input.requestAttributes,
                                      context
                                    ),
                                }
                              ),
                              void 0 !== input.sessionAttributes && {
                                sessionAttributes:
                                  serializeAws_restJson1StringMap(
                                    input.sessionAttributes,
                                    context
                                  ),
                              }
                            )
                          )),
                          [4, context.endpoint()]
                        );
                      case 1:
                        return (
                          (_a = _c.sent()),
                          (hostname = _a.hostname),
                          (_b = _a.protocol),
                          (protocol = void 0 === _b ? 'https' : _b),
                          (port = _a.port),
                          [
                            2,
                            new protocol_http_dist_es.a({
                              protocol: protocol,
                              hostname: hostname,
                              port: port,
                              method: 'POST',
                              headers: headers,
                              path: resolvedPath,
                              body: body,
                            }),
                          ]
                        );
                    }
                  });
                });
              })(input, context);
            }),
            (PostTextCommand.prototype.deserialize = function (
              output,
              context
            ) {
              return (function (output, context) {
                return __awaiter(void 0, void 0, void 0, function () {
                  var contents, data;
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        return 200 !== output.statusCode &&
                          output.statusCode >= 300
                          ? [
                              2,
                              deserializeAws_restJson1PostTextCommandError(
                                output,
                                context
                              ),
                            ]
                          : ((contents = {
                              $metadata: deserializeMetadata(output),
                              alternativeIntents: void 0,
                              botVersion: void 0,
                              dialogState: void 0,
                              intentName: void 0,
                              message: void 0,
                              messageFormat: void 0,
                              nluIntentConfidence: void 0,
                              responseCard: void 0,
                              sentimentResponse: void 0,
                              sessionAttributes: void 0,
                              sessionId: void 0,
                              slotToElicit: void 0,
                              slots: void 0,
                            }),
                            [4, parseBody(output.body, context)]);
                      case 1:
                        return (
                          void 0 !== (data = _a.sent()).alternativeIntents &&
                            null !== data.alternativeIntents &&
                            (contents.alternativeIntents =
                              deserializeAws_restJson1IntentList(
                                data.alternativeIntents,
                                context
                              )),
                          void 0 !== data.botVersion &&
                            null !== data.botVersion &&
                            (contents.botVersion = data.botVersion),
                          void 0 !== data.dialogState &&
                            null !== data.dialogState &&
                            (contents.dialogState = data.dialogState),
                          void 0 !== data.intentName &&
                            null !== data.intentName &&
                            (contents.intentName = data.intentName),
                          void 0 !== data.message &&
                            null !== data.message &&
                            (contents.message = data.message),
                          void 0 !== data.messageFormat &&
                            null !== data.messageFormat &&
                            (contents.messageFormat = data.messageFormat),
                          void 0 !== data.nluIntentConfidence &&
                            null !== data.nluIntentConfidence &&
                            (contents.nluIntentConfidence =
                              deserializeAws_restJson1IntentConfidence(
                                data.nluIntentConfidence,
                                context
                              )),
                          void 0 !== data.responseCard &&
                            null !== data.responseCard &&
                            (contents.responseCard =
                              deserializeAws_restJson1ResponseCard(
                                data.responseCard,
                                context
                              )),
                          void 0 !== data.sentimentResponse &&
                            null !== data.sentimentResponse &&
                            (contents.sentimentResponse =
                              deserializeAws_restJson1SentimentResponse(
                                data.sentimentResponse,
                                context
                              )),
                          void 0 !== data.sessionAttributes &&
                            null !== data.sessionAttributes &&
                            (contents.sessionAttributes =
                              deserializeAws_restJson1StringMap(
                                data.sessionAttributes,
                                context
                              )),
                          void 0 !== data.sessionId &&
                            null !== data.sessionId &&
                            (contents.sessionId = data.sessionId),
                          void 0 !== data.slotToElicit &&
                            null !== data.slotToElicit &&
                            (contents.slotToElicit = data.slotToElicit),
                          void 0 !== data.slots &&
                            null !== data.slots &&
                            (contents.slots = deserializeAws_restJson1StringMap(
                              data.slots,
                              context
                            )),
                          [2, Promise.resolve(contents)]
                        );
                    }
                  });
                });
              })(output, context);
            }),
            PostTextCommand
          );
        })(smithy_client_dist_es.b),
        PostContentCommand_PostContentCommand = (function (_super) {
          function PostContentCommand(input) {
            var _this = _super.call(this) || this;
            return (_this.input = input), _this;
          }
          return (
            __extends(PostContentCommand, _super),
            (PostContentCommand.prototype.resolveMiddleware = function (
              clientStack,
              configuration,
              options
            ) {
              this.middlewareStack.use(
                Object(middleware_serde_dist_es.a)(
                  configuration,
                  this.serialize,
                  this.deserialize
                )
              );
              var stack = clientStack.concat(this.middlewareStack),
                logger = configuration.logger,
                handlerExecutionContext = {
                  logger: logger,
                  clientName: 'LexRuntimeServiceClient',
                  commandName: 'PostContentCommand',
                  inputFilterSensitiveLog:
                    models_0_PostContentRequest.filterSensitiveLog,
                  outputFilterSensitiveLog:
                    models_0_PostContentResponse.filterSensitiveLog,
                };
              'function' == typeof logger.info &&
                logger.info({
                  clientName: 'LexRuntimeServiceClient',
                  commandName: 'PostContentCommand',
                });
              var requestHandler = configuration.requestHandler;
              return stack.resolve(function (request) {
                return requestHandler.handle(request.request, options || {});
              }, handlerExecutionContext);
            }),
            (PostContentCommand.prototype.serialize = function (
              input,
              context
            ) {
              return (function (input, context) {
                return __awaiter(void 0, void 0, void 0, function () {
                  var headers,
                    resolvedPath,
                    labelValue,
                    body,
                    _a,
                    hostname,
                    _b,
                    protocol,
                    port;
                  return __generator(this, function (_c) {
                    switch (_c.label) {
                      case 0:
                        if (
                          ((headers = tslib_es6_assign(
                            tslib_es6_assign(
                              tslib_es6_assign(
                                tslib_es6_assign(
                                  {
                                    'Content-Type': 'application/octet-stream',
                                    'x-amz-content-sha256': 'UNSIGNED-PAYLOAD',
                                  },
                                  isSerializableHeaderValue(
                                    input.requestAttributes
                                  ) && {
                                    'x-amz-lex-request-attributes':
                                      smithy_client_dist_es.c.fromObject(
                                        input.requestAttributes
                                      ),
                                  }
                                ),
                                isSerializableHeaderValue(
                                  input.sessionAttributes
                                ) && {
                                  'x-amz-lex-session-attributes':
                                    smithy_client_dist_es.c.fromObject(
                                      input.sessionAttributes
                                    ),
                                }
                              ),
                              isSerializableHeaderValue(input.contentType) && {
                                'Content-Type': input.contentType,
                              }
                            ),
                            isSerializableHeaderValue(input.accept) && {
                              Accept: input.accept,
                            }
                          )),
                          (resolvedPath =
                            '/bot/{botName}/alias/{botAlias}/user/{userId}/content'),
                          void 0 === input.botAlias)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: botAlias.'
                          );
                        if ((labelValue = input.botAlias).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: botAlias.'
                          );
                        if (
                          ((resolvedPath = resolvedPath.replace(
                            '{botAlias}',
                            Object(smithy_client_dist_es.f)(labelValue)
                          )),
                          void 0 === input.botName)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: botName.'
                          );
                        if ((labelValue = input.botName).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: botName.'
                          );
                        if (
                          ((resolvedPath = resolvedPath.replace(
                            '{botName}',
                            Object(smithy_client_dist_es.f)(labelValue)
                          )),
                          void 0 === input.userId)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: userId.'
                          );
                        if ((labelValue = input.userId).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: userId.'
                          );
                        return (
                          (resolvedPath = resolvedPath.replace(
                            '{userId}',
                            Object(smithy_client_dist_es.f)(labelValue)
                          )),
                          void 0 !== input.inputStream &&
                            (body = input.inputStream),
                          [4, context.endpoint()]
                        );
                      case 1:
                        return (
                          (_a = _c.sent()),
                          (hostname = _a.hostname),
                          (_b = _a.protocol),
                          (protocol = void 0 === _b ? 'https' : _b),
                          (port = _a.port),
                          [
                            2,
                            new protocol_http_dist_es.a({
                              protocol: protocol,
                              hostname: hostname,
                              port: port,
                              method: 'POST',
                              headers: headers,
                              path: resolvedPath,
                              body: body,
                            }),
                          ]
                        );
                    }
                  });
                });
              })(input, context);
            }),
            (PostContentCommand.prototype.deserialize = function (
              output,
              context
            ) {
              return (function (output, context) {
                return __awaiter(void 0, void 0, void 0, function () {
                  var contents, data;
                  return __generator(this, function (_a) {
                    return 200 !== output.statusCode && output.statusCode >= 300
                      ? [
                          2,
                          deserializeAws_restJson1PostContentCommandError(
                            output,
                            context
                          ),
                        ]
                      : ((contents = {
                          $metadata: deserializeMetadata(output),
                          alternativeIntents: void 0,
                          audioStream: void 0,
                          botVersion: void 0,
                          contentType: void 0,
                          dialogState: void 0,
                          inputTranscript: void 0,
                          intentName: void 0,
                          message: void 0,
                          messageFormat: void 0,
                          nluIntentConfidence: void 0,
                          sentimentResponse: void 0,
                          sessionAttributes: void 0,
                          sessionId: void 0,
                          slotToElicit: void 0,
                          slots: void 0,
                        }),
                        void 0 !==
                          output.headers['x-amz-lex-alternative-intents'] &&
                          (contents.alternativeIntents =
                            new smithy_client_dist_es.c(
                              output.headers['x-amz-lex-alternative-intents']
                            )),
                        void 0 !== output.headers['x-amz-lex-message-format'] &&
                          (contents.messageFormat =
                            output.headers['x-amz-lex-message-format']),
                        void 0 !== output.headers['content-type'] &&
                          (contents.contentType =
                            output.headers['content-type']),
                        void 0 !== output.headers['x-amz-lex-message'] &&
                          (contents.message =
                            output.headers['x-amz-lex-message']),
                        void 0 !== output.headers['x-amz-lex-bot-version'] &&
                          (contents.botVersion =
                            output.headers['x-amz-lex-bot-version']),
                        void 0 !== output.headers['x-amz-lex-sentiment'] &&
                          (contents.sentimentResponse =
                            output.headers['x-amz-lex-sentiment']),
                        void 0 !== output.headers['x-amz-lex-slots'] &&
                          (contents.slots = new smithy_client_dist_es.c(
                            output.headers['x-amz-lex-slots']
                          )),
                        void 0 !==
                          output.headers['x-amz-lex-input-transcript'] &&
                          (contents.inputTranscript =
                            output.headers['x-amz-lex-input-transcript']),
                        void 0 !== output.headers['x-amz-lex-slot-to-elicit'] &&
                          (contents.slotToElicit =
                            output.headers['x-amz-lex-slot-to-elicit']),
                        void 0 !==
                          output.headers['x-amz-lex-session-attributes'] &&
                          (contents.sessionAttributes =
                            new smithy_client_dist_es.c(
                              output.headers['x-amz-lex-session-attributes']
                            )),
                        void 0 !== output.headers['x-amz-lex-session-id'] &&
                          (contents.sessionId =
                            output.headers['x-amz-lex-session-id']),
                        void 0 !== output.headers['x-amz-lex-dialog-state'] &&
                          (contents.dialogState =
                            output.headers['x-amz-lex-dialog-state']),
                        void 0 !== output.headers['x-amz-lex-intent-name'] &&
                          (contents.intentName =
                            output.headers['x-amz-lex-intent-name']),
                        void 0 !==
                          output.headers['x-amz-lex-nlu-intent-confidence'] &&
                          (contents.nluIntentConfidence =
                            new smithy_client_dist_es.c(
                              output.headers['x-amz-lex-nlu-intent-confidence']
                            )),
                        (data = output.body),
                        (contents.audioStream = data),
                        [2, Promise.resolve(contents)]);
                  });
                });
              })(output, context);
            }),
            PostContentCommand
          );
        })(smithy_client_dist_es.b),
        Credentials = __webpack_require__(1768),
        Platform = __webpack_require__(304),
        convert = function (stream) {
          if (stream instanceof Blob || stream instanceof ReadableStream)
            return new Response(stream).arrayBuffer().then(function (buffer) {
              return new Uint8Array(buffer);
            });
          throw new Error('Readable is not supported.');
        },
        AWSLexProvider_extends = (function () {
          var extendStatics = function (d, b) {
            return (extendStatics =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (d, b) {
                  d.__proto__ = b;
                }) ||
              function (d, b) {
                for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
              })(d, b);
          };
          return function (d, b) {
            function __() {
              this.constructor = d;
            }
            extendStatics(d, b),
              (d.prototype =
                null === b
                  ? Object.create(b)
                  : ((__.prototype = b.prototype), new __()));
          };
        })(),
        AWSLexProvider_assign = function () {
          return (AWSLexProvider_assign =
            Object.assign ||
            function (t) {
              for (var s, i = 1, n = arguments.length; i < n; i++)
                for (var p in (s = arguments[i]))
                  Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
              return t;
            }).apply(this, arguments);
        },
        AWSLexProvider_awaiter = function (thisArg, _arguments, P, generator) {
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator.throw(value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : (function adopt(value) {
                    return value instanceof P
                      ? value
                      : new P(function (resolve) {
                          resolve(value);
                        });
                  })(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        },
        AWSLexProvider_generator = function (thisArg, body) {
          var f,
            y,
            t,
            g,
            _ = {
              label: 0,
              sent: function () {
                if (1 & t[0]) throw t[1];
                return t[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            'function' == typeof Symbol &&
              (g[Symbol.iterator] = function () {
                return this;
              }),
            g
          );
          function verb(n) {
            return function (v) {
              return (function step(op) {
                if (f) throw new TypeError('Generator is already executing.');
                for (; _; )
                  try {
                    if (
                      ((f = 1),
                      y &&
                        (t =
                          2 & op[0]
                            ? y.return
                            : op[0]
                            ? y.throw || ((t = y.return) && t.call(y), 0)
                            : y.next) &&
                        !(t = t.call(y, op[1])).done)
                    )
                      return t;
                    switch (
                      ((y = 0), t && (op = [2 & op[0], t.value]), op[0])
                    ) {
                      case 0:
                      case 1:
                        t = op;
                        break;
                      case 4:
                        return _.label++, { value: op[1], done: !1 };
                      case 5:
                        _.label++, (y = op[1]), (op = [0]);
                        continue;
                      case 7:
                        (op = _.ops.pop()), _.trys.pop();
                        continue;
                      default:
                        if (
                          !((t = _.trys),
                          (t = t.length > 0 && t[t.length - 1]) ||
                            (6 !== op[0] && 2 !== op[0]))
                        ) {
                          _ = 0;
                          continue;
                        }
                        if (
                          3 === op[0] &&
                          (!t || (op[1] > t[0] && op[1] < t[3]))
                        ) {
                          _.label = op[1];
                          break;
                        }
                        if (6 === op[0] && _.label < t[1]) {
                          (_.label = t[1]), (t = op);
                          break;
                        }
                        if (t && _.label < t[2]) {
                          (_.label = t[2]), _.ops.push(op);
                          break;
                        }
                        t[2] && _.ops.pop(), _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                  } catch (e) {
                    (op = [6, e]), (y = 0);
                  } finally {
                    f = t = 0;
                  }
                if (5 & op[0]) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: !0 };
              })([n, v]);
            };
          }
        },
        AWSLexProvider_logger = new ConsoleLogger.a('AWSLexProvider'),
        AWSLexProvider_AWSLexProvider = (function (_super) {
          function AWSLexProvider(options) {
            void 0 === options && (options = {});
            var _this = _super.call(this, options) || this;
            return (_this._botsCompleteCallback = {}), _this;
          }
          return (
            AWSLexProvider_extends(AWSLexProvider, _super),
            (AWSLexProvider.prototype.getProviderName = function () {
              return 'AWSLexProvider';
            }),
            (AWSLexProvider.prototype.reportBotStatus = function (
              data,
              botname
            ) {
              var _this = this;
              AWSLexProvider_logger.debug(
                'postContent state',
                data.dialogState
              ),
                ('ReadyForFulfillment' !== data.dialogState &&
                  'Fulfilled' !== data.dialogState) ||
                  ('function' == typeof this._botsCompleteCallback[botname] &&
                    setTimeout(function () {
                      return _this._botsCompleteCallback[botname](null, {
                        slots: data.slots,
                      });
                    }, 0),
                  this._config &&
                    'function' == typeof this._config[botname].onComplete &&
                    setTimeout(function () {
                      return _this._config[botname].onComplete(null, {
                        slots: data.slots,
                      });
                    }, 0)),
                'Failed' === data.dialogState &&
                  ('function' == typeof this._botsCompleteCallback[botname] &&
                    setTimeout(function () {
                      return _this._botsCompleteCallback[botname](
                        'Bot conversation failed'
                      );
                    }, 0),
                  this._config &&
                    'function' == typeof this._config[botname].onComplete &&
                    setTimeout(function () {
                      return _this._config[botname].onComplete(
                        'Bot conversation failed'
                      );
                    }, 0));
            }),
            (AWSLexProvider.prototype.sendMessage = function (
              botname,
              message
            ) {
              return AWSLexProvider_awaiter(this, void 0, void 0, function () {
                var credentials,
                  params,
                  postTextCommand,
                  err_1,
                  content,
                  messageType,
                  postContentCommand,
                  data,
                  audioArray,
                  err_2;
                return AWSLexProvider_generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      return this._config[botname]
                        ? [4, Credentials.a.get()]
                        : [
                            2,
                            Promise.reject(
                              'Bot ' + botname + ' does not exist'
                            ),
                          ];
                    case 1:
                      if (!(credentials = _a.sent()))
                        return [2, Promise.reject('No credentials')];
                      if (
                        ((this.lexRuntimeServiceClient =
                          new LexRuntimeServiceClient_LexRuntimeServiceClient({
                            region: this._config[botname].region,
                            credentials: credentials,
                            customUserAgent: Object(Platform.b)(),
                          })),
                        'string' != typeof message)
                      )
                        return [3, 6];
                      (params = {
                        botAlias: this._config[botname].alias,
                        botName: botname,
                        inputText: message,
                        userId: credentials.identityId,
                      }),
                        AWSLexProvider_logger.debug('postText to lex', message),
                        (_a.label = 2);
                    case 2:
                      return (
                        _a.trys.push([2, 4, , 5]),
                        (postTextCommand = new PostTextCommand_PostTextCommand(
                          params
                        )),
                        [4, this.lexRuntimeServiceClient.send(postTextCommand)]
                      );
                    case 3:
                      return (
                        (data = _a.sent()),
                        this.reportBotStatus(data, botname),
                        [2, data]
                      );
                    case 4:
                      return (err_1 = _a.sent()), [2, Promise.reject(err_1)];
                    case 5:
                      return [3, 11];
                    case 6:
                      (content = message.content),
                        (messageType = message.options.messageType),
                        (params =
                          'voice' === messageType
                            ? {
                                botAlias: this._config[botname].alias,
                                botName: botname,
                                contentType: 'audio/x-l16; sample-rate=16000',
                                inputStream: content,
                                userId: credentials.identityId,
                                accept: 'audio/mpeg',
                              }
                            : {
                                botAlias: this._config[botname].alias,
                                botName: botname,
                                contentType: 'text/plain; charset=utf-8',
                                inputStream: content,
                                userId: credentials.identityId,
                                accept: 'audio/mpeg',
                              }),
                        AWSLexProvider_logger.debug(
                          'postContent to lex',
                          message
                        ),
                        (_a.label = 7);
                    case 7:
                      return (
                        _a.trys.push([7, 10, , 11]),
                        (postContentCommand =
                          new PostContentCommand_PostContentCommand(params)),
                        [
                          4,
                          this.lexRuntimeServiceClient.send(postContentCommand),
                        ]
                      );
                    case 8:
                      return (data = _a.sent()), [4, convert(data.audioStream)];
                    case 9:
                      return (
                        (audioArray = _a.sent()),
                        this.reportBotStatus(data, botname),
                        [
                          2,
                          AWSLexProvider_assign(
                            AWSLexProvider_assign({}, data),
                            { audioStream: audioArray }
                          ),
                        ]
                      );
                    case 10:
                      return (err_2 = _a.sent()), [2, Promise.reject(err_2)];
                    case 11:
                      return [2];
                  }
                });
              });
            }),
            (AWSLexProvider.prototype.onComplete = function (
              botname,
              callback
            ) {
              if (!this._config[botname])
                throw new ErrorEvent('Bot ' + botname + ' does not exist');
              this._botsCompleteCallback[botname] = callback;
            }),
            AWSLexProvider
          );
        })(AbstractInteractionsProvider),
        Interactions_assign = function () {
          return (Interactions_assign =
            Object.assign ||
            function (t) {
              for (var s, i = 1, n = arguments.length; i < n; i++)
                for (var p in (s = arguments[i]))
                  Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
              return t;
            }).apply(this, arguments);
        },
        Interactions_awaiter = function (thisArg, _arguments, P, generator) {
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator.throw(value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : (function adopt(value) {
                    return value instanceof P
                      ? value
                      : new P(function (resolve) {
                          resolve(value);
                        });
                  })(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        },
        Interactions_generator = function (thisArg, body) {
          var f,
            y,
            t,
            g,
            _ = {
              label: 0,
              sent: function () {
                if (1 & t[0]) throw t[1];
                return t[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            'function' == typeof Symbol &&
              (g[Symbol.iterator] = function () {
                return this;
              }),
            g
          );
          function verb(n) {
            return function (v) {
              return (function step(op) {
                if (f) throw new TypeError('Generator is already executing.');
                for (; _; )
                  try {
                    if (
                      ((f = 1),
                      y &&
                        (t =
                          2 & op[0]
                            ? y.return
                            : op[0]
                            ? y.throw || ((t = y.return) && t.call(y), 0)
                            : y.next) &&
                        !(t = t.call(y, op[1])).done)
                    )
                      return t;
                    switch (
                      ((y = 0), t && (op = [2 & op[0], t.value]), op[0])
                    ) {
                      case 0:
                      case 1:
                        t = op;
                        break;
                      case 4:
                        return _.label++, { value: op[1], done: !1 };
                      case 5:
                        _.label++, (y = op[1]), (op = [0]);
                        continue;
                      case 7:
                        (op = _.ops.pop()), _.trys.pop();
                        continue;
                      default:
                        if (
                          !((t = _.trys),
                          (t = t.length > 0 && t[t.length - 1]) ||
                            (6 !== op[0] && 2 !== op[0]))
                        ) {
                          _ = 0;
                          continue;
                        }
                        if (
                          3 === op[0] &&
                          (!t || (op[1] > t[0] && op[1] < t[3]))
                        ) {
                          _.label = op[1];
                          break;
                        }
                        if (6 === op[0] && _.label < t[1]) {
                          (_.label = t[1]), (t = op);
                          break;
                        }
                        if (t && _.label < t[2]) {
                          (_.label = t[2]), _.ops.push(op);
                          break;
                        }
                        t[2] && _.ops.pop(), _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                  } catch (e) {
                    (op = [6, e]), (y = 0);
                  } finally {
                    f = t = 0;
                  }
                if (5 & op[0]) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: !0 };
              })([n, v]);
            };
          }
        },
        Interactions_logger = new ConsoleLogger.a('Interactions'),
        Interactions = new ((function () {
          function InteractionsClass(options) {
            (this._options = options),
              Interactions_logger.debug('Interactions Options', this._options),
              (this._pluggables = {});
          }
          return (
            (InteractionsClass.prototype.getModuleName = function () {
              return 'Interactions';
            }),
            (InteractionsClass.prototype.configure = function (options) {
              var _this = this,
                opt = options ? options.Interactions || options : {};
              Interactions_logger.debug('configure Interactions', { opt: opt }),
                (this._options = Interactions_assign(
                  Interactions_assign({ bots: {} }, opt),
                  opt.Interactions
                ));
              var aws_bots_config = this._options.aws_bots_config,
                bots_config = this._options.bots;
              return (
                !Object.keys(bots_config).length &&
                  aws_bots_config &&
                  Array.isArray(aws_bots_config) &&
                  aws_bots_config.forEach(function (bot) {
                    _this._options.bots[bot.name] = bot;
                  }),
                !this._pluggables.AWSLexProvider &&
                  bots_config &&
                  Object.keys(bots_config)
                    .map(function (key) {
                      return bots_config[key];
                    })
                    .find(function (bot) {
                      return (
                        !bot.providerName ||
                        'AWSLexProvider' === bot.providerName
                      );
                    }) &&
                  (this._pluggables.AWSLexProvider =
                    new AWSLexProvider_AWSLexProvider()),
                Object.keys(this._pluggables).map(function (key) {
                  _this._pluggables[key].configure(_this._options.bots);
                }),
                this._options
              );
            }),
            (InteractionsClass.prototype.addPluggable = function (pluggable) {
              if (pluggable && 'Interactions' === pluggable.getCategory()) {
                if (this._pluggables[pluggable.getProviderName()])
                  throw new Error(
                    'Bot ' + pluggable.getProviderName() + ' already plugged'
                  );
                return (
                  pluggable.configure(this._options.bots),
                  void (this._pluggables[pluggable.getProviderName()] =
                    pluggable)
                );
              }
            }),
            (InteractionsClass.prototype.send = function (botname, message) {
              return Interactions_awaiter(this, void 0, void 0, function () {
                var botProvider;
                return Interactions_generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (!this._options.bots || !this._options.bots[botname])
                        throw new Error('Bot ' + botname + ' does not exist');
                      if (
                        ((botProvider =
                          this._options.bots[botname].providerName ||
                          'AWSLexProvider'),
                        !this._pluggables[botProvider])
                      )
                        throw new Error(
                          'Bot ' +
                            botProvider +
                            ' does not have valid pluggin did you try addPluggable first?'
                        );
                      return [
                        4,
                        this._pluggables[botProvider].sendMessage(
                          botname,
                          message
                        ),
                      ];
                    case 1:
                      return [2, _a.sent()];
                  }
                });
              });
            }),
            (InteractionsClass.prototype.onComplete = function (
              botname,
              callback
            ) {
              if (!this._options.bots || !this._options.bots[botname])
                throw new Error('Bot ' + botname + ' does not exist');
              var botProvider =
                this._options.bots[botname].providerName || 'AWSLexProvider';
              if (!this._pluggables[botProvider])
                throw new Error(
                  'Bot ' +
                    botProvider +
                    ' does not have valid pluggin did you try addPluggable first?'
                );
              this._pluggables[botProvider].onComplete(botname, callback);
            }),
            InteractionsClass
          );
        })())(null);
      Amplify.a.register(Interactions);
      var ChatState,
        MessageFrom,
        ChatErrorType,
        amplify_chatbot_entry_awaiter = function (
          thisArg,
          _arguments,
          P,
          generator
        ) {
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator.throw(value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : (function adopt(value) {
                    return value instanceof P
                      ? value
                      : new P(function (resolve) {
                          resolve(value);
                        });
                  })(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        },
        amplify_chatbot_entry_generator = function (thisArg, body) {
          var f,
            y,
            t,
            g,
            _ = {
              label: 0,
              sent: function () {
                if (1 & t[0]) throw t[1];
                return t[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            'function' == typeof Symbol &&
              (g[Symbol.iterator] = function () {
                return this;
              }),
            g
          );
          function verb(n) {
            return function (v) {
              return (function step(op) {
                if (f) throw new TypeError('Generator is already executing.');
                for (; _; )
                  try {
                    if (
                      ((f = 1),
                      y &&
                        (t =
                          2 & op[0]
                            ? y.return
                            : op[0]
                            ? y.throw || ((t = y.return) && t.call(y), 0)
                            : y.next) &&
                        !(t = t.call(y, op[1])).done)
                    )
                      return t;
                    switch (
                      ((y = 0), t && (op = [2 & op[0], t.value]), op[0])
                    ) {
                      case 0:
                      case 1:
                        t = op;
                        break;
                      case 4:
                        return _.label++, { value: op[1], done: !1 };
                      case 5:
                        _.label++, (y = op[1]), (op = [0]);
                        continue;
                      case 7:
                        (op = _.ops.pop()), _.trys.pop();
                        continue;
                      default:
                        if (
                          !((t = _.trys),
                          (t = t.length > 0 && t[t.length - 1]) ||
                            (6 !== op[0] && 2 !== op[0]))
                        ) {
                          _ = 0;
                          continue;
                        }
                        if (
                          3 === op[0] &&
                          (!t || (op[1] > t[0] && op[1] < t[3]))
                        ) {
                          _.label = op[1];
                          break;
                        }
                        if (6 === op[0] && _.label < t[1]) {
                          (_.label = t[1]), (t = op);
                          break;
                        }
                        if (t && _.label < t[2]) {
                          (_.label = t[2]), _.ops.push(op);
                          break;
                        }
                        t[2] && _.ops.pop(), _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                  } catch (e) {
                    (op = [6, e]), (y = 0);
                  } finally {
                    f = t = 0;
                  }
                if (5 & op[0]) throw op[1];
                return { value: op[0] ? op[1] : void 0, done: !0 };
              })([n, v]);
            };
          }
        },
        amplify_chatbot_entry_spreadArrays = function () {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          var r = Array(s),
            k = 0;
          for (i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        },
        writeString = function (view, offset, string) {
          for (var i = 0; i < string.length; i++)
            view.setUint8(offset + i, string.charCodeAt(i));
        },
        encodeWAV = function (samples, exportSampleRate) {
          var audioSize = 2 * samples.length,
            dataSize = 8 + audioSize,
            buffer = new ArrayBuffer(36 + dataSize),
            view = new DataView(buffer);
          return (
            writeString(view, 0, 'RIFF'),
            view.setUint32(4, 24 + dataSize, !0),
            writeString(view, 8, 'WAVE'),
            writeString(view, 12, 'fmt '),
            view.setUint32(16, 16, !0),
            view.setUint16(20, 1, !0),
            view.setUint16(22, 1, !0),
            view.setUint32(24, exportSampleRate, !0),
            view.setUint32(28, 2 * exportSampleRate, !0),
            view.setUint16(32, 2, !0),
            view.setUint16(34, 16, !0),
            writeString(view, 36, 'data'),
            view.setUint32(40, audioSize, !0),
            (function (output, offset, input) {
              for (
                var byteOffset = offset, i = 0;
                i < input.length;
                i++, byteOffset += 2
              ) {
                var s = Math.max(-1, Math.min(1, input[i]));
                output.setInt16(byteOffset, s < 0 ? 32768 * s : 32767 * s, !0);
              }
            })(view, 44, samples),
            view
          );
        },
        exportBuffer = function (
          recBuffer,
          recLength,
          recordSampleRate,
          exportSampleRate
        ) {
          var downsampledBuffer = (function (
              buffer,
              recordSampleRate,
              exportSampleRate
            ) {
              if (exportSampleRate === recordSampleRate) return buffer;
              for (
                var sampleRateRatio = recordSampleRate / exportSampleRate,
                  newLength = Math.round(buffer.length / sampleRateRatio),
                  result = new Float32Array(newLength),
                  offsetResult = 0,
                  offsetBuffer = 0;
                offsetResult < result.length;

              ) {
                for (
                  var nextOffsetBuffer = Math.round(
                      (offsetResult + 1) * sampleRateRatio
                    ),
                    accum = 0,
                    count = 0,
                    i = offsetBuffer;
                  i < nextOffsetBuffer && i < buffer.length;
                  i++
                )
                  (accum += buffer[i]), count++;
                (result[offsetResult] = accum / count),
                  offsetResult++,
                  (offsetBuffer = nextOffsetBuffer);
              }
              return result;
            })(
              (function (bufferArray, recLength) {
                for (
                  var result = new Float32Array(recLength), offset = 0, i = 0;
                  i < bufferArray.length;
                  i++
                )
                  result.set(bufferArray[i], offset),
                    (offset += bufferArray[i].length);
                return result;
              })(recBuffer, recLength),
              recordSampleRate,
              exportSampleRate
            ),
            encodedWav = encodeWAV(downsampledBuffer, exportSampleRate);
          return new Blob([encodedWav], { type: 'application/octet-stream' });
        },
        amplify_chatbot_entry_logger = new ConsoleLogger.a('AudioRecorder'),
        amplify_chatbot_entry_AudioRecorder = (function () {
          function AudioRecorder(options) {
            (this.streamBuffer = []),
              (this.streamBufferLength = 0),
              (this.recording = !1),
              (this.options = options);
          }
          return (
            (AudioRecorder.prototype.init = function () {
              return amplify_chatbot_entry_awaiter(
                this,
                void 0,
                void 0,
                function () {
                  var _this = this;
                  return amplify_chatbot_entry_generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        return Object(JS.b)().isBrowser
                          ? ((window.AudioContext =
                              window.AudioContext || window.webkitAudioContext),
                            (this.audioContext = new AudioContext()),
                            [
                              4,
                              navigator.mediaDevices
                                .getUserMedia({ audio: !0 })
                                .then(function (stream) {
                                  (_this.audioSupported = !0),
                                    _this.setupAudioNodes(stream);
                                })
                                .catch(function () {
                                  return (
                                    (_this.audioSupported = !1),
                                    Promise.reject('Audio is not supported')
                                  );
                                }),
                            ])
                          : [3, 2];
                      case 1:
                        return _a.sent(), [3, 3];
                      case 2:
                        return (
                          (this.audioSupported = !1),
                          [2, Promise.reject('Audio is not supported')]
                        );
                      case 3:
                        return [2];
                    }
                  });
                }
              );
            }),
            (AudioRecorder.prototype.setupAudioNodes = function (stream) {
              return amplify_chatbot_entry_awaiter(
                this,
                void 0,
                void 0,
                function () {
                  var err_1,
                    sourceNode,
                    processorNode,
                    analyserNode,
                    _this = this;
                  return amplify_chatbot_entry_generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        return (
                          _a.trys.push([0, 2, , 3]),
                          [4, this.audioContext.resume()]
                        );
                      case 1:
                        return _a.sent(), [3, 3];
                      case 2:
                        return (
                          (err_1 = _a.sent()),
                          amplify_chatbot_entry_logger.error(err_1),
                          [3, 3]
                        );
                      case 3:
                        return (
                          (sourceNode =
                            this.audioContext.createMediaStreamSource(stream)),
                          ((processorNode =
                            this.audioContext.createScriptProcessor(
                              4096,
                              1,
                              1
                            )).onaudioprocess = function (
                            audioProcessingEvent
                          ) {
                            if (_this.recording) {
                              var stream =
                                audioProcessingEvent.inputBuffer.getChannelData(
                                  0
                                );
                              _this.streamBuffer.push(new Float32Array(stream)),
                                (_this.streamBufferLength += stream.length),
                                _this.analyse();
                            }
                          }),
                          ((analyserNode =
                            this.audioContext.createAnalyser()).minDecibels =
                            -90),
                          (analyserNode.maxDecibels = -10),
                          (analyserNode.smoothingTimeConstant = 0.85),
                          sourceNode.connect(analyserNode),
                          analyserNode.connect(processorNode),
                          processorNode.connect(sourceNode.context.destination),
                          (this.analyserNode = analyserNode),
                          [2]
                        );
                    }
                  });
                }
              );
            }),
            (AudioRecorder.prototype.startRecording = function (
              onSilence,
              visualizer
            ) {
              return amplify_chatbot_entry_awaiter(
                this,
                void 0,
                void 0,
                function () {
                  var context, err_2;
                  return amplify_chatbot_entry_generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        if (this.recording || !this.audioSupported) return [2];
                        (this.onSilence = onSilence || function () {}),
                          (this.visualizer = visualizer || function () {}),
                          (context = this.audioContext),
                          (_a.label = 1);
                      case 1:
                        return _a.trys.push([1, 3, , 4]), [4, context.resume()];
                      case 2:
                        return _a.sent(), [3, 4];
                      case 3:
                        return (
                          (err_2 = _a.sent()),
                          amplify_chatbot_entry_logger.error(err_2),
                          [3, 4]
                        );
                      case 4:
                        return (
                          (this.start = Date.now()), (this.recording = !0), [2]
                        );
                    }
                  });
                }
              );
            }),
            (AudioRecorder.prototype.stopRecording = function () {
              this.audioSupported && (this.recording = !1);
            }),
            (AudioRecorder.prototype.clear = function () {
              this.stopRecording(),
                (this.streamBufferLength = 0),
                (this.streamBuffer = []);
            }),
            (AudioRecorder.prototype.play = function (buffer) {
              var _this = this;
              if (buffer && this.audioSupported) {
                var myBlob = new Blob([buffer]);
                return new Promise(function (res, rej) {
                  var fileReader = new FileReader();
                  (fileReader.onload = function () {
                    _this.playbackSource && _this.playbackSource.disconnect(),
                      (_this.playbackSource =
                        _this.audioContext.createBufferSource());
                    _this.audioContext.decodeAudioData(
                      fileReader.result,
                      function (buf) {
                        (_this.playbackSource.buffer = buf),
                          _this.playbackSource.connect(
                            _this.audioContext.destination
                          ),
                          (_this.playbackSource.onended = function () {
                            return res();
                          }),
                          _this.playbackSource.start(0);
                      },
                      function (err) {
                        return rej(err);
                      }
                    );
                  }),
                    (fileReader.onerror = function () {
                      return rej();
                    }),
                    fileReader.readAsArrayBuffer(myBlob);
                });
              }
            }),
            (AudioRecorder.prototype.stop = function () {
              this.playbackSource && this.playbackSource.stop();
            }),
            (AudioRecorder.prototype.analyse = function () {
              if (this.audioSupported) {
                var analyser = this.analyserNode;
                analyser.fftSize = 2048;
                var bufferLength = analyser.fftSize,
                  dataArray = new Uint8Array(bufferLength),
                  amplitude = this.options.amplitude,
                  time = this.options.time;
                analyser.getByteTimeDomainData(dataArray),
                  this.visualizer(dataArray, bufferLength);
                for (var i = 0; i < bufferLength; i++) {
                  var curr_value_time = dataArray[i] / 128 - 1;
                  (curr_value_time > amplitude ||
                    curr_value_time < -1 * amplitude) &&
                    (this.start = Date.now());
                }
                Date.now() - this.start > time && this.onSilence();
              }
            }),
            (AudioRecorder.prototype.exportWAV = function (exportSampleRate) {
              return (
                void 0 === exportSampleRate && (exportSampleRate = 16e3),
                amplify_chatbot_entry_awaiter(
                  this,
                  void 0,
                  void 0,
                  function () {
                    var recordSampleRate, blob;
                    return amplify_chatbot_entry_generator(this, function (_a) {
                      return this.audioSupported
                        ? ((recordSampleRate = this.audioContext.sampleRate),
                          (blob = exportBuffer(
                            this.streamBuffer,
                            this.streamBufferLength,
                            recordSampleRate,
                            exportSampleRate
                          )),
                          this.clear(),
                          [2, blob])
                        : [2];
                    });
                  }
                )
              );
            }),
            AudioRecorder
          );
        })();
      !(function (ChatState) {
        (ChatState[(ChatState.Initial = 0)] = 'Initial'),
          (ChatState[(ChatState.Listening = 1)] = 'Listening'),
          (ChatState[(ChatState.SendingText = 2)] = 'SendingText'),
          (ChatState[(ChatState.SendingVoice = 3)] = 'SendingVoice'),
          (ChatState[(ChatState.Error = 4)] = 'Error');
      })(ChatState || (ChatState = {})),
        (function (MessageFrom) {
          (MessageFrom.Bot = 'bot'), (MessageFrom.User = 'user');
        })(MessageFrom || (MessageFrom = {})),
        (function (ChatErrorType) {
          (ChatErrorType[(ChatErrorType.Recoverable = 0)] = 'Recoverable'),
            (ChatErrorType[(ChatErrorType.Unrecoverable = 1)] =
              'Unrecoverable');
        })(ChatErrorType || (ChatErrorType = {}));
      var AmplifyChatbot = (function () {
        function class_1(hostRef) {
          var _this = this;
          Object(index_3fb5c139.k)(this, hostRef),
            (this.clearOnComplete = !1),
            (this.conversationModeOn = !1),
            (this.botTitle = Translations_c833f663.a.CHATBOT_TITLE),
            (this.voiceEnabled = !1),
            (this.textEnabled = !0),
            (this.silenceTime = 1500),
            (this.silenceThreshold = 0.2),
            (this.messages = []),
            (this.text = ''),
            (this.chatState = ChatState.Initial),
            (this.messageJSX = function (messages) {
              var messageList = messages.map(function (message) {
                return Object(index_3fb5c139.i)(
                  'div',
                  { class: 'bubble ' + message.from },
                  message.content
                );
              });
              if (
                _this.chatState === ChatState.SendingText ||
                _this.chatState === ChatState.SendingVoice
              ) {
                var client =
                  _this.chatState === ChatState.SendingText
                    ? MessageFrom.Bot
                    : MessageFrom.User;
                messageList.push(
                  Object(index_3fb5c139.i)(
                    'div',
                    { class: 'bubble ' + client },
                    Object(index_3fb5c139.i)(
                      'div',
                      { class: 'dot-flashing ' + client },
                      Object(index_3fb5c139.i)('span', { class: 'dot left' }),
                      Object(index_3fb5c139.i)('span', { class: 'dot middle' }),
                      Object(index_3fb5c139.i)('span', { class: 'dot right' })
                    )
                  )
                );
              }
              return messageList;
            }),
            (this.chatCompleted = Object(index_3fb5c139.f)(
              this,
              'chatCompleted',
              7
            ));
        }
        return (
          (class_1.prototype.submitHandler = function (_event) {
            this.sendTextMessage();
          }),
          (class_1.prototype.componentWillLoad = function () {
            if (!Interactions || 'function' != typeof Interactions.onComplete)
              throw new Error(constants_d1abe7de.m);
            this.validateProps();
          }),
          (class_1.prototype.componentDidRender = function () {
            var body = this.element.shadowRoot.querySelector('.body');
            body.scrollTop = body.scrollHeight;
          }),
          (class_1.prototype.validateProps = function () {
            var _this = this;
            if (this.voiceEnabled || this.textEnabled)
              if (this.botName) {
                this.welcomeMessage &&
                  this.appendToChat(this.welcomeMessage, MessageFrom.Bot),
                  this.voiceEnabled &&
                    ((this.audioRecorder =
                      new amplify_chatbot_entry_AudioRecorder({
                        time: this.silenceTime,
                        amplitude: this.silenceThreshold,
                      })),
                    this.audioRecorder.init().catch(function (err) {
                      _this.setError(err, ChatErrorType.Recoverable);
                    }));
                try {
                  Interactions.onComplete(this.botName, function (err, data) {
                    _this.chatCompleted.emit({ data: data, err: err }),
                      _this.clearOnComplete
                        ? _this.reset()
                        : (_this.chatState = ChatState.Initial);
                  });
                } catch (err) {
                  this.setError(err, ChatErrorType.Unrecoverable);
                }
              } else
                this.setError(
                  Translations_c833f663.a.NO_BOT_NAME_ERROR,
                  ChatErrorType.Unrecoverable
                );
            else
              this.setError(
                Translations_c833f663.a.CHAT_DISABLED_ERROR,
                ChatErrorType.Unrecoverable
              );
          }),
          (class_1.prototype.handleMicButton = function () {
            var _this = this;
            this.chatState === ChatState.Initial &&
              (this.audioRecorder.stop(),
              (this.chatState = ChatState.Listening),
              this.audioRecorder.startRecording(
                function () {
                  return _this.handleSilence();
                },
                function (data, length) {
                  return _this.visualizer(data, length);
                }
              ));
          }),
          (class_1.prototype.handleSilence = function () {
            var _this = this;
            (this.chatState = ChatState.SendingVoice),
              this.audioRecorder.stopRecording(),
              this.audioRecorder.exportWAV().then(function (blob) {
                _this.sendVoiceMessage(blob);
              });
          }),
          (class_1.prototype.handleTextChange = function (event) {
            var target = event.target;
            this.text = target.value;
          }),
          (class_1.prototype.handleCancelButton = function () {
            this.audioRecorder.clear(), (this.chatState = ChatState.Initial);
          }),
          (class_1.prototype.handleToastClose = function (errorType) {
            (this.error = void 0),
              errorType === ChatErrorType.Recoverable &&
                (this.chatState = ChatState.Initial);
          }),
          (class_1.prototype.visualizer = function (dataArray, bufferLength) {
            !(function (dataArray, bufferLength, canvas) {
              if (canvas) {
                if (!Object(JS.b)().isBrowser)
                  throw new Error(
                    'Visualization is not supported on non-browsers.'
                  );
                var _a = canvas.getBoundingClientRect(),
                  width = _a.width,
                  height = _a.height;
                (canvas.width = width), (canvas.height = height);
                var canvasCtx = canvas.getContext('2d');
                (canvasCtx.fillStyle = 'white'),
                  canvasCtx.clearRect(0, 0, width, height);
                requestAnimationFrame(function () {
                  canvasCtx.fillRect(0, 0, width, height),
                    (canvasCtx.lineWidth = 1);
                  var color = getComputedStyle(
                    document.documentElement
                  ).getPropertyValue('--amplify-primary-color');
                  (canvasCtx.strokeStyle =
                    color && '' !== color ? color : '#ff9900'),
                    canvasCtx.beginPath();
                  for (
                    var sliceWidth = (1 * width) / bufferLength, x = 0, i = 0;
                    i < bufferLength || i % 3 == 0;
                    i++
                  ) {
                    var y = ((dataArray[i] / 128) * height) / 2;
                    0 === i ? canvasCtx.moveTo(x, y) : canvasCtx.lineTo(x, y),
                      (x += sliceWidth);
                  }
                  canvasCtx.lineTo(canvas.width, canvas.height / 2),
                    canvasCtx.stroke();
                });
              }
            })(
              dataArray,
              bufferLength,
              this.element.shadowRoot.querySelector('canvas')
            );
          }),
          (class_1.prototype.sendTextMessage = function () {
            return amplify_chatbot_entry_awaiter(
              this,
              void 0,
              void 0,
              function () {
                var text, response, err_3;
                return amplify_chatbot_entry_generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (
                        0 === this.text.length ||
                        this.chatState !== ChatState.Initial
                      )
                        return [2];
                      (text = this.text),
                        (this.text = ''),
                        this.appendToChat(text, MessageFrom.User),
                        (this.chatState = ChatState.SendingText),
                        (_a.label = 1);
                    case 1:
                      return (
                        _a.trys.push([1, 3, , 4]),
                        [4, Interactions.send(this.botName, text)]
                      );
                    case 2:
                      return (response = _a.sent()), [3, 4];
                    case 3:
                      return (
                        (err_3 = _a.sent()),
                        this.setError(err_3, ChatErrorType.Recoverable),
                        [2]
                      );
                    case 4:
                      return (
                        response.message &&
                          this.appendToChat(response.message, MessageFrom.Bot),
                        (this.chatState = ChatState.Initial),
                        [2]
                      );
                  }
                });
              }
            );
          }),
          (class_1.prototype.sendVoiceMessage = function (audioInput) {
            return amplify_chatbot_entry_awaiter(
              this,
              void 0,
              void 0,
              function () {
                var interactionsMessage,
                  response,
                  err_4,
                  dialogState,
                  _this = this;
                return amplify_chatbot_entry_generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      (interactionsMessage = {
                        content: audioInput,
                        options: { messageType: 'voice' },
                      }),
                        (_a.label = 1);
                    case 1:
                      return (
                        _a.trys.push([1, 3, , 4]),
                        [
                          4,
                          Interactions.send(this.botName, interactionsMessage),
                        ]
                      );
                    case 2:
                      return (response = _a.sent()), [3, 4];
                    case 3:
                      return (
                        (err_4 = _a.sent()),
                        this.setError(err_4, ChatErrorType.Recoverable),
                        [2]
                      );
                    case 4:
                      return (
                        (this.chatState = ChatState.Initial),
                        (dialogState = response.dialogState),
                        response.inputTranscript &&
                          this.appendToChat(
                            response.inputTranscript,
                            MessageFrom.User
                          ),
                        this.appendToChat(response.message, MessageFrom.Bot),
                        [
                          4,
                          this.audioRecorder
                            .play(response.audioStream)
                            .then(function () {
                              _this.conversationModeOn &&
                                'Fulfilled' !== dialogState &&
                                'Failed' !== dialogState &&
                                _this.chatState === ChatState.Initial &&
                                _this.handleMicButton();
                            })
                            .catch(function (err) {
                              return _this.setError(
                                err,
                                ChatErrorType.Recoverable
                              );
                            }),
                        ]
                      );
                    case 5:
                      return _a.sent(), [2];
                  }
                });
              }
            );
          }),
          (class_1.prototype.appendToChat = function (content, from) {
            this.messages = amplify_chatbot_entry_spreadArrays(this.messages, [
              { content: content, from: from },
            ]);
          }),
          (class_1.prototype.setError = function (error, errorType) {
            var message = 'string' == typeof error ? error : error.message;
            (this.chatState = ChatState.Error),
              (this.error = { message: message, errorType: errorType });
          }),
          (class_1.prototype.reset = function () {
            (this.chatState = ChatState.Initial),
              (this.text = ''),
              (this.error = void 0),
              (this.messages = []),
              this.welcomeMessage &&
                this.appendToChat(this.welcomeMessage, MessageFrom.Bot),
              this.audioRecorder && this.audioRecorder.clear();
          }),
          (class_1.prototype.listeningFooterJSX = function () {
            var _this = this;
            return [
              Object(index_3fb5c139.i)('canvas', { height: '50' }),
              Object(index_3fb5c139.i)('amplify-button', {
                'data-test': 'chatbot-cancel-button',
                handleButtonClick: function () {
                  return _this.handleCancelButton();
                },
                class: 'icon-button',
                variant: 'icon',
                icon: 'ban',
              }),
            ];
          }),
          (class_1.prototype.footerJSX = function () {
            var _this = this;
            if (this.chatState === ChatState.Listening)
              return this.listeningFooterJSX();
            var inputPlaceholder = this.textEnabled
              ? Translations_c833f663.a.TEXT_INPUT_PLACEHOLDER
              : Translations_c833f663.a.VOICE_INPUT_PLACEHOLDER;
            return [
              Object(index_3fb5c139.i)('amplify-input', {
                placeholder: I18n.a.get(inputPlaceholder),
                description: 'text',
                handleInputChange: function (evt) {
                  return _this.handleTextChange(evt);
                },
                value: this.text,
                disabled:
                  this.chatState === ChatState.Error || !this.textEnabled,
              }),
              this.voiceEnabled &&
                Object(index_3fb5c139.i)('amplify-button', {
                  'data-test': 'chatbot-mic-button',
                  handleButtonClick: function () {
                    return _this.handleMicButton();
                  },
                  class: 'icon-button',
                  variant: 'icon',
                  icon: 'microphone',
                  disabled:
                    this.chatState === ChatState.Error ||
                    this.chatState !== ChatState.Initial,
                }),
              this.textEnabled &&
                Object(index_3fb5c139.i)('amplify-button', {
                  'data-test': 'chatbot-send-button',
                  class: 'icon-button',
                  variant: 'icon',
                  icon: 'send',
                  handleButtonClick: function () {
                    return _this.sendTextMessage();
                  },
                  disabled:
                    this.chatState === ChatState.Error ||
                    this.chatState !== ChatState.Initial,
                }),
            ];
          }),
          (class_1.prototype.errorToast = function () {
            var _this = this;
            if (this.error) {
              var _a = this.error,
                message = _a.message,
                errorType = _a.errorType;
              return Object(index_3fb5c139.i)('amplify-toast', {
                message: I18n.a.get(message),
                handleClose: function () {
                  return _this.handleToastClose(errorType);
                },
              });
            }
          }),
          (class_1.prototype.render = function () {
            return Object(index_3fb5c139.i)(
              index_3fb5c139.b,
              null,
              Object(index_3fb5c139.i)(
                'div',
                { class: 'amplify-chatbot' },
                Object(index_3fb5c139.i)(
                  'slot',
                  { name: 'header' },
                  Object(index_3fb5c139.i)(
                    'div',
                    { class: 'header', 'data-test': 'chatbot-header' },
                    I18n.a.get(this.botTitle)
                  )
                ),
                Object(index_3fb5c139.i)(
                  'div',
                  { class: 'body', 'data-test': 'chatbot-body' },
                  this.messageJSX(this.messages)
                ),
                Object(index_3fb5c139.i)(
                  'div',
                  { class: 'footer', 'data-test': 'chatbot-footer' },
                  this.footerJSX()
                ),
                this.errorToast()
              )
            );
          }),
          Object.defineProperty(class_1.prototype, 'element', {
            get: function () {
              return Object(index_3fb5c139.h)(this);
            },
            enumerable: !1,
            configurable: !0,
          }),
          class_1
        );
      })();
      AmplifyChatbot.style =
        '.bot .dot{background-color:var(--bot-dot-color)}.user .dot{background-color:var(--user-dot-color)}.dot-flashing{width:2.625rem}.dot-flashing .dot{display:inline-block;width:0.625rem;height:0.625rem;border-radius:10rem;opacity:0.65}.dot-flashing .left{-webkit-animation:dot-flashing 1s infinite alternate;animation:dot-flashing 1s infinite alternate;-webkit-animation-delay:0s;animation-delay:0s}.dot-flashing .middle{margin-left:0.375rem;margin-right:0.375rem;-webkit-animation:dot-flashing 1s infinite linear alternate;animation:dot-flashing 1s infinite linear alternate;-webkit-animation-delay:0.5s;animation-delay:0.5s}.dot-flashing .right{-webkit-animation:dot-flashing 1s infinite alternate;animation:dot-flashing 1s infinite alternate;-webkit-animation-delay:1s;animation-delay:1s}@-webkit-keyframes dot-flashing{0%{opacity:0.65}50%,100%{opacity:0.1}}@keyframes dot-flashing{0%{opacity:0.65}50%,100%{opacity:0.1}}:host{--width:28.75rem;--height:37.5rem;--header-color:var(--amplify-secondary-color);--header-size:var(--amplify-text-lg);--bot-background-color:rgb(230, 230, 230);--bot-text-color:black;--bot-dot-color:var(--bot-text-color);--user-background-color:var(--amplify-blue);--user-text-color:var(--amplify-white);--user-dot-color:var(--user-text-color)}.amplify-chatbot{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;background-color:var(--background-color);border-radius:0.375rem;-webkit-box-shadow:0.0625rem 0rem 0.25rem 0 rgba(0, 0, 0, 0.15);box-shadow:0.0625rem 0rem 0.25rem 0 rgba(0, 0, 0, 0.15);-webkit-box-sizing:border-box;box-sizing:border-box;font-family:var(--amplify-font-family);margin-bottom:1rem;width:100%;height:var(--height);max-width:var(--width)}@media (min-width: 672px){.amplify-chatbot{width:var(--width)}}.header{padding:1.25rem 0.375rem 1.25rem 0.375rem;color:var(--header-color);font-size:var(--header-size);font-weight:bold;text-align:center;word-wrap:break-word}.body{border-top:0.0625rem solid rgba(0, 0, 0, 0.05);padding:1.5rem 1rem 0 1rem;display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-direction:column;flex-direction:column;overflow:auto}.bubble{max-width:100%;padding:0.8em 1.4em;text-align:left;word-wrap:break-word;margin-bottom:0.625rem}.bot{margin-right:auto;background-color:var(--bot-background-color);color:var(--bot-text-color);border-radius:1.5rem 1.5rem 1.5rem 0}.user{margin-left:auto;background-color:var(--user-background-color);color:var(--user-text-color);border-radius:1.5rem 1.5rem 0 1.5rem}.footer{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;border-top:0.062rem solid rgba(0, 0, 0, 0.05);padding-right:0.625rem;min-height:3.125rem}.footer amplify-input{--border:none;--margin:0;-ms-flex-positive:1;flex-grow:1}canvas{margin-left:0.625rem;margin-right:0.625rem;-ms-flex-positive:1;flex-grow:1;height:3.125rem}.icon-button{--icon-height:1.25rem;--icon-fill:var(--amplify-primary-color);--padding:0.625rem;--width:auto}';
    },
    1777: function (module) {
      module.exports = JSON.parse(
        '{"name":"@aws-sdk/client-lex-runtime-service","description":"AWS SDK for JavaScript Lex Runtime Service Client for Node.js, Browser and React Native","version":"1.0.0-rc.4","scripts":{"clean":"npm run remove-definitions && npm run remove-dist","build-documentation":"npm run clean && typedoc ./","prepublishOnly":"yarn build","pretest":"yarn build:cjs","remove-definitions":"rimraf ./types","remove-dist":"rimraf ./dist","remove-documentation":"rimraf ./docs","test:unit":"mocha **/cjs/**/*.spec.js","test":"yarn test:unit","build:cjs":"tsc -p tsconfig.json","build:es":"tsc -p tsconfig.es.json","build":"yarn build:cjs && yarn build:es"},"main":"./dist/cjs/index.js","types":"./types/index.d.ts","module":"./dist/es/index.js","browser":{"./runtimeConfig":"./runtimeConfig.browser"},"react-native":{"./runtimeConfig":"./runtimeConfig.native"},"sideEffects":false,"dependencies":{"@aws-crypto/sha256-browser":"^1.0.0","@aws-crypto/sha256-js":"^1.0.0","@aws-sdk/config-resolver":"1.0.0-rc.3","@aws-sdk/credential-provider-node":"1.0.0-rc.3","@aws-sdk/fetch-http-handler":"1.0.0-rc.3","@aws-sdk/hash-node":"1.0.0-rc.3","@aws-sdk/invalid-dependency":"1.0.0-rc.3","@aws-sdk/middleware-content-length":"1.0.0-rc.3","@aws-sdk/middleware-host-header":"1.0.0-rc.3","@aws-sdk/middleware-logger":"1.0.0-rc.4","@aws-sdk/middleware-retry":"1.0.0-rc.4","@aws-sdk/middleware-serde":"1.0.0-rc.3","@aws-sdk/middleware-signing":"1.0.0-rc.3","@aws-sdk/middleware-stack":"1.0.0-rc.4","@aws-sdk/middleware-user-agent":"1.0.0-rc.3","@aws-sdk/node-config-provider":"1.0.0-rc.3","@aws-sdk/node-http-handler":"1.0.0-rc.3","@aws-sdk/protocol-http":"1.0.0-rc.3","@aws-sdk/smithy-client":"1.0.0-rc.4","@aws-sdk/types":"1.0.0-rc.3","@aws-sdk/url-parser-browser":"1.0.0-rc.3","@aws-sdk/url-parser-node":"1.0.0-rc.3","@aws-sdk/util-base64-browser":"1.0.0-rc.3","@aws-sdk/util-base64-node":"1.0.0-rc.3","@aws-sdk/util-body-length-browser":"1.0.0-rc.3","@aws-sdk/util-body-length-node":"1.0.0-rc.3","@aws-sdk/util-user-agent-browser":"1.0.0-rc.3","@aws-sdk/util-user-agent-node":"1.0.0-rc.3","@aws-sdk/util-utf8-browser":"1.0.0-rc.3","@aws-sdk/util-utf8-node":"1.0.0-rc.3","tslib":"^2.0.0"},"devDependencies":{"@aws-sdk/client-documentation-generator":"1.0.0-rc.3","@types/chai":"^4.2.11","@types/mocha":"^7.0.2","@types/node":"^12.7.5","jest":"^26.1.0","rimraf":"^3.0.0","typedoc":"^0.17.8","typescript":"~4.0.2"},"engines":{"node":">=10.0.0"},"author":{"name":"AWS SDK for JavaScript Team","url":"https://aws.amazon.com/javascript/"},"license":"Apache-2.0","homepage":"https://github.com/aws/aws-sdk-js-v3/tree/master/clients/client-lex-runtime-service","repository":{"type":"git","url":"https://github.com/aws/aws-sdk-js-v3.git","directory":"clients/client-lex-runtime-service"}}'
      );
    },
  },
]);
//# sourceMappingURL=193.43062421b39d2bb010e4.bundle.js.map
