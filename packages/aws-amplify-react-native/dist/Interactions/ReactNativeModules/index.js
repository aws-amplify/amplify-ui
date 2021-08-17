'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _reactNativeVoice = _interopRequireDefault(require('react-native-voice'));

var _reactNativeSound = _interopRequireDefault(require('react-native-sound'));

var _reactNativeFs = _interopRequireDefault(require('react-native-fs'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var VoiceExports = {
  Voice: _reactNativeVoice['default'],
  Sound: _reactNativeSound['default'],
  RNFS: _reactNativeFs['default'],
};
var _default = VoiceExports;
exports['default'] = _default;
