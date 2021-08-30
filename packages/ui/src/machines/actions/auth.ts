import { stop } from 'xstate/lib/actions';

// TODO: Add more shared actions here

export const stopActor = (machineId: string) => {
  return stop(machineId);
};
