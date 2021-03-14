import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[override]',
})
export class OverrideDirective {
  constructor() {
    console.log('overrideDirective');
  }

  @Input() component: string;
}
