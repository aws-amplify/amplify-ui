import {
  Credentials as AmplifyCredentials,
  getAmplifyUserAgent,
} from '@aws-amplify/core';
import { AmazonAIInterpretPredictionsProvider } from '@aws-amplify/predictions';
import {
  ClientSessionInformationEvent,
  LivenessResponseStream,
  RekognitionStreamingClient,
  RekognitionStreamingClientConfig,
  StartFaceLivenessSessionCommand,
} from '@aws-sdk/client-rekognitionstreaming';
import { WebSocketFetchHandler } from '@aws-sdk/middleware-websocket';
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
}

const ENDPOINT = process.env.NEXT_PUBLIC_STREAMING_API_URL;
export const TIME_SLICE = 1000;

function isBlob(obj: unknown): obj is Blob {
  return (obj as Blob).arrayBuffer !== undefined;
}

function isClientSessionInformationEvent(
  obj: unknown
): obj is ClientSessionInformationEvent {
  return (obj as ClientSessionInformationEvent).Challenge !== undefined;
}

export class LivenessStreamProvider extends AmazonAIInterpretPredictionsProvider {
  public sessionId: string;
  public region: string;
  public videoRecorder: VideoRecorder;
  public responseStream!: AsyncIterable<LivenessResponseStream>;
  public credentialProvider?: AwsCredentialProvider;

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
  }: StreamProviderArgs) {
    super();
    this.sessionId = sessionId;
    this.region = region;
    this._stream = stream;
    this.videoEl = videoEl;
    this.videoRecorder = new VideoRecorder(stream);
    this.credentialProvider = credentialProvider;
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
      new MessageEvent('clientSesssionInfo', {
        data: { clientInfo },
      })
    );
  }

  public async stopVideo(): Promise<void> {
    await this.videoRecorder.stop();
  }

  public dispatchStopVideoEvent(): void {
    this.videoRecorder.dispatch(new Event('stopVideo'));
  }

  public async endStream(): Promise<undefined> {
    if (this.videoRecorder.getState() === 'recording') {
      await this.stopVideo();
      this.dispatchStopVideoEvent();
    }
    if (!this._reader) {
      return;
    }
    await this._reader.cancel();
    return this._reader.closed;
  }

  private async init() {
    const credentials =
      this.credentialProvider ??
      ((await AmplifyCredentials.get()) as Credentials);

    if (!credentials) {
      throw new Error('No credentials');
    }

    const clientconfig: RekognitionStreamingClientConfig = {
      credentials,
      region: this.region,
      customUserAgent: getAmplifyUserAgent(),
      requestHandler: new WebSocketFetchHandler({ connectionTimeout: 10_000 }),
    };

    if (ENDPOINT) {
      clientconfig.endpointProvider = () => {
        const url = new URL(ENDPOINT);
        return { url };
      };
    }

    this._client = new RekognitionStreamingClient(clientconfig);

    this.responseStream = await this.startLivenessVideoConnection();
  }

  // Creates a generator from a stream of video chunks and livenessActionDocuments and yields VideoEvent and ClientEvents
  private getAsyncGeneratorFromReadableStream(
    stream: ReadableStream
  ): () => AsyncGenerator<any> {
    const current = this;
    this._reader = stream.getReader();
    return async function* () {
      while (true) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { done, value } = await current._reader.read();
        if (done) {
          return;
        }

        // Video chunks blobs should be sent as video events
        if (value === 'stopVideo') {
          // sending an empty video chunk signals that we have ended sending video
          yield {
            VideoEvent: {
              VideoChunk: [],
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

    const response = await this._client.send(
      new StartFaceLivenessSessionCommand({
        ChallengeVersions: 'FaceMovementAndLightChallenge_1.0.0',
        SessionId: this.sessionId,
        LivenessRequestStream: livenessRequestGenerator,
        VideoWidth: this.videoEl.videoWidth.toString(),
        VideoHeight: this.videoEl.videoHeight.toString(),
      })
    );
    return response.LivenessResponseStream!;
  }
}
