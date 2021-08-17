'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _ChatBot = require('./ChatBot');

Object.keys(_ChatBot).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;
  if (key in exports && exports[key] === _ChatBot[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ChatBot[key];
    },
  });
});
