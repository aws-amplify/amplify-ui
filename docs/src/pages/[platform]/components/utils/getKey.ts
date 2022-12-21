export const getKey = (x) => {
  return `key-${Math.ceil(Math.random() * Math.pow(10, 10))}+${x}`;
};

export const addKey = (el, idx) => ({ el, key: getKey(idx) });
