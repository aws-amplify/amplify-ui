import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { CustomComponentsService } from '../../services/custom-components.service';

@Component({
  selector: 'amplify-slot',
  templateUrl: './amplify-slot.component.html',
})
export class AmplifySlotComponent implements AfterContentInit, OnInit {
  @Input() name!: string;
  @Input() context?: Record<PropertyKey, any>;

  @HostBinding('style.display') display = 'contents';

  public overridingComponent?: TemplateRef<any>;
  public isOverriden: boolean = false;

  constructor(private propService: CustomComponentsService) {}

  ngOnInit(): void {
    if (!this.name) {
      throw new Error('<amplify-slot> requires `name` to be defined.');
    }
  }

  ngAfterContentInit(): void {
    const customComponents = this.propService.customComponents;
    const overridingComponent = customComponents[this.name];

    if (overridingComponent) {
      this.overridingComponent = overridingComponent;
      this.isOverriden = true;
    }
  }
}
