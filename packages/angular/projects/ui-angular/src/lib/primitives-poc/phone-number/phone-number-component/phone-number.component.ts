import {
  AfterContentInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { countryDialCodes } from '@aws-amplify/ui';
import { nanoid } from 'nanoid';
import { PhoneNumberDirective } from '../phone-number-directive/phone-number.directive';

const $COMPONENT_SELECTOR: string = 'amplify-phone-number-field-poc';
@Component({
  selector: $COMPONENT_SELECTOR,
  templateUrl: 'phone-number.component.html',
})
export class AmplifyPhoneNumberFieldComponent implements AfterContentInit {
  @Input() describedBy: string;
  @Input() labelHidden: boolean = false;
  @Input() hasError: boolean = false;
  @Input() defaultCountryCode: string = '+1';

  @ContentChild(PhoneNumberDirective) childInput: PhoneNumberDirective;

  public inputId = '';
  public countryCodeId = `amplify-field-${nanoid(12)}`;
  public countryCode = countryDialCodes;
  selectedOption: string = '';
  @Output() countryCodeChange = new EventEmitter<any>();

  constructor() {}

  ngAfterContentInit(): void {
    // getting data from child input
    this.inputId = this.childInput?.id;
    // send data to child input
    // note: this is still not dynamic, so we still need a change detction strategy here.
    // this can be implemented later for the purpose of POC.
    this.childInput.hasError = this.hasError;
    this.childInput.ariaDescribedBy = this.describedBy;
  }
  onCodeChange(value) {
    this.countryCodeChange.emit(value);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('valuy ', this.defaultCountryCode);
    for (const key in changes) {
      if (
        this.childInput &&
        key === 'hasError' &&
        changes[key].currentValue !== changes[key].previousValue
      ) {
        this.childInput.hasError = this.hasError;
      }
      if (
        this.childInput &&
        key === 'describedBy' &&
        changes[key].currentValue !== changes[key].previousValue
      ) {
        this.childInput.ariaDescribedBy = this.describedBy;
      }
    }
  }
}
