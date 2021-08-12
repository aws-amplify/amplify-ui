import { AuthEvent, AuthContext } from '../../types';
import { assign, spawn, Spawnable } from 'xstate';

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
