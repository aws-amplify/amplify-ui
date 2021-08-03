import { AuthEvent, AuthContext } from '../../types';
import { assign, spawn, Spawnable } from 'xstate';

export const handleInput = assign<AuthContext, AuthEvent>({
  formValues(context, event: AuthEvent) {
    const { name, value } = event.data;
    return { ...context.formValues, [name]: value };
  },
});

export const spawnActor = (machine: Spawnable, name: string) => {
  return assign<AuthContext, AuthEvent>({
    actorRef: () => spawn(machine, name),
  });
};
