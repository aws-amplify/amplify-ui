const DEFAULT_BIT_RATE = 1000000;

/**
 * Helper wrapper class over the native MediaRecorder.
 */
export class VideoRecorder {
  public videoStream!: ReadableStream<
    Blob | string | { type: string; code: number }
  >;
  public recordingStartApiTimestamp: number | undefined;
  public recorderStartTimestamp: number | undefined;
  public recorderEndTimestamp: number | undefined;
  public firstChunkTimestamp: number | undefined;
  public recorderStarted!: Promise<void>;

  private _recorder: MediaRecorder;
  private _stream: MediaStream;

  private _chunks: Blob[];
  private _recorderStopped!: Promise<void>;

  constructor(stream: MediaStream, mimeType?: string) {
    if (typeof MediaRecorder === 'undefined') {
      throw Error('MediaRecorder is not supported by this browser');
    }

    this._stream = stream;
    this._chunks = [];
    this._recorder = new MediaRecorder(stream, {
      bitsPerSecond: DEFAULT_BIT_RATE,
      mimeType,
    });

    this._setupCallbacks();
  }

  getState(): string | undefined {
    return this._recorder.state;
  }

  start(timeSlice?: number): void {
    this.clearRecordedData();
    this.recordingStartApiTimestamp = Date.now();
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

  dispatch(event: Event): void {
    this._recorder.dispatchEvent(event);
  }

  getVideoChunkSize(): number {
    return this._chunks.length;
  }

  private _setupCallbacks() {
    // Creates a Readablestream of video chunks. Waits to receive a clientSessionInfo event before pushing
    //  a livenessActionDocument to the ReadableStream and finally closing the ReadableStream
    this.videoStream = new ReadableStream({
      start: (controller) => {
        if (!this._recorder) {
          return;
        }

        this._recorder.ondataavailable = (e: BlobEvent) => {
          if (e.data && e.data.size > 0) {
            if (this._chunks.length === 0) {
              this.firstChunkTimestamp = Date.now();
            }
            this._chunks.push(e.data);
            controller.enqueue(e.data);
          }
        };

        this._recorder.addEventListener('clientSesssionInfo', (e: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          controller.enqueue(e.data.clientInfo);
        });

        this._recorder.addEventListener('stopVideo', () => {
          controller.enqueue('stopVideo');
        });

        this._recorder.addEventListener('endStream', () => {
          controller.close();
        });

        this._recorder.addEventListener('endStreamWithCode', (e: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          controller.enqueue({
            type: 'endStreamWithCode',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            code: e.data.code as number,
          });
        });
      },
    });

    this.recorderStarted = new Promise((resolve) => {
      this._recorder.onstart = () => {
        this.recorderStartTimestamp = Date.now();
        resolve();
      };
    });

    this._recorderStopped = new Promise((resolve) => {
      this._recorder.onstop = () => {
        this.recorderEndTimestamp = Date.now();
        resolve();
      };
    });

    this._recorder.onerror = () => {
      if (this.getState() !== 'stopped') {
        this.stop();
      }
    };
  }
}

export const doesDefaultMimeTypeWork = async (
  stream: MediaStream
): Promise<boolean> => {
  const recorder = new MediaRecorder(stream, {
    bitsPerSecond: DEFAULT_BIT_RATE,
  });

  const chunks: Blob[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data); // only uses non 0 size chunks, in the Android failure it would return one 0 sized chunk
  };

  recorder.start(10); // Sets up recording in 10ms time slices
  await new Promise((r) => setTimeout(r, 200)); // Waits 200 ms to get some chunks
  recorder.stop();

  return chunks.length > 0;
};
