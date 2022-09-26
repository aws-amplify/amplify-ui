import { Credentials } from '@aws-amplify/core';
import { AmazonAIInterpretPredictionsProvider } from '@aws-amplify/predictions';
import {
  ClientSessionInformationEvent,
  LivenessResponseStream,
  RekognitionStreamingClient,
  StartStreamingLivenessSessionCommand,
} from '@aws-sdk/client-rekognitionstreaming';
import { VideoRecorder } from './video-recorder';
export interface StartLivenessStreamInput {
  sessionId: string;
}
export interface StartLivenessStreamOutput {
  sessionId: string;
  stream: WebSocket;
}

const ENDPOINT =
  'wss://streaming-rekognition-gamma.us-east-1.amazonaws.com:443';
const REGION = 'us-east-1';

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
  private _client: RekognitionStreamingClient;
  private initPromise: Promise<void>;

  constructor(sessionId: string, stream: MediaStream) {
    super();
    this.sessionId = sessionId;
    this._stream = stream;
    this.videoRecorder = new VideoRecorder(stream);
    this.initPromise = this.init();
  }

  private async init() {
    const credentials = await Credentials.get();

    if (!credentials) {
      throw new Error('No credentials');
    }

    this._client = new RekognitionStreamingClient({
      credentials,
      endpoint: ENDPOINT,
      region: REGION,
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
          yield {
            VideoEvent: {
              VideoChunk: [],
              TimestampMillis: Date.now(),
            },
          };
        } else if (isBlob(value)) {
          const buffer = await value.arrayBuffer();
          var chunk = new Uint8Array(buffer);
          yield {
            VideoEvent: {
              VideoChunk: chunk,
              TimestampMillis: Date.now(),
            },
          };
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
      new StartStreamingLivenessSessionCommand({
        ClientSDKVersion: '1.0.0',
        SessionId: this.sessionId,
        LivenessRequestStream: livenessRequestGenerator,
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
    this.videoRecorder.start(100);
  }

  public sendClientInfo(clientInfo: ClientSessionInformationEvent) {
    this.videoRecorder.dispatch(
      new MessageEvent('clientSesssionInfo', {
        data: { clientInfo },
      })
    );
  }

  public async stopVideo() {
    this.videoRecorder.dispatch(new Event('stopVideo'));
    await this.videoRecorder.stop();
  }

  public async endStream() {
    if (this.videoRecorder.getState() !== 'stopped') {
      await this.stopVideo();
    }
    this.videoRecorder.dispatch(new Event('endStream'));

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
