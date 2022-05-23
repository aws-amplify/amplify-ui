import { ResponsiveStyle } from '@aws-amplify/ui-react';

export const getPropString = (
  prop: ResponsiveStyle<any>,
  propName: string,
  indents: number = 2
) => {
  let indentation = '';
  for (let i = 0; i < indents; i++) {
    indentation += ' ';
  }
  return prop ? `\n${indentation}${propName}="${prop}"` : '';
};
