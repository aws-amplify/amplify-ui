(window.webpackJsonp = window.webpackJsonp || []).push([
  [43],
  {
    1823: function (module, exports) {
      module.exports = function (hljs) {
        return {
          aliases: ['patch'],
          contains: [
            {
              className: 'meta',
              relevance: 10,
              variants: [
                { begin: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/ },
                { begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ },
                { begin: /^\-\-\- +\d+,\d+ +\-\-\-\-$/ },
              ],
            },
            {
              className: 'comment',
              variants: [
                { begin: /Index: /, end: /$/ },
                { begin: /={3,}/, end: /$/ },
                { begin: /^\-{3}/, end: /$/ },
                { begin: /^\*{3} /, end: /$/ },
                { begin: /^\+{3}/, end: /$/ },
                { begin: /^\*{15}$/ },
              ],
            },
            { className: 'addition', begin: '^\\+', end: '$' },
            { className: 'deletion', begin: '^\\-', end: '$' },
            { className: 'addition', begin: '^\\!', end: '$' },
          ],
        };
      };
    },
  },
]);
//# sourceMappingURL=react-syntax-highlighter_languages_highlight_diff.43062421b39d2bb010e4.bundle.js.map
