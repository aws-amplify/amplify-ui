import * as tf from '@tensorflow/tfjs-core';
import * as blazeface from '@tensorflow-models/blazeface';
import { isWebAssemblySupported, isWebGLSupported } from './support';
import { FaceDetection, Face } from '../types';

type BlazeFaceModelBackend = 'wasm' | 'webgl' | 'cpu';

/**
 * The BlazeFace implementation of the FaceDetection interface.
 */
export class BlazeFaceFaceDetection extends FaceDetection {
  private _model: blazeface.BlazeFaceModel;
  modelBackend: BlazeFaceModelBackend;

  async loadModels() {
    if (isWebAssemblySupported()) {
      await this._loadWebAssemblyBackend();
    } else if (isWebGLSupported()) {
      await this._loadWebGLBackend();
    } else {
      await this._loadCPUBackend();
    }

    await tf.ready();
    this._model = await blazeface.load();
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

    const faces: Face[] = predictions.map((prediction) => {
      const { topLeft, bottomRight, probability } = prediction;

      const [right, top] = topLeft as [number, number]; // right, top because the prediction is flipped
      const [left, bottom] = bottomRight as [number, number]; // left, bottom because the prediction is flipped
      const width = Math.abs(right - left);
      const height = Math.abs(bottom - top);

      return {
        top,
        left,
        width,
        height,
        probability: probability[0] as number,
      };
    });

    return faces;
  }

  private async _loadWebAssemblyBackend() {
    const tfjsWasm = await import('@tensorflow/tfjs-backend-wasm');
    /**
     * TODO:: figure out a better way to provide the backend instead of using jsdelivr
     *        for example using our own hosted wasm binary on CDN (cloudfront) that we control
     */
    tfjsWasm.setWasmPaths(
      `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`
    );
    await tf.setBackend('wasm');
    this.modelBackend = 'wasm';
  }

  private async _loadWebGLBackend() {
    await import('@tensorflow/tfjs-backend-webgl');
    await tf.setBackend('webgl');
    this.modelBackend = 'webgl';
  }

  private async _loadCPUBackend() {
    await import('@tensorflow/tfjs-backend-cpu');
    await tf.setBackend('cpu');
    this.modelBackend = 'cpu';
  }
}
