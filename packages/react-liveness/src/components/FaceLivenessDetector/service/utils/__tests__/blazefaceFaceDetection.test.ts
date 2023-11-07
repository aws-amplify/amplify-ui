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
});
