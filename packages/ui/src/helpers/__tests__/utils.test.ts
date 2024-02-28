import {
  censorAllButFirstAndLast,
  censorContactMethod,
  censorEmail,
  censorPhoneNumber,
} from '..';

describe('censorAllButFirstAndLast', () => {
  it('should only censor characters between the first and last indexes of a string', () => {
    const censored1 = censorAllButFirstAndLast('helloworld');
    expect(censored1).toEqual('h********d');

    const censored2 = censorAllButFirstAndLast('BiG DoGs GoTtA EaT');
    expect(censored2).toEqual('B****************T');

    const censored3 = censorAllButFirstAndLast('abc');
    expect(censored3).toEqual('a*c');
  });

  it('should not censor anything if a string is 2 characters or less', () => {
    const censored4 = censorAllButFirstAndLast('ab');
    expect(censored4).toEqual('ab');

    const censored5 = censorAllButFirstAndLast('a');
    expect(censored5).toEqual('a');
  });

  it('should propery trim whitespace at the beginning and end of the input', () => {
    const censored6 = censorAllButFirstAndLast('   abc   ');
    expect(censored6).toEqual('a*c');

    const censored7 = censorAllButFirstAndLast('abc   ');
    expect(censored7).toEqual('a*c');

    const censored8 = censorAllButFirstAndLast('   abc');
    expect(censored8).toEqual('a*c');
  });
});

describe('censorPhoneNumber', () => {
  it('should censor all but the last 4 characters of a phone number', () => {
    const phone1 = censorPhoneNumber('+11231234567');
    expect(phone1).toEqual('********4567');

    const phone2 = censorPhoneNumber('1234567890');
    expect(phone2).toEqual('******7890');

    const phone3 = censorPhoneNumber('+_+_+_+_+_+_+_+_+_+_+_+_9999');
    expect(phone3).toEqual('************************9999');

    const phone4 = censorPhoneNumber('1234');
    expect(phone4).toEqual('1234');

    const phone5 = censorPhoneNumber('123');
    expect(phone5).toEqual('123');

    const phone6 = censorPhoneNumber('+12');
    expect(phone6).toEqual('+12');
  });
});

describe('censorEmail', () => {
  it('should return a censored email', () => {
    const censoredEmail = censorEmail('example@example.com');
    expect(censoredEmail).toEqual('e*****e@example.com');
  });
});

describe('censorContactMethod', () => {
  it('should return a censored phone number when passed type of Phone Number', () => {
    const censoredPhoneNumber = censorContactMethod(
      'Phone Number',
      '+11231234567'
    );
    expect(censoredPhoneNumber).toEqual('********4567');
  });
  it('should return a censored email when passed type of Email', () => {
    const censoredPhoneNumber = censorContactMethod(
      'Email',
      'example@example.com'
    );
    expect(censoredPhoneNumber).toEqual('e*****e@example.com');
  });
});
