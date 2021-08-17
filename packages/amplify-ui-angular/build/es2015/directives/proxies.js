import { __decorate } from 'tslib';
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import * as i0 from '@angular/core';
const _c0 = ['*'];
/** @type {?} */
export const proxyInputs =
  /**
   * @param {?} Cmp
   * @param {?} inputs
   * @return {?}
   */
  (Cmp, inputs) => {
    /** @type {?} */
    const Prototype = Cmp.prototype;
    inputs.forEach(
      /**
       * @param {?} item
       * @return {?}
       */
      (item) => {
        Object.defineProperty(Prototype, item, {
          /**
           * @return {?}
           */
          get() {
            return this.el[item];
          },
          /**
           * @param {?} val
           * @return {?}
           */
          set(val) {
            this.z.runOutsideAngular(
              /**
               * @return {?}
               */
              () => (this.el[item] = val)
            );
          },
        });
      }
    );
  };
/** @type {?} */
export const proxyMethods =
  /**
   * @param {?} Cmp
   * @param {?} methods
   * @return {?}
   */
  (Cmp, methods) => {
    /** @type {?} */
    const Prototype = Cmp.prototype;
    methods.forEach(
      /**
       * @param {?} methodName
       * @return {?}
       */
      (methodName) => {
        Prototype[methodName] =
          /**
           * @return {?}
           */
          function () {
            /** @type {?} */
            const args = arguments;
            return this.z.runOutsideAngular(
              /**
               * @return {?}
               */
              () => this.el[methodName].apply(this.el, args)
            );
          };
      }
    );
  };
/** @type {?} */
export const proxyOutputs =
  /**
   * @param {?} instance
   * @param {?} el
   * @param {?} events
   * @return {?}
   */
  (instance, el, events) => {
    events.forEach(
      /**
       * @param {?} eventName
       * @return {?}
       */
      (eventName) => (instance[eventName] = fromEvent(el, eventName))
    );
  };
// tslint:disable-next-line: only-arrow-functions
// tslint:disable-next-line: only-arrow-functions
/**
 * @param {?} opts
 * @return {?}
 */
