import { interpret } from "xstate";
import { authMachine } from "./authMachine";

// TODO: Share machines https://github.com/davidkpiano/xstate/discussions/1754
// NOTE! This may not be desirable on the server!
export const authService = interpret(authMachine, { devTools: true }).start();
