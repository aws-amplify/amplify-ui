import { Interpreter, State } from 'xstate';
import {
  LivenessFlowProps,
  FaceMatchState,
  LivenessErrorState,
  LivenessOvalDetails,
} from './liveness';
import { VideoRecorder } from '../helpers';
import { Face, FaceDetection } from './faceDetection';

export interface LivenessContext {
  maxFailedAttempts: number;
  failedAttempts: number;
  flowProps: LivenessFlowProps;
  videoAssociatedParams: {
    videoEl: HTMLVideoElement;
    canvasEl: HTMLCanvasElement;
    videoMediaStream: MediaStream;
    videoRecorder: VideoRecorder;
  };
  ovalAssociatedParams: {
    faceDetector: FaceDetection;
    initialFace: Face;
    ovalDetails: LivenessOvalDetails;
  };
  faceMatchState: FaceMatchState;
  errorState: LivenessErrorState | null;
}

export type LivenessEventTypes =
  | 'BEGIN'
  | 'PERMISSION_GRANTED'
  | 'PERMISSION_DENIED'
  | 'START_RECORDING'
  | 'RECORDING_COMPLETE'
  | 'CHECK_SUCCEEDED'
  | 'CHECK_FAILED'
  | 'TIMEOUT'
  | 'ERROR'
  | 'CANCEL';

export type LivenessEventData = Record<PropertyKey, any>; // TODO: this should be typed further

export interface LivenessEvent {
  type: LivenessEventTypes;
  data?: LivenessEventData;
}

export type LivenessMachineState = State<LivenessContext, LivenessEvent>;

export type LivenessInterpreter = Interpreter<
  LivenessContext,
  any,
  LivenessEvent
>;
