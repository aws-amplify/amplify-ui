import { AuthenticatorService } from '../../../../services/authenticator.service';
import { SetupTotpComponent } from './setup-totp.component';
import { AmplifySlotComponent } from '../../../../utilities/amplify-slot/amplify-slot.component';
import { ErrorComponent } from '../../../../primitives/error/error.component';
import { BaseFormFieldsComponent } from '../base-form-fields/base-form-fields.component';
import { ButtonComponent } from '../../../../primitives/button/button.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'amplify-form-field',
  template: '<div></div>',
  standalone: false,
})
class MockFormFieldComponent {
  @Input() name: string;
  @Input() formField: any;
}

const mockUser = { username: 'username' };
const mockContext = {
  country_code: '100',
  formFields: { setupTotp: { QR: null } },
  user: mockUser,
};

describe('SetupTotpComponent', () => {
  let fixture: ComponentFixture<SetupTotpComponent>;

  beforeEach(async () => {
    jest.resetAllMocks();

    const mockAuthenticatorService = {
      _state: {},
      isPending: false,
      authState: {
        context: {
          actorRef: { getSnapshot: () => ({ context: { ...mockContext } }) },
        },
      },
      updateForm: jest.fn(),
      submitForm: jest.fn(),
      context: jest.fn().mockReturnValue({}),
      slotContext: jest.fn().mockReturnValue({}),
      totpSecretCode: 'Keep it quiet!',
    };

    await TestBed.configureTestingModule({
      declarations: [
        SetupTotpComponent,
        ErrorComponent,
        AmplifySlotComponent,
        BaseFormFieldsComponent,
        ButtonComponent,
        MockFormFieldComponent,
      ],
      providers: [
        { provide: AuthenticatorService, useValue: mockAuthenticatorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SetupTotpComponent);
  });

  it('successfully mounts', () => {
    expect(fixture).toBeTruthy();
  });
});
