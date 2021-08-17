'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.signUpWithPhoneNumberFields =
  exports.signUpWithEmailFields =
  exports['default'] =
    void 0;

var _AmplifyTestIDs = _interopRequireDefault(require('../../AmplifyTestIDs'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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
var _default = [
  {
    label: 'Username',
    key: 'username',
    required: true,
    placeholder: 'Username',
    displayOrder: 1,
    testID: _AmplifyTestIDs['default'].AUTH.USERNAME_INPUT,
  },
  {
    label: 'Password',
    key: 'password',
    required: true,
    placeholder: 'Password',
    type: 'password',
    displayOrder: 2,
    testID: _AmplifyTestIDs['default'].AUTH.PASSWORD_INPUT,
  },
  {
    label: 'Email',
    key: 'email',
    required: true,
    placeholder: 'Email',
    type: 'email',
    displayOrder: 3,
    testID: _AmplifyTestIDs['default'].AUTH.EMAIL_INPUT,
  },
  {
    label: 'Phone Number',
    key: 'phone_number',
    placeholder: 'Phone Number',
    required: true,
    displayOrder: 4,
    testID: _AmplifyTestIDs['default'].AUTH.PHONE_INPUT,
  },
];
exports['default'] = _default;
var signUpWithEmailFields = [
  {
    label: 'Email',
    key: 'email',
    required: true,
    placeholder: 'Email',
    type: 'email',
    displayOrder: 1,
    testID: _AmplifyTestIDs['default'].AUTH.EMAIL_INPUT,
  },
  {
    label: 'Password',
    key: 'password',
    required: true,
    placeholder: 'Password',
    type: 'password',
    displayOrder: 2,
    testID: _AmplifyTestIDs['default'].AUTH.PASSWORD_INPUT,
  },
  {
    label: 'Phone Number',
    key: 'phone_number',
    placeholder: 'Phone Number',
    required: true,
    displayOrder: 3,
    testID: _AmplifyTestIDs['default'].AUTH.PHONE_INPUT,
  },
];
exports.signUpWithEmailFields = signUpWithEmailFields;
var signUpWithPhoneNumberFields = [
  {
    label: 'Phone Number',
    key: 'phone_number',
    placeholder: 'Phone Number',
    required: true,
    displayOrder: 1,
    testID: _AmplifyTestIDs['default'].AUTH.PHONE_INPUT,
  },
  {
    label: 'Password',
    key: 'password',
    required: true,
    placeholder: 'Password',
    type: 'password',
    displayOrder: 2,
    testID: _AmplifyTestIDs['default'].AUTH.PASSWORD_INPUT,
  },
  {
    label: 'Email',
    key: 'email',
    required: true,
    placeholder: 'Email',
    type: 'email',
    displayOrder: 3,
    testID: _AmplifyTestIDs['default'].AUTH.EMAIL_INPUT,
  },
];
exports.signUpWithPhoneNumberFields = signUpWithPhoneNumberFields;
