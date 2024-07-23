import { getFieldErrorMessageId } from '../getFieldErrorMessageId';

describe('getFieldErrorMessageId', () => {
  it('should return the concatenated string when hasError is true and errorMessageId is provided', () => {
    const errorMessageId = 'testId';
    const hasError = true;
    const result = getFieldErrorMessageId(errorMessageId, hasError);
    expect(result).toBe('testId-error');
  });

  it('should return undefined when hasError is false', () => {
    const errorMessageId = 'testId';
    const hasError = false;
    const result = getFieldErrorMessageId(errorMessageId, hasError);
    expect(result).toBeUndefined();
  });

  it('should return undefined when hasError is not provided', () => {
    const errorMessageId = 'testId';
    const result = getFieldErrorMessageId(errorMessageId);
    expect(result).toBeUndefined();
  });

  it('should return undefined when errorMessageId is empty and hasError is true', () => {
    const errorMessageId = '';
    const hasError = true;
    const result = getFieldErrorMessageId(errorMessageId, hasError);
    expect(result).toBeUndefined();
  });

  it('should return undefined when both errorMessageId and hasError are not provided', () => {
    const result = getFieldErrorMessageId('');
    expect(result).toBeUndefined();
  });
});
