import { useService } from "@xstate/vue";
import { authService } from "@aws-amplify/ui-core";

export const useAuth = () => {
  return useService(authService);
};
