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

// DCA v2 utility types
export interface StreamRecorderConfig {
  sessionId: string;
  challengeId: string;
  videoWidth: number;
  videoHeight: number;
}

export interface StreamRecorderMetadata {
  trackDimensions: {
    width: number;
    height: number;
  };
  sessionInfo: any; // Will be properly typed when session info is available
  challengeId: string;
  recordingTimestamp: number;
}

export interface ColorSequenceDisplayConfig {
  colors: string[];
  duration: number;
  challengeId: string;
}

export interface ColorSequenceDisplayState {
  currentColorIndex: number;
  isActive: boolean;
  startTime: number;
  colors: string[];
}

// StreamRecorder class interface
export interface StreamRecorder {
  start(): Promise<void>;
  stop(): Promise<Blob>;
  getMetadata(): StreamRecorderMetadata;
  dispatchSessionEvent(event: any): void;
}

// ColorSequenceDisplay class interface
export interface ColorSequenceDisplay {
  start(): void;
  stop(): void;
  getCurrentColor(): string | null;
  getState(): ColorSequenceDisplayState;
  isComplete(): boolean;
}
