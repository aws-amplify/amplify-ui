export type ContactMethod = 'Email' | 'Phone Number';

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

// only censors numbers in a phone number
export const censorPhoneNumber = (val: string): string => {
  if (val.length < 4) {
    return val;
  }

  const split = val.split('');
  for (let i = 0; i < split.length - 4; i++) {
    // isNaN's typescript definition expects a number, but it still works with other values
    // @ts-ignore
    if (!isNaN(split[i])) {
      split[i] = '*';
    }
  }

  return split.join('');
};
