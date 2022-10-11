import {
  getRandomScalingAttributes,
  getRandomLivenessOvalDetails,
  getFaceMatchStateInLivenessOval,
  isCameraDeviceVirtual,
} from '../liveness';
import { Face, FaceMatchState, LivenessOvalDetails } from '../../../types';
import { mockSessionInformation } from '../liveness-test-helpers';

describe('Liveness Helper', () => {
  describe('getRandomScalingAttributes', () => {
    it('should parse sessionInformation and return oval scaling attributes', () => {
      const randomScalingAttributes = getRandomScalingAttributes(
        mockSessionInformation
      );

      expect(randomScalingAttributes.centerX).toBe(2);
      expect(randomScalingAttributes.centerY).toBe(3);
      expect(randomScalingAttributes.width).toBe(1);
    });
  });

  describe('getRandomLivenessOvalDetails', () => {
    const initialFace: Face = {
      height: 163.01509,
      width: 217.36107,
      top: 185.12999,
      left: 256.78488,
      timestampMs: Date.now(),
    };

    it('should return the correct oval details in landscape', () => {
      const width = 640;
      const height = 480;

      const expectedOvalDetails: LivenessOvalDetails = {
        height: 480,
        width: 297,
        centerX: 440,
        centerY: 390,
      };

      const actualOvalDetails = getRandomLivenessOvalDetails({
        width,
        height,
        sessionInformation: mockSessionInformation,
      });

      expect(actualOvalDetails).toEqual(expectedOvalDetails);
    });

    it('should return the correct oval details in portrait', () => {
      const width = 480;
      const height = 640;

      const expectedOvalDetails: LivenessOvalDetails = {
        height: 640,
        width: 396,
        centerX: 330,
        centerY: 520,
      };

      const actualOvalDetails = getRandomLivenessOvalDetails({
        width,
        height,
        sessionInformation: mockSessionInformation,
      });

      expect(actualOvalDetails).toEqual(expectedOvalDetails);
    });
  });

  describe('getFaceMatchStateInLivenessOval', () => {
    const ovalDetails: LivenessOvalDetails = {
      height: 254,
      width: 157,
      centerY: 285, // top: 285 - 254 / 2 = 158
      centerX: 286, // left: 286 - 157 / 2 = 207.5
    };

    it('should return correct state when MATCHED', () => {
      const face: Face = {
        height: 250,
        width: 150,
        top: 160,
        left: 208,
        timestampMs: Date.now(),
      };

      const actualState = getFaceMatchStateInLivenessOval(face, ovalDetails);

      expect(actualState).toEqual(FaceMatchState.MATCHED);
    });

    it('should return correct state when TOO_LEFT', () => {
      const face: Face = {
        height: 250,
        width: 150,
        top: 160,
        left: 150,
        timestampMs: Date.now(),
      };

      const actualState = getFaceMatchStateInLivenessOval(face, ovalDetails);

      expect(actualState).toEqual(FaceMatchState.TOO_LEFT);
    });

    it('should return correct state when TOO_RIGHT', () => {
      const face: Face = {
        height: 250,
        width: 150,
        top: 160,
        left: 250,
        timestampMs: Date.now(),
      };

      const actualState = getFaceMatchStateInLivenessOval(face, ovalDetails);

      expect(actualState).toEqual(FaceMatchState.TOO_RIGHT);
    });

    it('should return correct state when TOO_CLOSE', () => {
      const face: Face = {
        height: 320,
        width: 250,
        top: 110,
        left: 200,
        timestampMs: Date.now(),
      };

      const actualState = getFaceMatchStateInLivenessOval(face, ovalDetails);

      expect(actualState).toEqual(FaceMatchState.TOO_CLOSE);
    });

    it('should return correct state when TOO_FAR', () => {
      const face: Face = {
        height: 150,
        width: 120,
        top: 160,
        left: 220,
        timestampMs: Date.now(),
      };

      const actualState = getFaceMatchStateInLivenessOval(face, ovalDetails);

      expect(actualState).toEqual(FaceMatchState.TOO_FAR);
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
});
