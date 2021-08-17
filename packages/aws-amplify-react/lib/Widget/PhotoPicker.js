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
exports.PhotoPicker = void 0;
var React = __importStar(require('react'));
var core_1 = require('@aws-amplify/core');
var Picker_1 = require('./Picker');
var Amplify_UI_Theme_1 = __importDefault(
  require('../Amplify-UI/Amplify-UI-Theme')
);
var Amplify_UI_Components_React_1 = require('../Amplify-UI/Amplify-UI-Components-React');
var PickerPreview = {
  maxWidth: '100%',
};
var logger = new core_1.ConsoleLogger('PhotoPicker');
var PhotoPicker = /** @class */ (function (_super) {
  __extends(PhotoPicker, _super);
  function PhotoPicker(props) {
    var _this = _super.call(this, props) || this;
    _this.handlePick = _this.handlePick.bind(_this);
    _this.state = {
      previewSrc: props.previewSrc,
    };
    return _this;
  }
  PhotoPicker.prototype.handlePick = function (data) {
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
    if (preview && preview !== 'hidden') {
      var reader = new FileReader();
      reader.onload = function (e) {
        var url = e.target.result;
        // @ts-ignore
        that.setState({ previewSrc: url });
        if (onLoad) {
          onLoad(url);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  PhotoPicker.prototype.render = function () {
    var preview = this.props.preview;
    var previewSrc = this.state.previewSrc;
    var headerText = this.props.headerText || 'Photos';
    var headerHint =
      this.props.headerHint || 'Add your photos by clicking below';
    var title = this.props.title || 'Select a Photo';
    var theme = this.props.theme || Amplify_UI_Theme_1.default;
    var previewStyle = Object.assign({}, PickerPreview, theme.pickerPreview);
    var previewHidden = !preview || preview === 'hidden';
    return React.createElement(
      Amplify_UI_Components_React_1.FormSection,
      { theme: theme },
      React.createElement(
        Amplify_UI_Components_React_1.SectionHeader,
        { theme: theme, hint: headerHint },
        core_1.I18n.get(headerText)
      ),
      React.createElement(
        Amplify_UI_Components_React_1.SectionBody,
        { theme: theme },
        previewSrc
          ? previewHidden
            ? 'The image has been selected'
            : React.createElement('img', {
                src: previewSrc,
                style: previewStyle,
              })
          : React.createElement(
              Amplify_UI_Components_React_1.PhotoPlaceholder,
              { theme: theme }
            )
      ),
      React.createElement(Picker_1.Picker, {
        title: title,
        accept: 'image/*',
        theme: theme,
        onPick: this.handlePick,
      })
    );
  };
  return PhotoPicker;
})(React.Component);
exports.PhotoPicker = PhotoPicker;
/**
 * @deprecated use named import
 */
exports.default = PhotoPicker;
//# sourceMappingURL=PhotoPicker.js.map
