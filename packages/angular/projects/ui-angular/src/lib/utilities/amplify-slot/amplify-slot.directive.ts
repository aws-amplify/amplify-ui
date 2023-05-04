import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[amplifySlot]',
})
export class AmplifySlotDirective {
  public name: string;

  constructor(public template: TemplateRef<unknown>) {}

  @Input() set amplifySlot(component: string) {
    this.name = component;
  }
}
