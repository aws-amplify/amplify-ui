import { Authenticator } from './Authenticator';
import { ForceNewPassword } from './ForceNewPassword';
import { Provider } from './hooks/useAuthenticator';
import { ResetPassword } from './ResetPassword';
import { SetupTOTP } from './SetupTOTP';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

// TODO: remove the below components from the Authenticator and export explicitly
Authenticator.Provider = Provider;
Authenticator.ResetPassword = ResetPassword;
Authenticator.SetupTOTP = SetupTOTP;
Authenticator.SignIn = SignIn;
Authenticator.SignUp = SignUp;
Authenticator.ForceNewPassword = ForceNewPassword;

export { Authenticator };

export { useAuthenticator } from './hooks';
export { withAuthenticator } from './withAuthenticator';
