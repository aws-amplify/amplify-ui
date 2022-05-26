import { SignIn } from '../../SignIn';
import { SignUp } from '../../SignUp';
import { ConfirmSignUp } from '../../ConfirmSignUp';
import { ForceNewPassword } from '../../ForceNewPassword';
import { SetupTOTP } from '../../SetupTOTP';
import { ConfirmSignIn } from '../../ConfirmSignIn/ConfirmSignIn';
import { ConfirmVerifyUser, VerifyUser } from '../../VerifyUser';
import { ConfirmResetPassword, ResetPassword } from '../../ResetPassword';

// use the very generic name of Components as this is a temporary interface and is not exported
interface Components {
  Footer?: () => JSX.Element;
  FormFields?: () => JSX.Element;
  Header?: () => JSX.Element;
}

export interface DefaultComponents extends Omit<Components, 'FormFields'> {
  ConfirmSignIn?: Omit<Components, 'FormFields'>;
  ConfirmSignUp?: Omit<Components, 'FormFields'>;
  ConfirmResetPassword?: Omit<Components, 'FormFields'>;
  ConfirmVerifyUser?: Omit<Components, 'FormFields'>;
  ForceNewPassword?: Pick<Components, 'FormFields'>;
  ResetPassword?: Omit<Components, 'FormFields'>;
  SetupTOTP?: Omit<Components, 'FormFields'>;
  SignIn?: Omit<Components, 'FormFields'>;
  SignUp?: Components;
  VerifyUser?: Omit<Components, 'FormFields'>;
}

export const defaultComponents: DefaultComponents = {
  Header: (): JSX.Element => null,
  SignIn: {
    Header: SignIn.Header,
    Footer: SignIn.Footer,
  },
  SignUp: {
    Header: SignUp.Header,
    FormFields: SignUp.FormFields,
    Footer: SignUp.Footer,
  },
  ConfirmSignUp: {
    Header: ConfirmSignUp.Header,
    Footer: ConfirmSignUp.Footer,
  },
  SetupTOTP: {
    Header: SetupTOTP.Header,
    Footer: SetupTOTP.Footer,
  },
  ConfirmResetPassword: {
    Header: ConfirmResetPassword.Header,
    Footer: ConfirmResetPassword.Footer,
  },
  ConfirmSignIn: {
    Header: ConfirmSignIn.Header,
    Footer: ConfirmSignIn.Footer,
  },
  VerifyUser: {
    Header: VerifyUser.Header,
    Footer: VerifyUser.Footer,
  },
  ConfirmVerifyUser: {
    Header: ConfirmVerifyUser.Header,
    Footer: ConfirmVerifyUser.Footer,
  },
  ForceNewPassword: {
    FormFields: ForceNewPassword.FormFields,
  },
  ResetPassword: {
    Header: ResetPassword.Header,
    Footer: ResetPassword.Footer,
  },
  Footer: (): JSX.Element => null,
};
