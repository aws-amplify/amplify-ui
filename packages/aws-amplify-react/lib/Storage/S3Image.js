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
exports.S3Image = void 0;
var React = __importStar(require('react'));
var core_1 = require('@aws-amplify/core');
var storage_1 = require('@aws-amplify/storage');
var AmplifyTheme_1 = __importDefault(require('../AmplifyTheme'));
var AmplifyUI_1 = require('../AmplifyUI');
var PhotoPicker_1 = require('../Widget/PhotoPicker');
var Common_1 = require('./Common');
var logger = new core_1.ConsoleLogger('Storage.S3Image');
var S3Image = /** @class */ (function (_super) {
  __extends(S3Image, _super);
  function S3Image(props) {
    var _this = _super.call(this, props) || this;
    _this._isMounted = false;
    _this.handleOnLoad = _this.handleOnLoad.bind(_this);
    _this.handleOnError = _this.handleOnError.bind(_this);
    _this.handlePick = _this.handlePick.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    var initSrc = _this.props.src || AmplifyUI_1.transparent1X1;
    _this.state = { src: initSrc };
    return _this;
  }
  S3Image.prototype.getImageSource = function (key, level, track, identityId) {
    var _this = this;
    if (!storage_1.Storage || typeof storage_1.Storage.get !== 'function') {
      throw new Error(
        'No Storage module found, please ensure @aws-amplify/storage is imported'
      );
    }
    storage_1.Storage.get(key, {
      level: level ? level : 'public',
      track: track,
      identityId: identityId,
    })
      .then(function (url) {
        if (_this._isMounted) {
          _this.setState({
            src: url,
          });
        }
      })
      .catch(function (err) {
        return logger.debug(err);
      });
  };
  S3Image.prototype.load = function () {
    var _a = this.props,
      imgKey = _a.imgKey,
      path = _a.path,
      body = _a.body,
      contentType = _a.contentType,
      level = _a.level,
      track = _a.track,
      identityId = _a.identityId;
    if (!imgKey && !path) {
      logger.debug('empty imgKey and path');
      return;
    }
    var that = this;
    var key = imgKey || path;
    logger.debug('loading ' + key + '...');
    if (body) {
      var type = contentType || 'binary/octet-stream';
      if (!storage_1.Storage || typeof storage_1.Storage.put !== 'function') {
        throw new Error(
          'No Storage module found, please ensure @aws-amplify/storage is imported'
        );
      }
      var ret = storage_1.Storage.put(key, body, {
        contentType: type,
        level: level ? level : 'public',
        track: track,
      });
      ret
        .then(function (data) {
          logger.debug(data);
          that.getImageSource(key, level, track, identityId);
        })
        .catch(function (err) {
          return logger.debug(err);
        });
    } else {
      that.getImageSource(key, level, track, identityId);
    }
  };
  S3Image.prototype.handleOnLoad = function (evt) {
    var onLoad = this.props.onLoad;
    if (onLoad) {
      onLoad(this.state.src);
    }
  };
  S3Image.prototype.handleOnError = function (evt) {
    var onError = this.props.onError;
    if (onError) {
      onError(this.state.src);
    }
  };
  S3Image.prototype.handlePick = function (data) {
    var that = this;
    var _a = this.props,
      imgKey = _a.imgKey,
      level = _a.level,
      fileToKey = _a.fileToKey,
      track = _a.track,
      identityId = _a.identityId,
      _b = _a.path,
      path = _b === void 0 ? '' : _b,
      onUploadSuccess = _a.onUploadSuccess;
    var file = data.file,
      type = data.type;
    var key = imgKey || path + Common_1.calcKey(data, fileToKey);
    if (!storage_1.Storage || typeof storage_1.Storage.put !== 'function') {
      throw new Error(
        'No Storage module found, please ensure @aws-amplify/storage is imported'
      );
    }
    storage_1.Storage.put(key, file, {
      level: level ? level : 'public',
      contentType: type,
      track: track,
    })
      .then(function (data) {
        logger.debug('handle pick data', data);
        that.getImageSource(key, level, track, identityId);
        if (onUploadSuccess) onUploadSuccess();
      })
      .catch(function (err) {
        return logger.debug('handle pick error', err);
      });
  };
  S3Image.prototype.handleClick = function (evt) {
    var onClick = this.props.onClick;
    if (onClick) {
      onClick(evt);
    }
  };
  S3Image.prototype.componentDidMount = function () {
    this._isMounted = true;
    this.load();
  };
  S3Image.prototype.componentWillUnmount = function () {
    this._isMounted = false;
  };
  S3Image.prototype.componentDidUpdate = function (prevProps) {
    var update =
      prevProps.path !== this.props.path ||
      prevProps.imgKey !== this.props.imgKey ||
      prevProps.body !== this.props.body ||
      prevProps.level !== this.props.level;
    if (update) {
      this.load();
    }
  };
  S3Image.prototype.imageEl = function (src, theme) {
    if (!src) {
      return null;
    }
    var _a = this.props,
      className = _a.className,
      selected = _a.selected;
    var containerStyle = { position: 'relative' };
    return React.createElement(
      'div',
      { style: containerStyle, onClick: this.handleClick },
      React.createElement('img', {
        className: className,
        style: theme.photoImg,
        src: src,
        onLoad: this.handleOnLoad,
        onError: this.handleOnError,
      }),
      React.createElement('div', {
        style: selected ? theme.overlaySelected : theme.overlay,
      })
    );
  };
  S3Image.prototype.render = function () {
    var _a = this.props,
      hidden = _a.hidden,
      style = _a.style,
      picker = _a.picker,
      translate = _a.translate,
      imgKey = _a.imgKey;
    var src = this.state.src;
    if (translate) {
      src =
        typeof translate === 'string'
          ? translate
          : translate({
              type: 'image',
              key: imgKey,
              content: src,
            });
    }
    if (!src && !picker) {
      return null;
    }
    var theme = this.props.theme || AmplifyTheme_1.default;
    var photoStyle = hidden
      ? AmplifyTheme_1.default.hidden
      : Object.assign({}, theme.photo, style);
    return React.createElement(
      'div',
      { style: photoStyle },
      photoStyle ? this.imageEl(src, theme) : null,
      picker
        ? React.createElement(
            'div',
            null,
            React.createElement(PhotoPicker_1.PhotoPicker, {
              key: 'picker',
              onPick: this.handlePick,
              theme: theme,
            })
          )
        : null
    );
  };
  return S3Image;
})(React.Component);
exports.S3Image = S3Image;
/**
 * @deprecated use named import
 */
exports.default = S3Image;
//# sourceMappingURL=S3Image.js.map
