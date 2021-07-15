import { Component } from '@angular/core';
import { StateMachineService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-custom-form-authenticator',
  templateUrl: './custom-form-authenticator.component.html',
  styleUrls: ['./custom-form-authenticator.component.css'],
})
export class CustomFormAuthenticatorComponent {
  constructor(private authService: StateMachineService) {}
  public error = {
    passwordMismatch: true,
  };

  public onInput($event) {
    const { password, confirm_password } = $event;
    console.log(password, confirm_password);
    if (!password || !confirm_password || password !== confirm_password) {
      this.error.passwordMismatch = true;
    } else {
      this.error.passwordMismatch = false;
    }
  }

  public onSubmit(formData) {
    const { submit } = this.authService.services;
    delete formData.confirm_password;
    if (!this.error.passwordMismatch) submit(formData);
  }
}
