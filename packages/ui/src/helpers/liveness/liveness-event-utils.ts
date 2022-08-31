import { ServerSessionInformationEvent } from '@aws-sdk/client-rekognitionstreaming';

export const isClientSesssionInformationEvent = (
  event: any
): event is ServerSessionInformationEvent => {
  return !!event.SessionInformation?.Challenge?.FaceMovementAndLightChallenge;
};
