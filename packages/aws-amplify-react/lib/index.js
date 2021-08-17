'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.white1X1 =
  exports.transparent1X1 =
  exports.AmplifyMessageMapEntries =
  exports.AmplifyTheme =
    void 0;
/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
var core_1 = require('@aws-amplify/core');
var AmplifyI18n_1 = require('./AmplifyI18n');
__exportStar(require('./AmplifyUI'), exports);
__exportStar(require('./Auth'), exports);
__exportStar(require('./Analytics'), exports);
__exportStar(require('./Storage'), exports);
__exportStar(require('./Widget'), exports);
__exportStar(require('./API'), exports);
__exportStar(require('./Interactions'), exports);
__exportStar(require('./XR'), exports);
var AmplifyTheme_1 = require('./AmplifyTheme');
Object.defineProperty(exports, 'AmplifyTheme', {
  enumerable: true,
  get: function () {
    return AmplifyTheme_1.Bootstrap;
  },
});
var AmplifyMessageMap_1 = require('./AmplifyMessageMap');
Object.defineProperty(exports, 'AmplifyMessageMapEntries', {
  enumerable: true,
  get: function () {
    return AmplifyMessageMap_1.MapEntries;
  },
});
var AmplifyUI_1 = require('./AmplifyUI');
Object.defineProperty(exports, 'transparent1X1', {
  enumerable: true,
  get: function () {
    return AmplifyUI_1.transparent1X1;
  },
});
Object.defineProperty(exports, 'white1X1', {
  enumerable: true,
  get: function () {
    return AmplifyUI_1.white1X1;
  },
});
core_1.I18n.putVocabularies(AmplifyI18n_1.dict);
//# sourceMappingURL=index.js.map
