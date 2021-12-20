import {
  getRandomScalingAttributes,
  getRandomLivenessOvalDetails,
  getFaceMatchStateInLivenessOval,
} from '../liveness';
import { Face, FaceMatchState, LivenessOvalDetails } from '../../types';
import {
  ChallengeType,
  ClientActionDocument,
} from '../../types/liveness-service-types';

describe('Liveness Helper', () => {
  describe('getRandomScalingAttributes', () => {
    it('should parse clientActionDocumnet and return oval scaling attributes', () => {
      const testClientActionJSON: ClientActionDocument = {
        challenges: [
          {
            type: ChallengeType.FACE_MOVEMENT,
            faceMovementChallenge: {
              ovalScaleFactors: {
                width: 0.76,
                centerX: 0.65,
                centerY: 0.66,
              },
            },
          },
        ],
      };
      const randomScalingAttributes = getRandomScalingAttributes(
        JSON.stringify(testClientActionJSON)
      );

      expect(randomScalingAttributes.centerX).toBe(0.65);
      expect(randomScalingAttributes.centerY).toBe(0.66);
      expect(randomScalingAttributes.width).toBe(0.76);
    });

    it('should throw if challeng list is empty', () => {
      const testClientActionJSON: ClientActionDocument = {
        challenges: [],
      };

      expect(() => {
        getRandomScalingAttributes(JSON.stringify(testClientActionJSON));
      }).toThrow();
    });

    it('should throw if challeng list has more than one element', () => {
      const testClientActionJSON: ClientActionDocument = {
        challenges: [
          {
            type: ChallengeType.FACE_MOVEMENT,
            faceMovementChallenge: {
              ovalScaleFactors: {
                width: 0.76,
                centerX: 0.65,
                centerY: 0.66,
              },
            },
          },
          {
            type: ChallengeType.FACE_MOVEMENT,
            faceMovementChallenge: {
              ovalScaleFactors: {
                width: 0.76,
                centerX: 0.65,
                centerY: 0.66,
              },
            },
          },
        ],
      };

      expect(() => {
        getRandomScalingAttributes(JSON.stringify(testClientActionJSON));
      }).toThrow();
    });
  });

  describe('getRandomLivenessOvalDetails', () => {
    const initialFace: Face = {
      height: 163.01509,
      width: 217.36107,
      top: 185.12999,
      left: 256.78488,
      timestampMs: Date.now(),
    };
    const clientActionDocument = JSON.stringify({
      challenges: [
        {
          type: ChallengeType.FACE_MOVEMENT,
          faceMovementChallenge: {
            ovalScaleFactors: {
              width: 0.2751161,
              centerX: 0.04077655,
              centerY: 0.9716218,
            },
          },
        },
      ],
    } as ClientActionDocument);

    it('should return the correct oval details in landscape', () => {
      const width = 640;
      const height = 480;

      const expectedOvalDetails: LivenessOvalDetails = {
        height: 476,
        width: 294,
        centerX: 286,
        centerY: 285,
      };

      const actualOvalDetails = getRandomLivenessOvalDetails({
        width,
        height,
        initialFace,
        clientActionDocument,
      });

      expect(actualOvalDetails).toEqual(expectedOvalDetails);
    });

    it('should return the correct oval details in portrait', () => {
      const width = 480;
      const height = 640;

      const expectedOvalDetails: LivenessOvalDetails = {
        height: 508,
        width: 314,
        centerX: 195,
        centerY: 380,
      };

      const actualOvalDetails = getRandomLivenessOvalDetails({
        width,
        height,
        initialFace,
        clientActionDocument,
      });

      expect(actualOvalDetails).toEqual(expectedOvalDetails);
    });
  });

  describe('getFaceMatchStateInLivenessOval', () => {
    const ovalDetails: LivenessOvalDetails = {
      height: 254,
      width: 157,
      centerY: 285, // top: 285 - 254 / 2 = 158
      centerX: 286, // left: 286 - 157 / 2 = 207.5
    };

    it('should return correct state when MATCHED', () => {
      const face: Face = {
        height: 250,
        width: 150,
        top: 160,
        left: 208,
        timestampMs: Date.now(),
      };

      const actualState = getFaceMatchStateInLivenessOval(face, ovalDetails);

      expect(actualState).toEqual(FaceMatchState.MATCHED);
    });

    it('should return correct state when TOO_LEFT', () => {
      const face: Face = {
        height: 250,
        width: 150,
        top: 160,
        left: 150,
        timestampMs: Date.now(),
      };

      const actualState = getFaceMatchStateInLivenessOval(face, ovalDetails);

      expect(actualState).toEqual(FaceMatchState.TOO_LEFT);
    });

    it('should return correct state when TOO_RIGHT', () => {
      const face: Face = {
        height: 250,
        width: 150,
        top: 160,
        left: 250,
        timestampMs: Date.now(),
      };

      const actualState = getFaceMatchStateInLivenessOval(face, ovalDetails);

      expect(actualState).toEqual(FaceMatchState.TOO_RIGHT);
    });

    it('should return correct state when TOO_CLOSE', () => {
      const face: Face = {
        height: 320,
        width: 250,
        top: 110,
        left: 200,
        timestampMs: Date.now(),
      };

      const actualState = getFaceMatchStateInLivenessOval(face, ovalDetails);

      expect(actualState).toEqual(FaceMatchState.TOO_CLOSE);
    });

    it('should return correct state when TOO_FAR', () => {
      const face: Face = {
        height: 150,
        width: 120,
        top: 160,
        left: 220,
        timestampMs: Date.now(),
      };

      const actualState = getFaceMatchStateInLivenessOval(face, ovalDetails);

      expect(actualState).toEqual(FaceMatchState.TOO_FAR);
    });
  });
});
