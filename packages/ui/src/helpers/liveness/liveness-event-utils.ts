import {
  FaceMovementAndLightServerChallenge,
  LivenessResponseStream,
  OvalScaleFactors,
  ServerChallenge,
  SessionInformation,
} from '@aws-sdk/client-rekognitionstreaming';

export const isServerSesssionInformationEvent = (
  value: unknown
): value is LivenessResponseStream.ServerSessionInformationEventMember => {
  return !!(value as LivenessResponseStream.ServerSessionInformationEventMember)
    ?.ServerSessionInformationEvent;
};

export const isOvalScaleFactors = (
  value: unknown
): value is OvalScaleFactors => {
  const { CenterX, CenterY, Width } = value as OvalScaleFactors;
  return (
    typeof Width === 'number' &&
    typeof CenterX === 'number' &&
    typeof CenterY === 'number'
  );
};

export const isFaceMovementAndLightChallenge = (
  value: unknown
): value is FaceMovementAndLightServerChallenge => {
  return isOvalScaleFactors(
    (value as FaceMovementAndLightServerChallenge)?.OvalScaleFactors
  );
};

export const isServerChallenge = (value: unknown): value is ServerChallenge => {
  return isFaceMovementAndLightChallenge(
    (value as ServerChallenge)?.FaceMovementAndLightChallenge
  );
};

export const isSessionInformation = (
  value: unknown
): value is SessionInformation => {
  return isServerChallenge((value as SessionInformation)?.Challenge);
};

export const isDisconnectionEvent = (
  value: unknown
): value is LivenessResponseStream.DisconnectionEventMember => {
  return !!(value as LivenessResponseStream.DisconnectionEventMember)
    ?.DisconnectionEvent;
};

export const isValidationExceptionEvent = (
  value: unknown
): value is LivenessResponseStream.ValidationExceptionMember => {
  return !!(value as LivenessResponseStream.ValidationExceptionMember)
    ?.ValidationException;
};

export const isInternalServerExceptionEvent = (
  value: unknown
): value is LivenessResponseStream.InternalServerExceptionMember => {
  return !!(value as LivenessResponseStream.InternalServerExceptionMember)
    ?.InternalServerException;
};

export const isThrottlingExceptionEvent = (
  value: unknown
): value is LivenessResponseStream.ThrottlingExceptionMember => {
  return !!(value as LivenessResponseStream.ThrottlingExceptionMember)
    ?.ThrottlingException;
};

export const isServiceQuotaExceededExceptionEvent = (
  value: unknown
): value is LivenessResponseStream.ServiceQuotaExceededExceptionMember => {
  return !!(value as LivenessResponseStream.ServiceQuotaExceededExceptionMember)
    ?.ServiceQuotaExceededException;
};

export const isInvalidSignatureRegionException = (
  error: any
): error is Error => {
  return (
    error.name === 'InvalidSignatureException' &&
    (error.message as string).includes('valid region')
  );
};
