'use strict';
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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.IconQrCode = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconQrCode = function (props) {
  var size = props.size,
    _a = props.fill,
    fill = _a === void 0 ? 'currentColor' : _a,
    ariaLabel = props.ariaLabel,
    rest = __rest(props, ['size', 'fill', 'ariaLabel']);
  return jsx_runtime_1.jsxs(
    'svg',
    __assign(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        'enable-background': 'new 0 0 20 20',
        height: '20',
        viewBox: '0 0 20 20',
        width: '20',
      },
      {
        children: [
          jsx_runtime_1.jsx(
            'g',
            {
              children: jsx_runtime_1.jsx(
                'rect',
                { fill: 'none', height: '20', width: '20' },
                void 0
              ),
            },
            void 0
          ),
          jsx_runtime_1.jsx(
            'g',
            {
              children: jsx_runtime_1.jsxs(
                'g',
                {
                  children: [
                    jsx_runtime_1.jsx(
                      'path',
                      { d: 'M4,9h5V4H4V9z M4.94,4.94h3.12v3.12H4.94V4.94z' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M4,16h5v-5H4V16z M4.94,11.94h3.12v3.12H4.94V11.94z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M11,4v5h5V4H11z M15.06,8.06h-3.12V4.94h3.12V8.06z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '1', width: '1', x: '15', y: '15' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '1', width: '1', x: '15', y: '13' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '1', width: '1', x: '15', y: '11' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '1', width: '1', x: '12', y: '12' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '1', width: '1', x: '11', y: '11' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '1', width: '1', x: '13', y: '13' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '1', width: '1', x: '14', y: '14' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '1', width: '1', x: '13', y: '11' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '1', width: '1', x: '14', y: '12' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '1', width: '1', x: '11', y: '13' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '1', width: '1', x: '12', y: '14' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '1', width: '1', x: '11', y: '15' },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'rect',
                      { height: '1', width: '1', x: '13', y: '15' },
                      void 0
                    ),
                  ],
                },
                void 0
              ),
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconQrCode = IconQrCode;
//# sourceMappingURL=IconQrCode.js.map
