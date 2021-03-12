// https://stackoverflow.com/a/37164538/10103143
export function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function mergeDeep(target: object, source: object): object {
  const output = Object.assign({}, target);
  Object.keys(source).forEach((key) => {
    if (isObject(source[key])) {
      if (!(key in target)) Object.assign(output, { [key]: source[key] });
      else output[key] = mergeDeep(target[key], source[key]);
    } else {
      Object.assign(output, { [key]: source[key] });
    }
  });
  return output;
}
