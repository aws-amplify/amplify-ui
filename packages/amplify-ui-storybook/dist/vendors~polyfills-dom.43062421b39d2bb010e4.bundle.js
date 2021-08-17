/*! For license information please see vendors~polyfills-dom.43062421b39d2bb010e4.bundle.js.LICENSE.txt */
(window.webpackJsonp = window.webpackJsonp || []).push([
  [185],
  {
    1967: function (module, exports) {
      var b, c, d, a, e;
      (function () {
        'use strict';
        var aa = new Set(
          'annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph'.split(
            ' '
          )
        );
        function g(a) {
          var b = aa.has(a);
          return (a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a)), !b && a;
        }
        function l(a) {
          var b = a.isConnected;
          if (void 0 !== b) return b;
          for (; a && !(a.__CE_isImportDocument || a instanceof Document); )
            a =
              a.parentNode ||
              (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
          return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
        }
        function n(a, b) {
          for (; b && b !== a && !b.nextSibling; ) b = b.parentNode;
          return b && b !== a ? b.nextSibling : null;
        }
        function p(a, b, d) {
          d = void 0 === d ? new Set() : d;
          for (var c = a; c; ) {
            if (c.nodeType === Node.ELEMENT_NODE) {
              var e = c;
              b(e);
              var f = e.localName;
              if ('link' === f && 'import' === e.getAttribute('rel')) {
                if ((c = e.import) instanceof Node && !d.has(c))
                  for (d.add(c), c = c.firstChild; c; c = c.nextSibling)
                    p(c, b, d);
                c = n(a, e);
                continue;
              }
              if ('template' === f) {
                c = n(a, e);
                continue;
              }
              if ((e = e.__CE_shadowRoot))
                for (e = e.firstChild; e; e = e.nextSibling) p(e, b, d);
            }
            c = c.firstChild ? c.firstChild : n(a, c);
          }
        }
        function r(a, b, d) {
          a[b] = d;
        }
        function u() {
          (this.a = new Map()),
            (this.g = new Map()),
            (this.c = []),
            (this.f = []),
            (this.b = !1);
        }
        function v(a, b) {
          a.b &&
            p(b, function (b) {
              return w(a, b);
            });
        }
        function w(a, b) {
          if (a.b && !b.__CE_patched) {
            b.__CE_patched = !0;
            for (var d = 0; d < a.c.length; d++) a.c[d](b);
            for (d = 0; d < a.f.length; d++) a.f[d](b);
          }
        }
        function x(a, b) {
          var d = [];
          for (
            p(b, function (b) {
              return d.push(b);
            }),
              b = 0;
            b < d.length;
            b++
          ) {
            var c = d[b];
            1 === c.__CE_state ? a.connectedCallback(c) : y(a, c);
          }
        }
        function z(a, b) {
          var d = [];
          for (
            p(b, function (b) {
              return d.push(b);
            }),
              b = 0;
            b < d.length;
            b++
          ) {
            var c = d[b];
            1 === c.__CE_state && a.disconnectedCallback(c);
          }
        }
        function A(a, b, d) {
          var c = (d = void 0 === d ? {} : d).u || new Set(),
            e =
              d.i ||
              function (b) {
                return y(a, b);
              },
            f = [];
          if (
            (p(
              b,
              function (b) {
                if (
                  'link' === b.localName &&
                  'import' === b.getAttribute('rel')
                ) {
                  var d = b.import;
                  d instanceof Node &&
                    ((d.__CE_isImportDocument = !0), (d.__CE_hasRegistry = !0)),
                    d && 'complete' === d.readyState
                      ? (d.__CE_documentLoadHandled = !0)
                      : b.addEventListener('load', function () {
                          var d = b.import;
                          if (!d.__CE_documentLoadHandled) {
                            d.__CE_documentLoadHandled = !0;
                            var f = new Set(c);
                            f.delete(d), A(a, d, { u: f, i: e });
                          }
                        });
                } else f.push(b);
              },
              c
            ),
            a.b)
          )
            for (b = 0; b < f.length; b++) w(a, f[b]);
          for (b = 0; b < f.length; b++) e(f[b]);
        }
        function y(a, b) {
          if (void 0 === b.__CE_state) {
            var d = b.ownerDocument;
            if (
              (d.defaultView ||
                (d.__CE_isImportDocument && d.__CE_hasRegistry)) &&
              (d = a.a.get(b.localName))
            ) {
              d.constructionStack.push(b);
              var c = d.constructorFunction;
              try {
                try {
                  if (new c() !== b)
                    throw Error(
                      'The custom element constructor did not produce the element being upgraded.'
                    );
                } finally {
                  d.constructionStack.pop();
                }
              } catch (t) {
                throw ((b.__CE_state = 2), t);
              }
              if (
                ((b.__CE_state = 1),
                (b.__CE_definition = d),
                d.attributeChangedCallback)
              )
                for (d = d.observedAttributes, c = 0; c < d.length; c++) {
                  var e = d[c],
                    f = b.getAttribute(e);
                  null !== f && a.attributeChangedCallback(b, e, null, f, null);
                }
              l(b) && a.connectedCallback(b);
            }
          }
        }
        function B(a) {
          var b = document;
          (this.c = a),
            (this.a = b),
            (this.b = void 0),
            A(this.c, this.a),
            'loading' === this.a.readyState &&
              ((this.b = new MutationObserver(this.f.bind(this))),
              this.b.observe(this.a, { childList: !0, subtree: !0 }));
        }
        function C(a) {
          a.b && a.b.disconnect();
        }
        function ea() {
          var a = this;
          (this.b = this.a = void 0),
            (this.c = new Promise(function (b) {
              (a.b = b), a.a && b(a.a);
            }));
        }
        function D(a) {
          if (a.a) throw Error('Already resolved.');
          (a.a = void 0), a.b && a.b(void 0);
        }
        function E(a) {
          (this.c = !1),
            (this.a = a),
            (this.j = new Map()),
            (this.f = function (b) {
              return b();
            }),
            (this.b = !1),
            (this.g = []),
            (this.o = new B(a));
        }
        (u.prototype.connectedCallback = function (a) {
          var b = a.__CE_definition;
          b.connectedCallback && b.connectedCallback.call(a);
        }),
          (u.prototype.disconnectedCallback = function (a) {
            var b = a.__CE_definition;
            b.disconnectedCallback && b.disconnectedCallback.call(a);
          }),
          (u.prototype.attributeChangedCallback = function (a, b, d, c, e) {
            var f = a.__CE_definition;
            f.attributeChangedCallback &&
              -1 < f.observedAttributes.indexOf(b) &&
              f.attributeChangedCallback.call(a, b, d, c, e);
          }),
          (B.prototype.f = function (a) {
            var b = this.a.readyState;
            for (
              ('interactive' !== b && 'complete' !== b) || C(this), b = 0;
              b < a.length;
              b++
            )
              for (var d = a[b].addedNodes, c = 0; c < d.length; c++)
                A(this.c, d[c]);
          }),
          (E.prototype.l = function (a, b) {
            var d = this;
            if (!(b instanceof Function))
              throw new TypeError(
                'Custom element constructors must be functions.'
              );
            if (!g(a))
              throw new SyntaxError(
                "The element name '" + a + "' is not valid."
              );
            if (this.a.a.get(a))
              throw Error(
                "A custom element with name '" +
                  a +
                  "' has already been defined."
              );
            if (this.c)
              throw Error('A custom element is already being defined.');
            this.c = !0;
            try {
              var c = function (b) {
                  var a = e[b];
                  if (void 0 !== a && !(a instanceof Function))
                    throw Error("The '" + b + "' callback must be a function.");
                  return a;
                },
                e = b.prototype;
              if (!(e instanceof Object))
                throw new TypeError(
                  "The custom element constructor's prototype is not an object."
                );
              var f = c('connectedCallback'),
                t = c('disconnectedCallback'),
                k = c('adoptedCallback'),
                h = c('attributeChangedCallback'),
                m = b.observedAttributes || [];
            } catch (q) {
              return;
            } finally {
              this.c = !1;
            }
            (b = {
              localName: a,
              constructorFunction: b,
              connectedCallback: f,
              disconnectedCallback: t,
              adoptedCallback: k,
              attributeChangedCallback: h,
              observedAttributes: m,
              constructionStack: [],
            }),
              (function ba(a, b, d) {
                a.a.set(b, d), a.g.set(d.constructorFunction, d);
              })(this.a, a, b),
              this.g.push(b),
              this.b ||
                ((this.b = !0),
                this.f(function () {
                  return (function fa(a) {
                    if (!1 !== a.b) {
                      a.b = !1;
                      for (
                        var b = a.g, d = [], c = new Map(), e = 0;
                        e < b.length;
                        e++
                      )
                        c.set(b[e].localName, []);
                      for (
                        A(a.a, document, {
                          i: function (b) {
                            if (void 0 === b.__CE_state) {
                              var e = b.localName,
                                f = c.get(e);
                              f ? f.push(b) : a.a.a.get(e) && d.push(b);
                            }
                          },
                        }),
                          e = 0;
                        e < d.length;
                        e++
                      )
                        y(a.a, d[e]);
                      for (; 0 < b.length; ) {
                        var f = b.shift();
                        (e = f.localName), (f = c.get(f.localName));
                        for (var t = 0; t < f.length; t++) y(a.a, f[t]);
                        (e = a.j.get(e)) && D(e);
                      }
                    }
                  })(d);
                }));
          }),
          (E.prototype.i = function (a) {
            A(this.a, a);
          }),
          (E.prototype.get = function (a) {
            if ((a = this.a.a.get(a))) return a.constructorFunction;
          }),
          (E.prototype.m = function (a) {
            if (!g(a))
              return Promise.reject(
                new SyntaxError(
                  "'" + a + "' is not a valid custom element name."
                )
              );
            var b = this.j.get(a);
            return (
              b ||
                ((b = new ea()),
                this.j.set(a, b),
                this.a.a.get(a) &&
                  !this.g.some(function (b) {
                    return b.localName === a;
                  }) &&
                  D(b)),
              b.c
            );
          }),
          (E.prototype.s = function (a) {
            C(this.o);
            var b = this.f;
            this.f = function (d) {
              return a(function () {
                return b(d);
              });
            };
          }),
          (window.CustomElementRegistry = E),
          (E.prototype.define = E.prototype.l),
          (E.prototype.upgrade = E.prototype.i),
          (E.prototype.get = E.prototype.get),
          (E.prototype.whenDefined = E.prototype.m),
          (E.prototype.polyfillWrapFlushCallback = E.prototype.s);
        var F = window.Document.prototype.createElement,
          G = window.Document.prototype.createElementNS,
          ha = window.Document.prototype.importNode,
          ia = window.Document.prototype.prepend,
          ja = window.Document.prototype.append,
          ka = window.DocumentFragment.prototype.prepend,
          la = window.DocumentFragment.prototype.append,
          H = window.Node.prototype.cloneNode,
          I = window.Node.prototype.appendChild,
          J = window.Node.prototype.insertBefore,
          K = window.Node.prototype.removeChild,
          L = window.Node.prototype.replaceChild,
          M = Object.getOwnPropertyDescriptor(
            window.Node.prototype,
            'textContent'
          ),
          N = window.Element.prototype.attachShadow,
          O = Object.getOwnPropertyDescriptor(
            window.Element.prototype,
            'innerHTML'
          ),
          P = window.Element.prototype.getAttribute,
          Q = window.Element.prototype.setAttribute,
          R = window.Element.prototype.removeAttribute,
          S = window.Element.prototype.getAttributeNS,
          T = window.Element.prototype.setAttributeNS,
          U = window.Element.prototype.removeAttributeNS,
          ma = window.Element.prototype.insertAdjacentElement,
          na = window.Element.prototype.insertAdjacentHTML,
          oa = window.Element.prototype.prepend,
          pa = window.Element.prototype.append,
          V = window.Element.prototype.before,
          qa = window.Element.prototype.after,
          ra = window.Element.prototype.replaceWith,
          sa = window.Element.prototype.remove,
          ta = window.HTMLElement,
          W = Object.getOwnPropertyDescriptor(
            window.HTMLElement.prototype,
            'innerHTML'
          ),
          ua = window.HTMLElement.prototype.insertAdjacentElement,
          va = window.HTMLElement.prototype.insertAdjacentHTML,
          wa = new (function () {})();
        function Y(a, b, d) {
          function c(b) {
            return function (d) {
              for (var e = [], c = 0; c < arguments.length; ++c)
                e[c] = arguments[c];
              c = [];
              for (var f = [], m = 0; m < e.length; m++) {
                var q = e[m];
                if (
                  (q instanceof Element && l(q) && f.push(q),
                  q instanceof DocumentFragment)
                )
                  for (q = q.firstChild; q; q = q.nextSibling) c.push(q);
                else c.push(q);
              }
              for (b.apply(this, e), e = 0; e < f.length; e++) z(a, f[e]);
              if (l(this))
                for (e = 0; e < c.length; e++)
                  (f = c[e]) instanceof Element && x(a, f);
            };
          }
          void 0 !== d.h && (b.prepend = c(d.h)),
            void 0 !== d.append && (b.append = c(d.append));
        }
        var Z = window.customElements;
        if (
          !Z ||
          Z.forcePolyfill ||
          'function' != typeof Z.define ||
          'function' != typeof Z.get
        ) {
          var X = new u();
          !(function xa() {
            var a = X;
            window.HTMLElement = (function () {
              function b() {
                var b = this.constructor,
                  c = a.g.get(b);
                if (!c)
                  throw Error(
                    'The custom element being constructed was not registered with `customElements`.'
                  );
                var e = c.constructionStack;
                if (0 === e.length)
                  return (
                    (e = F.call(document, c.localName)),
                    Object.setPrototypeOf(e, b.prototype),
                    (e.__CE_state = 1),
                    (e.__CE_definition = c),
                    w(a, e),
                    e
                  );
                var f = e[(c = e.length - 1)];
                if (f === wa)
                  throw Error(
                    'The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.'
                  );
                return (
                  (e[c] = wa), Object.setPrototypeOf(f, b.prototype), w(a, f), f
                );
              }
              return (
                (b.prototype = ta.prototype),
                Object.defineProperty(b.prototype, 'constructor', {
                  writable: !0,
                  configurable: !0,
                  enumerable: !1,
                  value: b,
                }),
                b
              );
            })();
          })(),
            (function ya() {
              var a = X;
              r(Document.prototype, 'createElement', function (b) {
                if (this.__CE_hasRegistry) {
                  var d = a.a.get(b);
                  if (d) return new d.constructorFunction();
                }
                return (b = F.call(this, b)), w(a, b), b;
              }),
                r(Document.prototype, 'importNode', function (b, d) {
                  return (
                    (b = ha.call(this, b, !!d)),
                    this.__CE_hasRegistry ? A(a, b) : v(a, b),
                    b
                  );
                }),
                r(Document.prototype, 'createElementNS', function (b, d) {
                  if (
                    this.__CE_hasRegistry &&
                    (null === b || 'http://www.w3.org/1999/xhtml' === b)
                  ) {
                    var c = a.a.get(d);
                    if (c) return new c.constructorFunction();
                  }
                  return (b = G.call(this, b, d)), w(a, b), b;
                }),
                Y(a, Document.prototype, { h: ia, append: ja });
            })(),
            Y(X, DocumentFragment.prototype, { h: ka, append: la }),
            (function za() {
              function a(a, c) {
                Object.defineProperty(a, 'textContent', {
                  enumerable: c.enumerable,
                  configurable: !0,
                  get: c.get,
                  set: function (a) {
                    if (this.nodeType === Node.TEXT_NODE) c.set.call(this, a);
                    else {
                      var d = void 0;
                      if (this.firstChild) {
                        var e = this.childNodes,
                          k = e.length;
                        if (0 < k && l(this)) {
                          d = Array(k);
                          for (var h = 0; h < k; h++) d[h] = e[h];
                        }
                      }
                      if ((c.set.call(this, a), d))
                        for (a = 0; a < d.length; a++) z(b, d[a]);
                    }
                  },
                });
              }
              var b = X;
              r(Node.prototype, 'insertBefore', function (a, c) {
                if (a instanceof DocumentFragment) {
                  var e = Array.prototype.slice.apply(a.childNodes);
                  if (((a = J.call(this, a, c)), l(this)))
                    for (c = 0; c < e.length; c++) x(b, e[c]);
                  return a;
                }
                return (
                  (e = l(a)),
                  (c = J.call(this, a, c)),
                  e && z(b, a),
                  l(this) && x(b, a),
                  c
                );
              }),
                r(Node.prototype, 'appendChild', function (a) {
                  if (a instanceof DocumentFragment) {
                    var c = Array.prototype.slice.apply(a.childNodes);
                    if (((a = I.call(this, a)), l(this)))
                      for (var e = 0; e < c.length; e++) x(b, c[e]);
                    return a;
                  }
                  return (
                    (c = l(a)),
                    (e = I.call(this, a)),
                    c && z(b, a),
                    l(this) && x(b, a),
                    e
                  );
                }),
                r(Node.prototype, 'cloneNode', function (a) {
                  return (
                    (a = H.call(this, !!a)),
                    this.ownerDocument.__CE_hasRegistry ? A(b, a) : v(b, a),
                    a
                  );
                }),
                r(Node.prototype, 'removeChild', function (a) {
                  var c = l(a),
                    e = K.call(this, a);
                  return c && z(b, a), e;
                }),
                r(Node.prototype, 'replaceChild', function (a, c) {
                  if (a instanceof DocumentFragment) {
                    var e = Array.prototype.slice.apply(a.childNodes);
                    if (((a = L.call(this, a, c)), l(this)))
                      for (z(b, c), c = 0; c < e.length; c++) x(b, e[c]);
                    return a;
                  }
                  e = l(a);
                  var f = L.call(this, a, c),
                    d = l(this);
                  return d && z(b, c), e && z(b, a), d && x(b, a), f;
                }),
                M && M.get
                  ? a(Node.prototype, M)
                  : (function ca(a, b) {
                      (a.b = !0), a.c.push(b);
                    })(b, function (b) {
                      a(b, {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                          for (
                            var a = [], b = 0;
                            b < this.childNodes.length;
                            b++
                          ) {
                            var f = this.childNodes[b];
                            f.nodeType !== Node.COMMENT_NODE &&
                              a.push(f.textContent);
                          }
                          return a.join('');
                        },
                        set: function (a) {
                          for (; this.firstChild; )
                            K.call(this, this.firstChild);
                          null != a &&
                            '' !== a &&
                            I.call(this, document.createTextNode(a));
                        },
                      });
                    });
            })(),
            (function Ba() {
              function a(a, b) {
                Object.defineProperty(a, 'innerHTML', {
                  enumerable: b.enumerable,
                  configurable: !0,
                  get: b.get,
                  set: function (a) {
                    var e = this,
                      d = void 0;
                    if (
                      (l(this) &&
                        ((d = []),
                        p(this, function (a) {
                          a !== e && d.push(a);
                        })),
                      b.set.call(this, a),
                      d)
                    )
                      for (var f = 0; f < d.length; f++) {
                        var t = d[f];
                        1 === t.__CE_state && c.disconnectedCallback(t);
                      }
                    return (
                      this.ownerDocument.__CE_hasRegistry
                        ? A(c, this)
                        : v(c, this),
                      a
                    );
                  },
                });
              }
              function b(a, b) {
                r(a, 'insertAdjacentElement', function (a, e) {
                  var d = l(e);
                  return (
                    (a = b.call(this, a, e)), d && z(c, e), l(a) && x(c, e), a
                  );
                });
              }
              function d(a, b) {
                function e(a, b) {
                  for (var e = []; a !== b; a = a.nextSibling) e.push(a);
                  for (b = 0; b < e.length; b++) A(c, e[b]);
                }
                r(a, 'insertAdjacentHTML', function (a, c) {
                  if ('beforebegin' === (a = a.toLowerCase())) {
                    var d = this.previousSibling;
                    b.call(this, a, c),
                      e(d || this.parentNode.firstChild, this);
                  } else if ('afterbegin' === a)
                    (d = this.firstChild),
                      b.call(this, a, c),
                      e(this.firstChild, d);
                  else if ('beforeend' === a)
                    (d = this.lastChild),
                      b.call(this, a, c),
                      e(d || this.firstChild, null);
                  else {
                    if ('afterend' !== a)
                      throw new SyntaxError(
                        'The value provided (' +
                          String(a) +
                          ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'."
                      );
                    (d = this.nextSibling),
                      b.call(this, a, c),
                      e(this.nextSibling, d);
                  }
                });
              }
              var c = X;
              N &&
                r(Element.prototype, 'attachShadow', function (a) {
                  a = N.call(this, a);
                  var b = c;
                  if (b.b && !a.__CE_patched) {
                    a.__CE_patched = !0;
                    for (var e = 0; e < b.c.length; e++) b.c[e](a);
                  }
                  return (this.__CE_shadowRoot = a);
                }),
                O && O.get
                  ? a(Element.prototype, O)
                  : W && W.get
                  ? a(HTMLElement.prototype, W)
                  : (function da(a, b) {
                      (a.b = !0), a.f.push(b);
                    })(c, function (b) {
                      a(b, {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                          return H.call(this, !0).innerHTML;
                        },
                        set: function (a) {
                          var b = 'template' === this.localName,
                            c = b ? this.content : this,
                            e = G.call(
                              document,
                              this.namespaceURI,
                              this.localName
                            );
                          for (e.innerHTML = a; 0 < c.childNodes.length; )
                            K.call(c, c.childNodes[0]);
                          for (a = b ? e.content : e; 0 < a.childNodes.length; )
                            I.call(c, a.childNodes[0]);
                        },
                      });
                    }),
                r(Element.prototype, 'setAttribute', function (a, b) {
                  if (1 !== this.__CE_state) return Q.call(this, a, b);
                  var e = P.call(this, a);
                  Q.call(this, a, b),
                    (b = P.call(this, a)),
                    c.attributeChangedCallback(this, a, e, b, null);
                }),
                r(Element.prototype, 'setAttributeNS', function (a, b, d) {
                  if (1 !== this.__CE_state) return T.call(this, a, b, d);
                  var e = S.call(this, a, b);
                  T.call(this, a, b, d),
                    (d = S.call(this, a, b)),
                    c.attributeChangedCallback(this, b, e, d, a);
                }),
                r(Element.prototype, 'removeAttribute', function (a) {
                  if (1 !== this.__CE_state) return R.call(this, a);
                  var b = P.call(this, a);
                  R.call(this, a),
                    null !== b &&
                      c.attributeChangedCallback(this, a, b, null, null);
                }),
                r(Element.prototype, 'removeAttributeNS', function (a, b) {
                  if (1 !== this.__CE_state) return U.call(this, a, b);
                  var d = S.call(this, a, b);
                  U.call(this, a, b);
                  var e = S.call(this, a, b);
                  d !== e && c.attributeChangedCallback(this, b, d, e, a);
                }),
                ua
                  ? b(HTMLElement.prototype, ua)
                  : ma
                  ? b(Element.prototype, ma)
                  : console.warn(
                      'Custom Elements: `Element#insertAdjacentElement` was not patched.'
                    ),
                va
                  ? d(HTMLElement.prototype, va)
                  : na
                  ? d(Element.prototype, na)
                  : console.warn(
                      'Custom Elements: `Element#insertAdjacentHTML` was not patched.'
                    ),
                Y(c, Element.prototype, { h: oa, append: pa }),
                (function Aa(a) {
                  function b(b) {
                    return function (e) {
                      for (var c = [], d = 0; d < arguments.length; ++d)
                        c[d] = arguments[d];
                      d = [];
                      for (var k = [], h = 0; h < c.length; h++) {
                        var m = c[h];
                        if (
                          (m instanceof Element && l(m) && k.push(m),
                          m instanceof DocumentFragment)
                        )
                          for (m = m.firstChild; m; m = m.nextSibling)
                            d.push(m);
                        else d.push(m);
                      }
                      for (b.apply(this, c), c = 0; c < k.length; c++)
                        z(a, k[c]);
                      if (l(this))
                        for (c = 0; c < d.length; c++)
                          (k = d[c]) instanceof Element && x(a, k);
                    };
                  }
                  var d = Element.prototype;
                  void 0 !== V && (d.before = b(V)),
                    void 0 !== V && (d.after = b(qa)),
                    void 0 !== ra &&
                      r(d, 'replaceWith', function (b) {
                        for (var e = [], c = 0; c < arguments.length; ++c)
                          e[c] = arguments[c];
                        c = [];
                        for (var d = [], k = 0; k < e.length; k++) {
                          var h = e[k];
                          if (
                            (h instanceof Element && l(h) && d.push(h),
                            h instanceof DocumentFragment)
                          )
                            for (h = h.firstChild; h; h = h.nextSibling)
                              c.push(h);
                          else c.push(h);
                        }
                        for (
                          k = l(this), ra.apply(this, e), e = 0;
                          e < d.length;
                          e++
                        )
                          z(a, d[e]);
                        if (k)
                          for (z(a, this), e = 0; e < c.length; e++)
                            (d = c[e]) instanceof Element && x(a, d);
                      }),
                    void 0 !== sa &&
                      r(d, 'remove', function () {
                        var b = l(this);
                        sa.call(this), b && z(a, this);
                      });
                })(c);
            })(),
            (document.__CE_hasRegistry = !0);
          var customElements = new E(X);
          Object.defineProperty(window, 'customElements', {
            configurable: !0,
            enumerable: !0,
            value: customElements,
          });
        }
      }.call(self),
        'string' != typeof document.baseURI &&
          Object.defineProperty(Document.prototype, 'baseURI', {
            enumerable: !0,
            configurable: !0,
            get: function () {
              var a = document.querySelector('base');
              return a && a.href ? a.href : document.URL;
            },
          }),
        'function' != typeof window.CustomEvent &&
          ((window.CustomEvent = function (c, a) {
            a = a || { bubbles: !1, cancelable: !1, detail: void 0 };
            var b = document.createEvent('CustomEvent');
            return b.initCustomEvent(c, a.bubbles, a.cancelable, a.detail), b;
          }),
          (window.CustomEvent.prototype = window.Event.prototype)),
        (b = Event.prototype),
        (c = document),
        (d = window),
        b.composedPath ||
          (b.composedPath = function () {
            if (this.path) return this.path;
            var a = this.target;
            for (this.path = []; null !== a.parentNode; )
              this.path.push(a), (a = a.parentNode);
            return this.path.push(c, d), this.path;
          }),
        'function' != typeof (a = window.Element.prototype).matches &&
          (a.matches =
            a.msMatchesSelector ||
            a.mozMatchesSelector ||
            a.webkitMatchesSelector ||
            function (a) {
              a = (this.document || this.ownerDocument).querySelectorAll(a);
              for (var b = 0; a[b] && a[b] !== this; ) ++b;
              return !!a[b];
            }),
        'function' != typeof a.closest &&
          (a.closest = function (a) {
            for (var b = this; b && 1 === b.nodeType; ) {
              if (b.matches(a)) return b;
              b = b.parentNode;
            }
            return null;
          }),
        (function (c) {
          function b(a) {
            return a && a.parentNode ? b(a.parentNode) : a;
          }
          'function' != typeof c.getRootNode &&
            (c.getRootNode = function (a) {
              return a && a.composed
                ? (function d(a) {
                    return (a = b(a)) && 11 === a.nodeType ? d(a.host) : a;
                  })(this)
                : b(this);
            });
        })(Element.prototype),
        (function (a) {
          'isConnected' in a ||
            Object.defineProperty(a, 'isConnected', {
              configurable: !0,
              enumerable: !0,
              get: function () {
                var a = this.getRootNode({ composed: !0 });
                return a && 9 === a.nodeType;
              },
            });
        })(Element.prototype),
        [
          Element.prototype,
          CharacterData.prototype,
          DocumentType.prototype,
        ].forEach(function (a) {
          a.hasOwnProperty('remove') ||
            Object.defineProperty(a, 'remove', {
              configurable: !0,
              enumerable: !0,
              writable: !0,
              value: function () {
                null !== this.parentNode && this.parentNode.removeChild(this);
              },
            });
        }),
        'classList' in (e = Element.prototype) ||
          Object.defineProperty(e, 'classList', {
            get: function () {
              var e = this,
                t = (e.getAttribute('class') || '')
                  .replace(/^\s+|\s$/g, '')
                  .split(/\s+/g);
              function n() {
                t.length > 0
                  ? e.setAttribute('class', t.join(' '))
                  : e.removeAttribute('class');
              }
              return (
                '' === t[0] && t.splice(0, 1),
                (t.toggle = function (e, i) {
                  void 0 !== i
                    ? i
                      ? t.add(e)
                      : t.remove(e)
                    : -1 !== t.indexOf(e)
                    ? t.splice(t.indexOf(e), 1)
                    : t.push(e),
                    n();
                }),
                (t.add = function () {
                  for (
                    var e = [].slice.call(arguments), i = 0, s = e.length;
                    i < s;
                    i++
                  )
                    -1 === t.indexOf(e[i]) && t.push(e[i]);
                  n();
                }),
                (t.remove = function () {
                  for (
                    var e = [].slice.call(arguments), i = 0, s = e.length;
                    i < s;
                    i++
                  )
                    -1 !== t.indexOf(e[i]) && t.splice(t.indexOf(e[i]), 1);
                  n();
                }),
                (t.item = function (e) {
                  return t[e];
                }),
                (t.contains = function (e) {
                  return -1 !== t.indexOf(e);
                }),
                (t.replace = function (e, i) {
                  -1 !== t.indexOf(e) && t.splice(t.indexOf(e), 1, i), n();
                }),
                (t.value = e.getAttribute('class') || ''),
                t
              );
            },
          }),
        (function (b) {
          try {
            document.body.classList.add();
          } catch (e) {
            var c = b.add,
              d = b.remove;
            (b.add = function () {
              for (var a = 0; a < arguments.length; a++)
                c.call(this, arguments[a]);
            }),
              (b.remove = function () {
                for (var a = 0; a < arguments.length; a++)
                  d.call(this, arguments[a]);
              });
          }
        })(DOMTokenList.prototype));
    },
    1970: function (module, exports) {
      var b, c, d, a, e;
      (function () {
        var aa = new Set(
          'annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph'.split(
            ' '
          )
        );
        function g(a) {
          var b = aa.has(a);
          return (a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a)), !b && a;
        }
        function l(a) {
          var b = a.isConnected;
          if (void 0 !== b) return b;
          for (; a && !(a.__CE_isImportDocument || a instanceof Document); )
            a =
              a.parentNode ||
              (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
          return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
        }
        function n(a, b) {
          for (; b && b !== a && !b.nextSibling; ) b = b.parentNode;
          return b && b !== a ? b.nextSibling : null;
        }
        function p(a, b, d) {
          d = void 0 === d ? new Set() : d;
          for (var c = a; c; ) {
            if (c.nodeType === Node.ELEMENT_NODE) {
              var e = c;
              b(e);
              var f = e.localName;
              if ('link' === f && 'import' === e.getAttribute('rel')) {
                if ((c = e.import) instanceof Node && !d.has(c))
                  for (d.add(c), c = c.firstChild; c; c = c.nextSibling)
                    p(c, b, d);
                c = n(a, e);
                continue;
              }
              if ('template' === f) {
                c = n(a, e);
                continue;
              }
              if ((e = e.__CE_shadowRoot))
                for (e = e.firstChild; e; e = e.nextSibling) p(e, b, d);
            }
            c = c.firstChild ? c.firstChild : n(a, c);
          }
        }
        function r(a, b, d) {
          a[b] = d;
        }
        function u() {
          (this.a = new Map()),
            (this.g = new Map()),
            (this.c = []),
            (this.f = []),
            (this.b = !1);
        }
        function v(a, b) {
          a.b &&
            p(b, function (b) {
              return w(a, b);
            });
        }
        function w(a, b) {
          if (a.b && !b.__CE_patched) {
            b.__CE_patched = !0;
            for (var d = 0; d < a.c.length; d++) a.c[d](b);
            for (d = 0; d < a.f.length; d++) a.f[d](b);
          }
        }
        function x(a, b) {
          var d = [];
          for (
            p(b, function (b) {
              return d.push(b);
            }),
              b = 0;
            b < d.length;
            b++
          ) {
            var c = d[b];
            1 === c.__CE_state ? a.connectedCallback(c) : y(a, c);
          }
        }
        function z(a, b) {
          var d = [];
          for (
            p(b, function (b) {
              return d.push(b);
            }),
              b = 0;
            b < d.length;
            b++
          ) {
            var c = d[b];
            1 === c.__CE_state && a.disconnectedCallback(c);
          }
        }
        function A(a, b, d) {
          var c = (d = void 0 === d ? {} : d).u || new Set(),
            e =
              d.i ||
              function (b) {
                return y(a, b);
              },
            f = [];
          if (
            (p(
              b,
              function (b) {
                if (
                  'link' === b.localName &&
                  'import' === b.getAttribute('rel')
                ) {
                  var d = b.import;
                  d instanceof Node &&
                    ((d.__CE_isImportDocument = !0), (d.__CE_hasRegistry = !0)),
                    d && 'complete' === d.readyState
                      ? (d.__CE_documentLoadHandled = !0)
                      : b.addEventListener('load', function () {
                          var d = b.import;
                          if (!d.__CE_documentLoadHandled) {
                            d.__CE_documentLoadHandled = !0;
                            var f = new Set(c);
                            f.delete(d), A(a, d, { u: f, i: e });
                          }
                        });
                } else f.push(b);
              },
              c
            ),
            a.b)
          )
            for (b = 0; b < f.length; b++) w(a, f[b]);
          for (b = 0; b < f.length; b++) e(f[b]);
        }
        function y(a, b) {
          if (void 0 === b.__CE_state) {
            var d = b.ownerDocument;
            if (
              (d.defaultView ||
                (d.__CE_isImportDocument && d.__CE_hasRegistry)) &&
              (d = a.a.get(b.localName))
            ) {
              d.constructionStack.push(b);
              var c = d.constructorFunction;
              try {
                try {
                  if (new c() !== b)
                    throw Error(
                      'The custom element constructor did not produce the element being upgraded.'
                    );
                } finally {
                  d.constructionStack.pop();
                }
              } catch (t) {
                throw ((b.__CE_state = 2), t);
              }
              if (
                ((b.__CE_state = 1),
                (b.__CE_definition = d),
                d.attributeChangedCallback)
              )
                for (d = d.observedAttributes, c = 0; c < d.length; c++) {
                  var e = d[c],
                    f = b.getAttribute(e);
                  null !== f && a.attributeChangedCallback(b, e, null, f, null);
                }
              l(b) && a.connectedCallback(b);
            }
          }
        }
        function B(a) {
          var b = document;
          (this.c = a),
            (this.a = b),
            (this.b = void 0),
            A(this.c, this.a),
            'loading' === this.a.readyState &&
              ((this.b = new MutationObserver(this.f.bind(this))),
              this.b.observe(this.a, { childList: !0, subtree: !0 }));
        }
        function C(a) {
          a.b && a.b.disconnect();
        }
        function ea() {
          var a = this;
          (this.b = this.a = void 0),
            (this.c = new Promise(function (b) {
              (a.b = b), a.a && b(a.a);
            }));
        }
        function D(a) {
          if (a.a) throw Error('Already resolved.');
          (a.a = void 0), a.b && a.b(void 0);
        }
        function E(a) {
          (this.c = !1),
            (this.a = a),
            (this.j = new Map()),
            (this.f = function (b) {
              return b();
            }),
            (this.b = !1),
            (this.g = []),
            (this.o = new B(a));
        }
        (u.prototype.connectedCallback = function (a) {
          var b = a.__CE_definition;
          b.connectedCallback && b.connectedCallback.call(a);
        }),
          (u.prototype.disconnectedCallback = function (a) {
            var b = a.__CE_definition;
            b.disconnectedCallback && b.disconnectedCallback.call(a);
          }),
          (u.prototype.attributeChangedCallback = function (a, b, d, c, e) {
            var f = a.__CE_definition;
            f.attributeChangedCallback &&
              -1 < f.observedAttributes.indexOf(b) &&
              f.attributeChangedCallback.call(a, b, d, c, e);
          }),
          (B.prototype.f = function (a) {
            var b = this.a.readyState;
            for (
              ('interactive' !== b && 'complete' !== b) || C(this), b = 0;
              b < a.length;
              b++
            )
              for (var d = a[b].addedNodes, c = 0; c < d.length; c++)
                A(this.c, d[c]);
          }),
          (E.prototype.l = function (a, b) {
            var d = this;
            if (!(b instanceof Function))
              throw new TypeError(
                'Custom element constructors must be functions.'
              );
            if (!g(a))
              throw new SyntaxError(
                "The element name '" + a + "' is not valid."
              );
            if (this.a.a.get(a))
              throw Error(
                "A custom element with name '" +
                  a +
                  "' has already been defined."
              );
            if (this.c)
              throw Error('A custom element is already being defined.');
            this.c = !0;
            try {
              var c = function (b) {
                  var a = e[b];
                  if (void 0 !== a && !(a instanceof Function))
                    throw Error("The '" + b + "' callback must be a function.");
                  return a;
                },
                e = b.prototype;
              if (!(e instanceof Object))
                throw new TypeError(
                  "The custom element constructor's prototype is not an object."
                );
              var f = c('connectedCallback'),
                t = c('disconnectedCallback'),
                k = c('adoptedCallback'),
                h = c('attributeChangedCallback'),
                m = b.observedAttributes || [];
            } catch (q) {
              return;
            } finally {
              this.c = !1;
            }
            (b = {
              localName: a,
              constructorFunction: b,
              connectedCallback: f,
              disconnectedCallback: t,
              adoptedCallback: k,
              attributeChangedCallback: h,
              observedAttributes: m,
              constructionStack: [],
            }),
              (function ba(a, b, d) {
                a.a.set(b, d), a.g.set(d.constructorFunction, d);
              })(this.a, a, b),
              this.g.push(b),
              this.b ||
                ((this.b = !0),
                this.f(function () {
                  return (function fa(a) {
                    if (!1 !== a.b) {
                      a.b = !1;
                      for (
                        var b = a.g, d = [], c = new Map(), e = 0;
                        e < b.length;
                        e++
                      )
                        c.set(b[e].localName, []);
                      for (
                        A(a.a, document, {
                          i: function (b) {
                            if (void 0 === b.__CE_state) {
                              var e = b.localName,
                                f = c.get(e);
                              f ? f.push(b) : a.a.a.get(e) && d.push(b);
                            }
                          },
                        }),
                          e = 0;
                        e < d.length;
                        e++
                      )
                        y(a.a, d[e]);
                      for (; 0 < b.length; ) {
                        var f = b.shift();
                        (e = f.localName), (f = c.get(f.localName));
                        for (var t = 0; t < f.length; t++) y(a.a, f[t]);
                        (e = a.j.get(e)) && D(e);
                      }
                    }
                  })(d);
                }));
          }),
          (E.prototype.i = function (a) {
            A(this.a, a);
          }),
          (E.prototype.get = function (a) {
            if ((a = this.a.a.get(a))) return a.constructorFunction;
          }),
          (E.prototype.m = function (a) {
            if (!g(a))
              return Promise.reject(
                new SyntaxError(
                  "'" + a + "' is not a valid custom element name."
                )
              );
            var b = this.j.get(a);
            return (
              b ||
                ((b = new ea()),
                this.j.set(a, b),
                this.a.a.get(a) &&
                  !this.g.some(function (b) {
                    return b.localName === a;
                  }) &&
                  D(b)),
              b.c
            );
          }),
          (E.prototype.s = function (a) {
            C(this.o);
            var b = this.f;
            this.f = function (d) {
              return a(function () {
                return b(d);
              });
            };
          }),
          (window.CustomElementRegistry = E),
          (E.prototype.define = E.prototype.l),
          (E.prototype.upgrade = E.prototype.i),
          (E.prototype.get = E.prototype.get),
          (E.prototype.whenDefined = E.prototype.m),
          (E.prototype.polyfillWrapFlushCallback = E.prototype.s);
        var F = window.Document.prototype.createElement,
          G = window.Document.prototype.createElementNS,
          ha = window.Document.prototype.importNode,
          ia = window.Document.prototype.prepend,
          ja = window.Document.prototype.append,
          ka = window.DocumentFragment.prototype.prepend,
          la = window.DocumentFragment.prototype.append,
          H = window.Node.prototype.cloneNode,
          I = window.Node.prototype.appendChild,
          J = window.Node.prototype.insertBefore,
          K = window.Node.prototype.removeChild,
          L = window.Node.prototype.replaceChild,
          M = Object.getOwnPropertyDescriptor(
            window.Node.prototype,
            'textContent'
          ),
          N = window.Element.prototype.attachShadow,
          O = Object.getOwnPropertyDescriptor(
            window.Element.prototype,
            'innerHTML'
          ),
          P = window.Element.prototype.getAttribute,
          Q = window.Element.prototype.setAttribute,
          R = window.Element.prototype.removeAttribute,
          S = window.Element.prototype.getAttributeNS,
          T = window.Element.prototype.setAttributeNS,
          U = window.Element.prototype.removeAttributeNS,
          ma = window.Element.prototype.insertAdjacentElement,
          na = window.Element.prototype.insertAdjacentHTML,
          oa = window.Element.prototype.prepend,
          pa = window.Element.prototype.append,
          V = window.Element.prototype.before,
          qa = window.Element.prototype.after,
          ra = window.Element.prototype.replaceWith,
          sa = window.Element.prototype.remove,
          ta = window.HTMLElement,
          W = Object.getOwnPropertyDescriptor(
            window.HTMLElement.prototype,
            'innerHTML'
          ),
          ua = window.HTMLElement.prototype.insertAdjacentElement,
          va = window.HTMLElement.prototype.insertAdjacentHTML,
          wa = new (function () {})();
        function Y(a, b, d) {
          function c(b) {
            return function (d) {
              for (var e = [], c = 0; c < arguments.length; ++c)
                e[c] = arguments[c];
              c = [];
              for (var f = [], m = 0; m < e.length; m++) {
                var q = e[m];
                if (
                  (q instanceof Element && l(q) && f.push(q),
                  q instanceof DocumentFragment)
                )
                  for (q = q.firstChild; q; q = q.nextSibling) c.push(q);
                else c.push(q);
              }
              for (b.apply(this, e), e = 0; e < f.length; e++) z(a, f[e]);
              if (l(this))
                for (e = 0; e < c.length; e++)
                  (f = c[e]) instanceof Element && x(a, f);
            };
          }
          void 0 !== d.h && (b.prepend = c(d.h)),
            void 0 !== d.append && (b.append = c(d.append));
        }
        var Z = window.customElements;
        if (
          !Z ||
          Z.forcePolyfill ||
          'function' != typeof Z.define ||
          'function' != typeof Z.get
        ) {
          var X = new u();
          !(function xa() {
            var a = X;
            window.HTMLElement = (function () {
              function b() {
                var b = this.constructor,
                  c = a.g.get(b);
                if (!c)
                  throw Error(
                    'The custom element being constructed was not registered with `customElements`.'
                  );
                var e = c.constructionStack;
                if (0 === e.length)
                  return (
                    (e = F.call(document, c.localName)),
                    Object.setPrototypeOf(e, b.prototype),
                    (e.__CE_state = 1),
                    (e.__CE_definition = c),
                    w(a, e),
                    e
                  );
                var f = e[(c = e.length - 1)];
                if (f === wa)
                  throw Error(
                    'The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.'
                  );
                return (
                  (e[c] = wa), Object.setPrototypeOf(f, b.prototype), w(a, f), f
                );
              }
              return (
                (b.prototype = ta.prototype),
                Object.defineProperty(b.prototype, 'constructor', {
                  writable: !0,
                  configurable: !0,
                  enumerable: !1,
                  value: b,
                }),
                b
              );
            })();
          })(),
            (function ya() {
              var a = X;
              r(Document.prototype, 'createElement', function (b) {
                if (this.__CE_hasRegistry) {
                  var d = a.a.get(b);
                  if (d) return new d.constructorFunction();
                }
                return (b = F.call(this, b)), w(a, b), b;
              }),
                r(Document.prototype, 'importNode', function (b, d) {
                  return (
                    (b = ha.call(this, b, !!d)),
                    this.__CE_hasRegistry ? A(a, b) : v(a, b),
                    b
                  );
                }),
                r(Document.prototype, 'createElementNS', function (b, d) {
                  if (
                    this.__CE_hasRegistry &&
                    (null === b || 'http://www.w3.org/1999/xhtml' === b)
                  ) {
                    var c = a.a.get(d);
                    if (c) return new c.constructorFunction();
                  }
                  return (b = G.call(this, b, d)), w(a, b), b;
                }),
                Y(a, Document.prototype, { h: ia, append: ja });
            })(),
            Y(X, DocumentFragment.prototype, { h: ka, append: la }),
            (function za() {
              function a(a, c) {
                Object.defineProperty(a, 'textContent', {
                  enumerable: c.enumerable,
                  configurable: !0,
                  get: c.get,
                  set: function (a) {
                    if (this.nodeType === Node.TEXT_NODE) c.set.call(this, a);
                    else {
                      var d = void 0;
                      if (this.firstChild) {
                        var e = this.childNodes,
                          k = e.length;
                        if (0 < k && l(this)) {
                          d = Array(k);
                          for (var h = 0; h < k; h++) d[h] = e[h];
                        }
                      }
                      if ((c.set.call(this, a), d))
                        for (a = 0; a < d.length; a++) z(b, d[a]);
                    }
                  },
                });
              }
              var b = X;
              r(Node.prototype, 'insertBefore', function (a, c) {
                if (a instanceof DocumentFragment) {
                  var e = Array.prototype.slice.apply(a.childNodes);
                  if (((a = J.call(this, a, c)), l(this)))
                    for (c = 0; c < e.length; c++) x(b, e[c]);
                  return a;
                }
                return (
                  (e = l(a)),
                  (c = J.call(this, a, c)),
                  e && z(b, a),
                  l(this) && x(b, a),
                  c
                );
              }),
                r(Node.prototype, 'appendChild', function (a) {
                  if (a instanceof DocumentFragment) {
                    var c = Array.prototype.slice.apply(a.childNodes);
                    if (((a = I.call(this, a)), l(this)))
                      for (var e = 0; e < c.length; e++) x(b, c[e]);
                    return a;
                  }
                  return (
                    (c = l(a)),
                    (e = I.call(this, a)),
                    c && z(b, a),
                    l(this) && x(b, a),
                    e
                  );
                }),
                r(Node.prototype, 'cloneNode', function (a) {
                  return (
                    (a = H.call(this, !!a)),
                    this.ownerDocument.__CE_hasRegistry ? A(b, a) : v(b, a),
                    a
                  );
                }),
                r(Node.prototype, 'removeChild', function (a) {
                  var c = l(a),
                    e = K.call(this, a);
                  return c && z(b, a), e;
                }),
                r(Node.prototype, 'replaceChild', function (a, c) {
                  if (a instanceof DocumentFragment) {
                    var e = Array.prototype.slice.apply(a.childNodes);
                    if (((a = L.call(this, a, c)), l(this)))
                      for (z(b, c), c = 0; c < e.length; c++) x(b, e[c]);
                    return a;
                  }
                  e = l(a);
                  var f = L.call(this, a, c),
                    d = l(this);
                  return d && z(b, c), e && z(b, a), d && x(b, a), f;
                }),
                M && M.get
                  ? a(Node.prototype, M)
                  : (function ca(a, b) {
                      (a.b = !0), a.c.push(b);
                    })(b, function (b) {
                      a(b, {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                          for (
                            var a = [], b = 0;
                            b < this.childNodes.length;
                            b++
                          ) {
                            var f = this.childNodes[b];
                            f.nodeType !== Node.COMMENT_NODE &&
                              a.push(f.textContent);
                          }
                          return a.join('');
                        },
                        set: function (a) {
                          for (; this.firstChild; )
                            K.call(this, this.firstChild);
                          null != a &&
                            '' !== a &&
                            I.call(this, document.createTextNode(a));
                        },
                      });
                    });
            })(),
            (function Ba() {
              function a(a, b) {
                Object.defineProperty(a, 'innerHTML', {
                  enumerable: b.enumerable,
                  configurable: !0,
                  get: b.get,
                  set: function (a) {
                    var e = this,
                      d = void 0;
                    if (
                      (l(this) &&
                        ((d = []),
                        p(this, function (a) {
                          a !== e && d.push(a);
                        })),
                      b.set.call(this, a),
                      d)
                    )
                      for (var f = 0; f < d.length; f++) {
                        var t = d[f];
                        1 === t.__CE_state && c.disconnectedCallback(t);
                      }
                    return (
                      this.ownerDocument.__CE_hasRegistry
                        ? A(c, this)
                        : v(c, this),
                      a
                    );
                  },
                });
              }
              function b(a, b) {
                r(a, 'insertAdjacentElement', function (a, e) {
                  var d = l(e);
                  return (
                    (a = b.call(this, a, e)), d && z(c, e), l(a) && x(c, e), a
                  );
                });
              }
              function d(a, b) {
                function e(a, b) {
                  for (var e = []; a !== b; a = a.nextSibling) e.push(a);
                  for (b = 0; b < e.length; b++) A(c, e[b]);
                }
                r(a, 'insertAdjacentHTML', function (a, c) {
                  if ('beforebegin' === (a = a.toLowerCase())) {
                    var d = this.previousSibling;
                    b.call(this, a, c),
                      e(d || this.parentNode.firstChild, this);
                  } else if ('afterbegin' === a)
                    (d = this.firstChild),
                      b.call(this, a, c),
                      e(this.firstChild, d);
                  else if ('beforeend' === a)
                    (d = this.lastChild),
                      b.call(this, a, c),
                      e(d || this.firstChild, null);
                  else {
                    if ('afterend' !== a)
                      throw new SyntaxError(
                        'The value provided (' +
                          String(a) +
                          ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'."
                      );
                    (d = this.nextSibling),
                      b.call(this, a, c),
                      e(this.nextSibling, d);
                  }
                });
              }
              var c = X;
              N &&
                r(Element.prototype, 'attachShadow', function (a) {
                  a = N.call(this, a);
                  var b = c;
                  if (b.b && !a.__CE_patched) {
                    a.__CE_patched = !0;
                    for (var e = 0; e < b.c.length; e++) b.c[e](a);
                  }
                  return (this.__CE_shadowRoot = a);
                }),
                O && O.get
                  ? a(Element.prototype, O)
                  : W && W.get
                  ? a(HTMLElement.prototype, W)
                  : (function da(a, b) {
                      (a.b = !0), a.f.push(b);
                    })(c, function (b) {
                      a(b, {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                          return H.call(this, !0).innerHTML;
                        },
                        set: function (a) {
                          var b = 'template' === this.localName,
                            c = b ? this.content : this,
                            e = G.call(
                              document,
                              this.namespaceURI,
                              this.localName
                            );
                          for (e.innerHTML = a; 0 < c.childNodes.length; )
                            K.call(c, c.childNodes[0]);
                          for (a = b ? e.content : e; 0 < a.childNodes.length; )
                            I.call(c, a.childNodes[0]);
                        },
                      });
                    }),
                r(Element.prototype, 'setAttribute', function (a, b) {
                  if (1 !== this.__CE_state) return Q.call(this, a, b);
                  var e = P.call(this, a);
                  Q.call(this, a, b),
                    (b = P.call(this, a)),
                    c.attributeChangedCallback(this, a, e, b, null);
                }),
                r(Element.prototype, 'setAttributeNS', function (a, b, d) {
                  if (1 !== this.__CE_state) return T.call(this, a, b, d);
                  var e = S.call(this, a, b);
                  T.call(this, a, b, d),
                    (d = S.call(this, a, b)),
                    c.attributeChangedCallback(this, b, e, d, a);
                }),
                r(Element.prototype, 'removeAttribute', function (a) {
                  if (1 !== this.__CE_state) return R.call(this, a);
                  var b = P.call(this, a);
                  R.call(this, a),
                    null !== b &&
                      c.attributeChangedCallback(this, a, b, null, null);
                }),
                r(Element.prototype, 'removeAttributeNS', function (a, b) {
                  if (1 !== this.__CE_state) return U.call(this, a, b);
                  var d = S.call(this, a, b);
                  U.call(this, a, b);
                  var e = S.call(this, a, b);
                  d !== e && c.attributeChangedCallback(this, b, d, e, a);
                }),
                ua
                  ? b(HTMLElement.prototype, ua)
                  : ma
                  ? b(Element.prototype, ma)
                  : console.warn(
                      'Custom Elements: `Element#insertAdjacentElement` was not patched.'
                    ),
                va
                  ? d(HTMLElement.prototype, va)
                  : na
                  ? d(Element.prototype, na)
                  : console.warn(
                      'Custom Elements: `Element#insertAdjacentHTML` was not patched.'
                    ),
                Y(c, Element.prototype, { h: oa, append: pa }),
                (function Aa(a) {
                  function b(b) {
                    return function (e) {
                      for (var c = [], d = 0; d < arguments.length; ++d)
                        c[d] = arguments[d];
                      d = [];
                      for (var k = [], h = 0; h < c.length; h++) {
                        var m = c[h];
                        if (
                          (m instanceof Element && l(m) && k.push(m),
                          m instanceof DocumentFragment)
                        )
                          for (m = m.firstChild; m; m = m.nextSibling)
                            d.push(m);
                        else d.push(m);
                      }
                      for (b.apply(this, c), c = 0; c < k.length; c++)
                        z(a, k[c]);
                      if (l(this))
                        for (c = 0; c < d.length; c++)
                          (k = d[c]) instanceof Element && x(a, k);
                    };
                  }
                  var d = Element.prototype;
                  void 0 !== V && (d.before = b(V)),
                    void 0 !== V && (d.after = b(qa)),
                    void 0 !== ra &&
                      r(d, 'replaceWith', function (b) {
                        for (var e = [], c = 0; c < arguments.length; ++c)
                          e[c] = arguments[c];
                        c = [];
                        for (var d = [], k = 0; k < e.length; k++) {
                          var h = e[k];
                          if (
                            (h instanceof Element && l(h) && d.push(h),
                            h instanceof DocumentFragment)
                          )
                            for (h = h.firstChild; h; h = h.nextSibling)
                              c.push(h);
                          else c.push(h);
                        }
                        for (
                          k = l(this), ra.apply(this, e), e = 0;
                          e < d.length;
                          e++
                        )
                          z(a, d[e]);
                        if (k)
                          for (z(a, this), e = 0; e < c.length; e++)
                            (d = c[e]) instanceof Element && x(a, d);
                      }),
                    void 0 !== sa &&
                      r(d, 'remove', function () {
                        var b = l(this);
                        sa.call(this), b && z(a, this);
                      });
                })(c);
            })(),
            (document.__CE_hasRegistry = !0);
          var customElements = new E(X);
          Object.defineProperty(window, 'customElements', {
            configurable: !0,
            enumerable: !0,
            value: customElements,
          });
        }
      }.call(self),
        'string' != typeof document.baseURI &&
          Object.defineProperty(Document.prototype, 'baseURI', {
            enumerable: !0,
            configurable: !0,
            get: function () {
              var a = document.querySelector('base');
              return a && a.href ? a.href : document.URL;
            },
          }),
        'function' != typeof window.CustomEvent &&
          ((window.CustomEvent = function (c, a) {
            a = a || { bubbles: !1, cancelable: !1, detail: void 0 };
            var b = document.createEvent('CustomEvent');
            return b.initCustomEvent(c, a.bubbles, a.cancelable, a.detail), b;
          }),
          (window.CustomEvent.prototype = window.Event.prototype)),
        (b = Event.prototype),
        (c = document),
        (d = window),
        b.composedPath ||
          (b.composedPath = function () {
            if (this.path) return this.path;
            var a = this.target;
            for (this.path = []; null !== a.parentNode; )
              this.path.push(a), (a = a.parentNode);
            return this.path.push(c, d), this.path;
          }),
        'function' != typeof (a = window.Element.prototype).matches &&
          (a.matches =
            a.msMatchesSelector ||
            a.mozMatchesSelector ||
            a.webkitMatchesSelector ||
            function (a) {
              a = (this.document || this.ownerDocument).querySelectorAll(a);
              for (var b = 0; a[b] && a[b] !== this; ) ++b;
              return !!a[b];
            }),
        'function' != typeof a.closest &&
          (a.closest = function (a) {
            for (var b = this; b && 1 === b.nodeType; ) {
              if (b.matches(a)) return b;
              b = b.parentNode;
            }
            return null;
          }),
        (function (c) {
          function b(a) {
            return a && a.parentNode ? b(a.parentNode) : a;
          }
          'function' != typeof c.getRootNode &&
            (c.getRootNode = function (a) {
              return a && a.composed
                ? (function d(a) {
                    return (a = b(a)) && 11 === a.nodeType ? d(a.host) : a;
                  })(this)
                : b(this);
            });
        })(Element.prototype),
        (function (a) {
          'isConnected' in a ||
            Object.defineProperty(a, 'isConnected', {
              configurable: !0,
              enumerable: !0,
              get: function () {
                var a = this.getRootNode({ composed: !0 });
                return a && 9 === a.nodeType;
              },
            });
        })(Element.prototype),
        [
          Element.prototype,
          CharacterData.prototype,
          DocumentType.prototype,
        ].forEach(function (a) {
          a.hasOwnProperty('remove') ||
            Object.defineProperty(a, 'remove', {
              configurable: !0,
              enumerable: !0,
              writable: !0,
              value: function () {
                null !== this.parentNode && this.parentNode.removeChild(this);
              },
            });
        }),
        'classList' in (e = Element.prototype) ||
          Object.defineProperty(e, 'classList', {
            get: function () {
              var e = this,
                t = (e.getAttribute('class') || '')
                  .replace(/^\s+|\s$/g, '')
                  .split(/\s+/g);
              function n() {
                t.length > 0
                  ? e.setAttribute('class', t.join(' '))
                  : e.removeAttribute('class');
              }
              return (
                '' === t[0] && t.splice(0, 1),
                (t.toggle = function (e, i) {
                  void 0 !== i
                    ? i
                      ? t.add(e)
                      : t.remove(e)
                    : -1 !== t.indexOf(e)
                    ? t.splice(t.indexOf(e), 1)
                    : t.push(e),
                    n();
                }),
                (t.add = function () {
                  for (
                    var e = [].slice.call(arguments), i = 0, s = e.length;
                    i < s;
                    i++
                  )
                    -1 === t.indexOf(e[i]) && t.push(e[i]);
                  n();
                }),
                (t.remove = function () {
                  for (
                    var e = [].slice.call(arguments), i = 0, s = e.length;
                    i < s;
                    i++
                  )
                    -1 !== t.indexOf(e[i]) && t.splice(t.indexOf(e[i]), 1);
                  n();
                }),
                (t.item = function (e) {
                  return t[e];
                }),
                (t.contains = function (e) {
                  return -1 !== t.indexOf(e);
                }),
                (t.replace = function (e, i) {
                  -1 !== t.indexOf(e) && t.splice(t.indexOf(e), 1, i), n();
                }),
                (t.value = e.getAttribute('class') || ''),
                t
              );
            },
          }),
        (function (b) {
          try {
            document.body.classList.add();
          } catch (e) {
            var c = b.add,
              d = b.remove;
            (b.add = function () {
              for (var a = 0; a < arguments.length; a++)
                c.call(this, arguments[a]);
            }),
              (b.remove = function () {
                for (var a = 0; a < arguments.length; a++)
                  d.call(this, arguments[a]);
              });
          }
        })(DOMTokenList.prototype));
    },
  },
]);
//# sourceMappingURL=vendors~polyfills-dom.43062421b39d2bb010e4.bundle.js.map
