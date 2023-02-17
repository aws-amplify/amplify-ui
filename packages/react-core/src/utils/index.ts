import { isString } from '@aws-amplify/ui';

export function templateJoin(
  values: string[],
  template: (value: string) => string
): string {
  return values.reduce(
    (acc, curr) => `${acc}${isString(curr) ? template(curr) : ''}`,
    ''
  );
}
