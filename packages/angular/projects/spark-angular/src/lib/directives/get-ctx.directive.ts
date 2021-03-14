import {
  ContentChild,
  Directive,
  ElementRef,
  Input,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: '[getCtx]',
})
export class GetCtxDirective {
  constructor(public template: TemplateRef<any>) {}
  public name: string;

  @Input() set getCtx(component: string) {
    this.name = component;
    console.log(this.template.elementRef);
  }
}
