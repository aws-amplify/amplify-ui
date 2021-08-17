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
exports.white1X1 =
  exports.transparent1X1 =
  exports.propStyle =
  exports.beforeAfter =
  exports.NavButton =
  exports.NavItem =
  exports.NavRight =
  exports.Nav =
  exports.NavBar =
  exports.Space =
  exports.Label =
  exports.Link =
  exports.SignInButton =
  exports.ButtonContent =
  exports.Button =
  exports.ButtonRow =
  exports.MessageContent =
  exports.MessageRow =
  exports.Checkbox =
  exports.CheckboxRow =
  exports.Radio =
  exports.RadioRow =
  exports.InputRow =
  exports.FormRow =
  exports.ActionRow =
  exports.SectionBody =
  exports.SectionFooterContent =
  exports.SectionFooter =
  exports.SectionHeaderContent =
  exports.SectionHeader =
  exports.ErrorSectionContent =
  exports.ErrorSection =
  exports.FormSection =
  exports.FormContainer =
  exports.Container =
    void 0;
var React = __importStar(require('react'));
var core_1 = require('@aws-amplify/core');
var AmplifyTheme_1 = __importDefault(require('./AmplifyTheme'));
var Container = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.container);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'div',
      __assign({}, p, { className: 'amplify-container', style: style }),
      props.children
    )
  );
};
exports.Container = Container;
var FormContainer = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.formContainer);
  return exports.beforeAfter(
    React.createElement(
      'div',
      { className: 'amplify-form-container', style: style },
      props.children
    )
  );
};
exports.FormContainer = FormContainer;
var FormSection = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.formSection);
  return React.createElement(
    exports.FormContainer,
    { theme: theme },
    exports.beforeAfter(
      React.createElement(
        'div',
        { className: 'amplify-form-section', style: style },
        props.children
      )
    )
  );
};
exports.FormSection = FormSection;
var ErrorSection = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.errorSection);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'div',
      __assign({}, p, { className: 'amplify-error-section', style: style }),
      React.createElement(exports.ErrorSectionContent, null, props.children)
    )
  );
};
exports.ErrorSection = ErrorSection;
var ErrorSectionContent = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.errorSectionContent);
  return exports.beforeAfter(
    React.createElement(
      'span',
      { className: 'amplify-error-section-content', style: style },
      props.children
    )
  );
};
exports.ErrorSectionContent = ErrorSectionContent;
var SectionHeader = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.sectionHeader);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'div',
      __assign({}, p, { className: 'amplify-section-header', style: style }),
      React.createElement(
        exports.SectionHeaderContent,
        { theme: theme },
        props.children
      )
    )
  );
};
exports.SectionHeader = SectionHeader;
var SectionHeaderContent = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.sectionHeaderContent);
  return exports.beforeAfter(
    React.createElement(
      'span',
      { className: 'amplify-section-header-content', style: style },
      props.children
    )
  );
};
exports.SectionHeaderContent = SectionHeaderContent;
var SectionFooter = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.sectionFooter);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'div',
      __assign({}, p, { className: 'amplify-section-footer', style: style }),
      React.createElement(
        exports.SectionFooterContent,
        { theme: theme },
        props.children
      )
    )
  );
};
exports.SectionFooter = SectionFooter;
var SectionFooterContent = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.sectionFooterContent);
  return exports.beforeAfter(
    React.createElement(
      'span',
      { className: 'amplify-section-footer-content', style: style },
      props.children
    )
  );
};
exports.SectionFooterContent = SectionFooterContent;
var SectionBody = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.sectionBody);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'div',
      __assign({}, p, { className: 'amplify-section-body', style: style }),
      props.children
    )
  );
};
exports.SectionBody = SectionBody;
var ActionRow = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.actionRow);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'div',
      __assign({}, p, { className: 'amplify-action-row', style: style }),
      props.children
    )
  );
};
exports.ActionRow = ActionRow;
var FormRow = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.formRow);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'div',
      __assign({}, p, { className: 'amplify-form-row', style: style }),
      props.children
    )
  );
};
exports.FormRow = FormRow;
var InputRow = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.input);
  var p = core_1.objectLessAttributes(props, 'theme');
  return React.createElement(
    exports.FormRow,
    { theme: theme },
    exports.beforeAfter(
      React.createElement(
        'input',
        __assign({}, p, { className: 'amplify-input', style: style })
      )
    )
  );
};
exports.InputRow = InputRow;
var RadioRow = function (props) {
  var id = props.id || '_' + props.value;
  var theme = props.theme || AmplifyTheme_1.default;
  return React.createElement(
    exports.FormRow,
    { theme: theme },
    React.createElement(exports.Radio, __assign({}, props, { id: id })),
    React.createElement(
      exports.Label,
      { htmlFor: id, theme: theme },
      props.placeholder
    )
  );
};
exports.RadioRow = RadioRow;
var Radio = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.radio);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'input',
      __assign({}, p, {
        type: 'radio',
        className: 'amplify-radio',
        style: style,
      })
    )
  );
};
exports.Radio = Radio;
var CheckboxRow = function (props) {
  var id = props.id || '_' + props.name;
  var theme = props.theme || AmplifyTheme_1.default;
  return React.createElement(
    exports.FormRow,
    { theme: theme },
    React.createElement(exports.Checkbox, __assign({}, props, { id: id })),
    React.createElement(
      exports.Label,
      { htmlFor: id, theme: theme },
      props.placeholder
    )
  );
};
exports.CheckboxRow = CheckboxRow;
var Checkbox = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.checkbox);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'input',
      __assign({}, p, {
        type: 'checkbox',
        className: 'amplify-checkbox',
        style: style,
      })
    )
  );
};
exports.Checkbox = Checkbox;
var MessageRow = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  return React.createElement(
    exports.FormRow,
    { theme: theme },
    React.createElement(
      exports.MessageContent,
      { theme: theme },
      props.children
    )
  );
};
exports.MessageRow = MessageRow;
var MessageContent = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  return exports.beforeAfter(
    React.createElement(
      'span',
      { className: 'amplify-message-content', style: theme.messageContent },
      props.children
    )
  );
};
exports.MessageContent = MessageContent;
var ButtonRow = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  return exports.beforeAfter(
    React.createElement(
      'div',
      { className: 'amplify-action-row', style: theme.actionRow },
      React.createElement(exports.Button, __assign({}, props))
    )
  );
};
exports.ButtonRow = ButtonRow;
var Button = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.button);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'button',
      __assign({}, p, { className: 'amplify-button', style: style }),
      React.createElement(
        exports.ButtonContent,
        { theme: theme },
        props.children
      )
    )
  );
};
exports.Button = Button;
var ButtonContent = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  return exports.beforeAfter(
    React.createElement(
      'span',
      { className: 'amplify-button-content', style: theme.buttonContent },
      props.children
    )
  );
};
exports.ButtonContent = ButtonContent;
var SignInButton = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.signInButton);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'button',
      __assign({}, p, { className: 'amplify-signin-button', style: style }),
      props.children
    )
  );
};
exports.SignInButton = SignInButton;
var Link = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.a);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'a',
      __assign({}, p, { className: 'amplify-a', style: style }),
      props.children
    )
  );
};
exports.Link = Link;
var Label = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.label);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'label',
      __assign({}, p, { className: 'amplify-label', style: style }),
      props.children
    )
  );
};
exports.Label = Label;
var Space = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.space);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'span',
      __assign({}, p, { className: 'amplify-space', style: style }),
      props.children
    )
  );
};
exports.Space = Space;
var NavBar = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.navBar);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'div',
      __assign({}, p, { className: 'amplify-nav-bar', style: style }),
      props.children
    )
  );
};
exports.NavBar = NavBar;
var Nav = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.nav);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'div',
      __assign({}, p, { className: 'amplify-nav', style: style }),
      props.children
    )
  );
};
exports.Nav = Nav;
var NavRight = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.navRight);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'div',
      __assign({}, p, { className: 'amplify-nav-right', style: style }),
      props.children
    )
  );
};
exports.NavRight = NavRight;
var NavItem = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.navItem);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'div',
      __assign({}, p, { className: 'amplify-nav-item', style: style }),
      props.children
    )
  );
};
exports.NavItem = NavItem;
var NavButton = function (props) {
  var theme = props.theme || AmplifyTheme_1.default;
  var style = exports.propStyle(props, theme.navButton);
  var p = core_1.objectLessAttributes(props, 'theme');
  return exports.beforeAfter(
    React.createElement(
      'button',
      __assign({}, p, { className: 'amplify-nav-button', style: style }),
      exports.beforeAfter(
        React.createElement(
          'span',
          { style: theme.navButtonContent },
          props.children
        )
      )
    )
  );
};
exports.NavButton = NavButton;
var beforeAfter = function (el) {
  var style = el.props.style || {};
  var before = style.before,
    after = style.after;
  if (!before && !after) {
    return el;
  }
  return React.createElement(
    'span',
    { style: { position: 'relative' } },
    before
      ? React.createElement('span', { style: before }, before.content)
      : null,
    el,
    after ? React.createElement('span', { style: after }, after.content) : null
  );
};
exports.beforeAfter = beforeAfter;
var propStyle = function (props, themeStyle) {
  var id = props.id,
    style = props.style;
  var styl = Object.assign({}, style, themeStyle);
  if (!id) {
    return styl;
  }
  var selector = '#' + id;
  Object.assign(styl, styl[selector]);
  return styl;
};
exports.propStyle = propStyle;
exports.transparent1X1 =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
exports.white1X1 =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
//# sourceMappingURL=AmplifyUI.js.map
