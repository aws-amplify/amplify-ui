import { DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT } from '@aws-amplify/ui-react-storage/browser';

function displayTextToProps([key, value]: [string, unknown]) {
  const isString = typeof value === 'string';
  return {
    name: key,
    description: isString ? value : '',
    type: isString ? 'string' : 'function',
  };
}

// export const DISPLAY_TEXT = [
//   {
//     name: 'getFilesUploadedText?',
//     description: '',
//     type: `(count: number) => string`,
//   },
// ];

export const COPY_VIEW_DISPLAY_TEXT = Object.entries(
  DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.CopyView
).map(displayTextToProps);

export const LOCATIONS_VIEW_DISPLAY_TEXT = Object.entries(
  DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationsView
).map(displayTextToProps);

export const DISPLAY_TEXT = Object.entries(
  DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT
).map(([key, value]) => {
  return {
    key,
    props: Object.entries(value).map(displayTextToProps),
  };
});
