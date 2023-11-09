import { useEffect, useState, useRef } from 'react';
import { isObject } from '@aws-amplify/ui';
import { STATIC_VIDEO_CONSTRAINTS } from '../utils/helpers';

export interface UseMediaStreamInVideo {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  videoHeight: number | undefined;
  videoWidth: number | undefined;
}

export function useMediaStreamInVideo(
  stream: MediaStream
): UseMediaStreamInVideo {
  const height = (STATIC_VIDEO_CONSTRAINTS.height as ConstrainULongRange).ideal;
  const width = (STATIC_VIDEO_CONSTRAINTS.width as ConstrainULongRange).ideal;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoHeight, setVideoHeight] =
    useState<ConstrainULongRange['ideal']>(height);
  const [videoWidth, setVideoWidth] =
    useState<ConstrainULongRange['ideal']>(width);

  useEffect(() => {
    if (stream) {
      if (isObject(videoRef.current)) {
        videoRef.current.srcObject = stream;
      }
      const { height: streamHeight, width: streamWidth } = stream
        .getTracks()[0]
        .getSettings();

      setVideoHeight(streamHeight);
      setVideoWidth(streamWidth);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          stream.removeTrack(track);
          track.stop();
        });
      }
    };
  }, [stream]);

  return {
    videoRef,
    videoHeight,
    videoWidth,
  };
}
