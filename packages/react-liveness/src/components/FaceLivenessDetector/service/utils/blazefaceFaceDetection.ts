// TODO Thadd fix this
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as tf from '@tensorflow/tfjs-core';
import * as faceDetection from '@tensorflow-models/face-detection';

// TODO:: Figure out if we should lazy load these or not.
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import '@tensorflow/tfjs-backend-cpu';

import { jitteredExponentialRetry } from '@aws-amplify/core';

import { isWebAssemblySupported } from './support';
import { FaceDetection, Face, Coordinate } from '../types';

type BlazeFaceModelBackend = 'wasm' | 'cpu';

export const BLAZEFACE_VERSION = '1.0.2';

/**
 *   WARNING: When updating these links,
 *   also make sure to update documentation and the link in the canary/e2e test "canary/e2e/features/liveness/face-detect.feature"
 */
export const DEFAULT_BLAZEFACE_URL = `https://cdn.liveness.rekognition.amazonaws.com/face-detection/tensorflow-models/blazeface/${BLAZEFACE_VERSION}/model/model.json`;
export const DEFAULT_TFJS_WASM_URL = `https://cdn.liveness.rekognition.amazonaws.com/face-detection/tensorflow/tfjs-backend-wasm/${tfjsWasm.version_wasm}/`;

/**
 * The BlazeFace implementation of the FaceDetection interface.
 */
export class BlazeFaceFaceDetection extends FaceDetection {
  modelBackend!: BlazeFaceModelBackend;
  faceModelUrl: string | undefined;
  binaryPath: string;
  private _model!: faceDetection.FaceDetector;

  constructor(binaryPath?: string, faceModelUrl?: string) {
    super();
    this.faceModelUrl = faceModelUrl ?? DEFAULT_BLAZEFACE_URL;
    this.binaryPath = binaryPath ?? DEFAULT_TFJS_WASM_URL;
  }

  async loadModels(): Promise<void> {
    if (isWebAssemblySupported()) {
      await this._loadWebAssemblyBackend();
    } else {
      await this._loadCPUBackend();
    }

    try {
      await tf.ready();
      this._model = await faceDetection.createDetector(
        faceDetection.SupportedModels.MediaPipeFaceDetector,
        {
          runtime: 'tfjs',
          detectorModelUrl: this.faceModelUrl,
        }
      );
    } catch (e) {
      throw new Error(
        'There was an error loading the blazeface model. If you are using a custom blazeface model url ensure that it is a fully qualified url that returns a json file.'
      );
    }
  }

  async detectFaces(videoEl: HTMLVideoElement): Promise<Face[]> {
    const flipHorizontal = true;
    const predictions = await this._model.estimateFaces(videoEl, {
      flipHorizontal,
    });

    const timestampMs = Date.now();

    const faces: Face[] = predictions.map((prediction) => {
      const { box, keypoints } = prediction;
      const { xMin: left, yMin: top, width, height } = box;
      const rightEye = this._getCoordinate(keypoints, 'rightEye');
      const leftEye = this._getCoordinate(keypoints, 'leftEye');
      const nose = this._getCoordinate(keypoints, 'noseTip');
      const mouth = this._getCoordinate(keypoints, 'mouthCenter');
      const rightEar = this._getCoordinate(keypoints, 'rightEarTragion');
      const leftEar = this._getCoordinate(keypoints, 'leftEarTragion');
      const probability = [90];

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
        rightEar,
        leftEar,
      };
    });

    return faces;
  }

  private _getCoordinate(
    keypoints: faceDetection.Keypoint[],
    name: string
  ): Coordinate {
    const keypoint = keypoints.find((k) => k.name === name)!;
    return [keypoint.x, keypoint.y];
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
