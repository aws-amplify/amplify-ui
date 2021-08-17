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
var _exportNames = {
  AmplifyTheme: true,
  AmplifyMessageMapEntries: true,
};
Object.defineProperty(exports, 'AmplifyTheme', {
  enumerable: true,
  get: function get() {
    return _AmplifyTheme['default'];
  },
});
Object.defineProperty(exports, 'AmplifyMessageMapEntries', {
  enumerable: true,
  get: function get() {
    return _AmplifyMessageMap.MapEntries;
  },
});
exports['default'] = void 0;

var _awsAmplify = _interopRequireWildcard(require('aws-amplify'));

var _AmplifyI18n = _interopRequireDefault(require('./AmplifyI18n'));

var _AmplifyTheme = _interopRequireDefault(require('./AmplifyTheme'));

var _AmplifyMessageMap = require('./AmplifyMessageMap');

var _AmplifyUI = require('./AmplifyUI');

Object.keys(_AmplifyUI).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _AmplifyUI[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AmplifyUI[key];
    },
  });
});

var _Auth = require('./Auth');

Object.keys(_Auth).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Auth[key];
    },
  });
});

var _API = require('./API');

Object.keys(_API).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _API[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _API[key];
    },
  });
});

var _Storage = require('./Storage');

Object.keys(_Storage).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Storage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Storage[key];
    },
  });
});

var _Interactions = require('./Interactions');

Object.keys(_Interactions).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Interactions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Interactions[key];
    },
  });
});

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
var configure = function configure(config) {
  var msg = [
    '',
    '\x1b[33mWarning: Amplify.configure() is deprecated from aws-amplify-react-native.',
    '        Please import aws-amplify package to configure AWS Amplify\x1b[0m',
    '',
    '        Example:',
    '',
    "        \x1b[36mimport Amplify from 'aws-amplify';",
    "        import aws_exports from './aws-exports';",
    '',
    '        Amplify.configure(aws_exports)\x1b[0m',
    '',
  ].join('\n');
  console.log(msg);

  _awsAmplify['default'].configure(config);
};

var Amplify = {
  configure: configure,
};
var _default = Amplify;
exports['default'] = _default;

_awsAmplify.I18n.putVocabularies(_AmplifyI18n['default']);
