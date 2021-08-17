(window.webpackJsonp = window.webpackJsonp || []).push([
  [54],
  {
    1834: function (module, exports) {
      module.exports = function (hljs) {
        return {
          subLanguage: 'xml',
          contains: [
            hljs.COMMENT('<%#', '%>'),
            {
              begin: '<%[%=-]?',
              end: '[%-]?%>',
              subLanguage: 'ruby',
              excludeBegin: !0,
              excludeEnd: !0,
            },
          ],
        };
      };
    },
  },
]);
//# sourceMappingURL=react-syntax-highlighter_languages_highlight_erb.43062421b39d2bb010e4.bundle.js.map
