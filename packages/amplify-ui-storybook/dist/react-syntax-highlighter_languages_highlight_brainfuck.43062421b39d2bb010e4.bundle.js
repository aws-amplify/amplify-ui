(window.webpackJsonp = window.webpackJsonp || []).push([
  [23],
  {
    1803: function (module, exports) {
      module.exports = function (hljs) {
        var LITERAL = { className: 'literal', begin: '[\\+\\-]', relevance: 0 };
        return {
          aliases: ['bf'],
          contains: [
            hljs.COMMENT(
              '[^\\[\\]\\.,\\+\\-<> \r\n]',
              '[\\[\\]\\.,\\+\\-<> \r\n]',
              { returnEnd: !0, relevance: 0 }
            ),
            { className: 'title', begin: '[\\[\\]]', relevance: 0 },
            { className: 'string', begin: '[\\.,]', relevance: 0 },
            { begin: /(?:\+\+|\-\-)/, contains: [LITERAL] },
            LITERAL,
          ],
        };
      };
    },
  },
]);
//# sourceMappingURL=react-syntax-highlighter_languages_highlight_brainfuck.43062421b39d2bb010e4.bundle.js.map
