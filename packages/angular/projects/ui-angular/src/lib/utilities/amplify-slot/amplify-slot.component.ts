import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  TemplateRef,
} from '@angular/core';
import { CustomComponentsService } from '../../services/custom-components.service';

@Component({
  selector: 'amplify-slot',
  templateUrl: './amplify-slot.component.html',
})
export class AmplifySlotComponent implements AfterContentInit {
  @Input() name: string;
  @Input() context: Record<PropertyKey, unknown>;

  @HostBinding('style.display') display = 'contents';

  public overridingComponent: TemplateRef<unknown>;
  public isOverriden = false;

  constructor(private propService: CustomComponentsService) {}

  ngAfterContentInit(): void {
    const { customComponents } = this.propService;
    const overridingComponent = customComponents[this.name];

    if (overridingComponent) {
      this.overridingComponent = overridingComponent;
      this.isOverriden = true;
    }
  }
}
