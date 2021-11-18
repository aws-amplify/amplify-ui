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
