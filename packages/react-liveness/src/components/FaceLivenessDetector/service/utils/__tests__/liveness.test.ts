import 'jest-canvas-mock';
import {
  drawLivenessOvalInCanvas,
  estimateIllumination,
  fillOverlayCanvasFractional,
  getColorsSequencesFromSessionInformation,
  getFaceMatchState,
  getFaceMatchStateInLivenessOval,
  getOvalDetailsFromSessionInformation,
  isCameraDeviceVirtual,
  isFaceDistanceBelowThreshold,
} from '../liveness';
import {
  getMockContext,
  mockFace,
  mockOvalDetails,
  mockSessionInformation,
  mockCameraDevice,
} from '../__mocks__/testUtils';
import {
  Face,
  FaceMatchState,
  IlluminationState,
  LivenessErrorState,
  LivenessOvalDetails,
} from '../../types';

const context = getMockContext();

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

      expect(faceMatchState).toBe(FaceMatchState.OFF_CENTER);
      expect(faceMatchPercentage).toBe(0);
    });

    it('should return TOO CLOSE', () => {
      const face: Face = {
        height: 586,
        width: 586,
        left: -6,
        top: 21,
        timestampMs: 1,
        rightEye: [185, 231],
        leftEye: [427, 224],
        mouth: [330, 493],
        nose: [334, 400],
        rightEar: [36, 243],
        leftEar: [518, 217],
      };
      const ovalDetails: LivenessOvalDetails = {
        height: 465,
        width: 288,
        flippedCenterX: 320,
        centerX: 320,
        centerY: 240,
      };
      const initialIntersection: number = 0.3;
      const sessionInfo = mockSessionInformation;

      const { faceMatchState } = getFaceMatchStateInLivenessOval(
        face,
        ovalDetails,
        initialIntersection,
        sessionInfo
      );

      expect(faceMatchState).toBe(FaceMatchState.TOO_CLOSE);
    });

    // Note: if this test ever fails due to face detection updates just add a console log for face and do a check and copy the value here
    it('should return matched', () => {
      const face: Face = {
        top: 89.82275009155273,
        left: 188.85473251342773,
        width: 375.7287788391113,
        height: 375.66087722778315,
        timestampMs: 1696575105415,
        rightEye: [291.9423294067383, 241.10103607177734],
        leftEye: [435.9743881225586, 264.43485260009766],
        mouth: [336.0434341430664, 417.43167877197266],
        nose: [336.7517852783203, 387.286376953125],
        rightEar: [236.0750961303711, 193.77853393554685],
        leftEar: [520.6099700927734, 238.4494781494141],
      };
      const ovalDetails: LivenessOvalDetails = {
        centerX: 320,
        centerY: 240,
        flippedCenterX: 320,
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
        rightEar: [400.5564064979553, 258.19776356220245],
        leftEar: [300.5161700248718, 253.94269466400146],
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
      const mockCloseFace: Face = {
        height: 100,
        width: 100,
        left: 150,
        top: 200,
        timestampMs: 1,
        rightEye: [0, 100],
        leftEye: [150, 100],
        mouth: [100, 100],
        nose: [100, 100],
        rightEar: [0, 100],
        leftEar: [150, 100],
      };
      mockBlazeFace.detectFaces.mockResolvedValue([mockCloseFace]);

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
