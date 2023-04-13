import * as livenessExports from '..';

describe('exports', () => {
  it('should match the expected snapshot', () => {
    const sortedExports = Object.keys(livenessExports).sort();

    expect(sortedExports).toMatchSnapshot();
  });
});
