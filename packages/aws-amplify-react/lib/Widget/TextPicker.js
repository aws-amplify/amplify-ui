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
exports.TextPicker = void 0;
var React = __importStar(require('react'));
var core_1 = require('@aws-amplify/core');
var AmplifyTheme_1 = __importDefault(require('../AmplifyTheme'));
var Picker_1 = require('./Picker');
var Container = {};
var PickerPreview = {
  maxWidth: '100%',
};
var logger = new core_1.ConsoleLogger('TextPicker');
var TextPicker = /** @class */ (function (_super) {
  __extends(TextPicker, _super);
  function TextPicker(props) {
    var _this = _super.call(this, props) || this;
    _this.handlePick = _this.handlePick.bind(_this);
    _this.state = {
      previewText: props.previewText,
    };
    return _this;
  }
  TextPicker.prototype.handlePick = function (data) {
    var that = this;
    var file = data.file,
      name = data.name,
      size = data.size,
      type = data.type;
    var _a = this.props,
      preview = _a.preview,
      onPick = _a.onPick,
      onLoad = _a.onLoad;
    if (onPick) {
      onPick(data);
    }
    if (preview) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var text = e.target.result;
        // @ts-ignore
        that.setState({ previewText: text });
        if (onLoad) {
          onLoad(text);
        }
      };
      reader.readAsText(file);
    }
  };
  TextPicker.prototype.render = function () {
    var preview = this.props.preview;
    var previewText = this.state.previewText;
    var title = this.props.title || 'Pick a File';
    var theme = this.props.theme || AmplifyTheme_1.default;
    var containerStyle = Object.assign({}, Container, theme.picker);
    var previewStyle = Object.assign(
      {},
      PickerPreview,
      theme.pickerPreview,
      theme.halfHeight,
      preview && preview !== 'hidden' ? {} : AmplifyTheme_1.default.hidden
    );
    return React.createElement(
      'div',
      { style: containerStyle },
      previewText
        ? React.createElement(
            'div',
            { style: previewStyle },
            React.createElement('pre', { style: theme.pre }, previewText)
          )
        : null,
      React.createElement(Picker_1.Picker, {
        title: title,
        accept: 'text/*',
        theme: theme,
        onPick: this.handlePick,
      })
    );
  };
  return TextPicker;
})(React.Component);
exports.TextPicker = TextPicker;
/**
 * @deprecated use named import
 */
exports.default = TextPicker;
//# sourceMappingURL=TextPicker.js.map
