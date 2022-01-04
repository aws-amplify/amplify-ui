import { assign, createMachine, forwardTo, spawn } from 'xstate';

export const createMapMachine = () =>
  createMachine({
    id: 'map',
    initial: 'idle',
    context: {
      config: {},
    },
    states: {
      // See: https://xstate.js.org/docs/guides/communication.html#invoking-promises
      idle: {
        invoke: [
          {
            src: 'getAmplifyConfig',
            onDone: {
              actions: 'applyAmplifyConfig',
            },
          },
        ],
      },
    },
  });
