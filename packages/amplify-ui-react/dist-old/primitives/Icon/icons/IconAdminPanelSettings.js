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
exports.IconAdminPanelSettings = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconAdminPanelSettings = function (props) {
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
                      {
                        d: 'M13,9c0.35,0,0.68,0.06,1,0.14V6.18L9,4L4,6.18v3.27c0,3.03,2.13,5.86,5,6.55c0.35-0.08,0.7-0.2,1.02-0.35 C9.39,14.94,9,14.02,9,13C9,10.79,10.79,9,13,9z',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M13,10c-1.66,0-3,1.34-3,3c0,1.66,1.34,3,3,3s3-1.34,3-3C16,11.34,14.66,10,13,10z M13,11.03c0.47,0,0.84,0.38,0.84,0.84 c0,0.46-0.38,0.84-0.84,0.84s-0.84-0.38-0.84-0.84C12.16,11.41,12.53,11.03,13,11.03z M13,15.06c-0.7,0-1.31-0.35-1.68-0.87 c0.04-0.54,1.13-0.81,1.68-0.81s1.64,0.27,1.68,0.81C14.31,14.72,13.7,15.06,13,15.06z',
                      },
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
exports.IconAdminPanelSettings = IconAdminPanelSettings;
//# sourceMappingURL=IconAdminPanelSettings.js.map
