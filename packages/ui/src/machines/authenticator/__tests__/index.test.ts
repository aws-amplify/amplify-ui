import { interpret } from 'xstate';
import { setImmediate } from 'timers';

import { createAuthenticatorMachine } from '..';

jest.mock('aws-amplify');

const flushPromises = () => new Promise(setImmediate);

let service;

describe('authenticator', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    service.stop();
  });

  it('should apply config', async () => {
    service = interpret(
      createAuthenticatorMachine()
        .withContext({
          config: {
            initialState: 'signUp',
            loginMechanisms: ['email'],
            formFields: {
              signIn: {
                username: {
                  label: 'Mock Label',
                },
              },
            },
          },
          services: {
            getCurrentUser: () => Promise.reject(),
            getAmplifyConfig: () => Promise.resolve({}),
          },
        })
        .withConfig({
          actions: {
            forwardToActor: jest.fn(() => Promise.resolve),
            setActorDoneData: jest.fn(() => Promise.resolve),
            clearUser: jest.fn(() => Promise.resolve),
            clearActorDoneData: jest.fn(() => Promise.resolve),
            setUser: jest.fn(() => Promise.resolve),
            spawnSignInActor: jest.fn(() => Promise.resolve),
            spawnResetPasswordActor: jest.fn(() => Promise.resolve),
            spawnSignOutActor: jest.fn(() => Promise.resolve),
            stopSignInActor: jest.fn(() => Promise.resolve),
            stopResetPasswordActor: jest.fn(() => Promise.resolve),
            stopSignOutActor: jest.fn(() => Promise.resolve),
            configure: jest.fn(() => Promise.resolve),
            setHasSetup: jest.fn(() => Promise.resolve),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual('idle');
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      setup: 'waitConfig',
    });

    service.send({
      type: 'INIT',
      data: {
        aws_cognito_username_attributes: ['email'],
      },
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({ signUp: 'runActor' });
  });

  it('should spawn the signUp actor', async () => {
    service = interpret(
      createAuthenticatorMachine()
        .withContext({
          config: {
            initialState: 'signUp',
          },
          services: {
            getCurrentUser: () => Promise.reject(),
            getAmplifyConfig: () => Promise.resolve({}),
          },
        })
        .withConfig({
          actions: {
            forwardToActor: jest.fn(() => Promise.resolve),
            setActorDoneData: jest.fn(() => Promise.resolve),
            clearUser: jest.fn(() => Promise.resolve),
            clearActorDoneData: jest.fn(() => Promise.resolve),
            applyAmplifyConfig: jest.fn(() => Promise.resolve),
            setUser: jest.fn(() => Promise.resolve),
            spawnSignInActor: jest.fn(() => Promise.resolve),
            spawnResetPasswordActor: jest.fn(() => Promise.resolve),
            spawnSignOutActor: jest.fn(() => Promise.resolve),
            stopSignInActor: jest.fn(() => Promise.resolve),
            stopResetPasswordActor: jest.fn(() => Promise.resolve),
            stopSignOutActor: jest.fn(() => Promise.resolve),
            configure: jest.fn(() => Promise.resolve),
            setHasSetup: jest.fn(() => Promise.resolve),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual('idle');
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      setup: 'waitConfig',
    });

    service.send({
      type: 'INIT',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({ signUp: 'runActor' });
  });

  it('should auto sign in', async () => {
    service = interpret(
      createAuthenticatorMachine()
        .withContext({
          config: {
            initialState: 'signUp',
          },
          services: {
            getCurrentUser: () => Promise.reject(),
            getAmplifyConfig: () => Promise.resolve({}),
          },
        })
        .withConfig({
          actions: {
            forwardToActor: jest.fn(() => Promise.resolve),
            setActorDoneData: jest.fn(() => Promise.resolve),
            clearUser: jest.fn(() => Promise.resolve),
            clearActorDoneData: jest.fn(() => Promise.resolve),
            applyAmplifyConfig: jest.fn(() => Promise.resolve),
            setUser: jest.fn(() => Promise.resolve),
            spawnSignInActor: jest.fn(() => Promise.resolve),
            spawnResetPasswordActor: jest.fn(() => Promise.resolve),
            spawnSignOutActor: jest.fn(() => Promise.resolve),
            stopSignInActor: jest.fn(() => Promise.resolve),
            stopResetPasswordActor: jest.fn(() => Promise.resolve),
            stopSignOutActor: jest.fn(() => Promise.resolve),
            configure: jest.fn(() => Promise.resolve),
            setHasSetup: jest.fn(() => Promise.resolve),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual('idle');
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      setup: 'waitConfig',
    });

    service.send({
      type: 'INIT',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({ signUp: 'runActor' });
    service.send({
      type: 'done.invoke.signUpActor',
      data: {
        intent: 'autoSignIn',
      },
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({ signIn: 'runActor' });
  });

  it('should spawn the resetPassword actor', async () => {
    service = interpret(
      createAuthenticatorMachine()
        .withContext({
          config: {
            initialState: 'resetPassword',
          },
          services: {
            getCurrentUser: () => Promise.reject(),
            getAmplifyConfig: () => Promise.resolve({}),
          },
        })
        .withConfig({
          actions: {
            forwardToActor: jest.fn(() => Promise.resolve),
            setActorDoneData: jest.fn(() => Promise.resolve),
            clearUser: jest.fn(() => Promise.resolve),
            clearActorDoneData: jest.fn(() => Promise.resolve),
            applyAmplifyConfig: jest.fn(() => Promise.resolve),
            setUser: jest.fn(() => Promise.resolve),
            spawnSignInActor: jest.fn(() => Promise.resolve),
            spawnSignOutActor: jest.fn(() => Promise.resolve),
            stopSignInActor: jest.fn(() => Promise.resolve),
            stopResetPasswordActor: jest.fn(() => Promise.resolve),
            stopSignOutActor: jest.fn(() => Promise.resolve),
            configure: jest.fn(() => Promise.resolve),
            setHasSetup: jest.fn(() => Promise.resolve),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual('idle');
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      setup: 'waitConfig',
    });

    service.send({
      type: 'INIT',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      resetPassword: 'runActor',
    });
  });

  it('should spawn the signIn actor', async () => {
    service = interpret(
      createAuthenticatorMachine()
        .withContext({
          config: {
            initialState: 'signIn',
            loginMechanisms: ['email'],
          },
          services: {
            getCurrentUser: () => Promise.reject(),
            getAmplifyConfig: () => Promise.resolve({}),
          },
        })
        .withConfig({
          actions: {
            forwardToActor: jest.fn(() => Promise.resolve),
            setActorDoneData: jest.fn(() => Promise.resolve),
            clearUser: jest.fn(() => Promise.resolve),
            clearActorDoneData: jest.fn(() => Promise.resolve),
            applyAmplifyConfig: jest.fn(() => Promise.resolve),
            setUser: jest.fn(() => Promise.resolve),
            spawnResetPasswordActor: jest.fn(() => Promise.resolve),
            spawnSignOutActor: jest.fn(() => Promise.resolve),
            stopSignInActor: jest.fn(() => Promise.resolve),
            stopResetPasswordActor: jest.fn(() => Promise.resolve),
            stopSignOutActor: jest.fn(() => Promise.resolve),
            configure: jest.fn(() => Promise.resolve),
            setHasSetup: jest.fn(() => Promise.resolve),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual('idle');
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      setup: 'waitConfig',
    });

    service.send({
      type: 'INIT',
      data: {
        aws_cognito_username_attributes: ['email'],
        aws_cognito_signup_attributes: ['email'],
      },
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      signIn: 'runActor',
    });
  });

  it('should redirect to signUp', async () => {
    service = interpret(
      createAuthenticatorMachine()
        .withContext({
          config: {
            initialState: 'signIn',
          },
          services: {
            getCurrentUser: () => Promise.reject(),
            getAmplifyConfig: () => Promise.resolve({}),
          },
        })
        .withConfig({
          actions: {
            forwardToActor: jest.fn(() => Promise.resolve),
            setActorDoneData: jest.fn(() => Promise.resolve),
            clearUser: jest.fn(() => Promise.resolve),
            clearActorDoneData: jest.fn(() => Promise.resolve),
            applyAmplifyConfig: jest.fn(() => Promise.resolve),
            setUser: jest.fn(() => Promise.resolve),
            spawnSignInActor: jest.fn(() => Promise.resolve),
            spawnResetPasswordActor: jest.fn(() => Promise.resolve),
            spawnSignOutActor: jest.fn(() => Promise.resolve),
            stopSignInActor: jest.fn(() => Promise.resolve),
            stopResetPasswordActor: jest.fn(() => Promise.resolve),
            stopSignOutActor: jest.fn(() => Promise.resolve),
            configure: jest.fn(() => Promise.resolve),
            setHasSetup: jest.fn(() => Promise.resolve),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual('idle');
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      setup: 'waitConfig',
    });

    service.send({
      type: 'INIT',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      signIn: 'runActor',
    });
    service.send({
      type: 'done.invoke.signInActor',
      data: {
        intent: 'confirmSignUp',
      },
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({ signUp: 'runActor' });
  });

  it('should redirect to reset password', async () => {
    service = interpret(
      createAuthenticatorMachine()
        .withContext({
          config: {
            initialState: 'signIn',
          },
          services: {
            getCurrentUser: () => Promise.reject(),
            getAmplifyConfig: () => Promise.resolve({}),
          },
        })
        .withConfig({
          actions: {
            forwardToActor: jest.fn(() => Promise.resolve),
            setActorDoneData: jest.fn(() => Promise.resolve),
            clearUser: jest.fn(() => Promise.resolve),
            clearActorDoneData: jest.fn(() => Promise.resolve),
            applyAmplifyConfig: jest.fn(() => Promise.resolve),
            setUser: jest.fn(() => Promise.resolve),
            spawnSignInActor: jest.fn(() => Promise.resolve),
            spawnResetPasswordActor: jest.fn(() => Promise.resolve),
            spawnSignOutActor: jest.fn(() => Promise.resolve),
            stopSignInActor: jest.fn(() => Promise.resolve),
            stopResetPasswordActor: jest.fn(() => Promise.resolve),
            stopSignOutActor: jest.fn(() => Promise.resolve),
            configure: jest.fn(() => Promise.resolve),
            setHasSetup: jest.fn(() => Promise.resolve),
          },
        })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual('idle');
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      setup: 'waitConfig',
    });

    service.send({
      type: 'INIT',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      signIn: 'runActor',
    });
    service.send({
      type: 'done.invoke.signInActor',
      data: {
        intent: 'confirmPasswordReset',
      },
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      resetPassword: 'runActor',
    });
  });

  it('should refresh token', async () => {
    service = interpret(
      createAuthenticatorMachine().withConfig({
        actions: {
          setUser: jest.fn(() => Promise.resolve),
        },
        services: {
          getCurrentUser: jest.fn(async () => Promise.resolve),
        },
        guards: {},
      })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual('idle');

    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      authenticated: 'idle',
    });

    service.send({
      type: 'REFRESH_TOKEN',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      authenticated: 'idle',
    });
  });

  it('should spawn the signOut actor', async () => {
    service = interpret(
      createAuthenticatorMachine().withConfig({
        actions: {
          setUser: jest.fn(() => Promise.resolve),
          configure: jest.fn(() => Promise.resolve),
          setHasSetup: jest.fn(() => Promise.resolve),
        },
        services: {
          getCurrentUser: jest.fn(async () => Promise.resolve),
        },
        guards: {},
      })
    );

    service.start();

    expect(service.getSnapshot().value).toStrictEqual('idle');

    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      authenticated: 'idle',
    });

    service.send({
      type: 'SIGN_OUT',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      signOut: 'runActor',
    });

    service.send({
      type: 'done.invoke.signOutActor',
    });

    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({ setup: 'waitConfig' });
  });
});
