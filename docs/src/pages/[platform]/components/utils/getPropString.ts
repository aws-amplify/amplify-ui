export const getPropString = (prop: string | number, propName: string) =>
  prop ? `\n  ${propName}="${prop}"` : '';
