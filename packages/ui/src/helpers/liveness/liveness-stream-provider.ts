import { Credentials, getAmplifyUserAgent } from '@aws-amplify/core';
import { AmazonAIInterpretPredictionsProvider } from '@aws-amplify/predictions';
import {
  EventStreamCodec,
  Message,
  TimestampHeaderValue,
} from '@aws-sdk/eventstream-codec';
import { fromUtf8, toUtf8 } from '@aws-sdk/util-utf8-node';
import { Rekognition } from 'aws-sdk-liveness';
import RekognitionLiveness from 'aws-sdk-liveness/clients/rekognitionliveness';
import { LivenessActionDocument } from '../../../dist/types/types/liveness/liveness-service-types';
import {
  getLivenessClientSessionInfoEvent,
  getLivenessVideoEvent,
} from './liveness-event-utils';
export interface StartLivenessStreamInput {
  sessionId: string;
}

export interface StartLivenessStreamOutput {
  sessionId: string;
  stream: WebSocket;
}

const eventStreamCodec = new EventStreamCodec(toUtf8, fromUtf8);

export class LivenessStreamProvider extends AmazonAIInterpretPredictionsProvider {
  public sessionId: string;

  constructor(sessionId: string) {
    super();
    this.sessionId = sessionId;
  }

  // Creates a generator from a stream of video chunks and livenessActionDocuments and yields VideoEvent and ClientEvents
  private getAsyncGeneratorFromReadableStream(
    stream: ReadableStream
  ): () => AsyncGenerator<any> {
    const reader = stream.getReader();
    return async function* () {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('done');
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
    videoRecorder: MediaRecorder,
    livenessActionDocument: any
  ) {
    videoRecorder.dispatchEvent(
      new MessageEvent('clientSesssionInfo', {
        data: { livenessActionDocument },
      })
    );
  }
}

function isBlob(obj: any): obj is Blob {
  return (obj as Blob).arrayBuffer !== undefined;
}

function isLivenessActionDocument(obj: any): obj is LivenessActionDocument {
  return (
    (obj as LivenessActionDocument).deviceInformation !== undefined &&
    Array.isArray((obj as LivenessActionDocument).challenges)
  );
}
