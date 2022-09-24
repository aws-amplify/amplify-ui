import { Auth } from 'aws-amplify';
export function signUp(username, password, attributes) {
  return Auth.signUp({
    username,
    password,
    attributes,
    autoSignIn: {
      enabled: true,
    },
  });
}
