'use strict';
/*
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OAuthButton = exports.withOAuth = void 0;
var React = __importStar(require('react'));
var core_1 = require('@aws-amplify/core');
var auth_1 = require('@aws-amplify/auth');
var Amplify_UI_Theme_1 = __importDefault(
  require('../../Amplify-UI/Amplify-UI-Theme')
);
var ui_1 = require('@aws-amplify/ui');
var Amplify_UI_Components_React_1 = require('../../Amplify-UI/Amplify-UI-Components-React');
function withOAuth(Comp) {
  return /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1(props) {
      var _this = _super.call(this, props) || this;
      _this.signIn = _this.signIn.bind(_this);
      return _this;
    }
    class_1.prototype.signIn = function (_e, provider) {
      auth_1.Auth.federatedSignIn({ provider: provider });
    };
    class_1.prototype.render = function () {
      return React.createElement(
        Comp,
        __assign({}, this.props, { OAuthSignIn: this.signIn })
      );
    };
    return class_1;
  })(React.Component);
}
exports.withOAuth = withOAuth;
var Button = function (props) {
  return React.createElement(
    Amplify_UI_Components_React_1.SignInButton,
    {
      id: ui_1.oAuthSignInButton,
      onClick: function () {
        return props.OAuthSignIn();
      },
      theme: props.theme || Amplify_UI_Theme_1.default,
      variant: 'oAuthSignInButton',
    },
    React.createElement(
      Amplify_UI_Components_React_1.SignInButtonContent,
      { theme: props.theme || Amplify_UI_Theme_1.default },
      core_1.I18n.get(props.label || 'Sign in with AWS')
    )
  );
};
exports.OAuthButton = withOAuth(Button);
/**
 * @deprecated use named import
 */
exports.default = withOAuth;
//# sourceMappingURL=withOAuth.js.map
