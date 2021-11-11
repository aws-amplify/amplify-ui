import { SignUp } from '../SignUp';

export const defaultComponents = {
  Header: (): JSX.Element => null,
  SignUp: {
    FormFields: SignUp.FormFields,
  },
  Footer: (): JSX.Element => null,
};
