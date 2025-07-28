import type { ActorRef, Interpreter, State } from 'xstate';
import type {
  FaceMovementServerChallenge,
  FaceMovementAndLightServerChallenge,
  InternalServerException,
  ServiceQuotaExceededException,
  SessionInformation,
  ValidationException,
  ThrottlingException,
} from '@aws-sdk/client-rekognitionstreaming';

import type {
  FACE_MOVEMENT_CHALLENGE,
  FACE_MOVEMENT_AND_LIGHT_CHALLENGE,
  StreamRecorder,
  ColorSequenceDisplay,
} from '../utils';
import type { ErrorState } from './error';
import type { Face, FaceDetection } from './faceDetection';
import type {
  FaceLivenessDetectorCoreProps,
  FaceMatchState,
  LivenessOvalDetails,
  IlluminationState,
} from './liveness';

interface Challenge {
  Name: string;
}

export interface FaceMovementAndLightChallenge
  extends Challenge,
    FaceMovementAndLightServerChallenge {
  Name: (typeof FACE_MOVEMENT_AND_LIGHT_CHALLENGE)['type'];
}

export interface FaceMovementChallenge
  extends Challenge,
    FaceMovementServerChallenge {
  Name: (typeof FACE_MOVEMENT_CHALLENGE)['type'];
}

export interface ParsedSessionInformation {
  Challenge: FaceMovementChallenge | FaceMovementAndLightChallenge | undefined;
}

export interface FaceMatchAssociatedParams {
  illuminationState?: IlluminationState;
  faceMatchState?: FaceMatchState;
  faceMatchPercentage?: number;
  currentDetectedFace?: Face;
  startFace?: Face;
  endFace?: Face;
}

export interface FreshnessColorAssociatedParams {
  freshnessColorEl?: HTMLCanvasElement;
  freshnessColors?: string[];
  freshnessColorsComplete?: boolean;
}

export interface OvalAssociatedParams {
  faceDetector?: FaceDetection;
  initialFace?: Face;
  ovalDetails?: LivenessOvalDetails;
  scaleFactor?: number;
}

export interface VideoAssociatedParams {
  videoConstraints?: MediaTrackConstraints;
  videoEl?: HTMLVideoElement;
  canvasEl?: HTMLCanvasElement;
  videoMediaStream?: MediaStream;
  recordingStartTimestamp?: number;
  isMobile?: boolean;
  selectedDeviceId?: string;
  selectableDevices?: MediaDeviceInfo[];
}

export interface LivenessContext {
  challengeId: string | undefined;
  colorSequenceDisplay: ColorSequenceDisplay | undefined;
  componentProps: FaceLivenessDetectorCoreProps | undefined;
  errorMessage: string | undefined;
  errorState: ErrorState | undefined;
  faceMatchAssociatedParams: FaceMatchAssociatedParams | undefined;
  faceMatchStateBeforeStart: FaceMatchState | undefined;
  failedAttempts: number | undefined;
  freshnessColorAssociatedParams: FreshnessColorAssociatedParams | undefined;
  isFaceFarEnoughBeforeRecording: boolean | undefined;
  isRecordingStopped: boolean | undefined;
  livenessStreamProvider: StreamRecorder | undefined;
  maxFailedAttempts: number | undefined;
  ovalAssociatedParams: OvalAssociatedParams | undefined;
  parsedSessionInformation: ParsedSessionInformation | undefined;
  responseStreamActorRef: ActorRef<any> | undefined;
  serverSessionInformation: SessionInformation | undefined;
  shouldDisconnect: boolean | undefined;
  videoAssociatedParams: VideoAssociatedParams | undefined;
}

export type LivenessEventTypes =
  | 'BEGIN'
  | 'CONNECTION_TIMEOUT'
  | 'START_RECORDING'
  | 'TIMEOUT'
  | 'ERROR'
  | 'CANCEL'
  | 'SET_SESSION_INFO'
  | 'DISCONNECT_EVENT'
  | 'SET_DOM_AND_CAMERA_DETAILS'
  | 'UPDATE_DEVICE_AND_STREAM'
  | 'CAMERA_NOT_FOUND'
  | 'SERVER_ERROR'
  | 'RUNTIME_ERROR'
  | 'RETRY_CAMERA_CHECK'
  | 'MOBILE_LANDSCAPE_WARNING';

export type LivenessEventData = Record<PropertyKey, any>; // TODO: this should be typed further

export interface LivenessEvent {
  type: LivenessEventTypes;
  data?: LivenessEventData;
}

export type LivenessMachineState = State<LivenessContext, LivenessEvent>;

export type LivenessInterpreter = Interpreter<
  LivenessContext,
  any,
  LivenessEvent,
  any,
  any
>;

export interface StreamActorCallback {
  (params: { type: 'DISCONNECT_EVENT' }): void;
  (params: {
    type: 'SERVER_ERROR' | 'CONNECTION_TIMEOUT';
    data: { error: Error };
  }): void;
  (params: {
    type: 'SERVER_ERROR';
    data: { error: ValidationException };
  }): void;
  (params: {
    type: 'SERVER_ERROR';
    data: { error: InternalServerException };
  }): void;
  (params: {
    type: 'SERVER_ERROR';
    data: { error: ThrottlingException };
  }): void;
  (params: {
    type: 'SERVER_ERROR';
    data: { error: ServiceQuotaExceededException };
  }): void;
  (params: {
    type: 'SET_SESSION_INFO';
    data: {
      serverSessionInformation: SessionInformation | undefined;
    };
  }): void;
}
