export const isDevelopment = () => process.env.NODE_ENV !== 'production';

export const isInputOrSelectElement = (
  target: unknown
): target is HTMLInputElement | HTMLSelectElement => {
  return (
    (target as HTMLInputElement)?.nodeName === 'INPUT' ||
    (target as HTMLSelectElement)?.nodeName === 'SELECT'
  );
};

export const isInputElement = (target: unknown): target is HTMLInputElement => {
  return (target as HTMLInputElement)?.nodeName === 'INPUT';
};
