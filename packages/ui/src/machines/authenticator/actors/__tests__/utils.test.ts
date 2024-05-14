import { getFederatedSignInState } from '../utils';

describe('getFederatedSignInState', () => {
  it.each(['signIn', 'signUp'])(
    "returns the expected 'federatedSignIn` state values for the '%s' route",
    (route: 'signIn' | 'signUp') => {
      const output = getFederatedSignInState(route);
      expect(output).toMatchSnapshot();
    }
  );
});
