import type { Step } from '../types';

export const getFederatedSignInState = (target: 'signIn' | 'signUp') => ({
  entry: ['sendUpdate', 'clearError'],
  invoke: {
    src: 'signInWithRedirect',
    onDone: { target },
    onError: { actions: 'setRemoteError', target },
  },
});

export const getConfirmSignInFormValuesKey = (
  signInStep: Step
): 'confirmation_code' | 'mfa_type' | 'email' => {
  if (
    [
      'CONTINUE_SIGN_IN_WITH_MFA_SELECTION',
      'CONTINUE_SIGN_IN_WITH_MFA_SETUP_SELECTION',
    ].includes(signInStep)
  ) {
    return 'mfa_type';
  }

  if (signInStep === 'CONTINUE_SIGN_IN_WITH_EMAIL_SETUP') {
    return 'email';
  }

  return 'confirmation_code';
};
