import 'jest-canvas-mock';
import {
  drawLivenessOvalInCanvas,
  estimateIllumination,
  fillOverlayCanvasFractional,
  generateBboxFromLandmarks,
  getColorsSequencesFromSessionInformation,
  getFaceMatchState,
  getOvalDetailsFromSessionInformation,
  isCameraDeviceVirtual,
  isFaceDistanceBelowThreshold,
} from '../liveness';
import {
  getMockContext,
  mockCameraDevice,
  mockFace,
  mockOvalDetails,
  mockSessionInformation,
} from '../__mocks__/testUtils';
import {
  Face,
  FaceMatchState,
  IlluminationState,
  LivenessErrorState,
} from '../../types';
import { SessionInformation } from '@aws-sdk/client-rekognitionstreaming';

const context = getMockContext();

const MOCK_TIMESTAMP = 1640995200000;

// Values generated by passing mockFace into generateBboxFromLandmarks and printing intermediate values
const mockFaceHeight = 0; // 1.68 * [(ALPHA * pd + GAMMA * fh) / 2];
const mockFaceCenterY = 200; // eyeCenter[1];

const mockAboveFrameFace: Face = {
  height: 215,
  left: 200,
  leftEar: [420, 155],
  leftEye: [360, 110],
  mouth: [310, 200],
  nose: [310, 140],
  probability: 90,
  rightEar: [215, 170],
  rightEye: [260, 115],
  timestampMs: MOCK_TIMESTAMP,
  top: 70,
  width: 215,
};

const mockCloselyMatchedFace: Face = {
  top: 46.751117706298814,
  left: -5.630989074707031,
  width: 572.6491546630859,
  height: 572.7001762390136,
  timestampMs: MOCK_TIMESTAMP,
  probability: 90,
  rightEye: [187.4885559082032, 218.63224029541013],
  leftEye: [433.75030517578125, 227.35191345214847],
  mouth: [313.39622497558594, 485.65040588378895],
  nose: [330.15281677246094, 371.40689849853516],
  rightEar: [28.786602020263672, 237.78337478637698],
  leftEar: [515.0150299072266, 262.62935638427734],
};

const mockMatchedFace: Face = {
  height: 317.5821685791015,
  left: 165.49339294433594,
  leftEar: [445, 264.4227600097656],
  leftEye: [384.70985412597656, 247.56172180175784],
  mouth: [327.9991149902344, 393.5927200317383],
  nose: [325.2409362792969, 333.89575958251953],
  probability: 90,
  rightEar: [199.34513092041016, 272.49412536621094],
  rightEye: [261.6714286804199, 250.6684875488281],
  timestampMs: MOCK_TIMESTAMP,
  top: 155.82656860351565,
  width: 317.60498046875,
};
const mockMatchedFaceCenterX = 323.19064140319824;
const mockMatchedFaceOcularWidth = 253.17949214956178;

const mockTurnedFace: Face = {
  height: 215.05796432495114,
  left: 235.08899688720703,
  leftEar: [433.8389587402344, 233.52020263671872],
  leftEye: [379.2174530029297, 205.73320388793942],
  mouth: [340.50960540771484, 304.9227523803711],
  nose: [337.0632553100586, 257.2260284423828],
  probability: 90,
  rightEar: [250.12165069580078, 249.12113189697263],
  rightEye: [292.9753875732422, 215.29994964599607],
  timestampMs: MOCK_TIMESTAMP,
  top: 158.50336074829102,
  width: 215.0579833984375,
};

