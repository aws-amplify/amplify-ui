import 'web-streams-polyfill';
import 'blob-polyfill';

import {
  ClientSessionInformationEvent,
  VideoEvent,
} from '@aws-sdk/client-rekognitionstreaming';

import { StreamResult, StreamResultType, VideoStream } from '../../types';

import { createRequestStreamGenerator } from '../createRequestStreamGenerator';

const streamStop: StreamResult<'streamStop'> = { type: 'streamStop' };
const streamVideo: StreamResult<'streamVideo'> = {
  data: new Blob(),
  type: 'streamVideo',
};
const sessionInfo: StreamResult<'sessionInfo'> = {
  data: { Challenge: undefined },
  type: 'sessionInfo',
};
const closeCode: StreamResult<'closeCode'> = {
  data: { closeCode: 13 },
  type: 'closeCode',
};

// handles async resolving of 'VideoChunk' value of 'streamVideo' event
const getExpectedResult = async (
  resultType: StreamResultType
): Promise<
  IteratorResult<
    | { VideoEvent: VideoEvent }
    | { ClientSessionInformationEvent: ClientSessionInformationEvent }
  >
> => {
  const results = {
    streamVideo: {
      value: {
        VideoEvent: {
          VideoChunk: new Uint8Array(await streamVideo.data.arrayBuffer()),
          TimestampMillis: mockTimestamp,
        },
      },
      done: false,
    },
    sessionInfo: {
      value: { ClientSessionInformationEvent: sessionInfo.data },
      done: false,
    },
    closeCode: {
      value: {
        VideoEvent: {
          VideoChunk: new Uint8Array([]),
          // closeCode events expect the shape of `TimestampMillis` to be `{ closeCode: number }`
          TimestampMillis: closeCode.data as unknown as number,
        },
      },
      done: false,
    },
    streamStop: {
      value: {
        VideoEvent: {
          VideoChunk: new Uint8Array([]),
          TimestampMillis: mockTimestamp,
        },
      },
      done: false,
    },
  };
  return results[resultType];
};

const mockRead = jest.fn();
(ReadableStream as jest.Mock) = jest.fn(() => ({
  getReader: jest.fn(() => ({ read: mockRead })),
}));

const videoStream: VideoStream = new ReadableStream();
const mockTimestamp = 12345;

describe('createRequestStreamGenerator', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(mockTimestamp);

    mockRead.mockClear();
  });

  it.each([
    ['streamStop', streamStop],
    ['streamVideo', streamVideo],
    ['sessionInfo', sessionInfo],
    ['closeCode', closeCode],
  ])('handles a `streamVideo` event', async (resultType, value) => {
    mockRead.mockResolvedValueOnce({ value, done: false });

    const { getRequestStream } = createRequestStreamGenerator(videoStream);
    const requestStream = getRequestStream();

    const yielded = await requestStream.next();
    const expected = await getExpectedResult(resultType as StreamResultType);

    expect(yielded).toStrictEqual(expected);
  });

  it('yields a `value` of `undefined` when `done` is `true`', async () => {
    const doneEvent = { value: undefined, done: true };
    mockRead.mockResolvedValueOnce(doneEvent);

    const { getRequestStream } = createRequestStreamGenerator(videoStream);
    const requestStream = getRequestStream();

    const yielded = await requestStream.next();

    expect(yielded.done).toBe(true);
    expect(yielded.value).toBe(undefined);
  });
});
