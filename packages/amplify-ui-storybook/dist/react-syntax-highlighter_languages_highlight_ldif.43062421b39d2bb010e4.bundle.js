(window.webpackJsonp = window.webpackJsonp || []).push([
  [90],
  {
    1872: function (module, exports) {
      module.exports = function (hljs) {
        return {
          contains: [
            {
              className: 'attribute',
              begin: '^dn',
              end: ': ',
              excludeEnd: !0,
              starts: { end: '$', relevance: 0 },
              relevance: 10,
            },
            {
              className: 'attribute',
              begin: '^\\w',
              end: ': ',
              excludeEnd: !0,
              starts: { end: '$', relevance: 0 },
            },
            { className: 'literal', begin: '^-', end: '$' },
            hljs.HASH_COMMENT_MODE,
          ],
        };
      };
    },
  },
]);
//# sourceMappingURL=react-syntax-highlighter_languages_highlight_ldif.43062421b39d2bb010e4.bundle.js.map
