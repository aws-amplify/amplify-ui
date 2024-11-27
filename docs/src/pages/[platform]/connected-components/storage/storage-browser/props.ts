import { DefaultStorageBrowserDisplayText } from '@aws-amplify/ui-react-storage/browser';

function displayTextToProps([key, value]: [string, unknown]) {
  const isString = typeof value === 'string';
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
