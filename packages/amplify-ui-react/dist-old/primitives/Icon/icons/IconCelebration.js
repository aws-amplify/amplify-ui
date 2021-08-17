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
exports.IconCelebration = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var IconCelebration = function (props) {
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
                          'polygon',
                          {
                            'fill-rule': 'evenodd',
                            points: '6.88,6.76 3,17 13.25,13.11',
                          },
                          void 0
                        ),
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M9.36,3.56L8.66,4.27l0.35,0.35c0.39,0.39,0.39,1.02,0,1.41L8.3,6.75l0.71,0.71 l0.71-0.71c0.78-0.78,0.78-2.05,0-2.83L9.36,3.56z',
                        'fill-rule': 'evenodd',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M17.85,6.39l0.71-0.71L18.2,5.33c-0.78-0.78-2.05-0.78-2.83,0l-4.24,4.24 l0.71,0.71l4.24-4.24c0.39-0.39,1.02-0.39,1.41,0L17.85,6.39z',
                        'fill-rule': 'evenodd',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M17.5,10.28l-0.71-0.71c-0.78-0.78-2.05-0.78-2.83,0l-1.41,1.41l0.71,0.71 l1.41-1.41c0.39-0.39,1.02-0.39,1.41,0l0.71,0.71L17.5,10.28z',
                        'fill-rule': 'evenodd',
                      },
                      void 0
                    ),
                    jsx_runtime_1.jsx(
                      'path',
                      {
                        d: 'M12.19,2.15l-0.71,0.71l1.06,1.06c0.39,0.39,0.39,1.02,0,1.41L9.72,8.16 l0.71,0.71l2.83-2.83c0.78-0.78,0.78-2.05,0-2.83L12.19,2.15z',
                        'fill-rule': 'evenodd',
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
exports.IconCelebration = IconCelebration;
//# sourceMappingURL=IconCelebration.js.map
