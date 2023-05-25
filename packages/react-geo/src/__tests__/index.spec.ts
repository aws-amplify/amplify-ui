import '@testing-library/jest-dom';
/**
 * This is a workaround to the problem of the jsdom library not supporting
 * URL.createObjectURL. See https://github.com/jsdom/jsdom/issues/1721.
 */
if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = jest.fn();
}

import * as geoExports from '..';

describe('exports', () => {
  it('should match the expected snapshot', () => {
    const sortedExports = Object.keys(geoExports).sort();

    expect(sortedExports).toMatchSnapshot();
  });
});
