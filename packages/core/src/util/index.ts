// TODO: should we use lodash?

export const isEmptyObject = (obj: Record<PropertyKey, any>) => {
  return !obj || Object.keys(obj).length === 0;
};