describe('Liveness Helper', () => {
  describe('getOvalDetailsFromSessionInformation', () => {
    it('should parse sessionInformation and return oval parameter attributes', () => {
      const ovalParameters = getOvalDetailsFromSessionInformation({
        sessionInformation: mockSessionInformation,
        videoWidth: 1,
      });

      expect(ovalParameters.centerX).toBe(3);
      expect(ovalParameters.centerY).toBe(4);
      expect(ovalParameters.width).toBe(1);
      expect(ovalParameters.height).toBe(2);
    });
  });

  describe('getFaceMatchState', () => {
    const mockBlazeFace: any = {
      modelLoadingPromise: Promise.resolve(),
      triggerModelLoading: jest.fn(),
      loadModels: jest.fn(),
      detectFaces: jest.fn(),
    };
    it('should return FACE_IDENTIFIED if only one face returned', async () => {
      mockBlazeFace.detectFaces.mockResolvedValue([mockFace]);

      const faceMatchState = await getFaceMatchState(
        mockBlazeFace,
        jest.fn() as unknown as HTMLVideoElement
      );

      expect(faceMatchState).toBe(FaceMatchState.FACE_IDENTIFIED);
    });

    it('should return CANT_IDENTIFY if no faces returned', async () => {
      mockBlazeFace.detectFaces.mockResolvedValue([]);

      const faceMatchState = await getFaceMatchState(
        mockBlazeFace,
        jest.fn() as unknown as HTMLVideoElement
      );

      expect(faceMatchState).toBe(FaceMatchState.CANT_IDENTIFY);
    });

    it('should return TOO_MANY if more than one face returned', async () => {
      mockBlazeFace.detectFaces.mockResolvedValue([mockFace, mockFace]);

      const faceMatchState = await getFaceMatchState(
        mockBlazeFace,
        jest.fn() as unknown as HTMLVideoElement
      );

      expect(faceMatchState).toBe(FaceMatchState.TOO_MANY);
    });
  });

  describe('generateBboxfromLandmarks', () => {
    it(`should return face box bottom as 'bottom' when face is within frame`, () => {
      const frameHeight = 480;
      const { bottom } = generateBboxFromLandmarks(
        mockFace,
        mockOvalDetails,
        frameHeight
      );

      const faceBoxBottom = mockFaceCenterY + mockFaceHeight / 2;
      expect(bottom).toEqual(faceBoxBottom); // expect calculated value to be returned as it is within frame
    });

    it(`should return 'frameHeight' as 'bottom' when bottom of face is below frame`, () => {
      const frameHeight = 100;
      const { bottom } = generateBboxFromLandmarks(
        mockFace,
        mockOvalDetails,
        frameHeight
      );
      expect(bottom).toEqual(frameHeight); // expect frameHeight to be returned as it is smaller than the calculated value
    });

    it(`should return face box top as 'top' when face is within frame`, () => {
      const frameHeight = 480;
      const { top } = generateBboxFromLandmarks(
        mockFace,
        mockOvalDetails,
        frameHeight
      );

      const faceBoxTop = mockFaceCenterY - mockFaceHeight / 2;

      expect(top).toEqual(faceBoxTop);
    });

    it(`should return 0 as 'top' when top of face is above frame`, () => {
      const frameHeight = 480;
      const { top } = generateBboxFromLandmarks(
        mockAboveFrameFace,
        mockOvalDetails,
        frameHeight
      );

      expect(top).toEqual(0);
    });

    it(`should return correct 'left' and 'right' values when face is matched`, () => {
      const frameHeight = 480;

      const { left, right } = generateBboxFromLandmarks(
        mockMatchedFace,
        mockOvalDetails,
        frameHeight
      );

      const faceBoxRight =
        mockMatchedFaceCenterX + mockMatchedFaceOcularWidth / 2;
      const faceBoxLeft =
        mockMatchedFaceCenterX - mockMatchedFaceOcularWidth / 2;
      expect(left).toEqual(faceBoxLeft); // expect left = cx - ow / 2
      expect(right).toEqual(faceBoxRight); // expect right = cx + ow / 2
    });

    it(`should return correct 'left' and 'right' values when face is turned`, () => {
      const frameHeight = 480;
      const { left, right } = generateBboxFromLandmarks(
        mockTurnedFace,
        mockOvalDetails,
        frameHeight
      );

      expect(left).toEqual(mockTurnedFace.rightEar[0]); // expect right ear to be used to limit left edge of face
      expect(right).toEqual(mockTurnedFace.leftEar[0]); // expect left ear to be used to limit right edge of face
    });
  });

  describe('isFaceDistanceBelowThreshold', () => {
    const mockBlazeFace: any = {
      modelLoadingPromise: Promise.resolve(),
      triggerModelLoading: jest.fn(),
      loadModels: jest.fn(),
      detectFaces: jest.fn(),
    };
    it('should return false if no faces', async () => {
      mockBlazeFace.detectFaces.mockResolvedValue([]);

      const result = await isFaceDistanceBelowThreshold({
        faceDetector: mockBlazeFace,
        videoEl: jest.fn() as unknown as HTMLVideoElement,
        ovalDetails: mockOvalDetails,
      });

      expect(result).toStrictEqual({
        error: 'FACE_DISTANCE_ERROR',
        isDistanceBelowThreshold: false,
      });
    });

    it('should return false if more than one face', async () => {
      mockBlazeFace.detectFaces.mockResolvedValue([mockFace, mockFace]);

      const result = await isFaceDistanceBelowThreshold({
        faceDetector: mockBlazeFace,
        videoEl: jest.fn() as unknown as HTMLVideoElement,
        ovalDetails: mockOvalDetails,
      });

      expect(result).toStrictEqual({
        error: 'MULTIPLE_FACES_ERROR',
        isDistanceBelowThreshold: false,
      });
    });

    it('should return true if below threshold', async () => {
      mockBlazeFace.detectFaces.mockResolvedValue([mockFace]);

      const result = await isFaceDistanceBelowThreshold({
        faceDetector: mockBlazeFace,
        videoEl: jest.fn() as unknown as HTMLVideoElement,
        ovalDetails: mockOvalDetails,
        reduceThreshold: true,
        isMobile: true,
      });

      expect(result).toStrictEqual({
        error: undefined,
        isDistanceBelowThreshold: true,
      });
    });

    it('should return false and error if above threshold', async () => {
      mockBlazeFace.detectFaces.mockResolvedValue([mockCloselyMatchedFace]);

      const result = await isFaceDistanceBelowThreshold({
        faceDetector: mockBlazeFace,
        videoEl: jest.fn() as unknown as HTMLVideoElement,
        ovalDetails: mockOvalDetails,
        reduceThreshold: true,
        isMobile: false,
      });

      expect(result).toStrictEqual({
        error: LivenessErrorState.FACE_DISTANCE_ERROR,
        isDistanceBelowThreshold: false,
      });
    });
  });

  describe('getColorsSequencesFromSessionInformation', () => {
    it('should return a parsed color sequence', async () => {
      const colorSequence = getColorsSequencesFromSessionInformation(
        mockSessionInformation
      );

      expect(colorSequence.length).toBe(8);
      expect(colorSequence[0]).toStrictEqual({
        color: 'rgb(0,0,0)',
        downscrollDuration: 300,
        flatDisplayDuration: 100,
      });
    });

    it('should work even if there are no color sequences', async () => {
      const mockSessionInfo: SessionInformation = {
        Challenge: {
          FaceMovementAndLightChallenge: {
            ChallengeConfig: {
              BlazeFaceDetectionThreshold: 0.75,
              FaceDistanceThreshold: 0.4000000059604645,
              FaceDistanceThresholdMax: 0,
              FaceDistanceThresholdMin: 0.4000000059604645,
              FaceIouHeightThreshold: 0.15000000596046448,
              FaceIouWidthThreshold: 0.15000000596046448,
              OvalHeightWidthRatio: 1.6180000305175781,
              OvalIouHeightThreshold: 0.25,
              OvalIouThreshold: 0.699999988079071,
              OvalIouWidthThreshold: 0.25,
            },
            OvalParameters: {
              Width: 1,
              Height: 2,
              CenterX: 3,
              CenterY: 4,
            },
            LightChallengeType: 'SEQUENTIAL',
            ColorSequences: undefined,
          },
        },
      };
      const colorSequence =
        getColorsSequencesFromSessionInformation(mockSessionInfo);

      expect(colorSequence.length).toBe(0);
    });

    it('should not return values if color sequences do not contain durations', async () => {
      const mockSessionInfo: SessionInformation = {
        Challenge: {
          FaceMovementAndLightChallenge: {
            ChallengeConfig: {
              BlazeFaceDetectionThreshold: 0.75,
              FaceDistanceThreshold: 0.4000000059604645,
              FaceDistanceThresholdMax: 0,
              FaceDistanceThresholdMin: 0.4000000059604645,
              FaceIouHeightThreshold: 0.15000000596046448,
              FaceIouWidthThreshold: 0.15000000596046448,
              OvalHeightWidthRatio: 1.6180000305175781,
              OvalIouHeightThreshold: 0.25,
              OvalIouThreshold: 0.699999988079071,
              OvalIouWidthThreshold: 0.25,
            },
            OvalParameters: {
              Width: 1,
              Height: 2,
              CenterX: 3,
              CenterY: 4,
            },
            LightChallengeType: 'SEQUENTIAL',
            ColorSequences: [
              {
                FreshnessColor: {
                  RGB: [0, 0, 0], // black
                },
                DownscrollDuration: undefined,
                FlatDisplayDuration: undefined,
              },
            ],
          },
        },
      };
      const colorSequence =
        getColorsSequencesFromSessionInformation(mockSessionInfo);

      expect(colorSequence.length).toBe(0);
    });
  });

  describe('isCameraDeviceVirtual', () => {
    it('should return true if device is virtual', () => {
      const device = {
        ...mockCameraDevice,
        label: 'ManyCam Virtual Webcam',
      };

      expect(isCameraDeviceVirtual(device)).toBe(true);
    });

    it('should return false if device is not virtual', () => {
      const device = {
        ...mockCameraDevice,
        label: 'FaceTime HD Camera (Built-in)',
      };

      expect(isCameraDeviceVirtual(device)).toBe(false);
    });
  });

  describe('drawLivenessOvalInCanvas', () => {
    it('should call canvas functions for drawing the provided oval', () => {
      const canvas = context.videoAssociatedParams?.canvasEl!;
      const oval = mockOvalDetails;
      const scaleFactor = 1;
      const videoEl = context.videoAssociatedParams?.videoEl!;
      drawLivenessOvalInCanvas({
        canvas,
        oval,
        scaleFactor,
        videoEl,
      });

      const canvasContext = canvas.getContext('2d');
      const drawCalls = (canvasContext as any).__getDrawCalls();
      const path = (canvasContext as any)._path;
      // Final call should be to clear the middle of the oval so we can see the face
      expect(drawCalls[drawCalls.length - 1].type).toBe('clearRect');
      expect(path[0].type).toBe('beginPath');
      expect(path[1].type).toBe('ellipse');
      expect(path[2].type).toBe('clip');
    });
  });

  describe('fillOverlayCanvasFractional', () => {
    it('should fail if canvas context is undefined', () => {
      const mockGetContext = jest.fn().mockReturnValue(undefined);
      const canvas = context.videoAssociatedParams?.canvasEl!;
      (canvas as any).getContext = mockGetContext;
      const oval = mockOvalDetails;
      const scaleFactor = 1;
      const videoEl = context.videoAssociatedParams?.videoEl!;
      expect(() =>
        fillOverlayCanvasFractional({
          overlayCanvas: canvas,
          prevColor: 'red',
          nextColor: 'black',
          videoEl,
          ovalDetails: oval,
          heightFraction: 1,
          scaleFactor,
        })
      ).toThrow();
    });
  });

  describe('estimateIllumination', () => {
    it('should fail if canvas context is undefined', () => {
      const mockGetContext = jest.fn().mockReturnValue(undefined);
      const canvas = context.videoAssociatedParams?.canvasEl!;
      (canvas as any).getContext = mockGetContext;
      const videoEl = context.videoAssociatedParams?.videoEl!;
      expect(() => estimateIllumination(videoEl)).toThrow();
    });

    it('should return too dark on an empty video element ', () => {
      const videoEl = context.videoAssociatedParams?.videoEl!;
      Object.defineProperty(videoEl, 'videoWidth', { value: 100 });
      Object.defineProperty(videoEl, 'videoHeight', { value: 100 });
      expect(estimateIllumination(videoEl)).toBe(IlluminationState.DARK);
    });
  });
});
