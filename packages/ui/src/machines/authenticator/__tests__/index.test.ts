import { interpret } from 'xstate';
import { setImmediate } from 'timers';

import { createAuthenticatorMachine } from '..';

import type { defaultServices } from '../defaultServices';

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
            getAmplifyConfig: () =>
              Promise.resolve({}) as ReturnType<
                (typeof defaultServices)['getAmplifyConfig']
              >,
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
            spawnForgotPasswordActor: jest.fn(() => Promise.resolve),
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
      setup: 'initConfig',
    });

    service.send({
      type: 'INIT',
      data: {
        aws_cognito_username_attributes: ['email'],
      },
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      signUpActor: 'runActor',
    });
  });

  it('should spawn the signUpActor', async () => {
    service = interpret(
      createAuthenticatorMachine()
        .withContext({
          config: {
            initialState: 'signUp',
          },
          services: {
            getCurrentUser: () => Promise.reject(),
            getAmplifyConfig: () =>
              Promise.resolve({}) as ReturnType<
                (typeof defaultServices)['getAmplifyConfig']
              >,
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
            spawnForgotPasswordActor: jest.fn(() => Promise.resolve),
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
      setup: 'initConfig',
    });

    service.send({
      type: 'INIT',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      signUpActor: 'runActor',
    });
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
            getAmplifyConfig: () =>
              Promise.resolve({}) as ReturnType<
                (typeof defaultServices)['getAmplifyConfig']
              >,
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
            spawnForgotPasswordActor: jest.fn(() => Promise.resolve),
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
      setup: 'initConfig',
    });

    service.send({
      type: 'INIT',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      signUpActor: 'runActor',
    });
    service.send({
      type: 'done.invoke.signUpActor',
      data: {},
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      signInActor: 'runActor',
    });
  });

  it('should spawn the forgotPasswordActor', async () => {
    service = interpret(
      createAuthenticatorMachine()
        .withContext({
          config: {
            initialState: 'forgotPassword',
          },
          services: {
            getCurrentUser: () => Promise.reject(),
            getAmplifyConfig: () =>
              Promise.resolve({}) as ReturnType<
                (typeof defaultServices)['getAmplifyConfig']
              >,
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
            stopForgotPassworddActor: jest.fn(() => Promise.resolve),
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
      setup: 'initConfig',
    });

    service.send({
      type: 'INIT',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      forgotPasswordActor: 'runActor',
    });
  });

  it('should spawn the signInActor', async () => {
    service = interpret(
      createAuthenticatorMachine()
        .withContext({
          config: {
            initialState: 'signIn',
            loginMechanisms: ['email'],
          },
          services: {
            getCurrentUser: () => Promise.reject(),
            getAmplifyConfig: () =>
              Promise.resolve({}) as ReturnType<
                (typeof defaultServices)['getAmplifyConfig']
              >,
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
            spawnForgotPasswordActor: jest.fn(() => Promise.resolve),
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
      setup: 'initConfig',
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
      signInActor: 'runActor',
    });
  });

  // @todo-migration fix
  it.skip('should redirect to signUp', async () => {
    service = interpret(
      createAuthenticatorMachine()
        .withContext({
          config: {
            initialState: 'signIn',
          },
          services: {
            getCurrentUser: () => Promise.reject(),
            getAmplifyConfig: () =>
              Promise.resolve({}) as ReturnType<
                (typeof defaultServices)['getAmplifyConfig']
              >,
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
            spawnForgotPasswordActor: jest.fn(() => Promise.resolve),
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
      setup: 'initConfig',
    });

    service.send({
      type: 'INIT',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      signInActor: 'runActor',
    });
    service.send({
      type: 'done.invoke.signInActor',
      data: {},
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      signUpActor: 'runActor',
    });
  });

  // @todo-migration fix
  it.skip('should redirect to reset password', async () => {
    service = interpret(
      createAuthenticatorMachine()
        .withContext({
          config: {
            initialState: 'signIn',
          },
          services: {
            getCurrentUser: () => Promise.reject(),
            getAmplifyConfig: () =>
              Promise.resolve({}) as ReturnType<
                (typeof defaultServices)['getAmplifyConfig']
              >,
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
            spawnForgotPasswordActor: jest.fn(() => Promise.resolve),
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
      setup: 'initConfig',
    });

    service.send({
      type: 'INIT',
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      signInActor: 'runActor',
    });
    service.send({
      type: 'done.invoke.signInActor',
      data: {
        intent: 'confirmPasswordReset',
      },
    });
    await flushPromises();
    expect(service.getSnapshot().value).toStrictEqual({
      forgotPasswordActor: 'runActor',
    });
  });

  it('should refresh token', async () => {
    service = interpret(
      createAuthenticatorMachine()
        .withConfig({
          actions: {
            setUser: jest.fn(() => Promise.resolve),
          },
          services: {
            handleGetCurrentUser: jest.fn(async () => Promise.resolve),
            getAmplifyConfig: () =>
              Promise.resolve({}) as ReturnType<
                (typeof defaultServices)['getAmplifyConfig']
              >,
          },
          guards: {
            hasUser: () => true,
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
            spawnForgotPasswordActor: jest.fn(() => Promise.resolve),
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
      setup: 'initConfig',
    });

    service.send({
      type: 'INIT',
    });
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

  // @todo-migration
  //    - Expected  - 1
  //   + Received  + 1

  //   Object {
  // -   "signOut": "runActor",
  // +   "setup": "initConfig",
  //   }
  it.skip('should spawn the signOutActor', async () => {
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
    expect(service.getSnapshot().value).toStrictEqual({ setup: 'initConfig' });
  });
});
