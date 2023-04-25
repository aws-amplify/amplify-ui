import * as tf from '@tensorflow/tfjs-core';
import * as blazeface from '@tensorflow-models/blazeface';

// TODO:: Figure out if we should lazy load these or not.
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import '@tensorflow/tfjs-backend-cpu';

import { jitteredExponentialRetry } from '@aws-amplify/core';

import { isWebAssemblySupported } from './support';
import { FaceDetection, Face } from '../types';

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
    if (isWebAssemblySupported()) {
      await this._loadWebAssemblyBackend();
    } else {
      await this._loadCPUBackend();
    }

    try {
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

        const [right, top] = topLeft as [number, number]; // right, top because the prediction is flipped
        const [left, bottom] = bottomRight as [number, number]; // left, bottom because the prediction is flipped
        const width = Math.abs(right - left);
        const height = Math.abs(bottom - top);
        const rightEye = (landmarks as number[][])[0];
        const leftEye = (landmarks as number[][])[1];
        const nose = (landmarks as number[][])[2];
        const mouth = (landmarks as number[][])[3];

        return {
          top,
          left,
          width,
          height,
          timestampMs,
          probability: probability as number,
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
      await jitteredExponentialRetry(async () => {
        const success = await tf.setBackend('wasm');
        if (!success) {
          throw new Error(`Initialization of backend wasm failed`);
        }
      }, []);
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
