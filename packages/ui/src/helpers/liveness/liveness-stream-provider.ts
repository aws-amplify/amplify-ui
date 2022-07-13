import { Credentials, getAmplifyUserAgent } from '@aws-amplify/core';
import { AmazonAIInterpretPredictionsProvider } from '@aws-amplify/predictions';
import {
  EventStreamCodec,
  Message,
  TimestampHeaderValue,
} from '@aws-sdk/eventstream-codec';
import { fromUtf8, toUtf8 } from '@aws-sdk/util-utf8-node';
import RekognitionLiveness from 'aws-sdk-liveness/clients/rekognitionliveness';
import { LivenessActionDocument } from '../../types/liveness/liveness-service-types';
import {
  getLivenessClientSessionInfoEvent,
  getLivenessVideoEvent,
} from './liveness-event-utils';

export interface PutLivenessVideoInput {
  sessionId: string;
  videoBlob: Blob;
  livenessActionDocument: string;
}

export interface PutLivenessVideoOutput {
  sessionId: string;
}

export interface StartLivenessStreamInput {
  sessionId: string;
}

export interface StartLivenessStreamOutput {
  sessionId: string;
  stream: WebSocket;
}

const eventStreamCodec = new EventStreamCodec(toUtf8, fromUtf8);

export class LivenessStreamProvider extends AmazonAIInterpretPredictionsProvider {
  public isStreamCompletePromise: Promise<void>;

  private sessionId: string;
  private socket: WebSocket;
  private isSocketConnectionReadyPromise: Promise<void>;

  constructor(sessionId: string) {
    super();
    this.sessionId = sessionId;
    this.isSocketConnectionReadyPromise = this.initWebSocketConnection();
  }

  private async initWebSocketConnection(): Promise<void> {
    // FIXME: Change to to be a call to StartStreamingLivenessSessionCommand to get socket connection
    this.socket = new WebSocket(
      // 'wss://h6zj47zyvh.execute-api.us-west-2.amazonaws.com/production'
      'ws://localhost:3001/StartStreamingLivenessSession'
    );
    this.socket.binaryType = 'arraybuffer';

    return new Promise((resolve, reject) => {
      this.socket.onopen = () => {
        console.log('ASDFasdfasdf');
        if (this.socket.readyState === this.socket.OPEN) {
          resolve();
        }
      };

      this.socket.onerror = (error) => {
        console.log('WebSocket error', error);
        reject(error);
      };

      this.socket.onclose = (event) => {
        console.log('WebSocket closed', event);
      };

      this.socket.onmessage = (message) => {
        console.log(`Message: ${JSON.stringify(message)}`);
        console.log(`Data: ${message.data}`);
      };
    });
  }

  public async streamLivenessVideo(
    videoStream: ReadableStream<Blob>
  ): Promise<void> {
    await this.isSocketConnectionReadyPromise;
    const current = this;

    this.isStreamCompletePromise = new Promise((resolve) => {
      const reader = videoStream.getReader();

      reader.read().then(async function processChunk({ done, value }) {
        if (done) {
          resolve();
          return;
        }

        await current.sendVideoEvent(value);
        return reader.read().then(processChunk);
      });
    });
  }

  public async sendVideoEvent(blob: Blob) {
    await this.isSocketConnectionReadyPromise;

    const buffer = await blob.arrayBuffer();
    const event = getLivenessVideoEvent(new Uint8Array(buffer));
    // FIXME: If we need to sign each event, add signing here
    const binary = eventStreamCodec.encode(event);

    this.socket.send(binary);
  }

  public async sendClientSessionInfoEvent(
    livenessActionDocument: LivenessActionDocument
  ) {
    await this.isSocketConnectionReadyPromise;

    const event = getLivenessClientSessionInfoEvent(
      Buffer.from(JSON.stringify(livenessActionDocument))
    );
    // FIXME: If we need to sign each event, add signing here
    const binary = eventStreamCodec.encode(event);

    this.socket.send(binary);
  }

  public async closeStream() {
    await this.isStreamCompletePromise;

    // send empty event to signal we are done uploading video
    await this.sendVideoEvent(new Blob([]));
    this.closeConnection();
  }

  public closeConnection() {
    if (
      this.socket.readyState !== this.socket.CLOSED ||
      this.socket.readyState !== this.socket.CLOSING
    ) {
      this.socket.close();
    }
  }

  // FIXME: remove this function when streaming works
  async putLivenessVideo(
    input: PutLivenessVideoInput
  ): Promise<PutLivenessVideoOutput> {
    const credentials = await Credentials.get();
    if (!credentials) {
      throw new Error('No credentials');
    }

    const rekognitionClient = new RekognitionLiveness({
      // TODO: remove hardcoded region and endpoint
      region: 'us-east-1',
      credentials,
      customUserAgent: getAmplifyUserAgent(),
      endpoint:
        'https://us-east-1.gamma.frontend.reventlov.rekognition.aws.dev/',
      maxRetries: 0, // TODO: revisit once appropriate retry exceptions are added in the service
    });

    await rekognitionClient
      .putLivenessVideo({
        SessionId: input.sessionId,
        Video: input.videoBlob,
        LivenessActionDocument: input.livenessActionDocument,
      })
      .promise();

    return {
      sessionId: input.sessionId,
    };
  }
}
