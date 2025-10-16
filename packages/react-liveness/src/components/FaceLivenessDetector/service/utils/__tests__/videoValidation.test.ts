/**
 * @jest-environment jsdom
 */

import { getVideoDuration, validateVideoDuration } from '../videoValidation';

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('videoValidation', () => {
  describe('getVideoDuration', () => {
    it('should extract video duration from blob', async () => {
      const mockBlob = new Blob(['mock video data'], { type: 'video/webm' });
      const mockDuration = 8.5; // 8.5 seconds

      // Mock video element
      const mockVideo = {
        preload: '',
        src: '',
        duration: mockDuration,
        onloadedmetadata: null as any,
        onerror: null as any,
      };

      jest.spyOn(document, 'createElement').mockReturnValue(mockVideo as any);

      const durationPromise = getVideoDuration(mockBlob);

      // Simulate metadata loaded
      setTimeout(() => {
        if (mockVideo.onloadedmetadata) {
          mockVideo.onloadedmetadata();
        }
      }, 0);

      const duration = await durationPromise;

      expect(duration).toBe(8500); // 8.5 seconds = 8500ms
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
    });

    it('should reject if video fails to load', async () => {
      const mockBlob = new Blob(['mock video data'], { type: 'video/webm' });

      const mockVideo = {
        preload: '',
        src: '',
        duration: 0,
        onloadedmetadata: null as any,
        onerror: null as any,
      };

      jest.spyOn(document, 'createElement').mockReturnValue(mockVideo as any);

      const durationPromise = getVideoDuration(mockBlob);

      // Simulate error
      setTimeout(() => {
        if (mockVideo.onerror) {
          mockVideo.onerror();
        }
      }, 0);

      await expect(durationPromise).rejects.toThrow(
        'Failed to load video metadata'
      );
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
    });
  });

  describe('validateVideoDuration', () => {
    beforeEach(() => {
      jest.spyOn(console, 'log').mockImplementation();
      jest.spyOn(console, 'warn').mockImplementation();
      jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should validate video duration within tolerance', async () => {
      const mockBlob = new Blob(['mock video data'], { type: 'video/webm' });
      const expectedDuration = 8000; // 8 seconds
      const mockActualDuration = 8.05; // 8.05 seconds

      const mockVideo = {
        preload: '',
        src: '',
        duration: mockActualDuration,
        onloadedmetadata: null as any,
        onerror: null as any,
      };

      jest.spyOn(document, 'createElement').mockReturnValue(mockVideo as any);

      const validatePromise = validateVideoDuration({
        videoBlob: mockBlob,
        expectedDuration,
        tolerance: 100,
        recordingStartTimestamp: 1000,
        recordingEndTimestamp: 9000,
        chunksCount: 10,
      });

      // Simulate metadata loaded
      setTimeout(() => {
        if (mockVideo.onloadedmetadata) {
          mockVideo.onloadedmetadata();
        }
      }, 0);

      const result = await validatePromise;

      expect(result.isValid).toBe(true);
      expect(result.actualDuration).toBeCloseTo(8050, 0);
      expect(result.difference).toBeCloseTo(50, 0);
      expect(console.log).toHaveBeenCalledWith(
        '[Liveness Video Duration Validation]',
        expect.objectContaining({
          expectedDuration: '8000ms',
          actualDuration: '8050ms',
          isValid: true,
        })
      );
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should warn when video duration exceeds tolerance', async () => {
      const mockBlob = new Blob(['mock video data'], { type: 'video/webm' });
      const expectedDuration = 8000; // 8 seconds
      const mockActualDuration = 5.0; // 5 seconds (3 seconds short)

      const mockVideo = {
        preload: '',
        src: '',
        duration: mockActualDuration,
        onloadedmetadata: null as any,
        onerror: null as any,
      };

      jest.spyOn(document, 'createElement').mockReturnValue(mockVideo as any);

      const validatePromise = validateVideoDuration({
        videoBlob: mockBlob,
        expectedDuration,
        tolerance: 100,
      });

      // Simulate metadata loaded
      setTimeout(() => {
        if (mockVideo.onloadedmetadata) {
          mockVideo.onloadedmetadata();
        }
      }, 0);

      const result = await validatePromise;

      expect(result.isValid).toBe(false);
      expect(result.actualDuration).toBe(5000);
      expect(result.difference).toBe(3000);
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('Video duration mismatch detected')
      );
    });

    it('should handle errors gracefully', async () => {
      const mockBlob = new Blob(['mock video data'], { type: 'video/webm' });
      const expectedDuration = 8000;

      const mockVideo = {
        preload: '',
        src: '',
        duration: 0,
        onloadedmetadata: null as any,
        onerror: null as any,
      };

      jest.spyOn(document, 'createElement').mockReturnValue(mockVideo as any);

      const validatePromise = validateVideoDuration({
        videoBlob: mockBlob,
        expectedDuration,
      });

      // Simulate error
      setTimeout(() => {
        if (mockVideo.onerror) {
          mockVideo.onerror();
        }
      }, 0);

      const result = await validatePromise;

      expect(result.isValid).toBe(false);
      expect(result.actualDuration).toBe(0);
      expect(result.difference).toBe(expectedDuration);
      expect(console.error).toHaveBeenCalledWith(
        '[Liveness] Failed to validate video duration:',
        expect.any(Error)
      );
    });
  });
});
