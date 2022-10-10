import {
  DisconnectionEvent,
  FaceMovementAndLightServerChallenge,
  LivenessResponseStream,
  OvalScaleFactors,
  ServerChallenge,
  ServerSessionInformationEvent,
  SessionInformation,
  ValidationException,
} from '@aws-sdk/client-rekognitionstreaming';

export const isServerSesssionInformationEvent = (
  event: any
): event is LivenessResponseStream.ServerSessionInformationEventMember => {
  return !!event?.ServerSessionInformationEvent;
};

export const isSessionInformation = (
  object: any
): object is SessionInformation => {
  return isServerChallenge(object?.Challenge);
};

export const isServerChallenge = (object: any): object is ServerChallenge => {
  return isFaceMovementAndLightChallenge(object?.FaceMovementAndLightChallenge);
};

export const isFaceMovementAndLightChallenge = (
  object: any
): object is FaceMovementAndLightServerChallenge => {
  return isOvalScaleFactors(object?.OvalScaleFactors);
};

export const isOvalScaleFactors = (object: any): object is OvalScaleFactors => {
  return (
    typeof object.Width === 'number' &&
    typeof object.CenterX === 'number' &&
    typeof object.CenterY === 'number'
  );
};

export const isDisconnectionEvent = (
  event: any
): event is LivenessResponseStream.DisconnectionEventMember => {
  return !!event?.DisconnectionEvent;
};

export const isValidationExceptionEvent = (
  event: any
): event is LivenessResponseStream.ValidationExceptionMember => {
  return !!event?.ValidationException;
};

export const isInternalServerExceptionEvent = (
  event: any
): event is LivenessResponseStream.InternalServerExceptionMember => {
  return !!event?.InternalServerException;
};

export const isThrottlingExceptionEvent = (
  event: any
): event is LivenessResponseStream.ThrottlingExceptionMember => {
  return !!event?.ThrottlingException;
};

export const isServiceQuotaExceededExceptionEvent = (
  event: any
): event is LivenessResponseStream.ServiceQuotaExceededExceptionMember => {
  return !!event?.ServiceQuotaExceededException;
};
