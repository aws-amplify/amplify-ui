import { useService } from "@xstate/vue";
import { authService } from "@aws-amplify/ui-core";

export const useAuth = (): useAuthInterface => {
  return useService(authService);
};

export interface useAuthInterface {
  state: any;
  send: any;
}
