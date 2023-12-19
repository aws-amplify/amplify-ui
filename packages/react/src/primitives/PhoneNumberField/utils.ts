import { dialCodeFormats } from './constants';
export const formatPhoneNumber = (
  dialCode: string,
  phoneNumberString: string
): string => {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const formatInfo = dialCodeFormats[dialCode];
  if (!formatInfo) {
    return cleaned;
  }
  // This section is a bit tricky, but the goal is to replace
  // the matching part of the input string with the value return from the replace function
  // rest contains both the parts of the input string that are matched by the regex and the whole input string
  const replace = (match: string, ...rest: string[]) => {
    // Joined represent joined parts of the input string without formatting
    let joined = rest[0];
    // Formatted represent joined parts of the input string with formatting
    let formatted = '';
    // inputString represent the input string without formatting at the end of the rest array
    const inputString = rest[rest.length - 1];
    // parts represent the number of parts in the phone number format
    const parts = formatInfo.replace.split('$').length - 1;
    // Here we loop on parts to make sure each part is formatted, starting from the second part
    for (let i = 1; i < parts; i++) {
      // If the rest array contains the part i of the input string, that means we can do the formatting
      if (rest[i]) {
        // we format the unformatted joined before the part i of the input string
        formatted = joined.replace(formatInfo.match, formatInfo.replace);
        joined += rest[i];
        // we add the part i of the input string to the formatted string separated by a space
        formatted = formatted.trim() + ' ' + rest[i];
        continue;
      }
      // Here we know that the part i of the input string is not in the rest array
      // If match is different from the input string, that means some parts of the input string are not matched by the regex
      // In this case we format the matching part and add the rest of the input string to the formatted string
      if (match != inputString) {
        formatted = match.replace(formatInfo.match, formatInfo.replace);
        formatted = formatted.trim() + ' ' + inputString.split(match)[1];
      }
    }
    // Adding a EOL to the formatted string to be used as delimiter
    return formatted === '' ? joined : formatted + '\n';
  };
  const pn_formatted = cleaned.replace(formatInfo.match, replace);
  // Use the EOL delimiter to get the first line of the formatted string
  return pn_formatted.split('\n')[0];
};
