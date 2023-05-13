import {
  isDisconnectionEvent,
  isInternalServerExceptionEvent,
  isInvalidSignatureRegionException,
  isServerSesssionInformationEvent,
  isServiceQuotaExceededExceptionEvent,
  isThrottlingExceptionEvent,
  isValidationExceptionEvent,
} from '../eventUtils';

describe('eventUtils', () => {
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

  describe('isServerSesssionInformationEvent', () => {
    it('Should return true if its a valid server session info event', () => {
      expect(
        isServerSesssionInformationEvent({ ServerSessionInformationEvent: {} })
      ).toBe(true);
    });

    it('Should return false if there is no event', () => {
      expect(isServerSesssionInformationEvent({})).toBe(false);
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
      expect(isValidationExceptionEvent({ ValidationException: {} })).toBe(
        true
      );
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
      expect(isThrottlingExceptionEvent({ ThrottlingException: {} })).toBe(
        true
      );
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
});
