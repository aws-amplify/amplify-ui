import { ClientSessionInformation } from '@/types/liveness/liveness-service-types';
import { AmazonAIInterpretPredictionsProvider } from '@aws-amplify/predictions';
import { Rekognition } from 'aws-sdk-liveness';
import { VideoRecorder } from './video-recorder';
export interface StartLivenessStreamInput {
  sessionId: string;
}

export interface StartLivenessStreamOutput {
  sessionId: string;
  stream: WebSocket;
}

export class LivenessStreamProvider extends AmazonAIInterpretPredictionsProvider {
  public sessionId: string;
  public videoRecorder: VideoRecorder;

  private _reader: ReadableStreamDefaultReader;
  private _stream: MediaStream;

  constructor(sessionId: string, stream: MediaStream) {
    super();
    this.sessionId = sessionId;
    this._stream = stream;
    this.videoRecorder = new VideoRecorder(stream);
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
    this.videoRecorder.start(100);
    const livenessRequestGenerator = this.getAsyncGeneratorFromReadableStream(
      this.videoRecorder.videoStream
    )();

    const rekognition = new Rekognition();
    // const response = await rekognition.startLivenessDetection({
    //   SessionId: this.sessionId,
    //   LivenessRequestStream: livenessRequestGenerator,
    // });
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
