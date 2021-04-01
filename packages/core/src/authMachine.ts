import { Auth } from "aws-amplify";
import { Machine, assign } from "xstate";
import { inspect } from "@xstate/inspect";
import { AuthContext, AuthEvent } from "./types";

// TODO What's the best way to enable this for debug-only? `XSTATE=true npm start`?
if (typeof window !== "undefined") {
  inspect({
    url: "https://statecharts.io/inspect",
    iframe: false
  });
}

export const authMachine = Machine<AuthContext, AuthEvent>(
  {
    id: "auth",
    initial: "idle",
    context: {
      error: "",
      user: undefined,
      session: undefined
    },
    states: {
      // See: https://xstate.js.org/docs/guides/communication.html#invoking-promises
      idle: {
        invoke: {
          // TODO Wait for Auth to be configured
          src: "getCurrentUser",
          onDone: {
            actions: "setUser",
            target: "authenticated"
          },
          onError: "signIn"
        }
      },
      authenticated: {
        on: {
          SIGN_OUT: "signOut"
        }
      },
      signIn: {
        initial: "idle",
        onDone: "authenticated",
        states: {
          idle: {
            on: {
              SIGN_UP: "#auth.signUp",
              SUBMIT: "pending"
            }
          },
          pending: {
            invoke: {
              src: "signIn",
              onDone: {
                actions: "setUser",
                target: "resolved"
              },
              onError: "rejected"
            }
          },
          resolved: {
            type: "final"
          },
          rejected: {
            // TODO Set errors and go back to `idle`?
            always: "idle"
          }
        }
      },
      signUp: {
        initial: "idle",
        states: {
          idle: {
            on: {
              SIGN_IN: "#auth.signIn",
              SUBMIT: "pending"
            }
          },
          pending: {
            invoke: {
              src: "signUp",
              onDone: {
                target: "resolved"
              },
              onError: "rejected"
            }
          },
          // TODO Set errors and go back to `idle`?
          rejected: {
            always: "idle"
          },
          resolved: {
            type: "final"
          }
        }
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
                target: "resolved"
              },
              // See: https://xstate.js.org/docs/guides/communication.html#the-invoke-property
              onError: "rejected"
            }
          },
          rejected: {
            // TODO Why would signOut be rejected?
            type: "final"
          },
          resolved: {
            type: "final"
          }
        }
      }
    }
  },
  {
    actions: {
      setUser: assign({
        user(context, event) {
          return event.data;
        }
      })
    },
    // See: https://xstate.js.org/docs/guides/guards.html#guards-condition-functions
    guards: {},
    services: {
      async getCurrentUser() {
        return Auth.currentAuthenticatedUser();
      },
      async signIn(context, event) {
        const { username, password } = event.data;

        return Auth.signIn(username, password);
      },
      async signUp(context, event) {
        const { username, password, ...attributes } = event.data;
        const result = await Auth.signUp({ username, password, attributes });

        // TODO `cond`itionally transition to `signUp.confirm` or `resolved` based on result
        return result;
      },
      async signOut() {
        await Auth.signOut(/* global? */);
      }
    }
  }
);
