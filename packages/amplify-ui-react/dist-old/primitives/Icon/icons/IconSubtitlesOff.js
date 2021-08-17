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
exports.IconSubtitlesOff = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconSubtitlesOff = function (props) {
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
              children: jsx_runtime_1.jsx(
                'g',
                {
                  children: jsx_runtime_1.jsxs(
                    'g',
                    {
                      children: [
                        jsx_runtime_1.jsx(
                          'path',
                          {
                            d: 'M16,12v1h-1.59l2.46,2.46C16.95,15.32,17,15.17,17,15V5c0-0.55-0.45-1-1-1H5.41l8,8H16z',
                          },
                          void 0
                        ),
                        jsx_runtime_1.jsx(
                          'path',
                          {
                            d: 'M2.93,2.93L2.22,3.64l0.9,0.9C3.05,4.68,3,4.83,3,5v10c0,0.55,0.45,1,1,1h10.59l1.78,1.78l0.71-0.71L2.93,2.93z M8,12 h2.59l1,1H8V12z M4,12h3v1H4V12z M12,15H4v-1h8V15z',
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
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.IconSubtitlesOff = IconSubtitlesOff;
//# sourceMappingURL=IconSubtitlesOff.js.map
