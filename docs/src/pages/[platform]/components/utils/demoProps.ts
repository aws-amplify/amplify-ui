type Comparators = {
  [key: string]: (value) => boolean;
};

/**
 * This function is used to filter out the values that should not be displayed in the demo props to code string.
 * @param props Object containing the potential demo props to appear in the prop string
 * @param comparators Object containing filter functions for individual props
 * @returns Object containing the key/value pairs from the passed in props that should appear in the demo string
 */
export const filterDemoProps = (props, comparators: Comparators = {}) => {
  const propArray = Object.entries(props);
  //filter prop entries based on comparators if they were passed in or truthy values
  const filteredProps = propArray.filter(([key, value]) => {
    if (comparators[key]) {
      return comparators[key](value);
    }
    return value;
  });
  return Object.fromEntries(filteredProps);
};

/**
 * This function takes in a props obect and a list of keys to pull out and return as a new object
 * @param props Object containing all of the values and setters return from the use{component}Props hook
 * @param propsList Array of prop names needed for your component Demo
 * @returns Object containing the key/value pairs passed in with propsList/props
 */
export const getDemoProps = (props = {}, propsList: string[] = []) => {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => propsList.includes(key))
  );
};

/**
 * This function takes in a list of Object entries and returns a string of those props
 * @param entries The list of Object entries that contains the attribute/values to be displayed in the code to prop string
 * @returns A single string with each of the attribute/values described by the passed in entries
 */
export const objectEntriesToPropString = (entries) => {
  return entries
    .map((entry) => {
      const [key, value] = entry;
      if (typeof value === 'string') {
        return `  ${key}="${value}"`;
      }
      return `  ${key}={${value}}`;
    })
    .join('\n');
};
