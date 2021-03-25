import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ComponentsProviderService } from '../../services/components-provider.service';
import { StateMachineService } from '../../services/state-machine.service';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AmplifySignInComponent implements AfterContentInit {
  @HostBinding('attr.data-spark-sign-in') dataAttr = '';
  @Input() public headerText = 'Sign in to your account';
  public loading = false;
  public customComponents: Record<string, TemplateRef<any>> = {};
  public context = {
    $implicit: {},
  };
  public signInForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private stateMachine: StateMachineService,
    private componentsProvider: ComponentsProviderService
  ) {}

  ngAfterContentInit(): void {
    this.customComponents = this.componentsProvider.customComponents;
  }

  toSignUp(): void {
    this.stateMachine.authState = 'signUp';
  }

  async onSubmit(): Promise<void> {
    console.log(this.signInForm.status);
    if (this.signInForm.status !== 'VALID') return;
    this.loading = true;
    try {
      await Auth.signIn(
        this.signInForm.value.username,
        this.signInForm.value.password
      );
      this.stateMachine.authState = 'signedIn';
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
}
