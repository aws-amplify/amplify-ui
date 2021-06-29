import { AuthContext } from "@aws-amplify/ui-core";
import { createContext } from "react";
import { Interpreter } from "xstate";

export const AuthenticatorContext = createContext<Interpreter<AuthContext>>(
  null
);
