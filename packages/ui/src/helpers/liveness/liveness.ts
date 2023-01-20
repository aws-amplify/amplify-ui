import {
  LivenessOvalDetails,
  IlluminationState,
  Face,
  FaceMatchState,
  BoundingBox,
  LivenessErrorState,
} from '../../types';
import { translate } from '../../i18n';
import { FaceDetection } from '../../types/liveness/faceDetection';
import { ClientFreshnessColorSequence } from '../../types/liveness/liveness-service-types';
import {
  ColorSequence,
  SessionInformation,
} from '@aws-sdk/client-rekognitionstreaming';

/**
 * Returns the random number between min and max
 * seeded with the provided random seed.
 */
function getScaledValueFromRandomSeed(
  randomSeed: number,
  min: number,
  max: number
): number {
  return randomSeed * (max - min) + min;
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

  const intersectionArea = Math.abs(
    Math.max(0, xB - xA) * Math.max(0, yB - yA)
  );

  if (intersectionArea === 0) {
    return 0;
  }

  const boxAArea = Math.abs(
    (box1.right - box1.left) * (box1.bottom - box1.top)
  );
  const boxBArea = Math.abs(
    (box2.right - box2.left) * (box2.bottom - box2.top)
  );

  return intersectionArea / (boxAArea + boxBArea - intersectionArea);
}

/**
 * Accepts sessionInformation as string and returns the 3 attributes
 * width: number;
 * centerX: number;
 * centerY: number;
 */
export function getRandomScalingAttributesStr(sessionInformationStr: string) {
  const sessionInfo = JSON.parse(sessionInformationStr);
  const ovalScaleFactors =
    sessionInfo.challenge.faceMovementAndLightChallenge.ovalScaleFactors;

  return {
    centerX: ovalScaleFactors.centerX,
    centerY: ovalScaleFactors.centerY,
    width: ovalScaleFactors.width,
  };
}

/**
 * Accepts sessionInformation and returns the 3 attributes
 * width: number;
 * centerX: number;
 * centerY: number;
 */
export function getRandomScalingAttributes(
  sessionInformation: SessionInformation
) {
  const ovalScaleFactors =
    sessionInformation?.Challenge?.FaceMovementAndLightChallenge
      ?.OvalScaleFactors;

  return {
    centerX: ovalScaleFactors?.CenterX,
    centerY: ovalScaleFactors?.CenterY,
    width: ovalScaleFactors?.Width,
  };
}

/**
 * Returns the details of a randomly generated liveness oval
 * based on the video dimensions, initial face and the provided seed.
 */
export function getRandomLivenessOvalDetails({
  width,
  height,
  sessionInformation,
}: {
  width: number;
  height: number;
  sessionInformation: SessionInformation;
}): LivenessOvalDetails {
  const randomScalingAttributes =
    getRandomScalingAttributes(sessionInformation);

  return getStaticLivenessOvalDetails({
    width,
    height,
    widthSeed: 1.0, // Testing with max value to force closest distance to camera
    centerXSeed: randomScalingAttributes.centerX,
    centerYSeed: randomScalingAttributes.centerY,
  });
}

/**
 * Returns the details of a statically generated liveness oval based on the video dimensions
 */
