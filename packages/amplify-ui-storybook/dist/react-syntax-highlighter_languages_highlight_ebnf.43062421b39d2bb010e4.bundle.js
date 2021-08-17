(window.webpackJsonp = window.webpackJsonp || []).push([
  [51],
  {
    1831: function (module, exports) {
      module.exports = function (hljs) {
        var commentMode = hljs.COMMENT(/\(\*/, /\*\)/);
        return {
          illegal: /\S/,
          contains: [
            commentMode,
            {
              className: 'attribute',
              begin: /^[ ]*[a-zA-Z][a-zA-Z-_]*([\s-_]+[a-zA-Z][a-zA-Z]*)*/,
            },
            {
              begin: /=/,
              end: /[.;]/,
              contains: [
                commentMode,
                { className: 'meta', begin: /\?.*\?/ },
                {
                  className: 'string',
                  variants: [
                    hljs.APOS_STRING_MODE,
                    hljs.QUOTE_STRING_MODE,
                    { begin: '`', end: '`' },
                  ],
                },
              ],
            },
          ],
        };
      };
    },
  },
]);
//# sourceMappingURL=react-syntax-highlighter_languages_highlight_ebnf.43062421b39d2bb010e4.bundle.js.map
