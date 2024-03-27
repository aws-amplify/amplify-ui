import { isUndefined } from '@aws-amplify/ui';
import { TIME_SLICE } from '../constants';
import { VideoStream, StreamResult, StreamResultType } from '../types';

export class StreamRecorder {
  #chunks: Blob[];
  #recorder: MediaRecorder;
  #recordingStarted: boolean = false;
  #recorderEndTimestamp: number | undefined;
  #recorderStartTimestamp: number | undefined;
  #recordingStartTimestamp: number | undefined;
  #recorderStopped!: Promise<void>;
  #videoStream: VideoStream;

  constructor(stream: MediaStream) {
    if (typeof MediaRecorder === 'undefined') {
      throw Error('MediaRecorder is not supported by this browser');
    }

    this.#chunks = [];
    this.#recorder = new MediaRecorder(stream, { bitsPerSecond: 1000000 });
    this.#videoStream = this.#createReadableStream();

    this.#setupCallbacks();
  }

  getVideoStream(): VideoStream {
    return this.#videoStream;
  }

  dispatchStreamEvent<T extends StreamResultType>(
    event: T extends 'streamStop'
      ? Pick<StreamResult<T>, 'type'>
      : StreamResult<T>
  ): void {
    const { type } = event;
    const data = type === 'streamStop' ? undefined : event.data;
    this.#recorder.dispatchEvent(new MessageEvent(type, { data }));
  }

  getRecordingStartTimestamp(): number {
    if (
      isUndefined(this.#recorderStartTimestamp) ||
      isUndefined(this.#recordingStartTimestamp)
    ) {
      throw new Error('Recording has not started');
    }
    /**
     * This calculation is provided by Science team after doing analysis
     * of unreliable .onstart() (this.#recorderStartTimestamp) timestamp that is
     * returned from mediaRecorder.
     */
    return Math.round(
      0.73 * (this.#recorderStartTimestamp - this.#recordingStartTimestamp) +
        this.#recordingStartTimestamp
    );
  }

  getRecordingEndedTimestamp(): number {
    if (isUndefined(this.#recorderEndTimestamp)) {
      throw new Error('Recording has not ended');
    }
    return this.#recorderEndTimestamp;
  }

  startRecording(): void {
    this.#clearRecordedChunks();
    this.#recordingStartTimestamp = Date.now();
    this.#recorder.start(TIME_SLICE);
  }

  isRecording(): boolean {
    return this.#recorder.state === 'recording';
  }

  getChunksLength(): number {
    return this.#chunks.length;
  }

  hasRecordingStarted(): boolean {
    return this.#recordingStarted;
  }

  async stopRecording(): Promise<void> {
    if (this.isRecording()) {
      this.#recorder.stop();
    }
    return this.#recorderStopped;
  }

  #clearRecordedChunks(): void {
    this.#chunks = [];
  }

  // Creates a Readablestream of video chunks. Waits to receive a clientSessionInfo event before pushing
  //  a livenessActionDocument to the ReadableStream and finally closing the ReadableStream
  #createReadableStream(): ReadableStream {
    return new ReadableStream<StreamResult>({
      start: (controller) => {
        this.#recorder.ondataavailable = ({ data }) => {
          this.#chunks.push(data);
          controller.enqueue({ type: 'streamVideo', data });
        };

        this.#recorder.addEventListener('sessionInfo', (e: any) => {
          const { data } = e as unknown as StreamResult<'sessionInfo'>;
          controller.enqueue({ type: 'sessionInfo', data });
        });

        this.#recorder.addEventListener('streamStop', () => {
          controller.enqueue({ type: 'streamStop' });
        });

        this.#recorder.addEventListener('closeCode', (e) => {
          const { data } = e as unknown as StreamResult<'closeCode'>;
          controller.enqueue({ type: 'closeCode', data });
        });

        this.#recorder.addEventListener('endStream', () => {
          controller.close();
        });
      },
    });
  }

  #setupCallbacks() {
    this.#recorder.onstart = () => {
      this.#recordingStarted = true;
      this.#recorderStartTimestamp = Date.now();
    };

    this.#recorderStopped = new Promise((resolve) => {
      this.#recorder.onstop = () => {
        this.#recorderEndTimestamp = Date.now();
        resolve();
      };
    });

    this.#recorder.onerror = () => {
      this.stopRecording();
    };
  }
}
