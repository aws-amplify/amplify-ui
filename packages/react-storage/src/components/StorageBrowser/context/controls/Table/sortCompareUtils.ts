export const compareStrings = (a: string, b: string): number => {
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  return a.localeCompare(b);
};

export const compareNumbers = (a: number, b: number): number => {
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  return a - b;
};

export const compareDates = (a: Date, b: Date): number => {
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  return a.getTime() - b.getTime();
};
