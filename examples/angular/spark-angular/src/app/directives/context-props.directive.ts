import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[contextProps]',
})
export class ContextPropsDirective<TImplicitContext = any> {
  constructor(
    private viewContainer: ViewContainerRef,
    public template: TemplateRef<{ $implicit: TImplicitContext }>
  ) {}
  @Input() contextProps() {
    this.viewContainer.createEmbeddedView(this.template);
  }
}
