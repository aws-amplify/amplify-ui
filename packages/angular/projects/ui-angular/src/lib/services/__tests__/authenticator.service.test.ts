import { AuthenticatorService } from '../authenticator.service';

describe('AuthenticatorService', () => {
  const authService: AuthenticatorService = new AuthenticatorService();

  it('callback is called when interpreted authservice changes', () => {
    const callback = jest.fn();
    const subscription = authService.authStateObservable$.subscribe(callback);
    expect(callback).toHaveBeenCalledTimes(1);
    // trigger a mock transition
    authService.send('INIT');
    expect(callback).toHaveBeenCalledTimes(2);

    authService.send('SIGN_IN');
    expect(callback).toHaveBeenCalledTimes(3);

    subscription.unsubscribe();
  });
});
