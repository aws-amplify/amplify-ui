import { AfterContentInit, Component, Input, TemplateRef } from '@angular/core';
import { AuthPropService } from '../../services/authenticator-context.service';

@Component({
  selector: 'amplify-slot',
  templateUrl: './amplify-slot.component.html',
})
export class AmplifySlotComponent implements AfterContentInit {
  @Input() name: string;
  @Input() context: Record<PropertyKey, any>;

  public overridingComponent: TemplateRef<any>;
  public isOverriden: boolean = false;

  constructor(private propService: AuthPropService) {}

  ngAfterContentInit(): void {
    const customComponents = this.propService.customComponents;
    const overridingComponent = customComponents[this.name];

    if (overridingComponent) {
      this.overridingComponent = overridingComponent;
      this.isOverriden = true;
    }
  }
}
