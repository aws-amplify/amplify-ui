import type {
  ClientSessionInformationEvent,
  LivenessRequestStream,
  LivenessResponseStream,
  RekognitionStreamingClient,
} from '@aws-sdk/client-rekognitionstreaming';
import { StartFaceLivenessSessionCommand } from '@aws-sdk/client-rekognitionstreaming';
import { VideoRecorder } from './videoRecorder';

import type { AwsCredentialProvider } from '../types';
import { createStreamingClient } from './createStreamingClient';

export interface StartLivenessStreamInput {
  sessionId: string;
}

export interface StartLivenessStreamOutput extends StartLivenessStreamInput {
  stream: WebSocket;
}

interface StreamProviderArgs extends StartLivenessStreamInput {
  region: string;
  stream: MediaStream;
  videoEl: HTMLVideoElement;
  credentialProvider?: AwsCredentialProvider;
  endpointOverride?: string;
  systemClockOffset?: number;
}

const TIME_SLICE = 1000;

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
  public endpointOverride?: string;
  public systemClockOffset?: number;

  private _reader!: ReadableStreamDefaultReader;
  private videoEl: HTMLVideoElement;
  private _client!: RekognitionStreamingClient;
  private stream: MediaStream;
  private initPromise: Promise<void>;

  constructor({
    sessionId,
    region,
    stream,
    videoEl,
    credentialProvider,
    endpointOverride,
    systemClockOffset,
  }: StreamProviderArgs) {
    this.sessionId = sessionId;
    this.region = region;
    this.stream = stream;
    this.videoEl = videoEl;
    this.videoRecorder = new VideoRecorder(stream);
    this.credentialProvider = credentialProvider;
    this.endpointOverride = endpointOverride;
    this.systemClockOffset = systemClockOffset;
    this.initPromise = this.init();
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
    this.videoRecorder.dispatch(
      new MessageEvent('clientSesssionInfo', { data: { clientInfo } })
    );
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
      new MessageEvent('endStreamWithCode', { data: { code } })
    );

    return;
  }

  private async init() {
    this._client = await createStreamingClient({
      credentialsProvider: this.credentialProvider,
      endpointOverride: this.endpointOverride,
      region: this.region,
      systemClockOffset: this.systemClockOffset,
    });

    this.responseStream = await this.startLivenessVideoConnection();
  }

  // Creates a generator from a stream of video chunks and livenessActionDocuments and yields VideoEvent and ClientEvents
  private getAsyncGeneratorFromReadableStream(
    stream: ReadableStream
  ): () => AsyncGenerator<LivenessRequestStream> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const current = this;
    this._reader = stream.getReader();
    return async function* () {
      while (true) {
        const { done, value } = (await current._reader.read()) as {
          done: boolean;
          value:
            | 'stopVideo'
            | Uint8Array
            | ClientSessionInformationEvent
            | EndStreamWithCodeEvent;
        };
        if (done) {
          return;
        }

        // Video chunks blobs should be sent as video events
        if (value === 'stopVideo') {
          // sending an empty video chunk signals that we have ended sending video
          yield {
            VideoEvent: {
              VideoChunk: new Uint8Array([]),
              TimestampMillis: Date.now(),
            },
          };
        } else if (isBlob(value)) {
          const buffer = await value.arrayBuffer();
          const chunk = new Uint8Array(buffer);
          if (chunk.length > 0) {
            yield {
              VideoEvent: {
                VideoChunk: chunk,
                TimestampMillis: Date.now(),
              },
            };
          }
        } else if (isClientSessionInformationEvent(value)) {
          yield {
            ClientSessionInformationEvent: {
              Challenge: value.Challenge,
            },
          };
        } else if (isEndStreamWithCodeEvent(value)) {
          yield {
            VideoEvent: {
              VideoChunk: new Uint8Array([]),
              // this is a custom type that does not match LivenessRequestStream.
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              TimestampMillis: { closeCode: value.code } as any,
            },
          };
        }
      }
    };
  }

  private async startLivenessVideoConnection(): Promise<
    AsyncIterable<LivenessResponseStream>
  > {
    const livenessRequestGenerator = this.getAsyncGeneratorFromReadableStream(
      this.videoRecorder.videoStream
    )();

    const mediaSettings = this.stream.getTracks()[0].getSettings();

    const response = await this._client.send(
      new StartFaceLivenessSessionCommand({
        ChallengeVersions: 'FaceMovementAndLightChallenge_1.0.0',
        SessionId: this.sessionId,
        LivenessRequestStream: livenessRequestGenerator,
        VideoWidth: (mediaSettings.width ?? this.videoEl.width).toString(),
        VideoHeight: (mediaSettings.height ?? this.videoEl.height).toString(),
      })
    );
    return response.LivenessResponseStream!;
  }
}
