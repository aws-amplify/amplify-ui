import { CommonFields, FormField, SignUpAttribute } from '@/types';

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

export const setFormOrder = (
  formOverrides: FormField,
  fieldNames: Array<SignUpAttribute | CommonFields>
): Array<string | number> => {
  type keyValues = string | number;
  let orderedKeys = [] as keyValues[];
  if (formOverrides) {
    orderedKeys = Object.keys(formOverrides)
      .reduce((prev, key) => {
        // reduce to array that can be sorted
        prev.push([key, formOverrides[key]?.order as number]);
        return prev;
      }, [] as Array<Array<keyValues>>)
      .sort(
        (a: keyValues[], b: keyValues[]) =>
          //sort them based on order
          (a as number[])[1] - (b as number[])[1]
      ) // returned just key
      .filter((a) => a[1] !== undefined)
      .map((a: keyValues[]) => a[0]);
  }

  // remove duplicates
  return Array.from(new Set([...orderedKeys, ...fieldNames]));
};
