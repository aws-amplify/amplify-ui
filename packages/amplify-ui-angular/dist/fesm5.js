import { __decorate } from 'tslib';
import {
  Component,
  ChangeDetectionStrategy,
  ɵɵdirectiveInject,
  ChangeDetectorRef as ChangeDetectorRef$1,
  ElementRef as ElementRef$1,
  NgZone as NgZone$1,
  ɵɵdefineComponent,
  ɵɵprojectionDef,
  ɵɵprojection,
  ɵɵdefineNgModule,
  ɵɵdefineInjector,
  ɵɵsetNgModuleScope,
  NgModule,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { defineCustomElements } from '@aws-amplify/ui-components/loader';

var _c0 = ['*'];
/** @type {?} */
var proxyInputs =
  /**
   * @param {?} Cmp
   * @param {?} inputs
   * @return {?}
   */
  function (Cmp, inputs) {
    /** @type {?} */
    var Prototype = Cmp.prototype;
    inputs.forEach(
      /**
       * @param {?} item
       * @return {?}
       */
      function (item) {
        Object.defineProperty(Prototype, item, {
          /**
           * @return {?}
           */
          get: function () {
            return this.el[item];
          },
          /**
           * @param {?} val
           * @return {?}
           */
          set: function (val) {
            var _this = this;
            this.z.runOutsideAngular(
              /**
               * @return {?}
               */
              function () {
                return (_this.el[item] = val);
              }
            );
          },
        });
      }
    );
  };
/** @type {?} */
var proxyMethods =
  /**
   * @param {?} Cmp
   * @param {?} methods
   * @return {?}
   */
  function (Cmp, methods) {
    /** @type {?} */
    var Prototype = Cmp.prototype;
    methods.forEach(
      /**
       * @param {?} methodName
       * @return {?}
       */
      function (methodName) {
        Prototype[methodName] =
          /**
           * @return {?}
           */
          function () {
            var _this = this;
            /** @type {?} */
            var args = arguments;
            return this.z.runOutsideAngular(
              /**
               * @return {?}
               */
              function () {
                return _this.el[methodName].apply(_this.el, args);
              }
            );
          };
      }
    );
  };
/** @type {?} */
var proxyOutputs =
  /**
   * @param {?} instance
   * @param {?} el
   * @param {?} events
   * @return {?}
   */
  function (instance, el, events) {
    events.forEach(
      /**
       * @param {?} eventName
       * @return {?}
       */
      function (eventName) {
        return (instance[eventName] = fromEvent(el, eventName));
      }
    );
  };
// tslint:disable-next-line: only-arrow-functions
// tslint:disable-next-line: only-arrow-functions
/**
 * @param {?} opts
 * @return {?}
 */
function ProxyCmp(opts) {
  /** @type {?} */
  var decorator =
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
var AmplifyAmazonButton = /** @class */ (function () {
  function AmplifyAmazonButton(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyAmazonButton.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyAmazonButton.ɵfac =
    function AmplifyAmazonButton_Factory(t) {
      return new (t || AmplifyAmazonButton)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyAmazonButton.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyAmazonButton = __decorate(
    [ProxyCmp({ inputs: ['clientId', 'handleAuthStateChange'] })],
    AmplifyAmazonButton
  );
  return AmplifyAmazonButton;
})();
var AmplifyAuthContainer = /** @class */ (function () {
  function AmplifyAuthContainer(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
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
  AmplifyAuthContainer.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyAuthContainer.ɵfac =
    function AmplifyAuthContainer_Factory(t) {
      return new (t || AmplifyAuthContainer)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyAuthContainer.ɵcmp = ɵɵdefineComponent({
    type: AmplifyAuthContainer,
    selectors: [['amplify-auth-container']],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyAuthContainer_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  return AmplifyAuthContainer;
})();
var AmplifyAuthFields = /** @class */ (function () {
  function AmplifyAuthFields(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyAuthFields.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyAuthFields.ɵfac =
    function AmplifyAuthFields_Factory(t) {
      return new (t || AmplifyAuthFields)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyAuthFields.ɵcmp = ɵɵdefineComponent({
    type: AmplifyAuthFields,
    selectors: [['amplify-auth-fields']],
    inputs: { formFields: 'formFields' },
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyAuthFields_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyAuthFields = __decorate(
    [ProxyCmp({ inputs: ['formFields'] })],
    AmplifyAuthFields
  );
  return AmplifyAuthFields;
})();
var AmplifyAuth0Button = /** @class */ (function () {
  function AmplifyAuth0Button(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyAuth0Button.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyAuth0Button.ɵfac =
    function AmplifyAuth0Button_Factory(t) {
      return new (t || AmplifyAuth0Button)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyAuth0Button.ɵcmp = ɵɵdefineComponent({
    type: AmplifyAuth0Button,
    selectors: [['amplify-auth0-button']],
    inputs: {
      config: 'config',
      handleAuthStateChange: 'handleAuthStateChange',
    },
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyAuth0Button_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyAuth0Button = __decorate(
    [ProxyCmp({ inputs: ['config', 'handleAuthStateChange'] })],
    AmplifyAuth0Button
  );
  return AmplifyAuth0Button;
})();
var AmplifyAuthenticator = /** @class */ (function () {
  function AmplifyAuthenticator(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyAuthenticator.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyAuthenticator.ɵfac =
    function AmplifyAuthenticator_Factory(t) {
      return new (t || AmplifyAuthenticator)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyAuthenticator.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyAuthenticator;
})();
var AmplifyButton = /** @class */ (function () {
  function AmplifyButton(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyButton.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyButton.ɵfac = function AmplifyButton_Factory(t) {
    return new (t || AmplifyButton)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyButton.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyButton;
})();
var AmplifyChatbot = /** @class */ (function () {
  function AmplifyChatbot(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['chatCompleted']);
  }
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
  AmplifyChatbot.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyChatbot.ɵfac = function AmplifyChatbot_Factory(t) {
    return new (t || AmplifyChatbot)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyChatbot.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyChatbot;
})();
var AmplifyCheckbox = /** @class */ (function () {
  function AmplifyCheckbox(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyCheckbox.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyCheckbox.ɵfac = function AmplifyCheckbox_Factory(
    t
  ) {
    return new (t || AmplifyCheckbox)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyCheckbox.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyCheckbox;
})();
var AmplifyCodeField = /** @class */ (function () {
  function AmplifyCodeField(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyCodeField.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyCodeField.ɵfac = function AmplifyCodeField_Factory(
    t
  ) {
    return new (t || AmplifyCodeField)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyCodeField.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyCodeField;
})();
var AmplifyConfirmSignIn = /** @class */ (function () {
  function AmplifyConfirmSignIn(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyConfirmSignIn.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyConfirmSignIn.ɵfac =
    function AmplifyConfirmSignIn_Factory(t) {
      return new (t || AmplifyConfirmSignIn)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyConfirmSignIn.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyConfirmSignIn;
})();
var AmplifyConfirmSignUp = /** @class */ (function () {
  function AmplifyConfirmSignUp(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyConfirmSignUp.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyConfirmSignUp.ɵfac =
    function AmplifyConfirmSignUp_Factory(t) {
      return new (t || AmplifyConfirmSignUp)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyConfirmSignUp.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyConfirmSignUp;
})();
var AmplifyContainer = /** @class */ (function () {
  function AmplifyContainer(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
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
  AmplifyContainer.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyContainer.ɵfac = function AmplifyContainer_Factory(
    t
  ) {
    return new (t || AmplifyContainer)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyContainer.ɵcmp = ɵɵdefineComponent({
    type: AmplifyContainer,
    selectors: [['amplify-container']],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyContainer_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  return AmplifyContainer;
})();
var AmplifyCountryDialCode = /** @class */ (function () {
  function AmplifyCountryDialCode(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyCountryDialCode.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyCountryDialCode.ɵfac =
    function AmplifyCountryDialCode_Factory(t) {
      return new (t || AmplifyCountryDialCode)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyCountryDialCode.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyCountryDialCode;
})();
var AmplifyEmailField = /** @class */ (function () {
  function AmplifyEmailField(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyEmailField.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyEmailField.ɵfac =
    function AmplifyEmailField_Factory(t) {
      return new (t || AmplifyEmailField)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyEmailField.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyEmailField;
})();
var AmplifyFacebookButton = /** @class */ (function () {
  function AmplifyFacebookButton(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyFacebookButton.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyFacebookButton.ɵfac =
    function AmplifyFacebookButton_Factory(t) {
      return new (t || AmplifyFacebookButton)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyFacebookButton.ɵcmp = ɵɵdefineComponent({
    type: AmplifyFacebookButton,
    selectors: [['amplify-facebook-button']],
    inputs: { appId: 'appId', handleAuthStateChange: 'handleAuthStateChange' },
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyFacebookButton_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyFacebookButton = __decorate(
    [ProxyCmp({ inputs: ['appId', 'handleAuthStateChange'] })],
    AmplifyFacebookButton
  );
  return AmplifyFacebookButton;
})();
var AmplifyFederatedButtons = /** @class */ (function () {
  function AmplifyFederatedButtons(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyFederatedButtons.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyFederatedButtons.ɵfac =
    function AmplifyFederatedButtons_Factory(t) {
      return new (t || AmplifyFederatedButtons)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyFederatedButtons.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyFederatedButtons = __decorate(
    [ProxyCmp({ inputs: ['authState', 'federated', 'handleAuthStateChange'] })],
    AmplifyFederatedButtons
  );
  return AmplifyFederatedButtons;
})();
var AmplifyFederatedSignIn = /** @class */ (function () {
  function AmplifyFederatedSignIn(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyFederatedSignIn.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyFederatedSignIn.ɵfac =
    function AmplifyFederatedSignIn_Factory(t) {
      return new (t || AmplifyFederatedSignIn)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyFederatedSignIn.ɵcmp = ɵɵdefineComponent({
    type: AmplifyFederatedSignIn,
    selectors: [['amplify-federated-sign-in']],
    inputs: { authState: 'authState', federated: 'federated' },
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyFederatedSignIn_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyFederatedSignIn = __decorate(
    [ProxyCmp({ inputs: ['authState', 'federated'] })],
    AmplifyFederatedSignIn
  );
  return AmplifyFederatedSignIn;
})();
var AmplifyForgotPassword = /** @class */ (function () {
  function AmplifyForgotPassword(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyForgotPassword.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyForgotPassword.ɵfac =
    function AmplifyForgotPassword_Factory(t) {
      return new (t || AmplifyForgotPassword)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyForgotPassword.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyForgotPassword;
})();
var AmplifyFormField = /** @class */ (function () {
  function AmplifyFormField(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyFormField.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyFormField.ɵfac = function AmplifyFormField_Factory(
    t
  ) {
    return new (t || AmplifyFormField)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyFormField.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyFormField;
})();
var AmplifyFormSection = /** @class */ (function () {
  function AmplifyFormSection(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyFormSection.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyFormSection.ɵfac =
    function AmplifyFormSection_Factory(t) {
      return new (t || AmplifyFormSection)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyFormSection.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyFormSection;
})();
var AmplifyGoogleButton = /** @class */ (function () {
  function AmplifyGoogleButton(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyGoogleButton.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyGoogleButton.ɵfac =
    function AmplifyGoogleButton_Factory(t) {
      return new (t || AmplifyGoogleButton)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyGoogleButton.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyGoogleButton = __decorate(
    [ProxyCmp({ inputs: ['clientId', 'handleAuthStateChange'] })],
    AmplifyGoogleButton
  );
  return AmplifyGoogleButton;
})();
var AmplifyGreetings = /** @class */ (function () {
  function AmplifyGreetings(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyGreetings.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyGreetings.ɵfac = function AmplifyGreetings_Factory(
    t
  ) {
    return new (t || AmplifyGreetings)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyGreetings.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyGreetings = __decorate(
    [ProxyCmp({ inputs: ['handleAuthStateChange', 'logo', 'username'] })],
    AmplifyGreetings
  );
  return AmplifyGreetings;
})();
var AmplifyHint = /** @class */ (function () {
  function AmplifyHint(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
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
  AmplifyHint.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyHint.ɵfac = function AmplifyHint_Factory(t) {
    return new (t || AmplifyHint)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyHint.ɵcmp = ɵɵdefineComponent({
    type: AmplifyHint,
    selectors: [['amplify-hint']],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyHint_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  return AmplifyHint;
})();
var AmplifyIcon = /** @class */ (function () {
  function AmplifyIcon(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyIcon.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyIcon.ɵfac = function AmplifyIcon_Factory(t) {
    return new (t || AmplifyIcon)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyIcon.ɵcmp = ɵɵdefineComponent({
    type: AmplifyIcon,
    selectors: [['amplify-icon']],
    inputs: { name: 'name' },
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyIcon_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyIcon = __decorate([ProxyCmp({ inputs: ['name'] })], AmplifyIcon);
  return AmplifyIcon;
})();
var AmplifyIconButton = /** @class */ (function () {
  function AmplifyIconButton(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyIconButton.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyIconButton.ɵfac =
    function AmplifyIconButton_Factory(t) {
      return new (t || AmplifyIconButton)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyIconButton.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyIconButton = __decorate(
    [ProxyCmp({ inputs: ['autoShowTooltip', 'name', 'tooltip'] })],
    AmplifyIconButton
  );
  return AmplifyIconButton;
})();
var AmplifyInput = /** @class */ (function () {
  function AmplifyInput(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyInput.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyInput.ɵfac = function AmplifyInput_Factory(t) {
    return new (t || AmplifyInput)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyInput.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyInput;
})();
var AmplifyLabel = /** @class */ (function () {
  function AmplifyLabel(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyLabel.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyLabel.ɵfac = function AmplifyLabel_Factory(t) {
    return new (t || AmplifyLabel)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyLabel.ɵcmp = ɵɵdefineComponent({
    type: AmplifyLabel,
    selectors: [['amplify-label']],
    inputs: { htmlFor: 'htmlFor' },
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyLabel_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyLabel = __decorate([ProxyCmp({ inputs: ['htmlFor'] })], AmplifyLabel);
  return AmplifyLabel;
})();
var AmplifyLink = /** @class */ (function () {
  function AmplifyLink(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyLink.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyLink.ɵfac = function AmplifyLink_Factory(t) {
    return new (t || AmplifyLink)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyLink.ɵcmp = ɵɵdefineComponent({
    type: AmplifyLink,
    selectors: [['amplify-link']],
    inputs: { role: 'role' },
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyLink_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyLink = __decorate([ProxyCmp({ inputs: ['role'] })], AmplifyLink);
  return AmplifyLink;
})();
var AmplifyLoadingSpinner = /** @class */ (function () {
  function AmplifyLoadingSpinner(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
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
  AmplifyLoadingSpinner.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyLoadingSpinner.ɵfac =
    function AmplifyLoadingSpinner_Factory(t) {
      return new (t || AmplifyLoadingSpinner)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyLoadingSpinner.ɵcmp = ɵɵdefineComponent({
    type: AmplifyLoadingSpinner,
    selectors: [['amplify-loading-spinner']],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyLoadingSpinner_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  return AmplifyLoadingSpinner;
})();
var AmplifyNav = /** @class */ (function () {
  function AmplifyNav(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
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
  AmplifyNav.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyNav.ɵfac = function AmplifyNav_Factory(t) {
    return new (t || AmplifyNav)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyNav.ɵcmp = ɵɵdefineComponent({
    type: AmplifyNav,
    selectors: [['amplify-nav']],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyNav_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  return AmplifyNav;
})();
var AmplifyOauthButton = /** @class */ (function () {
  function AmplifyOauthButton(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyOauthButton.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyOauthButton.ɵfac =
    function AmplifyOauthButton_Factory(t) {
      return new (t || AmplifyOauthButton)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyOauthButton.ɵcmp = ɵɵdefineComponent({
    type: AmplifyOauthButton,
    selectors: [['amplify-oauth-button']],
    inputs: { config: 'config' },
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyOauthButton_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyOauthButton = __decorate(
    [ProxyCmp({ inputs: ['config'] })],
    AmplifyOauthButton
  );
  return AmplifyOauthButton;
})();
var AmplifyPasswordField = /** @class */ (function () {
  function AmplifyPasswordField(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyPasswordField.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyPasswordField.ɵfac =
    function AmplifyPasswordField_Factory(t) {
      return new (t || AmplifyPasswordField)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyPasswordField.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyPasswordField;
})();
var AmplifyPhoneField = /** @class */ (function () {
  function AmplifyPhoneField(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyPhoneField.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyPhoneField.ɵfac =
    function AmplifyPhoneField_Factory(t) {
      return new (t || AmplifyPhoneField)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyPhoneField.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyPhoneField;
})();
var AmplifyPhotoPicker = /** @class */ (function () {
  function AmplifyPhotoPicker(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyPhotoPicker.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyPhotoPicker.ɵfac =
    function AmplifyPhotoPicker_Factory(t) {
      return new (t || AmplifyPhotoPicker)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyPhotoPicker.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyPhotoPicker;
})();
var AmplifyPicker = /** @class */ (function () {
  function AmplifyPicker(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyPicker.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyPicker.ɵfac = function AmplifyPicker_Factory(t) {
    return new (t || AmplifyPicker)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyPicker.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyPicker = __decorate(
    [ProxyCmp({ inputs: ['acceptValue', 'inputHandler', 'pickerText'] })],
    AmplifyPicker
  );
  return AmplifyPicker;
})();
var AmplifyRadioButton = /** @class */ (function () {
  function AmplifyRadioButton(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyRadioButton.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyRadioButton.ɵfac =
    function AmplifyRadioButton_Factory(t) {
      return new (t || AmplifyRadioButton)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyRadioButton.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyRadioButton;
})();
var AmplifyRequireNewPassword = /** @class */ (function () {
  function AmplifyRequireNewPassword(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyRequireNewPassword.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyRequireNewPassword.ɵfac =
    function AmplifyRequireNewPassword_Factory(t) {
      return new (t || AmplifyRequireNewPassword)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyRequireNewPassword.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyRequireNewPassword;
})();
var AmplifyS3Album = /** @class */ (function () {
  function AmplifyS3Album(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyS3Album.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyS3Album.ɵfac = function AmplifyS3Album_Factory(t) {
    return new (t || AmplifyS3Album)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyS3Album.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyS3Album;
})();
var AmplifyS3Image = /** @class */ (function () {
  function AmplifyS3Image(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyS3Image.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyS3Image.ɵfac = function AmplifyS3Image_Factory(t) {
    return new (t || AmplifyS3Image)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyS3Image.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyS3Image;
})();
var AmplifyS3ImagePicker = /** @class */ (function () {
  function AmplifyS3ImagePicker(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyS3ImagePicker.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyS3ImagePicker.ɵfac =
    function AmplifyS3ImagePicker_Factory(t) {
      return new (t || AmplifyS3ImagePicker)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyS3ImagePicker.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyS3ImagePicker;
})();
var AmplifyS3Text = /** @class */ (function () {
  function AmplifyS3Text(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyS3Text.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyS3Text.ɵfac = function AmplifyS3Text_Factory(t) {
    return new (t || AmplifyS3Text)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyS3Text.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyS3Text;
})();
var AmplifyS3TextPicker = /** @class */ (function () {
  function AmplifyS3TextPicker(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyS3TextPicker.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyS3TextPicker.ɵfac =
    function AmplifyS3TextPicker_Factory(t) {
      return new (t || AmplifyS3TextPicker)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyS3TextPicker.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyS3TextPicker;
})();
var AmplifySection = /** @class */ (function () {
  function AmplifySection(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifySection.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifySection.ɵfac = function AmplifySection_Factory(t) {
    return new (t || AmplifySection)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifySection.ɵcmp = ɵɵdefineComponent({
    type: AmplifySection,
    selectors: [['amplify-section']],
    inputs: { role: 'role' },
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifySection_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifySection = __decorate([ProxyCmp({ inputs: ['role'] })], AmplifySection);
  return AmplifySection;
})();
var AmplifySelect = /** @class */ (function () {
  function AmplifySelect(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifySelect.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifySelect.ɵfac = function AmplifySelect_Factory(t) {
    return new (t || AmplifySelect)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifySelect.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifySelect;
})();
var AmplifySelectMfaType = /** @class */ (function () {
  function AmplifySelectMfaType(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifySelectMfaType.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifySelectMfaType.ɵfac =
    function AmplifySelectMfaType_Factory(t) {
      return new (t || AmplifySelectMfaType)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifySelectMfaType.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifySelectMfaType = __decorate(
    [ProxyCmp({ inputs: ['MFATypes', 'authData', 'handleSubmit'] })],
    AmplifySelectMfaType
  );
  return AmplifySelectMfaType;
})();
var AmplifySignIn = /** @class */ (function () {
  function AmplifySignIn(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifySignIn.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifySignIn.ɵfac = function AmplifySignIn_Factory(t) {
    return new (t || AmplifySignIn)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifySignIn.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifySignIn;
})();
var AmplifySignInButton = /** @class */ (function () {
  function AmplifySignInButton(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifySignInButton.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifySignInButton.ɵfac =
    function AmplifySignInButton_Factory(t) {
      return new (t || AmplifySignInButton)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifySignInButton.ɵcmp = ɵɵdefineComponent({
    type: AmplifySignInButton,
    selectors: [['amplify-sign-in-button']],
    inputs: { provider: 'provider' },
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifySignInButton_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifySignInButton = __decorate(
    [ProxyCmp({ inputs: ['provider'] })],
    AmplifySignInButton
  );
  return AmplifySignInButton;
})();
var AmplifySignOut = /** @class */ (function () {
  function AmplifySignOut(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifySignOut.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifySignOut.ɵfac = function AmplifySignOut_Factory(t) {
    return new (t || AmplifySignOut)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifySignOut.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifySignOut = __decorate(
    [ProxyCmp({ inputs: ['buttonText', 'handleAuthStateChange'] })],
    AmplifySignOut
  );
  return AmplifySignOut;
})();
var AmplifySignUp = /** @class */ (function () {
  function AmplifySignUp(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifySignUp.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifySignUp.ɵfac = function AmplifySignUp_Factory(t) {
    return new (t || AmplifySignUp)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifySignUp.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifySignUp;
})();
var AmplifyStrike = /** @class */ (function () {
  function AmplifyStrike(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
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
  AmplifyStrike.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyStrike.ɵfac = function AmplifyStrike_Factory(t) {
    return new (t || AmplifyStrike)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyStrike.ɵcmp = ɵɵdefineComponent({
    type: AmplifyStrike,
    selectors: [['amplify-strike']],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyStrike_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  return AmplifyStrike;
})();
var AmplifyToast = /** @class */ (function () {
  function AmplifyToast(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyToast.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyToast.ɵfac = function AmplifyToast_Factory(t) {
    return new (t || AmplifyToast)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyToast.ɵcmp = ɵɵdefineComponent({
    type: AmplifyToast,
    selectors: [['amplify-toast']],
    inputs: { handleClose: 'handleClose', message: 'message' },
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyToast_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyToast = __decorate(
    [ProxyCmp({ inputs: ['handleClose', 'message'] })],
    AmplifyToast
  );
  return AmplifyToast;
})();
var AmplifyTooltip = /** @class */ (function () {
  function AmplifyTooltip(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyTooltip.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyTooltip.ɵfac = function AmplifyTooltip_Factory(t) {
    return new (t || AmplifyTooltip)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyTooltip.ɵcmp = ɵɵdefineComponent({
    type: AmplifyTooltip,
    selectors: [['amplify-tooltip']],
    inputs: { shouldAutoShow: 'shouldAutoShow', text: 'text' },
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyTooltip_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyTooltip = __decorate(
    [ProxyCmp({ inputs: ['shouldAutoShow', 'text'] })],
    AmplifyTooltip
  );
  return AmplifyTooltip;
})();
var AmplifyTotpSetup = /** @class */ (function () {
  function AmplifyTotpSetup(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyTotpSetup.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyTotpSetup.ɵfac = function AmplifyTotpSetup_Factory(
    t
  ) {
    return new (t || AmplifyTotpSetup)(
      ɵɵdirectiveInject(ChangeDetectorRef$1),
      ɵɵdirectiveInject(ElementRef$1),
      ɵɵdirectiveInject(NgZone$1)
    );
  };
  /** @nocollapse */ AmplifyTotpSetup.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyTotpSetup;
})();
var AmplifyUsernameField = /** @class */ (function () {
  function AmplifyUsernameField(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyUsernameField.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyUsernameField.ɵfac =
    function AmplifyUsernameField_Factory(t) {
      return new (t || AmplifyUsernameField)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyUsernameField.ɵcmp = ɵɵdefineComponent({
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
        ɵɵprojectionDef();
        ɵɵprojection(0);
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
  return AmplifyUsernameField;
})();
var AmplifyVerifyContact = /** @class */ (function () {
  function AmplifyVerifyContact(c, r, z) {
    this.z = z;
    c.detach();
    this.el = r.nativeElement;
  }
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
  AmplifyVerifyContact.ctorParameters = function () {
    return [
      { type: ChangeDetectorRef },
      { type: ElementRef },
      { type: NgZone },
    ];
  };
  /** @nocollapse */ AmplifyVerifyContact.ɵfac =
    function AmplifyVerifyContact_Factory(t) {
      return new (t || AmplifyVerifyContact)(
        ɵɵdirectiveInject(ChangeDetectorRef$1),
        ɵɵdirectiveInject(ElementRef$1),
        ɵɵdirectiveInject(NgZone$1)
      );
    };
  /** @nocollapse */ AmplifyVerifyContact.ɵcmp = ɵɵdefineComponent({
    type: AmplifyVerifyContact,
    selectors: [['amplify-verify-contact']],
    inputs: { handleAuthStateChange: 'handleAuthStateChange', user: 'user' },
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function AmplifyVerifyContact_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0,
  });
  AmplifyVerifyContact = __decorate(
    [ProxyCmp({ inputs: ['handleAuthStateChange', 'user'] })],
    AmplifyVerifyContact
  );
  return AmplifyVerifyContact;
})();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
defineCustomElements(window);
/** @type {?} */
var DECLARATIONS = [
  AmplifyAmazonButton,
  AmplifyAuth0Button,
  AmplifyAuthenticator,
  AmplifyAuthContainer,
  AmplifyAuthFields,
  AmplifyButton,
  AmplifyChatbot,
  AmplifyCheckbox,
  AmplifyCodeField,
  AmplifyConfirmSignIn,
  AmplifyConfirmSignUp,
  AmplifyContainer,
  AmplifyCountryDialCode,
  AmplifyEmailField,
  AmplifyFacebookButton,
  AmplifyFederatedButtons,
  AmplifyFederatedSignIn,
  AmplifyForgotPassword,
  AmplifyFormField,
  AmplifyFormSection,
  AmplifyGoogleButton,
  AmplifyGreetings,
  AmplifyHint,
  AmplifyIcon,
  AmplifyIconButton,
  AmplifyInput,
  AmplifyLabel,
  AmplifyLink,
  AmplifyLoadingSpinner,
  AmplifyNav,
  AmplifyOauthButton,
  AmplifyPasswordField,
  AmplifyPhoneField,
  AmplifyPhotoPicker,
  AmplifyPicker,
  AmplifyRadioButton,
  AmplifyRequireNewPassword,
  AmplifyS3Album,
  AmplifyS3Image,
  AmplifyS3ImagePicker,
  AmplifyS3Text,
  AmplifyS3TextPicker,
  AmplifySection,
  AmplifySelect,
  AmplifySelectMfaType,
  AmplifySignIn,
  AmplifySignInButton,
  AmplifySignOut,
  AmplifySignUp,
  AmplifyStrike,
  AmplifyToast,
  AmplifyTooltip,
  AmplifyTotpSetup,
  AmplifyUsernameField,
  AmplifyVerifyContact,
];
var AmplifyUIAngularModule = /** @class */ (function () {
  function AmplifyUIAngularModule() {}
  AmplifyUIAngularModule.decorators = [
    {
      type: NgModule,
      args: [
        {
          declarations: DECLARATIONS,
          exports: DECLARATIONS,
          imports: [],
          providers: [],
        },
      ],
    },
  ];
  /** @nocollapse */ AmplifyUIAngularModule.ɵmod = ɵɵdefineNgModule({
    type: AmplifyUIAngularModule,
  });
  /** @nocollapse */ AmplifyUIAngularModule.ɵinj = ɵɵdefineInjector({
    factory: function AmplifyUIAngularModule_Factory(t) {
      return new (t || AmplifyUIAngularModule)();
    },
    providers: [],
    imports: [[]],
  });
  return AmplifyUIAngularModule;
})();
(function () {
  (typeof ngJitMode === 'undefined' || ngJitMode) &&
    ɵɵsetNgModuleScope(AmplifyUIAngularModule, {
      declarations: [
        AmplifyAmazonButton,
        AmplifyAuth0Button,
        AmplifyAuthenticator,
        AmplifyAuthContainer,
        AmplifyAuthFields,
        AmplifyButton,
        AmplifyChatbot,
        AmplifyCheckbox,
        AmplifyCodeField,
        AmplifyConfirmSignIn,
        AmplifyConfirmSignUp,
        AmplifyContainer,
        AmplifyCountryDialCode,
        AmplifyEmailField,
        AmplifyFacebookButton,
        AmplifyFederatedButtons,
        AmplifyFederatedSignIn,
        AmplifyForgotPassword,
        AmplifyFormField,
        AmplifyFormSection,
        AmplifyGoogleButton,
        AmplifyGreetings,
        AmplifyHint,
        AmplifyIcon,
        AmplifyIconButton,
        AmplifyInput,
        AmplifyLabel,
        AmplifyLink,
        AmplifyLoadingSpinner,
        AmplifyNav,
        AmplifyOauthButton,
        AmplifyPasswordField,
        AmplifyPhoneField,
        AmplifyPhotoPicker,
        AmplifyPicker,
        AmplifyRadioButton,
        AmplifyRequireNewPassword,
        AmplifyS3Album,
        AmplifyS3Image,
        AmplifyS3ImagePicker,
        AmplifyS3Text,
        AmplifyS3TextPicker,
        AmplifySection,
        AmplifySelect,
        AmplifySelectMfaType,
        AmplifySignIn,
        AmplifySignInButton,
        AmplifySignOut,
        AmplifySignUp,
        AmplifyStrike,
        AmplifyToast,
        AmplifyTooltip,
        AmplifyTotpSetup,
        AmplifyUsernameField,
        AmplifyVerifyContact,
      ],
      exports: [
        AmplifyAmazonButton,
        AmplifyAuth0Button,
        AmplifyAuthenticator,
        AmplifyAuthContainer,
        AmplifyAuthFields,
        AmplifyButton,
        AmplifyChatbot,
        AmplifyCheckbox,
        AmplifyCodeField,
        AmplifyConfirmSignIn,
        AmplifyConfirmSignUp,
        AmplifyContainer,
        AmplifyCountryDialCode,
        AmplifyEmailField,
        AmplifyFacebookButton,
        AmplifyFederatedButtons,
        AmplifyFederatedSignIn,
        AmplifyForgotPassword,
        AmplifyFormField,
        AmplifyFormSection,
        AmplifyGoogleButton,
        AmplifyGreetings,
        AmplifyHint,
        AmplifyIcon,
        AmplifyIconButton,
        AmplifyInput,
        AmplifyLabel,
        AmplifyLink,
        AmplifyLoadingSpinner,
        AmplifyNav,
        AmplifyOauthButton,
        AmplifyPasswordField,
        AmplifyPhoneField,
        AmplifyPhotoPicker,
        AmplifyPicker,
        AmplifyRadioButton,
        AmplifyRequireNewPassword,
        AmplifyS3Album,
        AmplifyS3Image,
        AmplifyS3ImagePicker,
        AmplifyS3Text,
        AmplifyS3TextPicker,
        AmplifySection,
        AmplifySelect,
        AmplifySelectMfaType,
        AmplifySignIn,
        AmplifySignInButton,
        AmplifySignOut,
        AmplifySignUp,
        AmplifyStrike,
        AmplifyToast,
        AmplifyTooltip,
        AmplifyTotpSetup,
        AmplifyUsernameField,
        AmplifyVerifyContact,
      ],
    });
})();

export {
  AmplifyAmazonButton,
  AmplifyAuth0Button,
  AmplifyAuthContainer,
  AmplifyAuthFields,
  AmplifyAuthenticator,
  AmplifyButton,
  AmplifyChatbot,
  AmplifyCheckbox,
  AmplifyCodeField,
  AmplifyConfirmSignIn,
  AmplifyConfirmSignUp,
  AmplifyContainer,
  AmplifyCountryDialCode,
  AmplifyEmailField,
  AmplifyFacebookButton,
  AmplifyFederatedButtons,
  AmplifyFederatedSignIn,
  AmplifyForgotPassword,
  AmplifyFormField,
  AmplifyFormSection,
  AmplifyGoogleButton,
  AmplifyGreetings,
  AmplifyHint,
  AmplifyIcon,
  AmplifyIconButton,
  AmplifyInput,
  AmplifyLabel,
  AmplifyLink,
  AmplifyLoadingSpinner,
  AmplifyNav,
  AmplifyOauthButton,
  AmplifyPasswordField,
  AmplifyPhoneField,
  AmplifyPhotoPicker,
  AmplifyPicker,
  AmplifyRadioButton,
  AmplifyRequireNewPassword,
  AmplifyS3Album,
  AmplifyS3Image,
  AmplifyS3ImagePicker,
  AmplifyS3Text,
  AmplifyS3TextPicker,
  AmplifySection,
  AmplifySelect,
  AmplifySelectMfaType,
  AmplifySignIn,
  AmplifySignInButton,
  AmplifySignOut,
  AmplifySignUp,
  AmplifyStrike,
  AmplifyToast,
  AmplifyTooltip,
  AmplifyTotpSetup,
  AmplifyUIAngularModule,
  AmplifyUsernameField,
  AmplifyVerifyContact,
  ProxyCmp,
  proxyInputs,
  proxyMethods,
  proxyOutputs,
};
