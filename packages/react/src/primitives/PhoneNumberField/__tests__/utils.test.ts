import { formatPhoneNumber } from '../utils';
describe('formatPhoneNumber', () => {
  it('should format phone numbers for +1 (US)', () => {
    const phoneNumber = '1234567890';
    const formattedNumber = formatPhoneNumber('+1', phoneNumber);
    expect(formattedNumber).toBe('(123) 456 7890');
  });

  it('should format phone numbers for +33 (France)', () => {
    const phoneNumber = '0123456789';
    const formattedNumber = formatPhoneNumber('+33', phoneNumber);
    expect(formattedNumber).toBe('01 23 45 67 89');
  });

  it('should return the cleaned number if dial code not found', () => {
    const phoneNumber = '123-456-7890';
    const formattedNumber = formatPhoneNumber('+999', phoneNumber);
    expect(formattedNumber).toBe('1234567890');
  });

  it('should handle empty phone numbers', () => {
    const phoneNumber = '';
    const formattedNumber = formatPhoneNumber('+1', phoneNumber);
    expect(formattedNumber).toBe('');
  });
});
