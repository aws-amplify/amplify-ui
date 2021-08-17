(window.webpackJsonp = window.webpackJsonp || []).push([
  [106],
  {
    1890: function (module, exports) {
      module.exports = function (hljs) {
        return {
          subLanguage: 'xml',
          contains: [
            { className: 'meta', begin: '^__(END|DATA)__$' },
            { begin: '^\\s*%{1,2}={0,2}', end: '$', subLanguage: 'perl' },
            {
              begin: '<%{1,2}={0,2}',
              end: '={0,1}%>',
              subLanguage: 'perl',
              excludeBegin: !0,
              excludeEnd: !0,
            },
          ],
        };
      };
    },
  },
]);
//# sourceMappingURL=react-syntax-highlighter_languages_highlight_mojolicious.43062421b39d2bb010e4.bundle.js.map
