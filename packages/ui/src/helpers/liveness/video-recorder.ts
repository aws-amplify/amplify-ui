/**
 * The options for the video recorder.
 */
export interface VideoRecorderOptions {
  // TODO:: add options
}

/**
 * Helper wrapper class over the native MediaRecorder.
 */
export class VideoRecorder {
  public videoStream: ReadableStream<Blob | string>;

  private _recorder: MediaRecorder;
  private _stream: MediaStream;
  private _options: VideoRecorderOptions;
  private _chunks: Blob[];

  constructor(stream: MediaStream, options: VideoRecorderOptions = {}) {
    if (typeof MediaRecorder === 'undefined') {
      throw Error('MediaRecorder is not supported by this browser');
    }

    this._stream = stream;
    this._options = options;
    this._chunks = [];
    this._recorder = new MediaRecorder(stream);

    this._setupCallbacks();
  }

  private _setupCallbacks() {
    // Creates a Readablestream of video chunks. Waits to receive a clientSessionInfo event before pushing
    //  a livenessActionDocument to the ReadableStream and finally closing the ReadableStream
    this.videoStream = new ReadableStream({
      start: (controller) => {
        this._recorder.ondataavailable = (e: BlobEvent) => {
          if (e.data && e.data.size > 0) {
            this._chunks.push(e.data);
            controller.enqueue(e.data);
          }
        };

        this._recorder.onerror = (e: Event) => {
          if (this.getState() !== 'stopped') {
            this.stop();
          }
        };

        this._recorder.addEventListener(
          'clientSesssionInfo',
          (e: MessageEvent) => {
            controller.enqueue(e.data.clientInfo);
          }
        );

        this._recorder.addEventListener('stopVideo', () => {
          controller.enqueue('stopVideo');
        });

        this._recorder.addEventListener('endStream', () => {
          controller.close();
        });
      },
    });
  }

  getState(): string {
    return this._recorder.state;
  }

  async getBlob(): Promise<Blob> {
    await new Promise((resolve) => setTimeout(resolve, 500)); // TODO:: figure out alternative
    return new Blob(this._chunks, { type: 'video/webm' });
  }

  start(timeSlice?: number): void {
    this.clearRecordedData();
    this._recorder.start(timeSlice);
  }

  stop(): void {
    if (this.getState() === 'recording') {
      this._recorder.stop();
    }
  }

  pause(): void {
    this._recorder.pause();
  }

  clearRecordedData(): void {
    this._chunks = [];
  }

  destroy(): void {
    this.stop();
    this.clearRecordedData();
    this._recorder = null;
  }

  dispatch(event: Event): void {
    this._recorder.dispatchEvent(event);
  }
}
