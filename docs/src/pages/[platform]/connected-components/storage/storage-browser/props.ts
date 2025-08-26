import { DefaultStorageBrowserDisplayText } from '@aws-amplify/ui-react-storage/browser';

function displayTextToProps([key, value]: [string, unknown]) {
  const isString = typeof value === 'string';
  const isObject =
    typeof value === 'object' && value !== null && !Array.isArray(value);

  if (isObject) {
    return {
      name: key,
      description: '',
      type: 'object',
      nested: Object.entries(value as Record<string, unknown>).map(
        ([nestedKey, nestedValue]) => ({
          name: nestedKey,
          description: typeof nestedValue === 'string' ? nestedValue : '',
          type: typeof nestedValue === 'string' ? 'string' : 'function',
        })
      ),
    };
  }

  return {
    name: key,
    description: isString ? value : '',
    type: isString ? 'string' : 'function',
  };
}

export const DISPLAY_TEXT = Object.entries(
  DefaultStorageBrowserDisplayText
).map(([key, value]) => {
  return {
    key,
    props: Object.entries(value).map(displayTextToProps),
  };
});
