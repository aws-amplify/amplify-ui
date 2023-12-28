import { dialCodeFormats } from './constants';

export const formatPhoneNumber = (
  dialCode: string,
  phoneNumberString: string
): string => {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const dialCodeFormat = dialCodeFormats[dialCode];
  if (!dialCodeFormat) {
    return cleaned;
  }
  // This section is a bit tricky, but the goal is to replace
  // the matching part of the input string with the value return from the replace function
  // rest contains both the parts of the input string that are matched by the regex and the whole input string
  const replacer = (match: string, ...rest: string[]) => {
    // represent joined parts of the input string without formatting
    let unformatted = rest[0];
    // represent joined parts of the input string with formatting
    let formatted = '';
    // represent the input string without formatting located at the end of the rest array
    const input = rest[rest.length - 1];
    // parts represent the number of parts in the formatted phone number
    const parts = dialCodeFormat.replace.split('$').length - 1;
    // loop on parts to make sure each part is formatted, starting from the second part
    for (let i = 1; i < parts; i++) {
      // If the rest array contains the part i of the input string, that means we can do the formatting of the part i - 1
      if (rest[i]) {
        // unformatted contains the unformatted parts before i so we start by formatting it
        formatted = unformatted.replace(
          dialCodeFormat.match,
          dialCodeFormat.replace
        );
        // we add the unformatted part i to the unformatted string
        unformatted += rest[i];
        // we add the part i of the input string to the formatted string separated by a space
        formatted = formatted.trim() + ' ' + rest[i];
        continue;
      }
      // Here we know that the part i of the input string is not in the rest array
      // If match is different from the input string, that means some parts of the input string are not matched by the regex
      // In this case we format the matching part and add the rest of the input string to the formatted string
      if (match != input) {
        formatted = match.replace(dialCodeFormat.match, dialCodeFormat.replace);
        formatted = formatted.trim() + ' ' + input.split(match)[1];
      }
    }
    // Adding a EOL to the formatted string to be used as delimiter
    return formatted === '' ? unformatted : formatted + '\n';
  };
  const formatted = cleaned.replace(dialCodeFormat.match, replacer);
  // Use the EOL delimiter to get the first line of the formatted string
  return formatted.split('\n')[0];
};
