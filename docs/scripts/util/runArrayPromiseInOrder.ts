/**
 * Asynchronous array loops
 * More details: https://www.30secondsofcode.org/articles/s/javascript-async-array-loops#for-loops
 * @param {array} arr - array to iterate
 * @param {function} fn - callback function
 */
export async function runArrayPromiseInOrder(arr: unknown[], fn, options?) {
  for (const [i, item] of arr.entries()) {
    await fn(item, i, options);
  }
}
