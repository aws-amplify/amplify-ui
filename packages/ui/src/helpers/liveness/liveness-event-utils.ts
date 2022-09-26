import {
  DisconnectionEvent,
  FaceMovementAndLightServerChallenge,
  OvalScaleFactors,
  ServerChallenge,
  ServerSessionInformationEvent,
  SessionInformation,
} from '@aws-sdk/client-rekognitionstreaming';

export const isServerSesssionInformationEvent = (
  event: any
): event is ServerSessionInformationEvent => {
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
): event is DisconnectionEvent => {
  return !!event?.DisconnectionEvent;
};
