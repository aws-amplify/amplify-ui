import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import {
  FormFieldComponents,
  FormFieldsArray,
  getSortedFormFields,
} from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';

/**
 * Sorts the given formFields, then renders them in order.
 */
@Component({
  selector: 'amplify-base-form-fields',
  standalone: false,
  templateUrl: './base-form-fields.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BaseFormFieldsComponent implements OnInit {
  @Input() route: FormFieldComponents; // formFields to sort and render
  @HostBinding('style.display') display = 'contents';
  public formFields: FormFieldsArray = [];

  private authenticator = inject(AuthenticatorService);

  ngOnInit(): void {
    const state = this.authenticator.authState;
    this.formFields = getSortedFormFields(this.route, state);
  }
}
