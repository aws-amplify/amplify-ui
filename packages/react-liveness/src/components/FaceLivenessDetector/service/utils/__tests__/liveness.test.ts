import 'jest-canvas-mock';
import {
  drawLivenessOvalInCanvas,
  estimateIllumination,
  getFaceMatchStateInLivenessOval,
  getOvalDetailsFromSessionInformation,
  isCameraDeviceVirtual,
} from '../liveness';
import {
  mockContext,
  mockFace,
  mockOvalDetails,
  mockSessionInformation,
} from '../__mocks__/testUtils';
import {
  Face,
  FaceMatchState,
  IlluminationState,
  LivenessOvalDetails,
} from '../../types';

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
