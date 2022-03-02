import { SignIn } from '../../SignIn';
import { SignUp } from '../../SignUp';
import { ConfirmSignUp } from '../../ConfirmSignUp';
import { ForceNewPassword } from '../../ForceNewPassword';
import { SetupTOTP } from '../../SetupTOTP';
import { ConfirmSignIn } from '../../ConfirmSignIn/ConfirmSignIn';
import { ConfirmVerifyUser, VerifyUser } from '../../VerifyUser';
import { ConfirmResetPassword, ResetPassword } from '../../ResetPassword';

export const defaultComponents = {
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
