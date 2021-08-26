var __defProp = Object.defineProperty,
  __defProps = Object.defineProperties,
  __getOwnPropDescs = Object.getOwnPropertyDescriptors,
  __getOwnPropSymbols = Object.getOwnPropertySymbols,
  __hasOwnProp = Object.prototype.hasOwnProperty,
  __propIsEnum = Object.prototype.propertyIsEnumerable,
  __defNormalProp = (t, e, n) =>
    e in t
      ? __defProp(t, e, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: n,
        })
      : (t[e] = n),
  __spreadValues = (t, e) => {
    for (var n in e || (e = {}))
      __hasOwnProp.call(e, n) && __defNormalProp(t, n, e[n]);
    if (__getOwnPropSymbols)
      for (var n of __getOwnPropSymbols(e))
        __propIsEnum.call(e, n) && __defNormalProp(t, n, e[n]);
    return t;
  },
  __spreadProps = (t, e) => __defProps(t, __getOwnPropDescs(e));
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports, require('vue'), require('aws-amplify'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'vue', 'aws-amplify'], e)
    : e(
        ((t = 'undefined' != typeof globalThis ? globalThis : t || self)[
          'ui-vue'
        ] = {}),
        t.Vue,
        t.awsAmplify
      );
})(this, function (t, e, n) {
  'use strict';
  var r = e.defineComponent({ setup: () => ({}) });
  const o = { 'data-amplify-label': '' };
  r.render = function (t, n, r, i, a, u) {
    return (
      e.openBlock(),
      e.createElementBlock('label', o, [e.renderSlot(t.$slots, 'default')])
    );
  };
  var i = e.defineComponent({ setup: (t, { slots: e }) => ({ mySlots: e }) });
  const a = { 'data-amplify-footer': '' };
  i.render = function (t, n, r, o, i, u) {
    return e.renderSlot(
      t.$slots,
      'footert',
      { slotData: t.mySlots.default() },
      () => [
        e.createElementVNode('footer', a, [e.renderSlot(t.$slots, 'default')]),
      ]
    );
  };
  var u = e.defineComponent({ provide: () => ({}), setup: () => ({}) });
  u.render = function (t, n, r, o, i, a) {
    return (
      e.openBlock(),
      e.createElementBlock('div', null, [e.renderSlot(t.$slots, 'default')])
    );
  };
  var s = e.defineComponent({
    inheritAttrs: !1,
    setup: (t, { slots: e }) => ({ mySlots: e }),
  });
  s.render = function (t, n, r, o, i, a) {
    return e.renderSlot(
      t.$slots,
      'formt',
      { slotData: t.mySlots.default() },
      () => [
        e.createElementVNode(
          'form',
          e.mergeProps({ 'data-amplify-form': '' }, t.$attrs),
          [e.renderSlot(t.$slots, 'default')],
          16
        ),
      ]
    );
  };
  var c = e.defineComponent({
      props: { level: { type: Number, default: 1 } },
      inheritAttrs: !1,
      setup(t, { slots: n, attrs: r }) {
        var o;
        const i = n.default ? n.default() : [],
          a = n.headingI ? n.headingI() : [];
        return 0 !== (null == (o = a[0]) ? void 0 : o.children.length)
          ? () =>
              e.h(
                `h${t.level}`,
                __spreadValues({ 'data-amplify-heading': '' }, r),
                [a[0] ? e.h(a[0].children[0]) : e.h(i[0])]
              )
          : ((a[0].children = [
              e.h(
                `h${t.level}`,
                __spreadValues({ 'data-amplify-heading': '' }, r),
                [i]
              ),
            ]),
            () => a);
      },
    }),
    l = e.defineComponent({
      inheritAttrs: !1,
      setup: (t, { slots: e }) => ({ mySlots: e }),
    });
  l.render = function (t, n, r, o, i, a) {
    return e.renderSlot(
      t.$slots,
      'fieldSetI',
      { slotData: t.mySlots.default() },
      () => [
        e.createElementVNode(
          'fieldset',
          e.mergeProps({ 'data-amplify-fieldset': '' }, t.$attrs),
          [e.renderSlot(t.$slots, 'default')],
          16
        ),
      ]
    );
  };
  var f = e.defineComponent({ setup: () => ({}) });
  const d = { 'data-amplify-box': '' };
  f.render = function (t, n, r, o, i, a) {
    return (
      e.openBlock(),
      e.createElementBlock('div', d, [e.renderSlot(t.$slots, 'default')])
    );
  };
  var p = e.defineComponent({ setup: () => ({}) });
  p.render = function (t, n, r, o, i, a) {
    return e.renderSlot(
      t.$slots,
      'buttont',
      e.normalizeProps(e.guardReactiveProps(t.$attrs)),
      () => [
        e.createElementVNode(
          'button',
          e.mergeProps(t.$attrs, { 'data-amplify-button': '' }),
          [e.renderSlot(t.$slots, 'default')],
          16
        ),
      ]
    );
  };
  var h = e.defineComponent({ setup: () => ({}) });
  const v = { 'data-amplify-spacer': '' };
  h.render = function (t, n, r, o, i, a) {
    return (
      e.openBlock(),
      e.createElementBlock('span', v, [e.renderSlot(t.$slots, 'default')])
    );
  };
  var g = e.defineComponent({ setup: () => ({}) });
  g.render = function (t, n, r, o, i, a) {
    return e.renderSlot(
      t.$slots,
      'textI',
      e.normalizeProps(e.guardReactiveProps(t.$attrs)),
      () => [
        e.createElementVNode(
          'span',
          e.mergeProps({ 'data-amplify-text': '' }, t.$attrs),
          [e.renderSlot(t.$slots, 'default')],
          16
        ),
      ]
    );
  };
  var y = e.defineComponent({
    props: { textValue: { default: '' } },
    setup: (t, { emit: e }) => ({
      onInput: (t) => {
        e('update:textValue', t.target.value);
      },
    }),
  });
  const m = ['value'];
  y.render = function (t, n, r, o, i, a) {
    return (
      e.openBlock(),
      e.createElementBlock(
        'input',
        {
          value: t.textValue,
          onInput: n[0] || (n[0] = (e) => t.onInput(e)),
          'data-amplify-input': '',
        },
        null,
        40,
        m
      )
    );
  };
  const b = 'Sign In',
    w = 'Password',
    _ = 'Have an account?',
    S = 'Confirmation Code',
    C = 'Lost your code?',
    x = 'Resend Code',
    E = 'Back to Sign In',
    A = 'CONFIRM';
  var T = {
    components: { BaseText: g, BaseInput: y },
    computed: { passwordLabel: () => w },
    setup() {},
  };
  T.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('base-text'),
      s = e.resolveComponent('base-input');
    return (
      e.openBlock(),
      e.createElementBlock('div', null, [
        e.createVNode(u, null, {
          default: e.withCtx(() => [
            e.createTextVNode(e.toDisplayString(a.passwordLabel), 1),
          ]),
          _: 1,
        }),
        e.createVNode(s, {
          name: 'password',
          autocomplete: 'current-password',
          required: '',
          type: 'password',
        }),
      ])
    );
  };
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.
  
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.
  
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
  var I = function () {
    return (I =
      Object.assign ||
      function (t) {
        for (var e, n = 1, r = arguments.length; n < r; n++)
          for (var o in (e = arguments[n]))
            Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        return t;
      }).apply(this, arguments);
  };
  function N(t, e) {
    var n = {};
    for (var r in t)
      Object.prototype.hasOwnProperty.call(t, r) &&
        e.indexOf(r) < 0 &&
        (n[r] = t[r]);
    if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
      var o = 0;
      for (r = Object.getOwnPropertySymbols(t); o < r.length; o++)
        e.indexOf(r[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(t, r[o]) &&
          (n[r[o]] = t[r[o]]);
    }
    return n;
  }
  function B(t) {
    var e = 'function' == typeof Symbol && Symbol.iterator,
      n = e && t[e],
      r = 0;
    if (n) return n.call(t);
    if (t && 'number' == typeof t.length)
      return {
        next: function () {
          return (
            t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t }
          );
        },
      };
    throw new TypeError(
      e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
    );
  }
  function k(t, e) {
    var n = 'function' == typeof Symbol && t[Symbol.iterator];
    if (!n) return t;
    var r,
      o,
      i = n.call(t),
      a = [];
    try {
      for (; (void 0 === e || e-- > 0) && !(r = i.next()).done; )
        a.push(r.value);
    } catch (u) {
      o = { error: u };
    } finally {
      try {
        r && !r.done && (n = i.return) && n.call(i);
      } finally {
        if (o) throw o.error;
      }
    }
    return a;
  }
  function P(t, e) {
    for (var n = 0, r = e.length, o = t.length; n < r; n++, o++) t[o] = e[n];
    return t;
  }
  var O = {},
    R = 'xstate.guard';
  function U(t) {
    return Object.keys(t);
  }
  function V(t, e, n) {
    void 0 === n && (n = '.');
    var r = M(t, n),
      o = M(e, n);
    return et(o)
      ? !!et(r) && o === r
      : et(r)
      ? r in o
      : U(r).every(function (t) {
          return t in o && V(r[t], o[t]);
        });
  }
  function j(t) {
    try {
      return et(t) || 'number' == typeof t ? '' + t : t.type;
    } catch (e) {
      throw new Error(
        'Events must be strings or objects with a string event.type property.'
      );
    }
  }
  function D(t, e) {
    try {
      return X(t) ? t : t.toString().split(e);
    } catch (n) {
      throw new Error("'" + t + "' is not a valid state path.");
    }
  }
  function M(t, e) {
    return 'object' == typeof (n = t) &&
      'value' in n &&
      'context' in n &&
      'event' in n &&
      '_event' in n
      ? t.value
      : X(t)
      ? L(t)
      : 'string' != typeof t
      ? t
      : L(D(t, e));
    var n;
  }
  function L(t) {
    if (1 === t.length) return t[0];
    for (var e = {}, n = e, r = 0; r < t.length - 1; r++)
      r === t.length - 2
        ? (n[t[r]] = t[r + 1])
        : ((n[t[r]] = {}), (n = n[t[r]]));
    return e;
  }
  function F(t, e) {
    for (var n = {}, r = U(t), o = 0; o < r.length; o++) {
      var i = r[o];
      n[i] = e(t[i], i, t, o);
    }
    return n;
  }
  function $(t, e, n) {
    var r,
      o,
      i = {};
    try {
      for (var a = B(U(t)), u = a.next(); !u.done; u = a.next()) {
        var s = u.value,
          c = t[s];
        n(c) && (i[s] = e(c, s, t));
      }
    } catch (l) {
      r = { error: l };
    } finally {
      try {
        u && !u.done && (o = a.return) && o.call(a);
      } finally {
        if (r) throw r.error;
      }
    }
    return i;
  }
  var z = function (t) {
    return function (e) {
      var n,
        r,
        o = e;
      try {
        for (var i = B(t), a = i.next(); !a.done; a = i.next()) {
          o = o[a.value];
        }
      } catch (u) {
        n = { error: u };
      } finally {
        try {
          a && !a.done && (r = i.return) && r.call(i);
        } finally {
          if (n) throw n.error;
        }
      }
      return o;
    };
  };
  function H(t) {
    return t
      ? et(t)
        ? [[t]]
        : W(
            U(t).map(function (e) {
              var n = t[e];
              return 'string' == typeof n || (n && Object.keys(n).length)
                ? H(t[e]).map(function (t) {
                    return [e].concat(t);
                  })
                : [[e]];
            })
          )
      : [[]];
  }
  function W(t) {
    var e;
    return (e = []).concat.apply(e, P([], k(t)));
  }
  function Y(t) {
    return X(t) ? t : [t];
  }
  function q(t) {
    return void 0 === t ? [] : Y(t);
  }
  function G(t, e, n) {
    var r, o;
    if (tt(t)) return t(e, n.data);
    var i = {};
    try {
      for (var a = B(Object.keys(t)), u = a.next(); !u.done; u = a.next()) {
        var s = u.value,
          c = t[s];
        tt(c) ? (i[s] = c(e, n.data)) : (i[s] = c);
      }
    } catch (l) {
      r = { error: l };
    } finally {
      try {
        u && !u.done && (o = a.return) && o.call(a);
      } finally {
        if (r) throw r.error;
      }
    }
    return i;
  }
  function K(t) {
    return (
      t instanceof Promise ||
      !(null === t || (!tt(t) && 'object' != typeof t) || !tt(t.then))
    );
  }
  function J(t, e) {
    var n,
      r,
      o = k([[], []], 2),
      i = o[0],
      a = o[1];
    try {
      for (var u = B(t), s = u.next(); !s.done; s = u.next()) {
        var c = s.value;
        e(c) ? i.push(c) : a.push(c);
      }
    } catch (l) {
      n = { error: l };
    } finally {
      try {
        s && !s.done && (r = u.return) && r.call(u);
      } finally {
        if (n) throw n.error;
      }
    }
    return [i, a];
  }
  function Q(t, e) {
    return F(t.states, function (t, n) {
      if (t) {
        var r = (et(e) ? void 0 : e[n]) || (t ? t.current : void 0);
        if (r) return { current: r, states: Q(t, r) };
      }
    });
  }
  function Z(t, e, n, r) {
    return t
      ? n.reduce(function (t, n) {
          var o,
            i,
            a = n.assignment,
            u = { state: r, action: n, _event: e },
            s = {};
          if (tt(a)) s = a(t, e.data, u);
          else
            try {
              for (var c = B(U(a)), l = c.next(); !l.done; l = c.next()) {
                var f = l.value,
                  d = a[f];
                s[f] = tt(d) ? d(t, e.data, u) : d;
              }
            } catch (p) {
              o = { error: p };
            } finally {
              try {
                l && !l.done && (i = c.return) && i.call(c);
              } finally {
                if (o) throw o.error;
              }
            }
          return Object.assign({}, t, s);
        }, t)
      : t;
  }
  function X(t) {
    return Array.isArray(t);
  }
  function tt(t) {
    return 'function' == typeof t;
  }
  function et(t) {
    return 'string' == typeof t;
  }
  function nt(t, e) {
    if (t)
      return et(t)
        ? { type: R, name: t, predicate: e ? e[t] : void 0 }
        : tt(t)
        ? { type: R, name: t.name, predicate: t }
        : t;
  }
  var rt = (function () {
    return ('function' == typeof Symbol && Symbol.observable) || '@@observable';
  })();
  function ot(t) {
    try {
      return '__xstatenode' in t;
    } catch (e) {
      return !1;
    }
  }
  var it,
    at,
    ut,
    st,
    ct = (function () {
      var t = 0;
      return function () {
        return (++t).toString(16);
      };
    })();
  function lt(t, e) {
    return et(t) || 'number' == typeof t ? I({ type: t }, e) : t;
  }
  function ft(t, e) {
    if (!et(t) && '$$type' in t && 'scxml' === t.$$type) return t;
    var n = lt(t);
    return I({ name: n.type, data: n, $$type: 'scxml', type: 'external' }, e);
  }
  function dt(t, e) {
    return Y(e).map(function (e) {
      return void 0 === e || 'string' == typeof e || ot(e)
        ? { target: e, event: t }
        : I(I({}, e), { event: t });
    });
  }
  function pt(t, e, n, r, o) {
    var i = t.options.guards,
      a = { state: o, cond: e, _event: r };
    if (e.type === R) return e.predicate(n, r.data, a);
    var u = i[e.type];
    if (!u)
      throw new Error(
        "Guard '" + e.type + "' is not implemented on machine '" + t.id + "'."
      );
    return u(n, r.data, a);
  }
  function ht(t) {
    return 'string' == typeof t ? { type: t } : t;
  }
  function vt(t, e, n) {
    if ('object' == typeof t) return t;
    var r = function () {};
    return { next: t, error: e || r, complete: n || r };
  }
  ((at = it || (it = {})).Start = 'xstate.start'),
    (at.Stop = 'xstate.stop'),
    (at.Raise = 'xstate.raise'),
    (at.Send = 'xstate.send'),
    (at.Cancel = 'xstate.cancel'),
    (at.NullEvent = ''),
    (at.Assign = 'xstate.assign'),
    (at.After = 'xstate.after'),
    (at.DoneState = 'done.state'),
    (at.DoneInvoke = 'done.invoke'),
    (at.Log = 'xstate.log'),
    (at.Init = 'xstate.init'),
    (at.Invoke = 'xstate.invoke'),
    (at.ErrorExecution = 'error.execution'),
    (at.ErrorCommunication = 'error.communication'),
    (at.ErrorPlatform = 'error.platform'),
    (at.ErrorCustom = 'xstate.error'),
    (at.Update = 'xstate.update'),
    (at.Pure = 'xstate.pure'),
    (at.Choose = 'xstate.choose'),
    ((st = ut || (ut = {})).Parent = '#_parent'),
    (st.Internal = '#_internal');
  var gt = it.Start,
    yt = it.Stop,
    mt = it.Raise,
    bt = it.Send,
    wt = it.Cancel,
    _t = it.NullEvent,
    St = it.Assign;
  it.After, it.DoneState;
  var Ct = it.Log,
    xt = it.Init,
    Et = it.Invoke;
  it.ErrorExecution;
  var At = it.ErrorPlatform,
    Tt = it.ErrorCustom,
    It = it.Update,
    Nt = it.Choose,
    Bt = it.Pure,
    kt = ft({ type: xt });
  function Pt(t, e) {
    return (e && e[t]) || void 0;
  }
  function Ot(t, e) {
    var n;
    if (et(t) || 'number' == typeof t) {
      var r = Pt(t, e);
      n = tt(r) ? { type: t, exec: r } : r || { type: t, exec: void 0 };
    } else if (tt(t)) n = { type: t.name || t.toString(), exec: t };
    else {
      if (tt((r = Pt(t.type, e)))) n = I(I({}, t), { exec: r });
      else if (r) {
        var o = r.type || t.type;
        n = I(I(I({}, r), t), { type: o });
      } else n = t;
    }
    return (
      Object.defineProperty(n, 'toString', {
        value: function () {
          return n.type;
        },
        enumerable: !1,
        configurable: !0,
      }),
      n
    );
  }
  var Rt = function (t, e) {
    return t
      ? (X(t) ? t : [t]).map(function (t) {
          return Ot(t, e);
        })
      : [];
  };
  function Ut(t) {
    var e = Ot(t);
    return I(I({ id: et(t) ? t : e.id }, e), { type: e.type });
  }
  function Vt(t) {
    return et(t) ? { type: mt, event: t } : jt(t, { to: ut.Internal });
  }
  function jt(t, e) {
    return {
      to: e ? e.to : void 0,
      type: bt,
      event: tt(t) ? t : lt(t),
      delay: e ? e.delay : void 0,
      id: e && void 0 !== e.id ? e.id : tt(t) ? t.name : j(t),
    };
  }
  function Dt() {
    return jt(It, I(I({}, t), { to: ut.Parent }));
    var t;
  }
  var Mt = function (t) {
    return { type: St, assignment: t };
  };
  function Lt(t, e) {
    var n = it.DoneState + '.' + t,
      r = {
        type: n,
        data: e,
        toString: function () {
          return n;
        },
      };
    return r;
  }
  function Ft(t, e) {
    var n = it.DoneInvoke + '.' + t,
      r = {
        type: n,
        data: e,
        toString: function () {
          return n;
        },
      };
    return r;
  }
  function $t(t, e) {
    var n = it.ErrorPlatform + '.' + t,
      r = {
        type: n,
        data: e,
        toString: function () {
          return n;
        },
      };
    return r;
  }
  function zt(t, e, n, r, o, i) {
    void 0 === i && (i = !1);
    var a = k(
        i
          ? [[], o]
          : J(o, function (t) {
              return t.type === St;
            }),
        2
      ),
      u = a[0],
      s = a[1],
      c = u.length ? Z(n, r, u, e) : n,
      l = i ? [n] : void 0;
    return [
      W(
        s
          .map(function (n) {
            var o;
            switch (n.type) {
              case mt:
                return { type: mt, _event: ft(n.event) };
              case bt:
                return (function (t, e, n, r) {
                  var o,
                    i = { _event: n },
                    a = ft(tt(t.event) ? t.event(e, n.data, i) : t.event);
                  if (et(t.delay)) {
                    var u = r && r[t.delay];
                    o = tt(u) ? u(e, n.data, i) : u;
                  } else o = tt(t.delay) ? t.delay(e, n.data, i) : t.delay;
                  var s = tt(t.to) ? t.to(e, n.data, i) : t.to;
                  return I(I({}, t), {
                    to: s,
                    _event: a,
                    event: a.data,
                    delay: o,
                  });
                })(n, c, r, t.options.delays);
              case Ct:
                return (function (t, e, n) {
                  return I(I({}, t), {
                    value: et(t.expr)
                      ? t.expr
                      : t.expr(e, n.data, { _event: n }),
                  });
                })(n, c, r);
              case Nt:
                if (
                  !(f =
                    null ===
                      (o = n.conds.find(function (n) {
                        var o = nt(n.cond, t.options.guards);
                        return !o || pt(t, o, c, r, e);
                      })) || void 0 === o
                      ? void 0
                      : o.actions)
                )
                  return [];
                var a = k(zt(t, e, c, r, Rt(q(f), t.options.actions), i), 2),
                  u = a[0],
                  s = a[1];
                return (c = s), null == l || l.push(c), u;
              case Bt:
                var f;
                if (!(f = n.get(c, r.data))) return [];
                var d = k(zt(t, e, c, r, Rt(q(f), t.options.actions), i), 2),
                  p = d[0],
                  h = d[1];
                return (c = h), null == l || l.push(c), p;
              case yt:
                return (function (t, e, n) {
                  var r = tt(t.activity) ? t.activity(e, n.data) : t.activity,
                    o = 'string' == typeof r ? { id: r } : r;
                  return { type: it.Stop, activity: o };
                })(n, c, r);
              case St:
                (c = Z(c, r, [n], e)), null == l || l.push(c);
                break;
              default:
                var v = Ot(n, t.options.actions),
                  g = v.exec;
                if (g && l) {
                  var y = l.length - 1;
                  v.exec = function (t) {
                    for (var e = [], n = 1; n < arguments.length; n++)
                      e[n - 1] = arguments[n];
                    null == g || g.apply(void 0, P([l[y]], k(e)));
                  };
                }
                return v;
            }
          })
          .filter(function (t) {
            return !!t;
          })
      ),
      c,
    ];
  }
  var Ht = function (t) {
    return 'atomic' === t.type || 'final' === t.type;
  };
  function Wt(t) {
    return U(t.states).map(function (e) {
      return t.states[e];
    });
  }
  function Yt(t) {
    var e = [t];
    return Ht(t) ? e : e.concat(W(Wt(t).map(Yt)));
  }
  function qt(t, e) {
    var n,
      r,
      o,
      i,
      a,
      u,
      s,
      c,
      l = Kt(new Set(t)),
      f = new Set(e);
    try {
      for (var d = B(f), p = d.next(); !p.done; p = d.next())
        for (var h = (C = p.value).parent; h && !f.has(h); )
          f.add(h), (h = h.parent);
    } catch (x) {
      n = { error: x };
    } finally {
      try {
        p && !p.done && (r = d.return) && r.call(d);
      } finally {
        if (n) throw n.error;
      }
    }
    var v = Kt(f);
    try {
      for (var g = B(f), y = g.next(); !y.done; y = g.next()) {
        if (
          'compound' !== (C = y.value).type ||
          (v.get(C) && v.get(C).length)
        ) {
          if ('parallel' === C.type)
            try {
              for (
                var m = ((a = void 0), B(Wt(C))), b = m.next();
                !b.done;
                b = m.next()
              ) {
                var w = b.value;
                'history' !== w.type &&
                  (f.has(w) ||
                    (f.add(w),
                    l.get(w)
                      ? l.get(w).forEach(function (t) {
                          return f.add(t);
                        })
                      : w.initialStateNodes.forEach(function (t) {
                          return f.add(t);
                        })));
              }
            } catch (E) {
              a = { error: E };
            } finally {
              try {
                b && !b.done && (u = m.return) && u.call(m);
              } finally {
                if (a) throw a.error;
              }
            }
        } else
          l.get(C)
            ? l.get(C).forEach(function (t) {
                return f.add(t);
              })
            : C.initialStateNodes.forEach(function (t) {
                return f.add(t);
              });
      }
    } catch (A) {
      o = { error: A };
    } finally {
      try {
        y && !y.done && (i = g.return) && i.call(g);
      } finally {
        if (o) throw o.error;
      }
    }
    try {
      for (var _ = B(f), S = _.next(); !S.done; S = _.next()) {
        var C;
        for (h = (C = S.value).parent; h && !f.has(h); )
          f.add(h), (h = h.parent);
      }
    } catch (T) {
      s = { error: T };
    } finally {
      try {
        S && !S.done && (c = _.return) && c.call(_);
      } finally {
        if (s) throw s.error;
      }
    }
    return f;
  }
  function Gt(t, e) {
    var n = e.get(t);
    if (!n) return {};
    if ('compound' === t.type) {
      var r = n[0];
      if (!r) return {};
      if (Ht(r)) return r.key;
    }
    var o = {};
    return (
      n.forEach(function (t) {
        o[t.key] = Gt(t, e);
      }),
      o
    );
  }
  function Kt(t) {
    var e,
      n,
      r = new Map();
    try {
      for (var o = B(t), i = o.next(); !i.done; i = o.next()) {
        var a = i.value;
        r.has(a) || r.set(a, []),
          a.parent &&
            (r.has(a.parent) || r.set(a.parent, []), r.get(a.parent).push(a));
      }
    } catch (u) {
      e = { error: u };
    } finally {
      try {
        i && !i.done && (n = o.return) && n.call(o);
      } finally {
        if (e) throw e.error;
      }
    }
    return r;
  }
  function Jt(t, e) {
    return Gt(t, Kt(qt([t], e)));
  }
  function Qt(t, e) {
    return Array.isArray(t)
      ? t.some(function (t) {
          return t === e;
        })
      : t instanceof Set && t.has(e);
  }
  function Zt(t, e) {
    return 'compound' === e.type
      ? Wt(e).some(function (e) {
          return 'final' === e.type && Qt(t, e);
        })
      : 'parallel' === e.type &&
          Wt(e).every(function (e) {
            return Zt(t, e);
          });
  }
  function Xt(t, e) {
    if (t === e) return !0;
    if (void 0 === t || void 0 === e) return !1;
    if (et(t) || et(e)) return t === e;
    var n = U(t),
      r = U(e);
    return (
      n.length === r.length &&
      n.every(function (n) {
        return Xt(t[n], e[n]);
      })
    );
  }
  var te = (function () {
      function t(t) {
        var e,
          n,
          r = this;
        (this.actions = []),
          (this.activities = O),
          (this.meta = {}),
          (this.events = []),
          (this.value = t.value),
          (this.context = t.context),
          (this._event = t._event),
          (this._sessionid = t._sessionid),
          (this.event = this._event.data),
          (this.historyValue = t.historyValue),
          (this.history = t.history),
          (this.actions = t.actions || []),
          (this.activities = t.activities || O),
          (this.meta =
            (void 0 === (n = t.configuration) && (n = []),
            n.reduce(function (t, e) {
              return void 0 !== e.meta && (t[e.id] = e.meta), t;
            }, {}))),
          (this.events = t.events || []),
          (this.matches = this.matches.bind(this)),
          (this.toStrings = this.toStrings.bind(this)),
          (this.configuration = t.configuration),
          (this.transitions = t.transitions),
          (this.children = t.children),
          (this.done = !!t.done),
          (this.tags = null !== (e = t.tags) && void 0 !== e ? e : new Set()),
          Object.defineProperty(this, 'nextEvents', {
            get: function () {
              return (function (t) {
                return P(
                  [],
                  k(
                    new Set(
                      W(
                        P(
                          [],
                          k(
                            t.map(function (t) {
                              return t.ownEvents;
                            })
                          )
                        )
                      )
                    )
                  )
                );
              })(r.configuration);
            },
          });
      }
      return (
        (t.from = function (e, n) {
          return e instanceof t
            ? e.context !== n
              ? new t({
                  value: e.value,
                  context: n,
                  _event: e._event,
                  _sessionid: null,
                  historyValue: e.historyValue,
                  history: e.history,
                  actions: [],
                  activities: e.activities,
                  meta: {},
                  events: [],
                  configuration: [],
                  transitions: [],
                  children: {},
                })
              : e
            : new t({
                value: e,
                context: n,
                _event: kt,
                _sessionid: null,
                historyValue: void 0,
                history: void 0,
                actions: [],
                activities: void 0,
                meta: void 0,
                events: [],
                configuration: [],
                transitions: [],
                children: {},
              });
        }),
        (t.create = function (e) {
          return new t(e);
        }),
        (t.inert = function (e, n) {
          if (e instanceof t) {
            if (!e.actions.length) return e;
            var r = kt;
            return new t({
              value: e.value,
              context: n,
              _event: r,
              _sessionid: null,
              historyValue: e.historyValue,
              history: e.history,
              activities: e.activities,
              configuration: e.configuration,
              transitions: [],
              children: {},
            });
          }
          return t.from(e, n);
        }),
        (t.prototype.toStrings = function (t, e) {
          var n = this;
          if (
            (void 0 === t && (t = this.value), void 0 === e && (e = '.'), et(t))
          )
            return [t];
          var r = U(t);
          return r.concat.apply(
            r,
            P(
              [],
              k(
                r.map(function (r) {
                  return n.toStrings(t[r], e).map(function (t) {
                    return r + e + t;
                  });
                })
              )
            )
          );
        }),
        (t.prototype.toJSON = function () {
          var t = this;
          t.configuration, t.transitions;
          var e = t.tags,
            n = N(t, ['configuration', 'transitions', 'tags']);
          return I(I({}, n), { tags: Array.from(e) });
        }),
        (t.prototype.matches = function (t) {
          return V(t, this.value);
        }),
        (t.prototype.hasTag = function (t) {
          return this.tags.has(t);
        }),
        t
      );
    })(),
    ee = [],
    ne = function (t, e) {
      ee.push(t);
      var n = e(t);
      return ee.pop(), n;
    };
  function re(t) {
    return {
      id: t,
      send: function () {},
      subscribe: function () {
        return { unsubscribe: function () {} };
      },
      getSnapshot: function () {},
      toJSON: function () {
        return { id: t };
      },
    };
  }
  function oe(t, e, n) {
    var r = re(e);
    if (((r.deferred = !0), ot(t))) {
      var o = (r.state = ne(void 0, function () {
        return (n ? t.withContext(n) : t).initialState;
      }));
      r.getSnapshot = function () {
        return o;
      };
    }
    return r;
  }
  function ie(t) {
    if ('string' == typeof t) {
      var e = {
        type: t,
        toString: function () {
          return t;
        },
      };
      return e;
    }
    return t;
  }
  function ae(t) {
    return I(I({ type: Et }, t), {
      toJSON: function () {
        t.onDone, t.onError;
        var e = N(t, ['onDone', 'onError']);
        return I(I({}, e), { type: Et, src: ie(t.src) });
      },
    });
  }
  var ue = {},
    se = function (t) {
      return '#' === t[0];
    },
    ce = (function () {
      function t(e, n, r) {
        var o,
          i = this;
        void 0 === r && (r = e.context),
          (this.config = e),
          (this._context = r),
          (this.order = -1),
          (this.__xstatenode = !0),
          (this.__cache = {
            events: void 0,
            relativeValue: new Map(),
            initialStateValue: void 0,
            initialState: void 0,
            on: void 0,
            transitions: void 0,
            candidates: {},
            delayedTransitions: void 0,
          }),
          (this.idMap = {}),
          (this.tags = []),
          (this.options = Object.assign(
            {
              actions: {},
              guards: {},
              services: {},
              activities: {},
              delays: {},
            },
            n
          )),
          (this.parent = this.options._parent),
          (this.key =
            this.config.key ||
            this.options._key ||
            this.config.id ||
            '(machine)'),
          (this.machine = this.parent ? this.parent.machine : this),
          (this.path = this.parent ? this.parent.path.concat(this.key) : []),
          (this.delimiter =
            this.config.delimiter ||
            (this.parent ? this.parent.delimiter : '.')),
          (this.id =
            this.config.id ||
            P([this.machine.key], k(this.path)).join(this.delimiter)),
          (this.version = this.parent
            ? this.parent.version
            : this.config.version),
          (this.type =
            this.config.type ||
            (this.config.parallel
              ? 'parallel'
              : this.config.states && U(this.config.states).length
              ? 'compound'
              : this.config.history
              ? 'history'
              : 'atomic')),
          (this.schema = this.parent
            ? this.machine.schema
            : null !== (o = this.config.schema) && void 0 !== o
            ? o
            : {}),
          (this.initial = this.config.initial),
          (this.states = this.config.states
            ? F(this.config.states, function (e, n) {
                var r,
                  o = new t(e, { _parent: i, _key: n });
                return (
                  Object.assign(i.idMap, I((((r = {})[o.id] = o), r), o.idMap)),
                  o
                );
              })
            : ue);
        var a = 0;
        !(function t(e) {
          var n, r;
          e.order = a++;
          try {
            for (var o = B(Wt(e)), i = o.next(); !i.done; i = o.next()) {
              t(i.value);
            }
          } catch (u) {
            n = { error: u };
          } finally {
            try {
              i && !i.done && (r = o.return) && r.call(o);
            } finally {
              if (n) throw n.error;
            }
          }
        })(this),
          (this.history =
            !0 === this.config.history ? 'shallow' : this.config.history || !1),
          (this._transient =
            !!this.config.always ||
            (!!this.config.on &&
              (Array.isArray(this.config.on)
                ? this.config.on.some(function (t) {
                    return '' === t.event;
                  })
                : '' in this.config.on))),
          (this.strict = !!this.config.strict),
          (this.onEntry = q(this.config.entry || this.config.onEntry).map(
            function (t) {
              return Ot(t);
            }
          )),
          (this.onExit = q(this.config.exit || this.config.onExit).map(
            function (t) {
              return Ot(t);
            }
          )),
          (this.meta = this.config.meta),
          (this.doneData = 'final' === this.type ? this.config.data : void 0),
          (this.invoke = q(this.config.invoke).map(function (t, e) {
            var n, r;
            if (ot(t))
              return (
                (i.machine.options.services = I(
                  (((n = {})[t.id] = t), n),
                  i.machine.options.services
                )),
                ae({ src: t.id, id: t.id })
              );
            if (et(t.src))
              return ae(I(I({}, t), { id: t.id || t.src, src: t.src }));
            if (ot(t.src) || tt(t.src)) {
              var o = i.id + ':invocation[' + e + ']';
              return (
                (i.machine.options.services = I(
                  (((r = {})[o] = t.src), r),
                  i.machine.options.services
                )),
                ae(I(I({ id: o }, t), { src: o }))
              );
            }
            var a = t.src;
            return ae(I(I({ id: a.type }, t), { src: a }));
          })),
          (this.activities = q(this.config.activities)
            .concat(this.invoke)
            .map(function (t) {
              return Ut(t);
            })),
          (this.transition = this.transition.bind(this)),
          (this.tags = q(this.config.tags));
      }
      return (
        (t.prototype._init = function () {
          this.__cache.transitions ||
            Yt(this).forEach(function (t) {
              return t.on;
            });
        }),
        (t.prototype.withConfig = function (e, n) {
          var r = this.options,
            o = r.actions,
            i = r.activities,
            a = r.guards,
            u = r.services,
            s = r.delays;
          return new t(
            this.config,
            {
              actions: I(I({}, o), e.actions),
              activities: I(I({}, i), e.activities),
              guards: I(I({}, a), e.guards),
              services: I(I({}, u), e.services),
              delays: I(I({}, s), e.delays),
            },
            null != n ? n : this.context
          );
        }),
        (t.prototype.withContext = function (e) {
          return new t(this.config, this.options, e);
        }),
        Object.defineProperty(t.prototype, 'context', {
          get: function () {
            return tt(this._context) ? this._context() : this._context;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, 'definition', {
          get: function () {
            return {
              id: this.id,
              key: this.key,
              version: this.version,
              context: this.context,
              type: this.type,
              initial: this.initial,
              history: this.history,
              states: F(this.states, function (t) {
                return t.definition;
              }),
              on: this.on,
              transitions: this.transitions,
              entry: this.onEntry,
              exit: this.onExit,
              activities: this.activities || [],
              meta: this.meta,
              order: this.order || -1,
              data: this.doneData,
              invoke: this.invoke,
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.toJSON = function () {
          return this.definition;
        }),
        Object.defineProperty(t.prototype, 'on', {
          get: function () {
            if (this.__cache.on) return this.__cache.on;
            var t = this.transitions;
            return (this.__cache.on = t.reduce(function (t, e) {
              return (
                (t[e.eventType] = t[e.eventType] || []),
                t[e.eventType].push(e),
                t
              );
            }, {}));
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, 'after', {
          get: function () {
            return (
              this.__cache.delayedTransitions ||
              ((this.__cache.delayedTransitions = this.getDelayedTransitions()),
              this.__cache.delayedTransitions)
            );
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, 'transitions', {
          get: function () {
            return (
              this.__cache.transitions ||
              ((this.__cache.transitions = this.formatTransitions()),
              this.__cache.transitions)
            );
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.getCandidates = function (t) {
          if (this.__cache.candidates[t]) return this.__cache.candidates[t];
          var e = '' === t,
            n = this.transitions.filter(function (n) {
              var r = n.eventType === t;
              return e ? r : r || '*' === n.eventType;
            });
          return (this.__cache.candidates[t] = n), n;
        }),
        (t.prototype.getDelayedTransitions = function () {
          var t = this,
            e = this.config.after;
          if (!e) return [];
          var n = function (e, n) {
            var r = (function (t, e) {
              var n = e ? '#' + e : '';
              return it.After + '(' + t + ')' + n;
            })(tt(e) ? t.id + ':delay[' + n + ']' : e, t.id);
            return (
              t.onEntry.push(jt(r, { delay: e })),
              t.onExit.push({ type: wt, sendId: r }),
              r
            );
          };
          return (
            X(e)
              ? e.map(function (t, e) {
                  var r = n(t.delay, e);
                  return I(I({}, t), { event: r });
                })
              : W(
                  U(e).map(function (t, r) {
                    var o = e[t],
                      i = et(o) ? { target: o } : o,
                      a = isNaN(+t) ? t : +t,
                      u = n(a, r);
                    return q(i).map(function (t) {
                      return I(I({}, t), { event: u, delay: a });
                    });
                  })
                )
          ).map(function (e) {
            var n = e.delay;
            return I(I({}, t.formatTransition(e)), { delay: n });
          });
        }),
        (t.prototype.getStateNodes = function (t) {
          var e,
            n = this;
          if (!t) return [];
          var r = t instanceof te ? t.value : M(t, this.delimiter);
          if (et(r)) {
            var o = this.getStateNode(r).initial;
            return void 0 !== o
              ? this.getStateNodes((((e = {})[r] = o), e))
              : [this, this.states[r]];
          }
          var i = U(r),
            a = i.map(function (t) {
              return n.getStateNode(t);
            });
          return (
            a.push(this),
            a.concat(
              i.reduce(function (t, e) {
                var o = n.getStateNode(e).getStateNodes(r[e]);
                return t.concat(o);
              }, [])
            )
          );
        }),
        (t.prototype.handles = function (t) {
          var e = j(t);
          return this.events.includes(e);
        }),
        (t.prototype.resolveState = function (t) {
          var e = Array.from(qt([], this.getStateNodes(t.value)));
          return new te(
            I(I({}, t), {
              value: this.resolve(t.value),
              configuration: e,
              done: Zt(e, this),
            })
          );
        }),
        (t.prototype.transitionLeafNode = function (t, e, n) {
          var r = this.getStateNode(t).next(e, n);
          return r && r.transitions.length ? r : this.next(e, n);
        }),
        (t.prototype.transitionCompoundNode = function (t, e, n) {
          var r = U(t),
            o = this.getStateNode(r[0])._transition(t[r[0]], e, n);
          return o && o.transitions.length ? o : this.next(e, n);
        }),
        (t.prototype.transitionParallelNode = function (t, e, n) {
          var r,
            o,
            i = {};
          try {
            for (var a = B(U(t)), u = a.next(); !u.done; u = a.next()) {
              var s = u.value,
                c = t[s];
              if (c) {
                var l = this.getStateNode(s)._transition(c, e, n);
                l && (i[s] = l);
              }
            }
          } catch (v) {
            r = { error: v };
          } finally {
            try {
              u && !u.done && (o = a.return) && o.call(a);
            } finally {
              if (r) throw r.error;
            }
          }
          var f = U(i).map(function (t) {
              return i[t];
            }),
            d = W(
              f.map(function (t) {
                return t.transitions;
              })
            );
          if (
            !f.some(function (t) {
              return t.transitions.length > 0;
            })
          )
            return this.next(e, n);
          var p = W(
              f.map(function (t) {
                return t.entrySet;
              })
            ),
            h = W(
              U(i).map(function (t) {
                return i[t].configuration;
              })
            );
          return {
            transitions: d,
            entrySet: p,
            exitSet: W(
              f.map(function (t) {
                return t.exitSet;
              })
            ),
            configuration: h,
            source: e,
            actions: W(
              U(i).map(function (t) {
                return i[t].actions;
              })
            ),
          };
        }),
        (t.prototype._transition = function (t, e, n) {
          return et(t)
            ? this.transitionLeafNode(t, e, n)
            : 1 === U(t).length
            ? this.transitionCompoundNode(t, e, n)
            : this.transitionParallelNode(t, e, n);
        }),
        (t.prototype.next = function (t, e) {
          var n,
            r,
            o,
            i = this,
            a = e.name,
            u = [],
            s = [];
          try {
            for (
              var c = B(this.getCandidates(a)), l = c.next();
              !l.done;
              l = c.next()
            ) {
              var f = l.value,
                d = f.cond,
                p = f.in,
                h = t.context,
                v =
                  !p ||
                  (et(p) && se(p)
                    ? t.matches(
                        M(this.getStateNodeById(p).path, this.delimiter)
                      )
                    : V(
                        M(p, this.delimiter),
                        z(this.path.slice(0, -2))(t.value)
                      )),
                g = !1;
              try {
                g = !d || pt(this.machine, d, h, e, t);
              } catch (b) {
                throw new Error(
                  "Unable to evaluate guard '" +
                    (d.name || d.type) +
                    "' in transition for event '" +
                    a +
                    "' in state node '" +
                    this.id +
                    "':\n" +
                    b.message
                );
              }
              if (g && v) {
                void 0 !== f.target && (s = f.target),
                  u.push.apply(u, P([], k(f.actions))),
                  (o = f);
                break;
              }
            }
          } catch (w) {
            n = { error: w };
          } finally {
            try {
              l && !l.done && (r = c.return) && r.call(c);
            } finally {
              if (n) throw n.error;
            }
          }
          if (o) {
            if (!s.length)
              return {
                transitions: [o],
                entrySet: [],
                exitSet: [],
                configuration: t.value ? [this] : [],
                source: t,
                actions: u,
              };
            var y = W(
                s.map(function (e) {
                  return i.getRelativeStateNodes(e, t.historyValue);
                })
              ),
              m = !!o.internal;
            return {
              transitions: [o],
              entrySet: m
                ? []
                : W(
                    y.map(function (t) {
                      return i.nodesFromChild(t);
                    })
                  ),
              exitSet: m ? [] : [this],
              configuration: y,
              source: t,
              actions: u,
            };
          }
        }),
        (t.prototype.nodesFromChild = function (t) {
          if (t.escapes(this)) return [];
          for (var e = [], n = t; n && n !== this; ) e.push(n), (n = n.parent);
          return e.push(this), e;
        }),
        (t.prototype.escapes = function (t) {
          if (this === t) return !1;
          for (var e = this.parent; e; ) {
            if (e === t) return !1;
            e = e.parent;
          }
          return !0;
        }),
        (t.prototype.getActions = function (t, e, n, r) {
          var o,
            i,
            a,
            u,
            s = qt([], r ? this.getStateNodes(r.value) : [this]),
            c = t.configuration.length ? qt(s, t.configuration) : s;
          try {
            for (var l = B(c), f = l.next(); !f.done; f = l.next()) {
              Qt(s, (h = f.value)) || t.entrySet.push(h);
            }
          } catch (_) {
            o = { error: _ };
          } finally {
            try {
              f && !f.done && (i = l.return) && i.call(l);
            } finally {
              if (o) throw o.error;
            }
          }
          try {
            for (var d = B(s), p = d.next(); !p.done; p = d.next()) {
              var h;
              (Qt(c, (h = p.value)) && !Qt(t.exitSet, h.parent)) ||
                t.exitSet.push(h);
            }
          } catch (S) {
            a = { error: S };
          } finally {
            try {
              p && !p.done && (u = d.return) && u.call(d);
            } finally {
              if (a) throw a.error;
            }
          }
          t.source || ((t.exitSet = []), t.entrySet.push(this));
          var v = W(
            t.entrySet.map(function (r) {
              var o = [];
              if ('final' !== r.type) return o;
              var i = r.parent;
              if (!i.parent) return o;
              o.push(
                Lt(r.id, r.doneData),
                Lt(i.id, r.doneData ? G(r.doneData, e, n) : void 0)
              );
              var a = i.parent;
              return (
                'parallel' === a.type &&
                  Wt(a).every(function (e) {
                    return Zt(t.configuration, e);
                  }) &&
                  o.push(Lt(a.id)),
                o
              );
            })
          );
          t.exitSet.sort(function (t, e) {
            return e.order - t.order;
          }),
            t.entrySet.sort(function (t, e) {
              return t.order - e.order;
            });
          var g = new Set(t.entrySet),
            y = new Set(t.exitSet),
            m = k(
              [
                W(
                  Array.from(g).map(function (t) {
                    return P(
                      P(
                        [],
                        k(
                          t.activities.map(function (t) {
                            return (function (t) {
                              var e = Ut(t);
                              return {
                                type: it.Start,
                                activity: e,
                                exec: void 0,
                              };
                            })(t);
                          })
                        )
                      ),
                      k(t.onEntry)
                    );
                  })
                ).concat(v.map(Vt)),
                W(
                  Array.from(y).map(function (t) {
                    return P(
                      P([], k(t.onExit)),
                      k(
                        t.activities.map(function (t) {
                          return (function (t) {
                            var e = tt(t) ? t : Ut(t);
                            return { type: it.Stop, activity: e, exec: void 0 };
                          })(t);
                        })
                      )
                    );
                  })
                ),
              ],
              2
            ),
            b = m[0],
            w = m[1];
          return Rt(
            w.concat(t.actions).concat(b),
            this.machine.options.actions
          );
        }),
        (t.prototype.transition = function (t, e, n) {
          void 0 === t && (t = this.initialState);
          var r,
            o,
            i = ft(e);
          if (t instanceof te)
            r = void 0 === n ? t : this.resolveState(te.from(t, n));
          else {
            var a = et(t)
                ? this.resolve(L(this.getResolvedPath(t)))
                : this.resolve(t),
              u = null != n ? n : this.machine.context;
            r = this.resolveState(te.from(a, u));
          }
          if (
            this.strict &&
            !this.events.includes(i.name) &&
            ((o = i.name), !/^(done|error)\./.test(o))
          )
            throw new Error(
              "Machine '" + this.id + "' does not accept event '" + i.name + "'"
            );
          var s = this._transition(r.value, r, i) || {
              transitions: [],
              configuration: [],
              entrySet: [],
              exitSet: [],
              source: r,
              actions: [],
            },
            c = qt([], this.getStateNodes(r.value)),
            l = s.configuration.length ? qt(c, s.configuration) : c;
          return (
            (s.configuration = P([], k(l))), this.resolveTransition(s, r, i)
          );
        }),
        (t.prototype.resolveRaisedTransition = function (t, e, n) {
          var r,
            o = t.actions;
          return (
            ((t = this.transition(t, e))._event = n),
            (t.event = n.data),
            (r = t.actions).unshift.apply(r, P([], k(o))),
            t
          );
        }),
        (t.prototype.resolveTransition = function (t, e, n, r) {
          var o,
            i,
            a = this;
          void 0 === n && (n = kt), void 0 === r && (r = this.machine.context);
          var u = t.configuration,
            s = !e || t.transitions.length > 0,
            c = s ? Jt(this.machine, u) : void 0,
            l = e
              ? e.historyValue
                ? e.historyValue
                : t.source
                ? this.machine.historyValue(e.value)
                : void 0
              : void 0,
            f = e ? e.context : r,
            d = this.getActions(t, f, n, e),
            p = e ? I({}, e.activities) : {};
          try {
            for (var h = B(d), v = h.next(); !v.done; v = h.next()) {
              var g = v.value;
              g.type === gt
                ? (p[g.activity.id || g.activity.type] = g)
                : g.type === yt && (p[g.activity.id || g.activity.type] = !1);
            }
          } catch (D) {
            o = { error: D };
          } finally {
            try {
              v && !v.done && (i = h.return) && i.call(h);
            } finally {
              if (o) throw o.error;
            }
          }
          var y,
            m,
            b = k(
              zt(this, e, f, n, d, this.machine.config.preserveActionOrder),
              2
            ),
            w = b[0],
            _ = b[1],
            S = k(
              J(w, function (t) {
                return t.type === mt || (t.type === bt && t.to === ut.Internal);
              }),
              2
            ),
            C = S[0],
            x = S[1],
            E = w
              .filter(function (t) {
                var e;
                return (
                  t.type === gt &&
                  (null === (e = t.activity) || void 0 === e
                    ? void 0
                    : e.type) === Et
                );
              })
              .reduce(
                function (t, e) {
                  return (
                    (t[e.activity.id] = (function (t, e, n, r) {
                      var o,
                        i = ht(t.src),
                        a =
                          null ===
                            (o = null == e ? void 0 : e.options.services) ||
                          void 0 === o
                            ? void 0
                            : o[i.type],
                        u = t.data ? G(t.data, n, r) : void 0,
                        s = a ? oe(a, t.id, u) : re(t.id);
                      return (s.meta = t), s;
                    })(e.activity, a.machine, _, n)),
                    t
                  );
                },
                e ? I({}, e.children) : {}
              ),
            A = c ? t.configuration : e ? e.configuration : [],
            T = Zt(A, this),
            N = new te({
              value: c || e.value,
              context: _,
              _event: n,
              _sessionid: e ? e._sessionid : null,
              historyValue: c
                ? l
                  ? ((y = l), (m = c), { current: m, states: Q(y, m) })
                  : void 0
                : e
                ? e.historyValue
                : void 0,
              history: !c || t.source ? e : void 0,
              actions: c ? x : [],
              activities: c ? p : e ? e.activities : {},
              events: [],
              configuration: A,
              transitions: t.transitions,
              children: E,
              done: T,
              tags: null == e ? void 0 : e.tags,
            }),
            P = f !== _;
          N.changed = n.name === It || P;
          var O = N.history;
          O && delete O.history;
          var R =
            !T &&
            (this._transient ||
              u.some(function (t) {
                return t._transient;
              }));
          if (!(s || (R && '' !== n.name))) return N;
          var U = N;
          if (!T)
            for (
              R && (U = this.resolveRaisedTransition(U, { type: _t }, n));
              C.length;

            ) {
              var V = C.shift();
              U = this.resolveRaisedTransition(U, V._event, n);
            }
          var j =
            U.changed ||
            (O
              ? !!U.actions.length ||
                P ||
                typeof O.value != typeof U.value ||
                !Xt(U.value, O.value)
              : void 0);
          return (
            (U.changed = j),
            (U.history = O),
            (U.tags = new Set(
              W(
                U.configuration.map(function (t) {
                  return t.tags;
                })
              )
            )),
            U
          );
        }),
        (t.prototype.getStateNode = function (t) {
          if (se(t)) return this.machine.getStateNodeById(t);
          if (!this.states)
            throw new Error(
              "Unable to retrieve child state '" +
                t +
                "' from '" +
                this.id +
                "'; no child states exist."
            );
          var e = this.states[t];
          if (!e)
            throw new Error(
              "Child state '" + t + "' does not exist on '" + this.id + "'"
            );
          return e;
        }),
        (t.prototype.getStateNodeById = function (t) {
          var e = se(t) ? t.slice('#'.length) : t;
          if (e === this.id) return this;
          var n = this.machine.idMap[e];
          if (!n)
            throw new Error(
              "Child state node '#" +
                e +
                "' does not exist on machine '" +
                this.id +
                "'"
            );
          return n;
        }),
        (t.prototype.getStateNodeByPath = function (t) {
          if ('string' == typeof t && se(t))
            try {
              return this.getStateNodeById(t.slice(1));
            } catch (o) {}
          for (var e = D(t, this.delimiter).slice(), n = this; e.length; ) {
            var r = e.shift();
            if (!r.length) break;
            n = n.getStateNode(r);
          }
          return n;
        }),
        (t.prototype.resolve = function (t) {
          var e,
            n = this;
          if (!t) return this.initialStateValue || ue;
          switch (this.type) {
            case 'parallel':
              return F(this.initialStateValue, function (e, r) {
                return e ? n.getStateNode(r).resolve(t[r] || e) : ue;
              });
            case 'compound':
              if (et(t)) {
                var r = this.getStateNode(t);
                return 'parallel' === r.type || 'compound' === r.type
                  ? (((e = {})[t] = r.initialStateValue), e)
                  : t;
              }
              return U(t).length
                ? F(t, function (t, e) {
                    return t ? n.getStateNode(e).resolve(t) : ue;
                  })
                : this.initialStateValue || {};
            default:
              return t || ue;
          }
        }),
        (t.prototype.getResolvedPath = function (t) {
          if (se(t)) {
            var e = this.machine.idMap[t.slice('#'.length)];
            if (!e) throw new Error("Unable to find state node '" + t + "'");
            return e.path;
          }
          return D(t, this.delimiter);
        }),
        Object.defineProperty(t.prototype, 'initialStateValue', {
          get: function () {
            var t, e;
            if (this.__cache.initialStateValue)
              return this.__cache.initialStateValue;
            if ('parallel' === this.type)
              e = $(
                this.states,
                function (t) {
                  return t.initialStateValue || ue;
                },
                function (t) {
                  return !('history' === t.type);
                }
              );
            else if (void 0 !== this.initial) {
              if (!this.states[this.initial])
                throw new Error(
                  "Initial state '" +
                    this.initial +
                    "' not found on '" +
                    this.key +
                    "'"
                );
              e = Ht(this.states[this.initial])
                ? this.initial
                : (((t = {})[this.initial] =
                    this.states[this.initial].initialStateValue),
                  t);
            } else e = {};
            return (
              (this.__cache.initialStateValue = e),
              this.__cache.initialStateValue
            );
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.getInitialState = function (t, e) {
          var n = this.getStateNodes(t);
          return this.resolveTransition(
            {
              configuration: n,
              entrySet: n,
              exitSet: [],
              transitions: [],
              source: void 0,
              actions: [],
            },
            void 0,
            void 0,
            e
          );
        }),
        Object.defineProperty(t.prototype, 'initialState', {
          get: function () {
            this._init();
            var t = this.initialStateValue;
            if (!t)
              throw new Error(
                "Cannot retrieve initial state from simple state '" +
                  this.id +
                  "'."
              );
            return this.getInitialState(t);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, 'target', {
          get: function () {
            var t;
            if ('history' === this.type) {
              var e = this.config;
              t =
                et(e.target) && se(e.target)
                  ? L(
                      this.machine
                        .getStateNodeById(e.target)
                        .path.slice(this.path.length - 1)
                    )
                  : e.target;
            }
            return t;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.getRelativeStateNodes = function (t, e, n) {
          return (
            void 0 === n && (n = !0),
            n
              ? 'history' === t.type
                ? t.resolveHistory(e)
                : t.initialStateNodes
              : [t]
          );
        }),
        Object.defineProperty(t.prototype, 'initialStateNodes', {
          get: function () {
            var t = this;
            return Ht(this)
              ? [this]
              : 'compound' !== this.type || this.initial
              ? W(
                  H(this.initialStateValue).map(function (e) {
                    return t.getFromRelativePath(e);
                  })
                )
              : [this];
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.getFromRelativePath = function (t) {
          if (!t.length) return [this];
          var e = k(t),
            n = e[0],
            r = e.slice(1);
          if (!this.states)
            throw new Error(
              "Cannot retrieve subPath '" + n + "' from node with no states"
            );
          var o = this.getStateNode(n);
          if ('history' === o.type) return o.resolveHistory();
          if (!this.states[n])
            throw new Error(
              "Child state '" + n + "' does not exist on '" + this.id + "'"
            );
          return this.states[n].getFromRelativePath(r);
        }),
        (t.prototype.historyValue = function (t) {
          if (U(this.states).length)
            return {
              current: t || this.initialStateValue,
              states: $(
                this.states,
                function (e, n) {
                  if (!t) return e.historyValue();
                  var r = et(t) ? void 0 : t[n];
                  return e.historyValue(r || e.initialStateValue);
                },
                function (t) {
                  return !t.history;
                }
              ),
            };
        }),
        (t.prototype.resolveHistory = function (t) {
          var e = this;
          if ('history' !== this.type) return [this];
          var n = this.parent;
          if (!t) {
            var r = this.target;
            return r
              ? W(
                  H(r).map(function (t) {
                    return n.getFromRelativePath(t);
                  })
                )
              : n.initialStateNodes;
          }
          var o,
            i,
            a = ((o = n.path),
            (i = 'states'),
            function (t) {
              var e,
                n,
                r = t;
              try {
                for (var a = B(o), u = a.next(); !u.done; u = a.next()) {
                  var s = u.value;
                  r = r[i][s];
                }
              } catch (c) {
                e = { error: c };
              } finally {
                try {
                  u && !u.done && (n = a.return) && n.call(a);
                } finally {
                  if (e) throw e.error;
                }
              }
              return r;
            })(t).current;
          return et(a)
            ? [n.getStateNode(a)]
            : W(
                H(a).map(function (t) {
                  return 'deep' === e.history
                    ? n.getFromRelativePath(t)
                    : [n.states[t[0]]];
                })
              );
        }),
        Object.defineProperty(t.prototype, 'stateIds', {
          get: function () {
            var t = this,
              e = W(
                U(this.states).map(function (e) {
                  return t.states[e].stateIds;
                })
              );
            return [this.id].concat(e);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, 'events', {
          get: function () {
            var t, e, n, r;
            if (this.__cache.events) return this.__cache.events;
            var o = this.states,
              i = new Set(this.ownEvents);
            if (o)
              try {
                for (var a = B(U(o)), u = a.next(); !u.done; u = a.next()) {
                  var s = o[u.value];
                  if (s.states)
                    try {
                      for (
                        var c = ((n = void 0), B(s.events)), l = c.next();
                        !l.done;
                        l = c.next()
                      ) {
                        var f = l.value;
                        i.add('' + f);
                      }
                    } catch (d) {
                      n = { error: d };
                    } finally {
                      try {
                        l && !l.done && (r = c.return) && r.call(c);
                      } finally {
                        if (n) throw n.error;
                      }
                    }
                }
              } catch (p) {
                t = { error: p };
              } finally {
                try {
                  u && !u.done && (e = a.return) && e.call(a);
                } finally {
                  if (t) throw t.error;
                }
              }
            return (this.__cache.events = Array.from(i));
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, 'ownEvents', {
          get: function () {
            var t = new Set(
              this.transitions
                .filter(function (t) {
                  return !(!t.target && !t.actions.length && t.internal);
                })
                .map(function (t) {
                  return t.eventType;
                })
            );
            return Array.from(t);
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.resolveTarget = function (t) {
          var e = this;
          if (void 0 !== t)
            return t.map(function (t) {
              if (!et(t)) return t;
              var n = t[0] === e.delimiter;
              if (n && !e.parent) return e.getStateNodeByPath(t.slice(1));
              var r = n ? e.key + t : t;
              if (!e.parent) return e.getStateNodeByPath(r);
              try {
                return e.parent.getStateNodeByPath(r);
              } catch (o) {
                throw new Error(
                  "Invalid transition definition for state node '" +
                    e.id +
                    "':\n" +
                    o.message
                );
              }
            });
        }),
        (t.prototype.formatTransition = function (t) {
          var e = this,
            n = (function (t) {
              if (void 0 !== t && '' !== t) return q(t);
            })(t.target),
            r =
              'internal' in t
                ? t.internal
                : !n ||
                  n.some(function (t) {
                    return et(t) && t[0] === e.delimiter;
                  }),
            o = this.machine.options.guards,
            i = this.resolveTarget(n),
            a = I(I({}, t), {
              actions: Rt(q(t.actions)),
              cond: nt(t.cond, o),
              target: i,
              source: this,
              internal: r,
              eventType: t.event,
              toJSON: function () {
                return I(I({}, a), {
                  target: a.target
                    ? a.target.map(function (t) {
                        return '#' + t.id;
                      })
                    : void 0,
                  source: '#' + e.id,
                });
              },
            });
          return a;
        }),
        (t.prototype.formatTransitions = function () {
          var t,
            e,
            n,
            r = this;
          if (this.config.on)
            if (Array.isArray(this.config.on)) n = this.config.on;
            else {
              var o = this.config.on,
                i = '*',
                a = o[i],
                u = void 0 === a ? [] : a,
                s = N(o, ['*']);
              n = W(
                U(s)
                  .map(function (t) {
                    return dt(t, s[t]);
                  })
                  .concat(dt('*', u))
              );
            }
          else n = [];
          var c = this.config.always ? dt('', this.config.always) : [],
            l = this.config.onDone
              ? dt(String(Lt(this.id)), this.config.onDone)
              : [],
            f = W(
              this.invoke.map(function (t) {
                var e = [];
                return (
                  t.onDone &&
                    e.push.apply(e, P([], k(dt(String(Ft(t.id)), t.onDone)))),
                  t.onError &&
                    e.push.apply(e, P([], k(dt(String($t(t.id)), t.onError)))),
                  e
                );
              })
            ),
            d = this.after,
            p = W(
              P(P(P(P([], k(l)), k(f)), k(n)), k(c)).map(function (t) {
                return q(t).map(function (t) {
                  return r.formatTransition(t);
                });
              })
            );
          try {
            for (var h = B(d), v = h.next(); !v.done; v = h.next()) {
              var g = v.value;
              p.push(g);
            }
          } catch (y) {
            t = { error: y };
          } finally {
            try {
              v && !v.done && (e = h.return) && e.call(h);
            } finally {
              if (t) throw t.error;
            }
          }
          return p;
        }),
        t
      );
    })();
  function le(t, e) {
    return new ce(t, e);
  }
  var fe = { deferEvents: !1 },
    de = (function () {
      function t(t) {
        (this.processingEvent = !1),
          (this.queue = []),
          (this.initialized = !1),
          (this.options = I(I({}, fe), t));
      }
      return (
        (t.prototype.initialize = function (t) {
          if (((this.initialized = !0), t)) {
            if (!this.options.deferEvents) return void this.schedule(t);
            this.process(t);
          }
          this.flushEvents();
        }),
        (t.prototype.schedule = function (t) {
          if (this.initialized && !this.processingEvent) {
            if (0 !== this.queue.length)
              throw new Error(
                'Event queue should be empty when it is not processing events'
              );
            this.process(t), this.flushEvents();
          } else this.queue.push(t);
        }),
        (t.prototype.clear = function () {
          this.queue = [];
        }),
        (t.prototype.flushEvents = function () {
          for (var t = this.queue.shift(); t; )
            this.process(t), (t = this.queue.shift());
        }),
        (t.prototype.process = function (t) {
          this.processingEvent = !0;
          try {
            t();
          } catch (e) {
            throw (this.clear(), e);
          } finally {
            this.processingEvent = !1;
          }
        }),
        t
      );
    })(),
    pe = new Map(),
    he = 0,
    ve = function () {
      return 'x:' + he++;
    },
    ge = function (t, e) {
      return pe.set(t, e), t;
    },
    ye = function (t) {
      return pe.get(t);
    },
    me = function (t) {
      pe.delete(t);
    };
  function be() {
    return 'undefined' != typeof self
      ? self
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : void 0;
  }
  function we(t) {
    if (be()) {
      var e = (function () {
        var t = be();
        if (t && '__xstate__' in t) return t.__xstate__;
      })();
      e && e.register(t);
    }
  }
  function _e(t, e) {
    void 0 === e && (e = {});
    var n,
      r = t.initialState,
      o = new Set(),
      i = [],
      a = !1,
      u =
        ((n = {
          id: e.id,
          send: function (e) {
            i.push(e),
              (function () {
                if (!a) {
                  for (a = !0; i.length > 0; ) {
                    var e = i.shift();
                    (r = t.transition(r, e, s)),
                      o.forEach(function (t) {
                        return t.next(r);
                      });
                  }
                  a = !1;
                }
              })();
          },
          getSnapshot: function () {
            return r;
          },
          subscribe: function (t, e, n) {
            var i = vt(t, e, n);
            return (
              o.add(i),
              i.next(r),
              {
                unsubscribe: function () {
                  o.delete(i);
                },
              }
            );
          },
        }),
        I(
          {
            subscribe: function () {
              return { unsubscribe: function () {} };
            },
            id: 'anonymous',
            getSnapshot: function () {},
          },
          n
        )),
      s = { parent: e.parent, self: u, id: e.id || 'anonymous', observers: o };
    return (r = t.start ? t.start(s) : r), u;
  }
  var Se,
    Ce,
    xe = { sync: !1, autoForward: !1 };
  ((Ce = Se || (Se = {}))[(Ce.NotStarted = 0)] = 'NotStarted'),
    (Ce[(Ce.Running = 1)] = 'Running'),
    (Ce[(Ce.Stopped = 2)] = 'Stopped');
  var Ee = (function () {
    function t(e, n) {
      var r = this;
      void 0 === n && (n = t.defaultOptions),
        (this.machine = e),
        (this.scheduler = new de()),
        (this.delayedEventsMap = {}),
        (this.listeners = new Set()),
        (this.contextListeners = new Set()),
        (this.stopListeners = new Set()),
        (this.doneListeners = new Set()),
        (this.eventListeners = new Set()),
        (this.sendListeners = new Set()),
        (this.initialized = !1),
        (this.status = Se.NotStarted),
        (this.children = new Map()),
        (this.forwardTo = new Set()),
        (this.init = this.start),
        (this.send = function (t, e) {
          if (X(t)) return r.batch(t), r.state;
          var n = ft(lt(t, e));
          if (r.status === Se.Stopped) return r.state;
          if (r.status !== Se.Running && !r.options.deferEvents)
            throw new Error(
              'Event "' +
                n.name +
                '" was sent to uninitialized service "' +
                r.machine.id +
                '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.\nEvent: ' +
                JSON.stringify(n.data)
            );
          return (
            r.scheduler.schedule(function () {
              r.forward(n);
              var t = r.nextState(n);
              r.update(t, n);
            }),
            r._state
          );
        }),
        (this.sendTo = function (t, e) {
          var n,
            o = r.parent && (e === ut.Parent || r.parent.id === e),
            i = o
              ? r.parent
              : et(e)
              ? r.children.get(e) || ye(e)
              : (n = e) && 'function' == typeof n.send
              ? e
              : void 0;
          if (i)
            'machine' in i
              ? i.send(
                  I(I({}, t), {
                    name: t.name === Tt ? '' + $t(r.id) : t.name,
                    origin: r.sessionId,
                  })
                )
              : i.send(t.data);
          else if (!o)
            throw new Error(
              "Unable to send event to child '" +
                e +
                "' from service '" +
                r.id +
                "'."
            );
        });
      var o = I(I({}, t.defaultOptions), n),
        i = o.clock,
        a = o.logger,
        u = o.parent,
        s = o.id,
        c = void 0 !== s ? s : e.id;
      (this.id = c),
        (this.logger = a),
        (this.clock = i),
        (this.parent = u),
        (this.options = o),
        (this.scheduler = new de({ deferEvents: this.options.deferEvents })),
        (this.sessionId = ve());
    }
    return (
      Object.defineProperty(t.prototype, 'initialState', {
        get: function () {
          var t = this;
          return this._initialState
            ? this._initialState
            : ne(this, function () {
                return (
                  (t._initialState = t.machine.initialState), t._initialState
                );
              });
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, 'state', {
        get: function () {
          return this._state;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.execute = function (t, e) {
        var n, r;
        try {
          for (var o = B(t.actions), i = o.next(); !i.done; i = o.next()) {
            var a = i.value;
            this.exec(a, t, e);
          }
        } catch (u) {
          n = { error: u };
        } finally {
          try {
            i && !i.done && (r = o.return) && r.call(o);
          } finally {
            if (n) throw n.error;
          }
        }
      }),
      (t.prototype.update = function (t, e) {
        var n,
          r,
          o,
          i,
          a,
          u,
          s,
          c,
          l = this;
        if (
          ((t._sessionid = this.sessionId),
          (this._state = t),
          this.options.execute && this.execute(this.state),
          this.children.forEach(function (t) {
            l.state.children[t.id] = t;
          }),
          this.devTools && this.devTools.send(e.data, t),
          t.event)
        )
          try {
            for (
              var f = B(this.eventListeners), d = f.next();
              !d.done;
              d = f.next()
            ) {
              (0, d.value)(t.event);
            }
          } catch (S) {
            n = { error: S };
          } finally {
            try {
              d && !d.done && (r = f.return) && r.call(f);
            } finally {
              if (n) throw n.error;
            }
          }
        try {
          for (var p = B(this.listeners), h = p.next(); !h.done; h = p.next()) {
            (0, h.value)(t, t.event);
          }
        } catch (C) {
          o = { error: C };
        } finally {
          try {
            h && !h.done && (i = p.return) && i.call(p);
          } finally {
            if (o) throw o.error;
          }
        }
        try {
          for (
            var v = B(this.contextListeners), g = v.next();
            !g.done;
            g = v.next()
          ) {
            (0, g.value)(
              this.state.context,
              this.state.history ? this.state.history.context : void 0
            );
          }
        } catch (x) {
          a = { error: x };
        } finally {
          try {
            g && !g.done && (u = v.return) && u.call(v);
          } finally {
            if (a) throw a.error;
          }
        }
        var y = Zt(t.configuration || [], this.machine);
        if (this.state.configuration && y) {
          var m = t.configuration.find(function (t) {
              return 'final' === t.type && t.parent === l.machine;
            }),
            b = m && m.doneData ? G(m.doneData, t.context, e) : void 0;
          try {
            for (
              var w = B(this.doneListeners), _ = w.next();
              !_.done;
              _ = w.next()
            ) {
              (0, _.value)(Ft(this.id, b));
            }
          } catch (E) {
            s = { error: E };
          } finally {
            try {
              _ && !_.done && (c = w.return) && c.call(w);
            } finally {
              if (s) throw s.error;
            }
          }
          this.stop();
        }
      }),
      (t.prototype.onTransition = function (t) {
        return (
          this.listeners.add(t),
          this.status === Se.Running && t(this.state, this.state.event),
          this
        );
      }),
      (t.prototype.subscribe = function (t, e, n) {
        var r,
          o = this;
        if (!t) return { unsubscribe: function () {} };
        var i = n;
        return (
          'function' == typeof t
            ? (r = t)
            : ((r = t.next.bind(t)), (i = t.complete.bind(t))),
          this.listeners.add(r),
          this.status === Se.Running && r(this.state),
          i && this.onDone(i),
          {
            unsubscribe: function () {
              r && o.listeners.delete(r), i && o.doneListeners.delete(i);
            },
          }
        );
      }),
      (t.prototype.onEvent = function (t) {
        return this.eventListeners.add(t), this;
      }),
      (t.prototype.onSend = function (t) {
        return this.sendListeners.add(t), this;
      }),
      (t.prototype.onChange = function (t) {
        return this.contextListeners.add(t), this;
      }),
      (t.prototype.onStop = function (t) {
        return this.stopListeners.add(t), this;
      }),
      (t.prototype.onDone = function (t) {
        return this.doneListeners.add(t), this;
      }),
      (t.prototype.off = function (t) {
        return (
          this.listeners.delete(t),
          this.eventListeners.delete(t),
          this.sendListeners.delete(t),
          this.stopListeners.delete(t),
          this.doneListeners.delete(t),
          this.contextListeners.delete(t),
          this
        );
      }),
      (t.prototype.start = function (t) {
        var e = this;
        if (this.status === Se.Running) return this;
        ge(this.sessionId, this),
          (this.initialized = !0),
          (this.status = Se.Running);
        var n =
          void 0 === t
            ? this.initialState
            : ne(this, function () {
                return !et((n = t)) && 'value' in n && 'history' in n
                  ? e.machine.resolveState(t)
                  : e.machine.resolveState(te.from(t, e.machine.context));
                var n;
              });
        return (
          this.options.devTools && this.attachDev(),
          this.scheduler.initialize(function () {
            e.update(n, kt);
          }),
          this
        );
      }),
      (t.prototype.stop = function () {
        var t,
          e,
          n,
          r,
          o,
          i,
          a,
          u,
          s,
          c,
          l = this;
        try {
          for (var f = B(this.listeners), d = f.next(); !d.done; d = f.next()) {
            var p = d.value;
            this.listeners.delete(p);
          }
        } catch (C) {
          t = { error: C };
        } finally {
          try {
            d && !d.done && (e = f.return) && e.call(f);
          } finally {
            if (t) throw t.error;
          }
        }
        try {
          for (
            var h = B(this.stopListeners), v = h.next();
            !v.done;
            v = h.next()
          ) {
            (p = v.value)(), this.stopListeners.delete(p);
          }
        } catch (x) {
          n = { error: x };
        } finally {
          try {
            v && !v.done && (r = h.return) && r.call(h);
          } finally {
            if (n) throw n.error;
          }
        }
        try {
          for (
            var g = B(this.contextListeners), y = g.next();
            !y.done;
            y = g.next()
          ) {
            p = y.value;
            this.contextListeners.delete(p);
          }
        } catch (E) {
          o = { error: E };
        } finally {
          try {
            y && !y.done && (i = g.return) && i.call(g);
          } finally {
            if (o) throw o.error;
          }
        }
        try {
          for (
            var m = B(this.doneListeners), b = m.next();
            !b.done;
            b = m.next()
          ) {
            p = b.value;
            this.doneListeners.delete(p);
          }
        } catch (A) {
          a = { error: A };
        } finally {
          try {
            b && !b.done && (u = m.return) && u.call(m);
          } finally {
            if (a) throw a.error;
          }
        }
        if (!this.initialized) return this;
        this.state.configuration.forEach(function (t) {
          var e, n;
          try {
            for (
              var r = B(t.definition.exit), o = r.next();
              !o.done;
              o = r.next()
            ) {
              var i = o.value;
              l.exec(i, l.state);
            }
          } catch (a) {
            e = { error: a };
          } finally {
            try {
              o && !o.done && (n = r.return) && n.call(r);
            } finally {
              if (e) throw e.error;
            }
          }
        }),
          this.children.forEach(function (t) {
            tt(t.stop) && t.stop();
          });
        try {
          for (
            var w = B(U(this.delayedEventsMap)), _ = w.next();
            !_.done;
            _ = w.next()
          ) {
            var S = _.value;
            this.clock.clearTimeout(this.delayedEventsMap[S]);
          }
        } catch (T) {
          s = { error: T };
        } finally {
          try {
            _ && !_.done && (c = w.return) && c.call(w);
          } finally {
            if (s) throw s.error;
          }
        }
        return (
          this.scheduler.clear(),
          (this.initialized = !1),
          (this.status = Se.Stopped),
          me(this.sessionId),
          this
        );
      }),
      (t.prototype.batch = function (t) {
        var e = this;
        if (this.status === Se.NotStarted && this.options.deferEvents);
        else if (this.status !== Se.Running)
          throw new Error(
            t.length +
              ' event(s) were sent to uninitialized service "' +
              this.machine.id +
              '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.'
          );
        this.scheduler.schedule(function () {
          var n,
            r,
            o = e.state,
            i = !1,
            a = [],
            u = function (t) {
              var n = ft(t);
              e.forward(n),
                (o = ne(e, function () {
                  return e.machine.transition(o, n);
                })),
                a.push.apply(
                  a,
                  P(
                    [],
                    k(
                      o.actions.map(function (t) {
                        return (
                          (n = o),
                          (r = (e = t).exec),
                          I(I({}, e), {
                            exec:
                              void 0 !== r
                                ? function () {
                                    return r(n.context, n.event, {
                                      action: e,
                                      state: n,
                                      _event: n._event,
                                    });
                                  }
                                : void 0,
                          })
                        );
                        var e, n, r;
                      })
                    )
                  )
                ),
                (i = i || !!o.changed);
            };
          try {
            for (var s = B(t), c = s.next(); !c.done; c = s.next()) {
              u(c.value);
            }
          } catch (l) {
            n = { error: l };
          } finally {
            try {
              c && !c.done && (r = s.return) && r.call(s);
            } finally {
              if (n) throw n.error;
            }
          }
          (o.changed = i), (o.actions = a), e.update(o, ft(t[t.length - 1]));
        });
      }),
      (t.prototype.sender = function (t) {
        return this.send.bind(this, t);
      }),
      (t.prototype.nextState = function (t) {
        var e = this,
          n = ft(t);
        if (
          0 === n.name.indexOf(At) &&
          !this.state.nextEvents.some(function (t) {
            return 0 === t.indexOf(At);
          })
        )
          throw n.data.data;
        return ne(this, function () {
          return e.machine.transition(e.state, n);
        });
      }),
      (t.prototype.forward = function (t) {
        var e, n;
        try {
          for (var r = B(this.forwardTo), o = r.next(); !o.done; o = r.next()) {
            var i = o.value,
              a = this.children.get(i);
            if (!a)
              throw new Error(
                "Unable to forward event '" +
                  t +
                  "' from interpreter '" +
                  this.id +
                  "' to nonexistant child '" +
                  i +
                  "'."
              );
            a.send(t);
          }
        } catch (u) {
          e = { error: u };
        } finally {
          try {
            o && !o.done && (n = r.return) && n.call(r);
          } finally {
            if (e) throw e.error;
          }
        }
      }),
      (t.prototype.defer = function (t) {
        var e = this;
        this.delayedEventsMap[t.id] = this.clock.setTimeout(function () {
          t.to ? e.sendTo(t._event, t.to) : e.send(t._event);
        }, t.delay);
      }),
      (t.prototype.cancel = function (t) {
        this.clock.clearTimeout(this.delayedEventsMap[t]),
          delete this.delayedEventsMap[t];
      }),
      (t.prototype.exec = function (t, e, n) {
        void 0 === n && (n = this.machine.options.actions);
        var r = e.context,
          o = e._event,
          i = t.exec || Pt(t.type, n),
          a = tt(i) ? i : i ? i.exec : t.exec;
        if (a)
          try {
            return a(r, o.data, { action: t, state: this.state, _event: o });
          } catch (b) {
            throw (
              (this.parent &&
                this.parent.send({ type: 'xstate.error', data: b }),
              b)
            );
          }
        switch (t.type) {
          case bt:
            var u = t;
            if ('number' == typeof u.delay) return void this.defer(u);
            u.to ? this.sendTo(u._event, u.to) : this.send(u._event);
            break;
          case wt:
            this.cancel(t.sendId);
            break;
          case gt:
            var s = t.activity;
            if (!this.state.activities[s.id || s.type]) break;
            if (s.type === it.Invoke) {
              var c = ht(s.src),
                l = this.machine.options.services
                  ? this.machine.options.services[c.type]
                  : void 0,
                f = s.id,
                d = s.data,
                p = 'autoForward' in s ? s.autoForward : !!s.forward;
              if (!l) return;
              var h = d ? G(d, r, o) : void 0;
              if ('string' == typeof l) return;
              var v = tt(l) ? l(r, o.data, { data: h, src: c }) : l;
              if (!v) return;
              var g = void 0;
              ot(v) &&
                ((v = h ? v.withContext(h) : v), (g = { autoForward: p })),
                this.spawn(v, f, g);
            } else this.spawnActivity(s);
            break;
          case yt:
            this.stopChild(t.activity.id);
            break;
          case Ct:
            var y = t.label,
              m = t.value;
            y ? this.logger(y, m) : this.logger(m);
        }
      }),
      (t.prototype.removeChild = function (t) {
        this.children.delete(t),
          this.forwardTo.delete(t),
          delete this.state.children[t];
      }),
      (t.prototype.stopChild = function (t) {
        var e = this.children.get(t);
        e && (this.removeChild(t), tt(e.stop) && e.stop());
      }),
      (t.prototype.spawn = function (t, e, n) {
        if (K(t)) return this.spawnPromise(Promise.resolve(t), e);
        if (tt(t)) return this.spawnCallback(t, e);
        if (
          (function (t) {
            try {
              return 'function' == typeof t.send;
            } catch (e) {
              return !1;
            }
          })((o = t)) &&
          'id' in o
        )
          return this.spawnActor(t, e);
        if (
          (function (t) {
            try {
              return 'subscribe' in t && tt(t.subscribe);
            } catch (e) {
              return !1;
            }
          })(t)
        )
          return this.spawnObservable(t, e);
        if (ot(t)) return this.spawnMachine(t, I(I({}, n), { id: e }));
        if (
          null !== (r = t) &&
          'object' == typeof r &&
          'transition' in r &&
          'function' == typeof r.transition
        )
          return this.spawnBehavior(t, e);
        throw new Error(
          'Unable to spawn entity "' + e + '" of type "' + typeof t + '".'
        );
        var r, o;
      }),
      (t.prototype.spawnMachine = function (e, n) {
        var r = this;
        void 0 === n && (n = {});
        var o = new t(
            e,
            I(I({}, this.options), { parent: this, id: n.id || e.id })
          ),
          i = I(I({}, xe), n);
        i.sync &&
          o.onTransition(function (t) {
            r.send(It, { state: t, id: o.id });
          });
        var a = o;
        return (
          this.children.set(o.id, a),
          i.autoForward && this.forwardTo.add(o.id),
          o
            .onDone(function (t) {
              r.removeChild(o.id), r.send(ft(t, { origin: o.id }));
            })
            .start(),
          a
        );
      }),
      (t.prototype.spawnBehavior = function (t, e) {
        var n = _e(t, { id: e, parent: this });
        return this.children.set(e, n), n;
      }),
      (t.prototype.spawnPromise = function (t, e) {
        var n,
          r = this,
          o = !1;
        t.then(
          function (t) {
            o ||
              ((n = t), r.removeChild(e), r.send(ft(Ft(e, t), { origin: e })));
          },
          function (t) {
            if (!o) {
              r.removeChild(e);
              var n = $t(e, t);
              try {
                r.send(ft(n, { origin: e }));
              } catch (i) {
                r.devTools && r.devTools.send(n, r.state),
                  r.machine.strict && r.stop();
              }
            }
          }
        );
        var i = {
          id: e,
          send: function () {},
          subscribe: function (e, n, r) {
            var o = vt(e, n, r),
              i = !1;
            return (
              t.then(
                function (t) {
                  i || (o.next(t), i || o.complete());
                },
                function (t) {
                  i || o.error(t);
                }
              ),
              {
                unsubscribe: function () {
                  return (i = !0);
                },
              }
            );
          },
          stop: function () {
            o = !0;
          },
          toJSON: function () {
            return { id: e };
          },
          getSnapshot: function () {
            return n;
          },
        };
        return this.children.set(e, i), i;
      }),
      (t.prototype.spawnCallback = function (t, e) {
        var n,
          r,
          o = this,
          i = !1,
          a = new Set(),
          u = new Set();
        try {
          r = t(
            function (t) {
              (n = t),
                u.forEach(function (e) {
                  return e(t);
                }),
                i || o.send(ft(t, { origin: e }));
            },
            function (t) {
              a.add(t);
            }
          );
        } catch (c) {
          this.send($t(e, c));
        }
        if (K(r)) return this.spawnPromise(r, e);
        var s = {
          id: e,
          send: function (t) {
            return a.forEach(function (e) {
              return e(t);
            });
          },
          subscribe: function (t) {
            return (
              u.add(t),
              {
                unsubscribe: function () {
                  u.delete(t);
                },
              }
            );
          },
          stop: function () {
            (i = !0), tt(r) && r();
          },
          toJSON: function () {
            return { id: e };
          },
          getSnapshot: function () {
            return n;
          },
        };
        return this.children.set(e, s), s;
      }),
      (t.prototype.spawnObservable = function (t, e) {
        var n,
          r = this,
          o = t.subscribe(
            function (t) {
              (n = t), r.send(ft(t, { origin: e }));
            },
            function (t) {
              r.removeChild(e), r.send(ft($t(e, t), { origin: e }));
            },
            function () {
              r.removeChild(e), r.send(ft(Ft(e), { origin: e }));
            }
          ),
          i = {
            id: e,
            send: function () {},
            subscribe: function (e, n, r) {
              return t.subscribe(e, n, r);
            },
            stop: function () {
              return o.unsubscribe();
            },
            getSnapshot: function () {
              return n;
            },
            toJSON: function () {
              return { id: e };
            },
          };
        return this.children.set(e, i), i;
      }),
      (t.prototype.spawnActor = function (t, e) {
        return this.children.set(e, t), t;
      }),
      (t.prototype.spawnActivity = function (t) {
        var e =
          this.machine.options && this.machine.options.activities
            ? this.machine.options.activities[t.type]
            : void 0;
        if (e) {
          var n = e(this.state.context, t);
          this.spawnEffect(t.id, n);
        }
      }),
      (t.prototype.spawnEffect = function (t, e) {
        this.children.set(t, {
          id: t,
          send: function () {},
          subscribe: function () {
            return { unsubscribe: function () {} };
          },
          stop: e || void 0,
          getSnapshot: function () {},
          toJSON: function () {
            return { id: t };
          },
        });
      }),
      (t.prototype.attachDev = function () {
        var t = be();
        if (this.options.devTools && t) {
          if (t.__REDUX_DEVTOOLS_EXTENSION__) {
            var e =
              'object' == typeof this.options.devTools
                ? this.options.devTools
                : void 0;
            (this.devTools = t.__REDUX_DEVTOOLS_EXTENSION__.connect(
              I(
                I(
                  {
                    name: this.id,
                    autoPause: !0,
                    stateSanitizer: function (t) {
                      return {
                        value: t.value,
                        context: t.context,
                        actions: t.actions,
                      };
                    },
                  },
                  e
                ),
                { features: I({ jump: !1, skip: !1 }, e ? e.features : void 0) }
              ),
              this.machine
            )),
              this.devTools.init(this.state);
          }
          we(this);
        }
      }),
      (t.prototype.toJSON = function () {
        return { id: this.id };
      }),
      (t.prototype[rt] = function () {
        return this;
      }),
      (t.prototype.getSnapshot = function () {
        return this.status === Se.NotStarted ? this.initialState : this._state;
      }),
      (t.defaultOptions = (function (t) {
        return {
          execute: !0,
          deferEvents: !0,
          clock: {
            setTimeout: function (t, e) {
              return setTimeout(t, e);
            },
            clearTimeout: function (t) {
              return clearTimeout(t);
            },
          },
          logger: (typeof self !== 'undefined'
            ? self
            : global
          ).console.log.bind(console),
          devTools: !1,
        };
      })()),
      (t.interpret = Te),
      t
    );
  })();
  function Ae(t, e) {
    var n = (function (t) {
      return et(t)
        ? I(I({}, xe), { name: t })
        : I(I(I({}, xe), { name: ct() }), t);
    })(e);
    return (function (e) {
      return e ? e.spawn(t, n.name, n) : oe(t, n.name);
    })(ee[ee.length - 1]);
  }
  function Te(t, e) {
    return new Ee(t, e);
  }
  var Ie,
    Ne,
    Be =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : {},
    ke = { exports: {} };
  /**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */
  (Ie = ke),
    (Ne = ke.exports),
    function () {
      var t,
        e = 'Expected a function',
        n = '__lodash_hash_undefined__',
        r = '__lodash_placeholder__',
        o = 16,
        i = 32,
        a = 64,
        u = 128,
        s = 256,
        c = 1 / 0,
        l = 9007199254740991,
        f = NaN,
        d = 4294967295,
        p = [
          ['ary', u],
          ['bind', 1],
          ['bindKey', 2],
          ['curry', 8],
          ['curryRight', o],
          ['flip', 512],
          ['partial', i],
          ['partialRight', a],
          ['rearg', s],
        ],
        h = '[object Arguments]',
        v = '[object Array]',
        g = '[object Boolean]',
        y = '[object Date]',
        m = '[object Error]',
        b = '[object Function]',
        w = '[object GeneratorFunction]',
        _ = '[object Map]',
        S = '[object Number]',
        C = '[object Object]',
        x = '[object Promise]',
        E = '[object RegExp]',
        A = '[object Set]',
        T = '[object String]',
        I = '[object Symbol]',
        N = '[object WeakMap]',
        B = '[object ArrayBuffer]',
        k = '[object DataView]',
        P = '[object Float32Array]',
        O = '[object Float64Array]',
        R = '[object Int8Array]',
        U = '[object Int16Array]',
        V = '[object Int32Array]',
        j = '[object Uint8Array]',
        D = '[object Uint8ClampedArray]',
        M = '[object Uint16Array]',
        L = '[object Uint32Array]',
        F = /\b__p \+= '';/g,
        $ = /\b(__p \+=) '' \+/g,
        z = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
        H = /&(?:amp|lt|gt|quot|#39);/g,
        W = /[&<>"']/g,
        Y = RegExp(H.source),
        q = RegExp(W.source),
        G = /<%-([\s\S]+?)%>/g,
        K = /<%([\s\S]+?)%>/g,
        J = /<%=([\s\S]+?)%>/g,
        Q = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        Z = /^\w*$/,
        X =
          /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        tt = /[\\^$.*+?()[\]{}|]/g,
        et = RegExp(tt.source),
        nt = /^\s+/,
        rt = /\s/,
        ot = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
        it = /\{\n\/\* \[wrapped with (.+)\] \*/,
        at = /,? & /,
        ut = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
        st = /[()=,{}\[\]\/\s]/,
        ct = /\\(\\)?/g,
        lt = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
        ft = /\w*$/,
        dt = /^[-+]0x[0-9a-f]+$/i,
        pt = /^0b[01]+$/i,
        ht = /^\[object .+?Constructor\]$/,
        vt = /^0o[0-7]+$/i,
        gt = /^(?:0|[1-9]\d*)$/,
        yt = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
        mt = /($^)/,
        bt = /['\n\r\u2028\u2029\\]/g,
        wt = '\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff',
        _t = '\\u2700-\\u27bf',
        St = 'a-z\\xdf-\\xf6\\xf8-\\xff',
        Ct = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
        xt = '\\ufe0e\\ufe0f',
        Et =
          '\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
        At = "['’]",
        Tt = '[\\ud800-\\udfff]',
        It = '[' + Et + ']',
        Nt = '[' + wt + ']',
        Bt = '\\d+',
        kt = '[\\u2700-\\u27bf]',
        Pt = '[' + St + ']',
        Ot = '[^\\ud800-\\udfff' + Et + Bt + _t + St + Ct + ']',
        Rt = '\\ud83c[\\udffb-\\udfff]',
        Ut = '[^\\ud800-\\udfff]',
        Vt = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        jt = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        Dt = '[' + Ct + ']',
        Mt = '(?:' + Pt + '|' + Ot + ')',
        Lt = '(?:' + Dt + '|' + Ot + ')',
        Ft = "(?:['’](?:d|ll|m|re|s|t|ve))?",
        $t = "(?:['’](?:D|LL|M|RE|S|T|VE))?",
        zt = '(?:' + Nt + '|' + Rt + ')?',
        Ht = '[\\ufe0e\\ufe0f]?',
        Wt =
          Ht +
          zt +
          '(?:\\u200d(?:' +
          [Ut, Vt, jt].join('|') +
          ')' +
          Ht +
          zt +
          ')*',
        Yt = '(?:' + [kt, Vt, jt].join('|') + ')' + Wt,
        qt = '(?:' + [Ut + Nt + '?', Nt, Vt, jt, Tt].join('|') + ')',
        Gt = RegExp(At, 'g'),
        Kt = RegExp(Nt, 'g'),
        Jt = RegExp(Rt + '(?=' + Rt + ')|' + qt + Wt, 'g'),
        Qt = RegExp(
          [
            Dt + '?' + Pt + '+' + Ft + '(?=' + [It, Dt, '$'].join('|') + ')',
            Lt + '+' + $t + '(?=' + [It, Dt + Mt, '$'].join('|') + ')',
            Dt + '?' + Mt + '+' + Ft,
            Dt + '+' + $t,
            '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
            '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
            Bt,
            Yt,
          ].join('|'),
          'g'
        ),
        Zt = RegExp('[\\u200d\\ud800-\\udfff' + wt + xt + ']'),
        Xt =
          /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
        te = [
          'Array',
          'Buffer',
          'DataView',
          'Date',
          'Error',
          'Float32Array',
          'Float64Array',
          'Function',
          'Int8Array',
          'Int16Array',
          'Int32Array',
          'Map',
          'Math',
          'Object',
          'Promise',
          'RegExp',
          'Set',
          'String',
          'Symbol',
          'TypeError',
          'Uint8Array',
          'Uint8ClampedArray',
          'Uint16Array',
          'Uint32Array',
          'WeakMap',
          '_',
          'clearTimeout',
          'isFinite',
          'parseInt',
          'setTimeout',
        ],
        ee = -1,
        ne = {};
      (ne[P] =
        ne[O] =
        ne[R] =
        ne[U] =
        ne[V] =
        ne[j] =
        ne[D] =
        ne[M] =
        ne[L] =
          !0),
        (ne[h] =
          ne[v] =
          ne[B] =
          ne[g] =
          ne[k] =
          ne[y] =
          ne[m] =
          ne[b] =
          ne[_] =
          ne[S] =
          ne[C] =
          ne[E] =
          ne[A] =
          ne[T] =
          ne[N] =
            !1);
      var re = {};
      (re[h] =
        re[v] =
        re[B] =
        re[k] =
        re[g] =
        re[y] =
        re[P] =
        re[O] =
        re[R] =
        re[U] =
        re[V] =
        re[_] =
        re[S] =
        re[C] =
        re[E] =
        re[A] =
        re[T] =
        re[I] =
        re[j] =
        re[D] =
        re[M] =
        re[L] =
          !0),
        (re[m] = re[b] = re[N] = !1);
      var oe = {
          '\\': '\\',
          "'": "'",
          '\n': 'n',
          '\r': 'r',
          '\u2028': 'u2028',
          '\u2029': 'u2029',
        },
        ie = parseFloat,
        ae = parseInt,
        ue = 'object' == typeof Be && Be && Be.Object === Object && Be,
        se = 'object' == typeof self && self && self.Object === Object && self,
        ce = ue || se || Function('return this')(),
        le = Ne && !Ne.nodeType && Ne,
        fe = le && Ie && !Ie.nodeType && Ie,
        de = fe && fe.exports === le,
        pe = de && ue.process,
        he = (function () {
          try {
            var t = fe && fe.require && fe.require('util').types;
            return t || (pe && pe.binding && pe.binding('util'));
          } catch (e) {}
        })(),
        ve = he && he.isArrayBuffer,
        ge = he && he.isDate,
        ye = he && he.isMap,
        me = he && he.isRegExp,
        be = he && he.isSet,
        we = he && he.isTypedArray;
      function _e(t, e, n) {
        switch (n.length) {
          case 0:
            return t.call(e);
          case 1:
            return t.call(e, n[0]);
          case 2:
            return t.call(e, n[0], n[1]);
          case 3:
            return t.call(e, n[0], n[1], n[2]);
        }
        return t.apply(e, n);
      }
      function Se(t, e, n, r) {
        for (var o = -1, i = null == t ? 0 : t.length; ++o < i; ) {
          var a = t[o];
          e(r, a, n(a), t);
        }
        return r;
      }
      function Ce(t, e) {
        for (
          var n = -1, r = null == t ? 0 : t.length;
          ++n < r && !1 !== e(t[n], n, t);

        );
        return t;
      }
      function xe(t, e) {
        for (var n = null == t ? 0 : t.length; n-- && !1 !== e(t[n], n, t); );
        return t;
      }
      function Ee(t, e) {
        for (var n = -1, r = null == t ? 0 : t.length; ++n < r; )
          if (!e(t[n], n, t)) return !1;
        return !0;
      }
      function Ae(t, e) {
        for (
          var n = -1, r = null == t ? 0 : t.length, o = 0, i = [];
          ++n < r;

        ) {
          var a = t[n];
          e(a, n, t) && (i[o++] = a);
        }
        return i;
      }
      function Te(t, e) {
        return !(null == t || !t.length) && Le(t, e, 0) > -1;
      }
      function ke(t, e, n) {
        for (var r = -1, o = null == t ? 0 : t.length; ++r < o; )
          if (n(e, t[r])) return !0;
        return !1;
      }
      function Pe(t, e) {
        for (var n = -1, r = null == t ? 0 : t.length, o = Array(r); ++n < r; )
          o[n] = e(t[n], n, t);
        return o;
      }
      function Oe(t, e) {
        for (var n = -1, r = e.length, o = t.length; ++n < r; ) t[o + n] = e[n];
        return t;
      }
      function Re(t, e, n, r) {
        var o = -1,
          i = null == t ? 0 : t.length;
        for (r && i && (n = t[++o]); ++o < i; ) n = e(n, t[o], o, t);
        return n;
      }
      function Ue(t, e, n, r) {
        var o = null == t ? 0 : t.length;
        for (r && o && (n = t[--o]); o--; ) n = e(n, t[o], o, t);
        return n;
      }
      function Ve(t, e) {
        for (var n = -1, r = null == t ? 0 : t.length; ++n < r; )
          if (e(t[n], n, t)) return !0;
        return !1;
      }
      var je = He('length');
      function De(t, e, n) {
        var r;
        return (
          n(t, function (t, n, o) {
            if (e(t, n, o)) return (r = n), !1;
          }),
          r
        );
      }
      function Me(t, e, n, r) {
        for (var o = t.length, i = n + (r ? 1 : -1); r ? i-- : ++i < o; )
          if (e(t[i], i, t)) return i;
        return -1;
      }
      function Le(t, e, n) {
        return e == e
          ? (function (t, e, n) {
              for (var r = n - 1, o = t.length; ++r < o; )
                if (t[r] === e) return r;
              return -1;
            })(t, e, n)
          : Me(t, $e, n);
      }
      function Fe(t, e, n, r) {
        for (var o = n - 1, i = t.length; ++o < i; ) if (r(t[o], e)) return o;
        return -1;
      }
      function $e(t) {
        return t != t;
      }
      function ze(t, e) {
        var n = null == t ? 0 : t.length;
        return n ? qe(t, e) / n : f;
      }
      function He(e) {
        return function (n) {
          return null == n ? t : n[e];
        };
      }
      function We(e) {
        return function (n) {
          return null == e ? t : e[n];
        };
      }
      function Ye(t, e, n, r, o) {
        return (
          o(t, function (t, o, i) {
            n = r ? ((r = !1), t) : e(n, t, o, i);
          }),
          n
        );
      }
      function qe(e, n) {
        for (var r, o = -1, i = e.length; ++o < i; ) {
          var a = n(e[o]);
          a !== t && (r = r === t ? a : r + a);
        }
        return r;
      }
      function Ge(t, e) {
        for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n);
        return r;
      }
      function Ke(t) {
        return t ? t.slice(0, pn(t) + 1).replace(nt, '') : t;
      }
      function Je(t) {
        return function (e) {
          return t(e);
        };
      }
      function Qe(t, e) {
        return Pe(e, function (e) {
          return t[e];
        });
      }
      function Ze(t, e) {
        return t.has(e);
      }
      function Xe(t, e) {
        for (var n = -1, r = t.length; ++n < r && Le(e, t[n], 0) > -1; );
        return n;
      }
      function tn(t, e) {
        for (var n = t.length; n-- && Le(e, t[n], 0) > -1; );
        return n;
      }
      function en(t, e) {
        for (var n = t.length, r = 0; n--; ) t[n] === e && ++r;
        return r;
      }
      var nn = We({
          À: 'A',
          Á: 'A',
          Â: 'A',
          Ã: 'A',
          Ä: 'A',
          Å: 'A',
          à: 'a',
          á: 'a',
          â: 'a',
          ã: 'a',
          ä: 'a',
          å: 'a',
          Ç: 'C',
          ç: 'c',
          Ð: 'D',
          ð: 'd',
          È: 'E',
          É: 'E',
          Ê: 'E',
          Ë: 'E',
          è: 'e',
          é: 'e',
          ê: 'e',
          ë: 'e',
          Ì: 'I',
          Í: 'I',
          Î: 'I',
          Ï: 'I',
          ì: 'i',
          í: 'i',
          î: 'i',
          ï: 'i',
          Ñ: 'N',
          ñ: 'n',
          Ò: 'O',
          Ó: 'O',
          Ô: 'O',
          Õ: 'O',
          Ö: 'O',
          Ø: 'O',
          ò: 'o',
          ó: 'o',
          ô: 'o',
          õ: 'o',
          ö: 'o',
          ø: 'o',
          Ù: 'U',
          Ú: 'U',
          Û: 'U',
          Ü: 'U',
          ù: 'u',
          ú: 'u',
          û: 'u',
          ü: 'u',
          Ý: 'Y',
          ý: 'y',
          ÿ: 'y',
          Æ: 'Ae',
          æ: 'ae',
          Þ: 'Th',
          þ: 'th',
          ß: 'ss',
          Ā: 'A',
          Ă: 'A',
          Ą: 'A',
          ā: 'a',
          ă: 'a',
          ą: 'a',
          Ć: 'C',
          Ĉ: 'C',
          Ċ: 'C',
          Č: 'C',
          ć: 'c',
          ĉ: 'c',
          ċ: 'c',
          č: 'c',
          Ď: 'D',
          Đ: 'D',
          ď: 'd',
          đ: 'd',
          Ē: 'E',
          Ĕ: 'E',
          Ė: 'E',
          Ę: 'E',
          Ě: 'E',
          ē: 'e',
          ĕ: 'e',
          ė: 'e',
          ę: 'e',
          ě: 'e',
          Ĝ: 'G',
          Ğ: 'G',
          Ġ: 'G',
          Ģ: 'G',
          ĝ: 'g',
          ğ: 'g',
          ġ: 'g',
          ģ: 'g',
          Ĥ: 'H',
          Ħ: 'H',
          ĥ: 'h',
          ħ: 'h',
          Ĩ: 'I',
          Ī: 'I',
          Ĭ: 'I',
          Į: 'I',
          İ: 'I',
          ĩ: 'i',
          ī: 'i',
          ĭ: 'i',
          į: 'i',
          ı: 'i',
          Ĵ: 'J',
          ĵ: 'j',
          Ķ: 'K',
          ķ: 'k',
          ĸ: 'k',
          Ĺ: 'L',
          Ļ: 'L',
          Ľ: 'L',
          Ŀ: 'L',
          Ł: 'L',
          ĺ: 'l',
          ļ: 'l',
          ľ: 'l',
          ŀ: 'l',
          ł: 'l',
          Ń: 'N',
          Ņ: 'N',
          Ň: 'N',
          Ŋ: 'N',
          ń: 'n',
          ņ: 'n',
          ň: 'n',
          ŋ: 'n',
          Ō: 'O',
          Ŏ: 'O',
          Ő: 'O',
          ō: 'o',
          ŏ: 'o',
          ő: 'o',
          Ŕ: 'R',
          Ŗ: 'R',
          Ř: 'R',
          ŕ: 'r',
          ŗ: 'r',
          ř: 'r',
          Ś: 'S',
          Ŝ: 'S',
          Ş: 'S',
          Š: 'S',
          ś: 's',
          ŝ: 's',
          ş: 's',
          š: 's',
          Ţ: 'T',
          Ť: 'T',
          Ŧ: 'T',
          ţ: 't',
          ť: 't',
          ŧ: 't',
          Ũ: 'U',
          Ū: 'U',
          Ŭ: 'U',
          Ů: 'U',
          Ű: 'U',
          Ų: 'U',
          ũ: 'u',
          ū: 'u',
          ŭ: 'u',
          ů: 'u',
          ű: 'u',
          ų: 'u',
          Ŵ: 'W',
          ŵ: 'w',
          Ŷ: 'Y',
          ŷ: 'y',
          Ÿ: 'Y',
          Ź: 'Z',
          Ż: 'Z',
          Ž: 'Z',
          ź: 'z',
          ż: 'z',
          ž: 'z',
          Ĳ: 'IJ',
          ĳ: 'ij',
          Œ: 'Oe',
          œ: 'oe',
          ŉ: "'n",
          ſ: 's',
        }),
        rn = We({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        });
      function on(t) {
        return '\\' + oe[t];
      }
      function an(t) {
        return Zt.test(t);
      }
      function un(t) {
        var e = -1,
          n = Array(t.size);
        return (
          t.forEach(function (t, r) {
            n[++e] = [r, t];
          }),
          n
        );
      }
      function sn(t, e) {
        return function (n) {
          return t(e(n));
        };
      }
      function cn(t, e) {
        for (var n = -1, o = t.length, i = 0, a = []; ++n < o; ) {
          var u = t[n];
          (u !== e && u !== r) || ((t[n] = r), (a[i++] = n));
        }
        return a;
      }
      function ln(t) {
        var e = -1,
          n = Array(t.size);
        return (
          t.forEach(function (t) {
            n[++e] = t;
          }),
          n
        );
      }
      function fn(t) {
        return an(t)
          ? (function (t) {
              for (var e = (Jt.lastIndex = 0); Jt.test(t); ) ++e;
              return e;
            })(t)
          : je(t);
      }
      function dn(t) {
        return an(t)
          ? (function (t) {
              return t.match(Jt) || [];
            })(t)
          : (function (t) {
              return t.split('');
            })(t);
      }
      function pn(t) {
        for (var e = t.length; e-- && rt.test(t.charAt(e)); );
        return e;
      }
      var hn = We({
          '&amp;': '&',
          '&lt;': '<',
          '&gt;': '>',
          '&quot;': '"',
          '&#39;': "'",
        }),
        vn = (function rt(wt) {
          var _t,
            St = (wt =
              null == wt ? ce : vn.defaults(ce.Object(), wt, vn.pick(ce, te)))
              .Array,
            Ct = wt.Date,
            xt = wt.Error,
            Et = wt.Function,
            At = wt.Math,
            Tt = wt.Object,
            It = wt.RegExp,
            Nt = wt.String,
            Bt = wt.TypeError,
            kt = St.prototype,
            Pt = Et.prototype,
            Ot = Tt.prototype,
            Rt = wt['__core-js_shared__'],
            Ut = Pt.toString,
            Vt = Ot.hasOwnProperty,
            jt = 0,
            Dt = (_t = /[^.]+$/.exec((Rt && Rt.keys && Rt.keys.IE_PROTO) || ''))
              ? 'Symbol(src)_1.' + _t
              : '',
            Mt = Ot.toString,
            Lt = Ut.call(Tt),
            Ft = ce._,
            $t = It(
              '^' +
                Ut.call(Vt)
                  .replace(tt, '\\$&')
                  .replace(
                    /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                    '$1.*?'
                  ) +
                '$'
            ),
            zt = de ? wt.Buffer : t,
            Ht = wt.Symbol,
            Wt = wt.Uint8Array,
            Yt = zt ? zt.allocUnsafe : t,
            qt = sn(Tt.getPrototypeOf, Tt),
            Jt = Tt.create,
            Zt = Ot.propertyIsEnumerable,
            oe = kt.splice,
            ue = Ht ? Ht.isConcatSpreadable : t,
            se = Ht ? Ht.iterator : t,
            le = Ht ? Ht.toStringTag : t,
            fe = (function () {
              try {
                var t = pi(Tt, 'defineProperty');
                return t({}, '', {}), t;
              } catch (e) {}
            })(),
            pe = wt.clearTimeout !== ce.clearTimeout && wt.clearTimeout,
            he = Ct && Ct.now !== ce.Date.now && Ct.now,
            Ie = wt.setTimeout !== ce.setTimeout && wt.setTimeout,
            Ne = At.ceil,
            Be = At.floor,
            je = Tt.getOwnPropertySymbols,
            We = zt ? zt.isBuffer : t,
            gn = wt.isFinite,
            yn = kt.join,
            mn = sn(Tt.keys, Tt),
            bn = At.max,
            wn = At.min,
            _n = Ct.now,
            Sn = wt.parseInt,
            Cn = At.random,
            xn = kt.reverse,
            En = pi(wt, 'DataView'),
            An = pi(wt, 'Map'),
            Tn = pi(wt, 'Promise'),
            In = pi(wt, 'Set'),
            Nn = pi(wt, 'WeakMap'),
            Bn = pi(Tt, 'create'),
            kn = Nn && new Nn(),
            Pn = {},
            On = zi(En),
            Rn = zi(An),
            Un = zi(Tn),
            Vn = zi(In),
            jn = zi(Nn),
            Dn = Ht ? Ht.prototype : t,
            Mn = Dn ? Dn.valueOf : t,
            Ln = Dn ? Dn.toString : t;
          function Fn(t) {
            if (au(t) && !Ka(t) && !(t instanceof Wn)) {
              if (t instanceof Hn) return t;
              if (Vt.call(t, '__wrapped__')) return Hi(t);
            }
            return new Hn(t);
          }
          var $n = (function () {
            function e() {}
            return function (n) {
              if (!iu(n)) return {};
              if (Jt) return Jt(n);
              e.prototype = n;
              var r = new e();
              return (e.prototype = t), r;
            };
          })();
          function zn() {}
          function Hn(e, n) {
            (this.__wrapped__ = e),
              (this.__actions__ = []),
              (this.__chain__ = !!n),
              (this.__index__ = 0),
              (this.__values__ = t);
          }
          function Wn(t) {
            (this.__wrapped__ = t),
              (this.__actions__ = []),
              (this.__dir__ = 1),
              (this.__filtered__ = !1),
              (this.__iteratees__ = []),
              (this.__takeCount__ = d),
              (this.__views__ = []);
          }
          function Yn(t) {
            var e = -1,
              n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n; ) {
              var r = t[e];
              this.set(r[0], r[1]);
            }
          }
          function qn(t) {
            var e = -1,
              n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n; ) {
              var r = t[e];
              this.set(r[0], r[1]);
            }
          }
          function Gn(t) {
            var e = -1,
              n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n; ) {
              var r = t[e];
              this.set(r[0], r[1]);
            }
          }
          function Kn(t) {
            var e = -1,
              n = null == t ? 0 : t.length;
            for (this.__data__ = new Gn(); ++e < n; ) this.add(t[e]);
          }
          function Jn(t) {
            var e = (this.__data__ = new qn(t));
            this.size = e.size;
          }
          function Qn(t, e) {
            var n = Ka(t),
              r = !n && Ga(t),
              o = !n && !r && Xa(t),
              i = !n && !r && !o && hu(t),
              a = n || r || o || i,
              u = a ? Ge(t.length, Nt) : [],
              s = u.length;
            for (var c in t)
              (!e && !Vt.call(t, c)) ||
                (a &&
                  ('length' == c ||
                    (o && ('offset' == c || 'parent' == c)) ||
                    (i &&
                      ('buffer' == c ||
                        'byteLength' == c ||
                        'byteOffset' == c)) ||
                    wi(c, s))) ||
                u.push(c);
            return u;
          }
          function Zn(e) {
            var n = e.length;
            return n ? e[Kr(0, n - 1)] : t;
          }
          function Xn(t, e) {
            return ji(ko(t), sr(e, 0, t.length));
          }
          function tr(t) {
            return ji(ko(t));
          }
          function er(e, n, r) {
            ((r !== t && !Wa(e[n], r)) || (r === t && !(n in e))) &&
              ar(e, n, r);
          }
          function nr(e, n, r) {
            var o = e[n];
            (Vt.call(e, n) && Wa(o, r) && (r !== t || n in e)) || ar(e, n, r);
          }
          function rr(t, e) {
            for (var n = t.length; n--; ) if (Wa(t[n][0], e)) return n;
            return -1;
          }
          function or(t, e, n, r) {
            return (
              pr(t, function (t, o, i) {
                e(r, t, n(t), i);
              }),
              r
            );
          }
          function ir(t, e) {
            return t && Po(e, Vu(e), t);
          }
          function ar(t, e, n) {
            '__proto__' == e && fe
              ? fe(t, e, {
                  configurable: !0,
                  enumerable: !0,
                  value: n,
                  writable: !0,
                })
              : (t[e] = n);
          }
          function ur(e, n) {
            for (var r = -1, o = n.length, i = St(o), a = null == e; ++r < o; )
              i[r] = a ? t : ku(e, n[r]);
            return i;
          }
          function sr(e, n, r) {
            return (
              e == e &&
                (r !== t && (e = e <= r ? e : r),
                n !== t && (e = e >= n ? e : n)),
              e
            );
          }
          function cr(e, n, r, o, i, a) {
            var u,
              s = 1 & n,
              c = 2 & n,
              l = 4 & n;
            if ((r && (u = i ? r(e, o, i, a) : r(e)), u !== t)) return u;
            if (!iu(e)) return e;
            var f = Ka(e);
            if (f) {
              if (
                ((u = (function (t) {
                  var e = t.length,
                    n = new t.constructor(e);
                  return (
                    e &&
                      'string' == typeof t[0] &&
                      Vt.call(t, 'index') &&
                      ((n.index = t.index), (n.input = t.input)),
                    n
                  );
                })(e)),
                !s)
              )
                return ko(e, u);
            } else {
              var d = gi(e),
                p = d == b || d == w;
              if (Xa(e)) return Eo(e, s);
              if (d == C || d == h || (p && !i)) {
                if (((u = c || p ? {} : mi(e)), !s))
                  return c
                    ? (function (t, e) {
                        return Po(t, vi(t), e);
                      })(
                        e,
                        (function (t, e) {
                          return t && Po(e, ju(e), t);
                        })(u, e)
                      )
                    : (function (t, e) {
                        return Po(t, hi(t), e);
                      })(e, ir(u, e));
              } else {
                if (!re[d]) return i ? e : {};
                u = (function (t, e, n) {
                  var r,
                    o = t.constructor;
                  switch (e) {
                    case B:
                      return Ao(t);
                    case g:
                    case y:
                      return new o(+t);
                    case k:
                      return (function (t, e) {
                        var n = e ? Ao(t.buffer) : t.buffer;
                        return new t.constructor(n, t.byteOffset, t.byteLength);
                      })(t, n);
                    case P:
                    case O:
                    case R:
                    case U:
                    case V:
                    case j:
                    case D:
                    case M:
                    case L:
                      return To(t, n);
                    case _:
                      return new o();
                    case S:
                    case T:
                      return new o(t);
                    case E:
                      return (function (t) {
                        var e = new t.constructor(t.source, ft.exec(t));
                        return (e.lastIndex = t.lastIndex), e;
                      })(t);
                    case A:
                      return new o();
                    case I:
                      return (r = t), Mn ? Tt(Mn.call(r)) : {};
                  }
                })(e, d, s);
              }
            }
            a || (a = new Jn());
            var v = a.get(e);
            if (v) return v;
            a.set(e, u),
              fu(e)
                ? e.forEach(function (t) {
                    u.add(cr(t, n, r, t, e, a));
                  })
                : uu(e) &&
                  e.forEach(function (t, o) {
                    u.set(o, cr(t, n, r, o, e, a));
                  });
            var m = f ? t : (l ? (c ? ai : ii) : c ? ju : Vu)(e);
            return (
              Ce(m || e, function (t, o) {
                m && (t = e[(o = t)]), nr(u, o, cr(t, n, r, o, e, a));
              }),
              u
            );
          }
          function lr(e, n, r) {
            var o = r.length;
            if (null == e) return !o;
            for (e = Tt(e); o--; ) {
              var i = r[o],
                a = n[i],
                u = e[i];
              if ((u === t && !(i in e)) || !a(u)) return !1;
            }
            return !0;
          }
          function fr(n, r, o) {
            if ('function' != typeof n) throw new Bt(e);
            return Oi(function () {
              n.apply(t, o);
            }, r);
          }
          function dr(t, e, n, r) {
            var o = -1,
              i = Te,
              a = !0,
              u = t.length,
              s = [],
              c = e.length;
            if (!u) return s;
            n && (e = Pe(e, Je(n))),
              r
                ? ((i = ke), (a = !1))
                : e.length >= 200 && ((i = Ze), (a = !1), (e = new Kn(e)));
            t: for (; ++o < u; ) {
              var l = t[o],
                f = null == n ? l : n(l);
              if (((l = r || 0 !== l ? l : 0), a && f == f)) {
                for (var d = c; d--; ) if (e[d] === f) continue t;
                s.push(l);
              } else i(e, f, r) || s.push(l);
            }
            return s;
          }
          (Fn.templateSettings = {
            escape: G,
            evaluate: K,
            interpolate: J,
            variable: '',
            imports: { _: Fn },
          }),
            (Fn.prototype = zn.prototype),
            (Fn.prototype.constructor = Fn),
            (Hn.prototype = $n(zn.prototype)),
            (Hn.prototype.constructor = Hn),
            (Wn.prototype = $n(zn.prototype)),
            (Wn.prototype.constructor = Wn),
            (Yn.prototype.clear = function () {
              (this.__data__ = Bn ? Bn(null) : {}), (this.size = 0);
            }),
            (Yn.prototype.delete = function (t) {
              var e = this.has(t) && delete this.__data__[t];
              return (this.size -= e ? 1 : 0), e;
            }),
            (Yn.prototype.get = function (e) {
              var r = this.__data__;
              if (Bn) {
                var o = r[e];
                return o === n ? t : o;
              }
              return Vt.call(r, e) ? r[e] : t;
            }),
            (Yn.prototype.has = function (e) {
              var n = this.__data__;
              return Bn ? n[e] !== t : Vt.call(n, e);
            }),
            (Yn.prototype.set = function (e, r) {
              var o = this.__data__;
              return (
                (this.size += this.has(e) ? 0 : 1),
                (o[e] = Bn && r === t ? n : r),
                this
              );
            }),
            (qn.prototype.clear = function () {
              (this.__data__ = []), (this.size = 0);
            }),
            (qn.prototype.delete = function (t) {
              var e = this.__data__,
                n = rr(e, t);
              return !(
                n < 0 ||
                (n == e.length - 1 ? e.pop() : oe.call(e, n, 1), --this.size, 0)
              );
            }),
            (qn.prototype.get = function (e) {
              var n = this.__data__,
                r = rr(n, e);
              return r < 0 ? t : n[r][1];
            }),
            (qn.prototype.has = function (t) {
              return rr(this.__data__, t) > -1;
            }),
            (qn.prototype.set = function (t, e) {
              var n = this.__data__,
                r = rr(n, t);
              return (
                r < 0 ? (++this.size, n.push([t, e])) : (n[r][1] = e), this
              );
            }),
            (Gn.prototype.clear = function () {
              (this.size = 0),
                (this.__data__ = {
                  hash: new Yn(),
                  map: new (An || qn)(),
                  string: new Yn(),
                });
            }),
            (Gn.prototype.delete = function (t) {
              var e = fi(this, t).delete(t);
              return (this.size -= e ? 1 : 0), e;
            }),
            (Gn.prototype.get = function (t) {
              return fi(this, t).get(t);
            }),
            (Gn.prototype.has = function (t) {
              return fi(this, t).has(t);
            }),
            (Gn.prototype.set = function (t, e) {
              var n = fi(this, t),
                r = n.size;
              return n.set(t, e), (this.size += n.size == r ? 0 : 1), this;
            }),
            (Kn.prototype.add = Kn.prototype.push =
              function (t) {
                return this.__data__.set(t, n), this;
              }),
            (Kn.prototype.has = function (t) {
              return this.__data__.has(t);
            }),
            (Jn.prototype.clear = function () {
              (this.__data__ = new qn()), (this.size = 0);
            }),
            (Jn.prototype.delete = function (t) {
              var e = this.__data__,
                n = e.delete(t);
              return (this.size = e.size), n;
            }),
            (Jn.prototype.get = function (t) {
              return this.__data__.get(t);
            }),
            (Jn.prototype.has = function (t) {
              return this.__data__.has(t);
            }),
            (Jn.prototype.set = function (t, e) {
              var n = this.__data__;
              if (n instanceof qn) {
                var r = n.__data__;
                if (!An || r.length < 199)
                  return r.push([t, e]), (this.size = ++n.size), this;
                n = this.__data__ = new Gn(r);
              }
              return n.set(t, e), (this.size = n.size), this;
            });
          var pr = Uo(_r),
            hr = Uo(Sr, !0);
          function vr(t, e) {
            var n = !0;
            return (
              pr(t, function (t, r, o) {
                return (n = !!e(t, r, o));
              }),
              n
            );
          }
          function gr(e, n, r) {
            for (var o = -1, i = e.length; ++o < i; ) {
              var a = e[o],
                u = n(a);
              if (null != u && (s === t ? u == u && !pu(u) : r(u, s)))
                var s = u,
                  c = a;
            }
            return c;
          }
          function yr(t, e) {
            var n = [];
            return (
              pr(t, function (t, r, o) {
                e(t, r, o) && n.push(t);
              }),
              n
            );
          }
          function mr(t, e, n, r, o) {
            var i = -1,
              a = t.length;
            for (n || (n = bi), o || (o = []); ++i < a; ) {
              var u = t[i];
              e > 0 && n(u)
                ? e > 1
                  ? mr(u, e - 1, n, r, o)
                  : Oe(o, u)
                : r || (o[o.length] = u);
            }
            return o;
          }
          var br = Vo(),
            wr = Vo(!0);
          function _r(t, e) {
            return t && br(t, e, Vu);
          }
          function Sr(t, e) {
            return t && wr(t, e, Vu);
          }
          function Cr(t, e) {
            return Ae(e, function (e) {
              return nu(t[e]);
            });
          }
          function xr(e, n) {
            for (var r = 0, o = (n = _o(n, e)).length; null != e && r < o; )
              e = e[$i(n[r++])];
            return r && r == o ? e : t;
          }
          function Er(t, e, n) {
            var r = e(t);
            return Ka(t) ? r : Oe(r, n(t));
          }
          function Ar(e) {
            return null == e
              ? e === t
                ? '[object Undefined]'
                : '[object Null]'
              : le && le in Tt(e)
              ? (function (e) {
                  var n = Vt.call(e, le),
                    r = e[le];
                  try {
                    e[le] = t;
                    var o = !0;
                  } catch (a) {}
                  var i = Mt.call(e);
                  return o && (n ? (e[le] = r) : delete e[le]), i;
                })(e)
              : (function (t) {
                  return Mt.call(t);
                })(e);
          }
          function Tr(t, e) {
            return t > e;
          }
          function Ir(t, e) {
            return null != t && Vt.call(t, e);
          }
          function Nr(t, e) {
            return null != t && e in Tt(t);
          }
          function Br(e, n, r) {
            for (
              var o = r ? ke : Te,
                i = e[0].length,
                a = e.length,
                u = a,
                s = St(a),
                c = 1 / 0,
                l = [];
              u--;

            ) {
              var f = e[u];
              u && n && (f = Pe(f, Je(n))),
                (c = wn(f.length, c)),
                (s[u] =
                  !r && (n || (i >= 120 && f.length >= 120))
                    ? new Kn(u && f)
                    : t);
            }
            f = e[0];
            var d = -1,
              p = s[0];
            t: for (; ++d < i && l.length < c; ) {
              var h = f[d],
                v = n ? n(h) : h;
              if (((h = r || 0 !== h ? h : 0), !(p ? Ze(p, v) : o(l, v, r)))) {
                for (u = a; --u; ) {
                  var g = s[u];
                  if (!(g ? Ze(g, v) : o(e[u], v, r))) continue t;
                }
                p && p.push(v), l.push(h);
              }
            }
            return l;
          }
          function kr(e, n, r) {
            var o = null == (e = Ni(e, (n = _o(n, e)))) ? e : e[$i(ea(n))];
            return null == o ? t : _e(o, e, r);
          }
          function Pr(t) {
            return au(t) && Ar(t) == h;
          }
          function Or(e, n, r, o, i) {
            return (
              e === n ||
              (null == e || null == n || (!au(e) && !au(n))
                ? e != e && n != n
                : (function (e, n, r, o, i, a) {
                    var u = Ka(e),
                      s = Ka(n),
                      c = u ? v : gi(e),
                      l = s ? v : gi(n),
                      f = (c = c == h ? C : c) == C,
                      d = (l = l == h ? C : l) == C,
                      p = c == l;
                    if (p && Xa(e)) {
                      if (!Xa(n)) return !1;
                      (u = !0), (f = !1);
                    }
                    if (p && !f)
                      return (
                        a || (a = new Jn()),
                        u || hu(e)
                          ? ri(e, n, r, o, i, a)
                          : (function (t, e, n, r, o, i, a) {
                              switch (n) {
                                case k:
                                  if (
                                    t.byteLength != e.byteLength ||
                                    t.byteOffset != e.byteOffset
                                  )
                                    return !1;
                                  (t = t.buffer), (e = e.buffer);
                                case B:
                                  return !(
                                    t.byteLength != e.byteLength ||
                                    !i(new Wt(t), new Wt(e))
                                  );
                                case g:
                                case y:
                                case S:
                                  return Wa(+t, +e);
                                case m:
                                  return (
                                    t.name == e.name && t.message == e.message
                                  );
                                case E:
                                case T:
                                  return t == e + '';
                                case _:
                                  var u = un;
                                case A:
                                  var s = 1 & r;
                                  if ((u || (u = ln), t.size != e.size && !s))
                                    return !1;
                                  var c = a.get(t);
                                  if (c) return c == e;
                                  (r |= 2), a.set(t, e);
                                  var l = ri(u(t), u(e), r, o, i, a);
                                  return a.delete(t), l;
                                case I:
                                  if (Mn) return Mn.call(t) == Mn.call(e);
                              }
                              return !1;
                            })(e, n, c, r, o, i, a)
                      );
                    if (!(1 & r)) {
                      var b = f && Vt.call(e, '__wrapped__'),
                        w = d && Vt.call(n, '__wrapped__');
                      if (b || w) {
                        var x = b ? e.value() : e,
                          N = w ? n.value() : n;
                        return a || (a = new Jn()), i(x, N, r, o, a);
                      }
                    }
                    return (
                      !!p &&
                      (a || (a = new Jn()),
                      (function (e, n, r, o, i, a) {
                        var u = 1 & r,
                          s = ii(e),
                          c = s.length,
                          l = ii(n).length;
                        if (c != l && !u) return !1;
                        for (var f = c; f--; ) {
                          var d = s[f];
                          if (!(u ? d in n : Vt.call(n, d))) return !1;
                        }
                        var p = a.get(e),
                          h = a.get(n);
                        if (p && h) return p == n && h == e;
                        var v = !0;
                        a.set(e, n), a.set(n, e);
                        for (var g = u; ++f < c; ) {
                          var y = e[(d = s[f])],
                            m = n[d];
                          if (o)
                            var b = u
                              ? o(m, y, d, n, e, a)
                              : o(y, m, d, e, n, a);
                          if (!(b === t ? y === m || i(y, m, r, o, a) : b)) {
                            v = !1;
                            break;
                          }
                          g || (g = 'constructor' == d);
                        }
                        if (v && !g) {
                          var w = e.constructor,
                            _ = n.constructor;
                          w == _ ||
                            !('constructor' in e) ||
                            !('constructor' in n) ||
                            ('function' == typeof w &&
                              w instanceof w &&
                              'function' == typeof _ &&
                              _ instanceof _) ||
                            (v = !1);
                        }
                        return a.delete(e), a.delete(n), v;
                      })(e, n, r, o, i, a))
                    );
                  })(e, n, r, o, Or, i))
            );
          }
          function Rr(e, n, r, o) {
            var i = r.length,
              a = i,
              u = !o;
            if (null == e) return !a;
            for (e = Tt(e); i--; ) {
              var s = r[i];
              if (u && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
            }
            for (; ++i < a; ) {
              var c = (s = r[i])[0],
                l = e[c],
                f = s[1];
              if (u && s[2]) {
                if (l === t && !(c in e)) return !1;
              } else {
                var d = new Jn();
                if (o) var p = o(l, f, c, e, n, d);
                if (!(p === t ? Or(f, l, 3, o, d) : p)) return !1;
              }
            }
            return !0;
          }
          function Ur(t) {
            return (
              !(!iu(t) || ((e = t), Dt && Dt in e)) &&
              (nu(t) ? $t : ht).test(zi(t))
            );
            var e;
          }
          function Vr(t) {
            return 'function' == typeof t
              ? t
              : null == t
              ? ss
              : 'object' == typeof t
              ? Ka(t)
                ? $r(t[0], t[1])
                : Fr(t)
              : ys(t);
          }
          function jr(t) {
            if (!Ei(t)) return mn(t);
            var e = [];
            for (var n in Tt(t))
              Vt.call(t, n) && 'constructor' != n && e.push(n);
            return e;
          }
          function Dr(t) {
            if (!iu(t))
              return (function (t) {
                var e = [];
                if (null != t) for (var n in Tt(t)) e.push(n);
                return e;
              })(t);
            var e = Ei(t),
              n = [];
            for (var r in t)
              ('constructor' != r || (!e && Vt.call(t, r))) && n.push(r);
            return n;
          }
          function Mr(t, e) {
            return t < e;
          }
          function Lr(t, e) {
            var n = -1,
              r = Qa(t) ? St(t.length) : [];
            return (
              pr(t, function (t, o, i) {
                r[++n] = e(t, o, i);
              }),
              r
            );
          }
          function Fr(t) {
            var e = di(t);
            return 1 == e.length && e[0][2]
              ? Ti(e[0][0], e[0][1])
              : function (n) {
                  return n === t || Rr(n, t, e);
                };
          }
          function $r(e, n) {
            return Si(e) && Ai(n)
              ? Ti($i(e), n)
              : function (r) {
                  var o = ku(r, e);
                  return o === t && o === n ? Pu(r, e) : Or(n, o, 3);
                };
          }
          function zr(e, n, r, o, i) {
            e !== n &&
              br(
                n,
                function (a, u) {
                  if ((i || (i = new Jn()), iu(a)))
                    !(function (e, n, r, o, i, a, u) {
                      var s = ki(e, r),
                        c = ki(n, r),
                        l = u.get(c);
                      if (l) er(e, r, l);
                      else {
                        var f = a ? a(s, c, r + '', e, n, u) : t,
                          d = f === t;
                        if (d) {
                          var p = Ka(c),
                            h = !p && Xa(c),
                            v = !p && !h && hu(c);
                          (f = c),
                            p || h || v
                              ? Ka(s)
                                ? (f = s)
                                : Za(s)
                                ? (f = ko(s))
                                : h
                                ? ((d = !1), (f = Eo(c, !0)))
                                : v
                                ? ((d = !1), (f = To(c, !0)))
                                : (f = [])
                              : cu(c) || Ga(c)
                              ? ((f = s),
                                Ga(s)
                                  ? (f = Su(s))
                                  : (iu(s) && !nu(s)) || (f = mi(c)))
                              : (d = !1);
                        }
                        d && (u.set(c, f), i(f, c, o, a, u), u.delete(c)),
                          er(e, r, f);
                      }
                    })(e, n, u, r, zr, o, i);
                  else {
                    var s = o ? o(ki(e, u), a, u + '', e, n, i) : t;
                    s === t && (s = a), er(e, u, s);
                  }
                },
                ju
              );
          }
          function Hr(e, n) {
            var r = e.length;
            if (r) return wi((n += n < 0 ? r : 0), r) ? e[n] : t;
          }
          function Wr(t, e, n) {
            e = e.length
              ? Pe(e, function (t) {
                  return Ka(t)
                    ? function (e) {
                        return xr(e, 1 === t.length ? t[0] : t);
                      }
                    : t;
                })
              : [ss];
            var r = -1;
            return (
              (e = Pe(e, Je(li()))),
              (function (t, e) {
                var n = t.length;
                for (t.sort(e); n--; ) t[n] = t[n].value;
                return t;
              })(
                Lr(t, function (t, n, o) {
                  return {
                    criteria: Pe(e, function (e) {
                      return e(t);
                    }),
                    index: ++r,
                    value: t,
                  };
                }),
                function (t, e) {
                  return (function (t, e, n) {
                    for (
                      var r = -1,
                        o = t.criteria,
                        i = e.criteria,
                        a = o.length,
                        u = n.length;
                      ++r < a;

                    ) {
                      var s = Io(o[r], i[r]);
                      if (s) return r >= u ? s : s * ('desc' == n[r] ? -1 : 1);
                    }
                    return t.index - e.index;
                  })(t, e, n);
                }
              )
            );
          }
          function Yr(t, e, n) {
            for (var r = -1, o = e.length, i = {}; ++r < o; ) {
              var a = e[r],
                u = xr(t, a);
              n(u, a) && to(i, _o(a, t), u);
            }
            return i;
          }
          function qr(t, e, n, r) {
            var o = r ? Fe : Le,
              i = -1,
              a = e.length,
              u = t;
            for (t === e && (e = ko(e)), n && (u = Pe(t, Je(n))); ++i < a; )
              for (
                var s = 0, c = e[i], l = n ? n(c) : c;
                (s = o(u, l, s, r)) > -1;

              )
                u !== t && oe.call(u, s, 1), oe.call(t, s, 1);
            return t;
          }
          function Gr(t, e) {
            for (var n = t ? e.length : 0, r = n - 1; n--; ) {
              var o = e[n];
              if (n == r || o !== i) {
                var i = o;
                wi(o) ? oe.call(t, o, 1) : po(t, o);
              }
            }
            return t;
          }
          function Kr(t, e) {
            return t + Be(Cn() * (e - t + 1));
          }
          function Jr(t, e) {
            var n = '';
            if (!t || e < 1 || e > l) return n;
            do {
              e % 2 && (n += t), (e = Be(e / 2)) && (t += t);
            } while (e);
            return n;
          }
          function Qr(t, e) {
            return Ri(Ii(t, e, ss), t + '');
          }
          function Zr(t) {
            return Zn(Wu(t));
          }
          function Xr(t, e) {
            var n = Wu(t);
            return ji(n, sr(e, 0, n.length));
          }
          function to(e, n, r, o) {
            if (!iu(e)) return e;
            for (
              var i = -1, a = (n = _o(n, e)).length, u = a - 1, s = e;
              null != s && ++i < a;

            ) {
              var c = $i(n[i]),
                l = r;
              if ('__proto__' === c || 'constructor' === c || 'prototype' === c)
                return e;
              if (i != u) {
                var f = s[c];
                (l = o ? o(f, c, s) : t) === t &&
                  (l = iu(f) ? f : wi(n[i + 1]) ? [] : {});
              }
              nr(s, c, l), (s = s[c]);
            }
            return e;
          }
          var eo = kn
              ? function (t, e) {
                  return kn.set(t, e), t;
                }
              : ss,
            no = fe
              ? function (t, e) {
                  return fe(t, 'toString', {
                    configurable: !0,
                    enumerable: !1,
                    value: is(e),
                    writable: !0,
                  });
                }
              : ss;
          function ro(t) {
            return ji(Wu(t));
          }
          function oo(t, e, n) {
            var r = -1,
              o = t.length;
            e < 0 && (e = -e > o ? 0 : o + e),
              (n = n > o ? o : n) < 0 && (n += o),
              (o = e > n ? 0 : (n - e) >>> 0),
              (e >>>= 0);
            for (var i = St(o); ++r < o; ) i[r] = t[r + e];
            return i;
          }
          function io(t, e) {
            var n;
            return (
              pr(t, function (t, r, o) {
                return !(n = e(t, r, o));
              }),
              !!n
            );
          }
          function ao(t, e, n) {
            var r = 0,
              o = null == t ? r : t.length;
            if ('number' == typeof e && e == e && o <= 2147483647) {
              for (; r < o; ) {
                var i = (r + o) >>> 1,
                  a = t[i];
                null !== a && !pu(a) && (n ? a <= e : a < e)
                  ? (r = i + 1)
                  : (o = i);
              }
              return o;
            }
            return uo(t, e, ss, n);
          }
          function uo(e, n, r, o) {
            var i = 0,
              a = null == e ? 0 : e.length;
            if (0 === a) return 0;
            for (
              var u = (n = r(n)) != n, s = null === n, c = pu(n), l = n === t;
              i < a;

            ) {
              var f = Be((i + a) / 2),
                d = r(e[f]),
                p = d !== t,
                h = null === d,
                v = d == d,
                g = pu(d);
              if (u) var y = o || v;
              else
                y = l
                  ? v && (o || p)
                  : s
                  ? v && p && (o || !h)
                  : c
                  ? v && p && !h && (o || !g)
                  : !h && !g && (o ? d <= n : d < n);
              y ? (i = f + 1) : (a = f);
            }
            return wn(a, 4294967294);
          }
          function so(t, e) {
            for (var n = -1, r = t.length, o = 0, i = []; ++n < r; ) {
              var a = t[n],
                u = e ? e(a) : a;
              if (!n || !Wa(u, s)) {
                var s = u;
                i[o++] = 0 === a ? 0 : a;
              }
            }
            return i;
          }
          function co(t) {
            return 'number' == typeof t ? t : pu(t) ? f : +t;
          }
          function lo(t) {
            if ('string' == typeof t) return t;
            if (Ka(t)) return Pe(t, lo) + '';
            if (pu(t)) return Ln ? Ln.call(t) : '';
            var e = t + '';
            return '0' == e && 1 / t == -1 / 0 ? '-0' : e;
          }
          function fo(t, e, n) {
            var r = -1,
              o = Te,
              i = t.length,
              a = !0,
              u = [],
              s = u;
            if (n) (a = !1), (o = ke);
            else if (i >= 200) {
              var c = e ? null : Qo(t);
              if (c) return ln(c);
              (a = !1), (o = Ze), (s = new Kn());
            } else s = e ? [] : u;
            t: for (; ++r < i; ) {
              var l = t[r],
                f = e ? e(l) : l;
              if (((l = n || 0 !== l ? l : 0), a && f == f)) {
                for (var d = s.length; d--; ) if (s[d] === f) continue t;
                e && s.push(f), u.push(l);
              } else o(s, f, n) || (s !== u && s.push(f), u.push(l));
            }
            return u;
          }
          function po(t, e) {
            return null == (t = Ni(t, (e = _o(e, t)))) || delete t[$i(ea(e))];
          }
          function ho(t, e, n, r) {
            return to(t, e, n(xr(t, e)), r);
          }
          function vo(t, e, n, r) {
            for (
              var o = t.length, i = r ? o : -1;
              (r ? i-- : ++i < o) && e(t[i], i, t);

            );
            return n
              ? oo(t, r ? 0 : i, r ? i + 1 : o)
              : oo(t, r ? i + 1 : 0, r ? o : i);
          }
          function go(t, e) {
            var n = t;
            return (
              n instanceof Wn && (n = n.value()),
              Re(
                e,
                function (t, e) {
                  return e.func.apply(e.thisArg, Oe([t], e.args));
                },
                n
              )
            );
          }
          function yo(t, e, n) {
            var r = t.length;
            if (r < 2) return r ? fo(t[0]) : [];
            for (var o = -1, i = St(r); ++o < r; )
              for (var a = t[o], u = -1; ++u < r; )
                u != o && (i[o] = dr(i[o] || a, t[u], e, n));
            return fo(mr(i, 1), e, n);
          }
          function mo(e, n, r) {
            for (var o = -1, i = e.length, a = n.length, u = {}; ++o < i; ) {
              var s = o < a ? n[o] : t;
              r(u, e[o], s);
            }
            return u;
          }
          function bo(t) {
            return Za(t) ? t : [];
          }
          function wo(t) {
            return 'function' == typeof t ? t : ss;
          }
          function _o(t, e) {
            return Ka(t) ? t : Si(t, e) ? [t] : Fi(Cu(t));
          }
          var So = Qr;
          function Co(e, n, r) {
            var o = e.length;
            return (r = r === t ? o : r), !n && r >= o ? e : oo(e, n, r);
          }
          var xo =
            pe ||
            function (t) {
              return ce.clearTimeout(t);
            };
          function Eo(t, e) {
            if (e) return t.slice();
            var n = t.length,
              r = Yt ? Yt(n) : new t.constructor(n);
            return t.copy(r), r;
          }
          function Ao(t) {
            var e = new t.constructor(t.byteLength);
            return new Wt(e).set(new Wt(t)), e;
          }
          function To(t, e) {
            var n = e ? Ao(t.buffer) : t.buffer;
            return new t.constructor(n, t.byteOffset, t.length);
          }
          function Io(e, n) {
            if (e !== n) {
              var r = e !== t,
                o = null === e,
                i = e == e,
                a = pu(e),
                u = n !== t,
                s = null === n,
                c = n == n,
                l = pu(n);
              if (
                (!s && !l && !a && e > n) ||
                (a && u && c && !s && !l) ||
                (o && u && c) ||
                (!r && c) ||
                !i
              )
                return 1;
              if (
                (!o && !a && !l && e < n) ||
                (l && r && i && !o && !a) ||
                (s && r && i) ||
                (!u && i) ||
                !c
              )
                return -1;
            }
            return 0;
          }
          function No(t, e, n, r) {
            for (
              var o = -1,
                i = t.length,
                a = n.length,
                u = -1,
                s = e.length,
                c = bn(i - a, 0),
                l = St(s + c),
                f = !r;
              ++u < s;

            )
              l[u] = e[u];
            for (; ++o < a; ) (f || o < i) && (l[n[o]] = t[o]);
            for (; c--; ) l[u++] = t[o++];
            return l;
          }
          function Bo(t, e, n, r) {
            for (
              var o = -1,
                i = t.length,
                a = -1,
                u = n.length,
                s = -1,
                c = e.length,
                l = bn(i - u, 0),
                f = St(l + c),
                d = !r;
              ++o < l;

            )
              f[o] = t[o];
            for (var p = o; ++s < c; ) f[p + s] = e[s];
            for (; ++a < u; ) (d || o < i) && (f[p + n[a]] = t[o++]);
            return f;
          }
          function ko(t, e) {
            var n = -1,
              r = t.length;
            for (e || (e = St(r)); ++n < r; ) e[n] = t[n];
            return e;
          }
          function Po(e, n, r, o) {
            var i = !r;
            r || (r = {});
            for (var a = -1, u = n.length; ++a < u; ) {
              var s = n[a],
                c = o ? o(r[s], e[s], s, r, e) : t;
              c === t && (c = e[s]), i ? ar(r, s, c) : nr(r, s, c);
            }
            return r;
          }
          function Oo(t, e) {
            return function (n, r) {
              var o = Ka(n) ? Se : or,
                i = e ? e() : {};
              return o(n, t, li(r, 2), i);
            };
          }
          function Ro(e) {
            return Qr(function (n, r) {
              var o = -1,
                i = r.length,
                a = i > 1 ? r[i - 1] : t,
                u = i > 2 ? r[2] : t;
              for (
                a = e.length > 3 && 'function' == typeof a ? (i--, a) : t,
                  u && _i(r[0], r[1], u) && ((a = i < 3 ? t : a), (i = 1)),
                  n = Tt(n);
                ++o < i;

              ) {
                var s = r[o];
                s && e(n, s, o, a);
              }
              return n;
            });
          }
          function Uo(t, e) {
            return function (n, r) {
              if (null == n) return n;
              if (!Qa(n)) return t(n, r);
              for (
                var o = n.length, i = e ? o : -1, a = Tt(n);
                (e ? i-- : ++i < o) && !1 !== r(a[i], i, a);

              );
              return n;
            };
          }
          function Vo(t) {
            return function (e, n, r) {
              for (var o = -1, i = Tt(e), a = r(e), u = a.length; u--; ) {
                var s = a[t ? u : ++o];
                if (!1 === n(i[s], s, i)) break;
              }
              return e;
            };
          }
          function jo(e) {
            return function (n) {
              var r = an((n = Cu(n))) ? dn(n) : t,
                o = r ? r[0] : n.charAt(0),
                i = r ? Co(r, 1).join('') : n.slice(1);
              return o[e]() + i;
            };
          }
          function Do(t) {
            return function (e) {
              return Re(ns(Gu(e).replace(Gt, '')), t, '');
            };
          }
          function Mo(t) {
            return function () {
              var e = arguments;
              switch (e.length) {
                case 0:
                  return new t();
                case 1:
                  return new t(e[0]);
                case 2:
                  return new t(e[0], e[1]);
                case 3:
                  return new t(e[0], e[1], e[2]);
                case 4:
                  return new t(e[0], e[1], e[2], e[3]);
                case 5:
                  return new t(e[0], e[1], e[2], e[3], e[4]);
                case 6:
                  return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
                case 7:
                  return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
              }
              var n = $n(t.prototype),
                r = t.apply(n, e);
              return iu(r) ? r : n;
            };
          }
          function Lo(e) {
            return function (n, r, o) {
              var i = Tt(n);
              if (!Qa(n)) {
                var a = li(r, 3);
                (n = Vu(n)),
                  (r = function (t) {
                    return a(i[t], t, i);
                  });
              }
              var u = e(n, r, o);
              return u > -1 ? i[a ? n[u] : u] : t;
            };
          }
          function Fo(n) {
            return oi(function (r) {
              var o = r.length,
                i = o,
                a = Hn.prototype.thru;
              for (n && r.reverse(); i--; ) {
                var u = r[i];
                if ('function' != typeof u) throw new Bt(e);
                if (a && !s && 'wrapper' == si(u)) var s = new Hn([], !0);
              }
              for (i = s ? i : o; ++i < o; ) {
                var c = si((u = r[i])),
                  l = 'wrapper' == c ? ui(u) : t;
                s =
                  l && Ci(l[0]) && 424 == l[1] && !l[4].length && 1 == l[9]
                    ? s[si(l[0])].apply(s, l[3])
                    : 1 == u.length && Ci(u)
                    ? s[c]()
                    : s.thru(u);
              }
              return function () {
                var t = arguments,
                  e = t[0];
                if (s && 1 == t.length && Ka(e)) return s.plant(e).value();
                for (var n = 0, i = o ? r[n].apply(this, t) : e; ++n < o; )
                  i = r[n].call(this, i);
                return i;
              };
            });
          }
          function $o(e, n, r, o, i, a, s, c, l, f) {
            var d = n & u,
              p = 1 & n,
              h = 2 & n,
              v = 24 & n,
              g = 512 & n,
              y = h ? t : Mo(e);
            return function t() {
              for (var u = arguments.length, m = St(u), b = u; b--; )
                m[b] = arguments[b];
              if (v)
                var w = ci(t),
                  _ = en(m, w);
              if (
                (o && (m = No(m, o, i, v)),
                a && (m = Bo(m, a, s, v)),
                (u -= _),
                v && u < f)
              ) {
                var S = cn(m, w);
                return Ko(e, n, $o, t.placeholder, r, m, S, c, l, f - u);
              }
              var C = p ? r : this,
                x = h ? C[e] : e;
              return (
                (u = m.length),
                c ? (m = Bi(m, c)) : g && u > 1 && m.reverse(),
                d && l < u && (m.length = l),
                this && this !== ce && this instanceof t && (x = y || Mo(x)),
                x.apply(C, m)
              );
            };
          }
          function zo(t, e) {
            return function (n, r) {
              return (function (t, e, n, r) {
                return (
                  _r(t, function (t, o, i) {
                    e(r, n(t), o, i);
                  }),
                  r
                );
              })(n, t, e(r), {});
            };
          }
          function Ho(e, n) {
            return function (r, o) {
              var i;
              if (r === t && o === t) return n;
              if ((r !== t && (i = r), o !== t)) {
                if (i === t) return o;
                'string' == typeof r || 'string' == typeof o
                  ? ((r = lo(r)), (o = lo(o)))
                  : ((r = co(r)), (o = co(o))),
                  (i = e(r, o));
              }
              return i;
            };
          }
          function Wo(t) {
            return oi(function (e) {
              return (
                (e = Pe(e, Je(li()))),
                Qr(function (n) {
                  var r = this;
                  return t(e, function (t) {
                    return _e(t, r, n);
                  });
                })
              );
            });
          }
          function Yo(e, n) {
            var r = (n = n === t ? ' ' : lo(n)).length;
            if (r < 2) return r ? Jr(n, e) : n;
            var o = Jr(n, Ne(e / fn(n)));
            return an(n) ? Co(dn(o), 0, e).join('') : o.slice(0, e);
          }
          function qo(e) {
            return function (n, r, o) {
              return (
                o && 'number' != typeof o && _i(n, r, o) && (r = o = t),
                (n = mu(n)),
                r === t ? ((r = n), (n = 0)) : (r = mu(r)),
                (function (t, e, n, r) {
                  for (
                    var o = -1, i = bn(Ne((e - t) / (n || 1)), 0), a = St(i);
                    i--;

                  )
                    (a[r ? i : ++o] = t), (t += n);
                  return a;
                })(n, r, (o = o === t ? (n < r ? 1 : -1) : mu(o)), e)
              );
            };
          }
          function Go(t) {
            return function (e, n) {
              return (
                ('string' == typeof e && 'string' == typeof n) ||
                  ((e = _u(e)), (n = _u(n))),
                t(e, n)
              );
            };
          }
          function Ko(e, n, r, o, u, s, c, l, f, d) {
            var p = 8 & n;
            (n |= p ? i : a), 4 & (n &= ~(p ? a : i)) || (n &= -4);
            var h = [
                e,
                n,
                u,
                p ? s : t,
                p ? c : t,
                p ? t : s,
                p ? t : c,
                l,
                f,
                d,
              ],
              v = r.apply(t, h);
            return Ci(e) && Pi(v, h), (v.placeholder = o), Ui(v, e, n);
          }
          function Jo(t) {
            var e = At[t];
            return function (t, n) {
              if (
                ((t = _u(t)), (n = null == n ? 0 : wn(bu(n), 292)) && gn(t))
              ) {
                var r = (Cu(t) + 'e').split('e');
                return +(
                  (r = (Cu(e(r[0] + 'e' + (+r[1] + n))) + 'e').split('e'))[0] +
                  'e' +
                  (+r[1] - n)
                );
              }
              return e(t);
            };
          }
          var Qo =
            In && 1 / ln(new In([, -0]))[1] == c
              ? function (t) {
                  return new In(t);
                }
              : ps;
          function Zo(t) {
            return function (e) {
              var n = gi(e);
              return n == _
                ? un(e)
                : n == A
                ? (function (t) {
                    var e = -1,
                      n = Array(t.size);
                    return (
                      t.forEach(function (t) {
                        n[++e] = [t, t];
                      }),
                      n
                    );
                  })(e)
                : (function (t, e) {
                    return Pe(e, function (e) {
                      return [e, t[e]];
                    });
                  })(e, t(e));
            };
          }
          function Xo(n, c, l, f, d, p, h, v) {
            var g = 2 & c;
            if (!g && 'function' != typeof n) throw new Bt(e);
            var y = f ? f.length : 0;
            if (
              (y || ((c &= -97), (f = d = t)),
              (h = h === t ? h : bn(bu(h), 0)),
              (v = v === t ? v : bu(v)),
              (y -= d ? d.length : 0),
              c & a)
            ) {
              var m = f,
                b = d;
              f = d = t;
            }
            var w = g ? t : ui(n),
              _ = [n, c, l, f, d, m, b, p, h, v];
            if (
              (w &&
                (function (t, e) {
                  var n = t[1],
                    o = e[1],
                    i = n | o,
                    a = i < 131,
                    c =
                      (o == u && 8 == n) ||
                      (o == u && n == s && t[7].length <= e[8]) ||
                      (384 == o && e[7].length <= e[8] && 8 == n);
                  if (!a && !c) return t;
                  1 & o && ((t[2] = e[2]), (i |= 1 & n ? 0 : 4));
                  var l = e[3];
                  if (l) {
                    var f = t[3];
                    (t[3] = f ? No(f, l, e[4]) : l),
                      (t[4] = f ? cn(t[3], r) : e[4]);
                  }
                  (l = e[5]) &&
                    ((f = t[5]),
                    (t[5] = f ? Bo(f, l, e[6]) : l),
                    (t[6] = f ? cn(t[5], r) : e[6])),
                    (l = e[7]) && (t[7] = l),
                    o & u && (t[8] = null == t[8] ? e[8] : wn(t[8], e[8])),
                    null == t[9] && (t[9] = e[9]),
                    (t[0] = e[0]),
                    (t[1] = i);
                })(_, w),
              (n = _[0]),
              (c = _[1]),
              (l = _[2]),
              (f = _[3]),
              (d = _[4]),
              !(v = _[9] = _[9] === t ? (g ? 0 : n.length) : bn(_[9] - y, 0)) &&
                24 & c &&
                (c &= -25),
              c && 1 != c)
            )
              S =
                8 == c || c == o
                  ? (function (e, n, r) {
                      var o = Mo(e);
                      return function i() {
                        for (
                          var a = arguments.length, u = St(a), s = a, c = ci(i);
                          s--;

                        )
                          u[s] = arguments[s];
                        var l =
                          a < 3 && u[0] !== c && u[a - 1] !== c ? [] : cn(u, c);
                        return (a -= l.length) < r
                          ? Ko(e, n, $o, i.placeholder, t, u, l, t, t, r - a)
                          : _e(
                              this && this !== ce && this instanceof i ? o : e,
                              this,
                              u
                            );
                      };
                    })(n, c, v)
                  : (c != i && 33 != c) || d.length
                  ? $o.apply(t, _)
                  : (function (t, e, n, r) {
                      var o = 1 & e,
                        i = Mo(t);
                      return function e() {
                        for (
                          var a = -1,
                            u = arguments.length,
                            s = -1,
                            c = r.length,
                            l = St(c + u),
                            f =
                              this && this !== ce && this instanceof e ? i : t;
                          ++s < c;

                        )
                          l[s] = r[s];
                        for (; u--; ) l[s++] = arguments[++a];
                        return _e(f, o ? n : this, l);
                      };
                    })(n, c, l, f);
            else
              var S = (function (t, e, n) {
                var r = 1 & e,
                  o = Mo(t);
                return function e() {
                  return (
                    this && this !== ce && this instanceof e ? o : t
                  ).apply(r ? n : this, arguments);
                };
              })(n, c, l);
            return Ui((w ? eo : Pi)(S, _), n, c);
          }
          function ti(e, n, r, o) {
            return e === t || (Wa(e, Ot[r]) && !Vt.call(o, r)) ? n : e;
          }
          function ei(e, n, r, o, i, a) {
            return (
              iu(e) && iu(n) && (a.set(n, e), zr(e, n, t, ei, a), a.delete(n)),
              e
            );
          }
          function ni(e) {
            return cu(e) ? t : e;
          }
          function ri(e, n, r, o, i, a) {
            var u = 1 & r,
              s = e.length,
              c = n.length;
            if (s != c && !(u && c > s)) return !1;
            var l = a.get(e),
              f = a.get(n);
            if (l && f) return l == n && f == e;
            var d = -1,
              p = !0,
              h = 2 & r ? new Kn() : t;
            for (a.set(e, n), a.set(n, e); ++d < s; ) {
              var v = e[d],
                g = n[d];
              if (o) var y = u ? o(g, v, d, n, e, a) : o(v, g, d, e, n, a);
              if (y !== t) {
                if (y) continue;
                p = !1;
                break;
              }
              if (h) {
                if (
                  !Ve(n, function (t, e) {
                    if (!Ze(h, e) && (v === t || i(v, t, r, o, a)))
                      return h.push(e);
                  })
                ) {
                  p = !1;
                  break;
                }
              } else if (v !== g && !i(v, g, r, o, a)) {
                p = !1;
                break;
              }
            }
            return a.delete(e), a.delete(n), p;
          }
          function oi(e) {
            return Ri(Ii(e, t, Ji), e + '');
          }
          function ii(t) {
            return Er(t, Vu, hi);
          }
          function ai(t) {
            return Er(t, ju, vi);
          }
          var ui = kn
            ? function (t) {
                return kn.get(t);
              }
            : ps;
          function si(t) {
            for (
              var e = t.name + '', n = Pn[e], r = Vt.call(Pn, e) ? n.length : 0;
              r--;

            ) {
              var o = n[r],
                i = o.func;
              if (null == i || i == t) return o.name;
            }
            return e;
          }
          function ci(t) {
            return (Vt.call(Fn, 'placeholder') ? Fn : t).placeholder;
          }
          function li() {
            var t = Fn.iteratee || cs;
            return (
              (t = t === cs ? Vr : t),
              arguments.length ? t(arguments[0], arguments[1]) : t
            );
          }
          function fi(t, e) {
            var n,
              r,
              o = t.__data__;
            return (
              'string' == (r = typeof (n = e)) ||
              'number' == r ||
              'symbol' == r ||
              'boolean' == r
                ? '__proto__' !== n
                : null === n
            )
              ? o['string' == typeof e ? 'string' : 'hash']
              : o.map;
          }
          function di(t) {
            for (var e = Vu(t), n = e.length; n--; ) {
              var r = e[n],
                o = t[r];
              e[n] = [r, o, Ai(o)];
            }
            return e;
          }
          function pi(e, n) {
            var r = (function (e, n) {
              return null == e ? t : e[n];
            })(e, n);
            return Ur(r) ? r : t;
          }
          var hi = je
              ? function (t) {
                  return null == t
                    ? []
                    : ((t = Tt(t)),
                      Ae(je(t), function (e) {
                        return Zt.call(t, e);
                      }));
                }
              : ws,
            vi = je
              ? function (t) {
                  for (var e = []; t; ) Oe(e, hi(t)), (t = qt(t));
                  return e;
                }
              : ws,
            gi = Ar;
          function yi(t, e, n) {
            for (var r = -1, o = (e = _o(e, t)).length, i = !1; ++r < o; ) {
              var a = $i(e[r]);
              if (!(i = null != t && n(t, a))) break;
              t = t[a];
            }
            return i || ++r != o
              ? i
              : !!(o = null == t ? 0 : t.length) &&
                  ou(o) &&
                  wi(a, o) &&
                  (Ka(t) || Ga(t));
          }
          function mi(t) {
            return 'function' != typeof t.constructor || Ei(t) ? {} : $n(qt(t));
          }
          function bi(t) {
            return Ka(t) || Ga(t) || !!(ue && t && t[ue]);
          }
          function wi(t, e) {
            var n = typeof t;
            return (
              !!(e = null == e ? l : e) &&
              ('number' == n || ('symbol' != n && gt.test(t))) &&
              t > -1 &&
              t % 1 == 0 &&
              t < e
            );
          }
          function _i(t, e, n) {
            if (!iu(n)) return !1;
            var r = typeof e;
            return (
              !!('number' == r
                ? Qa(n) && wi(e, n.length)
                : 'string' == r && e in n) && Wa(n[e], t)
            );
          }
          function Si(t, e) {
            if (Ka(t)) return !1;
            var n = typeof t;
            return (
              !(
                'number' != n &&
                'symbol' != n &&
                'boolean' != n &&
                null != t &&
                !pu(t)
              ) ||
              Z.test(t) ||
              !Q.test(t) ||
              (null != e && t in Tt(e))
            );
          }
          function Ci(t) {
            var e = si(t),
              n = Fn[e];
            if ('function' != typeof n || !(e in Wn.prototype)) return !1;
            if (t === n) return !0;
            var r = ui(n);
            return !!r && t === r[0];
          }
          ((En && gi(new En(new ArrayBuffer(1))) != k) ||
            (An && gi(new An()) != _) ||
            (Tn && gi(Tn.resolve()) != x) ||
            (In && gi(new In()) != A) ||
            (Nn && gi(new Nn()) != N)) &&
            (gi = function (e) {
              var n = Ar(e),
                r = n == C ? e.constructor : t,
                o = r ? zi(r) : '';
              if (o)
                switch (o) {
                  case On:
                    return k;
                  case Rn:
                    return _;
                  case Un:
                    return x;
                  case Vn:
                    return A;
                  case jn:
                    return N;
                }
              return n;
            });
          var xi = Rt ? nu : _s;
          function Ei(t) {
            var e = t && t.constructor;
            return t === (('function' == typeof e && e.prototype) || Ot);
          }
          function Ai(t) {
            return t == t && !iu(t);
          }
          function Ti(e, n) {
            return function (r) {
              return null != r && r[e] === n && (n !== t || e in Tt(r));
            };
          }
          function Ii(e, n, r) {
            return (
              (n = bn(n === t ? e.length - 1 : n, 0)),
              function () {
                for (
                  var t = arguments, o = -1, i = bn(t.length - n, 0), a = St(i);
                  ++o < i;

                )
                  a[o] = t[n + o];
                o = -1;
                for (var u = St(n + 1); ++o < n; ) u[o] = t[o];
                return (u[n] = r(a)), _e(e, this, u);
              }
            );
          }
          function Ni(t, e) {
            return e.length < 2 ? t : xr(t, oo(e, 0, -1));
          }
          function Bi(e, n) {
            for (var r = e.length, o = wn(n.length, r), i = ko(e); o--; ) {
              var a = n[o];
              e[o] = wi(a, r) ? i[a] : t;
            }
            return e;
          }
          function ki(t, e) {
            if (
              ('constructor' !== e || 'function' != typeof t[e]) &&
              '__proto__' != e
            )
              return t[e];
          }
          var Pi = Vi(eo),
            Oi =
              Ie ||
              function (t, e) {
                return ce.setTimeout(t, e);
              },
            Ri = Vi(no);
          function Ui(t, e, n) {
            var r = e + '';
            return Ri(
              t,
              (function (t, e) {
                var n = e.length;
                if (!n) return t;
                var r = n - 1;
                return (
                  (e[r] = (n > 1 ? '& ' : '') + e[r]),
                  (e = e.join(n > 2 ? ', ' : ' ')),
                  t.replace(ot, '{\n/* [wrapped with ' + e + '] */\n')
                );
              })(
                r,
                (function (t, e) {
                  return (
                    Ce(p, function (n) {
                      var r = '_.' + n[0];
                      e & n[1] && !Te(t, r) && t.push(r);
                    }),
                    t.sort()
                  );
                })(
                  (function (t) {
                    var e = t.match(it);
                    return e ? e[1].split(at) : [];
                  })(r),
                  n
                )
              )
            );
          }
          function Vi(e) {
            var n = 0,
              r = 0;
            return function () {
              var o = _n(),
                i = 16 - (o - r);
              if (((r = o), i > 0)) {
                if (++n >= 800) return arguments[0];
              } else n = 0;
              return e.apply(t, arguments);
            };
          }
          function ji(e, n) {
            var r = -1,
              o = e.length,
              i = o - 1;
            for (n = n === t ? o : n; ++r < n; ) {
              var a = Kr(r, i),
                u = e[a];
              (e[a] = e[r]), (e[r] = u);
            }
            return (e.length = n), e;
          }
          var Di,
            Mi,
            Li,
            Fi =
              ((Di = function (t) {
                var e = [];
                return (
                  46 === t.charCodeAt(0) && e.push(''),
                  t.replace(X, function (t, n, r, o) {
                    e.push(r ? o.replace(ct, '$1') : n || t);
                  }),
                  e
                );
              }),
              (Mi = Ma(Di, function (t) {
                return 500 === Li.size && Li.clear(), t;
              })),
              (Li = Mi.cache),
              Mi);
          function $i(t) {
            if ('string' == typeof t || pu(t)) return t;
            var e = t + '';
            return '0' == e && 1 / t == -1 / 0 ? '-0' : e;
          }
          function zi(t) {
            if (null != t) {
              try {
                return Ut.call(t);
              } catch (e) {}
              try {
                return t + '';
              } catch (e) {}
            }
            return '';
          }
          function Hi(t) {
            if (t instanceof Wn) return t.clone();
            var e = new Hn(t.__wrapped__, t.__chain__);
            return (
              (e.__actions__ = ko(t.__actions__)),
              (e.__index__ = t.__index__),
              (e.__values__ = t.__values__),
              e
            );
          }
          var Wi = Qr(function (t, e) {
              return Za(t) ? dr(t, mr(e, 1, Za, !0)) : [];
            }),
            Yi = Qr(function (e, n) {
              var r = ea(n);
              return (
                Za(r) && (r = t), Za(e) ? dr(e, mr(n, 1, Za, !0), li(r, 2)) : []
              );
            }),
            qi = Qr(function (e, n) {
              var r = ea(n);
              return (
                Za(r) && (r = t), Za(e) ? dr(e, mr(n, 1, Za, !0), t, r) : []
              );
            });
          function Gi(t, e, n) {
            var r = null == t ? 0 : t.length;
            if (!r) return -1;
            var o = null == n ? 0 : bu(n);
            return o < 0 && (o = bn(r + o, 0)), Me(t, li(e, 3), o);
          }
          function Ki(e, n, r) {
            var o = null == e ? 0 : e.length;
            if (!o) return -1;
            var i = o - 1;
            return (
              r !== t &&
                ((i = bu(r)), (i = r < 0 ? bn(o + i, 0) : wn(i, o - 1))),
              Me(e, li(n, 3), i, !0)
            );
          }
          function Ji(t) {
            return null != t && t.length ? mr(t, 1) : [];
          }
          function Qi(e) {
            return e && e.length ? e[0] : t;
          }
          var Zi = Qr(function (t) {
              var e = Pe(t, bo);
              return e.length && e[0] === t[0] ? Br(e) : [];
            }),
            Xi = Qr(function (e) {
              var n = ea(e),
                r = Pe(e, bo);
              return (
                n === ea(r) ? (n = t) : r.pop(),
                r.length && r[0] === e[0] ? Br(r, li(n, 2)) : []
              );
            }),
            ta = Qr(function (e) {
              var n = ea(e),
                r = Pe(e, bo);
              return (
                (n = 'function' == typeof n ? n : t) && r.pop(),
                r.length && r[0] === e[0] ? Br(r, t, n) : []
              );
            });
          function ea(e) {
            var n = null == e ? 0 : e.length;
            return n ? e[n - 1] : t;
          }
          var na = Qr(ra);
          function ra(t, e) {
            return t && t.length && e && e.length ? qr(t, e) : t;
          }
          var oa = oi(function (t, e) {
            var n = null == t ? 0 : t.length,
              r = ur(t, e);
            return (
              Gr(
                t,
                Pe(e, function (t) {
                  return wi(t, n) ? +t : t;
                }).sort(Io)
              ),
              r
            );
          });
          function ia(t) {
            return null == t ? t : xn.call(t);
          }
          var aa = Qr(function (t) {
              return fo(mr(t, 1, Za, !0));
            }),
            ua = Qr(function (e) {
              var n = ea(e);
              return Za(n) && (n = t), fo(mr(e, 1, Za, !0), li(n, 2));
            }),
            sa = Qr(function (e) {
              var n = ea(e);
              return (
                (n = 'function' == typeof n ? n : t), fo(mr(e, 1, Za, !0), t, n)
              );
            });
          function ca(t) {
            if (!t || !t.length) return [];
            var e = 0;
            return (
              (t = Ae(t, function (t) {
                if (Za(t)) return (e = bn(t.length, e)), !0;
              })),
              Ge(e, function (e) {
                return Pe(t, He(e));
              })
            );
          }
          function la(e, n) {
            if (!e || !e.length) return [];
            var r = ca(e);
            return null == n
              ? r
              : Pe(r, function (e) {
                  return _e(n, t, e);
                });
          }
          var fa = Qr(function (t, e) {
              return Za(t) ? dr(t, e) : [];
            }),
            da = Qr(function (t) {
              return yo(Ae(t, Za));
            }),
            pa = Qr(function (e) {
              var n = ea(e);
              return Za(n) && (n = t), yo(Ae(e, Za), li(n, 2));
            }),
            ha = Qr(function (e) {
              var n = ea(e);
              return (n = 'function' == typeof n ? n : t), yo(Ae(e, Za), t, n);
            }),
            va = Qr(ca),
            ga = Qr(function (e) {
              var n = e.length,
                r = n > 1 ? e[n - 1] : t;
              return (r = 'function' == typeof r ? (e.pop(), r) : t), la(e, r);
            });
          function ya(t) {
            var e = Fn(t);
            return (e.__chain__ = !0), e;
          }
          function ma(t, e) {
            return e(t);
          }
          var ba = oi(function (e) {
              var n = e.length,
                r = n ? e[0] : 0,
                o = this.__wrapped__,
                i = function (t) {
                  return ur(t, e);
                };
              return !(n > 1 || this.__actions__.length) &&
                o instanceof Wn &&
                wi(r)
                ? ((o = o.slice(r, +r + (n ? 1 : 0))).__actions__.push({
                    func: ma,
                    args: [i],
                    thisArg: t,
                  }),
                  new Hn(o, this.__chain__).thru(function (e) {
                    return n && !e.length && e.push(t), e;
                  }))
                : this.thru(i);
            }),
            wa = Oo(function (t, e, n) {
              Vt.call(t, n) ? ++t[n] : ar(t, n, 1);
            }),
            _a = Lo(Gi),
            Sa = Lo(Ki);
          function Ca(t, e) {
            return (Ka(t) ? Ce : pr)(t, li(e, 3));
          }
          function xa(t, e) {
            return (Ka(t) ? xe : hr)(t, li(e, 3));
          }
          var Ea = Oo(function (t, e, n) {
              Vt.call(t, n) ? t[n].push(e) : ar(t, n, [e]);
            }),
            Aa = Qr(function (t, e, n) {
              var r = -1,
                o = 'function' == typeof e,
                i = Qa(t) ? St(t.length) : [];
              return (
                pr(t, function (t) {
                  i[++r] = o ? _e(e, t, n) : kr(t, e, n);
                }),
                i
              );
            }),
            Ta = Oo(function (t, e, n) {
              ar(t, n, e);
            });
          function Ia(t, e) {
            return (Ka(t) ? Pe : Lr)(t, li(e, 3));
          }
          var Na = Oo(
              function (t, e, n) {
                t[n ? 0 : 1].push(e);
              },
              function () {
                return [[], []];
              }
            ),
            Ba = Qr(function (t, e) {
              if (null == t) return [];
              var n = e.length;
              return (
                n > 1 && _i(t, e[0], e[1])
                  ? (e = [])
                  : n > 2 && _i(e[0], e[1], e[2]) && (e = [e[0]]),
                Wr(t, mr(e, 1), [])
              );
            }),
            ka =
              he ||
              function () {
                return ce.Date.now();
              };
          function Pa(e, n, r) {
            return (
              (n = r ? t : n),
              (n = e && null == n ? e.length : n),
              Xo(e, u, t, t, t, t, n)
            );
          }
          function Oa(n, r) {
            var o;
            if ('function' != typeof r) throw new Bt(e);
            return (
              (n = bu(n)),
              function () {
                return (
                  --n > 0 && (o = r.apply(this, arguments)),
                  n <= 1 && (r = t),
                  o
                );
              }
            );
          }
          var Ra = Qr(function (t, e, n) {
              var r = 1;
              if (n.length) {
                var o = cn(n, ci(Ra));
                r |= i;
              }
              return Xo(t, r, e, n, o);
            }),
            Ua = Qr(function (t, e, n) {
              var r = 3;
              if (n.length) {
                var o = cn(n, ci(Ua));
                r |= i;
              }
              return Xo(e, r, t, n, o);
            });
          function Va(n, r, o) {
            var i,
              a,
              u,
              s,
              c,
              l,
              f = 0,
              d = !1,
              p = !1,
              h = !0;
            if ('function' != typeof n) throw new Bt(e);
            function v(e) {
              var r = i,
                o = a;
              return (i = a = t), (f = e), (s = n.apply(o, r));
            }
            function g(t) {
              return (f = t), (c = Oi(m, r)), d ? v(t) : s;
            }
            function y(e) {
              var n = e - l;
              return l === t || n >= r || n < 0 || (p && e - f >= u);
            }
            function m() {
              var t = ka();
              if (y(t)) return b(t);
              c = Oi(
                m,
                (function (t) {
                  var e = r - (t - l);
                  return p ? wn(e, u - (t - f)) : e;
                })(t)
              );
            }
            function b(e) {
              return (c = t), h && i ? v(e) : ((i = a = t), s);
            }
            function w() {
              var e = ka(),
                n = y(e);
              if (((i = arguments), (a = this), (l = e), n)) {
                if (c === t) return g(l);
                if (p) return xo(c), (c = Oi(m, r)), v(l);
              }
              return c === t && (c = Oi(m, r)), s;
            }
            return (
              (r = _u(r) || 0),
              iu(o) &&
                ((d = !!o.leading),
                (u = (p = 'maxWait' in o) ? bn(_u(o.maxWait) || 0, r) : u),
                (h = 'trailing' in o ? !!o.trailing : h)),
              (w.cancel = function () {
                c !== t && xo(c), (f = 0), (i = l = a = c = t);
              }),
              (w.flush = function () {
                return c === t ? s : b(ka());
              }),
              w
            );
          }
          var ja = Qr(function (t, e) {
              return fr(t, 1, e);
            }),
            Da = Qr(function (t, e, n) {
              return fr(t, _u(e) || 0, n);
            });
          function Ma(t, n) {
            if ('function' != typeof t || (null != n && 'function' != typeof n))
              throw new Bt(e);
            var r = function () {
              var e = arguments,
                o = n ? n.apply(this, e) : e[0],
                i = r.cache;
              if (i.has(o)) return i.get(o);
              var a = t.apply(this, e);
              return (r.cache = i.set(o, a) || i), a;
            };
            return (r.cache = new (Ma.Cache || Gn)()), r;
          }
          function La(t) {
            if ('function' != typeof t) throw new Bt(e);
            return function () {
              var e = arguments;
              switch (e.length) {
                case 0:
                  return !t.call(this);
                case 1:
                  return !t.call(this, e[0]);
                case 2:
                  return !t.call(this, e[0], e[1]);
                case 3:
                  return !t.call(this, e[0], e[1], e[2]);
              }
              return !t.apply(this, e);
            };
          }
          Ma.Cache = Gn;
          var Fa = So(function (t, e) {
              var n = (e =
                1 == e.length && Ka(e[0])
                  ? Pe(e[0], Je(li()))
                  : Pe(mr(e, 1), Je(li()))).length;
              return Qr(function (r) {
                for (var o = -1, i = wn(r.length, n); ++o < i; )
                  r[o] = e[o].call(this, r[o]);
                return _e(t, this, r);
              });
            }),
            $a = Qr(function (e, n) {
              var r = cn(n, ci($a));
              return Xo(e, i, t, n, r);
            }),
            za = Qr(function (e, n) {
              var r = cn(n, ci(za));
              return Xo(e, a, t, n, r);
            }),
            Ha = oi(function (e, n) {
              return Xo(e, s, t, t, t, n);
            });
          function Wa(t, e) {
            return t === e || (t != t && e != e);
          }
          var Ya = Go(Tr),
            qa = Go(function (t, e) {
              return t >= e;
            }),
            Ga = Pr(
              (function () {
                return arguments;
              })()
            )
              ? Pr
              : function (t) {
                  return au(t) && Vt.call(t, 'callee') && !Zt.call(t, 'callee');
                },
            Ka = St.isArray,
            Ja = ve
              ? Je(ve)
              : function (t) {
                  return au(t) && Ar(t) == B;
                };
          function Qa(t) {
            return null != t && ou(t.length) && !nu(t);
          }
          function Za(t) {
            return au(t) && Qa(t);
          }
          var Xa = We || _s,
            tu = ge
              ? Je(ge)
              : function (t) {
                  return au(t) && Ar(t) == y;
                };
          function eu(t) {
            if (!au(t)) return !1;
            var e = Ar(t);
            return (
              e == m ||
              '[object DOMException]' == e ||
              ('string' == typeof t.message &&
                'string' == typeof t.name &&
                !cu(t))
            );
          }
          function nu(t) {
            if (!iu(t)) return !1;
            var e = Ar(t);
            return (
              e == b ||
              e == w ||
              '[object AsyncFunction]' == e ||
              '[object Proxy]' == e
            );
          }
          function ru(t) {
            return 'number' == typeof t && t == bu(t);
          }
          function ou(t) {
            return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= l;
          }
          function iu(t) {
            var e = typeof t;
            return null != t && ('object' == e || 'function' == e);
          }
          function au(t) {
            return null != t && 'object' == typeof t;
          }
          var uu = ye
            ? Je(ye)
            : function (t) {
                return au(t) && gi(t) == _;
              };
          function su(t) {
            return 'number' == typeof t || (au(t) && Ar(t) == S);
          }
          function cu(t) {
            if (!au(t) || Ar(t) != C) return !1;
            var e = qt(t);
            if (null === e) return !0;
            var n = Vt.call(e, 'constructor') && e.constructor;
            return 'function' == typeof n && n instanceof n && Ut.call(n) == Lt;
          }
          var lu = me
              ? Je(me)
              : function (t) {
                  return au(t) && Ar(t) == E;
                },
            fu = be
              ? Je(be)
              : function (t) {
                  return au(t) && gi(t) == A;
                };
          function du(t) {
            return 'string' == typeof t || (!Ka(t) && au(t) && Ar(t) == T);
          }
          function pu(t) {
            return 'symbol' == typeof t || (au(t) && Ar(t) == I);
          }
          var hu = we
              ? Je(we)
              : function (t) {
                  return au(t) && ou(t.length) && !!ne[Ar(t)];
                },
            vu = Go(Mr),
            gu = Go(function (t, e) {
              return t <= e;
            });
          function yu(t) {
            if (!t) return [];
            if (Qa(t)) return du(t) ? dn(t) : ko(t);
            if (se && t[se])
              return (function (t) {
                for (var e, n = []; !(e = t.next()).done; ) n.push(e.value);
                return n;
              })(t[se]());
            var e = gi(t);
            return (e == _ ? un : e == A ? ln : Wu)(t);
          }
          function mu(t) {
            return t
              ? (t = _u(t)) === c || t === -1 / 0
                ? 17976931348623157e292 * (t < 0 ? -1 : 1)
                : t == t
                ? t
                : 0
              : 0 === t
              ? t
              : 0;
          }
          function bu(t) {
            var e = mu(t),
              n = e % 1;
            return e == e ? (n ? e - n : e) : 0;
          }
          function wu(t) {
            return t ? sr(bu(t), 0, d) : 0;
          }
          function _u(t) {
            if ('number' == typeof t) return t;
            if (pu(t)) return f;
            if (iu(t)) {
              var e = 'function' == typeof t.valueOf ? t.valueOf() : t;
              t = iu(e) ? e + '' : e;
            }
            if ('string' != typeof t) return 0 === t ? t : +t;
            t = Ke(t);
            var n = pt.test(t);
            return n || vt.test(t)
              ? ae(t.slice(2), n ? 2 : 8)
              : dt.test(t)
              ? f
              : +t;
          }
          function Su(t) {
            return Po(t, ju(t));
          }
          function Cu(t) {
            return null == t ? '' : lo(t);
          }
          var xu = Ro(function (t, e) {
              if (Ei(e) || Qa(e)) Po(e, Vu(e), t);
              else for (var n in e) Vt.call(e, n) && nr(t, n, e[n]);
            }),
            Eu = Ro(function (t, e) {
              Po(e, ju(e), t);
            }),
            Au = Ro(function (t, e, n, r) {
              Po(e, ju(e), t, r);
            }),
            Tu = Ro(function (t, e, n, r) {
              Po(e, Vu(e), t, r);
            }),
            Iu = oi(ur),
            Nu = Qr(function (e, n) {
              e = Tt(e);
              var r = -1,
                o = n.length,
                i = o > 2 ? n[2] : t;
              for (i && _i(n[0], n[1], i) && (o = 1); ++r < o; )
                for (var a = n[r], u = ju(a), s = -1, c = u.length; ++s < c; ) {
                  var l = u[s],
                    f = e[l];
                  (f === t || (Wa(f, Ot[l]) && !Vt.call(e, l))) &&
                    (e[l] = a[l]);
                }
              return e;
            }),
            Bu = Qr(function (e) {
              return e.push(t, ei), _e(Mu, t, e);
            });
          function ku(e, n, r) {
            var o = null == e ? t : xr(e, n);
            return o === t ? r : o;
          }
          function Pu(t, e) {
            return null != t && yi(t, e, Nr);
          }
          var Ou = zo(function (t, e, n) {
              null != e && 'function' != typeof e.toString && (e = Mt.call(e)),
                (t[e] = n);
            }, is(ss)),
            Ru = zo(function (t, e, n) {
              null != e && 'function' != typeof e.toString && (e = Mt.call(e)),
                Vt.call(t, e) ? t[e].push(n) : (t[e] = [n]);
            }, li),
            Uu = Qr(kr);
          function Vu(t) {
            return Qa(t) ? Qn(t) : jr(t);
          }
          function ju(t) {
            return Qa(t) ? Qn(t, !0) : Dr(t);
          }
          var Du = Ro(function (t, e, n) {
              zr(t, e, n);
            }),
            Mu = Ro(function (t, e, n, r) {
              zr(t, e, n, r);
            }),
            Lu = oi(function (t, e) {
              var n = {};
              if (null == t) return n;
              var r = !1;
              (e = Pe(e, function (e) {
                return (e = _o(e, t)), r || (r = e.length > 1), e;
              })),
                Po(t, ai(t), n),
                r && (n = cr(n, 7, ni));
              for (var o = e.length; o--; ) po(n, e[o]);
              return n;
            }),
            Fu = oi(function (t, e) {
              return null == t
                ? {}
                : (function (t, e) {
                    return Yr(t, e, function (e, n) {
                      return Pu(t, n);
                    });
                  })(t, e);
            });
          function $u(t, e) {
            if (null == t) return {};
            var n = Pe(ai(t), function (t) {
              return [t];
            });
            return (
              (e = li(e)),
              Yr(t, n, function (t, n) {
                return e(t, n[0]);
              })
            );
          }
          var zu = Zo(Vu),
            Hu = Zo(ju);
          function Wu(t) {
            return null == t ? [] : Qe(t, Vu(t));
          }
          var Yu = Do(function (t, e, n) {
            return (e = e.toLowerCase()), t + (n ? qu(e) : e);
          });
          function qu(t) {
            return es(Cu(t).toLowerCase());
          }
          function Gu(t) {
            return (t = Cu(t)) && t.replace(yt, nn).replace(Kt, '');
          }
          var Ku = Do(function (t, e, n) {
              return t + (n ? '-' : '') + e.toLowerCase();
            }),
            Ju = Do(function (t, e, n) {
              return t + (n ? ' ' : '') + e.toLowerCase();
            }),
            Qu = jo('toLowerCase'),
            Zu = Do(function (t, e, n) {
              return t + (n ? '_' : '') + e.toLowerCase();
            }),
            Xu = Do(function (t, e, n) {
              return t + (n ? ' ' : '') + es(e);
            }),
            ts = Do(function (t, e, n) {
              return t + (n ? ' ' : '') + e.toUpperCase();
            }),
            es = jo('toUpperCase');
          function ns(e, n, r) {
            return (
              (e = Cu(e)),
              (n = r ? t : n) === t
                ? (function (t) {
                    return Xt.test(t);
                  })(e)
                  ? (function (t) {
                      return t.match(Qt) || [];
                    })(e)
                  : (function (t) {
                      return t.match(ut) || [];
                    })(e)
                : e.match(n) || []
            );
          }
          var rs = Qr(function (e, n) {
              try {
                return _e(e, t, n);
              } catch (r) {
                return eu(r) ? r : new xt(r);
              }
            }),
            os = oi(function (t, e) {
              return (
                Ce(e, function (e) {
                  (e = $i(e)), ar(t, e, Ra(t[e], t));
                }),
                t
              );
            });
          function is(t) {
            return function () {
              return t;
            };
          }
          var as = Fo(),
            us = Fo(!0);
          function ss(t) {
            return t;
          }
          function cs(t) {
            return Vr('function' == typeof t ? t : cr(t, 1));
          }
          var ls = Qr(function (t, e) {
              return function (n) {
                return kr(n, t, e);
              };
            }),
            fs = Qr(function (t, e) {
              return function (n) {
                return kr(t, n, e);
              };
            });
          function ds(t, e, n) {
            var r = Vu(e),
              o = Cr(e, r);
            null != n ||
              (iu(e) && (o.length || !r.length)) ||
              ((n = e), (e = t), (t = this), (o = Cr(e, Vu(e))));
            var i = !(iu(n) && 'chain' in n && !n.chain),
              a = nu(t);
            return (
              Ce(o, function (n) {
                var r = e[n];
                (t[n] = r),
                  a &&
                    (t.prototype[n] = function () {
                      var e = this.__chain__;
                      if (i || e) {
                        var n = t(this.__wrapped__),
                          o = (n.__actions__ = ko(this.__actions__));
                        return (
                          o.push({ func: r, args: arguments, thisArg: t }),
                          (n.__chain__ = e),
                          n
                        );
                      }
                      return r.apply(t, Oe([this.value()], arguments));
                    });
              }),
              t
            );
          }
          function ps() {}
          var hs = Wo(Pe),
            vs = Wo(Ee),
            gs = Wo(Ve);
          function ys(t) {
            return Si(t)
              ? He($i(t))
              : (function (t) {
                  return function (e) {
                    return xr(e, t);
                  };
                })(t);
          }
          var ms = qo(),
            bs = qo(!0);
          function ws() {
            return [];
          }
          function _s() {
            return !1;
          }
          var Ss,
            Cs = Ho(function (t, e) {
              return t + e;
            }, 0),
            xs = Jo('ceil'),
            Es = Ho(function (t, e) {
              return t / e;
            }, 1),
            As = Jo('floor'),
            Ts = Ho(function (t, e) {
              return t * e;
            }, 1),
            Is = Jo('round'),
            Ns = Ho(function (t, e) {
              return t - e;
            }, 0);
          return (
            (Fn.after = function (t, n) {
              if ('function' != typeof n) throw new Bt(e);
              return (
                (t = bu(t)),
                function () {
                  if (--t < 1) return n.apply(this, arguments);
                }
              );
            }),
            (Fn.ary = Pa),
            (Fn.assign = xu),
            (Fn.assignIn = Eu),
            (Fn.assignInWith = Au),
            (Fn.assignWith = Tu),
            (Fn.at = Iu),
            (Fn.before = Oa),
            (Fn.bind = Ra),
            (Fn.bindAll = os),
            (Fn.bindKey = Ua),
            (Fn.castArray = function () {
              if (!arguments.length) return [];
              var t = arguments[0];
              return Ka(t) ? t : [t];
            }),
            (Fn.chain = ya),
            (Fn.chunk = function (e, n, r) {
              n = (r ? _i(e, n, r) : n === t) ? 1 : bn(bu(n), 0);
              var o = null == e ? 0 : e.length;
              if (!o || n < 1) return [];
              for (var i = 0, a = 0, u = St(Ne(o / n)); i < o; )
                u[a++] = oo(e, i, (i += n));
              return u;
            }),
            (Fn.compact = function (t) {
              for (
                var e = -1, n = null == t ? 0 : t.length, r = 0, o = [];
                ++e < n;

              ) {
                var i = t[e];
                i && (o[r++] = i);
              }
              return o;
            }),
            (Fn.concat = function () {
              var t = arguments.length;
              if (!t) return [];
              for (var e = St(t - 1), n = arguments[0], r = t; r--; )
                e[r - 1] = arguments[r];
              return Oe(Ka(n) ? ko(n) : [n], mr(e, 1));
            }),
            (Fn.cond = function (t) {
              var n = null == t ? 0 : t.length,
                r = li();
              return (
                (t = n
                  ? Pe(t, function (t) {
                      if ('function' != typeof t[1]) throw new Bt(e);
                      return [r(t[0]), t[1]];
                    })
                  : []),
                Qr(function (e) {
                  for (var r = -1; ++r < n; ) {
                    var o = t[r];
                    if (_e(o[0], this, e)) return _e(o[1], this, e);
                  }
                })
              );
            }),
            (Fn.conforms = function (t) {
              return (function (t) {
                var e = Vu(t);
                return function (n) {
                  return lr(n, t, e);
                };
              })(cr(t, 1));
            }),
            (Fn.constant = is),
            (Fn.countBy = wa),
            (Fn.create = function (t, e) {
              var n = $n(t);
              return null == e ? n : ir(n, e);
            }),
            (Fn.curry = function e(n, r, o) {
              var i = Xo(n, 8, t, t, t, t, t, (r = o ? t : r));
              return (i.placeholder = e.placeholder), i;
            }),
            (Fn.curryRight = function e(n, r, i) {
              var a = Xo(n, o, t, t, t, t, t, (r = i ? t : r));
              return (a.placeholder = e.placeholder), a;
            }),
            (Fn.debounce = Va),
            (Fn.defaults = Nu),
            (Fn.defaultsDeep = Bu),
            (Fn.defer = ja),
            (Fn.delay = Da),
            (Fn.difference = Wi),
            (Fn.differenceBy = Yi),
            (Fn.differenceWith = qi),
            (Fn.drop = function (e, n, r) {
              var o = null == e ? 0 : e.length;
              return o
                ? oo(e, (n = r || n === t ? 1 : bu(n)) < 0 ? 0 : n, o)
                : [];
            }),
            (Fn.dropRight = function (e, n, r) {
              var o = null == e ? 0 : e.length;
              return o
                ? oo(e, 0, (n = o - (n = r || n === t ? 1 : bu(n))) < 0 ? 0 : n)
                : [];
            }),
            (Fn.dropRightWhile = function (t, e) {
              return t && t.length ? vo(t, li(e, 3), !0, !0) : [];
            }),
            (Fn.dropWhile = function (t, e) {
              return t && t.length ? vo(t, li(e, 3), !0) : [];
            }),
            (Fn.fill = function (e, n, r, o) {
              var i = null == e ? 0 : e.length;
              return i
                ? (r &&
                    'number' != typeof r &&
                    _i(e, n, r) &&
                    ((r = 0), (o = i)),
                  (function (e, n, r, o) {
                    var i = e.length;
                    for (
                      (r = bu(r)) < 0 && (r = -r > i ? 0 : i + r),
                        (o = o === t || o > i ? i : bu(o)) < 0 && (o += i),
                        o = r > o ? 0 : wu(o);
                      r < o;

                    )
                      e[r++] = n;
                    return e;
                  })(e, n, r, o))
                : [];
            }),
            (Fn.filter = function (t, e) {
              return (Ka(t) ? Ae : yr)(t, li(e, 3));
            }),
            (Fn.flatMap = function (t, e) {
              return mr(Ia(t, e), 1);
            }),
            (Fn.flatMapDeep = function (t, e) {
              return mr(Ia(t, e), c);
            }),
            (Fn.flatMapDepth = function (e, n, r) {
              return (r = r === t ? 1 : bu(r)), mr(Ia(e, n), r);
            }),
            (Fn.flatten = Ji),
            (Fn.flattenDeep = function (t) {
              return null != t && t.length ? mr(t, c) : [];
            }),
            (Fn.flattenDepth = function (e, n) {
              return null != e && e.length
                ? mr(e, (n = n === t ? 1 : bu(n)))
                : [];
            }),
            (Fn.flip = function (t) {
              return Xo(t, 512);
            }),
            (Fn.flow = as),
            (Fn.flowRight = us),
            (Fn.fromPairs = function (t) {
              for (
                var e = -1, n = null == t ? 0 : t.length, r = {};
                ++e < n;

              ) {
                var o = t[e];
                r[o[0]] = o[1];
              }
              return r;
            }),
            (Fn.functions = function (t) {
              return null == t ? [] : Cr(t, Vu(t));
            }),
            (Fn.functionsIn = function (t) {
              return null == t ? [] : Cr(t, ju(t));
            }),
            (Fn.groupBy = Ea),
            (Fn.initial = function (t) {
              return null != t && t.length ? oo(t, 0, -1) : [];
            }),
            (Fn.intersection = Zi),
            (Fn.intersectionBy = Xi),
            (Fn.intersectionWith = ta),
            (Fn.invert = Ou),
            (Fn.invertBy = Ru),
            (Fn.invokeMap = Aa),
            (Fn.iteratee = cs),
            (Fn.keyBy = Ta),
            (Fn.keys = Vu),
            (Fn.keysIn = ju),
            (Fn.map = Ia),
            (Fn.mapKeys = function (t, e) {
              var n = {};
              return (
                (e = li(e, 3)),
                _r(t, function (t, r, o) {
                  ar(n, e(t, r, o), t);
                }),
                n
              );
            }),
            (Fn.mapValues = function (t, e) {
              var n = {};
              return (
                (e = li(e, 3)),
                _r(t, function (t, r, o) {
                  ar(n, r, e(t, r, o));
                }),
                n
              );
            }),
            (Fn.matches = function (t) {
              return Fr(cr(t, 1));
            }),
            (Fn.matchesProperty = function (t, e) {
              return $r(t, cr(e, 1));
            }),
            (Fn.memoize = Ma),
            (Fn.merge = Du),
            (Fn.mergeWith = Mu),
            (Fn.method = ls),
            (Fn.methodOf = fs),
            (Fn.mixin = ds),
            (Fn.negate = La),
            (Fn.nthArg = function (t) {
              return (
                (t = bu(t)),
                Qr(function (e) {
                  return Hr(e, t);
                })
              );
            }),
            (Fn.omit = Lu),
            (Fn.omitBy = function (t, e) {
              return $u(t, La(li(e)));
            }),
            (Fn.once = function (t) {
              return Oa(2, t);
            }),
            (Fn.orderBy = function (e, n, r, o) {
              return null == e
                ? []
                : (Ka(n) || (n = null == n ? [] : [n]),
                  Ka((r = o ? t : r)) || (r = null == r ? [] : [r]),
                  Wr(e, n, r));
            }),
            (Fn.over = hs),
            (Fn.overArgs = Fa),
            (Fn.overEvery = vs),
            (Fn.overSome = gs),
            (Fn.partial = $a),
            (Fn.partialRight = za),
            (Fn.partition = Na),
            (Fn.pick = Fu),
            (Fn.pickBy = $u),
            (Fn.property = ys),
            (Fn.propertyOf = function (e) {
              return function (n) {
                return null == e ? t : xr(e, n);
              };
            }),
            (Fn.pull = na),
            (Fn.pullAll = ra),
            (Fn.pullAllBy = function (t, e, n) {
              return t && t.length && e && e.length ? qr(t, e, li(n, 2)) : t;
            }),
            (Fn.pullAllWith = function (e, n, r) {
              return e && e.length && n && n.length ? qr(e, n, t, r) : e;
            }),
            (Fn.pullAt = oa),
            (Fn.range = ms),
            (Fn.rangeRight = bs),
            (Fn.rearg = Ha),
            (Fn.reject = function (t, e) {
              return (Ka(t) ? Ae : yr)(t, La(li(e, 3)));
            }),
            (Fn.remove = function (t, e) {
              var n = [];
              if (!t || !t.length) return n;
              var r = -1,
                o = [],
                i = t.length;
              for (e = li(e, 3); ++r < i; ) {
                var a = t[r];
                e(a, r, t) && (n.push(a), o.push(r));
              }
              return Gr(t, o), n;
            }),
            (Fn.rest = function (n, r) {
              if ('function' != typeof n) throw new Bt(e);
              return Qr(n, (r = r === t ? r : bu(r)));
            }),
            (Fn.reverse = ia),
            (Fn.sampleSize = function (e, n, r) {
              return (
                (n = (r ? _i(e, n, r) : n === t) ? 1 : bu(n)),
                (Ka(e) ? Xn : Xr)(e, n)
              );
            }),
            (Fn.set = function (t, e, n) {
              return null == t ? t : to(t, e, n);
            }),
            (Fn.setWith = function (e, n, r, o) {
              return (
                (o = 'function' == typeof o ? o : t),
                null == e ? e : to(e, n, r, o)
              );
            }),
            (Fn.shuffle = function (t) {
              return (Ka(t) ? tr : ro)(t);
            }),
            (Fn.slice = function (e, n, r) {
              var o = null == e ? 0 : e.length;
              return o
                ? (r && 'number' != typeof r && _i(e, n, r)
                    ? ((n = 0), (r = o))
                    : ((n = null == n ? 0 : bu(n)), (r = r === t ? o : bu(r))),
                  oo(e, n, r))
                : [];
            }),
            (Fn.sortBy = Ba),
            (Fn.sortedUniq = function (t) {
              return t && t.length ? so(t) : [];
            }),
            (Fn.sortedUniqBy = function (t, e) {
              return t && t.length ? so(t, li(e, 2)) : [];
            }),
            (Fn.split = function (e, n, r) {
              return (
                r && 'number' != typeof r && _i(e, n, r) && (n = r = t),
                (r = r === t ? d : r >>> 0)
                  ? (e = Cu(e)) &&
                    ('string' == typeof n || (null != n && !lu(n))) &&
                    !(n = lo(n)) &&
                    an(e)
                    ? Co(dn(e), 0, r)
                    : e.split(n, r)
                  : []
              );
            }),
            (Fn.spread = function (t, n) {
              if ('function' != typeof t) throw new Bt(e);
              return (
                (n = null == n ? 0 : bn(bu(n), 0)),
                Qr(function (e) {
                  var r = e[n],
                    o = Co(e, 0, n);
                  return r && Oe(o, r), _e(t, this, o);
                })
              );
            }),
            (Fn.tail = function (t) {
              var e = null == t ? 0 : t.length;
              return e ? oo(t, 1, e) : [];
            }),
            (Fn.take = function (e, n, r) {
              return e && e.length
                ? oo(e, 0, (n = r || n === t ? 1 : bu(n)) < 0 ? 0 : n)
                : [];
            }),
            (Fn.takeRight = function (e, n, r) {
              var o = null == e ? 0 : e.length;
              return o
                ? oo(e, (n = o - (n = r || n === t ? 1 : bu(n))) < 0 ? 0 : n, o)
                : [];
            }),
            (Fn.takeRightWhile = function (t, e) {
              return t && t.length ? vo(t, li(e, 3), !1, !0) : [];
            }),
            (Fn.takeWhile = function (t, e) {
              return t && t.length ? vo(t, li(e, 3)) : [];
            }),
            (Fn.tap = function (t, e) {
              return e(t), t;
            }),
            (Fn.throttle = function (t, n, r) {
              var o = !0,
                i = !0;
              if ('function' != typeof t) throw new Bt(e);
              return (
                iu(r) &&
                  ((o = 'leading' in r ? !!r.leading : o),
                  (i = 'trailing' in r ? !!r.trailing : i)),
                Va(t, n, { leading: o, maxWait: n, trailing: i })
              );
            }),
            (Fn.thru = ma),
            (Fn.toArray = yu),
            (Fn.toPairs = zu),
            (Fn.toPairsIn = Hu),
            (Fn.toPath = function (t) {
              return Ka(t) ? Pe(t, $i) : pu(t) ? [t] : ko(Fi(Cu(t)));
            }),
            (Fn.toPlainObject = Su),
            (Fn.transform = function (t, e, n) {
              var r = Ka(t),
                o = r || Xa(t) || hu(t);
              if (((e = li(e, 4)), null == n)) {
                var i = t && t.constructor;
                n = o ? (r ? new i() : []) : iu(t) && nu(i) ? $n(qt(t)) : {};
              }
              return (
                (o ? Ce : _r)(t, function (t, r, o) {
                  return e(n, t, r, o);
                }),
                n
              );
            }),
            (Fn.unary = function (t) {
              return Pa(t, 1);
            }),
            (Fn.union = aa),
            (Fn.unionBy = ua),
            (Fn.unionWith = sa),
            (Fn.uniq = function (t) {
              return t && t.length ? fo(t) : [];
            }),
            (Fn.uniqBy = function (t, e) {
              return t && t.length ? fo(t, li(e, 2)) : [];
            }),
            (Fn.uniqWith = function (e, n) {
              return (
                (n = 'function' == typeof n ? n : t),
                e && e.length ? fo(e, t, n) : []
              );
            }),
            (Fn.unset = function (t, e) {
              return null == t || po(t, e);
            }),
            (Fn.unzip = ca),
            (Fn.unzipWith = la),
            (Fn.update = function (t, e, n) {
              return null == t ? t : ho(t, e, wo(n));
            }),
            (Fn.updateWith = function (e, n, r, o) {
              return (
                (o = 'function' == typeof o ? o : t),
                null == e ? e : ho(e, n, wo(r), o)
              );
            }),
            (Fn.values = Wu),
            (Fn.valuesIn = function (t) {
              return null == t ? [] : Qe(t, ju(t));
            }),
            (Fn.without = fa),
            (Fn.words = ns),
            (Fn.wrap = function (t, e) {
              return $a(wo(e), t);
            }),
            (Fn.xor = da),
            (Fn.xorBy = pa),
            (Fn.xorWith = ha),
            (Fn.zip = va),
            (Fn.zipObject = function (t, e) {
              return mo(t || [], e || [], nr);
            }),
            (Fn.zipObjectDeep = function (t, e) {
              return mo(t || [], e || [], to);
            }),
            (Fn.zipWith = ga),
            (Fn.entries = zu),
            (Fn.entriesIn = Hu),
            (Fn.extend = Eu),
            (Fn.extendWith = Au),
            ds(Fn, Fn),
            (Fn.add = Cs),
            (Fn.attempt = rs),
            (Fn.camelCase = Yu),
            (Fn.capitalize = qu),
            (Fn.ceil = xs),
            (Fn.clamp = function (e, n, r) {
              return (
                r === t && ((r = n), (n = t)),
                r !== t && (r = (r = _u(r)) == r ? r : 0),
                n !== t && (n = (n = _u(n)) == n ? n : 0),
                sr(_u(e), n, r)
              );
            }),
            (Fn.clone = function (t) {
              return cr(t, 4);
            }),
            (Fn.cloneDeep = function (t) {
              return cr(t, 5);
            }),
            (Fn.cloneDeepWith = function (e, n) {
              return cr(e, 5, (n = 'function' == typeof n ? n : t));
            }),
            (Fn.cloneWith = function (e, n) {
              return cr(e, 4, (n = 'function' == typeof n ? n : t));
            }),
            (Fn.conformsTo = function (t, e) {
              return null == e || lr(t, e, Vu(e));
            }),
            (Fn.deburr = Gu),
            (Fn.defaultTo = function (t, e) {
              return null == t || t != t ? e : t;
            }),
            (Fn.divide = Es),
            (Fn.endsWith = function (e, n, r) {
              (e = Cu(e)), (n = lo(n));
              var o = e.length,
                i = (r = r === t ? o : sr(bu(r), 0, o));
              return (r -= n.length) >= 0 && e.slice(r, i) == n;
            }),
            (Fn.eq = Wa),
            (Fn.escape = function (t) {
              return (t = Cu(t)) && q.test(t) ? t.replace(W, rn) : t;
            }),
            (Fn.escapeRegExp = function (t) {
              return (t = Cu(t)) && et.test(t) ? t.replace(tt, '\\$&') : t;
            }),
            (Fn.every = function (e, n, r) {
              var o = Ka(e) ? Ee : vr;
              return r && _i(e, n, r) && (n = t), o(e, li(n, 3));
            }),
            (Fn.find = _a),
            (Fn.findIndex = Gi),
            (Fn.findKey = function (t, e) {
              return De(t, li(e, 3), _r);
            }),
            (Fn.findLast = Sa),
            (Fn.findLastIndex = Ki),
            (Fn.findLastKey = function (t, e) {
              return De(t, li(e, 3), Sr);
            }),
            (Fn.floor = As),
            (Fn.forEach = Ca),
            (Fn.forEachRight = xa),
            (Fn.forIn = function (t, e) {
              return null == t ? t : br(t, li(e, 3), ju);
            }),
            (Fn.forInRight = function (t, e) {
              return null == t ? t : wr(t, li(e, 3), ju);
            }),
            (Fn.forOwn = function (t, e) {
              return t && _r(t, li(e, 3));
            }),
            (Fn.forOwnRight = function (t, e) {
              return t && Sr(t, li(e, 3));
            }),
            (Fn.get = ku),
            (Fn.gt = Ya),
            (Fn.gte = qa),
            (Fn.has = function (t, e) {
              return null != t && yi(t, e, Ir);
            }),
            (Fn.hasIn = Pu),
            (Fn.head = Qi),
            (Fn.identity = ss),
            (Fn.includes = function (t, e, n, r) {
              (t = Qa(t) ? t : Wu(t)), (n = n && !r ? bu(n) : 0);
              var o = t.length;
              return (
                n < 0 && (n = bn(o + n, 0)),
                du(t) ? n <= o && t.indexOf(e, n) > -1 : !!o && Le(t, e, n) > -1
              );
            }),
            (Fn.indexOf = function (t, e, n) {
              var r = null == t ? 0 : t.length;
              if (!r) return -1;
              var o = null == n ? 0 : bu(n);
              return o < 0 && (o = bn(r + o, 0)), Le(t, e, o);
            }),
            (Fn.inRange = function (e, n, r) {
              return (
                (n = mu(n)),
                r === t ? ((r = n), (n = 0)) : (r = mu(r)),
                (function (t, e, n) {
                  return t >= wn(e, n) && t < bn(e, n);
                })((e = _u(e)), n, r)
              );
            }),
            (Fn.invoke = Uu),
            (Fn.isArguments = Ga),
            (Fn.isArray = Ka),
            (Fn.isArrayBuffer = Ja),
            (Fn.isArrayLike = Qa),
            (Fn.isArrayLikeObject = Za),
            (Fn.isBoolean = function (t) {
              return !0 === t || !1 === t || (au(t) && Ar(t) == g);
            }),
            (Fn.isBuffer = Xa),
            (Fn.isDate = tu),
            (Fn.isElement = function (t) {
              return au(t) && 1 === t.nodeType && !cu(t);
            }),
            (Fn.isEmpty = function (t) {
              if (null == t) return !0;
              if (
                Qa(t) &&
                (Ka(t) ||
                  'string' == typeof t ||
                  'function' == typeof t.splice ||
                  Xa(t) ||
                  hu(t) ||
                  Ga(t))
              )
                return !t.length;
              var e = gi(t);
              if (e == _ || e == A) return !t.size;
              if (Ei(t)) return !jr(t).length;
              for (var n in t) if (Vt.call(t, n)) return !1;
              return !0;
            }),
            (Fn.isEqual = function (t, e) {
              return Or(t, e);
            }),
            (Fn.isEqualWith = function (e, n, r) {
              var o = (r = 'function' == typeof r ? r : t) ? r(e, n) : t;
              return o === t ? Or(e, n, t, r) : !!o;
            }),
            (Fn.isError = eu),
            (Fn.isFinite = function (t) {
              return 'number' == typeof t && gn(t);
            }),
            (Fn.isFunction = nu),
            (Fn.isInteger = ru),
            (Fn.isLength = ou),
            (Fn.isMap = uu),
            (Fn.isMatch = function (t, e) {
              return t === e || Rr(t, e, di(e));
            }),
            (Fn.isMatchWith = function (e, n, r) {
              return (r = 'function' == typeof r ? r : t), Rr(e, n, di(n), r);
            }),
            (Fn.isNaN = function (t) {
              return su(t) && t != +t;
            }),
            (Fn.isNative = function (t) {
              if (xi(t))
                throw new xt(
                  'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.'
                );
              return Ur(t);
            }),
            (Fn.isNil = function (t) {
              return null == t;
            }),
            (Fn.isNull = function (t) {
              return null === t;
            }),
            (Fn.isNumber = su),
            (Fn.isObject = iu),
            (Fn.isObjectLike = au),
            (Fn.isPlainObject = cu),
            (Fn.isRegExp = lu),
            (Fn.isSafeInteger = function (t) {
              return ru(t) && t >= -9007199254740991 && t <= l;
            }),
            (Fn.isSet = fu),
            (Fn.isString = du),
            (Fn.isSymbol = pu),
            (Fn.isTypedArray = hu),
            (Fn.isUndefined = function (e) {
              return e === t;
            }),
            (Fn.isWeakMap = function (t) {
              return au(t) && gi(t) == N;
            }),
            (Fn.isWeakSet = function (t) {
              return au(t) && '[object WeakSet]' == Ar(t);
            }),
            (Fn.join = function (t, e) {
              return null == t ? '' : yn.call(t, e);
            }),
            (Fn.kebabCase = Ku),
            (Fn.last = ea),
            (Fn.lastIndexOf = function (e, n, r) {
              var o = null == e ? 0 : e.length;
              if (!o) return -1;
              var i = o;
              return (
                r !== t && (i = (i = bu(r)) < 0 ? bn(o + i, 0) : wn(i, o - 1)),
                n == n
                  ? (function (t, e, n) {
                      for (var r = n + 1; r--; ) if (t[r] === e) return r;
                      return r;
                    })(e, n, i)
                  : Me(e, $e, i, !0)
              );
            }),
            (Fn.lowerCase = Ju),
            (Fn.lowerFirst = Qu),
            (Fn.lt = vu),
            (Fn.lte = gu),
            (Fn.max = function (e) {
              return e && e.length ? gr(e, ss, Tr) : t;
            }),
            (Fn.maxBy = function (e, n) {
              return e && e.length ? gr(e, li(n, 2), Tr) : t;
            }),
            (Fn.mean = function (t) {
              return ze(t, ss);
            }),
            (Fn.meanBy = function (t, e) {
              return ze(t, li(e, 2));
            }),
            (Fn.min = function (e) {
              return e && e.length ? gr(e, ss, Mr) : t;
            }),
            (Fn.minBy = function (e, n) {
              return e && e.length ? gr(e, li(n, 2), Mr) : t;
            }),
            (Fn.stubArray = ws),
            (Fn.stubFalse = _s),
            (Fn.stubObject = function () {
              return {};
            }),
            (Fn.stubString = function () {
              return '';
            }),
            (Fn.stubTrue = function () {
              return !0;
            }),
            (Fn.multiply = Ts),
            (Fn.nth = function (e, n) {
              return e && e.length ? Hr(e, bu(n)) : t;
            }),
            (Fn.noConflict = function () {
              return ce._ === this && (ce._ = Ft), this;
            }),
            (Fn.noop = ps),
            (Fn.now = ka),
            (Fn.pad = function (t, e, n) {
              t = Cu(t);
              var r = (e = bu(e)) ? fn(t) : 0;
              if (!e || r >= e) return t;
              var o = (e - r) / 2;
              return Yo(Be(o), n) + t + Yo(Ne(o), n);
            }),
            (Fn.padEnd = function (t, e, n) {
              t = Cu(t);
              var r = (e = bu(e)) ? fn(t) : 0;
              return e && r < e ? t + Yo(e - r, n) : t;
            }),
            (Fn.padStart = function (t, e, n) {
              t = Cu(t);
              var r = (e = bu(e)) ? fn(t) : 0;
              return e && r < e ? Yo(e - r, n) + t : t;
            }),
            (Fn.parseInt = function (t, e, n) {
              return (
                n || null == e ? (e = 0) : e && (e = +e),
                Sn(Cu(t).replace(nt, ''), e || 0)
              );
            }),
            (Fn.random = function (e, n, r) {
              if (
                (r && 'boolean' != typeof r && _i(e, n, r) && (n = r = t),
                r === t &&
                  ('boolean' == typeof n
                    ? ((r = n), (n = t))
                    : 'boolean' == typeof e && ((r = e), (e = t))),
                e === t && n === t
                  ? ((e = 0), (n = 1))
                  : ((e = mu(e)), n === t ? ((n = e), (e = 0)) : (n = mu(n))),
                e > n)
              ) {
                var o = e;
                (e = n), (n = o);
              }
              if (r || e % 1 || n % 1) {
                var i = Cn();
                return wn(
                  e + i * (n - e + ie('1e-' + ((i + '').length - 1))),
                  n
                );
              }
              return Kr(e, n);
            }),
            (Fn.reduce = function (t, e, n) {
              var r = Ka(t) ? Re : Ye,
                o = arguments.length < 3;
              return r(t, li(e, 4), n, o, pr);
            }),
            (Fn.reduceRight = function (t, e, n) {
              var r = Ka(t) ? Ue : Ye,
                o = arguments.length < 3;
              return r(t, li(e, 4), n, o, hr);
            }),
            (Fn.repeat = function (e, n, r) {
              return (
                (n = (r ? _i(e, n, r) : n === t) ? 1 : bu(n)), Jr(Cu(e), n)
              );
            }),
            (Fn.replace = function () {
              var t = arguments,
                e = Cu(t[0]);
              return t.length < 3 ? e : e.replace(t[1], t[2]);
            }),
            (Fn.result = function (e, n, r) {
              var o = -1,
                i = (n = _o(n, e)).length;
              for (i || ((i = 1), (e = t)); ++o < i; ) {
                var a = null == e ? t : e[$i(n[o])];
                a === t && ((o = i), (a = r)), (e = nu(a) ? a.call(e) : a);
              }
              return e;
            }),
            (Fn.round = Is),
            (Fn.runInContext = rt),
            (Fn.sample = function (t) {
              return (Ka(t) ? Zn : Zr)(t);
            }),
            (Fn.size = function (t) {
              if (null == t) return 0;
              if (Qa(t)) return du(t) ? fn(t) : t.length;
              var e = gi(t);
              return e == _ || e == A ? t.size : jr(t).length;
            }),
            (Fn.snakeCase = Zu),
            (Fn.some = function (e, n, r) {
              var o = Ka(e) ? Ve : io;
              return r && _i(e, n, r) && (n = t), o(e, li(n, 3));
            }),
            (Fn.sortedIndex = function (t, e) {
              return ao(t, e);
            }),
            (Fn.sortedIndexBy = function (t, e, n) {
              return uo(t, e, li(n, 2));
            }),
            (Fn.sortedIndexOf = function (t, e) {
              var n = null == t ? 0 : t.length;
              if (n) {
                var r = ao(t, e);
                if (r < n && Wa(t[r], e)) return r;
              }
              return -1;
            }),
            (Fn.sortedLastIndex = function (t, e) {
              return ao(t, e, !0);
            }),
            (Fn.sortedLastIndexBy = function (t, e, n) {
              return uo(t, e, li(n, 2), !0);
            }),
            (Fn.sortedLastIndexOf = function (t, e) {
              if (null != t && t.length) {
                var n = ao(t, e, !0) - 1;
                if (Wa(t[n], e)) return n;
              }
              return -1;
            }),
            (Fn.startCase = Xu),
            (Fn.startsWith = function (t, e, n) {
              return (
                (t = Cu(t)),
                (n = null == n ? 0 : sr(bu(n), 0, t.length)),
                (e = lo(e)),
                t.slice(n, n + e.length) == e
              );
            }),
            (Fn.subtract = Ns),
            (Fn.sum = function (t) {
              return t && t.length ? qe(t, ss) : 0;
            }),
            (Fn.sumBy = function (t, e) {
              return t && t.length ? qe(t, li(e, 2)) : 0;
            }),
            (Fn.template = function (e, n, r) {
              var o = Fn.templateSettings;
              r && _i(e, n, r) && (n = t), (e = Cu(e)), (n = Au({}, n, o, ti));
              var i,
                a,
                u = Au({}, n.imports, o.imports, ti),
                s = Vu(u),
                c = Qe(u, s),
                l = 0,
                f = n.interpolate || mt,
                d = "__p += '",
                p = It(
                  (n.escape || mt).source +
                    '|' +
                    f.source +
                    '|' +
                    (f === J ? lt : mt).source +
                    '|' +
                    (n.evaluate || mt).source +
                    '|$',
                  'g'
                ),
                h =
                  '//# sourceURL=' +
                  (Vt.call(n, 'sourceURL')
                    ? (n.sourceURL + '').replace(/\s/g, ' ')
                    : 'lodash.templateSources[' + ++ee + ']') +
                  '\n';
              e.replace(p, function (t, n, r, o, u, s) {
                return (
                  r || (r = o),
                  (d += e.slice(l, s).replace(bt, on)),
                  n && ((i = !0), (d += "' +\n__e(" + n + ") +\n'")),
                  u && ((a = !0), (d += "';\n" + u + ";\n__p += '")),
                  r &&
                    (d += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"),
                  (l = s + t.length),
                  t
                );
              }),
                (d += "';\n");
              var v = Vt.call(n, 'variable') && n.variable;
              if (v) {
                if (st.test(v))
                  throw new xt(
                    'Invalid `variable` option passed into `_.template`'
                  );
              } else d = 'with (obj) {\n' + d + '\n}\n';
              (d = (a ? d.replace(F, '') : d)
                .replace($, '$1')
                .replace(z, '$1;')),
                (d =
                  'function(' +
                  (v || 'obj') +
                  ') {\n' +
                  (v ? '' : 'obj || (obj = {});\n') +
                  "var __t, __p = ''" +
                  (i ? ', __e = _.escape' : '') +
                  (a
                    ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"
                    : ';\n') +
                  d +
                  'return __p\n}');
              var g = rs(function () {
                return Et(s, h + 'return ' + d).apply(t, c);
              });
              if (((g.source = d), eu(g))) throw g;
              return g;
            }),
            (Fn.times = function (t, e) {
              if ((t = bu(t)) < 1 || t > l) return [];
              var n = d,
                r = wn(t, d);
              (e = li(e)), (t -= d);
              for (var o = Ge(r, e); ++n < t; ) e(n);
              return o;
            }),
            (Fn.toFinite = mu),
            (Fn.toInteger = bu),
            (Fn.toLength = wu),
            (Fn.toLower = function (t) {
              return Cu(t).toLowerCase();
            }),
            (Fn.toNumber = _u),
            (Fn.toSafeInteger = function (t) {
              return t ? sr(bu(t), -9007199254740991, l) : 0 === t ? t : 0;
            }),
            (Fn.toString = Cu),
            (Fn.toUpper = function (t) {
              return Cu(t).toUpperCase();
            }),
            (Fn.trim = function (e, n, r) {
              if ((e = Cu(e)) && (r || n === t)) return Ke(e);
              if (!e || !(n = lo(n))) return e;
              var o = dn(e),
                i = dn(n);
              return Co(o, Xe(o, i), tn(o, i) + 1).join('');
            }),
            (Fn.trimEnd = function (e, n, r) {
              if ((e = Cu(e)) && (r || n === t)) return e.slice(0, pn(e) + 1);
              if (!e || !(n = lo(n))) return e;
              var o = dn(e);
              return Co(o, 0, tn(o, dn(n)) + 1).join('');
            }),
            (Fn.trimStart = function (e, n, r) {
              if ((e = Cu(e)) && (r || n === t)) return e.replace(nt, '');
              if (!e || !(n = lo(n))) return e;
              var o = dn(e);
              return Co(o, Xe(o, dn(n))).join('');
            }),
            (Fn.truncate = function (e, n) {
              var r = 30,
                o = '...';
              if (iu(n)) {
                var i = 'separator' in n ? n.separator : i;
                (r = 'length' in n ? bu(n.length) : r),
                  (o = 'omission' in n ? lo(n.omission) : o);
              }
              var a = (e = Cu(e)).length;
              if (an(e)) {
                var u = dn(e);
                a = u.length;
              }
              if (r >= a) return e;
              var s = r - fn(o);
              if (s < 1) return o;
              var c = u ? Co(u, 0, s).join('') : e.slice(0, s);
              if (i === t) return c + o;
              if ((u && (s += c.length - s), lu(i))) {
                if (e.slice(s).search(i)) {
                  var l,
                    f = c;
                  for (
                    i.global || (i = It(i.source, Cu(ft.exec(i)) + 'g')),
                      i.lastIndex = 0;
                    (l = i.exec(f));

                  )
                    var d = l.index;
                  c = c.slice(0, d === t ? s : d);
                }
              } else if (e.indexOf(lo(i), s) != s) {
                var p = c.lastIndexOf(i);
                p > -1 && (c = c.slice(0, p));
              }
              return c + o;
            }),
            (Fn.unescape = function (t) {
              return (t = Cu(t)) && Y.test(t) ? t.replace(H, hn) : t;
            }),
            (Fn.uniqueId = function (t) {
              var e = ++jt;
              return Cu(t) + e;
            }),
            (Fn.upperCase = ts),
            (Fn.upperFirst = es),
            (Fn.each = Ca),
            (Fn.eachRight = xa),
            (Fn.first = Qi),
            ds(
              Fn,
              ((Ss = {}),
              _r(Fn, function (t, e) {
                Vt.call(Fn.prototype, e) || (Ss[e] = t);
              }),
              Ss),
              { chain: !1 }
            ),
            (Fn.VERSION = '4.17.21'),
            Ce(
              [
                'bind',
                'bindKey',
                'curry',
                'curryRight',
                'partial',
                'partialRight',
              ],
              function (t) {
                Fn[t].placeholder = Fn;
              }
            ),
            Ce(['drop', 'take'], function (e, n) {
              (Wn.prototype[e] = function (r) {
                r = r === t ? 1 : bn(bu(r), 0);
                var o = this.__filtered__ && !n ? new Wn(this) : this.clone();
                return (
                  o.__filtered__
                    ? (o.__takeCount__ = wn(r, o.__takeCount__))
                    : o.__views__.push({
                        size: wn(r, d),
                        type: e + (o.__dir__ < 0 ? 'Right' : ''),
                      }),
                  o
                );
              }),
                (Wn.prototype[e + 'Right'] = function (t) {
                  return this.reverse()[e](t).reverse();
                });
            }),
            Ce(['filter', 'map', 'takeWhile'], function (t, e) {
              var n = e + 1,
                r = 1 == n || 3 == n;
              Wn.prototype[t] = function (t) {
                var e = this.clone();
                return (
                  e.__iteratees__.push({ iteratee: li(t, 3), type: n }),
                  (e.__filtered__ = e.__filtered__ || r),
                  e
                );
              };
            }),
            Ce(['head', 'last'], function (t, e) {
              var n = 'take' + (e ? 'Right' : '');
              Wn.prototype[t] = function () {
                return this[n](1).value()[0];
              };
            }),
            Ce(['initial', 'tail'], function (t, e) {
              var n = 'drop' + (e ? '' : 'Right');
              Wn.prototype[t] = function () {
                return this.__filtered__ ? new Wn(this) : this[n](1);
              };
            }),
            (Wn.prototype.compact = function () {
              return this.filter(ss);
            }),
            (Wn.prototype.find = function (t) {
              return this.filter(t).head();
            }),
            (Wn.prototype.findLast = function (t) {
              return this.reverse().find(t);
            }),
            (Wn.prototype.invokeMap = Qr(function (t, e) {
              return 'function' == typeof t
                ? new Wn(this)
                : this.map(function (n) {
                    return kr(n, t, e);
                  });
            })),
            (Wn.prototype.reject = function (t) {
              return this.filter(La(li(t)));
            }),
            (Wn.prototype.slice = function (e, n) {
              e = bu(e);
              var r = this;
              return r.__filtered__ && (e > 0 || n < 0)
                ? new Wn(r)
                : (e < 0 ? (r = r.takeRight(-e)) : e && (r = r.drop(e)),
                  n !== t &&
                    (r = (n = bu(n)) < 0 ? r.dropRight(-n) : r.take(n - e)),
                  r);
            }),
            (Wn.prototype.takeRightWhile = function (t) {
              return this.reverse().takeWhile(t).reverse();
            }),
            (Wn.prototype.toArray = function () {
              return this.take(d);
            }),
            _r(Wn.prototype, function (e, n) {
              var r = /^(?:filter|find|map|reject)|While$/.test(n),
                o = /^(?:head|last)$/.test(n),
                i = Fn[o ? 'take' + ('last' == n ? 'Right' : '') : n],
                a = o || /^find/.test(n);
              i &&
                (Fn.prototype[n] = function () {
                  var n = this.__wrapped__,
                    u = o ? [1] : arguments,
                    s = n instanceof Wn,
                    c = u[0],
                    l = s || Ka(n),
                    f = function (t) {
                      var e = i.apply(Fn, Oe([t], u));
                      return o && d ? e[0] : e;
                    };
                  l &&
                    r &&
                    'function' == typeof c &&
                    1 != c.length &&
                    (s = l = !1);
                  var d = this.__chain__,
                    p = !!this.__actions__.length,
                    h = a && !d,
                    v = s && !p;
                  if (!a && l) {
                    n = v ? n : new Wn(this);
                    var g = e.apply(n, u);
                    return (
                      g.__actions__.push({ func: ma, args: [f], thisArg: t }),
                      new Hn(g, d)
                    );
                  }
                  return h && v
                    ? e.apply(this, u)
                    : ((g = this.thru(f)),
                      h ? (o ? g.value()[0] : g.value()) : g);
                });
            }),
            Ce(
              ['pop', 'push', 'shift', 'sort', 'splice', 'unshift'],
              function (t) {
                var e = kt[t],
                  n = /^(?:push|sort|unshift)$/.test(t) ? 'tap' : 'thru',
                  r = /^(?:pop|shift)$/.test(t);
                Fn.prototype[t] = function () {
                  var t = arguments;
                  if (r && !this.__chain__) {
                    var o = this.value();
                    return e.apply(Ka(o) ? o : [], t);
                  }
                  return this[n](function (n) {
                    return e.apply(Ka(n) ? n : [], t);
                  });
                };
              }
            ),
            _r(Wn.prototype, function (t, e) {
              var n = Fn[e];
              if (n) {
                var r = n.name + '';
                Vt.call(Pn, r) || (Pn[r] = []),
                  Pn[r].push({ name: e, func: n });
              }
            }),
            (Pn[$o(t, 2).name] = [{ name: 'wrapper', func: t }]),
            (Wn.prototype.clone = function () {
              var t = new Wn(this.__wrapped__);
              return (
                (t.__actions__ = ko(this.__actions__)),
                (t.__dir__ = this.__dir__),
                (t.__filtered__ = this.__filtered__),
                (t.__iteratees__ = ko(this.__iteratees__)),
                (t.__takeCount__ = this.__takeCount__),
                (t.__views__ = ko(this.__views__)),
                t
              );
            }),
            (Wn.prototype.reverse = function () {
              if (this.__filtered__) {
                var t = new Wn(this);
                (t.__dir__ = -1), (t.__filtered__ = !0);
              } else (t = this.clone()).__dir__ *= -1;
              return t;
            }),
            (Wn.prototype.value = function () {
              var t = this.__wrapped__.value(),
                e = this.__dir__,
                n = Ka(t),
                r = e < 0,
                o = n ? t.length : 0,
                i = (function (t, e, n) {
                  for (var r = -1, o = n.length; ++r < o; ) {
                    var i = n[r],
                      a = i.size;
                    switch (i.type) {
                      case 'drop':
                        t += a;
                        break;
                      case 'dropRight':
                        e -= a;
                        break;
                      case 'take':
                        e = wn(e, t + a);
                        break;
                      case 'takeRight':
                        t = bn(t, e - a);
                    }
                  }
                  return { start: t, end: e };
                })(0, o, this.__views__),
                a = i.start,
                u = i.end,
                s = u - a,
                c = r ? u : a - 1,
                l = this.__iteratees__,
                f = l.length,
                d = 0,
                p = wn(s, this.__takeCount__);
              if (!n || (!r && o == s && p == s))
                return go(t, this.__actions__);
              var h = [];
              t: for (; s-- && d < p; ) {
                for (var v = -1, g = t[(c += e)]; ++v < f; ) {
                  var y = l[v],
                    m = y.iteratee,
                    b = y.type,
                    w = m(g);
                  if (2 == b) g = w;
                  else if (!w) {
                    if (1 == b) continue t;
                    break t;
                  }
                }
                h[d++] = g;
              }
              return h;
            }),
            (Fn.prototype.at = ba),
            (Fn.prototype.chain = function () {
              return ya(this);
            }),
            (Fn.prototype.commit = function () {
              return new Hn(this.value(), this.__chain__);
            }),
            (Fn.prototype.next = function () {
              this.__values__ === t && (this.__values__ = yu(this.value()));
              var e = this.__index__ >= this.__values__.length;
              return {
                done: e,
                value: e ? t : this.__values__[this.__index__++],
              };
            }),
            (Fn.prototype.plant = function (e) {
              for (var n, r = this; r instanceof zn; ) {
                var o = Hi(r);
                (o.__index__ = 0),
                  (o.__values__ = t),
                  n ? (i.__wrapped__ = o) : (n = o);
                var i = o;
                r = r.__wrapped__;
              }
              return (i.__wrapped__ = e), n;
            }),
            (Fn.prototype.reverse = function () {
              var e = this.__wrapped__;
              if (e instanceof Wn) {
                var n = e;
                return (
                  this.__actions__.length && (n = new Wn(this)),
                  (n = n.reverse()).__actions__.push({
                    func: ma,
                    args: [ia],
                    thisArg: t,
                  }),
                  new Hn(n, this.__chain__)
                );
              }
              return this.thru(ia);
            }),
            (Fn.prototype.toJSON =
              Fn.prototype.valueOf =
              Fn.prototype.value =
                function () {
                  return go(this.__wrapped__, this.__actions__);
                }),
            (Fn.prototype.first = Fn.prototype.head),
            se &&
              (Fn.prototype[se] = function () {
                return this;
              }),
            Fn
          );
        })();
      fe ? (((fe.exports = vn)._ = vn), (le._ = vn)) : (ce._ = vn);
    }.call(Be);
  var Pe = Object.prototype;
  var Oe = function (t) {
    var e = t && t.constructor;
    return t === (('function' == typeof e && e.prototype) || Pe);
  };
  var Re = function (t, e) {
      return function (n) {
        return t(e(n));
      };
    },
    Ue = Re(Object.keys, Object),
    Ve = Oe,
    je = Ue,
    De = Object.prototype.hasOwnProperty;
  var Me = function (t) {
      if (!Ve(t)) return je(t);
      var e = [];
      for (var n in Object(t)) De.call(t, n) && 'constructor' != n && e.push(n);
      return e;
    },
    Le = 'object' == typeof Be && Be && Be.Object === Object && Be,
    Fe = Le,
    $e = 'object' == typeof self && self && self.Object === Object && self,
    ze = Fe || $e || Function('return this')(),
    He = ze.Symbol,
    We = He,
    Ye = Object.prototype,
    qe = Ye.hasOwnProperty,
    Ge = Ye.toString,
    Ke = We ? We.toStringTag : void 0;
  var Je = function (t) {
      var e = qe.call(t, Ke),
        n = t[Ke];
      try {
        t[Ke] = void 0;
        var r = !0;
      } catch (i) {}
      var o = Ge.call(t);
      return r && (e ? (t[Ke] = n) : delete t[Ke]), o;
    },
    Qe = Object.prototype.toString;
  var Ze = Je,
    Xe = function (t) {
      return Qe.call(t);
    },
    tn = He ? He.toStringTag : void 0;
  var en = function (t) {
    return null == t
      ? void 0 === t
        ? '[object Undefined]'
        : '[object Null]'
      : tn && tn in Object(t)
      ? Ze(t)
      : Xe(t);
  };
  var nn = function (t) {
      var e = typeof t;
      return null != t && ('object' == e || 'function' == e);
    },
    rn = en,
    on = nn;
  var an,
    un = function (t) {
      if (!on(t)) return !1;
      var e = rn(t);
      return (
        '[object Function]' == e ||
        '[object GeneratorFunction]' == e ||
        '[object AsyncFunction]' == e ||
        '[object Proxy]' == e
      );
    },
    sn = ze['__core-js_shared__'],
    cn = (an = /[^.]+$/.exec((sn && sn.keys && sn.keys.IE_PROTO) || ''))
      ? 'Symbol(src)_1.' + an
      : '';
  var ln = function (t) {
      return !!cn && cn in t;
    },
    fn = Function.prototype.toString;
  var dn = function (t) {
      if (null != t) {
        try {
          return fn.call(t);
        } catch (e) {}
        try {
          return t + '';
        } catch (e) {}
      }
      return '';
    },
    pn = un,
    hn = ln,
    vn = nn,
    gn = dn,
    yn = /^\[object .+?Constructor\]$/,
    mn = Function.prototype,
    bn = Object.prototype,
    wn = mn.toString,
    _n = bn.hasOwnProperty,
    Sn = RegExp(
      '^' +
        wn
          .call(_n)
          .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            '$1.*?'
          ) +
        '$'
    );
  var Cn = function (t) {
      return !(!vn(t) || hn(t)) && (pn(t) ? Sn : yn).test(gn(t));
    },
    xn = function (t, e) {
      return null == t ? void 0 : t[e];
    };
  var En = function (t, e) {
      var n = xn(t, e);
      return Cn(n) ? n : void 0;
    },
    An = En(ze, 'DataView'),
    Tn = En(ze, 'Map'),
    In = An,
    Nn = Tn,
    Bn = En(ze, 'Promise'),
    kn = En(ze, 'Set'),
    Pn = En(ze, 'WeakMap'),
    On = en,
    Rn = dn,
    Un = '[object Map]',
    Vn = '[object Promise]',
    jn = '[object Set]',
    Dn = '[object WeakMap]',
    Mn = '[object DataView]',
    Ln = Rn(In),
    Fn = Rn(Nn),
    $n = Rn(Bn),
    zn = Rn(kn),
    Hn = Rn(Pn),
    Wn = On;
  ((In && Wn(new In(new ArrayBuffer(1))) != Mn) ||
    (Nn && Wn(new Nn()) != Un) ||
    (Bn && Wn(Bn.resolve()) != Vn) ||
    (kn && Wn(new kn()) != jn) ||
    (Pn && Wn(new Pn()) != Dn)) &&
    (Wn = function (t) {
      var e = On(t),
        n = '[object Object]' == e ? t.constructor : void 0,
        r = n ? Rn(n) : '';
      if (r)
        switch (r) {
          case Ln:
            return Mn;
          case Fn:
            return Un;
          case $n:
            return Vn;
          case zn:
            return jn;
          case Hn:
            return Dn;
        }
      return e;
    });
  var Yn = Wn;
  var qn = function (t) {
      return null != t && 'object' == typeof t;
    },
    Gn = en,
    Kn = qn;
  var Jn = function (t) {
      return Kn(t) && '[object Arguments]' == Gn(t);
    },
    Qn = qn,
    Zn = Object.prototype,
    Xn = Zn.hasOwnProperty,
    tr = Zn.propertyIsEnumerable,
    er = Jn(
      (function () {
        return arguments;
      })()
    )
      ? Jn
      : function (t) {
          return Qn(t) && Xn.call(t, 'callee') && !tr.call(t, 'callee');
        },
    nr = Array.isArray;
  var rr = function (t) {
      return (
        'number' == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991
      );
    },
    or = un,
    ir = rr;
  var ar = function (t) {
      return null != t && ir(t.length) && !or(t);
    },
    ur = { exports: {} };
  var sr = function () {
    return !1;
  };
  !(function (t, e) {
    var n = ze,
      r = sr,
      o = e && !e.nodeType && e,
      i = o && t && !t.nodeType && t,
      a = i && i.exports === o ? n.Buffer : void 0,
      u = (a ? a.isBuffer : void 0) || r;
    t.exports = u;
  })(ur, ur.exports);
  var cr = en,
    lr = rr,
    fr = qn,
    dr = {};
  (dr['[object Float32Array]'] =
    dr['[object Float64Array]'] =
    dr['[object Int8Array]'] =
    dr['[object Int16Array]'] =
    dr['[object Int32Array]'] =
    dr['[object Uint8Array]'] =
    dr['[object Uint8ClampedArray]'] =
    dr['[object Uint16Array]'] =
    dr['[object Uint32Array]'] =
      !0),
    (dr['[object Arguments]'] =
      dr['[object Array]'] =
      dr['[object ArrayBuffer]'] =
      dr['[object Boolean]'] =
      dr['[object DataView]'] =
      dr['[object Date]'] =
      dr['[object Error]'] =
      dr['[object Function]'] =
      dr['[object Map]'] =
      dr['[object Number]'] =
      dr['[object Object]'] =
      dr['[object RegExp]'] =
      dr['[object Set]'] =
      dr['[object String]'] =
      dr['[object WeakMap]'] =
        !1);
  var pr = function (t) {
    return fr(t) && lr(t.length) && !!dr[cr(t)];
  };
  var hr = function (t) {
      return function (e) {
        return t(e);
      };
    },
    vr = { exports: {} };
  !(function (t, e) {
    var n = Le,
      r = e && !e.nodeType && e,
      o = r && t && !t.nodeType && t,
      i = o && o.exports === r && n.process,
      a = (function () {
        try {
          var t = o && o.require && o.require('util').types;
          return t || (i && i.binding && i.binding('util'));
        } catch (e) {}
      })();
    t.exports = a;
  })(vr, vr.exports);
  var gr = pr,
    yr = hr,
    mr = vr.exports,
    br = mr && mr.isTypedArray,
    wr = br ? yr(br) : gr,
    _r = Me,
    Sr = Yn,
    Cr = er,
    xr = nr,
    Er = ar,
    Ar = ur.exports,
    Tr = Oe,
    Ir = wr,
    Nr = Object.prototype.hasOwnProperty;
  var Br = function (t) {
    if (null == t) return !0;
    if (
      Er(t) &&
      (xr(t) ||
        'string' == typeof t ||
        'function' == typeof t.splice ||
        Ar(t) ||
        Ir(t) ||
        Cr(t))
    )
      return !t.length;
    var e = Sr(t);
    if ('[object Map]' == e || '[object Set]' == e) return !t.size;
    if (Tr(t)) return !_r(t).length;
    for (var n in t) if (Nr.call(t, n)) return !1;
    return !0;
  };
  var kr = function () {
    (this.__data__ = []), (this.size = 0);
  };
  var Pr = function (t, e) {
      return t === e || (t != t && e != e);
    },
    Or = Pr;
  var Rr = function (t, e) {
      for (var n = t.length; n--; ) if (Or(t[n][0], e)) return n;
      return -1;
    },
    Ur = Rr,
    Vr = Array.prototype.splice;
  var jr = Rr;
  var Dr = Rr;
  var Mr = Rr;
  var Lr = kr,
    Fr = function (t) {
      var e = this.__data__,
        n = Ur(e, t);
      return (
        !(n < 0) &&
        (n == e.length - 1 ? e.pop() : Vr.call(e, n, 1), --this.size, !0)
      );
    },
    $r = function (t) {
      var e = this.__data__,
        n = jr(e, t);
      return n < 0 ? void 0 : e[n][1];
    },
    zr = function (t) {
      return Dr(this.__data__, t) > -1;
    },
    Hr = function (t, e) {
      var n = this.__data__,
        r = Mr(n, t);
      return r < 0 ? (++this.size, n.push([t, e])) : (n[r][1] = e), this;
    };
  function Wr(t) {
    var e = -1,
      n = null == t ? 0 : t.length;
    for (this.clear(); ++e < n; ) {
      var r = t[e];
      this.set(r[0], r[1]);
    }
  }
  (Wr.prototype.clear = Lr),
    (Wr.prototype.delete = Fr),
    (Wr.prototype.get = $r),
    (Wr.prototype.has = zr),
    (Wr.prototype.set = Hr);
  var Yr = Wr,
    qr = Yr;
  var Gr = function () {
    (this.__data__ = new qr()), (this.size = 0);
  };
  var Kr = function (t) {
    var e = this.__data__,
      n = e.delete(t);
    return (this.size = e.size), n;
  };
  var Jr = function (t) {
    return this.__data__.get(t);
  };
  var Qr = function (t) {
      return this.__data__.has(t);
    },
    Zr = En(Object, 'create'),
    Xr = Zr;
  var to = function () {
    (this.__data__ = Xr ? Xr(null) : {}), (this.size = 0);
  };
  var eo = function (t) {
      var e = this.has(t) && delete this.__data__[t];
      return (this.size -= e ? 1 : 0), e;
    },
    no = Zr,
    ro = Object.prototype.hasOwnProperty;
  var oo = function (t) {
      var e = this.__data__;
      if (no) {
        var n = e[t];
        return '__lodash_hash_undefined__' === n ? void 0 : n;
      }
      return ro.call(e, t) ? e[t] : void 0;
    },
    io = Zr,
    ao = Object.prototype.hasOwnProperty;
  var uo = Zr;
  var so = to,
    co = eo,
    lo = oo,
    fo = function (t) {
      var e = this.__data__;
      return io ? void 0 !== e[t] : ao.call(e, t);
    },
    po = function (t, e) {
      var n = this.__data__;
      return (
        (this.size += this.has(t) ? 0 : 1),
        (n[t] = uo && void 0 === e ? '__lodash_hash_undefined__' : e),
        this
      );
    };
  function ho(t) {
    var e = -1,
      n = null == t ? 0 : t.length;
    for (this.clear(); ++e < n; ) {
      var r = t[e];
      this.set(r[0], r[1]);
    }
  }
  (ho.prototype.clear = so),
    (ho.prototype.delete = co),
    (ho.prototype.get = lo),
    (ho.prototype.has = fo),
    (ho.prototype.set = po);
  var vo = ho,
    go = Yr,
    yo = Tn;
  var mo = function (t) {
    var e = typeof t;
    return 'string' == e || 'number' == e || 'symbol' == e || 'boolean' == e
      ? '__proto__' !== t
      : null === t;
  };
  var bo = function (t, e) {
      var n = t.__data__;
      return mo(e) ? n['string' == typeof e ? 'string' : 'hash'] : n.map;
    },
    wo = bo;
  var _o = bo;
  var So = bo;
  var Co = bo;
  var xo = function () {
      (this.size = 0),
        (this.__data__ = {
          hash: new vo(),
          map: new (yo || go)(),
          string: new vo(),
        });
    },
    Eo = function (t) {
      var e = wo(this, t).delete(t);
      return (this.size -= e ? 1 : 0), e;
    },
    Ao = function (t) {
      return _o(this, t).get(t);
    },
    To = function (t) {
      return So(this, t).has(t);
    },
    Io = function (t, e) {
      var n = Co(this, t),
        r = n.size;
      return n.set(t, e), (this.size += n.size == r ? 0 : 1), this;
    };
  function No(t) {
    var e = -1,
      n = null == t ? 0 : t.length;
    for (this.clear(); ++e < n; ) {
      var r = t[e];
      this.set(r[0], r[1]);
    }
  }
  (No.prototype.clear = xo),
    (No.prototype.delete = Eo),
    (No.prototype.get = Ao),
    (No.prototype.has = To),
    (No.prototype.set = Io);
  var Bo = Yr,
    ko = Tn,
    Po = No;
  var Oo = Yr,
    Ro = Gr,
    Uo = Kr,
    Vo = Jr,
    jo = Qr,
    Do = function (t, e) {
      var n = this.__data__;
      if (n instanceof Bo) {
        var r = n.__data__;
        if (!ko || r.length < 199)
          return r.push([t, e]), (this.size = ++n.size), this;
        n = this.__data__ = new Po(r);
      }
      return n.set(t, e), (this.size = n.size), this;
    };
  function Mo(t) {
    var e = (this.__data__ = new Oo(t));
    this.size = e.size;
  }
  (Mo.prototype.clear = Ro),
    (Mo.prototype.delete = Uo),
    (Mo.prototype.get = Vo),
    (Mo.prototype.has = jo),
    (Mo.prototype.set = Do);
  var Lo = Mo,
    Fo = En,
    $o = (function () {
      try {
        var t = Fo(Object, 'defineProperty');
        return t({}, '', {}), t;
      } catch (e) {}
    })(),
    zo = $o;
  var Ho = function (t, e, n) {
      '__proto__' == e && zo
        ? zo(t, e, { configurable: !0, enumerable: !0, value: n, writable: !0 })
        : (t[e] = n);
    },
    Wo = Ho,
    Yo = Pr;
  var qo = function (t, e, n) {
    ((void 0 !== n && !Yo(t[e], n)) || (void 0 === n && !(e in t))) &&
      Wo(t, e, n);
  };
  var Go = (function (t) {
      return function (e, n, r) {
        for (var o = -1, i = Object(e), a = r(e), u = a.length; u--; ) {
          var s = a[t ? u : ++o];
          if (!1 === n(i[s], s, i)) break;
        }
        return e;
      };
    })(),
    Ko = { exports: {} };
  !(function (t, e) {
    var n = ze,
      r = e && !e.nodeType && e,
      o = r && t && !t.nodeType && t,
      i = o && o.exports === r ? n.Buffer : void 0,
      a = i ? i.allocUnsafe : void 0;
    t.exports = function (t, e) {
      if (e) return t.slice();
      var n = t.length,
        r = a ? a(n) : new t.constructor(n);
      return t.copy(r), r;
    };
  })(Ko, Ko.exports);
  var Jo = ze.Uint8Array;
  var Qo = function (t) {
    var e = new t.constructor(t.byteLength);
    return new Jo(e).set(new Jo(t)), e;
  };
  var Zo = function (t, e) {
    var n = e ? Qo(t.buffer) : t.buffer;
    return new t.constructor(n, t.byteOffset, t.length);
  };
  var Xo = function (t, e) {
      var n = -1,
        r = t.length;
      for (e || (e = Array(r)); ++n < r; ) e[n] = t[n];
      return e;
    },
    ti = nn,
    ei = Object.create,
    ni = (function () {
      function t() {}
      return function (e) {
        if (!ti(e)) return {};
        if (ei) return ei(e);
        t.prototype = e;
        var n = new t();
        return (t.prototype = void 0), n;
      };
    })(),
    ri = Re(Object.getPrototypeOf, Object),
    oi = ni,
    ii = ri,
    ai = Oe;
  var ui = function (t) {
      return 'function' != typeof t.constructor || ai(t) ? {} : oi(ii(t));
    },
    si = ar,
    ci = qn;
  var li = function (t) {
      return ci(t) && si(t);
    },
    fi = en,
    di = ri,
    pi = qn,
    hi = Function.prototype,
    vi = Object.prototype,
    gi = hi.toString,
    yi = vi.hasOwnProperty,
    mi = gi.call(Object);
  var bi = function (t) {
    if (!pi(t) || '[object Object]' != fi(t)) return !1;
    var e = di(t);
    if (null === e) return !0;
    var n = yi.call(e, 'constructor') && e.constructor;
    return 'function' == typeof n && n instanceof n && gi.call(n) == mi;
  };
  var wi = function (t, e) {
      if (
        ('constructor' !== e || 'function' != typeof t[e]) &&
        '__proto__' != e
      )
        return t[e];
    },
    _i = Ho,
    Si = Pr,
    Ci = Object.prototype.hasOwnProperty;
  var xi = function (t, e, n) {
      var r = t[e];
      (Ci.call(t, e) && Si(r, n) && (void 0 !== n || e in t)) || _i(t, e, n);
    },
    Ei = Ho;
  var Ai = function (t, e, n, r) {
    var o = !n;
    n || (n = {});
    for (var i = -1, a = e.length; ++i < a; ) {
      var u = e[i],
        s = r ? r(n[u], t[u], u, n, t) : void 0;
      void 0 === s && (s = t[u]), o ? Ei(n, u, s) : xi(n, u, s);
    }
    return n;
  };
  var Ti = /^(?:0|[1-9]\d*)$/;
  var Ii = function (t, e) {
      var n = typeof t;
      return (
        !!(e = null == e ? 9007199254740991 : e) &&
        ('number' == n || ('symbol' != n && Ti.test(t))) &&
        t > -1 &&
        t % 1 == 0 &&
        t < e
      );
    },
    Ni = function (t, e) {
      for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n);
      return r;
    },
    Bi = er,
    ki = nr,
    Pi = ur.exports,
    Oi = Ii,
    Ri = wr,
    Ui = Object.prototype.hasOwnProperty;
  var Vi = function (t, e) {
    var n = ki(t),
      r = !n && Bi(t),
      o = !n && !r && Pi(t),
      i = !n && !r && !o && Ri(t),
      a = n || r || o || i,
      u = a ? Ni(t.length, String) : [],
      s = u.length;
    for (var c in t)
      (!e && !Ui.call(t, c)) ||
        (a &&
          ('length' == c ||
            (o && ('offset' == c || 'parent' == c)) ||
            (i && ('buffer' == c || 'byteLength' == c || 'byteOffset' == c)) ||
            Oi(c, s))) ||
        u.push(c);
    return u;
  };
  var ji = nn,
    Di = Oe,
    Mi = function (t) {
      var e = [];
      if (null != t) for (var n in Object(t)) e.push(n);
      return e;
    },
    Li = Object.prototype.hasOwnProperty;
  var Fi = Vi,
    $i = function (t) {
      if (!ji(t)) return Mi(t);
      var e = Di(t),
        n = [];
      for (var r in t)
        ('constructor' != r || (!e && Li.call(t, r))) && n.push(r);
      return n;
    },
    zi = ar;
  var Hi = function (t) {
      return zi(t) ? Fi(t, !0) : $i(t);
    },
    Wi = Ai,
    Yi = Hi;
  var qi = qo,
    Gi = Ko.exports,
    Ki = Zo,
    Ji = Xo,
    Qi = ui,
    Zi = er,
    Xi = nr,
    ta = li,
    ea = ur.exports,
    na = un,
    ra = nn,
    oa = bi,
    ia = wr,
    aa = wi,
    ua = function (t) {
      return Wi(t, Yi(t));
    };
  var sa = Lo,
    ca = qo,
    la = Go,
    fa = function (t, e, n, r, o, i, a) {
      var u = aa(t, n),
        s = aa(e, n),
        c = a.get(s);
      if (c) qi(t, n, c);
      else {
        var l = i ? i(u, s, n + '', t, e, a) : void 0,
          f = void 0 === l;
        if (f) {
          var d = Xi(s),
            p = !d && ea(s),
            h = !d && !p && ia(s);
          (l = s),
            d || p || h
              ? Xi(u)
                ? (l = u)
                : ta(u)
                ? (l = Ji(u))
                : p
                ? ((f = !1), (l = Gi(s, !0)))
                : h
                ? ((f = !1), (l = Ki(s, !0)))
                : (l = [])
              : oa(s) || Zi(s)
              ? ((l = u),
                Zi(u) ? (l = ua(u)) : (ra(u) && !na(u)) || (l = Qi(s)))
              : (f = !1);
        }
        f && (a.set(s, l), o(l, s, r, i, a), a.delete(s)), qi(t, n, l);
      }
    },
    da = nn,
    pa = Hi,
    ha = wi;
  var va = function t(e, n, r, o, i) {
    e !== n &&
      la(
        n,
        function (a, u) {
          if ((i || (i = new sa()), da(a))) fa(e, n, u, r, t, o, i);
          else {
            var s = o ? o(ha(e, u), a, u + '', e, n, i) : void 0;
            void 0 === s && (s = a), ca(e, u, s);
          }
        },
        pa
      );
  };
  var ga = function (t) {
    return t;
  };
  var ya = function (t, e, n) {
      switch (n.length) {
        case 0:
          return t.call(e);
        case 1:
          return t.call(e, n[0]);
        case 2:
          return t.call(e, n[0], n[1]);
        case 3:
          return t.call(e, n[0], n[1], n[2]);
      }
      return t.apply(e, n);
    },
    ma = Math.max;
  var ba = function (t, e, n) {
    return (
      (e = ma(void 0 === e ? t.length - 1 : e, 0)),
      function () {
        for (
          var r = arguments, o = -1, i = ma(r.length - e, 0), a = Array(i);
          ++o < i;

        )
          a[o] = r[e + o];
        o = -1;
        for (var u = Array(e + 1); ++o < e; ) u[o] = r[o];
        return (u[e] = n(a)), ya(t, this, u);
      }
    );
  };
  var wa = function (t) {
      return function () {
        return t;
      };
    },
    _a = $o,
    Sa = _a
      ? function (t, e) {
          return _a(t, 'toString', {
            configurable: !0,
            enumerable: !1,
            value: wa(e),
            writable: !0,
          });
        }
      : ga,
    Ca = Date.now;
  var xa = (function (t) {
      var e = 0,
        n = 0;
      return function () {
        var r = Ca(),
          o = 16 - (r - n);
        if (((n = r), o > 0)) {
          if (++e >= 800) return arguments[0];
        } else e = 0;
        return t.apply(void 0, arguments);
      };
    })(Sa),
    Ea = ga,
    Aa = ba,
    Ta = xa;
  var Ia = Pr,
    Na = ar,
    Ba = Ii,
    ka = nn;
  var Pa = function (t, e) {
      return Ta(Aa(t, e, Ea), t + '');
    },
    Oa = function (t, e, n) {
      if (!ka(n)) return !1;
      var r = typeof e;
      return (
        !!('number' == r
          ? Na(n) && Ba(e, n.length)
          : 'string' == r && e in n) && Ia(n[e], t)
      );
    };
  var Ra = va,
    Ua = (function (t) {
      return Pa(function (e, n) {
        var r = -1,
          o = n.length,
          i = o > 1 ? n[o - 1] : void 0,
          a = o > 2 ? n[2] : void 0;
        for (
          i = t.length > 3 && 'function' == typeof i ? (o--, i) : void 0,
            a && Oa(n[0], n[1], a) && ((i = o < 3 ? void 0 : i), (o = 1)),
            e = Object(e);
          ++r < o;

        ) {
          var u = n[r];
          u && t(e, u, r, i);
        }
        return e;
      });
    })(function (t, e, n) {
      Ra(t, e, n);
    }),
    Va = {},
    ja = {};
  !(function (t) {
    Object.defineProperty(t, '__esModule', { value: !0 }),
      /*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
    
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
    
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** */
      (t.__assign = function () {
        return (
          (t.__assign =
            Object.assign ||
            function (t) {
              for (var e, n = 1, r = arguments.length; n < r; n++)
                for (var o in (e = arguments[n]))
                  Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
              return t;
            }),
          t.__assign.apply(this, arguments)
        );
      }),
      (t.__read = function (t, e) {
        var n = 'function' == typeof Symbol && t[Symbol.iterator];
        if (!n) return t;
        var r,
          o,
          i = n.call(t),
          a = [];
        try {
          for (; (void 0 === e || e-- > 0) && !(r = i.next()).done; )
            a.push(r.value);
        } catch (u) {
          o = { error: u };
        } finally {
          try {
            r && !r.done && (n = i.return) && n.call(i);
          } finally {
            if (o) throw o.error;
          }
        }
        return a;
      }),
      (t.__rest = function (t, e) {
        var n = {};
        for (var r in t)
          Object.prototype.hasOwnProperty.call(t, r) &&
            e.indexOf(r) < 0 &&
            (n[r] = t[r]);
        if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
          var o = 0;
          for (r = Object.getOwnPropertySymbols(t); o < r.length; o++)
            e.indexOf(r[o]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(t, r[o]) &&
              (n[r[o]] = t[r[o]]);
        }
        return n;
      }),
      (t.__spreadArray = function (t, e) {
        for (var n = 0, r = e.length, o = t.length; n < r; n++, o++)
          t[o] = e[n];
        return t;
      }),
      (t.__values = function (t) {
        var e = 'function' == typeof Symbol && Symbol.iterator,
          n = e && t[e],
          r = 0;
        if (n) return n.call(t);
        if (t && 'number' == typeof t.length)
          return {
            next: function () {
              return (
                t && r >= t.length && (t = void 0),
                { value: t && t[r++], done: !t }
              );
            },
          };
        throw new TypeError(
          e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
        );
      });
  })(ja);
  var Da = {};
  Object.defineProperty(Da, '__esModule', { value: !0 });
  Da.IS_PRODUCTION = !0;
  var Ma = {},
    La = {};
  Object.defineProperty(La, '__esModule', { value: !0 });
  (La.DEFAULT_GUARD_TYPE = 'xstate.guard'),
    (La.EMPTY_ACTIVITY_MAP = {}),
    (La.STATE_DELIMITER = '.'),
    (La.TARGETLESS_KEY = ''),
    (function (t) {
      Object.defineProperty(t, '__esModule', { value: !0 });
      var e = ja,
        n = La,
        r = Da;
      function o(t) {
        return Object.keys(t);
      }
      function i(t, e) {
        try {
          return h(t) ? t : t.toString().split(e);
        } catch (n) {
          throw new Error("'" + t + "' is not a valid state path.");
        }
      }
      function a(t) {
        return (
          'object' == typeof t &&
          'value' in t &&
          'context' in t &&
          'event' in t &&
          '_event' in t
        );
      }
      function u(t, e) {
        return a(t)
          ? t.value
          : h(t)
          ? s(t)
          : 'string' != typeof t
          ? t
          : s(i(t, e));
      }
      function s(t) {
        if (1 === t.length) return t[0];
        for (var e = {}, n = e, r = 0; r < t.length - 1; r++)
          r === t.length - 2
            ? (n[t[r]] = t[r + 1])
            : ((n[t[r]] = {}), (n = n[t[r]]));
        return e;
      }
      function c(t, e) {
        for (var n = {}, r = o(t), i = 0; i < r.length; i++) {
          var a = r[i];
          n[a] = e(t[a], a, t, i);
        }
        return n;
      }
      function l(t) {
        var n;
        return (n = []).concat.apply(n, e.__spreadArray([], e.__read(t)));
      }
      function f(t) {
        return h(t) ? t : [t];
      }
      function d(t) {
        return void 0 === t ? [] : f(t);
      }
      function p(t, e) {
        return c(t.states, function (t, n) {
          if (t) {
            var r = (g(e) ? void 0 : e[n]) || (t ? t.current : void 0);
            if (r) return { current: r, states: p(t, r) };
          }
        });
      }
      function h(t) {
        return Array.isArray(t);
      }
      function v(t) {
        return 'function' == typeof t;
      }
      function g(t) {
        return 'string' == typeof t;
      }
      (t.warn = function () {}),
        r.IS_PRODUCTION ||
          (t.warn = function (t, e) {
            var n = t instanceof Error ? t : void 0;
            if ((n || !t) && void 0 !== console) {
              var r = ['Warning: ' + e];
              n && r.push(n), console.warn.apply(console, r);
            }
          });
      var y = (function () {
        return (
          ('function' == typeof Symbol && Symbol.observable) || '@@observable'
        );
      })();
      function m(t) {
        try {
          return '__xstatenode' in t;
        } catch (e) {
          return !1;
        }
      }
      var b = (function () {
        var t = 0;
        return function () {
          return (++t).toString(16);
        };
      })();
      function w(t, n) {
        return g(t) || 'number' == typeof t ? e.__assign({ type: t }, n) : t;
      }
      (t.evaluateGuard = function (t, e, r, o, i) {
        var a = t.options.guards,
          u = { state: i, cond: e, _event: o };
        if (e.type === n.DEFAULT_GUARD_TYPE) return e.predicate(r, o.data, u);
        var s = a[e.type];
        if (!s)
          throw new Error(
            "Guard '" +
              e.type +
              "' is not implemented on machine '" +
              t.id +
              "'."
          );
        return s(r, o.data, u);
      }),
        (t.flatten = l),
        (t.getEventType = function (t) {
          try {
            return g(t) || 'number' == typeof t ? '' + t : t.type;
          } catch (e) {
            throw new Error(
              'Events must be strings or objects with a string event.type property.'
            );
          }
        }),
        (t.isActor = function (t) {
          return !!t && 'function' == typeof t.send;
        }),
        (t.isArray = h),
        (t.isBehavior = function (t) {
          return (
            null !== t &&
            'object' == typeof t &&
            'transition' in t &&
            'function' == typeof t.transition
          );
        }),
        (t.isBuiltInEvent = function (t) {
          return /^(done|error)\./.test(t);
        }),
        (t.isFunction = v),
        (t.isMachine = m),
        (t.isObservable = function (t) {
          try {
            return 'subscribe' in t && v(t.subscribe);
          } catch (e) {
            return !1;
          }
        }),
        (t.isPromiseLike = function (t) {
          return (
            t instanceof Promise ||
            !(null === t || (!v(t) && 'object' != typeof t) || !v(t.then))
          );
        }),
        (t.isStateLike = a),
        (t.isString = g),
        (t.keys = o),
        (t.mapContext = function (t, n, r) {
          var o, i;
          if (v(t)) return t(n, r.data);
          var a = {};
          try {
            for (
              var u = e.__values(Object.keys(t)), s = u.next();
              !s.done;
              s = u.next()
            ) {
              var c = s.value,
                l = t[c];
              v(l) ? (a[c] = l(n, r.data)) : (a[c] = l);
            }
          } catch (f) {
            o = { error: f };
          } finally {
            try {
              s && !s.done && (i = u.return) && i.call(u);
            } finally {
              if (o) throw o.error;
            }
          }
          return a;
        }),
        (t.mapFilterValues = function (t, n, r) {
          var i,
            a,
            u = {};
          try {
            for (
              var s = e.__values(o(t)), c = s.next();
              !c.done;
              c = s.next()
            ) {
              var l = c.value,
                f = t[l];
              r(f) && (u[l] = n(f, l, t));
            }
          } catch (d) {
            i = { error: d };
          } finally {
            try {
              c && !c.done && (a = s.return) && a.call(s);
            } finally {
              if (i) throw i.error;
            }
          }
          return u;
        }),
        (t.mapValues = c),
        (t.matchesState = function t(e, r, i) {
          void 0 === i && (i = n.STATE_DELIMITER);
          var a = u(e, i),
            s = u(r, i);
          return g(s)
            ? !!g(a) && s === a
            : g(a)
            ? a in s
            : o(a).every(function (e) {
                return e in s && t(a[e], s[e]);
              });
        }),
        (t.nestedPath = function (t, n) {
          return function (r) {
            var o,
              i,
              a = r;
            try {
              for (var u = e.__values(t), s = u.next(); !s.done; s = u.next()) {
                var c = s.value;
                a = a[n][c];
              }
            } catch (l) {
              o = { error: l };
            } finally {
              try {
                s && !s.done && (i = u.return) && i.call(u);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          };
        }),
        (t.normalizeTarget = function (t) {
          if (void 0 !== t && t !== n.TARGETLESS_KEY) return d(t);
        }),
        (t.partition = function (t, n) {
          var r,
            o,
            i = e.__read([[], []], 2),
            a = i[0],
            u = i[1];
          try {
            for (var s = e.__values(t), c = s.next(); !c.done; c = s.next()) {
              var l = c.value;
              n(l) ? a.push(l) : u.push(l);
            }
          } catch (f) {
            r = { error: f };
          } finally {
            try {
              c && !c.done && (o = s.return) && o.call(s);
            } finally {
              if (r) throw r.error;
            }
          }
          return [a, u];
        }),
        (t.path = function (t) {
          return function (n) {
            var r,
              o,
              i = n;
            try {
              for (var a = e.__values(t), u = a.next(); !u.done; u = a.next()) {
                i = i[u.value];
              }
            } catch (s) {
              r = { error: s };
            } finally {
              try {
                u && !u.done && (o = a.return) && o.call(a);
              } finally {
                if (r) throw r.error;
              }
            }
            return i;
          };
        }),
        (t.pathToStateValue = s),
        (t.reportUnhandledExceptionOnInvocation = function (t, e, n) {
          if (!r.IS_PRODUCTION) {
            var o = t.stack ? " Stacktrace was '" + t.stack + "'" : '';
            if (t === e)
              console.error(
                "Missing onError handler for invocation '" +
                  n +
                  "', error was '" +
                  t +
                  "'." +
                  o
              );
            else {
              var i = e.stack ? " Stacktrace was '" + e.stack + "'" : '';
              console.error(
                "Missing onError handler and/or unhandled exception/promise rejection for invocation '" +
                  n +
                  "'. Original error: '" +
                  t +
                  "'. " +
                  o +
                  " Current error is '" +
                  e +
                  "'." +
                  i
              );
            }
          }
        }),
        (t.symbolObservable = y),
        (t.toArray = d),
        (t.toArrayStrict = f),
        (t.toEventObject = w),
        (t.toGuard = function (t, e) {
          if (t)
            return g(t)
              ? {
                  type: n.DEFAULT_GUARD_TYPE,
                  name: t,
                  predicate: e ? e[t] : void 0,
                }
              : v(t)
              ? { type: n.DEFAULT_GUARD_TYPE, name: t.name, predicate: t }
              : t;
        }),
        (t.toInvokeSource = function (t) {
          return 'string' == typeof t ? { type: t } : t;
        }),
        (t.toObserver = function (t, e, n) {
          if ('object' == typeof t) return t;
          var r = function () {};
          return { next: t, error: e || r, complete: n || r };
        }),
        (t.toSCXMLEvent = function (t, n) {
          if (!g(t) && '$$type' in t && 'scxml' === t.$$type) return t;
          var r = w(t);
          return e.__assign(
            { name: r.type, data: r, $$type: 'scxml', type: 'external' },
            n
          );
        }),
        (t.toStatePath = i),
        (t.toStatePaths = function t(e) {
          return e
            ? g(e)
              ? [[e]]
              : l(
                  o(e).map(function (n) {
                    var r = e[n];
                    return 'string' == typeof r || (r && Object.keys(r).length)
                      ? t(e[n]).map(function (t) {
                          return [n].concat(t);
                        })
                      : [[n]];
                  })
                )
            : [[]];
        }),
        (t.toStateValue = u),
        (t.toTransitionConfigArray = function (t, n) {
          return f(n).map(function (n) {
            return void 0 === n || 'string' == typeof n || m(n)
              ? { target: n, event: t }
              : e.__assign(e.__assign({}, n), { event: t });
          });
        }),
        (t.uniqueId = b),
        (t.updateContext = function (n, i, a, u) {
          return (
            r.IS_PRODUCTION ||
              t.warn(!!n, 'Attempting to update undefined context'),
            n
              ? a.reduce(function (t, n) {
                  var r,
                    a,
                    s = n.assignment,
                    c = { state: u, action: n, _event: i },
                    l = {};
                  if (v(s)) l = s(t, i.data, c);
                  else
                    try {
                      for (
                        var f = e.__values(o(s)), d = f.next();
                        !d.done;
                        d = f.next()
                      ) {
                        var p = d.value,
                          h = s[p];
                        l[p] = v(h) ? h(t, i.data, c) : h;
                      }
                    } catch (g) {
                      r = { error: g };
                    } finally {
                      try {
                        d && !d.done && (a = f.return) && a.call(f);
                      } finally {
                        if (r) throw r.error;
                      }
                    }
                  return Object.assign({}, t, l);
                }, n)
              : n
          );
        }),
        (t.updateHistoryStates = p),
        (t.updateHistoryValue = function (t, e) {
          return { current: e, states: p(t, e) };
        });
    })(Ma);
  var Fa = {};
  !(function (t) {
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (function (t) {
        (t.Start = 'xstate.start'),
          (t.Stop = 'xstate.stop'),
          (t.Raise = 'xstate.raise'),
          (t.Send = 'xstate.send'),
          (t.Cancel = 'xstate.cancel'),
          (t.NullEvent = ''),
          (t.Assign = 'xstate.assign'),
          (t.After = 'xstate.after'),
          (t.DoneState = 'done.state'),
          (t.DoneInvoke = 'done.invoke'),
          (t.Log = 'xstate.log'),
          (t.Init = 'xstate.init'),
          (t.Invoke = 'xstate.invoke'),
          (t.ErrorExecution = 'error.execution'),
          (t.ErrorCommunication = 'error.communication'),
          (t.ErrorPlatform = 'error.platform'),
          (t.ErrorCustom = 'xstate.error'),
          (t.Update = 'xstate.update'),
          (t.Pure = 'xstate.pure'),
          (t.Choose = 'xstate.choose');
      })(t.ActionTypes || (t.ActionTypes = {})),
      (function (t) {
        (t.Parent = '#_parent'), (t.Internal = '#_internal');
      })(t.SpecialTargets || (t.SpecialTargets = {}));
  })(Fa);
  var $a = {};
  Object.defineProperty($a, '__esModule', { value: !0 });
  var za = Fa,
    Ha = za.ActionTypes.Start,
    Wa = za.ActionTypes.Stop,
    Ya = za.ActionTypes.Raise,
    qa = za.ActionTypes.Send,
    Ga = za.ActionTypes.Cancel,
    Ka = za.ActionTypes.NullEvent,
    Ja = za.ActionTypes.Assign,
    Qa = za.ActionTypes.After,
    Za = za.ActionTypes.DoneState,
    Xa = za.ActionTypes.Log,
    tu = za.ActionTypes.Init,
    eu = za.ActionTypes.Invoke,
    nu = za.ActionTypes.ErrorExecution,
    ru = za.ActionTypes.ErrorPlatform,
    ou = za.ActionTypes.ErrorCustom,
    iu = za.ActionTypes.Update,
    au = za.ActionTypes.Choose,
    uu = za.ActionTypes.Pure;
  ($a.after = Qa),
    ($a.assign = Ja),
    ($a.cancel = Ga),
    ($a.choose = au),
    ($a.doneState = Za),
    ($a.error = ou),
    ($a.errorExecution = nu),
    ($a.errorPlatform = ru),
    ($a.init = tu),
    ($a.invoke = eu),
    ($a.log = Xa),
    ($a.nullEvent = Ka),
    ($a.pure = uu),
    ($a.raise = Ya),
    ($a.send = qa),
    ($a.start = Ha),
    ($a.stop = Wa),
    ($a.update = iu),
    Object.defineProperty(Va, '__esModule', { value: !0 });
  var su = ja,
    cu = Da,
    lu = Ma,
    fu = Fa,
    du = $a,
    pu = lu.toSCXMLEvent({ type: du.init });
  function hu(t, e) {
    return (e && e[t]) || void 0;
  }
  function vu(t, e) {
    var n;
    if (lu.isString(t) || 'number' == typeof t) {
      var r = hu(t, e);
      n = lu.isFunction(r)
        ? { type: t, exec: r }
        : r || { type: t, exec: void 0 };
    } else if (lu.isFunction(t)) n = { type: t.name || t.toString(), exec: t };
    else {
      r = hu(t.type, e);
      if (lu.isFunction(r)) n = su.__assign(su.__assign({}, t), { exec: r });
      else if (r) {
        var o = r.type || t.type;
        n = su.__assign(su.__assign(su.__assign({}, r), t), { type: o });
      } else n = t;
    }
    return (
      Object.defineProperty(n, 'toString', {
        value: function () {
          return n.type;
        },
        enumerable: !1,
        configurable: !0,
      }),
      n
    );
  }
  var gu = function (t, e) {
    return t
      ? (lu.isArray(t) ? t : [t]).map(function (t) {
          return vu(t, e);
        })
      : [];
  };
  function yu(t) {
    var e = vu(t);
    return su.__assign(su.__assign({ id: lu.isString(t) ? t : e.id }, e), {
      type: e.type,
    });
  }
  function mu(t) {
    return { type: du.raise, _event: lu.toSCXMLEvent(t.event) };
  }
  function bu(t, e) {
    return {
      to: e ? e.to : void 0,
      type: du.send,
      event: lu.isFunction(t) ? t : lu.toEventObject(t),
      delay: e ? e.delay : void 0,
      id:
        e && void 0 !== e.id
          ? e.id
          : lu.isFunction(t)
          ? t.name
          : lu.getEventType(t),
    };
  }
  function wu(t, e, n, r) {
    var o,
      i = { _event: n },
      a = lu.toSCXMLEvent(
        lu.isFunction(t.event) ? t.event(e, n.data, i) : t.event
      );
    if (lu.isString(t.delay)) {
      var u = r && r[t.delay];
      o = lu.isFunction(u) ? u(e, n.data, i) : u;
    } else o = lu.isFunction(t.delay) ? t.delay(e, n.data, i) : t.delay;
    var s = lu.isFunction(t.to) ? t.to(e, n.data, i) : t.to;
    return su.__assign(su.__assign({}, t), {
      to: s,
      _event: a,
      event: a.data,
      delay: o,
    });
  }
  function _u(t, e) {
    return bu(
      t,
      su.__assign(su.__assign({}, e), { to: fu.SpecialTargets.Parent })
    );
  }
  var Su = function (t, e) {
    return { context: t, event: e };
  };
  var Cu = function (t, e, n) {
    return su.__assign(su.__assign({}, t), {
      value: lu.isString(t.expr) ? t.expr : t.expr(e, n.data, { _event: n }),
    });
  };
  function xu(t, e, n) {
    var r = lu.isFunction(t.activity) ? t.activity(e, n.data) : t.activity,
      o = 'string' == typeof r ? { id: r } : r;
    return { type: fu.ActionTypes.Stop, activity: o };
  }
  (Va.after = function (t, e) {
    var n = e ? '#' + e : '';
    return fu.ActionTypes.After + '(' + t + ')' + n;
  }),
    (Va.assign = function (t) {
      return { type: du.assign, assignment: t };
    }),
    (Va.cancel = function (t) {
      return { type: du.cancel, sendId: t };
    }),
    (Va.choose = function (t) {
      return { type: fu.ActionTypes.Choose, conds: t };
    }),
    (Va.done = function (t, e) {
      var n = fu.ActionTypes.DoneState + '.' + t,
        r = {
          type: n,
          data: e,
          toString: function () {
            return n;
          },
        };
      return r;
    }),
    (Va.doneInvoke = function (t, e) {
      var n = fu.ActionTypes.DoneInvoke + '.' + t,
        r = {
          type: n,
          data: e,
          toString: function () {
            return n;
          },
        };
      return r;
    }),
    (Va.error = function (t, e) {
      var n = fu.ActionTypes.ErrorPlatform + '.' + t,
        r = {
          type: n,
          data: e,
          toString: function () {
            return n;
          },
        };
      return r;
    }),
    (Va.escalate = function (t, e) {
      return _u(function (e, n, r) {
        return { type: du.error, data: lu.isFunction(t) ? t(e, n, r) : t };
      }, su.__assign(su.__assign({}, e), { to: fu.SpecialTargets.Parent }));
    }),
    (Va.forwardTo = function (t, e) {
      return bu(function (t, e) {
        return e;
      }, su.__assign(su.__assign({}, e), { to: t }));
    }),
    (Va.getActionFunction = hu),
    (Va.initEvent = pu),
    (Va.log = function (t, e) {
      return void 0 === t && (t = Su), { type: du.log, label: e, expr: t };
    }),
    (Va.pure = function (t) {
      return { type: fu.ActionTypes.Pure, get: t };
    }),
    (Va.raise = function (t) {
      return lu.isString(t)
        ? { type: du.raise, event: t }
        : bu(t, { to: fu.SpecialTargets.Internal });
    }),
    (Va.resolveActions = function t(e, n, r, o, i, a) {
      void 0 === a && (a = !1);
      var u = su.__read(
          a
            ? [[], i]
            : lu.partition(i, function (t) {
                return t.type === du.assign;
              }),
          2
        ),
        s = u[0],
        c = u[1],
        l = s.length ? lu.updateContext(r, o, s, n) : r,
        f = a ? [r] : void 0;
      return [
        lu.flatten(
          c
            .map(function (r) {
              var i;
              switch (r.type) {
                case du.raise:
                  return mu(r);
                case du.send:
                  var u = wu(r, l, o, e.options.delays);
                  return (
                    cu.IS_PRODUCTION ||
                      lu.warn(
                        !lu.isString(r.delay) || 'number' == typeof u.delay,
                        "No delay reference for delay expression '" +
                          r.delay +
                          "' was found on machine '" +
                          e.id +
                          "'"
                      ),
                    u
                  );
                case du.log:
                  return Cu(r, l, o);
                case du.choose:
                  if (
                    !(p =
                      null ===
                        (i = r.conds.find(function (t) {
                          var r = lu.toGuard(t.cond, e.options.guards);
                          return !r || lu.evaluateGuard(e, r, l, o, n);
                        })) || void 0 === i
                        ? void 0
                        : i.actions)
                  )
                    return [];
                  var s = su.__read(
                      t(e, n, l, o, gu(lu.toArray(p), e.options.actions), a),
                      2
                    ),
                    c = s[0],
                    d = s[1];
                  return (l = d), null == f || f.push(l), c;
                case du.pure:
                  var p;
                  if (!(p = r.get(l, o.data))) return [];
                  var h = su.__read(
                      t(e, n, l, o, gu(lu.toArray(p), e.options.actions), a),
                      2
                    ),
                    v = h[0],
                    g = h[1];
                  return (l = g), null == f || f.push(l), v;
                case du.stop:
                  return xu(r, l, o);
                case du.assign:
                  (l = lu.updateContext(l, o, [r], n)), null == f || f.push(l);
                  break;
                default:
                  var y = vu(r, e.options.actions),
                    m = y.exec;
                  if (m && f) {
                    var b = f.length - 1;
                    y.exec = function (t) {
                      for (var e = [], n = 1; n < arguments.length; n++)
                        e[n - 1] = arguments[n];
                      null == m ||
                        m.apply(void 0, su.__spreadArray([f[b]], su.__read(e)));
                    };
                  }
                  return y;
              }
            })
            .filter(function (t) {
              return !!t;
            })
        ),
        l,
      ];
    }),
    (Va.resolveLog = Cu),
    (Va.resolveRaise = mu),
    (Va.resolveSend = wu),
    (Va.resolveStop = xu),
    (Va.respond = function (t, e) {
      return bu(
        t,
        su.__assign(su.__assign({}, e), {
          to: function (t, e, n) {
            return n._event.origin;
          },
        })
      );
    }),
    (Va.send = bu),
    (Va.sendParent = _u),
    (Va.sendUpdate = function () {
      return _u(du.update);
    }),
    (Va.start = function (t) {
      var e = yu(t);
      return { type: fu.ActionTypes.Start, activity: e, exec: void 0 };
    });
  var Eu = (Va.stop = function (t) {
    var e = lu.isFunction(t) ? t : yu(t);
    return { type: fu.ActionTypes.Stop, activity: e, exec: void 0 };
  });
  (Va.toActionObject = vu),
    (Va.toActionObjects = gu),
    (Va.toActivityDefinition = yu);
  var Au,
    Tu,
    Iu = Object.defineProperty,
    Nu = Object.defineProperties,
    Bu = Object.getOwnPropertyDescriptors,
    ku = Object.getOwnPropertySymbols,
    Pu = Object.prototype.hasOwnProperty,
    Ou = Object.prototype.propertyIsEnumerable,
    Ru = (t, e, n) =>
      e in t
        ? Iu(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (t[e] = n),
    Uu = (t, e) => {
      for (var n in e || (e = {})) Pu.call(e, n) && Ru(t, n, e[n]);
      if (ku) for (var n of ku(e)) Ou.call(e, n) && Ru(t, n, e[n]);
      return t;
    },
    Vu = (t, e) => Nu(t, Bu(e));
  ((Tu = Au || (Au = {})).SMS_MFA = 'SMS_MFA'),
    (Tu.SOFTWARE_TOKEN_MFA = 'SOFTWARE_TOKEN_MFA'),
    (Tu.NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED'),
    (Tu.MFA_SETUP = 'MFA_SETUP');
  var ju,
    Du,
    Mu,
    Lu,
    Fu = ['username', 'email', 'phone_number'],
    $u = ['amazon', 'google', 'facebook'],
    zu = le(
      {
        initial: 'init',
        id: 'signInActor',
        states: {
          init: {
            always: [
              { target: 'signIn.submit', cond: 'shouldAutoSignIn' },
              { target: 'signIn' },
            ],
          },
          signIn: {
            initial: 'edit',
            exit: 'clearFormValues',
            states: {
              edit: {
                entry: Dt(),
                on: {
                  SUBMIT: 'submit',
                  CHANGE: { actions: 'handleInput' },
                  FEDERATED_SIGN_IN: 'federatedSignIn',
                },
              },
              federatedSignIn: {
                entry: [Dt(), 'clearError'],
                invoke: {
                  src: 'federatedSignIn',
                  onError: { actions: 'setRemoteError' },
                },
              },
              submit: {
                entry: ['clearError', Dt()],
                invoke: {
                  src: 'signIn',
                  onDone: [
                    {
                      cond: 'shouldSetupTOTP',
                      actions: ['setUser', 'setChallengeName'],
                      target: '#signInActor.setupTOTP',
                    },
                    {
                      cond: 'shouldConfirmSignIn',
                      actions: ['setUser', 'setChallengeName'],
                      target: '#signInActor.confirmSignIn',
                    },
                    {
                      cond: 'shouldForceChangePassword',
                      actions: ['setUser', 'setChallengeName'],
                      target: '#signInActor.forceNewPassword',
                    },
                    { actions: 'setUser', target: 'verifying' },
                  ],
                  onError: [
                    {
                      cond: 'shouldRedirectToConfirmSignUp',
                      actions: 'setUsername',
                      target: 'rejected',
                    },
                    { actions: 'setRemoteError', target: 'edit' },
                  ],
                },
              },
              verifying: {
                entry: ['clearError', Dt()],
                invoke: {
                  src: 'checkVerifiedContact',
                  onDone: [
                    {
                      cond: 'shouldRequestVerification',
                      target: '#signInActor.verifyUser',
                    },
                    { target: 'resolved' },
                  ],
                  onError: { actions: 'setRemoteError', target: 'edit' },
                },
              },
              resolved: { always: '#signInActor.resolved' },
              rejected: { always: '#signInActor.rejected' },
            },
          },
          confirmSignIn: {
            initial: 'edit',
            exit: ['clearFormValues', 'clearError'],
            states: {
              edit: {
                entry: Dt(),
                on: {
                  SUBMIT: 'submit',
                  SIGN_IN: '#signInActor.signIn',
                  CHANGE: { actions: 'handleInput' },
                },
              },
              submit: {
                entry: ['clearError', Dt()],
                invoke: {
                  src: 'confirmSignIn',
                  onDone: {
                    target: '#signInActor.resolved',
                    actions: ['setUser', 'clearChallengeName'],
                  },
                  onError: { target: 'edit', actions: 'setRemoteError' },
                },
              },
            },
          },
          forceNewPassword: {
            initial: 'edit',
            exit: ['clearFormValues', 'clearError'],
            states: {
              edit: {
                entry: Dt(),
                on: {
                  SUBMIT: 'submit',
                  SIGN_IN: '#signInActor.signIn',
                  CHANGE: { actions: 'handleInput' },
                },
              },
              submit: {
                entry: 'clearError',
                invoke: {
                  src: 'forceNewPassword',
                  onDone: {
                    actions: ['setUser', 'clearChallengeName'],
                    target: '#signInActor.resolved',
                  },
                  onError: { actions: 'setRemoteError', target: 'edit' },
                },
              },
            },
          },
          setupTOTP: {
            initial: 'edit',
            exit: ['clearFormValues', 'clearError'],
            states: {
              edit: {
                entry: Dt(),
                on: {
                  SUBMIT: 'submit',
                  SIGN_IN: '#signInActor.signIn',
                  CHANGE: { actions: 'handleInput' },
                },
              },
              submit: {
                entry: [Dt(), 'clearError'],
                invoke: {
                  src: 'verifyTotpToken',
                  onDone: {
                    actions: ['setUser', 'clearChallengeName'],
                    target: '#signInActor.resolved',
                  },
                  onError: { actions: 'setRemoteError', target: 'edit' },
                },
              },
            },
          },
          verifyUser: {
            initial: 'edit',
            exit: ['clearFormValues', 'clearError'],
            states: {
              edit: {
                entry: Dt(),
                on: {
                  SUBMIT: 'submit',
                  SKIP: '#signInActor.resolved',
                  CHANGE: { actions: 'handleInput' },
                },
              },
              submit: {
                entry: 'clearError',
                invoke: {
                  src: 'verifyUser',
                  onDone: { target: '#signInActor.confirmVerifyUser' },
                  onError: { actions: 'setRemoteError', target: 'edit' },
                },
              },
            },
          },
          confirmVerifyUser: {
            initial: 'edit',
            exit: [
              'clearFormValues',
              'clearError',
              'clearUnverifiedAttributes',
              'clearAttributeToVerify',
            ],
            states: {
              edit: {
                entry: Dt(),
                on: {
                  SUBMIT: 'submit',
                  SKIP: '#signInActor.resolved',
                  CHANGE: { actions: 'handleInput' },
                },
              },
              submit: {
                entry: 'clearError',
                invoke: {
                  src: 'confirmVerifyUser',
                  onDone: { target: '#signInActor.resolved' },
                  onError: { actions: 'setRemoteError', target: 'edit' },
                },
              },
            },
          },
          resolved: { type: 'final', data: (t) => ({ user: t.user }) },
          rejected: {
            type: 'final',
            data: (t) => ({
              intent: 'confirmSignUp',
              authAttributes: t.authAttributes,
            }),
          },
        },
      },
      {
        actions: {
          handleInput: Mt({
            formValues(t, e) {
              let { name: n, value: r } = e.data;
              return Vu(Uu({}, t.formValues), { [n]: r });
            },
          }),
          setUser: Mt({ user: (t, e) => e.data.user || e.data }),
          setUsername: Mt({
            authAttributes: (t) => ({ username: t.formValues.username }),
          }),
          setRemoteError: Mt({
            remoteError: (t, e) => {
              var n;
              return (null == (n = e.data) ? void 0 : n.message) || e.data;
            },
          }),
          setChallengeName: Mt({
            challengeName: (t, e) => {
              var n;
              return null == (n = e.data) ? void 0 : n.challengeName;
            },
          }),
          clearChallengeName: Mt({ challengeName: void 0 }),
          clearError: Mt({ remoteError: '' }),
          clearFormValues: Mt({ formValues: {} }),
          clearUnverifiedAttributes: Mt({ unverifiedAttributes: void 0 }),
          clearAttributeToVerify: Mt({ attributeToVerify: void 0 }),
        },
        guards: {
          shouldConfirmSignIn: (t, e) => {
            let n = ke.exports.get(e, 'data.challengeName');
            return [Au.SMS_MFA, Au.SOFTWARE_TOKEN_MFA].includes(n);
          },
          shouldRedirectToConfirmSignUp: (t, e) =>
            'UserNotConfirmedException' === e.data.code,
          shouldSetupTOTP: (t, e) =>
            ke.exports.get(e, 'data.challengeName') === Au.MFA_SETUP,
          shouldForceChangePassword: (t, e) =>
            ke.exports.get(e, 'data.challengeName') ===
            Au.NEW_PASSWORD_REQUIRED,
          shouldAutoSignIn: (t) => !(!t.intent || 'autoSignIn' !== t.intent),
          shouldRequestVerification: (t, e) => {
            let { unverified: n } = e.data;
            return (
              Object.keys(n).length > 0 && ((t.unverifiedAttributes = n), !0)
            );
          },
        },
        services: {
          async signIn(t) {
            let e =
                t.intent && 'autoSignIn' === t.intent
                  ? t.authAttributes
                  : t.formValues,
              { username: r, password: o } = e;
            return n.Auth.signIn(r, o);
          },
          async confirmSignIn(t, e) {
            let r,
              { challengeName: o, user: i } = t,
              { confirmation_code: a } = e.data;
            return (
              (o === Au.SMS_MFA || o === Au.SOFTWARE_TOKEN_MFA) && (r = o),
              n.Auth.confirmSignIn(i, a, r)
            );
          },
          async forceNewPassword(t, e) {
            let { user: r } = t,
              o = ke.exports.get(e, 'data.password');
            return n.Auth.completeNewPassword(r, o);
          },
          async verifyTotpToken(t, e) {
            let { user: r } = t,
              { confirmation_code: o } = e.data;
            return n.Auth.verifyTotpToken(r, o);
          },
          async federatedSignIn(t, e) {
            let { provider: r } = e.data;
            return await n.Auth.federatedSignIn({ provider: r });
          },
          async checkVerifiedContact(t, e) {
            let { user: r } = t;
            return await n.Auth.verifiedContact(r);
          },
          async verifyUser(t, e) {
            let r = await n.Auth.verifyCurrentUserAttribute(
              e.data.unverifiedAttr
            );
            return (t.attributeToVerify = e.data.unverifiedAttr), r;
          },
          async confirmVerifyUser(t, e) {
            let { attributeToVerify: r } = t,
              { confirmation_code: o } = e.data;
            return await n.Auth.verifyCurrentUserAttributeSubmit(r, o);
          },
        },
      }
    ),
    Hu = (t) => {
      let { password: e, confirm_password: n } = t;
      return e || n
        ? e && n && e === n
          ? void 0
          : { confirm_password: 'Your passwords must match' }
        : null;
    },
    Wu = le(
      {
        id: 'signUpActor',
        initial: 'init',
        states: {
          init: {
            always: [
              { target: 'confirmSignUp', cond: 'shouldInitConfirmSignUp' },
              { target: 'signUp' },
            ],
          },
          signUp: {
            type: 'parallel',
            exit: ['clearError', 'clearFormValues'],
            states: {
              validation: {
                initial: 'pending',
                states: {
                  pending: {
                    invoke: {
                      src: 'validateFields',
                      onDone: {
                        target: 'valid',
                        actions: 'clearValidationError',
                      },
                      onError: { target: 'invalid', actions: 'setFieldErrors' },
                    },
                  },
                  valid: { entry: Dt() },
                  invalid: { entry: Dt() },
                },
                on: { CHANGE: { actions: 'handleInput', target: '.pending' } },
              },
              submission: {
                initial: 'idle',
                states: {
                  idle: {
                    entry: Dt(),
                    on: {
                      SUBMIT: 'validate',
                      FEDERATED_SIGN_IN: 'federatedSignIn',
                    },
                  },
                  federatedSignIn: {
                    entry: [Dt(), 'clearError'],
                    invoke: {
                      src: 'federatedSignIn',
                      onDone: '#signUpActor.resolved',
                      onError: { actions: 'setRemoteError' },
                    },
                  },
                  validate: {
                    entry: Dt(),
                    invoke: {
                      src: 'validateFields',
                      onDone: {
                        target: 'pending',
                        actions: 'clearValidationError',
                      },
                      onError: { target: 'idle', actions: 'setFieldErrors' },
                    },
                  },
                  pending: {
                    entry: [Dt(), 'clearError'],
                    invoke: {
                      src: 'signUp',
                      onDone: {
                        target: 'resolved',
                        actions: ['setUser', 'setCredentials'],
                      },
                      onError: { target: 'idle', actions: 'setRemoteError' },
                    },
                  },
                  resolved: {
                    type: 'final',
                    always: '#signUpActor.confirmSignUp',
                  },
                },
              },
            },
          },
          confirmSignUp: {
            initial: 'edit',
            states: {
              edit: {
                entry: Dt(),
                on: {
                  SUBMIT: 'submit',
                  CHANGE: { actions: 'handleInput' },
                  RESEND: 'resend',
                },
              },
              resend: {
                entry: Dt(),
                invoke: {
                  src: 'resendConfirmationCode',
                  onDone: { target: 'edit' },
                  onError: { target: 'edit', actions: 'setRemoteError' },
                },
              },
              submit: {
                entry: [Dt(), 'clearError'],
                invoke: {
                  src: 'confirmSignUp',
                  onDone: { target: '#signUpActor.resolved' },
                  onError: { target: 'edit', actions: 'setRemoteError' },
                },
              },
            },
          },
          resolved: {
            type: 'final',
            data: (t) => {
              let { username: e, password: n } = t.authAttributes,
                r = !(!e || !n);
              return {
                user: t.user,
                intent: r ? 'autoSignIn' : null,
                authAttributes: { username: e, password: n },
              };
            },
          },
        },
      },
      {
        guards: {
          shouldInitConfirmSignUp: (t) =>
            t.intent && 'confirmSignUp' === t.intent,
        },
        actions: {
          setUser: Mt({
            user: (t, e) => {
              var n;
              return null != (n = e.data.user) ? n : e.data;
            },
          }),
          setRemoteError: Mt({
            remoteError: (t, e) => {
              var n;
              return (null == (n = e.data) ? void 0 : n.message) || e.data;
            },
          }),
          setFieldErrors: Mt({ validationError: (t, e) => e.data }),
          setCredentials: Mt({
            authAttributes: (t) => {
              var e, n;
              let [r] = null != (e = t.login_mechanisms) ? e : ['username'];
              return {
                username: t.formValues[r],
                password: null == (n = t.formValues) ? void 0 : n.password,
              };
            },
          }),
          handleInput: Mt({
            formValues: (t, e) => {
              let { name: n, value: r } = e.data;
              return Vu(Uu({}, t.formValues), { [n]: r });
            },
          }),
          clearError: Mt({ remoteError: '' }),
          clearFormValues: Mt({ formValues: {} }),
          clearValidationError: Mt({ validationError: {} }),
        },
        services: {
          async confirmSignUp(t, e) {
            let { username: r, confirmation_code: o } = e.data;
            return n.Auth.confirmSignUp(r, o);
          },
          async resendConfirmationCode(t, e) {
            let { username: r } = e.data;
            return n.Auth.resendSignUp(r);
          },
          async federatedSignIn(t, e) {
            let { provider: r } = e.data;
            return await n.Auth.federatedSignIn({ provider: r });
          },
          async signUp(t, e) {
            let r = t,
              { formValues: o } = r,
              i = o,
              { password: a } = i,
              u = ((t, e) => {
                var n = {};
                for (var r in t)
                  Pu.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
                if (null != t && ku)
                  for (var r of ku(t))
                    e.indexOf(r) < 0 && Ou.call(t, r) && (n[r] = t[r]);
                return n;
              })(i, ['password']),
              { login_mechanisms: s } = r,
              [c] = null != s ? s : ['username'];
            u.phone_number &&
              (u.phone_number = u.phone_number.replace(/[^A-Z0-9+]/gi, ''));
            let l = u[c];
            return (
              delete u[c],
              delete u.confirm_password,
              await n.Auth.signUp({ username: l, password: a, attributes: u })
            );
          },
          async validateFields(t, e) {
            let { formValues: n } = t;
            return (async (t, e) => {
              let n = await Promise.all(e.map((e) => e(t))),
                r = Ua({}, ...n);
              return Br(r) ? Promise.resolve() : Promise.reject(r);
            })(n, [Hu]);
          },
        },
      }
    ),
    Yu = le(
      {
        initial: 'pending',
        id: 'signOutActor',
        states: {
          pending: {
            invoke: { src: 'signOut', onDone: 'resolved', onError: 'rejected' },
          },
          resolved: { type: 'final' },
          rejected: { type: 'final' },
        },
      },
      { services: { signOut: () => n.Auth.signOut() } }
    ),
    qu = le(
      {
        id: 'resetPasswordActor',
        initial: 'resetPassword',
        states: {
          resetPassword: {
            initial: 'edit',
            exit: ['clearFormValues', 'clearError'],
            states: {
              edit: {
                entry: Dt(),
                on: { SUBMIT: 'submit', CHANGE: { actions: 'handleInput' } },
              },
              submit: {
                entry: [Dt(), 'setUsername', 'clearError'],
                invoke: {
                  src: 'resetPassword',
                  onDone: {
                    target: '#resetPasswordActor.confirmResetPassword',
                  },
                  onError: { actions: ['setRemoteError'], target: 'edit' },
                },
              },
            },
          },
          confirmResetPassword: {
            initial: 'edit',
            exit: ['clearFormValues', 'clearError', 'clearUsername'],
            states: {
              edit: {
                entry: Dt(),
                on: {
                  SUBMIT: 'submit',
                  RESEND: 'resendCode',
                  CHANGE: { actions: 'handleInput' },
                },
              },
              resendCode: {
                entry: ['clearError', Dt()],
                invoke: {
                  src: 'resetPassword',
                  onDone: { target: 'edit' },
                  onError: { actions: 'setRemoteError', target: 'edit' },
                },
              },
              submit: {
                entry: ['clearError', Dt()],
                invoke: {
                  src: 'confirmResetPassword',
                  onDone: {
                    actions: 'clearUsername',
                    target: '#resetPasswordActor.resolved',
                  },
                  onError: { actions: 'setRemoteError', target: 'edit' },
                },
              },
            },
          },
          resolved: { type: 'final' },
        },
      },
      {
        actions: {
          setRemoteError: Mt({
            remoteError: (t, e) => {
              var n;
              return (null == (n = e.data) ? void 0 : n.message) || e.data;
            },
          }),
          setUsername: Mt({ username: (t) => t.formValues.username }),
          handleInput: Mt({
            formValues: (t, e) => {
              let { name: n, value: r } = e.data;
              return Vu(Uu({}, t.formValues), { [n]: r });
            },
          }),
          clearFormValues: Mt({ formValues: {} }),
          clearError: Mt({ remoteError: '' }),
          clearUsername: Mt({ username: void 0 }),
        },
        services: {
          async resetPassword(t) {
            var e, r;
            let o =
              null != (r = null == (e = t.formValues) ? void 0 : e.username)
                ? r
                : t.username;
            return (t.username = o), n.Auth.forgotPassword(o);
          },
          async confirmResetPassword(t) {
            let { username: e } = t,
              { confirmation_code: r, password: o } = t.formValues;
            return n.Auth.forgotPasswordSubmit(e, r, o);
          },
        },
      }
    ),
    Gu = (t) => Eu(t),
    Ku = Te(
      le(
        {
          id: 'auth',
          initial: 'idle',
          context: { user: void 0, config: void 0, actorRef: void 0 },
          states: {
            idle: {
              invoke: [
                {
                  src: 'getCurrentUser',
                  onDone: { actions: 'setUser', target: 'authenticated' },
                  onError: 'signIn',
                },
                {
                  src: 'getAmplifyConfig',
                  onDone: { actions: 'setAuthConfig' },
                },
              ],
            },
            signIn: {
              entry: 'spawnSignInActor',
              exit: Gu('signInActor'),
              on: {
                SIGN_UP: 'signUp',
                RESET_PASSWORD: 'resetPassword',
                'done.invoke.signInActor': [
                  { target: 'signUp', cond: 'shouldRedirectToSignUp' },
                  { target: 'authenticated', actions: 'setUser' },
                ],
              },
            },
            signUp: {
              entry: 'spawnSignUpActor',
              exit: Gu('signUpActor'),
              on: {
                SIGN_IN: 'signIn',
                'done.invoke.signUpActor': {
                  target: 'signIn',
                  actions: 'setUser',
                },
              },
            },
            resetPassword: {
              entry: 'spawnResetPasswordActor',
              exit: Gu('resetPasswordActor'),
              on: {
                SIGN_IN: 'signIn',
                'done.invoke.resetPasswordActor': 'signIn',
              },
            },
            signOut: {
              entry: 'spawnSignOutActor',
              exit: [Gu('signOutActor'), 'clearUser'],
              on: { 'done.invoke.signOutActor': 'idle' },
            },
            authenticated: { on: { SIGN_OUT: 'signOut' } },
          },
          on: {
            CHANGE: { actions: 'forwardToActor' },
            SUBMIT: { actions: 'forwardToActor' },
            FEDERATED_SIGN_IN: { actions: 'forwardToActor' },
            RESEND: { actions: 'forwardToActor' },
            SIGN_OUT: { actions: 'forwardToActor' },
            SIGN_IN: { actions: 'forwardToActor' },
            SKIP: { actions: 'forwardToActor' },
          },
        },
        {
          actions: {
            forwardToActor:
              ((ju = (t) => t.actorRef),
              jt(function (t, e) {
                return e;
              }, I(I({}, Du), { to: ju }))),
            setUser: Mt({ user: (t, e) => e.data.user || e.data }),
            clearUser: Mt({ user: void 0 }),
            setAuthConfig: Mt({ config: (t, e) => e.data.auth }),
            spawnSignInActor: Mt({
              actorRef: (t, e) => {
                var n, r, o;
                return Ae(
                  zu.withContext({
                    authAttributes:
                      null == (n = e.data) ? void 0 : n.authAttributes,
                    user: null == (r = e.data) ? void 0 : r.user,
                    intent: null == (o = e.data) ? void 0 : o.intent,
                    formValues: {},
                    validationError: {},
                  }),
                  { name: 'signInActor' }
                );
              },
            }),
            spawnSignUpActor: Mt({
              actorRef: (t, e) => {
                var n, r, o, i;
                return Ae(
                  Wu.withContext({
                    authAttributes:
                      null !=
                      (r = null == (n = e.data) ? void 0 : n.authAttributes)
                        ? r
                        : {},
                    intent: null == (o = e.data) ? void 0 : o.intent,
                    formValues: {},
                    validationError: {},
                    login_mechanisms:
                      null == (i = t.config) ? void 0 : i.login_mechanisms,
                  }),
                  { name: 'signUpActor' }
                );
              },
            }),
            spawnResetPasswordActor: Mt({
              actorRef: (t, e) =>
                Ae(qu.withContext({ formValues: {} }), {
                  name: 'resetPasswordActor',
                }),
            }),
            spawnSignOutActor: Mt({
              actorRef: (t) =>
                Ae(Yu.withContext({ user: t.user }), { name: 'signOutActor' }),
            }),
          },
          guards: {
            shouldRedirectToSignUp: (t, e) => {
              var n;
              return (
                !!(null == (n = e.data) ? void 0 : n.intent) &&
                'confirmSignUp' === e.data.intent
              );
            },
          },
          services: {
            getCurrentUser: async () => n.Auth.currentAuthenticatedUser(),
            getAmplifyConfig: async () => n.Amplify.configure(),
          },
        }
      ),
      { devTools: !0 }
    ).start(),
    Ju = {
      username: {
        label: 'Username',
        type: 'text',
        placeholder: 'Enter your username',
      },
      email: { label: 'Email', type: 'email', placeholder: 'Enter your email' },
      phone_number: {
        label: 'Phone Number',
        type: 'tel',
        placeholder: 'Enter your phone number',
      },
      confirmation_code: {
        label: 'Confirmation Code',
        placeholder: 'Enter your confirmation code',
        type: 'number',
      },
      password: {
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
      },
    };
  ((Lu = Mu || (Mu = {})).Amazon = 'LoginWithAmazon'),
    (Lu.Facebook = 'Facebook'),
    (Lu.Google = 'Google');
  var Qu = (t) => {
      var e;
      return null == (e = t.context.actorRef) ? void 0 : e.getSnapshot();
    },
    Zu = (t) => {
      var e;
      return null == (e = Qu(t)) ? void 0 : e.context;
    };
  var Xu = function () {};
  function ts(t) {
    return 'getSnapshot' in t
      ? t.getSnapshot()
      : (function (t) {
          return 'state' in t;
        })(t)
      ? t.state
      : void 0;
  }
  const es = () =>
      (function (t, n) {
        void 0 === n && (n = ts);
        var r = e.isRef(t) ? t : e.shallowRef(t),
          o = e.shallowRef(n(r.value));
        return (
          e.watch(
            r,
            function (t, e, r) {
              o.value = n(t);
              var i = t.subscribe({
                next: function (t) {
                  return (o.value = t);
                },
                error: Xu,
                complete: Xu,
              }).unsubscribe;
              r(function () {
                return i();
              });
            },
            { immediate: !0 }
          ),
          {
            state: o,
            send: function (t) {
              r.value.send(t);
            },
          }
        );
      })(Ku),
    ns = (t) => {
      const e = ['username', 'email', 'phone_number'];
      return t ? (1 === t.length && 'username' === t[0] ? e : t) : e;
    };
  var rs = e.defineComponent({
    components: { BaseInput: y, BaseLabel: r, BaseText: g },
    props: {
      userNameAlias: { default: !1 },
      userName: { default: '' },
      disabled: { default: !1 },
    },
    setup(t) {
      var n, r, o, i, a;
      const { state: u } = es(),
        {
          value: { context: s },
        } = u,
        c = e.computed(() => Zu(u.value));
      let l = e.ref('');
      t.userName && (l = e.computed(() => t.userName));
      const f = c.value.validationError.username,
        [d] = ns(
          null == (n = null == s ? void 0 : s.config)
            ? void 0
            : n.login_mechanisms
        );
      let p = d,
        h =
          null != (o = null == (r = Ju[d]) ? void 0 : r.label)
            ? o
            : Ju.username.label,
        v =
          null != (a = null == (i = Ju[p]) ? void 0 : i.type)
            ? a
            : Ju.username.label;
      if (t.userNameAlias) {
        const t = ((t) => {
          var e, n, r, o, i, a;
          let u =
              null != (n = null == (e = t.config) ? void 0 : e.login_mechanisms)
                ? n
                : ['username'],
            s =
              null == (o = null == (r = t.actorRef) ? void 0 : r.context)
                ? void 0
                : o.validationError.username,
            c = 'text',
            l = u
              .filter((t) => ke.exports.includes(Fu, t))
              .map((t) => {
                var e, n;
                return null != (n = null == (e = Ju[t]) ? void 0 : e.label)
                  ? n
                  : Ju.username.label;
              })
              .join(' or ');
          return (
            1 === u.length &&
              (c =
                null != (a = null == (i = Ju[u[0]]) ? void 0 : i.type)
                  ? a
                  : 'text'),
            { label: l, type: c, error: s }
          );
        })(s);
        (h = t.label || Ju.username.label), (v = t.type), (p = 'username');
      }
      return { label: h, name: p, type: v, error: f, uName: l };
    },
  });
  rs.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('base-text'),
      s = e.resolveComponent('base-input'),
      c = e.resolveComponent('base-label');
    return (
      e.openBlock(),
      e.createBlock(c, null, {
        default: e.withCtx(() => [
          e.createVNode(u, null, {
            default: e.withCtx(() => [
              e.createTextVNode(e.toDisplayString(t.label), 1),
            ]),
            _: 1,
          }),
          e.createVNode(
            s,
            {
              textValue: t.uName,
              'onUpdate:textValue': n[0] || (n[0] = (e) => (t.uName = e)),
              autocomplete: t.name,
              required: '',
              name: t.name,
              disabled: t.disabled,
              type: t.type,
            },
            null,
            8,
            ['textValue', 'autocomplete', 'name', 'disabled', 'type']
          ),
          e.createVNode(u, null, {
            default: e.withCtx(() => [
              e.createTextVNode(e.toDisplayString(t.error), 1),
            ]),
            _: 1,
          }),
        ]),
        _: 1,
      })
    );
  };
  var os = e.defineComponent({
    components: { BaseButton: p },
    props: {
      text: { type: String, required: !0 },
      provider: { type: String, required: !0 },
    },
    setup(t) {
      const { send: e } = es();
      return {
        onClick: (n) => {
          e({ type: 'FEDERATED_SIGN_IN', data: { provider: t.provider } });
        },
      };
    },
  });
  os.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('base-button');
    return (
      e.openBlock(),
      e.createBlock(
        u,
        { 'data-amplify-button': '', type: 'button', onClick: t.onClick },
        {
          default: e.withCtx(() => [
            e.createTextVNode(e.toDisplayString(t.text), 1),
          ]),
          _: 1,
        },
        8,
        ['onClick']
      )
    );
  };
  var is = e.defineComponent({
    components: {
      FederatedSignInButton: os,
      BaseWrapper: u,
      BaseBox: f,
      BaseSpacer: h,
    },
    setup() {
      var t;
      const { state: n } = es(),
        {
          value: { context: r },
        } = n,
        o =
          null == (t = null == r ? void 0 : r.config)
            ? void 0
            : t.login_mechanisms,
        i = null == o ? void 0 : o.includes('facebook'),
        a = null == o ? void 0 : o.includes('google'),
        u = null == o ? void 0 : o.includes('amazon'),
        s = i || a || u;
      return {
        loginMechanisms: o,
        fp: e.computed(() => Mu),
        includeFacebook: i,
        includeGoogle: a,
        includeAmazon: u,
        shouldShowFederatedSignIn: s,
      };
    },
  });
  const as = e.createTextVNode('or');
  is.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('federated-sign-in-button'),
      s = e.resolveComponent('base-wrapper'),
      c = e.resolveComponent('base-spacer'),
      l = e.resolveComponent('base-box');
    return (
      e.openBlock(),
      e.createElementBlock(
        e.Fragment,
        null,
        [
          t.shouldShowFederatedSignIn
            ? (e.openBlock(),
              e.createBlock(
                s,
                {
                  key: 0,
                  'data-amplify-wrapper': '',
                  'data-amplify-federated': '',
                },
                {
                  default: e.withCtx(() => [
                    t.includeFacebook
                      ? (e.openBlock(),
                        e.createBlock(
                          u,
                          {
                            key: 0,
                            text: 'Sign in with Facebook',
                            provider: t.fp.Facebook,
                          },
                          null,
                          8,
                          ['provider']
                        ))
                      : e.createCommentVNode('', !0),
                    t.includeGoogle
                      ? (e.openBlock(),
                        e.createBlock(
                          u,
                          {
                            key: 1,
                            text: 'Sign in with Google',
                            provider: t.fp.Google,
                          },
                          null,
                          8,
                          ['provider']
                        ))
                      : e.createCommentVNode('', !0),
                    t.includeAmazon
                      ? (e.openBlock(),
                        e.createBlock(
                          u,
                          {
                            key: 2,
                            text: 'Sign in with Amazon',
                            provider: t.fp.Amazon,
                          },
                          null,
                          8,
                          ['provider']
                        ))
                      : e.createCommentVNode('', !0),
                  ]),
                  _: 1,
                }
              ))
            : e.createCommentVNode('', !0),
          t.shouldShowFederatedSignIn
            ? (e.openBlock(),
              e.createBlock(
                l,
                { key: 1, 'data-amplify-strike': '' },
                {
                  default: e.withCtx(() => [
                    e.createVNode(c, null, {
                      default: e.withCtx(() => [as]),
                      _: 1,
                    }),
                  ]),
                  _: 1,
                }
              ))
            : e.createCommentVNode('', !0),
        ],
        64
      )
    );
  };
  var us = {
    name: 'Authentication',
    computed: {
      signIntoAccountText: () => 'Sign in to your account',
      resetPasswordLink: () => 'Reset password',
      noAccount: () => 'No account?',
      createAccountLink: () => 'Create account',
      signInButtonText: () => b,
      signIngButtonText: () => 'Signing in',
      forgotYourPasswordText: () => 'Forgot your password?',
      passwordLabel: () => w,
    },
    inheritAttrs: !1,
    components: {
      BaseFooter: i,
      BaseWrapper: u,
      BaseForm: s,
      BaseHeading: c,
      BaseFieldSet: l,
      BaseLabel: r,
      BaseText: g,
      BaseBox: f,
      BaseButton: p,
      BaseSpacer: h,
      UserNameAlias: rs,
      SignInPasswordControl: T,
      FederatedSignIn: is,
    },
    setup(t, { emit: n, attrs: r }) {
      const { state: o, send: i } = es(),
        a = e.computed(() => Qu(o.value)),
        u = e.ref(''),
        s = e.ref(''),
        c = (t) => {
          const e = new FormData(t.target);
          i({ type: 'SUBMIT', data: Object.fromEntries(e) });
        };
      return {
        onSignInSubmit: (t) => {
          (null == r ? void 0 : r.onSignInSubmit) ? n('signInSubmit', t) : c(t);
        },
        AUTHENTICATOR: 'Authenticator',
        onForgotPasswordClicked: () => {
          (null == r ? void 0 : r.onForgotPasswordClicked)
            ? n('forgotPasswordClicked')
            : i({ type: 'RESET_PASSWORD' });
        },
        onCreateAccountClicked: () => {
          (null == r ? void 0 : r.onCreateAccountClicked)
            ? n('createAccountClicked')
            : i({ type: 'SIGN_UP' });
        },
        onInput: (t) => {
          const { name: e, value: n } = t.target;
          i({ type: 'CHANGE', data: { name: e, value: n } });
        },
        actorState: a,
        username: u,
        password: s,
        submit: c,
      };
    },
  };
  us.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('base-heading'),
      s = e.resolveComponent('federated-sign-in'),
      c = e.resolveComponent('user-name-alias'),
      l = e.resolveComponent('sign-in-password-control'),
      f = e.resolveComponent('base-text'),
      d = e.resolveComponent('base-button'),
      p = e.resolveComponent('base-box'),
      h = e.resolveComponent('base-label'),
      v = e.resolveComponent('base-field-Set'),
      g = e.resolveComponent('base-spacer'),
      y = e.resolveComponent('base-footer'),
      m = e.resolveComponent('base-form'),
      b = e.resolveComponent('base-wrapper');
    return e.renderSlot(t.$slots, 'signInSlotI', {}, () => [
      e.createVNode(
        b,
        { 'data-amplify-wrapper': '' },
        {
          default: e.withCtx(() => [
            e.createVNode(
              m,
              {
                'data-amplify-authenticator-signin': '',
                onSubmit: e.withModifiers(o.onSignInSubmit, ['prevent']),
                onInput: o.onInput,
                method: 'post',
              },
              {
                formt: e.withCtx(({ slotData: n }) => [
                  e.renderSlot(t.$slots, 'form', {
                    info: n,
                    onSignInSubmit: o.onSignInSubmit,
                    onCreateAccountClicked: o.onCreateAccountClicked,
                    onForgotPasswordClicked: o.onForgotPasswordClicked,
                  }),
                ]),
                default: e.withCtx(() => [
                  e.createVNode(
                    u,
                    { level: 1 },
                    {
                      headingI: e.withCtx(() => [
                        e.renderSlot(t.$slots, 'heading'),
                      ]),
                      default: e.withCtx(() => [
                        e.createTextVNode(
                          ' ' + e.toDisplayString(a.signIntoAccountText),
                          1
                        ),
                      ]),
                      _: 3,
                    }
                  ),
                  e.createVNode(s),
                  e.createVNode(
                    v,
                    { disabled: o.actorState.matches('signIn.submit') },
                    {
                      fieldSetI: e.withCtx(({ slotData: n }) => [
                        e.renderSlot(t.$slots, 'signin-fields', { info: n }),
                      ]),
                      default: e.withCtx(() => [
                        e.createVNode(c, {
                          'data-amplify-usernamealias': '',
                          userNameAlias: !0,
                        }),
                        e.createVNode(
                          h,
                          { 'data-amplify-password': '' },
                          {
                            default: e.withCtx(() => [
                              e.createVNode(l),
                              e.createVNode(p, null, {
                                default: e.withCtx(() => [
                                  e.renderSlot(
                                    t.$slots,
                                    'forgot-password-section',
                                    {
                                      onForgotPasswordClicked:
                                        o.onForgotPasswordClicked,
                                    },
                                    () => [
                                      e.createVNode(f, null, {
                                        default: e.withCtx(() => [
                                          e.createTextVNode(
                                            e.toDisplayString(
                                              a.forgotYourPasswordText
                                            ),
                                            1
                                          ),
                                        ]),
                                        _: 1,
                                      }),
                                      e.createVNode(
                                        d,
                                        {
                                          type: 'button',
                                          onClick: e.withModifiers(
                                            o.onForgotPasswordClicked,
                                            ['prevent']
                                          ),
                                        },
                                        {
                                          default: e.withCtx(() => [
                                            e.createTextVNode(
                                              e.toDisplayString(
                                                a.resetPasswordLink
                                              ),
                                              1
                                            ),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ['onClick']
                                      ),
                                    ]
                                  ),
                                ]),
                                _: 3,
                              }),
                            ]),
                            _: 3,
                          }
                        ),
                        e.renderSlot(t.$slots, 'additional-fields', {
                          onSignInSubmit: o.onSignInSubmit,
                          onCreateAccountClicked: o.onCreateAccountClicked,
                        }),
                      ]),
                      _: 3,
                    },
                    8,
                    ['disabled']
                  ),
                  e.createVNode(y, null, {
                    footert: e.withCtx(({ slotData: n }) => [
                      e.renderSlot(t.$slots, 'footer', {
                        info: n,
                        onSignInSubmit: o.onSignInSubmit,
                        onCreateAccountClicked: o.onCreateAccountClicked,
                      }),
                    ]),
                    default: e.withCtx(() => [
                      e.createVNode(f, null, {
                        default: e.withCtx(() => [
                          e.createTextVNode(e.toDisplayString(a.noAccount), 1),
                        ]),
                        _: 1,
                      }),
                      e.createVNode(
                        d,
                        {
                          type: 'button',
                          onClick: e.withModifiers(o.onCreateAccountClicked, [
                            'prevent',
                          ]),
                        },
                        {
                          default: e.withCtx(() => [
                            e.createTextVNode(
                              e.toDisplayString(a.createAccountLink),
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['onClick']
                      ),
                      e.createVNode(g),
                      e.createVNode(
                        d,
                        { disabled: o.actorState.matches('signIn.submit') },
                        {
                          buttont: e.withCtx(() => [
                            e.renderSlot(t.$slots, 'sign-in-button', {
                              onSignInSubmit: o.onSignInSubmit,
                            }),
                          ]),
                          default: e.withCtx(() => [
                            e.createTextVNode(
                              ' ' +
                                e.toDisplayString(
                                  o.actorState.matches('signIn.submit')
                                    ? a.signIngButtonText
                                    : a.signInButtonText
                                ),
                              1
                            ),
                          ]),
                          _: 3,
                        },
                        8,
                        ['disabled']
                      ),
                    ]),
                    _: 3,
                  }),
                  e.createVNode(
                    p,
                    { 'data-ui-error': '' },
                    {
                      default: e.withCtx(() => [
                        e.createTextVNode(
                          e.toDisplayString(o.actorState.context.remoteError),
                          1
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                ]),
                _: 3,
              },
              8,
              ['onSubmit', 'onInput']
            ),
          ]),
          _: 3,
        }
      ),
    ]);
  };
  var ss = e.defineComponent({
    components: { BaseInput: y, BaseText: g, BaseLabel: r },
    setup: () => ({ passwordLabel: e.computed(() => w) }),
  });
  ss.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('base-text'),
      s = e.resolveComponent('base-input'),
      c = e.resolveComponent('base-label');
    return (
      e.openBlock(),
      e.createBlock(c, null, {
        default: e.withCtx(() => [
          e.createVNode(u, null, {
            default: e.withCtx(() => [
              e.createTextVNode(e.toDisplayString(t.passwordLabel), 1),
            ]),
            _: 1,
          }),
          e.createVNode(s, {
            autocomplete: 'new-password',
            name: 'password',
            required: '',
            type: 'password',
          }),
        ]),
        _: 1,
      })
    );
  };
  var cs = e.defineComponent({
    components: { BaseInput: y, BaseText: g, BaseLabel: r },
    setup: () => ({
      confirmPasswordLabel: e.computed(() => 'Confirm Password'),
    }),
  });
  cs.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('base-text'),
      s = e.resolveComponent('base-input'),
      c = e.resolveComponent('base-label');
    return (
      e.openBlock(),
      e.createBlock(c, null, {
        default: e.withCtx(() => [
          e.createVNode(u, null, {
            default: e.withCtx(() => [
              e.createTextVNode(e.toDisplayString(t.confirmPasswordLabel), 1),
            ]),
            _: 1,
          }),
          e.createVNode(s, {
            autocomplete: 'new-password',
            name: 'confirm_password',
            required: '',
            type: 'password',
          }),
        ]),
        _: 1,
      })
    );
  };
  var ls = e.defineComponent({
    components: { BaseInput: y, BaseText: g, BaseLabel: r },
    props: {
      label: { default: 'Username', required: !0, type: String },
      name: { default: 'username', required: !0, type: String },
      placeholder: { default: (t) => t.label, type: String },
    },
    setup: () => ({ inputAttributes: e.computed(() => Ju) }),
  });
  ls.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('base-text'),
      s = e.resolveComponent('base-input'),
      c = e.resolveComponent('base-label');
    return (
      e.openBlock(),
      e.createBlock(c, null, {
        default: e.withCtx(() => [
          e.createVNode(u, null, {
            default: e.withCtx(() => [
              e.createTextVNode(e.toDisplayString(t.label), 1),
            ]),
            _: 1,
          }),
          e.createVNode(
            s,
            {
              name: t.name,
              required: '',
              type: t.inputAttributes[t.name].type,
              placeholder: t.placeholder,
            },
            null,
            8,
            ['name', 'type', 'placeholder']
          ),
        ]),
        _: 1,
      })
    );
  };
  var fs = e.defineComponent({
    components: {
      BaseForm: s,
      BaseHeading: c,
      BaseText: g,
      BaseFieldSet: l,
      BaseFooter: i,
      BaseButton: p,
      SignUpPasswordControl: ss,
      BaseWrapper: u,
      BaseBox: f,
      BaseSpacer: h,
      SignUpConfirmPasswordControl: cs,
      UserNameAlias: rs,
      AliasControl: ls,
      FederatedSignIn: is,
    },
    inheritAttrs: !1,
    setup(t, { emit: n, attrs: r }) {
      var o;
      const { state: i, send: a } = es(),
        {
          value: { context: u },
        } = i,
        s = e.computed(() => Qu(i.value));
      let [c, ...l] = ns(
        null == (o = null == u ? void 0 : u.config)
          ? void 0
          : o.login_mechanisms
      );
      l = l.filter((t) => !$u.includes(t));
      const f = e.ref(''),
        d = e.ref(''),
        p = e.computed(() => b),
        h = e.computed(() => _),
        v = e.computed(() => 'Create Account'),
        g = e.computed(() => 'Create a new account'),
        y = e.computed(() => Ju);
      e.watch(i, (t) => {
        var e;
        const n = Zu(t);
        d.value = null == (e = n.validationError) ? void 0 : e.confirm_password;
      });
      const m = () => {
        a({ type: 'SUBMIT' });
      };
      return {
        onHaveAccountClicked: () => {
          (null == r ? void 0 : r.onHaveAccountClicked)
            ? n('haveAccountClicked')
            : a({ type: 'SIGN_IN' });
        },
        onSignUpSubmit: (t) => {
          (null == r ? void 0 : r.onSignUpSubmit) ? n('signUpSubmit', t) : m();
        },
        onInput: (t) => {
          const { name: e, value: n } = t.target;
          a({ type: 'CHANGE', data: { name: e, value: n } });
        },
        state: i,
        actorState: s,
        phone: f,
        submit: m,
        error: d,
        secondaryAliases: l,
        signInButtonText: p,
        haveAccountLabel: h,
        createAccountLabel: v,
        signUpButtonText: g,
        inputAttributes: y,
      };
    },
  });
  fs.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('base-heading'),
      s = e.resolveComponent('federated-sign-in'),
      c = e.resolveComponent('user-name-alias'),
      l = e.resolveComponent('sign-up-password-control'),
      f = e.resolveComponent('sign-up-confirm-password-control'),
      d = e.resolveComponent('base-box'),
      p = e.resolveComponent('alias-control'),
      h = e.resolveComponent('base-field-set'),
      v = e.resolveComponent('base-spacer'),
      g = e.resolveComponent('base-text'),
      y = e.resolveComponent('base-button'),
      m = e.resolveComponent('base-footer'),
      b = e.resolveComponent('base-form'),
      w = e.resolveComponent('base-wrapper');
    return e.renderSlot(t.$slots, 'signUpSlotI', {}, () => [
      e.createVNode(
        w,
        { 'data-amplify-wrapper': '' },
        {
          default: e.withCtx(() => [
            e.createVNode(
              b,
              {
                onSubmit: e.withModifiers(t.onSignUpSubmit, ['prevent']),
                onInput: t.onInput,
              },
              {
                default: e.withCtx(() => [
                  e.createVNode(u, null, {
                    headingI: e.withCtx(() => [
                      e.renderSlot(t.$slots, 'heading'),
                    ]),
                    default: e.withCtx(() => [
                      e.createTextVNode(
                        ' ' + e.toDisplayString(t.signUpButtonText),
                        1
                      ),
                    ]),
                    _: 3,
                  }),
                  e.createVNode(s),
                  e.createVNode(
                    h,
                    { disabled: t.actorState.matches('signUp.submit') },
                    {
                      fieldSetI: e.withCtx(({ slotData: n }) => [
                        e.renderSlot(t.$slots, 'signup-fields', { info: n }),
                      ]),
                      default: e.withCtx(() => [
                        e.createVNode(c),
                        e.createVNode(l),
                        e.createVNode(f),
                        t.error
                          ? (e.openBlock(),
                            e.createBlock(
                              d,
                              { key: 0, 'data-ui-error': '' },
                              {
                                default: e.withCtx(() => [
                                  e.createTextVNode(
                                    e.toDisplayString(t.error),
                                    1
                                  ),
                                ]),
                                _: 1,
                              }
                            ))
                          : e.createCommentVNode('', !0),
                        (e.openBlock(!0),
                        e.createElementBlock(
                          e.Fragment,
                          null,
                          e.renderList(
                            t.secondaryAliases,
                            (n, r) => (
                              e.openBlock(),
                              e.createBlock(
                                p,
                                {
                                  key: r,
                                  label: t.inputAttributes[n].label,
                                  name: n,
                                  placeholder: t.inputAttributes[n].placeholder,
                                },
                                null,
                                8,
                                ['label', 'name', 'placeholder']
                              )
                            )
                          ),
                          128
                        )),
                      ]),
                      _: 3,
                    },
                    8,
                    ['disabled']
                  ),
                  e.createVNode(v),
                  e.createVNode(
                    d,
                    { 'data-ui-error': '' },
                    {
                      default: e.withCtx(() => [
                        e.createTextVNode(
                          e.toDisplayString(t.actorState.context.remoteError),
                          1
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                  e.createVNode(m, null, {
                    footert: e.withCtx(({ slotData: n }) => [
                      e.renderSlot(t.$slots, 'footer', {
                        info: n,
                        onHaveAccountClicked: t.onHaveAccountClicked,
                        onSignUpSubmit: t.onSignUpSubmit,
                      }),
                    ]),
                    default: e.withCtx(() => [
                      e.renderSlot(
                        t.$slots,
                        'footer-left',
                        { onHaveAccountClicked: t.onHaveAccountClicked },
                        () => [
                          e.createVNode(g, null, {
                            default: e.withCtx(() => [
                              e.createTextVNode(
                                e.toDisplayString(t.haveAccountLabel),
                                1
                              ),
                            ]),
                            _: 1,
                          }),
                          e.createVNode(
                            y,
                            {
                              type: 'button',
                              onClick: e.withModifiers(t.onHaveAccountClicked, [
                                'prevent',
                              ]),
                            },
                            {
                              default: e.withCtx(() => [
                                e.createTextVNode(
                                  e.toDisplayString(t.signInButtonText),
                                  1
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ['onClick']
                          ),
                        ]
                      ),
                      e.renderSlot(
                        t.$slots,
                        'footer-right',
                        { onSignUpSubmit: t.onSignUpSubmit },
                        () => [
                          e.createVNode(
                            y,
                            { disabled: t.actorState.matches('signUp.submit') },
                            {
                              default: e.withCtx(() => [
                                e.createTextVNode(
                                  e.toDisplayString(t.createAccountLabel),
                                  1
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ['disabled']
                          ),
                        ]
                      ),
                    ]),
                    _: 3,
                  }),
                ]),
                _: 3,
              },
              8,
              ['onSubmit', 'onInput']
            ),
          ]),
          _: 3,
        }
      ),
    ]);
  };
  var ds,
    ps,
    hs = e.defineComponent({
      components: {
        BaseBox: f,
        BaseHeading: c,
        BaseFieldSet: l,
        BaseForm: s,
        BaseLabel: r,
        BaseSpacer: h,
        BaseButton: p,
        BaseFooter: i,
        BaseText: g,
        BaseInput: y,
        BaseWrapper: u,
        UserNameAlias: rs,
      },
      props: { shouldHideReturnBtn: { default: !1, type: Boolean } },
      inheritAttrs: !1,
      setup(t, { emit: n, attrs: r }) {
        var o, i, a;
        const { state: u, send: s } = es(),
          c = e.computed(() => Qu(u.value)),
          l = c.value.context,
          f =
            null != (a = null == (o = l.user) ? void 0 : o.username)
              ? a
              : null == (i = l.authAttributes)
              ? void 0
              : i.username,
          d = e.computed(() => 'Confirm Sign Up'),
          p = e.computed(() => S),
          h = e.computed(() => C),
          v = e.computed(() => x),
          g = e.computed(() => E),
          y = e.computed(() => A),
          m = (t) => {
            const e = new FormData(t.target);
            s({
              type: 'SUBMIT',
              data: __spreadProps(__spreadValues({}, Object.fromEntries(e)), {
                username: f,
              }),
            });
          };
        return {
          onConfirmSignUpSubmit: (t) => {
            (null == r ? void 0 : r.onConfirmSignUpSubmit)
              ? n('confirmSignUpSubmit', t)
              : m(t);
          },
          onBackToSignInClicked: () => {
            (null == r ? void 0 : r.onBackToSignInClicked)
              ? n('backToSignInClicked')
              : s({ type: 'SIGN_IN' });
          },
          submit: m,
          confirmSignUpHeading: d,
          confirmationCodeText: p,
          lostYourCodeText: h,
          resendCodeText: v,
          backSignInText: g,
          confirmText: y,
          onLostCodeClicked: () => {
            (null == r ? void 0 : r.onLostCodeClicked)
              ? n('lostCodeClicked')
              : s({ type: 'RESEND', data: { username: f } });
          },
          actorState: c,
          send: s,
          username: f,
        };
      },
    });
  (hs.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('base-heading'),
      s = e.resolveComponent('user-name-alias'),
      c = e.resolveComponent('base-text'),
      l = e.resolveComponent('base-input'),
      f = e.resolveComponent('base-button'),
      d = e.resolveComponent('base-box'),
      p = e.resolveComponent('base-label'),
      h = e.resolveComponent('base-field-set'),
      v = e.resolveComponent('base-spacer'),
      g = e.resolveComponent('base-footer'),
      y = e.resolveComponent('base-form'),
      m = e.resolveComponent('base-wrapper');
    return e.renderSlot(t.$slots, 'confirmSignUpSlotI', {}, () => [
      e.createVNode(
        m,
        { 'data-amplify-wrapper': '' },
        {
          default: e.withCtx(() => [
            e.createVNode(
              y,
              {
                onSubmit: e.withModifiers(t.onConfirmSignUpSubmit, ['prevent']),
              },
              {
                default: e.withCtx(() => [
                  e.createVNode(u, null, {
                    default: e.withCtx(() => [
                      e.createTextVNode(
                        e.toDisplayString(t.confirmSignUpHeading),
                        1
                      ),
                    ]),
                    _: 1,
                  }),
                  e.createVNode(
                    h,
                    { disabled: t.actorState.matches('confirmSignUp.pending') },
                    {
                      default: e.withCtx(() => {
                        var n, r, o, i, a, u;
                        return [
                          e.createVNode(
                            s,
                            {
                              userNameAlias: !0,
                              userName:
                                (null ==
                                (o =
                                  null ==
                                  (r =
                                    null == (n = t.actorState)
                                      ? void 0
                                      : n.context)
                                    ? void 0
                                    : r.user)
                                  ? void 0
                                  : o.username) ||
                                (null ==
                                (u =
                                  null ==
                                  (a =
                                    null == (i = t.actorState)
                                      ? void 0
                                      : i.context)
                                    ? void 0
                                    : a.authAttributes)
                                  ? void 0
                                  : u.username),
                              disabled: !0,
                            },
                            null,
                            8,
                            ['userName']
                          ),
                          e.createVNode(
                            p,
                            { 'data-amplify-password': '' },
                            {
                              default: e.withCtx(() => [
                                e.createVNode(c, null, {
                                  default: e.withCtx(() => [
                                    e.createTextVNode(
                                      e.toDisplayString(t.confirmationCodeText),
                                      1
                                    ),
                                  ]),
                                  _: 1,
                                }),
                                e.createVNode(l, {
                                  name: 'confirmation_code',
                                  required: '',
                                  type: 'number',
                                }),
                                e.createVNode(d, null, {
                                  default: e.withCtx(() => [
                                    e.createVNode(c, null, {
                                      default: e.withCtx(() => [
                                        e.createTextVNode(
                                          e.toDisplayString(t.lostYourCodeText),
                                          1
                                        ),
                                      ]),
                                      _: 1,
                                    }),
                                    e.createVNode(
                                      f,
                                      {
                                        type: 'button',
                                        onClick: e.withModifiers(
                                          t.onLostCodeClicked,
                                          ['prevent']
                                        ),
                                      },
                                      {
                                        default: e.withCtx(() => [
                                          e.createTextVNode(
                                            e.toDisplayString(t.resendCodeText),
                                            1
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ['onClick']
                                    ),
                                  ]),
                                  _: 1,
                                }),
                              ]),
                              _: 1,
                            }
                          ),
                        ];
                      }),
                      _: 1,
                    },
                    8,
                    ['disabled']
                  ),
                  e.createVNode(g, null, {
                    footert: e.withCtx(({ slotData: n }) => [
                      e.renderSlot(t.$slots, 'footer', {
                        info: n,
                        onBackToSignInClicked: t.onBackToSignInClicked,
                        onConfirmSignUpSubmit: t.onConfirmSignUpSubmit,
                      }),
                    ]),
                    default: e.withCtx(() => [
                      t.shouldHideReturnBtn
                        ? e.createCommentVNode('', !0)
                        : (e.openBlock(),
                          e.createBlock(
                            f,
                            {
                              key: 0,
                              type: 'button',
                              onClick: e.withModifiers(
                                t.onBackToSignInClicked,
                                ['prevent']
                              ),
                            },
                            {
                              default: e.withCtx(() => [
                                e.createTextVNode(
                                  e.toDisplayString(t.backSignInText),
                                  1
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ['onClick']
                          )),
                      e.createVNode(v),
                      e.createVNode(
                        f,
                        {
                          disabled: t.actorState.matches(
                            'confirmSignUp.pending'
                          ),
                        },
                        {
                          default: e.withCtx(() => [
                            e.createTextVNode(
                              e.toDisplayString(t.confirmText),
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['disabled']
                      ),
                    ]),
                    _: 3,
                  }),
                  e.createVNode(
                    d,
                    { 'data-ui-error': '' },
                    {
                      default: e.withCtx(() => {
                        var n, r;
                        return [
                          e.createTextVNode(
                            e.toDisplayString(
                              null ==
                                (r =
                                  null == (n = t.actorState)
                                    ? void 0
                                    : n.context)
                                ? void 0
                                : r.remoteError
                            ),
                            1
                          ),
                        ];
                      }),
                      _: 1,
                    }
                  ),
                ]),
                _: 3,
              },
              8,
              ['onSubmit']
            ),
          ]),
          _: 3,
        }
      ),
    ]);
  }),
    ((ps = ds || (ds = {})).SMS_MFA = 'SMS_MFA'),
    (ps.SOFTWARE_TOKEN_MFA = 'SOFTWARE_TOKEN_MFA'),
    (ps.NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED'),
    (ps.MFA_SETUP = 'MFA_SETUP');
  var vs = e.defineComponent({
    components: {
      BaseBox: f,
      BaseHeading: c,
      BaseFieldSet: l,
      BaseForm: s,
      BaseLabel: r,
      BaseSpacer: h,
      BaseButton: p,
      BaseFooter: i,
      BaseText: g,
      BaseInput: y,
      BaseWrapper: u,
    },
    inheritAttrs: !1,
    setup(t, { emit: n, attrs: r }) {
      const { state: o, send: i } = es(),
        a = e.computed(() => Qu(o.value)),
        { challengeName: u } = a.value.context;
      let s = 'SMS';
      u === ds.SOFTWARE_TOKEN_MFA && (s = 'TOTP');
      const c = `Confirm ${s} Code`,
        l = e.computed(() => E),
        f = e.computed(() => A),
        d = (t) => {
          const e = new FormData(t.target);
          i({
            type: 'SUBMIT',
            data: __spreadValues({}, Object.fromEntries(e)),
          });
        };
      return {
        confirmSignInHeading: c,
        onConfirmSignInSubmit: (t) => {
          (null == r ? void 0 : r.onConfirmSignInSubmit)
            ? n('confirmSignInSubmit', t)
            : d(t);
        },
        onBackToSignInClicked: () => {
          (null == r ? void 0 : r.onBackToSignInClicked)
            ? n('backToSignInClicked')
            : i({ type: 'SIGN_IN' });
        },
        submit: d,
        backSignInText: l,
        confirmText: f,
        actorState: a,
      };
    },
  });
  const gs = e.createTextVNode('Code *');
  vs.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('base-heading'),
      s = e.resolveComponent('base-text'),
      c = e.resolveComponent('base-input'),
      l = e.resolveComponent('base-label'),
      f = e.resolveComponent('base-field-set'),
      d = e.resolveComponent('base-button'),
      p = e.resolveComponent('base-spacer'),
      h = e.resolveComponent('base-footer'),
      v = e.resolveComponent('base-box'),
      g = e.resolveComponent('base-form'),
      y = e.resolveComponent('base-wrapper');
    return e.renderSlot(t.$slots, 'confirmSignInSlotI', {}, () => [
      e.createVNode(
        y,
        { 'data-amplify-wrapper': '' },
        {
          default: e.withCtx(() => [
            e.createVNode(
              g,
              {
                'data-amplify-authenticator-confirmsignin': '',
                onSubmit: e.withModifiers(t.onConfirmSignInSubmit, ['prevent']),
              },
              {
                default: e.withCtx(() => [
                  e.createVNode(u, null, {
                    default: e.withCtx(() => [
                      e.createTextVNode(
                        e.toDisplayString(t.confirmSignInHeading),
                        1
                      ),
                    ]),
                    _: 1,
                  }),
                  e.createVNode(
                    f,
                    { disabled: t.actorState.matches('confirmSignIn.pending') },
                    {
                      default: e.withCtx(() => [
                        e.createVNode(
                          l,
                          { 'data-amplify-password': '' },
                          {
                            default: e.withCtx(() => [
                              e.createVNode(s, null, {
                                default: e.withCtx(() => [gs]),
                                _: 1,
                              }),
                              e.createVNode(c, {
                                name: 'confirmation_code',
                                placeholder: 'Code',
                                autocomplete: 'one-time-code',
                                required: '',
                                type: 'text',
                              }),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ['disabled']
                  ),
                  e.createVNode(h, null, {
                    footert: e.withCtx(({ slotData: n }) => [
                      e.renderSlot(t.$slots, 'footer', {
                        info: n,
                        onBackToSignInClicked: t.onBackToSignInClicked,
                        onConfirmSignInSubmit: t.onConfirmSignInSubmit,
                      }),
                    ]),
                    default: e.withCtx(() => [
                      e.createVNode(
                        d,
                        {
                          type: 'button',
                          onClick: e.withModifiers(t.onBackToSignInClicked, [
                            'prevent',
                          ]),
                        },
                        {
                          default: e.withCtx(() => [
                            e.createTextVNode(
                              e.toDisplayString(t.backSignInText),
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['onClick']
                      ),
                      e.createVNode(p),
                      e.createVNode(
                        d,
                        {
                          disabled: t.actorState.matches(
                            'confirmSignIn.pending'
                          ),
                        },
                        {
                          default: e.withCtx(() => [
                            e.createTextVNode(
                              e.toDisplayString(t.confirmText),
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['disabled']
                      ),
                    ]),
                    _: 3,
                  }),
                  e.createVNode(
                    v,
                    { 'data-ui-error': '' },
                    {
                      default: e.withCtx(() => {
                        var n, r;
                        return [
                          e.createTextVNode(
                            e.toDisplayString(
                              null ==
                                (r =
                                  null == (n = t.actorState)
                                    ? void 0
                                    : n.context)
                                ? void 0
                                : r.remoteError
                            ),
                            1
                          ),
                        ];
                      }),
                      _: 1,
                    }
                  ),
                ]),
                _: 3,
              },
              8,
              ['onSubmit']
            ),
          ]),
          _: 3,
        }
      ),
    ]);
  };
  var ys = {},
    ms = {},
    bs = {},
    ws = {}.toString,
    _s =
      Array.isArray ||
      function (t) {
        return '[object Array]' == ws.call(t);
      },
    Ss = _s;
  xs.TYPED_ARRAY_SUPPORT = (function () {
    try {
      var t = new Uint8Array(1);
      return (
        (t.__proto__ = {
          __proto__: Uint8Array.prototype,
          foo: function () {
            return 42;
          },
        }),
        42 === t.foo()
      );
    } catch (e) {
      return !1;
    }
  })();
  var Cs = xs.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  function xs(t, e, n) {
    return xs.TYPED_ARRAY_SUPPORT || this instanceof xs
      ? 'number' == typeof t
        ? Ts(this, t)
        : (function (t, e, n, r) {
            if ('number' == typeof e)
              throw new TypeError('"value" argument must not be a number');
            if ('undefined' != typeof ArrayBuffer && e instanceof ArrayBuffer)
              return (function (t, e, n, r) {
                if (n < 0 || e.byteLength < n)
                  throw new RangeError("'offset' is out of bounds");
                if (e.byteLength < n + (r || 0))
                  throw new RangeError("'length' is out of bounds");
                var o;
                o =
                  void 0 === n && void 0 === r
                    ? new Uint8Array(e)
                    : void 0 === r
                    ? new Uint8Array(e, n)
                    : new Uint8Array(e, n, r);
                xs.TYPED_ARRAY_SUPPORT
                  ? (o.__proto__ = xs.prototype)
                  : (o = Is(t, o));
                return o;
              })(t, e, n, r);
            if ('string' == typeof e)
              return (function (t, e) {
                var n = 0 | Bs(e),
                  r = As(t, n),
                  o = r.write(e);
                o !== n && (r = r.slice(0, o));
                return r;
              })(t, e);
            return (function (t, e) {
              if (xs.isBuffer(e)) {
                var n = 0 | Es(e.length),
                  r = As(t, n);
                return 0 === r.length || e.copy(r, 0, 0, n), r;
              }
              if (e) {
                if (
                  ('undefined' != typeof ArrayBuffer &&
                    e.buffer instanceof ArrayBuffer) ||
                  'length' in e
                )
                  return 'number' != typeof e.length || (o = e.length) != o
                    ? As(t, 0)
                    : Is(t, e);
                if ('Buffer' === e.type && Array.isArray(e.data))
                  return Is(t, e.data);
              }
              var o;
              throw new TypeError(
                'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
              );
            })(t, e);
          })(this, t, e, n)
      : new xs(t, e, n);
  }
  function Es(t) {
    if (t >= Cs)
      throw new RangeError(
        'Attempt to allocate Buffer larger than maximum size: 0x' +
          Cs.toString(16) +
          ' bytes'
      );
    return 0 | t;
  }
  function As(t, e) {
    var n;
    return (
      xs.TYPED_ARRAY_SUPPORT
        ? ((n = new Uint8Array(e)).__proto__ = xs.prototype)
        : (null === (n = t) && (n = new xs(e)), (n.length = e)),
      n
    );
  }
  function Ts(t, e) {
    var n = As(t, e < 0 ? 0 : 0 | Es(e));
    if (!xs.TYPED_ARRAY_SUPPORT) for (var r = 0; r < e; ++r) n[r] = 0;
    return n;
  }
  function Is(t, e) {
    for (
      var n = e.length < 0 ? 0 : 0 | Es(e.length), r = As(t, n), o = 0;
      o < n;
      o += 1
    )
      r[o] = 255 & e[o];
    return r;
  }
  function Ns(t, e) {
    var n;
    e = e || 1 / 0;
    for (var r = t.length, o = null, i = [], a = 0; a < r; ++a) {
      if ((n = t.charCodeAt(a)) > 55295 && n < 57344) {
        if (!o) {
          if (n > 56319) {
            (e -= 3) > -1 && i.push(239, 191, 189);
            continue;
          }
          if (a + 1 === r) {
            (e -= 3) > -1 && i.push(239, 191, 189);
            continue;
          }
          o = n;
          continue;
        }
        if (n < 56320) {
          (e -= 3) > -1 && i.push(239, 191, 189), (o = n);
          continue;
        }
        n = 65536 + (((o - 55296) << 10) | (n - 56320));
      } else o && (e -= 3) > -1 && i.push(239, 191, 189);
      if (((o = null), n < 128)) {
        if ((e -= 1) < 0) break;
        i.push(n);
      } else if (n < 2048) {
        if ((e -= 2) < 0) break;
        i.push((n >> 6) | 192, (63 & n) | 128);
      } else if (n < 65536) {
        if ((e -= 3) < 0) break;
        i.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
      } else {
        if (!(n < 1114112)) throw new Error('Invalid code point');
        if ((e -= 4) < 0) break;
        i.push(
          (n >> 18) | 240,
          ((n >> 12) & 63) | 128,
          ((n >> 6) & 63) | 128,
          (63 & n) | 128
        );
      }
    }
    return i;
  }
  function Bs(t) {
    return xs.isBuffer(t)
      ? t.length
      : 'undefined' != typeof ArrayBuffer &&
        'function' == typeof ArrayBuffer.isView &&
        (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
      ? t.byteLength
      : ('string' != typeof t && (t = '' + t),
        0 === t.length ? 0 : Ns(t).length);
  }
  xs.TYPED_ARRAY_SUPPORT &&
    ((xs.prototype.__proto__ = Uint8Array.prototype),
    (xs.__proto__ = Uint8Array),
    'undefined' != typeof Symbol &&
      Symbol.species &&
      xs[Symbol.species] === xs &&
      Object.defineProperty(xs, Symbol.species, {
        value: null,
        configurable: !0,
        enumerable: !1,
        writable: !1,
      })),
    (xs.prototype.write = function (t, e, n) {
      void 0 === e || (void 0 === n && 'string' == typeof e)
        ? ((n = this.length), (e = 0))
        : isFinite(e) && ((e |= 0), isFinite(n) ? (n |= 0) : (n = void 0));
      var r = this.length - e;
      if (
        ((void 0 === n || n > r) && (n = r),
        (t.length > 0 && (n < 0 || e < 0)) || e > this.length)
      )
        throw new RangeError('Attempt to write outside buffer bounds');
      return (function (t, e, n, r) {
        return (function (t, e, n, r) {
          for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o)
            e[o + n] = t[o];
          return o;
        })(Ns(e, t.length - n), t, n, r);
      })(this, t, e, n);
    }),
    (xs.prototype.slice = function (t, e) {
      var n,
        r = this.length;
      if (
        ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
        (e = void 0 === e ? r : ~~e) < 0
          ? (e += r) < 0 && (e = 0)
          : e > r && (e = r),
        e < t && (e = t),
        xs.TYPED_ARRAY_SUPPORT)
      )
        (n = this.subarray(t, e)).__proto__ = xs.prototype;
      else {
        var o = e - t;
        n = new xs(o, void 0);
        for (var i = 0; i < o; ++i) n[i] = this[i + t];
      }
      return n;
    }),
    (xs.prototype.copy = function (t, e, n, r) {
      if (
        (n || (n = 0),
        r || 0 === r || (r = this.length),
        e >= t.length && (e = t.length),
        e || (e = 0),
        r > 0 && r < n && (r = n),
        r === n)
      )
        return 0;
      if (0 === t.length || 0 === this.length) return 0;
      if (e < 0) throw new RangeError('targetStart out of bounds');
      if (n < 0 || n >= this.length)
        throw new RangeError('sourceStart out of bounds');
      if (r < 0) throw new RangeError('sourceEnd out of bounds');
      r > this.length && (r = this.length),
        t.length - e < r - n && (r = t.length - e + n);
      var o,
        i = r - n;
      if (this === t && n < e && e < r)
        for (o = i - 1; o >= 0; --o) t[o + e] = this[o + n];
      else if (i < 1e3 || !xs.TYPED_ARRAY_SUPPORT)
        for (o = 0; o < i; ++o) t[o + e] = this[o + n];
      else Uint8Array.prototype.set.call(t, this.subarray(n, n + i), e);
      return i;
    }),
    (xs.prototype.fill = function (t, e, n) {
      if ('string' == typeof t) {
        if (
          ('string' == typeof e
            ? ((e = 0), (n = this.length))
            : 'string' == typeof n && (n = this.length),
          1 === t.length)
        ) {
          var r = t.charCodeAt(0);
          r < 256 && (t = r);
        }
      } else 'number' == typeof t && (t &= 255);
      if (e < 0 || this.length < e || this.length < n)
        throw new RangeError('Out of range index');
      if (n <= e) return this;
      var o;
      if (
        ((e >>>= 0),
        (n = void 0 === n ? this.length : n >>> 0),
        t || (t = 0),
        'number' == typeof t)
      )
        for (o = e; o < n; ++o) this[o] = t;
      else {
        var i = xs.isBuffer(t) ? t : new xs(t),
          a = i.length;
        for (o = 0; o < n - e; ++o) this[o + e] = i[o % a];
      }
      return this;
    }),
    (xs.concat = function (t, e) {
      if (!Ss(t))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === t.length) return As(null, 0);
      var n;
      if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
      var r = Ts(null, e),
        o = 0;
      for (n = 0; n < t.length; ++n) {
        var i = t[n];
        if (!xs.isBuffer(i))
          throw new TypeError('"list" argument must be an Array of Buffers');
        i.copy(r, o), (o += i.length);
      }
      return r;
    }),
    (xs.byteLength = Bs),
    (xs.prototype._isBuffer = !0),
    (xs.isBuffer = function (t) {
      return !(null == t || !t._isBuffer);
    }),
    (bs.alloc = function (t) {
      var e = new xs(t);
      return e.fill(0), e;
    }),
    (bs.from = function (t) {
      return new xs(t);
    });
  var ks,
    Ps = {},
    Os = [
      0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655,
      733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921,
      2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706,
    ];
  (Ps.getSymbolSize = function (t) {
    if (!t) throw new Error('"version" cannot be null or undefined');
    if (t < 1 || t > 40)
      throw new Error('"version" should be in range from 1 to 40');
    return 4 * t + 17;
  }),
    (Ps.getSymbolTotalCodewords = function (t) {
      return Os[t];
    }),
    (Ps.getBCHDigit = function (t) {
      for (var e = 0; 0 !== t; ) e++, (t >>>= 1);
      return e;
    }),
    (Ps.setToSJISFunction = function (t) {
      if ('function' != typeof t)
        throw new Error('"toSJISFunc" is not a valid function.');
      ks = t;
    }),
    (Ps.isKanjiModeEnabled = function () {
      return void 0 !== ks;
    }),
    (Ps.toSJIS = function (t) {
      return ks(t);
    });
  var Rs = {};
  function Us() {
    (this.buffer = []), (this.length = 0);
  }
  !(function (t) {
    (t.L = { bit: 1 }),
      (t.M = { bit: 0 }),
      (t.Q = { bit: 3 }),
      (t.H = { bit: 2 }),
      (t.isValid = function (t) {
        return t && void 0 !== t.bit && t.bit >= 0 && t.bit < 4;
      }),
      (t.from = function (e, n) {
        if (t.isValid(e)) return e;
        try {
          return (function (e) {
            if ('string' != typeof e) throw new Error('Param is not a string');
            switch (e.toLowerCase()) {
              case 'l':
              case 'low':
                return t.L;
              case 'm':
              case 'medium':
                return t.M;
              case 'q':
              case 'quartile':
                return t.Q;
              case 'h':
              case 'high':
                return t.H;
              default:
                throw new Error('Unknown EC Level: ' + e);
            }
          })(e);
        } catch (r) {
          return n;
        }
      });
  })(Rs),
    (Us.prototype = {
      get: function (t) {
        var e = Math.floor(t / 8);
        return 1 == ((this.buffer[e] >>> (7 - (t % 8))) & 1);
      },
      put: function (t, e) {
        for (var n = 0; n < e; n++) this.putBit(1 == ((t >>> (e - n - 1)) & 1));
      },
      getLengthInBits: function () {
        return this.length;
      },
      putBit: function (t) {
        var e = Math.floor(this.length / 8);
        this.buffer.length <= e && this.buffer.push(0),
          t && (this.buffer[e] |= 128 >>> this.length % 8),
          this.length++;
      },
    });
  var Vs = Us,
    js = bs;
  function Ds(t) {
    if (!t || t < 1)
      throw new Error('BitMatrix size must be defined and greater than 0');
    (this.size = t),
      (this.data = js.alloc(t * t)),
      (this.reservedBit = js.alloc(t * t));
  }
  (Ds.prototype.set = function (t, e, n, r) {
    var o = t * this.size + e;
    (this.data[o] = n), r && (this.reservedBit[o] = !0);
  }),
    (Ds.prototype.get = function (t, e) {
      return this.data[t * this.size + e];
    }),
    (Ds.prototype.xor = function (t, e, n) {
      this.data[t * this.size + e] ^= n;
    }),
    (Ds.prototype.isReserved = function (t, e) {
      return this.reservedBit[t * this.size + e];
    });
  var Ms = Ds,
    Ls = {};
  !(function (t) {
    var e = Ps.getSymbolSize;
    (t.getRowColCoords = function (t) {
      if (1 === t) return [];
      for (
        var n = Math.floor(t / 7) + 2,
          r = e(t),
          o = 145 === r ? 26 : 2 * Math.ceil((r - 13) / (2 * n - 2)),
          i = [r - 7],
          a = 1;
        a < n - 1;
        a++
      )
        i[a] = i[a - 1] - o;
      return i.push(6), i.reverse();
    }),
      (t.getPositions = function (e) {
        for (
          var n = [], r = t.getRowColCoords(e), o = r.length, i = 0;
          i < o;
          i++
        )
          for (var a = 0; a < o; a++)
            (0 === i && 0 === a) ||
              (0 === i && a === o - 1) ||
              (i === o - 1 && 0 === a) ||
              n.push([r[i], r[a]]);
        return n;
      });
  })(Ls);
  var Fs = {},
    $s = Ps.getSymbolSize;
  Fs.getPositions = function (t) {
    var e = $s(t);
    return [
      [0, 0],
      [e - 7, 0],
      [0, e - 7],
    ];
  };
  var zs = {};
  !(function (t) {
    t.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7,
    };
    var e = 3,
      n = 3,
      r = 40,
      o = 10;
    function i(e, n, r) {
      switch (e) {
        case t.Patterns.PATTERN000:
          return (n + r) % 2 == 0;
        case t.Patterns.PATTERN001:
          return n % 2 == 0;
        case t.Patterns.PATTERN010:
          return r % 3 == 0;
        case t.Patterns.PATTERN011:
          return (n + r) % 3 == 0;
        case t.Patterns.PATTERN100:
          return (Math.floor(n / 2) + Math.floor(r / 3)) % 2 == 0;
        case t.Patterns.PATTERN101:
          return ((n * r) % 2) + ((n * r) % 3) == 0;
        case t.Patterns.PATTERN110:
          return (((n * r) % 2) + ((n * r) % 3)) % 2 == 0;
        case t.Patterns.PATTERN111:
          return (((n * r) % 3) + ((n + r) % 2)) % 2 == 0;
        default:
          throw new Error('bad maskPattern:' + e);
      }
    }
    (t.isValid = function (t) {
      return null != t && '' !== t && !isNaN(t) && t >= 0 && t <= 7;
    }),
      (t.from = function (e) {
        return t.isValid(e) ? parseInt(e, 10) : void 0;
      }),
      (t.getPenaltyN1 = function (t) {
        for (
          var n = t.size, r = 0, o = 0, i = 0, a = null, u = null, s = 0;
          s < n;
          s++
        ) {
          (o = i = 0), (a = u = null);
          for (var c = 0; c < n; c++) {
            var l = t.get(s, c);
            l === a ? o++ : (o >= 5 && (r += e + (o - 5)), (a = l), (o = 1)),
              (l = t.get(c, s)) === u
                ? i++
                : (i >= 5 && (r += e + (i - 5)), (u = l), (i = 1));
          }
          o >= 5 && (r += e + (o - 5)), i >= 5 && (r += e + (i - 5));
        }
        return r;
      }),
      (t.getPenaltyN2 = function (t) {
        for (var e = t.size, r = 0, o = 0; o < e - 1; o++)
          for (var i = 0; i < e - 1; i++) {
            var a =
              t.get(o, i) +
              t.get(o, i + 1) +
              t.get(o + 1, i) +
              t.get(o + 1, i + 1);
            (4 !== a && 0 !== a) || r++;
          }
        return r * n;
      }),
      (t.getPenaltyN3 = function (t) {
        for (var e = t.size, n = 0, o = 0, i = 0, a = 0; a < e; a++) {
          o = i = 0;
          for (var u = 0; u < e; u++)
            (o = ((o << 1) & 2047) | t.get(a, u)),
              u >= 10 && (1488 === o || 93 === o) && n++,
              (i = ((i << 1) & 2047) | t.get(u, a)),
              u >= 10 && (1488 === i || 93 === i) && n++;
        }
        return n * r;
      }),
      (t.getPenaltyN4 = function (t) {
        for (var e = 0, n = t.data.length, r = 0; r < n; r++) e += t.data[r];
        return Math.abs(Math.ceil((100 * e) / n / 5) - 10) * o;
      }),
      (t.applyMask = function (t, e) {
        for (var n = e.size, r = 0; r < n; r++)
          for (var o = 0; o < n; o++)
            e.isReserved(o, r) || e.xor(o, r, i(t, o, r));
      }),
      (t.getBestMask = function (e, n) {
        for (
          var r = Object.keys(t.Patterns).length, o = 0, i = 1 / 0, a = 0;
          a < r;
          a++
        ) {
          n(a), t.applyMask(a, e);
          var u =
            t.getPenaltyN1(e) +
            t.getPenaltyN2(e) +
            t.getPenaltyN3(e) +
            t.getPenaltyN4(e);
          t.applyMask(a, e), u < i && ((i = u), (o = a));
        }
        return o;
      });
  })(zs);
  var Hs = {},
    Ws = Rs,
    Ys = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2,
      4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4,
      9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6,
      13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9,
      18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34,
      40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17,
      33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56,
      66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81,
    ],
    qs = [
      7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72,
      88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160,
      192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198,
      288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168,
      308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700,
      224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810,
      960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390,
      728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868,
      1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530,
      1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100,
      660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430,
    ];
  (Hs.getBlocksCount = function (t, e) {
    switch (e) {
      case Ws.L:
        return Ys[4 * (t - 1) + 0];
      case Ws.M:
        return Ys[4 * (t - 1) + 1];
      case Ws.Q:
        return Ys[4 * (t - 1) + 2];
      case Ws.H:
        return Ys[4 * (t - 1) + 3];
      default:
        return;
    }
  }),
    (Hs.getTotalCodewordsCount = function (t, e) {
      switch (e) {
        case Ws.L:
          return qs[4 * (t - 1) + 0];
        case Ws.M:
          return qs[4 * (t - 1) + 1];
        case Ws.Q:
          return qs[4 * (t - 1) + 2];
        case Ws.H:
          return qs[4 * (t - 1) + 3];
        default:
          return;
      }
    });
  var Gs = {},
    Ks = {},
    Js = bs,
    Qs = Js.alloc(512),
    Zs = Js.alloc(256);
  !(function () {
    for (var t = 1, e = 0; e < 255; e++)
      (Qs[e] = t), (Zs[t] = e), 256 & (t <<= 1) && (t ^= 285);
    for (e = 255; e < 512; e++) Qs[e] = Qs[e - 255];
  })(),
    (Ks.log = function (t) {
      if (t < 1) throw new Error('log(' + t + ')');
      return Zs[t];
    }),
    (Ks.exp = function (t) {
      return Qs[t];
    }),
    (Ks.mul = function (t, e) {
      return 0 === t || 0 === e ? 0 : Qs[Zs[t] + Zs[e]];
    }),
    (function (t) {
      var e = bs,
        n = Ks;
      (t.mul = function (t, r) {
        for (var o = e.alloc(t.length + r.length - 1), i = 0; i < t.length; i++)
          for (var a = 0; a < r.length; a++) o[i + a] ^= n.mul(t[i], r[a]);
        return o;
      }),
        (t.mod = function (t, r) {
          for (var o = e.from(t); o.length - r.length >= 0; ) {
            for (var i = o[0], a = 0; a < r.length; a++) o[a] ^= n.mul(r[a], i);
            for (var u = 0; u < o.length && 0 === o[u]; ) u++;
            o = o.slice(u);
          }
          return o;
        }),
        (t.generateECPolynomial = function (r) {
          for (var o = e.from([1]), i = 0; i < r; i++)
            o = t.mul(o, [1, n.exp(i)]);
          return o;
        });
    })(Gs);
  for (
    var Xs = {},
      tc = {
        byteLength: function (t) {
          var e = uc(t),
            n = e[0],
            r = e[1];
          return (3 * (n + r)) / 4 - r;
        },
        toByteArray: function (t) {
          var e,
            n,
            r = uc(t),
            o = r[0],
            i = r[1],
            a = new rc(
              (function (t, e, n) {
                return (3 * (e + n)) / 4 - n;
              })(0, o, i)
            ),
            u = 0,
            s = i > 0 ? o - 4 : o;
          for (n = 0; n < s; n += 4)
            (e =
              (nc[t.charCodeAt(n)] << 18) |
              (nc[t.charCodeAt(n + 1)] << 12) |
              (nc[t.charCodeAt(n + 2)] << 6) |
              nc[t.charCodeAt(n + 3)]),
              (a[u++] = (e >> 16) & 255),
              (a[u++] = (e >> 8) & 255),
              (a[u++] = 255 & e);
          2 === i &&
            ((e = (nc[t.charCodeAt(n)] << 2) | (nc[t.charCodeAt(n + 1)] >> 4)),
            (a[u++] = 255 & e));
          1 === i &&
            ((e =
              (nc[t.charCodeAt(n)] << 10) |
              (nc[t.charCodeAt(n + 1)] << 4) |
              (nc[t.charCodeAt(n + 2)] >> 2)),
            (a[u++] = (e >> 8) & 255),
            (a[u++] = 255 & e));
          return a;
        },
        fromByteArray: function (t) {
          for (
            var e, n = t.length, r = n % 3, o = [], i = 16383, a = 0, u = n - r;
            a < u;
            a += i
          )
            o.push(sc(t, a, a + i > u ? u : a + i));
          1 === r
            ? ((e = t[n - 1]), o.push(ec[e >> 2] + ec[(e << 4) & 63] + '=='))
            : 2 === r &&
              ((e = (t[n - 2] << 8) + t[n - 1]),
              o.push(
                ec[e >> 10] + ec[(e >> 4) & 63] + ec[(e << 2) & 63] + '='
              ));
          return o.join('');
        },
      },
      ec = [],
      nc = [],
      rc = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
      oc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      ic = 0,
      ac = oc.length;
    ic < ac;
    ++ic
  )
    (ec[ic] = oc[ic]), (nc[oc.charCodeAt(ic)] = ic);
  function uc(t) {
    var e = t.length;
    if (e % 4 > 0)
      throw new Error('Invalid string. Length must be a multiple of 4');
    var n = t.indexOf('=');
    return -1 === n && (n = e), [n, n === e ? 0 : 4 - (n % 4)];
  }
  function sc(t, e, n) {
    for (var r, o, i = [], a = e; a < n; a += 3)
      (r =
        ((t[a] << 16) & 16711680) +
        ((t[a + 1] << 8) & 65280) +
        (255 & t[a + 2])),
        i.push(
          ec[((o = r) >> 18) & 63] +
            ec[(o >> 12) & 63] +
            ec[(o >> 6) & 63] +
            ec[63 & o]
        );
    return i.join('');
  }
  (nc['-'.charCodeAt(0)] = 62), (nc['_'.charCodeAt(0)] = 63);
  var cc = {
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    read: function (t, e, n, r, o) {
      var i,
        a,
        u = 8 * o - r - 1,
        s = (1 << u) - 1,
        c = s >> 1,
        l = -7,
        f = n ? o - 1 : 0,
        d = n ? -1 : 1,
        p = t[e + f];
      for (
        f += d, i = p & ((1 << -l) - 1), p >>= -l, l += u;
        l > 0;
        i = 256 * i + t[e + f], f += d, l -= 8
      );
      for (
        a = i & ((1 << -l) - 1), i >>= -l, l += r;
        l > 0;
        a = 256 * a + t[e + f], f += d, l -= 8
      );
      if (0 === i) i = 1 - c;
      else {
        if (i === s) return a ? NaN : (1 / 0) * (p ? -1 : 1);
        (a += Math.pow(2, r)), (i -= c);
      }
      return (p ? -1 : 1) * a * Math.pow(2, i - r);
    },
    write: function (t, e, n, r, o, i) {
      var a,
        u,
        s,
        c = 8 * i - o - 1,
        l = (1 << c) - 1,
        f = l >> 1,
        d = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        p = r ? 0 : i - 1,
        h = r ? 1 : -1,
        v = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
      for (
        e = Math.abs(e),
          isNaN(e) || e === 1 / 0
            ? ((u = isNaN(e) ? 1 : 0), (a = l))
            : ((a = Math.floor(Math.log(e) / Math.LN2)),
              e * (s = Math.pow(2, -a)) < 1 && (a--, (s *= 2)),
              (e += a + f >= 1 ? d / s : d * Math.pow(2, 1 - f)) * s >= 2 &&
                (a++, (s /= 2)),
              a + f >= l
                ? ((u = 0), (a = l))
                : a + f >= 1
                ? ((u = (e * s - 1) * Math.pow(2, o)), (a += f))
                : ((u = e * Math.pow(2, f - 1) * Math.pow(2, o)), (a = 0)));
        o >= 8;
        t[n + p] = 255 & u, p += h, u /= 256, o -= 8
      );
      for (
        a = (a << o) | u, c += o;
        c > 0;
        t[n + p] = 255 & a, p += h, a /= 256, c -= 8
      );
      t[n + p - h] |= 128 * v;
    },
  };
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  !(function (t) {
    var e = tc,
      n = cc,
      r =
        'function' == typeof Symbol && 'function' == typeof Symbol.for
          ? Symbol.for('nodejs.util.inspect.custom')
          : null;
    (t.Buffer = a),
      (t.SlowBuffer = function (t) {
        +t != t && (t = 0);
        return a.alloc(+t);
      }),
      (t.INSPECT_MAX_BYTES = 50);
    var o = 2147483647;
    function i(t) {
      if (t > o)
        throw new RangeError(
          'The value "' + t + '" is invalid for option "size"'
        );
      var e = new Uint8Array(t);
      return Object.setPrototypeOf(e, a.prototype), e;
    }
    function a(t, e, n) {
      if ('number' == typeof t) {
        if ('string' == typeof e)
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return c(t);
      }
      return u(t, e, n);
    }
    function u(t, e, n) {
      if ('string' == typeof t)
        return (function (t, e) {
          ('string' == typeof e && '' !== e) || (e = 'utf8');
          if (!a.isEncoding(e)) throw new TypeError('Unknown encoding: ' + e);
          var n = 0 | p(t, e),
            r = i(n),
            o = r.write(t, e);
          o !== n && (r = r.slice(0, o));
          return r;
        })(t, e);
      if (ArrayBuffer.isView(t))
        return (function (t) {
          if (M(t, Uint8Array)) {
            var e = new Uint8Array(t);
            return f(e.buffer, e.byteOffset, e.byteLength);
          }
          return l(t);
        })(t);
      if (null == t)
        throw new TypeError(
          'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
            typeof t
        );
      if (M(t, ArrayBuffer) || (t && M(t.buffer, ArrayBuffer)))
        return f(t, e, n);
      if (
        'undefined' != typeof SharedArrayBuffer &&
        (M(t, SharedArrayBuffer) || (t && M(t.buffer, SharedArrayBuffer)))
      )
        return f(t, e, n);
      if ('number' == typeof t)
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      var r = t.valueOf && t.valueOf();
      if (null != r && r !== t) return a.from(r, e, n);
      var o = (function (t) {
        if (a.isBuffer(t)) {
          var e = 0 | d(t.length),
            n = i(e);
          return 0 === n.length || t.copy(n, 0, 0, e), n;
        }
        if (void 0 !== t.length)
          return 'number' != typeof t.length || L(t.length) ? i(0) : l(t);
        if ('Buffer' === t.type && Array.isArray(t.data)) return l(t.data);
      })(t);
      if (o) return o;
      if (
        'undefined' != typeof Symbol &&
        null != Symbol.toPrimitive &&
        'function' == typeof t[Symbol.toPrimitive]
      )
        return a.from(t[Symbol.toPrimitive]('string'), e, n);
      throw new TypeError(
        'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
          typeof t
      );
    }
    function s(t) {
      if ('number' != typeof t)
        throw new TypeError('"size" argument must be of type number');
      if (t < 0)
        throw new RangeError(
          'The value "' + t + '" is invalid for option "size"'
        );
    }
    function c(t) {
      return s(t), i(t < 0 ? 0 : 0 | d(t));
    }
    function l(t) {
      for (
        var e = t.length < 0 ? 0 : 0 | d(t.length), n = i(e), r = 0;
        r < e;
        r += 1
      )
        n[r] = 255 & t[r];
      return n;
    }
    function f(t, e, n) {
      if (e < 0 || t.byteLength < e)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (t.byteLength < e + (n || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      var r;
      return (
        (r =
          void 0 === e && void 0 === n
            ? new Uint8Array(t)
            : void 0 === n
            ? new Uint8Array(t, e)
            : new Uint8Array(t, e, n)),
        Object.setPrototypeOf(r, a.prototype),
        r
      );
    }
    function d(t) {
      if (t >= o)
        throw new RangeError(
          'Attempt to allocate Buffer larger than maximum size: 0x' +
            o.toString(16) +
            ' bytes'
        );
      return 0 | t;
    }
    function p(t, e) {
      if (a.isBuffer(t)) return t.length;
      if (ArrayBuffer.isView(t) || M(t, ArrayBuffer)) return t.byteLength;
      if ('string' != typeof t)
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
            typeof t
        );
      var n = t.length,
        r = arguments.length > 2 && !0 === arguments[2];
      if (!r && 0 === n) return 0;
      for (var o = !1; ; )
        switch (e) {
          case 'ascii':
          case 'latin1':
          case 'binary':
            return n;
          case 'utf8':
          case 'utf-8':
            return V(t).length;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return 2 * n;
          case 'hex':
            return n >>> 1;
          case 'base64':
            return j(t).length;
          default:
            if (o) return r ? -1 : V(t).length;
            (e = ('' + e).toLowerCase()), (o = !0);
        }
    }
    function h(t, e, n) {
      var r = !1;
      if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return '';
      if (((void 0 === n || n > this.length) && (n = this.length), n <= 0))
        return '';
      if ((n >>>= 0) <= (e >>>= 0)) return '';
      for (t || (t = 'utf8'); ; )
        switch (t) {
          case 'hex':
            return I(this, e, n);
          case 'utf8':
          case 'utf-8':
            return x(this, e, n);
          case 'ascii':
            return A(this, e, n);
          case 'latin1':
          case 'binary':
            return T(this, e, n);
          case 'base64':
            return C(this, e, n);
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return N(this, e, n);
          default:
            if (r) throw new TypeError('Unknown encoding: ' + t);
            (t = (t + '').toLowerCase()), (r = !0);
        }
    }
    function v(t, e, n) {
      var r = t[e];
      (t[e] = t[n]), (t[n] = r);
    }
    function g(t, e, n, r, o) {
      if (0 === t.length) return -1;
      if (
        ('string' == typeof n
          ? ((r = n), (n = 0))
          : n > 2147483647
          ? (n = 2147483647)
          : n < -2147483648 && (n = -2147483648),
        L((n = +n)) && (n = o ? 0 : t.length - 1),
        n < 0 && (n = t.length + n),
        n >= t.length)
      ) {
        if (o) return -1;
        n = t.length - 1;
      } else if (n < 0) {
        if (!o) return -1;
        n = 0;
      }
      if (('string' == typeof e && (e = a.from(e, r)), a.isBuffer(e)))
        return 0 === e.length ? -1 : y(t, e, n, r, o);
      if ('number' == typeof e)
        return (
          (e &= 255),
          'function' == typeof Uint8Array.prototype.indexOf
            ? o
              ? Uint8Array.prototype.indexOf.call(t, e, n)
              : Uint8Array.prototype.lastIndexOf.call(t, e, n)
            : y(t, [e], n, r, o)
        );
      throw new TypeError('val must be string, number or Buffer');
    }
    function y(t, e, n, r, o) {
      var i,
        a = 1,
        u = t.length,
        s = e.length;
      if (
        void 0 !== r &&
        ('ucs2' === (r = String(r).toLowerCase()) ||
          'ucs-2' === r ||
          'utf16le' === r ||
          'utf-16le' === r)
      ) {
        if (t.length < 2 || e.length < 2) return -1;
        (a = 2), (u /= 2), (s /= 2), (n /= 2);
      }
      function c(t, e) {
        return 1 === a ? t[e] : t.readUInt16BE(e * a);
      }
      if (o) {
        var l = -1;
        for (i = n; i < u; i++)
          if (c(t, i) === c(e, -1 === l ? 0 : i - l)) {
            if ((-1 === l && (l = i), i - l + 1 === s)) return l * a;
          } else -1 !== l && (i -= i - l), (l = -1);
      } else
        for (n + s > u && (n = u - s), i = n; i >= 0; i--) {
          for (var f = !0, d = 0; d < s; d++)
            if (c(t, i + d) !== c(e, d)) {
              f = !1;
              break;
            }
          if (f) return i;
        }
      return -1;
    }
    function m(t, e, n, r) {
      n = Number(n) || 0;
      var o = t.length - n;
      r ? (r = Number(r)) > o && (r = o) : (r = o);
      var i = e.length;
      r > i / 2 && (r = i / 2);
      for (var a = 0; a < r; ++a) {
        var u = parseInt(e.substr(2 * a, 2), 16);
        if (L(u)) return a;
        t[n + a] = u;
      }
      return a;
    }
    function b(t, e, n, r) {
      return D(V(e, t.length - n), t, n, r);
    }
    function w(t, e, n, r) {
      return D(
        (function (t) {
          for (var e = [], n = 0; n < t.length; ++n)
            e.push(255 & t.charCodeAt(n));
          return e;
        })(e),
        t,
        n,
        r
      );
    }
    function _(t, e, n, r) {
      return D(j(e), t, n, r);
    }
    function S(t, e, n, r) {
      return D(
        (function (t, e) {
          for (var n, r, o, i = [], a = 0; a < t.length && !((e -= 2) < 0); ++a)
            (r = (n = t.charCodeAt(a)) >> 8),
              (o = n % 256),
              i.push(o),
              i.push(r);
          return i;
        })(e, t.length - n),
        t,
        n,
        r
      );
    }
    function C(t, n, r) {
      return 0 === n && r === t.length
        ? e.fromByteArray(t)
        : e.fromByteArray(t.slice(n, r));
    }
    function x(t, e, n) {
      n = Math.min(t.length, n);
      for (var r = [], o = e; o < n; ) {
        var i,
          a,
          u,
          s,
          c = t[o],
          l = null,
          f = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
        if (o + f <= n)
          switch (f) {
            case 1:
              c < 128 && (l = c);
              break;
            case 2:
              128 == (192 & (i = t[o + 1])) &&
                (s = ((31 & c) << 6) | (63 & i)) > 127 &&
                (l = s);
              break;
            case 3:
              (i = t[o + 1]),
                (a = t[o + 2]),
                128 == (192 & i) &&
                  128 == (192 & a) &&
                  (s = ((15 & c) << 12) | ((63 & i) << 6) | (63 & a)) > 2047 &&
                  (s < 55296 || s > 57343) &&
                  (l = s);
              break;
            case 4:
              (i = t[o + 1]),
                (a = t[o + 2]),
                (u = t[o + 3]),
                128 == (192 & i) &&
                  128 == (192 & a) &&
                  128 == (192 & u) &&
                  (s =
                    ((15 & c) << 18) |
                    ((63 & i) << 12) |
                    ((63 & a) << 6) |
                    (63 & u)) > 65535 &&
                  s < 1114112 &&
                  (l = s);
          }
        null === l
          ? ((l = 65533), (f = 1))
          : l > 65535 &&
            ((l -= 65536),
            r.push(((l >>> 10) & 1023) | 55296),
            (l = 56320 | (1023 & l))),
          r.push(l),
          (o += f);
      }
      return (function (t) {
        var e = t.length;
        if (e <= E) return String.fromCharCode.apply(String, t);
        var n = '',
          r = 0;
        for (; r < e; )
          n += String.fromCharCode.apply(String, t.slice(r, (r += E)));
        return n;
      })(r);
    }
    (t.kMaxLength = o),
      (a.TYPED_ARRAY_SUPPORT = (function () {
        try {
          var t = new Uint8Array(1),
            e = {
              foo: function () {
                return 42;
              },
            };
          return (
            Object.setPrototypeOf(e, Uint8Array.prototype),
            Object.setPrototypeOf(t, e),
            42 === t.foo()
          );
        } catch (n) {
          return !1;
        }
      })()),
      a.TYPED_ARRAY_SUPPORT ||
        'undefined' == typeof console ||
        'function' != typeof console.error ||
        console.error(
          'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
        ),
      Object.defineProperty(a.prototype, 'parent', {
        enumerable: !0,
        get: function () {
          if (a.isBuffer(this)) return this.buffer;
        },
      }),
      Object.defineProperty(a.prototype, 'offset', {
        enumerable: !0,
        get: function () {
          if (a.isBuffer(this)) return this.byteOffset;
        },
      }),
      (a.poolSize = 8192),
      (a.from = function (t, e, n) {
        return u(t, e, n);
      }),
      Object.setPrototypeOf(a.prototype, Uint8Array.prototype),
      Object.setPrototypeOf(a, Uint8Array),
      (a.alloc = function (t, e, n) {
        return (function (t, e, n) {
          return (
            s(t),
            t <= 0
              ? i(t)
              : void 0 !== e
              ? 'string' == typeof n
                ? i(t).fill(e, n)
                : i(t).fill(e)
              : i(t)
          );
        })(t, e, n);
      }),
      (a.allocUnsafe = function (t) {
        return c(t);
      }),
      (a.allocUnsafeSlow = function (t) {
        return c(t);
      }),
      (a.isBuffer = function (t) {
        return null != t && !0 === t._isBuffer && t !== a.prototype;
      }),
      (a.compare = function (t, e) {
        if (
          (M(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
          M(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
          !a.isBuffer(t) || !a.isBuffer(e))
        )
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        if (t === e) return 0;
        for (
          var n = t.length, r = e.length, o = 0, i = Math.min(n, r);
          o < i;
          ++o
        )
          if (t[o] !== e[o]) {
            (n = t[o]), (r = e[o]);
            break;
          }
        return n < r ? -1 : r < n ? 1 : 0;
      }),
      (a.isEncoding = function (t) {
        switch (String(t).toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'latin1':
          case 'binary':
          case 'base64':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return !0;
          default:
            return !1;
        }
      }),
      (a.concat = function (t, e) {
        if (!Array.isArray(t))
          throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length) return a.alloc(0);
        var n;
        if (void 0 === e)
          for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
        var r = a.allocUnsafe(e),
          o = 0;
        for (n = 0; n < t.length; ++n) {
          var i = t[n];
          if (M(i, Uint8Array))
            o + i.length > r.length
              ? a.from(i).copy(r, o)
              : Uint8Array.prototype.set.call(r, i, o);
          else {
            if (!a.isBuffer(i))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            i.copy(r, o);
          }
          o += i.length;
        }
        return r;
      }),
      (a.byteLength = p),
      (a.prototype._isBuffer = !0),
      (a.prototype.swap16 = function () {
        var t = this.length;
        if (t % 2 != 0)
          throw new RangeError('Buffer size must be a multiple of 16-bits');
        for (var e = 0; e < t; e += 2) v(this, e, e + 1);
        return this;
      }),
      (a.prototype.swap32 = function () {
        var t = this.length;
        if (t % 4 != 0)
          throw new RangeError('Buffer size must be a multiple of 32-bits');
        for (var e = 0; e < t; e += 4) v(this, e, e + 3), v(this, e + 1, e + 2);
        return this;
      }),
      (a.prototype.swap64 = function () {
        var t = this.length;
        if (t % 8 != 0)
          throw new RangeError('Buffer size must be a multiple of 64-bits');
        for (var e = 0; e < t; e += 8)
          v(this, e, e + 7),
            v(this, e + 1, e + 6),
            v(this, e + 2, e + 5),
            v(this, e + 3, e + 4);
        return this;
      }),
      (a.prototype.toString = function () {
        var t = this.length;
        return 0 === t
          ? ''
          : 0 === arguments.length
          ? x(this, 0, t)
          : h.apply(this, arguments);
      }),
      (a.prototype.toLocaleString = a.prototype.toString),
      (a.prototype.equals = function (t) {
        if (!a.isBuffer(t)) throw new TypeError('Argument must be a Buffer');
        return this === t || 0 === a.compare(this, t);
      }),
      (a.prototype.inspect = function () {
        var e = '',
          n = t.INSPECT_MAX_BYTES;
        return (
          (e = this.toString('hex', 0, n)
            .replace(/(.{2})/g, '$1 ')
            .trim()),
          this.length > n && (e += ' ... '),
          '<Buffer ' + e + '>'
        );
      }),
      r && (a.prototype[r] = a.prototype.inspect),
      (a.prototype.compare = function (t, e, n, r, o) {
        if (
          (M(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
          !a.isBuffer(t))
        )
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
              typeof t
          );
        if (
          (void 0 === e && (e = 0),
          void 0 === n && (n = t ? t.length : 0),
          void 0 === r && (r = 0),
          void 0 === o && (o = this.length),
          e < 0 || n > t.length || r < 0 || o > this.length)
        )
          throw new RangeError('out of range index');
        if (r >= o && e >= n) return 0;
        if (r >= o) return -1;
        if (e >= n) return 1;
        if (this === t) return 0;
        for (
          var i = (o >>>= 0) - (r >>>= 0),
            u = (n >>>= 0) - (e >>>= 0),
            s = Math.min(i, u),
            c = this.slice(r, o),
            l = t.slice(e, n),
            f = 0;
          f < s;
          ++f
        )
          if (c[f] !== l[f]) {
            (i = c[f]), (u = l[f]);
            break;
          }
        return i < u ? -1 : u < i ? 1 : 0;
      }),
      (a.prototype.includes = function (t, e, n) {
        return -1 !== this.indexOf(t, e, n);
      }),
      (a.prototype.indexOf = function (t, e, n) {
        return g(this, t, e, n, !0);
      }),
      (a.prototype.lastIndexOf = function (t, e, n) {
        return g(this, t, e, n, !1);
      }),
      (a.prototype.write = function (t, e, n, r) {
        if (void 0 === e) (r = 'utf8'), (n = this.length), (e = 0);
        else if (void 0 === n && 'string' == typeof e)
          (r = e), (n = this.length), (e = 0);
        else {
          if (!isFinite(e))
            throw new Error(
              'Buffer.write(string, encoding, offset[, length]) is no longer supported'
            );
          (e >>>= 0),
            isFinite(n)
              ? ((n >>>= 0), void 0 === r && (r = 'utf8'))
              : ((r = n), (n = void 0));
        }
        var o = this.length - e;
        if (
          ((void 0 === n || n > o) && (n = o),
          (t.length > 0 && (n < 0 || e < 0)) || e > this.length)
        )
          throw new RangeError('Attempt to write outside buffer bounds');
        r || (r = 'utf8');
        for (var i = !1; ; )
          switch (r) {
            case 'hex':
              return m(this, t, e, n);
            case 'utf8':
            case 'utf-8':
              return b(this, t, e, n);
            case 'ascii':
            case 'latin1':
            case 'binary':
              return w(this, t, e, n);
            case 'base64':
              return _(this, t, e, n);
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return S(this, t, e, n);
            default:
              if (i) throw new TypeError('Unknown encoding: ' + r);
              (r = ('' + r).toLowerCase()), (i = !0);
          }
      }),
      (a.prototype.toJSON = function () {
        return {
          type: 'Buffer',
          data: Array.prototype.slice.call(this._arr || this, 0),
        };
      });
    var E = 4096;
    function A(t, e, n) {
      var r = '';
      n = Math.min(t.length, n);
      for (var o = e; o < n; ++o) r += String.fromCharCode(127 & t[o]);
      return r;
    }
    function T(t, e, n) {
      var r = '';
      n = Math.min(t.length, n);
      for (var o = e; o < n; ++o) r += String.fromCharCode(t[o]);
      return r;
    }
    function I(t, e, n) {
      var r = t.length;
      (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
      for (var o = '', i = e; i < n; ++i) o += F[t[i]];
      return o;
    }
    function N(t, e, n) {
      for (var r = t.slice(e, n), o = '', i = 0; i < r.length - 1; i += 2)
        o += String.fromCharCode(r[i] + 256 * r[i + 1]);
      return o;
    }
    function B(t, e, n) {
      if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint');
      if (t + e > n)
        throw new RangeError('Trying to access beyond buffer length');
    }
    function k(t, e, n, r, o, i) {
      if (!a.isBuffer(t))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (e > o || e < i)
        throw new RangeError('"value" argument is out of bounds');
      if (n + r > t.length) throw new RangeError('Index out of range');
    }
    function P(t, e, n, r, o, i) {
      if (n + r > t.length) throw new RangeError('Index out of range');
      if (n < 0) throw new RangeError('Index out of range');
    }
    function O(t, e, r, o, i) {
      return (
        (e = +e),
        (r >>>= 0),
        i || P(t, 0, r, 4),
        n.write(t, e, r, o, 23, 4),
        r + 4
      );
    }
    function R(t, e, r, o, i) {
      return (
        (e = +e),
        (r >>>= 0),
        i || P(t, 0, r, 8),
        n.write(t, e, r, o, 52, 8),
        r + 8
      );
    }
    (a.prototype.slice = function (t, e) {
      var n = this.length;
      (t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
        (e = void 0 === e ? n : ~~e) < 0
          ? (e += n) < 0 && (e = 0)
          : e > n && (e = n),
        e < t && (e = t);
      var r = this.subarray(t, e);
      return Object.setPrototypeOf(r, a.prototype), r;
    }),
      (a.prototype.readUintLE = a.prototype.readUIntLE =
        function (t, e, n) {
          (t >>>= 0), (e >>>= 0), n || B(t, e, this.length);
          for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256); )
            r += this[t + i] * o;
          return r;
        }),
      (a.prototype.readUintBE = a.prototype.readUIntBE =
        function (t, e, n) {
          (t >>>= 0), (e >>>= 0), n || B(t, e, this.length);
          for (var r = this[t + --e], o = 1; e > 0 && (o *= 256); )
            r += this[t + --e] * o;
          return r;
        }),
      (a.prototype.readUint8 = a.prototype.readUInt8 =
        function (t, e) {
          return (t >>>= 0), e || B(t, 1, this.length), this[t];
        }),
      (a.prototype.readUint16LE = a.prototype.readUInt16LE =
        function (t, e) {
          return (
            (t >>>= 0), e || B(t, 2, this.length), this[t] | (this[t + 1] << 8)
          );
        }),
      (a.prototype.readUint16BE = a.prototype.readUInt16BE =
        function (t, e) {
          return (
            (t >>>= 0), e || B(t, 2, this.length), (this[t] << 8) | this[t + 1]
          );
        }),
      (a.prototype.readUint32LE = a.prototype.readUInt32LE =
        function (t, e) {
          return (
            (t >>>= 0),
            e || B(t, 4, this.length),
            (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
              16777216 * this[t + 3]
          );
        }),
      (a.prototype.readUint32BE = a.prototype.readUInt32BE =
        function (t, e) {
          return (
            (t >>>= 0),
            e || B(t, 4, this.length),
            16777216 * this[t] +
              ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
          );
        }),
      (a.prototype.readIntLE = function (t, e, n) {
        (t >>>= 0), (e >>>= 0), n || B(t, e, this.length);
        for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256); )
          r += this[t + i] * o;
        return r >= (o *= 128) && (r -= Math.pow(2, 8 * e)), r;
      }),
      (a.prototype.readIntBE = function (t, e, n) {
        (t >>>= 0), (e >>>= 0), n || B(t, e, this.length);
        for (var r = e, o = 1, i = this[t + --r]; r > 0 && (o *= 256); )
          i += this[t + --r] * o;
        return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i;
      }),
      (a.prototype.readInt8 = function (t, e) {
        return (
          (t >>>= 0),
          e || B(t, 1, this.length),
          128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        );
      }),
      (a.prototype.readInt16LE = function (t, e) {
        (t >>>= 0), e || B(t, 2, this.length);
        var n = this[t] | (this[t + 1] << 8);
        return 32768 & n ? 4294901760 | n : n;
      }),
      (a.prototype.readInt16BE = function (t, e) {
        (t >>>= 0), e || B(t, 2, this.length);
        var n = this[t + 1] | (this[t] << 8);
        return 32768 & n ? 4294901760 | n : n;
      }),
      (a.prototype.readInt32LE = function (t, e) {
        return (
          (t >>>= 0),
          e || B(t, 4, this.length),
          this[t] |
            (this[t + 1] << 8) |
            (this[t + 2] << 16) |
            (this[t + 3] << 24)
        );
      }),
      (a.prototype.readInt32BE = function (t, e) {
        return (
          (t >>>= 0),
          e || B(t, 4, this.length),
          (this[t] << 24) |
            (this[t + 1] << 16) |
            (this[t + 2] << 8) |
            this[t + 3]
        );
      }),
      (a.prototype.readFloatLE = function (t, e) {
        return (
          (t >>>= 0), e || B(t, 4, this.length), n.read(this, t, !0, 23, 4)
        );
      }),
      (a.prototype.readFloatBE = function (t, e) {
        return (
          (t >>>= 0), e || B(t, 4, this.length), n.read(this, t, !1, 23, 4)
        );
      }),
      (a.prototype.readDoubleLE = function (t, e) {
        return (
          (t >>>= 0), e || B(t, 8, this.length), n.read(this, t, !0, 52, 8)
        );
      }),
      (a.prototype.readDoubleBE = function (t, e) {
        return (
          (t >>>= 0), e || B(t, 8, this.length), n.read(this, t, !1, 52, 8)
        );
      }),
      (a.prototype.writeUintLE = a.prototype.writeUIntLE =
        function (t, e, n, r) {
          ((t = +t), (e >>>= 0), (n >>>= 0), r) ||
            k(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
          var o = 1,
            i = 0;
          for (this[e] = 255 & t; ++i < n && (o *= 256); )
            this[e + i] = (t / o) & 255;
          return e + n;
        }),
      (a.prototype.writeUintBE = a.prototype.writeUIntBE =
        function (t, e, n, r) {
          ((t = +t), (e >>>= 0), (n >>>= 0), r) ||
            k(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
          var o = n - 1,
            i = 1;
          for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); )
            this[e + o] = (t / i) & 255;
          return e + n;
        }),
      (a.prototype.writeUint8 = a.prototype.writeUInt8 =
        function (t, e, n) {
          return (
            (t = +t),
            (e >>>= 0),
            n || k(this, t, e, 1, 255, 0),
            (this[e] = 255 & t),
            e + 1
          );
        }),
      (a.prototype.writeUint16LE = a.prototype.writeUInt16LE =
        function (t, e, n) {
          return (
            (t = +t),
            (e >>>= 0),
            n || k(this, t, e, 2, 65535, 0),
            (this[e] = 255 & t),
            (this[e + 1] = t >>> 8),
            e + 2
          );
        }),
      (a.prototype.writeUint16BE = a.prototype.writeUInt16BE =
        function (t, e, n) {
          return (
            (t = +t),
            (e >>>= 0),
            n || k(this, t, e, 2, 65535, 0),
            (this[e] = t >>> 8),
            (this[e + 1] = 255 & t),
            e + 2
          );
        }),
      (a.prototype.writeUint32LE = a.prototype.writeUInt32LE =
        function (t, e, n) {
          return (
            (t = +t),
            (e >>>= 0),
            n || k(this, t, e, 4, 4294967295, 0),
            (this[e + 3] = t >>> 24),
            (this[e + 2] = t >>> 16),
            (this[e + 1] = t >>> 8),
            (this[e] = 255 & t),
            e + 4
          );
        }),
      (a.prototype.writeUint32BE = a.prototype.writeUInt32BE =
        function (t, e, n) {
          return (
            (t = +t),
            (e >>>= 0),
            n || k(this, t, e, 4, 4294967295, 0),
            (this[e] = t >>> 24),
            (this[e + 1] = t >>> 16),
            (this[e + 2] = t >>> 8),
            (this[e + 3] = 255 & t),
            e + 4
          );
        }),
      (a.prototype.writeIntLE = function (t, e, n, r) {
        if (((t = +t), (e >>>= 0), !r)) {
          var o = Math.pow(2, 8 * n - 1);
          k(this, t, e, n, o - 1, -o);
        }
        var i = 0,
          a = 1,
          u = 0;
        for (this[e] = 255 & t; ++i < n && (a *= 256); )
          t < 0 && 0 === u && 0 !== this[e + i - 1] && (u = 1),
            (this[e + i] = (((t / a) >> 0) - u) & 255);
        return e + n;
      }),
      (a.prototype.writeIntBE = function (t, e, n, r) {
        if (((t = +t), (e >>>= 0), !r)) {
          var o = Math.pow(2, 8 * n - 1);
          k(this, t, e, n, o - 1, -o);
        }
        var i = n - 1,
          a = 1,
          u = 0;
        for (this[e + i] = 255 & t; --i >= 0 && (a *= 256); )
          t < 0 && 0 === u && 0 !== this[e + i + 1] && (u = 1),
            (this[e + i] = (((t / a) >> 0) - u) & 255);
        return e + n;
      }),
      (a.prototype.writeInt8 = function (t, e, n) {
        return (
          (t = +t),
          (e >>>= 0),
          n || k(this, t, e, 1, 127, -128),
          t < 0 && (t = 255 + t + 1),
          (this[e] = 255 & t),
          e + 1
        );
      }),
      (a.prototype.writeInt16LE = function (t, e, n) {
        return (
          (t = +t),
          (e >>>= 0),
          n || k(this, t, e, 2, 32767, -32768),
          (this[e] = 255 & t),
          (this[e + 1] = t >>> 8),
          e + 2
        );
      }),
      (a.prototype.writeInt16BE = function (t, e, n) {
        return (
          (t = +t),
          (e >>>= 0),
          n || k(this, t, e, 2, 32767, -32768),
          (this[e] = t >>> 8),
          (this[e + 1] = 255 & t),
          e + 2
        );
      }),
      (a.prototype.writeInt32LE = function (t, e, n) {
        return (
          (t = +t),
          (e >>>= 0),
          n || k(this, t, e, 4, 2147483647, -2147483648),
          (this[e] = 255 & t),
          (this[e + 1] = t >>> 8),
          (this[e + 2] = t >>> 16),
          (this[e + 3] = t >>> 24),
          e + 4
        );
      }),
      (a.prototype.writeInt32BE = function (t, e, n) {
        return (
          (t = +t),
          (e >>>= 0),
          n || k(this, t, e, 4, 2147483647, -2147483648),
          t < 0 && (t = 4294967295 + t + 1),
          (this[e] = t >>> 24),
          (this[e + 1] = t >>> 16),
          (this[e + 2] = t >>> 8),
          (this[e + 3] = 255 & t),
          e + 4
        );
      }),
      (a.prototype.writeFloatLE = function (t, e, n) {
        return O(this, t, e, !0, n);
      }),
      (a.prototype.writeFloatBE = function (t, e, n) {
        return O(this, t, e, !1, n);
      }),
      (a.prototype.writeDoubleLE = function (t, e, n) {
        return R(this, t, e, !0, n);
      }),
      (a.prototype.writeDoubleBE = function (t, e, n) {
        return R(this, t, e, !1, n);
      }),
      (a.prototype.copy = function (t, e, n, r) {
        if (!a.isBuffer(t)) throw new TypeError('argument should be a Buffer');
        if (
          (n || (n = 0),
          r || 0 === r || (r = this.length),
          e >= t.length && (e = t.length),
          e || (e = 0),
          r > 0 && r < n && (r = n),
          r === n)
        )
          return 0;
        if (0 === t.length || 0 === this.length) return 0;
        if (e < 0) throw new RangeError('targetStart out of bounds');
        if (n < 0 || n >= this.length)
          throw new RangeError('Index out of range');
        if (r < 0) throw new RangeError('sourceEnd out of bounds');
        r > this.length && (r = this.length),
          t.length - e < r - n && (r = t.length - e + n);
        var o = r - n;
        return (
          this === t && 'function' == typeof Uint8Array.prototype.copyWithin
            ? this.copyWithin(e, n, r)
            : Uint8Array.prototype.set.call(t, this.subarray(n, r), e),
          o
        );
      }),
      (a.prototype.fill = function (t, e, n, r) {
        if ('string' == typeof t) {
          if (
            ('string' == typeof e
              ? ((r = e), (e = 0), (n = this.length))
              : 'string' == typeof n && ((r = n), (n = this.length)),
            void 0 !== r && 'string' != typeof r)
          )
            throw new TypeError('encoding must be a string');
          if ('string' == typeof r && !a.isEncoding(r))
            throw new TypeError('Unknown encoding: ' + r);
          if (1 === t.length) {
            var o = t.charCodeAt(0);
            (('utf8' === r && o < 128) || 'latin1' === r) && (t = o);
          }
        } else
          'number' == typeof t
            ? (t &= 255)
            : 'boolean' == typeof t && (t = Number(t));
        if (e < 0 || this.length < e || this.length < n)
          throw new RangeError('Out of range index');
        if (n <= e) return this;
        var i;
        if (
          ((e >>>= 0),
          (n = void 0 === n ? this.length : n >>> 0),
          t || (t = 0),
          'number' == typeof t)
        )
          for (i = e; i < n; ++i) this[i] = t;
        else {
          var u = a.isBuffer(t) ? t : a.from(t, r),
            s = u.length;
          if (0 === s)
            throw new TypeError(
              'The value "' + t + '" is invalid for argument "value"'
            );
          for (i = 0; i < n - e; ++i) this[i + e] = u[i % s];
        }
        return this;
      });
    var U = /[^+/0-9A-Za-z-_]/g;
    function V(t, e) {
      var n;
      e = e || 1 / 0;
      for (var r = t.length, o = null, i = [], a = 0; a < r; ++a) {
        if ((n = t.charCodeAt(a)) > 55295 && n < 57344) {
          if (!o) {
            if (n > 56319) {
              (e -= 3) > -1 && i.push(239, 191, 189);
              continue;
            }
            if (a + 1 === r) {
              (e -= 3) > -1 && i.push(239, 191, 189);
              continue;
            }
            o = n;
            continue;
          }
          if (n < 56320) {
            (e -= 3) > -1 && i.push(239, 191, 189), (o = n);
            continue;
          }
          n = 65536 + (((o - 55296) << 10) | (n - 56320));
        } else o && (e -= 3) > -1 && i.push(239, 191, 189);
        if (((o = null), n < 128)) {
          if ((e -= 1) < 0) break;
          i.push(n);
        } else if (n < 2048) {
          if ((e -= 2) < 0) break;
          i.push((n >> 6) | 192, (63 & n) | 128);
        } else if (n < 65536) {
          if ((e -= 3) < 0) break;
          i.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
        } else {
          if (!(n < 1114112)) throw new Error('Invalid code point');
          if ((e -= 4) < 0) break;
          i.push(
            (n >> 18) | 240,
            ((n >> 12) & 63) | 128,
            ((n >> 6) & 63) | 128,
            (63 & n) | 128
          );
        }
      }
      return i;
    }
    function j(t) {
      return e.toByteArray(
        (function (t) {
          if ((t = (t = t.split('=')[0]).trim().replace(U, '')).length < 2)
            return '';
          for (; t.length % 4 != 0; ) t += '=';
          return t;
        })(t)
      );
    }
    function D(t, e, n, r) {
      for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o)
        e[o + n] = t[o];
      return o;
    }
    function M(t, e) {
      return (
        t instanceof e ||
        (null != t &&
          null != t.constructor &&
          null != t.constructor.name &&
          t.constructor.name === e.name)
      );
    }
    function L(t) {
      return t != t;
    }
    var F = (function () {
      for (var t = '0123456789abcdef', e = new Array(256), n = 0; n < 16; ++n)
        for (var r = 16 * n, o = 0; o < 16; ++o) e[r + o] = t[n] + t[o];
      return e;
    })();
  })(Xs);
  var lc = bs,
    fc = Gs,
    dc = Xs.Buffer;
  function pc(t) {
    (this.genPoly = void 0),
      (this.degree = t),
      this.degree && this.initialize(this.degree);
  }
  (pc.prototype.initialize = function (t) {
    (this.degree = t), (this.genPoly = fc.generateECPolynomial(this.degree));
  }),
    (pc.prototype.encode = function (t) {
      if (!this.genPoly) throw new Error('Encoder not initialized');
      var e = lc.alloc(this.degree),
        n = dc.concat([t, e], t.length + this.degree),
        r = fc.mod(n, this.genPoly),
        o = this.degree - r.length;
      if (o > 0) {
        var i = lc.alloc(this.degree);
        return r.copy(i, o), i;
      }
      return r;
    });
  var hc = pc,
    vc = {},
    gc = {},
    yc = {
      isValid: function (t) {
        return !isNaN(t) && t >= 1 && t <= 40;
      },
    },
    mc = {},
    bc = '[0-9]+',
    wc =
      '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+',
    _c =
      '(?:(?![A-Z0-9 $%*+\\-./:]|' +
      (wc = wc.replace(/u/g, '\\u')) +
      ')(?:.|[\r\n]))+';
  (mc.KANJI = new RegExp(wc, 'g')),
    (mc.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g')),
    (mc.BYTE = new RegExp(_c, 'g')),
    (mc.NUMERIC = new RegExp(bc, 'g')),
    (mc.ALPHANUMERIC = new RegExp('[A-Z $%*+\\-./:]+', 'g'));
  var Sc = new RegExp('^' + wc + '$'),
    Cc = new RegExp('^[0-9]+$'),
    xc = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');
  (mc.testKanji = function (t) {
    return Sc.test(t);
  }),
    (mc.testNumeric = function (t) {
      return Cc.test(t);
    }),
    (mc.testAlphanumeric = function (t) {
      return xc.test(t);
    }),
    (function (t) {
      var e = yc,
        n = mc;
      (t.NUMERIC = { id: 'Numeric', bit: 1, ccBits: [10, 12, 14] }),
        (t.ALPHANUMERIC = { id: 'Alphanumeric', bit: 2, ccBits: [9, 11, 13] }),
        (t.BYTE = { id: 'Byte', bit: 4, ccBits: [8, 16, 16] }),
        (t.KANJI = { id: 'Kanji', bit: 8, ccBits: [8, 10, 12] }),
        (t.MIXED = { bit: -1 }),
        (t.getCharCountIndicator = function (t, n) {
          if (!t.ccBits) throw new Error('Invalid mode: ' + t);
          if (!e.isValid(n)) throw new Error('Invalid version: ' + n);
          return n >= 1 && n < 10
            ? t.ccBits[0]
            : n < 27
            ? t.ccBits[1]
            : t.ccBits[2];
        }),
        (t.getBestModeForData = function (e) {
          return n.testNumeric(e)
            ? t.NUMERIC
            : n.testAlphanumeric(e)
            ? t.ALPHANUMERIC
            : n.testKanji(e)
            ? t.KANJI
            : t.BYTE;
        }),
        (t.toString = function (t) {
          if (t && t.id) return t.id;
          throw new Error('Invalid mode');
        }),
        (t.isValid = function (t) {
          return t && t.bit && t.ccBits;
        }),
        (t.from = function (e, n) {
          if (t.isValid(e)) return e;
          try {
            return (function (e) {
              if ('string' != typeof e)
                throw new Error('Param is not a string');
              switch (e.toLowerCase()) {
                case 'numeric':
                  return t.NUMERIC;
                case 'alphanumeric':
                  return t.ALPHANUMERIC;
                case 'kanji':
                  return t.KANJI;
                case 'byte':
                  return t.BYTE;
                default:
                  throw new Error('Unknown mode: ' + e);
              }
            })(e);
          } catch (r) {
            return n;
          }
        });
    })(gc),
    (function (t) {
      var e = Ps,
        n = Hs,
        r = Rs,
        o = gc,
        i = yc,
        a = _s,
        u = e.getBCHDigit(7973);
      function s(t, e) {
        return o.getCharCountIndicator(t, e) + 4;
      }
      function c(t, e) {
        var n = 0;
        return (
          t.forEach(function (t) {
            var r = s(t.mode, e);
            n += r + t.getBitsLength();
          }),
          n
        );
      }
      (t.from = function (t, e) {
        return i.isValid(t) ? parseInt(t, 10) : e;
      }),
        (t.getCapacity = function (t, r, a) {
          if (!i.isValid(t)) throw new Error('Invalid QR Code version');
          void 0 === a && (a = o.BYTE);
          var u =
            8 * (e.getSymbolTotalCodewords(t) - n.getTotalCodewordsCount(t, r));
          if (a === o.MIXED) return u;
          var c = u - s(a, t);
          switch (a) {
            case o.NUMERIC:
              return Math.floor((c / 10) * 3);
            case o.ALPHANUMERIC:
              return Math.floor((c / 11) * 2);
            case o.KANJI:
              return Math.floor(c / 13);
            case o.BYTE:
            default:
              return Math.floor(c / 8);
          }
        }),
        (t.getBestVersionForData = function (e, n) {
          var i,
            u = r.from(n, r.M);
          if (a(e)) {
            if (e.length > 1)
              return (function (e, n) {
                for (var r = 1; r <= 40; r++)
                  if (c(e, r) <= t.getCapacity(r, n, o.MIXED)) return r;
              })(e, u);
            if (0 === e.length) return 1;
            i = e[0];
          } else i = e;
          return (function (e, n, r) {
            for (var o = 1; o <= 40; o++)
              if (n <= t.getCapacity(o, r, e)) return o;
          })(i.mode, i.getLength(), u);
        }),
        (t.getEncodedBits = function (t) {
          if (!i.isValid(t) || t < 7)
            throw new Error('Invalid QR Code version');
          for (var n = t << 12; e.getBCHDigit(n) - u >= 0; )
            n ^= 7973 << (e.getBCHDigit(n) - u);
          return (t << 12) | n;
        });
    })(vc);
  var Ec = {},
    Ac = Ps,
    Tc = Ac.getBCHDigit(1335);
  Ec.getEncodedBits = function (t, e) {
    for (var n = (t.bit << 3) | e, r = n << 10; Ac.getBCHDigit(r) - Tc >= 0; )
      r ^= 1335 << (Ac.getBCHDigit(r) - Tc);
    return 21522 ^ ((n << 10) | r);
  };
  var Ic = {},
    Nc = gc;
  function Bc(t) {
    (this.mode = Nc.NUMERIC), (this.data = t.toString());
  }
  (Bc.getBitsLength = function (t) {
    return 10 * Math.floor(t / 3) + (t % 3 ? (t % 3) * 3 + 1 : 0);
  }),
    (Bc.prototype.getLength = function () {
      return this.data.length;
    }),
    (Bc.prototype.getBitsLength = function () {
      return Bc.getBitsLength(this.data.length);
    }),
    (Bc.prototype.write = function (t) {
      var e, n, r;
      for (e = 0; e + 3 <= this.data.length; e += 3)
        (n = this.data.substr(e, 3)), (r = parseInt(n, 10)), t.put(r, 10);
      var o = this.data.length - e;
      o > 0 &&
        ((n = this.data.substr(e)), (r = parseInt(n, 10)), t.put(r, 3 * o + 1));
    });
  var kc = Bc,
    Pc = gc,
    Oc = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      ' ',
      '$',
      '%',
      '*',
      '+',
      '-',
      '.',
      '/',
      ':',
    ];
  function Rc(t) {
    (this.mode = Pc.ALPHANUMERIC), (this.data = t);
  }
  (Rc.getBitsLength = function (t) {
    return 11 * Math.floor(t / 2) + (t % 2) * 6;
  }),
    (Rc.prototype.getLength = function () {
      return this.data.length;
    }),
    (Rc.prototype.getBitsLength = function () {
      return Rc.getBitsLength(this.data.length);
    }),
    (Rc.prototype.write = function (t) {
      var e;
      for (e = 0; e + 2 <= this.data.length; e += 2) {
        var n = 45 * Oc.indexOf(this.data[e]);
        (n += Oc.indexOf(this.data[e + 1])), t.put(n, 11);
      }
      this.data.length % 2 && t.put(Oc.indexOf(this.data[e]), 6);
    });
  var Uc = Rc,
    Vc = bs,
    jc = gc;
  function Dc(t) {
    (this.mode = jc.BYTE), (this.data = Vc.from(t));
  }
  (Dc.getBitsLength = function (t) {
    return 8 * t;
  }),
    (Dc.prototype.getLength = function () {
      return this.data.length;
    }),
    (Dc.prototype.getBitsLength = function () {
      return Dc.getBitsLength(this.data.length);
    }),
    (Dc.prototype.write = function (t) {
      for (var e = 0, n = this.data.length; e < n; e++) t.put(this.data[e], 8);
    });
  var Mc = Dc,
    Lc = gc,
    Fc = Ps;
  function $c(t) {
    (this.mode = Lc.KANJI), (this.data = t);
  }
  ($c.getBitsLength = function (t) {
    return 13 * t;
  }),
    ($c.prototype.getLength = function () {
      return this.data.length;
    }),
    ($c.prototype.getBitsLength = function () {
      return $c.getBitsLength(this.data.length);
    }),
    ($c.prototype.write = function (t) {
      var e;
      for (e = 0; e < this.data.length; e++) {
        var n = Fc.toSJIS(this.data[e]);
        if (n >= 33088 && n <= 40956) n -= 33088;
        else {
          if (!(n >= 57408 && n <= 60351))
            throw new Error(
              'Invalid SJIS character: ' +
                this.data[e] +
                '\nMake sure your charset is UTF-8'
            );
          n -= 49472;
        }
        (n = 192 * ((n >>> 8) & 255) + (255 & n)), t.put(n, 13);
      }
    });
  var zc = $c,
    Hc = { exports: {} };
  !(function (t) {
    var e = {
      single_source_shortest_paths: function (t, n, r) {
        var o = {},
          i = {};
        i[n] = 0;
        var a,
          u,
          s,
          c,
          l,
          f,
          d,
          p = e.PriorityQueue.make();
        for (p.push(n, 0); !p.empty(); )
          for (s in ((u = (a = p.pop()).value), (c = a.cost), (l = t[u] || {})))
            l.hasOwnProperty(s) &&
              ((f = c + l[s]),
              (d = i[s]),
              (void 0 === i[s] || d > f) &&
                ((i[s] = f), p.push(s, f), (o[s] = u)));
        if (void 0 !== r && void 0 === i[r]) {
          var h = ['Could not find a path from ', n, ' to ', r, '.'].join('');
          throw new Error(h);
        }
        return o;
      },
      extract_shortest_path_from_predecessor_list: function (t, e) {
        for (var n = [], r = e; r; ) n.push(r), (r = t[r]);
        return n.reverse(), n;
      },
      find_path: function (t, n, r) {
        var o = e.single_source_shortest_paths(t, n, r);
        return e.extract_shortest_path_from_predecessor_list(o, r);
      },
      PriorityQueue: {
        make: function (t) {
          var n,
            r = e.PriorityQueue,
            o = {};
          for (n in ((t = t || {}), r)) r.hasOwnProperty(n) && (o[n] = r[n]);
          return (o.queue = []), (o.sorter = t.sorter || r.default_sorter), o;
        },
        default_sorter: function (t, e) {
          return t.cost - e.cost;
        },
        push: function (t, e) {
          var n = { value: t, cost: e };
          this.queue.push(n), this.queue.sort(this.sorter);
        },
        pop: function () {
          return this.queue.shift();
        },
        empty: function () {
          return 0 === this.queue.length;
        },
      },
    };
    t.exports = e;
  })(Hc),
    (function (t) {
      var e = gc,
        n = kc,
        r = Uc,
        o = Mc,
        i = zc,
        a = mc,
        u = Ps,
        s = Hc.exports;
      function c(t) {
        return unescape(encodeURIComponent(t)).length;
      }
      function l(t, e, n) {
        for (var r, o = []; null !== (r = t.exec(n)); )
          o.push({ data: r[0], index: r.index, mode: e, length: r[0].length });
        return o;
      }
      function f(t) {
        var n,
          r,
          o = l(a.NUMERIC, e.NUMERIC, t),
          i = l(a.ALPHANUMERIC, e.ALPHANUMERIC, t);
        return (
          u.isKanjiModeEnabled()
            ? ((n = l(a.BYTE, e.BYTE, t)), (r = l(a.KANJI, e.KANJI, t)))
            : ((n = l(a.BYTE_KANJI, e.BYTE, t)), (r = [])),
          o
            .concat(i, n, r)
            .sort(function (t, e) {
              return t.index - e.index;
            })
            .map(function (t) {
              return { data: t.data, mode: t.mode, length: t.length };
            })
        );
      }
      function d(t, a) {
        switch (a) {
          case e.NUMERIC:
            return n.getBitsLength(t);
          case e.ALPHANUMERIC:
            return r.getBitsLength(t);
          case e.KANJI:
            return i.getBitsLength(t);
          case e.BYTE:
            return o.getBitsLength(t);
        }
      }
      function p(t, a) {
        var s,
          c = e.getBestModeForData(t);
        if ((s = e.from(a, c)) !== e.BYTE && s.bit < c.bit)
          throw new Error(
            '"' +
              t +
              '" cannot be encoded with mode ' +
              e.toString(s) +
              '.\n Suggested mode is: ' +
              e.toString(c)
          );
        switch ((s !== e.KANJI || u.isKanjiModeEnabled() || (s = e.BYTE), s)) {
          case e.NUMERIC:
            return new n(t);
          case e.ALPHANUMERIC:
            return new r(t);
          case e.KANJI:
            return new i(t);
          case e.BYTE:
            return new o(t);
        }
      }
      (t.fromArray = function (t) {
        return t.reduce(function (t, e) {
          return (
            'string' == typeof e
              ? t.push(p(e, null))
              : e.data && t.push(p(e.data, e.mode)),
            t
          );
        }, []);
      }),
        (t.fromString = function (n, r) {
          for (
            var o = (function (t, n) {
                for (
                  var r = {}, o = { start: {} }, i = ['start'], a = 0;
                  a < t.length;
                  a++
                ) {
                  for (var u = t[a], s = [], c = 0; c < u.length; c++) {
                    var l = u[c],
                      f = '' + a + c;
                    s.push(f), (r[f] = { node: l, lastCount: 0 }), (o[f] = {});
                    for (var p = 0; p < i.length; p++) {
                      var h = i[p];
                      r[h] && r[h].node.mode === l.mode
                        ? ((o[h][f] =
                            d(r[h].lastCount + l.length, l.mode) -
                            d(r[h].lastCount, l.mode)),
                          (r[h].lastCount += l.length))
                        : (r[h] && (r[h].lastCount = l.length),
                          (o[h][f] =
                            d(l.length, l.mode) +
                            4 +
                            e.getCharCountIndicator(l.mode, n)));
                    }
                  }
                  i = s;
                }
                for (p = 0; p < i.length; p++) o[i[p]].end = 0;
                return { map: o, table: r };
              })(
                (function (t) {
                  for (var n = [], r = 0; r < t.length; r++) {
                    var o = t[r];
                    switch (o.mode) {
                      case e.NUMERIC:
                        n.push([
                          o,
                          {
                            data: o.data,
                            mode: e.ALPHANUMERIC,
                            length: o.length,
                          },
                          { data: o.data, mode: e.BYTE, length: o.length },
                        ]);
                        break;
                      case e.ALPHANUMERIC:
                        n.push([
                          o,
                          { data: o.data, mode: e.BYTE, length: o.length },
                        ]);
                        break;
                      case e.KANJI:
                        n.push([
                          o,
                          { data: o.data, mode: e.BYTE, length: c(o.data) },
                        ]);
                        break;
                      case e.BYTE:
                        n.push([
                          { data: o.data, mode: e.BYTE, length: c(o.data) },
                        ]);
                    }
                  }
                  return n;
                })(f(n, u.isKanjiModeEnabled())),
                r
              ),
              i = s.find_path(o.map, 'start', 'end'),
              a = [],
              l = 1;
            l < i.length - 1;
            l++
          )
            a.push(o.table[i[l]].node);
          return t.fromArray(
            (function (t) {
              return t.reduce(function (t, e) {
                var n = t.length - 1 >= 0 ? t[t.length - 1] : null;
                return n && n.mode === e.mode
                  ? ((t[t.length - 1].data += e.data), t)
                  : (t.push(e), t);
              }, []);
            })(a)
          );
        }),
        (t.rawSplit = function (e) {
          return t.fromArray(f(e, u.isKanjiModeEnabled()));
        });
    })(Ic);
  var Wc = bs,
    Yc = Ps,
    qc = Rs,
    Gc = Vs,
    Kc = Ms,
    Jc = Ls,
    Qc = Fs,
    Zc = zs,
    Xc = Hs,
    tl = hc,
    el = vc,
    nl = Ec,
    rl = gc,
    ol = Ic,
    il = _s;
  function al(t, e, n) {
    var r,
      o,
      i = t.size,
      a = nl.getEncodedBits(e, n);
    for (r = 0; r < 15; r++)
      (o = 1 == ((a >> r) & 1)),
        r < 6
          ? t.set(r, 8, o, !0)
          : r < 8
          ? t.set(r + 1, 8, o, !0)
          : t.set(i - 15 + r, 8, o, !0),
        r < 8
          ? t.set(8, i - r - 1, o, !0)
          : r < 9
          ? t.set(8, 15 - r - 1 + 1, o, !0)
          : t.set(8, 15 - r - 1, o, !0);
    t.set(i - 8, 8, 1, !0);
  }
  function ul(t, e, n) {
    var r = new Gc();
    n.forEach(function (e) {
      r.put(e.mode.bit, 4),
        r.put(e.getLength(), rl.getCharCountIndicator(e.mode, t)),
        e.write(r);
    });
    var o =
      8 * (Yc.getSymbolTotalCodewords(t) - Xc.getTotalCodewordsCount(t, e));
    for (
      r.getLengthInBits() + 4 <= o && r.put(0, 4);
      r.getLengthInBits() % 8 != 0;

    )
      r.putBit(0);
    for (var i = (o - r.getLengthInBits()) / 8, a = 0; a < i; a++)
      r.put(a % 2 ? 17 : 236, 8);
    return (function (t, e, n) {
      for (
        var r = Yc.getSymbolTotalCodewords(e),
          o = Xc.getTotalCodewordsCount(e, n),
          i = r - o,
          a = Xc.getBlocksCount(e, n),
          u = a - (r % a),
          s = Math.floor(r / a),
          c = Math.floor(i / a),
          l = c + 1,
          f = s - c,
          d = new tl(f),
          p = 0,
          h = new Array(a),
          v = new Array(a),
          g = 0,
          y = Wc.from(t.buffer),
          m = 0;
        m < a;
        m++
      ) {
        var b = m < u ? c : l;
        (h[m] = y.slice(p, p + b)),
          (v[m] = d.encode(h[m])),
          (p += b),
          (g = Math.max(g, b));
      }
      var w,
        _,
        S = Wc.alloc(r),
        C = 0;
      for (w = 0; w < g; w++)
        for (_ = 0; _ < a; _++) w < h[_].length && (S[C++] = h[_][w]);
      for (w = 0; w < f; w++) for (_ = 0; _ < a; _++) S[C++] = v[_][w];
      return S;
    })(r, t, e);
  }
  function sl(t, e, n, r) {
    var o;
    if (il(t)) o = ol.fromArray(t);
    else {
      if ('string' != typeof t) throw new Error('Invalid data');
      var i = e;
      if (!i) {
        var a = ol.rawSplit(t);
        i = el.getBestVersionForData(a, n);
      }
      o = ol.fromString(t, i || 40);
    }
    var u = el.getBestVersionForData(o, n);
    if (!u)
      throw new Error(
        'The amount of data is too big to be stored in a QR Code'
      );
    if (e) {
      if (e < u)
        throw new Error(
          '\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: ' +
            u +
            '.\n'
        );
    } else e = u;
    var s = ul(e, n, o),
      c = Yc.getSymbolSize(e),
      l = new Kc(c);
    return (
      (function (t, e) {
        for (var n = t.size, r = Qc.getPositions(e), o = 0; o < r.length; o++)
          for (var i = r[o][0], a = r[o][1], u = -1; u <= 7; u++)
            if (!(i + u <= -1 || n <= i + u))
              for (var s = -1; s <= 7; s++)
                a + s <= -1 ||
                  n <= a + s ||
                  ((u >= 0 && u <= 6 && (0 === s || 6 === s)) ||
                  (s >= 0 && s <= 6 && (0 === u || 6 === u)) ||
                  (u >= 2 && u <= 4 && s >= 2 && s <= 4)
                    ? t.set(i + u, a + s, !0, !0)
                    : t.set(i + u, a + s, !1, !0));
      })(l, e),
      (function (t) {
        for (var e = t.size, n = 8; n < e - 8; n++) {
          var r = n % 2 == 0;
          t.set(n, 6, r, !0), t.set(6, n, r, !0);
        }
      })(l),
      (function (t, e) {
        for (var n = Jc.getPositions(e), r = 0; r < n.length; r++)
          for (var o = n[r][0], i = n[r][1], a = -2; a <= 2; a++)
            for (var u = -2; u <= 2; u++)
              -2 === a || 2 === a || -2 === u || 2 === u || (0 === a && 0 === u)
                ? t.set(o + a, i + u, !0, !0)
                : t.set(o + a, i + u, !1, !0);
      })(l, e),
      al(l, n, 0),
      e >= 7 &&
        (function (t, e) {
          for (
            var n, r, o, i = t.size, a = el.getEncodedBits(e), u = 0;
            u < 18;
            u++
          )
            (n = Math.floor(u / 3)),
              (r = (u % 3) + i - 8 - 3),
              (o = 1 == ((a >> u) & 1)),
              t.set(n, r, o, !0),
              t.set(r, n, o, !0);
        })(l, e),
      (function (t, e) {
        for (
          var n = t.size, r = -1, o = n - 1, i = 7, a = 0, u = n - 1;
          u > 0;
          u -= 2
        )
          for (6 === u && u--; ; ) {
            for (var s = 0; s < 2; s++)
              if (!t.isReserved(o, u - s)) {
                var c = !1;
                a < e.length && (c = 1 == ((e[a] >>> i) & 1)),
                  t.set(o, u - s, c),
                  -1 == --i && (a++, (i = 7));
              }
            if ((o += r) < 0 || n <= o) {
              (o -= r), (r = -r);
              break;
            }
          }
      })(l, s),
      isNaN(r) && (r = Zc.getBestMask(l, al.bind(null, l, n))),
      Zc.applyMask(r, l),
      al(l, n, r),
      {
        modules: l,
        version: e,
        errorCorrectionLevel: n,
        maskPattern: r,
        segments: o,
      }
    );
  }
  ms.create = function (t, e) {
    if (void 0 === t || '' === t) throw new Error('No input text');
    var n,
      r,
      o = qc.M;
    return (
      void 0 !== e &&
        ((o = qc.from(e.errorCorrectionLevel, qc.M)),
        (n = el.from(e.version)),
        (r = Zc.from(e.maskPattern)),
        e.toSJISFunc && Yc.setToSJISFunction(e.toSJISFunc)),
      sl(t, n, o, r)
    );
  };
  var cl = {},
    ll = {};
  !(function (t) {
    function e(t) {
      if (('number' == typeof t && (t = t.toString()), 'string' != typeof t))
        throw new Error('Color should be defined as hex string');
      var e = t.slice().replace('#', '').split('');
      if (e.length < 3 || 5 === e.length || e.length > 8)
        throw new Error('Invalid hex color: ' + t);
      (3 !== e.length && 4 !== e.length) ||
        (e = Array.prototype.concat.apply(
          [],
          e.map(function (t) {
            return [t, t];
          })
        )),
        6 === e.length && e.push('F', 'F');
      var n = parseInt(e.join(''), 16);
      return {
        r: (n >> 24) & 255,
        g: (n >> 16) & 255,
        b: (n >> 8) & 255,
        a: 255 & n,
        hex: '#' + e.slice(0, 6).join(''),
      };
    }
    (t.getOptions = function (t) {
      t || (t = {}), t.color || (t.color = {});
      var n =
          void 0 === t.margin || null === t.margin || t.margin < 0
            ? 4
            : t.margin,
        r = t.width && t.width >= 21 ? t.width : void 0,
        o = t.scale || 4;
      return {
        width: r,
        scale: r ? 4 : o,
        margin: n,
        color: {
          dark: e(t.color.dark || '#000000ff'),
          light: e(t.color.light || '#ffffffff'),
        },
        type: t.type,
        rendererOpts: t.rendererOpts || {},
      };
    }),
      (t.getScale = function (t, e) {
        return e.width && e.width >= t + 2 * e.margin
          ? e.width / (t + 2 * e.margin)
          : e.scale;
      }),
      (t.getImageWidth = function (e, n) {
        var r = t.getScale(e, n);
        return Math.floor((e + 2 * n.margin) * r);
      }),
      (t.qrToImageData = function (e, n, r) {
        for (
          var o = n.modules.size,
            i = n.modules.data,
            a = t.getScale(o, r),
            u = Math.floor((o + 2 * r.margin) * a),
            s = r.margin * a,
            c = [r.color.light, r.color.dark],
            l = 0;
          l < u;
          l++
        )
          for (var f = 0; f < u; f++) {
            var d = 4 * (l * u + f),
              p = r.color.light;
            if (l >= s && f >= s && l < u - s && f < u - s)
              p =
                c[
                  i[Math.floor((l - s) / a) * o + Math.floor((f - s) / a)]
                    ? 1
                    : 0
                ];
            (e[d++] = p.r), (e[d++] = p.g), (e[d++] = p.b), (e[d] = p.a);
          }
      });
  })(ll),
    (function (t) {
      var e = ll;
      (t.render = function (t, n, r) {
        var o = r,
          i = n;
        void 0 !== o || (n && n.getContext) || ((o = n), (n = void 0)),
          n ||
            (i = (function () {
              try {
                return document.createElement('canvas');
              } catch (t) {
                throw new Error('You need to specify a canvas element');
              }
            })()),
          (o = e.getOptions(o));
        var a = e.getImageWidth(t.modules.size, o),
          u = i.getContext('2d'),
          s = u.createImageData(a, a);
        return (
          e.qrToImageData(s.data, t, o),
          (function (t, e, n) {
            t.clearRect(0, 0, e.width, e.height),
              e.style || (e.style = {}),
              (e.height = n),
              (e.width = n),
              (e.style.height = n + 'px'),
              (e.style.width = n + 'px');
          })(u, i, a),
          u.putImageData(s, 0, 0),
          i
        );
      }),
        (t.renderToDataURL = function (e, n, r) {
          var o = r;
          void 0 !== o || (n && n.getContext) || ((o = n), (n = void 0)),
            o || (o = {});
          var i = t.render(e, n, o),
            a = o.type || 'image/png',
            u = o.rendererOpts || {};
          return i.toDataURL(a, u.quality);
        });
    })(cl);
  var fl = {},
    dl = ll;
  function pl(t, e) {
    var n = t.a / 255,
      r = e + '="' + t.hex + '"';
    return n < 1 ? r + ' ' + e + '-opacity="' + n.toFixed(2).slice(1) + '"' : r;
  }
  function hl(t, e, n) {
    var r = t + e;
    return void 0 !== n && (r += ' ' + n), r;
  }
  fl.render = function (t, e, n) {
    var r = dl.getOptions(e),
      o = t.modules.size,
      i = t.modules.data,
      a = o + 2 * r.margin,
      u = r.color.light.a
        ? '<path ' +
          pl(r.color.light, 'fill') +
          ' d="M0 0h' +
          a +
          'v' +
          a +
          'H0z"/>'
        : '',
      s =
        '<path ' +
        pl(r.color.dark, 'stroke') +
        ' d="' +
        (function (t, e, n) {
          for (var r = '', o = 0, i = !1, a = 0, u = 0; u < t.length; u++) {
            var s = Math.floor(u % e),
              c = Math.floor(u / e);
            s || i || (i = !0),
              t[u]
                ? (a++,
                  (u > 0 && s > 0 && t[u - 1]) ||
                    ((r += i ? hl('M', s + n, 0.5 + c + n) : hl('m', o, 0)),
                    (o = 0),
                    (i = !1)),
                  (s + 1 < e && t[u + 1]) || ((r += hl('h', a)), (a = 0)))
                : o++;
          }
          return r;
        })(i, o, r.margin) +
        '"/>',
      c = 'viewBox="0 0 ' + a + ' ' + a + '"',
      l =
        '<svg xmlns="http://www.w3.org/2000/svg" ' +
        (r.width ? 'width="' + r.width + '" height="' + r.width + '" ' : '') +
        c +
        ' shape-rendering="crispEdges">' +
        u +
        s +
        '</svg>\n';
    return 'function' == typeof n && n(null, l), l;
  };
  var vl = function () {
      return (
        'function' == typeof Promise &&
        Promise.prototype &&
        Promise.prototype.then
      );
    },
    gl = ms,
    yl = cl,
    ml = fl;
  function bl(t, e, n, r, o) {
    var i = [].slice.call(arguments, 1),
      a = i.length,
      u = 'function' == typeof i[a - 1];
    if (!u && !vl()) throw new Error('Callback required as last argument');
    if (!u) {
      if (a < 1) throw new Error('Too few arguments provided');
      return (
        1 === a
          ? ((n = e), (e = r = void 0))
          : 2 !== a || e.getContext || ((r = n), (n = e), (e = void 0)),
        new Promise(function (o, i) {
          try {
            var a = gl.create(n, r);
            o(t(a, e, r));
          } catch (u) {
            i(u);
          }
        })
      );
    }
    if (a < 2) throw new Error('Too few arguments provided');
    2 === a
      ? ((o = n), (n = e), (e = r = void 0))
      : 3 === a &&
        (e.getContext && void 0 === o
          ? ((o = r), (r = void 0))
          : ((o = r), (r = n), (n = e), (e = void 0)));
    try {
      var s = gl.create(n, r);
      o(null, t(s, e, r));
    } catch (c) {
      o(c);
    }
  }
  (ys.create = gl.create),
    (ys.toCanvas = bl.bind(null, yl.render)),
    (ys.toDataURL = bl.bind(null, yl.renderToDataURL)),
    (ys.toString = bl.bind(null, function (t, e, n) {
      return ml.render(t, n);
    }));
  var wl = e.defineComponent({
    components: {
      BaseBox: f,
      BaseHeading: c,
      BaseFieldSet: l,
      BaseForm: s,
      BaseLabel: r,
      BaseSpacer: h,
      BaseButton: p,
      BaseFooter: i,
      BaseText: g,
      BaseInput: y,
      BaseWrapper: u,
    },
    inheritAttrs: !1,
    setup(t, { emit: r, attrs: o }) {
      const { state: i, send: a } = es(),
        u = e.computed(() => Qu(i.value));
      let s = e.reactive({ qrCodeImageSource: null, isLoading: !0 });
      e.onMounted(async () => {
        const t = new n.Logger('SetupTOTP-logger'),
          { user: e } = u.value.context;
        if (e)
          try {
            const t = await n.Auth.setupTOTP(e),
              r = 'AWSCognito',
              o = `otpauth://totp/${r}:${e.username}?secret=${t}&issuer=${r}`;
            s.qrCodeImageSource = await ys.toDataURL(o);
          } catch (r) {
            t.error(r);
          } finally {
            s.isLoading = !1;
          }
      });
      const c = e.computed(() => E),
        l = e.computed(() => A),
        f = e.computed(() => 'Setup TOTP'),
        d = (t) => {
          const e = new FormData(t.target);
          a({
            type: 'SUBMIT',
            data: __spreadValues({}, Object.fromEntries(e)),
          });
        };
      return __spreadProps(__spreadValues({}, e.toRefs(s)), {
        actorState: u,
        onSetupTOTPSubmit: (t) => {
          (null == o ? void 0 : o.onConfirmSetupTOTPSubmit)
            ? r('confirmSetupTOTPSubmit', t)
            : d(t);
        },
        onBackToSignInClicked: () => {
          (null == o ? void 0 : o.onBackToSignInClicked)
            ? r('backToSignInClicked')
            : a({ type: 'SIGN_IN' });
        },
        submit: d,
        backSignInText: c,
        confirmText: l,
        setupTOTPText: f,
      });
    },
  });
  const _l = { key: 0 },
    Sl = ['src'],
    Cl = e.createTextVNode('Code *');
  wl.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('base-heading'),
      s = e.resolveComponent('base-text'),
      c = e.resolveComponent('base-input'),
      l = e.resolveComponent('base-label'),
      f = e.resolveComponent('base-field-set'),
      d = e.resolveComponent('base-button'),
      p = e.resolveComponent('base-spacer'),
      h = e.resolveComponent('base-footer'),
      v = e.resolveComponent('base-box'),
      g = e.resolveComponent('base-form'),
      y = e.resolveComponent('base-wrapper');
    return e.renderSlot(t.$slots, 'confirmSetupTOTPI', {}, () => [
      e.createVNode(
        y,
        { 'data-amplify-wrapper': '' },
        {
          default: e.withCtx(() => [
            e.createVNode(
              g,
              {
                'data-amplify-authenticator-setup-totp': '',
                onSubmit: e.withModifiers(t.onSetupTOTPSubmit, ['prevent']),
              },
              {
                default: e.withCtx(() => [
                  e.createVNode(u, null, {
                    default: e.withCtx(() => [
                      e.createTextVNode(e.toDisplayString(t.setupTOTPText), 1),
                    ]),
                    _: 1,
                  }),
                  e.createVNode(
                    f,
                    { disabled: t.actorState.matches('confirmSignIn.pending') },
                    {
                      default: e.withCtx(() => [
                        e.createVNode(
                          l,
                          { 'data-amplify-confirmationcode': '' },
                          {
                            default: e.withCtx(() => [
                              t.isLoading
                                ? (e.openBlock(),
                                  e.createElementBlock('p', _l, 'Loading...'))
                                : (e.openBlock(),
                                  e.createElementBlock(
                                    e.Fragment,
                                    { key: 1 },
                                    [
                                      e.createElementVNode(
                                        'img',
                                        {
                                          'data-amplify-qrcode': '',
                                          src: t.qrCodeImageSource,
                                          alt: 'qr code',
                                        },
                                        null,
                                        8,
                                        Sl
                                      ),
                                      e.createVNode(s, null, {
                                        default: e.withCtx(() => [Cl]),
                                        _: 1,
                                      }),
                                      e.createVNode(c, {
                                        name: 'confirmation_code',
                                        placeholder: 'Code',
                                        autocomplete: 'one-time-code',
                                        required: '',
                                        type: 'text',
                                      }),
                                    ],
                                    64
                                  )),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ['disabled']
                  ),
                  e.createVNode(h, null, {
                    footert: e.withCtx(({ slotData: n }) => [
                      e.renderSlot(t.$slots, 'footer', {
                        info: n,
                        onBackToSignInClicked: t.onBackToSignInClicked,
                        onSetupTOTPSubmit: t.onSetupTOTPSubmit,
                      }),
                    ]),
                    default: e.withCtx(() => [
                      e.createVNode(
                        d,
                        {
                          type: 'button',
                          onClick: e.withModifiers(t.onBackToSignInClicked, [
                            'prevent',
                          ]),
                        },
                        {
                          default: e.withCtx(() => [
                            e.createTextVNode(
                              e.toDisplayString(t.backSignInText),
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['onClick']
                      ),
                      e.createVNode(p),
                      e.createVNode(
                        d,
                        {
                          disabled: t.actorState.matches(
                            'confirmSignIn.pending'
                          ),
                        },
                        {
                          default: e.withCtx(() => [
                            e.createTextVNode(
                              e.toDisplayString(t.confirmText),
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['disabled']
                      ),
                    ]),
                    _: 3,
                  }),
                  e.createVNode(
                    v,
                    { 'data-ui-error': '' },
                    {
                      default: e.withCtx(() => [
                        e.createTextVNode(
                          e.toDisplayString(t.actorState.context.remoteError),
                          1
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                ]),
                _: 3,
              },
              8,
              ['onSubmit']
            ),
          ]),
          _: 3,
        }
      ),
    ]);
  };
  var xl = e.defineComponent({
    components: {
      BaseInput: y,
      BaseText: g,
      BaseLabel: r,
      BaseForm: s,
      BaseHeading: c,
      BaseFieldSet: l,
      BaseFooter: i,
      BaseButton: p,
      BaseSpacer: h,
      BaseWrapper: u,
      BaseBox: f,
    },
    inheritAttrs: !1,
    setup(t, { emit: n, attrs: r }) {
      const { state: o, send: i } = es(),
        a = e.computed(() => Qu(o.value)),
        u = e.computed(() => 'Change password'),
        s = e.computed(() => 'Changing'),
        c = e.computed(() => _),
        l = e.computed(() => b),
        f = (t) => {
          const e = new FormData(t.target);
          i({
            type: 'SUBMIT',
            data: __spreadValues({}, Object.fromEntries(e)),
          });
        };
      return {
        changePasswordLabel: u,
        submit: f,
        onForceNewPasswordSubmit: (t) => {
          (null == r ? void 0 : r.onForceNewPasswordSubmit)
            ? n('forceNewPasswordSubmit', t)
            : f(t);
        },
        actorState: a,
        onHaveAccountClicked: () => {
          (null == r ? void 0 : r.onHaveAccountClicked)
            ? n('haveAccountClicked')
            : i({ type: 'SIGN_IN' });
        },
        signInButtonText: l,
        haveAccountLabel: c,
        changingPasswordLabel: s,
      };
    },
  });
  xl.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('base-heading'),
      s = e.resolveComponent('base-text'),
      c = e.resolveComponent('base-input'),
      l = e.resolveComponent('base-label'),
      f = e.resolveComponent('base-field-set'),
      d = e.resolveComponent('base-box'),
      p = e.resolveComponent('base-button'),
      h = e.resolveComponent('base-spacer'),
      v = e.resolveComponent('base-footer'),
      g = e.resolveComponent('base-form'),
      y = e.resolveComponent('base-wrapper');
    return e.renderSlot(t.$slots, 'forceNewPasswordI', {}, () => [
      e.createVNode(
        y,
        { 'data-amplify-wrapper': '' },
        {
          default: e.withCtx(() => [
            e.createVNode(
              g,
              {
                'data-amplify-authenticator-forcenewpassword': '',
                onSubmit: e.withModifiers(t.onForceNewPasswordSubmit, [
                  'prevent',
                ]),
              },
              {
                default: e.withCtx(() => [
                  e.createVNode(u, null, {
                    default: e.withCtx(() => [
                      e.createTextVNode(
                        e.toDisplayString(t.changePasswordLabel),
                        1
                      ),
                    ]),
                    _: 1,
                  }),
                  e.createVNode(
                    f,
                    {
                      disabled: !t.actorState.matches('forceNewPassword.edit'),
                    },
                    {
                      default: e.withCtx(() => [
                        e.createVNode(
                          l,
                          { 'data-amplify-forcenewpassword-label': '' },
                          {
                            default: e.withCtx(() => [
                              e.createVNode(s, null, {
                                default: e.withCtx(() => [
                                  e.createTextVNode(
                                    e.toDisplayString(t.changePasswordLabel),
                                    1
                                  ),
                                ]),
                                _: 1,
                              }),
                              e.createVNode(c, {
                                autocomplete: 'password',
                                name: 'password',
                                placeholder: 'Password',
                                required: '',
                                type: 'password',
                              }),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ['disabled']
                  ),
                  e.createVNode(
                    d,
                    { 'data-ui-error': '', class: 'forceNewPasswordErrorText' },
                    {
                      default: e.withCtx(() => [
                        e.createTextVNode(
                          e.toDisplayString(t.actorState.context.remoteError),
                          1
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                  e.createVNode(v, null, {
                    footert: e.withCtx(({ slotData: n }) => [
                      e.renderSlot(t.$slots, 'footer', {
                        info: n,
                        onHaveAccountClicked: t.onHaveAccountClicked,
                        onForceNewPasswordSubmit: t.onForceNewPasswordSubmit,
                      }),
                    ]),
                    default: e.withCtx(() => [
                      e.renderSlot(
                        t.$slots,
                        'footer-left',
                        { onHaveAccountClicked: t.onHaveAccountClicked },
                        () => [
                          e.createVNode(s, null, {
                            default: e.withCtx(() => [
                              e.createTextVNode(
                                e.toDisplayString(t.haveAccountLabel),
                                1
                              ),
                            ]),
                            _: 1,
                          }),
                          e.createVNode(
                            p,
                            {
                              type: 'button',
                              onClick: e.withModifiers(t.onHaveAccountClicked, [
                                'prevent',
                              ]),
                            },
                            {
                              default: e.withCtx(() => [
                                e.createTextVNode(
                                  e.toDisplayString(t.signInButtonText),
                                  1
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ['onClick']
                          ),
                        ]
                      ),
                      e.createVNode(h),
                      e.renderSlot(
                        t.$slots,
                        'footer-right',
                        {
                          onForceNewPasswordSubmit: t.onForceNewPasswordSubmit,
                        },
                        () => [
                          e.createVNode(
                            p,
                            { disabled: t.actorState.matches('signUp.submit') },
                            {
                              default: e.withCtx(() => [
                                e.createTextVNode(
                                  e.toDisplayString(
                                    t.actorState.matches(
                                      'forceNewPassword.edit'
                                    )
                                      ? t.changePasswordLabel
                                      : t.changingPasswordLabel + '…'
                                  ),
                                  1
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ['disabled']
                          ),
                        ]
                      ),
                    ]),
                    _: 3,
                  }),
                ]),
                _: 3,
              },
              8,
              ['onSubmit']
            ),
          ]),
          _: 3,
        }
      ),
    ]);
  };
  var El = e.defineComponent({
    components: {
      BaseBox: f,
      BaseHeading: c,
      BaseFieldSet: l,
      BaseForm: s,
      BaseLabel: r,
      BaseSpacer: h,
      BaseButton: p,
      BaseFooter: i,
      BaseText: g,
      BaseInput: y,
      BaseWrapper: u,
    },
    inheritAttrs: !1,
    setup(t, { emit: n, attrs: r }) {
      const { state: o, send: i } = es(),
        a = e.computed(() => Qu(o.value)),
        u = e.computed(() => E),
        s = e.computed(() => 'Reset your Password'),
        c = e.computed(() => 'Send Code'),
        l = (t) => {
          const e = new FormData(t.target);
          i({ type: 'SUBMIT', data: Object.fromEntries(e) });
        };
      return {
        onResetPasswordSubmit: (t) => {
          (null == r ? void 0 : r.onResetPasswordSubmit)
            ? n('resetPasswordSubmit', t)
            : l(t);
        },
        onBackToSignInClicked: () => {
          (null == r ? void 0 : r.onBackToSignInClicked)
            ? n('backToSignInClicked')
            : i({ type: 'SIGN_IN' });
        },
        submit: l,
        resetPasswordText: c,
        resetPasswordHeading: s,
        backSignInText: u,
        actorState: a,
        onChange: (t) => {
          const { name: e, value: n } = t.target;
          i({ type: 'CHANGE', data: { name: e, value: n } });
        },
      };
    },
  });
  const Al = e.createTextVNode('Username');
  El.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('base-heading'),
      s = e.resolveComponent('base-text'),
      c = e.resolveComponent('base-input'),
      l = e.resolveComponent('base-label'),
      f = e.resolveComponent('base-field-set'),
      d = e.resolveComponent('base-button'),
      p = e.resolveComponent('base-spacer'),
      h = e.resolveComponent('base-footer'),
      v = e.resolveComponent('base-box'),
      g = e.resolveComponent('base-form'),
      y = e.resolveComponent('base-wrapper');
    return e.renderSlot(t.$slots, 'resetPasswordSlotI', {}, () => [
      e.createVNode(
        y,
        { 'data-amplify-wrapper': '' },
        {
          default: e.withCtx(() => [
            e.createVNode(
              g,
              {
                'data-amplify-authenticator-resetpassword': '',
                onSubmit: e.withModifiers(t.onResetPasswordSubmit, ['prevent']),
                onChange: t.onChange,
              },
              {
                default: e.withCtx(() => [
                  e.createVNode(u, null, {
                    default: e.withCtx(() => [
                      e.createTextVNode(
                        e.toDisplayString(t.resetPasswordHeading),
                        1
                      ),
                    ]),
                    _: 1,
                  }),
                  e.createVNode(
                    f,
                    { disabled: t.actorState.matches('resetPassword.pending') },
                    {
                      default: e.withCtx(() => [
                        e.createVNode(
                          l,
                          { 'data-amplify-resetpassword-label': '' },
                          {
                            default: e.withCtx(() => [
                              e.createVNode(s, null, {
                                default: e.withCtx(() => [Al]),
                                _: 1,
                              }),
                              e.createVNode(c, {
                                name: 'username',
                                placeholder: 'Enter your username',
                                autocomplete: 'username',
                                required: '',
                                type: 'username',
                              }),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ['disabled']
                  ),
                  e.createVNode(h, null, {
                    footert: e.withCtx(({ slotData: n }) => [
                      e.renderSlot(t.$slots, 'footer', {
                        info: n,
                        onBackToSignInClicked: t.onBackToSignInClicked,
                        onResetPasswordSubmit: t.onResetPasswordSubmit,
                      }),
                    ]),
                    default: e.withCtx(() => [
                      e.createVNode(
                        d,
                        {
                          type: 'button',
                          onClick: e.withModifiers(t.onBackToSignInClicked, [
                            'prevent',
                          ]),
                        },
                        {
                          default: e.withCtx(() => [
                            e.createTextVNode(
                              e.toDisplayString(t.backSignInText),
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['onClick']
                      ),
                      e.createVNode(p),
                      e.createVNode(
                        d,
                        {
                          disabled: t.actorState.matches(
                            'resetPassword.pending'
                          ),
                        },
                        {
                          default: e.withCtx(() => [
                            e.createTextVNode(
                              e.toDisplayString(t.resetPasswordText),
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['disabled']
                      ),
                    ]),
                    _: 3,
                  }),
                  e.createVNode(
                    v,
                    { 'data-ui-error': '' },
                    {
                      default: e.withCtx(() => {
                        var n, r;
                        return [
                          e.createTextVNode(
                            e.toDisplayString(
                              null ==
                                (r =
                                  null == (n = t.actorState)
                                    ? void 0
                                    : n.context)
                                ? void 0
                                : r.remoteError
                            ),
                            1
                          ),
                        ];
                      }),
                      _: 1,
                    }
                  ),
                ]),
                _: 3,
              },
              8,
              ['onSubmit', 'onChange']
            ),
          ]),
          _: 3,
        }
      ),
    ]);
  };
  var Tl = e.defineComponent({
    components: {
      BaseBox: f,
      BaseHeading: c,
      BaseFieldSet: l,
      BaseForm: s,
      BaseLabel: r,
      BaseSpacer: h,
      BaseButton: p,
      BaseFooter: i,
      BaseText: g,
      BaseInput: y,
      BaseWrapper: u,
    },
    inheritAttrs: !1,
    setup(t, { emit: n, attrs: r }) {
      const { state: o, send: i } = es(),
        a = e.computed(() => Qu(o.value)),
        u = e.computed(() => E),
        s = e.computed(() => C),
        c = e.computed(() => x),
        l = e.computed(() => S),
        f = e.computed(() => 'Reset your Password'),
        d = e.computed(() => 'Submit'),
        p = (t) => {
          const e = new FormData(t.target);
          i({
            type: 'SUBMIT',
            data: __spreadValues({}, Object.fromEntries(e)),
          });
        };
      return {
        onConfirmResetPasswordSubmit: (t) => {
          (null == r ? void 0 : r.onConfirmResetPasswordSubmit)
            ? n('confirmResetPasswordSubmit', t)
            : p(t);
        },
        onBackToSignInClicked: () => {
          (null == r ? void 0 : r.onBackToSignInClicked)
            ? n('backToSignInClicked')
            : i({ type: 'SIGN_IN' });
        },
        submit: p,
        onLostYourCodeClicked: () => {
          i({ type: 'RESEND' });
        },
        onChange: (t) => {
          const { name: e, value: n } = t.target;
          i({ type: 'CHANGE', data: { name: e, value: n } });
        },
        backSignInText: u,
        actorState: a,
        lostYourCodeText: s,
        resendCodeText: c,
        confirmationCodeText: l,
        confirmResetPasswordText: d,
        confirmResetPasswordHeading: f,
      };
    },
  });
  const Il = e.createTextVNode('New password');
  Tl.render = function (t, n, r, o, i, a) {
    const u = e.resolveComponent('base-heading'),
      s = e.resolveComponent('base-text'),
      c = e.resolveComponent('base-input'),
      l = e.resolveComponent('base-label'),
      f = e.resolveComponent('base-button'),
      d = e.resolveComponent('base-box'),
      p = e.resolveComponent('base-field-set'),
      h = e.resolveComponent('base-spacer'),
      v = e.resolveComponent('base-footer'),
      g = e.resolveComponent('base-form'),
      y = e.resolveComponent('base-wrapper');
    return e.renderSlot(t.$slots, 'confirmResetPasswordSlotI', {}, () => [
      e.createVNode(
        y,
        { 'data-amplify-wrapper': '' },
        {
          default: e.withCtx(() => [
            e.createVNode(
              g,
              {
                'data-amplify-authenticator-confirmResetpassword': '',
                onSubmit: e.withModifiers(t.onConfirmResetPasswordSubmit, [
                  'prevent',
                ]),
                onChange: t.onChange,
              },
              {
                default: e.withCtx(() => [
                  e.createVNode(u, null, {
                    default: e.withCtx(() => [
                      e.createTextVNode(
                        e.toDisplayString(t.confirmResetPasswordHeading),
                        1
                      ),
                    ]),
                    _: 1,
                  }),
                  e.createVNode(
                    p,
                    {
                      disabled: t.actorState.matches(
                        'confirmResetPassword.pending'
                      ),
                    },
                    {
                      default: e.withCtx(() => [
                        e.createVNode(
                          l,
                          { 'data-amplify-confirmresetpassword-label': '' },
                          {
                            default: e.withCtx(() => [
                              e.createVNode(s, null, {
                                default: e.withCtx(() => [
                                  e.createTextVNode(
                                    e.toDisplayString(t.confirmationCodeText),
                                    1
                                  ),
                                ]),
                                _: 1,
                              }),
                              e.createVNode(c, {
                                name: 'confirmation_code',
                                required: '',
                                type: 'number',
                              }),
                            ]),
                            _: 1,
                          }
                        ),
                        e.createVNode(
                          l,
                          { 'data-amplify-confirmresetpassword-label': '' },
                          {
                            default: e.withCtx(() => [
                              e.createVNode(s, null, {
                                default: e.withCtx(() => [Il]),
                                _: 1,
                              }),
                              e.createVNode(c, {
                                name: 'password',
                                autocomplete: 'password',
                                required: '',
                                type: 'password',
                              }),
                            ]),
                            _: 1,
                          }
                        ),
                        e.createVNode(
                          d,
                          { 'data-amplify-lostcode': '' },
                          {
                            default: e.withCtx(() => [
                              e.renderSlot(
                                t.$slots,
                                'lost-your-code-section',
                                {
                                  onLostYourCodeClicked:
                                    t.onLostYourCodeClicked,
                                },
                                () => [
                                  e.createVNode(s, null, {
                                    default: e.withCtx(() => [
                                      e.createTextVNode(
                                        e.toDisplayString(t.lostYourCodeText),
                                        1
                                      ),
                                    ]),
                                    _: 1,
                                  }),
                                  e.createVNode(
                                    f,
                                    {
                                      type: 'button',
                                      onClick: e.withModifiers(
                                        t.onLostYourCodeClicked,
                                        ['prevent']
                                      ),
                                    },
                                    {
                                      default: e.withCtx(() => [
                                        e.createTextVNode(
                                          e.toDisplayString(t.resendCodeText),
                                          1
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ['onClick']
                                  ),
                                ]
                              ),
                            ]),
                            _: 3,
                          }
                        ),
                      ]),
                      _: 3,
                    },
                    8,
                    ['disabled']
                  ),
                  e.createVNode(v, null, {
                    footert: e.withCtx(({ slotData: n }) => [
                      e.renderSlot(t.$slots, 'footer', {
                        info: n,
                        onBackToSignInClicked: t.onBackToSignInClicked,
                        onConfirmResetPasswordSubmit:
                          t.onConfirmResetPasswordSubmit,
                      }),
                    ]),
                    default: e.withCtx(() => [
                      e.createVNode(
                        f,
                        {
                          type: 'button',
                          onClick: e.withModifiers(t.onBackToSignInClicked, [
                            'prevent',
                          ]),
                        },
                        {
                          default: e.withCtx(() => [
                            e.createTextVNode(
                              e.toDisplayString(t.backSignInText),
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['onClick']
                      ),
                      e.createVNode(h),
                      e.createVNode(
                        f,
                        {
                          disabled: t.actorState.matches(
                            'confirmResetPassword.pending'
                          ),
                        },
                        {
                          default: e.withCtx(() => [
                            e.createTextVNode(
                              e.toDisplayString(t.confirmResetPasswordText),
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ['disabled']
                      ),
                    ]),
                    _: 3,
                  }),
                  e.createVNode(
                    d,
                    { 'data-ui-error': '' },
                    {
                      default: e.withCtx(() => {
                        var n, r;
                        return [
                          e.createTextVNode(
                            e.toDisplayString(
                              null ==
                                (r =
                                  null == (n = t.actorState)
                                    ? void 0
                                    : n.context)
                                ? void 0
                                : r.remoteError
                            ),
                            1
                          ),
                        ];
                      }),
                      _: 1,
                    }
                  ),
                ]),
                _: 3,
              },
              8,
              ['onSubmit', 'onChange']
            ),
          ]),
          _: 3,
        }
      ),
    ]);
  };
  var Nl = e.defineComponent({
    inheritAttrs: !1,
    components: {
      SignIn: us,
      SignUp: fs,
      ConfirmSignUp: hs,
      ConfirmSignIn: vs,
      SetupTotp: wl,
      ForceNewPassword: xl,
      ResetPassword: El,
      ConfirmResetPassword: Tl,
    },
    props: { shouldHideReturnBtn: { default: !0, type: Boolean } },
    setup(t, { attrs: n, emit: r }) {
      const { state: o, send: i } = es(),
        a = e.computed(() => Qu(o.value)),
        u = e.ref(null),
        s = e.ref(null),
        c = e.ref(null),
        l = e.ref(null),
        f = e.ref(null),
        d = e.ref(null),
        p = e.ref(null),
        h = e.ref(null),
        v = e.ref('SIGNIN');
      return (
        e.provide('pageInfo', v),
        {
          currentPage: v,
          state: o,
          actorState: a,
          onSignInSubmitI: (t) => {
            (null == n ? void 0 : n.onSignInSubmit)
              ? r('signInSubmit', t)
              : u.value.submit(t);
          },
          signInComponent: u,
          signUpComponent: s,
          forceNewPasswordComponent: d,
          onSignUpSubmitI: (t) => {
            (null == n ? void 0 : n.onSignUpSubmit)
              ? r('signUpSubmit', t)
              : s.value.submit(t);
          },
          confirmSignUpComponent: c,
          confirmSignInComponent: l,
          confirmSetupTOTPComponent: f,
          resetPasswordComponent: p,
          confirmResetPasswordComponent: h,
          onConfirmSignInSubmitI: (t) => {
            (null == n ? void 0 : n.onConfirmSignInSubmit)
              ? r('confirmSignInSubmit', t)
              : l.value.submit(t);
          },
          onResetPasswordSubmitI: (t) => {
            (null == n ? void 0 : n.onResetPasswordSubmit)
              ? r('resetPasswordSubmit', t)
              : p.value.submit(t);
          },
          onConfirmSignUpSubmitI: (t) => {
            (null == n ? void 0 : n.onConfirmSignUpSubmit)
              ? r('confirmSignUpSubmit', t)
              : c.value.submit(t);
          },
          onConfirmSetupTOTPSubmitI: (t) => {
            (null == n ? void 0 : n.onForceNewPasswordSubmit)
              ? r('mSetupTOTPSubmit', t)
              : f.value.submit(t);
          },
          onForceNewPasswordSubmitI: (t) => {
            (null == n ? void 0 : n.onForceNewPasswordSubmit)
              ? r('forceNewPasswordSubmit', t)
              : d.value.submit(t);
          },
          onConfirmResetPasswordSubmitI: (t) => {
            (null == n ? void 0 : n.onConfirmResetPasswordSubmit)
              ? r('confirmResetPasswordSubmit', t)
              : h.value.submit(t);
          },
          send: i,
        }
      );
    },
  });
  const Bl = { key: 2 };
  Nl.render = function (t, n, r, o, i, a) {
    var u, s, c, l, f, d, p, h, v, g, y, m;
    const b = e.resolveComponent('sign-in'),
      w = e.resolveComponent('sign-up'),
      _ = e.resolveComponent('confirm-sign-up'),
      S = e.resolveComponent('reset-password'),
      C = e.resolveComponent('confirm-reset-password'),
      x = e.resolveComponent('confirm-sign-in'),
      E = e.resolveComponent('setup-totp'),
      A = e.resolveComponent('force-new-password');
    return (
      e.openBlock(),
      e.createElementBlock(
        e.Fragment,
        null,
        [
          e.createElementVNode('div', null, [
            (null == (u = t.actorState) ? void 0 : u.matches('signIn'))
              ? (e.openBlock(),
                e.createBlock(
                  b,
                  {
                    key: 0,
                    onSignInSubmit: t.onSignInSubmitI,
                    ref: 'signInComponent',
                  },
                  {
                    signInSlotI: e.withCtx(() => [
                      e.renderSlot(t.$slots, 'sign-in'),
                    ]),
                    'forgot-password-section': e.withCtx(
                      ({ onForgotPasswordClicked: n }) => [
                        e.renderSlot(
                          t.$slots,
                          'sign-in-forgot-password-section',
                          { onForgotPasswordClicked: n }
                        ),
                      ]
                    ),
                    'sign-in-button': e.withCtx(({ onSignInSubmit: n }) => [
                      e.renderSlot(t.$slots, 'sign-in-button', {
                        onSignInSubmit: n,
                      }),
                    ]),
                    form: e.withCtx(
                      ({
                        info: n,
                        onSignInSubmit: r,
                        onCreateAccountClicked: o,
                        onForgotPasswordClicked: i,
                      }) => [
                        e.renderSlot(t.$slots, 'sign-in-form', {
                          info: n,
                          onSignInSubmit: r,
                          onCreateAccountClicked: o,
                          onForgotPasswordClicked: i,
                        }),
                      ]
                    ),
                    heading: e.withCtx(() => [
                      e.renderSlot(t.$slots, 'sign-in-heading'),
                    ]),
                    footer: e.withCtx(
                      ({
                        info: n,
                        onSignInSubmit: r,
                        onCreateAccountClicked: o,
                      }) => [
                        e.renderSlot(t.$slots, 'sign-in-footer', {
                          info: n,
                          onSignInSubmit: r,
                          onCreateAccountClicked: o,
                        }),
                      ]
                    ),
                    'additional-fields': e.withCtx(
                      ({ onSignInSubmit: n, onCreateAccountClicked: r }) => [
                        e.renderSlot(t.$slots, 'sign-in-additional-fields', {
                          onSignInSubmit: n,
                          onCreateAccountClicked: r,
                        }),
                      ]
                    ),
                    'signin-fields': e.withCtx(({ info: n }) => [
                      e.renderSlot(t.$slots, 'sign-in-fields', { info: n }),
                    ]),
                    _: 3,
                  },
                  8,
                  ['onSignInSubmit']
                ))
              : e.createCommentVNode('', !0),
            (null == (s = t.actorState) ? void 0 : s.matches('signUp'))
              ? (e.openBlock(),
                e.createBlock(
                  w,
                  {
                    key: 1,
                    onSignUpSubmit: t.onSignUpSubmitI,
                    ref: 'signUpComponent',
                  },
                  {
                    'signup-fields': e.withCtx(({ info: n }) => [
                      e.renderSlot(t.$slots, 'sign-up-fields', { info: n }),
                    ]),
                    signUpSlotI: e.withCtx(() => [
                      e.renderSlot(t.$slots, 'sign-up'),
                    ]),
                    'footer-left': e.withCtx(({ onHaveAccountClicked: n }) => [
                      e.renderSlot(t.$slots, 'sign-up-footer-left', {
                        onHaveAccountClicked: n,
                      }),
                    ]),
                    'footer-right': e.withCtx(({ onSignUpSubmit: n }) => [
                      e.renderSlot(t.$slots, 'sign-up-footer-right', {
                        onSignUpSubmit: n,
                      }),
                    ]),
                    footer: e.withCtx(
                      ({
                        info: n,
                        onHaveAccountClicked: r,
                        onSignUpSubmit: o,
                      }) => [
                        e.renderSlot(t.$slots, 'sign-up-footer', {
                          info: n,
                          onHaveAccountClicked: r,
                          onSignUpSubmit: o,
                        }),
                      ]
                    ),
                    _: 3,
                  },
                  8,
                  ['onSignUpSubmit']
                ))
              : e.createCommentVNode('', !0),
            (null == (c = t.actorState) ? void 0 : c.matches('signIn.rejected'))
              ? (e.openBlock(),
                e.createElementBlock('div', Bl, " Error! Can't sign in! "))
              : e.createCommentVNode('', !0),
            (null == (l = t.actorState) ? void 0 : l.matches('confirmSignUp'))
              ? (e.openBlock(),
                e.createBlock(
                  _,
                  {
                    key: 3,
                    onConfirmSignUpSubmit: t.onConfirmSignUpSubmitI,
                    shouldHideReturnBtn: t.shouldHideReturnBtn,
                    ref: 'confirmSignUpComponent',
                  },
                  {
                    confirmSignUpSlotI: e.withCtx(() => [
                      e.renderSlot(t.$slots, 'confirm-sign-up'),
                    ]),
                    footer: e.withCtx(
                      ({
                        info: n,
                        onConfirmSignUpSubmit: r,
                        onBackToSignInClicked: o,
                      }) => [
                        e.renderSlot(t.$slots, 'sign-in-footer', {
                          info: n,
                          onConfirmSignUpSubmit: r,
                          onBackToSignInClicked: o,
                        }),
                      ]
                    ),
                    _: 3,
                  },
                  8,
                  ['onConfirmSignUpSubmit', 'shouldHideReturnBtn']
                ))
              : e.createCommentVNode('', !0),
            (null == (f = t.actorState) ? void 0 : f.matches('resetPassword'))
              ? (e.openBlock(),
                e.createBlock(
                  S,
                  {
                    key: 4,
                    onResetPasswordSubmit: t.onResetPasswordSubmitI,
                    ref: 'resetPasswordComponent',
                  },
                  {
                    resetPasswordSlotI: e.withCtx(() => [
                      e.renderSlot(t.$slots, 'reset-password'),
                    ]),
                    footer: e.withCtx(
                      ({
                        info: n,
                        onResetPasswordSubmit: r,
                        onBackToSignInClicked: o,
                      }) => [
                        e.renderSlot(t.$slots, 'sign-in-footer', {
                          info: n,
                          onResetPasswordSubmit: r,
                          onBackToSignInClicked: o,
                        }),
                      ]
                    ),
                    _: 3,
                  },
                  8,
                  ['onResetPasswordSubmit']
                ))
              : e.createCommentVNode('', !0),
            (
              null == (d = t.actorState)
                ? void 0
                : d.matches('confirmResetPassword')
            )
              ? (e.openBlock(),
                e.createBlock(
                  C,
                  {
                    key: 5,
                    onConfirmResetPasswordSubmit:
                      t.onConfirmResetPasswordSubmitI,
                    ref: 'confirmResetPasswordComponent',
                  },
                  {
                    confirmResetPasswordSlotI: e.withCtx(() => [
                      e.renderSlot(t.$slots, 'confirm-reset-password'),
                    ]),
                    footer: e.withCtx(
                      ({
                        info: n,
                        onConfirmResetPasswordSubmit: r,
                        onBackToSignInClicked: o,
                      }) => [
                        e.renderSlot(t.$slots, 'sign-in-footer', {
                          info: n,
                          onConfirmResetPasswordSubmit: r,
                          onBackToSignInClicked: o,
                        }),
                      ]
                    ),
                    _: 3,
                  },
                  8,
                  ['onConfirmResetPasswordSubmit']
                ))
              : e.createCommentVNode('', !0),
            (null == (p = t.actorState) ? void 0 : p.matches('confirmSignIn'))
              ? (e.openBlock(),
                e.createBlock(
                  x,
                  {
                    key: 6,
                    onConfirmSignInSubmit: t.onConfirmSignInSubmitI,
                    ref: 'confirmSignInComponent',
                  },
                  {
                    confirmSignInSlotI: e.withCtx(() => [
                      e.renderSlot(t.$slots, 'confirm-sign-in'),
                    ]),
                    footer: e.withCtx(
                      ({
                        info: n,
                        onConfirmSignInSubmit: r,
                        onBackToSignInClicked: o,
                      }) => [
                        e.renderSlot(t.$slots, 'sign-in-footer', {
                          info: n,
                          onConfirmSignInSubmit: r,
                          onBackToSignInClicked: o,
                        }),
                      ]
                    ),
                    _: 3,
                  },
                  8,
                  ['onConfirmSignInSubmit']
                ))
              : e.createCommentVNode('', !0),
            (null == (h = t.actorState) ? void 0 : h.matches('setupTOTP'))
              ? (e.openBlock(),
                e.createBlock(
                  E,
                  {
                    key: 7,
                    onConfirmSetupTotpSubmit: t.onConfirmSetupTOTPSubmitI,
                    ref: 'confirmSetupTOTPComponent',
                  },
                  {
                    confirmSetupTOTPI: e.withCtx(() => [
                      e.renderSlot(t.$slots, 'confirm-setup-totp'),
                    ]),
                    footer: e.withCtx(
                      ({
                        info: n,
                        onSetupTOTPSubmit: r,
                        onBackToSignInClicked: o,
                      }) => [
                        e.renderSlot(t.$slots, 'sign-in-footer', {
                          info: n,
                          onSetupTOTPSubmit: r,
                          onBackToSignInClicked: o,
                        }),
                      ]
                    ),
                    _: 3,
                  },
                  8,
                  ['onConfirmSetupTotpSubmit']
                ))
              : e.createCommentVNode('', !0),
            (
              null == (v = t.actorState)
                ? void 0
                : v.matches('forceNewPassword')
            )
              ? (e.openBlock(),
                e.createBlock(
                  A,
                  {
                    key: 8,
                    onForceNewPasswordSubmit: t.onForceNewPasswordSubmitI,
                    ref: 'forceNewPasswordComponent',
                  },
                  {
                    forceNewPasswordI: e.withCtx(() => [
                      e.renderSlot(t.$slots, 'force-new-password'),
                    ]),
                    footer: e.withCtx(
                      ({
                        info: n,
                        onHaveAccountClicked: r,
                        onForceNewPasswordSubmit: o,
                      }) => [
                        e.renderSlot(t.$slots, 'sign-in-footer', {
                          info: n,
                          onForceNewPasswordSubmit: o,
                          onBackToSignInClicked: r,
                        }),
                      ]
                    ),
                    _: 3,
                  },
                  8,
                  ['onForceNewPasswordSubmit']
                ))
              : e.createCommentVNode('', !0),
          ]),
          (null == (g = t.state) ? void 0 : g.matches('authenticated'))
            ? e.renderSlot(t.$slots, 'default', {
                key: 0,
                user:
                  null == (m = null == (y = t.state) ? void 0 : y.context)
                    ? void 0
                    : m.user,
              })
            : e.createCommentVNode('', !0),
        ],
        64
      )
    );
  };
  var kl = e.defineComponent({
    props: { info: { type: Object } },
    setup: (t) => () => t.info,
  });
  (Nl.install = (t) => {
    t.component('SignIn', us),
      t.component('SignUp', fs),
      t.component('FederatedSignIn', is),
      t.component('Authenticator', Nl),
      t.component('RenderInfo', kl),
      t.component('SignInPasswordControl', T),
      t.component('SignUpPasswordControl', ss),
      t.component('UserNameAlias', rs),
      t.component('ForceNewPassword', xl);
  }),
    (t.Authenticator = Nl),
    (t.FederatedSignIn = is),
    (t.ForceNewPassword = xl),
    (t.RenderInfo = kl),
    (t.SignIn = us),
    (t.SignUp = fs),
    (t.SignUpPasswordControl = ss),
    (t.UserNameAlias = rs),
    Object.defineProperty(t, '__esModule', { value: !0 }),
    (t[Symbol.toStringTag] = 'Module');
});
