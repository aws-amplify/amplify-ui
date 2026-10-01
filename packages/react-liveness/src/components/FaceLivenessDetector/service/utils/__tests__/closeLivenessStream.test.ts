import { closeLivenessStream } from '../closeLivenessStream';
import type { StreamRecorder } from '../StreamRecorder';

describe('closeLivenessStream', () => {
  const createProvider = (stopRecording: () => Promise<void>) =>
    ({
      stopRecording: jest.fn(stopRecording),
      dispatchStreamEvent: jest.fn(),
    }) as unknown as StreamRecorder;

  const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should stop recording and then send the close code', async () => {
    const provider = createProvider(() => Promise.resolve());

    closeLivenessStream(provider, 4003);
    await flushPromises();

    expect(provider.stopRecording).toHaveBeenCalledTimes(1);
    expect(provider.dispatchStreamEvent).toHaveBeenCalledWith({
      type: 'closeCode',
      data: { closeCode: 4003 },
    });
  });

  it('should log and still send the close code if stopping fails', async () => {
    const error = new Error('stop failed');
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const provider = createProvider(() => Promise.reject(error));

    closeLivenessStream(provider, 4003);
    await flushPromises();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error stopping liveness recording:',
      error
    );
    expect(provider.dispatchStreamEvent).toHaveBeenCalledWith({
      type: 'closeCode',
      data: { closeCode: 4003 },
    });
  });

  it('should do nothing without a stream provider', () => {
    expect(() => closeLivenessStream(undefined, 4003)).not.toThrow();
  });
});
