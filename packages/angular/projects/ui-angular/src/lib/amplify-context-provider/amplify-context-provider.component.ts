import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'amplify-context-provider',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
})
export class AmplifyContextProviderComponent {
  @HostBinding('attr.data-ui-theme') themeAttr = '';
}
