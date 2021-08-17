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
exports.IconFlaky = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconFlaky = function (props) {
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
                      'g',
                      {
                        children: jsx_runtime_1.jsx(
                          'path',
                          {
                            d: 'M10,3c-3.87,0-7,3.13-7,7c0,3.87,3.13,7,7,7s7-3.13,7-7C17,6.13,13.87,3,10,3z M6,6.71L6.71,6l1.06,1.06L8.83,6l0.71,0.71L8.47,7.77l1.06,1.06L8.83,9.54L7.77,8.47L6.71,9.54L6,8.83l1.06-1.06L6,6.71z M10,16 c-1.65,0-3.15-0.67-4.24-1.76l8.48-8.48C15.33,6.85,16,8.35,16,10C16,13.31,13.31,16,10,16z',
                            'fill-rule': 'evenodd',
                          },
                          void 0
                        ),
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'g',
                      {
                        children: jsx_runtime_1.jsx(
                          'polygon',
                          {
                            'fill-rule': 'evenodd',
                            points:
                              '11.41,12.59 10.41,11.59 9.71,12.29 11.41,14 14.21,11.21 13.5,10.5',
                          },
                          void 0
                        ),
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
exports.IconFlaky = IconFlaky;
//# sourceMappingURL=IconFlaky.js.map
