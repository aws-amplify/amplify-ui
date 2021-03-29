import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[amplifyOverride]',
})
export class AmplifyOverrideDirective {
  constructor(public template: TemplateRef<any>) {}
  public name: string;

  @Input() set amplifyOverride(component: string) {
    this.name = component;
  }
}
