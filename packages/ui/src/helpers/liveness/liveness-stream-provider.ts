import {
  Credentials as AmplifyCredentials,
  getAmplifyUserAgent,
} from '@aws-amplify/core';
import { AmazonAIInterpretPredictionsProvider } from '@aws-amplify/predictions';
import {
  ClientSessionInformationEvent,
  LivenessResponseStream,
  RekognitionStreamingClient,
  StartFaceLivenessSessionCommand,
} from '@aws-sdk/client-rekognitionstreaming';
import { VideoRecorder } from './video-recorder';
export interface StartLivenessStreamInput {
  sessionId: string;
}
export interface StartLivenessStreamOutput {
  sessionId: string;
  stream: WebSocket;
}

// FIXME: default endpoint to prod for now, remove this when sdk has the proper endpoints setup
const ENDPOINT =
  process.env.NEXT_PUBLIC_STREAMING_API_URL ||
  'wss://streaming-rekognition.us-east-1.amazonaws.com:443';
const REGION = process.env.NEXT_PUBLIC_BACKEND_API_REGION || 'us-east-1';
export const TIME_SLICE = 200;

export interface Credentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
}

export class LivenessStreamProvider extends AmazonAIInterpretPredictionsProvider {
  public sessionId: string;
  public videoRecorder: VideoRecorder;
  public responseStream: AsyncIterable<LivenessResponseStream>;

  private _reader: ReadableStreamDefaultReader;
  private _stream: MediaStream;
  private videoEl: HTMLVideoElement;
  private _client: RekognitionStreamingClient;
  private initPromise: Promise<void>;

  constructor(
    sessionId: string,
    stream: MediaStream,
    videoEl: HTMLVideoElement
  ) {
    super();
    this.sessionId = sessionId;
    this._stream = stream;
    this.videoEl = videoEl;
    this.videoRecorder = new VideoRecorder(stream);
    this.initPromise = this.init();
  }

  private async init() {
    const credentials = await AmplifyCredentials.get();

    if (!credentials) {
      throw new Error('No credentials');
    }

    this._client = new RekognitionStreamingClient({
      credentials,
      endpointProvider: () => {
        const url = new URL(ENDPOINT);
        return { url };
      },
      region: REGION,
      customUserAgent: getAmplifyUserAgent(),
    });

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
        const { done, value } = await current._reader.read();
        if (done) {
          return;
        }

        // Video chunks blobs should be sent as video events
        if (value === 'stopVideo') {
          // sending an empty video chunk signals that we have ended sending video
          console.log(`finalVideoChunk: ${Date.now()}`);
          yield {
            VideoEvent: {
              VideoChunk: [],
              TimestampMillis: Date.now(),
            },
          };
        } else if (isBlob(value)) {
          const buffer = await value.arrayBuffer();
          var chunk = new Uint8Array(buffer);
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
              DeviceInformation: value.DeviceInformation,
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
        ClientSDKVersion: '1.0.0',
        SessionId: this.sessionId,
        LivenessRequestStream: livenessRequestGenerator,
        VideoWidth: this.videoEl.videoWidth.toString(),
        VideoHeight: this.videoEl.videoHeight.toString(),
      })
    );
    return response.LivenessResponseStream;
  }

  public async getResponseStream(): Promise<
    AsyncIterable<LivenessResponseStream>
  > {
    await this.initPromise;
    return this.responseStream;
  }

  public async startRecordingLivenessVideo(): Promise<void> {
    this.videoRecorder.start(TIME_SLICE);
  }

  public sendClientInfo(clientInfo: ClientSessionInformationEvent) {
    this.videoRecorder.dispatch(
      new MessageEvent('clientSesssionInfo', {
        data: { clientInfo },
      })
    );
  }

  public async stopVideo() {
    this.videoRecorder.stop();
  }

  public async dispatchStopVideoEvent() {
    this.videoRecorder.dispatch(new Event('stopVideo'));
  }

  public async endStream() {
    if (this.videoRecorder.getState() === 'recording') {
      await this.stopVideo();
      this.dispatchStopVideoEvent();
    }
    await this._reader.cancel();
    return this._reader.closed;
  }
}

function isBlob(obj: any): obj is Blob {
  return (obj as Blob).arrayBuffer !== undefined;
}

function isClientSessionInformationEvent(
  obj: any
): obj is ClientSessionInformationEvent {
  return obj.DeviceInformation !== undefined || obj.Challenge !== undefined;
}