export function ProxyCmp(opts) {
  /** @type {?} */
  const decorator =
    /**
     * @param {?} cls
     * @return {?}
     */
    function (cls) {
      if (opts.inputs) {
        proxyInputs(cls, opts.inputs);
      }
      if (opts.methods) {
        proxyMethods(cls, opts.methods);
      }
      return cls;
    };
  return decorator;
}
let AmplifyAmazonButton = class AmplifyAmazonButton {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyAmazonButton.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-amazon-button',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['clientId', 'handleAuthStateChange'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyAmazonButton.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyAmazonButton.ɵfac =
  function AmplifyAmazonButton_Factory(t) {
    return new (t || AmplifyAmazonButton)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyAmazonButton.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyAmazonButton,
  selectors: [['amplify-amazon-button']],
  inputs: {
    clientId: 'clientId',
    handleAuthStateChange: 'handleAuthStateChange',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyAmazonButton_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyAmazonButton = __decorate(
  [ProxyCmp({ inputs: ['clientId', 'handleAuthStateChange'] })],
  AmplifyAmazonButton
);
export { AmplifyAmazonButton };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyAmazonButton,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-amazon-button',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['clientId', 'handleAuthStateChange'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyAmazonButton.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyAmazonButton.prototype.z;
}
export class AmplifyAuthContainer {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}
AmplifyAuthContainer.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-auth-container',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
      },
    ],
  },
];
/** @nocollapse */
AmplifyAuthContainer.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyAuthContainer.ɵfac =
  function AmplifyAuthContainer_Factory(t) {
    return new (t || AmplifyAuthContainer)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyAuthContainer.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyAuthContainer,
  selectors: [['amplify-auth-container']],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyAuthContainer_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyAuthContainer,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-auth-container',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyAuthContainer.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyAuthContainer.prototype.z;
}
let AmplifyAuthFields = class AmplifyAuthFields {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyAuthFields.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-auth-fields',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['formFields'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyAuthFields.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyAuthFields.ɵfac = function AmplifyAuthFields_Factory(
  t
) {
  return new (t || AmplifyAuthFields)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyAuthFields.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyAuthFields,
  selectors: [['amplify-auth-fields']],
  inputs: { formFields: 'formFields' },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyAuthFields_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyAuthFields = __decorate(
  [ProxyCmp({ inputs: ['formFields'] })],
  AmplifyAuthFields
);
export { AmplifyAuthFields };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyAuthFields,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-auth-fields',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['formFields'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyAuthFields.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyAuthFields.prototype.z;
}
let AmplifyAuth0Button = class AmplifyAuth0Button {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyAuth0Button.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-auth0-button',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['config', 'handleAuthStateChange'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyAuth0Button.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyAuth0Button.ɵfac =
  function AmplifyAuth0Button_Factory(t) {
    return new (t || AmplifyAuth0Button)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyAuth0Button.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyAuth0Button,
  selectors: [['amplify-auth0-button']],
  inputs: { config: 'config', handleAuthStateChange: 'handleAuthStateChange' },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyAuth0Button_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyAuth0Button = __decorate(
  [ProxyCmp({ inputs: ['config', 'handleAuthStateChange'] })],
  AmplifyAuth0Button
);
export { AmplifyAuth0Button };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyAuth0Button,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-auth0-button',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['config', 'handleAuthStateChange'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyAuth0Button.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyAuth0Button.prototype.z;
}
let AmplifyAuthenticator = class AmplifyAuthenticator {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyAuthenticator.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-authenticator',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'federated',
          'handleAuthStateChange',
          'hideToast',
          'initialAuthState',
          'usernameAlias',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyAuthenticator.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyAuthenticator.ɵfac =
  function AmplifyAuthenticator_Factory(t) {
    return new (t || AmplifyAuthenticator)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyAuthenticator.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyAuthenticator,
  selectors: [['amplify-authenticator']],
  inputs: {
    federated: 'federated',
    handleAuthStateChange: 'handleAuthStateChange',
    hideToast: 'hideToast',
    initialAuthState: 'initialAuthState',
    usernameAlias: 'usernameAlias',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyAuthenticator_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyAuthenticator = __decorate(
  [
    ProxyCmp({
      inputs: [
        'federated',
        'handleAuthStateChange',
        'hideToast',
        'initialAuthState',
        'usernameAlias',
      ],
    }),
  ],
  AmplifyAuthenticator
);
export { AmplifyAuthenticator };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyAuthenticator,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-authenticator',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'federated',
              'handleAuthStateChange',
              'hideToast',
              'initialAuthState',
              'usernameAlias',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyAuthenticator.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyAuthenticator.prototype.z;
}
let AmplifyButton = class AmplifyButton {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyButton.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-button',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['disabled', 'handleButtonClick', 'icon', 'type', 'variant'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyButton.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyButton.ɵfac = function AmplifyButton_Factory(t) {
  return new (t || AmplifyButton)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyButton.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyButton,
  selectors: [['amplify-button']],
  inputs: {
    disabled: 'disabled',
    handleButtonClick: 'handleButtonClick',
    icon: 'icon',
    type: 'type',
    variant: 'variant',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyButton_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyButton = __decorate(
  [
    ProxyCmp({
      inputs: ['disabled', 'handleButtonClick', 'icon', 'type', 'variant'],
    }),
  ],
  AmplifyButton
);
export { AmplifyButton };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyButton,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-button',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'disabled',
              'handleButtonClick',
              'icon',
              'type',
              'variant',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyButton.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyButton.prototype.z;
}
let AmplifyChatbot = class AmplifyChatbot {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['chatCompleted']);
  }
};
AmplifyChatbot.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-chatbot',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'botName',
          'botTitle',
          'clearOnComplete',
          'conversationModeOn',
          'silenceThreshold',
          'silenceTime',
          'textEnabled',
          'voiceEnabled',
          'welcomeMessage',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyChatbot.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyChatbot.ɵfac = function AmplifyChatbot_Factory(t) {
  return new (t || AmplifyChatbot)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyChatbot.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyChatbot,
  selectors: [['amplify-chatbot']],
  inputs: {
    botName: 'botName',
    botTitle: 'botTitle',
    clearOnComplete: 'clearOnComplete',
    conversationModeOn: 'conversationModeOn',
    silenceThreshold: 'silenceThreshold',
    silenceTime: 'silenceTime',
    textEnabled: 'textEnabled',
    voiceEnabled: 'voiceEnabled',
    welcomeMessage: 'welcomeMessage',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyChatbot_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyChatbot = __decorate(
  [
    ProxyCmp({
      inputs: [
        'botName',
        'botTitle',
        'clearOnComplete',
        'conversationModeOn',
        'silenceThreshold',
        'silenceTime',
        'textEnabled',
        'voiceEnabled',
        'welcomeMessage',
      ],
    }),
  ],
  AmplifyChatbot
);
export { AmplifyChatbot };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyChatbot,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-chatbot',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'botName',
              'botTitle',
              'clearOnComplete',
              'conversationModeOn',
              'silenceThreshold',
              'silenceTime',
              'textEnabled',
              'voiceEnabled',
              'welcomeMessage',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /** @type {?} */
  AmplifyChatbot.prototype.chatCompleted;
  /**
   * @type {?}
   * @protected
   */
  AmplifyChatbot.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyChatbot.prototype.z;
}
let AmplifyCheckbox = class AmplifyCheckbox {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyCheckbox.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-checkbox',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['checked', 'disabled', 'fieldId', 'label', 'name', 'value'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyCheckbox.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyCheckbox.ɵfac = function AmplifyCheckbox_Factory(t) {
  return new (t || AmplifyCheckbox)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyCheckbox.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyCheckbox,
  selectors: [['amplify-checkbox']],
  inputs: {
    checked: 'checked',
    disabled: 'disabled',
    fieldId: 'fieldId',
    label: 'label',
    name: 'name',
    value: 'value',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyCheckbox_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyCheckbox = __decorate(
  [
    ProxyCmp({
      inputs: ['checked', 'disabled', 'fieldId', 'label', 'name', 'value'],
    }),
  ],
  AmplifyCheckbox
);
export { AmplifyCheckbox };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyCheckbox,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-checkbox',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'checked',
              'disabled',
              'fieldId',
              'label',
              'name',
              'value',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyCheckbox.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyCheckbox.prototype.z;
}
let AmplifyCodeField = class AmplifyCodeField {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyCodeField.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-code-field',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'disabled',
          'fieldId',
          'handleInputChange',
          'hint',
          'inputProps',
          'label',
          'placeholder',
          'required',
          'value',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyCodeField.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyCodeField.ɵfac = function AmplifyCodeField_Factory(
  t
) {
  return new (t || AmplifyCodeField)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyCodeField.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyCodeField,
  selectors: [['amplify-code-field']],
  inputs: {
    disabled: 'disabled',
    fieldId: 'fieldId',
    handleInputChange: 'handleInputChange',
    hint: 'hint',
    inputProps: 'inputProps',
    label: 'label',
    placeholder: 'placeholder',
    required: 'required',
    value: 'value',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyCodeField_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyCodeField = __decorate(
  [
    ProxyCmp({
      inputs: [
        'disabled',
        'fieldId',
        'handleInputChange',
        'hint',
        'inputProps',
        'label',
        'placeholder',
        'required',
        'value',
      ],
    }),
  ],
  AmplifyCodeField
);
export { AmplifyCodeField };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyCodeField,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-code-field',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'disabled',
              'fieldId',
              'handleInputChange',
              'hint',
              'inputProps',
              'label',
              'placeholder',
              'required',
              'value',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyCodeField.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyCodeField.prototype.z;
}
let AmplifyConfirmSignIn = class AmplifyConfirmSignIn {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyConfirmSignIn.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-confirm-sign-in',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'formFields',
          'handleAuthStateChange',
          'handleSubmit',
          'headerText',
          'submitButtonText',
          'user',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyConfirmSignIn.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyConfirmSignIn.ɵfac =
  function AmplifyConfirmSignIn_Factory(t) {
    return new (t || AmplifyConfirmSignIn)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyConfirmSignIn.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyConfirmSignIn,
  selectors: [['amplify-confirm-sign-in']],
  inputs: {
    formFields: 'formFields',
    handleAuthStateChange: 'handleAuthStateChange',
    handleSubmit: 'handleSubmit',
    headerText: 'headerText',
    submitButtonText: 'submitButtonText',
    user: 'user',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyConfirmSignIn_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyConfirmSignIn = __decorate(
  [
    ProxyCmp({
      inputs: [
        'formFields',
        'handleAuthStateChange',
        'handleSubmit',
        'headerText',
        'submitButtonText',
        'user',
      ],
    }),
  ],
  AmplifyConfirmSignIn
);
export { AmplifyConfirmSignIn };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyConfirmSignIn,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-confirm-sign-in',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'formFields',
              'handleAuthStateChange',
              'handleSubmit',
              'headerText',
              'submitButtonText',
              'user',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyConfirmSignIn.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyConfirmSignIn.prototype.z;
}
let AmplifyConfirmSignUp = class AmplifyConfirmSignUp {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyConfirmSignUp.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-confirm-sign-up',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'formFields',
          'handleAuthStateChange',
          'handleSubmit',
          'headerText',
          'submitButtonText',
          'user',
          'usernameAlias',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyConfirmSignUp.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyConfirmSignUp.ɵfac =
  function AmplifyConfirmSignUp_Factory(t) {
    return new (t || AmplifyConfirmSignUp)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyConfirmSignUp.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyConfirmSignUp,
  selectors: [['amplify-confirm-sign-up']],
  inputs: {
    formFields: 'formFields',
    handleAuthStateChange: 'handleAuthStateChange',
    handleSubmit: 'handleSubmit',
    headerText: 'headerText',
    submitButtonText: 'submitButtonText',
    user: 'user',
    usernameAlias: 'usernameAlias',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyConfirmSignUp_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyConfirmSignUp = __decorate(
  [
    ProxyCmp({
      inputs: [
        'formFields',
        'handleAuthStateChange',
        'handleSubmit',
        'headerText',
        'submitButtonText',
        'user',
        'usernameAlias',
      ],
    }),
  ],
  AmplifyConfirmSignUp
);
export { AmplifyConfirmSignUp };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyConfirmSignUp,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-confirm-sign-up',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'formFields',
              'handleAuthStateChange',
              'handleSubmit',
              'headerText',
              'submitButtonText',
              'user',
              'usernameAlias',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyConfirmSignUp.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyConfirmSignUp.prototype.z;
}
export class AmplifyContainer {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}
AmplifyContainer.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-container',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
      },
    ],
  },
];
/** @nocollapse */
AmplifyContainer.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyContainer.ɵfac = function AmplifyContainer_Factory(
  t
) {
  return new (t || AmplifyContainer)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyContainer.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyContainer,
  selectors: [['amplify-container']],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyContainer_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyContainer,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-container',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyContainer.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyContainer.prototype.z;
}
let AmplifyCountryDialCode = class AmplifyCountryDialCode {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyCountryDialCode.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-country-dial-code',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['dialCode', 'fieldId', 'handleInputChange', 'options'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyCountryDialCode.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyCountryDialCode.ɵfac =
  function AmplifyCountryDialCode_Factory(t) {
    return new (t || AmplifyCountryDialCode)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyCountryDialCode.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyCountryDialCode,
  selectors: [['amplify-country-dial-code']],
  inputs: {
    dialCode: 'dialCode',
    fieldId: 'fieldId',
    handleInputChange: 'handleInputChange',
    options: 'options',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyCountryDialCode_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyCountryDialCode = __decorate(
  [
    ProxyCmp({
      inputs: ['dialCode', 'fieldId', 'handleInputChange', 'options'],
    }),
  ],
  AmplifyCountryDialCode
);
export { AmplifyCountryDialCode };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyCountryDialCode,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-country-dial-code',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['dialCode', 'fieldId', 'handleInputChange', 'options'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyCountryDialCode.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyCountryDialCode.prototype.z;
}
let AmplifyEmailField = class AmplifyEmailField {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyEmailField.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-email-field',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'disabled',
          'fieldId',
          'handleInputChange',
          'hint',
          'inputProps',
          'label',
          'placeholder',
          'required',
          'value',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyEmailField.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyEmailField.ɵfac = function AmplifyEmailField_Factory(
  t
) {
  return new (t || AmplifyEmailField)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyEmailField.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyEmailField,
  selectors: [['amplify-email-field']],
  inputs: {
    disabled: 'disabled',
    fieldId: 'fieldId',
    handleInputChange: 'handleInputChange',
    hint: 'hint',
    inputProps: 'inputProps',
    label: 'label',
    placeholder: 'placeholder',
    required: 'required',
    value: 'value',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyEmailField_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyEmailField = __decorate(
  [
    ProxyCmp({
      inputs: [
        'disabled',
        'fieldId',
        'handleInputChange',
        'hint',
        'inputProps',
        'label',
        'placeholder',
        'required',
        'value',
      ],
    }),
  ],
  AmplifyEmailField
);
export { AmplifyEmailField };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyEmailField,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-email-field',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'disabled',
              'fieldId',
              'handleInputChange',
              'hint',
              'inputProps',
              'label',
              'placeholder',
              'required',
              'value',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyEmailField.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyEmailField.prototype.z;
}
let AmplifyFacebookButton = class AmplifyFacebookButton {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyFacebookButton.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-facebook-button',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['appId', 'handleAuthStateChange'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyFacebookButton.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyFacebookButton.ɵfac =
  function AmplifyFacebookButton_Factory(t) {
    return new (t || AmplifyFacebookButton)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyFacebookButton.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyFacebookButton,
  selectors: [['amplify-facebook-button']],
  inputs: { appId: 'appId', handleAuthStateChange: 'handleAuthStateChange' },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyFacebookButton_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyFacebookButton = __decorate(
  [ProxyCmp({ inputs: ['appId', 'handleAuthStateChange'] })],
  AmplifyFacebookButton
);
export { AmplifyFacebookButton };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyFacebookButton,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-facebook-button',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['appId', 'handleAuthStateChange'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyFacebookButton.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyFacebookButton.prototype.z;
}
let AmplifyFederatedButtons = class AmplifyFederatedButtons {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyFederatedButtons.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-federated-buttons',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['authState', 'federated', 'handleAuthStateChange'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyFederatedButtons.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyFederatedButtons.ɵfac =
  function AmplifyFederatedButtons_Factory(t) {
    return new (t || AmplifyFederatedButtons)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyFederatedButtons.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyFederatedButtons,
  selectors: [['amplify-federated-buttons']],
  inputs: {
    authState: 'authState',
    federated: 'federated',
    handleAuthStateChange: 'handleAuthStateChange',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyFederatedButtons_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyFederatedButtons = __decorate(
  [ProxyCmp({ inputs: ['authState', 'federated', 'handleAuthStateChange'] })],
  AmplifyFederatedButtons
);
export { AmplifyFederatedButtons };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyFederatedButtons,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-federated-buttons',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['authState', 'federated', 'handleAuthStateChange'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyFederatedButtons.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyFederatedButtons.prototype.z;
}
let AmplifyFederatedSignIn = class AmplifyFederatedSignIn {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyFederatedSignIn.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-federated-sign-in',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['authState', 'federated'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyFederatedSignIn.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyFederatedSignIn.ɵfac =
  function AmplifyFederatedSignIn_Factory(t) {
    return new (t || AmplifyFederatedSignIn)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyFederatedSignIn.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyFederatedSignIn,
  selectors: [['amplify-federated-sign-in']],
  inputs: { authState: 'authState', federated: 'federated' },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyFederatedSignIn_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyFederatedSignIn = __decorate(
  [ProxyCmp({ inputs: ['authState', 'federated'] })],
  AmplifyFederatedSignIn
);
export { AmplifyFederatedSignIn };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyFederatedSignIn,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-federated-sign-in',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['authState', 'federated'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyFederatedSignIn.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyFederatedSignIn.prototype.z;
}
let AmplifyForgotPassword = class AmplifyForgotPassword {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyForgotPassword.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-forgot-password',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'formFields',
          'handleAuthStateChange',
          'handleSend',
          'handleSubmit',
          'headerText',
          'sendButtonText',
          'submitButtonText',
          'usernameAlias',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyForgotPassword.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyForgotPassword.ɵfac =
  function AmplifyForgotPassword_Factory(t) {
    return new (t || AmplifyForgotPassword)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyForgotPassword.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyForgotPassword,
  selectors: [['amplify-forgot-password']],
  inputs: {
    formFields: 'formFields',
    handleAuthStateChange: 'handleAuthStateChange',
    handleSend: 'handleSend',
    handleSubmit: 'handleSubmit',
    headerText: 'headerText',
    sendButtonText: 'sendButtonText',
    submitButtonText: 'submitButtonText',
    usernameAlias: 'usernameAlias',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyForgotPassword_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyForgotPassword = __decorate(
  [
    ProxyCmp({
      inputs: [
        'formFields',
        'handleAuthStateChange',
        'handleSend',
        'handleSubmit',
        'headerText',
        'sendButtonText',
        'submitButtonText',
        'usernameAlias',
      ],
    }),
  ],
  AmplifyForgotPassword
);
export { AmplifyForgotPassword };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyForgotPassword,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-forgot-password',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'formFields',
              'handleAuthStateChange',
              'handleSend',
              'handleSubmit',
              'headerText',
              'sendButtonText',
              'submitButtonText',
              'usernameAlias',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyForgotPassword.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyForgotPassword.prototype.z;
}
let AmplifyFormField = class AmplifyFormField {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyFormField.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-form-field',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'description',
          'disabled',
          'fieldId',
          'handleInputChange',
          'hint',
          'inputProps',
          'label',
          'name',
          'placeholder',
          'required',
          'type',
          'value',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyFormField.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyFormField.ɵfac = function AmplifyFormField_Factory(
  t
) {
  return new (t || AmplifyFormField)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyFormField.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyFormField,
  selectors: [['amplify-form-field']],
  inputs: {
    description: 'description',
    disabled: 'disabled',
    fieldId: 'fieldId',
    handleInputChange: 'handleInputChange',
    hint: 'hint',
    inputProps: 'inputProps',
    label: 'label',
    name: 'name',
    placeholder: 'placeholder',
    required: 'required',
    type: 'type',
    value: 'value',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyFormField_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyFormField = __decorate(
  [
    ProxyCmp({
      inputs: [
        'description',
        'disabled',
        'fieldId',
        'handleInputChange',
        'hint',
        'inputProps',
        'label',
        'name',
        'placeholder',
        'required',
        'type',
        'value',
      ],
    }),
  ],
  AmplifyFormField
);
export { AmplifyFormField };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyFormField,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-form-field',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'description',
              'disabled',
              'fieldId',
              'handleInputChange',
              'hint',
              'inputProps',
              'label',
              'name',
              'placeholder',
              'required',
              'type',
              'value',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyFormField.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyFormField.prototype.z;
}
let AmplifyFormSection = class AmplifyFormSection {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyFormSection.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-form-section',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'handleSubmit',
          'headerText',
          'loading',
          'secondaryFooterContent',
          'submitButtonText',
          'testDataPrefix',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyFormSection.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyFormSection.ɵfac =
  function AmplifyFormSection_Factory(t) {
    return new (t || AmplifyFormSection)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyFormSection.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyFormSection,
  selectors: [['amplify-form-section']],
  inputs: {
    handleSubmit: 'handleSubmit',
    headerText: 'headerText',
    loading: 'loading',
    secondaryFooterContent: 'secondaryFooterContent',
    submitButtonText: 'submitButtonText',
    testDataPrefix: 'testDataPrefix',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyFormSection_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyFormSection = __decorate(
  [
    ProxyCmp({
      inputs: [
        'handleSubmit',
        'headerText',
        'loading',
        'secondaryFooterContent',
        'submitButtonText',
        'testDataPrefix',
      ],
    }),
  ],
  AmplifyFormSection
);
export { AmplifyFormSection };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyFormSection,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-form-section',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'handleSubmit',
              'headerText',
              'loading',
              'secondaryFooterContent',
              'submitButtonText',
              'testDataPrefix',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyFormSection.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyFormSection.prototype.z;
}
let AmplifyGoogleButton = class AmplifyGoogleButton {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyGoogleButton.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-google-button',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['clientId', 'handleAuthStateChange'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyGoogleButton.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyGoogleButton.ɵfac =
  function AmplifyGoogleButton_Factory(t) {
    return new (t || AmplifyGoogleButton)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyGoogleButton.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyGoogleButton,
  selectors: [['amplify-google-button']],
  inputs: {
    clientId: 'clientId',
    handleAuthStateChange: 'handleAuthStateChange',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyGoogleButton_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyGoogleButton = __decorate(
  [ProxyCmp({ inputs: ['clientId', 'handleAuthStateChange'] })],
  AmplifyGoogleButton
);
export { AmplifyGoogleButton };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyGoogleButton,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-google-button',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['clientId', 'handleAuthStateChange'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyGoogleButton.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyGoogleButton.prototype.z;
}
let AmplifyGreetings = class AmplifyGreetings {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyGreetings.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-greetings',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['handleAuthStateChange', 'logo', 'username'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyGreetings.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyGreetings.ɵfac = function AmplifyGreetings_Factory(
  t
) {
  return new (t || AmplifyGreetings)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyGreetings.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyGreetings,
  selectors: [['amplify-greetings']],
  inputs: {
    handleAuthStateChange: 'handleAuthStateChange',
    logo: 'logo',
    username: 'username',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyGreetings_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyGreetings = __decorate(
  [ProxyCmp({ inputs: ['handleAuthStateChange', 'logo', 'username'] })],
  AmplifyGreetings
);
export { AmplifyGreetings };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyGreetings,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-greetings',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['handleAuthStateChange', 'logo', 'username'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyGreetings.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyGreetings.prototype.z;
}
export class AmplifyHint {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}
AmplifyHint.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-hint',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
      },
    ],
  },
];
/** @nocollapse */
AmplifyHint.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyHint.ɵfac = function AmplifyHint_Factory(t) {
  return new (t || AmplifyHint)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyHint.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyHint,
  selectors: [['amplify-hint']],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyHint_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyHint,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-hint',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyHint.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyHint.prototype.z;
}
let AmplifyIcon = class AmplifyIcon {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyIcon.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-icon',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['name'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyIcon.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyIcon.ɵfac = function AmplifyIcon_Factory(t) {
  return new (t || AmplifyIcon)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyIcon.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyIcon,
  selectors: [['amplify-icon']],
  inputs: { name: 'name' },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyIcon_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyIcon = __decorate([ProxyCmp({ inputs: ['name'] })], AmplifyIcon);
export { AmplifyIcon };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyIcon,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-icon',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['name'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyIcon.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyIcon.prototype.z;
}
let AmplifyIconButton = class AmplifyIconButton {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyIconButton.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-icon-button',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['autoShowTooltip', 'name', 'tooltip'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyIconButton.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyIconButton.ɵfac = function AmplifyIconButton_Factory(
  t
) {
  return new (t || AmplifyIconButton)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyIconButton.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyIconButton,
  selectors: [['amplify-icon-button']],
  inputs: {
    autoShowTooltip: 'autoShowTooltip',
    name: 'name',
    tooltip: 'tooltip',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyIconButton_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyIconButton = __decorate(
  [ProxyCmp({ inputs: ['autoShowTooltip', 'name', 'tooltip'] })],
  AmplifyIconButton
);
export { AmplifyIconButton };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyIconButton,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-icon-button',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['autoShowTooltip', 'name', 'tooltip'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyIconButton.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyIconButton.prototype.z;
}
let AmplifyInput = class AmplifyInput {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyInput.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-input',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'description',
          'disabled',
          'fieldId',
          'handleInputChange',
          'inputProps',
          'name',
          'placeholder',
          'required',
          'type',
          'value',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyInput.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyInput.ɵfac = function AmplifyInput_Factory(t) {
  return new (t || AmplifyInput)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyInput.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyInput,
  selectors: [['amplify-input']],
  inputs: {
    description: 'description',
    disabled: 'disabled',
    fieldId: 'fieldId',
    handleInputChange: 'handleInputChange',
    inputProps: 'inputProps',
    name: 'name',
    placeholder: 'placeholder',
    required: 'required',
    type: 'type',
    value: 'value',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyInput_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyInput = __decorate(
  [
    ProxyCmp({
      inputs: [
        'description',
        'disabled',
        'fieldId',
        'handleInputChange',
        'inputProps',
        'name',
        'placeholder',
        'required',
        'type',
        'value',
      ],
    }),
  ],
  AmplifyInput
);
export { AmplifyInput };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyInput,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-input',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'description',
              'disabled',
              'fieldId',
              'handleInputChange',
              'inputProps',
              'name',
              'placeholder',
              'required',
              'type',
              'value',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyInput.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyInput.prototype.z;
}
let AmplifyLabel = class AmplifyLabel {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyLabel.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-label',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['htmlFor'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyLabel.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyLabel.ɵfac = function AmplifyLabel_Factory(t) {
  return new (t || AmplifyLabel)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyLabel.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyLabel,
  selectors: [['amplify-label']],
  inputs: { htmlFor: 'htmlFor' },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyLabel_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyLabel = __decorate([ProxyCmp({ inputs: ['htmlFor'] })], AmplifyLabel);
export { AmplifyLabel };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyLabel,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-label',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['htmlFor'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyLabel.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyLabel.prototype.z;
}
let AmplifyLink = class AmplifyLink {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyLink.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-link',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['role'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyLink.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyLink.ɵfac = function AmplifyLink_Factory(t) {
  return new (t || AmplifyLink)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyLink.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyLink,
  selectors: [['amplify-link']],
  inputs: { role: 'role' },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyLink_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyLink = __decorate([ProxyCmp({ inputs: ['role'] })], AmplifyLink);
export { AmplifyLink };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyLink,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-link',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['role'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyLink.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyLink.prototype.z;
}
export class AmplifyLoadingSpinner {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}
AmplifyLoadingSpinner.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-loading-spinner',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
      },
    ],
  },
];
/** @nocollapse */
AmplifyLoadingSpinner.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyLoadingSpinner.ɵfac =
  function AmplifyLoadingSpinner_Factory(t) {
    return new (t || AmplifyLoadingSpinner)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyLoadingSpinner.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyLoadingSpinner,
  selectors: [['amplify-loading-spinner']],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyLoadingSpinner_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyLoadingSpinner,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-loading-spinner',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyLoadingSpinner.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyLoadingSpinner.prototype.z;
}
export class AmplifyNav {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}
AmplifyNav.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-nav',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
      },
    ],
  },
];
/** @nocollapse */
AmplifyNav.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyNav.ɵfac = function AmplifyNav_Factory(t) {
  return new (t || AmplifyNav)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyNav.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyNav,
  selectors: [['amplify-nav']],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyNav_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyNav,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-nav',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyNav.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyNav.prototype.z;
}
let AmplifyOauthButton = class AmplifyOauthButton {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyOauthButton.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-oauth-button',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['config'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyOauthButton.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyOauthButton.ɵfac =
  function AmplifyOauthButton_Factory(t) {
    return new (t || AmplifyOauthButton)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyOauthButton.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyOauthButton,
  selectors: [['amplify-oauth-button']],
  inputs: { config: 'config' },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyOauthButton_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyOauthButton = __decorate(
  [ProxyCmp({ inputs: ['config'] })],
  AmplifyOauthButton
);
export { AmplifyOauthButton };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyOauthButton,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-oauth-button',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['config'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyOauthButton.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyOauthButton.prototype.z;
}
let AmplifyPasswordField = class AmplifyPasswordField {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyPasswordField.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-password-field',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'disabled',
          'fieldId',
          'handleInputChange',
          'hint',
          'inputProps',
          'label',
          'placeholder',
          'required',
          'value',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyPasswordField.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyPasswordField.ɵfac =
  function AmplifyPasswordField_Factory(t) {
    return new (t || AmplifyPasswordField)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyPasswordField.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyPasswordField,
  selectors: [['amplify-password-field']],
  inputs: {
    disabled: 'disabled',
    fieldId: 'fieldId',
    handleInputChange: 'handleInputChange',
    hint: 'hint',
    inputProps: 'inputProps',
    label: 'label',
    placeholder: 'placeholder',
    required: 'required',
    value: 'value',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyPasswordField_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyPasswordField = __decorate(
  [
    ProxyCmp({
      inputs: [
        'disabled',
        'fieldId',
        'handleInputChange',
        'hint',
        'inputProps',
        'label',
        'placeholder',
        'required',
        'value',
      ],
    }),
  ],
  AmplifyPasswordField
);
export { AmplifyPasswordField };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyPasswordField,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-password-field',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'disabled',
              'fieldId',
              'handleInputChange',
              'hint',
              'inputProps',
              'label',
              'placeholder',
              'required',
              'value',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyPasswordField.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyPasswordField.prototype.z;
}
let AmplifyPhoneField = class AmplifyPhoneField {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyPhoneField.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-phone-field',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'dialCode',
          'disabled',
          'fieldId',
          'handleInputChange',
          'hint',
          'inputProps',
          'label',
          'placeholder',
          'required',
          'value',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyPhoneField.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyPhoneField.ɵfac = function AmplifyPhoneField_Factory(
  t
) {
  return new (t || AmplifyPhoneField)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyPhoneField.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyPhoneField,
  selectors: [['amplify-phone-field']],
  inputs: {
    dialCode: 'dialCode',
    disabled: 'disabled',
    fieldId: 'fieldId',
    handleInputChange: 'handleInputChange',
    hint: 'hint',
    inputProps: 'inputProps',
    label: 'label',
    placeholder: 'placeholder',
    required: 'required',
    value: 'value',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyPhoneField_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyPhoneField = __decorate(
  [
    ProxyCmp({
      inputs: [
        'dialCode',
        'disabled',
        'fieldId',
        'handleInputChange',
        'hint',
        'inputProps',
        'label',
        'placeholder',
        'required',
        'value',
      ],
    }),
  ],
  AmplifyPhoneField
);
export { AmplifyPhoneField };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyPhoneField,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-phone-field',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'dialCode',
              'disabled',
              'fieldId',
              'handleInputChange',
              'hint',
              'inputProps',
              'label',
              'placeholder',
              'required',
              'value',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyPhoneField.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyPhoneField.prototype.z;
}
let AmplifyPhotoPicker = class AmplifyPhotoPicker {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyPhotoPicker.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-photo-picker',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'buttonText',
          'handleClick',
          'headerHint',
          'headerTitle',
          'placeholderHint',
          'previewSrc',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyPhotoPicker.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyPhotoPicker.ɵfac =
  function AmplifyPhotoPicker_Factory(t) {
    return new (t || AmplifyPhotoPicker)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyPhotoPicker.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyPhotoPicker,
  selectors: [['amplify-photo-picker']],
  inputs: {
    buttonText: 'buttonText',
    handleClick: 'handleClick',
    headerHint: 'headerHint',
    headerTitle: 'headerTitle',
    placeholderHint: 'placeholderHint',
    previewSrc: 'previewSrc',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyPhotoPicker_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyPhotoPicker = __decorate(
  [
    ProxyCmp({
      inputs: [
        'buttonText',
        'handleClick',
        'headerHint',
        'headerTitle',
        'placeholderHint',
        'previewSrc',
      ],
    }),
  ],
  AmplifyPhotoPicker
);
export { AmplifyPhotoPicker };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyPhotoPicker,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-photo-picker',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'buttonText',
              'handleClick',
              'headerHint',
              'headerTitle',
              'placeholderHint',
              'previewSrc',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyPhotoPicker.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyPhotoPicker.prototype.z;
}
let AmplifyPicker = class AmplifyPicker {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyPicker.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-picker',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['acceptValue', 'inputHandler', 'pickerText'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyPicker.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyPicker.ɵfac = function AmplifyPicker_Factory(t) {
  return new (t || AmplifyPicker)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyPicker.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyPicker,
  selectors: [['amplify-picker']],
  inputs: {
    acceptValue: 'acceptValue',
    inputHandler: 'inputHandler',
    pickerText: 'pickerText',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyPicker_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyPicker = __decorate(
  [ProxyCmp({ inputs: ['acceptValue', 'inputHandler', 'pickerText'] })],
  AmplifyPicker
);
export { AmplifyPicker };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyPicker,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-picker',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['acceptValue', 'inputHandler', 'pickerText'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyPicker.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyPicker.prototype.z;
}
let AmplifyRadioButton = class AmplifyRadioButton {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyRadioButton.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-radio-button',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'checked',
          'disabled',
          'fieldId',
          'handleInputChange',
          'inputProps',
          'label',
          'name',
          'placeholder',
          'value',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyRadioButton.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyRadioButton.ɵfac =
  function AmplifyRadioButton_Factory(t) {
    return new (t || AmplifyRadioButton)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyRadioButton.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyRadioButton,
  selectors: [['amplify-radio-button']],
  inputs: {
    checked: 'checked',
    disabled: 'disabled',
    fieldId: 'fieldId',
    handleInputChange: 'handleInputChange',
    inputProps: 'inputProps',
    label: 'label',
    name: 'name',
    placeholder: 'placeholder',
    value: 'value',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyRadioButton_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyRadioButton = __decorate(
  [
    ProxyCmp({
      inputs: [
        'checked',
        'disabled',
        'fieldId',
        'handleInputChange',
        'inputProps',
        'label',
        'name',
        'placeholder',
        'value',
      ],
    }),
  ],
  AmplifyRadioButton
);
export { AmplifyRadioButton };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyRadioButton,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-radio-button',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'checked',
              'disabled',
              'fieldId',
              'handleInputChange',
              'inputProps',
              'label',
              'name',
              'placeholder',
              'value',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyRadioButton.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyRadioButton.prototype.z;
}
let AmplifyRequireNewPassword = class AmplifyRequireNewPassword {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyRequireNewPassword.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-require-new-password',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'formFields',
          'handleAuthStateChange',
          'handleSubmit',
          'headerText',
          'submitButtonText',
          'user',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyRequireNewPassword.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyRequireNewPassword.ɵfac =
  function AmplifyRequireNewPassword_Factory(t) {
    return new (t || AmplifyRequireNewPassword)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyRequireNewPassword.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyRequireNewPassword,
  selectors: [['amplify-require-new-password']],
  inputs: {
    formFields: 'formFields',
    handleAuthStateChange: 'handleAuthStateChange',
    handleSubmit: 'handleSubmit',
    headerText: 'headerText',
    submitButtonText: 'submitButtonText',
    user: 'user',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyRequireNewPassword_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyRequireNewPassword = __decorate(
  [
    ProxyCmp({
      inputs: [
        'formFields',
        'handleAuthStateChange',
        'handleSubmit',
        'headerText',
        'submitButtonText',
        'user',
      ],
    }),
  ],
  AmplifyRequireNewPassword
);
export { AmplifyRequireNewPassword };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyRequireNewPassword,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-require-new-password',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'formFields',
              'handleAuthStateChange',
              'handleSubmit',
              'headerText',
              'submitButtonText',
              'user',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyRequireNewPassword.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyRequireNewPassword.prototype.z;
}
let AmplifyS3Album = class AmplifyS3Album {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyS3Album.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-s3-album',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'contentType',
          'fileToKey',
          'filter',
          'handleOnError',
          'handleOnLoad',
          'identityId',
          'level',
          'path',
          'picker',
          'pickerText',
          'sort',
          'track',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyS3Album.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyS3Album.ɵfac = function AmplifyS3Album_Factory(t) {
  return new (t || AmplifyS3Album)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyS3Album.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyS3Album,
  selectors: [['amplify-s3-album']],
  inputs: {
    contentType: 'contentType',
    fileToKey: 'fileToKey',
    filter: 'filter',
    handleOnError: 'handleOnError',
    handleOnLoad: 'handleOnLoad',
    identityId: 'identityId',
    level: 'level',
    path: 'path',
    picker: 'picker',
    pickerText: 'pickerText',
    sort: 'sort',
    track: 'track',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyS3Album_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyS3Album = __decorate(
  [
    ProxyCmp({
      inputs: [
        'contentType',
        'fileToKey',
        'filter',
        'handleOnError',
        'handleOnLoad',
        'identityId',
        'level',
        'path',
        'picker',
        'pickerText',
        'sort',
        'track',
      ],
    }),
  ],
  AmplifyS3Album
);
export { AmplifyS3Album };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyS3Album,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-s3-album',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'contentType',
              'fileToKey',
              'filter',
              'handleOnError',
              'handleOnLoad',
              'identityId',
              'level',
              'path',
              'picker',
              'pickerText',
              'sort',
              'track',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyS3Album.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyS3Album.prototype.z;
}
let AmplifyS3Image = class AmplifyS3Image {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyS3Image.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-s3-image',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'alt',
          'body',
          'contentType',
          'handleOnError',
          'handleOnLoad',
          'identityId',
          'imgKey',
          'imgProps',
          'level',
          'path',
          'track',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyS3Image.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyS3Image.ɵfac = function AmplifyS3Image_Factory(t) {
  return new (t || AmplifyS3Image)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyS3Image.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyS3Image,
  selectors: [['amplify-s3-image']],
  inputs: {
    alt: 'alt',
    body: 'body',
    contentType: 'contentType',
    handleOnError: 'handleOnError',
    handleOnLoad: 'handleOnLoad',
    identityId: 'identityId',
    imgKey: 'imgKey',
    imgProps: 'imgProps',
    level: 'level',
    path: 'path',
    track: 'track',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyS3Image_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyS3Image = __decorate(
  [
    ProxyCmp({
      inputs: [
        'alt',
        'body',
        'contentType',
        'handleOnError',
        'handleOnLoad',
        'identityId',
        'imgKey',
        'imgProps',
        'level',
        'path',
        'track',
      ],
    }),
  ],
  AmplifyS3Image
);
export { AmplifyS3Image };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyS3Image,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-s3-image',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'alt',
              'body',
              'contentType',
              'handleOnError',
              'handleOnLoad',
              'identityId',
              'imgKey',
              'imgProps',
              'level',
              'path',
              'track',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyS3Image.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyS3Image.prototype.z;
}
let AmplifyS3ImagePicker = class AmplifyS3ImagePicker {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyS3ImagePicker.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-s3-image-picker',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'buttonText',
          'contentType',
          'fileToKey',
          'headerHint',
          'headerTitle',
          'identityId',
          'level',
          'path',
          'placeholderHint',
          'track',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyS3ImagePicker.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyS3ImagePicker.ɵfac =
  function AmplifyS3ImagePicker_Factory(t) {
    return new (t || AmplifyS3ImagePicker)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyS3ImagePicker.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyS3ImagePicker,
  selectors: [['amplify-s3-image-picker']],
  inputs: {
    buttonText: 'buttonText',
    contentType: 'contentType',
    fileToKey: 'fileToKey',
    headerHint: 'headerHint',
    headerTitle: 'headerTitle',
    identityId: 'identityId',
    level: 'level',
    path: 'path',
    placeholderHint: 'placeholderHint',
    track: 'track',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyS3ImagePicker_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyS3ImagePicker = __decorate(
  [
    ProxyCmp({
      inputs: [
        'buttonText',
        'contentType',
        'fileToKey',
        'headerHint',
        'headerTitle',
        'identityId',
        'level',
        'path',
        'placeholderHint',
        'track',
      ],
    }),
  ],
  AmplifyS3ImagePicker
);
export { AmplifyS3ImagePicker };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyS3ImagePicker,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-s3-image-picker',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'buttonText',
              'contentType',
              'fileToKey',
              'headerHint',
              'headerTitle',
              'identityId',
              'level',
              'path',
              'placeholderHint',
              'track',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyS3ImagePicker.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyS3ImagePicker.prototype.z;
}
let AmplifyS3Text = class AmplifyS3Text {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyS3Text.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-s3-text',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'body',
          'contentType',
          'fallbackText',
          'identityId',
          'level',
          'path',
          'textKey',
          'track',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyS3Text.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyS3Text.ɵfac = function AmplifyS3Text_Factory(t) {
  return new (t || AmplifyS3Text)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyS3Text.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyS3Text,
  selectors: [['amplify-s3-text']],
  inputs: {
    body: 'body',
    contentType: 'contentType',
    fallbackText: 'fallbackText',
    identityId: 'identityId',
    level: 'level',
    path: 'path',
    textKey: 'textKey',
    track: 'track',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyS3Text_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyS3Text = __decorate(
  [
    ProxyCmp({
      inputs: [
        'body',
        'contentType',
        'fallbackText',
        'identityId',
        'level',
        'path',
        'textKey',
        'track',
      ],
    }),
  ],
  AmplifyS3Text
);
export { AmplifyS3Text };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyS3Text,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-s3-text',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'body',
              'contentType',
              'fallbackText',
              'identityId',
              'level',
              'path',
              'textKey',
              'track',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyS3Text.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyS3Text.prototype.z;
}
let AmplifyS3TextPicker = class AmplifyS3TextPicker {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyS3TextPicker.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-s3-text-picker',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'contentType',
          'fallbackText',
          'fileToKey',
          'identityId',
          'level',
          'path',
          'track',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyS3TextPicker.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyS3TextPicker.ɵfac =
  function AmplifyS3TextPicker_Factory(t) {
    return new (t || AmplifyS3TextPicker)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyS3TextPicker.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyS3TextPicker,
  selectors: [['amplify-s3-text-picker']],
  inputs: {
    contentType: 'contentType',
    fallbackText: 'fallbackText',
    fileToKey: 'fileToKey',
    identityId: 'identityId',
    level: 'level',
    path: 'path',
    track: 'track',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyS3TextPicker_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyS3TextPicker = __decorate(
  [
    ProxyCmp({
      inputs: [
        'contentType',
        'fallbackText',
        'fileToKey',
        'identityId',
        'level',
        'path',
        'track',
      ],
    }),
  ],
  AmplifyS3TextPicker
);
export { AmplifyS3TextPicker };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyS3TextPicker,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-s3-text-picker',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'contentType',
              'fallbackText',
              'fileToKey',
              'identityId',
              'level',
              'path',
              'track',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyS3TextPicker.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyS3TextPicker.prototype.z;
}
let AmplifySection = class AmplifySection {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifySection.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-section',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['role'],
      },
    ],
  },
];
/** @nocollapse */
AmplifySection.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifySection.ɵfac = function AmplifySection_Factory(t) {
  return new (t || AmplifySection)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifySection.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifySection,
  selectors: [['amplify-section']],
  inputs: { role: 'role' },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifySection_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifySection = __decorate([ProxyCmp({ inputs: ['role'] })], AmplifySection);
export { AmplifySection };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifySection,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-section',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['role'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifySection.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifySection.prototype.z;
}
let AmplifySelect = class AmplifySelect {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifySelect.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-select',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['fieldId', 'handleInputChange', 'options', 'selected'],
      },
    ],
  },
];
/** @nocollapse */
AmplifySelect.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifySelect.ɵfac = function AmplifySelect_Factory(t) {
  return new (t || AmplifySelect)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifySelect.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifySelect,
  selectors: [['amplify-select']],
  inputs: {
    fieldId: 'fieldId',
    handleInputChange: 'handleInputChange',
    options: 'options',
    selected: 'selected',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifySelect_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifySelect = __decorate(
  [
    ProxyCmp({
      inputs: ['fieldId', 'handleInputChange', 'options', 'selected'],
    }),
  ],
  AmplifySelect
);
export { AmplifySelect };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifySelect,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-select',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['fieldId', 'handleInputChange', 'options', 'selected'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifySelect.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifySelect.prototype.z;
}
let AmplifySelectMfaType = class AmplifySelectMfaType {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifySelectMfaType.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-select-mfa-type',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['MFATypes', 'authData', 'handleSubmit'],
      },
    ],
  },
];
/** @nocollapse */
AmplifySelectMfaType.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifySelectMfaType.ɵfac =
  function AmplifySelectMfaType_Factory(t) {
    return new (t || AmplifySelectMfaType)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifySelectMfaType.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifySelectMfaType,
  selectors: [['amplify-select-mfa-type']],
  inputs: {
    MFATypes: 'MFATypes',
    authData: 'authData',
    handleSubmit: 'handleSubmit',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifySelectMfaType_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifySelectMfaType = __decorate(
  [ProxyCmp({ inputs: ['MFATypes', 'authData', 'handleSubmit'] })],
  AmplifySelectMfaType
);
export { AmplifySelectMfaType };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifySelectMfaType,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-select-mfa-type',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['MFATypes', 'authData', 'handleSubmit'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifySelectMfaType.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifySelectMfaType.prototype.z;
}
let AmplifySignIn = class AmplifySignIn {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifySignIn.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-sign-in',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'federated',
          'formFields',
          'handleAuthStateChange',
          'handleSubmit',
          'headerText',
          'hideSignUp',
          'submitButtonText',
          'usernameAlias',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifySignIn.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifySignIn.ɵfac = function AmplifySignIn_Factory(t) {
  return new (t || AmplifySignIn)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifySignIn.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifySignIn,
  selectors: [['amplify-sign-in']],
  inputs: {
    federated: 'federated',
    formFields: 'formFields',
    handleAuthStateChange: 'handleAuthStateChange',
    handleSubmit: 'handleSubmit',
    headerText: 'headerText',
    hideSignUp: 'hideSignUp',
    submitButtonText: 'submitButtonText',
    usernameAlias: 'usernameAlias',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifySignIn_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifySignIn = __decorate(
  [
    ProxyCmp({
      inputs: [
        'federated',
        'formFields',
        'handleAuthStateChange',
        'handleSubmit',
        'headerText',
        'hideSignUp',
        'submitButtonText',
        'usernameAlias',
      ],
    }),
  ],
  AmplifySignIn
);
export { AmplifySignIn };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifySignIn,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-sign-in',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'federated',
              'formFields',
              'handleAuthStateChange',
              'handleSubmit',
              'headerText',
              'hideSignUp',
              'submitButtonText',
              'usernameAlias',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifySignIn.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifySignIn.prototype.z;
}
let AmplifySignInButton = class AmplifySignInButton {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifySignInButton.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-sign-in-button',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['provider'],
      },
    ],
  },
];
/** @nocollapse */
AmplifySignInButton.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifySignInButton.ɵfac =
  function AmplifySignInButton_Factory(t) {
    return new (t || AmplifySignInButton)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifySignInButton.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifySignInButton,
  selectors: [['amplify-sign-in-button']],
  inputs: { provider: 'provider' },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifySignInButton_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifySignInButton = __decorate(
  [ProxyCmp({ inputs: ['provider'] })],
  AmplifySignInButton
);
export { AmplifySignInButton };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifySignInButton,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-sign-in-button',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['provider'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifySignInButton.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifySignInButton.prototype.z;
}
let AmplifySignOut = class AmplifySignOut {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifySignOut.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-sign-out',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['buttonText', 'handleAuthStateChange'],
      },
    ],
  },
];
/** @nocollapse */
AmplifySignOut.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifySignOut.ɵfac = function AmplifySignOut_Factory(t) {
  return new (t || AmplifySignOut)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifySignOut.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifySignOut,
  selectors: [['amplify-sign-out']],
  inputs: {
    buttonText: 'buttonText',
    handleAuthStateChange: 'handleAuthStateChange',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifySignOut_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifySignOut = __decorate(
  [ProxyCmp({ inputs: ['buttonText', 'handleAuthStateChange'] })],
  AmplifySignOut
);
export { AmplifySignOut };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifySignOut,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-sign-out',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['buttonText', 'handleAuthStateChange'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifySignOut.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifySignOut.prototype.z;
}
let AmplifySignUp = class AmplifySignUp {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifySignUp.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-sign-up',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'formFields',
          'handleAuthStateChange',
          'handleSignUp',
          'handleSubmit',
          'haveAccountText',
          'headerText',
          'signInText',
          'submitButtonText',
          'usernameAlias',
          'validationErrors',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifySignUp.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifySignUp.ɵfac = function AmplifySignUp_Factory(t) {
  return new (t || AmplifySignUp)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifySignUp.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifySignUp,
  selectors: [['amplify-sign-up']],
  inputs: {
    formFields: 'formFields',
    handleAuthStateChange: 'handleAuthStateChange',
    handleSignUp: 'handleSignUp',
    handleSubmit: 'handleSubmit',
    haveAccountText: 'haveAccountText',
    headerText: 'headerText',
    signInText: 'signInText',
    submitButtonText: 'submitButtonText',
    usernameAlias: 'usernameAlias',
    validationErrors: 'validationErrors',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifySignUp_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifySignUp = __decorate(
  [
    ProxyCmp({
      inputs: [
        'formFields',
        'handleAuthStateChange',
        'handleSignUp',
        'handleSubmit',
        'haveAccountText',
        'headerText',
        'signInText',
        'submitButtonText',
        'usernameAlias',
        'validationErrors',
      ],
    }),
  ],
  AmplifySignUp
);
export { AmplifySignUp };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifySignUp,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-sign-up',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'formFields',
              'handleAuthStateChange',
              'handleSignUp',
              'handleSubmit',
              'haveAccountText',
              'headerText',
              'signInText',
              'submitButtonText',
              'usernameAlias',
              'validationErrors',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifySignUp.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifySignUp.prototype.z;
}
export class AmplifyStrike {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
}
AmplifyStrike.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-strike',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
      },
    ],
  },
];
/** @nocollapse */
AmplifyStrike.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyStrike.ɵfac = function AmplifyStrike_Factory(t) {
  return new (t || AmplifyStrike)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyStrike.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyStrike,
  selectors: [['amplify-strike']],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyStrike_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyStrike,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-strike',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyStrike.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyStrike.prototype.z;
}
let AmplifyToast = class AmplifyToast {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyToast.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-toast',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['handleClose', 'message'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyToast.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyToast.ɵfac = function AmplifyToast_Factory(t) {
  return new (t || AmplifyToast)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyToast.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyToast,
  selectors: [['amplify-toast']],
  inputs: { handleClose: 'handleClose', message: 'message' },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyToast_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyToast = __decorate(
  [ProxyCmp({ inputs: ['handleClose', 'message'] })],
  AmplifyToast
);
export { AmplifyToast };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyToast,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-toast',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['handleClose', 'message'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyToast.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyToast.prototype.z;
}
let AmplifyTooltip = class AmplifyTooltip {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyTooltip.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-tooltip',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['shouldAutoShow', 'text'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyTooltip.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyTooltip.ɵfac = function AmplifyTooltip_Factory(t) {
  return new (t || AmplifyTooltip)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyTooltip.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyTooltip,
  selectors: [['amplify-tooltip']],
  inputs: { shouldAutoShow: 'shouldAutoShow', text: 'text' },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyTooltip_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyTooltip = __decorate(
  [ProxyCmp({ inputs: ['shouldAutoShow', 'text'] })],
  AmplifyTooltip
);
export { AmplifyTooltip };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyTooltip,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-tooltip',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['shouldAutoShow', 'text'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyTooltip.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyTooltip.prototype.z;
}
let AmplifyTotpSetup = class AmplifyTotpSetup {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyTotpSetup.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-totp-setup',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'handleAuthStateChange',
          'handleComplete',
          'headerText',
          'issuer',
          'standalone',
          'user',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyTotpSetup.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyTotpSetup.ɵfac = function AmplifyTotpSetup_Factory(
  t
) {
  return new (t || AmplifyTotpSetup)(
    i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
    i0.ɵɵdirectiveInject(i0.ElementRef),
    i0.ɵɵdirectiveInject(i0.NgZone)
  );
};
/** @nocollapse */ AmplifyTotpSetup.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyTotpSetup,
  selectors: [['amplify-totp-setup']],
  inputs: {
    handleAuthStateChange: 'handleAuthStateChange',
    handleComplete: 'handleComplete',
    headerText: 'headerText',
    issuer: 'issuer',
    standalone: 'standalone',
    user: 'user',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyTotpSetup_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyTotpSetup = __decorate(
  [
    ProxyCmp({
      inputs: [
        'handleAuthStateChange',
        'handleComplete',
        'headerText',
        'issuer',
        'standalone',
        'user',
      ],
    }),
  ],
  AmplifyTotpSetup
);
export { AmplifyTotpSetup };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyTotpSetup,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-totp-setup',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'handleAuthStateChange',
              'handleComplete',
              'headerText',
              'issuer',
              'standalone',
              'user',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyTotpSetup.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyTotpSetup.prototype.z;
}
let AmplifyUsernameField = class AmplifyUsernameField {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyUsernameField.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-username-field',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: [
          'disabled',
          'fieldId',
          'handleInputChange',
          'hint',
          'inputProps',
          'label',
          'placeholder',
          'required',
          'value',
        ],
      },
    ],
  },
];
/** @nocollapse */
AmplifyUsernameField.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyUsernameField.ɵfac =
  function AmplifyUsernameField_Factory(t) {
    return new (t || AmplifyUsernameField)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyUsernameField.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyUsernameField,
  selectors: [['amplify-username-field']],
  inputs: {
    disabled: 'disabled',
    fieldId: 'fieldId',
    handleInputChange: 'handleInputChange',
    hint: 'hint',
    inputProps: 'inputProps',
    label: 'label',
    placeholder: 'placeholder',
    required: 'required',
    value: 'value',
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyUsernameField_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyUsernameField = __decorate(
  [
    ProxyCmp({
      inputs: [
        'disabled',
        'fieldId',
        'handleInputChange',
        'hint',
        'inputProps',
        'label',
        'placeholder',
        'required',
        'value',
      ],
    }),
  ],
  AmplifyUsernameField
);
export { AmplifyUsernameField };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyUsernameField,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-username-field',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: [
              'disabled',
              'fieldId',
              'handleInputChange',
              'hint',
              'inputProps',
              'label',
              'placeholder',
              'required',
              'value',
            ],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyUsernameField.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyUsernameField.prototype.z;
}
let AmplifyVerifyContact = class AmplifyVerifyContact {
  /**
   * @param {?} c
   * @param {?} r
   * @param {?} z
   */
  constructor(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
};
AmplifyVerifyContact.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'amplify-verify-contact',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: '<ng-content></ng-content>',
        inputs: ['handleAuthStateChange', 'user'],
      },
    ],
  },
];
/** @nocollapse */
AmplifyVerifyContact.ctorParameters = () => [
  { type: ChangeDetectorRef },
  { type: ElementRef },
  { type: NgZone },
];
/** @nocollapse */ AmplifyVerifyContact.ɵfac =
  function AmplifyVerifyContact_Factory(t) {
    return new (t || AmplifyVerifyContact)(
      i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),
      i0.ɵɵdirectiveInject(i0.ElementRef),
      i0.ɵɵdirectiveInject(i0.NgZone)
    );
  };
/** @nocollapse */ AmplifyVerifyContact.ɵcmp = i0.ɵɵdefineComponent({
  type: AmplifyVerifyContact,
  selectors: [['amplify-verify-contact']],
  inputs: { handleAuthStateChange: 'handleAuthStateChange', user: 'user' },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AmplifyVerifyContact_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵprojectionDef();
      i0.ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0,
});
AmplifyVerifyContact = __decorate(
  [ProxyCmp({ inputs: ['handleAuthStateChange', 'user'] })],
  AmplifyVerifyContact
);
export { AmplifyVerifyContact };
/*@__PURE__*/ (function () {
  i0.ɵsetClassMetadata(
    AmplifyVerifyContact,
    [
      {
        type: Component,
        args: [
          {
            selector: 'amplify-verify-contact',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: '<ng-content></ng-content>',
            inputs: ['handleAuthStateChange', 'user'],
          },
        ],
      },
    ],
    function () {
      return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: i0.NgZone },
      ];
    },
    null
  );
})();
if (false) {
  /**
   * @type {?}
   * @protected
   */
  AmplifyVerifyContact.prototype.el;
  /**
   * @type {?}
   * @protected
   */
  AmplifyVerifyContact.prototype.z;
}
