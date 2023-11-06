import { has, isObject, isString } from './utils';

type ClassNamesInput =
  | string
  | number
  | boolean
  | undefined
  | null
  | Record<string, unknown>
  | ClassNamesArgs;

interface ClassNamesArgs extends Array<ClassNamesInput> {}

export const classNames = (...args: ClassNamesArgs) => {
  const classes: string[] = [];

  for (const arg of args) {
    // skip falsey values
    if (!arg) {
      continue;
    }

    if (isString(arg)) {
      classes.push(arg);
    }

    if (typeof arg === 'number') {
      classes.push(arg.toString());
    }

    if (Array.isArray(arg)) {
      classes.push(classNames(...arg));
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
