import { LivenessResponseStream } from '@aws-sdk/client-rekognitionstreaming';
import {
  isChallengeEvent,
  isDisconnectionEvent,
  isInternalServerExceptionEvent,
  isInvalidSignatureRegionException,
  isServerSessionInformationEvent,
  isServiceQuotaExceededExceptionEvent,
  isSupportedChallenge,
  isThrottlingExceptionEvent,
  isValidationExceptionEvent,
} from '../responseStreamEvent';

describe('isChallengeEvent', () => {
  it('Should return true if its a valid challenge event', () => {
    expect(isChallengeEvent({ ChallengeEvent: {} })).toBe(true);
  });

  it('Should return false if its an invalid challenge event', () => {
    expect(isChallengeEvent({})).toBe(false);
  });
});

describe('isSupportedChallenge', () => {
  it.each([
    { Type: 'FaceMovementAndLightChallenge', Version: '1.0.0' },
    { Type: 'FaceMovementChallenge', Version: '1.0.0' },
  ])('should return true if it is a supported challenge', (challengeEvent) => {
    const challenge = { ChallengeEvent: challengeEvent };
    expect(
      isSupportedChallenge(
        challenge as LivenessResponseStream.ChallengeEventMember
      )
    ).toBe(true);
  });

  it.each([
    { Type: 'FakeChallenge', Version: '1.0.0' },
    { Type: 'FaceMovementChallenge', Version: '0.0' },
  ])(
    'should return false if it is an unsupported challenge',
    (challengeEvent) => {
      const challenge = { ChallengeEvent: challengeEvent };
      expect(
        isSupportedChallenge(
          challenge as LivenessResponseStream.ChallengeEventMember
        )
      ).toBe(false);
    }
  );
});

describe('isInvalidSignatureRegionException', () => {
  it('Should return true with an invalid region error', () => {
    const error = new Error('This is not a valid region.');
    error.name = 'InvalidSignatureException';
    expect(isInvalidSignatureRegionException(error)).toBe(true);
  });

  it('Should return false if the name is not present', () => {
    const error = new Error('This is not a valid region.');
    expect(isInvalidSignatureRegionException(error)).toBe(false);
  });

  it('Should return false if error message does not contain valid region text', () => {
    const error = new Error('This is not a region.');
    error.name = 'InvalidSignatureException';
    expect(isInvalidSignatureRegionException(error)).toBe(false);
  });
});

describe('isServerSessionInformationEvent', () => {
  it('Should return true if its a valid server session info event', () => {
    expect(
      isServerSessionInformationEvent({ ServerSessionInformationEvent: {} })
    ).toBe(true);
  });

  it('Should return false if there is no event', () => {
    expect(isServerSessionInformationEvent({})).toBe(false);
  });
});

describe('isDisconnectionEvent', () => {
  it('Should return true if its a valid event', () => {
    expect(isDisconnectionEvent({ DisconnectionEvent: {} })).toBe(true);
  });

  it('Should return false if there is no event', () => {
    expect(isDisconnectionEvent({})).toBe(false);
  });
});

describe('isValidationExceptionEvent', () => {
  it('Should return true if its a valid event', () => {
    expect(isValidationExceptionEvent({ ValidationException: {} })).toBe(true);
  });

  it('Should return false if there is no event', () => {
    expect(isValidationExceptionEvent({})).toBe(false);
  });
});

describe('isInternalServerExceptionEvent', () => {
  it('Should return true if its a valid event', () => {
    expect(
      isInternalServerExceptionEvent({ InternalServerException: {} })
    ).toBe(true);
  });

  it('Should return false if there is no event', () => {
    expect(isInternalServerExceptionEvent({})).toBe(false);
  });
});

describe('isThrottlingExceptionEvent', () => {
  it('Should return true if its a valid event', () => {
    expect(isThrottlingExceptionEvent({ ThrottlingException: {} })).toBe(true);
  });

  it('Should return false if there is no event', () => {
    expect(isThrottlingExceptionEvent({})).toBe(false);
  });
});

describe('isServiceQuotaExceededExceptionEvent', () => {
  it('Should return true if its a valid event', () => {
    expect(
      isServiceQuotaExceededExceptionEvent({
        ServiceQuotaExceededException: {},
      })
    ).toBe(true);
  });

  it('Should return false if there is no event', () => {
    expect(isServiceQuotaExceededExceptionEvent({})).toBe(false);
  });
});
