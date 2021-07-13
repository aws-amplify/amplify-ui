import { get, omit } from "lodash";
import { Auth, Amplify } from "aws-amplify";
import { Machine, assign } from "xstate";
import {
  AuthChallengeNames,
  AuthContext,
  AuthEvent,
  AuthFormData,
} from "./types";
import { passwordMatches, runValidators } from "./validators";

export const authMachine = Machine<AuthContext, AuthEvent>(
  {
    id: "auth",
    initial: "idle",
    context: {
      remoteError: "",
      formValues: {},
      validationError: {},
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
            src: "getAmplifyConfig",
            onDone: {
              actions: "setAuthConfig",
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
              onDone: [
                {
                  cond: "shouldSetupTOTP",
                  actions: ["setUser", "setChallengeName"],
                  target: "#auth.setupTOTP",
                },
                {
                  cond: "shouldConfirmSignIn",
                  actions: ["setUser", "setChallengeName"],
                  target: "#auth.confirmSignIn",
                },
                {
                  actions: "setUser",
                  target: "resolved",
                },
              ],
              onError: {
                actions: "setRemoteError",
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
      confirmSignIn: {
        initial: "edit",
        exit: ["clearFormValues, clearError"],
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
              SIGN_IN: "#auth.signIn",
              INPUT: { actions: "handleInput" },
            },
          },
          submit: {
            invoke: {
              src: "confirmSignIn",
              onDone: {
                actions: ["setUser", "clearChallengeName"],
                target: "resolved",
              },
              onError: {
                actions: "setRemoteError",
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
      setupTOTP: {
        initial: "edit",
        exit: ["clearFormValues, clearError"],
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
              SIGN_IN: "#auth.signIn",
              INPUT: { actions: "handleInput" },
            },
          },
          submit: {
            invoke: {
              src: "verifyTotpToken",
              onDone: {
                actions: ["setUser", "clearChallengeName"],
                target: "resolved",
              },
              onError: {
                actions: "setRemoteError",
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
      signUp: {
        type: "parallel",
        states: {
          validation: {
            initial: "pending",
            states: {
              pending: {
                invoke: {
                  src: "validateFields",
                  onDone: {
                    target: "valid",
                    actions: "clearValidationError",
                  },
                  onError: {
                    target: "invalid",
                    actions: "setFieldErrors",
                  },
                },
              },
              valid: {},
              invalid: {},
            },
            on: {
              CHANGE: {
                actions: "handleInput",
                target: ".pending",
              },
            },
          },
          submission: {
            initial: "idle",
            onDone: "#auth.confirmSignUp",
            states: {
              idle: {
                on: {
                  SUBMIT: "validate",
                },
              },
              validate: {
                invoke: {
                  src: "validateFields",
                  onDone: {
                    target: "pending",
                    actions: "clearValidationError",
                  },
                  onError: {
                    target: "idle",
                    actions: "setFieldErrors",
                  },
                },
              },
              pending: {
                invoke: {
                  src: "signUp",
                  onDone: "done",
                  onError: {
                    target: "idle",
                    actions: "setRemoteError",
                  },
                },
              },
              done: { type: "final" },
            },
          },
        },
        on: {
          SIGN_IN: "#auth.signIn",
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
                actions: "setRemoteError",
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
                actions: "setRemoteError",
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
      setAuthConfig: assign({
        config(_, event) {
          return event.data.auth;
        },
      }),
      setRemoteError: assign({
        remoteError(_, event) {
          return event.data?.message || event.data;
        },
      }),
      clearFormValues: assign({ formValues: {} }),
      clearValidationError: assign({ validationError: {} }),
      clearError: assign({ remoteError: "" }),
      handleInput: assign({
        formValues(context, event) {
          const { name, value } = event.data;
          return { ...context.formValues, [name]: value };
        },
      }),
      setFieldErrors: assign({
        validationError(_, event) {
          return event.data;
        },
      }),
      setChallengeName: assign({
        challengeName(_, event) {
          return event.data?.challengeName;
        },
      }),
      clearChallengeName: assign({ challengeName: undefined }),
    },
    // See: https://xstate.js.org/docs/guides/guards.html#guards-condition-functions
    guards: {
      shouldConfirmSignIn: (context, event) => {
        const challengeName = get(event, "data.challengeName");
        const validChallengeNames = [
          AuthChallengeNames.SMS_MFA,
          AuthChallengeNames.SOFTWARE_TOKEN_MFA,
        ];

        if (validChallengeNames.includes(challengeName)) {
          return true;
        }

        return false;
      },
      shouldSetupTOTP: (context, event) => {
        const challengeName = get(event, "data.challengeName");

        if (challengeName === AuthChallengeNames.MFA_SETUP) {
          return true;
        }

        return false;
      },
    },
    services: {
      async validateFields(context, _event) {
        const { formValues } = context;
        const validators = [passwordMatches]; // this can contain custom validators too
        return runValidators(formValues, validators);
      },
      async getCurrentUser() {
        return Auth.currentAuthenticatedUser();
      },
      async getAmplifyConfig() {
        return Amplify.configure();
      },
      async signIn(context, event) {
        const { username, password } = event.data;

        return Auth.signIn(username, password);
      },
      async confirmSignIn(context, event) {
        const { challengeName, user } = context;
        const { confirmation_code: code } = event.data;

        let mfaType;
        if (
          challengeName === AuthChallengeNames.SMS_MFA ||
          challengeName === AuthChallengeNames.SOFTWARE_TOKEN_MFA
        ) {
          mfaType = challengeName;
        }

        return Auth.confirmSignIn(user, code, mfaType);
      },
      async verifyTotpToken(context, event) {
        const { user } = context;
        const { confirmation_code } = event.data;

        return Auth.verifyTotpToken(user, confirmation_code);
      },
      async confirmSignUp(context, event) {
        const { username, confirmation_code: code } = event.data;

        return Auth.confirmSignUp(username, code);
      },
      async resendConfirmationCode(context, event) {
        const { username } = event.data;

        return Auth.resendSignUp(username);
      },
      async signUp(context, _event) {
        const {
          formValues: { password, ...formValues },
          config: {
            login_mechanisms: [primaryAlias],
          },
        } = context;

        const username = formValues[primaryAlias];

        const attributes = omit<AuthFormData>(formValues, [
          primaryAlias,
          "confirm_password", // confirm_password field should not be sent to Cognito
        ]);

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
