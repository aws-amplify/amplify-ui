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
exports.TOTPSetupComp = void 0;
var React = __importStar(require('react'));
var core_1 = require('@aws-amplify/core');
var auth_1 = require('@aws-amplify/auth');
var Amplify_UI_Theme_1 = __importDefault(
  require('../Amplify-UI/Amplify-UI-Theme')
);
var Amplify_UI_Components_React_1 = require('../Amplify-UI/Amplify-UI-Components-React');
var ui_1 = require('@aws-amplify/ui');
var qrcode_react_1 = __importDefault(require('qrcode.react'));
var logger = new core_1.ConsoleLogger('TOTPSetupComp');
var TOTPSetupComp = /** @class */ (function (_super) {
  __extends(TOTPSetupComp, _super);
  function TOTPSetupComp(props) {
    var _this = _super.call(this, props) || this;
    _this.setup = _this.setup.bind(_this);
    _this.showSecretCode = _this.showSecretCode.bind(_this);
    _this.verifyTotpToken = _this.verifyTotpToken.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.triggerTOTPEvent = _this.triggerTOTPEvent.bind(_this);
    _this.state = {
      code: null,
      setupMessage: null,
    };
    return _this;
  }
  TOTPSetupComp.prototype.componentDidMount = function () {
    this.setup();
  };
  TOTPSetupComp.prototype.triggerTOTPEvent = function (event, data, user) {
    if (this.props.onTOTPEvent) {
      this.props.onTOTPEvent(event, data, user);
    }
  };
  TOTPSetupComp.prototype.handleInputChange = function (evt) {
    this.setState({ setupMessage: null });
    this.inputs = {};
    var _a = evt.target,
      name = _a.name,
      value = _a.value,
      type = _a.type,
      checked = _a.checked;
    // @ts-ignore
    var check_type = ['radio', 'checkbox'].includes(type);
    this.inputs[name] = check_type ? checked : value;
  };
  TOTPSetupComp.prototype.setup = function () {
    var _this = this;
    this.setState({ setupMessage: null });
    var user = this.props.authData;
    var issuer = encodeURI(core_1.I18n.get('AWSCognito'));
    if (!auth_1.Auth || typeof auth_1.Auth.setupTOTP !== 'function') {
      throw new Error(
        'No Auth module found, please ensure @aws-amplify/auth is imported'
      );
    }
    auth_1.Auth.setupTOTP(user)
      .then(function (data) {
        logger.debug('secret key', data);
        var code =
          'otpauth://totp/' +
          issuer +
          ':' +
          user.username +
          '?secret=' +
          data +
          '&issuer=' +
          issuer;
        _this.setState({ code: code });
      })
      .catch(function (err) {
        return logger.debug('totp setup failed', err);
      });
  };
  TOTPSetupComp.prototype.verifyTotpToken = function () {
    var _this = this;
    if (!this.inputs) {
      logger.debug('no input');
      return;
    }
    var user = this.props.authData;
    var totpCode = this.inputs.totpCode;
    if (
      !auth_1.Auth ||
      typeof auth_1.Auth.verifyTotpToken !== 'function' ||
      typeof auth_1.Auth.setPreferredMFA !== 'function'
    ) {
      throw new Error(
        'No Auth module found, please ensure @aws-amplify/auth is imported'
      );
    }
    return auth_1.Auth.verifyTotpToken(user, totpCode)
      .then(function () {
        // set it to preferred mfa
        return auth_1.Auth.setPreferredMFA(user, 'TOTP')
          .then(function () {
            _this.setState({ setupMessage: 'Setup TOTP successfully!' });
            logger.debug('set up totp success!');
            _this.triggerTOTPEvent('Setup TOTP', 'SUCCESS', user);
          })
          .catch(function (err) {
            _this.setState({ setupMessage: 'Setup TOTP failed!' });
            logger.error(err);
          });
      })
      .catch(function (err) {
        _this.setState({ setupMessage: 'Setup TOTP failed!' });
        logger.error(err);
      });
  };
  TOTPSetupComp.prototype.showSecretCode = function (code, theme) {
    if (!code) return null;
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: ui_1.totpQrcode },
        React.createElement(qrcode_react_1.default, { value: code })
      ),
      React.createElement(
        Amplify_UI_Components_React_1.InputLabel,
        { theme: theme },
        core_1.I18n.get('Enter Security Code:')
      ),
      React.createElement(Amplify_UI_Components_React_1.Input, {
        autoFocus: true,
        theme: theme,
        key: 'totpCode',
        name: 'totpCode',
        onChange: this.handleInputChange,
      })
    );
  };
  TOTPSetupComp.prototype.render = function () {
    var theme = this.props.theme
      ? this.props.theme
      : Amplify_UI_Theme_1.default;
    var code = this.state.code;
    return React.createElement(
      Amplify_UI_Components_React_1.FormSection,
      { theme: theme },
      this.state.setupMessage &&
        React.createElement(
          Amplify_UI_Components_React_1.Toast,
          null,
          core_1.I18n.get(this.state.setupMessage)
        ),
      React.createElement(
        Amplify_UI_Components_React_1.SectionHeader,
        { theme: theme },
        core_1.I18n.get('Scan then enter verification code')
      ),
      React.createElement(
        Amplify_UI_Components_React_1.SectionBody,
        { theme: theme },
        this.showSecretCode(code, theme),
        this.state.setupMessage && core_1.I18n.get(this.state.setupMessage)
      ),
      React.createElement(
        Amplify_UI_Components_React_1.SectionFooter,
        { theme: theme },
        React.createElement(
          Amplify_UI_Components_React_1.Button,
          {
            theme: theme,
            onClick: this.verifyTotpToken,
            style: { width: '100%' },
          },
          core_1.I18n.get('Verify Security Token')
        )
      )
    );
  };
  return TOTPSetupComp;
})(React.Component);
exports.TOTPSetupComp = TOTPSetupComp;
/**
 * @deprecated use named import
 */
exports.default = TOTPSetupComp;
//# sourceMappingURL=TOTPSetupComp.js.map
