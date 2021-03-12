import { Component, Input, OnInit } from '@angular/core';
import { defaultStyle } from './styles';
import { mergeDeep } from '../common/utils';
@Component({
  selector: 'spark-context-provider',
  template: `<ng-content></ng-content>`,
  styles: [],
})
export class SparkContextProviderComponent implements OnInit {
  @Input() customStyle: object = {};
  private style: object = {};
  get getStyle(): Record<string, any> {
    return this.style;
  }
  ngOnInit(): void {
    this.style = mergeDeep(defaultStyle, this.customStyle);
  }
}
