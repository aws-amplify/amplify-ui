import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useMediaStreamInVideo } from '../useMediaStreamInVideo';

describe('useMediaStreamInVideo', () => {
  it('should return videoRef, videoHeight, videoWidth, streamOffset', () => {
    jest.spyOn(React, 'useRef').mockReturnValue({
      current: document.createElement('video'),
    });
    window.innerHeight = 250;

    const track = {
      getSettings: () => ({ height: 200, width: 200 }),
      stop: jest.fn(),
    } as unknown as MediaStreamTrack;

    const stream = {
      getTracks: () => [track],
      removeTrack: jest.fn(),
    } as unknown as MediaStream;

    const videoConstraints = {
      height: { ideal: 100 },
      width: { ideal: 100 },
    };

    const { result, rerender, unmount } = renderHook(() => {
      console.log(stream);
      return useMediaStreamInVideo(stream, videoConstraints);
    });

    expect(result.current.videoRef).toBeDefined();
    expect(result.current.videoHeight).toBe(200);
    expect(result.current.videoWidth).toBe(200);
    expect(result.current.streamOffset).toBe(25);

    unmount();
    expect(stream.removeTrack).toHaveBeenCalledWith(track);
    expect(track.stop).toHaveBeenCalled();

    // FIXME: What is the purpose of this test?
    // window.innerHeight = 150;
    // rerender({ stream, videoConstraints });
    // expect(result.current.streamOffset).toBe(0);
  });
});
