import {
  LivenessOvalDetails,
  Illumination,
  Face,
  FaceMatchState,
  BoundingBox,
} from '../types';

/**
 * Returns the random number between min and max
 * seeded with the provided seed.
 *
 * TODO: Use a custom random number generator with seed.
 */
function getSeededRandomInRange(
  min: number,
  max: number,
  seed: string
): number {
  return Math.random() * (max - min) + min;
}

/**
 * Returns the ratio of intersection and union of two bounding boxes.
 */
function getIntersectionOverUnion(
  box1: BoundingBox,
  box2: BoundingBox
): number {
  const xA = Math.max(box1.left, box2.left);
  const yA = Math.max(box1.top, box2.top);
  const xB = Math.min(box1.right, box2.right);
  const yB = Math.min(box1.bottom, box2.bottom);

  const intersectionArea = Math.max(0, xB - xA + 1) * Math.max(0, yB - yA + 1);

  const boxAArea = (box1.bottom - box1.top + 1) * (box1.right - box1.left + 1);
  const boxBArea = (box2.bottom - box2.top + 1) * (box2.right - box2.left + 1);

  return intersectionArea / (boxAArea + boxBArea - intersectionArea);
}

/**
 * Returns the details of a randomly generated liveness oval
 * based on the video dimensions, initial face and the provided seed.
 */
export function getRandomLivenessOvalDetails({
  width,
  height,
  initialFace,
  livenessSeed,
}: {
  width: number;
  height: number;
  initialFace: Face;
  livenessSeed: string;
}): LivenessOvalDetails {
  let videoWidth = width;
  let videoHeight = height;
  let ovalWidthOffset = 0;

  // if the video is landscape, convert to portrait
  if (width > height) {
    videoWidth = height ** 2 / width;
    ovalWidthOffset = (width ** 2 - height ** 2) / (2 * width);
  }

  // center of oval
  const minOvalCenterX = (2 * videoWidth) / 5 + ovalWidthOffset;
  const maxOvalCenterX = (3 * videoWidth) / 5 + ovalWidthOffset;
  const minOvalCenterY = (2 * videoHeight) / 5;
  const maxOvalCenterY = (3 * videoHeight) / 5;

  const ovalCenterX = getSeededRandomInRange(
    minOvalCenterX,
    maxOvalCenterX,
    livenessSeed
  );
  const ovalCenterY = getSeededRandomInRange(
    minOvalCenterY,
    maxOvalCenterY,
    livenessSeed
  );

  // dimensions of oval
  const MIN_PROPORTION = 0.3;
  const MAX_PROPORTION = 0.8;
  const GOLDEN_RATIO = 1.618;

  const minOvalWidth = videoWidth * MIN_PROPORTION;
  const maxOvalWidth = videoWidth * MAX_PROPORTION;

  const ovalThreshold = videoWidth / 2;
  const faceWidthHeight = (initialFace.width + initialFace.height) / 2;

  let ovalWidth: number;
  if (faceWidthHeight > ovalThreshold) {
    ovalWidth = minOvalWidth * getSeededRandomInRange(1, 4 / 3, livenessSeed);
  } else {
    ovalWidth = maxOvalWidth * getSeededRandomInRange(3 / 4, 1, livenessSeed);
  }

  const ovalHeight = GOLDEN_RATIO * ovalWidth;

  return {
    centerX: Math.floor(ovalCenterX),
    centerY: Math.floor(ovalCenterY),
    width: Math.floor(ovalWidth),
    height: Math.floor(ovalHeight),
  };
}

/**
 * Draws the provided liveness oval on the canvas.
 */
export function drawLivenessOvalInCanvas(
  canvas: HTMLCanvasElement,
  oval: LivenessOvalDetails
) {
  const { centerX, centerY, width, height } = oval;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.globalCompositeOperation = 'xor';

  // fill the canvas with a transparent rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // draw the oval path
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, 2 * Math.PI);

  // add stroke to the oval path
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.clip();

  // clear the oval content from the rectangle
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

