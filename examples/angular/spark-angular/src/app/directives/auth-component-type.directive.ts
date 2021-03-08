import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AmplifyAuthenticatorComponent } from '../components/amplify-authenticator/amplify-authenticator.component';

@Directive({
  selector: '[authComponent]',
})
export class AuthComponentTypeDirective {
  constructor(
    private authenticator: AmplifyAuthenticatorComponent,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set authComponent(name: string) {
    console.log(name, this.templateRef, this.authenticator.getAuthState);
    if (!name || name !== this.authenticator.getAuthState) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
