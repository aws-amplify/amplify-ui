import { Auth, Amplify } from "aws-amplify";
import { Machine, assign } from "xstate";
import { AuthContext, AuthEvent } from "./types";

export const authMachine = Machine<AuthContext, AuthEvent>(
  {
    id: "auth",
    initial: "idle",
    context: {
      error: "",
      formValues: {},
      user: undefined,
      session: undefined,
    },
    states: {
      // See: https://xstate.js.org/docs/guides/communication.html#invoking-promises
      idle: {
        invoke: [
          {
            // TODO Wait for Auth to be configured
            src: "getCurrentUser",
            onDone: {
              actions: "setUser",
              target: "authenticated",
            },
            onError: "signIn",
          },
          {
            src: "getCurrentConfig",
            onDone: {
              actions: "setUserNameAlias",
            },
          },
        ],
      },
      authenticated: {
        on: {
          SIGN_OUT: "signOut",
        },
      },
      signIn: {
        initial: "edit",
        exit: ["clearFormValues", "clearError"],
        onDone: "authenticated",
        states: {
          edit: {
            initial: "clean",
            states: {
              clean: {},
              error: {},
            },
            on: {
              SUBMIT: "submit",
              INPUT: { actions: "handleInput" },
              SIGN_UP: "#auth.signUp",
            },
          },
          submit: {
            entry: "clearError",
            invoke: {
              src: "signIn",
              onDone: {
                actions: "setUser",
                target: "resolved",
              },
              onError: {
                actions: "setCognitoError",
                target: "rejected",
              },
            },
          },
          resolved: {
            type: "final",
          },
          rejected: {
            // TODO Set errors and go back to `idle`?
            always: "edit.error",
          },
        },
      },
      signUp: {
        initial: "edit",
        exit: ["clearFormValues", "clearError"],
        onDone: "confirmSignUp",
        states: {
          edit: {
            initial: "clean",
            states: {
              clean: {},
              error: {},
            },
            on: {
              SIGN_IN: "#auth.signIn",
              SUBMIT: "submit",
              INPUT: { actions: "handleInput" },
            },
          },
          submit: {
            entry: "clearError",
            invoke: {
              src: "signUp",
              onDone: {
                actions: "setUser",
                target: "resolved",
              },
              onError: {
                actions: "setCognitoError",
                target: "rejected",
              },
            },
          },
          rejected: {
            always: "edit.error",
          },
          resolved: {
            type: "final",
          },
        },
      },
      confirmSignUp: {
        initial: "edit",
        exit: ["clearFormValues", "clearError"],
        onDone: "idle",
        states: {
          edit: {
            initial: "clean",
            states: {
              clean: {},
              error: {},
            },
            on: {
              SUBMIT: "submit",
              RESEND: "resend",
              SIGN_IN: "#auth.signIn",
              INPUT: { actions: "handleInput" },
            },
          },
          submit: {
            invoke: {
              src: "confirmSignUp",
              onDone: {
                target: "resolved",
              },
              onError: {
                actions: "setCognitoError",
                target: "rejected",
              },
            },
          },
          resend: {
            invoke: {
              src: "resendConfirmationCode",
              onDone: {
                target: "edit",
              },
              onError: {
                actions: "setCognitoError",
                target: "rejected",
              },
            },
          },
          rejected: {
            always: "edit.error",
          },
          resolved: {
            type: "final",
          },
        },
      },
      signOut: {
        initial: "pending",
        onDone: "idle",
        states: {
          pending: {
            invoke: {
              src: "signOut",
              onDone: {
                actions: "setUser",
                target: "resolved",
              },
              // See: https://xstate.js.org/docs/guides/communication.html#the-invoke-property
              onError: "rejected",
            },
          },
          rejected: {
            // TODO Why would signOut be rejected?
            type: "final",
          },
          resolved: {
            type: "final",
          },
        },
      },
    },
  },
  {
    actions: {
      setUser: assign({
        user(_, event) {
          return event.data?.user || event.data;
        },
      }),
      setUserNameAlias: assign({
        config(_, event) {
          return event.data.usernameAlias;
        },
      }),
      setCognitoError: assign({
        error(_, event) {
          return event.data?.message || event.data;
        },
      }),
      clearFormValues: assign({ formValues: {} }),
      clearError: assign({ error: "" }),
      handleInput: assign({
        formValues(context, event) {
          const { name, value } = event.data;
          return {
            ...context.formValues,
            [name]: value,
          };
        },
      }),
    },
    // See: https://xstate.js.org/docs/guides/guards.html#guards-condition-functions
    guards: {},
    services: {
      async getCurrentUser() {
        return Auth.currentAuthenticatedUser();
      },
      async getCurrentConfig() {
        return Amplify.configure();
      },
      async signIn(context, event) {
        const { username, password } = event.data;

        return Auth.signIn(username, password);
      },
      async confirmSignUp(context, event) {
        const { username, confirmation_code: code } = event.data;

        return Auth.confirmSignUp(username, code);
      },
      async resendConfirmationCode(context, event) {
        const { username } = event.data;

        return Auth.resendSignUp(username);
      },

      async signUp(context, event) {
        const { username, password, ...attributes } = event.data;
        if (attributes.phone_number) {
          attributes.phone_number = attributes.phone_number.replace(
            /[^A-Z0-9+]/gi,
            ""
          );
        }
        const result = await Auth.signUp({
          username,
          password,
          attributes,
        });

        // TODO `cond`itionally transition to `signUp.confirm` or `resolved` based on result
        return result;
      },
      async signOut() {
        await Auth.signOut(/* global? */);
      },
    },
  }
);
