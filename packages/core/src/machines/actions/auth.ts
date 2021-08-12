import { AuthEvent, AuthContext } from '../../types';
import { assign, spawn, Spawnable } from 'xstate';
import { stop } from 'xstate/lib/actions';

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

export const stopActor = (machineId: string) => {
  return stop(machineId);
};
