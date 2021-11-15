import { SignIn } from '../SignIn';
import { SignUp } from '../SignUp';

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
  Footer: (): JSX.Element => null,
};
