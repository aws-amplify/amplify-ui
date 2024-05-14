import { ALLOWED_SPECIAL_CHARACTERS, emailRegex } from './constants';
import type { ContactMethod } from '../../types';

// replaces all characters in a string with '*', except for the first and last char
export const censorAllButFirstAndLast = (value: string): string => {
  const split = value.trim().split('');
  for (let i = 0; i < split.length; i++) {
    if (i > 0 && i < split.length - 1) {
      split[i] = '*';
    }
  }

  return split.join('');
};

// censors all but the last four characters of a phone number
export const censorPhoneNumber = (val: string): string => {
  if (val.length < 4) {
    return val;
  }

  const split = val.split('');
  for (let i = 0; i < split.length - 4; i++) {
    split[i] = '*';
  }

  return split.join('');
};

// censors all but the first and last of the name of an email and keeps domain
export const censorEmail = (val: string): string => {
  const splitEmail = val.split('@');
  const censoredName = censorAllButFirstAndLast(splitEmail[0]);

  return `${censoredName}@${splitEmail[1]}`;
};

// based on the ContactMethod type, returns a censored contact value
export const censorContactMethod = (
  type: ContactMethod,
  value: string
): string => {
  return type === 'Phone Number'
    ? censorPhoneNumber(value)
    : censorEmail(value);
};

export const hasSpecialChars = (password: string) =>
  ALLOWED_SPECIAL_CHARACTERS.some((char) => password.includes(char));

export const getTotpCodeURL = (
  issuer: string,
  username: string,
  secret: string
): string =>
  encodeURI(
    `otpauth://totp/${issuer}:${username}?secret=${secret}&issuer=${issuer}`
  );

export function trimValues<T extends Record<string, string>>(
  values: T,
  ...ignored: string[]
): T {
  return Object.entries(values).reduce(
    (acc, [name, value]) => ({
      ...acc,
      [name]: ignored.includes(name) ? value : value?.trim(),
    }),
    {} as T
  );
}

export const isValidEmail = (value: string | undefined) => {
  if (!value) return false;

  return emailRegex.test(value);
};
