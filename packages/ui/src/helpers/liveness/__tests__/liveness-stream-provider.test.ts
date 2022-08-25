import WS from 'jest-websocket-mock';
import { getLivenessVideoEvent } from '../liveness-event-utils';
import { LivenessStreamProvider } from '../liveness-stream-provider';
import { VideoRecorder } from '../video-recorder';

jest.mock('../video-recorder');

let SWITCH = false;

describe('LivenessStreamProvider', () => {
  const mockNavigatorMediaDevices: any = {
    getUserMedia: jest.fn(),
    enumerateDevices: jest.fn(),
  };
  const mockReadableStream = {
    getReader: () => {
      return {
        read: () => {
          return {
            then: (success) => {
              if (SWITCH) {
                const blob = new Blob([]);
                return success({ done: true, value: blob });
              } else {
                SWITCH = true;
                const blob = new Blob(['foobar']);
                return success({ done: false, value: blob });
              }
            },
          };
        },
      };
    },
  } as unknown as ReadableStream<Blob>;
  const mockVideoRecorder: any = {
    start: jest.fn(),
    stop: jest.fn(),
    getBlob: jest.fn(),
    destroy: jest.fn(),
    videoStream: mockReadableStream,
  };
  const mockCameraDevice: MediaDeviceInfo = {
    deviceId: 'some-device-id',
    groupId: 'some-group-id',
    kind: 'videoinput',
    label: 'some-label',
    toJSON: () => ({}),
  };
  const mockVideoMediaStream = {
    getTracks: () => [
      {
        getSettings: () => ({
          width: 640,
          height: 480,
          deviceId: mockCameraDevice.deviceId,
        }),
      },
    ],
  } as MediaStream;

  let server: WS;

  beforeEach(() => {
    server = new WS('ws://localhost:3001/StartStreamingLivenessSession');

    server.on('message', (message) => {
      console.log(message);
    });
  });

  afterEach(() => {
    // create a WS instance, listening on port 1234 on localhost
    WS.clean();
  });

  beforeEach(() => {
    (VideoRecorder as jest.Mock).mockImplementation(() => mockVideoRecorder);
  });

  describe('constructor', () => {
    test('happy case', () => {
      const provider = new LivenessStreamProvider(
        'sessionId',
        mockVideoMediaStream
      );
    });
  });

  describe('streamLivenessVideo', () => {
    test('happy case', async () => {
      const provider = new LivenessStreamProvider(
        'sessionId',
        mockVideoMediaStream
      );
      const recorder = new VideoRecorder(mockVideoMediaStream);
      const outputStream = await provider.streamLivenessVideo();

      const blob = new Blob(['foobar']);
      const buffer = await blob.arrayBuffer();

      // FIXME: add tests that mock out startLivenessDetection
    });
  });
});
