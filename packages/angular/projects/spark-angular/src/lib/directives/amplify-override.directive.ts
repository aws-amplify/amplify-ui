import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[amplifyOverride]',
})
export class AmplifyOverrideDirective {
  constructor(public template: TemplateRef<any>) {}
  private name: string;

  @Input() set amplifyOverride(component: string) {
    this.name = component;
  }

  get getName() {
    return this.name;
  }
}
