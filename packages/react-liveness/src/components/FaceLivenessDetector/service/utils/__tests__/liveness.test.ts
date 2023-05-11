import 'jest-canvas-mock';
import {
  drawLivenessOvalInCanvas,
  getColorsSequencesFromSessionInformation,
  getFaceMatchState,
  getFaceMatchStateInLivenessOval,
  getOvalDetailsFromSessionInformation,
  isCameraDeviceVirtual,
  isFaceDistanceBelowThreshold,
} from '../liveness';
import {
  mockContext,
  mockFace,
  mockOvalDetails,
  mockSessionInformation,
} from '../__mocks__/testUtils';
import { Face, FaceMatchState, LivenessOvalDetails } from '../../types';

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

  describe('getFaceMatchStateInLivenessOval', () => {
    it('should parse sessionInformation and return oval parameter attributes', () => {
      const face: Face = mockFace;
      const ovalDetails: LivenessOvalDetails = mockOvalDetails;
      const initialIntersection: number = 0.3;
      const sessionInfo = mockSessionInformation;

      const { faceMatchState, faceMatchPercentage } =
        getFaceMatchStateInLivenessOval(
          face,
          ovalDetails,
          initialIntersection,
          sessionInfo
        );

      expect(faceMatchState).toBe(FaceMatchState.TOO_CLOSE);
      expect(faceMatchPercentage).toBe(0);
    });

    it('should return matched', () => {
      const face: Face = {
        top: 150.07504272460938,
        left: 106.4375,
        width: 432.6287078857422,
        height: 324.4761657714844,
        timestampMs: 1683674498221,
        probability: 0.9998714923858643,
        rightEye: [409.51867485046387, 253.7000298500061],
        leftEye: [251.89466857910156, 246.67850017547607],
        mouth: [320.84685707092285, 404.4503116607666],
        nose: [326.97374725341797, 341.47182762622833],
      };
      const ovalDetails: LivenessOvalDetails = {
        centerX: 305,
        centerY: 237,
        flippedCenterX: 335,
        height: 512,
        width: 316,
      };
      const initialIntersection: number = 0.3;
      const sessionInfo = mockSessionInformation;

      const { faceMatchState, faceMatchPercentage } =
        getFaceMatchStateInLivenessOval(
          face,
          ovalDetails,
          initialIntersection,
          sessionInfo
        );

      expect(faceMatchState).toBe(FaceMatchState.MATCHED);
      expect(faceMatchPercentage).toBe(100);
    });

    it('should return TOO FAR', () => {
      const face: Face = {
        top: 229.4625244140625,
        left: 275.884765625,
        width: 135.34274291992188,
        height: 101.50827026367188,
        timestampMs: 1683674844363,
        probability: 0.9974300265312195,
        rightEye: [372.5564064979553, 258.19776356220245],
        leftEye: [318.5161700248718, 253.94269466400146],
        mouth: [339.64158596098423, 298.5959941148758],
        nose: [342.7122294306755, 277.0021167397499],
      };
      const ovalDetails: LivenessOvalDetails = {
        flippedCenterX: 346,
        centerX: 294,
        centerY: 215,
        width: 316,
        height: 512,
      };
      const initialIntersection: number = 0.3;
      const sessionInfo = mockSessionInformation;

      const { faceMatchState, faceMatchPercentage } =
        getFaceMatchStateInLivenessOval(
          face,
          ovalDetails,
          initialIntersection,
          sessionInfo
        );

      expect(faceMatchState).toBe(FaceMatchState.TOO_FAR);
      expect(faceMatchPercentage).toBe(0);
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

      expect(result).toBe(false);
    });

    it('should return false if more than one face', async () => {
      mockBlazeFace.detectFaces.mockResolvedValue([mockFace, mockFace]);

      const result = await isFaceDistanceBelowThreshold({
        faceDetector: mockBlazeFace,
        videoEl: jest.fn() as unknown as HTMLVideoElement,
        ovalDetails: mockOvalDetails,
      });

      expect(result).toBe(false);
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

      expect(result).toBe(true);
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
      const mockSessionInfo = {
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
      const mockSessionInfo = {
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
    const mockCameraDevice: MediaDeviceInfo = {
      deviceId: 'some-device-id',
      groupId: 'some-group-id',
      kind: 'videoinput',
      label: 'some-label',
      toJSON: () => ({}),
    };

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
      const context = mockContext();
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
});
