const flipper = {
  100: 10,
  90: 20,
  80: 40,
  60: 60,
  40: 80,
  20: 90,
  10: 100,
};

export const flipPalette = (obj) => {
  return Object.keys(obj).reduce((acc, curr) => {
    const { value } = obj[curr];
    return {
      ...acc,
      [flipper[curr]]: { value },
    };
  }, {});
};

export const usePalette = (str) => {
  return Object.keys(flipper).reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: { value: `{colors.${str}.${curr}.value}` },
    };
  }, {});
};
