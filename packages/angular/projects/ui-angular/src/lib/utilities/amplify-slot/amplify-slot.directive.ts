import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[amplifySlot]',
})
export class AmplifySlotDirective {
  constructor(public template: TemplateRef<unknown>) {}
  public name: string;

  @Input() set amplifySlot(component: string) {
    this.name = component;
  }
}
