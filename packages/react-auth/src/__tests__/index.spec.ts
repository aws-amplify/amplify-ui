import * as authExports from '..';

describe('exports', () => {
  it('should match the expected snapshot', () => {
    const sortedExports = Object.keys(authExports).sort();

    expect(sortedExports).toMatchSnapshot();
  });
});
