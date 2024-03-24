import {
  ClientSessionInformationEvent,
  LivenessRequestStream,
} from '@aws-sdk/client-rekognitionstreaming';

export interface RequestStream extends AsyncGenerator<LivenessRequestStream> {}
export interface VideoStream extends ReadableStream<StreamResult> {}

export type StreamResultType =
  | 'closeCode'
  | 'sessionInfo'
  | 'streamStop'
  | 'streamVideo';

export type StreamResult<T extends StreamResultType = StreamResultType> =
  T extends 'closeCode'
    ? { type: T; data: { closeCode: number } }
    : T extends 'streamVideo'
    ? { type: T; data: Blob }
    : T extends 'sessionInfo'
    ? { type: T; data: ClientSessionInformationEvent }
    : T extends 'streamStop'
    ? { type: T; data?: never }
    : never;
