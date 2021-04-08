import { useService } from "@xstate/react";
import { authService } from "@aws-amplify/ui-core";

export function useAuth() {
  return useService(authService);
}
