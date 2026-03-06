export const isSignInOrSignUpRoute = (route: string): boolean =>
  route === 'signIn' || route === 'signUp';

/**
 * Checks if challenge is OTP
 * @param challengeName - The challenge name (e.g., 'EMAIL_OTP', 'SMS_MFA')
 * @returns true if challenge is OTP
 */
export const isOtpChallenge = (challengeName: string | undefined): boolean =>
  !!challengeName &&
  (challengeName === 'EMAIL_OTP' || challengeName === 'SMS_MFA');
