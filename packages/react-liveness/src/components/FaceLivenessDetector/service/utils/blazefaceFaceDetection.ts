import * as tf from '@tensorflow/tfjs-core';
import * as blazeface from '@tensorflow-models/blazeface';

// TODO:: Figure out if we should lazy load these or not.
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import '@tensorflow/tfjs-backend-cpu';

import { jitteredExponentialRetry } from '@aws-amplify/core';

import { isWebAssemblySupported } from './support';
import { FaceDetection, Face, Coordinate } from '../types';

type BlazeFaceModelBackend = 'wasm' | 'cpu';

/**
 * The BlazeFace implementation of the FaceDetection interface.
 */
export class BlazeFaceFaceDetection extends FaceDetection {
  modelBackend!: BlazeFaceModelBackend;
  faceModelUrl: string | undefined;
  binaryPath: string;
  private _model!: blazeface.BlazeFaceModel;

  constructor(binaryPath?: string, faceModelUrl?: string) {
    super();
    this.faceModelUrl = faceModelUrl;
    this.binaryPath =
      binaryPath ??
      /**  Note: If to update this link,
       *   also make sure to update the link in the canary/e2e test "canary/e2e/features/liveness/face-detect.feature"
       */
      `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`;
  }

  async loadModels(): Promise<void> {
    try {
      if (isWebAssemblySupported()) {
        await this._loadWebAssemblyBackend();
      } else {
        await this._loadCPUBackend();
      }

      await tf.ready();
      this._model = await jitteredExponentialRetry(blazeface.load, [
        {
          modelUrl: this.faceModelUrl,
        },
      ]);
    } catch (e) {
      throw new Error(
        'There was an error loading the blazeface model. If you are using a custom blazeface model url ensure that it is a fully qualified url that returns a json file.'
      );
    }
  }

  async detectFaces(videoEl: HTMLVideoElement): Promise<Face[]> {
    const returnTensors = false;
    const flipHorizontal = true;
    const annotateBoxes = true;
    const predictions = await this._model.estimateFaces(
      videoEl,
      returnTensors,
      flipHorizontal,
      annotateBoxes
    );

    const timestampMs = Date.now();

    const faces: Face[] = predictions
      .filter((prediction) => !!prediction.landmarks)
      .map((prediction) => {
        const { topLeft, bottomRight, probability, landmarks } = prediction;

        const [right, top] = topLeft as Coordinate; // right, top because the prediction is flipped
        const [left, bottom] = bottomRight as Coordinate; // left, bottom because the prediction is flipped
        const width = Math.abs(right - left);
        const height = Math.abs(bottom - top);
        const rightEye = (landmarks as Coordinate[])[0];
        const leftEye = (landmarks as Coordinate[])[1];
        const nose = (landmarks as Coordinate[])[2];
        const mouth = (landmarks as Coordinate[])[3];

        return {
          top,
          left,
          width,
          height,
          timestampMs,
          probability: (probability as unknown as [number])[0], // probability in reality is [number] but is typed as number | Tensor.1d
          rightEye,
          leftEye,
          mouth,
          nose,
        };
      });

    return faces;
  }

  private async _loadWebAssemblyBackend() {
    try {
      tfjsWasm.setWasmPaths(this.binaryPath);
      let success = false;

      await jitteredExponentialRetry(async () => {
        const response = await fetch(
          `${this.binaryPath}tfjs-backend-wasm-simd.wasm`
        );
        success = response.ok;
      }, []);

      if (!success) {
        throw new Error(`Fetch of backend wasm url failed`);
      }

      await tf.setBackend('wasm');
      this.modelBackend = 'wasm';
    } catch (e) {
      throw new Error(
        'There was an error loading the TFJS WASM backend. If you are using a custom WASM path ensure that it ends with "/" and that it is not the full URL as @tensorflow/tfjs-backend-wasm will append the wasm binary file name. Read more: https://github.com/tensorflow/tfjs/blob/master/tfjs-backend-wasm/src/backend_wasm.ts#L475.'
      );
    }
  }

  private async _loadCPUBackend() {
    await tf.setBackend('cpu');
    this.modelBackend = 'cpu';
  }
}
