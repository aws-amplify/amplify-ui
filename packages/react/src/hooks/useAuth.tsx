import { useActor } from "@xstate/react";
import { useContext } from "react";

import { AuthenticatorContext } from "../components/Authenticator/AuthenticatorContext";

export function useAuth() {
  return useActor(useContext(AuthenticatorContext));
}
