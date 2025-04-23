import { LivenessRequestStream } from '@aws-sdk/client-rekognitionstreaming';

import { VideoStream } from '../types';
import { createVideoEvent } from './utils';

interface RequestStream extends AsyncGenerator<LivenessRequestStream> {}
type GetRequestStream = () => RequestStream;

/**
 * Creates an async generator that reads over the provided stream and yielding stream results
 *
 * @param {VideoStream} stream target video stream
 * @returns {GetRequestStream} async request stream generator
 */
export function createRequestStreamGenerator(stream: VideoStream): {
  getRequestStream: GetRequestStream;
} {
  const reader = stream.getReader();

  return {
    getRequestStream: async function* () {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          return;
        }

        if (value.type === 'sessionInfo') {
          yield { ClientSessionInformationEvent: value.data };
        } else {
          yield { VideoEvent: await createVideoEvent(value) };
        }
      }
    },
  };
}
