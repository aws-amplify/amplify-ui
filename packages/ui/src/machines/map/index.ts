import { ICredentials } from '@aws-amplify/core';
import { Amplify, Auth } from 'aws-amplify';
import { assign, createMachine } from 'xstate';

export const mapMachine = () => {
  return createMachine<any, any>(
    {
      id: 'map',
      context: {
        config: {},
        credentials: null,
      },
      initial: 'idle',
      states: {
        idle: {
          invoke: [
            {
              src: 'getAmplifyConfig',
              onDone: {
                actions: 'setAmplifyConfig',
              },
            },
            {
              src: 'getUserCredentials',
              onDone: {
                actions: 'setUserCredentials',
              },
            },
          ],
          on: {
            TRANSITION_START: {
              target: 'transitioning',
            },
          },
        },
        transitioning: {
          on: {
            TRANSITION_END: {
              target: 'idle',
            },
          },
        },
      },
    },
    {
      actions: {
        setAmplifyConfig: assign({
          config(context, event) {
            const { default: mapId } =
              event.data.geo.amazon_location_service.maps;
            const { region } = event.data.geo.amazon_location_service;

            return {
              mapId,
              region,
            };
          },
        }),
        setUserCredentials: assign({
          credentials(context, event) {
            return event.data;
          },
        }),
      },
      services: {
        getAmplifyConfig: async (): Promise<any> => Amplify.configure(),
        getUserCredentials: async (): Promise<ICredentials> =>
          Auth.currentUserCredentials(),
      },
    }
  );
};
