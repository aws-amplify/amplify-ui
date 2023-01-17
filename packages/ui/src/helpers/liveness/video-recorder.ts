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
  private _recorderStopped: Promise<void>;

  constructor(stream: MediaStream, options: VideoRecorderOptions = {}) {
    if (typeof MediaRecorder === 'undefined') {
      throw Error('MediaRecorder is not supported by this browser');
    }

    this._stream = stream;
    this._options = options;
    this._chunks = [];
    this._recorder = new MediaRecorder(stream, { bitsPerSecond: 1000000 });

    this._setupCallbacks();
  }

  private _setupCallbacks() {
    // Creates a Readablestream of video chunks. Waits to receive a clientSessionInfo event before pushing
    //  a livenessActionDocument to the ReadableStream and finally closing the ReadableStream
    this._recorderStopped = new Promise((resolve) => {
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

          this._recorder.onstop = () => {
            resolve();
          };
        },
      });
    });
  }

  getState(): string {
    return this._recorder.state;
  }

  start(timeSlice?: number): void {
    this.clearRecordedData();
    this._recorder.start(timeSlice);
  }

  async stop(): Promise<void> {
    if (this.getState() === 'recording') {
      this._recorder.stop();
    }
    return this._recorderStopped;
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
