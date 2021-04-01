import { Auth, Logger } from 'aws-amplify';
import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  InputErrors,
  mapInputErrors,
  noWhitespacesAfterTrim
} from '../../common';
import { ComponentsProviderService, StateMachineService } from '../../services';
import { State, Subscription, Event } from 'xstate';

const logger = new Logger('SignUp');
@Component({
  selector: 'amplify-sign-up',
  templateUrl: './amplify-sign-up.component.html'
})
export class AmplifySignUpComponent
  implements AfterContentInit, OnInit, OnDestroy {
  @Input() headerText = 'Create a new account';
  @HostBinding('attr.data-ui-sign-up') dataAttr = '';
  private authSubscription: Subscription;
  public customComponents: Record<string, TemplateRef<any>>;
  public loading = false;
  public inputErrors: InputErrors;
  public formError: string;
  public context = {
    $implicit: {
      signUp: () => {
        console.log('to be implemented');
      }
    }
  };
  public formGroup = this.fb.group({
    username: ['', [Validators.required, noWhitespacesAfterTrim]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required, noWhitespacesAfterTrim]],
    phone_number: ['', [Validators.required, noWhitespacesAfterTrim]]
  });

  constructor(
    private fb: FormBuilder,
    private stateMachine: StateMachineService,
    private componentsProvider: ComponentsProviderService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.stateMachine.authService.subscribe(state =>
      this.onStateUpdate(state)
    );
  }

  ngAfterContentInit(): void {
    this.customComponents = this.componentsProvider.customComponents;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  private onStateUpdate(state: State<any>): void {
    if (state.event.type.includes('error')) {
      this.formError = (state.event as any).data.message;
      this.loading = false;
    }
  }

  send(event: Event<any>): void {
    this.stateMachine.authService.send(event);
  }

  async onSubmit($event): Promise<void> {
    const formData = new FormData($event.target);
    const formValues = Object.fromEntries(formData.entries());
    logger.log('Sign up form submitted with', formValues);

    // map validation errors, to be shown each respective inputs
    this.inputErrors = mapInputErrors(this.formGroup.controls);

    if (this.formGroup.status !== 'VALID') return;
    this.loading = true;

    this.send({
      type: 'SUBMIT',
      data: formValues
    });
  }

  toSignIn(): void {
    this.stateMachine.authService.send('SIGN_IN');
  }
}
