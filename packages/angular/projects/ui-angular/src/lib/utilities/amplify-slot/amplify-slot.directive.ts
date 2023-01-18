import { Directive, Input, OnInit, TemplateRef } from '@angular/core';

@Directive({
  selector: '[amplifySlot]',
})
export class AmplifySlotDirective implements OnInit {
  constructor(public template: TemplateRef<any>) {}
  public name!: string;

  ngOnInit(): void {
    if (!this.name) {
      throw new Error('[amplifySlot] directive requires `name` to be defined.');
    }
  }

  @Input() set amplifySlot(component: string) {
    this.name = component;
  }
}
