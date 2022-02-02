import { Amplify } from 'aws-amplify';
import { assign, createMachine } from 'xstate';

export const mapMachine = createMachine<any, any>(
  {
    id: 'map',
    initial: 'idle',
    context: {
      config: {},
    },
    states: {
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
  },
  {
    actions: {
      applyAmplifyConfig: assign({
        config(context, event) {
          const {
            default: mapStyle,
          } = event.data.geo.amazon_location_service.maps;
          const { region } = event.data.geo.amazon_location_service;

          return {
            mapStyle,
            region,
          };
        },
      }),
    },
    services: {
      getAmplifyConfig: async (): Promise<any> => Amplify.configure(),
    },
  }
);
