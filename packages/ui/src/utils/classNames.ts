import { has, isObject, isString } from './utils';

type ClassNamesInput =
  | string
  | number
  | boolean
  | undefined
  | null
  | Record<string, unknown>
  | ClassNamesArgs;

export type ClassNamesArgs = Array<ClassNamesInput>;

export const classNames = (...args: ClassNamesArgs) => {
  const classes: string[] = [];

  for (const arg of args) {
    // skip falsey values
    if (!arg) {
      continue;
    }

    if (isString(arg)) {
      classes.push(arg);
      continue;
    }

    if (typeof arg === 'number') {
      classes.push(arg.toString());
      continue;
    }

    if (Array.isArray(arg)) {
      classes.push(classNames(...arg));
      continue;
    }

    if (isObject(arg)) {
      // check if the object has a valid .toString() method
      if (
        arg.toString !== Object.prototype.toString &&
        arg.toString() !== '[object Object]'
      ) {
        classes.push(arg.toString());
        continue;
      }

      for (const key in arg) {
        if (has(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
};
