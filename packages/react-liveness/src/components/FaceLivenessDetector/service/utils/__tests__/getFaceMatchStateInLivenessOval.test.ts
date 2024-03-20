import 'jest-canvas-mock';
import { getFaceMatchStateInLivenessOval } from '../getFaceMatchStateInLivenessOval';
import {
  mockOvalDetails,
  mockSessionInformation,
} from '../__mocks__/testUtils';
import { Face, FaceMatchState, LivenessOvalDetails } from '../../types';
import { SessionInformation } from '@aws-sdk/client-rekognitionstreaming';

const MOCK_TIMESTAMP = 1640995200000;

const mockCloselyMatchedFace: Face = {
  top: 46.751117706298814,
  left: -5.630989074707031,
  width: 572.6491546630859,
  height: 572.7001762390136,
  timestampMs: MOCK_TIMESTAMP,
  probability: 90,
  rightEye: [187.4885559082032, 218.63224029541013],
  leftEye: [433.75030517578125, 227.35191345214847],
  mouth: [313.39622497558594, 485.65040588378895],
  nose: [330.15281677246094, 371.40689849853516],
  rightEar: [28.786602020263672, 237.78337478637698],
  leftEar: [515.0150299072266, 262.62935638427734],
};

const mockMatchedFace: Face = {
  height: 317.5821685791015,
  left: 165.49339294433594,
  leftEar: [445, 264.4227600097656],
  leftEye: [384.70985412597656, 247.56172180175784],
  mouth: [327.9991149902344, 393.5927200317383],
  nose: [325.2409362792969, 333.89575958251953],
  probability: 90,
  rightEar: [199.34513092041016, 272.49412536621094],
  rightEye: [261.6714286804199, 250.6684875488281],
  timestampMs: MOCK_TIMESTAMP,
  top: 155.82656860351565,
  width: 317.60498046875,
};

const mockOffCenterFace: Face = {
  top: 200,
  left: 360,
  width: 200,
  height: 200,
  timestampMs: MOCK_TIMESTAMP,
  probability: 90,
  rightEye: [400, 300],
  leftEye: [500, 250],
  mouth: [470, 330],
  nose: [470, 300],
  rightEar: [370, 300],
  leftEar: [540, 300],
};

const mockTooFarFace: Face = {
  top: 230,
  left: 275,
  width: 135,
  height: 100,
  timestampMs: MOCK_TIMESTAMP,
  probability: 0.9974300265312195,
  rightEye: [372.5564064979553, 258.19776356220245],
  leftEye: [318.5161700248718, 253.94269466400146],
  mouth: [339.64158596098423, 298.5959941148758],
  nose: [342.7122294306755, 277.0021167397499],
  rightEar: [400.5564064979553, 258.19776356220245],
  leftEar: [300.5161700248718, 253.94269466400146],
};

describe('getFaceMatchStateInLivenessOval', () => {
  it('should throw an error if the challenge config is undefined', () => {
    const face = mockOffCenterFace;
    const ovalDetails: LivenessOvalDetails = mockOvalDetails;
    const initialFaceIntersection: number = 0.3;
    const undefinedConfigSessionInformation: SessionInformation = {
      ...mockSessionInformation,
      // @ts-expect-error intentional invalid value
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
    const face = mockOffCenterFace;
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
    const face = mockCloselyMatchedFace;
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

  it('should return MATCHED when face is in frame', () => {
    const face = mockMatchedFace;
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

  it('should return TOO_FAR when face is too far', () => {
    const face = mockTooFarFace;
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
