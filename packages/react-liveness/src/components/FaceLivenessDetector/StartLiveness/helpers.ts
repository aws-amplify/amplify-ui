export const STATIC_VIDEO_CONSTRAINTS: MediaTrackConstraints = {
  width: {
    min: 320,
    ideal: 640,
  },
  height: {
    min: 240,
    ideal: 480,
  },
  frameRate: { min: 15, ideal: 30, max: 30 },
  facingMode: 'user',
};
