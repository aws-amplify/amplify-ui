export enum ChallengeType {
  FACE_MOVEMENT = 'FACE_MOVEMENT',
}

export interface OvalScaleFactors {
  width: number;
  centerX: number;
  centerY: number;
}

export interface FaceMovementClientChallenge {
  ovalScaleFactors: OvalScaleFactors;
}

export interface ClientChallenge {
  type: ChallengeType;
  faceMovementChallenge: FaceMovementClientChallenge;
}

export interface ClientActionDocument {
  challenges: ClientChallenge[];
}

export interface BoundingBoxWithSize {
  height: number;
  width: number;
  top: number;
  left: number;
}

export interface RecordingTimestamps {
  videoStart: number;
  initialFaceDetected: number;
  faceDetectedInTargetPositionStart: number;
  faceDetectedInTargetPositionEnd: number;
}

export enum Color {
  BLACK = 'rgb(0, 0, 0)', // black
  WHITE = 'rgb(255, 255, 255)', // white
  RED = 'rgb(255, 0, 0)', // red
  YELLOW = 'rgb(255, 255, 0)', // yellow
  LIME = 'rgb(0, 255, 0)', // lime
  CYAN = 'rgb(0, 255, 255)', // cyan
  BLUE = 'rgb(0, 0, 255)', // blue,
  VIOLET = 'rgb(255, 0, 255)', // violet
}

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

export interface ColorSequence {
  colorTimestampList: ColorTimestamp[];
}

export interface ColorTimestamp {
  color: Color;
  timestamp: number;
}

export interface FaceMovementAndLightChallenge {
  challengeId: string;
  initialFacePosition: BoundingBoxWithSize;
  targetFacePosition: BoundingBoxWithSize;
  recordingTimestamps: RecordingTimestamps;
  colorSequence: ColorSequence;
}

export interface ServerChallenge {
  faceMovementAndLightChallenge: FaceMovementAndLightChallenge;
}

export interface DeviceInformation {
  videoHeight: number;
  videoWidth: number;
}

export interface ClientSessionInformationEvent {
  deviceInformation: DeviceInformation;
  challenge: ServerChallenge;
}
