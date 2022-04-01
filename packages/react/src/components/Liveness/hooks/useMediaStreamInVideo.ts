import { useEffect, useState, useRef } from 'react';

export function useMediaStreamInVideo(
  stream: MediaStream,
  videoConstraints: MediaTrackConstraints
) {
  const height = (videoConstraints.height as ConstrainULongRange).ideal;
  const width = (videoConstraints.width as ConstrainULongRange).ideal;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoHeight, setVideoHeight] = useState<number>(height);
  const [videoWidth, setVideoWidth] = useState<number>(width);
  const [streamOffset, setStreamOffset] = useState<number>(0);

  useEffect(() => {
    if (stream) {
      videoRef.current.srcObject = stream;
      const { height: streamHeight, width: streamWidth } = stream
        .getTracks()[0]
        .getSettings();
      const offsetHeight = window.innerHeight - streamHeight;

      setVideoHeight(streamHeight);
      setVideoWidth(streamWidth);
      setStreamOffset(offsetHeight <= 0 ? 0 : offsetHeight / 2);
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
    streamOffset,
  };
}
