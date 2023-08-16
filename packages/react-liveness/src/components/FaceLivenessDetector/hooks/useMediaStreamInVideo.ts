import { useEffect, useState, useRef } from 'react';
import { isObject } from '@aws-amplify/ui';
import { getVideoConstraints } from '../StartLiveness/helpers';

export interface UseMediaStreamInVideo {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  videoHeight: number | undefined;
  videoWidth: number | undefined;
}

export function useMediaStreamInVideo(
  stream: MediaStream
): UseMediaStreamInVideo {
  const height = (getVideoConstraints().height as ConstrainULongRange).ideal;
  const width = (getVideoConstraints().width as ConstrainULongRange).ideal;

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
