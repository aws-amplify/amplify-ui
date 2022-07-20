import { AmazonAIInterpretPredictionsProvider } from '@aws-amplify/predictions';
import { Rekognition } from 'aws-sdk-liveness';
import { LivenessActionDocument } from '../../../dist/types/types/liveness/liveness-service-types';
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

  private _reader: ReadableStreamDefaultReader;

  constructor(sessionId: string) {
    super();
    this.sessionId = sessionId;
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
              Challenge: value.challenges[0],
            },
          };
        } else {
          continue;
        }
      }
    };
  }

  public async streamLivenessVideo(videoStream: ReadableStream): Promise<any> {
    const livenessRequestGenerator =
      this.getAsyncGeneratorFromReadableStream(videoStream)();

    const rekognition = new Rekognition();
    // const response = await rekognition.startLivenessDetection({
    //   SessionId: this.sessionId,
    //   LivenessRequestStream: livenessRequestGenerator,
    // });
  }

  public sendClientInfo(
    videoRecorder: VideoRecorder,
    livenessActionDocument: any
  ) {
    videoRecorder.dispatch(
      new MessageEvent('clientSesssionInfo', {
        data: { livenessActionDocument },
      })
    );
  }

  public async endStream(videoRecorder: VideoRecorder) {
    videoRecorder.dispatch(new Event('endStream'));

    await this._reader.closed;
    return;
  }
}

function isBlob(obj: any): obj is Blob {
  return (obj as Blob).arrayBuffer !== undefined;
}

function isLivenessActionDocument(obj: any): obj is LivenessActionDocument {
  return (
    (obj as LivenessActionDocument).deviceInformation !== undefined ||
    Array.isArray((obj as LivenessActionDocument).challenges)
  );
}
