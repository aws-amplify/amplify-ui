import {
  getOvalDetailsFromSessionInformation,
  isCameraDeviceVirtual,
} from '../liveness';
import { LivenessOvalDetails } from '../../types';
import { mockSessionInformation } from '../__mocks__/testUtils';

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
    const ovalDetails: LivenessOvalDetails = {
      height: 254,
      width: 157,
      centerY: 285, // top: 285 - 254 / 2 = 158
      flippedCenterX: 286, // left: 286 - 157 / 2 = 207.5
      centerX: 286, // left: 286 - 157 / 2 = 207.5
    };
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
