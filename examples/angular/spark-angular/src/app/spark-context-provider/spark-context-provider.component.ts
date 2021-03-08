import { Component, ContentChild, OnInit } from '@angular/core';
import { ContextPropsDirective } from '../directives/context-props.directive';

@Component({
  selector: 'spark-context-provider',
  template: `<ng-content></ng-content>`,
  styles: [],
})
export class SparkContextProviderComponent {
  constructor() {}
}
