import { Then } from '@badeball/cypress-cucumber-preprocessor';
import * as Bluebird from 'cypress/types/bluebird';
import { escapeRegExp } from 'lodash';
import { Server, Client, WebSocket } from 'mock-socket';

let language = 'en-US';
// the current value returned by the service is 15000,
// the below value can be increased as needed
const LIVENESS_TIMEOUT = 60000;

const serverResponse = {
  SessionInformation: {
    Challenge: {
      FaceMovementAndLightChallenge: {
        ChallengeConfig: {
          BlazeFaceDetectionThreshold: 0.75,
          FaceDistanceThreshold: 0.3199999928474426,
          FaceDistanceThresholdMax: 0.0,
          FaceDistanceThresholdMin: 0.3199999928474426,
          FaceIouHeightThreshold: 0.15000000596046448,
          FaceIouWidthThreshold: 0.15000000596046448,
          OvalFitTimeout: 30000,
          OvalHeightWidthRatio: 1.6180000305175781,
          OvalIouHeightThreshold: 0.25,
          OvalIouThreshold: 0.550000011920929,
          OvalIouWidthThreshold: 0.25,
        },
        ColorSequences: [
          {
            DownscrollDuration: 0.0,
            FlatDisplayDuration: 75.0,
            FreshnessColor: { RGB: [0, 0, 0] },
          },
          {
            DownscrollDuration: 475.0,
            FlatDisplayDuration: 0.0,
            FreshnessColor: { RGB: [0, 255, 0] },
          },
          {
            DownscrollDuration: 475.0,
            FlatDisplayDuration: 0.0,
            FreshnessColor: { RGB: [255, 0, 255] },
          },
          {
            DownscrollDuration: 475.0,
            FlatDisplayDuration: 0.0,
            FreshnessColor: { RGB: [0, 0, 255] },
          },
          {
            DownscrollDuration: 475.0,
            FlatDisplayDuration: 0.0,
            FreshnessColor: { RGB: [255, 0, 0] },
          },
          {
            DownscrollDuration: 475.0,
            FlatDisplayDuration: 0.0,
            FreshnessColor: { RGB: [0, 255, 0] },
          },
          {
            DownscrollDuration: 475.0,
            FlatDisplayDuration: 0.0,
            FreshnessColor: { RGB: [255, 255, 0] },
          },
          {
            DownscrollDuration: 475.0,
            FlatDisplayDuration: 0.0,
            FreshnessColor: { RGB: [0, 255, 0] },
          },
        ],
        LightChallengeType: 'SEQUENTIAL',
        OvalParameters: {
          CenterX: 320.0,
          CenterY: 240.0,
          Height: 465.0,
          Width: 288.0,
        },
      },
    },
  },
};

function getServer(): Bluebird<Client> {
  console.log('get server');
  return new Cypress.Promise((resolve) => {
    const mockServer = new Server(
      'wss://streaming-rekognition-gamma.us-east-1.amazonaws.com/start-face-liveness-session-websocket'
    );
    // Resolve the promise once socket is connected
    mockServer.on('connection', (socketHandle) => {
      console.log('WebSocket connection established');
      socketHandle.on('message', (data) => {
        console.log('message received:', data);
        socketHandle.send(JSON.stringify(serverResponse));
      });
      resolve(socketHandle);
    });
  });
}

let socketPromise: Bluebird<Client> | null = null;

Then('I start the websocket server at example {string}', (example: string) => {
  return cy.visit(example, {
    onBeforeLoad(win) {
      Object.defineProperty(win.navigator, 'language', { value: language });

      socketPromise = getServer();
      // Stub the WebSocket constructor to use the mock server
      cy.stub(win, 'WebSocket').callsFake((url) => {
        const mockSocket = new WebSocket(url);
        mockSocket.onopen = () => {
          console.log('WebSocket opened');
        };
        mockSocket.onmessage = (event) => {
          console.log('WebSocket message received:', event.data);
        };

        return mockSocket;
      });
    },
    onLoad(contentWindow) {
      window = contentWindow;
    },
  });
});

Then(
  'I verify the websocket request has query param {string} with value {string}',
  (param: string, value: string) => {
    if (!socketPromise) {
      throw new Error('WebSocket server not started');
    }

    cy.wrap(socketPromise).then((socket: Client) => {
      const url = new URL(socket.url);
      const queryParams = url.searchParams;
      expect(queryParams.has(param)).to.be.true;
      expect(queryParams.get(param)).to.equal(value);
    });
  }
);

Then(
  'I verify the websocket request at example {string} has query param {string} with value {string}',
  (example: string, param: string, value: string) => {
    let socketPromise: Bluebird<Client>;

    cy.visit(example, {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: language });

        socketPromise = getServer();
        // Stub the WebSocket constructor to use the mock server
        cy.stub(win, 'WebSocket').callsFake((url) => {
          return new WebSocket(url);
        });
      },
      onLoad(contentWindow) {
        window = contentWindow;
      },
    }).then(() => {
      // Once window loads wait for promise to resolve and make assertions
      cy.wrap(socketPromise).then((socket: Client) => {
        const url = new URL(socket.url);
        const queryParams = url.searchParams;
        expect(queryParams.has(param)).to.be.true;
        expect(queryParams.get(param)).to.equal(value);
      });
    });
  }
);

Then('I see the {string} timeout error', (message: string) => {
  cy.findByRole('document')
    .contains(new RegExp(escapeRegExp(message), 'i'), {
      timeout: LIVENESS_TIMEOUT,
    })
    .should('exist');
});
