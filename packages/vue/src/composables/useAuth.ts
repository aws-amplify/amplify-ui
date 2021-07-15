import { useService } from "@xstate/vue";
import { authService } from "@aws-amplify/ui-core";
import { Ref } from "vue";
import { PayloadSender, EventObject } from "xstate";

export const useAuth = (): useAuthInterface => {
  return useService(authService);
};

export interface useAuthInterface {
  state: Ref;
  send: PayloadSender<EventObject>;
}
