!(function (t, n) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = n())
    : 'function' == typeof define && define.amd
    ? define('aws_amplify_ui', [], n)
    : 'object' == typeof exports
    ? (exports.aws_amplify_ui = n())
    : (t.aws_amplify_ui = n());
})(this, function () {
  return (function (t) {
    var n = {};
    function _(o) {
      if (n[o]) return n[o].exports;
      var e = (n[o] = { i: o, l: !1, exports: {} });
      return t[o].call(e.exports, e, e.exports, _), (e.l = !0), e.exports;
    }
    return (
      (_.m = t),
      (_.c = n),
      (_.d = function (t, n, o) {
        _.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: o });
      }),
      (_.r = function (t) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 });
      }),
      (_.t = function (t, n) {
        if ((1 & n && (t = _(t)), 8 & n)) return t;
        if (4 & n && 'object' == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (
          (_.r(o),
          Object.defineProperty(o, 'default', { enumerable: !0, value: t }),
          2 & n && 'string' != typeof t)
        )
          for (var e in t)
            _.d(
              o,
              e,
              function (n) {
                return t[n];
              }.bind(null, e)
            );
        return o;
      }),
      (_.n = function (t) {
        var n =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return _.d(n, 'a', n), n;
      }),
      (_.o = function (t, n) {
        return Object.prototype.hasOwnProperty.call(t, n);
      }),
      (_.p = ''),
      _((_.s = 0))
    );
  })([
    function (t, n, _) {
      'use strict';
      var o =
          (this && this.__createBinding) ||
          (Object.create
            ? function (t, n, _, o) {
                void 0 === o && (o = _),
                  Object.defineProperty(t, o, {
                    enumerable: !0,
                    get: function () {
                      return n[_];
                    },
                  });
              }
            : function (t, n, _, o) {
                void 0 === o && (o = _), (t[o] = n[_]);
              }),
        e =
          (this && this.__exportStar) ||
          function (t, n) {
            for (var _ in t)
              'default' === _ ||
                Object.prototype.hasOwnProperty.call(n, _) ||
                o(n, t, _);
          };
      Object.defineProperty(n, '__esModule', { value: !0 }),
        e(_(1), n),
        e(_(2), n),
        e(_(3), n),
        e(_(4), n),
        e(_(5), n),
        e(_(6), n),
        e(_(7), n),
        e(_(8), n),
        e(_(9), n),
        e(_(10), n),
        e(_(11), n),
        e(_(12), n),
        e(_(13), n);
    },
    function (t, n, _) {
      t.exports = { a: 'Anchor__a___1_Iz8' };
    },
    function (t, n, _) {
      t.exports = {
        button: 'Button__button___vS7Mv',
        signInButton: 'Button__signInButton___3bUH-',
        googleSignInButton: 'Button__googleSignInButton___1YiCu',
        signInButtonIcon: 'Button__signInButtonIcon___ihN75',
        auth0SignInButton: 'Button__auth0SignInButton___znnCj',
        facebookSignInButton: 'Button__facebookSignInButton___34Txh',
        amazonSignInButton: 'Button__amazonSignInButton___2EMtl',
        oAuthSignInButton: 'Button__oAuthSignInButton___3UGOl',
        signInButtonContent: 'Button__signInButtonContent___xqTXJ',
      };
    },
    function (t, n, _) {
      t.exports = {
        formContainer: 'Form__formContainer___1GA3x',
        formSection: 'Form__formSection___1PPvW',
        formField: 'Form__formField___38Ikl',
        formRow: 'Form__formRow___2mwRs',
      };
    },
    function (t, n, _) {
      t.exports = { hint: 'Hint__hint___2XngB' };
    },
    function (t, n, _) {
      t.exports = {
        input: 'Input__input___3e_bf',
        inputLabel: 'Input__inputLabel___3VF0S',
        label: 'Input__label___23sO8',
        radio: 'Input__radio___2hllK',
      };
    },
    function (t, n, _) {
      t.exports = {
        navBar: 'Nav__navBar___xtCFA',
        navRight: 'Nav__navRight___1QG2J',
        nav: 'Nav__nav___2Dx2Y',
        navItem: 'Nav__navItem___1LtFQ',
      };
    },
    function (t, n, _) {
      t.exports = {
        photoPickerButton: 'PhotoPicker__photoPickerButton___2XdVn',
        photoPlaceholder: 'PhotoPicker__photoPlaceholder___2JXO4',
        photoPlaceholderIcon: 'PhotoPicker__photoPlaceholderIcon___3Et71',
      };
    },
    function (t, n, _) {
      t.exports = {
        container: 'Section__container___3YYTG',
        actionRow: 'Section__actionRow___2LWSU',
        sectionHeader: 'Section__sectionHeader___2djyg',
        sectionHeaderHint: 'Section__sectionHeaderHint___3Wxdc',
        sectionBody: 'Section__sectionBody___ihqqd',
        sectionHeaderContent: 'Section__sectionHeaderContent___1UCqa',
        sectionFooter: 'Section__sectionFooter___1T54C',
        sectionFooterPrimaryContent:
          'Section__sectionFooterPrimaryContent___2r9ZX',
        sectionFooterSecondaryContent:
          'Section__sectionFooterSecondaryContent___Nj41Q',
      };
    },
    function (t, n, _) {
      t.exports = { selectInput: 'SelectInput__selectInput___3efO4' };
    },
    function (t, n, _) {
      t.exports = {
        strike: 'Strike__strike___1XV1b',
        strikeContent: 'Strike__strikeContent___10gLb',
      };
    },
    function (t, n, _) {
      t.exports = {
        toast: 'Toast__toast___XXr3v',
        toastClose: 'Toast__toastClose___18lU4',
      };
    },
    function (t, n, _) {
      t.exports = { totpQrcode: 'Totp__totpQrcode___1crLx' };
    },
    function (t, n, _) {
      t.exports = {
        sumerianSceneContainer: 'XR__sumerianSceneContainer___3nVMt',
        sumerianScene: 'XR__sumerianScene___2Tt7-',
        loadingOverlay: 'XR__loadingOverlay___IbqcI',
        loadingContainer: 'XR__loadingContainer___2Itxb',
        loadingLogo: 'XR__loadingLogo___Ub7xQ',
        loadingSceneName: 'XR__loadingSceneName___3__ne',
        loadingBar: 'XR__loadingBar___2vcke',
        loadingBarFill: 'XR__loadingBarFill___3M-D9',
        sceneErrorText: 'XR__sceneErrorText___2y0tp',
        sceneBar: 'XR__sceneBar___2ShrP',
        sceneName: 'XR__sceneName___1ApHr',
        sceneActions: 'XR__sceneActions___7plGs',
        actionButton: 'XR__actionButton___2poIM',
        tooltip: 'XR__tooltip___UYyhn',
        actionIcon: 'XR__actionIcon___2qnd2',
        autoShowTooltip: 'XR__autoShowTooltip___V1QH7',
      };
    },
  ]);
});
//# sourceMappingURL=aws-amplify-ui.js.map
