import type { StreamRecorder } from './StreamRecorder';

/**
 * Stops recording and sends `closeCode` to the streaming service so the
 * session is closed with a reason instead of being left to time out.
 *
 * Only call this once recording has started: `stopRecording()` resolves when
 * the recorder stops, so if it never started the close code is not sent.
 */
export function closeLivenessStream(
  livenessStreamProvider: StreamRecorder | undefined,
  closeCode: number
): void {
  livenessStreamProvider
    ?.stopRecording()
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error stopping liveness recording:', error);
    })
    // send the close code even if stopping failed so the session still ends
    .then(() => {
      livenessStreamProvider.dispatchStreamEvent({
        type: 'closeCode',
        data: { closeCode },
      });
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error sending liveness close code:', error);
    });
}
