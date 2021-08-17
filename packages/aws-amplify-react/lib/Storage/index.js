'use strict';
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
Object.defineProperty(exports, '__esModule', { value: true });
exports.S3Text = exports.S3Image = exports.S3Album = void 0;
var S3Album_1 = require('./S3Album');
Object.defineProperty(exports, 'S3Album', {
  enumerable: true,
  get: function () {
    return S3Album_1.S3Album;
  },
});
var S3Image_1 = require('./S3Image');
Object.defineProperty(exports, 'S3Image', {
  enumerable: true,
  get: function () {
    return S3Image_1.S3Image;
  },
});
var S3Text_1 = require('./S3Text');
Object.defineProperty(exports, 'S3Text', {
  enumerable: true,
  get: function () {
    return S3Text_1.S3Text;
  },
});
//# sourceMappingURL=index.js.map
