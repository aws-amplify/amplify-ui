var t = Object.defineProperty,
  e = Object.defineProperties,
  n = Object.getOwnPropertyDescriptors,
  r = Object.getOwnPropertySymbols,
  o = Object.prototype.hasOwnProperty,
  i = Object.prototype.propertyIsEnumerable,
  a = (e, n, r) =>
    n in e
      ? t(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (e[n] = r),
  u = (t, e) => {
    for (var n in e || (e = {})) o.call(e, n) && a(t, n, e[n]);
    if (r) for (var n of r(e)) i.call(e, n) && a(t, n, e[n]);
    return t;
  },
  s = (t, r) => e(t, n(r));
import {
  defineComponent as c,
  openBlock as f,
  createElementBlock as l,
  renderSlot as d,
  createElementVNode as h,
  mergeProps as p,
  h as v,
  normalizeProps as g,
  guardReactiveProps as y,
  resolveComponent as m,
  createVNode as b,
  withCtx as _,
  createTextVNode as w,
  toDisplayString as S,
  isRef as E,
  shallowRef as A,
  watch as x,
  computed as I,
  ref as C,
  createBlock as T,
  Fragment as P,
  createCommentVNode as B,
  withModifiers as k,
  renderList as O,
  reactive as R,
  onMounted as U,
  toRefs as N,
  provide as j,
} from 'vue';
import { Auth as L, Amplify as F, Logger as M } from 'aws-amplify';
var D = c({ setup: () => ({}) });
const $ = { 'data-amplify-label': '' };
D.render = function (t, e, n, r, o, i) {
  return f(), l('label', $, [d(t.$slots, 'default')]);
};
var z = c({ setup: (t, { slots: e }) => ({ mySlots: e }) });
const V = { 'data-amplify-footer': '' };
z.render = function (t, e, n, r, o, i) {
  return d(t.$slots, 'footert', { slotData: t.mySlots.default() }, () => [
    h('footer', V, [d(t.$slots, 'default')]),
  ]);
};
var H = c({ provide: () => ({}), setup: () => ({}) });
H.render = function (t, e, n, r, o, i) {
  return f(), l('div', null, [d(t.$slots, 'default')]);
};
var W = c({ inheritAttrs: !1, setup: (t, { slots: e }) => ({ mySlots: e }) });
W.render = function (t, e, n, r, o, i) {
  return d(t.$slots, 'formt', { slotData: t.mySlots.default() }, () => [
    h(
      'form',
      p({ 'data-amplify-form': '' }, t.$attrs),
      [d(t.$slots, 'default')],
      16
    ),
  ]);
};
var Y = c({
    props: { level: { type: Number, default: 1 } },
    inheritAttrs: !1,
    setup(t, { slots: e, attrs: n }) {
      var r;
      const o = e.default ? e.default() : [],
        i = e.headingI ? e.headingI() : [];
      return 0 !== (null == (r = i[0]) ? void 0 : r.children.length)
        ? () =>
            v(`h${t.level}`, u({ 'data-amplify-heading': '' }, n), [
              i[0] ? v(i[0].children[0]) : v(o[0]),
            ])
        : ((i[0].children = [
            v(`h${t.level}`, u({ 'data-amplify-heading': '' }, n), [o]),
          ]),
          () => i);
    },
  }),
  q = c({ inheritAttrs: !1, setup: (t, { slots: e }) => ({ mySlots: e }) });
q.render = function (t, e, n, r, o, i) {
  return d(t.$slots, 'fieldSetI', { slotData: t.mySlots.default() }, () => [
    h(
      'fieldset',
      p({ 'data-amplify-fieldset': '' }, t.$attrs),
      [d(t.$slots, 'default')],
      16
    ),
  ]);
};
var G = c({ setup: () => ({}) });
const K = { 'data-amplify-box': '' };
G.render = function (t, e, n, r, o, i) {
  return f(), l('div', K, [d(t.$slots, 'default')]);
};
var J = c({ setup: () => ({}) });
J.render = function (t, e, n, r, o, i) {
  return d(t.$slots, 'buttont', g(y(t.$attrs)), () => [
    h(
      'button',
      p(t.$attrs, { 'data-amplify-button': '' }),
      [d(t.$slots, 'default')],
      16
    ),
  ]);
};
var Q = c({ setup: () => ({}) });
const Z = { 'data-amplify-spacer': '' };
Q.render = function (t, e, n, r, o, i) {
  return f(), l('span', Z, [d(t.$slots, 'default')]);
};
var X = c({ setup: () => ({}) });
X.render = function (t, e, n, r, o, i) {
  return d(t.$slots, 'textI', g(y(t.$attrs)), () => [
    h(
      'span',
      p({ 'data-amplify-text': '' }, t.$attrs),
      [d(t.$slots, 'default')],
      16
    ),
  ]);
};
var tt = c({
  props: { textValue: { default: '' } },
  setup: (t, { emit: e }) => ({
    onInput: (t) => {
      e('update:textValue', t.target.value);
    },
  }),
});
const et = ['value'];
tt.render = function (t, e, n, r, o, i) {
  return (
    f(),
    l(
      'input',
      {
        value: t.textValue,
        onInput: e[0] || (e[0] = (e) => t.onInput(e)),
        'data-amplify-input': '',
      },
      null,
      40,
      et
    )
  );
};
var nt = {
  components: { BaseText: X, BaseInput: tt },
  computed: { passwordLabel: () => 'Password' },
  setup() {},
};
nt.render = function (t, e, n, r, o, i) {
  const a = m('base-text'),
    u = m('base-input');
  return (
    f(),
    l('div', null, [
      b(a, null, { default: _(() => [w(S(i.passwordLabel), 1)]), _: 1 }),
      b(u, {
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
var rt = function () {
  return (rt =
    Object.assign ||
    function (t) {
      for (var e, n = 1, r = arguments.length; n < r; n++)
        for (var o in (e = arguments[n]))
          Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
      return t;
    }).apply(this, arguments);
};
function ot(t, e) {
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
function it(t) {
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
function at(t, e) {
  var n = 'function' == typeof Symbol && t[Symbol.iterator];
  if (!n) return t;
  var r,
    o,
    i = n.call(t),
    a = [];
  try {
    for (; (void 0 === e || e-- > 0) && !(r = i.next()).done; ) a.push(r.value);
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
function ut(t, e) {
  for (var n = 0, r = e.length, o = t.length; n < r; n++, o++) t[o] = e[n];
  return t;
}
var st = {};
function ct(t) {
  return Object.keys(t);
}
function ft(t, e, n) {
  void 0 === n && (n = '.');
  var r = ht(t, n),
    o = ht(e, n);
  return Pt(o)
    ? !!Pt(r) && o === r
    : Pt(r)
    ? r in o
    : ct(r).every(function (t) {
        return t in o && ft(r[t], o[t]);
      });
}
function lt(t) {
  try {
    return Pt(t) || 'number' == typeof t ? '' + t : t.type;
  } catch (e) {
    throw new Error(
      'Events must be strings or objects with a string event.type property.'
    );
  }
}
function dt(t, e) {
  try {
    return Ct(t) ? t : t.toString().split(e);
  } catch (n) {
    throw new Error("'" + t + "' is not a valid state path.");
  }
}
function ht(t, e) {
  return 'object' == typeof (n = t) &&
    'value' in n &&
    'context' in n &&
    'event' in n &&
    '_event' in n
    ? t.value
    : Ct(t)
    ? pt(t)
    : 'string' != typeof t
    ? t
    : pt(dt(t, e));
  var n;
}
function pt(t) {
  if (1 === t.length) return t[0];
  for (var e = {}, n = e, r = 0; r < t.length - 1; r++)
    r === t.length - 2 ? (n[t[r]] = t[r + 1]) : ((n[t[r]] = {}), (n = n[t[r]]));
  return e;
}
function vt(t, e) {
  for (var n = {}, r = ct(t), o = 0; o < r.length; o++) {
    var i = r[o];
    n[i] = e(t[i], i, t, o);
  }
  return n;
}
function gt(t, e, n) {
  var r,
    o,
    i = {};
  try {
    for (var a = it(ct(t)), u = a.next(); !u.done; u = a.next()) {
      var s = u.value,
        c = t[s];
      n(c) && (i[s] = e(c, s, t));
    }
  } catch (f) {
    r = { error: f };
  } finally {
    try {
      u && !u.done && (o = a.return) && o.call(a);
    } finally {
      if (r) throw r.error;
    }
  }
  return i;
}
var yt = function (t) {
  return function (e) {
    var n,
      r,
      o = e;
    try {
      for (var i = it(t), a = i.next(); !a.done; a = i.next()) {
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
function mt(t) {
  return t
    ? Pt(t)
      ? [[t]]
      : bt(
          ct(t).map(function (e) {
            var n = t[e];
            return 'string' == typeof n || (n && Object.keys(n).length)
              ? mt(t[e]).map(function (t) {
                  return [e].concat(t);
                })
              : [[e]];
          })
        )
    : [[]];
}
function bt(t) {
  var e;
  return (e = []).concat.apply(e, ut([], at(t)));
}
function _t(t) {
  return Ct(t) ? t : [t];
}
function wt(t) {
  return void 0 === t ? [] : _t(t);
}
function St(t, e, n) {
  var r, o;
  if (Tt(t)) return t(e, n.data);
  var i = {};
  try {
    for (var a = it(Object.keys(t)), u = a.next(); !u.done; u = a.next()) {
      var s = u.value,
        c = t[s];
      Tt(c) ? (i[s] = c(e, n.data)) : (i[s] = c);
    }
  } catch (f) {
    r = { error: f };
  } finally {
    try {
      u && !u.done && (o = a.return) && o.call(a);
    } finally {
      if (r) throw r.error;
    }
  }
  return i;
}
function Et(t) {
  return (
    t instanceof Promise ||
    !(null === t || (!Tt(t) && 'object' != typeof t) || !Tt(t.then))
  );
}
function At(t, e) {
  var n,
    r,
    o = at([[], []], 2),
    i = o[0],
    a = o[1];
  try {
    for (var u = it(t), s = u.next(); !s.done; s = u.next()) {
      var c = s.value;
      e(c) ? i.push(c) : a.push(c);
    }
  } catch (f) {
    n = { error: f };
  } finally {
    try {
      s && !s.done && (r = u.return) && r.call(u);
    } finally {
      if (n) throw n.error;
    }
  }
  return [i, a];
}
function xt(t, e) {
  return vt(t.states, function (t, n) {
    if (t) {
      var r = (Pt(e) ? void 0 : e[n]) || (t ? t.current : void 0);
      if (r) return { current: r, states: xt(t, r) };
    }
  });
}
function It(t, e, n, r) {
  return t
    ? n.reduce(function (t, n) {
        var o,
          i,
          a = n.assignment,
          u = { state: r, action: n, _event: e },
          s = {};
        if (Tt(a)) s = a(t, e.data, u);
        else
          try {
            for (var c = it(ct(a)), f = c.next(); !f.done; f = c.next()) {
              var l = f.value,
                d = a[l];
              s[l] = Tt(d) ? d(t, e.data, u) : d;
            }
          } catch (h) {
            o = { error: h };
          } finally {
            try {
              f && !f.done && (i = c.return) && i.call(c);
            } finally {
              if (o) throw o.error;
            }
          }
        return Object.assign({}, t, s);
      }, t)
    : t;
}
function Ct(t) {
  return Array.isArray(t);
}
function Tt(t) {
  return 'function' == typeof t;
}
function Pt(t) {
  return 'string' == typeof t;
}
function Bt(t, e) {
  if (t)
    return Pt(t)
      ? { type: 'xstate.guard', name: t, predicate: e ? e[t] : void 0 }
      : Tt(t)
      ? { type: 'xstate.guard', name: t.name, predicate: t }
      : t;
}
var kt = (function () {
  return ('function' == typeof Symbol && Symbol.observable) || '@@observable';
})();
function Ot(t) {
  try {
    return '__xstatenode' in t;
  } catch (e) {
    return !1;
  }
}
var Rt,
  Ut,
  Nt,
  jt,
  Lt = (function () {
    var t = 0;
    return function () {
      return (++t).toString(16);
    };
  })();
function Ft(t, e) {
  return Pt(t) || 'number' == typeof t ? rt({ type: t }, e) : t;
}
function Mt(t, e) {
  if (!Pt(t) && '$$type' in t && 'scxml' === t.$$type) return t;
  var n = Ft(t);
  return rt({ name: n.type, data: n, $$type: 'scxml', type: 'external' }, e);
}
function Dt(t, e) {
  return _t(e).map(function (e) {
    return void 0 === e || 'string' == typeof e || Ot(e)
      ? { target: e, event: t }
      : rt(rt({}, e), { event: t });
  });
}
function $t(t, e, n, r, o) {
  var i = t.options.guards,
    a = { state: o, cond: e, _event: r };
  if ('xstate.guard' === e.type) return e.predicate(n, r.data, a);
  var u = i[e.type];
  if (!u)
    throw new Error(
      "Guard '" + e.type + "' is not implemented on machine '" + t.id + "'."
    );
  return u(n, r.data, a);
}
function zt(t) {
  return 'string' == typeof t ? { type: t } : t;
}
function Vt(t, e, n) {
  if ('object' == typeof t) return t;
  var r = function () {};
  return { next: t, error: e || r, complete: n || r };
}
((Ut = Rt || (Rt = {})).Start = 'xstate.start'),
  (Ut.Stop = 'xstate.stop'),
  (Ut.Raise = 'xstate.raise'),
  (Ut.Send = 'xstate.send'),
  (Ut.Cancel = 'xstate.cancel'),
  (Ut.NullEvent = ''),
  (Ut.Assign = 'xstate.assign'),
  (Ut.After = 'xstate.after'),
  (Ut.DoneState = 'done.state'),
  (Ut.DoneInvoke = 'done.invoke'),
  (Ut.Log = 'xstate.log'),
  (Ut.Init = 'xstate.init'),
  (Ut.Invoke = 'xstate.invoke'),
  (Ut.ErrorExecution = 'error.execution'),
  (Ut.ErrorCommunication = 'error.communication'),
  (Ut.ErrorPlatform = 'error.platform'),
  (Ut.ErrorCustom = 'xstate.error'),
  (Ut.Update = 'xstate.update'),
  (Ut.Pure = 'xstate.pure'),
  (Ut.Choose = 'xstate.choose'),
  ((jt = Nt || (Nt = {})).Parent = '#_parent'),
  (jt.Internal = '#_internal');
var Ht = Rt.Start,
  Wt = Rt.Stop,
  Yt = Rt.Raise,
  qt = Rt.Send,
  Gt = Rt.Cancel,
  Kt = Rt.NullEvent,
  Jt = Rt.Assign;
Rt.After, Rt.DoneState;
var Qt = Rt.Log,
  Zt = Rt.Init,
  Xt = Rt.Invoke;
Rt.ErrorExecution;
var te = Rt.ErrorPlatform,
  ee = Rt.ErrorCustom,
  ne = Rt.Update,
  re = Rt.Choose,
  oe = Rt.Pure,
  ie = Mt({ type: Zt });
function ae(t, e) {
  return (e && e[t]) || void 0;
}
function ue(t, e) {
  var n;
  if (Pt(t) || 'number' == typeof t) {
    var r = ae(t, e);
    n = Tt(r) ? { type: t, exec: r } : r || { type: t, exec: void 0 };
  } else if (Tt(t)) n = { type: t.name || t.toString(), exec: t };
  else {
    if (Tt((r = ae(t.type, e)))) n = rt(rt({}, t), { exec: r });
    else if (r) {
      var o = r.type || t.type;
      n = rt(rt(rt({}, r), t), { type: o });
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
var se = function (t, e) {
  return t
    ? (Ct(t) ? t : [t]).map(function (t) {
        return ue(t, e);
      })
    : [];
};
function ce(t) {
  var e = ue(t);
  return rt(rt({ id: Pt(t) ? t : e.id }, e), { type: e.type });
}
function fe(t) {
  return Pt(t) ? { type: Yt, event: t } : le(t, { to: Nt.Internal });
}
function le(t, e) {
  return {
    to: e ? e.to : void 0,
    type: qt,
    event: Tt(t) ? t : Ft(t),
    delay: e ? e.delay : void 0,
    id: e && void 0 !== e.id ? e.id : Tt(t) ? t.name : lt(t),
  };
}
function de() {
  return le(ne, rt(rt({}, t), { to: Nt.Parent }));
  var t;
}
var he = function (t) {
  return { type: Jt, assignment: t };
};
function pe(t, e) {
  var n = Rt.DoneState + '.' + t,
    r = {
      type: n,
      data: e,
      toString: function () {
        return n;
      },
    };
  return r;
}
function ve(t, e) {
  var n = Rt.DoneInvoke + '.' + t,
    r = {
      type: n,
      data: e,
      toString: function () {
        return n;
      },
    };
  return r;
}
function ge(t, e) {
  var n = Rt.ErrorPlatform + '.' + t,
    r = {
      type: n,
      data: e,
      toString: function () {
        return n;
      },
    };
  return r;
}
function ye(t, e, n, r, o, i) {
  void 0 === i && (i = !1);
  var a = at(
      i
        ? [[], o]
        : At(o, function (t) {
            return t.type === Jt;
          }),
      2
    ),
    u = a[0],
    s = a[1],
    c = u.length ? It(n, r, u, e) : n,
    f = i ? [n] : void 0;
  return [
    bt(
      s
        .map(function (n) {
          var o;
          switch (n.type) {
            case Yt:
              return { type: Yt, _event: Mt(n.event) };
            case qt:
              return (function (t, e, n, r) {
                var o,
                  i = { _event: n },
                  a = Mt(Tt(t.event) ? t.event(e, n.data, i) : t.event);
                if (Pt(t.delay)) {
                  var u = r && r[t.delay];
                  o = Tt(u) ? u(e, n.data, i) : u;
                } else o = Tt(t.delay) ? t.delay(e, n.data, i) : t.delay;
                var s = Tt(t.to) ? t.to(e, n.data, i) : t.to;
                return rt(rt({}, t), {
                  to: s,
                  _event: a,
                  event: a.data,
                  delay: o,
                });
              })(n, c, r, t.options.delays);
            case Qt:
              return (function (t, e, n) {
                return rt(rt({}, t), {
                  value: Pt(t.expr) ? t.expr : t.expr(e, n.data, { _event: n }),
                });
              })(n, c, r);
            case re:
              if (
                !(l =
                  null ===
                    (o = n.conds.find(function (n) {
                      var o = Bt(n.cond, t.options.guards);
                      return !o || $t(t, o, c, r, e);
                    })) || void 0 === o
                    ? void 0
                    : o.actions)
              )
                return [];
              var a = at(ye(t, e, c, r, se(wt(l), t.options.actions), i), 2),
                u = a[0],
                s = a[1];
              return (c = s), null == f || f.push(c), u;
            case oe:
              var l;
              if (!(l = n.get(c, r.data))) return [];
              var d = at(ye(t, e, c, r, se(wt(l), t.options.actions), i), 2),
                h = d[0],
                p = d[1];
              return (c = p), null == f || f.push(c), h;
            case Wt:
              return (function (t, e, n) {
                var r = Tt(t.activity) ? t.activity(e, n.data) : t.activity,
                  o = 'string' == typeof r ? { id: r } : r;
                return { type: Rt.Stop, activity: o };
              })(n, c, r);
            case Jt:
              (c = It(c, r, [n], e)), null == f || f.push(c);
              break;
            default:
              var v = ue(n, t.options.actions),
                g = v.exec;
              if (g && f) {
                var y = f.length - 1;
                v.exec = function (t) {
                  for (var e = [], n = 1; n < arguments.length; n++)
                    e[n - 1] = arguments[n];
                  null == g || g.apply(void 0, ut([f[y]], at(e)));
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
var me = function (t) {
  return 'atomic' === t.type || 'final' === t.type;
};
function be(t) {
  return ct(t.states).map(function (e) {
    return t.states[e];
  });
}
function _e(t) {
  var e = [t];
  return me(t) ? e : e.concat(bt(be(t).map(_e)));
}
function we(t, e) {
  var n,
    r,
    o,
    i,
    a,
    u,
    s,
    c,
    f = Ee(new Set(t)),
    l = new Set(e);
  try {
    for (var d = it(l), h = d.next(); !h.done; h = d.next())
      for (var p = (E = h.value).parent; p && !l.has(p); )
        l.add(p), (p = p.parent);
  } catch (A) {
    n = { error: A };
  } finally {
    try {
      h && !h.done && (r = d.return) && r.call(d);
    } finally {
      if (n) throw n.error;
    }
  }
  var v = Ee(l);
  try {
    for (var g = it(l), y = g.next(); !y.done; y = g.next()) {
      if ('compound' !== (E = y.value).type || (v.get(E) && v.get(E).length)) {
        if ('parallel' === E.type)
          try {
            for (
              var m = ((a = void 0), it(be(E))), b = m.next();
              !b.done;
              b = m.next()
            ) {
              var _ = b.value;
              'history' !== _.type &&
                (l.has(_) ||
                  (l.add(_),
                  f.get(_)
                    ? f.get(_).forEach(function (t) {
                        return l.add(t);
                      })
                    : _.initialStateNodes.forEach(function (t) {
                        return l.add(t);
                      })));
            }
          } catch (x) {
            a = { error: x };
          } finally {
            try {
              b && !b.done && (u = m.return) && u.call(m);
            } finally {
              if (a) throw a.error;
            }
          }
      } else
        f.get(E)
          ? f.get(E).forEach(function (t) {
              return l.add(t);
            })
          : E.initialStateNodes.forEach(function (t) {
              return l.add(t);
            });
    }
  } catch (I) {
    o = { error: I };
  } finally {
    try {
      y && !y.done && (i = g.return) && i.call(g);
    } finally {
      if (o) throw o.error;
    }
  }
  try {
    for (var w = it(l), S = w.next(); !S.done; S = w.next()) {
      var E;
      for (p = (E = S.value).parent; p && !l.has(p); ) l.add(p), (p = p.parent);
    }
  } catch (C) {
    s = { error: C };
  } finally {
    try {
      S && !S.done && (c = w.return) && c.call(w);
    } finally {
      if (s) throw s.error;
    }
  }
  return l;
}
function Se(t, e) {
  var n = e.get(t);
  if (!n) return {};
  if ('compound' === t.type) {
    var r = n[0];
    if (!r) return {};
    if (me(r)) return r.key;
  }
  var o = {};
  return (
    n.forEach(function (t) {
      o[t.key] = Se(t, e);
    }),
    o
  );
}
function Ee(t) {
  var e,
    n,
    r = new Map();
  try {
    for (var o = it(t), i = o.next(); !i.done; i = o.next()) {
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
function Ae(t, e) {
  return Se(t, Ee(we([t], e)));
}
function xe(t, e) {
  return Array.isArray(t)
    ? t.some(function (t) {
        return t === e;
      })
    : t instanceof Set && t.has(e);
}
function Ie(t, e) {
  return 'compound' === e.type
    ? be(e).some(function (e) {
        return 'final' === e.type && xe(t, e);
      })
    : 'parallel' === e.type &&
        be(e).every(function (e) {
          return Ie(t, e);
        });
}
function Ce(t, e) {
  if (t === e) return !0;
  if (void 0 === t || void 0 === e) return !1;
  if (Pt(t) || Pt(e)) return t === e;
  var n = ct(t),
    r = ct(e);
  return (
    n.length === r.length &&
    n.every(function (n) {
      return Ce(t[n], e[n]);
    })
  );
}
var Te = (function () {
    function t(t) {
      var e,
        n,
        r = this;
      (this.actions = []),
        (this.activities = st),
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
        (this.activities = t.activities || st),
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
              return ut(
                [],
                at(
                  new Set(
                    bt(
                      ut(
                        [],
                        at(
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
              _event: ie,
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
          var r = ie;
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
          (void 0 === t && (t = this.value), void 0 === e && (e = '.'), Pt(t))
        )
          return [t];
        var r = ct(t);
        return r.concat.apply(
          r,
          ut(
            [],
            at(
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
          n = ot(t, ['configuration', 'transitions', 'tags']);
        return rt(rt({}, n), { tags: Array.from(e) });
      }),
      (t.prototype.matches = function (t) {
        return ft(t, this.value);
      }),
      (t.prototype.hasTag = function (t) {
        return this.tags.has(t);
      }),
      t
    );
  })(),
  Pe = [],
  Be = function (t, e) {
    Pe.push(t);
    var n = e(t);
    return Pe.pop(), n;
  };
function ke(t) {
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
function Oe(t, e, n) {
  var r = ke(e);
  if (((r.deferred = !0), Ot(t))) {
    var o = (r.state = Be(void 0, function () {
      return (n ? t.withContext(n) : t).initialState;
    }));
    r.getSnapshot = function () {
      return o;
    };
  }
  return r;
}
function Re(t) {
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
function Ue(t) {
  return rt(rt({ type: Xt }, t), {
    toJSON: function () {
      t.onDone, t.onError;
      var e = ot(t, ['onDone', 'onError']);
      return rt(rt({}, e), { type: Xt, src: Re(t.src) });
    },
  });
}
var Ne = {},
  je = function (t) {
    return '#' === t[0];
  },
  Le = (function () {
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
          { actions: {}, guards: {}, services: {}, activities: {}, delays: {} },
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
          this.config.delimiter || (this.parent ? this.parent.delimiter : '.')),
        (this.id =
          this.config.id ||
          ut([this.machine.key], at(this.path)).join(this.delimiter)),
        (this.version = this.parent
          ? this.parent.version
          : this.config.version),
        (this.type =
          this.config.type ||
          (this.config.parallel
            ? 'parallel'
            : this.config.states && ct(this.config.states).length
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
          ? vt(this.config.states, function (e, n) {
              var r,
                o = new t(e, { _parent: i, _key: n });
              return (
                Object.assign(i.idMap, rt((((r = {})[o.id] = o), r), o.idMap)),
                o
              );
            })
          : Ne);
      var a = 0;
      !(function t(e) {
        var n, r;
        e.order = a++;
        try {
          for (var o = it(be(e)), i = o.next(); !i.done; i = o.next()) {
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
        (this.onEntry = wt(this.config.entry || this.config.onEntry).map(
          function (t) {
            return ue(t);
          }
        )),
        (this.onExit = wt(this.config.exit || this.config.onExit).map(function (
          t
        ) {
          return ue(t);
        })),
        (this.meta = this.config.meta),
        (this.doneData = 'final' === this.type ? this.config.data : void 0),
        (this.invoke = wt(this.config.invoke).map(function (t, e) {
          var n, r;
          if (Ot(t))
            return (
              (i.machine.options.services = rt(
                (((n = {})[t.id] = t), n),
                i.machine.options.services
              )),
              Ue({ src: t.id, id: t.id })
            );
          if (Pt(t.src))
            return Ue(rt(rt({}, t), { id: t.id || t.src, src: t.src }));
          if (Ot(t.src) || Tt(t.src)) {
            var o = i.id + ':invocation[' + e + ']';
            return (
              (i.machine.options.services = rt(
                (((r = {})[o] = t.src), r),
                i.machine.options.services
              )),
              Ue(rt(rt({ id: o }, t), { src: o }))
            );
          }
          var a = t.src;
          return Ue(rt(rt({ id: a.type }, t), { src: a }));
        })),
        (this.activities = wt(this.config.activities)
          .concat(this.invoke)
          .map(function (t) {
            return ce(t);
          })),
        (this.transition = this.transition.bind(this)),
        (this.tags = wt(this.config.tags));
    }
    return (
      (t.prototype._init = function () {
        this.__cache.transitions ||
          _e(this).forEach(function (t) {
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
            actions: rt(rt({}, o), e.actions),
            activities: rt(rt({}, i), e.activities),
            guards: rt(rt({}, a), e.guards),
            services: rt(rt({}, u), e.services),
            delays: rt(rt({}, s), e.delays),
          },
          null != n ? n : this.context
        );
      }),
      (t.prototype.withContext = function (e) {
        return new t(this.config, this.options, e);
      }),
      Object.defineProperty(t.prototype, 'context', {
        get: function () {
          return Tt(this._context) ? this._context() : this._context;
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
            states: vt(this.states, function (t) {
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
              (t[e.eventType] = t[e.eventType] || []), t[e.eventType].push(e), t
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
            return Rt.After + '(' + t + ')' + n;
          })(Tt(e) ? t.id + ':delay[' + n + ']' : e, t.id);
          return (
            t.onEntry.push(le(r, { delay: e })),
            t.onExit.push({ type: Gt, sendId: r }),
            r
          );
        };
        return (
          Ct(e)
            ? e.map(function (t, e) {
                var r = n(t.delay, e);
                return rt(rt({}, t), { event: r });
              })
            : bt(
                ct(e).map(function (t, r) {
                  var o = e[t],
                    i = Pt(o) ? { target: o } : o,
                    a = isNaN(+t) ? t : +t,
                    u = n(a, r);
                  return wt(i).map(function (t) {
                    return rt(rt({}, t), { event: u, delay: a });
                  });
                })
              )
        ).map(function (e) {
          var n = e.delay;
          return rt(rt({}, t.formatTransition(e)), { delay: n });
        });
      }),
      (t.prototype.getStateNodes = function (t) {
        var e,
          n = this;
        if (!t) return [];
        var r = t instanceof Te ? t.value : ht(t, this.delimiter);
        if (Pt(r)) {
          var o = this.getStateNode(r).initial;
          return void 0 !== o
            ? this.getStateNodes((((e = {})[r] = o), e))
            : [this, this.states[r]];
        }
        var i = ct(r),
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
        var e = lt(t);
        return this.events.includes(e);
      }),
      (t.prototype.resolveState = function (t) {
        var e = Array.from(we([], this.getStateNodes(t.value)));
        return new Te(
          rt(rt({}, t), {
            value: this.resolve(t.value),
            configuration: e,
            done: Ie(e, this),
          })
        );
      }),
      (t.prototype.transitionLeafNode = function (t, e, n) {
        var r = this.getStateNode(t).next(e, n);
        return r && r.transitions.length ? r : this.next(e, n);
      }),
      (t.prototype.transitionCompoundNode = function (t, e, n) {
        var r = ct(t),
          o = this.getStateNode(r[0])._transition(t[r[0]], e, n);
        return o && o.transitions.length ? o : this.next(e, n);
      }),
      (t.prototype.transitionParallelNode = function (t, e, n) {
        var r,
          o,
          i = {};
        try {
          for (var a = it(ct(t)), u = a.next(); !u.done; u = a.next()) {
            var s = u.value,
              c = t[s];
            if (c) {
              var f = this.getStateNode(s)._transition(c, e, n);
              f && (i[s] = f);
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
        var l = ct(i).map(function (t) {
            return i[t];
          }),
          d = bt(
            l.map(function (t) {
              return t.transitions;
            })
          );
        if (
          !l.some(function (t) {
            return t.transitions.length > 0;
          })
        )
          return this.next(e, n);
        var h = bt(
            l.map(function (t) {
              return t.entrySet;
            })
          ),
          p = bt(
            ct(i).map(function (t) {
              return i[t].configuration;
            })
          );
        return {
          transitions: d,
          entrySet: h,
          exitSet: bt(
            l.map(function (t) {
              return t.exitSet;
            })
          ),
          configuration: p,
          source: e,
          actions: bt(
            ct(i).map(function (t) {
              return i[t].actions;
            })
          ),
        };
      }),
      (t.prototype._transition = function (t, e, n) {
        return Pt(t)
          ? this.transitionLeafNode(t, e, n)
          : 1 === ct(t).length
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
            var c = it(this.getCandidates(a)), f = c.next();
            !f.done;
            f = c.next()
          ) {
            var l = f.value,
              d = l.cond,
              h = l.in,
              p = t.context,
              v =
                !h ||
                (Pt(h) && je(h)
                  ? t.matches(ht(this.getStateNodeById(h).path, this.delimiter))
                  : ft(
                      ht(h, this.delimiter),
                      yt(this.path.slice(0, -2))(t.value)
                    )),
              g = !1;
            try {
              g = !d || $t(this.machine, d, p, e, t);
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
              void 0 !== l.target && (s = l.target),
                u.push.apply(u, ut([], at(l.actions))),
                (o = l);
              break;
            }
          }
        } catch (_) {
          n = { error: _ };
        } finally {
          try {
            f && !f.done && (r = c.return) && r.call(c);
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
          var y = bt(
              s.map(function (e) {
                return i.getRelativeStateNodes(e, t.historyValue);
              })
            ),
            m = !!o.internal;
          return {
            transitions: [o],
            entrySet: m
              ? []
              : bt(
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
          s = we([], r ? this.getStateNodes(r.value) : [this]),
          c = t.configuration.length ? we(s, t.configuration) : s;
        try {
          for (var f = it(c), l = f.next(); !l.done; l = f.next()) {
            xe(s, (p = l.value)) || t.entrySet.push(p);
          }
        } catch (w) {
          o = { error: w };
        } finally {
          try {
            l && !l.done && (i = f.return) && i.call(f);
          } finally {
            if (o) throw o.error;
          }
        }
        try {
          for (var d = it(s), h = d.next(); !h.done; h = d.next()) {
            var p;
            (xe(c, (p = h.value)) && !xe(t.exitSet, p.parent)) ||
              t.exitSet.push(p);
          }
        } catch (S) {
          a = { error: S };
        } finally {
          try {
            h && !h.done && (u = d.return) && u.call(d);
          } finally {
            if (a) throw a.error;
          }
        }
        t.source || ((t.exitSet = []), t.entrySet.push(this));
        var v = bt(
          t.entrySet.map(function (r) {
            var o = [];
            if ('final' !== r.type) return o;
            var i = r.parent;
            if (!i.parent) return o;
            o.push(
              pe(r.id, r.doneData),
              pe(i.id, r.doneData ? St(r.doneData, e, n) : void 0)
            );
            var a = i.parent;
            return (
              'parallel' === a.type &&
                be(a).every(function (e) {
                  return Ie(t.configuration, e);
                }) &&
                o.push(pe(a.id)),
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
          m = at(
            [
              bt(
                Array.from(g).map(function (t) {
                  return ut(
                    ut(
                      [],
                      at(
                        t.activities.map(function (t) {
                          return (function (t) {
                            var e = ce(t);
                            return {
                              type: Rt.Start,
                              activity: e,
                              exec: void 0,
                            };
                          })(t);
                        })
                      )
                    ),
                    at(t.onEntry)
                  );
                })
              ).concat(v.map(fe)),
              bt(
                Array.from(y).map(function (t) {
                  return ut(
                    ut([], at(t.onExit)),
                    at(
                      t.activities.map(function (t) {
                        return (function (t) {
                          var e = Tt(t) ? t : ce(t);
                          return { type: Rt.Stop, activity: e, exec: void 0 };
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
          _ = m[1];
        return se(_.concat(t.actions).concat(b), this.machine.options.actions);
      }),
      (t.prototype.transition = function (t, e, n) {
        void 0 === t && (t = this.initialState);
        var r,
          o,
          i = Mt(e);
        if (t instanceof Te)
          r = void 0 === n ? t : this.resolveState(Te.from(t, n));
        else {
          var a = Pt(t)
              ? this.resolve(pt(this.getResolvedPath(t)))
              : this.resolve(t),
            u = null != n ? n : this.machine.context;
          r = this.resolveState(Te.from(a, u));
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
          c = we([], this.getStateNodes(r.value)),
          f = s.configuration.length ? we(c, s.configuration) : c;
        return (
          (s.configuration = ut([], at(f))), this.resolveTransition(s, r, i)
        );
      }),
      (t.prototype.resolveRaisedTransition = function (t, e, n) {
        var r,
          o = t.actions;
        return (
          ((t = this.transition(t, e))._event = n),
          (t.event = n.data),
          (r = t.actions).unshift.apply(r, ut([], at(o))),
          t
        );
      }),
      (t.prototype.resolveTransition = function (t, e, n, r) {
        var o,
          i,
          a = this;
        void 0 === n && (n = ie), void 0 === r && (r = this.machine.context);
        var u = t.configuration,
          s = !e || t.transitions.length > 0,
          c = s ? Ae(this.machine, u) : void 0,
          f = e
            ? e.historyValue
              ? e.historyValue
              : t.source
              ? this.machine.historyValue(e.value)
              : void 0
            : void 0,
          l = e ? e.context : r,
          d = this.getActions(t, l, n, e),
          h = e ? rt({}, e.activities) : {};
        try {
          for (var p = it(d), v = p.next(); !v.done; v = p.next()) {
            var g = v.value;
            g.type === Ht
              ? (h[g.activity.id || g.activity.type] = g)
              : g.type === Wt && (h[g.activity.id || g.activity.type] = !1);
          }
        } catch (N) {
          o = { error: N };
        } finally {
          try {
            v && !v.done && (i = p.return) && i.call(p);
          } finally {
            if (o) throw o.error;
          }
        }
        var y,
          m,
          b = at(
            ye(this, e, l, n, d, this.machine.config.preserveActionOrder),
            2
          ),
          _ = b[0],
          w = b[1],
          S = at(
            At(_, function (t) {
              return t.type === Yt || (t.type === qt && t.to === Nt.Internal);
            }),
            2
          ),
          E = S[0],
          A = S[1],
          x = _.filter(function (t) {
            var e;
            return (
              t.type === Ht &&
              (null === (e = t.activity) || void 0 === e ? void 0 : e.type) ===
                Xt
            );
          }).reduce(
            function (t, e) {
              return (
                (t[e.activity.id] = (function (t, e, n, r) {
                  var o,
                    i = zt(t.src),
                    a =
                      null === (o = null == e ? void 0 : e.options.services) ||
                      void 0 === o
                        ? void 0
                        : o[i.type],
                    u = t.data ? St(t.data, n, r) : void 0,
                    s = a ? Oe(a, t.id, u) : ke(t.id);
                  return (s.meta = t), s;
                })(e.activity, a.machine, w, n)),
                t
              );
            },
            e ? rt({}, e.children) : {}
          ),
          I = c ? t.configuration : e ? e.configuration : [],
          C = Ie(I, this),
          T = new Te({
            value: c || e.value,
            context: w,
            _event: n,
            _sessionid: e ? e._sessionid : null,
            historyValue: c
              ? f
                ? ((y = f), (m = c), { current: m, states: xt(y, m) })
                : void 0
              : e
              ? e.historyValue
              : void 0,
            history: !c || t.source ? e : void 0,
            actions: c ? A : [],
            activities: c ? h : e ? e.activities : {},
            events: [],
            configuration: I,
            transitions: t.transitions,
            children: x,
            done: C,
            tags: null == e ? void 0 : e.tags,
          }),
          P = l !== w;
        T.changed = n.name === ne || P;
        var B = T.history;
        B && delete B.history;
        var k =
          !C &&
          (this._transient ||
            u.some(function (t) {
              return t._transient;
            }));
        if (!(s || (k && '' !== n.name))) return T;
        var O = T;
        if (!C)
          for (
            k && (O = this.resolveRaisedTransition(O, { type: Kt }, n));
            E.length;

          ) {
            var R = E.shift();
            O = this.resolveRaisedTransition(O, R._event, n);
          }
        var U =
          O.changed ||
          (B
            ? !!O.actions.length ||
              P ||
              typeof B.value != typeof O.value ||
              !Ce(O.value, B.value)
            : void 0);
        return (
          (O.changed = U),
          (O.history = B),
          (O.tags = new Set(
            bt(
              O.configuration.map(function (t) {
                return t.tags;
              })
            )
          )),
          O
        );
      }),
      (t.prototype.getStateNode = function (t) {
        if (je(t)) return this.machine.getStateNodeById(t);
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
        var e = je(t) ? t.slice('#'.length) : t;
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
        if ('string' == typeof t && je(t))
          try {
            return this.getStateNodeById(t.slice(1));
          } catch (o) {}
        for (var e = dt(t, this.delimiter).slice(), n = this; e.length; ) {
          var r = e.shift();
          if (!r.length) break;
          n = n.getStateNode(r);
        }
        return n;
      }),
      (t.prototype.resolve = function (t) {
        var e,
          n = this;
        if (!t) return this.initialStateValue || Ne;
        switch (this.type) {
          case 'parallel':
            return vt(this.initialStateValue, function (e, r) {
              return e ? n.getStateNode(r).resolve(t[r] || e) : Ne;
            });
          case 'compound':
            if (Pt(t)) {
              var r = this.getStateNode(t);
              return 'parallel' === r.type || 'compound' === r.type
                ? (((e = {})[t] = r.initialStateValue), e)
                : t;
            }
            return ct(t).length
              ? vt(t, function (t, e) {
                  return t ? n.getStateNode(e).resolve(t) : Ne;
                })
              : this.initialStateValue || {};
          default:
            return t || Ne;
        }
      }),
      (t.prototype.getResolvedPath = function (t) {
        if (je(t)) {
          var e = this.machine.idMap[t.slice('#'.length)];
          if (!e) throw new Error("Unable to find state node '" + t + "'");
          return e.path;
        }
        return dt(t, this.delimiter);
      }),
      Object.defineProperty(t.prototype, 'initialStateValue', {
        get: function () {
          var t, e;
          if (this.__cache.initialStateValue)
            return this.__cache.initialStateValue;
          if ('parallel' === this.type)
            e = gt(
              this.states,
              function (t) {
                return t.initialStateValue || Ne;
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
            e = me(this.states[this.initial])
              ? this.initial
              : (((t = {})[this.initial] =
                  this.states[this.initial].initialStateValue),
                t);
          } else e = {};
          return (
            (this.__cache.initialStateValue = e), this.__cache.initialStateValue
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
              Pt(e.target) && je(e.target)
                ? pt(
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
          return me(this)
            ? [this]
            : 'compound' !== this.type || this.initial
            ? bt(
                mt(this.initialStateValue).map(function (e) {
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
        var e = at(t),
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
        if (ct(this.states).length)
          return {
            current: t || this.initialStateValue,
            states: gt(
              this.states,
              function (e, n) {
                if (!t) return e.historyValue();
                var r = Pt(t) ? void 0 : t[n];
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
            ? bt(
                mt(r).map(function (t) {
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
              for (var a = it(o), u = a.next(); !u.done; u = a.next()) {
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
        return Pt(a)
          ? [n.getStateNode(a)]
          : bt(
              mt(a).map(function (t) {
                return 'deep' === e.history
                  ? n.getFromRelativePath(t)
                  : [n.states[t[0]]];
              })
            );
      }),
      Object.defineProperty(t.prototype, 'stateIds', {
        get: function () {
          var t = this,
            e = bt(
              ct(this.states).map(function (e) {
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
              for (var a = it(ct(o)), u = a.next(); !u.done; u = a.next()) {
                var s = o[u.value];
                if (s.states)
                  try {
                    for (
                      var c = ((n = void 0), it(s.events)), f = c.next();
                      !f.done;
                      f = c.next()
                    ) {
                      var l = f.value;
                      i.add('' + l);
                    }
                  } catch (d) {
                    n = { error: d };
                  } finally {
                    try {
                      f && !f.done && (r = c.return) && r.call(c);
                    } finally {
                      if (n) throw n.error;
                    }
                  }
              }
            } catch (h) {
              t = { error: h };
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
            if (!Pt(t)) return t;
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
            if (void 0 !== t && '' !== t) return wt(t);
          })(t.target),
          r =
            'internal' in t
              ? t.internal
              : !n ||
                n.some(function (t) {
                  return Pt(t) && t[0] === e.delimiter;
                }),
          o = this.machine.options.guards,
          i = this.resolveTarget(n),
          a = rt(rt({}, t), {
            actions: se(wt(t.actions)),
            cond: Bt(t.cond, o),
            target: i,
            source: this,
            internal: r,
            eventType: t.event,
            toJSON: function () {
              return rt(rt({}, a), {
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
              s = ot(o, ['*']);
            n = bt(
              ct(s)
                .map(function (t) {
                  return Dt(t, s[t]);
                })
                .concat(Dt('*', u))
            );
          }
        else n = [];
        var c = this.config.always ? Dt('', this.config.always) : [],
          f = this.config.onDone
            ? Dt(String(pe(this.id)), this.config.onDone)
            : [],
          l = bt(
            this.invoke.map(function (t) {
              var e = [];
              return (
                t.onDone &&
                  e.push.apply(e, ut([], at(Dt(String(ve(t.id)), t.onDone)))),
                t.onError &&
                  e.push.apply(e, ut([], at(Dt(String(ge(t.id)), t.onError)))),
                e
              );
            })
          ),
          d = this.after,
          h = bt(
            ut(ut(ut(ut([], at(f)), at(l)), at(n)), at(c)).map(function (t) {
              return wt(t).map(function (t) {
                return r.formatTransition(t);
              });
            })
          );
        try {
          for (var p = it(d), v = p.next(); !v.done; v = p.next()) {
            var g = v.value;
            h.push(g);
          }
        } catch (y) {
          t = { error: y };
        } finally {
          try {
            v && !v.done && (e = p.return) && e.call(p);
          } finally {
            if (t) throw t.error;
          }
        }
        return h;
      }),
      t
    );
  })();
function Fe(t, e) {
  return new Le(t, e);
}
var Me = { deferEvents: !1 },
  De = (function () {
    function t(t) {
      (this.processingEvent = !1),
        (this.queue = []),
        (this.initialized = !1),
        (this.options = rt(rt({}, Me), t));
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
  $e = new Map(),
  ze = 0,
  Ve = function () {
    return 'x:' + ze++;
  },
  He = function (t, e) {
    return $e.set(t, e), t;
  },
  We = function (t) {
    return $e.get(t);
  },
  Ye = function (t) {
    $e.delete(t);
  };
function qe() {
  return 'undefined' != typeof self
    ? self
    : 'undefined' != typeof window
    ? window
    : 'undefined' != typeof global
    ? global
    : void 0;
}
function Ge(t) {
  if (qe()) {
    var e = (function () {
      var t = qe();
      if (t && '__xstate__' in t) return t.__xstate__;
    })();
    e && e.register(t);
  }
}
function Ke(t, e) {
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
          var i = Vt(t, e, n);
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
      rt(
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
var Je,
  Qe,
  Ze = { sync: !1, autoForward: !1 };
((Qe = Je || (Je = {}))[(Qe.NotStarted = 0)] = 'NotStarted'),
  (Qe[(Qe.Running = 1)] = 'Running'),
  (Qe[(Qe.Stopped = 2)] = 'Stopped');
var Xe = (function () {
  function t(e, n) {
    var r = this;
    void 0 === n && (n = t.defaultOptions),
      (this.machine = e),
      (this.scheduler = new De()),
      (this.delayedEventsMap = {}),
      (this.listeners = new Set()),
      (this.contextListeners = new Set()),
      (this.stopListeners = new Set()),
      (this.doneListeners = new Set()),
      (this.eventListeners = new Set()),
      (this.sendListeners = new Set()),
      (this.initialized = !1),
      (this.status = Je.NotStarted),
      (this.children = new Map()),
      (this.forwardTo = new Set()),
      (this.init = this.start),
      (this.send = function (t, e) {
        if (Ct(t)) return r.batch(t), r.state;
        var n = Mt(Ft(t, e));
        if (r.status === Je.Stopped) return r.state;
        if (r.status !== Je.Running && !r.options.deferEvents)
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
          o = r.parent && (e === Nt.Parent || r.parent.id === e),
          i = o
            ? r.parent
            : Pt(e)
            ? r.children.get(e) || We(e)
            : (n = e) && 'function' == typeof n.send
            ? e
            : void 0;
        if (i)
          'machine' in i
            ? i.send(
                rt(rt({}, t), {
                  name: t.name === ee ? '' + ge(r.id) : t.name,
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
    var o = rt(rt({}, t.defaultOptions), n),
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
      (this.scheduler = new De({ deferEvents: this.options.deferEvents })),
      (this.sessionId = Ve());
  }
  return (
    Object.defineProperty(t.prototype, 'initialState', {
      get: function () {
        var t = this;
        return this._initialState
          ? this._initialState
          : Be(this, function () {
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
        for (var o = it(t.actions), i = o.next(); !i.done; i = o.next()) {
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
        f = this;
      if (
        ((t._sessionid = this.sessionId),
        (this._state = t),
        this.options.execute && this.execute(this.state),
        this.children.forEach(function (t) {
          f.state.children[t.id] = t;
        }),
        this.devTools && this.devTools.send(e.data, t),
        t.event)
      )
        try {
          for (
            var l = it(this.eventListeners), d = l.next();
            !d.done;
            d = l.next()
          ) {
            (0, d.value)(t.event);
          }
        } catch (S) {
          n = { error: S };
        } finally {
          try {
            d && !d.done && (r = l.return) && r.call(l);
          } finally {
            if (n) throw n.error;
          }
        }
      try {
        for (var h = it(this.listeners), p = h.next(); !p.done; p = h.next()) {
          (0, p.value)(t, t.event);
        }
      } catch (E) {
        o = { error: E };
      } finally {
        try {
          p && !p.done && (i = h.return) && i.call(h);
        } finally {
          if (o) throw o.error;
        }
      }
      try {
        for (
          var v = it(this.contextListeners), g = v.next();
          !g.done;
          g = v.next()
        ) {
          (0, g.value)(
            this.state.context,
            this.state.history ? this.state.history.context : void 0
          );
        }
      } catch (A) {
        a = { error: A };
      } finally {
        try {
          g && !g.done && (u = v.return) && u.call(v);
        } finally {
          if (a) throw a.error;
        }
      }
      var y = Ie(t.configuration || [], this.machine);
      if (this.state.configuration && y) {
        var m = t.configuration.find(function (t) {
            return 'final' === t.type && t.parent === f.machine;
          }),
          b = m && m.doneData ? St(m.doneData, t.context, e) : void 0;
        try {
          for (
            var _ = it(this.doneListeners), w = _.next();
            !w.done;
            w = _.next()
          ) {
            (0, w.value)(ve(this.id, b));
          }
        } catch (x) {
          s = { error: x };
        } finally {
          try {
            w && !w.done && (c = _.return) && c.call(_);
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
        this.status === Je.Running && t(this.state, this.state.event),
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
        this.status === Je.Running && r(this.state),
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
      if (this.status === Je.Running) return this;
      He(this.sessionId, this),
        (this.initialized = !0),
        (this.status = Je.Running);
      var n =
        void 0 === t
          ? this.initialState
          : Be(this, function () {
              return !Pt((n = t)) && 'value' in n && 'history' in n
                ? e.machine.resolveState(t)
                : e.machine.resolveState(Te.from(t, e.machine.context));
              var n;
            });
      return (
        this.options.devTools && this.attachDev(),
        this.scheduler.initialize(function () {
          e.update(n, ie);
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
        f = this;
      try {
        for (var l = it(this.listeners), d = l.next(); !d.done; d = l.next()) {
          var h = d.value;
          this.listeners.delete(h);
        }
      } catch (E) {
        t = { error: E };
      } finally {
        try {
          d && !d.done && (e = l.return) && e.call(l);
        } finally {
          if (t) throw t.error;
        }
      }
      try {
        for (
          var p = it(this.stopListeners), v = p.next();
          !v.done;
          v = p.next()
        ) {
          (h = v.value)(), this.stopListeners.delete(h);
        }
      } catch (A) {
        n = { error: A };
      } finally {
        try {
          v && !v.done && (r = p.return) && r.call(p);
        } finally {
          if (n) throw n.error;
        }
      }
      try {
        for (
          var g = it(this.contextListeners), y = g.next();
          !y.done;
          y = g.next()
        ) {
          h = y.value;
          this.contextListeners.delete(h);
        }
      } catch (x) {
        o = { error: x };
      } finally {
        try {
          y && !y.done && (i = g.return) && i.call(g);
        } finally {
          if (o) throw o.error;
        }
      }
      try {
        for (
          var m = it(this.doneListeners), b = m.next();
          !b.done;
          b = m.next()
        ) {
          h = b.value;
          this.doneListeners.delete(h);
        }
      } catch (I) {
        a = { error: I };
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
            var r = it(t.definition.exit), o = r.next();
            !o.done;
            o = r.next()
          ) {
            var i = o.value;
            f.exec(i, f.state);
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
          Tt(t.stop) && t.stop();
        });
      try {
        for (
          var _ = it(ct(this.delayedEventsMap)), w = _.next();
          !w.done;
          w = _.next()
        ) {
          var S = w.value;
          this.clock.clearTimeout(this.delayedEventsMap[S]);
        }
      } catch (C) {
        s = { error: C };
      } finally {
        try {
          w && !w.done && (c = _.return) && c.call(_);
        } finally {
          if (s) throw s.error;
        }
      }
      return (
        this.scheduler.clear(),
        (this.initialized = !1),
        (this.status = Je.Stopped),
        Ye(this.sessionId),
        this
      );
    }),
    (t.prototype.batch = function (t) {
      var e = this;
      if (this.status === Je.NotStarted && this.options.deferEvents);
      else if (this.status !== Je.Running)
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
            var n = Mt(t);
            e.forward(n),
              (o = Be(e, function () {
                return e.machine.transition(o, n);
              })),
              a.push.apply(
                a,
                ut(
                  [],
                  at(
                    o.actions.map(function (t) {
                      return (
                        (n = o),
                        (r = (e = t).exec),
                        rt(rt({}, e), {
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
          for (var s = it(t), c = s.next(); !c.done; c = s.next()) {
            u(c.value);
          }
        } catch (f) {
          n = { error: f };
        } finally {
          try {
            c && !c.done && (r = s.return) && r.call(s);
          } finally {
            if (n) throw n.error;
          }
        }
        (o.changed = i), (o.actions = a), e.update(o, Mt(t[t.length - 1]));
      });
    }),
    (t.prototype.sender = function (t) {
      return this.send.bind(this, t);
    }),
    (t.prototype.nextState = function (t) {
      var e = this,
        n = Mt(t);
      if (
        0 === n.name.indexOf(te) &&
        !this.state.nextEvents.some(function (t) {
          return 0 === t.indexOf(te);
        })
      )
        throw n.data.data;
      return Be(this, function () {
        return e.machine.transition(e.state, n);
      });
    }),
    (t.prototype.forward = function (t) {
      var e, n;
      try {
        for (var r = it(this.forwardTo), o = r.next(); !o.done; o = r.next()) {
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
        i = t.exec || ae(t.type, n),
        a = Tt(i) ? i : i ? i.exec : t.exec;
      if (a)
        try {
          return a(r, o.data, { action: t, state: this.state, _event: o });
        } catch (b) {
          throw (
            (this.parent && this.parent.send({ type: 'xstate.error', data: b }),
            b)
          );
        }
      switch (t.type) {
        case qt:
          var u = t;
          if ('number' == typeof u.delay) return void this.defer(u);
          u.to ? this.sendTo(u._event, u.to) : this.send(u._event);
          break;
        case Gt:
          this.cancel(t.sendId);
          break;
        case Ht:
          var s = t.activity;
          if (!this.state.activities[s.id || s.type]) break;
          if (s.type === Rt.Invoke) {
            var c = zt(s.src),
              f = this.machine.options.services
                ? this.machine.options.services[c.type]
                : void 0,
              l = s.id,
              d = s.data,
              h = 'autoForward' in s ? s.autoForward : !!s.forward;
            if (!f) return;
            var p = d ? St(d, r, o) : void 0;
            if ('string' == typeof f) return;
            var v = Tt(f) ? f(r, o.data, { data: p, src: c }) : f;
            if (!v) return;
            var g = void 0;
            Ot(v) && ((v = p ? v.withContext(p) : v), (g = { autoForward: h })),
              this.spawn(v, l, g);
          } else this.spawnActivity(s);
          break;
        case Wt:
          this.stopChild(t.activity.id);
          break;
        case Qt:
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
      e && (this.removeChild(t), Tt(e.stop) && e.stop());
    }),
    (t.prototype.spawn = function (t, e, n) {
      if (Et(t)) return this.spawnPromise(Promise.resolve(t), e);
      if (Tt(t)) return this.spawnCallback(t, e);
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
            return 'subscribe' in t && Tt(t.subscribe);
          } catch (e) {
            return !1;
          }
        })(t)
      )
        return this.spawnObservable(t, e);
      if (Ot(t)) return this.spawnMachine(t, rt(rt({}, n), { id: e }));
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
          rt(rt({}, this.options), { parent: this, id: n.id || e.id })
        ),
        i = rt(rt({}, Ze), n);
      i.sync &&
        o.onTransition(function (t) {
          r.send(ne, { state: t, id: o.id });
        });
      var a = o;
      return (
        this.children.set(o.id, a),
        i.autoForward && this.forwardTo.add(o.id),
        o
          .onDone(function (t) {
            r.removeChild(o.id), r.send(Mt(t, { origin: o.id }));
          })
          .start(),
        a
      );
    }),
    (t.prototype.spawnBehavior = function (t, e) {
      var n = Ke(t, { id: e, parent: this });
      return this.children.set(e, n), n;
    }),
    (t.prototype.spawnPromise = function (t, e) {
      var n,
        r = this,
        o = !1;
      t.then(
        function (t) {
          o || ((n = t), r.removeChild(e), r.send(Mt(ve(e, t), { origin: e })));
        },
        function (t) {
          if (!o) {
            r.removeChild(e);
            var n = ge(e, t);
            try {
              r.send(Mt(n, { origin: e }));
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
          var o = Vt(e, n, r),
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
              i || o.send(Mt(t, { origin: e }));
          },
          function (t) {
            a.add(t);
          }
        );
      } catch (c) {
        this.send(ge(e, c));
      }
      if (Et(r)) return this.spawnPromise(r, e);
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
          (i = !0), Tt(r) && r();
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
            (n = t), r.send(Mt(t, { origin: e }));
          },
          function (t) {
            r.removeChild(e), r.send(Mt(ge(e, t), { origin: e }));
          },
          function () {
            r.removeChild(e), r.send(Mt(ve(e), { origin: e }));
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
      var t = qe();
      if (this.options.devTools && t) {
        if (t.__REDUX_DEVTOOLS_EXTENSION__) {
          var e =
            'object' == typeof this.options.devTools
              ? this.options.devTools
              : void 0;
          (this.devTools = t.__REDUX_DEVTOOLS_EXTENSION__.connect(
            rt(
              rt(
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
              { features: rt({ jump: !1, skip: !1 }, e ? e.features : void 0) }
            ),
            this.machine
          )),
            this.devTools.init(this.state);
        }
        Ge(this);
      }
    }),
    (t.prototype.toJSON = function () {
      return { id: this.id };
    }),
    (t.prototype[kt] = function () {
      return this;
    }),
    (t.prototype.getSnapshot = function () {
      return this.status === Je.NotStarted ? this.initialState : this._state;
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
        logger: (typeof self !== 'undefined' ? self : global).console.log.bind(
          console
        ),
        devTools: !1,
      };
    })()),
    (t.interpret = en),
    t
  );
})();
function tn(t, e) {
  var n = (function (t) {
    return Pt(t)
      ? rt(rt({}, Ze), { name: t })
      : rt(rt(rt({}, Ze), { name: Lt() }), t);
  })(e);
  return (function (e) {
    return e ? e.spawn(t, n.name, n) : Oe(t, n.name);
  })(Pe[Pe.length - 1]);
}
function en(t, e) {
  return new Xe(t, e);
}
var nn,
  rn,
  on =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : {},
  an = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
(nn = an),
  (rn = an.exports),
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
      f = 9007199254740991,
      l = NaN,
      d = 4294967295,
      h = [
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
      p = '[object Arguments]',
      v = '[object Array]',
      g = '[object Boolean]',
      y = '[object Date]',
      m = '[object Error]',
      b = '[object Function]',
      _ = '[object GeneratorFunction]',
      w = '[object Map]',
      S = '[object Number]',
      E = '[object Object]',
      A = '[object Promise]',
      x = '[object RegExp]',
      I = '[object Set]',
      C = '[object String]',
      T = '[object Symbol]',
      P = '[object WeakMap]',
      B = '[object ArrayBuffer]',
      k = '[object DataView]',
      O = '[object Float32Array]',
      R = '[object Float64Array]',
      U = '[object Int8Array]',
      N = '[object Int16Array]',
      j = '[object Int32Array]',
      L = '[object Uint8Array]',
      F = '[object Uint8ClampedArray]',
      M = '[object Uint16Array]',
      D = '[object Uint32Array]',
      $ = /\b__p \+= '';/g,
      z = /\b(__p \+=) '' \+/g,
      V = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
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
      ft = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
      lt = /\w*$/,
      dt = /^[-+]0x[0-9a-f]+$/i,
      ht = /^0b[01]+$/i,
      pt = /^\[object .+?Constructor\]$/,
      vt = /^0o[0-7]+$/i,
      gt = /^(?:0|[1-9]\d*)$/,
      yt = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
      mt = /($^)/,
      bt = /['\n\r\u2028\u2029\\]/g,
      _t = '\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff',
      wt = '\\u2700-\\u27bf',
      St = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      Et = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      At = '\\ufe0e\\ufe0f',
      xt =
        '\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
      It = "['’]",
      Ct = '[\\ud800-\\udfff]',
      Tt = '[' + xt + ']',
      Pt = '[' + _t + ']',
      Bt = '\\d+',
      kt = '[\\u2700-\\u27bf]',
      Ot = '[' + St + ']',
      Rt = '[^\\ud800-\\udfff' + xt + Bt + wt + St + Et + ']',
      Ut = '\\ud83c[\\udffb-\\udfff]',
      Nt = '[^\\ud800-\\udfff]',
      jt = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      Lt = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      Ft = '[' + Et + ']',
      Mt = '(?:' + Ot + '|' + Rt + ')',
      Dt = '(?:' + Ft + '|' + Rt + ')',
      $t = "(?:['’](?:d|ll|m|re|s|t|ve))?",
      zt = "(?:['’](?:D|LL|M|RE|S|T|VE))?",
      Vt = '(?:' + Pt + '|' + Ut + ')?',
      Ht = '[\\ufe0e\\ufe0f]?',
      Wt =
        Ht +
        Vt +
        '(?:\\u200d(?:' +
        [Nt, jt, Lt].join('|') +
        ')' +
        Ht +
        Vt +
        ')*',
      Yt = '(?:' + [kt, jt, Lt].join('|') + ')' + Wt,
      qt = '(?:' + [Nt + Pt + '?', Pt, jt, Lt, Ct].join('|') + ')',
      Gt = RegExp(It, 'g'),
      Kt = RegExp(Pt, 'g'),
      Jt = RegExp(Ut + '(?=' + Ut + ')|' + qt + Wt, 'g'),
      Qt = RegExp(
        [
          Ft + '?' + Ot + '+' + $t + '(?=' + [Tt, Ft, '$'].join('|') + ')',
          Dt + '+' + zt + '(?=' + [Tt, Ft + Mt, '$'].join('|') + ')',
          Ft + '?' + Mt + '+' + $t,
          Ft + '+' + zt,
          '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
          '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
          Bt,
          Yt,
        ].join('|'),
        'g'
      ),
      Zt = RegExp('[\\u200d\\ud800-\\udfff' + _t + At + ']'),
      Xt = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
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
    (ne[O] =
      ne[R] =
      ne[U] =
      ne[N] =
      ne[j] =
      ne[L] =
      ne[F] =
      ne[M] =
      ne[D] =
        !0),
      (ne[p] =
        ne[v] =
        ne[B] =
        ne[g] =
        ne[k] =
        ne[y] =
        ne[m] =
        ne[b] =
        ne[w] =
        ne[S] =
        ne[E] =
        ne[x] =
        ne[I] =
        ne[C] =
        ne[P] =
          !1);
    var re = {};
    (re[p] =
      re[v] =
      re[B] =
      re[k] =
      re[g] =
      re[y] =
      re[O] =
      re[R] =
      re[U] =
      re[N] =
      re[j] =
      re[w] =
      re[S] =
      re[E] =
      re[x] =
      re[I] =
      re[C] =
      re[T] =
      re[L] =
      re[F] =
      re[M] =
      re[D] =
        !0),
      (re[m] = re[b] = re[P] = !1);
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
      ue = 'object' == typeof on && on && on.Object === Object && on,
      se = 'object' == typeof self && self && self.Object === Object && self,
      ce = ue || se || Function('return this')(),
      fe = rn && !rn.nodeType && rn,
      le = fe && nn && !nn.nodeType && nn,
      de = le && le.exports === fe,
      he = de && ue.process,
      pe = (function () {
        try {
          var t = le && le.require && le.require('util').types;
          return t || (he && he.binding && he.binding('util'));
        } catch (e) {}
      })(),
      ve = pe && pe.isArrayBuffer,
      ge = pe && pe.isDate,
      ye = pe && pe.isMap,
      me = pe && pe.isRegExp,
      be = pe && pe.isSet,
      _e = pe && pe.isTypedArray;
    function we(t, e, n) {
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
    function Ee(t, e) {
      for (
        var n = -1, r = null == t ? 0 : t.length;
        ++n < r && !1 !== e(t[n], n, t);

      );
      return t;
    }
    function Ae(t, e) {
      for (var n = null == t ? 0 : t.length; n-- && !1 !== e(t[n], n, t); );
      return t;
    }
    function xe(t, e) {
      for (var n = -1, r = null == t ? 0 : t.length; ++n < r; )
        if (!e(t[n], n, t)) return !1;
      return !0;
    }
    function Ie(t, e) {
      for (var n = -1, r = null == t ? 0 : t.length, o = 0, i = []; ++n < r; ) {
        var a = t[n];
        e(a, n, t) && (i[o++] = a);
      }
      return i;
    }
    function Ce(t, e) {
      return !(null == t || !t.length) && Le(t, e, 0) > -1;
    }
    function Te(t, e, n) {
      for (var r = -1, o = null == t ? 0 : t.length; ++r < o; )
        if (n(e, t[r])) return !0;
      return !1;
    }
    function Pe(t, e) {
      for (var n = -1, r = null == t ? 0 : t.length, o = Array(r); ++n < r; )
        o[n] = e(t[n], n, t);
      return o;
    }
    function Be(t, e) {
      for (var n = -1, r = e.length, o = t.length; ++n < r; ) t[o + n] = e[n];
      return t;
    }
    function ke(t, e, n, r) {
      var o = -1,
        i = null == t ? 0 : t.length;
      for (r && i && (n = t[++o]); ++o < i; ) n = e(n, t[o], o, t);
      return n;
    }
    function Oe(t, e, n, r) {
      var o = null == t ? 0 : t.length;
      for (r && o && (n = t[--o]); o--; ) n = e(n, t[o], o, t);
      return n;
    }
    function Re(t, e) {
      for (var n = -1, r = null == t ? 0 : t.length; ++n < r; )
        if (e(t[n], n, t)) return !0;
      return !1;
    }
    var Ue = $e('length');
    function Ne(t, e, n) {
      var r;
      return (
        n(t, function (t, n, o) {
          if (e(t, n, o)) return (r = n), !1;
        }),
        r
      );
    }
    function je(t, e, n, r) {
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
        : je(t, Me, n);
    }
    function Fe(t, e, n, r) {
      for (var o = n - 1, i = t.length; ++o < i; ) if (r(t[o], e)) return o;
      return -1;
    }
    function Me(t) {
      return t != t;
    }
    function De(t, e) {
      var n = null == t ? 0 : t.length;
      return n ? He(t, e) / n : l;
    }
    function $e(e) {
      return function (n) {
        return null == n ? t : n[e];
      };
    }
    function ze(e) {
      return function (n) {
        return null == e ? t : e[n];
      };
    }
    function Ve(t, e, n, r, o) {
      return (
        o(t, function (t, o, i) {
          n = r ? ((r = !1), t) : e(n, t, o, i);
        }),
        n
      );
    }
    function He(e, n) {
      for (var r, o = -1, i = e.length; ++o < i; ) {
        var a = n(e[o]);
        a !== t && (r = r === t ? a : r + a);
      }
      return r;
    }
    function We(t, e) {
      for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n);
      return r;
    }
    function Ye(t) {
      return t ? t.slice(0, hn(t) + 1).replace(nt, '') : t;
    }
    function qe(t) {
      return function (e) {
        return t(e);
      };
    }
    function Ge(t, e) {
      return Pe(e, function (e) {
        return t[e];
      });
    }
    function Ke(t, e) {
      return t.has(e);
    }
    function Je(t, e) {
      for (var n = -1, r = t.length; ++n < r && Le(e, t[n], 0) > -1; );
      return n;
    }
    function Qe(t, e) {
      for (var n = t.length; n-- && Le(e, t[n], 0) > -1; );
      return n;
    }
    function Ze(t, e) {
      for (var n = t.length, r = 0; n--; ) t[n] === e && ++r;
      return r;
    }
    var Xe = ze({
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
      tn = ze({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      });
    function en(t) {
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
    function fn(t) {
      var e = -1,
        n = Array(t.size);
      return (
        t.forEach(function (t) {
          n[++e] = t;
        }),
        n
      );
    }
    function ln(t) {
      return an(t)
        ? (function (t) {
            for (var e = (Jt.lastIndex = 0); Jt.test(t); ) ++e;
            return e;
          })(t)
        : Ue(t);
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
    function hn(t) {
      for (var e = t.length; e-- && rt.test(t.charAt(e)); );
      return e;
    }
    var pn = ze({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
      }),
      vn = (function rt(_t) {
        var wt,
          St = (_t =
            null == _t ? ce : vn.defaults(ce.Object(), _t, vn.pick(ce, te)))
            .Array,
          Et = _t.Date,
          At = _t.Error,
          xt = _t.Function,
          It = _t.Math,
          Ct = _t.Object,
          Tt = _t.RegExp,
          Pt = _t.String,
          Bt = _t.TypeError,
          kt = St.prototype,
          Ot = xt.prototype,
          Rt = Ct.prototype,
          Ut = _t['__core-js_shared__'],
          Nt = Ot.toString,
          jt = Rt.hasOwnProperty,
          Lt = 0,
          Ft = (wt = /[^.]+$/.exec((Ut && Ut.keys && Ut.keys.IE_PROTO) || ''))
            ? 'Symbol(src)_1.' + wt
            : '',
          Mt = Rt.toString,
          Dt = Nt.call(Ct),
          $t = ce._,
          zt = Tt(
            '^' +
              Nt.call(jt)
                .replace(tt, '\\$&')
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  '$1.*?'
                ) +
              '$'
          ),
          Vt = de ? _t.Buffer : t,
          Ht = _t.Symbol,
          Wt = _t.Uint8Array,
          Yt = Vt ? Vt.allocUnsafe : t,
          qt = sn(Ct.getPrototypeOf, Ct),
          Jt = Ct.create,
          Zt = Rt.propertyIsEnumerable,
          oe = kt.splice,
          ue = Ht ? Ht.isConcatSpreadable : t,
          se = Ht ? Ht.iterator : t,
          fe = Ht ? Ht.toStringTag : t,
          le = (function () {
            try {
              var t = hi(Ct, 'defineProperty');
              return t({}, '', {}), t;
            } catch (e) {}
          })(),
          he = _t.clearTimeout !== ce.clearTimeout && _t.clearTimeout,
          pe = Et && Et.now !== ce.Date.now && Et.now,
          Ue = _t.setTimeout !== ce.setTimeout && _t.setTimeout,
          ze = It.ceil,
          nn = It.floor,
          rn = Ct.getOwnPropertySymbols,
          on = Vt ? Vt.isBuffer : t,
          gn = _t.isFinite,
          yn = kt.join,
          mn = sn(Ct.keys, Ct),
          bn = It.max,
          _n = It.min,
          wn = Et.now,
          Sn = _t.parseInt,
          En = It.random,
          An = kt.reverse,
          xn = hi(_t, 'DataView'),
          In = hi(_t, 'Map'),
          Cn = hi(_t, 'Promise'),
          Tn = hi(_t, 'Set'),
          Pn = hi(_t, 'WeakMap'),
          Bn = hi(Ct, 'create'),
          kn = Pn && new Pn(),
          On = {},
          Rn = Vi(xn),
          Un = Vi(In),
          Nn = Vi(Cn),
          jn = Vi(Tn),
          Ln = Vi(Pn),
          Fn = Ht ? Ht.prototype : t,
          Mn = Fn ? Fn.valueOf : t,
          Dn = Fn ? Fn.toString : t;
        function $n(t) {
          if (au(t) && !Ka(t) && !(t instanceof Wn)) {
            if (t instanceof Hn) return t;
            if (jt.call(t, '__wrapped__')) return Hi(t);
          }
          return new Hn(t);
        }
        var zn = (function () {
          function e() {}
          return function (n) {
            if (!iu(n)) return {};
            if (Jt) return Jt(n);
            e.prototype = n;
            var r = new e();
            return (e.prototype = t), r;
          };
        })();
        function Vn() {}
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
            i = !n && !r && !o && pu(t),
            a = n || r || o || i,
            u = a ? We(t.length, Pt) : [],
            s = u.length;
          for (var c in t)
            (!e && !jt.call(t, c)) ||
              (a &&
                ('length' == c ||
                  (o && ('offset' == c || 'parent' == c)) ||
                  (i &&
                    ('buffer' == c ||
                      'byteLength' == c ||
                      'byteOffset' == c)) ||
                  _i(c, s))) ||
              u.push(c);
          return u;
        }
        function Zn(e) {
          var n = e.length;
          return n ? e[Kr(0, n - 1)] : t;
        }
        function Xn(t, e) {
          return Li(ko(t), sr(e, 0, t.length));
        }
        function tr(t) {
          return Li(ko(t));
        }
        function er(e, n, r) {
          ((r !== t && !Wa(e[n], r)) || (r === t && !(n in e))) && ar(e, n, r);
        }
        function nr(e, n, r) {
          var o = e[n];
          (jt.call(e, n) && Wa(o, r) && (r !== t || n in e)) || ar(e, n, r);
        }
        function rr(t, e) {
          for (var n = t.length; n--; ) if (Wa(t[n][0], e)) return n;
          return -1;
        }
        function or(t, e, n, r) {
          return (
            hr(t, function (t, o, i) {
              e(r, t, n(t), i);
            }),
            r
          );
        }
        function ir(t, e) {
          return t && Oo(e, ju(e), t);
        }
        function ar(t, e, n) {
          '__proto__' == e && le
            ? le(t, e, {
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
            f = 4 & n;
          if ((r && (u = i ? r(e, o, i, a) : r(e)), u !== t)) return u;
          if (!iu(e)) return e;
          var l = Ka(e);
          if (l) {
            if (
              ((u = (function (t) {
                var e = t.length,
                  n = new t.constructor(e);
                return (
                  e &&
                    'string' == typeof t[0] &&
                    jt.call(t, 'index') &&
                    ((n.index = t.index), (n.input = t.input)),
                  n
                );
              })(e)),
              !s)
            )
              return ko(e, u);
          } else {
            var d = gi(e),
              h = d == b || d == _;
            if (Xa(e)) return xo(e, s);
            if (d == E || d == p || (h && !i)) {
              if (((u = c || h ? {} : mi(e)), !s))
                return c
                  ? (function (t, e) {
                      return Oo(t, vi(t), e);
                    })(
                      e,
                      (function (t, e) {
                        return t && Oo(e, Lu(e), t);
                      })(u, e)
                    )
                  : (function (t, e) {
                      return Oo(t, pi(t), e);
                    })(e, ir(u, e));
            } else {
              if (!re[d]) return i ? e : {};
              u = (function (t, e, n) {
                var r,
                  o = t.constructor;
                switch (e) {
                  case B:
                    return Io(t);
                  case g:
                  case y:
                    return new o(+t);
                  case k:
                    return (function (t, e) {
                      var n = e ? Io(t.buffer) : t.buffer;
                      return new t.constructor(n, t.byteOffset, t.byteLength);
                    })(t, n);
                  case O:
                  case R:
                  case U:
                  case N:
                  case j:
                  case L:
                  case F:
                  case M:
                  case D:
                    return Co(t, n);
                  case w:
                    return new o();
                  case S:
                  case C:
                    return new o(t);
                  case x:
                    return (function (t) {
                      var e = new t.constructor(t.source, lt.exec(t));
                      return (e.lastIndex = t.lastIndex), e;
                    })(t);
                  case I:
                    return new o();
                  case T:
                    return (r = t), Mn ? Ct(Mn.call(r)) : {};
                }
              })(e, d, s);
            }
          }
          a || (a = new Jn());
          var v = a.get(e);
          if (v) return v;
          a.set(e, u),
            lu(e)
              ? e.forEach(function (t) {
                  u.add(cr(t, n, r, t, e, a));
                })
              : uu(e) &&
                e.forEach(function (t, o) {
                  u.set(o, cr(t, n, r, o, e, a));
                });
          var m = l ? t : (f ? (c ? ai : ii) : c ? Lu : ju)(e);
          return (
            Ee(m || e, function (t, o) {
              m && (t = e[(o = t)]), nr(u, o, cr(t, n, r, o, e, a));
            }),
            u
          );
        }
        function fr(e, n, r) {
          var o = r.length;
          if (null == e) return !o;
          for (e = Ct(e); o--; ) {
            var i = r[o],
              a = n[i],
              u = e[i];
            if ((u === t && !(i in e)) || !a(u)) return !1;
          }
          return !0;
        }
        function lr(n, r, o) {
          if ('function' != typeof n) throw new Bt(e);
          return Ri(function () {
            n.apply(t, o);
          }, r);
        }
        function dr(t, e, n, r) {
          var o = -1,
            i = Ce,
            a = !0,
            u = t.length,
            s = [],
            c = e.length;
          if (!u) return s;
          n && (e = Pe(e, qe(n))),
            r
              ? ((i = Te), (a = !1))
              : e.length >= 200 && ((i = Ke), (a = !1), (e = new Kn(e)));
          t: for (; ++o < u; ) {
            var f = t[o],
              l = null == n ? f : n(f);
            if (((f = r || 0 !== f ? f : 0), a && l == l)) {
              for (var d = c; d--; ) if (e[d] === l) continue t;
              s.push(f);
            } else i(e, l, r) || s.push(f);
          }
          return s;
        }
        ($n.templateSettings = {
          escape: G,
          evaluate: K,
          interpolate: J,
          variable: '',
          imports: { _: $n },
        }),
          ($n.prototype = Vn.prototype),
          ($n.prototype.constructor = $n),
          (Hn.prototype = zn(Vn.prototype)),
          (Hn.prototype.constructor = Hn),
          (Wn.prototype = zn(Vn.prototype)),
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
            return jt.call(r, e) ? r[e] : t;
          }),
          (Yn.prototype.has = function (e) {
            var n = this.__data__;
            return Bn ? n[e] !== t : jt.call(n, e);
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
            return r < 0 ? (++this.size, n.push([t, e])) : (n[r][1] = e), this;
          }),
          (Gn.prototype.clear = function () {
            (this.size = 0),
              (this.__data__ = {
                hash: new Yn(),
                map: new (In || qn)(),
                string: new Yn(),
              });
          }),
          (Gn.prototype.delete = function (t) {
            var e = li(this, t).delete(t);
            return (this.size -= e ? 1 : 0), e;
          }),
          (Gn.prototype.get = function (t) {
            return li(this, t).get(t);
          }),
          (Gn.prototype.has = function (t) {
            return li(this, t).has(t);
          }),
          (Gn.prototype.set = function (t, e) {
            var n = li(this, t),
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
              if (!In || r.length < 199)
                return r.push([t, e]), (this.size = ++n.size), this;
              n = this.__data__ = new Gn(r);
            }
            return n.set(t, e), (this.size = n.size), this;
          });
        var hr = No(wr),
          pr = No(Sr, !0);
        function vr(t, e) {
          var n = !0;
          return (
            hr(t, function (t, r, o) {
              return (n = !!e(t, r, o));
            }),
            n
          );
        }
        function gr(e, n, r) {
          for (var o = -1, i = e.length; ++o < i; ) {
            var a = e[o],
              u = n(a);
            if (null != u && (s === t ? u == u && !hu(u) : r(u, s)))
              var s = u,
                c = a;
          }
          return c;
        }
        function yr(t, e) {
          var n = [];
          return (
            hr(t, function (t, r, o) {
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
                : Be(o, u)
              : r || (o[o.length] = u);
          }
          return o;
        }
        var br = jo(),
          _r = jo(!0);
        function wr(t, e) {
          return t && br(t, e, ju);
        }
        function Sr(t, e) {
          return t && _r(t, e, ju);
        }
        function Er(t, e) {
          return Ie(e, function (e) {
            return nu(t[e]);
          });
        }
        function Ar(e, n) {
          for (var r = 0, o = (n = wo(n, e)).length; null != e && r < o; )
            e = e[zi(n[r++])];
          return r && r == o ? e : t;
        }
        function xr(t, e, n) {
          var r = e(t);
          return Ka(t) ? r : Be(r, n(t));
        }
        function Ir(e) {
          return null == e
            ? e === t
              ? '[object Undefined]'
              : '[object Null]'
            : fe && fe in Ct(e)
            ? (function (e) {
                var n = jt.call(e, fe),
                  r = e[fe];
                try {
                  e[fe] = t;
                  var o = !0;
                } catch (a) {}
                var i = Mt.call(e);
                return o && (n ? (e[fe] = r) : delete e[fe]), i;
              })(e)
            : (function (t) {
                return Mt.call(t);
              })(e);
        }
        function Cr(t, e) {
          return t > e;
        }
        function Tr(t, e) {
          return null != t && jt.call(t, e);
        }
        function Pr(t, e) {
          return null != t && e in Ct(t);
        }
        function Br(e, n, r) {
          for (
            var o = r ? Te : Ce,
              i = e[0].length,
              a = e.length,
              u = a,
              s = St(a),
              c = 1 / 0,
              f = [];
            u--;

          ) {
            var l = e[u];
            u && n && (l = Pe(l, qe(n))),
              (c = _n(l.length, c)),
              (s[u] =
                !r && (n || (i >= 120 && l.length >= 120))
                  ? new Kn(u && l)
                  : t);
          }
          l = e[0];
          var d = -1,
            h = s[0];
          t: for (; ++d < i && f.length < c; ) {
            var p = l[d],
              v = n ? n(p) : p;
            if (((p = r || 0 !== p ? p : 0), !(h ? Ke(h, v) : o(f, v, r)))) {
              for (u = a; --u; ) {
                var g = s[u];
                if (!(g ? Ke(g, v) : o(e[u], v, r))) continue t;
              }
              h && h.push(v), f.push(p);
            }
          }
          return f;
        }
        function kr(e, n, r) {
          var o = null == (e = Pi(e, (n = wo(n, e)))) ? e : e[zi(ea(n))];
          return null == o ? t : we(o, e, r);
        }
        function Or(t) {
          return au(t) && Ir(t) == p;
        }
        function Rr(e, n, r, o, i) {
          return (
            e === n ||
            (null == e || null == n || (!au(e) && !au(n))
              ? e != e && n != n
              : (function (e, n, r, o, i, a) {
                  var u = Ka(e),
                    s = Ka(n),
                    c = u ? v : gi(e),
                    f = s ? v : gi(n),
                    l = (c = c == p ? E : c) == E,
                    d = (f = f == p ? E : f) == E,
                    h = c == f;
                  if (h && Xa(e)) {
                    if (!Xa(n)) return !1;
                    (u = !0), (l = !1);
                  }
                  if (h && !l)
                    return (
                      a || (a = new Jn()),
                      u || pu(e)
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
                              case x:
                              case C:
                                return t == e + '';
                              case w:
                                var u = un;
                              case I:
                                var s = 1 & r;
                                if ((u || (u = fn), t.size != e.size && !s))
                                  return !1;
                                var c = a.get(t);
                                if (c) return c == e;
                                (r |= 2), a.set(t, e);
                                var f = ri(u(t), u(e), r, o, i, a);
                                return a.delete(t), f;
                              case T:
                                if (Mn) return Mn.call(t) == Mn.call(e);
                            }
                            return !1;
                          })(e, n, c, r, o, i, a)
                    );
                  if (!(1 & r)) {
                    var b = l && jt.call(e, '__wrapped__'),
                      _ = d && jt.call(n, '__wrapped__');
                    if (b || _) {
                      var A = b ? e.value() : e,
                        P = _ ? n.value() : n;
                      return a || (a = new Jn()), i(A, P, r, o, a);
                    }
                  }
                  return (
                    !!h &&
                    (a || (a = new Jn()),
                    (function (e, n, r, o, i, a) {
                      var u = 1 & r,
                        s = ii(e),
                        c = s.length,
                        f = ii(n).length;
                      if (c != f && !u) return !1;
                      for (var l = c; l--; ) {
                        var d = s[l];
                        if (!(u ? d in n : jt.call(n, d))) return !1;
                      }
                      var h = a.get(e),
                        p = a.get(n);
                      if (h && p) return h == n && p == e;
                      var v = !0;
                      a.set(e, n), a.set(n, e);
                      for (var g = u; ++l < c; ) {
                        var y = e[(d = s[l])],
                          m = n[d];
                        if (o)
                          var b = u ? o(m, y, d, n, e, a) : o(y, m, d, e, n, a);
                        if (!(b === t ? y === m || i(y, m, r, o, a) : b)) {
                          v = !1;
                          break;
                        }
                        g || (g = 'constructor' == d);
                      }
                      if (v && !g) {
                        var _ = e.constructor,
                          w = n.constructor;
                        _ == w ||
                          !('constructor' in e) ||
                          !('constructor' in n) ||
                          ('function' == typeof _ &&
                            _ instanceof _ &&
                            'function' == typeof w &&
                            w instanceof w) ||
                          (v = !1);
                      }
                      return a.delete(e), a.delete(n), v;
                    })(e, n, r, o, i, a))
                  );
                })(e, n, r, o, Rr, i))
          );
        }
        function Ur(e, n, r, o) {
          var i = r.length,
            a = i,
            u = !o;
          if (null == e) return !a;
          for (e = Ct(e); i--; ) {
            var s = r[i];
            if (u && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
          }
          for (; ++i < a; ) {
            var c = (s = r[i])[0],
              f = e[c],
              l = s[1];
            if (u && s[2]) {
              if (f === t && !(c in e)) return !1;
            } else {
              var d = new Jn();
              if (o) var h = o(f, l, c, e, n, d);
              if (!(h === t ? Rr(l, f, 3, o, d) : h)) return !1;
            }
          }
          return !0;
        }
        function Nr(t) {
          return (
            !(!iu(t) || ((e = t), Ft && Ft in e)) &&
            (nu(t) ? zt : pt).test(Vi(t))
          );
          var e;
        }
        function jr(t) {
          return 'function' == typeof t
            ? t
            : null == t
            ? ss
            : 'object' == typeof t
            ? Ka(t)
              ? zr(t[0], t[1])
              : $r(t)
            : ys(t);
        }
        function Lr(t) {
          if (!xi(t)) return mn(t);
          var e = [];
          for (var n in Ct(t)) jt.call(t, n) && 'constructor' != n && e.push(n);
          return e;
        }
        function Fr(t) {
          if (!iu(t))
            return (function (t) {
              var e = [];
              if (null != t) for (var n in Ct(t)) e.push(n);
              return e;
            })(t);
          var e = xi(t),
            n = [];
          for (var r in t)
            ('constructor' != r || (!e && jt.call(t, r))) && n.push(r);
          return n;
        }
        function Mr(t, e) {
          return t < e;
        }
        function Dr(t, e) {
          var n = -1,
            r = Qa(t) ? St(t.length) : [];
          return (
            hr(t, function (t, o, i) {
              r[++n] = e(t, o, i);
            }),
            r
          );
        }
        function $r(t) {
          var e = di(t);
          return 1 == e.length && e[0][2]
            ? Ci(e[0][0], e[0][1])
            : function (n) {
                return n === t || Ur(n, t, e);
              };
        }
        function zr(e, n) {
          return Si(e) && Ii(n)
            ? Ci(zi(e), n)
            : function (r) {
                var o = ku(r, e);
                return o === t && o === n ? Ou(r, e) : Rr(n, o, 3);
              };
        }
        function Vr(e, n, r, o, i) {
          e !== n &&
            br(
              n,
              function (a, u) {
                if ((i || (i = new Jn()), iu(a)))
                  !(function (e, n, r, o, i, a, u) {
                    var s = ki(e, r),
                      c = ki(n, r),
                      f = u.get(c);
                    if (f) er(e, r, f);
                    else {
                      var l = a ? a(s, c, r + '', e, n, u) : t,
                        d = l === t;
                      if (d) {
                        var h = Ka(c),
                          p = !h && Xa(c),
                          v = !h && !p && pu(c);
                        (l = c),
                          h || p || v
                            ? Ka(s)
                              ? (l = s)
                              : Za(s)
                              ? (l = ko(s))
                              : p
                              ? ((d = !1), (l = xo(c, !0)))
                              : v
                              ? ((d = !1), (l = Co(c, !0)))
                              : (l = [])
                            : cu(c) || Ga(c)
                            ? ((l = s),
                              Ga(s)
                                ? (l = Su(s))
                                : (iu(s) && !nu(s)) || (l = mi(c)))
                            : (d = !1);
                      }
                      d && (u.set(c, l), i(l, c, o, a, u), u.delete(c)),
                        er(e, r, l);
                    }
                  })(e, n, u, r, Vr, o, i);
                else {
                  var s = o ? o(ki(e, u), a, u + '', e, n, i) : t;
                  s === t && (s = a), er(e, u, s);
                }
              },
              Lu
            );
        }
        function Hr(e, n) {
          var r = e.length;
          if (r) return _i((n += n < 0 ? r : 0), r) ? e[n] : t;
        }
        function Wr(t, e, n) {
          e = e.length
            ? Pe(e, function (t) {
                return Ka(t)
                  ? function (e) {
                      return Ar(e, 1 === t.length ? t[0] : t);
                    }
                  : t;
              })
            : [ss];
          var r = -1;
          return (
            (e = Pe(e, qe(fi()))),
            (function (t, e) {
              var n = t.length;
              for (t.sort(e); n--; ) t[n] = t[n].value;
              return t;
            })(
              Dr(t, function (t, n, o) {
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
                    var s = To(o[r], i[r]);
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
              u = Ar(t, a);
            n(u, a) && to(i, wo(a, t), u);
          }
          return i;
        }
        function qr(t, e, n, r) {
          var o = r ? Fe : Le,
            i = -1,
            a = e.length,
            u = t;
          for (t === e && (e = ko(e)), n && (u = Pe(t, qe(n))); ++i < a; )
            for (
              var s = 0, c = e[i], f = n ? n(c) : c;
              (s = o(u, f, s, r)) > -1;

            )
              u !== t && oe.call(u, s, 1), oe.call(t, s, 1);
          return t;
        }
        function Gr(t, e) {
          for (var n = t ? e.length : 0, r = n - 1; n--; ) {
            var o = e[n];
            if (n == r || o !== i) {
              var i = o;
              _i(o) ? oe.call(t, o, 1) : ho(t, o);
            }
          }
          return t;
        }
        function Kr(t, e) {
          return t + nn(En() * (e - t + 1));
        }
        function Jr(t, e) {
          var n = '';
          if (!t || e < 1 || e > f) return n;
          do {
            e % 2 && (n += t), (e = nn(e / 2)) && (t += t);
          } while (e);
          return n;
        }
        function Qr(t, e) {
          return Ui(Ti(t, e, ss), t + '');
        }
        function Zr(t) {
          return Zn(Wu(t));
        }
        function Xr(t, e) {
          var n = Wu(t);
          return Li(n, sr(e, 0, n.length));
        }
        function to(e, n, r, o) {
          if (!iu(e)) return e;
          for (
            var i = -1, a = (n = wo(n, e)).length, u = a - 1, s = e;
            null != s && ++i < a;

          ) {
            var c = zi(n[i]),
              f = r;
            if ('__proto__' === c || 'constructor' === c || 'prototype' === c)
              return e;
            if (i != u) {
              var l = s[c];
              (f = o ? o(l, c, s) : t) === t &&
                (f = iu(l) ? l : _i(n[i + 1]) ? [] : {});
            }
            nr(s, c, f), (s = s[c]);
          }
          return e;
        }
        var eo = kn
            ? function (t, e) {
                return kn.set(t, e), t;
              }
            : ss,
          no = le
            ? function (t, e) {
                return le(t, 'toString', {
                  configurable: !0,
                  enumerable: !1,
                  value: is(e),
                  writable: !0,
                });
              }
            : ss;
        function ro(t) {
          return Li(Wu(t));
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
            hr(t, function (t, r, o) {
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
              null !== a && !hu(a) && (n ? a <= e : a < e)
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
            var u = (n = r(n)) != n, s = null === n, c = hu(n), f = n === t;
            i < a;

          ) {
            var l = nn((i + a) / 2),
              d = r(e[l]),
              h = d !== t,
              p = null === d,
              v = d == d,
              g = hu(d);
            if (u) var y = o || v;
            else
              y = f
                ? v && (o || h)
                : s
                ? v && h && (o || !p)
                : c
                ? v && h && !p && (o || !g)
                : !p && !g && (o ? d <= n : d < n);
            y ? (i = l + 1) : (a = l);
          }
          return _n(a, 4294967294);
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
          return 'number' == typeof t ? t : hu(t) ? l : +t;
        }
        function fo(t) {
          if ('string' == typeof t) return t;
          if (Ka(t)) return Pe(t, fo) + '';
          if (hu(t)) return Dn ? Dn.call(t) : '';
          var e = t + '';
          return '0' == e && 1 / t == -1 / 0 ? '-0' : e;
        }
        function lo(t, e, n) {
          var r = -1,
            o = Ce,
            i = t.length,
            a = !0,
            u = [],
            s = u;
          if (n) (a = !1), (o = Te);
          else if (i >= 200) {
            var c = e ? null : Qo(t);
            if (c) return fn(c);
            (a = !1), (o = Ke), (s = new Kn());
          } else s = e ? [] : u;
          t: for (; ++r < i; ) {
            var f = t[r],
              l = e ? e(f) : f;
            if (((f = n || 0 !== f ? f : 0), a && l == l)) {
              for (var d = s.length; d--; ) if (s[d] === l) continue t;
              e && s.push(l), u.push(f);
            } else o(s, l, n) || (s !== u && s.push(l), u.push(f));
          }
          return u;
        }
        function ho(t, e) {
          return null == (t = Pi(t, (e = wo(e, t)))) || delete t[zi(ea(e))];
        }
        function po(t, e, n, r) {
          return to(t, e, n(Ar(t, e)), r);
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
            ke(
              e,
              function (t, e) {
                return e.func.apply(e.thisArg, Be([t], e.args));
              },
              n
            )
          );
        }
        function yo(t, e, n) {
          var r = t.length;
          if (r < 2) return r ? lo(t[0]) : [];
          for (var o = -1, i = St(r); ++o < r; )
            for (var a = t[o], u = -1; ++u < r; )
              u != o && (i[o] = dr(i[o] || a, t[u], e, n));
          return lo(mr(i, 1), e, n);
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
        function _o(t) {
          return 'function' == typeof t ? t : ss;
        }
        function wo(t, e) {
          return Ka(t) ? t : Si(t, e) ? [t] : $i(Eu(t));
        }
        var So = Qr;
        function Eo(e, n, r) {
          var o = e.length;
          return (r = r === t ? o : r), !n && r >= o ? e : oo(e, n, r);
        }
        var Ao =
          he ||
          function (t) {
            return ce.clearTimeout(t);
          };
        function xo(t, e) {
          if (e) return t.slice();
          var n = t.length,
            r = Yt ? Yt(n) : new t.constructor(n);
          return t.copy(r), r;
        }
        function Io(t) {
          var e = new t.constructor(t.byteLength);
          return new Wt(e).set(new Wt(t)), e;
        }
        function Co(t, e) {
          var n = e ? Io(t.buffer) : t.buffer;
          return new t.constructor(n, t.byteOffset, t.length);
        }
        function To(e, n) {
          if (e !== n) {
            var r = e !== t,
              o = null === e,
              i = e == e,
              a = hu(e),
              u = n !== t,
              s = null === n,
              c = n == n,
              f = hu(n);
            if (
              (!s && !f && !a && e > n) ||
              (a && u && c && !s && !f) ||
              (o && u && c) ||
              (!r && c) ||
              !i
            )
              return 1;
            if (
              (!o && !a && !f && e < n) ||
              (f && r && i && !o && !a) ||
              (s && r && i) ||
              (!u && i) ||
              !c
            )
              return -1;
          }
          return 0;
        }
        function Po(t, e, n, r) {
          for (
            var o = -1,
              i = t.length,
              a = n.length,
              u = -1,
              s = e.length,
              c = bn(i - a, 0),
              f = St(s + c),
              l = !r;
            ++u < s;

          )
            f[u] = e[u];
          for (; ++o < a; ) (l || o < i) && (f[n[o]] = t[o]);
          for (; c--; ) f[u++] = t[o++];
          return f;
        }
        function Bo(t, e, n, r) {
          for (
            var o = -1,
              i = t.length,
              a = -1,
              u = n.length,
              s = -1,
              c = e.length,
              f = bn(i - u, 0),
              l = St(f + c),
              d = !r;
            ++o < f;

          )
            l[o] = t[o];
          for (var h = o; ++s < c; ) l[h + s] = e[s];
          for (; ++a < u; ) (d || o < i) && (l[h + n[a]] = t[o++]);
          return l;
        }
        function ko(t, e) {
          var n = -1,
            r = t.length;
          for (e || (e = St(r)); ++n < r; ) e[n] = t[n];
          return e;
        }
        function Oo(e, n, r, o) {
          var i = !r;
          r || (r = {});
          for (var a = -1, u = n.length; ++a < u; ) {
            var s = n[a],
              c = o ? o(r[s], e[s], s, r, e) : t;
            c === t && (c = e[s]), i ? ar(r, s, c) : nr(r, s, c);
          }
          return r;
        }
        function Ro(t, e) {
          return function (n, r) {
            var o = Ka(n) ? Se : or,
              i = e ? e() : {};
            return o(n, t, fi(r, 2), i);
          };
        }
        function Uo(e) {
          return Qr(function (n, r) {
            var o = -1,
              i = r.length,
              a = i > 1 ? r[i - 1] : t,
              u = i > 2 ? r[2] : t;
            for (
              a = e.length > 3 && 'function' == typeof a ? (i--, a) : t,
                u && wi(r[0], r[1], u) && ((a = i < 3 ? t : a), (i = 1)),
                n = Ct(n);
              ++o < i;

            ) {
              var s = r[o];
              s && e(n, s, o, a);
            }
            return n;
          });
        }
        function No(t, e) {
          return function (n, r) {
            if (null == n) return n;
            if (!Qa(n)) return t(n, r);
            for (
              var o = n.length, i = e ? o : -1, a = Ct(n);
              (e ? i-- : ++i < o) && !1 !== r(a[i], i, a);

            );
            return n;
          };
        }
        function jo(t) {
          return function (e, n, r) {
            for (var o = -1, i = Ct(e), a = r(e), u = a.length; u--; ) {
              var s = a[t ? u : ++o];
              if (!1 === n(i[s], s, i)) break;
            }
            return e;
          };
        }
        function Lo(e) {
          return function (n) {
            var r = an((n = Eu(n))) ? dn(n) : t,
              o = r ? r[0] : n.charAt(0),
              i = r ? Eo(r, 1).join('') : n.slice(1);
            return o[e]() + i;
          };
        }
        function Fo(t) {
          return function (e) {
            return ke(ns(Gu(e).replace(Gt, '')), t, '');
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
            var n = zn(t.prototype),
              r = t.apply(n, e);
            return iu(r) ? r : n;
          };
        }
        function Do(e) {
          return function (n, r, o) {
            var i = Ct(n);
            if (!Qa(n)) {
              var a = fi(r, 3);
              (n = ju(n)),
                (r = function (t) {
                  return a(i[t], t, i);
                });
            }
            var u = e(n, r, o);
            return u > -1 ? i[a ? n[u] : u] : t;
          };
        }
        function $o(n) {
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
                f = 'wrapper' == c ? ui(u) : t;
              s =
                f && Ei(f[0]) && 424 == f[1] && !f[4].length && 1 == f[9]
                  ? s[si(f[0])].apply(s, f[3])
                  : 1 == u.length && Ei(u)
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
        function zo(e, n, r, o, i, a, s, c, f, l) {
          var d = n & u,
            h = 1 & n,
            p = 2 & n,
            v = 24 & n,
            g = 512 & n,
            y = p ? t : Mo(e);
          return function t() {
            for (var u = arguments.length, m = St(u), b = u; b--; )
              m[b] = arguments[b];
            if (v)
              var _ = ci(t),
                w = Ze(m, _);
            if (
              (o && (m = Po(m, o, i, v)),
              a && (m = Bo(m, a, s, v)),
              (u -= w),
              v && u < l)
            ) {
              var S = cn(m, _);
              return Ko(e, n, zo, t.placeholder, r, m, S, c, f, l - u);
            }
            var E = h ? r : this,
              A = p ? E[e] : e;
            return (
              (u = m.length),
              c ? (m = Bi(m, c)) : g && u > 1 && m.reverse(),
              d && f < u && (m.length = f),
              this && this !== ce && this instanceof t && (A = y || Mo(A)),
              A.apply(E, m)
            );
          };
        }
        function Vo(t, e) {
          return function (n, r) {
            return (function (t, e, n, r) {
              return (
                wr(t, function (t, o, i) {
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
                ? ((r = fo(r)), (o = fo(o)))
                : ((r = co(r)), (o = co(o))),
                (i = e(r, o));
            }
            return i;
          };
        }
        function Wo(t) {
          return oi(function (e) {
            return (
              (e = Pe(e, qe(fi()))),
              Qr(function (n) {
                var r = this;
                return t(e, function (t) {
                  return we(t, r, n);
                });
              })
            );
          });
        }
        function Yo(e, n) {
          var r = (n = n === t ? ' ' : fo(n)).length;
          if (r < 2) return r ? Jr(n, e) : n;
          var o = Jr(n, ze(e / ln(n)));
          return an(n) ? Eo(dn(o), 0, e).join('') : o.slice(0, e);
        }
        function qo(e) {
          return function (n, r, o) {
            return (
              o && 'number' != typeof o && wi(n, r, o) && (r = o = t),
              (n = mu(n)),
              r === t ? ((r = n), (n = 0)) : (r = mu(r)),
              (function (t, e, n, r) {
                for (
                  var o = -1, i = bn(ze((e - t) / (n || 1)), 0), a = St(i);
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
                ((e = wu(e)), (n = wu(n))),
              t(e, n)
            );
          };
        }
        function Ko(e, n, r, o, u, s, c, f, l, d) {
          var h = 8 & n;
          (n |= h ? i : a), 4 & (n &= ~(h ? a : i)) || (n &= -4);
          var p = [
              e,
              n,
              u,
              h ? s : t,
              h ? c : t,
              h ? t : s,
              h ? t : c,
              f,
              l,
              d,
            ],
            v = r.apply(t, p);
          return Ei(e) && Oi(v, p), (v.placeholder = o), Ni(v, e, n);
        }
        function Jo(t) {
          var e = It[t];
          return function (t, n) {
            if (((t = wu(t)), (n = null == n ? 0 : _n(bu(n), 292)) && gn(t))) {
              var r = (Eu(t) + 'e').split('e');
              return +(
                (r = (Eu(e(r[0] + 'e' + (+r[1] + n))) + 'e').split('e'))[0] +
                'e' +
                (+r[1] - n)
              );
            }
            return e(t);
          };
        }
        var Qo =
          Tn && 1 / fn(new Tn([, -0]))[1] == c
            ? function (t) {
                return new Tn(t);
              }
            : hs;
        function Zo(t) {
          return function (e) {
            var n = gi(e);
            return n == w
              ? un(e)
              : n == I
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
        function Xo(n, c, f, l, d, h, p, v) {
          var g = 2 & c;
          if (!g && 'function' != typeof n) throw new Bt(e);
          var y = l ? l.length : 0;
          if (
            (y || ((c &= -97), (l = d = t)),
            (p = p === t ? p : bn(bu(p), 0)),
            (v = v === t ? v : bu(v)),
            (y -= d ? d.length : 0),
            c & a)
          ) {
            var m = l,
              b = d;
            l = d = t;
          }
          var _ = g ? t : ui(n),
            w = [n, c, f, l, d, m, b, h, p, v];
          if (
            (_ &&
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
                var f = e[3];
                if (f) {
                  var l = t[3];
                  (t[3] = l ? Po(l, f, e[4]) : f),
                    (t[4] = l ? cn(t[3], r) : e[4]);
                }
                (f = e[5]) &&
                  ((l = t[5]),
                  (t[5] = l ? Bo(l, f, e[6]) : f),
                  (t[6] = l ? cn(t[5], r) : e[6])),
                  (f = e[7]) && (t[7] = f),
                  o & u && (t[8] = null == t[8] ? e[8] : _n(t[8], e[8])),
                  null == t[9] && (t[9] = e[9]),
                  (t[0] = e[0]),
                  (t[1] = i);
              })(w, _),
            (n = w[0]),
            (c = w[1]),
            (f = w[2]),
            (l = w[3]),
            (d = w[4]),
            !(v = w[9] = w[9] === t ? (g ? 0 : n.length) : bn(w[9] - y, 0)) &&
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
                      var f =
                        a < 3 && u[0] !== c && u[a - 1] !== c ? [] : cn(u, c);
                      return (a -= f.length) < r
                        ? Ko(e, n, zo, i.placeholder, t, u, f, t, t, r - a)
                        : we(
                            this && this !== ce && this instanceof i ? o : e,
                            this,
                            u
                          );
                    };
                  })(n, c, v)
                : (c != i && 33 != c) || d.length
                ? zo.apply(t, w)
                : (function (t, e, n, r) {
                    var o = 1 & e,
                      i = Mo(t);
                    return function e() {
                      for (
                        var a = -1,
                          u = arguments.length,
                          s = -1,
                          c = r.length,
                          f = St(c + u),
                          l = this && this !== ce && this instanceof e ? i : t;
                        ++s < c;

                      )
                        f[s] = r[s];
                      for (; u--; ) f[s++] = arguments[++a];
                      return we(l, o ? n : this, f);
                    };
                  })(n, c, f, l);
          else
            var S = (function (t, e, n) {
              var r = 1 & e,
                o = Mo(t);
              return function e() {
                return (this && this !== ce && this instanceof e ? o : t).apply(
                  r ? n : this,
                  arguments
                );
              };
            })(n, c, f);
          return Ni((_ ? eo : Oi)(S, w), n, c);
        }
        function ti(e, n, r, o) {
          return e === t || (Wa(e, Rt[r]) && !jt.call(o, r)) ? n : e;
        }
        function ei(e, n, r, o, i, a) {
          return (
            iu(e) && iu(n) && (a.set(n, e), Vr(e, n, t, ei, a), a.delete(n)), e
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
          var f = a.get(e),
            l = a.get(n);
          if (f && l) return f == n && l == e;
          var d = -1,
            h = !0,
            p = 2 & r ? new Kn() : t;
          for (a.set(e, n), a.set(n, e); ++d < s; ) {
            var v = e[d],
              g = n[d];
            if (o) var y = u ? o(g, v, d, n, e, a) : o(v, g, d, e, n, a);
            if (y !== t) {
              if (y) continue;
              h = !1;
              break;
            }
            if (p) {
              if (
                !Re(n, function (t, e) {
                  if (!Ke(p, e) && (v === t || i(v, t, r, o, a)))
                    return p.push(e);
                })
              ) {
                h = !1;
                break;
              }
            } else if (v !== g && !i(v, g, r, o, a)) {
              h = !1;
              break;
            }
          }
          return a.delete(e), a.delete(n), h;
        }
        function oi(e) {
          return Ui(Ti(e, t, Ji), e + '');
        }
        function ii(t) {
          return xr(t, ju, pi);
        }
        function ai(t) {
          return xr(t, Lu, vi);
        }
        var ui = kn
          ? function (t) {
              return kn.get(t);
            }
          : hs;
        function si(t) {
          for (
            var e = t.name + '', n = On[e], r = jt.call(On, e) ? n.length : 0;
            r--;

          ) {
            var o = n[r],
              i = o.func;
            if (null == i || i == t) return o.name;
          }
          return e;
        }
        function ci(t) {
          return (jt.call($n, 'placeholder') ? $n : t).placeholder;
        }
        function fi() {
          var t = $n.iteratee || cs;
          return (
            (t = t === cs ? jr : t),
            arguments.length ? t(arguments[0], arguments[1]) : t
          );
        }
        function li(t, e) {
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
          for (var e = ju(t), n = e.length; n--; ) {
            var r = e[n],
              o = t[r];
            e[n] = [r, o, Ii(o)];
          }
          return e;
        }
        function hi(e, n) {
          var r = (function (e, n) {
            return null == e ? t : e[n];
          })(e, n);
          return Nr(r) ? r : t;
        }
        var pi = rn
            ? function (t) {
                return null == t
                  ? []
                  : ((t = Ct(t)),
                    Ie(rn(t), function (e) {
                      return Zt.call(t, e);
                    }));
              }
            : _s,
          vi = rn
            ? function (t) {
                for (var e = []; t; ) Be(e, pi(t)), (t = qt(t));
                return e;
              }
            : _s,
          gi = Ir;
        function yi(t, e, n) {
          for (var r = -1, o = (e = wo(e, t)).length, i = !1; ++r < o; ) {
            var a = zi(e[r]);
            if (!(i = null != t && n(t, a))) break;
            t = t[a];
          }
          return i || ++r != o
            ? i
            : !!(o = null == t ? 0 : t.length) &&
                ou(o) &&
                _i(a, o) &&
                (Ka(t) || Ga(t));
        }
        function mi(t) {
          return 'function' != typeof t.constructor || xi(t) ? {} : zn(qt(t));
        }
        function bi(t) {
          return Ka(t) || Ga(t) || !!(ue && t && t[ue]);
        }
        function _i(t, e) {
          var n = typeof t;
          return (
            !!(e = null == e ? f : e) &&
            ('number' == n || ('symbol' != n && gt.test(t))) &&
            t > -1 &&
            t % 1 == 0 &&
            t < e
          );
        }
        function wi(t, e, n) {
          if (!iu(n)) return !1;
          var r = typeof e;
          return (
            !!('number' == r
              ? Qa(n) && _i(e, n.length)
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
              !hu(t)
            ) ||
            Z.test(t) ||
            !Q.test(t) ||
            (null != e && t in Ct(e))
          );
        }
        function Ei(t) {
          var e = si(t),
            n = $n[e];
          if ('function' != typeof n || !(e in Wn.prototype)) return !1;
          if (t === n) return !0;
          var r = ui(n);
          return !!r && t === r[0];
        }
        ((xn && gi(new xn(new ArrayBuffer(1))) != k) ||
          (In && gi(new In()) != w) ||
          (Cn && gi(Cn.resolve()) != A) ||
          (Tn && gi(new Tn()) != I) ||
          (Pn && gi(new Pn()) != P)) &&
          (gi = function (e) {
            var n = Ir(e),
              r = n == E ? e.constructor : t,
              o = r ? Vi(r) : '';
            if (o)
              switch (o) {
                case Rn:
                  return k;
                case Un:
                  return w;
                case Nn:
                  return A;
                case jn:
                  return I;
                case Ln:
                  return P;
              }
            return n;
          });
        var Ai = Ut ? nu : ws;
        function xi(t) {
          var e = t && t.constructor;
          return t === (('function' == typeof e && e.prototype) || Rt);
        }
        function Ii(t) {
          return t == t && !iu(t);
        }
        function Ci(e, n) {
          return function (r) {
            return null != r && r[e] === n && (n !== t || e in Ct(r));
          };
        }
        function Ti(e, n, r) {
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
              return (u[n] = r(a)), we(e, this, u);
            }
          );
        }
        function Pi(t, e) {
          return e.length < 2 ? t : Ar(t, oo(e, 0, -1));
        }
        function Bi(e, n) {
          for (var r = e.length, o = _n(n.length, r), i = ko(e); o--; ) {
            var a = n[o];
            e[o] = _i(a, r) ? i[a] : t;
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
        var Oi = ji(eo),
          Ri =
            Ue ||
            function (t, e) {
              return ce.setTimeout(t, e);
            },
          Ui = ji(no);
        function Ni(t, e, n) {
          var r = e + '';
          return Ui(
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
                  Ee(h, function (n) {
                    var r = '_.' + n[0];
                    e & n[1] && !Ce(t, r) && t.push(r);
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
        function ji(e) {
          var n = 0,
            r = 0;
          return function () {
            var o = wn(),
              i = 16 - (o - r);
            if (((r = o), i > 0)) {
              if (++n >= 800) return arguments[0];
            } else n = 0;
            return e.apply(t, arguments);
          };
        }
        function Li(e, n) {
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
        var Fi,
          Mi,
          Di,
          $i =
            ((Fi = function (t) {
              var e = [];
              return (
                46 === t.charCodeAt(0) && e.push(''),
                t.replace(X, function (t, n, r, o) {
                  e.push(r ? o.replace(ct, '$1') : n || t);
                }),
                e
              );
            }),
            (Mi = Ma(Fi, function (t) {
              return 500 === Di.size && Di.clear(), t;
            })),
            (Di = Mi.cache),
            Mi);
        function zi(t) {
          if ('string' == typeof t || hu(t)) return t;
          var e = t + '';
          return '0' == e && 1 / t == -1 / 0 ? '-0' : e;
        }
        function Vi(t) {
          if (null != t) {
            try {
              return Nt.call(t);
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
              Za(r) && (r = t), Za(e) ? dr(e, mr(n, 1, Za, !0), fi(r, 2)) : []
            );
          }),
          qi = Qr(function (e, n) {
            var r = ea(n);
            return Za(r) && (r = t), Za(e) ? dr(e, mr(n, 1, Za, !0), t, r) : [];
          });
        function Gi(t, e, n) {
          var r = null == t ? 0 : t.length;
          if (!r) return -1;
          var o = null == n ? 0 : bu(n);
          return o < 0 && (o = bn(r + o, 0)), je(t, fi(e, 3), o);
        }
        function Ki(e, n, r) {
          var o = null == e ? 0 : e.length;
          if (!o) return -1;
          var i = o - 1;
          return (
            r !== t && ((i = bu(r)), (i = r < 0 ? bn(o + i, 0) : _n(i, o - 1))),
            je(e, fi(n, 3), i, !0)
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
              r.length && r[0] === e[0] ? Br(r, fi(n, 2)) : []
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
                return _i(t, n) ? +t : t;
              }).sort(To)
            ),
            r
          );
        });
        function ia(t) {
          return null == t ? t : An.call(t);
        }
        var aa = Qr(function (t) {
            return lo(mr(t, 1, Za, !0));
          }),
          ua = Qr(function (e) {
            var n = ea(e);
            return Za(n) && (n = t), lo(mr(e, 1, Za, !0), fi(n, 2));
          }),
          sa = Qr(function (e) {
            var n = ea(e);
            return (
              (n = 'function' == typeof n ? n : t), lo(mr(e, 1, Za, !0), t, n)
            );
          });
        function ca(t) {
          if (!t || !t.length) return [];
          var e = 0;
          return (
            (t = Ie(t, function (t) {
              if (Za(t)) return (e = bn(t.length, e)), !0;
            })),
            We(e, function (e) {
              return Pe(t, $e(e));
            })
          );
        }
        function fa(e, n) {
          if (!e || !e.length) return [];
          var r = ca(e);
          return null == n
            ? r
            : Pe(r, function (e) {
                return we(n, t, e);
              });
        }
        var la = Qr(function (t, e) {
            return Za(t) ? dr(t, e) : [];
          }),
          da = Qr(function (t) {
            return yo(Ie(t, Za));
          }),
          ha = Qr(function (e) {
            var n = ea(e);
            return Za(n) && (n = t), yo(Ie(e, Za), fi(n, 2));
          }),
          pa = Qr(function (e) {
            var n = ea(e);
            return (n = 'function' == typeof n ? n : t), yo(Ie(e, Za), t, n);
          }),
          va = Qr(ca),
          ga = Qr(function (e) {
            var n = e.length,
              r = n > 1 ? e[n - 1] : t;
            return (r = 'function' == typeof r ? (e.pop(), r) : t), fa(e, r);
          });
        function ya(t) {
          var e = $n(t);
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
              _i(r)
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
          _a = Ro(function (t, e, n) {
            jt.call(t, n) ? ++t[n] : ar(t, n, 1);
          }),
          wa = Do(Gi),
          Sa = Do(Ki);
        function Ea(t, e) {
          return (Ka(t) ? Ee : hr)(t, fi(e, 3));
        }
        function Aa(t, e) {
          return (Ka(t) ? Ae : pr)(t, fi(e, 3));
        }
        var xa = Ro(function (t, e, n) {
            jt.call(t, n) ? t[n].push(e) : ar(t, n, [e]);
          }),
          Ia = Qr(function (t, e, n) {
            var r = -1,
              o = 'function' == typeof e,
              i = Qa(t) ? St(t.length) : [];
            return (
              hr(t, function (t) {
                i[++r] = o ? we(e, t, n) : kr(t, e, n);
              }),
              i
            );
          }),
          Ca = Ro(function (t, e, n) {
            ar(t, n, e);
          });
        function Ta(t, e) {
          return (Ka(t) ? Pe : Dr)(t, fi(e, 3));
        }
        var Pa = Ro(
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
              n > 1 && wi(t, e[0], e[1])
                ? (e = [])
                : n > 2 && wi(e[0], e[1], e[2]) && (e = [e[0]]),
              Wr(t, mr(e, 1), [])
            );
          }),
          ka =
            pe ||
            function () {
              return ce.Date.now();
            };
        function Oa(e, n, r) {
          return (
            (n = r ? t : n),
            (n = e && null == n ? e.length : n),
            Xo(e, u, t, t, t, t, n)
          );
        }
        function Ra(n, r) {
          var o;
          if ('function' != typeof r) throw new Bt(e);
          return (
            (n = bu(n)),
            function () {
              return (
                --n > 0 && (o = r.apply(this, arguments)), n <= 1 && (r = t), o
              );
            }
          );
        }
        var Ua = Qr(function (t, e, n) {
            var r = 1;
            if (n.length) {
              var o = cn(n, ci(Ua));
              r |= i;
            }
            return Xo(t, r, e, n, o);
          }),
          Na = Qr(function (t, e, n) {
            var r = 3;
            if (n.length) {
              var o = cn(n, ci(Na));
              r |= i;
            }
            return Xo(e, r, t, n, o);
          });
        function ja(n, r, o) {
          var i,
            a,
            u,
            s,
            c,
            f,
            l = 0,
            d = !1,
            h = !1,
            p = !0;
          if ('function' != typeof n) throw new Bt(e);
          function v(e) {
            var r = i,
              o = a;
            return (i = a = t), (l = e), (s = n.apply(o, r));
          }
          function g(t) {
            return (l = t), (c = Ri(m, r)), d ? v(t) : s;
          }
          function y(e) {
            var n = e - f;
            return f === t || n >= r || n < 0 || (h && e - l >= u);
          }
          function m() {
            var t = ka();
            if (y(t)) return b(t);
            c = Ri(
              m,
              (function (t) {
                var e = r - (t - f);
                return h ? _n(e, u - (t - l)) : e;
              })(t)
            );
          }
          function b(e) {
            return (c = t), p && i ? v(e) : ((i = a = t), s);
          }
          function _() {
            var e = ka(),
              n = y(e);
            if (((i = arguments), (a = this), (f = e), n)) {
              if (c === t) return g(f);
              if (h) return Ao(c), (c = Ri(m, r)), v(f);
            }
            return c === t && (c = Ri(m, r)), s;
          }
          return (
            (r = wu(r) || 0),
            iu(o) &&
              ((d = !!o.leading),
              (u = (h = 'maxWait' in o) ? bn(wu(o.maxWait) || 0, r) : u),
              (p = 'trailing' in o ? !!o.trailing : p)),
            (_.cancel = function () {
              c !== t && Ao(c), (l = 0), (i = f = a = c = t);
            }),
            (_.flush = function () {
              return c === t ? s : b(ka());
            }),
            _
          );
        }
        var La = Qr(function (t, e) {
            return lr(t, 1, e);
          }),
          Fa = Qr(function (t, e, n) {
            return lr(t, wu(e) || 0, n);
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
        function Da(t) {
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
        var $a = So(function (t, e) {
            var n = (e =
              1 == e.length && Ka(e[0])
                ? Pe(e[0], qe(fi()))
                : Pe(mr(e, 1), qe(fi()))).length;
            return Qr(function (r) {
              for (var o = -1, i = _n(r.length, n); ++o < i; )
                r[o] = e[o].call(this, r[o]);
              return we(t, this, r);
            });
          }),
          za = Qr(function (e, n) {
            var r = cn(n, ci(za));
            return Xo(e, i, t, n, r);
          }),
          Va = Qr(function (e, n) {
            var r = cn(n, ci(Va));
            return Xo(e, a, t, n, r);
          }),
          Ha = oi(function (e, n) {
            return Xo(e, s, t, t, t, n);
          });
        function Wa(t, e) {
          return t === e || (t != t && e != e);
        }
        var Ya = Go(Cr),
          qa = Go(function (t, e) {
            return t >= e;
          }),
          Ga = Or(
            (function () {
              return arguments;
            })()
          )
            ? Or
            : function (t) {
                return au(t) && jt.call(t, 'callee') && !Zt.call(t, 'callee');
              },
          Ka = St.isArray,
          Ja = ve
            ? qe(ve)
            : function (t) {
                return au(t) && Ir(t) == B;
              };
        function Qa(t) {
          return null != t && ou(t.length) && !nu(t);
        }
        function Za(t) {
          return au(t) && Qa(t);
        }
        var Xa = on || ws,
          tu = ge
            ? qe(ge)
            : function (t) {
                return au(t) && Ir(t) == y;
              };
        function eu(t) {
          if (!au(t)) return !1;
          var e = Ir(t);
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
          var e = Ir(t);
          return (
            e == b ||
            e == _ ||
            '[object AsyncFunction]' == e ||
            '[object Proxy]' == e
          );
        }
        function ru(t) {
          return 'number' == typeof t && t == bu(t);
        }
        function ou(t) {
          return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= f;
        }
        function iu(t) {
          var e = typeof t;
          return null != t && ('object' == e || 'function' == e);
        }
        function au(t) {
          return null != t && 'object' == typeof t;
        }
        var uu = ye
          ? qe(ye)
          : function (t) {
              return au(t) && gi(t) == w;
            };
        function su(t) {
          return 'number' == typeof t || (au(t) && Ir(t) == S);
        }
        function cu(t) {
          if (!au(t) || Ir(t) != E) return !1;
          var e = qt(t);
          if (null === e) return !0;
          var n = jt.call(e, 'constructor') && e.constructor;
          return 'function' == typeof n && n instanceof n && Nt.call(n) == Dt;
        }
        var fu = me
            ? qe(me)
            : function (t) {
                return au(t) && Ir(t) == x;
              },
          lu = be
            ? qe(be)
            : function (t) {
                return au(t) && gi(t) == I;
              };
        function du(t) {
          return 'string' == typeof t || (!Ka(t) && au(t) && Ir(t) == C);
        }
        function hu(t) {
          return 'symbol' == typeof t || (au(t) && Ir(t) == T);
        }
        var pu = _e
            ? qe(_e)
            : function (t) {
                return au(t) && ou(t.length) && !!ne[Ir(t)];
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
          return (e == w ? un : e == I ? fn : Wu)(t);
        }
        function mu(t) {
          return t
            ? (t = wu(t)) === c || t === -1 / 0
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
        function _u(t) {
          return t ? sr(bu(t), 0, d) : 0;
        }
        function wu(t) {
          if ('number' == typeof t) return t;
          if (hu(t)) return l;
          if (iu(t)) {
            var e = 'function' == typeof t.valueOf ? t.valueOf() : t;
            t = iu(e) ? e + '' : e;
          }
          if ('string' != typeof t) return 0 === t ? t : +t;
          t = Ye(t);
          var n = ht.test(t);
          return n || vt.test(t)
            ? ae(t.slice(2), n ? 2 : 8)
            : dt.test(t)
            ? l
            : +t;
        }
        function Su(t) {
          return Oo(t, Lu(t));
        }
        function Eu(t) {
          return null == t ? '' : fo(t);
        }
        var Au = Uo(function (t, e) {
            if (xi(e) || Qa(e)) Oo(e, ju(e), t);
            else for (var n in e) jt.call(e, n) && nr(t, n, e[n]);
          }),
          xu = Uo(function (t, e) {
            Oo(e, Lu(e), t);
          }),
          Iu = Uo(function (t, e, n, r) {
            Oo(e, Lu(e), t, r);
          }),
          Cu = Uo(function (t, e, n, r) {
            Oo(e, ju(e), t, r);
          }),
          Tu = oi(ur),
          Pu = Qr(function (e, n) {
            e = Ct(e);
            var r = -1,
              o = n.length,
              i = o > 2 ? n[2] : t;
            for (i && wi(n[0], n[1], i) && (o = 1); ++r < o; )
              for (var a = n[r], u = Lu(a), s = -1, c = u.length; ++s < c; ) {
                var f = u[s],
                  l = e[f];
                (l === t || (Wa(l, Rt[f]) && !jt.call(e, f))) && (e[f] = a[f]);
              }
            return e;
          }),
          Bu = Qr(function (e) {
            return e.push(t, ei), we(Mu, t, e);
          });
        function ku(e, n, r) {
          var o = null == e ? t : Ar(e, n);
          return o === t ? r : o;
        }
        function Ou(t, e) {
          return null != t && yi(t, e, Pr);
        }
        var Ru = Vo(function (t, e, n) {
            null != e && 'function' != typeof e.toString && (e = Mt.call(e)),
              (t[e] = n);
          }, is(ss)),
          Uu = Vo(function (t, e, n) {
            null != e && 'function' != typeof e.toString && (e = Mt.call(e)),
              jt.call(t, e) ? t[e].push(n) : (t[e] = [n]);
          }, fi),
          Nu = Qr(kr);
        function ju(t) {
          return Qa(t) ? Qn(t) : Lr(t);
        }
        function Lu(t) {
          return Qa(t) ? Qn(t, !0) : Fr(t);
        }
        var Fu = Uo(function (t, e, n) {
            Vr(t, e, n);
          }),
          Mu = Uo(function (t, e, n, r) {
            Vr(t, e, n, r);
          }),
          Du = oi(function (t, e) {
            var n = {};
            if (null == t) return n;
            var r = !1;
            (e = Pe(e, function (e) {
              return (e = wo(e, t)), r || (r = e.length > 1), e;
            })),
              Oo(t, ai(t), n),
              r && (n = cr(n, 7, ni));
            for (var o = e.length; o--; ) ho(n, e[o]);
            return n;
          }),
          $u = oi(function (t, e) {
            return null == t
              ? {}
              : (function (t, e) {
                  return Yr(t, e, function (e, n) {
                    return Ou(t, n);
                  });
                })(t, e);
          });
        function zu(t, e) {
          if (null == t) return {};
          var n = Pe(ai(t), function (t) {
            return [t];
          });
          return (
            (e = fi(e)),
            Yr(t, n, function (t, n) {
              return e(t, n[0]);
            })
          );
        }
        var Vu = Zo(ju),
          Hu = Zo(Lu);
        function Wu(t) {
          return null == t ? [] : Ge(t, ju(t));
        }
        var Yu = Fo(function (t, e, n) {
          return (e = e.toLowerCase()), t + (n ? qu(e) : e);
        });
        function qu(t) {
          return es(Eu(t).toLowerCase());
        }
        function Gu(t) {
          return (t = Eu(t)) && t.replace(yt, Xe).replace(Kt, '');
        }
        var Ku = Fo(function (t, e, n) {
            return t + (n ? '-' : '') + e.toLowerCase();
          }),
          Ju = Fo(function (t, e, n) {
            return t + (n ? ' ' : '') + e.toLowerCase();
          }),
          Qu = Lo('toLowerCase'),
          Zu = Fo(function (t, e, n) {
            return t + (n ? '_' : '') + e.toLowerCase();
          }),
          Xu = Fo(function (t, e, n) {
            return t + (n ? ' ' : '') + es(e);
          }),
          ts = Fo(function (t, e, n) {
            return t + (n ? ' ' : '') + e.toUpperCase();
          }),
          es = Lo('toUpperCase');
        function ns(e, n, r) {
          return (
            (e = Eu(e)),
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
              return we(e, t, n);
            } catch (r) {
              return eu(r) ? r : new At(r);
            }
          }),
          os = oi(function (t, e) {
            return (
              Ee(e, function (e) {
                (e = zi(e)), ar(t, e, Ua(t[e], t));
              }),
              t
            );
          });
        function is(t) {
          return function () {
            return t;
          };
        }
        var as = $o(),
          us = $o(!0);
        function ss(t) {
          return t;
        }
        function cs(t) {
          return jr('function' == typeof t ? t : cr(t, 1));
        }
        var fs = Qr(function (t, e) {
            return function (n) {
              return kr(n, t, e);
            };
          }),
          ls = Qr(function (t, e) {
            return function (n) {
              return kr(t, n, e);
            };
          });
        function ds(t, e, n) {
          var r = ju(e),
            o = Er(e, r);
          null != n ||
            (iu(e) && (o.length || !r.length)) ||
            ((n = e), (e = t), (t = this), (o = Er(e, ju(e))));
          var i = !(iu(n) && 'chain' in n && !n.chain),
            a = nu(t);
          return (
            Ee(o, function (n) {
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
                    return r.apply(t, Be([this.value()], arguments));
                  });
            }),
            t
          );
        }
        function hs() {}
        var ps = Wo(Pe),
          vs = Wo(xe),
          gs = Wo(Re);
        function ys(t) {
          return Si(t)
            ? $e(zi(t))
            : (function (t) {
                return function (e) {
                  return Ar(e, t);
                };
              })(t);
        }
        var ms = qo(),
          bs = qo(!0);
        function _s() {
          return [];
        }
        function ws() {
          return !1;
        }
        var Ss,
          Es = Ho(function (t, e) {
            return t + e;
          }, 0),
          As = Jo('ceil'),
          xs = Ho(function (t, e) {
            return t / e;
          }, 1),
          Is = Jo('floor'),
          Cs = Ho(function (t, e) {
            return t * e;
          }, 1),
          Ts = Jo('round'),
          Ps = Ho(function (t, e) {
            return t - e;
          }, 0);
        return (
          ($n.after = function (t, n) {
            if ('function' != typeof n) throw new Bt(e);
            return (
              (t = bu(t)),
              function () {
                if (--t < 1) return n.apply(this, arguments);
              }
            );
          }),
          ($n.ary = Oa),
          ($n.assign = Au),
          ($n.assignIn = xu),
          ($n.assignInWith = Iu),
          ($n.assignWith = Cu),
          ($n.at = Tu),
          ($n.before = Ra),
          ($n.bind = Ua),
          ($n.bindAll = os),
          ($n.bindKey = Na),
          ($n.castArray = function () {
            if (!arguments.length) return [];
            var t = arguments[0];
            return Ka(t) ? t : [t];
          }),
          ($n.chain = ya),
          ($n.chunk = function (e, n, r) {
            n = (r ? wi(e, n, r) : n === t) ? 1 : bn(bu(n), 0);
            var o = null == e ? 0 : e.length;
            if (!o || n < 1) return [];
            for (var i = 0, a = 0, u = St(ze(o / n)); i < o; )
              u[a++] = oo(e, i, (i += n));
            return u;
          }),
          ($n.compact = function (t) {
            for (
              var e = -1, n = null == t ? 0 : t.length, r = 0, o = [];
              ++e < n;

            ) {
              var i = t[e];
              i && (o[r++] = i);
            }
            return o;
          }),
          ($n.concat = function () {
            var t = arguments.length;
            if (!t) return [];
            for (var e = St(t - 1), n = arguments[0], r = t; r--; )
              e[r - 1] = arguments[r];
            return Be(Ka(n) ? ko(n) : [n], mr(e, 1));
          }),
          ($n.cond = function (t) {
            var n = null == t ? 0 : t.length,
              r = fi();
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
                  if (we(o[0], this, e)) return we(o[1], this, e);
                }
              })
            );
          }),
          ($n.conforms = function (t) {
            return (function (t) {
              var e = ju(t);
              return function (n) {
                return fr(n, t, e);
              };
            })(cr(t, 1));
          }),
          ($n.constant = is),
          ($n.countBy = _a),
          ($n.create = function (t, e) {
            var n = zn(t);
            return null == e ? n : ir(n, e);
          }),
          ($n.curry = function e(n, r, o) {
            var i = Xo(n, 8, t, t, t, t, t, (r = o ? t : r));
            return (i.placeholder = e.placeholder), i;
          }),
          ($n.curryRight = function e(n, r, i) {
            var a = Xo(n, o, t, t, t, t, t, (r = i ? t : r));
            return (a.placeholder = e.placeholder), a;
          }),
          ($n.debounce = ja),
          ($n.defaults = Pu),
          ($n.defaultsDeep = Bu),
          ($n.defer = La),
          ($n.delay = Fa),
          ($n.difference = Wi),
          ($n.differenceBy = Yi),
          ($n.differenceWith = qi),
          ($n.drop = function (e, n, r) {
            var o = null == e ? 0 : e.length;
            return o
              ? oo(e, (n = r || n === t ? 1 : bu(n)) < 0 ? 0 : n, o)
              : [];
          }),
          ($n.dropRight = function (e, n, r) {
            var o = null == e ? 0 : e.length;
            return o
              ? oo(e, 0, (n = o - (n = r || n === t ? 1 : bu(n))) < 0 ? 0 : n)
              : [];
          }),
          ($n.dropRightWhile = function (t, e) {
            return t && t.length ? vo(t, fi(e, 3), !0, !0) : [];
          }),
          ($n.dropWhile = function (t, e) {
            return t && t.length ? vo(t, fi(e, 3), !0) : [];
          }),
          ($n.fill = function (e, n, r, o) {
            var i = null == e ? 0 : e.length;
            return i
              ? (r && 'number' != typeof r && wi(e, n, r) && ((r = 0), (o = i)),
                (function (e, n, r, o) {
                  var i = e.length;
                  for (
                    (r = bu(r)) < 0 && (r = -r > i ? 0 : i + r),
                      (o = o === t || o > i ? i : bu(o)) < 0 && (o += i),
                      o = r > o ? 0 : _u(o);
                    r < o;

                  )
                    e[r++] = n;
                  return e;
                })(e, n, r, o))
              : [];
          }),
          ($n.filter = function (t, e) {
            return (Ka(t) ? Ie : yr)(t, fi(e, 3));
          }),
          ($n.flatMap = function (t, e) {
            return mr(Ta(t, e), 1);
          }),
          ($n.flatMapDeep = function (t, e) {
            return mr(Ta(t, e), c);
          }),
          ($n.flatMapDepth = function (e, n, r) {
            return (r = r === t ? 1 : bu(r)), mr(Ta(e, n), r);
          }),
          ($n.flatten = Ji),
          ($n.flattenDeep = function (t) {
            return null != t && t.length ? mr(t, c) : [];
          }),
          ($n.flattenDepth = function (e, n) {
            return null != e && e.length
              ? mr(e, (n = n === t ? 1 : bu(n)))
              : [];
          }),
          ($n.flip = function (t) {
            return Xo(t, 512);
          }),
          ($n.flow = as),
          ($n.flowRight = us),
          ($n.fromPairs = function (t) {
            for (var e = -1, n = null == t ? 0 : t.length, r = {}; ++e < n; ) {
              var o = t[e];
              r[o[0]] = o[1];
            }
            return r;
          }),
          ($n.functions = function (t) {
            return null == t ? [] : Er(t, ju(t));
          }),
          ($n.functionsIn = function (t) {
            return null == t ? [] : Er(t, Lu(t));
          }),
          ($n.groupBy = xa),
          ($n.initial = function (t) {
            return null != t && t.length ? oo(t, 0, -1) : [];
          }),
          ($n.intersection = Zi),
          ($n.intersectionBy = Xi),
          ($n.intersectionWith = ta),
          ($n.invert = Ru),
          ($n.invertBy = Uu),
          ($n.invokeMap = Ia),
          ($n.iteratee = cs),
          ($n.keyBy = Ca),
          ($n.keys = ju),
          ($n.keysIn = Lu),
          ($n.map = Ta),
          ($n.mapKeys = function (t, e) {
            var n = {};
            return (
              (e = fi(e, 3)),
              wr(t, function (t, r, o) {
                ar(n, e(t, r, o), t);
              }),
              n
            );
          }),
          ($n.mapValues = function (t, e) {
            var n = {};
            return (
              (e = fi(e, 3)),
              wr(t, function (t, r, o) {
                ar(n, r, e(t, r, o));
              }),
              n
            );
          }),
          ($n.matches = function (t) {
            return $r(cr(t, 1));
          }),
          ($n.matchesProperty = function (t, e) {
            return zr(t, cr(e, 1));
          }),
          ($n.memoize = Ma),
          ($n.merge = Fu),
          ($n.mergeWith = Mu),
          ($n.method = fs),
          ($n.methodOf = ls),
          ($n.mixin = ds),
          ($n.negate = Da),
          ($n.nthArg = function (t) {
            return (
              (t = bu(t)),
              Qr(function (e) {
                return Hr(e, t);
              })
            );
          }),
          ($n.omit = Du),
          ($n.omitBy = function (t, e) {
            return zu(t, Da(fi(e)));
          }),
          ($n.once = function (t) {
            return Ra(2, t);
          }),
          ($n.orderBy = function (e, n, r, o) {
            return null == e
              ? []
              : (Ka(n) || (n = null == n ? [] : [n]),
                Ka((r = o ? t : r)) || (r = null == r ? [] : [r]),
                Wr(e, n, r));
          }),
          ($n.over = ps),
          ($n.overArgs = $a),
          ($n.overEvery = vs),
          ($n.overSome = gs),
          ($n.partial = za),
          ($n.partialRight = Va),
          ($n.partition = Pa),
          ($n.pick = $u),
          ($n.pickBy = zu),
          ($n.property = ys),
          ($n.propertyOf = function (e) {
            return function (n) {
              return null == e ? t : Ar(e, n);
            };
          }),
          ($n.pull = na),
          ($n.pullAll = ra),
          ($n.pullAllBy = function (t, e, n) {
            return t && t.length && e && e.length ? qr(t, e, fi(n, 2)) : t;
          }),
          ($n.pullAllWith = function (e, n, r) {
            return e && e.length && n && n.length ? qr(e, n, t, r) : e;
          }),
          ($n.pullAt = oa),
          ($n.range = ms),
          ($n.rangeRight = bs),
          ($n.rearg = Ha),
          ($n.reject = function (t, e) {
            return (Ka(t) ? Ie : yr)(t, Da(fi(e, 3)));
          }),
          ($n.remove = function (t, e) {
            var n = [];
            if (!t || !t.length) return n;
            var r = -1,
              o = [],
              i = t.length;
            for (e = fi(e, 3); ++r < i; ) {
              var a = t[r];
              e(a, r, t) && (n.push(a), o.push(r));
            }
            return Gr(t, o), n;
          }),
          ($n.rest = function (n, r) {
            if ('function' != typeof n) throw new Bt(e);
            return Qr(n, (r = r === t ? r : bu(r)));
          }),
          ($n.reverse = ia),
          ($n.sampleSize = function (e, n, r) {
            return (
              (n = (r ? wi(e, n, r) : n === t) ? 1 : bu(n)),
              (Ka(e) ? Xn : Xr)(e, n)
            );
          }),
          ($n.set = function (t, e, n) {
            return null == t ? t : to(t, e, n);
          }),
          ($n.setWith = function (e, n, r, o) {
            return (
              (o = 'function' == typeof o ? o : t),
              null == e ? e : to(e, n, r, o)
            );
          }),
          ($n.shuffle = function (t) {
            return (Ka(t) ? tr : ro)(t);
          }),
          ($n.slice = function (e, n, r) {
            var o = null == e ? 0 : e.length;
            return o
              ? (r && 'number' != typeof r && wi(e, n, r)
                  ? ((n = 0), (r = o))
                  : ((n = null == n ? 0 : bu(n)), (r = r === t ? o : bu(r))),
                oo(e, n, r))
              : [];
          }),
          ($n.sortBy = Ba),
          ($n.sortedUniq = function (t) {
            return t && t.length ? so(t) : [];
          }),
          ($n.sortedUniqBy = function (t, e) {
            return t && t.length ? so(t, fi(e, 2)) : [];
          }),
          ($n.split = function (e, n, r) {
            return (
              r && 'number' != typeof r && wi(e, n, r) && (n = r = t),
              (r = r === t ? d : r >>> 0)
                ? (e = Eu(e)) &&
                  ('string' == typeof n || (null != n && !fu(n))) &&
                  !(n = fo(n)) &&
                  an(e)
                  ? Eo(dn(e), 0, r)
                  : e.split(n, r)
                : []
            );
          }),
          ($n.spread = function (t, n) {
            if ('function' != typeof t) throw new Bt(e);
            return (
              (n = null == n ? 0 : bn(bu(n), 0)),
              Qr(function (e) {
                var r = e[n],
                  o = Eo(e, 0, n);
                return r && Be(o, r), we(t, this, o);
              })
            );
          }),
          ($n.tail = function (t) {
            var e = null == t ? 0 : t.length;
            return e ? oo(t, 1, e) : [];
          }),
          ($n.take = function (e, n, r) {
            return e && e.length
              ? oo(e, 0, (n = r || n === t ? 1 : bu(n)) < 0 ? 0 : n)
              : [];
          }),
          ($n.takeRight = function (e, n, r) {
            var o = null == e ? 0 : e.length;
            return o
              ? oo(e, (n = o - (n = r || n === t ? 1 : bu(n))) < 0 ? 0 : n, o)
              : [];
          }),
          ($n.takeRightWhile = function (t, e) {
            return t && t.length ? vo(t, fi(e, 3), !1, !0) : [];
          }),
          ($n.takeWhile = function (t, e) {
            return t && t.length ? vo(t, fi(e, 3)) : [];
          }),
          ($n.tap = function (t, e) {
            return e(t), t;
          }),
          ($n.throttle = function (t, n, r) {
            var o = !0,
              i = !0;
            if ('function' != typeof t) throw new Bt(e);
            return (
              iu(r) &&
                ((o = 'leading' in r ? !!r.leading : o),
                (i = 'trailing' in r ? !!r.trailing : i)),
              ja(t, n, { leading: o, maxWait: n, trailing: i })
            );
          }),
          ($n.thru = ma),
          ($n.toArray = yu),
          ($n.toPairs = Vu),
          ($n.toPairsIn = Hu),
          ($n.toPath = function (t) {
            return Ka(t) ? Pe(t, zi) : hu(t) ? [t] : ko($i(Eu(t)));
          }),
          ($n.toPlainObject = Su),
          ($n.transform = function (t, e, n) {
            var r = Ka(t),
              o = r || Xa(t) || pu(t);
            if (((e = fi(e, 4)), null == n)) {
              var i = t && t.constructor;
              n = o ? (r ? new i() : []) : iu(t) && nu(i) ? zn(qt(t)) : {};
            }
            return (
              (o ? Ee : wr)(t, function (t, r, o) {
                return e(n, t, r, o);
              }),
              n
            );
          }),
          ($n.unary = function (t) {
            return Oa(t, 1);
          }),
          ($n.union = aa),
          ($n.unionBy = ua),
          ($n.unionWith = sa),
          ($n.uniq = function (t) {
            return t && t.length ? lo(t) : [];
          }),
          ($n.uniqBy = function (t, e) {
            return t && t.length ? lo(t, fi(e, 2)) : [];
          }),
          ($n.uniqWith = function (e, n) {
            return (
              (n = 'function' == typeof n ? n : t),
              e && e.length ? lo(e, t, n) : []
            );
          }),
          ($n.unset = function (t, e) {
            return null == t || ho(t, e);
          }),
          ($n.unzip = ca),
          ($n.unzipWith = fa),
          ($n.update = function (t, e, n) {
            return null == t ? t : po(t, e, _o(n));
          }),
          ($n.updateWith = function (e, n, r, o) {
            return (
              (o = 'function' == typeof o ? o : t),
              null == e ? e : po(e, n, _o(r), o)
            );
          }),
          ($n.values = Wu),
          ($n.valuesIn = function (t) {
            return null == t ? [] : Ge(t, Lu(t));
          }),
          ($n.without = la),
          ($n.words = ns),
          ($n.wrap = function (t, e) {
            return za(_o(e), t);
          }),
          ($n.xor = da),
          ($n.xorBy = ha),
          ($n.xorWith = pa),
          ($n.zip = va),
          ($n.zipObject = function (t, e) {
            return mo(t || [], e || [], nr);
          }),
          ($n.zipObjectDeep = function (t, e) {
            return mo(t || [], e || [], to);
          }),
          ($n.zipWith = ga),
          ($n.entries = Vu),
          ($n.entriesIn = Hu),
          ($n.extend = xu),
          ($n.extendWith = Iu),
          ds($n, $n),
          ($n.add = Es),
          ($n.attempt = rs),
          ($n.camelCase = Yu),
          ($n.capitalize = qu),
          ($n.ceil = As),
          ($n.clamp = function (e, n, r) {
            return (
              r === t && ((r = n), (n = t)),
              r !== t && (r = (r = wu(r)) == r ? r : 0),
              n !== t && (n = (n = wu(n)) == n ? n : 0),
              sr(wu(e), n, r)
            );
          }),
          ($n.clone = function (t) {
            return cr(t, 4);
          }),
          ($n.cloneDeep = function (t) {
            return cr(t, 5);
          }),
          ($n.cloneDeepWith = function (e, n) {
            return cr(e, 5, (n = 'function' == typeof n ? n : t));
          }),
          ($n.cloneWith = function (e, n) {
            return cr(e, 4, (n = 'function' == typeof n ? n : t));
          }),
          ($n.conformsTo = function (t, e) {
            return null == e || fr(t, e, ju(e));
          }),
          ($n.deburr = Gu),
          ($n.defaultTo = function (t, e) {
            return null == t || t != t ? e : t;
          }),
          ($n.divide = xs),
          ($n.endsWith = function (e, n, r) {
            (e = Eu(e)), (n = fo(n));
            var o = e.length,
              i = (r = r === t ? o : sr(bu(r), 0, o));
            return (r -= n.length) >= 0 && e.slice(r, i) == n;
          }),
          ($n.eq = Wa),
          ($n.escape = function (t) {
            return (t = Eu(t)) && q.test(t) ? t.replace(W, tn) : t;
          }),
          ($n.escapeRegExp = function (t) {
            return (t = Eu(t)) && et.test(t) ? t.replace(tt, '\\$&') : t;
          }),
          ($n.every = function (e, n, r) {
            var o = Ka(e) ? xe : vr;
            return r && wi(e, n, r) && (n = t), o(e, fi(n, 3));
          }),
          ($n.find = wa),
          ($n.findIndex = Gi),
          ($n.findKey = function (t, e) {
            return Ne(t, fi(e, 3), wr);
          }),
          ($n.findLast = Sa),
          ($n.findLastIndex = Ki),
          ($n.findLastKey = function (t, e) {
            return Ne(t, fi(e, 3), Sr);
          }),
          ($n.floor = Is),
          ($n.forEach = Ea),
          ($n.forEachRight = Aa),
          ($n.forIn = function (t, e) {
            return null == t ? t : br(t, fi(e, 3), Lu);
          }),
          ($n.forInRight = function (t, e) {
            return null == t ? t : _r(t, fi(e, 3), Lu);
          }),
          ($n.forOwn = function (t, e) {
            return t && wr(t, fi(e, 3));
          }),
          ($n.forOwnRight = function (t, e) {
            return t && Sr(t, fi(e, 3));
          }),
          ($n.get = ku),
          ($n.gt = Ya),
          ($n.gte = qa),
          ($n.has = function (t, e) {
            return null != t && yi(t, e, Tr);
          }),
          ($n.hasIn = Ou),
          ($n.head = Qi),
          ($n.identity = ss),
          ($n.includes = function (t, e, n, r) {
            (t = Qa(t) ? t : Wu(t)), (n = n && !r ? bu(n) : 0);
            var o = t.length;
            return (
              n < 0 && (n = bn(o + n, 0)),
              du(t) ? n <= o && t.indexOf(e, n) > -1 : !!o && Le(t, e, n) > -1
            );
          }),
          ($n.indexOf = function (t, e, n) {
            var r = null == t ? 0 : t.length;
            if (!r) return -1;
            var o = null == n ? 0 : bu(n);
            return o < 0 && (o = bn(r + o, 0)), Le(t, e, o);
          }),
          ($n.inRange = function (e, n, r) {
            return (
              (n = mu(n)),
              r === t ? ((r = n), (n = 0)) : (r = mu(r)),
              (function (t, e, n) {
                return t >= _n(e, n) && t < bn(e, n);
              })((e = wu(e)), n, r)
            );
          }),
          ($n.invoke = Nu),
          ($n.isArguments = Ga),
          ($n.isArray = Ka),
          ($n.isArrayBuffer = Ja),
          ($n.isArrayLike = Qa),
          ($n.isArrayLikeObject = Za),
          ($n.isBoolean = function (t) {
            return !0 === t || !1 === t || (au(t) && Ir(t) == g);
          }),
          ($n.isBuffer = Xa),
          ($n.isDate = tu),
          ($n.isElement = function (t) {
            return au(t) && 1 === t.nodeType && !cu(t);
          }),
          ($n.isEmpty = function (t) {
            if (null == t) return !0;
            if (
              Qa(t) &&
              (Ka(t) ||
                'string' == typeof t ||
                'function' == typeof t.splice ||
                Xa(t) ||
                pu(t) ||
                Ga(t))
            )
              return !t.length;
            var e = gi(t);
            if (e == w || e == I) return !t.size;
            if (xi(t)) return !Lr(t).length;
            for (var n in t) if (jt.call(t, n)) return !1;
            return !0;
          }),
          ($n.isEqual = function (t, e) {
            return Rr(t, e);
          }),
          ($n.isEqualWith = function (e, n, r) {
            var o = (r = 'function' == typeof r ? r : t) ? r(e, n) : t;
            return o === t ? Rr(e, n, t, r) : !!o;
          }),
          ($n.isError = eu),
          ($n.isFinite = function (t) {
            return 'number' == typeof t && gn(t);
          }),
          ($n.isFunction = nu),
          ($n.isInteger = ru),
          ($n.isLength = ou),
          ($n.isMap = uu),
          ($n.isMatch = function (t, e) {
            return t === e || Ur(t, e, di(e));
          }),
          ($n.isMatchWith = function (e, n, r) {
            return (r = 'function' == typeof r ? r : t), Ur(e, n, di(n), r);
          }),
          ($n.isNaN = function (t) {
            return su(t) && t != +t;
          }),
          ($n.isNative = function (t) {
            if (Ai(t))
              throw new At(
                'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.'
              );
            return Nr(t);
          }),
          ($n.isNil = function (t) {
            return null == t;
          }),
          ($n.isNull = function (t) {
            return null === t;
          }),
          ($n.isNumber = su),
          ($n.isObject = iu),
          ($n.isObjectLike = au),
          ($n.isPlainObject = cu),
          ($n.isRegExp = fu),
          ($n.isSafeInteger = function (t) {
            return ru(t) && t >= -9007199254740991 && t <= f;
          }),
          ($n.isSet = lu),
          ($n.isString = du),
          ($n.isSymbol = hu),
          ($n.isTypedArray = pu),
          ($n.isUndefined = function (e) {
            return e === t;
          }),
          ($n.isWeakMap = function (t) {
            return au(t) && gi(t) == P;
          }),
          ($n.isWeakSet = function (t) {
            return au(t) && '[object WeakSet]' == Ir(t);
          }),
          ($n.join = function (t, e) {
            return null == t ? '' : yn.call(t, e);
          }),
          ($n.kebabCase = Ku),
          ($n.last = ea),
          ($n.lastIndexOf = function (e, n, r) {
            var o = null == e ? 0 : e.length;
            if (!o) return -1;
            var i = o;
            return (
              r !== t && (i = (i = bu(r)) < 0 ? bn(o + i, 0) : _n(i, o - 1)),
              n == n
                ? (function (t, e, n) {
                    for (var r = n + 1; r--; ) if (t[r] === e) return r;
                    return r;
                  })(e, n, i)
                : je(e, Me, i, !0)
            );
          }),
          ($n.lowerCase = Ju),
          ($n.lowerFirst = Qu),
          ($n.lt = vu),
          ($n.lte = gu),
          ($n.max = function (e) {
            return e && e.length ? gr(e, ss, Cr) : t;
          }),
          ($n.maxBy = function (e, n) {
            return e && e.length ? gr(e, fi(n, 2), Cr) : t;
          }),
          ($n.mean = function (t) {
            return De(t, ss);
          }),
          ($n.meanBy = function (t, e) {
            return De(t, fi(e, 2));
          }),
          ($n.min = function (e) {
            return e && e.length ? gr(e, ss, Mr) : t;
          }),
          ($n.minBy = function (e, n) {
            return e && e.length ? gr(e, fi(n, 2), Mr) : t;
          }),
          ($n.stubArray = _s),
          ($n.stubFalse = ws),
          ($n.stubObject = function () {
            return {};
          }),
          ($n.stubString = function () {
            return '';
          }),
          ($n.stubTrue = function () {
            return !0;
          }),
          ($n.multiply = Cs),
          ($n.nth = function (e, n) {
            return e && e.length ? Hr(e, bu(n)) : t;
          }),
          ($n.noConflict = function () {
            return ce._ === this && (ce._ = $t), this;
          }),
          ($n.noop = hs),
          ($n.now = ka),
          ($n.pad = function (t, e, n) {
            t = Eu(t);
            var r = (e = bu(e)) ? ln(t) : 0;
            if (!e || r >= e) return t;
            var o = (e - r) / 2;
            return Yo(nn(o), n) + t + Yo(ze(o), n);
          }),
          ($n.padEnd = function (t, e, n) {
            t = Eu(t);
            var r = (e = bu(e)) ? ln(t) : 0;
            return e && r < e ? t + Yo(e - r, n) : t;
          }),
          ($n.padStart = function (t, e, n) {
            t = Eu(t);
            var r = (e = bu(e)) ? ln(t) : 0;
            return e && r < e ? Yo(e - r, n) + t : t;
          }),
          ($n.parseInt = function (t, e, n) {
            return (
              n || null == e ? (e = 0) : e && (e = +e),
              Sn(Eu(t).replace(nt, ''), e || 0)
            );
          }),
          ($n.random = function (e, n, r) {
            if (
              (r && 'boolean' != typeof r && wi(e, n, r) && (n = r = t),
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
              var i = En();
              return _n(e + i * (n - e + ie('1e-' + ((i + '').length - 1))), n);
            }
            return Kr(e, n);
          }),
          ($n.reduce = function (t, e, n) {
            var r = Ka(t) ? ke : Ve,
              o = arguments.length < 3;
            return r(t, fi(e, 4), n, o, hr);
          }),
          ($n.reduceRight = function (t, e, n) {
            var r = Ka(t) ? Oe : Ve,
              o = arguments.length < 3;
            return r(t, fi(e, 4), n, o, pr);
          }),
          ($n.repeat = function (e, n, r) {
            return (n = (r ? wi(e, n, r) : n === t) ? 1 : bu(n)), Jr(Eu(e), n);
          }),
          ($n.replace = function () {
            var t = arguments,
              e = Eu(t[0]);
            return t.length < 3 ? e : e.replace(t[1], t[2]);
          }),
          ($n.result = function (e, n, r) {
            var o = -1,
              i = (n = wo(n, e)).length;
            for (i || ((i = 1), (e = t)); ++o < i; ) {
              var a = null == e ? t : e[zi(n[o])];
              a === t && ((o = i), (a = r)), (e = nu(a) ? a.call(e) : a);
            }
            return e;
          }),
          ($n.round = Ts),
          ($n.runInContext = rt),
          ($n.sample = function (t) {
            return (Ka(t) ? Zn : Zr)(t);
          }),
          ($n.size = function (t) {
            if (null == t) return 0;
            if (Qa(t)) return du(t) ? ln(t) : t.length;
            var e = gi(t);
            return e == w || e == I ? t.size : Lr(t).length;
          }),
          ($n.snakeCase = Zu),
          ($n.some = function (e, n, r) {
            var o = Ka(e) ? Re : io;
            return r && wi(e, n, r) && (n = t), o(e, fi(n, 3));
          }),
          ($n.sortedIndex = function (t, e) {
            return ao(t, e);
          }),
          ($n.sortedIndexBy = function (t, e, n) {
            return uo(t, e, fi(n, 2));
          }),
          ($n.sortedIndexOf = function (t, e) {
            var n = null == t ? 0 : t.length;
            if (n) {
              var r = ao(t, e);
              if (r < n && Wa(t[r], e)) return r;
            }
            return -1;
          }),
          ($n.sortedLastIndex = function (t, e) {
            return ao(t, e, !0);
          }),
          ($n.sortedLastIndexBy = function (t, e, n) {
            return uo(t, e, fi(n, 2), !0);
          }),
          ($n.sortedLastIndexOf = function (t, e) {
            if (null != t && t.length) {
              var n = ao(t, e, !0) - 1;
              if (Wa(t[n], e)) return n;
            }
            return -1;
          }),
          ($n.startCase = Xu),
          ($n.startsWith = function (t, e, n) {
            return (
              (t = Eu(t)),
              (n = null == n ? 0 : sr(bu(n), 0, t.length)),
              (e = fo(e)),
              t.slice(n, n + e.length) == e
            );
          }),
          ($n.subtract = Ps),
          ($n.sum = function (t) {
            return t && t.length ? He(t, ss) : 0;
          }),
          ($n.sumBy = function (t, e) {
            return t && t.length ? He(t, fi(e, 2)) : 0;
          }),
          ($n.template = function (e, n, r) {
            var o = $n.templateSettings;
            r && wi(e, n, r) && (n = t), (e = Eu(e)), (n = Iu({}, n, o, ti));
            var i,
              a,
              u = Iu({}, n.imports, o.imports, ti),
              s = ju(u),
              c = Ge(u, s),
              f = 0,
              l = n.interpolate || mt,
              d = "__p += '",
              h = Tt(
                (n.escape || mt).source +
                  '|' +
                  l.source +
                  '|' +
                  (l === J ? ft : mt).source +
                  '|' +
                  (n.evaluate || mt).source +
                  '|$',
                'g'
              ),
              p =
                '//# sourceURL=' +
                (jt.call(n, 'sourceURL')
                  ? (n.sourceURL + '').replace(/\s/g, ' ')
                  : 'lodash.templateSources[' + ++ee + ']') +
                '\n';
            e.replace(h, function (t, n, r, o, u, s) {
              return (
                r || (r = o),
                (d += e.slice(f, s).replace(bt, en)),
                n && ((i = !0), (d += "' +\n__e(" + n + ") +\n'")),
                u && ((a = !0), (d += "';\n" + u + ";\n__p += '")),
                r &&
                  (d += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"),
                (f = s + t.length),
                t
              );
            }),
              (d += "';\n");
            var v = jt.call(n, 'variable') && n.variable;
            if (v) {
              if (st.test(v))
                throw new At(
                  'Invalid `variable` option passed into `_.template`'
                );
            } else d = 'with (obj) {\n' + d + '\n}\n';
            (d = (a ? d.replace($, '') : d).replace(z, '$1').replace(V, '$1;')),
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
              return xt(s, p + 'return ' + d).apply(t, c);
            });
            if (((g.source = d), eu(g))) throw g;
            return g;
          }),
          ($n.times = function (t, e) {
            if ((t = bu(t)) < 1 || t > f) return [];
            var n = d,
              r = _n(t, d);
            (e = fi(e)), (t -= d);
            for (var o = We(r, e); ++n < t; ) e(n);
            return o;
          }),
          ($n.toFinite = mu),
          ($n.toInteger = bu),
          ($n.toLength = _u),
          ($n.toLower = function (t) {
            return Eu(t).toLowerCase();
          }),
          ($n.toNumber = wu),
          ($n.toSafeInteger = function (t) {
            return t ? sr(bu(t), -9007199254740991, f) : 0 === t ? t : 0;
          }),
          ($n.toString = Eu),
          ($n.toUpper = function (t) {
            return Eu(t).toUpperCase();
          }),
          ($n.trim = function (e, n, r) {
            if ((e = Eu(e)) && (r || n === t)) return Ye(e);
            if (!e || !(n = fo(n))) return e;
            var o = dn(e),
              i = dn(n);
            return Eo(o, Je(o, i), Qe(o, i) + 1).join('');
          }),
          ($n.trimEnd = function (e, n, r) {
            if ((e = Eu(e)) && (r || n === t)) return e.slice(0, hn(e) + 1);
            if (!e || !(n = fo(n))) return e;
            var o = dn(e);
            return Eo(o, 0, Qe(o, dn(n)) + 1).join('');
          }),
          ($n.trimStart = function (e, n, r) {
            if ((e = Eu(e)) && (r || n === t)) return e.replace(nt, '');
            if (!e || !(n = fo(n))) return e;
            var o = dn(e);
            return Eo(o, Je(o, dn(n))).join('');
          }),
          ($n.truncate = function (e, n) {
            var r = 30,
              o = '...';
            if (iu(n)) {
              var i = 'separator' in n ? n.separator : i;
              (r = 'length' in n ? bu(n.length) : r),
                (o = 'omission' in n ? fo(n.omission) : o);
            }
            var a = (e = Eu(e)).length;
            if (an(e)) {
              var u = dn(e);
              a = u.length;
            }
            if (r >= a) return e;
            var s = r - ln(o);
            if (s < 1) return o;
            var c = u ? Eo(u, 0, s).join('') : e.slice(0, s);
            if (i === t) return c + o;
            if ((u && (s += c.length - s), fu(i))) {
              if (e.slice(s).search(i)) {
                var f,
                  l = c;
                for (
                  i.global || (i = Tt(i.source, Eu(lt.exec(i)) + 'g')),
                    i.lastIndex = 0;
                  (f = i.exec(l));

                )
                  var d = f.index;
                c = c.slice(0, d === t ? s : d);
              }
            } else if (e.indexOf(fo(i), s) != s) {
              var h = c.lastIndexOf(i);
              h > -1 && (c = c.slice(0, h));
            }
            return c + o;
          }),
          ($n.unescape = function (t) {
            return (t = Eu(t)) && Y.test(t) ? t.replace(H, pn) : t;
          }),
          ($n.uniqueId = function (t) {
            var e = ++Lt;
            return Eu(t) + e;
          }),
          ($n.upperCase = ts),
          ($n.upperFirst = es),
          ($n.each = Ea),
          ($n.eachRight = Aa),
          ($n.first = Qi),
          ds(
            $n,
            ((Ss = {}),
            wr($n, function (t, e) {
              jt.call($n.prototype, e) || (Ss[e] = t);
            }),
            Ss),
            { chain: !1 }
          ),
          ($n.VERSION = '4.17.21'),
          Ee(
            [
              'bind',
              'bindKey',
              'curry',
              'curryRight',
              'partial',
              'partialRight',
            ],
            function (t) {
              $n[t].placeholder = $n;
            }
          ),
          Ee(['drop', 'take'], function (e, n) {
            (Wn.prototype[e] = function (r) {
              r = r === t ? 1 : bn(bu(r), 0);
              var o = this.__filtered__ && !n ? new Wn(this) : this.clone();
              return (
                o.__filtered__
                  ? (o.__takeCount__ = _n(r, o.__takeCount__))
                  : o.__views__.push({
                      size: _n(r, d),
                      type: e + (o.__dir__ < 0 ? 'Right' : ''),
                    }),
                o
              );
            }),
              (Wn.prototype[e + 'Right'] = function (t) {
                return this.reverse()[e](t).reverse();
              });
          }),
          Ee(['filter', 'map', 'takeWhile'], function (t, e) {
            var n = e + 1,
              r = 1 == n || 3 == n;
            Wn.prototype[t] = function (t) {
              var e = this.clone();
              return (
                e.__iteratees__.push({ iteratee: fi(t, 3), type: n }),
                (e.__filtered__ = e.__filtered__ || r),
                e
              );
            };
          }),
          Ee(['head', 'last'], function (t, e) {
            var n = 'take' + (e ? 'Right' : '');
            Wn.prototype[t] = function () {
              return this[n](1).value()[0];
            };
          }),
          Ee(['initial', 'tail'], function (t, e) {
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
            return this.filter(Da(fi(t)));
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
          wr(Wn.prototype, function (e, n) {
            var r = /^(?:filter|find|map|reject)|While$/.test(n),
              o = /^(?:head|last)$/.test(n),
              i = $n[o ? 'take' + ('last' == n ? 'Right' : '') : n],
              a = o || /^find/.test(n);
            i &&
              ($n.prototype[n] = function () {
                var n = this.__wrapped__,
                  u = o ? [1] : arguments,
                  s = n instanceof Wn,
                  c = u[0],
                  f = s || Ka(n),
                  l = function (t) {
                    var e = i.apply($n, Be([t], u));
                    return o && d ? e[0] : e;
                  };
                f &&
                  r &&
                  'function' == typeof c &&
                  1 != c.length &&
                  (s = f = !1);
                var d = this.__chain__,
                  h = !!this.__actions__.length,
                  p = a && !d,
                  v = s && !h;
                if (!a && f) {
                  n = v ? n : new Wn(this);
                  var g = e.apply(n, u);
                  return (
                    g.__actions__.push({ func: ma, args: [l], thisArg: t }),
                    new Hn(g, d)
                  );
                }
                return p && v
                  ? e.apply(this, u)
                  : ((g = this.thru(l)),
                    p ? (o ? g.value()[0] : g.value()) : g);
              });
          }),
          Ee(
            ['pop', 'push', 'shift', 'sort', 'splice', 'unshift'],
            function (t) {
              var e = kt[t],
                n = /^(?:push|sort|unshift)$/.test(t) ? 'tap' : 'thru',
                r = /^(?:pop|shift)$/.test(t);
              $n.prototype[t] = function () {
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
          wr(Wn.prototype, function (t, e) {
            var n = $n[e];
            if (n) {
              var r = n.name + '';
              jt.call(On, r) || (On[r] = []), On[r].push({ name: e, func: n });
            }
          }),
          (On[zo(t, 2).name] = [{ name: 'wrapper', func: t }]),
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
                      e = _n(e, t + a);
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
              f = this.__iteratees__,
              l = f.length,
              d = 0,
              h = _n(s, this.__takeCount__);
            if (!n || (!r && o == s && h == s)) return go(t, this.__actions__);
            var p = [];
            t: for (; s-- && d < h; ) {
              for (var v = -1, g = t[(c += e)]; ++v < l; ) {
                var y = f[v],
                  m = y.iteratee,
                  b = y.type,
                  _ = m(g);
                if (2 == b) g = _;
                else if (!_) {
                  if (1 == b) continue t;
                  break t;
                }
              }
              p[d++] = g;
            }
            return p;
          }),
          ($n.prototype.at = ba),
          ($n.prototype.chain = function () {
            return ya(this);
          }),
          ($n.prototype.commit = function () {
            return new Hn(this.value(), this.__chain__);
          }),
          ($n.prototype.next = function () {
            this.__values__ === t && (this.__values__ = yu(this.value()));
            var e = this.__index__ >= this.__values__.length;
            return {
              done: e,
              value: e ? t : this.__values__[this.__index__++],
            };
          }),
          ($n.prototype.plant = function (e) {
            for (var n, r = this; r instanceof Vn; ) {
              var o = Hi(r);
              (o.__index__ = 0),
                (o.__values__ = t),
                n ? (i.__wrapped__ = o) : (n = o);
              var i = o;
              r = r.__wrapped__;
            }
            return (i.__wrapped__ = e), n;
          }),
          ($n.prototype.reverse = function () {
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
          ($n.prototype.toJSON =
            $n.prototype.valueOf =
            $n.prototype.value =
              function () {
                return go(this.__wrapped__, this.__actions__);
              }),
          ($n.prototype.first = $n.prototype.head),
          se &&
            ($n.prototype[se] = function () {
              return this;
            }),
          $n
        );
      })();
    le ? (((le.exports = vn)._ = vn), (fe._ = vn)) : (ce._ = vn);
  }.call(on);
var un = Object.prototype;
var sn = function (t) {
  var e = t && t.constructor;
  return t === (('function' == typeof e && e.prototype) || un);
};
var cn = function (t, e) {
    return function (n) {
      return t(e(n));
    };
  },
  fn = cn(Object.keys, Object),
  ln = sn,
  dn = fn,
  hn = Object.prototype.hasOwnProperty;
var pn = function (t) {
    if (!ln(t)) return dn(t);
    var e = [];
    for (var n in Object(t)) hn.call(t, n) && 'constructor' != n && e.push(n);
    return e;
  },
  vn = 'object' == typeof on && on && on.Object === Object && on,
  gn = vn,
  yn = 'object' == typeof self && self && self.Object === Object && self,
  mn = gn || yn || Function('return this')(),
  bn = mn.Symbol,
  _n = bn,
  wn = Object.prototype,
  Sn = wn.hasOwnProperty,
  En = wn.toString,
  An = _n ? _n.toStringTag : void 0;
var xn = function (t) {
    var e = Sn.call(t, An),
      n = t[An];
    try {
      t[An] = void 0;
      var r = !0;
    } catch (i) {}
    var o = En.call(t);
    return r && (e ? (t[An] = n) : delete t[An]), o;
  },
  In = Object.prototype.toString;
var Cn = xn,
  Tn = function (t) {
    return In.call(t);
  },
  Pn = bn ? bn.toStringTag : void 0;
var Bn = function (t) {
  return null == t
    ? void 0 === t
      ? '[object Undefined]'
      : '[object Null]'
    : Pn && Pn in Object(t)
    ? Cn(t)
    : Tn(t);
};
var kn = function (t) {
    var e = typeof t;
    return null != t && ('object' == e || 'function' == e);
  },
  On = Bn,
  Rn = kn;
var Un,
  Nn = function (t) {
    if (!Rn(t)) return !1;
    var e = On(t);
    return (
      '[object Function]' == e ||
      '[object GeneratorFunction]' == e ||
      '[object AsyncFunction]' == e ||
      '[object Proxy]' == e
    );
  },
  jn = mn['__core-js_shared__'],
  Ln = (Un = /[^.]+$/.exec((jn && jn.keys && jn.keys.IE_PROTO) || ''))
    ? 'Symbol(src)_1.' + Un
    : '';
var Fn = function (t) {
    return !!Ln && Ln in t;
  },
  Mn = Function.prototype.toString;
var Dn = function (t) {
    if (null != t) {
      try {
        return Mn.call(t);
      } catch (e) {}
      try {
        return t + '';
      } catch (e) {}
    }
    return '';
  },
  $n = Nn,
  zn = Fn,
  Vn = kn,
  Hn = Dn,
  Wn = /^\[object .+?Constructor\]$/,
  Yn = Function.prototype,
  qn = Object.prototype,
  Gn = Yn.toString,
  Kn = qn.hasOwnProperty,
  Jn = RegExp(
    '^' +
      Gn.call(Kn)
        .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          '$1.*?'
        ) +
      '$'
  );
var Qn = function (t) {
    return !(!Vn(t) || zn(t)) && ($n(t) ? Jn : Wn).test(Hn(t));
  },
  Zn = function (t, e) {
    return null == t ? void 0 : t[e];
  };
var Xn = function (t, e) {
    var n = Zn(t, e);
    return Qn(n) ? n : void 0;
  },
  tr = Xn(mn, 'DataView'),
  er = Xn(mn, 'Map'),
  nr = tr,
  rr = er,
  or = Xn(mn, 'Promise'),
  ir = Xn(mn, 'Set'),
  ar = Xn(mn, 'WeakMap'),
  ur = Bn,
  sr = Dn,
  cr = sr(nr),
  fr = sr(rr),
  lr = sr(or),
  dr = sr(ir),
  hr = sr(ar),
  pr = ur;
((nr && '[object DataView]' != pr(new nr(new ArrayBuffer(1)))) ||
  (rr && '[object Map]' != pr(new rr())) ||
  (or && '[object Promise]' != pr(or.resolve())) ||
  (ir && '[object Set]' != pr(new ir())) ||
  (ar && '[object WeakMap]' != pr(new ar()))) &&
  (pr = function (t) {
    var e = ur(t),
      n = '[object Object]' == e ? t.constructor : void 0,
      r = n ? sr(n) : '';
    if (r)
      switch (r) {
        case cr:
          return '[object DataView]';
        case fr:
          return '[object Map]';
        case lr:
          return '[object Promise]';
        case dr:
          return '[object Set]';
        case hr:
          return '[object WeakMap]';
      }
    return e;
  });
var vr = pr;
var gr = function (t) {
    return null != t && 'object' == typeof t;
  },
  yr = Bn,
  mr = gr;
var br = function (t) {
    return mr(t) && '[object Arguments]' == yr(t);
  },
  _r = gr,
  wr = Object.prototype,
  Sr = wr.hasOwnProperty,
  Er = wr.propertyIsEnumerable,
  Ar = br(
    (function () {
      return arguments;
    })()
  )
    ? br
    : function (t) {
        return _r(t) && Sr.call(t, 'callee') && !Er.call(t, 'callee');
      },
  xr = Array.isArray;
var Ir = function (t) {
    return (
      'number' == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991
    );
  },
  Cr = Nn,
  Tr = Ir;
var Pr = function (t) {
    return null != t && Tr(t.length) && !Cr(t);
  },
  Br = { exports: {} };
var kr = function () {
  return !1;
};
!(function (t, e) {
  var n = mn,
    r = kr,
    o = e && !e.nodeType && e,
    i = o && t && !t.nodeType && t,
    a = i && i.exports === o ? n.Buffer : void 0,
    u = (a ? a.isBuffer : void 0) || r;
  t.exports = u;
})(Br, Br.exports);
var Or = Bn,
  Rr = Ir,
  Ur = gr,
  Nr = {};
(Nr['[object Float32Array]'] =
  Nr['[object Float64Array]'] =
  Nr['[object Int8Array]'] =
  Nr['[object Int16Array]'] =
  Nr['[object Int32Array]'] =
  Nr['[object Uint8Array]'] =
  Nr['[object Uint8ClampedArray]'] =
  Nr['[object Uint16Array]'] =
  Nr['[object Uint32Array]'] =
    !0),
  (Nr['[object Arguments]'] =
    Nr['[object Array]'] =
    Nr['[object ArrayBuffer]'] =
    Nr['[object Boolean]'] =
    Nr['[object DataView]'] =
    Nr['[object Date]'] =
    Nr['[object Error]'] =
    Nr['[object Function]'] =
    Nr['[object Map]'] =
    Nr['[object Number]'] =
    Nr['[object Object]'] =
    Nr['[object RegExp]'] =
    Nr['[object Set]'] =
    Nr['[object String]'] =
    Nr['[object WeakMap]'] =
      !1);
var jr = function (t) {
  return Ur(t) && Rr(t.length) && !!Nr[Or(t)];
};
var Lr = function (t) {
    return function (e) {
      return t(e);
    };
  },
  Fr = { exports: {} };
!(function (t, e) {
  var n = vn,
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
})(Fr, Fr.exports);
var Mr = jr,
  Dr = Lr,
  $r = Fr.exports,
  zr = $r && $r.isTypedArray,
  Vr = zr ? Dr(zr) : Mr,
  Hr = pn,
  Wr = vr,
  Yr = Ar,
  qr = xr,
  Gr = Pr,
  Kr = Br.exports,
  Jr = sn,
  Qr = Vr,
  Zr = Object.prototype.hasOwnProperty;
var Xr = function (t) {
  if (null == t) return !0;
  if (
    Gr(t) &&
    (qr(t) ||
      'string' == typeof t ||
      'function' == typeof t.splice ||
      Kr(t) ||
      Qr(t) ||
      Yr(t))
  )
    return !t.length;
  var e = Wr(t);
  if ('[object Map]' == e || '[object Set]' == e) return !t.size;
  if (Jr(t)) return !Hr(t).length;
  for (var n in t) if (Zr.call(t, n)) return !1;
  return !0;
};
var to = function () {
  (this.__data__ = []), (this.size = 0);
};
var eo = function (t, e) {
    return t === e || (t != t && e != e);
  },
  no = eo;
var ro = function (t, e) {
    for (var n = t.length; n--; ) if (no(t[n][0], e)) return n;
    return -1;
  },
  oo = ro,
  io = Array.prototype.splice;
var ao = ro;
var uo = ro;
var so = ro;
var co = to,
  fo = function (t) {
    var e = this.__data__,
      n = oo(e, t);
    return (
      !(n < 0) &&
      (n == e.length - 1 ? e.pop() : io.call(e, n, 1), --this.size, !0)
    );
  },
  lo = function (t) {
    var e = this.__data__,
      n = ao(e, t);
    return n < 0 ? void 0 : e[n][1];
  },
  ho = function (t) {
    return uo(this.__data__, t) > -1;
  },
  po = function (t, e) {
    var n = this.__data__,
      r = so(n, t);
    return r < 0 ? (++this.size, n.push([t, e])) : (n[r][1] = e), this;
  };
function vo(t) {
  var e = -1,
    n = null == t ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
(vo.prototype.clear = co),
  (vo.prototype.delete = fo),
  (vo.prototype.get = lo),
  (vo.prototype.has = ho),
  (vo.prototype.set = po);
var go = vo,
  yo = go;
var mo = function () {
  (this.__data__ = new yo()), (this.size = 0);
};
var bo = function (t) {
  var e = this.__data__,
    n = e.delete(t);
  return (this.size = e.size), n;
};
var _o = function (t) {
  return this.__data__.get(t);
};
var wo = function (t) {
    return this.__data__.has(t);
  },
  So = Xn(Object, 'create'),
  Eo = So;
var Ao = function () {
  (this.__data__ = Eo ? Eo(null) : {}), (this.size = 0);
};
var xo = function (t) {
    var e = this.has(t) && delete this.__data__[t];
    return (this.size -= e ? 1 : 0), e;
  },
  Io = So,
  Co = Object.prototype.hasOwnProperty;
var To = function (t) {
    var e = this.__data__;
    if (Io) {
      var n = e[t];
      return '__lodash_hash_undefined__' === n ? void 0 : n;
    }
    return Co.call(e, t) ? e[t] : void 0;
  },
  Po = So,
  Bo = Object.prototype.hasOwnProperty;
var ko = So;
var Oo = Ao,
  Ro = xo,
  Uo = To,
  No = function (t) {
    var e = this.__data__;
    return Po ? void 0 !== e[t] : Bo.call(e, t);
  },
  jo = function (t, e) {
    var n = this.__data__;
    return (
      (this.size += this.has(t) ? 0 : 1),
      (n[t] = ko && void 0 === e ? '__lodash_hash_undefined__' : e),
      this
    );
  };
function Lo(t) {
  var e = -1,
    n = null == t ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
(Lo.prototype.clear = Oo),
  (Lo.prototype.delete = Ro),
  (Lo.prototype.get = Uo),
  (Lo.prototype.has = No),
  (Lo.prototype.set = jo);
var Fo = Lo,
  Mo = go,
  Do = er;
var $o = function (t) {
  var e = typeof t;
  return 'string' == e || 'number' == e || 'symbol' == e || 'boolean' == e
    ? '__proto__' !== t
    : null === t;
};
var zo = function (t, e) {
    var n = t.__data__;
    return $o(e) ? n['string' == typeof e ? 'string' : 'hash'] : n.map;
  },
  Vo = zo;
var Ho = zo;
var Wo = zo;
var Yo = zo;
var qo = function () {
    (this.size = 0),
      (this.__data__ = {
        hash: new Fo(),
        map: new (Do || Mo)(),
        string: new Fo(),
      });
  },
  Go = function (t) {
    var e = Vo(this, t).delete(t);
    return (this.size -= e ? 1 : 0), e;
  },
  Ko = function (t) {
    return Ho(this, t).get(t);
  },
  Jo = function (t) {
    return Wo(this, t).has(t);
  },
  Qo = function (t, e) {
    var n = Yo(this, t),
      r = n.size;
    return n.set(t, e), (this.size += n.size == r ? 0 : 1), this;
  };
function Zo(t) {
  var e = -1,
    n = null == t ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
(Zo.prototype.clear = qo),
  (Zo.prototype.delete = Go),
  (Zo.prototype.get = Ko),
  (Zo.prototype.has = Jo),
  (Zo.prototype.set = Qo);
var Xo = go,
  ti = er,
  ei = Zo;
var ni = go,
  ri = mo,
  oi = bo,
  ii = _o,
  ai = wo,
  ui = function (t, e) {
    var n = this.__data__;
    if (n instanceof Xo) {
      var r = n.__data__;
      if (!ti || r.length < 199)
        return r.push([t, e]), (this.size = ++n.size), this;
      n = this.__data__ = new ei(r);
    }
    return n.set(t, e), (this.size = n.size), this;
  };
function si(t) {
  var e = (this.__data__ = new ni(t));
  this.size = e.size;
}
(si.prototype.clear = ri),
  (si.prototype.delete = oi),
  (si.prototype.get = ii),
  (si.prototype.has = ai),
  (si.prototype.set = ui);
var ci = si,
  fi = Xn,
  li = (function () {
    try {
      var t = fi(Object, 'defineProperty');
      return t({}, '', {}), t;
    } catch (e) {}
  })(),
  di = li;
var hi = function (t, e, n) {
    '__proto__' == e && di
      ? di(t, e, { configurable: !0, enumerable: !0, value: n, writable: !0 })
      : (t[e] = n);
  },
  pi = hi,
  vi = eo;
var gi = function (t, e, n) {
  ((void 0 !== n && !vi(t[e], n)) || (void 0 === n && !(e in t))) &&
    pi(t, e, n);
};
var yi = (function (t) {
    return function (e, n, r) {
      for (var o = -1, i = Object(e), a = r(e), u = a.length; u--; ) {
        var s = a[t ? u : ++o];
        if (!1 === n(i[s], s, i)) break;
      }
      return e;
    };
  })(),
  mi = { exports: {} };
!(function (t, e) {
  var n = mn,
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
})(mi, mi.exports);
var bi = mn.Uint8Array;
var _i = function (t) {
  var e = new t.constructor(t.byteLength);
  return new bi(e).set(new bi(t)), e;
};
var wi = function (t, e) {
  var n = e ? _i(t.buffer) : t.buffer;
  return new t.constructor(n, t.byteOffset, t.length);
};
var Si = function (t, e) {
    var n = -1,
      r = t.length;
    for (e || (e = Array(r)); ++n < r; ) e[n] = t[n];
    return e;
  },
  Ei = kn,
  Ai = Object.create,
  xi = (function () {
    function t() {}
    return function (e) {
      if (!Ei(e)) return {};
      if (Ai) return Ai(e);
      t.prototype = e;
      var n = new t();
      return (t.prototype = void 0), n;
    };
  })(),
  Ii = cn(Object.getPrototypeOf, Object),
  Ci = xi,
  Ti = Ii,
  Pi = sn;
var Bi = function (t) {
    return 'function' != typeof t.constructor || Pi(t) ? {} : Ci(Ti(t));
  },
  ki = Pr,
  Oi = gr;
var Ri = function (t) {
    return Oi(t) && ki(t);
  },
  Ui = Bn,
  Ni = Ii,
  ji = gr,
  Li = Function.prototype,
  Fi = Object.prototype,
  Mi = Li.toString,
  Di = Fi.hasOwnProperty,
  $i = Mi.call(Object);
var zi = function (t) {
  if (!ji(t) || '[object Object]' != Ui(t)) return !1;
  var e = Ni(t);
  if (null === e) return !0;
  var n = Di.call(e, 'constructor') && e.constructor;
  return 'function' == typeof n && n instanceof n && Mi.call(n) == $i;
};
var Vi = function (t, e) {
    if (('constructor' !== e || 'function' != typeof t[e]) && '__proto__' != e)
      return t[e];
  },
  Hi = hi,
  Wi = eo,
  Yi = Object.prototype.hasOwnProperty;
var qi = function (t, e, n) {
    var r = t[e];
    (Yi.call(t, e) && Wi(r, n) && (void 0 !== n || e in t)) || Hi(t, e, n);
  },
  Gi = hi;
var Ki = function (t, e, n, r) {
  var o = !n;
  n || (n = {});
  for (var i = -1, a = e.length; ++i < a; ) {
    var u = e[i],
      s = r ? r(n[u], t[u], u, n, t) : void 0;
    void 0 === s && (s = t[u]), o ? Gi(n, u, s) : qi(n, u, s);
  }
  return n;
};
var Ji = /^(?:0|[1-9]\d*)$/;
var Qi = function (t, e) {
    var n = typeof t;
    return (
      !!(e = null == e ? 9007199254740991 : e) &&
      ('number' == n || ('symbol' != n && Ji.test(t))) &&
      t > -1 &&
      t % 1 == 0 &&
      t < e
    );
  },
  Zi = function (t, e) {
    for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n);
    return r;
  },
  Xi = Ar,
  ta = xr,
  ea = Br.exports,
  na = Qi,
  ra = Vr,
  oa = Object.prototype.hasOwnProperty;
var ia = function (t, e) {
  var n = ta(t),
    r = !n && Xi(t),
    o = !n && !r && ea(t),
    i = !n && !r && !o && ra(t),
    a = n || r || o || i,
    u = a ? Zi(t.length, String) : [],
    s = u.length;
  for (var c in t)
    (!e && !oa.call(t, c)) ||
      (a &&
        ('length' == c ||
          (o && ('offset' == c || 'parent' == c)) ||
          (i && ('buffer' == c || 'byteLength' == c || 'byteOffset' == c)) ||
          na(c, s))) ||
      u.push(c);
  return u;
};
var aa = kn,
  ua = sn,
  sa = function (t) {
    var e = [];
    if (null != t) for (var n in Object(t)) e.push(n);
    return e;
  },
  ca = Object.prototype.hasOwnProperty;
var fa = ia,
  la = function (t) {
    if (!aa(t)) return sa(t);
    var e = ua(t),
      n = [];
    for (var r in t) ('constructor' != r || (!e && ca.call(t, r))) && n.push(r);
    return n;
  },
  da = Pr;
var ha = function (t) {
    return da(t) ? fa(t, !0) : la(t);
  },
  pa = Ki,
  va = ha;
var ga = gi,
  ya = mi.exports,
  ma = wi,
  ba = Si,
  _a = Bi,
  wa = Ar,
  Sa = xr,
  Ea = Ri,
  Aa = Br.exports,
  xa = Nn,
  Ia = kn,
  Ca = zi,
  Ta = Vr,
  Pa = Vi,
  Ba = function (t) {
    return pa(t, va(t));
  };
var ka = ci,
  Oa = gi,
  Ra = yi,
  Ua = function (t, e, n, r, o, i, a) {
    var u = Pa(t, n),
      s = Pa(e, n),
      c = a.get(s);
    if (c) ga(t, n, c);
    else {
      var f = i ? i(u, s, n + '', t, e, a) : void 0,
        l = void 0 === f;
      if (l) {
        var d = Sa(s),
          h = !d && Aa(s),
          p = !d && !h && Ta(s);
        (f = s),
          d || h || p
            ? Sa(u)
              ? (f = u)
              : Ea(u)
              ? (f = ba(u))
              : h
              ? ((l = !1), (f = ya(s, !0)))
              : p
              ? ((l = !1), (f = ma(s, !0)))
              : (f = [])
            : Ca(s) || wa(s)
            ? ((f = u), wa(u) ? (f = Ba(u)) : (Ia(u) && !xa(u)) || (f = _a(s)))
            : (l = !1);
      }
      l && (a.set(s, f), o(f, s, r, i, a), a.delete(s)), ga(t, n, f);
    }
  },
  Na = kn,
  ja = ha,
  La = Vi;
var Fa = function t(e, n, r, o, i) {
  e !== n &&
    Ra(
      n,
      function (a, u) {
        if ((i || (i = new ka()), Na(a))) Ua(e, n, u, r, t, o, i);
        else {
          var s = o ? o(La(e, u), a, u + '', e, n, i) : void 0;
          void 0 === s && (s = a), Oa(e, u, s);
        }
      },
      ja
    );
};
var Ma = function (t) {
  return t;
};
var Da = function (t, e, n) {
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
  $a = Math.max;
var za = function (t, e, n) {
  return (
    (e = $a(void 0 === e ? t.length - 1 : e, 0)),
    function () {
      for (
        var r = arguments, o = -1, i = $a(r.length - e, 0), a = Array(i);
        ++o < i;

      )
        a[o] = r[e + o];
      o = -1;
      for (var u = Array(e + 1); ++o < e; ) u[o] = r[o];
      return (u[e] = n(a)), Da(t, this, u);
    }
  );
};
var Va = function (t) {
    return function () {
      return t;
    };
  },
  Ha = li,
  Wa = Ha
    ? function (t, e) {
        return Ha(t, 'toString', {
          configurable: !0,
          enumerable: !1,
          value: Va(e),
          writable: !0,
        });
      }
    : Ma,
  Ya = Date.now;
var qa = (function (t) {
    var e = 0,
      n = 0;
    return function () {
      var r = Ya(),
        o = 16 - (r - n);
      if (((n = r), o > 0)) {
        if (++e >= 800) return arguments[0];
      } else e = 0;
      return t.apply(void 0, arguments);
    };
  })(Wa),
  Ga = Ma,
  Ka = za,
  Ja = qa;
var Qa = eo,
  Za = Pr,
  Xa = Qi,
  tu = kn;
var eu = function (t, e) {
    return Ja(Ka(t, e, Ga), t + '');
  },
  nu = function (t, e, n) {
    if (!tu(n)) return !1;
    var r = typeof e;
    return (
      !!('number' == r ? Za(n) && Xa(e, n.length) : 'string' == r && e in n) &&
      Qa(n[e], t)
    );
  };
var ru = Fa,
  ou = (function (t) {
    return eu(function (e, n) {
      var r = -1,
        o = n.length,
        i = o > 1 ? n[o - 1] : void 0,
        a = o > 2 ? n[2] : void 0;
      for (
        i = t.length > 3 && 'function' == typeof i ? (o--, i) : void 0,
          a && nu(n[0], n[1], a) && ((i = o < 3 ? void 0 : i), (o = 1)),
          e = Object(e);
        ++r < o;

      ) {
        var u = n[r];
        u && t(e, u, r, i);
      }
      return e;
    });
  })(function (t, e, n) {
    ru(t, e, n);
  }),
  iu = {},
  au = {};
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
      for (var n = 0, r = e.length, o = t.length; n < r; n++, o++) t[o] = e[n];
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
})(au);
var uu = {};
Object.defineProperty(uu, '__esModule', { value: !0 });
uu.IS_PRODUCTION = !0;
var su = {},
  cu = {};
Object.defineProperty(cu, '__esModule', { value: !0 });
(cu.DEFAULT_GUARD_TYPE = 'xstate.guard'),
  (cu.EMPTY_ACTIVITY_MAP = {}),
  (cu.STATE_DELIMITER = '.'),
  (cu.TARGETLESS_KEY = ''),
  (function (t) {
    Object.defineProperty(t, '__esModule', { value: !0 });
    var e = au,
      n = cu,
      r = uu;
    function o(t) {
      return Object.keys(t);
    }
    function i(t, e) {
      try {
        return p(t) ? t : t.toString().split(e);
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
        : p(t)
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
    function f(t) {
      var n;
      return (n = []).concat.apply(n, e.__spreadArray([], e.__read(t)));
    }
    function l(t) {
      return p(t) ? t : [t];
    }
    function d(t) {
      return void 0 === t ? [] : l(t);
    }
    function h(t, e) {
      return c(t.states, function (t, n) {
        if (t) {
          var r = (g(e) ? void 0 : e[n]) || (t ? t.current : void 0);
          if (r) return { current: r, states: h(t, r) };
        }
      });
    }
    function p(t) {
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
    function _(t, n) {
      return g(t) || 'number' == typeof t ? e.__assign({ type: t }, n) : t;
    }
    (t.evaluateGuard = function (t, e, r, o, i) {
      var a = t.options.guards,
        u = { state: i, cond: e, _event: o };
      if (e.type === n.DEFAULT_GUARD_TYPE) return e.predicate(r, o.data, u);
      var s = a[e.type];
      if (!s)
        throw new Error(
          "Guard '" + e.type + "' is not implemented on machine '" + t.id + "'."
        );
      return s(r, o.data, u);
    }),
      (t.flatten = f),
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
      (t.isArray = p),
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
              f = t[c];
            v(f) ? (a[c] = f(n, r.data)) : (a[c] = f);
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
      }),
      (t.mapFilterValues = function (t, n, r) {
        var i,
          a,
          u = {};
        try {
          for (var s = e.__values(o(t)), c = s.next(); !c.done; c = s.next()) {
            var f = c.value,
              l = t[f];
            r(l) && (u[f] = n(l, f, t));
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
            var f = c.value;
            n(f) ? a.push(f) : u.push(f);
          }
        } catch (l) {
          r = { error: l };
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
      (t.toArrayStrict = l),
      (t.toEventObject = _),
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
        var r = _(t);
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
            : f(
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
        return l(n).map(function (n) {
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
                  f = {};
                if (v(s)) f = s(t, i.data, c);
                else
                  try {
                    for (
                      var l = e.__values(o(s)), d = l.next();
                      !d.done;
                      d = l.next()
                    ) {
                      var h = d.value,
                        p = s[h];
                      f[h] = v(p) ? p(t, i.data, c) : p;
                    }
                  } catch (g) {
                    r = { error: g };
                  } finally {
                    try {
                      d && !d.done && (a = l.return) && a.call(l);
                    } finally {
                      if (r) throw r.error;
                    }
                  }
                return Object.assign({}, t, f);
              }, n)
            : n
        );
      }),
      (t.updateHistoryStates = h),
      (t.updateHistoryValue = function (t, e) {
        return { current: e, states: h(t, e) };
      });
  })(su);
var fu = {};
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
})(fu);
var lu = {};
Object.defineProperty(lu, '__esModule', { value: !0 });
var du = fu,
  hu = du.ActionTypes.Start,
  pu = du.ActionTypes.Stop,
  vu = du.ActionTypes.Raise,
  gu = du.ActionTypes.Send,
  yu = du.ActionTypes.Cancel,
  mu = du.ActionTypes.NullEvent,
  bu = du.ActionTypes.Assign,
  _u = du.ActionTypes.After,
  wu = du.ActionTypes.DoneState,
  Su = du.ActionTypes.Log,
  Eu = du.ActionTypes.Init,
  Au = du.ActionTypes.Invoke,
  xu = du.ActionTypes.ErrorExecution,
  Iu = du.ActionTypes.ErrorPlatform,
  Cu = du.ActionTypes.ErrorCustom,
  Tu = du.ActionTypes.Update,
  Pu = du.ActionTypes.Choose,
  Bu = du.ActionTypes.Pure;
(lu.after = _u),
  (lu.assign = bu),
  (lu.cancel = yu),
  (lu.choose = Pu),
  (lu.doneState = wu),
  (lu.error = Cu),
  (lu.errorExecution = xu),
  (lu.errorPlatform = Iu),
  (lu.init = Eu),
  (lu.invoke = Au),
  (lu.log = Su),
  (lu.nullEvent = mu),
  (lu.pure = Bu),
  (lu.raise = vu),
  (lu.send = gu),
  (lu.start = hu),
  (lu.stop = pu),
  (lu.update = Tu),
  Object.defineProperty(iu, '__esModule', { value: !0 });
var ku = au,
  Ou = uu,
  Ru = su,
  Uu = fu,
  Nu = lu,
  ju = Ru.toSCXMLEvent({ type: Nu.init });
function Lu(t, e) {
  return (e && e[t]) || void 0;
}
function Fu(t, e) {
  var n;
  if (Ru.isString(t) || 'number' == typeof t) {
    var r = Lu(t, e);
    n = Ru.isFunction(r)
      ? { type: t, exec: r }
      : r || { type: t, exec: void 0 };
  } else if (Ru.isFunction(t)) n = { type: t.name || t.toString(), exec: t };
  else {
    r = Lu(t.type, e);
    if (Ru.isFunction(r)) n = ku.__assign(ku.__assign({}, t), { exec: r });
    else if (r) {
      var o = r.type || t.type;
      n = ku.__assign(ku.__assign(ku.__assign({}, r), t), { type: o });
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
var Mu = function (t, e) {
  return t
    ? (Ru.isArray(t) ? t : [t]).map(function (t) {
        return Fu(t, e);
      })
    : [];
};
function Du(t) {
  var e = Fu(t);
  return ku.__assign(ku.__assign({ id: Ru.isString(t) ? t : e.id }, e), {
    type: e.type,
  });
}
function $u(t) {
  return { type: Nu.raise, _event: Ru.toSCXMLEvent(t.event) };
}
function zu(t, e) {
  return {
    to: e ? e.to : void 0,
    type: Nu.send,
    event: Ru.isFunction(t) ? t : Ru.toEventObject(t),
    delay: e ? e.delay : void 0,
    id:
      e && void 0 !== e.id
        ? e.id
        : Ru.isFunction(t)
        ? t.name
        : Ru.getEventType(t),
  };
}
function Vu(t, e, n, r) {
  var o,
    i = { _event: n },
    a = Ru.toSCXMLEvent(
      Ru.isFunction(t.event) ? t.event(e, n.data, i) : t.event
    );
  if (Ru.isString(t.delay)) {
    var u = r && r[t.delay];
    o = Ru.isFunction(u) ? u(e, n.data, i) : u;
  } else o = Ru.isFunction(t.delay) ? t.delay(e, n.data, i) : t.delay;
  var s = Ru.isFunction(t.to) ? t.to(e, n.data, i) : t.to;
  return ku.__assign(ku.__assign({}, t), {
    to: s,
    _event: a,
    event: a.data,
    delay: o,
  });
}
function Hu(t, e) {
  return zu(
    t,
    ku.__assign(ku.__assign({}, e), { to: Uu.SpecialTargets.Parent })
  );
}
var Wu = function (t, e) {
  return { context: t, event: e };
};
var Yu = function (t, e, n) {
  return ku.__assign(ku.__assign({}, t), {
    value: Ru.isString(t.expr) ? t.expr : t.expr(e, n.data, { _event: n }),
  });
};
function qu(t, e, n) {
  var r = Ru.isFunction(t.activity) ? t.activity(e, n.data) : t.activity,
    o = 'string' == typeof r ? { id: r } : r;
  return { type: Uu.ActionTypes.Stop, activity: o };
}
(iu.after = function (t, e) {
  var n = e ? '#' + e : '';
  return Uu.ActionTypes.After + '(' + t + ')' + n;
}),
  (iu.assign = function (t) {
    return { type: Nu.assign, assignment: t };
  }),
  (iu.cancel = function (t) {
    return { type: Nu.cancel, sendId: t };
  }),
  (iu.choose = function (t) {
    return { type: Uu.ActionTypes.Choose, conds: t };
  }),
  (iu.done = function (t, e) {
    var n = Uu.ActionTypes.DoneState + '.' + t,
      r = {
        type: n,
        data: e,
        toString: function () {
          return n;
        },
      };
    return r;
  }),
  (iu.doneInvoke = function (t, e) {
    var n = Uu.ActionTypes.DoneInvoke + '.' + t,
      r = {
        type: n,
        data: e,
        toString: function () {
          return n;
        },
      };
    return r;
  }),
  (iu.error = function (t, e) {
    var n = Uu.ActionTypes.ErrorPlatform + '.' + t,
      r = {
        type: n,
        data: e,
        toString: function () {
          return n;
        },
      };
    return r;
  }),
  (iu.escalate = function (t, e) {
    return Hu(function (e, n, r) {
      return { type: Nu.error, data: Ru.isFunction(t) ? t(e, n, r) : t };
    }, ku.__assign(ku.__assign({}, e), { to: Uu.SpecialTargets.Parent }));
  }),
  (iu.forwardTo = function (t, e) {
    return zu(function (t, e) {
      return e;
    }, ku.__assign(ku.__assign({}, e), { to: t }));
  }),
  (iu.getActionFunction = Lu),
  (iu.initEvent = ju),
  (iu.log = function (t, e) {
    return void 0 === t && (t = Wu), { type: Nu.log, label: e, expr: t };
  }),
  (iu.pure = function (t) {
    return { type: Uu.ActionTypes.Pure, get: t };
  }),
  (iu.raise = function (t) {
    return Ru.isString(t)
      ? { type: Nu.raise, event: t }
      : zu(t, { to: Uu.SpecialTargets.Internal });
  }),
  (iu.resolveActions = function t(e, n, r, o, i, a) {
    void 0 === a && (a = !1);
    var u = ku.__read(
        a
          ? [[], i]
          : Ru.partition(i, function (t) {
              return t.type === Nu.assign;
            }),
        2
      ),
      s = u[0],
      c = u[1],
      f = s.length ? Ru.updateContext(r, o, s, n) : r,
      l = a ? [r] : void 0;
    return [
      Ru.flatten(
        c
          .map(function (r) {
            var i;
            switch (r.type) {
              case Nu.raise:
                return $u(r);
              case Nu.send:
                var u = Vu(r, f, o, e.options.delays);
                return (
                  Ou.IS_PRODUCTION ||
                    Ru.warn(
                      !Ru.isString(r.delay) || 'number' == typeof u.delay,
                      "No delay reference for delay expression '" +
                        r.delay +
                        "' was found on machine '" +
                        e.id +
                        "'"
                    ),
                  u
                );
              case Nu.log:
                return Yu(r, f, o);
              case Nu.choose:
                if (
                  !(h =
                    null ===
                      (i = r.conds.find(function (t) {
                        var r = Ru.toGuard(t.cond, e.options.guards);
                        return !r || Ru.evaluateGuard(e, r, f, o, n);
                      })) || void 0 === i
                      ? void 0
                      : i.actions)
                )
                  return [];
                var s = ku.__read(
                    t(e, n, f, o, Mu(Ru.toArray(h), e.options.actions), a),
                    2
                  ),
                  c = s[0],
                  d = s[1];
                return (f = d), null == l || l.push(f), c;
              case Nu.pure:
                var h;
                if (!(h = r.get(f, o.data))) return [];
                var p = ku.__read(
                    t(e, n, f, o, Mu(Ru.toArray(h), e.options.actions), a),
                    2
                  ),
                  v = p[0],
                  g = p[1];
                return (f = g), null == l || l.push(f), v;
              case Nu.stop:
                return qu(r, f, o);
              case Nu.assign:
                (f = Ru.updateContext(f, o, [r], n)), null == l || l.push(f);
                break;
              default:
                var y = Fu(r, e.options.actions),
                  m = y.exec;
                if (m && l) {
                  var b = l.length - 1;
                  y.exec = function (t) {
                    for (var e = [], n = 1; n < arguments.length; n++)
                      e[n - 1] = arguments[n];
                    null == m ||
                      m.apply(void 0, ku.__spreadArray([l[b]], ku.__read(e)));
                  };
                }
                return y;
            }
          })
          .filter(function (t) {
            return !!t;
          })
      ),
      f,
    ];
  }),
  (iu.resolveLog = Yu),
  (iu.resolveRaise = $u),
  (iu.resolveSend = Vu),
  (iu.resolveStop = qu),
  (iu.respond = function (t, e) {
    return zu(
      t,
      ku.__assign(ku.__assign({}, e), {
        to: function (t, e, n) {
          return n._event.origin;
        },
      })
    );
  }),
  (iu.send = zu),
  (iu.sendParent = Hu),
  (iu.sendUpdate = function () {
    return Hu(Nu.update);
  }),
  (iu.start = function (t) {
    var e = Du(t);
    return { type: Uu.ActionTypes.Start, activity: e, exec: void 0 };
  });
var Gu = (iu.stop = function (t) {
  var e = Ru.isFunction(t) ? t : Du(t);
  return { type: Uu.ActionTypes.Stop, activity: e, exec: void 0 };
});
(iu.toActionObject = Fu),
  (iu.toActionObjects = Mu),
  (iu.toActivityDefinition = Du);
var Ku,
  Ju,
  Qu = Object.defineProperty,
  Zu = Object.defineProperties,
  Xu = Object.getOwnPropertyDescriptors,
  ts = Object.getOwnPropertySymbols,
  es = Object.prototype.hasOwnProperty,
  ns = Object.prototype.propertyIsEnumerable,
  rs = (t, e, n) =>
    e in t
      ? Qu(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (t[e] = n),
  os = (t, e) => {
    for (var n in e || (e = {})) es.call(e, n) && rs(t, n, e[n]);
    if (ts) for (var n of ts(e)) ns.call(e, n) && rs(t, n, e[n]);
    return t;
  },
  is = (t, e) => Zu(t, Xu(e));
((Ju = Ku || (Ku = {})).SMS_MFA = 'SMS_MFA'),
  (Ju.SOFTWARE_TOKEN_MFA = 'SOFTWARE_TOKEN_MFA'),
  (Ju.NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED'),
  (Ju.MFA_SETUP = 'MFA_SETUP');
var as,
  us,
  ss,
  cs,
  fs = ['username', 'email', 'phone_number'],
  ls = ['amazon', 'google', 'facebook'],
  ds = Fe(
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
              entry: de(),
              on: {
                SUBMIT: 'submit',
                CHANGE: { actions: 'handleInput' },
                FEDERATED_SIGN_IN: 'federatedSignIn',
              },
            },
            federatedSignIn: {
              entry: [de(), 'clearError'],
              invoke: {
                src: 'federatedSignIn',
                onError: { actions: 'setRemoteError' },
              },
            },
            submit: {
              entry: ['clearError', de()],
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
              entry: ['clearError', de()],
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
              entry: de(),
              on: {
                SUBMIT: 'submit',
                SIGN_IN: '#signInActor.signIn',
                CHANGE: { actions: 'handleInput' },
              },
            },
            submit: {
              entry: ['clearError', de()],
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
              entry: de(),
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
              entry: de(),
              on: {
                SUBMIT: 'submit',
                SIGN_IN: '#signInActor.signIn',
                CHANGE: { actions: 'handleInput' },
              },
            },
            submit: {
              entry: [de(), 'clearError'],
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
              entry: de(),
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
              entry: de(),
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
        handleInput: he({
          formValues(t, e) {
            let { name: n, value: r } = e.data;
            return is(os({}, t.formValues), { [n]: r });
          },
        }),
        setUser: he({ user: (t, e) => e.data.user || e.data }),
        setUsername: he({
          authAttributes: (t) => ({ username: t.formValues.username }),
        }),
        setRemoteError: he({
          remoteError: (t, e) => {
            var n;
            return (null == (n = e.data) ? void 0 : n.message) || e.data;
          },
        }),
        setChallengeName: he({
          challengeName: (t, e) => {
            var n;
            return null == (n = e.data) ? void 0 : n.challengeName;
          },
        }),
        clearChallengeName: he({ challengeName: void 0 }),
        clearError: he({ remoteError: '' }),
        clearFormValues: he({ formValues: {} }),
        clearUnverifiedAttributes: he({ unverifiedAttributes: void 0 }),
        clearAttributeToVerify: he({ attributeToVerify: void 0 }),
      },
      guards: {
        shouldConfirmSignIn: (t, e) => {
          let n = an.exports.get(e, 'data.challengeName');
          return [Ku.SMS_MFA, Ku.SOFTWARE_TOKEN_MFA].includes(n);
        },
        shouldRedirectToConfirmSignUp: (t, e) =>
          'UserNotConfirmedException' === e.data.code,
        shouldSetupTOTP: (t, e) =>
          an.exports.get(e, 'data.challengeName') === Ku.MFA_SETUP,
        shouldForceChangePassword: (t, e) =>
          an.exports.get(e, 'data.challengeName') === Ku.NEW_PASSWORD_REQUIRED,
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
            { username: n, password: r } = e;
          return L.signIn(n, r);
        },
        async confirmSignIn(t, e) {
          let n,
            { challengeName: r, user: o } = t,
            { confirmation_code: i } = e.data;
          return (
            (r === Ku.SMS_MFA || r === Ku.SOFTWARE_TOKEN_MFA) && (n = r),
            L.confirmSignIn(o, i, n)
          );
        },
        async forceNewPassword(t, e) {
          let { user: n } = t,
            r = an.exports.get(e, 'data.password');
          return L.completeNewPassword(n, r);
        },
        async verifyTotpToken(t, e) {
          let { user: n } = t,
            { confirmation_code: r } = e.data;
          return L.verifyTotpToken(n, r);
        },
        async federatedSignIn(t, e) {
          let { provider: n } = e.data;
          return await L.federatedSignIn({ provider: n });
        },
        async checkVerifiedContact(t, e) {
          let { user: n } = t;
          return await L.verifiedContact(n);
        },
        async verifyUser(t, e) {
          let n = await L.verifyCurrentUserAttribute(e.data.unverifiedAttr);
          return (t.attributeToVerify = e.data.unverifiedAttr), n;
        },
        async confirmVerifyUser(t, e) {
          let { attributeToVerify: n } = t,
            { confirmation_code: r } = e.data;
          return await L.verifyCurrentUserAttributeSubmit(n, r);
        },
      },
    }
  ),
  hs = (t) => {
    let { password: e, confirm_password: n } = t;
    return e || n
      ? e && n && e === n
        ? void 0
        : { confirm_password: 'Your passwords must match' }
      : null;
  },
  ps = Fe(
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
                valid: { entry: de() },
                invalid: { entry: de() },
              },
              on: { CHANGE: { actions: 'handleInput', target: '.pending' } },
            },
            submission: {
              initial: 'idle',
              states: {
                idle: {
                  entry: de(),
                  on: {
                    SUBMIT: 'validate',
                    FEDERATED_SIGN_IN: 'federatedSignIn',
                  },
                },
                federatedSignIn: {
                  entry: [de(), 'clearError'],
                  invoke: {
                    src: 'federatedSignIn',
                    onDone: '#signUpActor.resolved',
                    onError: { actions: 'setRemoteError' },
                  },
                },
                validate: {
                  entry: de(),
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
                  entry: [de(), 'clearError'],
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
              entry: de(),
              on: {
                SUBMIT: 'submit',
                CHANGE: { actions: 'handleInput' },
                RESEND: 'resend',
              },
            },
            resend: {
              entry: de(),
              invoke: {
                src: 'resendConfirmationCode',
                onDone: { target: 'edit' },
                onError: { target: 'edit', actions: 'setRemoteError' },
              },
            },
            submit: {
              entry: [de(), 'clearError'],
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
        setUser: he({
          user: (t, e) => {
            var n;
            return null != (n = e.data.user) ? n : e.data;
          },
        }),
        setRemoteError: he({
          remoteError: (t, e) => {
            var n;
            return (null == (n = e.data) ? void 0 : n.message) || e.data;
          },
        }),
        setFieldErrors: he({ validationError: (t, e) => e.data }),
        setCredentials: he({
          authAttributes: (t) => {
            var e, n;
            let [r] = null != (e = t.login_mechanisms) ? e : ['username'];
            return {
              username: t.formValues[r],
              password: null == (n = t.formValues) ? void 0 : n.password,
            };
          },
        }),
        handleInput: he({
          formValues: (t, e) => {
            let { name: n, value: r } = e.data;
            return is(os({}, t.formValues), { [n]: r });
          },
        }),
        clearError: he({ remoteError: '' }),
        clearFormValues: he({ formValues: {} }),
        clearValidationError: he({ validationError: {} }),
      },
      services: {
        async confirmSignUp(t, e) {
          let { username: n, confirmation_code: r } = e.data;
          return L.confirmSignUp(n, r);
        },
        async resendConfirmationCode(t, e) {
          let { username: n } = e.data;
          return L.resendSignUp(n);
        },
        async federatedSignIn(t, e) {
          let { provider: n } = e.data;
          return await L.federatedSignIn({ provider: n });
        },
        async signUp(t, e) {
          let n = t,
            { formValues: r } = n,
            o = r,
            { password: i } = o,
            a = ((t, e) => {
              var n = {};
              for (var r in t)
                es.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
              if (null != t && ts)
                for (var r of ts(t))
                  e.indexOf(r) < 0 && ns.call(t, r) && (n[r] = t[r]);
              return n;
            })(o, ['password']),
            { login_mechanisms: u } = n,
            [s] = null != u ? u : ['username'];
          a.phone_number &&
            (a.phone_number = a.phone_number.replace(/[^A-Z0-9+]/gi, ''));
          let c = a[s];
          return (
            delete a[s],
            delete a.confirm_password,
            await L.signUp({ username: c, password: i, attributes: a })
          );
        },
        async validateFields(t, e) {
          let { formValues: n } = t;
          return (async (t, e) => {
            let n = await Promise.all(e.map((e) => e(t))),
              r = ou({}, ...n);
            return Xr(r) ? Promise.resolve() : Promise.reject(r);
          })(n, [hs]);
        },
      },
    }
  ),
  vs = Fe(
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
    { services: { signOut: () => L.signOut() } }
  ),
  gs = Fe(
    {
      id: 'resetPasswordActor',
      initial: 'resetPassword',
      states: {
        resetPassword: {
          initial: 'edit',
          exit: ['clearFormValues', 'clearError'],
          states: {
            edit: {
              entry: de(),
              on: { SUBMIT: 'submit', CHANGE: { actions: 'handleInput' } },
            },
            submit: {
              entry: [de(), 'setUsername', 'clearError'],
              invoke: {
                src: 'resetPassword',
                onDone: { target: '#resetPasswordActor.confirmResetPassword' },
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
              entry: de(),
              on: {
                SUBMIT: 'submit',
                RESEND: 'resendCode',
                CHANGE: { actions: 'handleInput' },
              },
            },
            resendCode: {
              entry: ['clearError', de()],
              invoke: {
                src: 'resetPassword',
                onDone: { target: 'edit' },
                onError: { actions: 'setRemoteError', target: 'edit' },
              },
            },
            submit: {
              entry: ['clearError', de()],
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
        setRemoteError: he({
          remoteError: (t, e) => {
            var n;
            return (null == (n = e.data) ? void 0 : n.message) || e.data;
          },
        }),
        setUsername: he({ username: (t) => t.formValues.username }),
        handleInput: he({
          formValues: (t, e) => {
            let { name: n, value: r } = e.data;
            return is(os({}, t.formValues), { [n]: r });
          },
        }),
        clearFormValues: he({ formValues: {} }),
        clearError: he({ remoteError: '' }),
        clearUsername: he({ username: void 0 }),
      },
      services: {
        async resetPassword(t) {
          var e, n;
          let r =
            null != (n = null == (e = t.formValues) ? void 0 : e.username)
              ? n
              : t.username;
          return (t.username = r), L.forgotPassword(r);
        },
        async confirmResetPassword(t) {
          let { username: e } = t,
            { confirmation_code: n, password: r } = t.formValues;
          return L.forgotPasswordSubmit(e, n, r);
        },
      },
    }
  ),
  ys = (t) => Gu(t),
  ms = en(
    Fe(
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
              { src: 'getAmplifyConfig', onDone: { actions: 'setAuthConfig' } },
            ],
          },
          signIn: {
            entry: 'spawnSignInActor',
            exit: ys('signInActor'),
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
            exit: ys('signUpActor'),
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
            exit: ys('resetPasswordActor'),
            on: {
              SIGN_IN: 'signIn',
              'done.invoke.resetPasswordActor': 'signIn',
            },
          },
          signOut: {
            entry: 'spawnSignOutActor',
            exit: [ys('signOutActor'), 'clearUser'],
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
            ((as = (t) => t.actorRef),
            le(function (t, e) {
              return e;
            }, rt(rt({}, us), { to: as }))),
          setUser: he({ user: (t, e) => e.data.user || e.data }),
          clearUser: he({ user: void 0 }),
          setAuthConfig: he({ config: (t, e) => e.data.auth }),
          spawnSignInActor: he({
            actorRef: (t, e) => {
              var n, r, o;
              return tn(
                ds.withContext({
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
          spawnSignUpActor: he({
            actorRef: (t, e) => {
              var n, r, o, i;
              return tn(
                ps.withContext({
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
          spawnResetPasswordActor: he({
            actorRef: (t, e) =>
              tn(gs.withContext({ formValues: {} }), {
                name: 'resetPasswordActor',
              }),
          }),
          spawnSignOutActor: he({
            actorRef: (t) =>
              tn(vs.withContext({ user: t.user }), { name: 'signOutActor' }),
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
          getCurrentUser: async () => L.currentAuthenticatedUser(),
          getAmplifyConfig: async () => F.configure(),
        },
      }
    ),
    { devTools: !0 }
  ).start(),
  bs = {
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
((cs = ss || (ss = {})).Amazon = 'LoginWithAmazon'),
  (cs.Facebook = 'Facebook'),
  (cs.Google = 'Google');
var _s = (t) => {
    var e;
    return null == (e = t.context.actorRef) ? void 0 : e.getSnapshot();
  },
  ws = (t) => {
    var e;
    return null == (e = _s(t)) ? void 0 : e.context;
  };
var Ss = function () {};
function Es(t) {
  return 'getSnapshot' in t
    ? t.getSnapshot()
    : (function (t) {
        return 'state' in t;
      })(t)
    ? t.state
    : void 0;
}
const As = () =>
    (function (t, e) {
      void 0 === e && (e = Es);
      var n = E(t) ? t : A(t),
        r = A(e(n.value));
      return (
        x(
          n,
          function (t, n, o) {
            r.value = e(t);
            var i = t.subscribe({
              next: function (t) {
                return (r.value = t);
              },
              error: Ss,
              complete: Ss,
            }).unsubscribe;
            o(function () {
              return i();
            });
          },
          { immediate: !0 }
        ),
        {
          state: r,
          send: function (t) {
            n.value.send(t);
          },
        }
      );
    })(ms),
  xs = (t) => {
    const e = ['username', 'email', 'phone_number'];
    return t ? (1 === t.length && 'username' === t[0] ? e : t) : e;
  };
var Is = c({
  components: { BaseInput: tt, BaseLabel: D, BaseText: X },
  props: {
    userNameAlias: { default: !1 },
    userName: { default: '' },
    disabled: { default: !1 },
  },
  setup(t) {
    var e, n, r, o, i;
    const { state: a } = As(),
      {
        value: { context: u },
      } = a,
      s = I(() => ws(a.value));
    let c = C('');
    t.userName && (c = I(() => t.userName));
    const f = s.value.validationError.username,
      [l] = xs(
        null == (e = null == u ? void 0 : u.config)
          ? void 0
          : e.login_mechanisms
      );
    let d = l,
      h =
        null != (r = null == (n = bs[l]) ? void 0 : n.label)
          ? r
          : bs.username.label,
      p =
        null != (i = null == (o = bs[d]) ? void 0 : o.type)
          ? i
          : bs.username.label;
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
          f = u
            .filter((t) => an.exports.includes(fs, t))
            .map((t) => {
              var e, n;
              return null != (n = null == (e = bs[t]) ? void 0 : e.label)
                ? n
                : bs.username.label;
            })
            .join(' or ');
        return (
          1 === u.length &&
            (c =
              null != (a = null == (i = bs[u[0]]) ? void 0 : i.type)
                ? a
                : 'text'),
          { label: f, type: c, error: s }
        );
      })(u);
      (h = t.label || bs.username.label), (p = t.type), (d = 'username');
    }
    return { label: h, name: d, type: p, error: f, uName: c };
  },
});
Is.render = function (t, e, n, r, o, i) {
  const a = m('base-text'),
    u = m('base-input'),
    s = m('base-label');
  return (
    f(),
    T(s, null, {
      default: _(() => [
        b(a, null, { default: _(() => [w(S(t.label), 1)]), _: 1 }),
        b(
          u,
          {
            textValue: t.uName,
            'onUpdate:textValue': e[0] || (e[0] = (e) => (t.uName = e)),
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
        b(a, null, { default: _(() => [w(S(t.error), 1)]), _: 1 }),
      ]),
      _: 1,
    })
  );
};
var Cs = c({
  components: { BaseButton: J },
  props: {
    text: { type: String, required: !0 },
    provider: { type: String, required: !0 },
  },
  setup(t) {
    const { send: e } = As();
    return {
      onClick: (n) => {
        e({ type: 'FEDERATED_SIGN_IN', data: { provider: t.provider } });
      },
    };
  },
});
Cs.render = function (t, e, n, r, o, i) {
  const a = m('base-button');
  return (
    f(),
    T(
      a,
      { 'data-amplify-button': '', type: 'button', onClick: t.onClick },
      { default: _(() => [w(S(t.text), 1)]), _: 1 },
      8,
      ['onClick']
    )
  );
};
var Ts = c({
  components: {
    FederatedSignInButton: Cs,
    BaseWrapper: H,
    BaseBox: G,
    BaseSpacer: Q,
  },
  setup() {
    var t;
    const { state: e } = As(),
      {
        value: { context: n },
      } = e,
      r =
        null == (t = null == n ? void 0 : n.config)
          ? void 0
          : t.login_mechanisms,
      o = null == r ? void 0 : r.includes('facebook'),
      i = null == r ? void 0 : r.includes('google'),
      a = null == r ? void 0 : r.includes('amazon'),
      u = o || i || a;
    return {
      loginMechanisms: r,
      fp: I(() => ss),
      includeFacebook: o,
      includeGoogle: i,
      includeAmazon: a,
      shouldShowFederatedSignIn: u,
    };
  },
});
const Ps = w('or');
Ts.render = function (t, e, n, r, o, i) {
  const a = m('federated-sign-in-button'),
    u = m('base-wrapper'),
    s = m('base-spacer'),
    c = m('base-box');
  return (
    f(),
    l(
      P,
      null,
      [
        t.shouldShowFederatedSignIn
          ? (f(),
            T(
              u,
              {
                key: 0,
                'data-amplify-wrapper': '',
                'data-amplify-federated': '',
              },
              {
                default: _(() => [
                  t.includeFacebook
                    ? (f(),
                      T(
                        a,
                        {
                          key: 0,
                          text: 'Sign in with Facebook',
                          provider: t.fp.Facebook,
                        },
                        null,
                        8,
                        ['provider']
                      ))
                    : B('', !0),
                  t.includeGoogle
                    ? (f(),
                      T(
                        a,
                        {
                          key: 1,
                          text: 'Sign in with Google',
                          provider: t.fp.Google,
                        },
                        null,
                        8,
                        ['provider']
                      ))
                    : B('', !0),
                  t.includeAmazon
                    ? (f(),
                      T(
                        a,
                        {
                          key: 2,
                          text: 'Sign in with Amazon',
                          provider: t.fp.Amazon,
                        },
                        null,
                        8,
                        ['provider']
                      ))
                    : B('', !0),
                ]),
                _: 1,
              }
            ))
          : B('', !0),
        t.shouldShowFederatedSignIn
          ? (f(),
            T(
              c,
              { key: 1, 'data-amplify-strike': '' },
              {
                default: _(() => [
                  b(s, null, { default: _(() => [Ps]), _: 1 }),
                ]),
                _: 1,
              }
            ))
          : B('', !0),
      ],
      64
    )
  );
};
var Bs = {
  name: 'Authentication',
  computed: {
    signIntoAccountText: () => 'Sign in to your account',
    resetPasswordLink: () => 'Reset password',
    noAccount: () => 'No account?',
    createAccountLink: () => 'Create account',
    signInButtonText: () => 'Sign In',
    signIngButtonText: () => 'Signing in',
    forgotYourPasswordText: () => 'Forgot your password?',
    passwordLabel: () => 'Password',
  },
  inheritAttrs: !1,
  components: {
    BaseFooter: z,
    BaseWrapper: H,
    BaseForm: W,
    BaseHeading: Y,
    BaseFieldSet: q,
    BaseLabel: D,
    BaseText: X,
    BaseBox: G,
    BaseButton: J,
    BaseSpacer: Q,
    UserNameAlias: Is,
    SignInPasswordControl: nt,
    FederatedSignIn: Ts,
  },
  setup(t, { emit: e, attrs: n }) {
    const { state: r, send: o } = As(),
      i = I(() => _s(r.value)),
      a = C(''),
      u = C(''),
      s = (t) => {
        const e = new FormData(t.target);
        o({ type: 'SUBMIT', data: Object.fromEntries(e) });
      };
    return {
      onSignInSubmit: (t) => {
        (null == n ? void 0 : n.onSignInSubmit) ? e('signInSubmit', t) : s(t);
      },
      AUTHENTICATOR: 'Authenticator',
      onForgotPasswordClicked: () => {
        (null == n ? void 0 : n.onForgotPasswordClicked)
          ? e('forgotPasswordClicked')
          : o({ type: 'RESET_PASSWORD' });
      },
      onCreateAccountClicked: () => {
        (null == n ? void 0 : n.onCreateAccountClicked)
          ? e('createAccountClicked')
          : o({ type: 'SIGN_UP' });
      },
      onInput: (t) => {
        const { name: e, value: n } = t.target;
        o({ type: 'CHANGE', data: { name: e, value: n } });
      },
      actorState: i,
      username: a,
      password: u,
      submit: s,
    };
  },
};
Bs.render = function (t, e, n, r, o, i) {
  const a = m('base-heading'),
    u = m('federated-sign-in'),
    s = m('user-name-alias'),
    c = m('sign-in-password-control'),
    f = m('base-text'),
    l = m('base-button'),
    h = m('base-box'),
    p = m('base-label'),
    v = m('base-field-Set'),
    g = m('base-spacer'),
    y = m('base-footer'),
    E = m('base-form'),
    A = m('base-wrapper');
  return d(t.$slots, 'signInSlotI', {}, () => [
    b(
      A,
      { 'data-amplify-wrapper': '' },
      {
        default: _(() => [
          b(
            E,
            {
              'data-amplify-authenticator-signin': '',
              onSubmit: k(r.onSignInSubmit, ['prevent']),
              onInput: r.onInput,
              method: 'post',
            },
            {
              formt: _(({ slotData: e }) => [
                d(t.$slots, 'form', {
                  info: e,
                  onSignInSubmit: r.onSignInSubmit,
                  onCreateAccountClicked: r.onCreateAccountClicked,
                  onForgotPasswordClicked: r.onForgotPasswordClicked,
                }),
              ]),
              default: _(() => [
                b(
                  a,
                  { level: 1 },
                  {
                    headingI: _(() => [d(t.$slots, 'heading')]),
                    default: _(() => [w(' ' + S(i.signIntoAccountText), 1)]),
                    _: 3,
                  }
                ),
                b(u),
                b(
                  v,
                  { disabled: r.actorState.matches('signIn.submit') },
                  {
                    fieldSetI: _(({ slotData: e }) => [
                      d(t.$slots, 'signin-fields', { info: e }),
                    ]),
                    default: _(() => [
                      b(s, {
                        'data-amplify-usernamealias': '',
                        userNameAlias: !0,
                      }),
                      b(
                        p,
                        { 'data-amplify-password': '' },
                        {
                          default: _(() => [
                            b(c),
                            b(h, null, {
                              default: _(() => [
                                d(
                                  t.$slots,
                                  'forgot-password-section',
                                  {
                                    onForgotPasswordClicked:
                                      r.onForgotPasswordClicked,
                                  },
                                  () => [
                                    b(f, null, {
                                      default: _(() => [
                                        w(S(i.forgotYourPasswordText), 1),
                                      ]),
                                      _: 1,
                                    }),
                                    b(
                                      l,
                                      {
                                        type: 'button',
                                        onClick: k(r.onForgotPasswordClicked, [
                                          'prevent',
                                        ]),
                                      },
                                      {
                                        default: _(() => [
                                          w(S(i.resetPasswordLink), 1),
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
                      d(t.$slots, 'additional-fields', {
                        onSignInSubmit: r.onSignInSubmit,
                        onCreateAccountClicked: r.onCreateAccountClicked,
                      }),
                    ]),
                    _: 3,
                  },
                  8,
                  ['disabled']
                ),
                b(y, null, {
                  footert: _(({ slotData: e }) => [
                    d(t.$slots, 'footer', {
                      info: e,
                      onSignInSubmit: r.onSignInSubmit,
                      onCreateAccountClicked: r.onCreateAccountClicked,
                    }),
                  ]),
                  default: _(() => [
                    b(f, null, {
                      default: _(() => [w(S(i.noAccount), 1)]),
                      _: 1,
                    }),
                    b(
                      l,
                      {
                        type: 'button',
                        onClick: k(r.onCreateAccountClicked, ['prevent']),
                      },
                      {
                        default: _(() => [w(S(i.createAccountLink), 1)]),
                        _: 1,
                      },
                      8,
                      ['onClick']
                    ),
                    b(g),
                    b(
                      l,
                      { disabled: r.actorState.matches('signIn.submit') },
                      {
                        buttont: _(() => [
                          d(t.$slots, 'sign-in-button', {
                            onSignInSubmit: r.onSignInSubmit,
                          }),
                        ]),
                        default: _(() => [
                          w(
                            ' ' +
                              S(
                                r.actorState.matches('signIn.submit')
                                  ? i.signIngButtonText
                                  : i.signInButtonText
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
                b(
                  h,
                  { 'data-ui-error': '' },
                  {
                    default: _(() => [
                      w(S(r.actorState.context.remoteError), 1),
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
var ks = c({
  components: { BaseInput: tt, BaseText: X, BaseLabel: D },
  setup: () => ({ passwordLabel: I(() => 'Password') }),
});
ks.render = function (t, e, n, r, o, i) {
  const a = m('base-text'),
    u = m('base-input'),
    s = m('base-label');
  return (
    f(),
    T(s, null, {
      default: _(() => [
        b(a, null, { default: _(() => [w(S(t.passwordLabel), 1)]), _: 1 }),
        b(u, {
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
var Os = c({
  components: { BaseInput: tt, BaseText: X, BaseLabel: D },
  setup: () => ({ confirmPasswordLabel: I(() => 'Confirm Password') }),
});
Os.render = function (t, e, n, r, o, i) {
  const a = m('base-text'),
    u = m('base-input'),
    s = m('base-label');
  return (
    f(),
    T(s, null, {
      default: _(() => [
        b(a, null, {
          default: _(() => [w(S(t.confirmPasswordLabel), 1)]),
          _: 1,
        }),
        b(u, {
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
var Rs = c({
  components: { BaseInput: tt, BaseText: X, BaseLabel: D },
  props: {
    label: { default: 'Username', required: !0, type: String },
    name: { default: 'username', required: !0, type: String },
    placeholder: { default: (t) => t.label, type: String },
  },
  setup: () => ({ inputAttributes: I(() => bs) }),
});
Rs.render = function (t, e, n, r, o, i) {
  const a = m('base-text'),
    u = m('base-input'),
    s = m('base-label');
  return (
    f(),
    T(s, null, {
      default: _(() => [
        b(a, null, { default: _(() => [w(S(t.label), 1)]), _: 1 }),
        b(
          u,
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
var Us = c({
  components: {
    BaseForm: W,
    BaseHeading: Y,
    BaseText: X,
    BaseFieldSet: q,
    BaseFooter: z,
    BaseButton: J,
    SignUpPasswordControl: ks,
    BaseWrapper: H,
    BaseBox: G,
    BaseSpacer: Q,
    SignUpConfirmPasswordControl: Os,
    UserNameAlias: Is,
    AliasControl: Rs,
    FederatedSignIn: Ts,
  },
  inheritAttrs: !1,
  setup(t, { emit: e, attrs: n }) {
    var r;
    const { state: o, send: i } = As(),
      {
        value: { context: a },
      } = o,
      u = I(() => _s(o.value));
    let [s, ...c] = xs(
      null == (r = null == a ? void 0 : a.config) ? void 0 : r.login_mechanisms
    );
    c = c.filter((t) => !ls.includes(t));
    const f = C(''),
      l = C(''),
      d = I(() => 'Sign In'),
      h = I(() => 'Have an account?'),
      p = I(() => 'Create Account'),
      v = I(() => 'Create a new account'),
      g = I(() => bs);
    x(o, (t) => {
      var e;
      const n = ws(t);
      l.value = null == (e = n.validationError) ? void 0 : e.confirm_password;
    });
    const y = () => {
      i({ type: 'SUBMIT' });
    };
    return {
      onHaveAccountClicked: () => {
        (null == n ? void 0 : n.onHaveAccountClicked)
          ? e('haveAccountClicked')
          : i({ type: 'SIGN_IN' });
      },
      onSignUpSubmit: (t) => {
        (null == n ? void 0 : n.onSignUpSubmit) ? e('signUpSubmit', t) : y();
      },
      onInput: (t) => {
        const { name: e, value: n } = t.target;
        i({ type: 'CHANGE', data: { name: e, value: n } });
      },
      state: o,
      actorState: u,
      phone: f,
      submit: y,
      error: l,
      secondaryAliases: c,
      signInButtonText: d,
      haveAccountLabel: h,
      createAccountLabel: p,
      signUpButtonText: v,
      inputAttributes: g,
    };
  },
});
Us.render = function (t, e, n, r, o, i) {
  const a = m('base-heading'),
    u = m('federated-sign-in'),
    s = m('user-name-alias'),
    c = m('sign-up-password-control'),
    h = m('sign-up-confirm-password-control'),
    p = m('base-box'),
    v = m('alias-control'),
    g = m('base-field-set'),
    y = m('base-spacer'),
    E = m('base-text'),
    A = m('base-button'),
    x = m('base-footer'),
    I = m('base-form'),
    C = m('base-wrapper');
  return d(t.$slots, 'signUpSlotI', {}, () => [
    b(
      C,
      { 'data-amplify-wrapper': '' },
      {
        default: _(() => [
          b(
            I,
            { onSubmit: k(t.onSignUpSubmit, ['prevent']), onInput: t.onInput },
            {
              default: _(() => [
                b(a, null, {
                  headingI: _(() => [d(t.$slots, 'heading')]),
                  default: _(() => [w(' ' + S(t.signUpButtonText), 1)]),
                  _: 3,
                }),
                b(u),
                b(
                  g,
                  { disabled: t.actorState.matches('signUp.submit') },
                  {
                    fieldSetI: _(({ slotData: e }) => [
                      d(t.$slots, 'signup-fields', { info: e }),
                    ]),
                    default: _(() => [
                      b(s),
                      b(c),
                      b(h),
                      t.error
                        ? (f(),
                          T(
                            p,
                            { key: 0, 'data-ui-error': '' },
                            { default: _(() => [w(S(t.error), 1)]), _: 1 }
                          ))
                        : B('', !0),
                      (f(!0),
                      l(
                        P,
                        null,
                        O(
                          t.secondaryAliases,
                          (e, n) => (
                            f(),
                            T(
                              v,
                              {
                                key: n,
                                label: t.inputAttributes[e].label,
                                name: e,
                                placeholder: t.inputAttributes[e].placeholder,
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
                b(y),
                b(
                  p,
                  { 'data-ui-error': '' },
                  {
                    default: _(() => [
                      w(S(t.actorState.context.remoteError), 1),
                    ]),
                    _: 1,
                  }
                ),
                b(x, null, {
                  footert: _(({ slotData: e }) => [
                    d(t.$slots, 'footer', {
                      info: e,
                      onHaveAccountClicked: t.onHaveAccountClicked,
                      onSignUpSubmit: t.onSignUpSubmit,
                    }),
                  ]),
                  default: _(() => [
                    d(
                      t.$slots,
                      'footer-left',
                      { onHaveAccountClicked: t.onHaveAccountClicked },
                      () => [
                        b(E, null, {
                          default: _(() => [w(S(t.haveAccountLabel), 1)]),
                          _: 1,
                        }),
                        b(
                          A,
                          {
                            type: 'button',
                            onClick: k(t.onHaveAccountClicked, ['prevent']),
                          },
                          {
                            default: _(() => [w(S(t.signInButtonText), 1)]),
                            _: 1,
                          },
                          8,
                          ['onClick']
                        ),
                      ]
                    ),
                    d(
                      t.$slots,
                      'footer-right',
                      { onSignUpSubmit: t.onSignUpSubmit },
                      () => [
                        b(
                          A,
                          { disabled: t.actorState.matches('signUp.submit') },
                          {
                            default: _(() => [w(S(t.createAccountLabel), 1)]),
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
var Ns,
  js,
  Ls = c({
    components: {
      BaseBox: G,
      BaseHeading: Y,
      BaseFieldSet: q,
      BaseForm: W,
      BaseLabel: D,
      BaseSpacer: Q,
      BaseButton: J,
      BaseFooter: z,
      BaseText: X,
      BaseInput: tt,
      BaseWrapper: H,
      UserNameAlias: Is,
    },
    props: { shouldHideReturnBtn: { default: !1, type: Boolean } },
    inheritAttrs: !1,
    setup(t, { emit: e, attrs: n }) {
      var r, o, i;
      const { state: a, send: c } = As(),
        f = I(() => _s(a.value)),
        l = f.value.context,
        d =
          null != (i = null == (r = l.user) ? void 0 : r.username)
            ? i
            : null == (o = l.authAttributes)
            ? void 0
            : o.username,
        h = I(() => 'Confirm Sign Up'),
        p = I(() => 'Confirmation Code'),
        v = I(() => 'Lost your code?'),
        g = I(() => 'Resend Code'),
        y = I(() => 'Back to Sign In'),
        m = I(() => 'CONFIRM'),
        b = (t) => {
          const e = new FormData(t.target);
          c({
            type: 'SUBMIT',
            data: s(u({}, Object.fromEntries(e)), { username: d }),
          });
        };
      return {
        onConfirmSignUpSubmit: (t) => {
          (null == n ? void 0 : n.onConfirmSignUpSubmit)
            ? e('confirmSignUpSubmit', t)
            : b(t);
        },
        onBackToSignInClicked: () => {
          (null == n ? void 0 : n.onBackToSignInClicked)
            ? e('backToSignInClicked')
            : c({ type: 'SIGN_IN' });
        },
        submit: b,
        confirmSignUpHeading: h,
        confirmationCodeText: p,
        lostYourCodeText: v,
        resendCodeText: g,
        backSignInText: y,
        confirmText: m,
        onLostCodeClicked: () => {
          (null == n ? void 0 : n.onLostCodeClicked)
            ? e('lostCodeClicked')
            : c({ type: 'RESEND', data: { username: d } });
        },
        actorState: f,
        send: c,
        username: d,
      };
    },
  });
(Ls.render = function (t, e, n, r, o, i) {
  const a = m('base-heading'),
    u = m('user-name-alias'),
    s = m('base-text'),
    c = m('base-input'),
    l = m('base-button'),
    h = m('base-box'),
    p = m('base-label'),
    v = m('base-field-set'),
    g = m('base-spacer'),
    y = m('base-footer'),
    E = m('base-form'),
    A = m('base-wrapper');
  return d(t.$slots, 'confirmSignUpSlotI', {}, () => [
    b(
      A,
      { 'data-amplify-wrapper': '' },
      {
        default: _(() => [
          b(
            E,
            { onSubmit: k(t.onConfirmSignUpSubmit, ['prevent']) },
            {
              default: _(() => [
                b(a, null, {
                  default: _(() => [w(S(t.confirmSignUpHeading), 1)]),
                  _: 1,
                }),
                b(
                  v,
                  { disabled: t.actorState.matches('confirmSignUp.pending') },
                  {
                    default: _(() => {
                      var e, n, r, o, i, a;
                      return [
                        b(
                          u,
                          {
                            userNameAlias: !0,
                            userName:
                              (null ==
                              (r =
                                null ==
                                (n =
                                  null == (e = t.actorState)
                                    ? void 0
                                    : e.context)
                                  ? void 0
                                  : n.user)
                                ? void 0
                                : r.username) ||
                              (null ==
                              (a =
                                null ==
                                (i =
                                  null == (o = t.actorState)
                                    ? void 0
                                    : o.context)
                                  ? void 0
                                  : i.authAttributes)
                                ? void 0
                                : a.username),
                            disabled: !0,
                          },
                          null,
                          8,
                          ['userName']
                        ),
                        b(
                          p,
                          { 'data-amplify-password': '' },
                          {
                            default: _(() => [
                              b(s, null, {
                                default: _(() => [
                                  w(S(t.confirmationCodeText), 1),
                                ]),
                                _: 1,
                              }),
                              b(c, {
                                name: 'confirmation_code',
                                required: '',
                                type: 'number',
                              }),
                              b(h, null, {
                                default: _(() => [
                                  b(s, null, {
                                    default: _(() => [
                                      w(S(t.lostYourCodeText), 1),
                                    ]),
                                    _: 1,
                                  }),
                                  b(
                                    l,
                                    {
                                      type: 'button',
                                      onClick: k(t.onLostCodeClicked, [
                                        'prevent',
                                      ]),
                                    },
                                    {
                                      default: _(() => [
                                        w(S(t.resendCodeText), 1),
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
                b(y, null, {
                  footert: _(({ slotData: e }) => [
                    d(t.$slots, 'footer', {
                      info: e,
                      onBackToSignInClicked: t.onBackToSignInClicked,
                      onConfirmSignUpSubmit: t.onConfirmSignUpSubmit,
                    }),
                  ]),
                  default: _(() => [
                    t.shouldHideReturnBtn
                      ? B('', !0)
                      : (f(),
                        T(
                          l,
                          {
                            key: 0,
                            type: 'button',
                            onClick: k(t.onBackToSignInClicked, ['prevent']),
                          },
                          {
                            default: _(() => [w(S(t.backSignInText), 1)]),
                            _: 1,
                          },
                          8,
                          ['onClick']
                        )),
                    b(g),
                    b(
                      l,
                      {
                        disabled: t.actorState.matches('confirmSignUp.pending'),
                      },
                      { default: _(() => [w(S(t.confirmText), 1)]), _: 1 },
                      8,
                      ['disabled']
                    ),
                  ]),
                  _: 3,
                }),
                b(
                  h,
                  { 'data-ui-error': '' },
                  {
                    default: _(() => {
                      var e, n;
                      return [
                        w(
                          S(
                            null ==
                              (n =
                                null == (e = t.actorState) ? void 0 : e.context)
                              ? void 0
                              : n.remoteError
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
  ((js = Ns || (Ns = {})).SMS_MFA = 'SMS_MFA'),
  (js.SOFTWARE_TOKEN_MFA = 'SOFTWARE_TOKEN_MFA'),
  (js.NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED'),
  (js.MFA_SETUP = 'MFA_SETUP');
var Fs = c({
  components: {
    BaseBox: G,
    BaseHeading: Y,
    BaseFieldSet: q,
    BaseForm: W,
    BaseLabel: D,
    BaseSpacer: Q,
    BaseButton: J,
    BaseFooter: z,
    BaseText: X,
    BaseInput: tt,
    BaseWrapper: H,
  },
  inheritAttrs: !1,
  setup(t, { emit: e, attrs: n }) {
    const { state: r, send: o } = As(),
      i = I(() => _s(r.value)),
      { challengeName: a } = i.value.context;
    let s = 'SMS';
    a === Ns.SOFTWARE_TOKEN_MFA && (s = 'TOTP');
    const c = `Confirm ${s} Code`,
      f = I(() => 'Back to Sign In'),
      l = I(() => 'CONFIRM'),
      d = (t) => {
        const e = new FormData(t.target);
        o({ type: 'SUBMIT', data: u({}, Object.fromEntries(e)) });
      };
    return {
      confirmSignInHeading: c,
      onConfirmSignInSubmit: (t) => {
        (null == n ? void 0 : n.onConfirmSignInSubmit)
          ? e('confirmSignInSubmit', t)
          : d(t);
      },
      onBackToSignInClicked: () => {
        (null == n ? void 0 : n.onBackToSignInClicked)
          ? e('backToSignInClicked')
          : o({ type: 'SIGN_IN' });
      },
      submit: d,
      backSignInText: f,
      confirmText: l,
      actorState: i,
    };
  },
});
const Ms = w('Code *');
Fs.render = function (t, e, n, r, o, i) {
  const a = m('base-heading'),
    u = m('base-text'),
    s = m('base-input'),
    c = m('base-label'),
    f = m('base-field-set'),
    l = m('base-button'),
    h = m('base-spacer'),
    p = m('base-footer'),
    v = m('base-box'),
    g = m('base-form'),
    y = m('base-wrapper');
  return d(t.$slots, 'confirmSignInSlotI', {}, () => [
    b(
      y,
      { 'data-amplify-wrapper': '' },
      {
        default: _(() => [
          b(
            g,
            {
              'data-amplify-authenticator-confirmsignin': '',
              onSubmit: k(t.onConfirmSignInSubmit, ['prevent']),
            },
            {
              default: _(() => [
                b(a, null, {
                  default: _(() => [w(S(t.confirmSignInHeading), 1)]),
                  _: 1,
                }),
                b(
                  f,
                  { disabled: t.actorState.matches('confirmSignIn.pending') },
                  {
                    default: _(() => [
                      b(
                        c,
                        { 'data-amplify-password': '' },
                        {
                          default: _(() => [
                            b(u, null, { default: _(() => [Ms]), _: 1 }),
                            b(s, {
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
                b(p, null, {
                  footert: _(({ slotData: e }) => [
                    d(t.$slots, 'footer', {
                      info: e,
                      onBackToSignInClicked: t.onBackToSignInClicked,
                      onConfirmSignInSubmit: t.onConfirmSignInSubmit,
                    }),
                  ]),
                  default: _(() => [
                    b(
                      l,
                      {
                        type: 'button',
                        onClick: k(t.onBackToSignInClicked, ['prevent']),
                      },
                      { default: _(() => [w(S(t.backSignInText), 1)]), _: 1 },
                      8,
                      ['onClick']
                    ),
                    b(h),
                    b(
                      l,
                      {
                        disabled: t.actorState.matches('confirmSignIn.pending'),
                      },
                      { default: _(() => [w(S(t.confirmText), 1)]), _: 1 },
                      8,
                      ['disabled']
                    ),
                  ]),
                  _: 3,
                }),
                b(
                  v,
                  { 'data-ui-error': '' },
                  {
                    default: _(() => {
                      var e, n;
                      return [
                        w(
                          S(
                            null ==
                              (n =
                                null == (e = t.actorState) ? void 0 : e.context)
                              ? void 0
                              : n.remoteError
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
var Ds = {},
  $s = {},
  zs = {},
  Vs = {}.toString,
  Hs =
    Array.isArray ||
    function (t) {
      return '[object Array]' == Vs.call(t);
    },
  Ws = Hs;
qs.TYPED_ARRAY_SUPPORT = (function () {
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
var Ys = qs.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
function qs(t, e, n) {
  return qs.TYPED_ARRAY_SUPPORT || this instanceof qs
    ? 'number' == typeof t
      ? Js(this, t)
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
              qs.TYPED_ARRAY_SUPPORT
                ? (o.__proto__ = qs.prototype)
                : (o = Qs(t, o));
              return o;
            })(t, e, n, r);
          if ('string' == typeof e)
            return (function (t, e) {
              var n = 0 | Xs(e),
                r = Ks(t, n),
                o = r.write(e);
              o !== n && (r = r.slice(0, o));
              return r;
            })(t, e);
          return (function (t, e) {
            if (qs.isBuffer(e)) {
              var n = 0 | Gs(e.length),
                r = Ks(t, n);
              return 0 === r.length || e.copy(r, 0, 0, n), r;
            }
            if (e) {
              if (
                ('undefined' != typeof ArrayBuffer &&
                  e.buffer instanceof ArrayBuffer) ||
                'length' in e
              )
                return 'number' != typeof e.length || (o = e.length) != o
                  ? Ks(t, 0)
                  : Qs(t, e);
              if ('Buffer' === e.type && Array.isArray(e.data))
                return Qs(t, e.data);
            }
            var o;
            throw new TypeError(
              'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
            );
          })(t, e);
        })(this, t, e, n)
    : new qs(t, e, n);
}
function Gs(t) {
  if (t >= Ys)
    throw new RangeError(
      'Attempt to allocate Buffer larger than maximum size: 0x' +
        Ys.toString(16) +
        ' bytes'
    );
  return 0 | t;
}
function Ks(t, e) {
  var n;
  return (
    qs.TYPED_ARRAY_SUPPORT
      ? ((n = new Uint8Array(e)).__proto__ = qs.prototype)
      : (null === (n = t) && (n = new qs(e)), (n.length = e)),
    n
  );
}
function Js(t, e) {
  var n = Ks(t, e < 0 ? 0 : 0 | Gs(e));
  if (!qs.TYPED_ARRAY_SUPPORT) for (var r = 0; r < e; ++r) n[r] = 0;
  return n;
}
function Qs(t, e) {
  for (
    var n = e.length < 0 ? 0 : 0 | Gs(e.length), r = Ks(t, n), o = 0;
    o < n;
    o += 1
  )
    r[o] = 255 & e[o];
  return r;
}
function Zs(t, e) {
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
function Xs(t) {
  return qs.isBuffer(t)
    ? t.length
    : 'undefined' != typeof ArrayBuffer &&
      'function' == typeof ArrayBuffer.isView &&
      (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
    ? t.byteLength
    : ('string' != typeof t && (t = '' + t), 0 === t.length ? 0 : Zs(t).length);
}
qs.TYPED_ARRAY_SUPPORT &&
  ((qs.prototype.__proto__ = Uint8Array.prototype),
  (qs.__proto__ = Uint8Array),
  'undefined' != typeof Symbol &&
    Symbol.species &&
    qs[Symbol.species] === qs &&
    Object.defineProperty(qs, Symbol.species, {
      value: null,
      configurable: !0,
      enumerable: !1,
      writable: !1,
    })),
  (qs.prototype.write = function (t, e, n) {
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
      })(Zs(e, t.length - n), t, n, r);
    })(this, t, e, n);
  }),
  (qs.prototype.slice = function (t, e) {
    var n,
      r = this.length;
    if (
      ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
      (e = void 0 === e ? r : ~~e) < 0
        ? (e += r) < 0 && (e = 0)
        : e > r && (e = r),
      e < t && (e = t),
      qs.TYPED_ARRAY_SUPPORT)
    )
      (n = this.subarray(t, e)).__proto__ = qs.prototype;
    else {
      var o = e - t;
      n = new qs(o, void 0);
      for (var i = 0; i < o; ++i) n[i] = this[i + t];
    }
    return n;
  }),
  (qs.prototype.copy = function (t, e, n, r) {
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
    else if (i < 1e3 || !qs.TYPED_ARRAY_SUPPORT)
      for (o = 0; o < i; ++o) t[o + e] = this[o + n];
    else Uint8Array.prototype.set.call(t, this.subarray(n, n + i), e);
    return i;
  }),
  (qs.prototype.fill = function (t, e, n) {
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
      var i = qs.isBuffer(t) ? t : new qs(t),
        a = i.length;
      for (o = 0; o < n - e; ++o) this[o + e] = i[o % a];
    }
    return this;
  }),
  (qs.concat = function (t, e) {
    if (!Ws(t))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (0 === t.length) return Ks(null, 0);
    var n;
    if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
    var r = Js(null, e),
      o = 0;
    for (n = 0; n < t.length; ++n) {
      var i = t[n];
      if (!qs.isBuffer(i))
        throw new TypeError('"list" argument must be an Array of Buffers');
      i.copy(r, o), (o += i.length);
    }
    return r;
  }),
  (qs.byteLength = Xs),
  (qs.prototype._isBuffer = !0),
  (qs.isBuffer = function (t) {
    return !(null == t || !t._isBuffer);
  }),
  (zs.alloc = function (t) {
    var e = new qs(t);
    return e.fill(0), e;
  }),
  (zs.from = function (t) {
    return new qs(t);
  });
var tc,
  ec = {},
  nc = [
    0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655,
    733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921,
    2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706,
  ];
(ec.getSymbolSize = function (t) {
  if (!t) throw new Error('"version" cannot be null or undefined');
  if (t < 1 || t > 40)
    throw new Error('"version" should be in range from 1 to 40');
  return 4 * t + 17;
}),
  (ec.getSymbolTotalCodewords = function (t) {
    return nc[t];
  }),
  (ec.getBCHDigit = function (t) {
    for (var e = 0; 0 !== t; ) e++, (t >>>= 1);
    return e;
  }),
  (ec.setToSJISFunction = function (t) {
    if ('function' != typeof t)
      throw new Error('"toSJISFunc" is not a valid function.');
    tc = t;
  }),
  (ec.isKanjiModeEnabled = function () {
    return void 0 !== tc;
  }),
  (ec.toSJIS = function (t) {
    return tc(t);
  });
var rc = {};
function oc() {
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
})(rc),
  (oc.prototype = {
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
var ic = oc,
  ac = zs;
function uc(t) {
  if (!t || t < 1)
    throw new Error('BitMatrix size must be defined and greater than 0');
  (this.size = t),
    (this.data = ac.alloc(t * t)),
    (this.reservedBit = ac.alloc(t * t));
}
(uc.prototype.set = function (t, e, n, r) {
  var o = t * this.size + e;
  (this.data[o] = n), r && (this.reservedBit[o] = !0);
}),
  (uc.prototype.get = function (t, e) {
    return this.data[t * this.size + e];
  }),
  (uc.prototype.xor = function (t, e, n) {
    this.data[t * this.size + e] ^= n;
  }),
  (uc.prototype.isReserved = function (t, e) {
    return this.reservedBit[t * this.size + e];
  });
var sc = uc,
  cc = {};
!(function (t) {
  var e = ec.getSymbolSize;
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
})(cc);
var fc = {},
  lc = ec.getSymbolSize;
fc.getPositions = function (t) {
  var e = lc(t);
  return [
    [0, 0],
    [e - 7, 0],
    [0, e - 7],
  ];
};
var dc = {};
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
          var f = t.get(s, c);
          f === a ? o++ : (o >= 5 && (r += e + (o - 5)), (a = f), (o = 1)),
            (f = t.get(c, s)) === u
              ? i++
              : (i >= 5 && (r += e + (i - 5)), (u = f), (i = 1));
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
})(dc);
var hc = {},
  pc = rc,
  vc = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2,
    4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4,
    9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13,
    18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18,
    25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13,
    26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54,
    18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59,
    70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81,
  ],
  gc = [
    7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72,
    88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192,
    72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352,
    120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448,
    532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442,
    644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312,
    588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050,
    1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510,
    924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064,
    1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860,
    2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430,
  ];
(hc.getBlocksCount = function (t, e) {
  switch (e) {
    case pc.L:
      return vc[4 * (t - 1) + 0];
    case pc.M:
      return vc[4 * (t - 1) + 1];
    case pc.Q:
      return vc[4 * (t - 1) + 2];
    case pc.H:
      return vc[4 * (t - 1) + 3];
    default:
      return;
  }
}),
  (hc.getTotalCodewordsCount = function (t, e) {
    switch (e) {
      case pc.L:
        return gc[4 * (t - 1) + 0];
      case pc.M:
        return gc[4 * (t - 1) + 1];
      case pc.Q:
        return gc[4 * (t - 1) + 2];
      case pc.H:
        return gc[4 * (t - 1) + 3];
      default:
        return;
    }
  });
var yc = {},
  mc = {},
  bc = zs,
  _c = bc.alloc(512),
  wc = bc.alloc(256);
!(function () {
  for (var t = 1, e = 0; e < 255; e++)
    (_c[e] = t), (wc[t] = e), 256 & (t <<= 1) && (t ^= 285);
  for (e = 255; e < 512; e++) _c[e] = _c[e - 255];
})(),
  (mc.log = function (t) {
    if (t < 1) throw new Error('log(' + t + ')');
    return wc[t];
  }),
  (mc.exp = function (t) {
    return _c[t];
  }),
  (mc.mul = function (t, e) {
    return 0 === t || 0 === e ? 0 : _c[wc[t] + wc[e]];
  }),
  (function (t) {
    var e = zs,
      n = mc;
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
  })(yc);
for (
  var Sc = {},
    Ec = {
      byteLength: function (t) {
        var e = Bc(t),
          n = e[0],
          r = e[1];
        return (3 * (n + r)) / 4 - r;
      },
      toByteArray: function (t) {
        var e,
          n,
          r = Bc(t),
          o = r[0],
          i = r[1],
          a = new Ic(
            (function (t, e, n) {
              return (3 * (e + n)) / 4 - n;
            })(0, o, i)
          ),
          u = 0,
          s = i > 0 ? o - 4 : o;
        for (n = 0; n < s; n += 4)
          (e =
            (xc[t.charCodeAt(n)] << 18) |
            (xc[t.charCodeAt(n + 1)] << 12) |
            (xc[t.charCodeAt(n + 2)] << 6) |
            xc[t.charCodeAt(n + 3)]),
            (a[u++] = (e >> 16) & 255),
            (a[u++] = (e >> 8) & 255),
            (a[u++] = 255 & e);
        2 === i &&
          ((e = (xc[t.charCodeAt(n)] << 2) | (xc[t.charCodeAt(n + 1)] >> 4)),
          (a[u++] = 255 & e));
        1 === i &&
          ((e =
            (xc[t.charCodeAt(n)] << 10) |
            (xc[t.charCodeAt(n + 1)] << 4) |
            (xc[t.charCodeAt(n + 2)] >> 2)),
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
          o.push(kc(t, a, a + i > u ? u : a + i));
        1 === r
          ? ((e = t[n - 1]), o.push(Ac[e >> 2] + Ac[(e << 4) & 63] + '=='))
          : 2 === r &&
            ((e = (t[n - 2] << 8) + t[n - 1]),
            o.push(Ac[e >> 10] + Ac[(e >> 4) & 63] + Ac[(e << 2) & 63] + '='));
        return o.join('');
      },
    },
    Ac = [],
    xc = [],
    Ic = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
    Cc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    Tc = 0,
    Pc = Cc.length;
  Tc < Pc;
  ++Tc
)
  (Ac[Tc] = Cc[Tc]), (xc[Cc.charCodeAt(Tc)] = Tc);
function Bc(t) {
  var e = t.length;
  if (e % 4 > 0)
    throw new Error('Invalid string. Length must be a multiple of 4');
  var n = t.indexOf('=');
  return -1 === n && (n = e), [n, n === e ? 0 : 4 - (n % 4)];
}
function kc(t, e, n) {
  for (var r, o, i = [], a = e; a < n; a += 3)
    (r =
      ((t[a] << 16) & 16711680) + ((t[a + 1] << 8) & 65280) + (255 & t[a + 2])),
      i.push(
        Ac[((o = r) >> 18) & 63] +
          Ac[(o >> 12) & 63] +
          Ac[(o >> 6) & 63] +
          Ac[63 & o]
      );
  return i.join('');
}
(xc['-'.charCodeAt(0)] = 62), (xc['_'.charCodeAt(0)] = 63);
var Oc = {
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  read: function (t, e, n, r, o) {
    var i,
      a,
      u = 8 * o - r - 1,
      s = (1 << u) - 1,
      c = s >> 1,
      f = -7,
      l = n ? o - 1 : 0,
      d = n ? -1 : 1,
      h = t[e + l];
    for (
      l += d, i = h & ((1 << -f) - 1), h >>= -f, f += u;
      f > 0;
      i = 256 * i + t[e + l], l += d, f -= 8
    );
    for (
      a = i & ((1 << -f) - 1), i >>= -f, f += r;
      f > 0;
      a = 256 * a + t[e + l], l += d, f -= 8
    );
    if (0 === i) i = 1 - c;
    else {
      if (i === s) return a ? NaN : (1 / 0) * (h ? -1 : 1);
      (a += Math.pow(2, r)), (i -= c);
    }
    return (h ? -1 : 1) * a * Math.pow(2, i - r);
  },
  write: function (t, e, n, r, o, i) {
    var a,
      u,
      s,
      c = 8 * i - o - 1,
      f = (1 << c) - 1,
      l = f >> 1,
      d = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      h = r ? 0 : i - 1,
      p = r ? 1 : -1,
      v = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
    for (
      e = Math.abs(e),
        isNaN(e) || e === 1 / 0
          ? ((u = isNaN(e) ? 1 : 0), (a = f))
          : ((a = Math.floor(Math.log(e) / Math.LN2)),
            e * (s = Math.pow(2, -a)) < 1 && (a--, (s *= 2)),
            (e += a + l >= 1 ? d / s : d * Math.pow(2, 1 - l)) * s >= 2 &&
              (a++, (s /= 2)),
            a + l >= f
              ? ((u = 0), (a = f))
              : a + l >= 1
              ? ((u = (e * s - 1) * Math.pow(2, o)), (a += l))
              : ((u = e * Math.pow(2, l - 1) * Math.pow(2, o)), (a = 0)));
      o >= 8;
      t[n + h] = 255 & u, h += p, u /= 256, o -= 8
    );
    for (
      a = (a << o) | u, c += o;
      c > 0;
      t[n + h] = 255 & a, h += p, a /= 256, c -= 8
    );
    t[n + h - p] |= 128 * v;
  },
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
!(function (t) {
  var e = Ec,
    n = Oc,
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
        var n = 0 | h(t, e),
          r = i(n),
          o = r.write(t, e);
        o !== n && (r = r.slice(0, o));
        return r;
      })(t, e);
    if (ArrayBuffer.isView(t))
      return (function (t) {
        if (M(t, Uint8Array)) {
          var e = new Uint8Array(t);
          return l(e.buffer, e.byteOffset, e.byteLength);
        }
        return f(t);
      })(t);
    if (null == t)
      throw new TypeError(
        'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
          typeof t
      );
    if (M(t, ArrayBuffer) || (t && M(t.buffer, ArrayBuffer))) return l(t, e, n);
    if (
      'undefined' != typeof SharedArrayBuffer &&
      (M(t, SharedArrayBuffer) || (t && M(t.buffer, SharedArrayBuffer)))
    )
      return l(t, e, n);
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
        return 'number' != typeof t.length || D(t.length) ? i(0) : f(t);
      if ('Buffer' === t.type && Array.isArray(t.data)) return f(t.data);
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
  function f(t) {
    for (
      var e = t.length < 0 ? 0 : 0 | d(t.length), n = i(e), r = 0;
      r < e;
      r += 1
    )
      n[r] = 255 & t[r];
    return n;
  }
  function l(t, e, n) {
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
  function h(t, e) {
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
          return j(t).length;
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return 2 * n;
        case 'hex':
          return n >>> 1;
        case 'base64':
          return L(t).length;
        default:
          if (o) return r ? -1 : j(t).length;
          (e = ('' + e).toLowerCase()), (o = !0);
      }
  }
  function p(t, e, n) {
    var r = !1;
    if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return '';
    if (((void 0 === n || n > this.length) && (n = this.length), n <= 0))
      return '';
    if ((n >>>= 0) <= (e >>>= 0)) return '';
    for (t || (t = 'utf8'); ; )
      switch (t) {
        case 'hex':
          return T(this, e, n);
        case 'utf8':
        case 'utf-8':
          return A(this, e, n);
        case 'ascii':
          return I(this, e, n);
        case 'latin1':
        case 'binary':
          return C(this, e, n);
        case 'base64':
          return E(this, e, n);
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return P(this, e, n);
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
      D((n = +n)) && (n = o ? 0 : t.length - 1),
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
      var f = -1;
      for (i = n; i < u; i++)
        if (c(t, i) === c(e, -1 === f ? 0 : i - f)) {
          if ((-1 === f && (f = i), i - f + 1 === s)) return f * a;
        } else -1 !== f && (i -= i - f), (f = -1);
    } else
      for (n + s > u && (n = u - s), i = n; i >= 0; i--) {
        for (var l = !0, d = 0; d < s; d++)
          if (c(t, i + d) !== c(e, d)) {
            l = !1;
            break;
          }
        if (l) return i;
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
      if (D(u)) return a;
      t[n + a] = u;
    }
    return a;
  }
  function b(t, e, n, r) {
    return F(j(e, t.length - n), t, n, r);
  }
  function _(t, e, n, r) {
    return F(
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
  function w(t, e, n, r) {
    return F(L(e), t, n, r);
  }
  function S(t, e, n, r) {
    return F(
      (function (t, e) {
        for (var n, r, o, i = [], a = 0; a < t.length && !((e -= 2) < 0); ++a)
          (r = (n = t.charCodeAt(a)) >> 8), (o = n % 256), i.push(o), i.push(r);
        return i;
      })(e, t.length - n),
      t,
      n,
      r
    );
  }
  function E(t, n, r) {
    return 0 === n && r === t.length
      ? e.fromByteArray(t)
      : e.fromByteArray(t.slice(n, r));
  }
  function A(t, e, n) {
    n = Math.min(t.length, n);
    for (var r = [], o = e; o < n; ) {
      var i,
        a,
        u,
        s,
        c = t[o],
        f = null,
        l = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
      if (o + l <= n)
        switch (l) {
          case 1:
            c < 128 && (f = c);
            break;
          case 2:
            128 == (192 & (i = t[o + 1])) &&
              (s = ((31 & c) << 6) | (63 & i)) > 127 &&
              (f = s);
            break;
          case 3:
            (i = t[o + 1]),
              (a = t[o + 2]),
              128 == (192 & i) &&
                128 == (192 & a) &&
                (s = ((15 & c) << 12) | ((63 & i) << 6) | (63 & a)) > 2047 &&
                (s < 55296 || s > 57343) &&
                (f = s);
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
                (f = s);
        }
      null === f
        ? ((f = 65533), (l = 1))
        : f > 65535 &&
          ((f -= 65536),
          r.push(((f >>> 10) & 1023) | 55296),
          (f = 56320 | (1023 & f))),
        r.push(f),
        (o += l);
    }
    return (function (t) {
      var e = t.length;
      if (e <= x) return String.fromCharCode.apply(String, t);
      var n = '',
        r = 0;
      for (; r < e; )
        n += String.fromCharCode.apply(String, t.slice(r, (r += x)));
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
      if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
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
            throw new TypeError('"list" argument must be an Array of Buffers');
          i.copy(r, o);
        }
        o += i.length;
      }
      return r;
    }),
    (a.byteLength = h),
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
        ? A(this, 0, t)
        : p.apply(this, arguments);
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
          f = t.slice(e, n),
          l = 0;
        l < s;
        ++l
      )
        if (c[l] !== f[l]) {
          (i = c[l]), (u = f[l]);
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
            return _(this, t, e, n);
          case 'base64':
            return w(this, t, e, n);
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
  var x = 4096;
  function I(t, e, n) {
    var r = '';
    n = Math.min(t.length, n);
    for (var o = e; o < n; ++o) r += String.fromCharCode(127 & t[o]);
    return r;
  }
  function C(t, e, n) {
    var r = '';
    n = Math.min(t.length, n);
    for (var o = e; o < n; ++o) r += String.fromCharCode(t[o]);
    return r;
  }
  function T(t, e, n) {
    var r = t.length;
    (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
    for (var o = '', i = e; i < n; ++i) o += $[t[i]];
    return o;
  }
  function P(t, e, n) {
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
  function O(t, e, n, r, o, i) {
    if (n + r > t.length) throw new RangeError('Index out of range');
    if (n < 0) throw new RangeError('Index out of range');
  }
  function R(t, e, r, o, i) {
    return (
      (e = +e),
      (r >>>= 0),
      i || O(t, 0, r, 4),
      n.write(t, e, r, o, 23, 4),
      r + 4
    );
  }
  function U(t, e, r, o, i) {
    return (
      (e = +e),
      (r >>>= 0),
      i || O(t, 0, r, 8),
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
        this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
      );
    }),
    (a.prototype.readInt32BE = function (t, e) {
      return (
        (t >>>= 0),
        e || B(t, 4, this.length),
        (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
      );
    }),
    (a.prototype.readFloatLE = function (t, e) {
      return (t >>>= 0), e || B(t, 4, this.length), n.read(this, t, !0, 23, 4);
    }),
    (a.prototype.readFloatBE = function (t, e) {
      return (t >>>= 0), e || B(t, 4, this.length), n.read(this, t, !1, 23, 4);
    }),
    (a.prototype.readDoubleLE = function (t, e) {
      return (t >>>= 0), e || B(t, 8, this.length), n.read(this, t, !0, 52, 8);
    }),
    (a.prototype.readDoubleBE = function (t, e) {
      return (t >>>= 0), e || B(t, 8, this.length), n.read(this, t, !1, 52, 8);
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
      return R(this, t, e, !0, n);
    }),
    (a.prototype.writeFloatBE = function (t, e, n) {
      return R(this, t, e, !1, n);
    }),
    (a.prototype.writeDoubleLE = function (t, e, n) {
      return U(this, t, e, !0, n);
    }),
    (a.prototype.writeDoubleBE = function (t, e, n) {
      return U(this, t, e, !1, n);
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
      if (n < 0 || n >= this.length) throw new RangeError('Index out of range');
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
  var N = /[^+/0-9A-Za-z-_]/g;
  function j(t, e) {
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
  function L(t) {
    return e.toByteArray(
      (function (t) {
        if ((t = (t = t.split('=')[0]).trim().replace(N, '')).length < 2)
          return '';
        for (; t.length % 4 != 0; ) t += '=';
        return t;
      })(t)
    );
  }
  function F(t, e, n, r) {
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
  function D(t) {
    return t != t;
  }
  var $ = (function () {
    for (var t = '0123456789abcdef', e = new Array(256), n = 0; n < 16; ++n)
      for (var r = 16 * n, o = 0; o < 16; ++o) e[r + o] = t[n] + t[o];
    return e;
  })();
})(Sc);
var Rc = zs,
  Uc = yc,
  Nc = Sc.Buffer;
function jc(t) {
  (this.genPoly = void 0),
    (this.degree = t),
    this.degree && this.initialize(this.degree);
}
(jc.prototype.initialize = function (t) {
  (this.degree = t), (this.genPoly = Uc.generateECPolynomial(this.degree));
}),
  (jc.prototype.encode = function (t) {
    if (!this.genPoly) throw new Error('Encoder not initialized');
    var e = Rc.alloc(this.degree),
      n = Nc.concat([t, e], t.length + this.degree),
      r = Uc.mod(n, this.genPoly),
      o = this.degree - r.length;
    if (o > 0) {
      var i = Rc.alloc(this.degree);
      return r.copy(i, o), i;
    }
    return r;
  });
var Lc = jc,
  Fc = {},
  Mc = {},
  Dc = {
    isValid: function (t) {
      return !isNaN(t) && t >= 1 && t <= 40;
    },
  },
  $c = {},
  zc =
    '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+',
  Vc =
    '(?:(?![A-Z0-9 $%*+\\-./:]|' +
    (zc = zc.replace(/u/g, '\\u')) +
    ')(?:.|[\r\n]))+';
($c.KANJI = new RegExp(zc, 'g')),
  ($c.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g')),
  ($c.BYTE = new RegExp(Vc, 'g')),
  ($c.NUMERIC = new RegExp('[0-9]+', 'g')),
  ($c.ALPHANUMERIC = new RegExp('[A-Z $%*+\\-./:]+', 'g'));
var Hc = new RegExp('^' + zc + '$'),
  Wc = new RegExp('^[0-9]+$'),
  Yc = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');
($c.testKanji = function (t) {
  return Hc.test(t);
}),
  ($c.testNumeric = function (t) {
    return Wc.test(t);
  }),
  ($c.testAlphanumeric = function (t) {
    return Yc.test(t);
  }),
  (function (t) {
    var e = Dc,
      n = $c;
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
            if ('string' != typeof e) throw new Error('Param is not a string');
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
  })(Mc),
  (function (t) {
    var e = ec,
      n = hc,
      r = rc,
      o = Mc,
      i = Dc,
      a = Hs,
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
        if (!i.isValid(t) || t < 7) throw new Error('Invalid QR Code version');
        for (var n = t << 12; e.getBCHDigit(n) - u >= 0; )
          n ^= 7973 << (e.getBCHDigit(n) - u);
        return (t << 12) | n;
      });
  })(Fc);
var qc = {},
  Gc = ec,
  Kc = Gc.getBCHDigit(1335);
qc.getEncodedBits = function (t, e) {
  for (var n = (t.bit << 3) | e, r = n << 10; Gc.getBCHDigit(r) - Kc >= 0; )
    r ^= 1335 << (Gc.getBCHDigit(r) - Kc);
  return 21522 ^ ((n << 10) | r);
};
var Jc = {},
  Qc = Mc;
function Zc(t) {
  (this.mode = Qc.NUMERIC), (this.data = t.toString());
}
(Zc.getBitsLength = function (t) {
  return 10 * Math.floor(t / 3) + (t % 3 ? (t % 3) * 3 + 1 : 0);
}),
  (Zc.prototype.getLength = function () {
    return this.data.length;
  }),
  (Zc.prototype.getBitsLength = function () {
    return Zc.getBitsLength(this.data.length);
  }),
  (Zc.prototype.write = function (t) {
    var e, n, r;
    for (e = 0; e + 3 <= this.data.length; e += 3)
      (n = this.data.substr(e, 3)), (r = parseInt(n, 10)), t.put(r, 10);
    var o = this.data.length - e;
    o > 0 &&
      ((n = this.data.substr(e)), (r = parseInt(n, 10)), t.put(r, 3 * o + 1));
  });
var Xc = Zc,
  tf = Mc,
  ef = [
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
function nf(t) {
  (this.mode = tf.ALPHANUMERIC), (this.data = t);
}
(nf.getBitsLength = function (t) {
  return 11 * Math.floor(t / 2) + (t % 2) * 6;
}),
  (nf.prototype.getLength = function () {
    return this.data.length;
  }),
  (nf.prototype.getBitsLength = function () {
    return nf.getBitsLength(this.data.length);
  }),
  (nf.prototype.write = function (t) {
    var e;
    for (e = 0; e + 2 <= this.data.length; e += 2) {
      var n = 45 * ef.indexOf(this.data[e]);
      (n += ef.indexOf(this.data[e + 1])), t.put(n, 11);
    }
    this.data.length % 2 && t.put(ef.indexOf(this.data[e]), 6);
  });
var rf = nf,
  of = zs,
  af = Mc;
function uf(t) {
  (this.mode = af.BYTE), (this.data = of.from(t));
}
(uf.getBitsLength = function (t) {
  return 8 * t;
}),
  (uf.prototype.getLength = function () {
    return this.data.length;
  }),
  (uf.prototype.getBitsLength = function () {
    return uf.getBitsLength(this.data.length);
  }),
  (uf.prototype.write = function (t) {
    for (var e = 0, n = this.data.length; e < n; e++) t.put(this.data[e], 8);
  });
var sf = uf,
  cf = Mc,
  ff = ec;
function lf(t) {
  (this.mode = cf.KANJI), (this.data = t);
}
(lf.getBitsLength = function (t) {
  return 13 * t;
}),
  (lf.prototype.getLength = function () {
    return this.data.length;
  }),
  (lf.prototype.getBitsLength = function () {
    return lf.getBitsLength(this.data.length);
  }),
  (lf.prototype.write = function (t) {
    var e;
    for (e = 0; e < this.data.length; e++) {
      var n = ff.toSJIS(this.data[e]);
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
var df,
  hf = lf,
  pf = { exports: {} };
(pf.exports = df =
  {
    single_source_shortest_paths: function (t, e, n) {
      var r = {},
        o = {};
      o[e] = 0;
      var i,
        a,
        u,
        s,
        c,
        f,
        l,
        d = df.PriorityQueue.make();
      for (d.push(e, 0); !d.empty(); )
        for (u in ((a = (i = d.pop()).value), (s = i.cost), (c = t[a] || {})))
          c.hasOwnProperty(u) &&
            ((f = s + c[u]),
            (l = o[u]),
            (void 0 === o[u] || l > f) &&
              ((o[u] = f), d.push(u, f), (r[u] = a)));
      if (void 0 !== n && void 0 === o[n]) {
        var h = ['Could not find a path from ', e, ' to ', n, '.'].join('');
        throw new Error(h);
      }
      return r;
    },
    extract_shortest_path_from_predecessor_list: function (t, e) {
      for (var n = [], r = e; r; ) n.push(r), (r = t[r]);
      return n.reverse(), n;
    },
    find_path: function (t, e, n) {
      var r = df.single_source_shortest_paths(t, e, n);
      return df.extract_shortest_path_from_predecessor_list(r, n);
    },
    PriorityQueue: {
      make: function (t) {
        var e,
          n = df.PriorityQueue,
          r = {};
        for (e in ((t = t || {}), n)) n.hasOwnProperty(e) && (r[e] = n[e]);
        return (r.queue = []), (r.sorter = t.sorter || n.default_sorter), r;
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
  }),
  (function (t) {
    var e = Mc,
      n = Xc,
      r = rf,
      o = sf,
      i = hf,
      a = $c,
      u = ec,
      s = pf.exports;
    function c(t) {
      return unescape(encodeURIComponent(t)).length;
    }
    function f(t, e, n) {
      for (var r, o = []; null !== (r = t.exec(n)); )
        o.push({ data: r[0], index: r.index, mode: e, length: r[0].length });
      return o;
    }
    function l(t) {
      var n,
        r,
        o = f(a.NUMERIC, e.NUMERIC, t),
        i = f(a.ALPHANUMERIC, e.ALPHANUMERIC, t);
      return (
        u.isKanjiModeEnabled()
          ? ((n = f(a.BYTE, e.BYTE, t)), (r = f(a.KANJI, e.KANJI, t)))
          : ((n = f(a.BYTE_KANJI, e.BYTE, t)), (r = [])),
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
    function h(t, a) {
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
            ? t.push(h(e, null))
            : e.data && t.push(h(e.data, e.mode)),
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
                  var f = u[c],
                    l = '' + a + c;
                  s.push(l), (r[l] = { node: f, lastCount: 0 }), (o[l] = {});
                  for (var h = 0; h < i.length; h++) {
                    var p = i[h];
                    r[p] && r[p].node.mode === f.mode
                      ? ((o[p][l] =
                          d(r[p].lastCount + f.length, f.mode) -
                          d(r[p].lastCount, f.mode)),
                        (r[p].lastCount += f.length))
                      : (r[p] && (r[p].lastCount = f.length),
                        (o[p][l] =
                          d(f.length, f.mode) +
                          4 +
                          e.getCharCountIndicator(f.mode, n)));
                  }
                }
                i = s;
              }
              for (h = 0; h < i.length; h++) o[i[h]].end = 0;
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
              })(l(n, u.isKanjiModeEnabled())),
              r
            ),
            i = s.find_path(o.map, 'start', 'end'),
            a = [],
            f = 1;
          f < i.length - 1;
          f++
        )
          a.push(o.table[i[f]].node);
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
        return t.fromArray(l(e, u.isKanjiModeEnabled()));
      });
  })(Jc);
var vf = zs,
  gf = ec,
  yf = rc,
  mf = ic,
  bf = sc,
  _f = cc,
  wf = fc,
  Sf = dc,
  Ef = hc,
  Af = Lc,
  xf = Fc,
  If = qc,
  Cf = Mc,
  Tf = Jc,
  Pf = Hs;
function Bf(t, e, n) {
  var r,
    o,
    i = t.size,
    a = If.getEncodedBits(e, n);
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
function kf(t, e, n) {
  var r = new mf();
  n.forEach(function (e) {
    r.put(e.mode.bit, 4),
      r.put(e.getLength(), Cf.getCharCountIndicator(e.mode, t)),
      e.write(r);
  });
  var o = 8 * (gf.getSymbolTotalCodewords(t) - Ef.getTotalCodewordsCount(t, e));
  for (
    r.getLengthInBits() + 4 <= o && r.put(0, 4);
    r.getLengthInBits() % 8 != 0;

  )
    r.putBit(0);
  for (var i = (o - r.getLengthInBits()) / 8, a = 0; a < i; a++)
    r.put(a % 2 ? 17 : 236, 8);
  return (function (t, e, n) {
    for (
      var r = gf.getSymbolTotalCodewords(e),
        o = Ef.getTotalCodewordsCount(e, n),
        i = r - o,
        a = Ef.getBlocksCount(e, n),
        u = a - (r % a),
        s = Math.floor(r / a),
        c = Math.floor(i / a),
        f = c + 1,
        l = s - c,
        d = new Af(l),
        h = 0,
        p = new Array(a),
        v = new Array(a),
        g = 0,
        y = vf.from(t.buffer),
        m = 0;
      m < a;
      m++
    ) {
      var b = m < u ? c : f;
      (p[m] = y.slice(h, h + b)),
        (v[m] = d.encode(p[m])),
        (h += b),
        (g = Math.max(g, b));
    }
    var _,
      w,
      S = vf.alloc(r),
      E = 0;
    for (_ = 0; _ < g; _++)
      for (w = 0; w < a; w++) _ < p[w].length && (S[E++] = p[w][_]);
    for (_ = 0; _ < l; _++) for (w = 0; w < a; w++) S[E++] = v[w][_];
    return S;
  })(r, t, e);
}
function Of(t, e, n, r) {
  var o;
  if (Pf(t)) o = Tf.fromArray(t);
  else {
    if ('string' != typeof t) throw new Error('Invalid data');
    var i = e;
    if (!i) {
      var a = Tf.rawSplit(t);
      i = xf.getBestVersionForData(a, n);
    }
    o = Tf.fromString(t, i || 40);
  }
  var u = xf.getBestVersionForData(o, n);
  if (!u)
    throw new Error('The amount of data is too big to be stored in a QR Code');
  if (e) {
    if (e < u)
      throw new Error(
        '\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: ' +
          u +
          '.\n'
      );
  } else e = u;
  var s = kf(e, n, o),
    c = gf.getSymbolSize(e),
    f = new bf(c);
  return (
    (function (t, e) {
      for (var n = t.size, r = wf.getPositions(e), o = 0; o < r.length; o++)
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
    })(f, e),
    (function (t) {
      for (var e = t.size, n = 8; n < e - 8; n++) {
        var r = n % 2 == 0;
        t.set(n, 6, r, !0), t.set(6, n, r, !0);
      }
    })(f),
    (function (t, e) {
      for (var n = _f.getPositions(e), r = 0; r < n.length; r++)
        for (var o = n[r][0], i = n[r][1], a = -2; a <= 2; a++)
          for (var u = -2; u <= 2; u++)
            -2 === a || 2 === a || -2 === u || 2 === u || (0 === a && 0 === u)
              ? t.set(o + a, i + u, !0, !0)
              : t.set(o + a, i + u, !1, !0);
    })(f, e),
    Bf(f, n, 0),
    e >= 7 &&
      (function (t, e) {
        for (
          var n, r, o, i = t.size, a = xf.getEncodedBits(e), u = 0;
          u < 18;
          u++
        )
          (n = Math.floor(u / 3)),
            (r = (u % 3) + i - 8 - 3),
            (o = 1 == ((a >> u) & 1)),
            t.set(n, r, o, !0),
            t.set(r, n, o, !0);
      })(f, e),
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
    })(f, s),
    isNaN(r) && (r = Sf.getBestMask(f, Bf.bind(null, f, n))),
    Sf.applyMask(r, f),
    Bf(f, n, r),
    {
      modules: f,
      version: e,
      errorCorrectionLevel: n,
      maskPattern: r,
      segments: o,
    }
  );
}
$s.create = function (t, e) {
  if (void 0 === t || '' === t) throw new Error('No input text');
  var n,
    r,
    o = yf.M;
  return (
    void 0 !== e &&
      ((o = yf.from(e.errorCorrectionLevel, yf.M)),
      (n = xf.from(e.version)),
      (r = Sf.from(e.maskPattern)),
      e.toSJISFunc && gf.setToSJISFunction(e.toSJISFunc)),
    Of(t, n, o, r)
  );
};
var Rf = {},
  Uf = {};
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
        void 0 === t.margin || null === t.margin || t.margin < 0 ? 4 : t.margin,
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
          f = 0;
        f < u;
        f++
      )
        for (var l = 0; l < u; l++) {
          var d = 4 * (f * u + l),
            h = r.color.light;
          if (f >= s && l >= s && f < u - s && l < u - s)
            h =
              c[
                i[Math.floor((f - s) / a) * o + Math.floor((l - s) / a)] ? 1 : 0
              ];
          (e[d++] = h.r), (e[d++] = h.g), (e[d++] = h.b), (e[d] = h.a);
        }
    });
})(Uf),
  (function (t) {
    var e = Uf;
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
  })(Rf);
var Nf = {},
  jf = Uf;
function Lf(t, e) {
  var n = t.a / 255,
    r = e + '="' + t.hex + '"';
  return n < 1 ? r + ' ' + e + '-opacity="' + n.toFixed(2).slice(1) + '"' : r;
}
function Ff(t, e, n) {
  var r = t + e;
  return void 0 !== n && (r += ' ' + n), r;
}
Nf.render = function (t, e, n) {
  var r = jf.getOptions(e),
    o = t.modules.size,
    i = t.modules.data,
    a = o + 2 * r.margin,
    u = r.color.light.a
      ? '<path ' +
        Lf(r.color.light, 'fill') +
        ' d="M0 0h' +
        a +
        'v' +
        a +
        'H0z"/>'
      : '',
    s =
      '<path ' +
      Lf(r.color.dark, 'stroke') +
      ' d="' +
      (function (t, e, n) {
        for (var r = '', o = 0, i = !1, a = 0, u = 0; u < t.length; u++) {
          var s = Math.floor(u % e),
            c = Math.floor(u / e);
          s || i || (i = !0),
            t[u]
              ? (a++,
                (u > 0 && s > 0 && t[u - 1]) ||
                  ((r += i ? Ff('M', s + n, 0.5 + c + n) : Ff('m', o, 0)),
                  (o = 0),
                  (i = !1)),
                (s + 1 < e && t[u + 1]) || ((r += Ff('h', a)), (a = 0)))
              : o++;
        }
        return r;
      })(i, o, r.margin) +
      '"/>',
    c = 'viewBox="0 0 ' + a + ' ' + a + '"',
    f =
      '<svg xmlns="http://www.w3.org/2000/svg" ' +
      (r.width ? 'width="' + r.width + '" height="' + r.width + '" ' : '') +
      c +
      ' shape-rendering="crispEdges">' +
      u +
      s +
      '</svg>\n';
  return 'function' == typeof n && n(null, f), f;
};
var Mf = function () {
    return (
      'function' == typeof Promise &&
      Promise.prototype &&
      Promise.prototype.then
    );
  },
  Df = $s,
  $f = Rf,
  zf = Nf;
function Vf(t, e, n, r, o) {
  var i = [].slice.call(arguments, 1),
    a = i.length,
    u = 'function' == typeof i[a - 1];
  if (!u && !Mf()) throw new Error('Callback required as last argument');
  if (!u) {
    if (a < 1) throw new Error('Too few arguments provided');
    return (
      1 === a
        ? ((n = e), (e = r = void 0))
        : 2 !== a || e.getContext || ((r = n), (n = e), (e = void 0)),
      new Promise(function (o, i) {
        try {
          var a = Df.create(n, r);
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
    var s = Df.create(n, r);
    o(null, t(s, e, r));
  } catch (c) {
    o(c);
  }
}
(Ds.create = Df.create),
  (Ds.toCanvas = Vf.bind(null, $f.render)),
  (Ds.toDataURL = Vf.bind(null, $f.renderToDataURL)),
  (Ds.toString = Vf.bind(null, function (t, e, n) {
    return zf.render(t, n);
  }));
var Hf = c({
  components: {
    BaseBox: G,
    BaseHeading: Y,
    BaseFieldSet: q,
    BaseForm: W,
    BaseLabel: D,
    BaseSpacer: Q,
    BaseButton: J,
    BaseFooter: z,
    BaseText: X,
    BaseInput: tt,
    BaseWrapper: H,
  },
  inheritAttrs: !1,
  setup(t, { emit: e, attrs: n }) {
    const { state: r, send: o } = As(),
      i = I(() => _s(r.value));
    let a = R({ qrCodeImageSource: null, isLoading: !0 });
    U(async () => {
      const t = new M('SetupTOTP-logger'),
        { user: e } = i.value.context;
      if (e)
        try {
          const t = await L.setupTOTP(e),
            n = 'AWSCognito',
            r = `otpauth://totp/${n}:${e.username}?secret=${t}&issuer=${n}`;
          a.qrCodeImageSource = await Ds.toDataURL(r);
        } catch (n) {
          t.error(n);
        } finally {
          a.isLoading = !1;
        }
    });
    const c = I(() => 'Back to Sign In'),
      f = I(() => 'CONFIRM'),
      l = I(() => 'Setup TOTP'),
      d = (t) => {
        const e = new FormData(t.target);
        o({ type: 'SUBMIT', data: u({}, Object.fromEntries(e)) });
      };
    return s(u({}, N(a)), {
      actorState: i,
      onSetupTOTPSubmit: (t) => {
        (null == n ? void 0 : n.onConfirmSetupTOTPSubmit)
          ? e('confirmSetupTOTPSubmit', t)
          : d(t);
      },
      onBackToSignInClicked: () => {
        (null == n ? void 0 : n.onBackToSignInClicked)
          ? e('backToSignInClicked')
          : o({ type: 'SIGN_IN' });
      },
      submit: d,
      backSignInText: c,
      confirmText: f,
      setupTOTPText: l,
    });
  },
});
const Wf = { key: 0 },
  Yf = ['src'],
  qf = w('Code *');
Hf.render = function (t, e, n, r, o, i) {
  const a = m('base-heading'),
    u = m('base-text'),
    s = m('base-input'),
    c = m('base-label'),
    p = m('base-field-set'),
    v = m('base-button'),
    g = m('base-spacer'),
    y = m('base-footer'),
    E = m('base-box'),
    A = m('base-form'),
    x = m('base-wrapper');
  return d(t.$slots, 'confirmSetupTOTPI', {}, () => [
    b(
      x,
      { 'data-amplify-wrapper': '' },
      {
        default: _(() => [
          b(
            A,
            {
              'data-amplify-authenticator-setup-totp': '',
              onSubmit: k(t.onSetupTOTPSubmit, ['prevent']),
            },
            {
              default: _(() => [
                b(a, null, {
                  default: _(() => [w(S(t.setupTOTPText), 1)]),
                  _: 1,
                }),
                b(
                  p,
                  { disabled: t.actorState.matches('confirmSignIn.pending') },
                  {
                    default: _(() => [
                      b(
                        c,
                        { 'data-amplify-confirmationcode': '' },
                        {
                          default: _(() => [
                            t.isLoading
                              ? (f(), l('p', Wf, 'Loading...'))
                              : (f(),
                                l(
                                  P,
                                  { key: 1 },
                                  [
                                    h(
                                      'img',
                                      {
                                        'data-amplify-qrcode': '',
                                        src: t.qrCodeImageSource,
                                        alt: 'qr code',
                                      },
                                      null,
                                      8,
                                      Yf
                                    ),
                                    b(u, null, {
                                      default: _(() => [qf]),
                                      _: 1,
                                    }),
                                    b(s, {
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
                b(y, null, {
                  footert: _(({ slotData: e }) => [
                    d(t.$slots, 'footer', {
                      info: e,
                      onBackToSignInClicked: t.onBackToSignInClicked,
                      onSetupTOTPSubmit: t.onSetupTOTPSubmit,
                    }),
                  ]),
                  default: _(() => [
                    b(
                      v,
                      {
                        type: 'button',
                        onClick: k(t.onBackToSignInClicked, ['prevent']),
                      },
                      { default: _(() => [w(S(t.backSignInText), 1)]), _: 1 },
                      8,
                      ['onClick']
                    ),
                    b(g),
                    b(
                      v,
                      {
                        disabled: t.actorState.matches('confirmSignIn.pending'),
                      },
                      { default: _(() => [w(S(t.confirmText), 1)]), _: 1 },
                      8,
                      ['disabled']
                    ),
                  ]),
                  _: 3,
                }),
                b(
                  E,
                  { 'data-ui-error': '' },
                  {
                    default: _(() => [
                      w(S(t.actorState.context.remoteError), 1),
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
var Gf = c({
  components: {
    BaseInput: tt,
    BaseText: X,
    BaseLabel: D,
    BaseForm: W,
    BaseHeading: Y,
    BaseFieldSet: q,
    BaseFooter: z,
    BaseButton: J,
    BaseSpacer: Q,
    BaseWrapper: H,
    BaseBox: G,
  },
  inheritAttrs: !1,
  setup(t, { emit: e, attrs: n }) {
    const { state: r, send: o } = As(),
      i = I(() => _s(r.value)),
      a = I(() => 'Change password'),
      s = I(() => 'Changing'),
      c = I(() => 'Have an account?'),
      f = I(() => 'Sign In'),
      l = (t) => {
        const e = new FormData(t.target);
        o({ type: 'SUBMIT', data: u({}, Object.fromEntries(e)) });
      };
    return {
      changePasswordLabel: a,
      submit: l,
      onForceNewPasswordSubmit: (t) => {
        (null == n ? void 0 : n.onForceNewPasswordSubmit)
          ? e('forceNewPasswordSubmit', t)
          : l(t);
      },
      actorState: i,
      onHaveAccountClicked: () => {
        (null == n ? void 0 : n.onHaveAccountClicked)
          ? e('haveAccountClicked')
          : o({ type: 'SIGN_IN' });
      },
      signInButtonText: f,
      haveAccountLabel: c,
      changingPasswordLabel: s,
    };
  },
});
Gf.render = function (t, e, n, r, o, i) {
  const a = m('base-heading'),
    u = m('base-text'),
    s = m('base-input'),
    c = m('base-label'),
    f = m('base-field-set'),
    l = m('base-box'),
    h = m('base-button'),
    p = m('base-spacer'),
    v = m('base-footer'),
    g = m('base-form'),
    y = m('base-wrapper');
  return d(t.$slots, 'forceNewPasswordI', {}, () => [
    b(
      y,
      { 'data-amplify-wrapper': '' },
      {
        default: _(() => [
          b(
            g,
            {
              'data-amplify-authenticator-forcenewpassword': '',
              onSubmit: k(t.onForceNewPasswordSubmit, ['prevent']),
            },
            {
              default: _(() => [
                b(a, null, {
                  default: _(() => [w(S(t.changePasswordLabel), 1)]),
                  _: 1,
                }),
                b(
                  f,
                  { disabled: !t.actorState.matches('forceNewPassword.edit') },
                  {
                    default: _(() => [
                      b(
                        c,
                        { 'data-amplify-forcenewpassword-label': '' },
                        {
                          default: _(() => [
                            b(u, null, {
                              default: _(() => [
                                w(S(t.changePasswordLabel), 1),
                              ]),
                              _: 1,
                            }),
                            b(s, {
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
                b(
                  l,
                  { 'data-ui-error': '', class: 'forceNewPasswordErrorText' },
                  {
                    default: _(() => [
                      w(S(t.actorState.context.remoteError), 1),
                    ]),
                    _: 1,
                  }
                ),
                b(v, null, {
                  footert: _(({ slotData: e }) => [
                    d(t.$slots, 'footer', {
                      info: e,
                      onHaveAccountClicked: t.onHaveAccountClicked,
                      onForceNewPasswordSubmit: t.onForceNewPasswordSubmit,
                    }),
                  ]),
                  default: _(() => [
                    d(
                      t.$slots,
                      'footer-left',
                      { onHaveAccountClicked: t.onHaveAccountClicked },
                      () => [
                        b(u, null, {
                          default: _(() => [w(S(t.haveAccountLabel), 1)]),
                          _: 1,
                        }),
                        b(
                          h,
                          {
                            type: 'button',
                            onClick: k(t.onHaveAccountClicked, ['prevent']),
                          },
                          {
                            default: _(() => [w(S(t.signInButtonText), 1)]),
                            _: 1,
                          },
                          8,
                          ['onClick']
                        ),
                      ]
                    ),
                    b(p),
                    d(
                      t.$slots,
                      'footer-right',
                      { onForceNewPasswordSubmit: t.onForceNewPasswordSubmit },
                      () => [
                        b(
                          h,
                          { disabled: t.actorState.matches('signUp.submit') },
                          {
                            default: _(() => [
                              w(
                                S(
                                  t.actorState.matches('forceNewPassword.edit')
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
var Kf = c({
  components: {
    BaseBox: G,
    BaseHeading: Y,
    BaseFieldSet: q,
    BaseForm: W,
    BaseLabel: D,
    BaseSpacer: Q,
    BaseButton: J,
    BaseFooter: z,
    BaseText: X,
    BaseInput: tt,
    BaseWrapper: H,
  },
  inheritAttrs: !1,
  setup(t, { emit: e, attrs: n }) {
    const { state: r, send: o } = As(),
      i = I(() => _s(r.value)),
      a = I(() => 'Back to Sign In'),
      u = I(() => 'Reset your Password'),
      s = I(() => 'Send Code'),
      c = (t) => {
        const e = new FormData(t.target);
        o({ type: 'SUBMIT', data: Object.fromEntries(e) });
      };
    return {
      onResetPasswordSubmit: (t) => {
        (null == n ? void 0 : n.onResetPasswordSubmit)
          ? e('resetPasswordSubmit', t)
          : c(t);
      },
      onBackToSignInClicked: () => {
        (null == n ? void 0 : n.onBackToSignInClicked)
          ? e('backToSignInClicked')
          : o({ type: 'SIGN_IN' });
      },
      submit: c,
      resetPasswordText: s,
      resetPasswordHeading: u,
      backSignInText: a,
      actorState: i,
      onChange: (t) => {
        const { name: e, value: n } = t.target;
        o({ type: 'CHANGE', data: { name: e, value: n } });
      },
    };
  },
});
const Jf = w('Username');
Kf.render = function (t, e, n, r, o, i) {
  const a = m('base-heading'),
    u = m('base-text'),
    s = m('base-input'),
    c = m('base-label'),
    f = m('base-field-set'),
    l = m('base-button'),
    h = m('base-spacer'),
    p = m('base-footer'),
    v = m('base-box'),
    g = m('base-form'),
    y = m('base-wrapper');
  return d(t.$slots, 'resetPasswordSlotI', {}, () => [
    b(
      y,
      { 'data-amplify-wrapper': '' },
      {
        default: _(() => [
          b(
            g,
            {
              'data-amplify-authenticator-resetpassword': '',
              onSubmit: k(t.onResetPasswordSubmit, ['prevent']),
              onChange: t.onChange,
            },
            {
              default: _(() => [
                b(a, null, {
                  default: _(() => [w(S(t.resetPasswordHeading), 1)]),
                  _: 1,
                }),
                b(
                  f,
                  { disabled: t.actorState.matches('resetPassword.pending') },
                  {
                    default: _(() => [
                      b(
                        c,
                        { 'data-amplify-resetpassword-label': '' },
                        {
                          default: _(() => [
                            b(u, null, { default: _(() => [Jf]), _: 1 }),
                            b(s, {
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
                b(p, null, {
                  footert: _(({ slotData: e }) => [
                    d(t.$slots, 'footer', {
                      info: e,
                      onBackToSignInClicked: t.onBackToSignInClicked,
                      onResetPasswordSubmit: t.onResetPasswordSubmit,
                    }),
                  ]),
                  default: _(() => [
                    b(
                      l,
                      {
                        type: 'button',
                        onClick: k(t.onBackToSignInClicked, ['prevent']),
                      },
                      { default: _(() => [w(S(t.backSignInText), 1)]), _: 1 },
                      8,
                      ['onClick']
                    ),
                    b(h),
                    b(
                      l,
                      {
                        disabled: t.actorState.matches('resetPassword.pending'),
                      },
                      {
                        default: _(() => [w(S(t.resetPasswordText), 1)]),
                        _: 1,
                      },
                      8,
                      ['disabled']
                    ),
                  ]),
                  _: 3,
                }),
                b(
                  v,
                  { 'data-ui-error': '' },
                  {
                    default: _(() => {
                      var e, n;
                      return [
                        w(
                          S(
                            null ==
                              (n =
                                null == (e = t.actorState) ? void 0 : e.context)
                              ? void 0
                              : n.remoteError
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
var Qf = c({
  components: {
    BaseBox: G,
    BaseHeading: Y,
    BaseFieldSet: q,
    BaseForm: W,
    BaseLabel: D,
    BaseSpacer: Q,
    BaseButton: J,
    BaseFooter: z,
    BaseText: X,
    BaseInput: tt,
    BaseWrapper: H,
  },
  inheritAttrs: !1,
  setup(t, { emit: e, attrs: n }) {
    const { state: r, send: o } = As(),
      i = I(() => _s(r.value)),
      a = I(() => 'Back to Sign In'),
      s = I(() => 'Lost your code?'),
      c = I(() => 'Resend Code'),
      f = I(() => 'Confirmation Code'),
      l = I(() => 'Reset your Password'),
      d = I(() => 'Submit'),
      h = (t) => {
        const e = new FormData(t.target);
        o({ type: 'SUBMIT', data: u({}, Object.fromEntries(e)) });
      };
    return {
      onConfirmResetPasswordSubmit: (t) => {
        (null == n ? void 0 : n.onConfirmResetPasswordSubmit)
          ? e('confirmResetPasswordSubmit', t)
          : h(t);
      },
      onBackToSignInClicked: () => {
        (null == n ? void 0 : n.onBackToSignInClicked)
          ? e('backToSignInClicked')
          : o({ type: 'SIGN_IN' });
      },
      submit: h,
      onLostYourCodeClicked: () => {
        o({ type: 'RESEND' });
      },
      onChange: (t) => {
        const { name: e, value: n } = t.target;
        o({ type: 'CHANGE', data: { name: e, value: n } });
      },
      backSignInText: a,
      actorState: i,
      lostYourCodeText: s,
      resendCodeText: c,
      confirmationCodeText: f,
      confirmResetPasswordText: d,
      confirmResetPasswordHeading: l,
    };
  },
});
const Zf = w('New password');
Qf.render = function (t, e, n, r, o, i) {
  const a = m('base-heading'),
    u = m('base-text'),
    s = m('base-input'),
    c = m('base-label'),
    f = m('base-button'),
    l = m('base-box'),
    h = m('base-field-set'),
    p = m('base-spacer'),
    v = m('base-footer'),
    g = m('base-form'),
    y = m('base-wrapper');
  return d(t.$slots, 'confirmResetPasswordSlotI', {}, () => [
    b(
      y,
      { 'data-amplify-wrapper': '' },
      {
        default: _(() => [
          b(
            g,
            {
              'data-amplify-authenticator-confirmResetpassword': '',
              onSubmit: k(t.onConfirmResetPasswordSubmit, ['prevent']),
              onChange: t.onChange,
            },
            {
              default: _(() => [
                b(a, null, {
                  default: _(() => [w(S(t.confirmResetPasswordHeading), 1)]),
                  _: 1,
                }),
                b(
                  h,
                  {
                    disabled: t.actorState.matches(
                      'confirmResetPassword.pending'
                    ),
                  },
                  {
                    default: _(() => [
                      b(
                        c,
                        { 'data-amplify-confirmresetpassword-label': '' },
                        {
                          default: _(() => [
                            b(u, null, {
                              default: _(() => [
                                w(S(t.confirmationCodeText), 1),
                              ]),
                              _: 1,
                            }),
                            b(s, {
                              name: 'confirmation_code',
                              required: '',
                              type: 'number',
                            }),
                          ]),
                          _: 1,
                        }
                      ),
                      b(
                        c,
                        { 'data-amplify-confirmresetpassword-label': '' },
                        {
                          default: _(() => [
                            b(u, null, { default: _(() => [Zf]), _: 1 }),
                            b(s, {
                              name: 'password',
                              autocomplete: 'password',
                              required: '',
                              type: 'password',
                            }),
                          ]),
                          _: 1,
                        }
                      ),
                      b(
                        l,
                        { 'data-amplify-lostcode': '' },
                        {
                          default: _(() => [
                            d(
                              t.$slots,
                              'lost-your-code-section',
                              {
                                onLostYourCodeClicked: t.onLostYourCodeClicked,
                              },
                              () => [
                                b(u, null, {
                                  default: _(() => [
                                    w(S(t.lostYourCodeText), 1),
                                  ]),
                                  _: 1,
                                }),
                                b(
                                  f,
                                  {
                                    type: 'button',
                                    onClick: k(t.onLostYourCodeClicked, [
                                      'prevent',
                                    ]),
                                  },
                                  {
                                    default: _(() => [
                                      w(S(t.resendCodeText), 1),
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
                b(v, null, {
                  footert: _(({ slotData: e }) => [
                    d(t.$slots, 'footer', {
                      info: e,
                      onBackToSignInClicked: t.onBackToSignInClicked,
                      onConfirmResetPasswordSubmit:
                        t.onConfirmResetPasswordSubmit,
                    }),
                  ]),
                  default: _(() => [
                    b(
                      f,
                      {
                        type: 'button',
                        onClick: k(t.onBackToSignInClicked, ['prevent']),
                      },
                      { default: _(() => [w(S(t.backSignInText), 1)]), _: 1 },
                      8,
                      ['onClick']
                    ),
                    b(p),
                    b(
                      f,
                      {
                        disabled: t.actorState.matches(
                          'confirmResetPassword.pending'
                        ),
                      },
                      {
                        default: _(() => [w(S(t.confirmResetPasswordText), 1)]),
                        _: 1,
                      },
                      8,
                      ['disabled']
                    ),
                  ]),
                  _: 3,
                }),
                b(
                  l,
                  { 'data-ui-error': '' },
                  {
                    default: _(() => {
                      var e, n;
                      return [
                        w(
                          S(
                            null ==
                              (n =
                                null == (e = t.actorState) ? void 0 : e.context)
                              ? void 0
                              : n.remoteError
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
var Xf = c({
  inheritAttrs: !1,
  components: {
    SignIn: Bs,
    SignUp: Us,
    ConfirmSignUp: Ls,
    ConfirmSignIn: Fs,
    SetupTotp: Hf,
    ForceNewPassword: Gf,
    ResetPassword: Kf,
    ConfirmResetPassword: Qf,
  },
  props: { shouldHideReturnBtn: { default: !0, type: Boolean } },
  setup(t, { attrs: e, emit: n }) {
    const { state: r, send: o } = As(),
      i = I(() => _s(r.value)),
      a = C(null),
      u = C(null),
      s = C(null),
      c = C(null),
      f = C(null),
      l = C(null),
      d = C(null),
      h = C(null),
      p = C('SIGNIN');
    return (
      j('pageInfo', p),
      {
        currentPage: p,
        state: r,
        actorState: i,
        onSignInSubmitI: (t) => {
          (null == e ? void 0 : e.onSignInSubmit)
            ? n('signInSubmit', t)
            : a.value.submit(t);
        },
        signInComponent: a,
        signUpComponent: u,
        forceNewPasswordComponent: l,
        onSignUpSubmitI: (t) => {
          (null == e ? void 0 : e.onSignUpSubmit)
            ? n('signUpSubmit', t)
            : u.value.submit(t);
        },
        confirmSignUpComponent: s,
        confirmSignInComponent: c,
        confirmSetupTOTPComponent: f,
        resetPasswordComponent: d,
        confirmResetPasswordComponent: h,
        onConfirmSignInSubmitI: (t) => {
          (null == e ? void 0 : e.onConfirmSignInSubmit)
            ? n('confirmSignInSubmit', t)
            : c.value.submit(t);
        },
        onResetPasswordSubmitI: (t) => {
          (null == e ? void 0 : e.onResetPasswordSubmit)
            ? n('resetPasswordSubmit', t)
            : d.value.submit(t);
        },
        onConfirmSignUpSubmitI: (t) => {
          (null == e ? void 0 : e.onConfirmSignUpSubmit)
            ? n('confirmSignUpSubmit', t)
            : s.value.submit(t);
        },
        onConfirmSetupTOTPSubmitI: (t) => {
          (null == e ? void 0 : e.onForceNewPasswordSubmit)
            ? n('mSetupTOTPSubmit', t)
            : f.value.submit(t);
        },
        onForceNewPasswordSubmitI: (t) => {
          (null == e ? void 0 : e.onForceNewPasswordSubmit)
            ? n('forceNewPasswordSubmit', t)
            : l.value.submit(t);
        },
        onConfirmResetPasswordSubmitI: (t) => {
          (null == e ? void 0 : e.onConfirmResetPasswordSubmit)
            ? n('confirmResetPasswordSubmit', t)
            : h.value.submit(t);
        },
        send: o,
      }
    );
  },
});
const tl = { key: 2 };
Xf.render = function (t, e, n, r, o, i) {
  var a, u, s, c, p, v, g, y, b, w, S, E;
  const A = m('sign-in'),
    x = m('sign-up'),
    I = m('confirm-sign-up'),
    C = m('reset-password'),
    k = m('confirm-reset-password'),
    O = m('confirm-sign-in'),
    R = m('setup-totp'),
    U = m('force-new-password');
  return (
    f(),
    l(
      P,
      null,
      [
        h('div', null, [
          (null == (a = t.actorState) ? void 0 : a.matches('signIn'))
            ? (f(),
              T(
                A,
                {
                  key: 0,
                  onSignInSubmit: t.onSignInSubmitI,
                  ref: 'signInComponent',
                },
                {
                  signInSlotI: _(() => [d(t.$slots, 'sign-in')]),
                  'forgot-password-section': _(
                    ({ onForgotPasswordClicked: e }) => [
                      d(t.$slots, 'sign-in-forgot-password-section', {
                        onForgotPasswordClicked: e,
                      }),
                    ]
                  ),
                  'sign-in-button': _(({ onSignInSubmit: e }) => [
                    d(t.$slots, 'sign-in-button', { onSignInSubmit: e }),
                  ]),
                  form: _(
                    ({
                      info: e,
                      onSignInSubmit: n,
                      onCreateAccountClicked: r,
                      onForgotPasswordClicked: o,
                    }) => [
                      d(t.$slots, 'sign-in-form', {
                        info: e,
                        onSignInSubmit: n,
                        onCreateAccountClicked: r,
                        onForgotPasswordClicked: o,
                      }),
                    ]
                  ),
                  heading: _(() => [d(t.$slots, 'sign-in-heading')]),
                  footer: _(
                    ({
                      info: e,
                      onSignInSubmit: n,
                      onCreateAccountClicked: r,
                    }) => [
                      d(t.$slots, 'sign-in-footer', {
                        info: e,
                        onSignInSubmit: n,
                        onCreateAccountClicked: r,
                      }),
                    ]
                  ),
                  'additional-fields': _(
                    ({ onSignInSubmit: e, onCreateAccountClicked: n }) => [
                      d(t.$slots, 'sign-in-additional-fields', {
                        onSignInSubmit: e,
                        onCreateAccountClicked: n,
                      }),
                    ]
                  ),
                  'signin-fields': _(({ info: e }) => [
                    d(t.$slots, 'sign-in-fields', { info: e }),
                  ]),
                  _: 3,
                },
                8,
                ['onSignInSubmit']
              ))
            : B('', !0),
          (null == (u = t.actorState) ? void 0 : u.matches('signUp'))
            ? (f(),
              T(
                x,
                {
                  key: 1,
                  onSignUpSubmit: t.onSignUpSubmitI,
                  ref: 'signUpComponent',
                },
                {
                  'signup-fields': _(({ info: e }) => [
                    d(t.$slots, 'sign-up-fields', { info: e }),
                  ]),
                  signUpSlotI: _(() => [d(t.$slots, 'sign-up')]),
                  'footer-left': _(({ onHaveAccountClicked: e }) => [
                    d(t.$slots, 'sign-up-footer-left', {
                      onHaveAccountClicked: e,
                    }),
                  ]),
                  'footer-right': _(({ onSignUpSubmit: e }) => [
                    d(t.$slots, 'sign-up-footer-right', { onSignUpSubmit: e }),
                  ]),
                  footer: _(
                    ({
                      info: e,
                      onHaveAccountClicked: n,
                      onSignUpSubmit: r,
                    }) => [
                      d(t.$slots, 'sign-up-footer', {
                        info: e,
                        onHaveAccountClicked: n,
                        onSignUpSubmit: r,
                      }),
                    ]
                  ),
                  _: 3,
                },
                8,
                ['onSignUpSubmit']
              ))
            : B('', !0),
          (null == (s = t.actorState) ? void 0 : s.matches('signIn.rejected'))
            ? (f(), l('div', tl, " Error! Can't sign in! "))
            : B('', !0),
          (null == (c = t.actorState) ? void 0 : c.matches('confirmSignUp'))
            ? (f(),
              T(
                I,
                {
                  key: 3,
                  onConfirmSignUpSubmit: t.onConfirmSignUpSubmitI,
                  shouldHideReturnBtn: t.shouldHideReturnBtn,
                  ref: 'confirmSignUpComponent',
                },
                {
                  confirmSignUpSlotI: _(() => [d(t.$slots, 'confirm-sign-up')]),
                  footer: _(
                    ({
                      info: e,
                      onConfirmSignUpSubmit: n,
                      onBackToSignInClicked: r,
                    }) => [
                      d(t.$slots, 'sign-in-footer', {
                        info: e,
                        onConfirmSignUpSubmit: n,
                        onBackToSignInClicked: r,
                      }),
                    ]
                  ),
                  _: 3,
                },
                8,
                ['onConfirmSignUpSubmit', 'shouldHideReturnBtn']
              ))
            : B('', !0),
          (null == (p = t.actorState) ? void 0 : p.matches('resetPassword'))
            ? (f(),
              T(
                C,
                {
                  key: 4,
                  onResetPasswordSubmit: t.onResetPasswordSubmitI,
                  ref: 'resetPasswordComponent',
                },
                {
                  resetPasswordSlotI: _(() => [d(t.$slots, 'reset-password')]),
                  footer: _(
                    ({
                      info: e,
                      onResetPasswordSubmit: n,
                      onBackToSignInClicked: r,
                    }) => [
                      d(t.$slots, 'sign-in-footer', {
                        info: e,
                        onResetPasswordSubmit: n,
                        onBackToSignInClicked: r,
                      }),
                    ]
                  ),
                  _: 3,
                },
                8,
                ['onResetPasswordSubmit']
              ))
            : B('', !0),
          (
            null == (v = t.actorState)
              ? void 0
              : v.matches('confirmResetPassword')
          )
            ? (f(),
              T(
                k,
                {
                  key: 5,
                  onConfirmResetPasswordSubmit: t.onConfirmResetPasswordSubmitI,
                  ref: 'confirmResetPasswordComponent',
                },
                {
                  confirmResetPasswordSlotI: _(() => [
                    d(t.$slots, 'confirm-reset-password'),
                  ]),
                  footer: _(
                    ({
                      info: e,
                      onConfirmResetPasswordSubmit: n,
                      onBackToSignInClicked: r,
                    }) => [
                      d(t.$slots, 'sign-in-footer', {
                        info: e,
                        onConfirmResetPasswordSubmit: n,
                        onBackToSignInClicked: r,
                      }),
                    ]
                  ),
                  _: 3,
                },
                8,
                ['onConfirmResetPasswordSubmit']
              ))
            : B('', !0),
          (null == (g = t.actorState) ? void 0 : g.matches('confirmSignIn'))
            ? (f(),
              T(
                O,
                {
                  key: 6,
                  onConfirmSignInSubmit: t.onConfirmSignInSubmitI,
                  ref: 'confirmSignInComponent',
                },
                {
                  confirmSignInSlotI: _(() => [d(t.$slots, 'confirm-sign-in')]),
                  footer: _(
                    ({
                      info: e,
                      onConfirmSignInSubmit: n,
                      onBackToSignInClicked: r,
                    }) => [
                      d(t.$slots, 'sign-in-footer', {
                        info: e,
                        onConfirmSignInSubmit: n,
                        onBackToSignInClicked: r,
                      }),
                    ]
                  ),
                  _: 3,
                },
                8,
                ['onConfirmSignInSubmit']
              ))
            : B('', !0),
          (null == (y = t.actorState) ? void 0 : y.matches('setupTOTP'))
            ? (f(),
              T(
                R,
                {
                  key: 7,
                  onConfirmSetupTotpSubmit: t.onConfirmSetupTOTPSubmitI,
                  ref: 'confirmSetupTOTPComponent',
                },
                {
                  confirmSetupTOTPI: _(() => [
                    d(t.$slots, 'confirm-setup-totp'),
                  ]),
                  footer: _(
                    ({
                      info: e,
                      onSetupTOTPSubmit: n,
                      onBackToSignInClicked: r,
                    }) => [
                      d(t.$slots, 'sign-in-footer', {
                        info: e,
                        onSetupTOTPSubmit: n,
                        onBackToSignInClicked: r,
                      }),
                    ]
                  ),
                  _: 3,
                },
                8,
                ['onConfirmSetupTotpSubmit']
              ))
            : B('', !0),
          (null == (b = t.actorState) ? void 0 : b.matches('forceNewPassword'))
            ? (f(),
              T(
                U,
                {
                  key: 8,
                  onForceNewPasswordSubmit: t.onForceNewPasswordSubmitI,
                  ref: 'forceNewPasswordComponent',
                },
                {
                  forceNewPasswordI: _(() => [
                    d(t.$slots, 'force-new-password'),
                  ]),
                  footer: _(
                    ({
                      info: e,
                      onHaveAccountClicked: n,
                      onForceNewPasswordSubmit: r,
                    }) => [
                      d(t.$slots, 'sign-in-footer', {
                        info: e,
                        onForceNewPasswordSubmit: r,
                        onBackToSignInClicked: n,
                      }),
                    ]
                  ),
                  _: 3,
                },
                8,
                ['onForceNewPasswordSubmit']
              ))
            : B('', !0),
        ]),
        (null == (w = t.state) ? void 0 : w.matches('authenticated'))
          ? d(t.$slots, 'default', {
              key: 0,
              user:
                null == (E = null == (S = t.state) ? void 0 : S.context)
                  ? void 0
                  : E.user,
            })
          : B('', !0),
      ],
      64
    )
  );
};
var el = c({ props: { info: { type: Object } }, setup: (t) => () => t.info });
Xf.install = (t) => {
  t.component('SignIn', Bs),
    t.component('SignUp', Us),
    t.component('FederatedSignIn', Ts),
    t.component('Authenticator', Xf),
    t.component('RenderInfo', el),
    t.component('SignInPasswordControl', nt),
    t.component('SignUpPasswordControl', ks),
    t.component('UserNameAlias', Is),
    t.component('ForceNewPassword', Gf);
};
export {
  Xf as Authenticator,
  Ts as FederatedSignIn,
  Gf as ForceNewPassword,
  el as RenderInfo,
  Bs as SignIn,
  Us as SignUp,
  ks as SignUpPasswordControl,
  Is as UserNameAlias,
};
