import { Component, Input } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AuthenticatorComponent } from './authenticator.component';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { AmplifySlotComponent } from '../../../../utilities/amplify-slot/amplify-slot.component';
import { TabsComponent } from '../../../../primitives/tabs/tabs.component';
import { TabItemComponent } from '../../../../primitives/tab-item/tab-item.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { BaseFormFieldsComponent } from '../base-form-fields/base-form-fields.component';
import { ButtonComponent } from '../../../../primitives/button/button.component';
import { ErrorComponent } from '../../../../primitives/error/error.component';
import { TextFieldComponent } from '../../../../primitives/text-field/text-field.component';
import { PasswordFieldComponent } from '../../../../primitives/password-field/password-field.component';

@Component({
  selector: 'amplify-form-field',
  template: '<div></div>',
  standalone: false,
})
class MockFormFieldComponent {
  @Input() name: string;
  @Input() formField: any;
}

@Component({
  selector: 'amplify-federated-sign-in',
  template: '',
  standalone: false,
})
class MockFederatedSignInComponent {}

describe('AuthenticatorComponent', () => {
  let fixture: ComponentFixture<AuthenticatorComponent>;
  let mockAuthService: Record<string, unknown>;
  let machineSubscriber: () => void;

  beforeEach(async () => {
    machineSubscriber = () => undefined;

    mockAuthService = {
      route: 'setup',
      isPending: false,
      error: undefined,
      authState: {
        context: { actorRef: { getSnapshot: () => ({ context: {} }) } },
      },
      authStatus: 'unauthenticated',
      hubSubject: { subscribe: jest.fn() },
      slotContext: {},
      context: {},
      initializeMachine: jest.fn(),
      subscribe: jest.fn((callback: () => void) => {
        machineSubscriber = callback;
        return { unsubscribe: jest.fn() };
      }),
      updateForm: jest.fn(),
      submitForm: jest.fn(),
      toSignIn: jest.fn(),
      toSignUp: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [
        AuthenticatorComponent,
        AmplifySlotComponent,
        TabsComponent,
        TabItemComponent,
        SignInComponent,
        SignUpComponent,
        BaseFormFieldsComponent,
        ButtonComponent,
        ErrorComponent,
        TextFieldComponent,
        PasswordFieldComponent,
        MockFormFieldComponent,
        MockFederatedSignInComponent,
      ],
      providers: [{ provide: AuthenticatorService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticatorComponent);
  });

  it('should mount successfully', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('initializes the machine once it reaches the setup route', () => {
    fixture.detectChanges(); // triggers ngOnInit -> subscribe
    expect(mockAuthService['subscribe']).toHaveBeenCalled();

    // machine emits while in 'setup'
    machineSubscriber();
    expect(mockAuthService['initializeMachine']).toHaveBeenCalledTimes(1);
  });

  it('renders the sign-in route when the machine transitions to signIn', () => {
    fixture.detectChanges();

    // transition machine to signIn and notify subscribers
    mockAuthService['route'] = 'signIn';
    machineSubscriber();

    const el: HTMLElement = fixture.nativeElement;
    // The authenticator container and sign-in component should now be rendered.
    // This regression-guards against the view staying empty when the machine
    // transitions without a zone-triggered change detection (Angular v22+).
    expect(el.querySelector('[data-amplify-authenticator]')).toBeTruthy();
    expect(el.querySelector('amplify-sign-in')).toBeTruthy();
  });
});
