/* eslint-disable  */
import 'web-streams-polyfill';
import 'blob-polyfill';

import { TextDecoder } from 'util';
import { Amplify } from '@aws-amplify/core';
import { RekognitionStreamingClient } from '@aws-sdk/client-rekognitionstreaming';
import { LivenessStreamProvider } from '../streamProvider';
import { VideoRecorder } from '../videoRecorder';
import { mockClientSessionInformationEvent } from '../__mocks__/testUtils';
import { AwsCredentialProvider } from '../../types';

jest.mock('../videoRecorder');
jest.mock('@aws-sdk/client-rekognitionstreaming');
jest.mock('@aws-amplify/core');

Object.defineProperty(window, 'TextDecoder', {
  writable: true,
  value: TextDecoder,
});

const mockGet = jest.fn().mockImplementation(() => {
  return {
    accessKeyId: 'accessKeyId',
    sessionToken: 'sessionTokenId',
    secretAccessKey: 'secretAccessKey',
    identityId: 'identityId',
    authenticated: true,
    expiration: new Date(),
  };
});
Amplify.Credentials.get = mockGet;

let SWITCH = false;

describe('LivenessStreamProvider', () => {
  const mockReadableStream = {
    getReader: () => {
      return {
        cancel: jest.fn().mockResolvedValueOnce(undefined),
        read: () => {
          return {
            then: (success: (params: any) => void) => {
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
  const mockReadableStreamWithEmptyChunks = {
    getReader: () => {
      return {
        read: () => {
          return {
            then: (success: (params: any) => void) => {
              if (SWITCH) {
                const blob = new Blob([]);
                return success({ done: true, value: blob });
              } else {
                SWITCH = true;
                return success({ done: false, value: [] });
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
    dispatch: jest.fn(),
    getState: jest.fn().mockReturnValue('recording'),
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
  const mockVideoEl = document.createElement('video');

  beforeEach(() => {
    (VideoRecorder as jest.Mock).mockImplementation(() => mockVideoRecorder);
    (RekognitionStreamingClient as jest.Mock).mockImplementation(() => {
      return {
        send: jest.fn().mockImplementation(() => {
          return {
            LivenessResponseStream: 'mockResponseStream',
          };
        }),
      };
    });
    SWITCH = false;
  });

  describe('constructor', () => {
    test('happy case', () => {
      new LivenessStreamProvider({
        sessionId: 'sessionId',
        region: 'us-east-1',
        stream: mockVideoMediaStream,
        videoEl: mockVideoEl,
      });
    });
  });
});
