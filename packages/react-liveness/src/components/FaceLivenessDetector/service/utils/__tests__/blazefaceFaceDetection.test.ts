/* eslint-disable  */
import 'jest-canvas-mock';
import * as blazeface from '@tensorflow-models/face-detection';
import { isWebAssemblySupported } from '../support';

import { BlazeFaceFaceDetection } from '../blazefaceFaceDetection';

const mockEstimateFace = jest.fn();
jest.mock('@tensorflow-models/face-detection');
jest.mock('@tensorflow/tfjs-backend-wasm', () => {
  return {
    setWasmPaths: jest.fn(),
  };
});
jest.mock('@aws-amplify/core/internals/utils', () => ({
  jitteredExponentialRetry: jest.fn().mockResolvedValue({
    estimateFaces: jest.fn(),
  }),
}));
jest.mock('../support');

const MOCK_NORMALIZED_FACE: blazeface.Face = {
  box: {
    xMin: 0,
    yMin: 0,
    xMax: 100,
    yMax: 100,
    width: 100,
    height: 100,
  },
  keypoints: [
    { x: 50, y: 50, name: 'rightEye' },
    { x: 50, y: 50, name: 'leftEye' },
    { x: 50, y: 50, name: 'noseTip' },
    { x: 50, y: 50, name: 'mouthCenter' },
    { x: 50, y: 50, name: 'leftEarTragion' },
    { x: 50, y: 50, name: 'rightEarTragion' },
  ],
};

const mockIsWebAssemblySupported = jest.fn();

describe('blazefaceFaceDetection', () => {
  beforeEach(() => {
    (isWebAssemblySupported as jest.Mock).mockImplementation(
      mockIsWebAssemblySupported
    );
    mockIsWebAssemblySupported.mockReturnValue(true);
    mockEstimateFace.mockResolvedValue([MOCK_NORMALIZED_FACE]);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('can be initialized', () => {
    expect(new BlazeFaceFaceDetection()).toBeTruthy();
  });

  it('can be initialized with a wasm binary path', () => {
    expect(new BlazeFaceFaceDetection('https://example.com')).toBeTruthy();
  });

  it('can be initialized with a wasm binary path and a facemodel url', () => {
    expect(
      new BlazeFaceFaceDetection('https://example.com', 'https://example.com')
    ).toBeTruthy();
  });

  it('detectFaces', async () => {
    const model = new BlazeFaceFaceDetection();
    (model as any)._model = {
      estimateFaces: mockEstimateFace,
    };
    const mockVideoElement = jest.fn();
    const faces = await model.detectFaces(
      mockVideoElement as unknown as HTMLVideoElement
    );
    const face = faces[0];

    expect(face.height).toBe(100);
    expect(face.width).toBe(100);
    expect(face.top).toBe(0);
    expect(face.left).toBe(0);
    expect(face.leftEye).toStrictEqual([50, 50]);
    expect(face.rightEye).toStrictEqual([50, 50]);
    expect(face.mouth).toStrictEqual([50, 50]);
    expect(face.nose).toStrictEqual([50, 50]);
  });

  it('loadModels WASM', async () => {
    const model = new BlazeFaceFaceDetection();
    await model.loadModels();

    expect(model.modelBackend).toBe('wasm');
  });

  it('loadModels CPU', async () => {
    mockIsWebAssemblySupported.mockReturnValueOnce(false);
    const model = new BlazeFaceFaceDetection();
    await model.loadModels();

    expect(model.modelBackend).toBe('cpu');
  });

  describe('triggerModelLoading timeout', () => {
    it('should resolve if model loads within timeout and clear the timer', async () => {
      const model = new BlazeFaceFaceDetection();
      // Model loads after a short delay but well within the 10s timeout
      model.loadModels = () =>
        new Promise((resolve) => setTimeout(resolve, 500));
      model.triggerModelLoading();

      // Advance past the model load time but not past the timeout
      jest.advanceTimersByTime(500);

      await expect(model.modelLoadingPromise).resolves.toBeUndefined();

      // Advance past the 10s timeout — should NOT reject since timer was cleared
      jest.advanceTimersByTime(10_000);
      await expect(model.modelLoadingPromise).resolves.toBeUndefined();

      // No leaked timers should remain
      expect(jest.getTimerCount()).toBe(0);
    });

    it('should reject with timeout error if model loading stalls', async () => {
      const model = new BlazeFaceFaceDetection();
      // Override loadModels to return a promise that never resolves
      model.loadModels = () => new Promise(() => {});
      model.triggerModelLoading();

      // Advance past the 10s timeout
      jest.advanceTimersByTime(10_000);

      await expect(model.modelLoadingPromise).rejects.toThrow(
        'Face detection model loading timed out'
      );
    });

    it('should reject with original error if model loading fails before timeout and clear the timer', async () => {
      const model = new BlazeFaceFaceDetection();
      // Model rejects after a short delay, before the 10s timeout
      model.loadModels = () =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('WASM backend failed')), 500)
        );
      model.triggerModelLoading();

      jest.advanceTimersByTime(500);

      await expect(model.modelLoadingPromise).rejects.toThrow(
        'WASM backend failed'
      );

      // The timeout timer should have been cleared on rejection — no leaked
      // timers should remain pending.
      expect(jest.getTimerCount()).toBe(0);
    });

    it('should not re-trigger loading if already in progress', async () => {
      const model = new BlazeFaceFaceDetection();
      const loadModelsSpy = jest.fn().mockResolvedValue(undefined);
      model.loadModels = loadModelsSpy;
      model.triggerModelLoading();
      model.triggerModelLoading();
      model.triggerModelLoading();

      expect(loadModelsSpy).toHaveBeenCalledTimes(1);
    });
  });
});
