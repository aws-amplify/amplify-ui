import type { StreamRecorder } from './StreamRecorder';

/**
 * Stops recording and sends `closeCode` to the streaming service so the
 * session is closed with a reason instead of being left to time out
 */
export function closeLivenessStream(
  livenessStreamProvider: StreamRecorder | undefined,
  closeCode: number
): void {
  livenessStreamProvider?.stopRecording().then(() => {
    livenessStreamProvider.dispatchStreamEvent({
      type: 'closeCode',
      data: { closeCode },
    });
  });
}
