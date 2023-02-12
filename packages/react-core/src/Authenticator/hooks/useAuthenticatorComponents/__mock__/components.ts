import {
  HeaderComponent,
  FooterComponent,
  FormFieldsComponent,
  RouteComponentsDefaults,
  RouteComponentsOverrides,
} from '../types';

type MockRadioFieldsProp = { fields: { type: 'radio' }[] };
type MockTextFieldsProp = { fields: { type: 'text' }[] };

type MockFooterComponent = FooterComponent;
type MockHeaderComponent = HeaderComponent;
type MockTextFormFieldsComponent = FormFieldsComponent<MockTextFieldsProp>;
type MockRadioFormFieldsComponent = FormFieldsComponent<MockRadioFieldsProp>;

interface MockTextRouteComponentProps extends MockTextFieldsProp {
  Footer: MockFooterComponent;
  FormFields: MockTextFormFieldsComponent;
  Header: MockHeaderComponent;
}

interface MockComponentsProps {
  ConfirmResetPassword: MockTextRouteComponentProps;
  ConfirmSignIn: MockTextRouteComponentProps;
  ConfirmSignUp: MockTextRouteComponentProps;
  ConfirmVerifyUser: MockTextRouteComponentProps;
  ForceNewPassword: MockTextRouteComponentProps;
  ResetPassword: MockTextRouteComponentProps;
  SetupTOTP: MockTextRouteComponentProps;
  SignIn: MockTextRouteComponentProps;
  SignUp: MockTextRouteComponentProps;
  VerifyUser: MockRadioFieldsProp & {
    Footer: MockFooterComponent;
    FormFields: MockRadioFormFieldsComponent;
    Header: MockHeaderComponent;
  };
}

type MockDefaults = RouteComponentsDefaults<MockComponentsProps>;

const MockFooter = () => null;
const MockTextFormFields: MockTextFormFieldsComponent = () => null;
const MockRadioFormFields: MockRadioFormFieldsComponent = () => null;
const MockHeader: MockHeaderComponent = () => null;

const ConfirmResetPassword: MockDefaults['ConfirmResetPassword'] = () => null;
ConfirmResetPassword.Footer = MockFooter;
ConfirmResetPassword.FormFields = MockTextFormFields;
ConfirmResetPassword.Header = MockHeader;

const ConfirmSignIn: MockDefaults['ConfirmSignIn'] = () => null;
ConfirmSignIn.Footer = MockFooter;
ConfirmSignIn.FormFields = MockTextFormFields;
ConfirmSignIn.Header = MockHeader;

const ConfirmSignUp: MockDefaults['ConfirmSignUp'] = () => null;
ConfirmSignUp.Footer = MockFooter;
ConfirmSignUp.FormFields = MockTextFormFields;
ConfirmSignUp.Header = MockHeader;

const ConfirmVerifyUser: MockDefaults['ConfirmVerifyUser'] = () => null;
ConfirmVerifyUser.Footer = MockFooter;
ConfirmVerifyUser.FormFields = MockTextFormFields;
ConfirmVerifyUser.Header = MockHeader;

const ForceNewPassword: MockDefaults['ForceNewPassword'] = () => null;
ForceNewPassword.Footer = MockFooter;
ForceNewPassword.FormFields = MockTextFormFields;
ForceNewPassword.Header = MockHeader;

const ResetPassword: MockDefaults['ResetPassword'] = () => null;
ResetPassword.Footer = MockFooter;
ResetPassword.FormFields = MockTextFormFields;
ResetPassword.Header = MockHeader;

const SetupTOTP: MockDefaults['SetupTOTP'] = () => null;
SetupTOTP.Footer = MockFooter;
SetupTOTP.FormFields = MockTextFormFields;
SetupTOTP.Header = MockHeader;

const SignIn: MockDefaults['SignIn'] = () => null;
SignIn.Footer = MockFooter;
SignIn.FormFields = MockTextFormFields;
SignIn.Header = MockHeader;

const SignUp: MockDefaults['SignUp'] = () => null;
SignUp.Footer = MockFooter;
SignUp.FormFields = MockTextFormFields;
SignUp.Header = MockHeader;

const VerifyUser: MockDefaults['VerifyUser'] = () => null;
VerifyUser.Footer = MockFooter;
VerifyUser.FormFields = MockRadioFormFields;
VerifyUser.Header = MockHeader;

export const DEFAULTS: MockDefaults = {
  ConfirmResetPassword,
  ConfirmSignIn,
  ConfirmSignUp,
  ConfirmVerifyUser,
  ForceNewPassword,
  ResetPassword,
  SetupTOTP,
  SignIn,
  SignUp,
  VerifyUser,
};

const OverrideConfirmResetPassword: RouteComponentsOverrides['ConfirmResetPassword'] =
  () => null;

export const OVERRIDES: RouteComponentsOverrides = {
  ConfirmResetPassword: OverrideConfirmResetPassword,
};

const InvalidSignIn =
  'Not a component' as unknown as RouteComponentsOverrides['SignIn'];

export const INVALID_SIGN_IN_OVERRIDES: RouteComponentsOverrides = {
  SignIn: InvalidSignIn,
};

export const INVALID_OVERRIDES =
  'INVALID_OVERRIDES' as RouteComponentsOverrides;
