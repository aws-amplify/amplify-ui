import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { AttributeInfo, AuthAttribute, getAttributeMap } from '../../common';
import { getErrorMessage } from './validation-error-messages';

@Component({
  selector: 'amplify-validation-error',
  templateUrl: './amplify-validation-error.component.html'
})
export class AmplifyValidationErrorComponent implements OnInit {
  @Input() errors: ValidationErrors;
  constructor() {}

  get attributeMap(): Record<AuthAttribute, AttributeInfo> {
    return getAttributeMap();
  }

  ngOnInit(): void {}

  public getErrorMessages(): string[] {
    if (!this.errors || this.errors === {}) return null;

    const errorMessages: string[] = [];
    for (const [errorName, errorInfo] of Object.entries(this.errors)) {
      errorMessages.push(getErrorMessage(errorName, errorInfo));
    }

    return errorMessages;
  }
}
