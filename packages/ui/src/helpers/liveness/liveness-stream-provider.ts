import { ClientSessionInformation } from '@/types/liveness/liveness-service-types';
import { Credentials } from '@aws-amplify/core';
import { AmazonAIInterpretPredictionsProvider } from '@aws-amplify/predictions';
import {
  LivenessRequestStream,
  RekognitionStreamingClient,
  StartStreamingLivenessSessionCommand,
} from '@aws-sdk/client-rekognitionstreaming';
import { Rekognition } from 'aws-sdk-liveness';
import { VideoRecorder } from './video-recorder';
export interface StartLivenessStreamInput {
  sessionId: string;
}
export interface StartLivenessStreamOutput {
  sessionId: string;
  stream: WebSocket;
}

const ENDPOINT =
  'https://us-east-1.gamma.streaming.reventlov.rekognition.aws.dev';
const REGION = 'us-east-1';

export interface Credentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
}

export class LivenessStreamProvider extends AmazonAIInterpretPredictionsProvider {
  public sessionId: string;
  public videoRecorder: VideoRecorder;

  private _reader: ReadableStreamDefaultReader;
  private _stream: MediaStream;
  private _client: RekognitionStreamingClient;
  private _initPromise: Promise<void>;

  constructor(sessionId: string, stream: MediaStream) {
    super();
    this.sessionId = sessionId;
    this._stream = stream;
    this.videoRecorder = new VideoRecorder(stream);
    this._initPromise = this.init();
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
        if (isBlob(value)) {
          const buffer = await value.arrayBuffer();
          var chunk = new Uint8Array(buffer);
          yield {
            VideoEvent: {
              VideoChunk: chunk,
            },
          };
        } else if (isLivenessActionDocument(value)) {
          // livenessActionDocument should sent as client session info events
          yield {
            ClientSessionInformationEvent: {
              DeviceInformation: value.deviceInformation,
              Challenge: value.challenge,
            },
          };
        } else {
          continue;
        }
      }
    };
  }

  public async streamLivenessVideo(): Promise<any> {
    await this._initPromise;
    this.videoRecorder.start(100);
    const livenessRequestGenerator = this.getAsyncGeneratorFromReadableStream(
      this.videoRecorder.videoStream
    )();

    const response = await this._client.send(
      new StartStreamingLivenessSessionCommand({
        SessionId: this.sessionId,
        LivenessRequestStream: livenessRequestGenerator,
      })
    );

    for await (const event of response.LivenessResponseStream) {
      console.log(event);
    }
  }

  public sendClientInfo(livenessActionDocument: any) {
    this.videoRecorder.dispatch(
      new MessageEvent('clientSesssionInfo', {
        data: { livenessActionDocument },
      })
    );
  }

  public async endStream() {
    console.log('endstream');
    // this.videoRecorder.dispatch(new Event('endStream'));
    this.videoRecorder.stop();

    return this._reader.closed;
  }
}

function isBlob(obj: any): obj is Blob {
  return (obj as Blob).arrayBuffer !== undefined;
}

function isLivenessActionDocument(obj: any): obj is ClientSessionInformation {
  return (
    (obj as ClientSessionInformation).deviceInformation !== undefined ||
    (obj as ClientSessionInformation).challenge !== undefined
  );
}

async function streamLivenessVideoStatic(
  sessionId: string,
  videoStream: MediaStream
): Promise<any> {
  const provider = new LivenessStreamProvider(sessionId, videoStream);

  provider.videoRecorder.start(100);
  const { responseStream } = await provider.streamLivenessVideo();

  return {
    sessionId,
    responseStream,
    endStream: provider.endStream,
    sendClientInfo: provider.sendClientInfo,
  };
}
