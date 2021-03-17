import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { defaultStyle } from './styles';
import { mergeDeep } from '../common/utils';
@Component({
  selector: 'spark-context-provider',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./spark-context-provider.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SparkContextProviderComponent implements OnInit {
  @HostBinding('attr.data-spark-theme') dataAttr = '';
  @Input() customStyle: object = {};
  private style: object = {};
  get getStyle(): Record<string, any> {
    return this.style;
  }
  ngOnInit(): void {
    this.style = mergeDeep(defaultStyle, this.customStyle);
  }
}
