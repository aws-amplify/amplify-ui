import {
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { StyleProvider } from './styles';
@Component({
  selector: 'spark-context-provider',
  template: `<ng-content></ng-content>`,
  styles: [],
})
export class SparkContextProviderComponent {
  @Input() style: object = {};
  get getComputedStyle() {
    return { ...StyleProvider, ...this.style };
  }
  constructor() {}
}
