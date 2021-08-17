(window.webpackJsonp = window.webpackJsonp || []).push([
  [50],
  {
    1830: function (module, exports) {
      module.exports = function (hljs) {
        return {
          aliases: ['dst'],
          case_insensitive: !0,
          subLanguage: 'xml',
          contains: [
            {
              className: 'template-tag',
              begin: /\{[#\/]/,
              end: /\}/,
              illegal: /;/,
              contains: [
                {
                  className: 'name',
                  begin: /[a-zA-Z\.-]+/,
                  starts: {
                    endsWithParent: !0,
                    relevance: 0,
                    contains: [hljs.QUOTE_STRING_MODE],
                  },
                },
              ],
            },
            {
              className: 'template-variable',
              begin: /\{/,
              end: /\}/,
              illegal: /;/,
              keywords: 'if eq ne lt lte gt gte select default math sep',
            },
          ],
        };
      };
    },
  },
]);
//# sourceMappingURL=react-syntax-highlighter_languages_highlight_dust.43062421b39d2bb010e4.bundle.js.map
