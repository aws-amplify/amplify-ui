/**
 * Video validation utilities for liveness detection
 */

/**
 * Extracts the duration of a video blob in milliseconds
 * @param blob - The video blob to extract duration from
 * @returns Promise that resolves to the video duration in milliseconds
 */
export const getVideoDuration = (blob: Blob): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      // Convert duration from seconds to milliseconds
      resolve(video.duration * 1000);
    };

    video.onerror = () => {
      window.URL.revokeObjectURL(video.src);
      reject(new Error('Failed to load video metadata'));
    };

    video.src = URL.createObjectURL(blob);
  });
};

/**
 * Validates that the actual video duration matches the expected duration
 * Logs warnings if the mismatch exceeds the tolerance threshold
 *
 * @param params - Validation parameters
 * @param params.videoBlob - The video blob to validate
 * @param params.expectedDuration - Expected duration in milliseconds
 * @param params.tolerance - Maximum acceptable difference in milliseconds (default: 100ms)
 * @param params.recordingStartTimestamp - Timestamp when recording started
 * @param params.recordingEndTimestamp - Timestamp when recording ended
 * @param params.chunksCount - Number of video chunks recorded
 * @returns Promise that resolves to validation result
 */
export const validateVideoDuration = async ({
  videoBlob,
  expectedDuration,
  tolerance = 100,
  recordingStartTimestamp,
  recordingEndTimestamp,
  chunksCount,
}: {
  videoBlob: Blob;
  expectedDuration: number;
  tolerance?: number;
  recordingStartTimestamp?: number;
  recordingEndTimestamp?: number;
  chunksCount?: number;
}): Promise<{
  isValid: boolean;
  actualDuration: number;
  difference: number;
  percentageDifference: number;
}> => {
  try {
    const actualDuration = await getVideoDuration(videoBlob);
    const difference = Math.abs(expectedDuration - actualDuration);
    const percentageDifference = (difference / expectedDuration) * 100;
    const isValid = difference <= tolerance;

    // Log detailed information for debugging
    // eslint-disable-next-line no-console
    console.log('[Liveness Video Duration Validation]', {
      recordingStartTimestamp,
      recordingEndTimestamp,
      expectedDuration: `${expectedDuration}ms`,
      actualDuration: `${actualDuration.toFixed(0)}ms`,
      videoBlobSize: `${(videoBlob.size / 1024).toFixed(2)}KB`,
      difference: `${difference.toFixed(0)}ms`,
      percentageDifference: `${percentageDifference.toFixed(1)}%`,
      chunksCount,
      isValid,
      tolerance: `${tolerance}ms`,
    });

    // Warn if duration mismatch exceeds tolerance
    if (!isValid) {
      // eslint-disable-next-line no-console
      console.warn(
        `[Liveness] Video duration mismatch detected: ` +
          `expected ${expectedDuration}ms, got ${actualDuration.toFixed(
            0
          )}ms ` +
          `(difference: ${difference.toFixed(0)}ms, tolerance: ${tolerance}ms)`
      );
    }

    return {
      isValid,
      actualDuration,
      difference,
      percentageDifference,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Liveness] Failed to validate video duration:', error);

    // Return a result indicating validation failed
    return {
      isValid: false,
      actualDuration: 0,
      difference: expectedDuration,
      percentageDifference: 100,
    };
  }
};
