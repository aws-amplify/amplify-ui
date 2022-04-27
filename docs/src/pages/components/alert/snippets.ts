import { propsToCode } from './propsToCode';

export const alertSnippets = [
  {
    group: 'Alert',
    name: 'default',
    code: propsToCode({
      heading: 'Heading',
      body: 'Body',
    }),
  },
  {
    group: 'Alert',
    name: 'warning',
    code: propsToCode({
      variation: 'warning',
      heading: 'Heading',
      body: 'Body',
    }),
  },
];
