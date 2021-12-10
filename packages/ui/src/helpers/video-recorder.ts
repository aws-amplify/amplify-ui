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
  private _stream: MediaStream;
  private _options: VideoRecorderOptions;
  private _recorder: MediaRecorder;
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
    this._recorder.ondataavailable = (e: BlobEvent) => {
      if (e.data && e.data.size > 0) {
        this._chunks.push(e.data);
      }
    };

    this._recorder.onerror = (e: Event) => {
      if (this.getState() !== 'stopped') {
        this.stop();
      }
    };
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

  clearRecordedData(): void {
    this._chunks = [];
  }

  destroy(): void {
    this.stop();
    this.clearRecordedData();
    this._stream.getTracks().forEach((track: MediaStreamTrack) => {
      track.stop();
    });
  }
}
