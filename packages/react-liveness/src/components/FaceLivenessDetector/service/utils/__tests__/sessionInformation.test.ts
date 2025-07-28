import {
  isFaceMovementChallenge,
  isFaceMovementAndLightChallenge,
  isFaceMovementServerChallenge,
  isFaceMovementAndLightServerChallenge,
  createSessionInfoFromServerSessionInformation,
} from '../sessionInformation';
import { FaceMovementChallenge } from '../../types';
import {
  mockFaceMovementSessionInfo,
  mockFaceMovementAndLightSessionInfo,
  mockFaceMovementServerSessionInfo,
  mockFaceMovementAndLightServerSessionInfo,
} from '../__mocks__/testUtils';

describe('isFaceMovementChallenge', () => {
  it('Should return true with a valid FaceMovementChallenge', () => {
    expect(isFaceMovementChallenge(mockFaceMovementSessionInfo)).toBe(true);
  });

  it('Should return false with an invalid FaceMovementChallenge', () => {
    expect(isFaceMovementChallenge({ name: 'unknown' })).toBe(false);
  });
});

describe('isFaceMovementAndLightChallenge', () => {
  it('Should return true with a valid FaceMovementAndLightChallenge', () => {
    expect(
      isFaceMovementAndLightChallenge(mockFaceMovementAndLightSessionInfo)
    ).toBe(true);
  });

  it('Should return false with an invalid FaceMovementAndLightChallenge', () => {
    expect(isFaceMovementAndLightChallenge({ name: 'unknown' })).toBe(false);
  });
});

describe('isFaceMovementServerChallenge', () => {
  it('Should return true with a valid FaceMovementServerChallenge', () => {
    expect(isFaceMovementServerChallenge({ FaceMovementChallenge: {} })).toBe(
      true
    );
  });

  it('Should return false with an invalid FaceMovementServerChallenge', () => {
    expect(isFaceMovementServerChallenge({ UnknownChallenge: {} })).toBe(false);
  });
});

describe('isFaceMovementAndLightServerChallenge', () => {
  it('Should return true with a valid FaceMovementAndLightServerChallenge', () => {
    expect(
      isFaceMovementAndLightServerChallenge({
        FaceMovementAndLightChallenge: {},
      })
    ).toBe(true);
  });

  it('Should return false with an invalid FaceMovementAndLightServerChallenge', () => {
    expect(
      isFaceMovementAndLightServerChallenge({ UnknownChallenge: {} })
    ).toBe(false);
  });
});

describe('createSessionInfoFromServerSessionInformation', () => {
  it('Should return a valid SessionInformation with FaceMovementChallenge', () => {
    expect(
      createSessionInfoFromServerSessionInformation(
        mockFaceMovementServerSessionInfo
      )
    ).toEqual(mockFaceMovementSessionInfo);
  });

  it('Should return a valid SessionInformation with FaceMovementAndLightChallenge', () => {
    expect(
      createSessionInfoFromServerSessionInformation(
        mockFaceMovementAndLightServerSessionInfo
      )
    ).toEqual(mockFaceMovementAndLightSessionInfo);
  });

  it('Should throw an error if an server session information contains an unknown challenge', () => {
    const error = new Error(
      'Unsupported challenge type returned from session information.'
    );
    expect(() => {
      createSessionInfoFromServerSessionInformation({
        // @ts-expect-error testing invalid input
        Challenge: { UnknownChallenge: {} },
      });
    }).toThrowError(error);
  });

  it(`Should throw an error if an server session information contains an empty challenge`, () => {
    const error = new Error(
      'Unsupported challenge type returned from session information.'
    );
    expect(() => {
      createSessionInfoFromServerSessionInformation({
        // @ts-expect-error testing invalid input
        Challenge: {},
      });
    }).toThrowError(error);
  });

  it(`Should throw an error if an server session information doesn't contain a challenge`, () => {
    const error = new Error(
      'Unsupported challenge type returned from session information.'
    );
    expect(() => {
      // @ts-expect-error testing invalid input
      createSessionInfoFromServerSessionInformation({});
    }).toThrowError(error);
  });

  it(`Should throw an error if an server session information is missing a challenge config`, () => {
    const error = new Error(
      'Challenge config not returned from session information.'
    );

    expect(() => {
      createSessionInfoFromServerSessionInformation({
        Challenge: {
          FaceMovementChallenge: {
            ...mockFaceMovementServerSessionInfo.Challenge!
              .FaceMovementChallenge,
            ChallengeConfig: {}, // Override ChallengeConfig to be empty
          } as FaceMovementChallenge,
        },
      });
    }).toThrowError(error);
  });
});
