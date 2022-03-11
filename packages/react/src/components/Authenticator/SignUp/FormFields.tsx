import { LoginMechanism } from '@aws-amplify/ui';
import { useAuthenticator } from '../hooks/useAuthenticator';
import { FormFields } from '../shared/FormFields';

export const SignUpFormFields = () => {
  const { _state } = useAuthenticator();
  const { loginMechanisms } = _state.context.config;

  return <FormFields route="signUp" toggles={loginMechanisms} />;
};