export function getStaticLivenessOvalDetails({
  width,
  height,
  widthSeed = 0.5,
  centerXSeed = 0.5,
  centerYSeed = 0.5,
}: {
  width: number;
  height: number;
  widthSeed?: number;
  centerXSeed?: number;
  centerYSeed?: number;
}): LivenessOvalDetails {
  const videoHeight = height;
  let videoWidth = width;

  const ovalRatio = widthSeed * 0.05 + 0.775;

  const minOvalCenterX = Math.floor((7 * width) / 16);
  const maxOvalCenterX = Math.floor((9 * width) / 16);
  const minOvalCenterY = Math.floor((7 * height) / 16);
  const maxOvalCenterY = Math.floor((9 * height) / 16);

  const centerX = getScaledValueFromRandomSeed(
    centerXSeed,
    minOvalCenterX,
    maxOvalCenterX
  );
  const centerY = getScaledValueFromRandomSeed(
    centerYSeed,
    minOvalCenterY,
    maxOvalCenterY
  );

  if (width >= height) {
    videoWidth = (3 / 4) * videoHeight;
  }

  const ovalWidth = ovalRatio * videoWidth;
  const ovalHeight = 1.618 * ovalWidth;

  return {
    centerX: Math.floor(centerX),
    centerY: Math.floor(centerY),
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

  if (ctx) {
    ctx?.clearRect(0, 0, canvasWidth, canvasHeight);

    // fill the canvas with a transparent rectangle

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // draw the oval path
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, 2 * Math.PI);

    // add stroke to the oval pat
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.clip();

    // clear the oval content from the rectangle
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  } else {
    throw new Error('Cannot find Canvas.');
  }
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

  const faceBoundingBox: BoundingBox = generateBboxFromLandmarks(face);
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

  const intersectionThreshold = 0.58;
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
  } else if (minOvalX > minFaceX && maxOvalX > maxFaceX) {
    faceMatchState = FaceMatchState.TOO_LEFT;
  } else if (minFaceX > minOvalX && maxFaceX > maxOvalX) {
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

function generateBboxFromLandmarks(face: Face): BoundingBox {
  const { leftEye, rightEye, mouth } = face;

  const eyeCenter = [];
  eyeCenter[0] = (leftEye[0] + rightEye[0]) / 2;
  eyeCenter[1] = (leftEye[1] + rightEye[1]) / 2;
  const ow = Math.abs(leftEye[0] - rightEye[0]) * 2.5;

  const cx = (mouth[0] + eyeCenter[0]) / 2;
  const cy = (mouth[1] + eyeCenter[1]) / 2;

  const left = cx - ow / 2,
    top = cy - ow / 2;
  const width = ow,
    height = ow;

  return { left: left, top: top, right: left + width, bottom: top + height };
}

/**
 * Returns the illumination state in the provided video frame.
 */
export function estimateIllumination(
  videoEl: HTMLVideoElement
): IlluminationState | undefined {
  const canvasEl = document.createElement('canvas');
  canvasEl.width = videoEl.videoWidth;
  canvasEl.height = videoEl.videoHeight;

  const ctx = canvasEl.getContext('2d');
  if (ctx) {
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

    if (ind === 0) return IlluminationState.DARK;
    if (ind === MAX_SCALE) return IlluminationState.BRIGHT;
    return IlluminationState.NORMAL;
  } else {
    throw new Error('Cannot find Video Element.');
  }
}

/**
 * Checks if the provided media device is a virtual camera.
 * @param device
 */
export function isCameraDeviceVirtual(device: MediaDeviceInfo): boolean {
  return device.label.toLowerCase().includes('virtual');
}

export const IlluminationStateStringMap: Record<IlluminationState, string> = {
  [IlluminationState.BRIGHT]: translate('Move to dimmer area'),
  [IlluminationState.DARK]: translate('Move to brighter area'),
  [IlluminationState.NORMAL]: translate('Lighting conditions normal'),
};

export const FaceMatchStateStringMap: Record<
  FaceMatchState,
  string | undefined
> = {
  [FaceMatchState.CANT_IDENTIFY]: translate('Move face in front of camera'),
  [FaceMatchState.FACE_IDENTIFIED]: translate('Face detected'),
  [FaceMatchState.TOO_MANY]: translate(
    'Ensure only one face is in front of camera'
  ),
  [FaceMatchState.TOO_CLOSE]: translate('Move face further away'),
  [FaceMatchState.TOO_FAR]: translate('Move face closer'),
  [FaceMatchState.TOO_LEFT]: translate('Move face right'),
  [FaceMatchState.TOO_RIGHT]: translate('Move face left'),
  [FaceMatchState.MATCHED]: undefined,
};

export const LivenessErrorStateStringMap: Record<
  LivenessErrorState,
  string | undefined
> = {
  [LivenessErrorState.RUNTIME_ERROR]: translate(
    'Check failed due to client issue'
  ),
  [LivenessErrorState.SERVER_ERROR]: translate(
    'Cannot complete check due to server issue'
  ),
  [LivenessErrorState.TIMEOUT]: translate<string>(
    'Face not detected within time limit. Try again and place face inside oval within 5 seconds.'
  ),
  [LivenessErrorState.FACE_DISTANCE_ERROR]: translate<string>(
    'Ensure only one face is in front of camera and avoid moving closer during countdown.'
  ),
  [LivenessErrorState.CAMERA_FRAMERATE_ERROR]: undefined,
  [LivenessErrorState.CAMERA_ACCESS_ERROR]: undefined,
  [LivenessErrorState.FRESHNESS_TIMEOUT]:
    translate<string>('Hold face in oval'),
};

export const MOCK_COLOR_SEQUENCES: ColorSequence[] = [
  {
    FreshnessColor: {
      RGB: [0, 0, 0], // black
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
  {
    FreshnessColor: {
      RGB: [255, 255, 255], // white
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
  {
    FreshnessColor: {
      RGB: [255, 0, 0], // red
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
  {
    FreshnessColor: {
      RGB: [255, 255, 0], // yellow
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
  {
    FreshnessColor: {
      RGB: [0, 255, 0], // lime
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
  {
    FreshnessColor: {
      RGB: [0, 255, 255], // cyan
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
  {
    FreshnessColor: {
      RGB: [0, 0, 255], // blue,
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
  {
    FreshnessColor: {
      RGB: [255, 0, 255], // violet
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
];

export enum FreshnessColor {
  BLACK = 'rgb_0_0_0',
  BLUE = 'rgb_0_0_255',
  CYAN = 'rgb_0_255_255',
  LIME = 'rgb_0_255_0',
  RED = 'rgb_255_0_0',
  VIOLET = 'rgb_255_0_255',
  WHITE = 'rgb_255_255_255',
  YELLOW = 'rgb_255_255_0',
}

interface FillOverlayCanvasFractionalInput {
  overlayCanvas: HTMLCanvasElement;
  prevColor: string;
  nextColor: string;
  ovalCanvas: HTMLCanvasElement;
  ovalDetails: any;
  heightFraction: number;
}

const INITIAL_ALPHA = 0.9;
const SECONDARY_ALPHA = 0.75;

export function fillOverlayCanvasFractional({
  overlayCanvas,
  prevColor,
  nextColor,
  ovalCanvas,
  ovalDetails,
  heightFraction,
}: FillOverlayCanvasFractionalInput) {
  const boudingRect = ovalCanvas.getBoundingClientRect();
  const ovalCanvasX = boudingRect.x;
  const ovalCanvasY = boudingRect.y;

  const { centerX, centerY, width, height } = ovalDetails;

  const updatedCenterX = centerX + ovalCanvasX;
  const updatedCenterY = centerY + ovalCanvasY;

  const canvasWidth = overlayCanvas.width;
  const canvasHeight = overlayCanvas.height;
  const ctx = overlayCanvas.getContext('2d');

  if (ctx) {
    // Because the canvas is set to to 100% we need to manually set the height for the canvas to use pixel values
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // fill the complete canvas
    fillFractionalContext(ctx, prevColor, nextColor, heightFraction);

    // save the current state
    ctx.save();

    // draw the rectangle path and fill it
    ctx.beginPath();
    ctx.rect(ovalCanvasX, ovalCanvasY, ovalCanvas.width, ovalCanvas.height);
    ctx.clip();

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.globalAlpha = INITIAL_ALPHA;
    fillFractionalContext(ctx, prevColor, nextColor, heightFraction);

    // draw the oval path and fill it
    ctx.beginPath();
    ctx.ellipse(
      updatedCenterX,
      updatedCenterY,
      width / 2,
      height / 2,
      0,
      0,
      2 * Math.PI
    );
    // add stroke to the oval path
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.clip();

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.globalAlpha = SECONDARY_ALPHA;
    fillFractionalContext(ctx, prevColor, nextColor, heightFraction);

    // restore the state
    ctx.restore();
  } else {
    throw new Error('Cannot find Overlay Canvas.');
  }
}

function fillFractionalContext(
  ctx: CanvasRenderingContext2D,
  prevColor: string,
  nextColor: string,
  fraction: number
) {
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;

  ctx.fillStyle = nextColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight * fraction);

  if (fraction !== 1) {
    ctx.fillStyle = prevColor;
    ctx.fillRect(
      0,
      canvasHeight * fraction,
      canvasWidth,
      canvasHeight * (1 - fraction)
    );
  }
}

export const isClientFreshnessColorSequence = (
  obj: ClientFreshnessColorSequence | undefined
): obj is ClientFreshnessColorSequence => !!obj;

export function getColorsSequencesFromSessionInformation(
  sessionInformation: SessionInformation
): ClientFreshnessColorSequence[] {
  const colorSequenceFromSessionInfo =
    sessionInformation.Challenge?.FaceMovementAndLightChallenge?.ColorSequences;
  const colorSequences: (ClientFreshnessColorSequence | undefined)[] = [
    ...(colorSequenceFromSessionInfo ? colorSequenceFromSessionInfo : []),
  ].map(
    ({
      FreshnessColor,
      DownscrollDuration: downscrollDuration,
      FlatDisplayDuration: flatDisplayDuration,
    }) => {
      const colorArray = FreshnessColor?.RGB;
      const color = colorArray
        ? `rgb(${colorArray[0]},${colorArray[1]},${colorArray[2]})`
        : '';
      return typeof color !== 'undefined' &&
        typeof downscrollDuration !== 'undefined' &&
        typeof flatDisplayDuration !== 'undefined'
        ? {
            color,
            downscrollDuration,
            flatDisplayDuration,
          }
        : undefined;
    }
  );

  return colorSequences.filter(isClientFreshnessColorSequence);
}

export function getRGBArrayFromColorString(colorStr: string): number[] {
  return colorStr
    .slice(colorStr.indexOf('(') + 1, colorStr.indexOf(')'))
    .split(',')
    .map((str) => parseInt(str));
}

export async function getFaceMatchState(
  faceDetector: FaceDetection,
  videoEl: HTMLVideoElement,
  ovalDetails?: LivenessOvalDetails
) {
  const detectedFaces = await faceDetector.detectFaces(videoEl);
  let faceMatchState: FaceMatchState;
  let detectedFace: Face;

  switch (detectedFaces.length) {
    case 0: {
      //no face detected;
      faceMatchState = FaceMatchState.CANT_IDENTIFY;
      break;
    }
    case 1: {
      //exactly one face detected, match face with oval;
      detectedFace = detectedFaces[0];
      faceMatchState = ovalDetails
        ? getFaceMatchStateInLivenessOval(detectedFace, ovalDetails)
        : FaceMatchState.FACE_IDENTIFIED;
      break;
    }
    default: {
      //more than one face detected ;
      faceMatchState = FaceMatchState.TOO_MANY;
      break;
    }
  }

  return faceMatchState;
}

const FACE_DISTANCE_THRESHOLD = 0.3;
const REDUCED_THRESHOLD = 0.34;
const REDUCED_THRESHOLD_MOBILE = 0.32;

export async function isFaceDistanceBelowThreshold({
  faceDetector,
  videoEl,
  ovalDetails,
  reduceThreshold = false,
  isMobile = false,
}: {
  faceDetector: FaceDetection;
  videoEl: HTMLVideoElement;
  ovalDetails?: LivenessOvalDetails;
  reduceThreshold?: boolean;
  isMobile?: boolean;
}) {
  const detectedFaces = await faceDetector.detectFaces(videoEl);
  let detectedFace: Face;

  let distanceBelowThreshold = false;

  switch (detectedFaces.length) {
    case 0: {
      //no face detected;
      break;
    }
    case 1: {
      //exactly one face detected, match face with oval;
      detectedFace = detectedFaces[0];

      const { leftEye, rightEye } = detectedFace;
      const width = ovalDetails?.width;
      const pupilDistance = Math.sqrt(
        (rightEye[0] - leftEye[0]) ** 2 + (rightEye[1] - leftEye[1]) ** 2
      );

      if (width) {
        distanceBelowThreshold =
          pupilDistance / width <
          (!reduceThreshold
            ? FACE_DISTANCE_THRESHOLD
            : isMobile
            ? REDUCED_THRESHOLD_MOBILE
            : REDUCED_THRESHOLD);
      }
      break;
    }
    default: {
      //more than one face detected
      break;
    }
  }

  return distanceBelowThreshold;
}

export function getBoundingBox({
  deviceHeight,
  deviceWidth,
  height,
  width,
  top,
  left,
}: {
  deviceHeight: number;
  deviceWidth: number;
  height: number;
  width: number;
  top: number;
  left: number;
}) {
  return {
    Height: height / deviceHeight,
    Width: width / deviceWidth,
    Top: top / deviceHeight,
    Left: left / deviceWidth,
  };
}
