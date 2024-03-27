import { ActorRef, Interpreter, State } from 'xstate';
import {
  ValidationException,
  InternalServerException,
  ThrottlingException,
  ServiceQuotaExceededException,
  SessionInformation,
} from '@aws-sdk/client-rekognitionstreaming';

import {
  FaceLivenessDetectorCoreProps,
  FaceMatchState,
  LivenessOvalDetails,
  IlluminationState,
} from './liveness';
import { ErrorState } from './error';
import { StreamRecorder, ColorSequenceDisplay } from '../utils';
import { Face, FaceDetection } from './faceDetection';

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
  responseStreamActorRef: ActorRef<any> | undefined;
  serverSessionInformation: SessionInformation | undefined;
  shouldDisconnect: boolean | undefined;
  videoAssociatedParams: VideoAssociatedParams | undefined;
}

export type LivenessEventTypes =
  | 'BEGIN'
  | 'START_RECORDING'
  | 'TIMEOUT'
  | 'ERROR'
  | 'CANCEL'
  | 'SET_SESSION_INFO'
  | 'DISCONNECT_EVENT'
  | 'SET_DOM_AND_CAMERA_DETAILS'
  | 'UPDATE_DEVICE_AND_STREAM'
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
  (params: { type: 'SERVER_ERROR'; data: { error: Error } }): void;
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
    data: { sessionInfo: SessionInformation | undefined };
  }): void;
}
