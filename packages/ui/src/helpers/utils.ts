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

export const getFormDataFromEvent = (event: Event) => {
  const formData = new FormData(event.target as HTMLFormElement);
  return Object.fromEntries(formData);
};
