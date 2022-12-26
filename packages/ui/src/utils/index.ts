const templateJoin = (
  values: string[],
  template: (value: string) => string
): string =>
  values.reduce(
    (acc, curr) => `${acc}${typeof curr === 'string' ? template(curr) : ''}`,
    ''
  );
