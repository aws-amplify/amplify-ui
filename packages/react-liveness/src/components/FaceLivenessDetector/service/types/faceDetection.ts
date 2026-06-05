import { CONNECTION_TIMEOUT } from '../utils/constants';

/**
 * The bounding box of a face.
 */
export interface Face {
  top: number;
  left: number;
  width: number;
  height: number;
  timestampMs: number;
  probability?: number;
  rightEye: Coordinate;
  leftEye: Coordinate;
  mouth: Coordinate;
  nose: Coordinate;
  rightEar: Coordinate;
  leftEar: Coordinate;
}

export type Coordinate = [number, number];

/**
 * The abstract class representing FaceDetection
 * to be implemented for different libraries.
 */
export abstract class FaceDetection {
  modelLoadingPromise!: Promise<void>;
  private _modelLoadTriggered = false;

  /**
   * Triggers the `loadModels` method and stores
   * the corresponding promise to be awaited later.
   * Applies a timeout to prevent indefinite hangs if the
   * network request for model assets stalls.
   */
  triggerModelLoading(): void {
    if (this._modelLoadTriggered) {
      return;
    }
    this._modelLoadTriggered = true;

    let timeoutId: ReturnType<typeof setTimeout>;

    this.modelLoadingPromise = Promise.race([
      this.loadModels().then((result) => {
        clearTimeout(timeoutId);
        return result;
      }),
      new Promise<void>((_, reject) => {
        timeoutId = setTimeout(
          () =>
            reject(
              new Error(
                'Face detection model loading timed out. Check your network connection and try again.'
              )
            ),
          // Uses the same 10s timeout as the WebSocket connection phase.
          // The WASM binary (~425KB) + model (~100KB) should load well
          // within 10s on any reasonable connection. If it hasn't loaded
          // by then, the request is likely stalled (not just slow).
          CONNECTION_TIMEOUT
        );
      }),
    ]);
  }

  /**
   * Loads the face detection models.
   */
  abstract loadModels(): Promise<void>;

  /**
   * Detects the faces in the video element.
   * @param videoEl The video element to detect faces in.
   */
  abstract detectFaces(videoEl: HTMLVideoElement): Promise<Face[]>;
}
