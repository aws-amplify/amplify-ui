export const getFederatedSignInState = (target: 'signIn' | 'signUp') => ({
  entry: ['sendUpdate', 'clearError'],
  invoke: {
    src: 'signInWithRedirect',
    onDone: { target },
    onError: { actions: 'setRemoteError', target },
  },
});
