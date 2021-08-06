import { AuthEvent, AuthContext } from '../../types';
import { assign, spawn, Spawnable } from 'xstate';

export const handleInput = assign({
  formValues(context: AuthContext, event: AuthEvent) {
    const { name, value } = event.data;
    return { ...context.formValues, [name]: value };
  },
});

export const setUser = assign<AuthContext, AuthEvent>({
  user(_, event) {
    return event.data?.user || event.data;
  },
});

export const spawnActor = (machine: Spawnable, name: string) => {
  return assign<AuthContext, AuthEvent>({
    actorRef: () => spawn(machine, name),
  });
};
