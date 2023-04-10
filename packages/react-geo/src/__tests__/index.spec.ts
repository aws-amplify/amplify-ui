import * as geoExports from '..';

describe('exports', () => {
  it('should match the expected snapshot', () => {
    const sortedExports = Object.keys(geoExports).sort();

    expect(sortedExports).toMatchSnapshot();
  });
});
