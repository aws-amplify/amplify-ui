import { handleInput } from '../../actions';
import { createMachine, sendParent, sendUpdate } from 'xstate';
import { AuthFormData, ValidationError, AuthEvent } from '../../../types';
import { Auth } from 'aws-amplify';

type SignInContext = {
  remoteError: string;
  formValues: AuthFormData;
  validationError: ValidationError;
};

export const signInMachine = createMachine<SignInContext, AuthEvent>(
  {
    initial: 'edit',
    context: {
      remoteError: '',
      formValues: {},
      validationError: {},
    },
    id: 'signIn',
    states: {
      edit: {
        initial: 'clean',
        states: {
          clean: {},
          error: {},
        },
        on: {
          SUBMIT: 'submit',
          CHANGE: {
            actions: handleInput as any, // TODO: type this
          },
        },
      },
      submit: {
        entry: 'clearError',
        invoke: {
          src: 'signIn',
          onDone: {
            actions: 'reportDone',
            target: 'resolved',
          },
          onError: [
            {
              cond: 'shouldRedirectToConfirmSignUp',
              actions: 'reportError',
              target: 'rejected',
            },
            {
              actions: sendUpdate(),
              target: 'edit.error',
            },
          ],
        },
      },
      resolved: {
        type: 'final',
      },
      rejected: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      reportDone: sendParent((_context, event) => ({
        type: 'DONE',
        data: {
          user: event.data,
        },
      })),
      reportError: sendParent((context, event) => ({
        type: 'ERROR',
        data: { ...event.data, username: context.formValues?.username },
      })),
    },
    guards: {
      shouldRedirectToConfirmSignUp: (_context, event): boolean => {
        return event.data.code === 'UserNotConfirmedException';
      },
    },
    services: {
      async signIn(_context, event) {
        const { username, password } = event.data;

        return Auth.signIn(username, password);
      },
    },
  }
);
