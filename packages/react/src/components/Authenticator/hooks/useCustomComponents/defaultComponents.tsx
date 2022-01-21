import { SignIn } from '../../SignIn';
import { SignUp } from '../../SignUp';
import { ConfirmSignUp } from '../../ConfirmSignUp';

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
  Footer: (): JSX.Element => null,
};
