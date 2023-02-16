import {
  getOvalDetailsFromSessionInformation,
  getFaceMatchStateInLivenessOval,
  isCameraDeviceVirtual,
} from '../liveness';
import { Face, FaceMatchState, LivenessOvalDetails } from '../../../types';
import { mockSessionInformation } from '../liveness-test-helpers';

describe('Liveness Helper', () => {
  describe('getOvalDetailsFromSessionInformation', () => {
    it('should parse sessionInformation and return oval parameter attributes', () => {
      const ovalParameters = getOvalDetailsFromSessionInformation({
        sessionInformation: mockSessionInformation,
      });

      expect(ovalParameters.centerX).toBe(3);
      expect(ovalParameters.centerY).toBe(4);
      expect(ovalParameters.width).toBe(1);
      expect(ovalParameters.height).toBe(2);
    });
  });

  describe('getFaceMatchStateInLivenessOval', () => {
    const ovalDetails: LivenessOvalDetails = {
      height: 254,
      width: 157,
      centerY: 285, // top: 285 - 254 / 2 = 158
      centerX: 286, // left: 286 - 157 / 2 = 207.5
    };

    // it('should return correct state when MATCHED', () => {
    //   const face: Face = {
    //     height: 236,
    //     width: 315,
    //     top: 5,
    //     left: 231.5,
    //     timestampMs: Date.now(),
    //     rightEye: [431, 223],
    //     leftEye: [331, 104],
    //     mouth: [304, 335],
    //   };
    //   const oval: LivenessOvalDetails = {
    //     centerX: 310, // left: 310 - 284 / 2 = 231.5
    //     centerY: 235, // top: 235 - 460 / 2 = 5
    //     height: 460,
    //     width: 284,
    //   };

    //   const actualState = getFaceMatchStateInLivenessOval(face, oval);

    //   expect(actualState).toEqual(FaceMatchState.MATCHED);
    // });

    it('should return correct state when TOO_LEFT', () => {
      const face: Face = {
        height: 250,
        width: 150,
        top: 160,
        left: 150,
        timestampMs: Date.now(),
        rightEye: [200, 200],
        leftEye: [200, 200],
        mouth: [200, 200],
        nose: [200, 200],
      };

      const actualState = getFaceMatchStateInLivenessOval(face, ovalDetails);

      expect(actualState).toEqual(FaceMatchState.TOO_LEFT);
    });

    // it('should return correct state when TOO_RIGHT', () => {
    //   const face: Face = {
    //     height: 250,
    //     width: 150,
    //     top: 160,
    //     left: 250,
    //     timestampMs: Date.now(),
    //     rightEye: [200, 200],
    //     leftEye: [200, 200],
    //     mouth: [200, 200],
    //     nose: [200, 200],
    //   };

    //   const actualState = getFaceMatchStateInLivenessOval(face, ovalDetails);

    //   expect(actualState).toEqual(FaceMatchState.TOO_RIGHT);
    // });

    // it('should return correct state when TOO_CLOSE', () => {
    //   const face: Face = {
    //     height: 320,
    //     width: 250,
    //     top: 110,
    //     left: 200,
    //     timestampMs: Date.now(),
    //     rightEye: [200, 200],
    //     leftEye: [200, 200],
    //     mouth: [200, 200],
    //     nose: [200, 200],
    //   };

    //   const actualState = getFaceMatchStateInLivenessOval(face, ovalDetails);

    //   expect(actualState).toEqual(FaceMatchState.TOO_CLOSE);
    // });

    // it('should return correct state when TOO_FAR', () => {
    //   const face: Face = {
    //     height: 150,
    //     width: 120,
    //     top: 160,
    //     left: 220,
    //     timestampMs: Date.now(),
    //     rightEye: [200, 200],
    //     leftEye: [200, 200],
    //     mouth: [200, 200],
    //     nose: [200, 200],
    //   };

    //   const actualState = getFaceMatchStateInLivenessOval(face, ovalDetails);

    //   expect(actualState).toEqual(FaceMatchState.TOO_FAR);
    // });
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
});
