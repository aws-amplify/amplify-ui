(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    1771: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.d(__webpack_exports__, 'a', function () {
        return storage_lib_esm_Storage;
      });
      var ConsoleLogger = __webpack_require__(164),
        Parser = __webpack_require__(1766),
        Hub = __webpack_require__(305),
        Credentials = __webpack_require__(1768),
        Platform = __webpack_require__(304),
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
      var __assign = function () {
        return (__assign =
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
      Object.create;
      var models_0_AbortIncompleteMultipartUpload,
        models_0_AbortMultipartUploadOutput,
        models_0_AbortMultipartUploadRequest,
        models_0_NoSuchUpload,
        models_0_AccelerateConfiguration,
        models_0_Grantee,
        models_0_Grant,
        models_0_Owner,
        models_0_AccessControlPolicy,
        models_0_AccessControlTranslation,
        models_0_CompleteMultipartUploadOutput,
        models_0_CompletedPart,
        models_0_CompletedMultipartUpload,
        models_0_CompleteMultipartUploadRequest,
        models_0_CopyObjectResult,
        models_0_CopyObjectOutput,
        models_0_CopyObjectRequest,
        models_0_ObjectNotInActiveTierError,
        models_0_BucketAlreadyExists,
        models_0_BucketAlreadyOwnedByYou,
        models_0_CreateBucketOutput,
        models_0_CreateBucketConfiguration,
        models_0_CreateBucketRequest,
        models_0_CreateMultipartUploadOutput,
        models_0_CreateMultipartUploadRequest,
        models_0_DeleteBucketRequest,
        models_0_DeleteBucketAnalyticsConfigurationRequest,
        models_0_DeleteBucketCorsRequest,
        models_0_DeleteBucketEncryptionRequest,
        models_0_DeleteBucketInventoryConfigurationRequest,
        models_0_DeleteBucketLifecycleRequest,
        models_0_DeleteBucketMetricsConfigurationRequest,
        models_0_DeleteBucketOwnershipControlsRequest,
        models_0_DeleteBucketPolicyRequest,
        models_0_DeleteBucketReplicationRequest,
        models_0_DeleteBucketTaggingRequest,
        models_0_DeleteBucketWebsiteRequest,
        models_0_DeleteObjectOutput,
        models_0_DeleteObjectRequest,
        models_0_DeletedObject,
        models_0_Error,
        models_0_DeleteObjectsOutput,
        models_0_ObjectIdentifier,
        models_0_Delete,
        models_0_DeleteObjectsRequest,
        models_0_DeleteObjectTaggingOutput,
        models_0_DeleteObjectTaggingRequest,
        models_0_DeletePublicAccessBlockRequest,
        models_0_GetBucketAccelerateConfigurationOutput,
        models_0_GetBucketAccelerateConfigurationRequest,
        models_0_GetBucketAclOutput,
        models_0_GetBucketAclRequest,
        models_0_Tag,
        models_0_AnalyticsAndOperator,
        models_0_AnalyticsFilter,
        models_0_AnalyticsS3BucketDestination,
        models_0_AnalyticsExportDestination,
        models_0_StorageClassAnalysisDataExport,
        models_0_StorageClassAnalysis,
        models_0_AnalyticsConfiguration,
        models_0_GetBucketAnalyticsConfigurationOutput,
        models_0_GetBucketAnalyticsConfigurationRequest,
        models_0_CORSRule,
        models_0_GetBucketCorsOutput,
        models_0_GetBucketCorsRequest,
        models_0_ServerSideEncryptionByDefault,
        models_0_ServerSideEncryptionRule,
        models_0_ServerSideEncryptionConfiguration,
        models_0_GetBucketEncryptionOutput,
        models_0_GetBucketEncryptionRequest,
        models_0_SSEKMS,
        models_0_SSES3,
        models_0_InventoryEncryption,
        models_0_InventoryS3BucketDestination,
        models_0_InventoryDestination,
        models_0_InventoryFilter,
        models_0_InventorySchedule,
        models_0_InventoryConfiguration,
        models_0_GetBucketInventoryConfigurationOutput,
        models_0_GetBucketInventoryConfigurationRequest,
        models_0_LifecycleExpiration,
        models_0_LifecycleRuleAndOperator,
        models_0_LifecycleRuleFilter,
        models_0_NoncurrentVersionExpiration,
        models_0_NoncurrentVersionTransition,
        models_0_Transition,
        models_0_LifecycleRule,
        models_0_GetBucketLifecycleConfigurationOutput,
        models_0_GetBucketLifecycleConfigurationRequest,
        models_0_GetBucketLocationOutput,
        models_0_GetBucketLocationRequest,
        models_0_TargetGrant,
        models_0_LoggingEnabled,
        models_0_GetBucketLoggingOutput,
        models_0_GetBucketLoggingRequest,
        models_0_MetricsAndOperator,
        models_0_MetricsFilter,
        models_0_MetricsConfiguration,
        models_0_GetBucketMetricsConfigurationOutput,
        models_0_GetBucketMetricsConfigurationRequest,
        models_0_GetBucketNotificationConfigurationRequest,
        models_0_FilterRule,
        models_0_S3KeyFilter,
        models_0_NotificationConfigurationFilter,
        models_0_LambdaFunctionConfiguration,
        models_0_QueueConfiguration,
        models_0_TopicConfiguration,
        models_0_NotificationConfiguration,
        models_0_OwnershipControlsRule,
        models_0_OwnershipControls,
        models_0_GetBucketOwnershipControlsOutput,
        models_0_GetBucketOwnershipControlsRequest,
        models_0_GetBucketPolicyOutput,
        models_0_GetBucketPolicyRequest,
        models_0_PolicyStatus,
        models_0_GetBucketPolicyStatusOutput,
        models_0_GetBucketPolicyStatusRequest,
        models_0_DeleteMarkerReplication,
        models_0_EncryptionConfiguration,
        models_0_ReplicationTimeValue,
        models_0_Metrics,
        models_0_ReplicationTime,
        models_0_Destination,
        models_0_ExistingObjectReplication,
        models_0_ReplicationRuleAndOperator,
        models_0_ReplicationRuleFilter,
        models_0_SseKmsEncryptedObjects,
        models_0_SourceSelectionCriteria,
        models_0_ReplicationRule,
        models_0_ReplicationConfiguration,
        models_0_GetBucketReplicationOutput,
        models_0_GetBucketReplicationRequest,
        models_0_GetBucketRequestPaymentOutput,
        models_0_GetBucketRequestPaymentRequest,
        models_0_GetBucketTaggingOutput,
        models_0_GetBucketTaggingRequest,
        models_0_GetBucketVersioningOutput,
        models_0_GetBucketVersioningRequest,
        models_0_ErrorDocument,
        models_0_IndexDocument,
        models_0_RedirectAllRequestsTo,
        models_0_Condition,
        models_0_Redirect,
        models_0_RoutingRule,
        models_0_GetBucketWebsiteOutput,
        models_0_GetBucketWebsiteRequest,
        models_0_GetObjectOutput,
        models_0_GetObjectRequest,
        models_0_NoSuchKey,
        models_0_GetObjectAclOutput,
        models_0_GetObjectAclRequest,
        models_0_ObjectLockLegalHold,
        models_0_GetObjectLegalHoldOutput,
        models_0_GetObjectLegalHoldRequest,
        models_0_DefaultRetention,
        models_0_ObjectLockRule,
        models_0_ObjectLockConfiguration,
        models_0_GetObjectLockConfigurationOutput,
        models_0_GetObjectLockConfigurationRequest,
        models_0_ObjectLockRetention,
        models_0_GetObjectRetentionOutput,
        models_0_GetObjectRetentionRequest,
        models_0_GetObjectTaggingOutput,
        models_0_GetObjectTaggingRequest,
        models_0_GetObjectTorrentOutput,
        models_0_GetObjectTorrentRequest,
        models_0_PublicAccessBlockConfiguration,
        models_0_GetPublicAccessBlockOutput,
        models_0_GetPublicAccessBlockRequest,
        models_0_HeadBucketRequest,
        models_0_NoSuchBucket,
        models_0_HeadObjectOutput,
        models_0_HeadObjectRequest,
        models_0_ListBucketAnalyticsConfigurationsOutput,
        models_0_ListBucketAnalyticsConfigurationsRequest,
        models_0_ListBucketInventoryConfigurationsOutput,
        models_0_ListBucketInventoryConfigurationsRequest,
        models_0_ListBucketMetricsConfigurationsOutput,
        models_0_ListBucketMetricsConfigurationsRequest,
        models_0_Bucket,
        models_0_ListBucketsOutput,
        models_0_CommonPrefix,
        models_0_Initiator,
        models_0_MultipartUpload,
        models_0_ListMultipartUploadsOutput,
        models_0_ListMultipartUploadsRequest,
        models_0_Object,
        models_0_ListObjectsOutput,
        models_0_ListObjectsRequest,
        models_0_ListObjectsV2Output,
        models_0_ListObjectsV2Request,
        models_0_DeleteMarkerEntry,
        models_0_ObjectVersion,
        models_0_ListObjectVersionsOutput,
        models_0_ListObjectVersionsRequest,
        models_0_Part,
        models_0_ListPartsOutput,
        models_0_ListPartsRequest,
        models_0_PutBucketAccelerateConfigurationRequest,
        models_0_PutBucketAclRequest,
        models_0_PutBucketAnalyticsConfigurationRequest,
        models_0_CORSConfiguration,
        models_0_PutBucketCorsRequest,
        models_0_PutBucketEncryptionRequest,
        models_0_PutBucketInventoryConfigurationRequest,
        models_0_BucketLifecycleConfiguration,
        models_0_PutBucketLifecycleConfigurationRequest,
        models_0_BucketLoggingStatus,
        models_0_PutBucketLoggingRequest,
        models_0_PutBucketMetricsConfigurationRequest,
        models_0_PutBucketNotificationConfigurationRequest,
        models_0_PutBucketOwnershipControlsRequest,
        models_0_PutBucketPolicyRequest,
        models_0_PutBucketReplicationRequest,
        models_0_RequestPaymentConfiguration,
        models_0_PutBucketRequestPaymentRequest,
        models_0_Tagging,
        models_0_PutBucketTaggingRequest,
        models_0_VersioningConfiguration,
        models_0_PutBucketVersioningRequest,
        models_0_WebsiteConfiguration,
        models_0_PutBucketWebsiteRequest,
        models_0_PutObjectOutput,
        models_0_PutObjectRequest,
        models_0_PutObjectAclOutput,
        models_0_PutObjectAclRequest,
        models_0_PutObjectLegalHoldOutput,
        models_0_PutObjectLegalHoldRequest,
        models_0_PutObjectLockConfigurationOutput,
        models_0_PutObjectLockConfigurationRequest,
        models_0_PutObjectRetentionOutput,
        models_0_PutObjectRetentionRequest,
        models_0_PutObjectTaggingOutput,
        models_0_PutObjectTaggingRequest,
        models_0_PutPublicAccessBlockRequest,
        models_0_ObjectAlreadyInActiveTierError,
        models_0_RestoreObjectOutput,
        models_0_GlacierJobParameters,
        models_0_Encryption,
        models_0_MetadataEntry,
        models_0_S3Location,
        models_0_OutputLocation,
        FileHeaderInfo,
        models_0_CSVInput,
        JSONType,
        models_0_JSONInput,
        models_0_ParquetInput,
        models_0_InputSerialization,
        QuoteFields,
        models_0_CSVOutput,
        models_0_JSONOutput,
        models_0_OutputSerialization,
        models_0_SelectParameters,
        es = __webpack_require__(165);
      ((
        models_0_AbortIncompleteMultipartUpload ||
        (models_0_AbortIncompleteMultipartUpload = {})
      ).filterSensitiveLog = function (obj) {
        return __assign({}, obj);
      }),
        ((
          models_0_AbortMultipartUploadOutput ||
          (models_0_AbortMultipartUploadOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_AbortMultipartUploadRequest ||
          (models_0_AbortMultipartUploadRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_NoSuchUpload || (models_0_NoSuchUpload = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_AccelerateConfiguration ||
          (models_0_AccelerateConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_0_Grantee || (models_0_Grantee = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((models_0_Grant || (models_0_Grant = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((models_0_Owner || (models_0_Owner = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_0_AccessControlPolicy || (models_0_AccessControlPolicy = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_AccessControlTranslation ||
          (models_0_AccessControlTranslation = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_CompleteMultipartUploadOutput ||
          (models_0_CompleteMultipartUploadOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.SSEKMSKeyId && { SSEKMSKeyId: es.d }
          );
        }),
        ((
          models_0_CompletedPart || (models_0_CompletedPart = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_CompletedMultipartUpload ||
          (models_0_CompletedMultipartUpload = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_CompleteMultipartUploadRequest ||
          (models_0_CompleteMultipartUploadRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_CopyObjectResult || (models_0_CopyObjectResult = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_CopyObjectOutput || (models_0_CopyObjectOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign(
              __assign({}, obj),
              obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: es.d }
            ),
            obj.SSEKMSKeyId && { SSEKMSKeyId: es.d }
          );
        }),
        ((
          models_0_CopyObjectRequest || (models_0_CopyObjectRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign(
              __assign(
                __assign(
                  __assign({}, obj),
                  obj.SSEKMSEncryptionContext && {
                    SSEKMSEncryptionContext: es.d,
                  }
                ),
                obj.SSECustomerKey && { SSECustomerKey: es.d }
              ),
              obj.CopySourceSSECustomerKey && { CopySourceSSECustomerKey: es.d }
            ),
            obj.SSEKMSKeyId && { SSEKMSKeyId: es.d }
          );
        }),
        ((
          models_0_ObjectNotInActiveTierError ||
          (models_0_ObjectNotInActiveTierError = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_BucketAlreadyExists || (models_0_BucketAlreadyExists = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_BucketAlreadyOwnedByYou ||
          (models_0_BucketAlreadyOwnedByYou = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_CreateBucketOutput || (models_0_CreateBucketOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_CreateBucketConfiguration ||
          (models_0_CreateBucketConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_CreateBucketRequest || (models_0_CreateBucketRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_CreateMultipartUploadOutput ||
          (models_0_CreateMultipartUploadOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign(
              __assign({}, obj),
              obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: es.d }
            ),
            obj.SSEKMSKeyId && { SSEKMSKeyId: es.d }
          );
        }),
        ((
          models_0_CreateMultipartUploadRequest ||
          (models_0_CreateMultipartUploadRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign(
              __assign(
                __assign({}, obj),
                obj.SSEKMSKeyId && { SSEKMSKeyId: es.d }
              ),
              obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: es.d }
            ),
            obj.SSECustomerKey && { SSECustomerKey: es.d }
          );
        }),
        ((
          models_0_DeleteBucketRequest || (models_0_DeleteBucketRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteBucketAnalyticsConfigurationRequest ||
          (models_0_DeleteBucketAnalyticsConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteBucketCorsRequest ||
          (models_0_DeleteBucketCorsRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteBucketEncryptionRequest ||
          (models_0_DeleteBucketEncryptionRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteBucketInventoryConfigurationRequest ||
          (models_0_DeleteBucketInventoryConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteBucketLifecycleRequest ||
          (models_0_DeleteBucketLifecycleRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteBucketMetricsConfigurationRequest ||
          (models_0_DeleteBucketMetricsConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteBucketOwnershipControlsRequest ||
          (models_0_DeleteBucketOwnershipControlsRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteBucketPolicyRequest ||
          (models_0_DeleteBucketPolicyRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteBucketReplicationRequest ||
          (models_0_DeleteBucketReplicationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteBucketTaggingRequest ||
          (models_0_DeleteBucketTaggingRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteBucketWebsiteRequest ||
          (models_0_DeleteBucketWebsiteRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteObjectOutput || (models_0_DeleteObjectOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteObjectRequest || (models_0_DeleteObjectRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeletedObject || (models_0_DeletedObject = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_0_Error || (models_0_Error = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_0_DeleteObjectsOutput || (models_0_DeleteObjectsOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ObjectIdentifier || (models_0_ObjectIdentifier = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_0_Delete || (models_0_Delete = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_0_DeleteObjectsRequest || (models_0_DeleteObjectsRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteObjectTaggingOutput ||
          (models_0_DeleteObjectTaggingOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteObjectTaggingRequest ||
          (models_0_DeleteObjectTaggingRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeletePublicAccessBlockRequest ||
          (models_0_DeletePublicAccessBlockRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketAccelerateConfigurationOutput ||
          (models_0_GetBucketAccelerateConfigurationOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketAccelerateConfigurationRequest ||
          (models_0_GetBucketAccelerateConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketAclOutput || (models_0_GetBucketAclOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketAclRequest || (models_0_GetBucketAclRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_0_Tag || (models_0_Tag = {})).filterSensitiveLog = function (
          obj
        ) {
          return __assign({}, obj);
        }),
        ((
          models_0_AnalyticsAndOperator || (models_0_AnalyticsAndOperator = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_AnalyticsFilter || (models_0_AnalyticsFilter = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_AnalyticsS3BucketDestination ||
          (models_0_AnalyticsS3BucketDestination = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_AnalyticsExportDestination ||
          (models_0_AnalyticsExportDestination = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_StorageClassAnalysisDataExport ||
          (models_0_StorageClassAnalysisDataExport = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_StorageClassAnalysis || (models_0_StorageClassAnalysis = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_AnalyticsConfiguration ||
          (models_0_AnalyticsConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketAnalyticsConfigurationOutput ||
          (models_0_GetBucketAnalyticsConfigurationOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketAnalyticsConfigurationRequest ||
          (models_0_GetBucketAnalyticsConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_0_CORSRule || (models_0_CORSRule = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_0_GetBucketCorsOutput || (models_0_GetBucketCorsOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketCorsRequest || (models_0_GetBucketCorsRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ServerSideEncryptionByDefault ||
          (models_0_ServerSideEncryptionByDefault = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.KMSMasterKeyID && { KMSMasterKeyID: es.d }
          );
        }),
        ((
          models_0_ServerSideEncryptionRule ||
          (models_0_ServerSideEncryptionRule = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.ApplyServerSideEncryptionByDefault && {
              ApplyServerSideEncryptionByDefault:
                models_0_ServerSideEncryptionByDefault.filterSensitiveLog(
                  obj.ApplyServerSideEncryptionByDefault
                ),
            }
          );
        }),
        ((
          models_0_ServerSideEncryptionConfiguration ||
          (models_0_ServerSideEncryptionConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.Rules && {
              Rules: obj.Rules.map(function (item) {
                return models_0_ServerSideEncryptionRule.filterSensitiveLog(
                  item
                );
              }),
            }
          );
        }),
        ((
          models_0_GetBucketEncryptionOutput ||
          (models_0_GetBucketEncryptionOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.ServerSideEncryptionConfiguration && {
              ServerSideEncryptionConfiguration:
                models_0_ServerSideEncryptionConfiguration.filterSensitiveLog(
                  obj.ServerSideEncryptionConfiguration
                ),
            }
          );
        }),
        ((
          models_0_GetBucketEncryptionRequest ||
          (models_0_GetBucketEncryptionRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_0_SSEKMS || (models_0_SSEKMS = {})).filterSensitiveLog =
          function (obj) {
            return __assign(__assign({}, obj), obj.KeyId && { KeyId: es.d });
          }),
        ((models_0_SSES3 || (models_0_SSES3 = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_0_InventoryEncryption || (models_0_InventoryEncryption = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.SSEKMS && {
              SSEKMS: models_0_SSEKMS.filterSensitiveLog(obj.SSEKMS),
            }
          );
        }),
        ((
          models_0_InventoryS3BucketDestination ||
          (models_0_InventoryS3BucketDestination = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.Encryption && {
              Encryption: models_0_InventoryEncryption.filterSensitiveLog(
                obj.Encryption
              ),
            }
          );
        }),
        ((
          models_0_InventoryDestination || (models_0_InventoryDestination = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.S3BucketDestination && {
              S3BucketDestination:
                models_0_InventoryS3BucketDestination.filterSensitiveLog(
                  obj.S3BucketDestination
                ),
            }
          );
        }),
        ((
          models_0_InventoryFilter || (models_0_InventoryFilter = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_InventorySchedule || (models_0_InventorySchedule = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_InventoryConfiguration ||
          (models_0_InventoryConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.Destination && {
              Destination: models_0_InventoryDestination.filterSensitiveLog(
                obj.Destination
              ),
            }
          );
        }),
        ((
          models_0_GetBucketInventoryConfigurationOutput ||
          (models_0_GetBucketInventoryConfigurationOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.InventoryConfiguration && {
              InventoryConfiguration:
                models_0_InventoryConfiguration.filterSensitiveLog(
                  obj.InventoryConfiguration
                ),
            }
          );
        }),
        ((
          models_0_GetBucketInventoryConfigurationRequest ||
          (models_0_GetBucketInventoryConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_LifecycleExpiration || (models_0_LifecycleExpiration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_LifecycleRuleAndOperator ||
          (models_0_LifecycleRuleAndOperator = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_LifecycleRuleFilter || (models_0_LifecycleRuleFilter = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_NoncurrentVersionExpiration ||
          (models_0_NoncurrentVersionExpiration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_NoncurrentVersionTransition ||
          (models_0_NoncurrentVersionTransition = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_Transition || (models_0_Transition = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_LifecycleRule || (models_0_LifecycleRule = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketLifecycleConfigurationOutput ||
          (models_0_GetBucketLifecycleConfigurationOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketLifecycleConfigurationRequest ||
          (models_0_GetBucketLifecycleConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketLocationOutput ||
          (models_0_GetBucketLocationOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketLocationRequest ||
          (models_0_GetBucketLocationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_TargetGrant || (models_0_TargetGrant = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_LoggingEnabled || (models_0_LoggingEnabled = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketLoggingOutput ||
          (models_0_GetBucketLoggingOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketLoggingRequest ||
          (models_0_GetBucketLoggingRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_MetricsAndOperator || (models_0_MetricsAndOperator = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_MetricsFilter || (models_0_MetricsFilter = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_MetricsConfiguration || (models_0_MetricsConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketMetricsConfigurationOutput ||
          (models_0_GetBucketMetricsConfigurationOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketMetricsConfigurationRequest ||
          (models_0_GetBucketMetricsConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketNotificationConfigurationRequest ||
          (models_0_GetBucketNotificationConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_FilterRule || (models_0_FilterRule = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_S3KeyFilter || (models_0_S3KeyFilter = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_NotificationConfigurationFilter ||
          (models_0_NotificationConfigurationFilter = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_LambdaFunctionConfiguration ||
          (models_0_LambdaFunctionConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_QueueConfiguration || (models_0_QueueConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_TopicConfiguration || (models_0_TopicConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_NotificationConfiguration ||
          (models_0_NotificationConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_OwnershipControlsRule ||
          (models_0_OwnershipControlsRule = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_OwnershipControls || (models_0_OwnershipControls = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketOwnershipControlsOutput ||
          (models_0_GetBucketOwnershipControlsOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketOwnershipControlsRequest ||
          (models_0_GetBucketOwnershipControlsRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketPolicyOutput ||
          (models_0_GetBucketPolicyOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketPolicyRequest ||
          (models_0_GetBucketPolicyRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PolicyStatus || (models_0_PolicyStatus = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketPolicyStatusOutput ||
          (models_0_GetBucketPolicyStatusOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketPolicyStatusRequest ||
          (models_0_GetBucketPolicyStatusRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteMarkerReplication ||
          (models_0_DeleteMarkerReplication = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_EncryptionConfiguration ||
          (models_0_EncryptionConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ReplicationTimeValue || (models_0_ReplicationTimeValue = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_0_Metrics || (models_0_Metrics = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_0_ReplicationTime || (models_0_ReplicationTime = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_Destination || (models_0_Destination = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ExistingObjectReplication ||
          (models_0_ExistingObjectReplication = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ReplicationRuleAndOperator ||
          (models_0_ReplicationRuleAndOperator = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ReplicationRuleFilter ||
          (models_0_ReplicationRuleFilter = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_SseKmsEncryptedObjects ||
          (models_0_SseKmsEncryptedObjects = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_SourceSelectionCriteria ||
          (models_0_SourceSelectionCriteria = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ReplicationRule || (models_0_ReplicationRule = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ReplicationConfiguration ||
          (models_0_ReplicationConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketReplicationOutput ||
          (models_0_GetBucketReplicationOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketReplicationRequest ||
          (models_0_GetBucketReplicationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketRequestPaymentOutput ||
          (models_0_GetBucketRequestPaymentOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketRequestPaymentRequest ||
          (models_0_GetBucketRequestPaymentRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketTaggingOutput ||
          (models_0_GetBucketTaggingOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketTaggingRequest ||
          (models_0_GetBucketTaggingRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketVersioningOutput ||
          (models_0_GetBucketVersioningOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketVersioningRequest ||
          (models_0_GetBucketVersioningRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ErrorDocument || (models_0_ErrorDocument = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_IndexDocument || (models_0_IndexDocument = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_RedirectAllRequestsTo ||
          (models_0_RedirectAllRequestsTo = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_0_Condition || (models_0_Condition = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((models_0_Redirect || (models_0_Redirect = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_0_RoutingRule || (models_0_RoutingRule = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketWebsiteOutput ||
          (models_0_GetBucketWebsiteOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetBucketWebsiteRequest ||
          (models_0_GetBucketWebsiteRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetObjectOutput || (models_0_GetObjectOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.SSEKMSKeyId && { SSEKMSKeyId: es.d }
          );
        }),
        ((
          models_0_GetObjectRequest || (models_0_GetObjectRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.SSECustomerKey && { SSECustomerKey: es.d }
          );
        }),
        ((models_0_NoSuchKey || (models_0_NoSuchKey = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_0_GetObjectAclOutput || (models_0_GetObjectAclOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetObjectAclRequest || (models_0_GetObjectAclRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ObjectLockLegalHold || (models_0_ObjectLockLegalHold = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetObjectLegalHoldOutput ||
          (models_0_GetObjectLegalHoldOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetObjectLegalHoldRequest ||
          (models_0_GetObjectLegalHoldRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DefaultRetention || (models_0_DefaultRetention = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ObjectLockRule || (models_0_ObjectLockRule = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ObjectLockConfiguration ||
          (models_0_ObjectLockConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetObjectLockConfigurationOutput ||
          (models_0_GetObjectLockConfigurationOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetObjectLockConfigurationRequest ||
          (models_0_GetObjectLockConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ObjectLockRetention || (models_0_ObjectLockRetention = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetObjectRetentionOutput ||
          (models_0_GetObjectRetentionOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetObjectRetentionRequest ||
          (models_0_GetObjectRetentionRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetObjectTaggingOutput ||
          (models_0_GetObjectTaggingOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetObjectTaggingRequest ||
          (models_0_GetObjectTaggingRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetObjectTorrentOutput ||
          (models_0_GetObjectTorrentOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetObjectTorrentRequest ||
          (models_0_GetObjectTorrentRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PublicAccessBlockConfiguration ||
          (models_0_PublicAccessBlockConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetPublicAccessBlockOutput ||
          (models_0_GetPublicAccessBlockOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GetPublicAccessBlockRequest ||
          (models_0_GetPublicAccessBlockRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_HeadBucketRequest || (models_0_HeadBucketRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_NoSuchBucket || (models_0_NoSuchBucket = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_HeadObjectOutput || (models_0_HeadObjectOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.SSEKMSKeyId && { SSEKMSKeyId: es.d }
          );
        }),
        ((
          models_0_HeadObjectRequest || (models_0_HeadObjectRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.SSECustomerKey && { SSECustomerKey: es.d }
          );
        }),
        ((
          models_0_ListBucketAnalyticsConfigurationsOutput ||
          (models_0_ListBucketAnalyticsConfigurationsOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ListBucketAnalyticsConfigurationsRequest ||
          (models_0_ListBucketAnalyticsConfigurationsRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ListBucketInventoryConfigurationsOutput ||
          (models_0_ListBucketInventoryConfigurationsOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.InventoryConfigurationList && {
              InventoryConfigurationList: obj.InventoryConfigurationList.map(
                function (item) {
                  return models_0_InventoryConfiguration.filterSensitiveLog(
                    item
                  );
                }
              ),
            }
          );
        }),
        ((
          models_0_ListBucketInventoryConfigurationsRequest ||
          (models_0_ListBucketInventoryConfigurationsRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ListBucketMetricsConfigurationsOutput ||
          (models_0_ListBucketMetricsConfigurationsOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ListBucketMetricsConfigurationsRequest ||
          (models_0_ListBucketMetricsConfigurationsRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_0_Bucket || (models_0_Bucket = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_0_ListBucketsOutput || (models_0_ListBucketsOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_CommonPrefix || (models_0_CommonPrefix = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_0_Initiator || (models_0_Initiator = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_0_MultipartUpload || (models_0_MultipartUpload = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ListMultipartUploadsOutput ||
          (models_0_ListMultipartUploadsOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ListMultipartUploadsRequest ||
          (models_0_ListMultipartUploadsRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_0_Object || (models_0_Object = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_0_ListObjectsOutput || (models_0_ListObjectsOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ListObjectsRequest || (models_0_ListObjectsRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ListObjectsV2Output || (models_0_ListObjectsV2Output = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ListObjectsV2Request || (models_0_ListObjectsV2Request = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_DeleteMarkerEntry || (models_0_DeleteMarkerEntry = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ObjectVersion || (models_0_ObjectVersion = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ListObjectVersionsOutput ||
          (models_0_ListObjectVersionsOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ListObjectVersionsRequest ||
          (models_0_ListObjectVersionsRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_0_Part || (models_0_Part = {})).filterSensitiveLog = function (
          obj
        ) {
          return __assign({}, obj);
        }),
        ((
          models_0_ListPartsOutput || (models_0_ListPartsOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ListPartsRequest || (models_0_ListPartsRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketAccelerateConfigurationRequest ||
          (models_0_PutBucketAccelerateConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketAclRequest || (models_0_PutBucketAclRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketAnalyticsConfigurationRequest ||
          (models_0_PutBucketAnalyticsConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_CORSConfiguration || (models_0_CORSConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketCorsRequest || (models_0_PutBucketCorsRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketEncryptionRequest ||
          (models_0_PutBucketEncryptionRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.ServerSideEncryptionConfiguration && {
              ServerSideEncryptionConfiguration:
                models_0_ServerSideEncryptionConfiguration.filterSensitiveLog(
                  obj.ServerSideEncryptionConfiguration
                ),
            }
          );
        }),
        ((
          models_0_PutBucketInventoryConfigurationRequest ||
          (models_0_PutBucketInventoryConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.InventoryConfiguration && {
              InventoryConfiguration:
                models_0_InventoryConfiguration.filterSensitiveLog(
                  obj.InventoryConfiguration
                ),
            }
          );
        }),
        ((
          models_0_BucketLifecycleConfiguration ||
          (models_0_BucketLifecycleConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketLifecycleConfigurationRequest ||
          (models_0_PutBucketLifecycleConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_BucketLoggingStatus || (models_0_BucketLoggingStatus = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketLoggingRequest ||
          (models_0_PutBucketLoggingRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketMetricsConfigurationRequest ||
          (models_0_PutBucketMetricsConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketNotificationConfigurationRequest ||
          (models_0_PutBucketNotificationConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketOwnershipControlsRequest ||
          (models_0_PutBucketOwnershipControlsRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketPolicyRequest ||
          (models_0_PutBucketPolicyRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketReplicationRequest ||
          (models_0_PutBucketReplicationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_RequestPaymentConfiguration ||
          (models_0_RequestPaymentConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketRequestPaymentRequest ||
          (models_0_PutBucketRequestPaymentRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_0_Tagging || (models_0_Tagging = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_0_PutBucketTaggingRequest ||
          (models_0_PutBucketTaggingRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_VersioningConfiguration ||
          (models_0_VersioningConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketVersioningRequest ||
          (models_0_PutBucketVersioningRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_WebsiteConfiguration || (models_0_WebsiteConfiguration = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutBucketWebsiteRequest ||
          (models_0_PutBucketWebsiteRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutObjectOutput || (models_0_PutObjectOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign(
              __assign({}, obj),
              obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: es.d }
            ),
            obj.SSEKMSKeyId && { SSEKMSKeyId: es.d }
          );
        }),
        ((
          models_0_PutObjectRequest || (models_0_PutObjectRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign(
              __assign(
                __assign({}, obj),
                obj.SSECustomerKey && { SSECustomerKey: es.d }
              ),
              obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: es.d }
            ),
            obj.SSEKMSKeyId && { SSEKMSKeyId: es.d }
          );
        }),
        ((
          models_0_PutObjectAclOutput || (models_0_PutObjectAclOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutObjectAclRequest || (models_0_PutObjectAclRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutObjectLegalHoldOutput ||
          (models_0_PutObjectLegalHoldOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutObjectLegalHoldRequest ||
          (models_0_PutObjectLegalHoldRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutObjectLockConfigurationOutput ||
          (models_0_PutObjectLockConfigurationOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutObjectLockConfigurationRequest ||
          (models_0_PutObjectLockConfigurationRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutObjectRetentionOutput ||
          (models_0_PutObjectRetentionOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutObjectRetentionRequest ||
          (models_0_PutObjectRetentionRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutObjectTaggingOutput ||
          (models_0_PutObjectTaggingOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutObjectTaggingRequest ||
          (models_0_PutObjectTaggingRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_PutPublicAccessBlockRequest ||
          (models_0_PutPublicAccessBlockRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_ObjectAlreadyInActiveTierError ||
          (models_0_ObjectAlreadyInActiveTierError = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_RestoreObjectOutput || (models_0_RestoreObjectOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_GlacierJobParameters || (models_0_GlacierJobParameters = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_Encryption || (models_0_Encryption = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.KMSKeyId && { KMSKeyId: es.d }
          );
        }),
        ((
          models_0_MetadataEntry || (models_0_MetadataEntry = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_S3Location || (models_0_S3Location = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.Encryption && {
              Encryption: models_0_Encryption.filterSensitiveLog(
                obj.Encryption
              ),
            }
          );
        }),
        ((
          models_0_OutputLocation || (models_0_OutputLocation = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.S3 && { S3: models_0_S3Location.filterSensitiveLog(obj.S3) }
          );
        }),
        (function (FileHeaderInfo) {
          (FileHeaderInfo.IGNORE = 'IGNORE'),
            (FileHeaderInfo.NONE = 'NONE'),
            (FileHeaderInfo.USE = 'USE');
        })(FileHeaderInfo || (FileHeaderInfo = {})),
        ((models_0_CSVInput || (models_0_CSVInput = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        (function (JSONType) {
          (JSONType.DOCUMENT = 'DOCUMENT'), (JSONType.LINES = 'LINES');
        })(JSONType || (JSONType = {})),
        ((models_0_JSONInput || (models_0_JSONInput = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_0_ParquetInput || (models_0_ParquetInput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_InputSerialization || (models_0_InputSerialization = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        (function (QuoteFields) {
          (QuoteFields.ALWAYS = 'ALWAYS'), (QuoteFields.ASNEEDED = 'ASNEEDED');
        })(QuoteFields || (QuoteFields = {})),
        ((models_0_CSVOutput || (models_0_CSVOutput = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_0_JSONOutput || (models_0_JSONOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_OutputSerialization || (models_0_OutputSerialization = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_0_SelectParameters || (models_0_SelectParameters = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        });
      var dist_es = __webpack_require__(55),
        tslib_es6 = __webpack_require__(0);
      var XmlNode_XmlNode = (function () {
        function XmlNode(name, children) {
          void 0 === children && (children = []),
            (this.name = name),
            (this.children = children),
            (this.attributes = {});
        }
        return (
          (XmlNode.prototype.withName = function (name) {
            return (this.name = name), this;
          }),
          (XmlNode.prototype.addAttribute = function (name, value) {
            return (this.attributes[name] = value), this;
          }),
          (XmlNode.prototype.addChildNode = function (child) {
            return this.children.push(child), this;
          }),
          (XmlNode.prototype.removeAttribute = function (name) {
            return delete this.attributes[name], this;
          }),
          (XmlNode.prototype.toString = function () {
            var e_1,
              _a,
              hasChildren = Boolean(this.children.length),
              xmlText = '<' + this.name,
              attributes = this.attributes;
            try {
              for (
                var _b = Object(tslib_es6.__values)(Object.keys(attributes)),
                  _c = _b.next();
                !_c.done;
                _c = _b.next()
              ) {
                var attributeName = _c.value,
                  attribute = attributes[attributeName];
                null != attribute &&
                  (xmlText +=
                    ' ' +
                    attributeName +
                    '="' +
                    (('' + attribute)
                      .replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;')
                      .replace(/"/g, '&quot;') +
                      '"'));
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                _c && !_c.done && (_a = _b.return) && _a.call(_b);
              } finally {
                if (e_1) throw e_1.error;
              }
            }
            return (
              xmlText +
              (hasChildren
                ? '>' +
                  this.children
                    .map(function (c) {
                      return c.toString();
                    })
                    .join('') +
                  '</' +
                  this.name +
                  '>'
                : '/>')
            );
          }),
          XmlNode
        );
      })();
      var XmlText_XmlText = (function () {
          function XmlText(value) {
            this.value = value;
          }
          return (
            (XmlText.prototype.toString = function () {
              return (function escapeElement(value) {
                return value
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;');
              })('' + this.value);
            }),
            XmlText
          );
        })(),
        parser = __webpack_require__(633),
        deserializeAws_restXmlAbortMultipartUploadCommandError = function (
          output,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var parsedOutput,
              _a,
              response,
              errorCode,
              _c,
              parsedBody,
              message,
              _d;
            return __generator(this, function (_e) {
              switch (_e.label) {
                case 0:
                  return (
                    (_a = [__assign({}, output)]),
                    (_d = {}),
                    [4, parseBody(output.body, context)]
                  );
                case 1:
                  switch (
                    ((parsedOutput = __assign.apply(
                      void 0,
                      _a.concat([((_d.body = _e.sent()), _d)])
                    )),
                    (errorCode = 'UnknownError'),
                    (errorCode = loadRestXmlErrorCode(
                      output,
                      parsedOutput.body
                    )),
                    errorCode)
                  ) {
                    case 'NoSuchUpload':
                    case 'com.amazonaws.s3#NoSuchUpload':
                      return [3, 2];
                  }
                  return [3, 4];
                case 2:
                  return (
                    (_c = [{}]),
                    [
                      4,
                      deserializeAws_restXmlNoSuchUploadResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 3:
                  return (
                    (response = __assign.apply(void 0, [
                      __assign.apply(void 0, _c.concat([_e.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 5]
                  );
                case 4:
                  (parsedBody = parsedOutput.body),
                    (errorCode =
                      parsedBody.code || parsedBody.Code || errorCode),
                    (response = __assign(__assign({}, parsedBody), {
                      name: '' + errorCode,
                      message:
                        parsedBody.message || parsedBody.Message || errorCode,
                      $fault: 'client',
                      $metadata: deserializeMetadata(output),
                    })),
                    (_e.label = 5);
                case 5:
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
        deserializeAws_restXmlCompleteMultipartUploadCommandError = function (
          output,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var parsedOutput, _a, response, errorCode, parsedBody, message, _b;
            return __generator(this, function (_c) {
              switch (_c.label) {
                case 0:
                  return (
                    (_a = [__assign({}, output)]),
                    (_b = {}),
                    [4, parseBody(output.body, context)]
                  );
                case 1:
                  return (
                    (parsedOutput = __assign.apply(
                      void 0,
                      _a.concat([((_b.body = _c.sent()), _b)])
                    )),
                    (errorCode = 'UnknownError'),
                    (errorCode = loadRestXmlErrorCode(
                      output,
                      parsedOutput.body
                    )),
                    (parsedBody = parsedOutput.body),
                    (errorCode =
                      parsedBody.code || parsedBody.Code || errorCode),
                    (response = __assign(__assign({}, parsedBody), {
                      name: '' + errorCode,
                      message:
                        parsedBody.message || parsedBody.Message || errorCode,
                      $fault: 'client',
                      $metadata: deserializeMetadata(output),
                    })),
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
        deserializeAws_restXmlCreateMultipartUploadCommandError = function (
          output,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var parsedOutput, _a, response, errorCode, parsedBody, message, _b;
            return __generator(this, function (_c) {
              switch (_c.label) {
                case 0:
                  return (
                    (_a = [__assign({}, output)]),
                    (_b = {}),
                    [4, parseBody(output.body, context)]
                  );
                case 1:
                  return (
                    (parsedOutput = __assign.apply(
                      void 0,
                      _a.concat([((_b.body = _c.sent()), _b)])
                    )),
                    (errorCode = 'UnknownError'),
                    (errorCode = loadRestXmlErrorCode(
                      output,
                      parsedOutput.body
                    )),
                    (parsedBody = parsedOutput.body),
                    (errorCode =
                      parsedBody.code || parsedBody.Code || errorCode),
                    (response = __assign(__assign({}, parsedBody), {
                      name: '' + errorCode,
                      message:
                        parsedBody.message || parsedBody.Message || errorCode,
                      $fault: 'client',
                      $metadata: deserializeMetadata(output),
                    })),
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
        deserializeAws_restXmlDeleteObjectCommandError = function (
          output,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var parsedOutput, _a, response, errorCode, parsedBody, message, _b;
            return __generator(this, function (_c) {
              switch (_c.label) {
                case 0:
                  return (
                    (_a = [__assign({}, output)]),
                    (_b = {}),
                    [4, parseBody(output.body, context)]
                  );
                case 1:
                  return (
                    (parsedOutput = __assign.apply(
                      void 0,
                      _a.concat([((_b.body = _c.sent()), _b)])
                    )),
                    (errorCode = 'UnknownError'),
                    (errorCode = loadRestXmlErrorCode(
                      output,
                      parsedOutput.body
                    )),
                    (parsedBody = parsedOutput.body),
                    (errorCode =
                      parsedBody.code || parsedBody.Code || errorCode),
                    (response = __assign(__assign({}, parsedBody), {
                      name: '' + errorCode,
                      message:
                        parsedBody.message || parsedBody.Message || errorCode,
                      $fault: 'client',
                      $metadata: deserializeMetadata(output),
                    })),
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
        deserializeAws_restXmlGetObjectCommandError = function (
          output,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var parsedOutput,
              _a,
              response,
              errorCode,
              _c,
              parsedBody,
              message,
              _d;
            return __generator(this, function (_e) {
              switch (_e.label) {
                case 0:
                  return (
                    (_a = [__assign({}, output)]),
                    (_d = {}),
                    [4, parseBody(output.body, context)]
                  );
                case 1:
                  switch (
                    ((parsedOutput = __assign.apply(
                      void 0,
                      _a.concat([((_d.body = _e.sent()), _d)])
                    )),
                    (errorCode = 'UnknownError'),
                    (errorCode = loadRestXmlErrorCode(
                      output,
                      parsedOutput.body
                    )),
                    errorCode)
                  ) {
                    case 'NoSuchKey':
                    case 'com.amazonaws.s3#NoSuchKey':
                      return [3, 2];
                  }
                  return [3, 4];
                case 2:
                  return (
                    (_c = [{}]),
                    [
                      4,
                      deserializeAws_restXmlNoSuchKeyResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 3:
                  return (
                    (response = __assign.apply(void 0, [
                      __assign.apply(void 0, _c.concat([_e.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 5]
                  );
                case 4:
                  (parsedBody = parsedOutput.body),
                    (errorCode =
                      parsedBody.code || parsedBody.Code || errorCode),
                    (response = __assign(__assign({}, parsedBody), {
                      name: '' + errorCode,
                      message:
                        parsedBody.message || parsedBody.Message || errorCode,
                      $fault: 'client',
                      $metadata: deserializeMetadata(output),
                    })),
                    (_e.label = 5);
                case 5:
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
        deserializeAws_restXmlListObjectsCommandError = function (
          output,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var parsedOutput,
              _a,
              response,
              errorCode,
              _c,
              parsedBody,
              message,
              _d;
            return __generator(this, function (_e) {
              switch (_e.label) {
                case 0:
                  return (
                    (_a = [__assign({}, output)]),
                    (_d = {}),
                    [4, parseBody(output.body, context)]
                  );
                case 1:
                  switch (
                    ((parsedOutput = __assign.apply(
                      void 0,
                      _a.concat([((_d.body = _e.sent()), _d)])
                    )),
                    (errorCode = 'UnknownError'),
                    (errorCode = loadRestXmlErrorCode(
                      output,
                      parsedOutput.body
                    )),
                    errorCode)
                  ) {
                    case 'NoSuchBucket':
                    case 'com.amazonaws.s3#NoSuchBucket':
                      return [3, 2];
                  }
                  return [3, 4];
                case 2:
                  return (
                    (_c = [{}]),
                    [
                      4,
                      deserializeAws_restXmlNoSuchBucketResponse(
                        parsedOutput,
                        context
                      ),
                    ]
                  );
                case 3:
                  return (
                    (response = __assign.apply(void 0, [
                      __assign.apply(void 0, _c.concat([_e.sent()])),
                      {
                        name: errorCode,
                        $metadata: deserializeMetadata(output),
                      },
                    ])),
                    [3, 5]
                  );
                case 4:
                  (parsedBody = parsedOutput.body),
                    (errorCode =
                      parsedBody.code || parsedBody.Code || errorCode),
                    (response = __assign(__assign({}, parsedBody), {
                      name: '' + errorCode,
                      message:
                        parsedBody.message || parsedBody.Message || errorCode,
                      $fault: 'client',
                      $metadata: deserializeMetadata(output),
                    })),
                    (_e.label = 5);
                case 5:
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
        deserializeAws_restXmlListPartsCommandError = function (
          output,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var parsedOutput, _a, response, errorCode, parsedBody, message, _b;
            return __generator(this, function (_c) {
              switch (_c.label) {
                case 0:
                  return (
                    (_a = [__assign({}, output)]),
                    (_b = {}),
                    [4, parseBody(output.body, context)]
                  );
                case 1:
                  return (
                    (parsedOutput = __assign.apply(
                      void 0,
                      _a.concat([((_b.body = _c.sent()), _b)])
                    )),
                    (errorCode = 'UnknownError'),
                    (errorCode = loadRestXmlErrorCode(
                      output,
                      parsedOutput.body
                    )),
                    (parsedBody = parsedOutput.body),
                    (errorCode =
                      parsedBody.code || parsedBody.Code || errorCode),
                    (response = __assign(__assign({}, parsedBody), {
                      name: '' + errorCode,
                      message:
                        parsedBody.message || parsedBody.Message || errorCode,
                      $fault: 'client',
                      $metadata: deserializeMetadata(output),
                    })),
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
        deserializeAws_restXmlPutObjectCommandError = function (
          output,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var parsedOutput, _a, response, errorCode, parsedBody, message, _b;
            return __generator(this, function (_c) {
              switch (_c.label) {
                case 0:
                  return (
                    (_a = [__assign({}, output)]),
                    (_b = {}),
                    [4, parseBody(output.body, context)]
                  );
                case 1:
                  return (
                    (parsedOutput = __assign.apply(
                      void 0,
                      _a.concat([((_b.body = _c.sent()), _b)])
                    )),
                    (errorCode = 'UnknownError'),
                    (errorCode = loadRestXmlErrorCode(
                      output,
                      parsedOutput.body
                    )),
                    (parsedBody = parsedOutput.body),
                    (errorCode =
                      parsedBody.code || parsedBody.Code || errorCode),
                    (response = __assign(__assign({}, parsedBody), {
                      name: '' + errorCode,
                      message:
                        parsedBody.message || parsedBody.Message || errorCode,
                      $fault: 'client',
                      $metadata: deserializeMetadata(output),
                    })),
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
        deserializeAws_restXmlUploadPartCommandError = function (
          output,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var parsedOutput, _a, response, errorCode, parsedBody, message, _b;
            return __generator(this, function (_c) {
              switch (_c.label) {
                case 0:
                  return (
                    (_a = [__assign({}, output)]),
                    (_b = {}),
                    [4, parseBody(output.body, context)]
                  );
                case 1:
                  return (
                    (parsedOutput = __assign.apply(
                      void 0,
                      _a.concat([((_b.body = _c.sent()), _b)])
                    )),
                    (errorCode = 'UnknownError'),
                    (errorCode = loadRestXmlErrorCode(
                      output,
                      parsedOutput.body
                    )),
                    (parsedBody = parsedOutput.body),
                    (errorCode =
                      parsedBody.code || parsedBody.Code || errorCode),
                    (response = __assign(__assign({}, parsedBody), {
                      name: '' + errorCode,
                      message:
                        parsedBody.message || parsedBody.Message || errorCode,
                      $fault: 'client',
                      $metadata: deserializeMetadata(output),
                    })),
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
        deserializeAws_restXmlNoSuchBucketResponse = function (
          parsedOutput,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var contents;
            return __generator(this, function (_a) {
              return (
                (contents = {
                  name: 'NoSuchBucket',
                  $fault: 'client',
                  $metadata: deserializeMetadata(parsedOutput),
                }),
                parsedOutput.body,
                [2, contents]
              );
            });
          });
        },
        deserializeAws_restXmlNoSuchKeyResponse = function (
          parsedOutput,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var contents;
            return __generator(this, function (_a) {
              return (
                (contents = {
                  name: 'NoSuchKey',
                  $fault: 'client',
                  $metadata: deserializeMetadata(parsedOutput),
                }),
                parsedOutput.body,
                [2, contents]
              );
            });
          });
        },
        deserializeAws_restXmlNoSuchUploadResponse = function (
          parsedOutput,
          context
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var contents;
            return __generator(this, function (_a) {
              return (
                (contents = {
                  name: 'NoSuchUpload',
                  $fault: 'client',
                  $metadata: deserializeMetadata(parsedOutput),
                }),
                parsedOutput.body,
                [2, contents]
              );
            });
          });
        },
        serializeAws_restXmlCompletedMultipartUpload = function (
          input,
          context
        ) {
          var bodyNode = new XmlNode_XmlNode('CompletedMultipartUpload');
          void 0 !== input.Parts &&
            serializeAws_restXmlCompletedPartList(input.Parts, context).map(
              function (node) {
                (node = node.withName('Part')), bodyNode.addChildNode(node);
              }
            );
          return bodyNode;
        },
        serializeAws_restXmlCompletedPartList = function (input, context) {
          return input.map(function (entry) {
            return (function (input, context) {
              var bodyNode = new XmlNode_XmlNode('CompletedPart');
              if (void 0 !== input.ETag) {
                var node = new XmlNode_XmlNode('ETag')
                  .addChildNode(new XmlText_XmlText(input.ETag))
                  .withName('ETag');
                bodyNode.addChildNode(node);
              }
              if (void 0 !== input.PartNumber) {
                node = new XmlNode_XmlNode('PartNumber')
                  .addChildNode(new XmlText_XmlText(String(input.PartNumber)))
                  .withName('PartNumber');
                bodyNode.addChildNode(node);
              }
              return bodyNode;
            })(entry).withName('member');
          });
        },
        deserializeAws_restXmlCommonPrefixList = function (output, context) {
          return (output || []).map(function (entry) {
            return (function (output, context) {
              var contents = { Prefix: void 0 };
              return (
                void 0 !== output.Prefix && (contents.Prefix = output.Prefix),
                contents
              );
            })(entry);
          });
        },
        deserializeAws_restXmlInitiator = function (output, context) {
          var contents = { ID: void 0, DisplayName: void 0 };
          return (
            void 0 !== output.ID && (contents.ID = output.ID),
            void 0 !== output.DisplayName &&
              (contents.DisplayName = output.DisplayName),
            contents
          );
        },
        deserializeAws_restXmlObjectList = function (output, context) {
          return (output || []).map(function (entry) {
            return (function (output, context) {
              var contents = {
                Size: void 0,
                ETag: void 0,
                Owner: void 0,
                StorageClass: void 0,
                Key: void 0,
                LastModified: void 0,
              };
              return (
                void 0 !== output.Size &&
                  (contents.Size = parseInt(output.Size)),
                void 0 !== output.ETag && (contents.ETag = output.ETag),
                void 0 !== output.Owner &&
                  (contents.Owner = deserializeAws_restXmlOwner(
                    output.Owner,
                    context
                  )),
                void 0 !== output.StorageClass &&
                  (contents.StorageClass = output.StorageClass),
                void 0 !== output.Key && (contents.Key = output.Key),
                void 0 !== output.LastModified &&
                  (contents.LastModified = new Date(output.LastModified)),
                contents
              );
            })(entry, context);
          });
        },
        deserializeAws_restXmlOwner = function (output, context) {
          var contents = { DisplayName: void 0, ID: void 0 };
          return (
            void 0 !== output.DisplayName &&
              (contents.DisplayName = output.DisplayName),
            void 0 !== output.ID && (contents.ID = output.ID),
            contents
          );
        },
        deserializeAws_restXmlParts = function (output, context) {
          return (output || []).map(function (entry) {
            return (function (output, context) {
              var contents = {
                Size: void 0,
                LastModified: void 0,
                PartNumber: void 0,
                ETag: void 0,
              };
              return (
                void 0 !== output.Size &&
                  (contents.Size = parseInt(output.Size)),
                void 0 !== output.LastModified &&
                  (contents.LastModified = new Date(output.LastModified)),
                void 0 !== output.PartNumber &&
                  (contents.PartNumber = parseInt(output.PartNumber)),
                void 0 !== output.ETag && (contents.ETag = output.ETag),
                contents
              );
            })(entry);
          });
        },
        deserializeMetadata = function (output) {
          return {
            httpStatusCode: output.statusCode,
            httpHeaders: output.headers,
            requestId: output.headers['x-amzn-requestid'],
          };
        },
        collectBody = function (streamBody, context) {
          return (
            void 0 === streamBody && (streamBody = new Uint8Array()),
            streamBody instanceof Uint8Array
              ? Promise.resolve(streamBody)
              : context.streamCollector(streamBody) ||
                Promise.resolve(new Uint8Array())
          );
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
          return (function (streamBody, context) {
            return collectBody(streamBody, context).then(function (body) {
              return context.utf8Encoder(body);
            });
          })(streamBody, context).then(function (encoded) {
            if (encoded.length) {
              var parsedObj = Object(parser.parse)(encoded, {
                  attributeNamePrefix: '',
                  ignoreAttributes: !1,
                  parseNodeValue: !1,
                  tagValueProcessor: function (val, tagName) {
                    return val
                      .replace(/&amp;/g, '&')
                      .replace(/&apos;/g, "'")
                      .replace(/&quot;/g, '"')
                      .replace(/&gt;/g, '>')
                      .replace(/&lt;/g, '<');
                  },
                }),
                key = Object.keys(parsedObj)[0],
                parsedObjToReturn = parsedObj[key];
              return (
                parsedObjToReturn['#text'] &&
                  ((parsedObjToReturn[key] = parsedObjToReturn['#text']),
                  delete parsedObjToReturn['#text']),
                Object(es.h)(parsedObjToReturn)
              );
            }
            return {};
          });
        },
        loadRestXmlErrorCode = function (output, data) {
          return void 0 !== data.Code
            ? data.Code
            : 404 == output.statusCode
            ? 'NotFound'
            : '';
        },
        validate = function (str) {
          return (
            'string' == typeof str &&
            0 === str.indexOf('arn:') &&
            str.split(':').length >= 6
          );
        },
        DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/,
        IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/,
        DOTS_PATTERN = /\.\./,
        DOT_PATTERN = /\./,
        S3_HOSTNAME_PATTERN = /^(.+\.)?s3[.-]([a-z0-9-]+)\./,
        S3_US_EAST_1_ALTNAME_PATTERN = /^s3(-external-1)?\.amazonaws\.com$/,
        getPseudoRegion = function (region) {
          return isFipsRegion(region)
            ? region.replace(/fips-|-fips/, '')
            : region;
        },
        getRegionalSuffix = function (hostname) {
          var parts = hostname.match(S3_HOSTNAME_PATTERN);
          return [parts[2], hostname.replace(new RegExp('^' + parts[0]), '')];
        },
        isFipsRegion = function (region) {
          return region.startsWith('fips-') || region.endsWith('-fips');
        },
        isEqualRegions = function (regionA, regionB) {
          return (
            regionA === regionB ||
            getPseudoRegion(regionA) === regionB ||
            regionA === getPseudoRegion(regionB)
          );
        },
        validateDNSHostLabel = function (label, options) {
          if (
            (void 0 === options && (options = { tlsCompatible: !0 }),
            label.length >= 64 ||
              !/^[a-z0-9][a-z0-9.-]+[a-z0-9]$/.test(label) ||
              /(\d+\.){3}\d+/.test(label) ||
              /[.-]{2}/.test(label) ||
              ((null == options ? void 0 : options.tlsCompatible) &&
                DOT_PATTERN.test(label)))
          )
            throw new Error('Invalid DNS label ' + label);
        },
        bucketHostname = function (options) {
          var baseHostname = options.baseHostname;
          return S3_HOSTNAME_PATTERN.test(baseHostname)
            ? (function (options) {
                return 'string' == typeof options.bucketName;
              })(options)
              ? getEndpointFromBucketName(options)
              : getEndpointFromArn(options)
            : { bucketEndpoint: !1, hostname: baseHostname };
        },
        getEndpointFromArn = function (options) {
          var hostname,
            _a = Object(tslib_es6.__read)(
              ((hostname = options.baseHostname),
              S3_US_EAST_1_ALTNAME_PATTERN.test(hostname)
                ? [hostname.replace('.amazonaws.com', ''), 'amazonaws.com']
                : getRegionalSuffix(hostname)),
              2
            ),
            clientRegion = _a[0],
            hostnameSuffix = _a[1],
            pathStyleEndpoint = options.pathStyleEndpoint,
            _b = options.dualstackEndpoint,
            dualstackEndpoint = void 0 !== _b && _b,
            _c = options.accelerateEndpoint,
            accelerateEndpoint = void 0 !== _c && _c,
            _d = options.tlsCompatible,
            tlsCompatible = void 0 === _d || _d,
            useArnRegion = options.useArnRegion,
            bucketName = options.bucketName,
            _e = options.clientPartition,
            clientPartition = void 0 === _e ? 'aws' : _e,
            _f = options.clientSigningRegion,
            clientSigningRegion = void 0 === _f ? clientRegion : _f;
          !(function (options) {
            if (options.pathStyleEndpoint)
              throw new Error(
                'Path-style S3 endpoint is not supported when bucket is an ARN'
              );
            if (options.accelerateEndpoint)
              throw new Error(
                'Accelerate endpoint is not supported when bucket is an ARN'
              );
            if (!options.tlsCompatible)
              throw new Error('HTTPS is required when bucket is an ARN');
          })({
            pathStyleEndpoint: pathStyleEndpoint,
            accelerateEndpoint: accelerateEndpoint,
            tlsCompatible: tlsCompatible,
          });
          var service = bucketName.service,
            partition = bucketName.partition,
            accountId = bucketName.accountId,
            region = bucketName.region,
            resource = bucketName.resource;
          !(function (service) {
            if ('s3' !== service && 's3-outposts' !== service)
              throw new Error(
                "Expect 's3' or 's3-outposts' in ARN service component"
              );
          })(service),
            (function (partition, options) {
              if (partition !== options.clientPartition)
                throw new Error(
                  'Partition in ARN is incompatible, got "' +
                    partition +
                    '" but expected "' +
                    options.clientPartition +
                    '"'
                );
            })(partition, { clientPartition: clientPartition }),
            (function (accountId) {
              if (!/[0-9]{12}/.exec(accountId))
                throw new Error(
                  "Access point ARN accountID does not match regex '[0-9]{12}'"
                );
            })(accountId),
            (function (region, options) {
              if ('' === region) throw new Error('ARN region is empty');
              if (
                !options.useArnRegion &&
                !isEqualRegions(region, options.clientRegion) &&
                !isEqualRegions(region, options.clientSigningRegion)
              )
                throw new Error(
                  'Region in ARN is incompatible, got ' +
                    region +
                    ' but expected ' +
                    options.clientRegion
                );
              if (options.useArnRegion && isFipsRegion(region))
                throw new Error('Endpoint does not support FIPS region');
            })(region, {
              useArnRegion: useArnRegion,
              clientRegion: clientRegion,
              clientSigningRegion: clientSigningRegion,
            });
          var _g = (function (resource) {
              var delimiter = resource.includes(':') ? ':' : '/',
                _a = Object(tslib_es6.__read)(resource.split(delimiter)),
                resourceType = _a[0],
                rest = _a.slice(1);
              if ('accesspoint' === resourceType) {
                if (1 !== rest.length || '' === rest[0])
                  throw new Error(
                    'Access Point ARN should have one resource accesspoint' +
                      delimiter +
                      '{accesspointname}'
                  );
                return { accesspointName: rest[0] };
              }
              if ('outpost' === resourceType) {
                if (
                  !rest[0] ||
                  'accesspoint' !== rest[1] ||
                  !rest[2] ||
                  3 !== rest.length
                )
                  throw new Error(
                    'Outpost ARN should have resource outpost' +
                      delimiter +
                      '{outpostId}' +
                      delimiter +
                      'accesspoint' +
                      delimiter +
                      '{accesspointName}'
                  );
                var _b = Object(tslib_es6.__read)(rest, 3),
                  outpostId = _b[0];
                _b[1];
                return { outpostId: outpostId, accesspointName: _b[2] };
              }
              throw new Error(
                "ARN resource should begin with 'accesspoint" +
                  delimiter +
                  "' or 'outpost" +
                  delimiter +
                  "'"
              );
            })(resource),
            accesspointName = _g.accesspointName,
            outpostId = _g.outpostId;
          validateDNSHostLabel(accesspointName + '-' + accountId, {
            tlsCompatible: tlsCompatible,
          });
          var endpointRegion = useArnRegion ? region : clientRegion,
            signingRegion = useArnRegion ? region : clientSigningRegion;
          return outpostId
            ? ((function (service) {
                if ('s3-outposts' !== service)
                  throw new Error(
                    "Expect 's3-posts' in Outpost ARN service component"
                  );
              })(service),
              validateDNSHostLabel(outpostId, { tlsCompatible: tlsCompatible }),
              (function (dualstackEndpoint) {
                if (dualstackEndpoint)
                  throw new Error(
                    'Dualstack endpoint is not supported with Outpost'
                  );
              })(dualstackEndpoint),
              (function (region) {
                if (isFipsRegion(null != region ? region : ''))
                  throw new Error(
                    'FIPS region is not supported with Outpost, got ' + region
                  );
              })(endpointRegion),
              {
                bucketEndpoint: !0,
                hostname:
                  accesspointName +
                  '-' +
                  accountId +
                  '.' +
                  outpostId +
                  '.s3-outposts.' +
                  endpointRegion +
                  '.' +
                  hostnameSuffix,
                signingRegion: signingRegion,
                signingService: 's3-outposts',
              })
            : ((function (service) {
                if ('s3' !== service)
                  throw new Error(
                    "Expect 's3' in Accesspoint ARN service component"
                  );
              })(service),
              {
                bucketEndpoint: !0,
                hostname:
                  accesspointName +
                  '-' +
                  accountId +
                  '.s3-accesspoint' +
                  (dualstackEndpoint ? '.dualstack' : '') +
                  '.' +
                  endpointRegion +
                  '.' +
                  hostnameSuffix,
                signingRegion: signingRegion,
              });
        },
        getEndpointFromBucketName = function (_a) {
          var hostname,
            _b = _a.accelerateEndpoint,
            accelerateEndpoint = void 0 !== _b && _b,
            baseHostname = _a.baseHostname,
            bucketName = _a.bucketName,
            _c = _a.dualstackEndpoint,
            dualstackEndpoint = void 0 !== _c && _c,
            _d = _a.pathStyleEndpoint,
            pathStyleEndpoint = void 0 !== _d && _d,
            _e = _a.tlsCompatible,
            tlsCompatible = void 0 === _e || _e,
            _f = Object(tslib_es6.__read)(
              ((hostname = baseHostname),
              S3_US_EAST_1_ALTNAME_PATTERN.test(hostname)
                ? ['us-east-1', 'amazonaws.com']
                : getRegionalSuffix(hostname)),
              2
            ),
            clientRegion = _f[0],
            hostnameSuffix = _f[1];
          return pathStyleEndpoint ||
            !(function (bucketName) {
              return (
                DOMAIN_PATTERN.test(bucketName) &&
                !IP_ADDRESS_PATTERN.test(bucketName) &&
                !DOTS_PATTERN.test(bucketName)
              );
            })(bucketName) ||
            (tlsCompatible && DOT_PATTERN.test(bucketName))
            ? {
                bucketEndpoint: !1,
                hostname: dualstackEndpoint
                  ? 's3.dualstack.' + clientRegion + '.' + hostnameSuffix
                  : baseHostname,
              }
            : (accelerateEndpoint
                ? (baseHostname =
                    's3-accelerate' +
                    (dualstackEndpoint ? '.dualstack' : '') +
                    '.' +
                    hostnameSuffix)
                : dualstackEndpoint &&
                  (baseHostname =
                    's3.dualstack.' + clientRegion + '.' + hostnameSuffix),
              {
                bucketEndpoint: !0,
                hostname: bucketName + '.' + baseHostname,
              });
        },
        bucketEndpointMiddleware = function (options) {
          return function (next, context) {
            return function (args) {
              return Object(tslib_es6.__awaiter)(
                void 0,
                void 0,
                void 0,
                function () {
                  var bucketName,
                    replaceBucketInPath,
                    request,
                    bucketArn,
                    clientRegion,
                    _a,
                    _b,
                    partition,
                    _c,
                    signingRegion,
                    useArnRegion,
                    _d,
                    modifiedSigningRegion,
                    signingService,
                    _e,
                    hostname,
                    bucketEndpoint;
                  return Object(tslib_es6.__generator)(this, function (_f) {
                    switch (_f.label) {
                      case 0:
                        return (
                          (bucketName = args.input.Bucket),
                          (replaceBucketInPath = options.bucketEndpoint),
                          (request = args.request),
                          dist_es.a.isInstance(request)
                            ? options.bucketEndpoint
                              ? ((request.hostname = bucketName), [3, 6])
                              : [3, 1]
                            : [3, 7]
                        );
                      case 1:
                        return validate(bucketName)
                          ? ((bucketArn = (function (arn) {
                              var segments = arn.split(':');
                              if (segments.length < 6 || 'arn' !== segments[0])
                                throw new Error('Malformed ARN');
                              var _a = Object(tslib_es6.__read)(segments);
                              return {
                                partition: _a[1],
                                service: _a[2],
                                region: _a[3],
                                accountId: _a[4],
                                resource: _a.slice(5).join(':'),
                              };
                            })(bucketName)),
                            (_a = getPseudoRegion),
                            [4, options.region()])
                          : [3, 5];
                      case 2:
                        return (
                          (clientRegion = _a.apply(void 0, [_f.sent()])),
                          [4, options.regionInfoProvider(clientRegion)]
                        );
                      case 3:
                        return (
                          (_b = _f.sent() || {}),
                          (partition = _b.partition),
                          (_c = _b.signingRegion),
                          (signingRegion = void 0 === _c ? clientRegion : _c),
                          [4, options.useArnRegion()]
                        );
                      case 4:
                        return (
                          (useArnRegion = _f.sent()),
                          (_d = bucketHostname({
                            bucketName: bucketArn,
                            baseHostname: request.hostname,
                            accelerateEndpoint: options.useAccelerateEndpoint,
                            dualstackEndpoint: options.useDualstackEndpoint,
                            pathStyleEndpoint: options.forcePathStyle,
                            tlsCompatible: 'https:' === request.protocol,
                            useArnRegion: useArnRegion,
                            clientPartition: partition,
                            clientSigningRegion: signingRegion,
                          })),
                          (hostname = _d.hostname),
                          (bucketEndpoint = _d.bucketEndpoint),
                          (modifiedSigningRegion = _d.signingRegion),
                          (signingService = _d.signingService),
                          modifiedSigningRegion &&
                            modifiedSigningRegion !== signingRegion &&
                            (context.signing_region = modifiedSigningRegion),
                          signingService &&
                            's3' !== signingService &&
                            (context.signing_service = signingService),
                          (request.hostname = hostname),
                          (replaceBucketInPath = bucketEndpoint),
                          [3, 6]
                        );
                      case 5:
                        (_e = bucketHostname({
                          bucketName: bucketName,
                          baseHostname: request.hostname,
                          accelerateEndpoint: options.useAccelerateEndpoint,
                          dualstackEndpoint: options.useDualstackEndpoint,
                          pathStyleEndpoint: options.forcePathStyle,
                          tlsCompatible: 'https:' === request.protocol,
                        })),
                          (hostname = _e.hostname),
                          (bucketEndpoint = _e.bucketEndpoint),
                          (request.hostname = hostname),
                          (replaceBucketInPath = bucketEndpoint),
                          (_f.label = 6);
                      case 6:
                        replaceBucketInPath &&
                          ((request.path = request.path.replace(
                            /^(\/)?[^\/]+/,
                            ''
                          )),
                          '' === request.path && (request.path = '/')),
                          (_f.label = 7);
                      case 7:
                        return [
                          2,
                          next(
                            Object(tslib_es6.__assign)(
                              Object(tslib_es6.__assign)({}, args),
                              { request: request }
                            )
                          ),
                        ];
                    }
                  });
                }
              );
            };
          };
        },
        bucketEndpointMiddlewareOptions = {
          tags: ['BUCKET_ENDPOINT'],
          name: 'bucketEndpointMiddleware',
          relation: 'before',
          toMiddleware: 'hostHeaderMiddleware',
        },
        getBucketEndpointPlugin = function (options) {
          return {
            applyToStack: function (clientStack) {
              clientStack.addRelativeTo(
                bucketEndpointMiddleware(options),
                bucketEndpointMiddlewareOptions
              );
            },
          };
        };
      var middleware_serde_dist_es = __webpack_require__(236);
      for (
        var ssecMiddlewareOptions = {
            name: 'ssecMiddleware',
            step: 'initialize',
            tags: ['SSE'],
          },
          getSsecPlugin = function (config) {
            return {
              applyToStack: function (clientStack) {
                clientStack.add(
                  (function ssecMiddleware(options) {
                    var _this = this;
                    return function (next) {
                      return function (args) {
                        return Object(tslib_es6.__awaiter)(
                          _this,
                          void 0,
                          void 0,
                          function () {
                            var input,
                              properties,
                              properties_1,
                              properties_1_1,
                              prop,
                              value,
                              valueView,
                              encoded,
                              hash,
                              _a,
                              _b,
                              _c,
                              _d,
                              e_1_1,
                              e_1,
                              _e,
                              _f;
                            return Object(tslib_es6.__generator)(
                              this,
                              function (_g) {
                                switch (_g.label) {
                                  case 0:
                                    (input = Object(tslib_es6.__assign)(
                                      {},
                                      args.input
                                    )),
                                      (properties = [
                                        {
                                          target: 'SSECustomerKey',
                                          hash: 'SSECustomerKeyMD5',
                                        },
                                        {
                                          target: 'CopySourceSSECustomerKey',
                                          hash: 'CopySourceSSECustomerKeyMD5',
                                        },
                                      ]),
                                      (_g.label = 1);
                                  case 1:
                                    _g.trys.push([1, 6, 7, 8]),
                                      (properties_1 = Object(
                                        tslib_es6.__values
                                      )(properties)),
                                      (properties_1_1 = properties_1.next()),
                                      (_g.label = 2);
                                  case 2:
                                    return properties_1_1.done
                                      ? [3, 5]
                                      : ((prop = properties_1_1.value),
                                        (value = input[prop.target])
                                          ? ((valueView = ArrayBuffer.isView(
                                              value
                                            )
                                              ? new Uint8Array(
                                                  value.buffer,
                                                  value.byteOffset,
                                                  value.byteLength
                                                )
                                              : 'string' == typeof value
                                              ? options.utf8Decoder(value)
                                              : new Uint8Array(value)),
                                            (encoded =
                                              options.base64Encoder(valueView)),
                                            (hash = new options.md5()).update(
                                              valueView
                                            ),
                                            (_a = [
                                              Object(tslib_es6.__assign)(
                                                {},
                                                input
                                              ),
                                            ]),
                                            ((_f = {})[prop.target] = encoded),
                                            (_b = prop.hash),
                                            (_d = (_c = options).base64Encoder),
                                            [4, hash.digest()])
                                          : [3, 4]);
                                  case 3:
                                    (input = tslib_es6.__assign.apply(
                                      void 0,
                                      _a.concat([
                                        ((_f[_b] = _d.apply(_c, [_g.sent()])),
                                        _f),
                                      ])
                                    )),
                                      (_g.label = 4);
                                  case 4:
                                    return (
                                      (properties_1_1 = properties_1.next()),
                                      [3, 2]
                                    );
                                  case 5:
                                    return [3, 8];
                                  case 6:
                                    return (
                                      (e_1_1 = _g.sent()),
                                      (e_1 = { error: e_1_1 }),
                                      [3, 8]
                                    );
                                  case 7:
                                    try {
                                      properties_1_1 &&
                                        !properties_1_1.done &&
                                        (_e = properties_1.return) &&
                                        _e.call(properties_1);
                                    } finally {
                                      if (e_1) throw e_1.error;
                                    }
                                    return [7];
                                  case 8:
                                    return [
                                      2,
                                      next(
                                        Object(tslib_es6.__assign)(
                                          Object(tslib_es6.__assign)({}, args),
                                          { input: input }
                                        )
                                      ),
                                    ];
                                }
                              }
                            );
                          }
                        );
                      };
                    };
                  })(config),
                  ssecMiddlewareOptions
                );
              },
            };
          },
          GetObjectCommand_GetObjectCommand = (function (_super) {
            function GetObjectCommand(input) {
              var _this = _super.call(this) || this;
              return (_this.input = input), _this;
            }
            return (
              __extends(GetObjectCommand, _super),
              (GetObjectCommand.prototype.resolveMiddleware = function (
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
                ),
                  this.middlewareStack.use(getSsecPlugin(configuration)),
                  this.middlewareStack.use(
                    getBucketEndpointPlugin(configuration)
                  );
                var stack = clientStack.concat(this.middlewareStack),
                  logger = configuration.logger,
                  handlerExecutionContext = {
                    logger: logger,
                    clientName: 'S3Client',
                    commandName: 'GetObjectCommand',
                    inputFilterSensitiveLog:
                      models_0_GetObjectRequest.filterSensitiveLog,
                    outputFilterSensitiveLog:
                      models_0_GetObjectOutput.filterSensitiveLog,
                  };
                'function' == typeof logger.info &&
                  logger.info({
                    clientName: 'S3Client',
                    commandName: 'GetObjectCommand',
                  });
                var requestHandler = configuration.requestHandler;
                return stack.resolve(function (request) {
                  return requestHandler.handle(request.request, options || {});
                }, handlerExecutionContext);
              }),
              (GetObjectCommand.prototype.serialize = function (
                input,
                context
              ) {
                return (function (input, context) {
                  return __awaiter(void 0, void 0, void 0, function () {
                    var headers,
                      resolvedPath,
                      labelValue,
                      query,
                      _a,
                      hostname,
                      _b,
                      protocol,
                      port;
                    return __generator(this, function (_c) {
                      switch (_c.label) {
                        case 0:
                          if (
                            ((headers = __assign(
                              __assign(
                                __assign(
                                  __assign(
                                    __assign(
                                      __assign(
                                        __assign(
                                          __assign(
                                            __assign(
                                              __assign(
                                                { 'Content-Type': '' },
                                                isSerializableHeaderValue(
                                                  input.SSECustomerKey
                                                ) && {
                                                  'x-amz-server-side-encryption-customer-key':
                                                    input.SSECustomerKey,
                                                }
                                              ),
                                              isSerializableHeaderValue(
                                                input.SSECustomerAlgorithm
                                              ) && {
                                                'x-amz-server-side-encryption-customer-algorithm':
                                                  input.SSECustomerAlgorithm,
                                              }
                                            ),
                                            isSerializableHeaderValue(
                                              input.SSECustomerKeyMD5
                                            ) && {
                                              'x-amz-server-side-encryption-customer-key-MD5':
                                                input.SSECustomerKeyMD5,
                                            }
                                          ),
                                          isSerializableHeaderValue(
                                            input.RequestPayer
                                          ) && {
                                            'x-amz-request-payer':
                                              input.RequestPayer,
                                          }
                                        ),
                                        isSerializableHeaderValue(
                                          input.ExpectedBucketOwner
                                        ) && {
                                          'x-amz-expected-bucket-owner':
                                            input.ExpectedBucketOwner,
                                        }
                                      ),
                                      isSerializableHeaderValue(
                                        input.IfUnmodifiedSince
                                      ) && {
                                        'If-Unmodified-Since': Object(es.e)(
                                          input.IfUnmodifiedSince
                                        ).toString(),
                                      }
                                    ),
                                    isSerializableHeaderValue(
                                      input.IfModifiedSince
                                    ) && {
                                      'If-Modified-Since': Object(es.e)(
                                        input.IfModifiedSince
                                      ).toString(),
                                    }
                                  ),
                                  isSerializableHeaderValue(
                                    input.IfNoneMatch
                                  ) && { 'If-None-Match': input.IfNoneMatch }
                                ),
                                isSerializableHeaderValue(input.IfMatch) && {
                                  'If-Match': input.IfMatch,
                                }
                              ),
                              isSerializableHeaderValue(input.Range) && {
                                Range: input.Range,
                              }
                            )),
                            (resolvedPath = '/{Bucket}/{Key+}'),
                            void 0 === input.Bucket)
                          )
                            throw new Error(
                              'No value provided for input HTTP label: Bucket.'
                            );
                          if ((labelValue = input.Bucket).length <= 0)
                            throw new Error(
                              'Empty value provided for input HTTP label: Bucket.'
                            );
                          if (
                            ((resolvedPath = resolvedPath.replace(
                              '{Bucket}',
                              Object(es.f)(labelValue)
                            )),
                            void 0 === input.Key)
                          )
                            throw new Error(
                              'No value provided for input HTTP label: Key.'
                            );
                          if ((labelValue = input.Key).length <= 0)
                            throw new Error(
                              'Empty value provided for input HTTP label: Key.'
                            );
                          return (
                            (resolvedPath = resolvedPath.replace(
                              '{Key+}',
                              labelValue
                                .split('/')
                                .map(function (segment) {
                                  return Object(es.f)(segment);
                                })
                                .join('/')
                            )),
                            (query = __assign(
                              __assign(
                                __assign(
                                  __assign(
                                    __assign(
                                      __assign(
                                        __assign(
                                          __assign(
                                            { 'x-id': 'GetObject' },
                                            void 0 !==
                                              input.ResponseContentEncoding && {
                                              'response-content-encoding':
                                                input.ResponseContentEncoding,
                                            }
                                          ),
                                          void 0 !==
                                            input.ResponseCacheControl && {
                                            'response-cache-control':
                                              input.ResponseCacheControl,
                                          }
                                        ),
                                        void 0 !==
                                          input.ResponseContentLanguage && {
                                          'response-content-language':
                                            input.ResponseContentLanguage,
                                        }
                                      ),
                                      void 0 !==
                                        input.ResponseContentDisposition && {
                                        'response-content-disposition':
                                          input.ResponseContentDisposition,
                                      }
                                    ),
                                    void 0 !== input.PartNumber && {
                                      partNumber: input.PartNumber.toString(),
                                    }
                                  ),
                                  void 0 !== input.VersionId && {
                                    versionId: input.VersionId,
                                  }
                                ),
                                void 0 !== input.ResponseExpires && {
                                  'response-expires': (
                                    input.ResponseExpires.toISOString().split(
                                      '.'
                                    )[0] + 'Z'
                                  ).toString(),
                                }
                              ),
                              void 0 !== input.ResponseContentType && {
                                'response-content-type':
                                  input.ResponseContentType,
                              }
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
                              new dist_es.a({
                                protocol: protocol,
                                hostname: hostname,
                                port: port,
                                method: 'GET',
                                headers: headers,
                                path: resolvedPath,
                                query: query,
                                body: void 0,
                              }),
                            ]
                          );
                      }
                    });
                  });
                })(input, context);
              }),
              (GetObjectCommand.prototype.deserialize = function (
                output,
                context
              ) {
                return (function (output, context) {
                  return __awaiter(void 0, void 0, void 0, function () {
                    var contents, data;
                    return __generator(this, function (_a) {
                      return 200 !== output.statusCode &&
                        output.statusCode >= 300
                        ? [
                            2,
                            deserializeAws_restXmlGetObjectCommandError(
                              output,
                              context
                            ),
                          ]
                        : ((contents = {
                            $metadata: deserializeMetadata(output),
                            AcceptRanges: void 0,
                            Body: void 0,
                            CacheControl: void 0,
                            ContentDisposition: void 0,
                            ContentEncoding: void 0,
                            ContentLanguage: void 0,
                            ContentLength: void 0,
                            ContentRange: void 0,
                            ContentType: void 0,
                            DeleteMarker: void 0,
                            ETag: void 0,
                            Expiration: void 0,
                            Expires: void 0,
                            LastModified: void 0,
                            Metadata: void 0,
                            MissingMeta: void 0,
                            ObjectLockLegalHoldStatus: void 0,
                            ObjectLockMode: void 0,
                            ObjectLockRetainUntilDate: void 0,
                            PartsCount: void 0,
                            ReplicationStatus: void 0,
                            RequestCharged: void 0,
                            Restore: void 0,
                            SSECustomerAlgorithm: void 0,
                            SSECustomerKeyMD5: void 0,
                            SSEKMSKeyId: void 0,
                            ServerSideEncryption: void 0,
                            StorageClass: void 0,
                            TagCount: void 0,
                            VersionId: void 0,
                            WebsiteRedirectLocation: void 0,
                          }),
                          void 0 !== output.headers['x-amz-object-lock-mode'] &&
                            (contents.ObjectLockMode =
                              output.headers['x-amz-object-lock-mode']),
                          void 0 !== output.headers['content-language'] &&
                            (contents.ContentLanguage =
                              output.headers['content-language']),
                          void 0 !== output.headers['content-disposition'] &&
                            (contents.ContentDisposition =
                              output.headers['content-disposition']),
                          void 0 !== output.headers['cache-control'] &&
                            (contents.CacheControl =
                              output.headers['cache-control']),
                          void 0 !== output.headers['content-type'] &&
                            (contents.ContentType =
                              output.headers['content-type']),
                          void 0 !== output.headers['content-range'] &&
                            (contents.ContentRange =
                              output.headers['content-range']),
                          void 0 !==
                            output.headers[
                              'x-amz-server-side-encryption-aws-kms-key-id'
                            ] &&
                            (contents.SSEKMSKeyId =
                              output.headers[
                                'x-amz-server-side-encryption-aws-kms-key-id'
                              ]),
                          void 0 !== output.headers['content-length'] &&
                            (contents.ContentLength = parseInt(
                              output.headers['content-length'],
                              10
                            )),
                          void 0 !==
                            output.headers[
                              'x-amz-object-lock-retain-until-date'
                            ] &&
                            (contents.ObjectLockRetainUntilDate = new Date(
                              output.headers[
                                'x-amz-object-lock-retain-until-date'
                              ]
                            )),
                          void 0 !==
                            output.headers['x-amz-object-lock-legal-hold'] &&
                            (contents.ObjectLockLegalHoldStatus =
                              output.headers['x-amz-object-lock-legal-hold']),
                          void 0 !== output.headers['x-amz-delete-marker'] &&
                            (contents.DeleteMarker =
                              'true' === output.headers['x-amz-delete-marker']),
                          void 0 !== output.headers['x-amz-storage-class'] &&
                            (contents.StorageClass =
                              output.headers['x-amz-storage-class']),
                          void 0 !== output.headers['content-encoding'] &&
                            (contents.ContentEncoding =
                              output.headers['content-encoding']),
                          void 0 !== output.headers['x-amz-restore'] &&
                            (contents.Restore =
                              output.headers['x-amz-restore']),
                          void 0 !==
                            output.headers['x-amz-website-redirect-location'] &&
                            (contents.WebsiteRedirectLocation =
                              output.headers[
                                'x-amz-website-redirect-location'
                              ]),
                          void 0 !==
                            output.headers['x-amz-server-side-encryption'] &&
                            (contents.ServerSideEncryption =
                              output.headers['x-amz-server-side-encryption']),
                          void 0 !== output.headers['x-amz-mp-parts-count'] &&
                            (contents.PartsCount = parseInt(
                              output.headers['x-amz-mp-parts-count'],
                              10
                            )),
                          void 0 !==
                            output.headers[
                              'x-amz-server-side-encryption-customer-algorithm'
                            ] &&
                            (contents.SSECustomerAlgorithm =
                              output.headers[
                                'x-amz-server-side-encryption-customer-algorithm'
                              ]),
                          void 0 !== output.headers['accept-ranges'] &&
                            (contents.AcceptRanges =
                              output.headers['accept-ranges']),
                          void 0 !== output.headers['x-amz-version-id'] &&
                            (contents.VersionId =
                              output.headers['x-amz-version-id']),
                          void 0 !== output.headers.expires &&
                            (contents.Expires = new Date(
                              output.headers.expires
                            )),
                          void 0 !== output.headers['x-amz-expiration'] &&
                            (contents.Expiration =
                              output.headers['x-amz-expiration']),
                          void 0 !== output.headers['x-amz-missing-meta'] &&
                            (contents.MissingMeta = parseInt(
                              output.headers['x-amz-missing-meta'],
                              10
                            )),
                          void 0 !==
                            output.headers['x-amz-replication-status'] &&
                            (contents.ReplicationStatus =
                              output.headers['x-amz-replication-status']),
                          void 0 !== output.headers['x-amz-tagging-count'] &&
                            (contents.TagCount = parseInt(
                              output.headers['x-amz-tagging-count'],
                              10
                            )),
                          void 0 !==
                            output.headers[
                              'x-amz-server-side-encryption-customer-key-md5'
                            ] &&
                            (contents.SSECustomerKeyMD5 =
                              output.headers[
                                'x-amz-server-side-encryption-customer-key-md5'
                              ]),
                          void 0 !== output.headers['last-modified'] &&
                            (contents.LastModified = new Date(
                              output.headers['last-modified']
                            )),
                          void 0 !== output.headers.etag &&
                            (contents.ETag = output.headers.etag),
                          void 0 !== output.headers['x-amz-request-charged'] &&
                            (contents.RequestCharged =
                              output.headers['x-amz-request-charged']),
                          Object.keys(output.headers).forEach(function (
                            header
                          ) {
                            void 0 === contents.Metadata &&
                              (contents.Metadata = {}),
                              header.startsWith('x-amz-meta-') &&
                                (contents.Metadata[header.substring(11)] =
                                  output.headers[header]);
                          }),
                          (data = output.body),
                          (contents.Body = data),
                          [2, Promise.resolve(contents)]);
                    });
                  });
                })(output, context);
              }),
              GetObjectCommand
            );
          })(es.b),
          DeleteObjectCommand_DeleteObjectCommand = (function (_super) {
            function DeleteObjectCommand(input) {
              var _this = _super.call(this) || this;
              return (_this.input = input), _this;
            }
            return (
              __extends(DeleteObjectCommand, _super),
              (DeleteObjectCommand.prototype.resolveMiddleware = function (
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
                ),
                  this.middlewareStack.use(
                    getBucketEndpointPlugin(configuration)
                  );
                var stack = clientStack.concat(this.middlewareStack),
                  logger = configuration.logger,
                  handlerExecutionContext = {
                    logger: logger,
                    clientName: 'S3Client',
                    commandName: 'DeleteObjectCommand',
                    inputFilterSensitiveLog:
                      models_0_DeleteObjectRequest.filterSensitiveLog,
                    outputFilterSensitiveLog:
                      models_0_DeleteObjectOutput.filterSensitiveLog,
                  };
                'function' == typeof logger.info &&
                  logger.info({
                    clientName: 'S3Client',
                    commandName: 'DeleteObjectCommand',
                  });
                var requestHandler = configuration.requestHandler;
                return stack.resolve(function (request) {
                  return requestHandler.handle(request.request, options || {});
                }, handlerExecutionContext);
              }),
              (DeleteObjectCommand.prototype.serialize = function (
                input,
                context
              ) {
                return (function (input, context) {
                  return __awaiter(void 0, void 0, void 0, function () {
                    var headers,
                      resolvedPath,
                      labelValue,
                      query,
                      _a,
                      hostname,
                      _b,
                      protocol,
                      port;
                    return __generator(this, function (_c) {
                      switch (_c.label) {
                        case 0:
                          if (
                            ((headers = __assign(
                              __assign(
                                __assign(
                                  __assign(
                                    { 'Content-Type': '' },
                                    isSerializableHeaderValue(input.MFA) && {
                                      'x-amz-mfa': input.MFA,
                                    }
                                  ),
                                  isSerializableHeaderValue(
                                    input.ExpectedBucketOwner
                                  ) && {
                                    'x-amz-expected-bucket-owner':
                                      input.ExpectedBucketOwner,
                                  }
                                ),
                                isSerializableHeaderValue(
                                  input.BypassGovernanceRetention
                                ) && {
                                  'x-amz-bypass-governance-retention':
                                    input.BypassGovernanceRetention.toString(),
                                }
                              ),
                              isSerializableHeaderValue(input.RequestPayer) && {
                                'x-amz-request-payer': input.RequestPayer,
                              }
                            )),
                            (resolvedPath = '/{Bucket}/{Key+}'),
                            void 0 === input.Bucket)
                          )
                            throw new Error(
                              'No value provided for input HTTP label: Bucket.'
                            );
                          if ((labelValue = input.Bucket).length <= 0)
                            throw new Error(
                              'Empty value provided for input HTTP label: Bucket.'
                            );
                          if (
                            ((resolvedPath = resolvedPath.replace(
                              '{Bucket}',
                              Object(es.f)(labelValue)
                            )),
                            void 0 === input.Key)
                          )
                            throw new Error(
                              'No value provided for input HTTP label: Key.'
                            );
                          if ((labelValue = input.Key).length <= 0)
                            throw new Error(
                              'Empty value provided for input HTTP label: Key.'
                            );
                          return (
                            (resolvedPath = resolvedPath.replace(
                              '{Key+}',
                              labelValue
                                .split('/')
                                .map(function (segment) {
                                  return Object(es.f)(segment);
                                })
                                .join('/')
                            )),
                            (query = __assign(
                              { 'x-id': 'DeleteObject' },
                              void 0 !== input.VersionId && {
                                versionId: input.VersionId,
                              }
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
                              new dist_es.a({
                                protocol: protocol,
                                hostname: hostname,
                                port: port,
                                method: 'DELETE',
                                headers: headers,
                                path: resolvedPath,
                                query: query,
                                body: void 0,
                              }),
                            ]
                          );
                      }
                    });
                  });
                })(input, context);
              }),
              (DeleteObjectCommand.prototype.deserialize = function (
                output,
                context
              ) {
                return (function (output, context) {
                  return __awaiter(void 0, void 0, void 0, function () {
                    var contents;
                    return __generator(this, function (_a) {
                      switch (_a.label) {
                        case 0:
                          return 204 !== output.statusCode &&
                            output.statusCode >= 300
                            ? [
                                2,
                                deserializeAws_restXmlDeleteObjectCommandError(
                                  output,
                                  context
                                ),
                              ]
                            : ((contents = {
                                $metadata: deserializeMetadata(output),
                                DeleteMarker: void 0,
                                RequestCharged: void 0,
                                VersionId: void 0,
                              }),
                              void 0 !==
                                output.headers['x-amz-delete-marker'] &&
                                (contents.DeleteMarker =
                                  'true' ===
                                  output.headers['x-amz-delete-marker']),
                              void 0 !==
                                output.headers['x-amz-request-charged'] &&
                                (contents.RequestCharged =
                                  output.headers['x-amz-request-charged']),
                              void 0 !== output.headers['x-amz-version-id'] &&
                                (contents.VersionId =
                                  output.headers['x-amz-version-id']),
                              [4, collectBody(output.body, context)]);
                        case 1:
                          return _a.sent(), [2, Promise.resolve(contents)];
                      }
                    });
                  });
                })(output, context);
              }),
              DeleteObjectCommand
            );
          })(es.b),
          ListObjectsCommand_ListObjectsCommand = (function (_super) {
            function ListObjectsCommand(input) {
              var _this = _super.call(this) || this;
              return (_this.input = input), _this;
            }
            return (
              __extends(ListObjectsCommand, _super),
              (ListObjectsCommand.prototype.resolveMiddleware = function (
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
                ),
                  this.middlewareStack.use(
                    getBucketEndpointPlugin(configuration)
                  );
                var stack = clientStack.concat(this.middlewareStack),
                  logger = configuration.logger,
                  handlerExecutionContext = {
                    logger: logger,
                    clientName: 'S3Client',
                    commandName: 'ListObjectsCommand',
                    inputFilterSensitiveLog:
                      models_0_ListObjectsRequest.filterSensitiveLog,
                    outputFilterSensitiveLog:
                      models_0_ListObjectsOutput.filterSensitiveLog,
                  };
                'function' == typeof logger.info &&
                  logger.info({
                    clientName: 'S3Client',
                    commandName: 'ListObjectsCommand',
                  });
                var requestHandler = configuration.requestHandler;
                return stack.resolve(function (request) {
                  return requestHandler.handle(request.request, options || {});
                }, handlerExecutionContext);
              }),
              (ListObjectsCommand.prototype.serialize = function (
                input,
                context
              ) {
                return (function (input, context) {
                  return __awaiter(void 0, void 0, void 0, function () {
                    var headers,
                      resolvedPath,
                      labelValue,
                      query,
                      _a,
                      hostname,
                      _b,
                      protocol,
                      port;
                    return __generator(this, function (_c) {
                      switch (_c.label) {
                        case 0:
                          if (
                            ((headers = __assign(
                              __assign(
                                { 'Content-Type': '' },
                                isSerializableHeaderValue(
                                  input.ExpectedBucketOwner
                                ) && {
                                  'x-amz-expected-bucket-owner':
                                    input.ExpectedBucketOwner,
                                }
                              ),
                              isSerializableHeaderValue(input.RequestPayer) && {
                                'x-amz-request-payer': input.RequestPayer,
                              }
                            )),
                            (resolvedPath = '/{Bucket}'),
                            void 0 === input.Bucket)
                          )
                            throw new Error(
                              'No value provided for input HTTP label: Bucket.'
                            );
                          if ((labelValue = input.Bucket).length <= 0)
                            throw new Error(
                              'Empty value provided for input HTTP label: Bucket.'
                            );
                          return (
                            (resolvedPath = resolvedPath.replace(
                              '{Bucket}',
                              Object(es.f)(labelValue)
                            )),
                            (query = __assign(
                              __assign(
                                __assign(
                                  __assign(
                                    __assign(
                                      {},
                                      void 0 !== input.MaxKeys && {
                                        'max-keys': input.MaxKeys.toString(),
                                      }
                                    ),
                                    void 0 !== input.Marker && {
                                      marker: input.Marker,
                                    }
                                  ),
                                  void 0 !== input.Prefix && {
                                    prefix: input.Prefix,
                                  }
                                ),
                                void 0 !== input.Delimiter && {
                                  delimiter: input.Delimiter,
                                }
                              ),
                              void 0 !== input.EncodingType && {
                                'encoding-type': input.EncodingType,
                              }
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
                              new dist_es.a({
                                protocol: protocol,
                                hostname: hostname,
                                port: port,
                                method: 'GET',
                                headers: headers,
                                path: resolvedPath,
                                query: query,
                                body: void 0,
                              }),
                            ]
                          );
                      }
                    });
                  });
                })(input, context);
              }),
              (ListObjectsCommand.prototype.deserialize = function (
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
                                deserializeAws_restXmlListObjectsCommandError(
                                  output,
                                  context
                                ),
                              ]
                            : ((contents = {
                                $metadata: deserializeMetadata(output),
                                CommonPrefixes: void 0,
                                Contents: void 0,
                                Delimiter: void 0,
                                EncodingType: void 0,
                                IsTruncated: void 0,
                                Marker: void 0,
                                MaxKeys: void 0,
                                Name: void 0,
                                NextMarker: void 0,
                                Prefix: void 0,
                              }),
                              [4, parseBody(output.body, context)]);
                        case 1:
                          return (
                            '' === (data = _a.sent()).CommonPrefixes &&
                              (contents.CommonPrefixes = []),
                            void 0 !== data.CommonPrefixes &&
                              (contents.CommonPrefixes =
                                deserializeAws_restXmlCommonPrefixList(
                                  Object(es.g)(data.CommonPrefixes),
                                  context
                                )),
                            '' === data.Contents && (contents.Contents = []),
                            void 0 !== data.Contents &&
                              (contents.Contents =
                                deserializeAws_restXmlObjectList(
                                  Object(es.g)(data.Contents),
                                  context
                                )),
                            void 0 !== data.Delimiter &&
                              (contents.Delimiter = data.Delimiter),
                            void 0 !== data.EncodingType &&
                              (contents.EncodingType = data.EncodingType),
                            void 0 !== data.IsTruncated &&
                              (contents.IsTruncated =
                                'true' == data.IsTruncated),
                            void 0 !== data.Marker &&
                              (contents.Marker = data.Marker),
                            void 0 !== data.MaxKeys &&
                              (contents.MaxKeys = parseInt(data.MaxKeys)),
                            void 0 !== data.Name && (contents.Name = data.Name),
                            void 0 !== data.NextMarker &&
                              (contents.NextMarker = data.NextMarker),
                            void 0 !== data.Prefix &&
                              (contents.Prefix = data.Prefix),
                            [2, Promise.resolve(contents)]
                          );
                      }
                    });
                  });
                })(output, context);
              }),
              ListObjectsCommand
            );
          })(es.b),
          es_package = __webpack_require__(1778),
          sha256_browser_build = __webpack_require__(186),
          crc32_build = __webpack_require__(237),
          SHORT_TO_HEX = {},
          HEX_TO_SHORT = {},
          es_i = 0;
        es_i < 256;
        es_i++
      ) {
        var encodedByte = es_i.toString(16).toLowerCase();
        1 === encodedByte.length && (encodedByte = '0' + encodedByte),
          (SHORT_TO_HEX[es_i] = encodedByte),
          (HEX_TO_SHORT[encodedByte] = es_i);
      }
      function toHex(bytes) {
        for (var out = '', i = 0; i < bytes.byteLength; i++)
          out += SHORT_TO_HEX[bytes[i]];
        return out;
      }
      var Int64_Int64 = (function () {
        function Int64(bytes) {
          if (((this.bytes = bytes), 8 !== bytes.byteLength))
            throw new Error('Int64 buffers must be exactly 8 bytes');
        }
        return (
          (Int64.fromNumber = function (number) {
            if (number > 0x8000000000000000 || number < -0x8000000000000000)
              throw new Error(
                number +
                  ' is too large (or, if negative, too small) to represent as an Int64'
              );
            for (
              var bytes = new Uint8Array(8),
                i = 7,
                remaining = Math.abs(Math.round(number));
              i > -1 && remaining > 0;
              i--, remaining /= 256
            )
              bytes[i] = remaining;
            return number < 0 && negate(bytes), new Int64(bytes);
          }),
          (Int64.prototype.valueOf = function () {
            var bytes = this.bytes.slice(0),
              negative = 128 & bytes[0];
            return (
              negative && negate(bytes),
              parseInt(toHex(bytes), 16) * (negative ? -1 : 1)
            );
          }),
          (Int64.prototype.toString = function () {
            return String(this.valueOf());
          }),
          Int64
        );
      })();
      function negate(bytes) {
        for (var i = 0; i < 8; i++) bytes[i] ^= 255;
        for (i = 7; i > -1 && (bytes[i]++, 0 === bytes[i]); i--);
      }
      var HEADER_VALUE_TYPE,
        HeaderMarshaller_HeaderMarshaller = (function () {
          function HeaderMarshaller(toUtf8, fromUtf8) {
            (this.toUtf8 = toUtf8), (this.fromUtf8 = fromUtf8);
          }
          return (
            (HeaderMarshaller.prototype.format = function (headers) {
              var e_1,
                _a,
                e_2,
                _b,
                chunks = [];
              try {
                for (
                  var _c = Object(tslib_es6.__values)(Object.keys(headers)),
                    _d = _c.next();
                  !_d.done;
                  _d = _c.next()
                ) {
                  var headerName = _d.value,
                    bytes = this.fromUtf8(headerName);
                  chunks.push(
                    Uint8Array.from([bytes.byteLength]),
                    bytes,
                    this.formatHeaderValue(headers[headerName])
                  );
                }
              } catch (e_1_1) {
                e_1 = { error: e_1_1 };
              } finally {
                try {
                  _d && !_d.done && (_a = _c.return) && _a.call(_c);
                } finally {
                  if (e_1) throw e_1.error;
                }
              }
              var out = new Uint8Array(
                  chunks.reduce(function (carry, bytes) {
                    return carry + bytes.byteLength;
                  }, 0)
                ),
                position = 0;
              try {
                for (
                  var chunks_1 = Object(tslib_es6.__values)(chunks),
                    chunks_1_1 = chunks_1.next();
                  !chunks_1_1.done;
                  chunks_1_1 = chunks_1.next()
                ) {
                  var chunk = chunks_1_1.value;
                  out.set(chunk, position), (position += chunk.byteLength);
                }
              } catch (e_2_1) {
                e_2 = { error: e_2_1 };
              } finally {
                try {
                  chunks_1_1 &&
                    !chunks_1_1.done &&
                    (_b = chunks_1.return) &&
                    _b.call(chunks_1);
                } finally {
                  if (e_2) throw e_2.error;
                }
              }
              return out;
            }),
            (HeaderMarshaller.prototype.formatHeaderValue = function (header) {
              switch (header.type) {
                case 'boolean':
                  return Uint8Array.from([header.value ? 0 : 1]);
                case 'byte':
                  return Uint8Array.from([2, header.value]);
                case 'short':
                  var shortView = new DataView(new ArrayBuffer(3));
                  return (
                    shortView.setUint8(0, 3),
                    shortView.setInt16(1, header.value, !1),
                    new Uint8Array(shortView.buffer)
                  );
                case 'integer':
                  var intView = new DataView(new ArrayBuffer(5));
                  return (
                    intView.setUint8(0, 4),
                    intView.setInt32(1, header.value, !1),
                    new Uint8Array(intView.buffer)
                  );
                case 'long':
                  var longBytes = new Uint8Array(9);
                  return (
                    (longBytes[0] = 5),
                    longBytes.set(header.value.bytes, 1),
                    longBytes
                  );
                case 'binary':
                  var binView = new DataView(
                    new ArrayBuffer(3 + header.value.byteLength)
                  );
                  binView.setUint8(0, 6),
                    binView.setUint16(1, header.value.byteLength, !1);
                  var binBytes = new Uint8Array(binView.buffer);
                  return binBytes.set(header.value, 3), binBytes;
                case 'string':
                  var utf8Bytes = this.fromUtf8(header.value),
                    strView = new DataView(
                      new ArrayBuffer(3 + utf8Bytes.byteLength)
                    );
                  strView.setUint8(0, 7),
                    strView.setUint16(1, utf8Bytes.byteLength, !1);
                  var strBytes = new Uint8Array(strView.buffer);
                  return strBytes.set(utf8Bytes, 3), strBytes;
                case 'timestamp':
                  var tsBytes = new Uint8Array(9);
                  return (
                    (tsBytes[0] = 8),
                    tsBytes.set(
                      Int64_Int64.fromNumber(header.value.valueOf()).bytes,
                      1
                    ),
                    tsBytes
                  );
                case 'uuid':
                  if (!UUID_PATTERN.test(header.value))
                    throw new Error('Invalid UUID received: ' + header.value);
                  var uuidBytes = new Uint8Array(17);
                  return (
                    (uuidBytes[0] = 9),
                    uuidBytes.set(
                      (function fromHex(encoded) {
                        if (encoded.length % 2 != 0)
                          throw new Error(
                            'Hex encoded strings must have an even number length'
                          );
                        for (
                          var out = new Uint8Array(encoded.length / 2), i = 0;
                          i < encoded.length;
                          i += 2
                        ) {
                          var encodedByte = encoded.substr(i, 2).toLowerCase();
                          if (!(encodedByte in HEX_TO_SHORT))
                            throw new Error(
                              'Cannot decode unrecognized sequence ' +
                                encodedByte +
                                ' as hexadecimal'
                            );
                          out[i / 2] = HEX_TO_SHORT[encodedByte];
                        }
                        return out;
                      })(header.value.replace(/\-/g, '')),
                      1
                    ),
                    uuidBytes
                  );
              }
            }),
            (HeaderMarshaller.prototype.parse = function (headers) {
              for (
                var out = {}, position = 0;
                position < headers.byteLength;

              ) {
                var nameLength = headers.getUint8(position++),
                  name = this.toUtf8(
                    new Uint8Array(
                      headers.buffer,
                      headers.byteOffset + position,
                      nameLength
                    )
                  );
                switch (
                  ((position += nameLength), headers.getUint8(position++))
                ) {
                  case 0:
                    out[name] = { type: BOOLEAN_TAG, value: !0 };
                    break;
                  case 1:
                    out[name] = { type: BOOLEAN_TAG, value: !1 };
                    break;
                  case 2:
                    out[name] = {
                      type: BYTE_TAG,
                      value: headers.getInt8(position++),
                    };
                    break;
                  case 3:
                    (out[name] = {
                      type: SHORT_TAG,
                      value: headers.getInt16(position, !1),
                    }),
                      (position += 2);
                    break;
                  case 4:
                    (out[name] = {
                      type: INT_TAG,
                      value: headers.getInt32(position, !1),
                    }),
                      (position += 4);
                    break;
                  case 5:
                    (out[name] = {
                      type: LONG_TAG,
                      value: new Int64_Int64(
                        new Uint8Array(
                          headers.buffer,
                          headers.byteOffset + position,
                          8
                        )
                      ),
                    }),
                      (position += 8);
                    break;
                  case 6:
                    var binaryLength = headers.getUint16(position, !1);
                    (position += 2),
                      (out[name] = {
                        type: BINARY_TAG,
                        value: new Uint8Array(
                          headers.buffer,
                          headers.byteOffset + position,
                          binaryLength
                        ),
                      }),
                      (position += binaryLength);
                    break;
                  case 7:
                    var stringLength = headers.getUint16(position, !1);
                    (position += 2),
                      (out[name] = {
                        type: STRING_TAG,
                        value: this.toUtf8(
                          new Uint8Array(
                            headers.buffer,
                            headers.byteOffset + position,
                            stringLength
                          )
                        ),
                      }),
                      (position += stringLength);
                    break;
                  case 8:
                    (out[name] = {
                      type: TIMESTAMP_TAG,
                      value: new Date(
                        new Int64_Int64(
                          new Uint8Array(
                            headers.buffer,
                            headers.byteOffset + position,
                            8
                          )
                        ).valueOf()
                      ),
                    }),
                      (position += 8);
                    break;
                  case 9:
                    var uuidBytes = new Uint8Array(
                      headers.buffer,
                      headers.byteOffset + position,
                      16
                    );
                    (position += 16),
                      (out[name] = {
                        type: UUID_TAG,
                        value:
                          toHex(uuidBytes.subarray(0, 4)) +
                          '-' +
                          toHex(uuidBytes.subarray(4, 6)) +
                          '-' +
                          toHex(uuidBytes.subarray(6, 8)) +
                          '-' +
                          toHex(uuidBytes.subarray(8, 10)) +
                          '-' +
                          toHex(uuidBytes.subarray(10)),
                      });
                    break;
                  default:
                    throw new Error('Unrecognized header type tag');
                }
              }
              return out;
            }),
            HeaderMarshaller
          );
        })();
      !(function (HEADER_VALUE_TYPE) {
        (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.boolTrue = 0)] = 'boolTrue'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.boolFalse = 1)] = 'boolFalse'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.byte = 2)] = 'byte'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.short = 3)] = 'short'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.integer = 4)] = 'integer'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.long = 5)] = 'long'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.byteArray = 6)] = 'byteArray'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.string = 7)] = 'string'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.timestamp = 8)] = 'timestamp'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.uuid = 9)] = 'uuid');
      })(HEADER_VALUE_TYPE || (HEADER_VALUE_TYPE = {}));
      var BOOLEAN_TAG = 'boolean',
        BYTE_TAG = 'byte',
        SHORT_TAG = 'short',
        INT_TAG = 'integer',
        LONG_TAG = 'long',
        BINARY_TAG = 'binary',
        STRING_TAG = 'string',
        TIMESTAMP_TAG = 'timestamp',
        UUID_TAG = 'uuid',
        UUID_PATTERN =
          /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
      for (
        var EventStreamMarshaller_EventStreamMarshaller = (function () {
            function EventStreamMarshaller(toUtf8, fromUtf8) {
              this.headerMarshaller = new HeaderMarshaller_HeaderMarshaller(
                toUtf8,
                fromUtf8
              );
            }
            return (
              (EventStreamMarshaller.prototype.marshall = function (_a) {
                var rawHeaders = _a.headers,
                  body = _a.body,
                  headers = this.headerMarshaller.format(rawHeaders),
                  length = headers.byteLength + body.byteLength + 16,
                  out = new Uint8Array(length),
                  view = new DataView(
                    out.buffer,
                    out.byteOffset,
                    out.byteLength
                  ),
                  checksum = new crc32_build.Crc32();
                return (
                  view.setUint32(0, length, !1),
                  view.setUint32(4, headers.byteLength, !1),
                  view.setUint32(
                    8,
                    checksum.update(out.subarray(0, 8)).digest(),
                    !1
                  ),
                  out.set(headers, 12),
                  out.set(body, headers.byteLength + 12),
                  view.setUint32(
                    length - 4,
                    checksum.update(out.subarray(8, length - 4)).digest(),
                    !1
                  ),
                  out
                );
              }),
              (EventStreamMarshaller.prototype.unmarshall = function (message) {
                var _a = (function splitMessage(_a) {
                    var byteLength = _a.byteLength,
                      byteOffset = _a.byteOffset,
                      buffer = _a.buffer;
                    if (byteLength < 16)
                      throw new Error(
                        'Provided message too short to accommodate event stream message overhead'
                      );
                    var view = new DataView(buffer, byteOffset, byteLength),
                      messageLength = view.getUint32(0, !1);
                    if (byteLength !== messageLength)
                      throw new Error(
                        'Reported message length does not match received message length'
                      );
                    var headerLength = view.getUint32(4, !1),
                      expectedPreludeChecksum = view.getUint32(8, !1),
                      expectedMessageChecksum = view.getUint32(
                        byteLength - 4,
                        !1
                      ),
                      checksummer = new crc32_build.Crc32().update(
                        new Uint8Array(buffer, byteOffset, 8)
                      );
                    if (expectedPreludeChecksum !== checksummer.digest())
                      throw new Error(
                        'The prelude checksum specified in the message (' +
                          expectedPreludeChecksum +
                          ') does not match the calculated CRC32 checksum (' +
                          checksummer.digest() +
                          ')'
                      );
                    if (
                      (checksummer.update(
                        new Uint8Array(buffer, byteOffset + 8, byteLength - 12)
                      ),
                      expectedMessageChecksum !== checksummer.digest())
                    )
                      throw new Error(
                        'The message checksum (' +
                          checksummer.digest() +
                          ') did not match the expected value of ' +
                          expectedMessageChecksum
                      );
                    return {
                      headers: new DataView(
                        buffer,
                        byteOffset + 8 + 4,
                        headerLength
                      ),
                      body: new Uint8Array(
                        buffer,
                        byteOffset + 8 + 4 + headerLength,
                        messageLength - headerLength - 16
                      ),
                    };
                  })(message),
                  headers = _a.headers,
                  body = _a.body;
                return {
                  headers: this.headerMarshaller.parse(headers),
                  body: body,
                };
              }),
              (EventStreamMarshaller.prototype.formatHeaders = function (
                rawHeaders
              ) {
                return this.headerMarshaller.format(rawHeaders);
              }),
              EventStreamMarshaller
            );
          })(),
          es_SHORT_TO_HEX = {},
          es_HEX_TO_SHORT = {},
          dist_es_i = 0;
        dist_es_i < 256;
        dist_es_i++
      ) {
        var es_encodedByte = dist_es_i.toString(16).toLowerCase();
        1 === es_encodedByte.length && (es_encodedByte = '0' + es_encodedByte),
          (es_SHORT_TO_HEX[dist_es_i] = es_encodedByte),
          (es_HEX_TO_SHORT[es_encodedByte] = dist_es_i);
      }
      function es_toHex(bytes) {
        for (var out = '', i = 0; i < bytes.byteLength; i++)
          out += es_SHORT_TO_HEX[bytes[i]];
        return out;
      }
      var es_Int64_Int64 = (function () {
        function Int64(bytes) {
          if (((this.bytes = bytes), 8 !== bytes.byteLength))
            throw new Error('Int64 buffers must be exactly 8 bytes');
        }
        return (
          (Int64.fromNumber = function (number) {
            if (number > 0x8000000000000000 || number < -0x8000000000000000)
              throw new Error(
                number +
                  ' is too large (or, if negative, too small) to represent as an Int64'
              );
            for (
              var bytes = new Uint8Array(8),
                i = 7,
                remaining = Math.abs(Math.round(number));
              i > -1 && remaining > 0;
              i--, remaining /= 256
            )
              bytes[i] = remaining;
            return number < 0 && Int64_negate(bytes), new Int64(bytes);
          }),
          (Int64.prototype.valueOf = function () {
            var bytes = this.bytes.slice(0),
              negative = 128 & bytes[0];
            return (
              negative && Int64_negate(bytes),
              parseInt(es_toHex(bytes), 16) * (negative ? -1 : 1)
            );
          }),
          (Int64.prototype.toString = function () {
            return String(this.valueOf());
          }),
          Int64
        );
      })();
      function Int64_negate(bytes) {
        for (var i = 0; i < 8; i++) bytes[i] ^= 255;
        for (i = 7; i > -1 && (bytes[i]++, 0 === bytes[i]); i--);
      }
      var HeaderMarshaller_HEADER_VALUE_TYPE,
        es_HeaderMarshaller_HeaderMarshaller = (function () {
          function HeaderMarshaller(toUtf8, fromUtf8) {
            (this.toUtf8 = toUtf8), (this.fromUtf8 = fromUtf8);
          }
          return (
            (HeaderMarshaller.prototype.format = function (headers) {
              var e_1,
                _a,
                e_2,
                _b,
                chunks = [];
              try {
                for (
                  var _c = Object(tslib_es6.__values)(Object.keys(headers)),
                    _d = _c.next();
                  !_d.done;
                  _d = _c.next()
                ) {
                  var headerName = _d.value,
                    bytes = this.fromUtf8(headerName);
                  chunks.push(
                    Uint8Array.from([bytes.byteLength]),
                    bytes,
                    this.formatHeaderValue(headers[headerName])
                  );
                }
              } catch (e_1_1) {
                e_1 = { error: e_1_1 };
              } finally {
                try {
                  _d && !_d.done && (_a = _c.return) && _a.call(_c);
                } finally {
                  if (e_1) throw e_1.error;
                }
              }
              var out = new Uint8Array(
                  chunks.reduce(function (carry, bytes) {
                    return carry + bytes.byteLength;
                  }, 0)
                ),
                position = 0;
              try {
                for (
                  var chunks_1 = Object(tslib_es6.__values)(chunks),
                    chunks_1_1 = chunks_1.next();
                  !chunks_1_1.done;
                  chunks_1_1 = chunks_1.next()
                ) {
                  var chunk = chunks_1_1.value;
                  out.set(chunk, position), (position += chunk.byteLength);
                }
              } catch (e_2_1) {
                e_2 = { error: e_2_1 };
              } finally {
                try {
                  chunks_1_1 &&
                    !chunks_1_1.done &&
                    (_b = chunks_1.return) &&
                    _b.call(chunks_1);
                } finally {
                  if (e_2) throw e_2.error;
                }
              }
              return out;
            }),
            (HeaderMarshaller.prototype.formatHeaderValue = function (header) {
              switch (header.type) {
                case 'boolean':
                  return Uint8Array.from([header.value ? 0 : 1]);
                case 'byte':
                  return Uint8Array.from([2, header.value]);
                case 'short':
                  var shortView = new DataView(new ArrayBuffer(3));
                  return (
                    shortView.setUint8(0, 3),
                    shortView.setInt16(1, header.value, !1),
                    new Uint8Array(shortView.buffer)
                  );
                case 'integer':
                  var intView = new DataView(new ArrayBuffer(5));
                  return (
                    intView.setUint8(0, 4),
                    intView.setInt32(1, header.value, !1),
                    new Uint8Array(intView.buffer)
                  );
                case 'long':
                  var longBytes = new Uint8Array(9);
                  return (
                    (longBytes[0] = 5),
                    longBytes.set(header.value.bytes, 1),
                    longBytes
                  );
                case 'binary':
                  var binView = new DataView(
                    new ArrayBuffer(3 + header.value.byteLength)
                  );
                  binView.setUint8(0, 6),
                    binView.setUint16(1, header.value.byteLength, !1);
                  var binBytes = new Uint8Array(binView.buffer);
                  return binBytes.set(header.value, 3), binBytes;
                case 'string':
                  var utf8Bytes = this.fromUtf8(header.value),
                    strView = new DataView(
                      new ArrayBuffer(3 + utf8Bytes.byteLength)
                    );
                  strView.setUint8(0, 7),
                    strView.setUint16(1, utf8Bytes.byteLength, !1);
                  var strBytes = new Uint8Array(strView.buffer);
                  return strBytes.set(utf8Bytes, 3), strBytes;
                case 'timestamp':
                  var tsBytes = new Uint8Array(9);
                  return (
                    (tsBytes[0] = 8),
                    tsBytes.set(
                      es_Int64_Int64.fromNumber(header.value.valueOf()).bytes,
                      1
                    ),
                    tsBytes
                  );
                case 'uuid':
                  if (!HeaderMarshaller_UUID_PATTERN.test(header.value))
                    throw new Error('Invalid UUID received: ' + header.value);
                  var uuidBytes = new Uint8Array(17);
                  return (
                    (uuidBytes[0] = 9),
                    uuidBytes.set(
                      (function es_fromHex(encoded) {
                        if (encoded.length % 2 != 0)
                          throw new Error(
                            'Hex encoded strings must have an even number length'
                          );
                        for (
                          var out = new Uint8Array(encoded.length / 2), i = 0;
                          i < encoded.length;
                          i += 2
                        ) {
                          var encodedByte = encoded.substr(i, 2).toLowerCase();
                          if (!(encodedByte in es_HEX_TO_SHORT))
                            throw new Error(
                              'Cannot decode unrecognized sequence ' +
                                encodedByte +
                                ' as hexadecimal'
                            );
                          out[i / 2] = es_HEX_TO_SHORT[encodedByte];
                        }
                        return out;
                      })(header.value.replace(/\-/g, '')),
                      1
                    ),
                    uuidBytes
                  );
              }
            }),
            (HeaderMarshaller.prototype.parse = function (headers) {
              for (
                var out = {}, position = 0;
                position < headers.byteLength;

              ) {
                var nameLength = headers.getUint8(position++),
                  name = this.toUtf8(
                    new Uint8Array(
                      headers.buffer,
                      headers.byteOffset + position,
                      nameLength
                    )
                  );
                switch (
                  ((position += nameLength), headers.getUint8(position++))
                ) {
                  case 0:
                    out[name] = {
                      type: HeaderMarshaller_BOOLEAN_TAG,
                      value: !0,
                    };
                    break;
                  case 1:
                    out[name] = {
                      type: HeaderMarshaller_BOOLEAN_TAG,
                      value: !1,
                    };
                    break;
                  case 2:
                    out[name] = {
                      type: HeaderMarshaller_BYTE_TAG,
                      value: headers.getInt8(position++),
                    };
                    break;
                  case 3:
                    (out[name] = {
                      type: HeaderMarshaller_SHORT_TAG,
                      value: headers.getInt16(position, !1),
                    }),
                      (position += 2);
                    break;
                  case 4:
                    (out[name] = {
                      type: HeaderMarshaller_INT_TAG,
                      value: headers.getInt32(position, !1),
                    }),
                      (position += 4);
                    break;
                  case 5:
                    (out[name] = {
                      type: HeaderMarshaller_LONG_TAG,
                      value: new es_Int64_Int64(
                        new Uint8Array(
                          headers.buffer,
                          headers.byteOffset + position,
                          8
                        )
                      ),
                    }),
                      (position += 8);
                    break;
                  case 6:
                    var binaryLength = headers.getUint16(position, !1);
                    (position += 2),
                      (out[name] = {
                        type: HeaderMarshaller_BINARY_TAG,
                        value: new Uint8Array(
                          headers.buffer,
                          headers.byteOffset + position,
                          binaryLength
                        ),
                      }),
                      (position += binaryLength);
                    break;
                  case 7:
                    var stringLength = headers.getUint16(position, !1);
                    (position += 2),
                      (out[name] = {
                        type: HeaderMarshaller_STRING_TAG,
                        value: this.toUtf8(
                          new Uint8Array(
                            headers.buffer,
                            headers.byteOffset + position,
                            stringLength
                          )
                        ),
                      }),
                      (position += stringLength);
                    break;
                  case 8:
                    (out[name] = {
                      type: HeaderMarshaller_TIMESTAMP_TAG,
                      value: new Date(
                        new es_Int64_Int64(
                          new Uint8Array(
                            headers.buffer,
                            headers.byteOffset + position,
                            8
                          )
                        ).valueOf()
                      ),
                    }),
                      (position += 8);
                    break;
                  case 9:
                    var uuidBytes = new Uint8Array(
                      headers.buffer,
                      headers.byteOffset + position,
                      16
                    );
                    (position += 16),
                      (out[name] = {
                        type: HeaderMarshaller_UUID_TAG,
                        value:
                          es_toHex(uuidBytes.subarray(0, 4)) +
                          '-' +
                          es_toHex(uuidBytes.subarray(4, 6)) +
                          '-' +
                          es_toHex(uuidBytes.subarray(6, 8)) +
                          '-' +
                          es_toHex(uuidBytes.subarray(8, 10)) +
                          '-' +
                          es_toHex(uuidBytes.subarray(10)),
                      });
                    break;
                  default:
                    throw new Error('Unrecognized header type tag');
                }
              }
              return out;
            }),
            HeaderMarshaller
          );
        })();
      !(function (HEADER_VALUE_TYPE) {
        (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.boolTrue = 0)] = 'boolTrue'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.boolFalse = 1)] = 'boolFalse'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.byte = 2)] = 'byte'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.short = 3)] = 'short'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.integer = 4)] = 'integer'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.long = 5)] = 'long'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.byteArray = 6)] = 'byteArray'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.string = 7)] = 'string'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.timestamp = 8)] = 'timestamp'),
          (HEADER_VALUE_TYPE[(HEADER_VALUE_TYPE.uuid = 9)] = 'uuid');
      })(
        HeaderMarshaller_HEADER_VALUE_TYPE ||
          (HeaderMarshaller_HEADER_VALUE_TYPE = {})
      );
      var HeaderMarshaller_BOOLEAN_TAG = 'boolean',
        HeaderMarshaller_BYTE_TAG = 'byte',
        HeaderMarshaller_SHORT_TAG = 'short',
        HeaderMarshaller_INT_TAG = 'integer',
        HeaderMarshaller_LONG_TAG = 'long',
        HeaderMarshaller_BINARY_TAG = 'binary',
        HeaderMarshaller_STRING_TAG = 'string',
        HeaderMarshaller_TIMESTAMP_TAG = 'timestamp',
        HeaderMarshaller_UUID_TAG = 'uuid',
        HeaderMarshaller_UUID_PATTERN =
          /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
      var es_EventStreamMarshaller_EventStreamMarshaller = (function () {
        function EventStreamMarshaller(toUtf8, fromUtf8) {
          this.headerMarshaller = new es_HeaderMarshaller_HeaderMarshaller(
            toUtf8,
            fromUtf8
          );
        }
        return (
          (EventStreamMarshaller.prototype.marshall = function (_a) {
            var rawHeaders = _a.headers,
              body = _a.body,
              headers = this.headerMarshaller.format(rawHeaders),
              length = headers.byteLength + body.byteLength + 16,
              out = new Uint8Array(length),
              view = new DataView(out.buffer, out.byteOffset, out.byteLength),
              checksum = new crc32_build.Crc32();
            return (
              view.setUint32(0, length, !1),
              view.setUint32(4, headers.byteLength, !1),
              view.setUint32(
                8,
                checksum.update(out.subarray(0, 8)).digest(),
                !1
              ),
              out.set(headers, 12),
              out.set(body, headers.byteLength + 12),
              view.setUint32(
                length - 4,
                checksum.update(out.subarray(8, length - 4)).digest(),
                !1
              ),
              out
            );
          }),
          (EventStreamMarshaller.prototype.unmarshall = function (message) {
            var _a = (function splitMessage_splitMessage(_a) {
                var byteLength = _a.byteLength,
                  byteOffset = _a.byteOffset,
                  buffer = _a.buffer;
                if (byteLength < 16)
                  throw new Error(
                    'Provided message too short to accommodate event stream message overhead'
                  );
                var view = new DataView(buffer, byteOffset, byteLength),
                  messageLength = view.getUint32(0, !1);
                if (byteLength !== messageLength)
                  throw new Error(
                    'Reported message length does not match received message length'
                  );
                var headerLength = view.getUint32(4, !1),
                  expectedPreludeChecksum = view.getUint32(8, !1),
                  expectedMessageChecksum = view.getUint32(byteLength - 4, !1),
                  checksummer = new crc32_build.Crc32().update(
                    new Uint8Array(buffer, byteOffset, 8)
                  );
                if (expectedPreludeChecksum !== checksummer.digest())
                  throw new Error(
                    'The prelude checksum specified in the message (' +
                      expectedPreludeChecksum +
                      ') does not match the calculated CRC32 checksum (' +
                      checksummer.digest() +
                      ')'
                  );
                if (
                  (checksummer.update(
                    new Uint8Array(buffer, byteOffset + 8, byteLength - 12)
                  ),
                  expectedMessageChecksum !== checksummer.digest())
                )
                  throw new Error(
                    'The message checksum (' +
                      checksummer.digest() +
                      ') did not match the expected value of ' +
                      expectedMessageChecksum
                  );
                return {
                  headers: new DataView(
                    buffer,
                    byteOffset + 8 + 4,
                    headerLength
                  ),
                  body: new Uint8Array(
                    buffer,
                    byteOffset + 8 + 4 + headerLength,
                    messageLength - headerLength - 16
                  ),
                };
              })(message),
              headers = _a.headers,
              body = _a.body;
            return {
              headers: this.headerMarshaller.parse(headers),
              body: body,
            };
          }),
          (EventStreamMarshaller.prototype.formatHeaders = function (
            rawHeaders
          ) {
            return this.headerMarshaller.format(rawHeaders);
          }),
          EventStreamMarshaller
        );
      })();
      var dist_es_EventStreamMarshaller_EventStreamMarshaller = (function () {
          function EventStreamMarshaller(_a) {
            var utf8Encoder = _a.utf8Encoder,
              utf8Decoder = _a.utf8Decoder;
            (this.eventMarshaller =
              new es_EventStreamMarshaller_EventStreamMarshaller(
                utf8Encoder,
                utf8Decoder
              )),
              (this.utfEncoder = utf8Encoder);
          }
          return (
            (EventStreamMarshaller.prototype.deserialize = function (
              body,
              deserializer
            ) {
              return (function getUnmarshalledStream(source, options) {
                var _a;
                return (
                  ((_a = {})[Symbol.asyncIterator] = function () {
                    return Object(tslib_es6.__asyncGenerator)(
                      this,
                      arguments,
                      function () {
                        var source_1,
                          source_1_1,
                          chunk,
                          message,
                          messageType,
                          unmodeledError,
                          code,
                          exception,
                          deserializedException,
                          error,
                          event,
                          deserialized,
                          e_1_1,
                          _a,
                          _b,
                          e_1,
                          _c;
                        return Object(tslib_es6.__generator)(
                          this,
                          function (_d) {
                            switch (_d.label) {
                              case 0:
                                _d.trys.push([0, 12, 13, 18]),
                                  (source_1 = Object(tslib_es6.__asyncValues)(
                                    source
                                  )),
                                  (_d.label = 1);
                              case 1:
                                return [
                                  4,
                                  Object(tslib_es6.__await)(source_1.next()),
                                ];
                              case 2:
                                if ((source_1_1 = _d.sent()).done)
                                  return [3, 11];
                                if (
                                  ((chunk = source_1_1.value),
                                  (message =
                                    options.eventMarshaller.unmarshall(chunk)),
                                  'error' !==
                                    (messageType =
                                      message.headers[':message-type'].value))
                                )
                                  return [3, 3];
                                throw (
                                  (((unmodeledError = new Error(
                                    message.headers[':error-message'].value ||
                                      'UnknownError'
                                  )).name =
                                    message.headers[':error-code'].value),
                                  unmodeledError)
                                );
                              case 3:
                                return 'exception' !== messageType
                                  ? [3, 5]
                                  : ((code =
                                      message.headers[':exception-type'].value),
                                    ((_a = {})[code] = message),
                                    (exception = _a),
                                    [
                                      4,
                                      Object(tslib_es6.__await)(
                                        options.deserializer(exception)
                                      ),
                                    ]);
                              case 4:
                                if (
                                  (deserializedException = _d.sent()).$unknown
                                )
                                  throw (
                                    (((error = new Error(
                                      options.toUtf8(message.body)
                                    )).name = code),
                                    error)
                                  );
                                throw deserializedException[code];
                              case 5:
                                return 'event' !== messageType
                                  ? [3, 9]
                                  : (((_b = {})[
                                      message.headers[':event-type'].value
                                    ] = message),
                                    (event = _b),
                                    [
                                      4,
                                      Object(tslib_es6.__await)(
                                        options.deserializer(event)
                                      ),
                                    ]);
                              case 6:
                                return (deserialized = _d.sent()).$unknown
                                  ? [3, 10]
                                  : [
                                      4,
                                      Object(tslib_es6.__await)(deserialized),
                                    ];
                              case 7:
                                return [4, _d.sent()];
                              case 8:
                                return _d.sent(), [3, 10];
                              case 9:
                                throw Error(
                                  'Unrecognizable event type: ' +
                                    message.headers[':event-type'].value
                                );
                              case 10:
                                return [3, 1];
                              case 11:
                                return [3, 18];
                              case 12:
                                return (
                                  (e_1_1 = _d.sent()),
                                  (e_1 = { error: e_1_1 }),
                                  [3, 18]
                                );
                              case 13:
                                return (
                                  _d.trys.push([13, , 16, 17]),
                                  source_1_1 &&
                                  !source_1_1.done &&
                                  (_c = source_1.return)
                                    ? [
                                        4,
                                        Object(tslib_es6.__await)(
                                          _c.call(source_1)
                                        ),
                                      ]
                                    : [3, 15]
                                );
                              case 14:
                                _d.sent(), (_d.label = 15);
                              case 15:
                                return [3, 17];
                              case 16:
                                if (e_1) throw e_1.error;
                                return [7];
                              case 17:
                                return [7];
                              case 18:
                                return [2];
                            }
                          }
                        );
                      }
                    );
                  }),
                  _a
                );
              })(
                (function getChunkedStream(source) {
                  var _a,
                    currentMessageTotalLength = 0,
                    currentMessagePendingLength = 0,
                    currentMessage = null,
                    messageLengthBuffer = null,
                    allocateMessage = function (size) {
                      if ('number' != typeof size)
                        throw new Error(
                          'Attempted to allocate an event message where size was not a number: ' +
                            size
                        );
                      (currentMessageTotalLength = size),
                        (currentMessagePendingLength = 4),
                        (currentMessage = new Uint8Array(size)),
                        new DataView(currentMessage.buffer).setUint32(
                          0,
                          size,
                          !1
                        );
                    };
                  return (
                    ((_a = {})[Symbol.asyncIterator] = function () {
                      return Object(tslib_es6.__asyncGenerator)(
                        this,
                        arguments,
                        function () {
                          var sourceIterator,
                            _a,
                            value,
                            chunkLength,
                            currentOffset,
                            bytesRemaining,
                            numBytesForTotal,
                            numBytesToWrite;
                          return Object(tslib_es6.__generator)(
                            this,
                            function (_b) {
                              switch (_b.label) {
                                case 0:
                                  (sourceIterator =
                                    source[Symbol.asyncIterator]()),
                                    (_b.label = 1);
                                case 1:
                                  return [
                                    4,
                                    Object(tslib_es6.__await)(
                                      sourceIterator.next()
                                    ),
                                  ];
                                case 2:
                                  return (
                                    (_a = _b.sent()),
                                    (value = _a.value),
                                    _a.done
                                      ? currentMessageTotalLength
                                        ? [3, 4]
                                        : [4, Object(tslib_es6.__await)(void 0)]
                                      : [3, 10]
                                  );
                                case 3:
                                  return [2, _b.sent()];
                                case 4:
                                  return currentMessageTotalLength !==
                                    currentMessagePendingLength
                                    ? [3, 7]
                                    : [
                                        4,
                                        Object(tslib_es6.__await)(
                                          currentMessage
                                        ),
                                      ];
                                case 5:
                                  return [4, _b.sent()];
                                case 6:
                                  return _b.sent(), [3, 8];
                                case 7:
                                  throw new Error(
                                    'Truncated event message received.'
                                  );
                                case 8:
                                  return [4, Object(tslib_es6.__await)(void 0)];
                                case 9:
                                  return [2, _b.sent()];
                                case 10:
                                  (chunkLength = value.length),
                                    (currentOffset = 0),
                                    (_b.label = 11);
                                case 11:
                                  if (!(currentOffset < chunkLength))
                                    return [3, 15];
                                  if (!currentMessage) {
                                    if (
                                      ((bytesRemaining =
                                        chunkLength - currentOffset),
                                      messageLengthBuffer ||
                                        (messageLengthBuffer = new Uint8Array(
                                          4
                                        )),
                                      (numBytesForTotal = Math.min(
                                        4 - currentMessagePendingLength,
                                        bytesRemaining
                                      )),
                                      messageLengthBuffer.set(
                                        value.slice(
                                          currentOffset,
                                          currentOffset + numBytesForTotal
                                        ),
                                        currentMessagePendingLength
                                      ),
                                      (currentOffset += numBytesForTotal),
                                      (currentMessagePendingLength +=
                                        numBytesForTotal) < 4)
                                    )
                                      return [3, 15];
                                    allocateMessage(
                                      new DataView(
                                        messageLengthBuffer.buffer
                                      ).getUint32(0, !1)
                                    ),
                                      (messageLengthBuffer = null);
                                  }
                                  return (
                                    (numBytesToWrite = Math.min(
                                      currentMessageTotalLength -
                                        currentMessagePendingLength,
                                      chunkLength - currentOffset
                                    )),
                                    currentMessage.set(
                                      value.slice(
                                        currentOffset,
                                        currentOffset + numBytesToWrite
                                      ),
                                      currentMessagePendingLength
                                    ),
                                    (currentMessagePendingLength +=
                                      numBytesToWrite),
                                    (currentOffset += numBytesToWrite),
                                    currentMessageTotalLength &&
                                    currentMessageTotalLength ===
                                      currentMessagePendingLength
                                      ? [
                                          4,
                                          Object(tslib_es6.__await)(
                                            currentMessage
                                          ),
                                        ]
                                      : [3, 14]
                                  );
                                case 12:
                                  return [4, _b.sent()];
                                case 13:
                                  _b.sent(),
                                    (currentMessage = null),
                                    (currentMessageTotalLength = 0),
                                    (currentMessagePendingLength = 0),
                                    (_b.label = 14);
                                case 14:
                                  return [3, 11];
                                case 15:
                                  return [3, 1];
                                case 16:
                                  return [2];
                              }
                            }
                          );
                        }
                      );
                    }),
                    _a
                  );
                })(body),
                {
                  eventMarshaller: this.eventMarshaller,
                  deserializer: deserializer,
                  toUtf8: this.utfEncoder,
                }
              );
            }),
            (EventStreamMarshaller.prototype.serialize = function (
              input,
              serializer
            ) {
              var _a,
                self = this;
              return (
                ((_a = {})[Symbol.asyncIterator] = function () {
                  return Object(tslib_es6.__asyncGenerator)(
                    this,
                    arguments,
                    function () {
                      var input_1, input_1_1, chunk, payloadBuf, e_1_1, e_1, _a;
                      return Object(tslib_es6.__generator)(this, function (_b) {
                        switch (_b.label) {
                          case 0:
                            _b.trys.push([0, 7, 8, 13]),
                              (input_1 = Object(tslib_es6.__asyncValues)(
                                input
                              )),
                              (_b.label = 1);
                          case 1:
                            return [
                              4,
                              Object(tslib_es6.__await)(input_1.next()),
                            ];
                          case 2:
                            return (input_1_1 = _b.sent()).done
                              ? [3, 6]
                              : ((chunk = input_1_1.value),
                                (payloadBuf = self.eventMarshaller.marshall(
                                  serializer(chunk)
                                )),
                                [4, Object(tslib_es6.__await)(payloadBuf)]);
                          case 3:
                            return [4, _b.sent()];
                          case 4:
                            _b.sent(), (_b.label = 5);
                          case 5:
                            return [3, 1];
                          case 6:
                            return [3, 13];
                          case 7:
                            return (
                              (e_1_1 = _b.sent()),
                              (e_1 = { error: e_1_1 }),
                              [3, 13]
                            );
                          case 8:
                            return (
                              _b.trys.push([8, , 11, 12]),
                              input_1_1 &&
                              !input_1_1.done &&
                              (_a = input_1.return)
                                ? [
                                    4,
                                    Object(tslib_es6.__await)(_a.call(input_1)),
                                  ]
                                : [3, 10]
                            );
                          case 9:
                            _b.sent(), (_b.label = 10);
                          case 10:
                            return [3, 12];
                          case 11:
                            if (e_1) throw e_1.error;
                            return [7];
                          case 12:
                            return [7];
                          case 13:
                            return [
                              4,
                              Object(tslib_es6.__await)(new Uint8Array(0)),
                            ];
                          case 14:
                            return [4, _b.sent()];
                          case 15:
                            return _b.sent(), [2];
                        }
                      });
                    }
                  );
                }),
                _a
              );
            }),
            EventStreamMarshaller
          );
        })(),
        eventstream_serde_browser_dist_es_EventStreamMarshaller_EventStreamMarshaller =
          (function () {
            function EventStreamMarshaller(_a) {
              var utf8Encoder = _a.utf8Encoder,
                utf8Decoder = _a.utf8Decoder;
              (this.eventMarshaller =
                new EventStreamMarshaller_EventStreamMarshaller(
                  utf8Encoder,
                  utf8Decoder
                )),
                (this.universalMarshaller =
                  new dist_es_EventStreamMarshaller_EventStreamMarshaller({
                    utf8Decoder: utf8Decoder,
                    utf8Encoder: utf8Encoder,
                  }));
            }
            return (
              (EventStreamMarshaller.prototype.deserialize = function (
                body,
                deserializer
              ) {
                var readableStream,
                  _a,
                  bodyIterable = isReadableStream(body)
                    ? ((readableStream = body),
                      ((_a = {})[Symbol.asyncIterator] = function () {
                        return Object(tslib_es6.__asyncGenerator)(
                          this,
                          arguments,
                          function () {
                            var reader, _a, done, value;
                            return Object(tslib_es6.__generator)(
                              this,
                              function (_b) {
                                switch (_b.label) {
                                  case 0:
                                    (reader = readableStream.getReader()),
                                      (_b.label = 1);
                                  case 1:
                                    _b.trys.push([1, , 9, 10]), (_b.label = 2);
                                  case 2:
                                    return [
                                      4,
                                      Object(tslib_es6.__await)(reader.read()),
                                    ];
                                  case 3:
                                    return (
                                      (_a = _b.sent()),
                                      (done = _a.done),
                                      (value = _a.value),
                                      done
                                        ? [4, Object(tslib_es6.__await)(void 0)]
                                        : [3, 5]
                                    );
                                  case 4:
                                    return [2, _b.sent()];
                                  case 5:
                                    return [
                                      4,
                                      Object(tslib_es6.__await)(value),
                                    ];
                                  case 6:
                                    return [4, _b.sent()];
                                  case 7:
                                    return _b.sent(), [3, 2];
                                  case 8:
                                    return [3, 10];
                                  case 9:
                                    return reader.releaseLock(), [7];
                                  case 10:
                                    return [2];
                                }
                              }
                            );
                          }
                        );
                      }),
                      _a)
                    : body;
                return this.universalMarshaller.deserialize(
                  bodyIterable,
                  deserializer
                );
              }),
              (EventStreamMarshaller.prototype.serialize = function (
                input,
                serializer
              ) {
                var iterator,
                  serialziedIterable = this.universalMarshaller.serialize(
                    input,
                    serializer
                  );
                return 'function' == typeof ReadableStream
                  ? ((iterator = serialziedIterable[Symbol.asyncIterator]()),
                    new ReadableStream({
                      pull: function (controller) {
                        return Object(tslib_es6.__awaiter)(
                          this,
                          void 0,
                          void 0,
                          function () {
                            var _a, done, value;
                            return Object(tslib_es6.__generator)(
                              this,
                              function (_b) {
                                switch (_b.label) {
                                  case 0:
                                    return [4, iterator.next()];
                                  case 1:
                                    return (
                                      (_a = _b.sent()),
                                      (done = _a.done),
                                      (value = _a.value),
                                      done
                                        ? [2, controller.close()]
                                        : (controller.enqueue(value), [2])
                                    );
                                }
                              }
                            );
                          }
                        );
                      },
                    }))
                  : serialziedIterable;
              }),
              EventStreamMarshaller
            );
          })(),
        isReadableStream = function (body) {
          return (
            'function' == typeof ReadableStream &&
            body instanceof ReadableStream
          );
        },
        fetch_http_handler_dist_es = __webpack_require__(307);
      function blobReader(blob, onChunk, chunkSize) {
        return (
          void 0 === chunkSize && (chunkSize = 1048576),
          new Promise(function (resolve, reject) {
            var fileReader = new FileReader();
            fileReader.addEventListener('error', reject),
              fileReader.addEventListener('abort', reject);
            var size = blob.size,
              totalBytesRead = 0;
            function read() {
              totalBytesRead >= size
                ? resolve()
                : fileReader.readAsArrayBuffer(
                    blob.slice(
                      totalBytesRead,
                      Math.min(size, totalBytesRead + chunkSize)
                    )
                  );
            }
            fileReader.addEventListener('load', function (event) {
              var result = event.target.result;
              onChunk(new Uint8Array(result)),
                (totalBytesRead += result.byteLength),
                read();
            }),
              read();
          })
        );
      }
      var invalid_dependency_dist_es = __webpack_require__(416);
      var es_fromUtf8 = function (input) {
          return 'function' == typeof TextEncoder
            ? (function whatwgEncodingApi_fromUtf8(input) {
                return new TextEncoder().encode(input);
              })(input)
            : (function (input) {
                for (var bytes = [], i = 0, len = input.length; i < len; i++) {
                  var value = input.charCodeAt(i);
                  if (value < 128) bytes.push(value);
                  else if (value < 2048)
                    bytes.push((value >> 6) | 192, (63 & value) | 128);
                  else if (
                    i + 1 < input.length &&
                    55296 == (64512 & value) &&
                    56320 == (64512 & input.charCodeAt(i + 1))
                  ) {
                    var surrogatePair =
                      65536 +
                      ((1023 & value) << 10) +
                      (1023 & input.charCodeAt(++i));
                    bytes.push(
                      (surrogatePair >> 18) | 240,
                      ((surrogatePair >> 12) & 63) | 128,
                      ((surrogatePair >> 6) & 63) | 128,
                      (63 & surrogatePair) | 128
                    );
                  } else
                    bytes.push(
                      (value >> 12) | 224,
                      ((value >> 6) & 63) | 128,
                      (63 & value) | 128
                    );
                }
                return Uint8Array.from(bytes);
              })(input);
        },
        INIT = [1732584193, 4023233417, 2562383102, 271733878],
        es_Md5 = (function () {
          function Md5() {
            (this.state = Uint32Array.from(INIT)),
              (this.buffer = new DataView(new ArrayBuffer(64))),
              (this.bufferLength = 0),
              (this.bytesHashed = 0),
              (this.finished = !1);
          }
          return (
            (Md5.prototype.update = function (sourceData) {
              if (
                !(function isEmptyData(data) {
                  if ('string' == typeof data) return 0 === data.length;
                  return 0 === data.byteLength;
                })(sourceData)
              ) {
                if (this.finished)
                  throw new Error(
                    'Attempted to update an already finished hash.'
                  );
                var data = (function convertToBuffer(data) {
                    if ('string' == typeof data) return es_fromUtf8(data);
                    if (ArrayBuffer.isView(data))
                      return new Uint8Array(
                        data.buffer,
                        data.byteOffset,
                        data.byteLength / Uint8Array.BYTES_PER_ELEMENT
                      );
                    return new Uint8Array(data);
                  })(sourceData),
                  position = 0,
                  byteLength = data.byteLength;
                for (this.bytesHashed += byteLength; byteLength > 0; )
                  this.buffer.setUint8(this.bufferLength++, data[position++]),
                    byteLength--,
                    64 === this.bufferLength &&
                      (this.hashBuffer(), (this.bufferLength = 0));
              }
            }),
            (Md5.prototype.digest = function () {
              return Object(tslib_es6.__awaiter)(
                this,
                void 0,
                void 0,
                function () {
                  var _a,
                    buffer,
                    undecoratedLength,
                    bytesHashed,
                    bitsHashed,
                    out,
                    i;
                  return Object(tslib_es6.__generator)(this, function (_b) {
                    if (!this.finished) {
                      if (
                        ((buffer = (_a = this).buffer),
                        (undecoratedLength = _a.bufferLength),
                        (bytesHashed = _a.bytesHashed),
                        (bitsHashed = 8 * bytesHashed),
                        buffer.setUint8(this.bufferLength++, 128),
                        undecoratedLength % 64 >= 56)
                      ) {
                        for (i = this.bufferLength; i < 64; i++)
                          buffer.setUint8(i, 0);
                        this.hashBuffer(), (this.bufferLength = 0);
                      }
                      for (i = this.bufferLength; i < 56; i++)
                        buffer.setUint8(i, 0);
                      buffer.setUint32(56, bitsHashed >>> 0, !0),
                        buffer.setUint32(
                          60,
                          Math.floor(bitsHashed / 4294967296),
                          !0
                        ),
                        this.hashBuffer(),
                        (this.finished = !0);
                    }
                    for (
                      out = new DataView(new ArrayBuffer(16)), i = 0;
                      i < 4;
                      i++
                    )
                      out.setUint32(4 * i, this.state[i], !0);
                    return [
                      2,
                      new Uint8Array(
                        out.buffer,
                        out.byteOffset,
                        out.byteLength
                      ),
                    ];
                  });
                }
              );
            }),
            (Md5.prototype.hashBuffer = function () {
              var buffer = this.buffer,
                state = this.state,
                a = state[0],
                b = state[1],
                c = state[2],
                d = state[3];
              (a = ff(a, b, c, d, buffer.getUint32(0, !0), 7, 3614090360)),
                (d = ff(d, a, b, c, buffer.getUint32(4, !0), 12, 3905402710)),
                (c = ff(c, d, a, b, buffer.getUint32(8, !0), 17, 606105819)),
                (b = ff(b, c, d, a, buffer.getUint32(12, !0), 22, 3250441966)),
                (a = ff(a, b, c, d, buffer.getUint32(16, !0), 7, 4118548399)),
                (d = ff(d, a, b, c, buffer.getUint32(20, !0), 12, 1200080426)),
                (c = ff(c, d, a, b, buffer.getUint32(24, !0), 17, 2821735955)),
                (b = ff(b, c, d, a, buffer.getUint32(28, !0), 22, 4249261313)),
                (a = ff(a, b, c, d, buffer.getUint32(32, !0), 7, 1770035416)),
                (d = ff(d, a, b, c, buffer.getUint32(36, !0), 12, 2336552879)),
                (c = ff(c, d, a, b, buffer.getUint32(40, !0), 17, 4294925233)),
                (b = ff(b, c, d, a, buffer.getUint32(44, !0), 22, 2304563134)),
                (a = ff(a, b, c, d, buffer.getUint32(48, !0), 7, 1804603682)),
                (d = ff(d, a, b, c, buffer.getUint32(52, !0), 12, 4254626195)),
                (c = ff(c, d, a, b, buffer.getUint32(56, !0), 17, 2792965006)),
                (a = gg(
                  a,
                  (b = ff(
                    b,
                    c,
                    d,
                    a,
                    buffer.getUint32(60, !0),
                    22,
                    1236535329
                  )),
                  c,
                  d,
                  buffer.getUint32(4, !0),
                  5,
                  4129170786
                )),
                (d = gg(d, a, b, c, buffer.getUint32(24, !0), 9, 3225465664)),
                (c = gg(c, d, a, b, buffer.getUint32(44, !0), 14, 643717713)),
                (b = gg(b, c, d, a, buffer.getUint32(0, !0), 20, 3921069994)),
                (a = gg(a, b, c, d, buffer.getUint32(20, !0), 5, 3593408605)),
                (d = gg(d, a, b, c, buffer.getUint32(40, !0), 9, 38016083)),
                (c = gg(c, d, a, b, buffer.getUint32(60, !0), 14, 3634488961)),
                (b = gg(b, c, d, a, buffer.getUint32(16, !0), 20, 3889429448)),
                (a = gg(a, b, c, d, buffer.getUint32(36, !0), 5, 568446438)),
                (d = gg(d, a, b, c, buffer.getUint32(56, !0), 9, 3275163606)),
                (c = gg(c, d, a, b, buffer.getUint32(12, !0), 14, 4107603335)),
                (b = gg(b, c, d, a, buffer.getUint32(32, !0), 20, 1163531501)),
                (a = gg(a, b, c, d, buffer.getUint32(52, !0), 5, 2850285829)),
                (d = gg(d, a, b, c, buffer.getUint32(8, !0), 9, 4243563512)),
                (c = gg(c, d, a, b, buffer.getUint32(28, !0), 14, 1735328473)),
                (a = hh(
                  a,
                  (b = gg(
                    b,
                    c,
                    d,
                    a,
                    buffer.getUint32(48, !0),
                    20,
                    2368359562
                  )),
                  c,
                  d,
                  buffer.getUint32(20, !0),
                  4,
                  4294588738
                )),
                (d = hh(d, a, b, c, buffer.getUint32(32, !0), 11, 2272392833)),
                (c = hh(c, d, a, b, buffer.getUint32(44, !0), 16, 1839030562)),
                (b = hh(b, c, d, a, buffer.getUint32(56, !0), 23, 4259657740)),
                (a = hh(a, b, c, d, buffer.getUint32(4, !0), 4, 2763975236)),
                (d = hh(d, a, b, c, buffer.getUint32(16, !0), 11, 1272893353)),
                (c = hh(c, d, a, b, buffer.getUint32(28, !0), 16, 4139469664)),
                (b = hh(b, c, d, a, buffer.getUint32(40, !0), 23, 3200236656)),
                (a = hh(a, b, c, d, buffer.getUint32(52, !0), 4, 681279174)),
                (d = hh(d, a, b, c, buffer.getUint32(0, !0), 11, 3936430074)),
                (c = hh(c, d, a, b, buffer.getUint32(12, !0), 16, 3572445317)),
                (b = hh(b, c, d, a, buffer.getUint32(24, !0), 23, 76029189)),
                (a = hh(a, b, c, d, buffer.getUint32(36, !0), 4, 3654602809)),
                (d = hh(d, a, b, c, buffer.getUint32(48, !0), 11, 3873151461)),
                (c = hh(c, d, a, b, buffer.getUint32(60, !0), 16, 530742520)),
                (a = ii(
                  a,
                  (b = hh(b, c, d, a, buffer.getUint32(8, !0), 23, 3299628645)),
                  c,
                  d,
                  buffer.getUint32(0, !0),
                  6,
                  4096336452
                )),
                (d = ii(d, a, b, c, buffer.getUint32(28, !0), 10, 1126891415)),
                (c = ii(c, d, a, b, buffer.getUint32(56, !0), 15, 2878612391)),
                (b = ii(b, c, d, a, buffer.getUint32(20, !0), 21, 4237533241)),
                (a = ii(a, b, c, d, buffer.getUint32(48, !0), 6, 1700485571)),
                (d = ii(d, a, b, c, buffer.getUint32(12, !0), 10, 2399980690)),
                (c = ii(c, d, a, b, buffer.getUint32(40, !0), 15, 4293915773)),
                (b = ii(b, c, d, a, buffer.getUint32(4, !0), 21, 2240044497)),
                (a = ii(a, b, c, d, buffer.getUint32(32, !0), 6, 1873313359)),
                (d = ii(d, a, b, c, buffer.getUint32(60, !0), 10, 4264355552)),
                (c = ii(c, d, a, b, buffer.getUint32(24, !0), 15, 2734768916)),
                (b = ii(b, c, d, a, buffer.getUint32(52, !0), 21, 1309151649)),
                (a = ii(a, b, c, d, buffer.getUint32(16, !0), 6, 4149444226)),
                (d = ii(d, a, b, c, buffer.getUint32(44, !0), 10, 3174756917)),
                (c = ii(c, d, a, b, buffer.getUint32(8, !0), 15, 718787259)),
                (b = ii(b, c, d, a, buffer.getUint32(36, !0), 21, 3951481745)),
                (state[0] = (a + state[0]) & 4294967295),
                (state[1] = (b + state[1]) & 4294967295),
                (state[2] = (c + state[2]) & 4294967295),
                (state[3] = (d + state[3]) & 4294967295);
            }),
            Md5
          );
        })();
      function cmn(q, a, b, x, s, t) {
        return (
          ((((a =
            (((a + q) & 4294967295) + ((x + t) & 4294967295)) & 4294967295) <<
            s) |
            (a >>> (32 - s))) +
            b) &
          4294967295
        );
      }
      function ff(a, b, c, d, x, s, t) {
        return cmn((b & c) | (~b & d), a, b, x, s, t);
      }
      function gg(a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & ~d), a, b, x, s, t);
      }
      function hh(a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
      }
      function ii(a, b, c, d, x, s, t) {
        return cmn(c ^ (b | ~d), a, b, x, s, t);
      }
      var middleware_retry_dist_es = __webpack_require__(199),
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
        ClientDefaultValues = __assign(
          __assign(
            {},
            {
              apiVersion: '2006-03-01',
              disableHostPrefix: !1,
              logger: {},
              regionInfoProvider: function (region, options) {
                var regionInfo = void 0;
                switch (region) {
                  case 'ap-east-1':
                    regionInfo = {
                      hostname: 's3.ap-east-1.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'ap-northeast-1':
                    regionInfo = {
                      hostname: 's3.ap-northeast-1.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'ap-northeast-2':
                    regionInfo = {
                      hostname: 's3.ap-northeast-2.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'ap-south-1':
                    regionInfo = {
                      hostname: 's3.ap-south-1.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'ap-southeast-1':
                    regionInfo = {
                      hostname: 's3.ap-southeast-1.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'ap-southeast-2':
                    regionInfo = {
                      hostname: 's3.ap-southeast-2.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'ca-central-1':
                    regionInfo = {
                      hostname: 's3.ca-central-1.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'cn-north-1':
                    regionInfo = {
                      hostname: 's3.cn-north-1.amazonaws.com.cn',
                      partition: 'aws-cn',
                    };
                    break;
                  case 'cn-northwest-1':
                    regionInfo = {
                      hostname: 's3.cn-northwest-1.amazonaws.com.cn',
                      partition: 'aws-cn',
                    };
                    break;
                  case 'eu-central-1':
                    regionInfo = {
                      hostname: 's3.eu-central-1.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'eu-north-1':
                    regionInfo = {
                      hostname: 's3.eu-north-1.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'eu-west-1':
                    regionInfo = {
                      hostname: 's3.eu-west-1.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'eu-west-2':
                    regionInfo = {
                      hostname: 's3.eu-west-2.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'eu-west-3':
                    regionInfo = {
                      hostname: 's3.eu-west-3.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'fips-us-gov-west-1':
                    regionInfo = {
                      hostname: 's3-fips-us-gov-west-1.amazonaws.com',
                      partition: 'aws-us-gov',
                      signingRegion: 'us-gov-west-1',
                    };
                    break;
                  case 'me-south-1':
                    regionInfo = {
                      hostname: 's3.me-south-1.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 's3-external-1':
                    regionInfo = {
                      hostname: 's3-external-1.amazonaws.com',
                      partition: 'aws',
                      signingRegion: 'us-east-1',
                    };
                    break;
                  case 'sa-east-1':
                    regionInfo = {
                      hostname: 's3.sa-east-1.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'us-east-1':
                    regionInfo = {
                      hostname: 's3.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'us-east-2':
                    regionInfo = {
                      hostname: 's3.us-east-2.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'us-gov-east-1':
                    regionInfo = {
                      hostname: 's3.us-gov-east-1.amazonaws.com',
                      partition: 'aws-us-gov',
                    };
                    break;
                  case 'us-gov-west-1':
                    regionInfo = {
                      hostname: 's3.us-gov-west-1.amazonaws.com',
                      partition: 'aws-us-gov',
                    };
                    break;
                  case 'us-iso-east-1':
                    regionInfo = {
                      hostname: 's3.us-iso-east-1.c2s.ic.gov',
                      partition: 'aws-iso',
                    };
                    break;
                  case 'us-isob-east-1':
                    regionInfo = {
                      hostname: 's3.us-isob-east-1.sc2s.sgov.gov',
                      partition: 'aws-iso-b',
                    };
                    break;
                  case 'us-west-1':
                    regionInfo = {
                      hostname: 's3.us-west-1.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  case 'us-west-2':
                    regionInfo = {
                      hostname: 's3.us-west-2.amazonaws.com',
                      partition: 'aws',
                    };
                    break;
                  default:
                    AWS_REGIONS.has(region) &&
                      (regionInfo = {
                        hostname: 's3.{region}.amazonaws.com'.replace(
                          '{region}',
                          region
                        ),
                        partition: 'aws',
                      }),
                      AWS_CN_REGIONS.has(region) &&
                        (regionInfo = {
                          hostname: 's3.{region}.amazonaws.com.cn'.replace(
                            '{region}',
                            region
                          ),
                          partition: 'aws-cn',
                        }),
                      AWS_ISO_REGIONS.has(region) &&
                        (regionInfo = {
                          hostname: 's3.{region}.c2s.ic.gov'.replace(
                            '{region}',
                            region
                          ),
                          partition: 'aws-iso',
                        }),
                      AWS_ISO_B_REGIONS.has(region) &&
                        (regionInfo = {
                          hostname: 's3.{region}.sc2s.sgov.gov'.replace(
                            '{region}',
                            region
                          ),
                          partition: 'aws-iso-b',
                        }),
                      AWS_US_GOV_REGIONS.has(region) &&
                        (regionInfo = {
                          hostname: 's3.{region}.amazonaws.com'.replace(
                            '{region}',
                            region
                          ),
                          partition: 'aws-us-gov',
                        }),
                      void 0 === regionInfo &&
                        (regionInfo = {
                          hostname: 's3.{region}.amazonaws.com'.replace(
                            '{region}',
                            region
                          ),
                          partition: 'aws',
                        });
                }
                return Promise.resolve(regionInfo);
              },
              signingEscapePath: !1,
              signingName: 's3',
              useArnRegion: !1,
            }
          ),
          {
            runtime: 'browser',
            base64Decoder: util_base64_browser_dist_es.a,
            base64Encoder: util_base64_browser_dist_es.b,
            bodyLengthChecker: util_body_length_browser_dist_es.a,
            credentialDefaultProvider: Object(invalid_dependency_dist_es.a)(
              'Credential is missing'
            ),
            defaultUserAgent: Object(util_user_agent_browser_dist_es.a)(
              es_package.name,
              es_package.version
            ),
            eventStreamSerdeProvider: function (options) {
              return new eventstream_serde_browser_dist_es_EventStreamMarshaller_EventStreamMarshaller(
                options
              );
            },
            maxAttempts: middleware_retry_dist_es.a,
            md5: es_Md5,
            region: Object(invalid_dependency_dist_es.a)('Region is missing'),
            requestHandler: new fetch_http_handler_dist_es.a(),
            sha256: sha256_browser_build.Sha256,
            streamCollector: fetch_http_handler_dist_es.b,
            streamHasher: function blobHasher(hashCtor, blob) {
              return Object(tslib_es6.__awaiter)(
                this,
                void 0,
                void 0,
                function () {
                  var hash;
                  return Object(tslib_es6.__generator)(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        return (
                          (hash = new hashCtor()),
                          [
                            4,
                            blobReader(blob, function (chunk) {
                              hash.update(chunk);
                            }),
                          ]
                        );
                      case 1:
                        return _a.sent(), [2, hash.digest()];
                    }
                  });
                }
              );
            },
            urlParser: url_parser_browser_dist_es.a,
            utf8Decoder: util_utf8_browser_dist_es.a,
            utf8Encoder: util_utf8_browser_dist_es.b,
          }
        ),
        config_resolver_dist_es = __webpack_require__(398),
        middleware_content_length_dist_es = __webpack_require__(415);
      var addExpectContinueMiddlewareOptions = {
          step: 'build',
          tags: ['SET_EXPECT_HEADER', 'EXPECT_HEADER'],
          name: 'addExpectContinueMiddleware',
        },
        getAddExpectContinuePlugin = function (options) {
          return {
            applyToStack: function (clientStack) {
              clientStack.add(
                (function addExpectContinueMiddleware(options) {
                  var _this = this;
                  return function (next) {
                    return function (args) {
                      return Object(tslib_es6.__awaiter)(
                        _this,
                        void 0,
                        void 0,
                        function () {
                          var request;
                          return Object(tslib_es6.__generator)(
                            this,
                            function (_a) {
                              return (
                                (request = args.request),
                                dist_es.a.isInstance(request) &&
                                  request.body &&
                                  'node' === options.runtime &&
                                  (request.headers = Object(tslib_es6.__assign)(
                                    Object(tslib_es6.__assign)(
                                      {},
                                      request.headers
                                    ),
                                    { Expect: '100-continue' }
                                  )),
                                [
                                  2,
                                  next(
                                    Object(tslib_es6.__assign)(
                                      Object(tslib_es6.__assign)({}, args),
                                      { request: request }
                                    )
                                  ),
                                ]
                              );
                            }
                          );
                        }
                      );
                    };
                  };
                })(options),
                addExpectContinueMiddlewareOptions
              );
            },
          };
        },
        middleware_host_header_dist_es = __webpack_require__(396),
        middleware_logger_dist_es = __webpack_require__(421);
      var validateBucketNameMiddlewareOptions = {
          step: 'initialize',
          tags: ['VALIDATE_BUCKET_NAME'],
          name: 'validateBucketNameMiddleware',
        },
        getValidateBucketNamePlugin = function (unused) {
          return {
            applyToStack: function (clientStack) {
              clientStack.add(
                (function validateBucketNameMiddleware() {
                  var _this = this;
                  return function (next) {
                    return function (args) {
                      return Object(tslib_es6.__awaiter)(
                        _this,
                        void 0,
                        void 0,
                        function () {
                          var Bucket, err;
                          return Object(tslib_es6.__generator)(
                            this,
                            function (_a) {
                              if (
                                'string' ==
                                  typeof (Bucket = args.input.Bucket) &&
                                !validate(Bucket) &&
                                Bucket.indexOf('/') >= 0
                              )
                                throw (
                                  (((err = new Error(
                                    "Bucket name shouldn't contain '/', received '" +
                                      Bucket +
                                      "'"
                                  )).name = 'InvalidBucketName'),
                                  err)
                                );
                              return [
                                2,
                                next(Object(tslib_es6.__assign)({}, args)),
                              ];
                            }
                          );
                        }
                      );
                    };
                  };
                })(),
                validateBucketNameMiddlewareOptions
              );
            },
          };
        },
        useRegionalEndpointMiddlewareOptions = {
          step: 'build',
          tags: ['USE_REGIONAL_ENDPOINT', 'S3'],
          name: 'useRegionalEndpointMiddleware',
        },
        getUseRegionalEndpointPlugin = function (config) {
          return {
            applyToStack: function (clientStack) {
              clientStack.add(
                (function (config) {
                  return function (next) {
                    return function (args) {
                      return Object(tslib_es6.__awaiter)(
                        void 0,
                        void 0,
                        void 0,
                        function () {
                          var request, _a;
                          return Object(tslib_es6.__generator)(
                            this,
                            function (_b) {
                              switch (_b.label) {
                                case 0:
                                  return (
                                    (request = args.request),
                                    !dist_es.a.isInstance(request) ||
                                    config.isCustomEndpoint
                                      ? [
                                          2,
                                          next(
                                            Object(tslib_es6.__assign)({}, args)
                                          ),
                                        ]
                                      : 's3.amazonaws.com' !== request.hostname
                                      ? [3, 1]
                                      : ((request.hostname =
                                          's3.us-east-1.amazonaws.com'),
                                        [3, 3])
                                  );
                                case 1:
                                  return (
                                    (_a = 'aws-global'), [4, config.region()]
                                  );
                                case 2:
                                  _a === _b.sent() &&
                                    (request.hostname = 's3.amazonaws.com'),
                                    (_b.label = 3);
                                case 3:
                                  return [
                                    2,
                                    next(Object(tslib_es6.__assign)({}, args)),
                                  ];
                              }
                            }
                          );
                        }
                      );
                    };
                  };
                })(config),
                useRegionalEndpointMiddlewareOptions
              );
            },
          };
        },
        middleware_signing_dist_es = __webpack_require__(420),
        middleware_user_agent_dist_es = __webpack_require__(399),
        S3Client_S3Client = (function (_super) {
          function S3Client(configuration) {
            var input,
              _this = this,
              _config_0 = __assign(
                __assign({}, ClientDefaultValues),
                configuration
              ),
              _config_1 = Object(config_resolver_dist_es.b)(_config_0),
              _config_2 = Object(config_resolver_dist_es.a)(_config_1),
              _config_3 = Object(middleware_signing_dist_es.b)(_config_2),
              _config_4 = Object(middleware_retry_dist_es.c)(_config_3),
              _config_6 = (function resolveBucketEndpointConfig(input) {
                var _a = input.bucketEndpoint,
                  bucketEndpoint = void 0 !== _a && _a,
                  _b = input.forcePathStyle,
                  forcePathStyle = void 0 !== _b && _b,
                  _c = input.useAccelerateEndpoint,
                  useAccelerateEndpoint = void 0 !== _c && _c,
                  _d = input.useDualstackEndpoint,
                  useDualstackEndpoint = void 0 !== _d && _d,
                  _e = input.useArnRegion,
                  useArnRegion = void 0 !== _e && _e;
                return Object(tslib_es6.__assign)(
                  Object(tslib_es6.__assign)({}, input),
                  {
                    bucketEndpoint: bucketEndpoint,
                    forcePathStyle: forcePathStyle,
                    useAccelerateEndpoint: useAccelerateEndpoint,
                    useDualstackEndpoint: useDualstackEndpoint,
                    useArnRegion:
                      'function' == typeof useArnRegion
                        ? useArnRegion
                        : function () {
                            return Promise.resolve(useArnRegion);
                          },
                  }
                );
              })(Object(middleware_user_agent_dist_es.b)(_config_4)),
              _config_7 = Object(middleware_host_header_dist_es.b)(_config_6),
              _config_8 =
                ((input = _config_7),
                Object(tslib_es6.__assign)(
                  Object(tslib_es6.__assign)({}, input),
                  {
                    eventStreamMarshaller:
                      input.eventStreamSerdeProvider(input),
                  }
                ));
            return (
              ((_this = _super.call(this, _config_8) || this).config =
                _config_8),
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
                getValidateBucketNamePlugin(_this.config)
              ),
              _this.middlewareStack.use(
                getUseRegionalEndpointPlugin(_this.config)
              ),
              _this.middlewareStack.use(
                getAddExpectContinuePlugin(_this.config)
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
            __extends(S3Client, _super),
            (S3Client.prototype.destroy = function () {
              _super.prototype.destroy.call(this);
            }),
            S3Client
          );
        })(es.a),
        querystring_builder_dist_es = __webpack_require__(287);
      function formatUrl(request) {
        var port = request.port,
          query = request.query,
          protocol = request.protocol,
          path = request.path,
          hostname = request.hostname;
        protocol && ':' !== protocol.substr(-1) && (protocol += ':'),
          port && (hostname += ':' + port),
          path && '/' !== path.charAt(0) && (path = '/' + path);
        var queryString = query
          ? Object(querystring_builder_dist_es.a)(query)
          : '';
        return (
          queryString &&
            '?' !== queryString[0] &&
            (queryString = '?' + queryString),
          protocol + '//' + hostname + path + queryString
        );
      }
      function createRequest(client, command) {
        return Object(tslib_es6.__awaiter)(this, void 0, void 0, function () {
          var interceptMiddleware,
            clientStack,
            _this = this;
          return Object(tslib_es6.__generator)(this, function (_a) {
            switch (_a.label) {
              case 0:
                return (
                  (interceptMiddleware = function (next) {
                    return function (args) {
                      return Object(tslib_es6.__awaiter)(
                        _this,
                        void 0,
                        void 0,
                        function () {
                          return Object(tslib_es6.__generator)(
                            this,
                            function (_a) {
                              return [
                                2,
                                {
                                  output: { request: args.request },
                                  response: void 0,
                                },
                              ];
                            }
                          );
                        }
                      );
                    };
                  }),
                  (clientStack = client.middlewareStack.clone()).add(
                    interceptMiddleware,
                    { step: 'build', priority: 'low' }
                  ),
                  [
                    4,
                    command
                      .resolveMiddleware(
                        clientStack,
                        client.config,
                        void 0
                      )(command)
                      .then(function (output) {
                        return output.output.request;
                      }),
                  ]
                );
              case 1:
                return [2, _a.sent()];
            }
          });
        });
      }
      var signature_v4_dist_es = __webpack_require__(640),
        presigner_S3RequestPresigner = (function () {
          function S3RequestPresigner(options) {
            var resolvedOptions = Object(tslib_es6.__assign)(
              {
                service: options.signingName || options.service || 's3',
                uriEscapePath: options.uriEscapePath || !1,
              },
              options
            );
            this.signer = new signature_v4_dist_es.a(resolvedOptions);
          }
          return (
            (S3RequestPresigner.prototype.presign = function (
              requestToSign,
              _a
            ) {
              void 0 === _a && (_a = {});
              var _b = _a.unsignableHeaders,
                unsignableHeaders = void 0 === _b ? new Set() : _b,
                options = Object(tslib_es6.__rest)(_a, ['unsignableHeaders']);
              return Object(tslib_es6.__awaiter)(
                this,
                void 0,
                void 0,
                function () {
                  return Object(tslib_es6.__generator)(this, function (_c) {
                    return (
                      unsignableHeaders.add('content-type'),
                      (requestToSign.headers['X-Amz-Content-Sha256'] =
                        'UNSIGNED-PAYLOAD'),
                      [
                        2,
                        this.signer.presign(
                          requestToSign,
                          Object(tslib_es6.__assign)(
                            {
                              expiresIn: 900,
                              unsignableHeaders: unsignableHeaders,
                            },
                            options
                          )
                        ),
                      ]
                    );
                  });
                }
              );
            }),
            S3RequestPresigner
          );
        })(),
        axios = __webpack_require__(189),
        axios_default = __webpack_require__.n(axios),
        axios_http_handler_logger = new ConsoleLogger.a('axios-http-handler'),
        axios_http_handler_AxiosHttpHandler = (function () {
          function AxiosHttpHandler(httpOptions, emitter) {
            void 0 === httpOptions && (httpOptions = {}),
              (this.httpOptions = httpOptions),
              (this.emitter = emitter);
          }
          return (
            (AxiosHttpHandler.prototype.destroy = function () {}),
            (AxiosHttpHandler.prototype.handle = function (request, options) {
              var requestTimeoutInMs = this.httpOptions.requestTimeout,
                emitter = this.emitter,
                path = request.path;
              if (request.query) {
                var queryString = Object(querystring_builder_dist_es.a)(
                  request.query
                );
                queryString && (path += '?' + queryString);
              }
              var port = request.port,
                url =
                  request.protocol +
                  '//' +
                  request.hostname +
                  (port ? ':' + port : '') +
                  path,
                axiosRequest = {};
              (axiosRequest.url = url),
                (axiosRequest.method = request.method),
                (axiosRequest.headers = request.headers),
                delete axiosRequest.headers.host,
                request.body
                  ? (axiosRequest.data = request.body)
                  : axiosRequest.headers['Content-Type'] &&
                    (axiosRequest.data = null),
                emitter &&
                  (axiosRequest.onUploadProgress = function (event) {
                    emitter.emit('sendProgress', event),
                      axios_http_handler_logger.debug(event);
                  }),
                (axiosRequest.responseType = 'blob');
              var raceOfPromises = [
                axios_default.a
                  .request(axiosRequest)
                  .then(function (response) {
                    return {
                      response: new dist_es.b({
                        headers: response.headers,
                        statusCode: response.status,
                        body: response.data,
                      }),
                    };
                  })
                  .catch(function (error) {
                    throw (axios_http_handler_logger.error(error), error);
                  }),
                requestTimeout(requestTimeoutInMs),
              ];
              return Promise.race(raceOfPromises);
            }),
            AxiosHttpHandler
          );
        })();
      function requestTimeout(timeoutInMs) {
        return (
          void 0 === timeoutInMs && (timeoutInMs = 0),
          new Promise(function (resolve, reject) {
            timeoutInMs &&
              setTimeout(function () {
                var timeoutError = new Error(
                  'Request did not complete within ' + timeoutInMs + ' ms'
                );
                (timeoutError.name = 'TimeoutError'), reject(timeoutError);
              }, timeoutInMs);
          })
        );
      }
      var RestoreRequestType,
        models_1_RestoreRequest,
        models_1_RestoreObjectRequest,
        models_1_ContinuationEvent,
        models_1_EndEvent,
        models_1_Progress,
        models_1_ProgressEvent,
        models_1_RecordsEvent,
        models_1_Stats,
        models_1_StatsEvent,
        SelectObjectContentEventStream,
        models_1_SelectObjectContentOutput,
        models_1_RequestProgress,
        models_1_ScanRange,
        models_1_SelectObjectContentRequest,
        models_1_UploadPartOutput,
        models_1_UploadPartRequest,
        models_1_CopyPartResult,
        models_1_UploadPartCopyOutput,
        models_1_UploadPartCopyRequest,
        PutObjectCommand_PutObjectCommand = (function (_super) {
          function PutObjectCommand(input) {
            var _this = _super.call(this) || this;
            return (_this.input = input), _this;
          }
          return (
            __extends(PutObjectCommand, _super),
            (PutObjectCommand.prototype.resolveMiddleware = function (
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
              ),
                this.middlewareStack.use(getSsecPlugin(configuration)),
                this.middlewareStack.use(
                  getBucketEndpointPlugin(configuration)
                );
              var stack = clientStack.concat(this.middlewareStack),
                logger = configuration.logger,
                handlerExecutionContext = {
                  logger: logger,
                  clientName: 'S3Client',
                  commandName: 'PutObjectCommand',
                  inputFilterSensitiveLog:
                    models_0_PutObjectRequest.filterSensitiveLog,
                  outputFilterSensitiveLog:
                    models_0_PutObjectOutput.filterSensitiveLog,
                };
              'function' == typeof logger.info &&
                logger.info({
                  clientName: 'S3Client',
                  commandName: 'PutObjectCommand',
                });
              var requestHandler = configuration.requestHandler;
              return stack.resolve(function (request) {
                return requestHandler.handle(request.request, options || {});
              }, handlerExecutionContext);
            }),
            (PutObjectCommand.prototype.serialize = function (input, context) {
              return (function (input, context) {
                return __awaiter(void 0, void 0, void 0, function () {
                  var headers,
                    resolvedPath,
                    labelValue,
                    query,
                    body,
                    contents,
                    _a,
                    hostname,
                    _b,
                    protocol,
                    port;
                  return __generator(this, function (_c) {
                    switch (_c.label) {
                      case 0:
                        if (
                          ((headers = __assign(
                            __assign(
                              __assign(
                                __assign(
                                  __assign(
                                    __assign(
                                      __assign(
                                        __assign(
                                          __assign(
                                            __assign(
                                              __assign(
                                                __assign(
                                                  __assign(
                                                    __assign(
                                                      __assign(
                                                        __assign(
                                                          __assign(
                                                            __assign(
                                                              __assign(
                                                                __assign(
                                                                  __assign(
                                                                    __assign(
                                                                      __assign(
                                                                        __assign(
                                                                          __assign(
                                                                            __assign(
                                                                              __assign(
                                                                                __assign(
                                                                                  {
                                                                                    'Content-Type':
                                                                                      'application/octet-stream',
                                                                                  },
                                                                                  isSerializableHeaderValue(
                                                                                    input.GrantFullControl
                                                                                  ) && {
                                                                                    'x-amz-grant-full-control':
                                                                                      input.GrantFullControl,
                                                                                  }
                                                                                ),
                                                                                isSerializableHeaderValue(
                                                                                  input.ContentEncoding
                                                                                ) && {
                                                                                  'Content-Encoding':
                                                                                    input.ContentEncoding,
                                                                                }
                                                                              ),
                                                                              isSerializableHeaderValue(
                                                                                input.RequestPayer
                                                                              ) && {
                                                                                'x-amz-request-payer':
                                                                                  input.RequestPayer,
                                                                              }
                                                                            ),
                                                                            isSerializableHeaderValue(
                                                                              input.GrantReadACP
                                                                            ) && {
                                                                              'x-amz-grant-read-acp':
                                                                                input.GrantReadACP,
                                                                            }
                                                                          ),
                                                                          isSerializableHeaderValue(
                                                                            input.SSECustomerKeyMD5
                                                                          ) && {
                                                                            'x-amz-server-side-encryption-customer-key-MD5':
                                                                              input.SSECustomerKeyMD5,
                                                                          }
                                                                        ),
                                                                        isSerializableHeaderValue(
                                                                          input.CacheControl
                                                                        ) && {
                                                                          'Cache-Control':
                                                                            input.CacheControl,
                                                                        }
                                                                      ),
                                                                      isSerializableHeaderValue(
                                                                        input.WebsiteRedirectLocation
                                                                      ) && {
                                                                        'x-amz-website-redirect-location':
                                                                          input.WebsiteRedirectLocation,
                                                                      }
                                                                    ),
                                                                    isSerializableHeaderValue(
                                                                      input.ObjectLockLegalHoldStatus
                                                                    ) && {
                                                                      'x-amz-object-lock-legal-hold':
                                                                        input.ObjectLockLegalHoldStatus,
                                                                    }
                                                                  ),
                                                                  isSerializableHeaderValue(
                                                                    input.GrantWriteACP
                                                                  ) && {
                                                                    'x-amz-grant-write-acp':
                                                                      input.GrantWriteACP,
                                                                  }
                                                                ),
                                                                isSerializableHeaderValue(
                                                                  input.ContentLength
                                                                ) && {
                                                                  'Content-Length':
                                                                    input.ContentLength.toString(),
                                                                }
                                                              ),
                                                              isSerializableHeaderValue(
                                                                input.ObjectLockRetainUntilDate
                                                              ) && {
                                                                'x-amz-object-lock-retain-until-date':
                                                                  (
                                                                    input.ObjectLockRetainUntilDate.toISOString().split(
                                                                      '.'
                                                                    )[0] + 'Z'
                                                                  ).toString(),
                                                              }
                                                            ),
                                                            isSerializableHeaderValue(
                                                              input.SSECustomerAlgorithm
                                                            ) && {
                                                              'x-amz-server-side-encryption-customer-algorithm':
                                                                input.SSECustomerAlgorithm,
                                                            }
                                                          ),
                                                          isSerializableHeaderValue(
                                                            input.ContentDisposition
                                                          ) && {
                                                            'Content-Disposition':
                                                              input.ContentDisposition,
                                                          }
                                                        ),
                                                        isSerializableHeaderValue(
                                                          input.SSECustomerKey
                                                        ) && {
                                                          'x-amz-server-side-encryption-customer-key':
                                                            input.SSECustomerKey,
                                                        }
                                                      ),
                                                      isSerializableHeaderValue(
                                                        input.SSEKMSEncryptionContext
                                                      ) && {
                                                        'x-amz-server-side-encryption-context':
                                                          input.SSEKMSEncryptionContext,
                                                      }
                                                    ),
                                                    isSerializableHeaderValue(
                                                      input.Tagging
                                                    ) && {
                                                      'x-amz-tagging':
                                                        input.Tagging,
                                                    }
                                                  ),
                                                  isSerializableHeaderValue(
                                                    input.Expires
                                                  ) && {
                                                    Expires: Object(es.e)(
                                                      input.Expires
                                                    ).toString(),
                                                  }
                                                ),
                                                isSerializableHeaderValue(
                                                  input.StorageClass
                                                ) && {
                                                  'x-amz-storage-class':
                                                    input.StorageClass,
                                                }
                                              ),
                                              isSerializableHeaderValue(
                                                input.ExpectedBucketOwner
                                              ) && {
                                                'x-amz-expected-bucket-owner':
                                                  input.ExpectedBucketOwner,
                                              }
                                            ),
                                            isSerializableHeaderValue(
                                              input.ContentMD5
                                            ) && {
                                              'Content-MD5': input.ContentMD5,
                                            }
                                          ),
                                          isSerializableHeaderValue(
                                            input.ServerSideEncryption
                                          ) && {
                                            'x-amz-server-side-encryption':
                                              input.ServerSideEncryption,
                                          }
                                        ),
                                        isSerializableHeaderValue(
                                          input.ObjectLockMode
                                        ) && {
                                          'x-amz-object-lock-mode':
                                            input.ObjectLockMode,
                                        }
                                      ),
                                      isSerializableHeaderValue(
                                        input.SSEKMSKeyId
                                      ) && {
                                        'x-amz-server-side-encryption-aws-kms-key-id':
                                          input.SSEKMSKeyId,
                                      }
                                    ),
                                    isSerializableHeaderValue(
                                      input.ContentLanguage
                                    ) && {
                                      'Content-Language': input.ContentLanguage,
                                    }
                                  ),
                                  isSerializableHeaderValue(
                                    input.GrantRead
                                  ) && { 'x-amz-grant-read': input.GrantRead }
                                ),
                                isSerializableHeaderValue(input.ACL) && {
                                  'x-amz-acl': input.ACL,
                                }
                              ),
                              isSerializableHeaderValue(input.ContentType) && {
                                'Content-Type': input.ContentType,
                              }
                            ),
                            void 0 !== input.Metadata &&
                              Object.keys(input.Metadata).reduce(function (
                                acc,
                                suffix
                              ) {
                                return (
                                  (acc['x-amz-meta-' + suffix] =
                                    input.Metadata[suffix]),
                                  acc
                                );
                              },
                              {})
                          )),
                          (resolvedPath = '/{Bucket}/{Key+}'),
                          void 0 === input.Bucket)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: Bucket.'
                          );
                        if ((labelValue = input.Bucket).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: Bucket.'
                          );
                        if (
                          ((resolvedPath = resolvedPath.replace(
                            '{Bucket}',
                            Object(es.f)(labelValue)
                          )),
                          void 0 === input.Key)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: Key.'
                          );
                        if ((labelValue = input.Key).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: Key.'
                          );
                        return (
                          (resolvedPath = resolvedPath.replace(
                            '{Key+}',
                            labelValue
                              .split('/')
                              .map(function (segment) {
                                return Object(es.f)(segment);
                              })
                              .join('/')
                          )),
                          (query = { 'x-id': 'PutObject' }),
                          void 0 !== input.Body &&
                            ((contents = input.Body), (body = contents)),
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
                            new dist_es.a({
                              protocol: protocol,
                              hostname: hostname,
                              port: port,
                              method: 'PUT',
                              headers: headers,
                              path: resolvedPath,
                              query: query,
                              body: body,
                            }),
                          ]
                        );
                    }
                  });
                });
              })(input, context);
            }),
            (PutObjectCommand.prototype.deserialize = function (
              output,
              context
            ) {
              return (function (output, context) {
                return __awaiter(void 0, void 0, void 0, function () {
                  var contents;
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        return 200 !== output.statusCode &&
                          output.statusCode >= 300
                          ? [
                              2,
                              deserializeAws_restXmlPutObjectCommandError(
                                output,
                                context
                              ),
                            ]
                          : ((contents = {
                              $metadata: deserializeMetadata(output),
                              ETag: void 0,
                              Expiration: void 0,
                              RequestCharged: void 0,
                              SSECustomerAlgorithm: void 0,
                              SSECustomerKeyMD5: void 0,
                              SSEKMSEncryptionContext: void 0,
                              SSEKMSKeyId: void 0,
                              ServerSideEncryption: void 0,
                              VersionId: void 0,
                            }),
                            void 0 !==
                              output.headers[
                                'x-amz-server-side-encryption-context'
                              ] &&
                              (contents.SSEKMSEncryptionContext =
                                output.headers[
                                  'x-amz-server-side-encryption-context'
                                ]),
                            void 0 !== output.headers['x-amz-expiration'] &&
                              (contents.Expiration =
                                output.headers['x-amz-expiration']),
                            void 0 !==
                              output.headers[
                                'x-amz-server-side-encryption-customer-key-md5'
                              ] &&
                              (contents.SSECustomerKeyMD5 =
                                output.headers[
                                  'x-amz-server-side-encryption-customer-key-md5'
                                ]),
                            void 0 !== output.headers.etag &&
                              (contents.ETag = output.headers.etag),
                            void 0 !==
                              output.headers[
                                'x-amz-server-side-encryption-customer-algorithm'
                              ] &&
                              (contents.SSECustomerAlgorithm =
                                output.headers[
                                  'x-amz-server-side-encryption-customer-algorithm'
                                ]),
                            void 0 !== output.headers['x-amz-version-id'] &&
                              (contents.VersionId =
                                output.headers['x-amz-version-id']),
                            void 0 !==
                              output.headers['x-amz-request-charged'] &&
                              (contents.RequestCharged =
                                output.headers['x-amz-request-charged']),
                            void 0 !==
                              output.headers[
                                'x-amz-server-side-encryption-aws-kms-key-id'
                              ] &&
                              (contents.SSEKMSKeyId =
                                output.headers[
                                  'x-amz-server-side-encryption-aws-kms-key-id'
                                ]),
                            void 0 !==
                              output.headers['x-amz-server-side-encryption'] &&
                              (contents.ServerSideEncryption =
                                output.headers['x-amz-server-side-encryption']),
                            [4, collectBody(output.body, context)]);
                      case 1:
                        return _a.sent(), [2, Promise.resolve(contents)];
                    }
                  });
                });
              })(output, context);
            }),
            PutObjectCommand
          );
        })(es.b),
        CreateMultipartUploadCommand_CreateMultipartUploadCommand = (function (
          _super
        ) {
          function CreateMultipartUploadCommand(input) {
            var _this = _super.call(this) || this;
            return (_this.input = input), _this;
          }
          return (
            __extends(CreateMultipartUploadCommand, _super),
            (CreateMultipartUploadCommand.prototype.resolveMiddleware =
              function (clientStack, configuration, options) {
                this.middlewareStack.use(
                  Object(middleware_serde_dist_es.a)(
                    configuration,
                    this.serialize,
                    this.deserialize
                  )
                ),
                  this.middlewareStack.use(getSsecPlugin(configuration)),
                  this.middlewareStack.use(
                    getBucketEndpointPlugin(configuration)
                  );
                var stack = clientStack.concat(this.middlewareStack),
                  logger = configuration.logger,
                  handlerExecutionContext = {
                    logger: logger,
                    clientName: 'S3Client',
                    commandName: 'CreateMultipartUploadCommand',
                    inputFilterSensitiveLog:
                      models_0_CreateMultipartUploadRequest.filterSensitiveLog,
                    outputFilterSensitiveLog:
                      models_0_CreateMultipartUploadOutput.filterSensitiveLog,
                  };
                'function' == typeof logger.info &&
                  logger.info({
                    clientName: 'S3Client',
                    commandName: 'CreateMultipartUploadCommand',
                  });
                var requestHandler = configuration.requestHandler;
                return stack.resolve(function (request) {
                  return requestHandler.handle(request.request, options || {});
                }, handlerExecutionContext);
              }),
            (CreateMultipartUploadCommand.prototype.serialize = function (
              input,
              context
            ) {
              return (function (input, context) {
                return __awaiter(void 0, void 0, void 0, function () {
                  var headers,
                    resolvedPath,
                    labelValue,
                    query,
                    _a,
                    hostname,
                    _b,
                    protocol,
                    port;
                  return __generator(this, function (_c) {
                    switch (_c.label) {
                      case 0:
                        if (
                          ((headers = __assign(
                            __assign(
                              __assign(
                                __assign(
                                  __assign(
                                    __assign(
                                      __assign(
                                        __assign(
                                          __assign(
                                            __assign(
                                              __assign(
                                                __assign(
                                                  __assign(
                                                    __assign(
                                                      __assign(
                                                        __assign(
                                                          __assign(
                                                            __assign(
                                                              __assign(
                                                                __assign(
                                                                  __assign(
                                                                    __assign(
                                                                      __assign(
                                                                        __assign(
                                                                          __assign(
                                                                            __assign(
                                                                              {
                                                                                'Content-Type':
                                                                                  '',
                                                                              },
                                                                              isSerializableHeaderValue(
                                                                                input.GrantFullControl
                                                                              ) && {
                                                                                'x-amz-grant-full-control':
                                                                                  input.GrantFullControl,
                                                                              }
                                                                            ),
                                                                            isSerializableHeaderValue(
                                                                              input.SSECustomerKeyMD5
                                                                            ) && {
                                                                              'x-amz-server-side-encryption-customer-key-MD5':
                                                                                input.SSECustomerKeyMD5,
                                                                            }
                                                                          ),
                                                                          isSerializableHeaderValue(
                                                                            input.SSECustomerAlgorithm
                                                                          ) && {
                                                                            'x-amz-server-side-encryption-customer-algorithm':
                                                                              input.SSECustomerAlgorithm,
                                                                          }
                                                                        ),
                                                                        isSerializableHeaderValue(
                                                                          input.SSEKMSKeyId
                                                                        ) && {
                                                                          'x-amz-server-side-encryption-aws-kms-key-id':
                                                                            input.SSEKMSKeyId,
                                                                        }
                                                                      ),
                                                                      isSerializableHeaderValue(
                                                                        input.ObjectLockLegalHoldStatus
                                                                      ) && {
                                                                        'x-amz-object-lock-legal-hold':
                                                                          input.ObjectLockLegalHoldStatus,
                                                                      }
                                                                    ),
                                                                    isSerializableHeaderValue(
                                                                      input.RequestPayer
                                                                    ) && {
                                                                      'x-amz-request-payer':
                                                                        input.RequestPayer,
                                                                    }
                                                                  ),
                                                                  isSerializableHeaderValue(
                                                                    input.GrantRead
                                                                  ) && {
                                                                    'x-amz-grant-read':
                                                                      input.GrantRead,
                                                                  }
                                                                ),
                                                                isSerializableHeaderValue(
                                                                  input.GrantWriteACP
                                                                ) && {
                                                                  'x-amz-grant-write-acp':
                                                                    input.GrantWriteACP,
                                                                }
                                                              ),
                                                              isSerializableHeaderValue(
                                                                input.WebsiteRedirectLocation
                                                              ) && {
                                                                'x-amz-website-redirect-location':
                                                                  input.WebsiteRedirectLocation,
                                                              }
                                                            ),
                                                            isSerializableHeaderValue(
                                                              input.ContentType
                                                            ) && {
                                                              'Content-Type':
                                                                input.ContentType,
                                                            }
                                                          ),
                                                          isSerializableHeaderValue(
                                                            input.ContentLanguage
                                                          ) && {
                                                            'Content-Language':
                                                              input.ContentLanguage,
                                                          }
                                                        ),
                                                        isSerializableHeaderValue(
                                                          input.CacheControl
                                                        ) && {
                                                          'Cache-Control':
                                                            input.CacheControl,
                                                        }
                                                      ),
                                                      isSerializableHeaderValue(
                                                        input.GrantReadACP
                                                      ) && {
                                                        'x-amz-grant-read-acp':
                                                          input.GrantReadACP,
                                                      }
                                                    ),
                                                    isSerializableHeaderValue(
                                                      input.Tagging
                                                    ) && {
                                                      'x-amz-tagging':
                                                        input.Tagging,
                                                    }
                                                  ),
                                                  isSerializableHeaderValue(
                                                    input.SSEKMSEncryptionContext
                                                  ) && {
                                                    'x-amz-server-side-encryption-context':
                                                      input.SSEKMSEncryptionContext,
                                                  }
                                                ),
                                                isSerializableHeaderValue(
                                                  input.ACL
                                                ) && { 'x-amz-acl': input.ACL }
                                              ),
                                              isSerializableHeaderValue(
                                                input.SSECustomerKey
                                              ) && {
                                                'x-amz-server-side-encryption-customer-key':
                                                  input.SSECustomerKey,
                                              }
                                            ),
                                            isSerializableHeaderValue(
                                              input.ExpectedBucketOwner
                                            ) && {
                                              'x-amz-expected-bucket-owner':
                                                input.ExpectedBucketOwner,
                                            }
                                          ),
                                          isSerializableHeaderValue(
                                            input.Expires
                                          ) && {
                                            Expires: Object(es.e)(
                                              input.Expires
                                            ).toString(),
                                          }
                                        ),
                                        isSerializableHeaderValue(
                                          input.ObjectLockRetainUntilDate
                                        ) && {
                                          'x-amz-object-lock-retain-until-date':
                                            (
                                              input.ObjectLockRetainUntilDate.toISOString().split(
                                                '.'
                                              )[0] + 'Z'
                                            ).toString(),
                                        }
                                      ),
                                      isSerializableHeaderValue(
                                        input.ServerSideEncryption
                                      ) && {
                                        'x-amz-server-side-encryption':
                                          input.ServerSideEncryption,
                                      }
                                    ),
                                    isSerializableHeaderValue(
                                      input.ContentDisposition
                                    ) && {
                                      'Content-Disposition':
                                        input.ContentDisposition,
                                    }
                                  ),
                                  isSerializableHeaderValue(
                                    input.ObjectLockMode
                                  ) && {
                                    'x-amz-object-lock-mode':
                                      input.ObjectLockMode,
                                  }
                                ),
                                isSerializableHeaderValue(
                                  input.StorageClass
                                ) && {
                                  'x-amz-storage-class': input.StorageClass,
                                }
                              ),
                              isSerializableHeaderValue(
                                input.ContentEncoding
                              ) && { 'Content-Encoding': input.ContentEncoding }
                            ),
                            void 0 !== input.Metadata &&
                              Object.keys(input.Metadata).reduce(function (
                                acc,
                                suffix
                              ) {
                                return (
                                  (acc['x-amz-meta-' + suffix] =
                                    input.Metadata[suffix]),
                                  acc
                                );
                              },
                              {})
                          )),
                          (resolvedPath = '/{Bucket}/{Key+}'),
                          void 0 === input.Bucket)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: Bucket.'
                          );
                        if ((labelValue = input.Bucket).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: Bucket.'
                          );
                        if (
                          ((resolvedPath = resolvedPath.replace(
                            '{Bucket}',
                            Object(es.f)(labelValue)
                          )),
                          void 0 === input.Key)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: Key.'
                          );
                        if ((labelValue = input.Key).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: Key.'
                          );
                        return (
                          (resolvedPath = resolvedPath.replace(
                            '{Key+}',
                            labelValue
                              .split('/')
                              .map(function (segment) {
                                return Object(es.f)(segment);
                              })
                              .join('/')
                          )),
                          (query = { uploads: '' }),
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
                            new dist_es.a({
                              protocol: protocol,
                              hostname: hostname,
                              port: port,
                              method: 'POST',
                              headers: headers,
                              path: resolvedPath,
                              query: query,
                              body: void 0,
                            }),
                          ]
                        );
                    }
                  });
                });
              })(input, context);
            }),
            (CreateMultipartUploadCommand.prototype.deserialize = function (
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
                              deserializeAws_restXmlCreateMultipartUploadCommandError(
                                output,
                                context
                              ),
                            ]
                          : ((contents = {
                              $metadata: deserializeMetadata(output),
                              AbortDate: void 0,
                              AbortRuleId: void 0,
                              Bucket: void 0,
                              Key: void 0,
                              RequestCharged: void 0,
                              SSECustomerAlgorithm: void 0,
                              SSECustomerKeyMD5: void 0,
                              SSEKMSEncryptionContext: void 0,
                              SSEKMSKeyId: void 0,
                              ServerSideEncryption: void 0,
                              UploadId: void 0,
                            }),
                            void 0 !==
                              output.headers[
                                'x-amz-server-side-encryption-context'
                              ] &&
                              (contents.SSEKMSEncryptionContext =
                                output.headers[
                                  'x-amz-server-side-encryption-context'
                                ]),
                            void 0 !==
                              output.headers['x-amz-server-side-encryption'] &&
                              (contents.ServerSideEncryption =
                                output.headers['x-amz-server-side-encryption']),
                            void 0 !==
                              output.headers['x-amz-request-charged'] &&
                              (contents.RequestCharged =
                                output.headers['x-amz-request-charged']),
                            void 0 !== output.headers['x-amz-abort-date'] &&
                              (contents.AbortDate = new Date(
                                output.headers['x-amz-abort-date']
                              )),
                            void 0 !==
                              output.headers[
                                'x-amz-server-side-encryption-customer-algorithm'
                              ] &&
                              (contents.SSECustomerAlgorithm =
                                output.headers[
                                  'x-amz-server-side-encryption-customer-algorithm'
                                ]),
                            void 0 !==
                              output.headers[
                                'x-amz-server-side-encryption-aws-kms-key-id'
                              ] &&
                              (contents.SSEKMSKeyId =
                                output.headers[
                                  'x-amz-server-side-encryption-aws-kms-key-id'
                                ]),
                            void 0 !== output.headers['x-amz-abort-rule-id'] &&
                              (contents.AbortRuleId =
                                output.headers['x-amz-abort-rule-id']),
                            void 0 !==
                              output.headers[
                                'x-amz-server-side-encryption-customer-key-md5'
                              ] &&
                              (contents.SSECustomerKeyMD5 =
                                output.headers[
                                  'x-amz-server-side-encryption-customer-key-md5'
                                ]),
                            [4, parseBody(output.body, context)]);
                      case 1:
                        return (
                          void 0 !== (data = _a.sent()).Bucket &&
                            (contents.Bucket = data.Bucket),
                          void 0 !== data.Key && (contents.Key = data.Key),
                          void 0 !== data.UploadId &&
                            (contents.UploadId = data.UploadId),
                          [2, Promise.resolve(contents)]
                        );
                    }
                  });
                });
              })(output, context);
            }),
            CreateMultipartUploadCommand
          );
        })(es.b);
      !(function (RestoreRequestType) {
        RestoreRequestType.SELECT = 'SELECT';
      })(RestoreRequestType || (RestoreRequestType = {})),
        ((
          models_1_RestoreRequest || (models_1_RestoreRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.OutputLocation && {
              OutputLocation: models_0_OutputLocation.filterSensitiveLog(
                obj.OutputLocation
              ),
            }
          );
        }),
        ((
          models_1_RestoreObjectRequest || (models_1_RestoreObjectRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.RestoreRequest && {
              RestoreRequest: models_1_RestoreRequest.filterSensitiveLog(
                obj.RestoreRequest
              ),
            }
          );
        }),
        ((
          models_1_ContinuationEvent || (models_1_ContinuationEvent = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_1_EndEvent || (models_1_EndEvent = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((models_1_Progress || (models_1_Progress = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_1_ProgressEvent || (models_1_ProgressEvent = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_1_RecordsEvent || (models_1_RecordsEvent = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_1_Stats || (models_1_Stats = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_1_StatsEvent || (models_1_StatsEvent = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        (function (SelectObjectContentEventStream) {
          (SelectObjectContentEventStream.visit = function (value, visitor) {
            return void 0 !== value.Cont
              ? visitor.Cont(value.Cont)
              : void 0 !== value.Progress
              ? visitor.Progress(value.Progress)
              : void 0 !== value.Stats
              ? visitor.Stats(value.Stats)
              : void 0 !== value.End
              ? visitor.End(value.End)
              : void 0 !== value.Records
              ? visitor.Records(value.Records)
              : visitor._(value.$unknown[0], value.$unknown[1]);
          }),
            (SelectObjectContentEventStream.filterSensitiveLog = function (
              obj
            ) {
              var _a;
              return void 0 !== obj.Cont
                ? {
                    Cont: models_1_ContinuationEvent.filterSensitiveLog(
                      obj.Cont
                    ),
                  }
                : void 0 !== obj.Progress
                ? {
                    Progress: models_1_ProgressEvent.filterSensitiveLog(
                      obj.Progress
                    ),
                  }
                : void 0 !== obj.Stats
                ? { Stats: models_1_StatsEvent.filterSensitiveLog(obj.Stats) }
                : void 0 !== obj.End
                ? { End: models_1_EndEvent.filterSensitiveLog(obj.End) }
                : void 0 !== obj.Records
                ? {
                    Records: models_1_RecordsEvent.filterSensitiveLog(
                      obj.Records
                    ),
                  }
                : void 0 !== obj.$unknown
                ? (((_a = {})[obj.$unknown[0]] = 'UNKNOWN'), _a)
                : void 0;
            });
        })(
          SelectObjectContentEventStream ||
            (SelectObjectContentEventStream = {})
        ),
        ((
          models_1_SelectObjectContentOutput ||
          (models_1_SelectObjectContentOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.Payload && { Payload: 'STREAMING_CONTENT' }
          );
        }),
        ((
          models_1_RequestProgress || (models_1_RequestProgress = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((models_1_ScanRange || (models_1_ScanRange = {})).filterSensitiveLog =
          function (obj) {
            return __assign({}, obj);
          }),
        ((
          models_1_SelectObjectContentRequest ||
          (models_1_SelectObjectContentRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.SSECustomerKey && { SSECustomerKey: es.d }
          );
        }),
        ((
          models_1_UploadPartOutput || (models_1_UploadPartOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.SSEKMSKeyId && { SSEKMSKeyId: es.d }
          );
        }),
        ((
          models_1_UploadPartRequest || (models_1_UploadPartRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.SSECustomerKey && { SSECustomerKey: es.d }
          );
        }),
        ((
          models_1_CopyPartResult || (models_1_CopyPartResult = {})
        ).filterSensitiveLog = function (obj) {
          return __assign({}, obj);
        }),
        ((
          models_1_UploadPartCopyOutput || (models_1_UploadPartCopyOutput = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign({}, obj),
            obj.SSEKMSKeyId && { SSEKMSKeyId: es.d }
          );
        }),
        ((
          models_1_UploadPartCopyRequest ||
          (models_1_UploadPartCopyRequest = {})
        ).filterSensitiveLog = function (obj) {
          return __assign(
            __assign(
              __assign({}, obj),
              obj.SSECustomerKey && { SSECustomerKey: es.d }
            ),
            obj.CopySourceSSECustomerKey && { CopySourceSSECustomerKey: es.d }
          );
        });
      var UploadPartCommand_UploadPartCommand = (function (_super) {
          function UploadPartCommand(input) {
            var _this = _super.call(this) || this;
            return (_this.input = input), _this;
          }
          return (
            __extends(UploadPartCommand, _super),
            (UploadPartCommand.prototype.resolveMiddleware = function (
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
              ),
                this.middlewareStack.use(getSsecPlugin(configuration)),
                this.middlewareStack.use(
                  getBucketEndpointPlugin(configuration)
                );
              var stack = clientStack.concat(this.middlewareStack),
                logger = configuration.logger,
                handlerExecutionContext = {
                  logger: logger,
                  clientName: 'S3Client',
                  commandName: 'UploadPartCommand',
                  inputFilterSensitiveLog:
                    models_1_UploadPartRequest.filterSensitiveLog,
                  outputFilterSensitiveLog:
                    models_1_UploadPartOutput.filterSensitiveLog,
                };
              'function' == typeof logger.info &&
                logger.info({
                  clientName: 'S3Client',
                  commandName: 'UploadPartCommand',
                });
              var requestHandler = configuration.requestHandler;
              return stack.resolve(function (request) {
                return requestHandler.handle(request.request, options || {});
              }, handlerExecutionContext);
            }),
            (UploadPartCommand.prototype.serialize = function (input, context) {
              return (function (input, context) {
                return __awaiter(void 0, void 0, void 0, function () {
                  var headers,
                    resolvedPath,
                    labelValue,
                    query,
                    body,
                    contents,
                    _a,
                    hostname,
                    _b,
                    protocol,
                    port;
                  return __generator(this, function (_c) {
                    switch (_c.label) {
                      case 0:
                        if (
                          ((headers = __assign(
                            __assign(
                              __assign(
                                __assign(
                                  __assign(
                                    __assign(
                                      __assign(
                                        {
                                          'Content-Type':
                                            'application/octet-stream',
                                        },
                                        isSerializableHeaderValue(
                                          input.ExpectedBucketOwner
                                        ) && {
                                          'x-amz-expected-bucket-owner':
                                            input.ExpectedBucketOwner,
                                        }
                                      ),
                                      isSerializableHeaderValue(
                                        input.RequestPayer
                                      ) && {
                                        'x-amz-request-payer':
                                          input.RequestPayer,
                                      }
                                    ),
                                    isSerializableHeaderValue(
                                      input.ContentLength
                                    ) && {
                                      'Content-Length':
                                        input.ContentLength.toString(),
                                    }
                                  ),
                                  isSerializableHeaderValue(
                                    input.SSECustomerKey
                                  ) && {
                                    'x-amz-server-side-encryption-customer-key':
                                      input.SSECustomerKey,
                                  }
                                ),
                                isSerializableHeaderValue(
                                  input.SSECustomerAlgorithm
                                ) && {
                                  'x-amz-server-side-encryption-customer-algorithm':
                                    input.SSECustomerAlgorithm,
                                }
                              ),
                              isSerializableHeaderValue(
                                input.SSECustomerKeyMD5
                              ) && {
                                'x-amz-server-side-encryption-customer-key-MD5':
                                  input.SSECustomerKeyMD5,
                              }
                            ),
                            isSerializableHeaderValue(input.ContentMD5) && {
                              'Content-MD5': input.ContentMD5,
                            }
                          )),
                          (resolvedPath = '/{Bucket}/{Key+}'),
                          void 0 === input.Bucket)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: Bucket.'
                          );
                        if ((labelValue = input.Bucket).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: Bucket.'
                          );
                        if (
                          ((resolvedPath = resolvedPath.replace(
                            '{Bucket}',
                            Object(es.f)(labelValue)
                          )),
                          void 0 === input.Key)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: Key.'
                          );
                        if ((labelValue = input.Key).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: Key.'
                          );
                        return (
                          (resolvedPath = resolvedPath.replace(
                            '{Key+}',
                            labelValue
                              .split('/')
                              .map(function (segment) {
                                return Object(es.f)(segment);
                              })
                              .join('/')
                          )),
                          (query = __assign(
                            __assign(
                              { 'x-id': 'UploadPart' },
                              void 0 !== input.PartNumber && {
                                partNumber: input.PartNumber.toString(),
                              }
                            ),
                            void 0 !== input.UploadId && {
                              uploadId: input.UploadId,
                            }
                          )),
                          void 0 !== input.Body &&
                            ((contents = input.Body), (body = contents)),
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
                            new dist_es.a({
                              protocol: protocol,
                              hostname: hostname,
                              port: port,
                              method: 'PUT',
                              headers: headers,
                              path: resolvedPath,
                              query: query,
                              body: body,
                            }),
                          ]
                        );
                    }
                  });
                });
              })(input, context);
            }),
            (UploadPartCommand.prototype.deserialize = function (
              output,
              context
            ) {
              return (function (output, context) {
                return __awaiter(void 0, void 0, void 0, function () {
                  var contents;
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        return 200 !== output.statusCode &&
                          output.statusCode >= 300
                          ? [
                              2,
                              deserializeAws_restXmlUploadPartCommandError(
                                output,
                                context
                              ),
                            ]
                          : ((contents = {
                              $metadata: deserializeMetadata(output),
                              ETag: void 0,
                              RequestCharged: void 0,
                              SSECustomerAlgorithm: void 0,
                              SSECustomerKeyMD5: void 0,
                              SSEKMSKeyId: void 0,
                              ServerSideEncryption: void 0,
                            }),
                            void 0 !==
                              output.headers[
                                'x-amz-server-side-encryption-customer-key-md5'
                              ] &&
                              (contents.SSECustomerKeyMD5 =
                                output.headers[
                                  'x-amz-server-side-encryption-customer-key-md5'
                                ]),
                            void 0 !==
                              output.headers['x-amz-server-side-encryption'] &&
                              (contents.ServerSideEncryption =
                                output.headers['x-amz-server-side-encryption']),
                            void 0 !==
                              output.headers[
                                'x-amz-server-side-encryption-aws-kms-key-id'
                              ] &&
                              (contents.SSEKMSKeyId =
                                output.headers[
                                  'x-amz-server-side-encryption-aws-kms-key-id'
                                ]),
                            void 0 !==
                              output.headers[
                                'x-amz-server-side-encryption-customer-algorithm'
                              ] &&
                              (contents.SSECustomerAlgorithm =
                                output.headers[
                                  'x-amz-server-side-encryption-customer-algorithm'
                                ]),
                            void 0 !==
                              output.headers['x-amz-request-charged'] &&
                              (contents.RequestCharged =
                                output.headers['x-amz-request-charged']),
                            void 0 !== output.headers.etag &&
                              (contents.ETag = output.headers.etag),
                            [4, collectBody(output.body, context)]);
                      case 1:
                        return _a.sent(), [2, Promise.resolve(contents)];
                    }
                  });
                });
              })(output, context);
            }),
            UploadPartCommand
          );
        })(es.b),
        CompleteMultipartUploadCommand_CompleteMultipartUploadCommand =
          (function (_super) {
            function CompleteMultipartUploadCommand(input) {
              var _this = _super.call(this) || this;
              return (_this.input = input), _this;
            }
            return (
              __extends(CompleteMultipartUploadCommand, _super),
              (CompleteMultipartUploadCommand.prototype.resolveMiddleware =
                function (clientStack, configuration, options) {
                  this.middlewareStack.use(
                    Object(middleware_serde_dist_es.a)(
                      configuration,
                      this.serialize,
                      this.deserialize
                    )
                  ),
                    this.middlewareStack.use(
                      getBucketEndpointPlugin(configuration)
                    );
                  var stack = clientStack.concat(this.middlewareStack),
                    logger = configuration.logger,
                    handlerExecutionContext = {
                      logger: logger,
                      clientName: 'S3Client',
                      commandName: 'CompleteMultipartUploadCommand',
                      inputFilterSensitiveLog:
                        models_0_CompleteMultipartUploadRequest.filterSensitiveLog,
                      outputFilterSensitiveLog:
                        models_0_CompleteMultipartUploadOutput.filterSensitiveLog,
                    };
                  'function' == typeof logger.info &&
                    logger.info({
                      clientName: 'S3Client',
                      commandName: 'CompleteMultipartUploadCommand',
                    });
                  var requestHandler = configuration.requestHandler;
                  return stack.resolve(function (request) {
                    return requestHandler.handle(
                      request.request,
                      options || {}
                    );
                  }, handlerExecutionContext);
                }),
              (CompleteMultipartUploadCommand.prototype.serialize = function (
                input,
                context
              ) {
                return (function (input, context) {
                  return __awaiter(void 0, void 0, void 0, function () {
                    var headers,
                      resolvedPath,
                      labelValue,
                      query,
                      body,
                      contents,
                      _a,
                      hostname,
                      _b,
                      protocol,
                      port;
                    return __generator(this, function (_c) {
                      switch (_c.label) {
                        case 0:
                          if (
                            ((headers = __assign(
                              __assign(
                                { 'Content-Type': 'application/xml' },
                                isSerializableHeaderValue(
                                  input.ExpectedBucketOwner
                                ) && {
                                  'x-amz-expected-bucket-owner':
                                    input.ExpectedBucketOwner,
                                }
                              ),
                              isSerializableHeaderValue(input.RequestPayer) && {
                                'x-amz-request-payer': input.RequestPayer,
                              }
                            )),
                            (resolvedPath = '/{Bucket}/{Key+}'),
                            void 0 === input.Key)
                          )
                            throw new Error(
                              'No value provided for input HTTP label: Key.'
                            );
                          if ((labelValue = input.Key).length <= 0)
                            throw new Error(
                              'Empty value provided for input HTTP label: Key.'
                            );
                          if (
                            ((resolvedPath = resolvedPath.replace(
                              '{Key+}',
                              labelValue
                                .split('/')
                                .map(function (segment) {
                                  return Object(es.f)(segment);
                                })
                                .join('/')
                            )),
                            void 0 === input.Bucket)
                          )
                            throw new Error(
                              'No value provided for input HTTP label: Bucket.'
                            );
                          if ((labelValue = input.Bucket).length <= 0)
                            throw new Error(
                              'Empty value provided for input HTTP label: Bucket.'
                            );
                          return (
                            (resolvedPath = resolvedPath.replace(
                              '{Bucket}',
                              Object(es.f)(labelValue)
                            )),
                            (query = __assign(
                              {},
                              void 0 !== input.UploadId && {
                                uploadId: input.UploadId,
                              }
                            )),
                            void 0 !== input.MultipartUpload &&
                              ((contents =
                                serializeAws_restXmlCompletedMultipartUpload(
                                  input.MultipartUpload,
                                  context
                                )),
                              (body = '<?xml version="1.0" encoding="UTF-8"?>'),
                              contents.addAttribute(
                                'xmlns',
                                'http://s3.amazonaws.com/doc/2006-03-01/'
                              ),
                              (body += contents.toString())),
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
                              new dist_es.a({
                                protocol: protocol,
                                hostname: hostname,
                                port: port,
                                method: 'POST',
                                headers: headers,
                                path: resolvedPath,
                                query: query,
                                body: body,
                              }),
                            ]
                          );
                      }
                    });
                  });
                })(input, context);
              }),
              (CompleteMultipartUploadCommand.prototype.deserialize = function (
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
                                deserializeAws_restXmlCompleteMultipartUploadCommandError(
                                  output,
                                  context
                                ),
                              ]
                            : ((contents = {
                                $metadata: deserializeMetadata(output),
                                Bucket: void 0,
                                ETag: void 0,
                                Expiration: void 0,
                                Key: void 0,
                                Location: void 0,
                                RequestCharged: void 0,
                                SSEKMSKeyId: void 0,
                                ServerSideEncryption: void 0,
                                VersionId: void 0,
                              }),
                              void 0 !== output.headers['x-amz-expiration'] &&
                                (contents.Expiration =
                                  output.headers['x-amz-expiration']),
                              void 0 !==
                                output.headers[
                                  'x-amz-server-side-encryption'
                                ] &&
                                (contents.ServerSideEncryption =
                                  output.headers[
                                    'x-amz-server-side-encryption'
                                  ]),
                              void 0 !==
                                output.headers[
                                  'x-amz-server-side-encryption-aws-kms-key-id'
                                ] &&
                                (contents.SSEKMSKeyId =
                                  output.headers[
                                    'x-amz-server-side-encryption-aws-kms-key-id'
                                  ]),
                              void 0 !== output.headers['x-amz-version-id'] &&
                                (contents.VersionId =
                                  output.headers['x-amz-version-id']),
                              void 0 !==
                                output.headers['x-amz-request-charged'] &&
                                (contents.RequestCharged =
                                  output.headers['x-amz-request-charged']),
                              [4, parseBody(output.body, context)]);
                        case 1:
                          return (
                            void 0 !== (data = _a.sent()).Bucket &&
                              (contents.Bucket = data.Bucket),
                            void 0 !== data.ETag && (contents.ETag = data.ETag),
                            void 0 !== data.Key && (contents.Key = data.Key),
                            void 0 !== data.Location &&
                              (contents.Location = data.Location),
                            [2, Promise.resolve(contents)]
                          );
                      }
                    });
                  });
                })(output, context);
              }),
              CompleteMultipartUploadCommand
            );
          })(es.b),
        AbortMultipartUploadCommand_AbortMultipartUploadCommand = (function (
          _super
        ) {
          function AbortMultipartUploadCommand(input) {
            var _this = _super.call(this) || this;
            return (_this.input = input), _this;
          }
          return (
            __extends(AbortMultipartUploadCommand, _super),
            (AbortMultipartUploadCommand.prototype.resolveMiddleware =
              function (clientStack, configuration, options) {
                this.middlewareStack.use(
                  Object(middleware_serde_dist_es.a)(
                    configuration,
                    this.serialize,
                    this.deserialize
                  )
                ),
                  this.middlewareStack.use(
                    getBucketEndpointPlugin(configuration)
                  );
                var stack = clientStack.concat(this.middlewareStack),
                  logger = configuration.logger,
                  handlerExecutionContext = {
                    logger: logger,
                    clientName: 'S3Client',
                    commandName: 'AbortMultipartUploadCommand',
                    inputFilterSensitiveLog:
                      models_0_AbortMultipartUploadRequest.filterSensitiveLog,
                    outputFilterSensitiveLog:
                      models_0_AbortMultipartUploadOutput.filterSensitiveLog,
                  };
                'function' == typeof logger.info &&
                  logger.info({
                    clientName: 'S3Client',
                    commandName: 'AbortMultipartUploadCommand',
                  });
                var requestHandler = configuration.requestHandler;
                return stack.resolve(function (request) {
                  return requestHandler.handle(request.request, options || {});
                }, handlerExecutionContext);
              }),
            (AbortMultipartUploadCommand.prototype.serialize = function (
              input,
              context
            ) {
              return (function (input, context) {
                return __awaiter(void 0, void 0, void 0, function () {
                  var headers,
                    resolvedPath,
                    labelValue,
                    query,
                    _a,
                    hostname,
                    _b,
                    protocol,
                    port;
                  return __generator(this, function (_c) {
                    switch (_c.label) {
                      case 0:
                        if (
                          ((headers = __assign(
                            __assign(
                              { 'Content-Type': '' },
                              isSerializableHeaderValue(input.RequestPayer) && {
                                'x-amz-request-payer': input.RequestPayer,
                              }
                            ),
                            isSerializableHeaderValue(
                              input.ExpectedBucketOwner
                            ) && {
                              'x-amz-expected-bucket-owner':
                                input.ExpectedBucketOwner,
                            }
                          )),
                          (resolvedPath = '/{Bucket}/{Key+}'),
                          void 0 === input.Key)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: Key.'
                          );
                        if ((labelValue = input.Key).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: Key.'
                          );
                        if (
                          ((resolvedPath = resolvedPath.replace(
                            '{Key+}',
                            labelValue
                              .split('/')
                              .map(function (segment) {
                                return Object(es.f)(segment);
                              })
                              .join('/')
                          )),
                          void 0 === input.Bucket)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: Bucket.'
                          );
                        if ((labelValue = input.Bucket).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: Bucket.'
                          );
                        return (
                          (resolvedPath = resolvedPath.replace(
                            '{Bucket}',
                            Object(es.f)(labelValue)
                          )),
                          (query = __assign(
                            { 'x-id': 'AbortMultipartUpload' },
                            void 0 !== input.UploadId && {
                              uploadId: input.UploadId,
                            }
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
                            new dist_es.a({
                              protocol: protocol,
                              hostname: hostname,
                              port: port,
                              method: 'DELETE',
                              headers: headers,
                              path: resolvedPath,
                              query: query,
                              body: void 0,
                            }),
                          ]
                        );
                    }
                  });
                });
              })(input, context);
            }),
            (AbortMultipartUploadCommand.prototype.deserialize = function (
              output,
              context
            ) {
              return (function (output, context) {
                return __awaiter(void 0, void 0, void 0, function () {
                  var contents;
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        return 204 !== output.statusCode &&
                          output.statusCode >= 300
                          ? [
                              2,
                              deserializeAws_restXmlAbortMultipartUploadCommandError(
                                output,
                                context
                              ),
                            ]
                          : ((contents = {
                              $metadata: deserializeMetadata(output),
                              RequestCharged: void 0,
                            }),
                            void 0 !==
                              output.headers['x-amz-request-charged'] &&
                              (contents.RequestCharged =
                                output.headers['x-amz-request-charged']),
                            [4, collectBody(output.body, context)]);
                      case 1:
                        return _a.sent(), [2, Promise.resolve(contents)];
                    }
                  });
                });
              })(output, context);
            }),
            AbortMultipartUploadCommand
          );
        })(es.b),
        ListPartsCommand_ListPartsCommand = (function (_super) {
          function ListPartsCommand(input) {
            var _this = _super.call(this) || this;
            return (_this.input = input), _this;
          }
          return (
            __extends(ListPartsCommand, _super),
            (ListPartsCommand.prototype.resolveMiddleware = function (
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
              ),
                this.middlewareStack.use(
                  getBucketEndpointPlugin(configuration)
                );
              var stack = clientStack.concat(this.middlewareStack),
                logger = configuration.logger,
                handlerExecutionContext = {
                  logger: logger,
                  clientName: 'S3Client',
                  commandName: 'ListPartsCommand',
                  inputFilterSensitiveLog:
                    models_0_ListPartsRequest.filterSensitiveLog,
                  outputFilterSensitiveLog:
                    models_0_ListPartsOutput.filterSensitiveLog,
                };
              'function' == typeof logger.info &&
                logger.info({
                  clientName: 'S3Client',
                  commandName: 'ListPartsCommand',
                });
              var requestHandler = configuration.requestHandler;
              return stack.resolve(function (request) {
                return requestHandler.handle(request.request, options || {});
              }, handlerExecutionContext);
            }),
            (ListPartsCommand.prototype.serialize = function (input, context) {
              return (function (input, context) {
                return __awaiter(void 0, void 0, void 0, function () {
                  var headers,
                    resolvedPath,
                    labelValue,
                    query,
                    _a,
                    hostname,
                    _b,
                    protocol,
                    port;
                  return __generator(this, function (_c) {
                    switch (_c.label) {
                      case 0:
                        if (
                          ((headers = __assign(
                            __assign(
                              { 'Content-Type': '' },
                              isSerializableHeaderValue(input.RequestPayer) && {
                                'x-amz-request-payer': input.RequestPayer,
                              }
                            ),
                            isSerializableHeaderValue(
                              input.ExpectedBucketOwner
                            ) && {
                              'x-amz-expected-bucket-owner':
                                input.ExpectedBucketOwner,
                            }
                          )),
                          (resolvedPath = '/{Bucket}/{Key+}'),
                          void 0 === input.Bucket)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: Bucket.'
                          );
                        if ((labelValue = input.Bucket).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: Bucket.'
                          );
                        if (
                          ((resolvedPath = resolvedPath.replace(
                            '{Bucket}',
                            Object(es.f)(labelValue)
                          )),
                          void 0 === input.Key)
                        )
                          throw new Error(
                            'No value provided for input HTTP label: Key.'
                          );
                        if ((labelValue = input.Key).length <= 0)
                          throw new Error(
                            'Empty value provided for input HTTP label: Key.'
                          );
                        return (
                          (resolvedPath = resolvedPath.replace(
                            '{Key+}',
                            labelValue
                              .split('/')
                              .map(function (segment) {
                                return Object(es.f)(segment);
                              })
                              .join('/')
                          )),
                          (query = __assign(
                            __assign(
                              __assign(
                                { 'x-id': 'ListParts' },
                                void 0 !== input.UploadId && {
                                  uploadId: input.UploadId,
                                }
                              ),
                              void 0 !== input.MaxParts && {
                                'max-parts': input.MaxParts.toString(),
                              }
                            ),
                            void 0 !== input.PartNumberMarker && {
                              'part-number-marker':
                                input.PartNumberMarker.toString(),
                            }
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
                            new dist_es.a({
                              protocol: protocol,
                              hostname: hostname,
                              port: port,
                              method: 'GET',
                              headers: headers,
                              path: resolvedPath,
                              query: query,
                              body: void 0,
                            }),
                          ]
                        );
                    }
                  });
                });
              })(input, context);
            }),
            (ListPartsCommand.prototype.deserialize = function (
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
                              deserializeAws_restXmlListPartsCommandError(
                                output,
                                context
                              ),
                            ]
                          : ((contents = {
                              $metadata: deserializeMetadata(output),
                              AbortDate: void 0,
                              AbortRuleId: void 0,
                              Bucket: void 0,
                              Initiator: void 0,
                              IsTruncated: void 0,
                              Key: void 0,
                              MaxParts: void 0,
                              NextPartNumberMarker: void 0,
                              Owner: void 0,
                              PartNumberMarker: void 0,
                              Parts: void 0,
                              RequestCharged: void 0,
                              StorageClass: void 0,
                              UploadId: void 0,
                            }),
                            void 0 !== output.headers['x-amz-abort-rule-id'] &&
                              (contents.AbortRuleId =
                                output.headers['x-amz-abort-rule-id']),
                            void 0 !==
                              output.headers['x-amz-request-charged'] &&
                              (contents.RequestCharged =
                                output.headers['x-amz-request-charged']),
                            void 0 !== output.headers['x-amz-abort-date'] &&
                              (contents.AbortDate = new Date(
                                output.headers['x-amz-abort-date']
                              )),
                            [4, parseBody(output.body, context)]);
                      case 1:
                        return (
                          void 0 !== (data = _a.sent()).Bucket &&
                            (contents.Bucket = data.Bucket),
                          void 0 !== data.Initiator &&
                            (contents.Initiator =
                              deserializeAws_restXmlInitiator(
                                data.Initiator,
                                context
                              )),
                          void 0 !== data.IsTruncated &&
                            (contents.IsTruncated = 'true' == data.IsTruncated),
                          void 0 !== data.Key && (contents.Key = data.Key),
                          void 0 !== data.MaxParts &&
                            (contents.MaxParts = parseInt(data.MaxParts)),
                          void 0 !== data.NextPartNumberMarker &&
                            (contents.NextPartNumberMarker = parseInt(
                              data.NextPartNumberMarker
                            )),
                          void 0 !== data.Owner &&
                            (contents.Owner = deserializeAws_restXmlOwner(
                              data.Owner,
                              context
                            )),
                          void 0 !== data.PartNumberMarker &&
                            (contents.PartNumberMarker = parseInt(
                              data.PartNumberMarker
                            )),
                          '' === data.Part && (contents.Parts = []),
                          void 0 !== data.Part &&
                            (contents.Parts = deserializeAws_restXmlParts(
                              Object(es.g)(data.Part),
                              context
                            )),
                          void 0 !== data.StorageClass &&
                            (contents.StorageClass = data.StorageClass),
                          void 0 !== data.UploadId &&
                            (contents.UploadId = data.UploadId),
                          [2, Promise.resolve(contents)]
                        );
                    }
                  });
                });
              })(output, context);
            }),
            ListPartsCommand
          );
        })(es.b),
        events = __webpack_require__(227),
        querystring_parser_dist_es = __webpack_require__(639),
        url_url = __webpack_require__(52),
        parseUrl = function (url) {
          var query,
            _a = Object(url_url.parse)(url),
            _b = _a.hostname,
            hostname = void 0 === _b ? 'localhost' : _b,
            _c = _a.pathname,
            pathname = void 0 === _c ? '/' : _c,
            port = _a.port,
            _d = _a.protocol,
            protocol = void 0 === _d ? 'https:' : _d,
            search = _a.search;
          return (
            search && (query = Object(querystring_parser_dist_es.a)(search)),
            {
              hostname: hostname,
              port: port ? parseInt(port) : void 0,
              protocol: protocol,
              path: pathname,
              query: query,
            }
          );
        },
        AWSS3ProviderManagedUpload_assign = function () {
          return (AWSS3ProviderManagedUpload_assign =
            Object.assign ||
            function (t) {
              for (var s, i = 1, n = arguments.length; i < n; i++)
                for (var p in (s = arguments[i]))
                  Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
              return t;
            }).apply(this, arguments);
        },
        AWSS3ProviderManagedUpload_awaiter = function (
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
        AWSS3ProviderManagedUpload_generator = function (thisArg, body) {
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
        AWSS3ProviderManagedUpload_values = function (o) {
          var s = 'function' == typeof Symbol && Symbol.iterator,
            m = s && o[s],
            i = 0;
          if (m) return m.call(o);
          if (o && 'number' == typeof o.length)
            return {
              next: function () {
                return (
                  o && i >= o.length && (o = void 0),
                  { value: o && o[i++], done: !o }
                );
              },
            };
          throw new TypeError(
            s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
          );
        },
        AWSS3ProviderManagedUpload_logger = new ConsoleLogger.a(
          'AWSS3ProviderManagedUpload'
        ),
        AWSS3ProviderManagedUpload_AWSS3ProviderManagedUpload = (function () {
          function AWSS3ProviderManagedUpload(params, opts, emitter) {
            (this.minPartSize = 5242880),
              (this.queueSize = 4),
              (this.body = null),
              (this.params = null),
              (this.opts = null),
              (this.multiPartMap = []),
              (this.cancel = !1),
              (this.bytesUploaded = 0),
              (this.totalBytesToUpload = 0),
              (this.emitter = null),
              (this.params = params),
              (this.opts = opts),
              (this.emitter = emitter);
          }
          return (
            (AWSS3ProviderManagedUpload.prototype.upload = function () {
              return AWSS3ProviderManagedUpload_awaiter(
                this,
                void 0,
                void 0,
                function () {
                  var _a,
                    putObjectCommand,
                    uploadId,
                    numberOfPartsToUpload,
                    start,
                    parts;
                  return AWSS3ProviderManagedUpload_generator(
                    this,
                    function (_b) {
                      switch (_b.label) {
                        case 0:
                          return (
                            (_a = this),
                            [4, this.validateAndSanitizeBody(this.params.Body)]
                          );
                        case 1:
                          return (
                            (_a.body = _b.sent()),
                            (this.totalBytesToUpload = this.byteLength(
                              this.body
                            )),
                            this.totalBytesToUpload <= this.minPartSize
                              ? ((this.params.Body = this.body),
                                (putObjectCommand =
                                  new PutObjectCommand_PutObjectCommand(
                                    this.params
                                  )),
                                [
                                  4,
                                  this._createNewS3Client(
                                    this.opts,
                                    this.emitter
                                  ),
                                ])
                              : [3, 3]
                          );
                        case 2:
                          return [2, _b.sent().send(putObjectCommand)];
                        case 3:
                          return [4, this.createMultiPartUpload()];
                        case 4:
                          (uploadId = _b.sent()),
                            (numberOfPartsToUpload = Math.ceil(
                              this.totalBytesToUpload / this.minPartSize
                            )),
                            (start = 0),
                            (_b.label = 5);
                        case 5:
                          return start < numberOfPartsToUpload
                            ? [4, this.checkIfUploadCancelled(uploadId)]
                            : [3, 10];
                        case 6:
                          return (
                            _b.sent(),
                            (parts = this.createParts(start)),
                            [4, this.uploadParts(uploadId, parts)]
                          );
                        case 7:
                          return (
                            _b.sent(),
                            [4, this.checkIfUploadCancelled(uploadId)]
                          );
                        case 8:
                          _b.sent(), (_b.label = 9);
                        case 9:
                          return (start += this.queueSize), [3, 5];
                        case 10:
                          return [4, this.finishMultiPartUpload(uploadId)];
                        case 11:
                          return [2, _b.sent()];
                      }
                    }
                  );
                }
              );
            }),
            (AWSS3ProviderManagedUpload.prototype.createParts = function (
              startPartNumber
            ) {
              for (
                var parts = [],
                  partNumber = startPartNumber,
                  bodyStart = startPartNumber * this.minPartSize;
                bodyStart < this.totalBytesToUpload &&
                parts.length < this.queueSize;

              ) {
                var bodyEnd = Math.min(
                  bodyStart + this.minPartSize,
                  this.totalBytesToUpload
                );
                parts.push({
                  bodyPart: this.body.slice(bodyStart, bodyEnd),
                  partNumber: ++partNumber,
                  emitter: new events.EventEmitter(),
                  _lastUploadedBytes: 0,
                }),
                  (bodyStart += this.minPartSize);
              }
              return parts;
            }),
            (AWSS3ProviderManagedUpload.prototype.createMultiPartUpload =
              function () {
                return AWSS3ProviderManagedUpload_awaiter(
                  this,
                  void 0,
                  void 0,
                  function () {
                    var createMultiPartUploadCommand, response;
                    return AWSS3ProviderManagedUpload_generator(
                      this,
                      function (_a) {
                        switch (_a.label) {
                          case 0:
                            return (
                              (createMultiPartUploadCommand =
                                new CreateMultipartUploadCommand_CreateMultipartUploadCommand(
                                  this.params
                                )),
                              [4, this._createNewS3Client(this.opts)]
                            );
                          case 1:
                            return [
                              4,
                              _a.sent().send(createMultiPartUploadCommand),
                            ];
                          case 2:
                            return (
                              (response = _a.sent()),
                              AWSS3ProviderManagedUpload_logger.debug(
                                response.UploadId
                              ),
                              [2, response.UploadId]
                            );
                        }
                      }
                    );
                  }
                );
              }),
            (AWSS3ProviderManagedUpload.prototype.uploadParts = function (
              uploadId,
              parts
            ) {
              return AWSS3ProviderManagedUpload_awaiter(
                this,
                void 0,
                void 0,
                function () {
                  var promises,
                    parts_1,
                    parts_1_1,
                    part,
                    uploadPartCommandInput,
                    uploadPartCommand,
                    s3,
                    e_1_1,
                    allResults,
                    i,
                    error_1,
                    e_1,
                    _a;
                  return AWSS3ProviderManagedUpload_generator(
                    this,
                    function (_b) {
                      switch (_b.label) {
                        case 0:
                          (promises = []), (_b.label = 1);
                        case 1:
                          _b.trys.push([1, 6, 7, 8]),
                            (parts_1 =
                              AWSS3ProviderManagedUpload_values(parts)),
                            (parts_1_1 = parts_1.next()),
                            (_b.label = 2);
                        case 2:
                          return parts_1_1.done
                            ? [3, 5]
                            : ((part = parts_1_1.value),
                              this.setupEventListener(part),
                              (uploadPartCommandInput = {
                                PartNumber: part.partNumber,
                                Body: part.bodyPart,
                                UploadId: uploadId,
                                Key: this.params.Key,
                                Bucket: this.params.Bucket,
                              }),
                              (uploadPartCommand =
                                new UploadPartCommand_UploadPartCommand(
                                  uploadPartCommandInput
                                )),
                              [
                                4,
                                this._createNewS3Client(
                                  this.opts,
                                  part.emitter
                                ),
                              ]);
                        case 3:
                          (s3 = _b.sent()),
                            promises.push(s3.send(uploadPartCommand)),
                            (_b.label = 4);
                        case 4:
                          return (parts_1_1 = parts_1.next()), [3, 2];
                        case 5:
                          return [3, 8];
                        case 6:
                          return (
                            (e_1_1 = _b.sent()),
                            (e_1 = { error: e_1_1 }),
                            [3, 8]
                          );
                        case 7:
                          try {
                            parts_1_1 &&
                              !parts_1_1.done &&
                              (_a = parts_1.return) &&
                              _a.call(parts_1);
                          } finally {
                            if (e_1) throw e_1.error;
                          }
                          return [7];
                        case 8:
                          return (
                            _b.trys.push([8, 10, , 11]),
                            [4, Promise.all(promises)]
                          );
                        case 9:
                          for (
                            allResults = _b.sent(), i = 0;
                            i < allResults.length;
                            i++
                          )
                            this.multiPartMap.push({
                              PartNumber: parts[i].partNumber,
                              ETag: allResults[i].ETag,
                            });
                          return [3, 11];
                        case 10:
                          return (
                            (error_1 = _b.sent()),
                            AWSS3ProviderManagedUpload_logger.error(
                              'error happened while uploading a part. Cancelling the multipart upload',
                              error_1
                            ),
                            this.cancelUpload(),
                            [2]
                          );
                        case 11:
                          return [2];
                      }
                    }
                  );
                }
              );
            }),
            (AWSS3ProviderManagedUpload.prototype.finishMultiPartUpload =
              function (uploadId) {
                return AWSS3ProviderManagedUpload_awaiter(
                  this,
                  void 0,
                  void 0,
                  function () {
                    var input, completeUploadCommand, s3, error_2;
                    return AWSS3ProviderManagedUpload_generator(
                      this,
                      function (_a) {
                        switch (_a.label) {
                          case 0:
                            return (
                              (input = {
                                Bucket: this.params.Bucket,
                                Key: this.params.Key,
                                UploadId: uploadId,
                                MultipartUpload: { Parts: this.multiPartMap },
                              }),
                              (completeUploadCommand =
                                new CompleteMultipartUploadCommand_CompleteMultipartUploadCommand(
                                  input
                                )),
                              [4, this._createNewS3Client(this.opts)]
                            );
                          case 1:
                            (s3 = _a.sent()), (_a.label = 2);
                          case 2:
                            return (
                              _a.trys.push([2, 4, , 5]),
                              [4, s3.send(completeUploadCommand)]
                            );
                          case 3:
                            return [2, _a.sent().Key];
                          case 4:
                            return (
                              (error_2 = _a.sent()),
                              AWSS3ProviderManagedUpload_logger.error(
                                'error happened while finishing the upload. Cancelling the multipart upload',
                                error_2
                              ),
                              this.cancelUpload(),
                              [2]
                            );
                          case 5:
                            return [2];
                        }
                      }
                    );
                  }
                );
              }),
            (AWSS3ProviderManagedUpload.prototype.checkIfUploadCancelled =
              function (uploadId) {
                return AWSS3ProviderManagedUpload_awaiter(
                  this,
                  void 0,
                  void 0,
                  function () {
                    var errorMessage, error_3;
                    return AWSS3ProviderManagedUpload_generator(
                      this,
                      function (_a) {
                        switch (_a.label) {
                          case 0:
                            if (!this.cancel) return [3, 5];
                            (errorMessage = 'Upload was cancelled.'),
                              (_a.label = 1);
                          case 1:
                            return (
                              _a.trys.push([1, 3, , 4]),
                              [4, this.cleanup(uploadId)]
                            );
                          case 2:
                            return _a.sent(), [3, 4];
                          case 3:
                            return (
                              (error_3 = _a.sent()),
                              (errorMessage += error_3.errorMessage),
                              [3, 4]
                            );
                          case 4:
                            throw new Error(errorMessage);
                          case 5:
                            return [2];
                        }
                      }
                    );
                  }
                );
              }),
            (AWSS3ProviderManagedUpload.prototype.cancelUpload = function () {
              this.cancel = !0;
            }),
            (AWSS3ProviderManagedUpload.prototype.cleanup = function (
              uploadId
            ) {
              return AWSS3ProviderManagedUpload_awaiter(
                this,
                void 0,
                void 0,
                function () {
                  var input, s3, data;
                  return AWSS3ProviderManagedUpload_generator(
                    this,
                    function (_a) {
                      switch (_a.label) {
                        case 0:
                          return (
                            (this.body = null),
                            (this.multiPartMap = []),
                            (this.bytesUploaded = 0),
                            (this.totalBytesToUpload = 0),
                            (input = {
                              Bucket: this.params.Bucket,
                              Key: this.params.Key,
                              UploadId: uploadId,
                            }),
                            [4, this._createNewS3Client(this.opts)]
                          );
                        case 1:
                          return [
                            4,
                            (s3 = _a.sent()).send(
                              new AbortMultipartUploadCommand_AbortMultipartUploadCommand(
                                input
                              )
                            ),
                          ];
                        case 2:
                          return (
                            _a.sent(),
                            [
                              4,
                              s3.send(
                                new ListPartsCommand_ListPartsCommand(input)
                              ),
                            ]
                          );
                        case 3:
                          if (
                            (data = _a.sent()) &&
                            data.Parts &&
                            data.Parts.length > 0
                          )
                            throw new Error(
                              'Multi Part upload clean up failed'
                            );
                          return [2];
                      }
                    }
                  );
                }
              );
            }),
            (AWSS3ProviderManagedUpload.prototype.setupEventListener =
              function (part) {
                var _this = this;
                part.emitter.on('sendProgress', function (progress) {
                  _this.progressChanged(
                    part.partNumber,
                    progress.loaded - part._lastUploadedBytes
                  ),
                    (part._lastUploadedBytes = progress.loaded);
                });
              }),
            (AWSS3ProviderManagedUpload.prototype.progressChanged = function (
              partNumber,
              incrementalUpdate
            ) {
              (this.bytesUploaded += incrementalUpdate),
                this.emitter.emit('sendProgress', {
                  loaded: this.bytesUploaded,
                  total: this.totalBytesToUpload,
                  part: partNumber,
                  key: this.params.Key,
                });
            }),
            (AWSS3ProviderManagedUpload.prototype.byteLength = function (
              input
            ) {
              if (null == input) return 0;
              if ('number' == typeof input.byteLength) return input.byteLength;
              if ('number' == typeof input.length) return input.length;
              if ('number' == typeof input.size) return input.size;
              if ('string' != typeof input.path)
                throw new Error('Cannot determine length of ' + input);
            }),
            (AWSS3ProviderManagedUpload.prototype.validateAndSanitizeBody =
              function (body) {
                return AWSS3ProviderManagedUpload_awaiter(
                  this,
                  void 0,
                  void 0,
                  function () {
                    return AWSS3ProviderManagedUpload_generator(
                      this,
                      function (_a) {
                        switch (_a.label) {
                          case 0:
                            return this.isGenericObject(body)
                              ? [2, JSON.stringify(body)]
                              : [3, 1];
                          case 1:
                            return this.isBlob(body)
                              ? Platform.a.isReactNative
                                ? [
                                    4,
                                    Object(fetch_http_handler_dist_es.b)(body),
                                  ]
                                : [3, 3]
                              : [3, 4];
                          case 2:
                            return [2, _a.sent()];
                          case 3:
                          case 4:
                            return [2, body];
                        }
                      }
                    );
                  }
                );
              }),
            (AWSS3ProviderManagedUpload.prototype.isBlob = function (body) {
              return 'undefined' != typeof Blob && body instanceof Blob;
            }),
            (AWSS3ProviderManagedUpload.prototype.isGenericObject = function (
              body
            ) {
              if (null !== body && 'object' == typeof body)
                try {
                  return !(this.byteLength(body) >= 0);
                } catch (error) {
                  return !0;
                }
              return !1;
            }),
            (AWSS3ProviderManagedUpload.prototype._createNewS3Client =
              function (config, emitter) {
                return AWSS3ProviderManagedUpload_awaiter(
                  this,
                  void 0,
                  void 0,
                  function () {
                    var credentials,
                      region,
                      dangerouslyConnectToHttpEndpointForTesting,
                      localTestingConfig,
                      client;
                    return AWSS3ProviderManagedUpload_generator(
                      this,
                      function (_a) {
                        switch (_a.label) {
                          case 0:
                            return [4, this._getCredentials()];
                          case 1:
                            return (
                              (credentials = _a.sent()),
                              (region = config.region),
                              (dangerouslyConnectToHttpEndpointForTesting =
                                config.dangerouslyConnectToHttpEndpointForTesting),
                              (localTestingConfig = {}),
                              dangerouslyConnectToHttpEndpointForTesting &&
                                (localTestingConfig = {
                                  endpoint: 'http://localhost:20005',
                                  tls: !1,
                                  bucketEndpoint: !1,
                                  forcePathStyle: !0,
                                }),
                              (client = new S3Client_S3Client(
                                AWSS3ProviderManagedUpload_assign(
                                  AWSS3ProviderManagedUpload_assign(
                                    {
                                      region: region,
                                      credentials: credentials,
                                    },
                                    localTestingConfig
                                  ),
                                  {
                                    requestHandler:
                                      new axios_http_handler_AxiosHttpHandler(
                                        {},
                                        emitter
                                      ),
                                    customUserAgent: Object(Platform.b)(),
                                    urlParser: parseUrl,
                                  }
                                )
                              )).middlewareStack.remove(
                                'contentLengthMiddleware'
                              ),
                              [2, client]
                            );
                        }
                      }
                    );
                  }
                );
              }),
            (AWSS3ProviderManagedUpload.prototype._getCredentials =
              function () {
                return Credentials.a
                  .get()
                  .then(function (credentials) {
                    if (!credentials) return !1;
                    var cred = Credentials.a.shear(credentials);
                    return (
                      AWSS3ProviderManagedUpload_logger.debug(
                        'set credentials for storage',
                        cred
                      ),
                      cred
                    );
                  })
                  .catch(function (error) {
                    return (
                      AWSS3ProviderManagedUpload_logger.warn(
                        'ensure credentials error',
                        error
                      ),
                      !1
                    );
                  });
              }),
            AWSS3ProviderManagedUpload
          );
        })(),
        AWSS3Provider_assign = function () {
          return (AWSS3Provider_assign =
            Object.assign ||
            function (t) {
              for (var s, i = 1, n = arguments.length; i < n; i++)
                for (var p in (s = arguments[i]))
                  Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
              return t;
            }).apply(this, arguments);
        },
        AWSS3Provider_awaiter = function (thisArg, _arguments, P, generator) {
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
        AWSS3Provider_generator = function (thisArg, body) {
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
        AWSS3Provider_logger = new ConsoleLogger.a('AWSS3Provider'),
        AMPLIFY_SYMBOL =
          'undefined' != typeof Symbol && 'function' == typeof Symbol.for
            ? Symbol.for('amplify_default')
            : '@@amplify_default',
        dispatchStorageEvent = function (
          track,
          event,
          attrs,
          metrics,
          message
        ) {
          if (track) {
            var data = { attrs: attrs };
            metrics && (data.metrics = metrics),
              Hub.a.dispatch(
                'storage',
                { event: event, data: data, message: message },
                'Storage',
                AMPLIFY_SYMBOL
              );
          }
        },
        AWSS3Provider_AWSS3Provider = (function () {
          function AWSS3Provider(config) {
            (this._config = config || {}),
              AWSS3Provider_logger.debug('Storage Options', this._config);
          }
          return (
            (AWSS3Provider.prototype.getCategory = function () {
              return AWSS3Provider.CATEGORY;
            }),
            (AWSS3Provider.prototype.getProviderName = function () {
              return AWSS3Provider.PROVIDER_NAME;
            }),
            (AWSS3Provider.prototype.configure = function (config) {
              if (
                (AWSS3Provider_logger.debug('configure Storage', config),
                !config)
              )
                return this._config;
              var amplifyConfig = Parser.a.parseMobilehubConfig(config);
              return (
                (this._config = Object.assign(
                  {},
                  this._config,
                  amplifyConfig.Storage
                )),
                this._config.bucket ||
                  AWSS3Provider_logger.debug('Do not have bucket yet'),
                this._config
              );
            }),
            (AWSS3Provider.prototype.get = function (key, config) {
              return AWSS3Provider_awaiter(this, void 0, void 0, function () {
                var opt,
                  bucket,
                  download,
                  cacheControl,
                  contentDisposition,
                  contentEncoding,
                  contentLanguage,
                  contentType,
                  expires,
                  track,
                  prefix,
                  final_key,
                  s3,
                  params,
                  getObjectCommand,
                  response,
                  error_1,
                  signer,
                  request,
                  url,
                  _a,
                  error_2;
                return AWSS3Provider_generator(this, function (_b) {
                  switch (_b.label) {
                    case 0:
                      return [4, this._ensureCredentials()];
                    case 1:
                      if (!_b.sent())
                        return [2, Promise.reject('No credentials')];
                      if (
                        ((opt = Object.assign({}, this._config, config)),
                        (bucket = opt.bucket),
                        (download = opt.download),
                        (cacheControl = opt.cacheControl),
                        (contentDisposition = opt.contentDisposition),
                        (contentEncoding = opt.contentEncoding),
                        (contentLanguage = opt.contentLanguage),
                        (contentType = opt.contentType),
                        (expires = opt.expires),
                        (track = opt.track),
                        (prefix = this._prefix(opt)),
                        (final_key = prefix + key),
                        (s3 = this._createNewS3Client(opt)),
                        AWSS3Provider_logger.debug(
                          'get ' + key + ' from ' + final_key
                        ),
                        (params = { Bucket: bucket, Key: final_key }),
                        cacheControl &&
                          (params.ResponseCacheControl = cacheControl),
                        contentDisposition &&
                          (params.ResponseContentDisposition =
                            contentDisposition),
                        contentEncoding &&
                          (params.ResponseContentEncoding = contentEncoding),
                        contentLanguage &&
                          (params.ResponseContentLanguage = contentLanguage),
                        contentType &&
                          (params.ResponseContentType = contentType),
                        !0 !== download)
                      )
                        return [3, 5];
                      (getObjectCommand = new GetObjectCommand_GetObjectCommand(
                        params
                      )),
                        (_b.label = 2);
                    case 2:
                      return (
                        _b.trys.push([2, 4, , 5]),
                        [4, s3.send(getObjectCommand)]
                      );
                    case 3:
                      return (
                        (response = _b.sent()),
                        dispatchStorageEvent(
                          track,
                          'download',
                          { method: 'get', result: 'success' },
                          {
                            fileSize: Number(
                              response.Body.size || response.Body.length
                            ),
                          },
                          'Download success for ' + key
                        ),
                        [2, response]
                      );
                    case 4:
                      throw (
                        ((error_1 = _b.sent()),
                        dispatchStorageEvent(
                          track,
                          'download',
                          { method: 'get', result: 'failed' },
                          null,
                          'Download failed with ' + error_1.message
                        ),
                        error_1)
                      );
                    case 5:
                      (params.Expires = expires || 900), (_b.label = 6);
                    case 6:
                      return (
                        _b.trys.push([6, 9, , 10]),
                        (signer = new presigner_S3RequestPresigner(
                          AWSS3Provider_assign({}, s3.config)
                        )),
                        [
                          4,
                          createRequest(
                            s3,
                            new GetObjectCommand_GetObjectCommand(params)
                          ),
                        ]
                      );
                    case 7:
                      return (
                        (request = _b.sent()),
                        (_a = formatUrl),
                        [
                          4,
                          signer.presign(request, {
                            expiresIn: params.Expires,
                          }),
                        ]
                      );
                    case 8:
                      return (
                        (url = _a.apply(void 0, [_b.sent()])),
                        dispatchStorageEvent(
                          track,
                          'getSignedUrl',
                          { method: 'get', result: 'success' },
                          null,
                          'Signed URL: ' + url
                        ),
                        [2, url]
                      );
                    case 9:
                      throw (
                        ((error_2 = _b.sent()),
                        AWSS3Provider_logger.warn(
                          'get signed url error',
                          error_2
                        ),
                        dispatchStorageEvent(
                          track,
                          'getSignedUrl',
                          { method: 'get', result: 'failed' },
                          null,
                          'Could not get a signed URL for ' + key
                        ),
                        error_2)
                      );
                    case 10:
                      return [2];
                  }
                });
              });
            }),
            (AWSS3Provider.prototype.put = function (key, object, config) {
              return AWSS3Provider_awaiter(this, void 0, void 0, function () {
                var opt,
                  bucket,
                  track,
                  progressCallback,
                  contentType,
                  contentDisposition,
                  cacheControl,
                  expires,
                  metadata,
                  tagging,
                  acl,
                  serverSideEncryption,
                  SSECustomerAlgorithm,
                  SSECustomerKey,
                  SSECustomerKeyMD5,
                  SSEKMSKeyId,
                  type,
                  prefix,
                  final_key,
                  params,
                  emitter,
                  uploader,
                  response,
                  error_3;
                return AWSS3Provider_generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      return [4, this._ensureCredentials()];
                    case 1:
                      if (!_a.sent())
                        return [2, Promise.reject('No credentials')];
                      (opt = Object.assign({}, this._config, config)),
                        (bucket = opt.bucket),
                        (track = opt.track),
                        (progressCallback = opt.progressCallback),
                        (contentType = opt.contentType),
                        (contentDisposition = opt.contentDisposition),
                        (cacheControl = opt.cacheControl),
                        (expires = opt.expires),
                        (metadata = opt.metadata),
                        (tagging = opt.tagging),
                        (acl = opt.acl),
                        (serverSideEncryption = opt.serverSideEncryption),
                        (SSECustomerAlgorithm = opt.SSECustomerAlgorithm),
                        (SSECustomerKey = opt.SSECustomerKey),
                        (SSECustomerKeyMD5 = opt.SSECustomerKeyMD5),
                        (SSEKMSKeyId = opt.SSEKMSKeyId),
                        (type = contentType || 'binary/octet-stream'),
                        (prefix = this._prefix(opt)),
                        (final_key = prefix + key),
                        AWSS3Provider_logger.debug(
                          'put ' + key + ' to ' + final_key
                        ),
                        (params = {
                          Bucket: bucket,
                          Key: final_key,
                          Body: object,
                          ContentType: type,
                        }),
                        cacheControl && (params.CacheControl = cacheControl),
                        contentDisposition &&
                          (params.ContentDisposition = contentDisposition),
                        expires && (params.Expires = expires),
                        metadata && (params.Metadata = metadata),
                        tagging && (params.Tagging = tagging),
                        serverSideEncryption &&
                          ((params.ServerSideEncryption = serverSideEncryption),
                          SSECustomerAlgorithm &&
                            (params.SSECustomerAlgorithm =
                              SSECustomerAlgorithm),
                          SSECustomerKey &&
                            (params.SSECustomerKey = SSECustomerKey),
                          SSECustomerKeyMD5 &&
                            (params.SSECustomerKeyMD5 = SSECustomerKeyMD5),
                          SSEKMSKeyId && (params.SSEKMSKeyId = SSEKMSKeyId)),
                        (emitter = new events.EventEmitter()),
                        (uploader =
                          new AWSS3ProviderManagedUpload_AWSS3ProviderManagedUpload(
                            params,
                            opt,
                            emitter
                          )),
                        acl && (params.ACL = acl),
                        (_a.label = 2);
                    case 2:
                      return (
                        _a.trys.push([2, 4, , 5]),
                        emitter.on('sendProgress', function (progress) {
                          progressCallback &&
                            ('function' == typeof progressCallback
                              ? progressCallback(progress)
                              : AWSS3Provider_logger.warn(
                                  'progressCallback should be a function, not a ' +
                                    typeof progressCallback
                                ));
                        }),
                        [4, uploader.upload()]
                      );
                    case 3:
                      return (
                        (response = _a.sent()),
                        AWSS3Provider_logger.debug('upload result', response),
                        dispatchStorageEvent(
                          track,
                          'upload',
                          { method: 'put', result: 'success' },
                          null,
                          'Upload success for ' + key
                        ),
                        [2, { key: key }]
                      );
                    case 4:
                      throw (
                        ((error_3 = _a.sent()),
                        AWSS3Provider_logger.warn('error uploading', error_3),
                        dispatchStorageEvent(
                          track,
                          'upload',
                          { method: 'put', result: 'failed' },
                          null,
                          'Error uploading ' + key
                        ),
                        error_3)
                      );
                    case 5:
                      return [2];
                  }
                });
              });
            }),
            (AWSS3Provider.prototype.remove = function (key, config) {
              return AWSS3Provider_awaiter(this, void 0, void 0, function () {
                var opt,
                  bucket,
                  track,
                  prefix,
                  final_key,
                  s3,
                  deleteObjectCommand,
                  response,
                  error_4;
                return AWSS3Provider_generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      return [4, this._ensureCredentials()];
                    case 1:
                      if (!_a.sent())
                        return [2, Promise.reject('No credentials')];
                      (opt = Object.assign({}, this._config, config)),
                        (bucket = opt.bucket),
                        (track = opt.track),
                        (prefix = this._prefix(opt)),
                        (final_key = prefix + key),
                        (s3 = this._createNewS3Client(opt)),
                        AWSS3Provider_logger.debug(
                          'remove ' + key + ' from ' + final_key
                        ),
                        (deleteObjectCommand =
                          new DeleteObjectCommand_DeleteObjectCommand({
                            Bucket: bucket,
                            Key: final_key,
                          })),
                        (_a.label = 2);
                    case 2:
                      return (
                        _a.trys.push([2, 4, , 5]),
                        [4, s3.send(deleteObjectCommand)]
                      );
                    case 3:
                      return (
                        (response = _a.sent()),
                        dispatchStorageEvent(
                          track,
                          'delete',
                          { method: 'remove', result: 'success' },
                          null,
                          'Deleted ' + key + ' successfully'
                        ),
                        [2, response]
                      );
                    case 4:
                      throw (
                        ((error_4 = _a.sent()),
                        dispatchStorageEvent(
                          track,
                          'delete',
                          { method: 'remove', result: 'failed' },
                          null,
                          'Deletion of ' + key + ' failed with ' + error_4
                        ),
                        error_4)
                      );
                    case 5:
                      return [2];
                  }
                });
              });
            }),
            (AWSS3Provider.prototype.list = function (path, config) {
              return AWSS3Provider_awaiter(this, void 0, void 0, function () {
                var opt,
                  bucket,
                  track,
                  maxKeys,
                  prefix,
                  final_path,
                  s3,
                  listObjectsCommand,
                  response,
                  list,
                  error_5;
                return AWSS3Provider_generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      return [4, this._ensureCredentials()];
                    case 1:
                      if (!_a.sent())
                        return [2, Promise.reject('No credentials')];
                      (opt = Object.assign({}, this._config, config)),
                        (bucket = opt.bucket),
                        (track = opt.track),
                        (maxKeys = opt.maxKeys),
                        (prefix = this._prefix(opt)),
                        (final_path = prefix + path),
                        (s3 = this._createNewS3Client(opt)),
                        AWSS3Provider_logger.debug(
                          'list ' + path + ' from ' + final_path
                        ),
                        (listObjectsCommand =
                          new ListObjectsCommand_ListObjectsCommand({
                            Bucket: bucket,
                            Prefix: final_path,
                            MaxKeys: maxKeys,
                          })),
                        (_a.label = 2);
                    case 2:
                      return (
                        _a.trys.push([2, 4, , 5]),
                        [4, s3.send(listObjectsCommand)]
                      );
                    case 3:
                      return (
                        (response = _a.sent()),
                        (list = []),
                        response &&
                          response.Contents &&
                          (list = response.Contents.map(function (item) {
                            return {
                              key: item.Key.substr(prefix.length),
                              eTag: item.ETag,
                              lastModified: item.LastModified,
                              size: item.Size,
                            };
                          })),
                        dispatchStorageEvent(
                          track,
                          'list',
                          { method: 'list', result: 'success' },
                          null,
                          list.length + ' items returned from list operation'
                        ),
                        AWSS3Provider_logger.debug('list', list),
                        [2, list]
                      );
                    case 4:
                      throw (
                        ((error_5 = _a.sent()),
                        AWSS3Provider_logger.warn('list error', error_5),
                        dispatchStorageEvent(
                          track,
                          'list',
                          { method: 'list', result: 'failed' },
                          null,
                          'Listing items failed: ' + error_5.message
                        ),
                        error_5)
                      );
                    case 5:
                      return [2];
                  }
                });
              });
            }),
            (AWSS3Provider.prototype._ensureCredentials = function () {
              var _this = this;
              return Credentials.a
                .get()
                .then(function (credentials) {
                  if (!credentials) return !1;
                  var cred = Credentials.a.shear(credentials);
                  return (
                    AWSS3Provider_logger.debug(
                      'set credentials for storage',
                      cred
                    ),
                    (_this._config.credentials = cred),
                    !0
                  );
                })
                .catch(function (error) {
                  return (
                    AWSS3Provider_logger.warn(
                      'ensure credentials error',
                      error
                    ),
                    !1
                  );
                });
            }),
            (AWSS3Provider.prototype._prefix = function (config) {
              var credentials = config.credentials,
                level = config.level,
                customPrefix = config.customPrefix || {},
                identityId = config.identityId || credentials.identityId,
                privatePath =
                  (void 0 !== customPrefix.private
                    ? customPrefix.private
                    : 'private/') +
                  identityId +
                  '/',
                protectedPath =
                  (void 0 !== customPrefix.protected
                    ? customPrefix.protected
                    : 'protected/') +
                  identityId +
                  '/',
                publicPath =
                  void 0 !== customPrefix.public
                    ? customPrefix.public
                    : 'public/';
              switch (level) {
                case 'private':
                  return privatePath;
                case 'protected':
                  return protectedPath;
                default:
                  return publicPath;
              }
            }),
            (AWSS3Provider.prototype._createNewS3Client = function (
              config,
              emitter
            ) {
              var region = config.region,
                credentials = config.credentials,
                localTestingConfig = {};
              return (
                config.dangerouslyConnectToHttpEndpointForTesting &&
                  (localTestingConfig = {
                    endpoint: 'http://localhost:20005',
                    tls: !1,
                    bucketEndpoint: !1,
                    forcePathStyle: !0,
                  }),
                new S3Client_S3Client(
                  AWSS3Provider_assign(
                    AWSS3Provider_assign(
                      {
                        region: region,
                        credentials: credentials,
                        customUserAgent: Object(Platform.b)(),
                      },
                      localTestingConfig
                    ),
                    {
                      requestHandler: new axios_http_handler_AxiosHttpHandler(
                        {},
                        emitter
                      ),
                    }
                  )
                )
              );
            }),
            (AWSS3Provider.CATEGORY = 'Storage'),
            (AWSS3Provider.PROVIDER_NAME = 'AWSS3'),
            AWSS3Provider
          );
        })(),
        Storage_assign = function () {
          return (Storage_assign =
            Object.assign ||
            function (t) {
              for (var s, i = 1, n = arguments.length; i < n; i++)
                for (var p in (s = arguments[i]))
                  Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
              return t;
            }).apply(this, arguments);
        },
        Storage_awaiter = function (thisArg, _arguments, P, generator) {
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
        Storage_generator = function (thisArg, body) {
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
        Storage_read = function (o, n) {
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
        },
        Storage_logger = new ConsoleLogger.a('StorageClass'),
        Storage_Storage = (function () {
          function Storage() {
            (this._config = {}),
              (this._pluggables = []),
              Storage_logger.debug('Storage Options', this._config),
              (this.get = this.get.bind(this)),
              (this.put = this.put.bind(this)),
              (this.remove = this.remove.bind(this)),
              (this.list = this.list.bind(this));
          }
          return (
            (Storage.prototype.getModuleName = function () {
              return 'Storage';
            }),
            (Storage.prototype.addPluggable = function (pluggable) {
              if (pluggable && 'Storage' === pluggable.getCategory()) {
                this._pluggables.push(pluggable);
                return pluggable.configure(
                  this._config[pluggable.getProviderName()]
                );
              }
            }),
            (Storage.prototype.getPluggable = function (providerName) {
              var pluggable = this._pluggables.find(function (pluggable) {
                return pluggable.getProviderName() === providerName;
              });
              return void 0 === pluggable
                ? (Storage_logger.debug(
                    'No plugin found with providerName',
                    providerName
                  ),
                  null)
                : pluggable;
            }),
            (Storage.prototype.removePluggable = function (providerName) {
              this._pluggables = this._pluggables.filter(function (pluggable) {
                return pluggable.getProviderName() !== providerName;
              });
            }),
            (Storage.prototype.configure = function (config) {
              var _this = this;
              if ((Storage_logger.debug('configure Storage'), !config))
                return this._config;
              var amplifyConfig = Parser.a.parseMobilehubConfig(config),
                storageKeysFromConfig = Object.keys(amplifyConfig.Storage),
                storageArrayKeys = [
                  'bucket',
                  'region',
                  'level',
                  'track',
                  'customPrefix',
                  'serverSideEncryption',
                  'SSECustomerAlgorithm',
                  'SSECustomerKey',
                  'SSECustomerKeyMD5',
                  'SSEKMSKeyId',
                ],
                isInStorageArrayKeys = function (k) {
                  return storageArrayKeys.some(function (x) {
                    return x === k;
                  });
                };
              return (
                storageKeysFromConfig &&
                  storageKeysFromConfig.find(function (k) {
                    return isInStorageArrayKeys(k);
                  }) &&
                  !amplifyConfig.Storage.AWSS3 &&
                  (amplifyConfig.Storage.AWSS3 = {}),
                Object.entries(amplifyConfig.Storage).map(function (_a) {
                  var _b = Storage_read(_a, 2),
                    key = _b[0],
                    value = _b[1];
                  key &&
                    isInStorageArrayKeys(key) &&
                    void 0 !== value &&
                    ((amplifyConfig.Storage.AWSS3[key] = value),
                    delete amplifyConfig.Storage[key]);
                }),
                Object.keys(amplifyConfig.Storage).forEach(function (
                  providerName
                ) {
                  'string' != typeof amplifyConfig.Storage[providerName] &&
                    (_this._config[providerName] = Storage_assign(
                      Storage_assign({}, _this._config[providerName]),
                      amplifyConfig.Storage[providerName]
                    ));
                }),
                this._pluggables.forEach(function (pluggable) {
                  pluggable.configure(
                    _this._config[pluggable.getProviderName()]
                  );
                }),
                0 === this._pluggables.length &&
                  this.addPluggable(new AWSS3Provider_AWSS3Provider()),
                this._config
              );
            }),
            (Storage.prototype.get = function (key, config) {
              return Storage_awaiter(this, void 0, void 0, function () {
                var _a, provider, prov;
                return Storage_generator(this, function (_b) {
                  return (
                    (_a = (config || {}).provider),
                    (provider = void 0 === _a ? 'AWSS3' : _a),
                    void 0 ===
                      (prov = this._pluggables.find(function (pluggable) {
                        return pluggable.getProviderName() === provider;
                      })) &&
                      (Storage_logger.debug(
                        'No plugin found with providerName',
                        provider
                      ),
                      Promise.reject(
                        'No plugin found in Storage for the provider'
                      )),
                    [2, prov.get(key, config)]
                  );
                });
              });
            }),
            (Storage.prototype.put = function (key, object, config) {
              return Storage_awaiter(this, void 0, void 0, function () {
                var _a, provider, prov;
                return Storage_generator(this, function (_b) {
                  return (
                    (_a = (config || {}).provider),
                    (provider = void 0 === _a ? 'AWSS3' : _a),
                    void 0 ===
                      (prov = this._pluggables.find(function (pluggable) {
                        return pluggable.getProviderName() === provider;
                      })) &&
                      (Storage_logger.debug(
                        'No plugin found with providerName',
                        provider
                      ),
                      Promise.reject(
                        'No plugin found in Storage for the provider'
                      )),
                    [2, prov.put(key, object, config)]
                  );
                });
              });
            }),
            (Storage.prototype.remove = function (key, config) {
              return Storage_awaiter(this, void 0, void 0, function () {
                var _a, provider, prov;
                return Storage_generator(this, function (_b) {
                  return (
                    (_a = (config || {}).provider),
                    (provider = void 0 === _a ? 'AWSS3' : _a),
                    void 0 ===
                      (prov = this._pluggables.find(function (pluggable) {
                        return pluggable.getProviderName() === provider;
                      })) &&
                      (Storage_logger.debug(
                        'No plugin found with providerName',
                        provider
                      ),
                      Promise.reject(
                        'No plugin found in Storage for the provider'
                      )),
                    [2, prov.remove(key, config)]
                  );
                });
              });
            }),
            (Storage.prototype.list = function (path, config) {
              return Storage_awaiter(this, void 0, void 0, function () {
                var _a, provider, prov;
                return Storage_generator(this, function (_b) {
                  return (
                    (_a = (config || {}).provider),
                    (provider = void 0 === _a ? 'AWSS3' : _a),
                    void 0 ===
                      (prov = this._pluggables.find(function (pluggable) {
                        return pluggable.getProviderName() === provider;
                      })) &&
                      (Storage_logger.debug(
                        'No plugin found with providerName',
                        provider
                      ),
                      Promise.reject(
                        'No plugin found in Storage for the provider'
                      )),
                    [2, prov.list(path, config)]
                  );
                });
              });
            }),
            Storage
          );
        })(),
        Amplify = __webpack_require__(233),
        lib_esm_assign = function () {
          return (lib_esm_assign =
            Object.assign ||
            function (t) {
              for (var s, i = 1, n = arguments.length; i < n; i++)
                for (var p in (s = arguments[i]))
                  Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
              return t;
            }).apply(this, arguments);
        },
        lib_esm_logger = new ConsoleLogger.a('Storage'),
        _instance = null,
        storage_lib_esm_Storage = (function () {
          if (_instance) return _instance;
          lib_esm_logger.debug('Create Storage Instance, debug'),
            ((_instance = new Storage_Storage()).vault = new Storage_Storage());
          var old_configure = _instance.configure;
          return (
            (_instance.configure = function (options) {
              lib_esm_logger.debug('storage configure called');
              var vaultConfig = lib_esm_assign(
                {},
                old_configure.call(_instance, options)
              );
              Object.keys(vaultConfig).forEach(function (providerName) {
                'string' != typeof vaultConfig[providerName] &&
                  (vaultConfig[providerName] = lib_esm_assign(
                    lib_esm_assign({}, vaultConfig[providerName]),
                    { level: 'private' }
                  ));
              }),
                lib_esm_logger.debug('storage vault configure called'),
                _instance.vault.configure(vaultConfig);
            }),
            _instance
          );
        })();
      Amplify.a.register(storage_lib_esm_Storage);
    },
    1773: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.d(__webpack_exports__, 'a', function () {
        return getTextSource;
      }),
        __webpack_require__.d(__webpack_exports__, 'b', function () {
          return calcKey;
        }),
        __webpack_require__.d(__webpack_exports__, 'c', function () {
          return getStorageObject;
        }),
        __webpack_require__.d(__webpack_exports__, 'd', function () {
          return imageFileType;
        }),
        __webpack_require__.d(__webpack_exports__, 'e', function () {
          return putStorageObject;
        });
      var _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(62),
        _aws_amplify_storage__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(1771),
        __awaiter = function (thisArg, _arguments, P, generator) {
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
        __generator = function (thisArg, body) {
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
        imageFileType = new Set([
          'apng',
          'bmp',
          'gif',
          'ico',
          'cur',
          'jpg',
          'jpeg',
          'jfif',
          'pjpeg',
          'pjp',
          'png',
          'svg',
          'tif',
          'tiff',
          'webp',
        ]),
        calcKey = function (file, fileToKey) {
          var name = file.name,
            size = file.size,
            type = file.type,
            key = encodeURI(name);
          return (
            fileToKey &&
              ((key =
                'string' == typeof fileToKey
                  ? fileToKey
                  : 'function' == typeof fileToKey
                  ? fileToKey({ name: name, size: size, type: type })
                  : encodeURI(JSON.stringify(fileToKey))) ||
                (key = 'empty_key')),
            key.replace(/\s/g, '_')
          );
        },
        getStorageObject = function (key, level, track, identityId, logger) {
          return __awaiter(void 0, void 0, void 0, function () {
            var src, error_1;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  if (
                    !_aws_amplify_storage__WEBPACK_IMPORTED_MODULE_1__.a ||
                    'function' !=
                      typeof _aws_amplify_storage__WEBPACK_IMPORTED_MODULE_1__.a
                        .get
                  )
                    throw new Error(
                      _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_0__.n
                    );
                  _a.label = 1;
                case 1:
                  return (
                    _a.trys.push([1, 3, , 4]),
                    [
                      4,
                      _aws_amplify_storage__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        key,
                        { level: level, track: track, identityId: identityId }
                      ),
                    ]
                  );
                case 2:
                  return (
                    (src = _a.sent()),
                    logger.debug('Storage image get', src),
                    [2, src]
                  );
                case 3:
                  throw ((error_1 = _a.sent()), new Error(error_1));
                case 4:
                  return [2];
              }
            });
          });
        },
        getTextSource = function (key, level, track, identityId, logger) {
          return __awaiter(void 0, void 0, void 0, function () {
            var textSrc, error_2;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  if (
                    !_aws_amplify_storage__WEBPACK_IMPORTED_MODULE_1__.a ||
                    'function' !=
                      typeof _aws_amplify_storage__WEBPACK_IMPORTED_MODULE_1__.a
                        .get
                  )
                    throw new Error(
                      _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_0__.n
                    );
                  _a.label = 1;
                case 1:
                  return (
                    _a.trys.push([1, 4, , 5]),
                    [
                      4,
                      _aws_amplify_storage__WEBPACK_IMPORTED_MODULE_1__.a.get(
                        key,
                        {
                          download: !0,
                          level: level,
                          track: track,
                          identityId: identityId,
                        }
                      ),
                    ]
                  );
                case 2:
                  return (
                    (textSrc = _a.sent()),
                    logger.debug(textSrc),
                    [
                      4,
                      ((blob = textSrc.Body),
                      new Promise(function (resolve, reject) {
                        var reader = new FileReader();
                        (reader.onload = function () {
                          resolve(reader.result);
                        }),
                          (reader.onerror = function () {
                            reject('Failed to read file!'), reader.abort();
                          }),
                          reader.readAsText(blob);
                      })),
                    ]
                  );
                case 3:
                  return [2, _a.sent()];
                case 4:
                  throw ((error_2 = _a.sent()), new Error(error_2));
                case 5:
                  return [2];
              }
              var blob;
            });
          });
        },
        putStorageObject = function (
          key,
          body,
          level,
          track,
          contentType,
          logger
        ) {
          return __awaiter(void 0, void 0, void 0, function () {
            var data, error_3;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  if (
                    !_aws_amplify_storage__WEBPACK_IMPORTED_MODULE_1__.a ||
                    'function' !=
                      typeof _aws_amplify_storage__WEBPACK_IMPORTED_MODULE_1__.a
                        .put
                  )
                    throw new Error(
                      _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_0__.n
                    );
                  _a.label = 1;
                case 1:
                  return (
                    _a.trys.push([1, 3, , 4]),
                    [
                      4,
                      _aws_amplify_storage__WEBPACK_IMPORTED_MODULE_1__.a.put(
                        key,
                        body,
                        { contentType: contentType, level: level, track: track }
                      ),
                    ]
                  );
                case 2:
                  return (
                    (data = _a.sent()),
                    logger.debug('Upload data', data),
                    [3, 4]
                  );
                case 3:
                  throw ((error_3 = _a.sent()), new Error(error_3));
                case 4:
                  return [2];
              }
            });
          });
        };
    },
    1778: function (module) {
      module.exports = JSON.parse(
        '{"name":"@aws-sdk/client-s3","description":"AWS SDK for JavaScript S3 Client for Node.js, Browser and React Native","version":"1.0.0-rc.4","scripts":{"clean":"npm run remove-definitions && npm run remove-dist","build-documentation":"npm run clean && typedoc ./","prepublishOnly":"yarn build","pretest":"yarn build:cjs","remove-definitions":"rimraf ./types","remove-dist":"rimraf ./dist","remove-documentation":"rimraf ./docs","test:unit":"mocha **/cjs/**/*.spec.js","test:e2e":"mocha **/cjs/**/*.ispec.js && karma start karma.conf.js","test":"yarn test:unit","build:cjs":"tsc -p tsconfig.json","build:es":"tsc -p tsconfig.es.json","build":"yarn build:cjs && yarn build:es"},"main":"./dist/cjs/index.js","types":"./types/index.d.ts","module":"./dist/es/index.js","browser":{"./runtimeConfig":"./runtimeConfig.browser"},"react-native":{"./runtimeConfig":"./runtimeConfig.native"},"sideEffects":false,"dependencies":{"@aws-crypto/sha256-browser":"^1.0.0","@aws-crypto/sha256-js":"^1.0.0","@aws-sdk/config-resolver":"1.0.0-rc.3","@aws-sdk/credential-provider-node":"1.0.0-rc.3","@aws-sdk/eventstream-serde-browser":"1.0.0-rc.3","@aws-sdk/eventstream-serde-config-resolver":"1.0.0-rc.3","@aws-sdk/eventstream-serde-node":"1.0.0-rc.3","@aws-sdk/fetch-http-handler":"1.0.0-rc.3","@aws-sdk/hash-blob-browser":"1.0.0-rc.3","@aws-sdk/hash-node":"1.0.0-rc.3","@aws-sdk/hash-stream-node":"1.0.0-rc.3","@aws-sdk/invalid-dependency":"1.0.0-rc.3","@aws-sdk/md5-js":"1.0.0-rc.3","@aws-sdk/middleware-apply-body-checksum":"1.0.0-rc.3","@aws-sdk/middleware-bucket-endpoint":"1.0.0-rc.4","@aws-sdk/middleware-content-length":"1.0.0-rc.3","@aws-sdk/middleware-expect-continue":"1.0.0-rc.3","@aws-sdk/middleware-host-header":"1.0.0-rc.3","@aws-sdk/middleware-location-constraint":"1.0.0-rc.3","@aws-sdk/middleware-logger":"1.0.0-rc.4","@aws-sdk/middleware-retry":"1.0.0-rc.4","@aws-sdk/middleware-sdk-s3":"1.0.0-rc.3","@aws-sdk/middleware-serde":"1.0.0-rc.3","@aws-sdk/middleware-signing":"1.0.0-rc.3","@aws-sdk/middleware-ssec":"1.0.0-rc.3","@aws-sdk/middleware-stack":"1.0.0-rc.4","@aws-sdk/middleware-user-agent":"1.0.0-rc.3","@aws-sdk/node-config-provider":"1.0.0-rc.3","@aws-sdk/node-http-handler":"1.0.0-rc.3","@aws-sdk/protocol-http":"1.0.0-rc.3","@aws-sdk/smithy-client":"1.0.0-rc.4","@aws-sdk/types":"1.0.0-rc.3","@aws-sdk/url-parser-browser":"1.0.0-rc.3","@aws-sdk/url-parser-node":"1.0.0-rc.3","@aws-sdk/util-base64-browser":"1.0.0-rc.3","@aws-sdk/util-base64-node":"1.0.0-rc.3","@aws-sdk/util-body-length-browser":"1.0.0-rc.3","@aws-sdk/util-body-length-node":"1.0.0-rc.3","@aws-sdk/util-user-agent-browser":"1.0.0-rc.3","@aws-sdk/util-user-agent-node":"1.0.0-rc.3","@aws-sdk/util-utf8-browser":"1.0.0-rc.3","@aws-sdk/util-utf8-node":"1.0.0-rc.3","@aws-sdk/xml-builder":"1.0.0-rc.3","fast-xml-parser":"^3.16.0","tslib":"^2.0.0"},"devDependencies":{"@aws-sdk/client-documentation-generator":"1.0.0-rc.3","@types/chai":"^4.2.11","@types/mocha":"^7.0.2","@types/node":"^12.7.5","jest":"^26.1.0","rimraf":"^3.0.0","typedoc":"^0.17.8","typescript":"~4.0.2"},"engines":{"node":">=10.0.0"},"author":{"name":"AWS SDK for JavaScript Team","url":"https://aws.amazon.com/javascript/"},"license":"Apache-2.0","homepage":"https://github.com/aws/aws-sdk-js-v3/tree/master/clients/client-s3","repository":{"type":"git","url":"https://github.com/aws/aws-sdk-js-v3.git","directory":"clients/client-s3"}}'
      );
    },
  },
]);
//# sourceMappingURL=0.43062421b39d2bb010e4.bundle.js.map
