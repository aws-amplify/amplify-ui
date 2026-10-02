import * as React from 'react';
import { render, waitFor } from '@testing-library/react';

import FaceLivenessDetectorCore from '../FaceLivenessDetectorCore';
import { WS_CLOSURE_CODE } from '../service/utils/constants';

const mockStreamProvider = {
  isRecording: jest.fn(),
  stopRecording: jest.fn(() => Promise.resolve()),
  dispatchStreamEvent: jest.fn(),
};

// Replace the liveness machine with a stub that sets up the stream provider
// after start, so the test exercises the real `useInterpret` unmount
// behavior (the service is stopped and reset before effects are cleaned up)
jest.mock('../service', () => {
  const { assign, createMachine } = jest.requireActual('xstate');
  return {
    ...jest.requireActual('../service'),
    livenessMachine: createMachine({
      id: 'stubLivenessMachine',
      predictableActionArguments: true,
      initial: 'connecting',
      context: { livenessStreamProvider: undefined },
      states: {
        connecting: {
          invoke: {
            src: () => Promise.resolve(),
            onDone: {
              target: 'recording',
              actions: assign({
                livenessStreamProvider: () => mockStreamProvider,
              }),
            },
          },
        },
        recording: {},
      },
    }),
  };
});
jest.mock('../LivenessCheck', () => ({ LivenessCheck: () => null }));

describe('FaceLivenessDetectorCore', () => {
  const defaultProps = {
    region: 'us-east-1',
    sessionId: 'sessionId',
    onAnalysisComplete: async () => {},
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should close the stream with the user cancel code when unmounted while recording', async () => {
    mockStreamProvider.isRecording.mockReturnValue(true);

    const { unmount } = render(<FaceLivenessDetectorCore {...defaultProps} />);
    // let the stub machine set up the stream provider
    await new Promise((resolve) => setTimeout(resolve, 0));
    unmount();

    await waitFor(() =>
      expect(mockStreamProvider.dispatchStreamEvent).toHaveBeenCalledWith({
        type: 'closeCode',
        data: { closeCode: WS_CLOSURE_CODE.USER_CANCEL },
      })
    );
    expect(mockStreamProvider.stopRecording).toHaveBeenCalledTimes(1);
  });

  it('should not close the stream when unmounted while not recording', async () => {
    mockStreamProvider.isRecording.mockReturnValue(false);

    const { unmount } = render(<FaceLivenessDetectorCore {...defaultProps} />);
    await new Promise((resolve) => setTimeout(resolve, 0));
    unmount();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockStreamProvider.isRecording).toHaveBeenCalled();
    expect(mockStreamProvider.stopRecording).not.toHaveBeenCalled();
    expect(mockStreamProvider.dispatchStreamEvent).not.toHaveBeenCalled();
  });

  it('should not touch the stream when unmounted before it is set up', () => {
    const { unmount } = render(<FaceLivenessDetectorCore {...defaultProps} />);
    unmount();

    expect(mockStreamProvider.isRecording).not.toHaveBeenCalled();
    expect(mockStreamProvider.stopRecording).not.toHaveBeenCalled();
  });
});
