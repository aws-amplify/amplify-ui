import { propsToCode } from './propsToCode';

export const alertSnippets = [
  {
    group: 'Alert',
    name: 'default',
    code: `
      <Alert heading="heading">
        Alert body
      </Alert>
    `,
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
