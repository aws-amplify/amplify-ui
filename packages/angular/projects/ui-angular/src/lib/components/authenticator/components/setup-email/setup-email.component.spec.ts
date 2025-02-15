import { fireEvent, render, screen } from '@testing-library/angular';

import { AuthenticatorService } from '../../../../services/authenticator.service';

import { SetupEmailComponent } from './setup-email.component';
import { AmplifySlotComponent } from '../../../../utilities/amplify-slot/amplify-slot.component';
import { BaseFormFieldsComponent } from '../base-form-fields/base-form-fields.component';
import { AuthActorContext } from '@aws-amplify/ui';
import { FormFieldComponent } from '../form-field/form-field.component';
import { ButtonComponent } from '../../../../primitives/button/button.component';
import { ErrorComponent } from '../../../../primitives/error/error.component';
import { TextFieldComponent } from '../../../../primitives/text-field/text-field.component';
import { RadioGroupFieldComponent } from '../../../../primitives/radio-group-field/radio-group-field.component';

const fieldLabel = 'Setup Email';
const fieldInput = { name: 'email', value: 'jjarvisp@amazon.com' };

const mockContext: Partial<AuthActorContext> = {
  challengeName: 'MFA_SETUP',
  formFields: {
    setupEmail: {
      email: {
        label: fieldLabel,
        type: 'text',
      },
    },
  },
};

const mockAuthenticatorService = {
  isPending: false,
  authState: {
    context: {
      actorRef: { getSnapshot: () => ({ context: { ...mockContext } }) },
    },
  },
  updateForm: jest.fn(),
  submitForm: jest.fn(),
  toSignIn: jest.fn(),
  validationErrors: {},
  error: undefined,
};

const componentDeclarations = [
  ErrorComponent,
  SetupEmailComponent,
  AmplifySlotComponent,
  BaseFormFieldsComponent,
  FormFieldComponent,
  ButtonComponent,
  TextFieldComponent,
  RadioGroupFieldComponent,
];

jest.mock('nanoid', () => ({ nanoid: jest.fn(() => 'static') }));

describe('SetupEmailComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', async () => {
    const { container } = await render(SetupEmailComponent, {
      declarations: componentDeclarations,
      providers: [
        {
          provide: AuthenticatorService,
          useValue: mockAuthenticatorService,
        },
      ],
    });

    expect(container).toMatchSnapshot();
  });

  it('sends change event on form input', async () => {
    await render(SetupEmailComponent, {
      declarations: componentDeclarations,
      providers: [
        {
          provide: AuthenticatorService,
          useValue: mockAuthenticatorService,
        },
      ],
    });

    const emailField = await screen.findByLabelText(fieldLabel);

    fireEvent.input(emailField, { target: fieldInput });

    expect(mockAuthenticatorService.updateForm).toHaveBeenCalledWith(
      fieldInput
    );
  });

  it('sends submit event on form submit', async () => {
    await render(SetupEmailComponent, {
      declarations: componentDeclarations,
      providers: [
        {
          provide: AuthenticatorService,
          useValue: mockAuthenticatorService,
        },
      ],
    });

    const emailField = await screen.findByLabelText(fieldLabel);

    fireEvent.input(emailField, { target: fieldInput });

    expect(mockAuthenticatorService.updateForm).toHaveBeenCalledWith(
      fieldInput
    );

    const submitButton = await screen.findByRole('button', { name: 'Confirm' });

    fireEvent.click(submitButton);

    expect(mockAuthenticatorService.submitForm).toHaveBeenCalledTimes(1);
  });

  it('displays and error if present', async () => {
    await render(SetupEmailComponent, {
      declarations: componentDeclarations,
      providers: [
        {
          provide: AuthenticatorService,
          useValue: { ...mockAuthenticatorService, error: 'mockError' },
        },
      ],
    });

    const mockError = await screen.findByText('mockError');

    expect(mockError).toBeInTheDocument();
  });

  it('handles back to sign in button as expected', async () => {
    await render(SetupEmailComponent, {
      declarations: componentDeclarations,
      providers: [
        {
          provide: AuthenticatorService,
          useValue: mockAuthenticatorService,
        },
      ],
    });

    const backToSignInButton = await screen.findByRole('button', {
      name: 'Back to Sign In',
    });

    fireEvent.click(backToSignInButton);

    expect(mockAuthenticatorService.toSignIn).toHaveBeenCalledTimes(1);
  });

  it('disables the submit button if confirmation is pending', async () => {
    await render(SetupEmailComponent, {
      declarations: componentDeclarations,
      providers: [
        {
          provide: AuthenticatorService,
          useValue: { ...mockAuthenticatorService, isPending: true },
        },
      ],
    });

    const submitButton = await screen.findByRole('button', { name: 'Confirm' });

    expect(submitButton).toBeDisabled();
  });
});
