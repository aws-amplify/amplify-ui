import { SignIn } from '../../SignIn';
import { SignUp } from '../../SignUp';
import { ConfirmSignUp } from '../../ConfirmSignUp';
import { ForceNewPassword } from '../../ForceNewPassword';
import { SetupTotp } from '../../SetupTotp';
import { ConfirmSignIn } from '../../ConfirmSignIn/ConfirmSignIn';
import { ConfirmVerifyUser, VerifyUser } from '../../VerifyUser';
import { ConfirmResetPassword, ForgotPassword } from '../../ForgotPassword';
import { SelectMfa } from '../../SelectMfa';

// use the very generic name of Components as this is a temporary interface and is not exported
interface Components {
  Footer?: () => JSX.Element | null;
  FormFields?: () => JSX.Element | null;
  Header?: () => JSX.Element | null;
}

export interface DefaultComponents extends Omit<Components, 'FormFields'> {
  ConfirmSignIn?: Omit<Components, 'FormFields'>;
  ConfirmSignUp?: Omit<Components, 'FormFields'>;
  ConfirmResetPassword?: Omit<Components, 'FormFields'>;
  ConfirmVerifyUser?: Omit<Components, 'FormFields'>;
  ForceNewPassword?: Components;
  ForgotPassword?: Omit<Components, 'FormFields'>;
  SelectMfa?: Omit<Components, 'FormFields'>;
  SetupTotp?: Omit<Components, 'FormFields'>;
  SignIn?: Omit<Components, 'FormFields'>;
  SignUp?: Components;
  VerifyUser?: Omit<Components, 'FormFields'>;
}

export const defaultComponents: DefaultComponents = {
  // @ts-ignore
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
  SelectMfa: {
    Header: SelectMfa.Header,
    Footer: SelectMfa.Footer,
  },
  SetupTotp: {
    Header: SetupTotp.Header,
    Footer: SetupTotp.Footer,
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
    // @ts-ignore
    Footer: ConfirmVerifyUser.Footer,
  },
  ForceNewPassword: {
    Header: ForceNewPassword.Header,
    Footer: ForceNewPassword.Footer,
    FormFields: ForceNewPassword.FormFields,
  },
  ForgotPassword: {
    Header: ForgotPassword.Header,
    Footer: ForgotPassword.Footer,
  },
  // @ts-ignore
  Footer: (): JSX.Element => null,
};
