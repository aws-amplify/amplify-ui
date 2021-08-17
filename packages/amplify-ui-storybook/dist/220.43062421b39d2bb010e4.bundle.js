/*! For license information please see 220.43062421b39d2bb010e4.bundle.js.LICENSE.txt */
(window.webpackJsonp = window.webpackJsonp || []).push([
  [220],
  {
    1706: function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'scopeCss', function () {
          return scopeCss;
        });
      var __spreadArrays = function () {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          var r = Array(s),
            k = 0;
          for (i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        },
        _parenSuffix = ')(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)',
        _cssColonHostRe = new RegExp('(-shadowcsshost' + _parenSuffix, 'gim'),
        _cssColonHostContextRe = new RegExp(
          '(-shadowcsscontext' + _parenSuffix,
          'gim'
        ),
        _cssColonSlottedRe = new RegExp(
          '(-shadowcssslotted' + _parenSuffix,
          'gim'
        ),
        _polyfillHostNoCombinatorRe = /-shadowcsshost-no-combinator([^\s]*)/,
        _shadowDOMSelectorsRe = [/::shadow/g, /::content/g],
        _polyfillHostRe = /-shadowcsshost/gim,
        _colonHostRe = /:host/gim,
        _colonSlottedRe = /::slotted/gim,
        _colonHostContextRe = /:host-context/gim,
        _commentRe = /\/\*\s*[\s\S]*?\*\//g,
        _commentWithHashRe = /\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g,
        _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g,
        _curlyRe = /([{}])/g,
        processRules = function (input, ruleCallback) {
          var inputWithEscapedBlocks = escapeBlocks(input),
            nextBlockIndex = 0;
          return inputWithEscapedBlocks.escapedString.replace(
            _ruleRe,
            function () {
              for (var m = [], _i = 0; _i < arguments.length; _i++)
                m[_i] = arguments[_i];
              var selector = m[2],
                content = '',
                suffix = m[4],
                contentPrefix = '';
              suffix &&
                suffix.startsWith('{%BLOCK%') &&
                ((content = inputWithEscapedBlocks.blocks[nextBlockIndex++]),
                (suffix = suffix.substring('%BLOCK%'.length + 1)),
                (contentPrefix = '{'));
              var cssRule = { selector: selector, content: content },
                rule = ruleCallback(cssRule);
              return (
                '' +
                m[1] +
                rule.selector +
                m[3] +
                contentPrefix +
                rule.content +
                suffix
              );
            }
          );
        },
        escapeBlocks = function (input) {
          for (
            var inputParts = input.split(_curlyRe),
              resultParts = [],
              escapedBlocks = [],
              bracketCount = 0,
              currentBlockParts = [],
              partIndex = 0;
            partIndex < inputParts.length;
            partIndex++
          ) {
            var part = inputParts[partIndex];
            '}' === part && bracketCount--,
              bracketCount > 0
                ? currentBlockParts.push(part)
                : (currentBlockParts.length > 0 &&
                    (escapedBlocks.push(currentBlockParts.join('')),
                    resultParts.push('%BLOCK%'),
                    (currentBlockParts = [])),
                  resultParts.push(part)),
              '{' === part && bracketCount++;
          }
          return (
            currentBlockParts.length > 0 &&
              (escapedBlocks.push(currentBlockParts.join('')),
              resultParts.push('%BLOCK%')),
            { escapedString: resultParts.join(''), blocks: escapedBlocks }
          );
        },
        convertColonRule = function (cssText, regExp, partReplacer) {
          return cssText.replace(regExp, function () {
            for (var m = [], _i = 0; _i < arguments.length; _i++)
              m[_i] = arguments[_i];
            if (m[2]) {
              for (
                var parts = m[2].split(','), r = [], i = 0;
                i < parts.length;
                i++
              ) {
                var p = parts[i].trim();
                if (!p) break;
                r.push(partReplacer('-shadowcsshost-no-combinator', p, m[3]));
              }
              return r.join(',');
            }
            return '-shadowcsshost-no-combinator' + m[3];
          });
        },
        colonHostPartReplacer = function (host, part, suffix) {
          return host + part.replace('-shadowcsshost', '') + suffix;
        },
        colonHostContextPartReplacer = function (host, part, suffix) {
          return part.indexOf('-shadowcsshost') > -1
            ? colonHostPartReplacer(host, part, suffix)
            : host + part + suffix + ', ' + part + ' ' + host + suffix;
        },
        selectorNeedsScoping = function (selector, scopeSelector) {
          return !(function (scopeSelector) {
            return (
              (scopeSelector = scopeSelector
                .replace(/\[/g, '\\[')
                .replace(/\]/g, '\\]')),
              new RegExp(
                '^(' + scopeSelector + ')([>\\s~+[.,{:][\\s\\S]*)?$',
                'm'
              )
            );
          })(scopeSelector).test(selector);
        },
        applyStrictSelectorScope = function (
          selector,
          scopeSelector,
          hostSelector
        ) {
          for (
            var res,
              className =
                '.' +
                (scopeSelector = scopeSelector.replace(
                  /\[is=([^\]]*)\]/g,
                  function (_) {
                    for (var parts = [], _i = 1; _i < arguments.length; _i++)
                      parts[_i - 1] = arguments[_i];
                    return parts[0];
                  }
                )),
              _scopeSelectorPart = function (p) {
                var scopedP = p.trim();
                if (!scopedP) return '';
                if (p.indexOf('-shadowcsshost-no-combinator') > -1)
                  scopedP = (function (selector, scopeSelector, hostSelector) {
                    if (
                      ((_polyfillHostRe.lastIndex = 0),
                      _polyfillHostRe.test(selector))
                    ) {
                      var replaceBy_1 = '.' + hostSelector;
                      return selector
                        .replace(
                          _polyfillHostNoCombinatorRe,
                          function (_, selector) {
                            return selector.replace(
                              /([^:]*)(:*)(.*)/,
                              function (_, before, colon, after) {
                                return before + replaceBy_1 + colon + after;
                              }
                            );
                          }
                        )
                        .replace(_polyfillHostRe, replaceBy_1 + ' ');
                    }
                    return scopeSelector + ' ' + selector;
                  })(p, scopeSelector, hostSelector);
                else {
                  var t = p.replace(_polyfillHostRe, '');
                  if (t.length > 0) {
                    var matches = t.match(/([^:]*)(:*)(.*)/);
                    matches &&
                      (scopedP =
                        matches[1] + className + matches[2] + matches[3]);
                  }
                }
                return scopedP;
              },
              safeContent = (function (selector) {
                var placeholders = [],
                  index = 0;
                return {
                  content: (selector = selector.replace(
                    /(\[[^\]]*\])/g,
                    function (_, keep) {
                      var replaceBy = '__ph-' + index + '__';
                      return placeholders.push(keep), index++, replaceBy;
                    }
                  )).replace(
                    /(:nth-[-\w]+)(\([^)]+\))/g,
                    function (_, pseudo, exp) {
                      var replaceBy = '__ph-' + index + '__';
                      return (
                        placeholders.push(exp), index++, pseudo + replaceBy
                      );
                    }
                  ),
                  placeholders: placeholders,
                };
              })(selector),
              scopedSelector = '',
              startIndex = 0,
              sep = /( |>|\+|~(?!=))\s*/g,
              shouldScope = !(
                (selector = safeContent.content).indexOf(
                  '-shadowcsshost-no-combinator'
                ) > -1
              );
            null !== (res = sep.exec(selector));

          ) {
            var separator = res[1],
              part_1 = selector.slice(startIndex, res.index).trim();
            (scopedSelector +=
              ((shouldScope =
                shouldScope ||
                part_1.indexOf('-shadowcsshost-no-combinator') > -1)
                ? _scopeSelectorPart(part_1)
                : part_1) +
              ' ' +
              separator +
              ' '),
              (startIndex = sep.lastIndex);
          }
          var placeholders,
            part = selector.substring(startIndex);
          return (
            (scopedSelector += (shouldScope =
              shouldScope || part.indexOf('-shadowcsshost-no-combinator') > -1)
              ? _scopeSelectorPart(part)
              : part),
            (placeholders = safeContent.placeholders),
            scopedSelector.replace(/__ph-(\d+)__/g, function (_, index) {
              return placeholders[+index];
            })
          );
        },
        scopeSelectors = function (
          cssText,
          scopeSelectorText,
          hostSelector,
          slotSelector,
          commentOriginalSelector
        ) {
          return processRules(cssText, function (rule) {
            var selector = rule.selector,
              content = rule.content;
            return (
              '@' !== rule.selector[0]
                ? (selector = (function (
                    selector,
                    scopeSelectorText,
                    hostSelector,
                    slotSelector
                  ) {
                    return selector
                      .split(',')
                      .map(function (shallowPart) {
                        return slotSelector &&
                          shallowPart.indexOf('.' + slotSelector) > -1
                          ? shallowPart.trim()
                          : selectorNeedsScoping(shallowPart, scopeSelectorText)
                          ? applyStrictSelectorScope(
                              shallowPart,
                              scopeSelectorText,
                              hostSelector
                            ).trim()
                          : shallowPart.trim();
                      })
                      .join(', ');
                  })(
                    rule.selector,
                    scopeSelectorText,
                    hostSelector,
                    slotSelector
                  ))
                : (rule.selector.startsWith('@media') ||
                    rule.selector.startsWith('@supports') ||
                    rule.selector.startsWith('@page') ||
                    rule.selector.startsWith('@document')) &&
                  (content = scopeSelectors(
                    rule.content,
                    scopeSelectorText,
                    hostSelector,
                    slotSelector
                  )),
              {
                selector: selector.replace(/\s{2,}/g, ' ').trim(),
                content: content,
              }
            );
          });
        },
        scopeCssText = function (
          cssText,
          scopeId,
          hostScopeId,
          slotScopeId,
          commentOriginalSelector
        ) {
          var slotted = (function (cssText, slotScopeId) {
            var slotClass = '.' + slotScopeId + ' > ',
              selectors = [];
            return (
              (cssText = cssText.replace(_cssColonSlottedRe, function () {
                for (var m = [], _i = 0; _i < arguments.length; _i++)
                  m[_i] = arguments[_i];
                if (m[2]) {
                  for (
                    var compound = m[2].trim(),
                      suffix = m[3],
                      slottedSelector = slotClass + compound + suffix,
                      prefixSelector = '',
                      i = m[4] - 1;
                    i >= 0;
                    i--
                  ) {
                    var char = m[5][i];
                    if ('}' === char || ',' === char) break;
                    prefixSelector = char + prefixSelector;
                  }
                  var orgSelector = prefixSelector + slottedSelector,
                    addedSelector =
                      '' + prefixSelector.trimRight() + slottedSelector.trim();
                  if (orgSelector.trim() !== addedSelector.trim()) {
                    var updatedSelector = addedSelector + ', ' + orgSelector;
                    selectors.push({
                      orgSelector: orgSelector,
                      updatedSelector: updatedSelector,
                    });
                  }
                  return slottedSelector;
                }
                return '-shadowcsshost-no-combinator' + m[3];
              })),
              { selectors: selectors, cssText: cssText }
            );
          })(
            (cssText = (function (cssText) {
              return convertColonRule(
                cssText,
                _cssColonHostContextRe,
                colonHostContextPartReplacer
              );
            })(
              (cssText = (function (cssText) {
                return convertColonRule(
                  cssText,
                  _cssColonHostRe,
                  colonHostPartReplacer
                );
              })(
                (cssText = cssText
                  .replace(_colonHostContextRe, '-shadowcsscontext')
                  .replace(_colonHostRe, '-shadowcsshost')
                  .replace(_colonSlottedRe, '-shadowcssslotted'))
              ))
            )),
            slotScopeId
          );
          return (
            (cssText = (function (cssText) {
              return _shadowDOMSelectorsRe.reduce(function (result, pattern) {
                return result.replace(pattern, ' ');
              }, cssText);
            })((cssText = slotted.cssText))),
            scopeId &&
              (cssText = scopeSelectors(
                cssText,
                scopeId,
                hostScopeId,
                slotScopeId
              )),
            {
              cssText: (cssText = (cssText = cssText.replace(
                /-shadowcsshost-no-combinator/g,
                '.' + hostScopeId
              )).replace(/>\s*\*\s+([^{, ]+)/gm, ' $1 ')).trim(),
              slottedSelectors: slotted.selectors,
            }
          );
        },
        scopeCss = function (cssText, scopeId, commentOriginalSelector) {
          var hostScopeId = scopeId + '-h',
            slotScopeId = scopeId + '-s',
            commentsWithHash = cssText.match(_commentWithHashRe) || [];
          cssText = (function (input) {
            return input.replace(_commentRe, '');
          })(cssText);
          var orgSelectors = [];
          if (commentOriginalSelector) {
            var processCommentedSelector_1 = function (rule) {
              var placeholder = '/*!@___' + orgSelectors.length + '___*/',
                comment = '/*!@' + rule.selector + '*/';
              return (
                orgSelectors.push({
                  placeholder: placeholder,
                  comment: comment,
                }),
                (rule.selector = placeholder + rule.selector),
                rule
              );
            };
            cssText = processRules(cssText, function (rule) {
              return '@' !== rule.selector[0]
                ? processCommentedSelector_1(rule)
                : rule.selector.startsWith('@media') ||
                  rule.selector.startsWith('@supports') ||
                  rule.selector.startsWith('@page') ||
                  rule.selector.startsWith('@document')
                ? ((rule.content = processRules(
                    rule.content,
                    processCommentedSelector_1
                  )),
                  rule)
                : rule;
            });
          }
          var scoped = scopeCssText(cssText, scopeId, hostScopeId, slotScopeId);
          return (
            (cssText = __spreadArrays([scoped.cssText], commentsWithHash).join(
              '\n'
            )),
            commentOriginalSelector &&
              orgSelectors.forEach(function (_a) {
                var placeholder = _a.placeholder,
                  comment = _a.comment;
                cssText = cssText.replace(placeholder, comment);
              }),
            scoped.slottedSelectors.forEach(function (slottedSelector) {
              cssText = cssText.replace(
                slottedSelector.orgSelector,
                slottedSelector.updatedSelector
              );
            }),
            cssText
          );
        };
    },
  },
]);
//# sourceMappingURL=220.43062421b39d2bb010e4.bundle.js.map
