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
exports.PaginationItem = void 0;
var jsx_runtime_1 = require('react/jsx-runtime');
var react_1 = require('react');
var Button_1 = require('../Button');
var Flex_1 = require('../Flex');
var Text_1 = require('../Text');
var View_1 = require('../View');
var Icon_1 = require('../Icon');
var PaginationItem = function (props) {
  var type = props.type,
    page = props.page,
    currentPage = props.currentPage,
    isDisabled = props.isDisabled,
    onClick = props.onClick,
    ariaLabel = props.ariaLabel,
    rest = __rest(props, [
      'type',
      'page',
      'currentPage',
      'isDisabled',
      'onClick',
      'ariaLabel',
    ]);
  switch (type) {
    case 'page':
      var onChange = react_1.useCallback(
        function () {
          onClick(page, currentPage);
        },
        [page, currentPage, onClick]
      );
      return jsx_runtime_1.jsx(
        View_1.View,
        __assign(
          { as: 'li' },
          {
            children:
              page === currentPage
                ? jsx_runtime_1.jsxs(
                    Flex_1.Flex,
                    __assign(
                      {
                        as: 'span',
                        className: 'current',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      rest,
                      {
                        children: [
                          jsx_runtime_1.jsx(
                            Text_1.Text,
                            __assign(
                              { as: 'span', className: 'visuallyhidden' },
                              { children: 'Current Page:' }
                            ),
                            void 0
                          ),
                          page,
                        ],
                      }
                    ),
                    void 0
                  )
                : jsx_runtime_1.jsx(
                    Button_1.Button,
                    __assign(
                      {
                        size: 'small',
                        variation: 'link',
                        onClick: onChange,
                        ariaLabel: ariaLabel,
                      },
                      rest,
                      { children: page }
                    ),
                    void 0
                  ),
          }
        ),
        void 0
      );
    case 'next':
      var onNext = react_1.useCallback(
        function () {
          onClick();
        },
        [onClick]
      );
      return jsx_runtime_1.jsx(
        View_1.View,
        __assign(
          { as: 'li' },
          {
            children: jsx_runtime_1.jsx(
              Button_1.Button,
              __assign(
                {
                  size: 'small',
                  variation: 'link',
                  isDisabled: isDisabled,
                  onClick: onNext,
                  ariaLabel: ariaLabel,
                },
                rest,
                {
                  children: jsx_runtime_1.jsx(
                    Icon_1.IconChevronRight,
                    { size: 'large' },
                    void 0
                  ),
                }
              ),
              void 0
            ),
          }
        ),
        void 0
      );
    case 'previous':
      var onPrevious = react_1.useCallback(
        function () {
          onClick();
        },
        [onClick]
      );
      return jsx_runtime_1.jsx(
        View_1.View,
        __assign(
          { as: 'li' },
          {
            children: jsx_runtime_1.jsx(
              Button_1.Button,
              __assign(
                {
                  size: 'small',
                  variation: 'link',
                  isDisabled: isDisabled,
                  onClick: onPrevious,
                  ariaLabel: ariaLabel,
                },
                rest,
                {
                  children: jsx_runtime_1.jsx(
                    Icon_1.IconChevronLeft,
                    { size: 'large' },
                    void 0
                  ),
                }
              ),
              void 0
            ),
          }
        ),
        void 0
      );
    case 'ellipsis':
      return jsx_runtime_1.jsx(
        View_1.View,
        __assign(
          { as: 'li' },
          {
            children: jsx_runtime_1.jsx(
              Flex_1.Flex,
              __assign(
                {
                  as: 'span',
                  className: 'ellipsis',
                  testId: 'ellipsis',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                },
                rest,
                { children: '\u2026' }
              ),
              void 0
            ),
          }
        ),
        void 0
      );
    default:
    // No match type found
  }
  return jsx_runtime_1.jsx(View_1.View, { as: 'li' }, void 0);
};
exports.PaginationItem = PaginationItem;
//# sourceMappingURL=PaginationItem.js.map
