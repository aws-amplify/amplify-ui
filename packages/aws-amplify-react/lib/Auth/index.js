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
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthenticatorWrapper =
  exports.withAuthenticator =
  exports.Loading =
  exports.TOTPSetup =
  exports.FederatedButtons =
  exports.FederatedSignIn =
  exports.Greetings =
  exports.ForgotPassword =
  exports.VerifyContact =
  exports.ConfirmSignUp =
  exports.SignUp =
  exports.RequireNewPassword =
  exports.SignOut =
  exports.ConfirmSignIn =
  exports.SignIn =
  exports.AuthPiece =
  exports.Authenticator =
    void 0;
var React = __importStar(require('react'));
var Authenticator_1 = require('./Authenticator');
var Authenticator_2 = require('./Authenticator');
Object.defineProperty(exports, 'Authenticator', {
  enumerable: true,
  get: function () {
    return Authenticator_2.Authenticator;
  },
});
var AuthPiece_1 = require('./AuthPiece');
Object.defineProperty(exports, 'AuthPiece', {
  enumerable: true,
  get: function () {
    return AuthPiece_1.AuthPiece;
  },
});
var SignIn_1 = require('./SignIn');
Object.defineProperty(exports, 'SignIn', {
  enumerable: true,
  get: function () {
    return SignIn_1.SignIn;
  },
});
var ConfirmSignIn_1 = require('./ConfirmSignIn');
Object.defineProperty(exports, 'ConfirmSignIn', {
  enumerable: true,
  get: function () {
    return ConfirmSignIn_1.ConfirmSignIn;
  },
});
var SignOut_1 = require('./SignOut');
Object.defineProperty(exports, 'SignOut', {
  enumerable: true,
  get: function () {
    return SignOut_1.SignOut;
  },
});
var RequireNewPassword_1 = require('./RequireNewPassword');
Object.defineProperty(exports, 'RequireNewPassword', {
  enumerable: true,
  get: function () {
    return RequireNewPassword_1.RequireNewPassword;
  },
});
var SignUp_1 = require('./SignUp');
Object.defineProperty(exports, 'SignUp', {
  enumerable: true,
  get: function () {
    return SignUp_1.SignUp;
  },
});
var ConfirmSignUp_1 = require('./ConfirmSignUp');
Object.defineProperty(exports, 'ConfirmSignUp', {
  enumerable: true,
  get: function () {
    return ConfirmSignUp_1.ConfirmSignUp;
  },
});
var VerifyContact_1 = require('./VerifyContact');
Object.defineProperty(exports, 'VerifyContact', {
  enumerable: true,
  get: function () {
    return VerifyContact_1.VerifyContact;
  },
});
var ForgotPassword_1 = require('./ForgotPassword');
Object.defineProperty(exports, 'ForgotPassword', {
  enumerable: true,
  get: function () {
    return ForgotPassword_1.ForgotPassword;
  },
});
var Greetings_1 = require('./Greetings');
Object.defineProperty(exports, 'Greetings', {
  enumerable: true,
  get: function () {
    return Greetings_1.Greetings;
  },
});
var FederatedSignIn_1 = require('./FederatedSignIn');
Object.defineProperty(exports, 'FederatedSignIn', {
  enumerable: true,
  get: function () {
    return FederatedSignIn_1.FederatedSignIn;
  },
});
Object.defineProperty(exports, 'FederatedButtons', {
  enumerable: true,
  get: function () {
    return FederatedSignIn_1.FederatedButtons;
  },
});
var TOTPSetup_1 = require('./TOTPSetup');
Object.defineProperty(exports, 'TOTPSetup', {
  enumerable: true,
  get: function () {
    return TOTPSetup_1.TOTPSetup;
  },
});
var Loading_1 = require('./Loading');
Object.defineProperty(exports, 'Loading', {
  enumerable: true,
  get: function () {
    return Loading_1.Loading;
  },
});
__exportStar(require('./Provider'), exports);
__exportStar(require('./common/types'), exports);
function withAuthenticator(
  Comp,
  includeGreetings,
  authenticatorComponents,
  federated,
  theme,
  signUpConfig
) {
  if (includeGreetings === void 0) {
    includeGreetings = false;
  }
  if (authenticatorComponents === void 0) {
    authenticatorComponents = [];
  }
  if (federated === void 0) {
    federated = null;
  }
  if (theme === void 0) {
    theme = null;
  }
  if (signUpConfig === void 0) {
    signUpConfig = {};
  }
  return /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1(props) {
      var _this = _super.call(this, props) || this;
      _this.handleAuthStateChange = _this.handleAuthStateChange.bind(_this);
      _this.state = {
        authState: props.authState || null,
        authData: props.authData || null,
      };
      _this.authConfig = {};
      if (typeof includeGreetings === 'object' && includeGreetings !== null) {
        _this.authConfig = Object.assign(_this.authConfig, includeGreetings);
      } else {
        _this.authConfig = {
          includeGreetings: includeGreetings,
          authenticatorComponents: authenticatorComponents,
          federated: federated,
          theme: theme,
          signUpConfig: signUpConfig,
        };
      }
      return _this;
    }
    class_1.prototype.handleAuthStateChange = function (state, data) {
      this.setState({ authState: state, authData: data });
    };
    class_1.prototype.render = function () {
      var _a = this.state,
        authState = _a.authState,
        authData = _a.authData;
      if (authState === 'signedIn') {
        return React.createElement(
          React.Fragment,
          null,
          this.authConfig.includeGreetings
            ? React.createElement(
                Authenticator_1.Authenticator,
                __assign({}, this.props, {
                  theme: this.authConfig.theme,
                  federated: this.authConfig.federated || this.props.federated,
                  hideDefault:
                    this.authConfig.authenticatorComponents &&
                    this.authConfig.authenticatorComponents.length > 0,
                  signUpConfig: this.authConfig.signUpConfig,
                  usernameAttributes: this.authConfig.usernameAttributes,
                  onStateChange: this.handleAuthStateChange,
                  children: this.authConfig.authenticatorComponents || [],
                })
              )
            : null,
          React.createElement(
            Comp,
            __assign({}, this.props, {
              authState: authState,
              authData: authData,
              onStateChange: this.handleAuthStateChange,
            })
          )
        );
      }
      return React.createElement(
        Authenticator_1.Authenticator,
        __assign({}, this.props, {
          theme: this.authConfig.theme,
          federated: this.authConfig.federated || this.props.federated,
          hideDefault:
            this.authConfig.authenticatorComponents &&
            this.authConfig.authenticatorComponents.length > 0,
          signUpConfig: this.authConfig.signUpConfig,
          usernameAttributes: this.authConfig.usernameAttributes,
          onStateChange: this.handleAuthStateChange,
          children: this.authConfig.authenticatorComponents || [],
        })
      );
    };
    return class_1;
  })(React.Component);
}
exports.withAuthenticator = withAuthenticator;
var AuthenticatorWrapper = /** @class */ (function (_super) {
  __extends(AuthenticatorWrapper, _super);
  function AuthenticatorWrapper(props) {
    var _this = _super.call(this, props) || this;
    _this.state = { auth: 'init' };
    _this.handleAuthState = _this.handleAuthState.bind(_this);
    _this.renderChildren = _this.renderChildren.bind(_this);
    return _this;
  }
  AuthenticatorWrapper.prototype.handleAuthState = function (state, data) {
    this.setState({ auth: state, authData: data });
  };
  AuthenticatorWrapper.prototype.renderChildren = function () {
    // @ts-ignore
    return this.props.children(this.state.auth);
  };
  AuthenticatorWrapper.prototype.render = function () {
    return React.createElement(
      'div',
      null,
      React.createElement(
        Authenticator_1.Authenticator,
        __assign({}, this.props, { onStateChange: this.handleAuthState })
      ),
      this.renderChildren()
    );
  };
  return AuthenticatorWrapper;
})(React.Component);
exports.AuthenticatorWrapper = AuthenticatorWrapper;
//# sourceMappingURL=index.js.map
