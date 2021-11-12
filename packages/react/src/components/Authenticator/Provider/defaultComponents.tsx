import { SignIn } from '../SignIn';
import { SignUp } from '../SignUp';

export const defaultComponents = {
  Header: (): JSX.Element => null,
  SignIn: {
    Header: SignIn.Header,
    Footer: SignIn.Footer,
  },
  SignUp: {
    FormFields: SignUp.FormFields,
  },
  Footer: (): JSX.Element => null,
};
