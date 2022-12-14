import * as tf from '@tensorflow/tfjs-core';
import * as blazeface from '@tensorflow-models/blazeface';

// TODO:: Figure out if we should lazy load these or not.
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';

import { isWebAssemblySupported, isWebGLSupported } from './support';
import { FaceDetection, Face } from '../../types';

type BlazeFaceModelBackend = 'wasm' | 'webgl' | 'cpu';

const BASE_CDN_URL =
  'https://models.edge.reventlov.rekognition.aws.dev/blazeface';

/**
 * The BlazeFace implementation of the FaceDetection interface.
 */
export class BlazeFaceFaceDetection extends FaceDetection {
  private _model: blazeface.BlazeFaceModel;
  modelBackend: BlazeFaceModelBackend;

  async loadModels() {
    if (isWebAssemblySupported()) {
      console.log('Loading WebAssembly backend');
      await this._loadWebAssemblyBackend();
    } else if (isWebGLSupported()) {
      console.log('Loading WebGL backend');
      await this._loadWebGLBackend();
    } else {
      console.log('Loading CPU backend');
      await this._loadCPUBackend();
    }

    await tf.ready();
    this._model = await blazeface.load({
      modelUrl: `${BASE_CDN_URL}/model/model.json`,
    });
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

    const faces: Face[] = predictions.map((prediction) => {
      const { topLeft, bottomRight, probability, landmarks } = prediction;

      const [right, top] = topLeft as [number, number]; // right, top because the prediction is flipped
      const [left, bottom] = bottomRight as [number, number]; // left, bottom because the prediction is flipped
      const width = Math.abs(right - left);
      const height = Math.abs(bottom - top);
      const rightEye = landmarks[0];
      const leftEye = landmarks[1];
      // const nose = landmarks[2];
      const mouth = landmarks[3];
      // const rightEar = landmarks[4];
      // const leftEar = landmarks[5];

      return {
        top,
        left,
        width,
        height,
        timestampMs,
        probability: probability[0] as number,
        rightEye,
        leftEye,
        mouth,
      };
    });

    return faces;
  }

  private async _loadWebAssemblyBackend() {
    tfjsWasm.setWasmPaths(`${BASE_CDN_URL}/wasm/`);
    await tf.setBackend('wasm');
    this.modelBackend = 'wasm';
  }

  private async _loadWebGLBackend() {
    await tf.setBackend('webgl');
    this.modelBackend = 'webgl';
  }

  private async _loadCPUBackend() {
    await tf.setBackend('cpu');
    this.modelBackend = 'cpu';
  }
}
