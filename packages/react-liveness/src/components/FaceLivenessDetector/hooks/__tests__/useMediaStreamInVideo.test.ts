import React from 'react';
import { renderHook } from '@testing-library/react';

import { useMediaStreamInVideo } from '../useMediaStreamInVideo';
import { STATIC_VIDEO_CONSTRAINTS } from '../../utils/helpers';

describe('useMediaStreamInVideo', () => {
  it('should return videoRef, videoHeight, videoWidth', () => {
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

    const { result, unmount } = renderHook(() => {
      return useMediaStreamInVideo(stream);
    });

    expect(result.current.videoRef).toBeDefined();
    expect(result.current.videoHeight).toBe(200);
    expect(result.current.videoWidth).toBe(200);

    unmount();
    expect(stream.removeTrack).toHaveBeenCalledWith(track);
    expect(track.stop).toHaveBeenCalled();
  });

  it('should handle stream with no tracks', () => {
    const stream = {
      getTracks: () => [],
      removeTrack: jest.fn(),
    } as unknown as MediaStream;

    const { result, unmount } = renderHook(() => useMediaStreamInVideo(stream));

    const height = (STATIC_VIDEO_CONSTRAINTS.height as ConstrainULongRange)
      .ideal;
    const width = (STATIC_VIDEO_CONSTRAINTS.width as ConstrainULongRange).ideal;

    expect(result.current.videoHeight).toBe(height);
    expect(result.current.videoWidth).toBe(width);

    unmount();
  });

  it('should handle stream track with no settings', () => {
    const track = {
      getSettings: () => undefined,
      stop: jest.fn(),
    } as unknown as MediaStreamTrack;

    const stream = {
      getTracks: () => [track],
      removeTrack: jest.fn(),
    } as unknown as MediaStream;

    const { result, unmount } = renderHook(() => useMediaStreamInVideo(stream));

    const height = (STATIC_VIDEO_CONSTRAINTS.height as ConstrainULongRange)
      .ideal;
    const width = (STATIC_VIDEO_CONSTRAINTS.width as ConstrainULongRange).ideal;

    expect(result.current.videoHeight).toBe(height);
    expect(result.current.videoWidth).toBe(width);

    unmount();
    expect(stream.removeTrack).toHaveBeenCalledWith(track);
    expect(track.stop).toHaveBeenCalled();
  });
});
