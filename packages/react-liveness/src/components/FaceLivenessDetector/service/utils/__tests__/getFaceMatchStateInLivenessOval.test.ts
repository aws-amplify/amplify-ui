import 'jest-canvas-mock';
import { getFaceMatchStateInLivenessOval } from '../getFaceMatchStateInLivenessOval';
import {
  getMockContext,
  mockCloselyMatchedFace,
  mockMatchedFace,
  mockOffCenterFace,
  mockTooFarFace,
  mockOvalDetails,
  mockSessionInformation,
} from '../__mocks__/testUtils';
import { Face, FaceMatchState, LivenessOvalDetails } from '../../types';
import { SessionInformation } from '@aws-sdk/client-rekognitionstreaming';

const context = getMockContext();

describe('getFaceMatchStateInLivenessOval', () => {
  it('should throw an error if the challenge config is undefined', () => {
    const face: Face = mockOffCenterFace;
    const ovalDetails: LivenessOvalDetails = mockOvalDetails;
    const initialFaceIntersection: number = 0.3;
    // @ts-expect-error
    const undefinedConfigSessionInformation: SessionInformation = {
      ...mockSessionInformation,
      Challenge: { FaceMovementAndLightChallenge: {} },
    };

    expect(() => {
      getFaceMatchStateInLivenessOval({
        face,
        ovalDetails,
        initialFaceIntersection,
        sessionInformation: undefinedConfigSessionInformation,
        frameHeight: 480,
      });
    }).toThrowError(
      'Challenge information not returned from session information.'
    );
  });

  it('should parse sessionInformation and return oval parameter attributes', () => {
    const face: Face = mockOffCenterFace;
    const ovalDetails: LivenessOvalDetails = mockOvalDetails;
    const initialFaceIntersection: number = 0.3;
    const sessionInformation = mockSessionInformation;

    const { faceMatchState, faceMatchPercentage } =
      getFaceMatchStateInLivenessOval({
        face,
        ovalDetails,
        initialFaceIntersection,
        sessionInformation,
        frameHeight: 480,
      });

    expect(faceMatchState).toBe(FaceMatchState.OFF_CENTER);
    expect(faceMatchPercentage).toBe(0);
  });

  it('should return MATCHED when face is close and in frame', () => {
    const face: Face = mockCloselyMatchedFace;
    const ovalDetails: LivenessOvalDetails = mockOvalDetails;
    const initialFaceIntersection: number = 0.3;
    const sessionInformation = mockSessionInformation;

    const { faceMatchState } = getFaceMatchStateInLivenessOval({
      face,
      ovalDetails,
      initialFaceIntersection,
      sessionInformation,
      frameHeight: 480,
    });

    expect(faceMatchState).toBe(FaceMatchState.MATCHED);
  });

  // Note: if this test ever fails due to face detection updates just add a console log for face and do a check and copy the value here
  it('should return MATCHED when face is in frame', () => {
    const face: Face = mockMatchedFace;
    const ovalDetails: LivenessOvalDetails = mockOvalDetails;
    const initialFaceIntersection: number = 0.3;
    const sessionInformation = mockSessionInformation;

    const { faceMatchState, faceMatchPercentage } =
      getFaceMatchStateInLivenessOval({
        face,
        ovalDetails,
        initialFaceIntersection,
        sessionInformation,
        frameHeight: 480,
      });

    expect(faceMatchState).toBe(FaceMatchState.MATCHED);
    expect(faceMatchPercentage).toBe(100);
  });

  it('should return TOO FAR when face is too far', () => {
    const face: Face = mockTooFarFace;
    const ovalDetails: LivenessOvalDetails = mockOvalDetails;
    const initialFaceIntersection: number = 0.3;
    const sessionInformation = mockSessionInformation;

    const { faceMatchState, faceMatchPercentage } =
      getFaceMatchStateInLivenessOval({
        face,
        ovalDetails,
        initialFaceIntersection,
        sessionInformation,
        frameHeight: 480,
      });

    expect(faceMatchState).toBe(FaceMatchState.TOO_FAR);
    expect(faceMatchPercentage).toBe(0);
  });
});
