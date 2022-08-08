export enum ChallengeType {
  FACE_MOVEMENT = 'FACE_MOVEMENT',
}

export interface OvalScaleFactors {
  width: number;
  centerX: number;
  centerY: number;
}

export interface FaceMovementAndLightChallenge {
  ovalScaleFactors: OvalScaleFactors;
}

export interface ClientChallenge {
  faceMovementAndLightChallenge: FaceMovementAndLightChallenge;
}

export interface SessionInformation {
  challenge: ClientChallenge;
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

export interface FaceMovementServerChallenge {
  initialFacePosition: BoundingBoxWithSize;
  targetFacePosition: BoundingBoxWithSize;
  recordingTimestamps: RecordingTimestamps;
}

export interface ServerChallenge {
  type: ChallengeType;
  faceMovementChallenge: FaceMovementServerChallenge;
}

export interface DeviceInformation {
  videoHeight: number;
  videoWidth: number;
}

export interface LivenessActionDocument {
  deviceInformation: DeviceInformation;
  challenges: ServerChallenge[];
}
