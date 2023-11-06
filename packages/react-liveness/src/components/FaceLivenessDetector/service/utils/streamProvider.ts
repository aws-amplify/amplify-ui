import {
  ClientSessionInformationEvent,
  LivenessResponseStream,
  RekognitionStreamingClient,
} from '@aws-sdk/client-rekognitionstreaming';
import { VideoRecorder } from './videoRecorder';
import { AwsCredentialProvider } from '../types';

export interface StartLivenessStreamInput {
  sessionId: string;
}
export interface StartLivenessStreamOutput {
  sessionId: string;
  stream: WebSocket;
}

export interface Credentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
}

export interface StreamProviderArgs {
  sessionId: string;
  region: string;
  stream: MediaStream;
  videoEl: HTMLVideoElement;
  credentialProvider?: AwsCredentialProvider;
  endpointOverride?: string;
}

export const TIME_SLICE = 1000;

function isBlob(obj: unknown): obj is Blob {
  return (obj as Blob).arrayBuffer !== undefined;
}

function isClientSessionInformationEvent(
  obj: unknown
): obj is ClientSessionInformationEvent {
  return (obj as ClientSessionInformationEvent).Challenge !== undefined;
}

interface EndStreamWithCodeEvent {
  type: string;
  code: number;
}

function isEndStreamWithCodeEvent(obj: unknown): obj is EndStreamWithCodeEvent {
  return (obj as EndStreamWithCodeEvent).code !== undefined;
}

export class LivenessStreamProvider {
  public sessionId: string;
  public region: string;
  public videoRecorder: VideoRecorder;
  public responseStream!: AsyncIterable<LivenessResponseStream>;
  public credentialProvider?: AwsCredentialProvider;
  public clientInfo: any[];
  public endpointOverride?: string;

  private _reader!: ReadableStreamDefaultReader;
  private videoEl: HTMLVideoElement;
  private _client!: RekognitionStreamingClient;
  private _stream: MediaStream;
  private initPromise: Promise<void>;

  constructor({
    sessionId,
    region,
    stream,
    videoEl,
    credentialProvider,
    endpointOverride,
  }: StreamProviderArgs) {
    this.sessionId = sessionId;
    this.region = region;
    this._stream = stream;
    this.videoEl = videoEl;
    this.videoRecorder = new VideoRecorder(stream);
    this.credentialProvider = credentialProvider;
    this.endpointOverride = endpointOverride;
    this.initPromise = this.init();
    this.clientInfo = [];
  }

  public async getResponseStream(): Promise<
    AsyncIterable<LivenessResponseStream>
  > {
    await this.initPromise;
    return this.responseStream;
  }

  public startRecordingLivenessVideo(): void {
    this.videoRecorder.start(TIME_SLICE);
  }

  public sendClientInfo(clientInfo: ClientSessionInformationEvent): void {
    this.clientInfo.push(clientInfo);
  }

  public async stopVideo(): Promise<void> {
    await this.videoRecorder.stop();
  }

  public dispatchStopVideoEvent(): void {
    this.videoRecorder.dispatch(new Event('stopVideo'));
  }

  public async endStreamWithCode(code?: number): Promise<undefined> {
    if (this.videoRecorder.getState() === 'recording') {
      await this.stopVideo();
    }
    this.videoRecorder.dispatch(
      new MessageEvent('endStreamWithCode', {
        data: { code: code },
      })
    );

    return;
  }

  private async init() {}

  private async startLivenessVideoConnection(): Promise<void> {}
}
