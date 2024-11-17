import { isFunction, isString } from '@aws-amplify/ui';

export const getPercentValue = (value: number): number =>
  Math.round(value * 100);

export const resolveClassName = (
  defaultClassName: string,
  className?: string | ((defaultClassName: string) => string)
): string => {
  if (isString(className)) return `${defaultClassName} ${className}`;

  if (isFunction(className)) return className(defaultClassName);

  return defaultClassName;
};
