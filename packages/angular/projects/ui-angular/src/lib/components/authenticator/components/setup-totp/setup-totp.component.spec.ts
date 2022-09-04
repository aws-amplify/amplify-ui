import { AuthenticatorService } from '../../../../services/authenticator.service';
import { SetupTotpComponent } from './setup-totp.component';
import { AmplifySlotComponent } from '../../../../utilities/amplify-slot/amplify-slot.component';
import { ErrorComponent } from '../../../../primitives/error/error.component';
import { BaseFormFieldsComponent } from '../base-form-fields/base-form-fields.component';
import { FormFieldComponent } from '../form-field/form-field.component';
import { ButtonComponent } from '../../../../primitives/button/button.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import QRCode from 'qrcode';
import { Auth } from 'aws-amplify';
import { MockComponent } from 'ng-mocks';
import { getTotpCode } from '@aws-amplify/ui';

const mockUser = { username: 'username' };
const mockContext = {
  country_code: '100',
  formFields: { setupTOTP: { QR: null } },
  user: mockUser,
};

const DEFAULT_TOTP_ISSUER = 'AWSCognito';
const SECRET_KEY = 'secretKey';

const setupTOTPSpy = jest.spyOn(Auth, 'setupTOTP');

const toDataURLSpy = jest.spyOn(QRCode, 'toDataURL');

describe('SetupTotpComponent', () => {
  let fixture: ComponentFixture<SetupTotpComponent>;
  let component: SetupTotpComponent;

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
    };

    await TestBed.configureTestingModule({
      declarations: [
        SetupTotpComponent,
        ErrorComponent,
        AmplifySlotComponent,
        BaseFormFieldsComponent,
        ButtonComponent,
        MockComponent(FormFieldComponent),
      ],
      providers: [
        { provide: AuthenticatorService, useValue: mockAuthenticatorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SetupTotpComponent);
    component = fixture.componentInstance;
  });
  it('successfully mounts', () => {
    expect(fixture).toBeTruthy();
  });

  it('validate generateQR Code generates correct code', async () => {
    setupTOTPSpy.mockResolvedValue(SECRET_KEY);
    const defaultTotpCode = getTotpCode(
      DEFAULT_TOTP_ISSUER,
      mockUser.username,
      SECRET_KEY
    );
    await fixture.detectChanges();

    expect(setupTOTPSpy).toHaveBeenCalledTimes(1);
    expect(setupTOTPSpy).toHaveBeenCalledWith(mockUser);

    await fixture.detectChanges();

    expect(toDataURLSpy).toHaveBeenCalledTimes(1);
    expect(toDataURLSpy).toHaveBeenCalledWith(defaultTotpCode);
  });

  describe('QR Tests', () => {
    it('handles customTotpIssuer with spaces', () => {
      const customTotpIssuer = 'customTOTPIssuer spaces';
      const customTotpUsername = 'customTotpUsername';
      const SECRET_KEY = 'secretKey';

      const customTotpCode = getTotpCode(
        customTotpIssuer,
        customTotpUsername,
        SECRET_KEY
      );

      expect(customTotpCode).toBe(
        'otpauth://totp/customTOTPIssuer%20spaces:customTotpUsername?secret=secretKey&issuer=customTOTPIssuer%20spaces'
      );
    });
  });
});
