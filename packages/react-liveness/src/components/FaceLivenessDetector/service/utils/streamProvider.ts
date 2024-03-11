import { getAmplifyUserAgent } from '@aws-amplify/core/internals/utils';
import { fetchAuthSession } from 'aws-amplify/auth';
import {
  ClientSessionInformationEvent,
  LivenessResponseStream,
  RekognitionStreamingClient,
  RekognitionStreamingClientConfig,
  StartFaceLivenessSessionCommand,
} from '@aws-sdk/client-rekognitionstreaming';
import { VideoRecorder } from './videoRecorder';
import { getLivenessUserAgent } from '../../utils/platform';
import { AwsCredentialProvider } from '../types';
import { CustomWebSocketFetchHandler } from './CustomWebSocketFetchHandler';

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

  private async init() {
    const credentials =
      this.credentialProvider ?? (await fetchAuthSession()).credentials;

    if (!credentials) {
      throw new Error('No credentials');
    }

    const clientconfig: RekognitionStreamingClientConfig = {
      credentials,
      region: this.region,
      customUserAgent: `${getAmplifyUserAgent()} ${getLivenessUserAgent()}`,
      requestHandler: new CustomWebSocketFetchHandler({
        connectionTimeout: 10_000,
      }),
    };

    if (this.endpointOverride) {
      const override = this.endpointOverride;
      clientconfig.endpointProvider = () => {
        const url = new URL(override);
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
    // eslint-disable-next-line @typescript-eslint/no-this-alias
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
        } else if (isEndStreamWithCodeEvent(value)) {
          yield {
            VideoEvent: {
              VideoChunk: [],
              TimestampMillis: { closeCode: value.code },
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
