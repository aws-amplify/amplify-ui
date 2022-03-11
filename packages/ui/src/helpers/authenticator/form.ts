import {
  authFieldsWithDefaults,
  AuthFieldsWithDefaults,
  CommonFields,
  FormFields,
  SignUpAttribute,
} from '../../types';

export const getFormDataFromEvent = (event: Event) => {
  const formData = new FormData(event.target as HTMLFormElement);
  return Object.fromEntries(formData);
};

export const setFormOrder = (
  formOverrides: FormFields,
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

export const isAuthFieldWithDefaults = (
  field: string
): field is AuthFieldsWithDefaults => {
  return authFieldsWithDefaults.includes(field as AuthFieldsWithDefaults);
};

const isArray = <T>(val: T | T[]): val is T[] => {
  return Array.isArray(val);
};

export const getErrors = (errors: string | string[]) => {
  if (!errors) return null;
  if (isArray(errors)) {
    return errors;
  } else {
    return [errors];
  }
};
