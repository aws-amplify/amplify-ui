export const isDevelopment = () => process.env.NODE_ENV !== 'production';

export const isInputOrSelectElement = (
  target: unknown
): target is HTMLInputElement | HTMLSelectElement => {
  return isInputElement(target) || isSelectElement(target);
};

export const isInputElement = (target: unknown): target is HTMLInputElement => {
  return (target as HTMLElement)?.nodeName === 'INPUT';
};

export const isSelectElement = (
  target: unknown
): target is HTMLInputElement => {
  return (target as HTMLElement)?.nodeName === 'SELECT';
};

export const areArraysEqual = (arr1: Array<any>, arr2: Array<any>) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
};
