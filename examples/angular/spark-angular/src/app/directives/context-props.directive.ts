import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[contextProps]',
})
export class ContextPropsDirective<TImplicitContext = any> {
  constructor(public template: TemplateRef<{ $implicit: TImplicitContext }>) {}
  public name = 'test';
}
