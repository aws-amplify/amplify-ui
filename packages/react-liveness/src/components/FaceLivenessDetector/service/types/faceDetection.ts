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
  rightEye: number[];
  leftEye: number[];
  mouth: number[];
  nose: number[];
}

/**
 * The abstract class representing FaceDetection
 * to be implemented for different libraries.
 */
export abstract class FaceDetection {
  modelLoadingPromise!: Promise<void>;

  /**
   * Triggers the `loadModels` method and stores
   * the corresponding promise to be awaited later.
   */
  triggerModelLoading(): void {
    this.modelLoadingPromise = this.loadModels();
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
