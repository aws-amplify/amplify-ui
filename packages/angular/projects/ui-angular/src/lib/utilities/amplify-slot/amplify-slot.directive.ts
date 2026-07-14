import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[amplifySlot]',
  standalone: false,
})
export class AmplifySlotDirective {
  template = inject<TemplateRef<unknown>>(TemplateRef);

  public name: string;

  @Input() set amplifySlot(component: string) {
    this.name = component;
  }
}
