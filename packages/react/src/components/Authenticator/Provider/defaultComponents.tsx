import { SignUp } from '../SignUp';

export const defaultComponents = {
  SignUp: {
    // Note – Because `typeof defaultComponents` is used for typing,
    // casting to `React.ElementType` is required to correctly generate types
    FormFields: SignUp.FormFields as React.ElementType,
  },
};