/**
 * Returns the state of the provided face with respect to the provided liveness oval.
 */
export function getFaceMatchStateInLivenessOval(
  face: Face,
  ovalDetails: LivenessOvalDetails
): FaceMatchState {
  let faceMatchState: FaceMatchState;

  const minFaceX = face.left;
  const maxFaceX = face.left + face.width;
  const minFaceY = face.top;
  const maxFaceY = face.top + face.height;

  const minOvalX = ovalDetails.centerX - ovalDetails.width / 2;
  const maxOvalX = ovalDetails.centerX + ovalDetails.width / 2;
  const minOvalY = ovalDetails.centerY - ovalDetails.height / 2;
  const maxOvalY = ovalDetails.centerY + ovalDetails.height / 2;

  const faceBoundingBox: BoundingBox = {
    left: minFaceX,
    top: minFaceY,
    right: maxFaceX,
    bottom: maxFaceY,
  };
  const ovalBoundingBox: BoundingBox = {
    left: minOvalX,
    top: minOvalY,
    right: maxOvalX,
    bottom: maxOvalY,
  };

  const intersection = getIntersectionOverUnion(
    faceBoundingBox,
    ovalBoundingBox
  );

  const intersectionThreshold = 0.5;
  const ovalMatchWidthThreshold = ovalDetails.width * 0.25;
  const ovalMatchHeightThreshold = ovalDetails.height * 0.25;
  const faceDetectionWidthThreshold = ovalDetails.width * 0.15;
  const faceDetectionHeightThreshold = ovalDetails.height * 0.15;

  if (
    intersection > intersectionThreshold &&
    Math.abs(minOvalX - minFaceX) < ovalMatchWidthThreshold &&
    Math.abs(maxOvalX - maxFaceX) < ovalMatchWidthThreshold &&
    Math.abs(maxOvalY - maxFaceY) < ovalMatchHeightThreshold
  ) {
    faceMatchState = FaceMatchState.MATCHED;
  } else if (
    minOvalX - minFaceX > faceDetectionWidthThreshold &&
    maxOvalX - maxFaceX > faceDetectionWidthThreshold
  ) {
    faceMatchState = FaceMatchState.TOO_LEFT;
  } else if (
    minFaceX - minOvalX > faceDetectionWidthThreshold &&
    maxFaceX - maxOvalX > faceDetectionWidthThreshold
  ) {
    faceMatchState = FaceMatchState.TOO_RIGHT;
  } else if (
    minOvalY - minFaceY > faceDetectionHeightThreshold ||
    maxFaceY - maxOvalY > faceDetectionHeightThreshold ||
    (minOvalX - minFaceX > faceDetectionWidthThreshold &&
      maxFaceX - maxOvalX > faceDetectionWidthThreshold)
  ) {
    faceMatchState = FaceMatchState.TOO_CLOSE;
  } else {
    faceMatchState = FaceMatchState.TOO_FAR;
  }

  return faceMatchState;
}

/**
 * Returns the illumination state in the provided video frame.
 */
export function estimateIllumination(videoEl: HTMLVideoElement): Illumination {
  const canvasEl = document.createElement('canvas');
  canvasEl.width = videoEl.videoWidth;
  canvasEl.height = videoEl.videoHeight;

  const ctx = canvasEl.getContext('2d');
  ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
  const frame = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height).data;

  // histogram
  const MAX_SCALE = 8;
  const hist = new Array(MAX_SCALE).fill(0);

  for (let i = 0; i < frame.length; i++) {
    const luma = Math.round(
      frame[i++] * 0.2126 + frame[i++] * 0.7152 + frame[i++] * 0.0722
    );
    hist[luma % 32]++;
  }

  let ind = -1,
    maxCount = 0;
  for (let i = 0; i < MAX_SCALE; i++) {
    if (hist[i] > maxCount) {
      maxCount = hist[i];
      ind = i;
    }
  }

  canvasEl.remove();

  if (ind === 0) return Illumination.DARK;
  if (ind === MAX_SCALE) return Illumination.BRIGHT;
  return Illumination.NORMAL;
}
