import {
  LivenessRequestStream,
  VideoEvent,
} from '@aws-sdk/client-rekognitionstreaming';

import { StreamResult, VideoStream } from '../types';
interface RequestStream extends AsyncGenerator<LivenessRequestStream> {}
type GetRequestStream = () => RequestStream;

const createVideoEvent = async (
  result: Exclude<StreamResult, StreamResult<'sessionInfo'>>
): Promise<VideoEvent> => {
  const { data, type } = result;
  return {
    VideoChunk: new Uint8Array(
      // server expects an empty chunk on 'stopStream' event
      type === 'streamVideo' ? await data.arrayBuffer() : []
    ),
    // @ts-expect-error for 'closeCode' event, `data` is an object which is
    // unexpected by `VideoEvent` but is expected by the streaming service
    TimestampMillis: type === 'closeCode' ? data : Date.now(),
  };
};

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
