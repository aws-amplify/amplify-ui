export const isDevelopment = () => process.env.NODE_ENV !== 'production';

export const isInputEventTarget = (
  target: unknown
): target is HTMLInputElement => {
  return (target as HTMLInputElement)?.nodeName === 'INPUT';
};
