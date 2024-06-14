import { isUndefined } from '@aws-amplify/ui';
import { TIME_SLICE } from '../constants';
import { VideoStream, StreamResult, StreamResultType } from '../types';

export class StreamRecorder {
  #chunks: Blob[];
  #recorder: MediaRecorder;
  #initialRecorder: MediaRecorder;
  #recordingStarted: boolean = false;
  #recorderEndTimestamp: number | undefined;
  #recorderStartTimestamp: number | undefined;
  #recordingStartTimestamp: number | undefined;
  #recorderStopped!: Promise<void>;
  #videoStream: VideoStream;
  #eventListeners: { [key: string]: (args: any) => void };

  constructor(stream: MediaStream) {
    if (typeof MediaRecorder === 'undefined') {
      throw Error('MediaRecorder is not supported by this browser');
    }

    this.#chunks = [];
    this.#recorder = new MediaRecorder(stream, { bitsPerSecond: 1000000 });
    this.#initialRecorder = this.#recorder;
    this.#videoStream = this.#createReadableStream();
    this.#eventListeners = {};

    this.#setupCallbacks();
  }

  getVideoStream(): VideoStream {
    return this.#videoStream;
  }

  setNewVideoStream(stream: MediaStream): void {
    this.#cleanUpEventListeners();
    this.#recorder = new MediaRecorder(stream, { bitsPerSecond: 1000000 });
    this.#createPassThroughRecorder();
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
  // a livenessActionDocument to the ReadableStream and finally closing the ReadableStream
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

  /**
   * The startFaceLivenessSession API takes in a ReadableStream as its source of all websocket events
   * To allow for changing cameras we add new MediaRecorders which pass through events to the previously set MediaRecorder
   */
  #createPassThroughRecorder(): void {
    const onDataAvailableHandler = ({ data }: { data: Blob }) => {
      this.#initialRecorder.dispatchEvent(
        new MessageEvent('dataavailable', { data })
      );
    };
    this.#recorder.ondataavailable = onDataAvailableHandler;

    const onSessionInfoHandler = (e: any) => {
      const { data } = e as unknown as StreamResult<'sessionInfo'>;
      this.#initialRecorder.dispatchEvent(
        new MessageEvent('sessionInfo', { data })
      );
    };
    this.#recorder.addEventListener('sessionInfo', onSessionInfoHandler);

    const onStreamStopHandler = () => {
      this.#initialRecorder.dispatchEvent(new MessageEvent('streamStop'));
    };
    this.#recorder.addEventListener('streamStop', onStreamStopHandler);

    const onCloseCodeHandler = (e: Event) => {
      const { data } = e as unknown as StreamResult<'closeCode'>;
      this.#initialRecorder.dispatchEvent(
        new MessageEvent('closeCode', { data })
      );
    };
    this.#recorder.addEventListener('closeCode', onCloseCodeHandler);

    const onEndStreamHandler = () => {
      this.#initialRecorder.dispatchEvent(new MessageEvent('endStream'));
    };
    this.#recorder.addEventListener('endStream', onEndStreamHandler);

    this.#setupCallbacks();

    this.#eventListeners = {
      endStream: onEndStreamHandler,
      closeCode: onCloseCodeHandler,
      streamStop: onStreamStopHandler,
      sessionInfo: onSessionInfoHandler,
      dataavailable: onDataAvailableHandler,
    };
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

  #cleanUpEventListeners() {
    const eventNames = Object.keys(this.#eventListeners);
    eventNames.forEach((name) => {
      this.#recorder.removeEventListener(name, this.#eventListeners[name]);
    });
    this.#eventListeners = {};
  }
}
