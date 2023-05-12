/* eslint-disable  */
import 'jest-canvas-mock';
import * as blazeface from '@tensorflow-models/blazeface';
import { isWebAssemblySupported } from '../support';

import { BlazeFaceFaceDetection } from '../blazefaceFaceDetection';

const mockEstimateFace = jest.fn();
jest.mock('@tensorflow/tfjs-core');
jest.mock('@tensorflow-models/blazeface');
jest.mock('@tensorflow/tfjs-backend-wasm', () => {
  return {
    setWasmPaths: jest.fn(),
  };
});
jest.mock('@aws-amplify/core', () => ({
  jitteredExponentialRetry: jest.fn().mockResolvedValue({
    estimateFaces: jest.fn(),
  }),
}));
jest.mock('../support');

const MOCK_NORMALIZED_FACE: blazeface.NormalizedFace = {
  bottomRight: [100, 0],
  topLeft: [0, 100],
  probability: 90,
  landmarks: [
    [50, 50],
    [50, 50],
    [50, 50],
    [50, 50],
  ],
};

const mockIsWebAssemblySupported = jest.fn();

describe('blazefaceFaceDetection', () => {
  beforeEach(() => {
    (isWebAssemblySupported as jest.Mock).mockImplementation(
      mockIsWebAssemblySupported
    );
    mockIsWebAssemblySupported.mockReturnValue(true);
    mockEstimateFace.mockResolvedValue([{}, MOCK_NORMALIZED_FACE]);
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
    expect(face.top).toBe(100);
    expect(face.left).toBe(100);
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
});
