import { useEffect, useState, useRef } from 'react';

interface UseMediaStreamInVideoResult {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  videoHeight: number;
  videoWidth: number;
}

export function useMediaStreamInVideo(
  stream: MediaStream,
  videoConstraints: MediaTrackConstraints
): UseMediaStreamInVideoResult {
  const height = (videoConstraints.height as ConstrainULongRange).ideal;
  const width = (videoConstraints.width as ConstrainULongRange).ideal;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoHeight, setVideoHeight] = useState<number>(height);
  const [videoWidth, setVideoWidth] = useState<number>(width);

  useEffect(() => {
    if (stream) {
      videoRef.current.srcObject = stream;
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
